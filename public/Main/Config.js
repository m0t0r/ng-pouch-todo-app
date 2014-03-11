angular.module('todoApp').factory('Config', function(){
    PouchDB.replicate('testdb', 'https://todo-app.iriscouch.com/testdb', {continuous: true});
    PouchDB.replicate('https://todo-app.iriscouch.com/testdb', 'testdb', {continuous: true});

    return {
        db: new PouchDB('testdb')
    }
})