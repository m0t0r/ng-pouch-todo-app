angular.module('todoApp').factory('PouchDbApi', function($q, $rootScope, Config){
    var db = Config.db;

    db.changes({
        continuous:true,
        onChange: function(change){
            if(!change.deleted){
                $rootScope.$apply(function(){
                    db.get(change.id, function(err, doc){
                        $rootScope.$apply(function(){
                            if(err) console.log(err);
                            $rootScope.$broadcast('created', doc);
                        })
                    })
                })
            } else {
                $rootScope.$apply(function(){
                    $rootScope.$broadcast('removed', change.id);
                })
            }
        }
    })

    return {
        create: function(data){
            var defer = $q.defer();
            var doc = {name:data};
            db.post(doc, function(err, res){
                $rootScope.$apply(function(){
                    if(err){
                        defer.reject(err);
                    } else {
                        defer.resolve(res);
                    }
                })
            })

            return defer.promise;
        },
        read: function(){
            var defer = $q.defer();
            db.allDocs({include_docs: true}, function(err, res){
                $rootScope.$apply(function(){
                    if(err){
                        defer.reject(err);
                    } else {
                        defer.resolve(res);
                    }
                })
            });

            return defer.promise;
        },

        remove:function(doc){
            var defer = $q.defer();
            db.remove(doc, function(err, res){
                $rootScope.$apply(function(){
                    if(err){
                        defer.reject(err);
                    } else {
                        defer.resolve(res);
                    }
                })
            });

            return defer.promise;
        }
    }

});