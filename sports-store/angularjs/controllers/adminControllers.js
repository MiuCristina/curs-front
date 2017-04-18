angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:5500/users/login")
    .constant("logoutUrl", "http://localhost:5500/users/logout")
    .constant("ordersUrl", "http://localhost:5500/orders")
    .controller("authCtrl", function($http, $location, authUrl) {
        var vm = this;
        vm.authenticate = function (user, pass) {
            $http.post(authUrl, {
                username: user,
                password: pass
            }, {
                withCredentials: true
            }).then(function (data) {
                $location.path("/main");
            }, function (error) {
                vm.authenticationError = error;
            });
        }
    })
    .controller("mainCtrl", function($http, $location, logoutUrl) {
        var vm = this;
        vm.screens = ["Products", "Orders"];
        vm.current = vm.screens[0];
        vm.setScreen = function (index) {
            vm.current = vm.screens[index];
        };
        vm.getScreen = function () {
            return vm.current == "Products"
                ? "/views/adminProducts.html" : "/views/adminOrders.html";
        };
        vm.logout = function () {
            $http.get(logoutUrl)
                .then(function (data) {
                    $location.path("/login");
                }, function (error) {
                    vm.logoutError = error;
            });
        }
    })
    .controller("ordersCtrl", function ($http, ordersUrl) {
        var vm = this;

        $http.get(ordersUrl, {withCredentials : true})
            .then(function (data) {
                vm.orders = data.data;
            }, function (error) {
                vm.error = error;
            });

        vm.selectOrder = function(order) {
            vm.selectedOrder = order;
        };
        vm.calcTotal = function(order) {
            var total = 0;
            for (var i = 0; i < order.products.length; i++) {
                total += order.products[i].count * order.products[i].price;
            }
            return total;
        }
    });