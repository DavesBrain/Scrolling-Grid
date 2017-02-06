var NeuranetApp = angular.module('NeuranetApp', [ "kendo.directives" ]);

    // create the controller and inject Angular's $scope
    NeuranetApp.controller('mainController', ['$scope', '$filter', 'dataService', function($scope, $filter, dataService) {
        
        var init = function () {
            makeGrid();
        }

        
        $scope.masterGrid = {};
        
         var getData = function (options){
            return dataService.getData(options.data).then(
                function successCallback(response) {
                    options.success(response);
                },
                function errorCallback(response) {
                    // handle error
                }
            );
        };
                
        var makeGrid = function () {
            $scope.masterGrid.dataSource = new kendo.data.DataSource({
                type: "odata",
                serverPaging: true,
                serverSorting: true,
                transport:{
                    read: function(options) {
                        return getData(options);
                    },
                },
                pageSize: 20
            });

            $scope.masterGrid.gridOptions = {
                columns: [
                    {
                        title: "Name",
                        field: "name",
                        sortable: true
                    }
                ],
                height: 543,
                scrollable: {
                    virtual: true
                },
                sortable: true
            };
            
        };
        
        init();
        
    }]);