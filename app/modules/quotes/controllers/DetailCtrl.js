(function (app) {
    app.controller("QuotesDetailCtrl",
        ['$scope', function (scope)
        {
            scope.results = [];
            scope.quotes = [
                {id: 1,q: 'Be kind whenever possible. It is always possible.',author:'Dalai Lama'},
                {id: 2, q: 'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.', author:'Thomas A. Edison'},
                {id: 3, q: 'If you can dream it, you can do it.', author:'Walt Disney'},
                {id: 4, q: 'Either you run the day or the day runs you.', author:'Jim Rohn'},
                {id: 5, q: 'If you\'re going through hell, keep going.', author:'Winston Churchill'}];
            scope.showDetails = function ()
            {
                var id = scope.model.routeParams.id;
                if (!isNaN(id))
                {
                    angular.forEach(scope.quotes, function (quote) {
                    if (quote.id == id)
                        scope.results.push(quote);
                    });
                }
            };
        }]);
}(window.app));