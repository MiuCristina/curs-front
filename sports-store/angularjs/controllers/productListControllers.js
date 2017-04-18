angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")
    .constant("productListPageCount", 3)
    .controller("productListCtrl", function ($filter,
                                             productListActiveClass, productListPageCount, cart) {
        var vm = this;
        vm.selectedCategory = null;

        vm.selectedPage = 1;
        vm.pageSize = productListPageCount;

        vm.selectCategory = function (newCategory) {
            vm.selectedCategory = newCategory;
            vm.selectedPage = 1;
        };

        vm.selectPage = function (newPage) {
            vm.selectedPage = newPage;
        };

        vm.categoryFilterFn = function (product) {
            return vm.selectedCategory == null ||
                product.category == vm.selectedCategory;
        };
        vm.getCategoryClass = function (category) {
            return vm.selectedCategory == category ? productListActiveClass : "";
        };

        vm.getPageClass = function (page) {
            return vm.selectedPage == page ? productListActiveClass : "";
        };

        vm.addProductToCart = function (product) {
            cart.addProduct(product.id, product.name, product.price);
        }
    });