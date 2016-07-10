(function(){
    describe('我要测试userCtrl了啊',function(){
        var $scope;
        beforeEach(module('myMod'));//初始化,加载模块
        //注入模块，初始化controller
        beforeEach(inject(function($rootScope,$controller){
            $scope = $rootScope.$new();
            $controller('userCtrl',{$scope:$scope});


        }));
        it('看看title是否正确？',function(){
            expect($scope.title=='helloworld').toBeTruthy();


        });//测试任务




    });


})();