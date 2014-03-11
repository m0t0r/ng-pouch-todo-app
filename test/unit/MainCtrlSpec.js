'use strict'

describe('MainCtrl', function(){
    var scope, $controllerConstructor, mockPouchDbApi, deferred, q;

    beforeEach(module('todoApp'));

    beforeEach(function(){
        mockPouchDbApi = {
            remove:function(){
                deferred = q.defer();
                return deferred.promise;
            },
            create:function(){
                deferred = q.defer();
                return deferred.promise;
            },
            read:function(){
                deferred = q.defer();
                return deferred.promise;
            }
        }
    })

    beforeEach(inject(function($controller, $rootScope, $q, _PouchDbApi_){
        scope = $rootScope.$new();
        $controllerConstructor = $controller;
        q = $q;
    }));

    it('should be able to create a new task', function(){
        var ctrl = $controllerConstructor("MainCtrl", { $scope:scope, PouchDbApi:mockPouchDbApi });

        spyOn(mockPouchDbApi, 'create').andCallThrough();

        scope.create({name:'Pass all unit tests'});

        deferred.resolve();
        scope.$root.$digest();

        expect(mockPouchDbApi.create).toHaveBeenCalled();

    })

    it('should be able to remove a task', function(){
        var ctrl = $controllerConstructor("MainCtrl", { $scope:scope, PouchDbApi:mockPouchDbApi });

        spyOn(mockPouchDbApi, 'remove').andCallThrough();

        scope.remove();
        deferred.resolve();
        scope.$root.$digest();

        expect(mockPouchDbApi.remove).toHaveBeenCalled();

    })
});