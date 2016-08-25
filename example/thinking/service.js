(function(commonService){
//http拦截器，全局追加信息
    commonService.config(['$httpProvider',function($httpProvider){
        $httpProvider.defaults.headers.common = {'X-Auth-Token': '123','Content-Type':'application/json;charset=UTF-8'};
    }]);

    //二次封装$http服务；
    commonService.factory('myHttp',['$http',function($http){
        return {
            send : function(obj){
                $('.loading').show();
                $http({
                    method : obj.method,
                    headers : obj.headers,
                    url : obj.url,
                    data : obj.data
                }).success(function(data,status){
                    $(".loading").hide();

                    if(status == "200" || status == "201"){
                        obj.success(data,status);
                    }else{
                        if(obj.requestFail){
                            newsHint(obj.requestFail);
                        }
                    }

                }).error(function(data,status){
                    $(".loading").hide();

                    if(obj.error){
                        obj.error(data,status);
                    }else{
                        newsHint("请求错误，请稍后重试！");
                    }
                });
            }
        }
    }]);

})(app);