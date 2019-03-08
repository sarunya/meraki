const ProductService = require('../service/product-service');

class ProductRouteHandler {
    constructor(dependencies) {
        this.dependencies = dependencies;
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
            let service = new ProductService(me.dependencies, me.config, request);
            result = await service.getAllProducts();
            reply.send(result);
        } catch (error) {
            console.log(error);
            me._replyError(reply, result);
        }
    }

    async getProductById(request, reply) {
        let me = this;
        let result = null;
        try {
            let service = new ProductService(me.dependencies, me.config, request);
            result = await service.getProductById(request.params.id);
            reply.send(result);
        } catch (error) {
            console.log(error);
            me._replyError(reply, error);
        }
    }

    _replyError(reply, error) {
        reply.status(error.statusCode || error.status || 500);
        reply.send(error);
     }

}
module.exports = ProductRouteHandler;