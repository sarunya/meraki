const _ = require("co-lodash"),
  ProductAccessor = require("../data-access/product-accessor");

class ProductService {

  constructor(dependencies) {
    this.productAccessor = new ProductAccessor(dependencies);
    this.products = [{
      id: "id1",
      title: "title",
      description: "description",
      rating: 3,
      image: "https://scontent-maa2-1.cdninstagram.com/vp/676f5e2d23591408c5ca4bdfd174bdd2/5D0F73A0/t51.2885-15/sh0.08/e35/c10.0.959.959/s640x640/52020943_413354702733028_6978514860606863309_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
      unit_price : 50
    }, {
      id: "id2",
      title: "title2",
      description: "description2",
      rating: 3,
      image: "https://scontent-maa2-1.cdninstagram.com/vp/3a34b46a22825e91fe5b34e7992a233e/5D0D62F7/t51.2885-15/e35/c236.0.608.608/47437315_1490017914464886_8060714421866430274_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
      unit_price : 40
    }, {
      id: "id3",
      title: "title3",
      description: "description3",
      rating: 3,
      image: "https://scontent-maa2-1.cdninstagram.com/vp/bab003db99cade4b5774b6ca8d577ef7/5D22CF24/t51.2885-15/sh0.08/e35/c0.3.725.725a/s640x640/51296221_295326504469859_6928502903273422781_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
      unit_price : 10
    }, {
      id: "id4",
      title: "title4",
      description: "description4",
      rating: 3,
      image: "https://scontent-maa2-1.cdninstagram.com/vp/d0470b48b6f4081fc0fa831e0270ec07/5D07D52A/t51.2885-15/e35/47692614_738778443175924_1129094173557151988_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
      unit_price : 30
    }]
  }

  async getAllProducts() {
    const me = this;
    try {

    } catch (error) {

    }
    return me.products;
  }

  getProductById(id) {
    const me = this;
    let result = {};
    try {
      result = _.filter(me.products, (product) => {
        return (product.id == id);
      });
      return result[0];
    } catch (error) {

    }
    return result;
  }

  async getAllProductsByIds(ids) {
    const me = this;
    let result = [];
    let resultPromise = [];
    try {
      for (let index = 0; index < ids.length; index++) {
        let id = ids[index];
        resultPromise.push(me.getProductById(id));
        if (resultPromise.length === 5) {
          let resultOfProducts = await resultPromise;
          result = _.union(result, resultOfProducts);
        }
      }
      let resultOfProducts = await resultPromise;
      result = _.union(result, resultOfProducts);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createOrupdateProduct(product) {
    const me = this;
    try {
      let existingProduct = me.getProductById(product.id);
      if(!_.isEmpty(existingProduct)) {
         return me.productAccessor.update(product);
      }
      return me.productAccessor.save(product);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService;
