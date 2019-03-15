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
      image: "image",
      unit_price : 50
    }, {
      id: "id2",
      title: "title2",
      description: "description2",
      rating: 3,
      image: "image2",
      unit_price : 50
    }, {
      id: "id3",
      title: "title3",
      description: "description3",
      rating: 3,
      image: "image2",
      unit_price : 50
    }, {
      id: "id4",
      title: "title4",
      description: "description4",
      rating: 3,
      image: "image2",
      unit_price : 50
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
}

module.exports = ProductService;
