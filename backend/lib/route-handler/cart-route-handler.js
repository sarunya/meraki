const CartService = require('../service/cart-service');

class CartRouteHandler {
    constructor(dependencies) {
        this.dependencies = dependencies;
    }

    /**
     * Add Products To new Cart
     * @param {*} request 
     * @param {*} reply 
     */
    async createCart(request, reply) {
        let me = this;
        let result = null;
        try {
            let service = new CartService(me.dependencies, me.config, request);
            result = await service.addProductToCart(null, request.body, request.headers.g_access_token);
            reply.send(result);
        } catch (error) {
            console.log(error);
            me._replyError(reply, error);
        }
    }

    /**
     * Update Products To existing Cart
     * @param {*} request 
     * @param {*} reply 
     */
    async updateCartItem(request, reply) {
        let me = this;
        let result = null;
        try {
            let service = new CartService(me.dependencies, me.config, request);
            result = await service.addProductToCart(request.params.cartid, request.body, request.headers.g_access_token);
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

module.exports = CartRouteHandler;