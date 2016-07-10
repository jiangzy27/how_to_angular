(function(){
    describe('我要测试userFilter了啊',function(){
        var upFirstFilter;
        beforeEach(module('myMod'));//初始化,加载模块
        //注入模块，初始化controller
        beforeEach(inject(function(_$filter_){

            upFirstFilter = _$filter_('upFirst');

        }));
        it('看看value是否正确？',function(){
            expect(upFirstFilter('hello')=='Hello').toBeTruthy();


        });//测试任务




    });


})();