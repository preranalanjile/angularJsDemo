// 'use strict';

var app = angular.module('app');

app.controller('AuthorIndexController', ['$scope', 'Author', function($scope, Author) {
    //Grab all author from the server
    $scope.authors = Author.query();

    //Destroy method for deleting a author
    $scope.destroy = function(index) {

        //Tell the server to remove the object
        Author.remove({id: $scope.authors[index].id}, function() {
            //If successful, remove it from our collection
            $scope.authors.splice(index, 1);
        });
    }
}]);

app.controller('AuthorCreateController', ['$scope', '$location', 'Author', function($scope, $location, Author) {
    //The save method which is called when the user wants to submit their data
    $scope.save = function() {

        //Create the author object to send to the back-end
        var author = new Author($scope.author);
        //Save the author object
        author.$save(function() {

            //Redirect us back to the main page
            $location.path('/');

        }, function(response) {

            //Post response objects to the view
            $scope.errors = response.data.errors;
        });
    }
}]);

//A controller to show the author and all it's glory
app.controller('AuthorShowController', ['$scope', 'Author', 'Book', '$routeParams', function($scope, Author, Book, $routeParams) {
    //Grab the author from the server
    $scope.author = Author.get({id: $routeParams.id})
}]);