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

  async getActiveCart(email) {
    const me = this;
    try {
      let result = await me.cartAccessor.getActiveCartByEmail(email);
      if (!(result && result.length > 0)) {
        throw "CartNotExistsForEmail";
      }
      return result;
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

  async _validateAndPopulateUserInfo(cart = {}, accessToken) {
    try {
      const me = this;
      let userInfo = await me.googleClient.getUserInfo(accessToken);
      if (!cart.user  || cart.user.google_id === userInfo.id) {
        cart.user = {
          email: userInfo.emails[0].value,
          last_name: userInfo.name.familyName,
          first_name: userInfo.name.givenName,
          google_id: userInfo.id
        }
        return cart;
      } else {
        throw "Please Login And Try again";
      }
    } catch (error) {
      throw error;
    }
  }

  async _addProduct(cartId, product, accessToken) {
    const me = this;
    try {
      let cart = null;
      if (cartId) {
        cart = await me.getCartDetails(cartId);
        if (cart.status != "Active") {
          cartId = null;
          cart = null;
        }
      }
  
      if (!cartId) {
        //create cart for the user
        cart = me._createCart(cart);
      }

      await me._validateAndPopulateUserInfo(cart, accessToken);

      //check if cart already contains the product

      let productsInCart = _.map(cart.products, "product_id");

      let allProducts = _.uniq(_.union(productsInCart, [_.get(product, 'product_id')]));
      //get all product details
      let productDetails = await me.productService.getAllProductsByIds(allProducts);
      productDetails = _.keyBy(productDetails, "id");

      if (_.indexOf(productsInCart, product.product_id) != -1) {
        //change quantity of the sku
        me._updateProductQuantity(cart, product, productDetails);
      } else {
        //addProductDetails
        let productToBeAdded = productDetails[product.product_id];
        productToBeAdded.quantity = product.quantity;
        cart.products.push(me._getProductDetails(productToBeAdded))
      }
      let result = null;
      if (!cartId) {
        result = await me.cartAccessor.save(cart);
      } else {
        result = await me.cartAccessor.update(cart);
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
        result = await me.cartAccessor.update(cart);
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  _getProductDetails(product, cartProduct) {
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

  _updateProductQuantity(cart, product, productDetails) {
    try {
      let cartProducts = cart.products;
      if (product.quantity > 0) {
        let updateItem = _.find(cartProducts, (cartproduct) => {
          return (cartproduct.product_id === product.product_id);
        })
        //update quantity and price
        updateItem = _getProductDetails(product, updateItem);
      } //else remove the product from cart
      else {
        _.remove(cartProducts, (cartProduct) => {
          return (cartProduct.product_id === product.product_id);
        })
      }
    } catch (error) {
      throw error;
    }
  }

  _createCart() {
    try {
      let newCart = {
        id: guid(),
        products: [],
        is_active: true,
        status: "Active"
      }
      return newCart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartService;
