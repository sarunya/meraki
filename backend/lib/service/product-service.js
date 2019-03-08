const _ = require("co-lodash");

class ProductService {

  constructor(dependencies) {
    this.products = [{
      id: "id1",
      title: "title",
      description: "description",
      rating: 3,
      image: "image",
    }, {
      id: "id2",
      title: "title2",
      description: "description2",
      rating: 3,
      image: "image2",
    }, {
      id: "id3",
      title: "title3",
      description: "description3",
      rating: 3,
      image: "image2",
    }, {
      id: "id4",
      title: "title4",
      description: "description4",
      rating: 3,
      image: "image2",
    }]
  }

  async getAllProducts() {
    const me = this;
    try {

    } catch (error) {

    }
    return me.products;
  }

  async getProductById(id) {
    const me = this;
    let result = [];
    try {
      result = _.filter(me.products, (product) => {
        return (product.id == id);
      });
      return result;
    } catch (error) {

    }
    return result;
  }
}

module.exports = ProductService;
