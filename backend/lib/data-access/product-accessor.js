const
    Pg2 = require('../postgres/posty2'),
    baseSqlCommands = require('../sql/sql-files'),
    Constants = require('../common/constants');

    /**
     * Product accessor to insert, update, get product informations
     */
class ProductAccessor extends Pg2 {

    constructor(dependencies) {
        super(dependencies);
        this.tableName = Constants.TableNames.Product;
        this.baseUserCommands = baseSqlCommands[this.tableName];
    }

    async getProductsByCategory(category) {
        let result = await me.filter(me.baseUserCommands.getSkusByCategory, [category]);
        return result;
    }

    async getByProductId(productId) {
        let result = await me.filter(me.baseUserCommands.getByProductId, [productId]);
        return result[0];
    }

    async getAllCategories() {
        let result = await me.filter(me.baseUserCommands.getAllCategories);
        return result[0];
    }

    async save(data) {
        let id = data.id;
        return await me.insert(me.baseUserCommands.insert, [id, data]);
    }

    async update(data) {
        let id = data.id;
        return await me.update(me.baseUserCommands.update, [id, data]);
    }
}
module.exports = ProductAccessor;