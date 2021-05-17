module.exports = function (ngModule){

  if (ON_TEST){
    require('./list.test')(ngModule)
  }
    ngModule.component("customers", {
        controllerAs: "vm",
        controller: listController,
        bindings: {
          people: "<"
        },
        templateUrl: "./components/customer-list/list.html"
      });
      
      listController.$inject = ["$scope", "PeopleService"];


      function listController($scope, PeopleService) {
        var vm = this;
        
        
        PeopleService.postPerson().then((ddata)=>{
          if (ddata.err) vm.people.err = ddata.err
         })
        
               
      }
}