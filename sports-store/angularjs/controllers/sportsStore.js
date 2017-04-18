angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:5500/products")
    .constant("orderUrl", "http://localhost:5500/orders")
    .controller("sportsStoreCtrl", function ($http, $location, dataUrl, orderUrl, cart) {
        var vms = this;
        vms.data = {};
        $http.get(dataUrl)
            .then(function (data) {
                vms.data.products = data.data;
            }, function (error) {
                vms.data.error = error;
            });

        vms.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .then(function (data) {
                    vms.data.orderId = data.id;
                    cart.getProducts().length = 0;
                    $location.path("/complete");
                }, function (error) {
                    vms.data.orderError = error;
                    $location.path("/complete");
                })
            };
    });