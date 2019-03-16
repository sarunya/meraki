const _ = require("co-lodash"),
  CartAccessor = require("../data-access/cart-accessor"),
  ProductService = require("../service/product-service"),
  GoogleClient = require("../clients/google-client"),
  guid = require("uuid").v4,
  utils = require("../common/utils");

class CartService {

  constructor(dependencies) {
    this.googleClient = new GoogleClient(dependencies);
    this.productService = new ProductService(dependencies);
    this.cartAccessor = new CartAccessor(dependencies);
  }

  async getAllCarts(status) {
    const me = this;
    try {
      let result = await me.cartAccessor.getCartsByStatus(status);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getActiveCart(accessToken) {
    const me = this;
    try {
      let result = await me._getExistingCart(null, accessToken);
      let cart = result[0];
      if (!cart) {
        throw "CartNotExistsForEmail";
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartDetails(cartId) {
    const me = this;
    try {
      let cart = await me.cartAccessor.getByCartId(cartId);
      if (!cart) {
        throw "CartNotFound";
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, product, accessToken) {
    const me = this;
    try {
      return me._addProduct(cartId, product, accessToken);
    } catch (error) {
      throw error;
    }
  }

  async _validateAndPopulateUserInfo(accessToken) {
    try {
      const me = this;
      let cartUser = {};
      let userInfo = await me.googleClient.getUserInfo(accessToken);
      if (userInfo) {
        cartUser = {
          email: userInfo.emails[0].value,
          last_name: userInfo.name.familyName,
          first_name: userInfo.name.givenName,
          google_id: userInfo.id
        }
        return cartUser;
      } else {
        throw "Please Login And Try again";
      }
    } catch (error) {
      throw error;
    }
  }

  async _getExistingCart(cartId, accessToken) {
    try {
      const me = this;
      let cart = null;
      let userInfo = null;
      let promiseArr = [];
      let isNewCart = false;
      if (!accessToken) {
        throw "UseActionNotSupported";
      }
      promiseArr.push(me._validateAndPopulateUserInfo(accessToken));
      if (cartId) {
        promiseArr.push(me.getCartDetails(cartId))
      }
      let resolvedPromises = await Promise.all(promiseArr);
      cart = resolvedPromises[1];
      userInfo = resolvedPromises[0];
      if (!cart || (cart && cart.status != "Active")) {
        //find existing cart by user email;
        cart = await me.cartAccessor.getActiveCartByEmail(userInfo.email);
      }
      isNewCart = (!cart)?true:false;
      return [cart, userInfo, isNewCart];
    } catch (error) {
      throw error;
    }
  }

  async _addProduct(cartId, product, accessToken) {
    const me = this;
    try {
      console.log(product, accessToken);
      let cart = null;
      let userInfo = null;
      let isNewCart = false;

      let existingCartDetails = await me._getExistingCart(cartId, accessToken);
      cart = existingCartDetails[0];
      userInfo = existingCartDetails[1];
      isNewCart = existingCartDetails[2];

      if (!cart) {
        //create cart for the user
        cart = me._createCart(userInfo);
      }

      //check if cart already contains the product

      let productsInCart = _.map(cart.products, "product_id");

      let allProducts = _.uniq(_.union(productsInCart, [_.get(product, 'product_id')]));
      //get all product details
      let productDetails = await me.productService.getAllProductsByIds(allProducts);
      productDetails = _.keyBy(productDetails, "id");

      //check and update price for all other products
      for (let index = 0; index < cart.products.length; index++) {
        let productInCart = cart.products[index];
        if (productInCart.product_id === product.product_id) {
          productDetails[productInCart.product_id].quantity = product.quantity;
        } else {
          productDetails[productInCart.product_id].quantity = productInCart.quantity;
        }
        me._populateProductDetails(productDetails[productInCart.product_id], productInCart);
      }

      if (_.indexOf(productsInCart, product.product_id)>=0 && product.quantity < 1) {
        //remove product from the cart
        me._removeProduct(cart, product);
      } else if(!productDetails[product.product_id].quantity && product.quantity>0) {
        //addProductDetails
        let productToBeAdded = productDetails[product.product_id];
        productToBeAdded.quantity = product.quantity;
        cart.products.push(me._populateProductDetails(productToBeAdded))
      }

      let result = null;
      if (isNewCart) {
        result = await me.cartAccessor.save(cart);
      } else {
        result = await me.cartAccessor.updateCart(cart);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async placeOrder(cartId) {
    const me = this;
    try {
      let cart = await me.getCartDetails(cartId);
      if (!cart || cart.status != "Active") {
        throw "CartIsNotActive";
      } else {
        cart.status = "Ordered";
        result = await me.cartAccessor.updateCart(cart);
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  _populateProductDetails(product, cartProduct) {
    try {
      if (!cartProduct) {
        cartProduct = {};
      }
      cartProduct.product_id = product.id;
      cartProduct.quantity = product.quantity;
      cartProduct.unit_price = product.unit_price;
      cartProduct.title = product.title;
      cartProduct.description = product.description;
      cartProduct.image = product.image;
      cartProduct.amount = utils.getAmountValue(product.unit_price * product.quantity);
      return cartProduct;
    } catch (error) {
      throw error;
    }
  }

  _removeProduct(cart, product) {
    try {
      let cartProducts = cart.products;
      _.remove(cartProducts, (cartProduct) => {
        return (cartProduct.product_id === product.product_id);
      })
    } catch (error) {
      throw error;
    }
  }

  _createCart(userInfo) {
    try {
      let newCart = {
        id: guid(),
        products: [],
        is_active: true,
        user: userInfo,
        status: "Active"
      }
      return newCart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartService;
