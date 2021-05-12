routes.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function routes($stateProvider, $urlRouterProvider) {
// An array of state definitions
var states = [
    {
      name: "people",
      url: "/",
      component: "customers",
      // This state defines a 'people' resolve
      // It delegates to the PeopleService to HTTP fetch (async)
      // The customers component receives this via its `bindings: `
      resolve: {
        people: function (PeopleService) {
          return PeopleService.getAllPeople();
        }
      }
    },

    {
      name: "person",
      // This state takes a URL parameter called personId
      url: "/customer/{personId}",
      component: "person",
      // This state defines a 'person' resolve
      // It delegates to the PeopleService, passing the personId parameter
      resolve: {
        person: function (PeopleService, $transition$) {
          return PeopleService.getPerson($transition$.params().personId);
        }
      }
    }
  ];

  // Loop over the state definitions and register them
  states.forEach(function (state) {
    $stateProvider.state(state);
  });


  $urlRouterProvider.otherwise("/");
}