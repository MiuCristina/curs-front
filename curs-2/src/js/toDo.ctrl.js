(function(app) {
    var ToDoCtrl = function(){
        var vm = this;
        vm.toDo ={
            user: 'Cristina',
            todos: []
        };

        vm.add = function(action){
            if(action.length > 0)
                vm.toDo.todos.push({action:action, done:false, selected:false});
            document.getElementById("input-add").value = "";
        };

        vm.remove = function(element){
            var index = vm.toDo.todos.indexOf(element);
            vm.toDo.todos.splice(index, 1);
        };

        vm.selectItem = function(element){
            var index = vm.toDo.todos.indexOf(element);
            vm.toDo.todos = angular.forEach(vm.toDo.todos, function(value, key) {
                value.selected = false;
            });
            vm.toDo.todos[index].selected = true;
        };

    };
    app.controller('ToDoCtrl', ToDoCtrl);
}(angular.module('toDoApp')));