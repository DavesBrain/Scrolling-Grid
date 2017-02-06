(function() {
    'use strict';

    angular
        .module('NeuranetApp')
        .service('dataService', dataService)
    
    dataService.$inject = ['$http', '$filter'];
    
    function dataService($http, $filter) {

        var dataService = {};
        
        
        var rawRecordCount = 500;
        
        var _getData = function (optionsData) {
            return $http({
              method: 'GET',
              url: ''
            })
            .then(function successCallback(response) {
                

                
                
                
                
                
                var response = {
                    d: {
                        results: []
                    }
                };
                
                
                // TODO: could use json-schema-faker here
                for (var i=0;i<rawRecordCount;i++) {
                    response.d.results.push(
                        {
                            "name": faker.fake("{{name.lastName}}, {{name.firstName}}")
                        }
                    );
                }
                response.d.__count = rawRecordCount;
            
                response = pagedData(response, optionsData);
                return response;
            },
                function errorCallback(response) {
                return response;
            });
        }

        
        var pagedData = function (response,optionsData) {
            
            var records = response.d.results;
            var firstRecord = optionsData.skip;
            var lastRecord = optionsData.take + optionsData.skip;

            response.d.results = records.slice(firstRecord, lastRecord);
            
            return response;
        }
        
        dataService.getData = _getData;
        
        return dataService;
    }
})();        