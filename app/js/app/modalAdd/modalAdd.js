////////////////////////////////////////////////////////////////////////////////
//  MODALADD module is to create the boot. modals for adding different stuff  //
////////////////////////////////////////////////////////////////////////////////

angular.module('modalAdd', ['ngFileUpload'])
.directive('modalAdd', function() {
	return {
		templateUrl: function(elem, attr){
			return 'js/app/modalAdd/templates/modal-add-'+attr.type+'.html';
		},
		controller: 'ModalAddCtrl'
	};
})

.controller('ModalAddCtrl', ['$scope', 'data', function ($scope, data) {
	$scope.addField = function(field) {
		// $scope.fields is defined in database
		$scope.fields.push(field);
		data.save(fieldsPath, $scope.fields);
	};
	$scope.addOption = function(field, option) {
		field.options.push(option);
		console.log("Option added");
	};
}])

.controller('FileUploadCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout){

	$scope.uploadFiles = function(files) {
		$scope.files = files;
		angular.forEach(files, function(file) {
			if (file && !file.$error) {
				file.upload = Upload.upload({
					url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
					data: {file: file}
				});

				file.upload.then(function (response) {
					$timeout(function () {
						file.result = response.data;
					});
				}, function (response) {
					if (response.status > 0)
						$scope.errorMsg = response.status + ': ' + response.data;
				});

				file.upload.progress(function (evt) {
					file.progress = Math.min(100, parseInt(100.0 * 
								evt.loaded / evt.total));
				});
			}   
		});
	}
}]) ;
