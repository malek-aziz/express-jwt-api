var AccessControl = require('accesscontrol');
function filter(assets, attributes){
    var filtered = AccessControl.filter(assets, attributes);
    console.log(assets);
    return filtered;
}
module.exports = filter;