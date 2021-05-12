module.exports = function (ngModule){
    ngModule.component("customers", {
        bindings: {
          people: "<"
        },
        templateUrl: "./components/customer-list/list.html"
      });
      

}