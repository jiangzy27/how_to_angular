(function(){
    describe('测试一个远程服务',function(){
        var $httpBackend;//拦截
        var $http;//请求
        beforeEach(module('myMod'));
        beforeEach(inject(function(_$httpBackend_,_$http_){

            $httpBackend = _$httpBackend_;
            $http = _$http_;
//做个配置，模拟后台功能
            $httpBackend.when('GET','/users').respond(
                {name:'ammy'}
            );



        }));
        it('远程是否正确',function(){
            $http.get('/users').success(function(res){
                expect(res.name).toEqual('ammy');
            });
            //刷新请求，模拟后台返回数据
            $httpBackend.flush();
        });

    });



})();