const shortid = require("short-id");

function getAmountValue(value) {
    return Math.floor(value).toFixed(2)
}

function generateId() {
    return shortid.generate();
}

module.exports = {
    getAmountValue,
    generateId
}