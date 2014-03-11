angular.module('todoApp').controller('MainCtrl',function($scope, PouchDbApi){

   // $scope.tasks = [{name:'Create this app'}, {name:'Write tests'}, {name:'Present this app and get job'}];
    $scope.tasks = [];

    PouchDbApi.read().then(function(res){
        for (var i = 0; i < res.rows.length; i++) {
            $scope.tasks.push(res.rows[i].doc);
        }
    }, function(reason){
        console.log(reason);
    });

    $scope.create = function(task){
        PouchDbApi.create(task).then(function(res){
            $scope.task = '';
        }, function(reason){
            console.log(reason);
        })
    }

    $scope.remove = function(id, rev){
        var doc = {
            _id:id,
            _rev:rev
        }
        PouchDbApi.remove(doc).then(function(res){

        }, function(reason){
            console.log(reason);
        })
    }

    $scope.$on('created', function(event, task){
        $scope.tasks.push(task);
    })

    $scope.$on('removed', function(event, id){;
        for (var i = 0; i< $scope.tasks.length; i++) {
            if ($scope.tasks[i]._id === id) {
                $scope.tasks.splice(i,1);
            }
        }
    })

})