
(function(app){

    app.directive('test', function (myHttp) {
        return {
            template:'<div>ID：{{taskId}}</div>',
            restrict: 'AE',
            scope:{
                taskId:'='
            },
            link: function(scope, ele, attrs) {


            }
        };
    });


})(app);