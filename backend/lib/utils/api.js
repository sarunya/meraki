const request = require('request-promise'),
  _ = require('co-lodash');

class Api {

  async get(url, headers, queryParams) {
    const me = this;
    let requestOptions = me._buildRequestOptions(url, "GET", queryParams, headers);
    return await me.callRequest(requestOptions);
  }

  callRequest(requestOptions) {
    return new Promise((resolve, reject) => {
      request(requestOptions, (error, response, body) => {
        if (error) {
          reject({
            error: error
          })
        }
        if (response.statusCode != 200 && response.statusCode != 201) {
          reject({
            statuscode: response.statusCode,
            response: body
          })
        }
        try {
            body = (!_.isEmpty(body))?JSON.parse(JSON.stringify(body)):(JSON.stringify(body));  
        } catch (error) {
            reject(error);
        }
        return resolve(body);
      })
    })
  }

  _buildRequestOptions(url, method, queryParams, headers, body) {
    return {
      uri: url,
      method: method,
      qs: queryParams,
      headers: headers,
      json: true,
      body: body
    };
  }
}


module.exports = Api;