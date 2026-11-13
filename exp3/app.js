var app = angular.module("calcApp", []);

app.controller("CalcController", function ($scope) {
  $scope.calculate = function (op) {
    if ($scope.a == null || $scope.b == null) {
      $scope.result = "Enter two numbers";
      return;
    }

    switch (op) {
      case "+":
        $scope.result = $scope.a + $scope.b;
        break;

      case "-":
        $scope.result = $scope.a - $scope.b;
        break;

      case "*":
        $scope.result = $scope.a * $scope.b;
        break;

      case "/":
        $scope.result =
          $scope.b == 0 ? "Cannot divide by zero" : $scope.a / $scope.b;
        break;
    }
  };
});
