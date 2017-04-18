angular.module("sportsStore")
    .controller("cartSummaryController", function(cart) {
        var vmc = this;
        vmc.cartData = cart.getProducts();
        vmc.total = function () {
            var total = 0;
            for (var i = 0; i < vmc.cartData.length; i++) {
                total += (vmc.cartData[i].price * vmc.cartData[i].count);
            }
            return total;
        };
        vmc.remove = function (id) {
            cart.removeProduct(id);
        }
    });