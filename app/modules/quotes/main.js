(function (app) {
    var modulePath = 'modules/quotes',
        ctrlRoot = app.root + modulePath + '/controllers/';
    app.controller("QuotesCtrl", ['$scope', function (scope)
    {
        scope.modulePath = modulePath;
        scope.model =
        {
            routeParams: {}
        };
    }]);
    $.when(
        $.getScript(ctrlRoot + 'DetailCtrl.js'),
        $.getScript(ctrlRoot + 'ListCtrl.js'))
        .done(function () {
            app.publish('moduleReady', modulePath);
        });
}(window.app));