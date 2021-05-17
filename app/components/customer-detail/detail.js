module.exports = function (ngModule){
    require('./detail.css')
    ngModule.component("person", {
         bindings: { person: "<" },
        templateUrl: "components/customer-detail/detail.html"
      });
      
}