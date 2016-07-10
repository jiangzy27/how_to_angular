angular.module('myMod').directive('user',function(){
    return {
        restrict:'E',
        replace:true,
        scope:{name:'='},
        template:'<div>i am a user {{name}}</div>'


    };


});