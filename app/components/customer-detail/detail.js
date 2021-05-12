module.exports = function (ngModule){
    ngModule.component("person", {
        bindings: { person: "<" },
        templateUrl: "components/customer-detail/detail.html"
      });
      
}