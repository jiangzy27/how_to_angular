angular.module('myMod').filter('upFirst',function(){
    return function(input){
        return input.slice(0,1).toUpperCase()+input.slice(1);
    }
});