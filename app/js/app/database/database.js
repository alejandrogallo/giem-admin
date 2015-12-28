fs = require("fs");
var fieldsPath = "db/fields.json";
var carsPath = "db/cars.json";


angular.module('database',[])
.service('data', ["$q", function($q) {
	this.fieldsPath = "db/fields.json";
	this.carsPath = "db/cars.json";
	this.getFields = function () {
		return this.get(this.fieldsPath);
	};
	this.getCars = function () {
		return this.get(this.carsPath);
	};
	this.get = function(path) {
		////////////////////////////////////////////////
		//  This function gets data through promises  //
		////////////////////////////////////////////////

		var d = $q.defer();
		fs.readFile(path, 'utf8', function(err, jsonData) {
			if (err) { throw err; } 

			d.resolve(JSON.parse(jsonData));
			console.log(jsonData);
		});
		return d.promise;
	}; 
	this.saveFields = function (data) {
		this.save(this.fieldsPath, data);	
	};
	this.saveCars = function (data) {
		this.save(this.carsPath, data);	
	};
	this.save = function(path, data) {
		fs.writeFile(path, data, function (err) {
			if (err) throw err;
			console.log('fields.json saved!');
		});
	};  
}])
.controller('FieldsSearchCtrl', ['$scope', 'data', function ($scope, data) {
	////////////////////////////////////////////////////////
	//  This is the controller in the body of index.html  //
	////////////////////////////////////////////////////////
	
	$scope.languages = ["es","cat","en","fr"];
	$scope.selectedOptionField=undefined;
	data.getFields().then(function(jsonData){
		$scope.fields = jsonData;
	});
	data.getCars().then(function(jsonData){
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

}]);
