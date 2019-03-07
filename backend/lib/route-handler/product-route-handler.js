const JsonShareService = require('../service/json-share');

class ProductRouteHandler {
    constructor(dependencies) {
        this.dependencies = dependencies;
    }

    async createJsonShare(request, reply) {
        let me = this;
        try {
            let service = new JsonShareService(me.dependencies, me.config, request);
            let result = await service.createJsonShare(request.body);
            reply.send(result);
        } catch (error) {
            me._replyError(reply, error); 
        }
    }

    async createArrayShare(request, reply) {
        let me = this;
        try {
            let service = new JsonShareService(me.dependencies, me.config, request);
            let result = await service.createArrayShare(request.body);
            reply.send(result);
        } catch (error) {
            me._replyError(reply, error); 
        }
    }

    /**
     * Gets all active products available in database
     * @param {*} request 
     * @param {*} reply 
     */
    async getProducts(request, reply) {
        let me = this;
        let result = null;
        try {
            // let service = new JsonShareService(me.dependencies, me.config, request);
            // result = await service.getJsonShare(request.query.id);
            result = [{
                id: "id1",
                title: "title",
                description: "description",
                rating: 3,
                image: "image",
            },{
                id: "id2",
                title: "title2",
                description: "description2",
                rating: 3,
                image: "image2",
            },{
                id: "id3",
                title: "title3",
                description: "description3",
                rating: 3,
                image: "image2",
            },{
                id: "id4",
                title: "title4",
                description: "description4",
                rating: 3,
                image: "image2",
            }]
            reply.send(result);
        } catch (error) {
            result = {error:error};
            reply.send(result);
        }
    }

    async getArrayShareData(request, reply) {
        let me = this;
        let result = null;
        try {
            let service = new JsonShareService(me.dependencies, me.config, request);
            result = await service.getArrayShare(request.query.id);
            reply.send(result);
        } catch (error) {
            result = {error:error};
            reply.send(result);
        }
    }

    _replyError(reply, error) {
        reply.status(error.statusCode || error.status || 500);
        reply.send(error);
     }

}
module.exports = ProductRouteHandler;