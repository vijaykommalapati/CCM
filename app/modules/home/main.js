(function (app) {
    var modulePath = 'modules/home',
    ctrlRoot = app.root + modulePath + '/controllers/';
    app.controller("HomeCtrl", ['$scope', function (scope)
    {
        scope.TestData=['aaa','bbb','ccc'];
        scope.modulePath = modulePath;
        scope.model ={routeParams: {}};

    }]);
    $.when(
        $.getScript(ctrlRoot + 'WelcomeCtrl.js'))
        .done(function ()
        {
         app.publish('moduleReady', modulePath);
        }
    );
}(window.app));