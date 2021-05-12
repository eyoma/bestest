module.exports = function (ngModule){
    ngModule.service("PeopleService", function ($http) {
        var provincelookup = {
          NL: "Newfoundland and Labrador",
          PE: "Prince Edward Island",
          NS: "Nova Scotia",
          NB: "New Brunswick",
          QC: "Quebec",
          ON: "Ontario",
          MB: "Manitoba",
          SK: "Saskatchewan",
          AB: "Alberta",
          BC: "British Columbia",
          YT: "Yukon",
          NT: "Northwest Territories",
          NU: "Nunavut"
        };
      
        var service = {
          getAllPeople: function () {
            return $http
              .get("data/customersapi.json", { cache: true })
              .then(function (resp) {
                var cleandata = resp.data.map((user) => {
                  // {id: 1, name: ‘John Doe’, location: ‘AB’, active: true}
                  user.firstname = user.name.split(" ")[0];
                  user.lastname = user.name.split(" ")[1];
                  user.locationshort = user.location;
                  user.location = provincelookup[user.location];
                  user.status = user.active ? "Active" : "Inactive";
                  return user;
                });
                //service.postPerson();
                return cleandata;
              });
          },
      
          getPerson: function (id) {
            function personMatchesParam(person) {
              return person.id.toString() === id;
            }
      
            return service.getAllPeople().then(function (people) {
              return people.find(personMatchesParam);
            });
          },
      
          postPerson: function () {
            //TODO: refactor to not call the api if the data is already available
            var firstcustomer = service.getAllPeople().then(function (people) {
              console.log("people here", people);
              return people[0];
            });
            var durl = "https://ballistictest.azurewebsites.net/api/customer",
              ddata = {
                firstcustomer: JSON.stringify(firstcustomer),
                timestamp: new Date().toISOString()
              };
      
            // $http({
            //   method: "POST",
            //   url: durl,
            //   data: ddata,
            //   headers: { "x-client-id": 12345 }
            // }).then(
            //   function (response) {
            //     // success
            //     console.log("success here");
            //   },
            //   function (response) {
            //     // optional
            //     // failed
            //     console.log("failed here");
            //   }
            // );
          }
        };
      
        return service;
      });
      
}