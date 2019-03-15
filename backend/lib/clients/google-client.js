const _ = require("co-lodash"),
  Api = require("../utils/api");

class GoogleClient {

  constructor(dependencies) {
    this.api = new Api(dependencies);
  }

  /**
   * Gets user info from google with help of access token
   * @param {UserInfo} accessToken 
   */
  async getUserInfo(accessToken) {
    const me = this;
    try {
      let result = await me.api.get("https://www.googleapis.com/plus/v1/people/me", null, {
        access_token: accessToken
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = GoogleClient;
