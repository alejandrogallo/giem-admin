fs = require("fs");
var fieldsPath = "db/fields.json";
var carsPath = "db/cars.json";


angular.module('database',['xeditable'])
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
			//console.log(jsonData);
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
		///////////////////////////////////////////////////////
		//  This function just saves the data into the file  //
		///////////////////////////////////////////////////////
		
		var jsonData = JSON.stringify(data);
		fs.writeFile(path, jsonData, function (err) {
			if (err) {
				window.alert(err);
				throw err;
			}
			console.log('Data saved in '+path);
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
	$scope.saveAll = function () {
		if ($scope.fields && $scope.cars) {
			if (window.confirm("Estàs segur que vols guardar els canvis efectuats?")) {
				data.saveCars($scope.cars);
				data.saveFields($scope.fields);	
			}
		}
	};
	$scope.removeOption = function (field, option) {
		for (var i = field.options.length - 1; i >= 0; i--) {
			var some_option = field.options[i];
			if (JSON.stringify(some_option) == JSON.stringify(option)) {
				field.options.splice(i,1);
			}
		}
	}
	$scope.getField = function (fieldName){
		for (var i = 0; i < $scope.fields.length; i++) {
			if($scope.fields[i].cat == fieldName){
				return $scope.fields[i];
			}
		}; 
		return false;     
	};
	$scope.deletePictureByIndex = function (car, index) {
		car.images.splice(index,1);
	}

}]);
