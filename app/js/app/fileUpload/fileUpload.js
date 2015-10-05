angular.module('fileUpload', [])
// .directive('fileUpload', function(){
// 	return {
// 		templateUrl: 'js/app/fileUpload/file-upload.html',
// 		controller: 'FileUploadCtrl'
// 	};
// })
// .controller('FileUploadCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout){
  
//   $scope.watch('files', function () {
//     $scope.upload($scope.files);
//   });
  
//   $scope.$watch('file', function () {
//     if ($scope.file != null) {
//       $scope.upload([$scope.file]);
//     }
//   });
  
//   $scope.log = '';
 
//   $scope.upload = function (files) {
// 	  if (files && files.length) {
//       for (var i = 0; i < files.length; i++) {
//         var file = files[i];
//         if (!file.$error) {
//           Upload.upload({
//             url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
//             data: {
//               file: file  
//             }
//           }).progress(function (evt) {
//             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//             $scope.log = 'progress: ' + progressPercentage + '% ' +
//                         evt.config.file.name + '\n' + $scope.log;
//           }).success(function (data, status, headers, config) {
//             $timeout(function() {
//                 $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
//             });
//           });
//         }
//       }
// 	  }
//   };
// }])
;