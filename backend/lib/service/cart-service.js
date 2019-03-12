const _ = require("co-lodash"),
  CartAccessor = require("../data-access/cart-accessor"),
  guid = require("uuid").v4,
  _ = require("co-lodash"),
  utils = require("../common/utils");

class CartService {

  constructor(dependencies) {
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

  async getCartDetails() {
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

  async addProduct(cartDetails, product) {
    const me = this;
    try {
      let cartId = cartDetails.cart_id;
      let cart = null;
      if (cartId) {
        cart = await me.getCartDetails(cartId);
        if (cart.status != "Active") {
          cartId = null;
          cart = null;
        }
      }

      if (!cart) {
        //create cart for the user
        cart = me._createCart(cartDetails);
      }

      //check if cart already contains the product

      let productsInCart = _.map(cart.products, "product_id");
      if (_.indexOf(productsInCart, product.product_id) != -1) {
        //change quantity of the sku
        _updateProductQuantity(cart, product);
      } else {
        //addProductDetails
        cart.products.push(_getProductDetails(product))
      }
      let result = null;
      if(!cartId) {
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
      if(!cart || cart.status != "Active") {
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
      cartProduct.product_id = product.product_id;
      cartProduct.quantity = product.quantity;
      cartProduct.unit_price = product.unit_price;
      cartProduct.amount = utils.getAmountValue(product.unit_price * product.quantity);
      return cartProduct;
    } catch (error) {
      throw error;
    }
  }

  _updateProductQuantity(cart, product) {
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

  async _createCart(cartDetails) {
    try {
      let newCart = {
        id: guid(),
        products: [],
        user: {
          email: cartDetails.email,
          first_name: cartDetails.first_name,
          last_name: cartDetails.last_name,
          google_id: cartDetails.google_id
        },
        is_active: true,
        status : "Active"
      }
      return newCart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartService;
