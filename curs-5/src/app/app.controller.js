(function(module) {
    "use strict";
    var ToDoCtrl = function(toDoService) {
        var vm = this;

        vm.todo = {
            user: "Cristina"
        };
        toDoService.getItems().then(function(response) {
            vm.todo.items = response.data;
        });

        vm.addNewItem = function(actionText) {
            vm.todo.items.push({ action: actionText, done: false });
            document.getElementById('action-text').value = '';
        };
        vm.incompleteCount = function() {
            var count = 0;
            angular.forEach(vm.todo.items, function(item) {
                if (!item.done) {
                    count++;
                }
            });
            return count;
        };

        vm.warningLevel = function() {
            return vm.incompleteCount() < 3 ? "label-success" : "label-warning";
        };
    };

    module.controller("ToDoCtrl", ToDoCtrl);

}(angular.module("toDoApp")));
