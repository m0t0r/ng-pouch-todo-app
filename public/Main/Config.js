angular.module('todoApp').factory('Config', function(){
    return {
        db: new PouchDB('testdb')
    }
})