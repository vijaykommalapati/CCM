(function(app){
    app.controller('allCtrl',['$scope',function(scope){

        scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        scope.totalServerItems = 0;
        scope.pagingOptions =
        {
            pageSizes: [5, 10, 20],
            pageSize: 5,
            currentPage: 1
        };


        scope.Main;
        scope.griddata=[];
        scope.Countries=[
            {Name:'India',id:'1'},
            {Name:'USA',id:'2'},
            {Name:'UK',id:'3'},
            {Name:'Cannada',id:'4'}
        ];
        scope.gridOptions ={
            data: 'griddata',
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: scope.pagingOptions,
            filterOptions: scope.filterOptions
        };
        scope.submit=function(data){
           scope.griddata.push(data);
        };
    }]);
})(window.app);
