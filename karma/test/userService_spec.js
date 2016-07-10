(function(){
    describe('我要测试user service了啊',function(){
        var userService;
        beforeEach(module('myMod'));//初始化,加载模块
        //注入模块，初始化controller
        beforeEach(inject(function(_userService_){

            userService = _userService_;

        }));
        it('看看name是否正确？',function(){
            expect(userService['name']=='xyz').toBeTruthy();


        });//测试任务




    });


})();