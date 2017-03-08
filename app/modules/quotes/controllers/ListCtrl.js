(function (app) {
    app.controller("QuotesListCtrl", ['$scope', function (scope)
    {
        scope.quotes = [
            {q: 'Be kind whenever possible. It is always possible.', details:' quotes/detail/1'},
            {q: 'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.', details:' quotes/detail/2'},
            {q: 'If you can dream it, you can do it.', details:' quotes/detail/3'},
            {q: 'Either you run the day or the day runs you.', details:' quotes/detail/4'},
            {q: 'If you\'re going through hell, keep going.', details:' quotes/detail/5'}
        ];
    }
    ]);
}(window.app));
