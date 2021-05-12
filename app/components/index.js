module.exports = function (ngModule){
    require('./customer-detail/detail')(ngModule)
    require('./customer-list/list')(ngModule)
}