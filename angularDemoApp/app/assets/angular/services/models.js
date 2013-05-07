// 'use strict';

var app = angular.module('app');
app.factory('Author', ['$resource', function($resource) {
    return $resource('/authors/:id', {id: '@id'});
}]);

app.factory('Book', ['$resource', function($resource) {
    return $resource('/authors/:authorId/books/:id', {authorId: '@authorId', id: '@id'},{update: {method:"PUT"}}, {});
}]);

app.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});