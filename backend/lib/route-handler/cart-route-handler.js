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

    async getCart(request, reply) {
        const me = this;
        try {
            let service = new CartService(me.dependencies, me.config, request);
            let result = await service.getActiveCart(request.headers.g_access_token);
            reply.send(result);
        } catch (error) {
            me._replyError(reply, error);
        }
    }

    async getOrderByCartId(request, reply) {
        const me = this;
        try {
            let service = new CartService(me.dependencies, me.config, request);
            let result = await service.getOrderByCartId(request.params.cartid);
            reply.send(result);
        } catch (error) {
            me._replyError(reply, error);
        }
    }

    async getOrders(request, reply) {
        const me = this;
        try {
            let service = new CartService(me.dependencies, me.config, request);
            let result = await service.getOrders(request.body);
            reply.send(result);
        } catch (error) {
            me._replyError(reply, error);
        }
    }

    async updateOrderStatus(request, reply) {
        const me = this;
        try {
            let service = new CartService(me.dependencies, me.config, request);
            let result = await service.updateOrderStatus(request.body);
            reply.send(result);
        } catch (error) {
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
            result = await service.updateProductInCart(request.params.cartid, request.body, request.headers.g_access_token);
            reply.send(result);
        } catch (error) {
            console.log(error);
            me._replyError(reply, error);
        }
    } 

    /**
     * Update Address To existing Cart
     * @param {*} request 
     * @param {*} reply 
     */
    async updateCartAddress(request, reply) {
        let me = this;
        let result = null;
        try {
            let service = new CartService(me.dependencies, me.config, request);
            result = await service.updateAddressInfo(request.params.cartid, request.headers.g_access_token, request.body);
            reply.send(result);
        } catch (error) {
            console.log(error);
            me._replyError(reply, error);
        }
    } 

    async placeOrder(request, reply) {
        let me = this;
        let result = null;
        try {
            let service = new CartService(me.dependencies, me.config, request);
            result = await service.placeOrder(request.params.cartid, request.headers.g_access_token);
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
    async removeProductFromCart(request, reply) {
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