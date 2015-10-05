fs = require("fs");
var fieldsPath = "db/fields.json";
var carsPath = "db/cars.json";


angular.module('database',[])
.service('data', ["$q", function($q) {
  this.get = function(path) {
    var d = $q.defer();
    fs.readFile(path, 'utf8', function(err, jsonData) {
      if (err) { throw err; } 

      d.resolve(JSON.parse(jsonData));
      console.log(jsonData);
    });
    return d.promise;
  }; 
  this.save = function(path, data) {
    get(path).then(function(jsonData) {
      jsonData.push(data);
      fs.writeFile(path, jsonData, function (err) {
        if (err) throw err;
        console.log('fields.json saved!');
      });
    });
  };  
}])
.controller('FieldsSearchCtrl', ['$scope', 'data', function ($scope, data) {
  $scope.languages = ["es","cat","en","fr"];
  $scope.selectedOptionField=undefined;
	data.get(fieldsPath).then(function(jsonData){
    $scope.fields = jsonData;
  });
  data.get(carsPath).then(function(jsonData){
    $scope.cars = jsonData;
  });
  $scope.getField = function (fieldName){
    for (var i = 0; i < $scope.fields.length; i++) {
      if($scope.fields[i].cat == fieldName){
        return $scope.fields[i];
      }
    }; 
    return false;     
  };
  
}])
;