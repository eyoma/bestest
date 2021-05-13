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
      
        var rawpeoplelist ;
        var service = {
          getAllPeople: function () {
            return $http
              .get("https://ballistictest.azurewebsites.net/api/customers", { cache: true })
              .then(function (resp) {
                rawpeoplelist = JSON.parse(JSON.stringify(resp.data));
                
                var cleandata = resp.data.map((user) => {
                  // {id: 1, name: ‘John Doe’, location: ‘AB’, active: true}
                  user.firstname = user.name.split(" ")[0];
                  user.lastname = user.name.split(" ")[1];
                  user.locationshort = user.location;
                  user.location = provincelookup[user.location];
                  user.status = user.active ? "Active" : "Inactive";
                  return user;
                });
                
                return cleandata;
              }, function (error) {
                  return {err: `API call to get customers failed with status ${error.status}`}
              }
              );
          },
      
          getPerson: function (id) {
            function personMatchesParam(person) {
              return person.id.toString() === id;
            }
      
            return service.getAllPeople().then(function (people) {
                if (people.err) return {err: "Was unable to retrieve customer data"}
              return people.find(personMatchesParam);
            });
          },
      
          postPerson: function () {

            var firstcustomer = rawpeoplelist[0]
            var objJsonB64 = btoa(JSON.stringify(firstcustomer))

            // console.log(firstcustomer, objJsonB64 )
            var durl = "https://ballistictest.azurewebsites.net/api/customer",
              ddata = {
                firstcustomer: objJsonB64,
                timestamp: new Date().toISOString()
              };
      
            return $http({
              method: "POST",
              url: durl,
              data: ddata,
              headers: { "x-client-id": 12345 }
            }).then(
              function (response) {
                // success
                return {err: false}
              },
              function (error) {
                return {err: `API call to POST customer failed with status ${error.status}`}
            }
            );
          }
        };
      
        return service;
      });
      
}