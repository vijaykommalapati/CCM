(function (app) {
    var modulePath = 'modules/projects',
        ctrlRoot = app.root + modulePath + '/controllers/';
    app.controller("projectCtrl", ['$scope', function (scope)
    {
        scope.data='success';
        scope.modulePath = modulePath;
        scope.model ={routeParams: {}};

    }]);
    $.when(
            $.getScript(ctrlRoot + 'all.js'))
            .done(function ()
            {
                app.publish('moduleReady', modulePath);
            }
    );
}(window.app));