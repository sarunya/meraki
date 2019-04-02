const _ = require("co-lodash"),
  CartAccessor = require("../data-access/cart-accessor"),
  CartService = require("../service/cart-service");

class AddressService {

  constructor(dependencies) {
    this.cartAccessor = new CartAccessor(dependencies);
    this.cartService = new CartService(dependencies);
  }

  async getAddressForUser(accessToken) {
      try {
          const me = this;
          let orders = me.cartService.getOrdersByAccessToken(accessToken);
          return me._extractAddressInfo(orders);
      } catch (error) {
          throw error;
      }
  }

  _extractAddressInfo(orders) {
      let addressInfo = [];
      let wholeAddressArr = [];
      _.each(orders, (order) => {
          let shipping = order.shipping_info;
          let wholeAddress = `${shipping.name},${shipping.line1},${shipping.line2},${shipping.city},${shipping.state},${shipping.zipcode},${shipping.phone},${shipping.email}`;
          wholeAddress = wholeAddress.toLowerCase();
          if(wholeAddressArr.indexOf(wholeAddress)==-1) {
            addressInfo.push(order.shipping_info);
            wholeAddressArr.push(wholeAddress);
          }
      })
      return addressInfo;
  }

}

module.exports = AddressService;
