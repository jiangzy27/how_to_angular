var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/getCity',function(req,res){

    var data = req.body;//中间件来的
    if(data.cityId =='1'){
        res.send({cityName:'beijing'});
    }else if(data.cityId =='2'){
        res.send({cityName:'shanghai'});
    }else if(data.cityId =='3'){
        res.send({cityName:'hangzhou'});
    }else if(data.cityId =='4'){
        res.send({cityName:'wuhan'});
    }else if(data.cityId =='5'){
        res.send({cityName:'nanjing'});
    }else{
        res.send({cityName:'chongqing'});
    }

});

app.listen(9999);