const load = require('./load-sql'),
  Constants = require('../common/constants');


let sqlFileHash = {};
sqlFileHash[Constants.TableNames.JsonShareData] = {
  insert: load('./json-share/insert.sql'),
  getById: load('./json-share/getbyid.sql'),
  getArrayById: load('./json-share/getarraybyid.sql'),
  deleteLastUsed: load('./json-share/deletelastused.sql'),
  totalCount: load('./json-share/totalcount.sql'),
  updateModifiedDateById: load('./json-share/updatemodifieddatebyid.sql'),
  filterByHash: load('./json-share/filterbyhash.sql'),
  filterArrayByHash: load('./json-share/filterarraybyhash.sql')
};

sqlFileHash[Constants.TableNames.Product] = {
  insert: load('./product/insert.sql'),
  update: load('./product/update.sql'),
  getByProductId: load('./product/getbyproductid.sql'),
  getAllCategories: load('./product/getallcategories.sql'),
  getSkusByCategory: load('./product/getskusbycategory.sql')
};

sqlFileHash[Constants.TableNames.Cart] = {
  insert: load('./cart/insert.sql'),
  update: load('./cart/update.sql'),
  getByCartId: load('./cart/getbycartid.sql'),
  getActiveCartByEmail: load('./cart/getactivecartbyemail.sql'),
  getOrdersByEmail: load('./cart/getordersbyemail.sql'),
  getCartsByStatus: load('./cart/getcartsbystatus.sql'),
  getOrderByCartId: load('./cart/getorderbycartid.sql')
};

module.exports = sqlFileHash;