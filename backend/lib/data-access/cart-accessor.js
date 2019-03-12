const
  Pg2 = require('../postgres/posty2'),
  baseSqlCommands = require('../sql/sql-files'),
  Constants = require('../common/constants');

/**
     * Cart accessor to insert, update, get cart informations
     * 
     * {
    "id":"",
    products: [{
        product_id: "",
        quantity: 1,
        "unit_price": 12,
        amount : 
    },{
        product_id: "",
        quantity: 1,
        "unit_price": 12,
        amount : 
    }],
    user:{
        email:"",
        firstname:"",
        lastname: "",
        googleid: ""
    }
    total: 123,
    status: "active"
    is_active:true
}
     */
class CartAccessor extends Pg2 {

  constructor(dependencies) {
    super(dependencies);
    this.tableName = Constants.TableNames.Cart;
    this.baseUserCommands = baseSqlCommands[this.tableName];
  }

  async getActiveCartByEmail(email) {
    let result = await me.filter(me.baseUserCommands.getActiveCartByEmail, [email]);
    return result;
  }

  async getCartsByStatus(status) {
    let result = await me.filter(me.baseUserCommands.getCartsByStatus, [status]);
    return result;
  }

  async getByCartId(cartId) {
    let result = await me.filter(me.baseUserCommands.getByCartId, [cartId]);
    return result[0];
  }

  async getOrdersByEmail(email) {
    let result = await me.filter(me.baseUserCommands.getOrdersByEmail, [email]);
    return result[0];
  }

  async save(data) {
    let id = data.cart_id;
    return await me.insert(me.baseUserCommands.insert, [id, data]);
  }

  async update(data) {
    let id = data.cart_id;
    return await me.update(me.baseUserCommands.update, [id, data]);
  }

}
module.exports = CartAccessor;
