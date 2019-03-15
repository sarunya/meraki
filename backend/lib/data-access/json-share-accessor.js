const
    Pg2 = require('../utils/posty2'),
    baseSqlCommands = require('../sql/sql-files'),
    Constants = require('../common/constants'),
    shortId = require('short-id');

class JsonShareAccessor extends Pg2 {
    constructor(dependencies) {
        super(dependencies);
        this.tableName = Constants.TableNames.JsonShareData;
        this.baseUserCommands = baseSqlCommands[this.tableName];
    }

    async getTotalCount() {
        const me = this;
        let result = await me.count(me.baseUserCommands.totalCount);
        return result.count;
    }

    async deleteLastUsed() {
        const me = this;
        let result = await me.delete(me.baseUserCommands.deleteLastUsed);
        return result;
    }

    async getById(id) {
        const me = this;
        let result = await me.filter(me.baseUserCommands.getById, [id]);
        return result[0];
    }

    async getArrayById(id) {
        const me = this;
        let result = await me.filter(me.baseUserCommands.getArrayById, [id]);
        return result[0];
    }

    async filterByHash(actualHash, expectedHash) {
        const me = this;
        let result = await me.filter(me.baseUserCommands.filterByHash, [actualHash, expectedHash]);
        return result[0];
    }

    async filterArrayByHash(actualHash, expectedHash) {
        const me = this;
        let result = await me.filter(me.baseUserCommands.filterArrayByHash, [actualHash, expectedHash]);
        return result[0];
    }

    async save(actual, expected, actualhash, expectedhash, userOptions = null) {
        const me = this;
        let id = shortId.generate();
        return await me.insert(me.baseUserCommands.insert, [id, actual, expected, actualhash, expectedhash, userOptions]);
    }

    async updateModifiedDateById(id) {
        const me = this;
        return await me.update(me.baseUserCommands.updateModifiedDateById, [id]);
    }
}
module.exports = JsonShareAccessor;
