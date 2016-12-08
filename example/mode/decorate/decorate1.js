function a(){
    console.log('修饰前');
}
//高阶函数
//加入新功能，再调用原函数。
function func(f){
    console.log('加入新功能');
    f();
}
func(a);
