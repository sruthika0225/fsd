var app = angular.module("todoApp", []);

app.controller("TodoController", function ($scope) {
  $scope.todos = [];

  $scope.addTodo = function () {
    if ($scope.newTodo) {
      $scope.todos.push({
        text: $scope.newTodo,
        completed: false,
      });
      $scope.newTodo = "";
    }
  };

  $scope.deleteTodo = function (index) {
    $scope.todos.splice(index, 1);
  };

  $scope.completedCount = function () {
    return $scope.todos.filter((t) => t.completed).length;
  };
});
