var juice = require('juice');
var fs = require('fs');
var htmlFile = './dest/a.html';
var cssFile = './app/monokai_sublime.min.css';
var result = juice.juiceFile(htmlFile, {extraCss: fs.readFileSync(cssFile)}, function(err, html){
    if(err){
        console.log(err);
    }
    else{
        var meta = '<meta charset="utf8" />';
        fs.writeFileSync('./dest/a_html.html', meta+html);
    }
});