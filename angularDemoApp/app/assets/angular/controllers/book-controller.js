// 'use strict';

var app = angular.module('app');
app.controller('BooksController', ['$scope', 'Book', '$routeParams', function($scope, Book, $routeParams) {
    //Grab all the books from the server
    $scope.books = Book.query({authorId: $routeParams.id});

    //Destroy method for deleting a author
    $scope.destroy = function(index) {

        //Tell the server to remove the object
        Book.remove({id: $scope.books[index].id, authorId: $routeParams.id}, function() {
            //If successful, remove it from our collection
            $scope.books.splice(index, 1);
        });
    }

    //Define a 'save' method which will be called from the view.
    $scope.save = function() {
        //Create the books object to be sent to the server
        var obj = new Book({name: $scope.name, description: $scope.description, authorId: $routeParams.id});

        //Attempt a save to the back-end
        obj.$save(function(response) {

           //If we're successful then add the response (the object as the server sees it)
            // to our collection of books
            $scope.books.unshift(response);

            //Empty the name & description
            $scope.name = $scope.description = ""

        }, function(response) {
            //If there's a failure set the 'errors' scope variable so it'll be reflected in the view.
            $scope.errors = response.data.errors;
        });
    }
}]);


app.controller('BookUpdateController', ['$scope', '$location', 'Author', 'Book', '$routeParams', function($scope, $location, Author, Book, $routeParams) {

    $scope.author = Author.get({id: $routeParams.author_id});
    $scope.book = Book.get({authorId: $routeParams.author_id, id: $routeParams.id});
    
    $scope.update = function(book) {

      var book = Book.get({authorId: $routeParams.author_id, id: $routeParams.id}, function(book) { 
        book.name =  $scope.book.name
        book.description = $scope.book.description
        book.$update({authorId: $routeParams.author_id}, function(response) {

          //Redirect us back to the main page
          $location.path('/author/'+ $routeParams.author_id);

        }, function(response) {

          $scope.errors = response.data.errors;
        });
      });

    }
}]);