(function(){
    describe('我要测试指令了啊',function(){
        var $rootScope;
        var $compile;
        beforeEach(module('myMod'));//初始化,加载模块
        //注入模块，初始化controller
        beforeEach(inject(function(_$compile_,_$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;



        }));
        it('看看指令是否正确？',function(){
            $rootScope.name = 'hehe';
           var element = $compile('<user></user>')($rootScope);
            $rootScope.$digest();//触发所有监听,强行用scope的变量刷新视图
            expect(element.html()).toContain('hehe');

        });//测试任务




    });


})();