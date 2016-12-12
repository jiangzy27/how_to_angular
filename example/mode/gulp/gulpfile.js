var gulp = require('gulp');
var Remarkable = require('gulp-remarkable');
var hljs       = require('highlight.js');
var replace = require('gulp-replace');
var name = require('gulp-rename');

gulp.task('default',function(){
gulp.src('app/a.md')
.pipe(new Remarkable({
preset: 'full',
disable: ['replacements'],
remarkableOptions: {
typographer: true,
breaks: true,
highlight: function (str, lang) {
if(lang && hljs.getLanguage(lang)) {
try {
return hljs.highlight(lang, str).value.replace(/\n/g, '<br>');
} catch (err) {}
}
try {
return hljs.highlightAuto(str).value.replace(/\n/g, '<br>');
} catch (err) {}
return '';
}
}
}))
.pipe(name(function(path){
path.extname = '.html';
}))

.pipe(replace(/&lt;q&gt;([^</p>]*)&lt;\/q&gt;/g, '「$1」'))
.pipe(replace(/<pre>/g, '<pre class="hljs" style="overflow-x: auto;white-space:nowrap;word-break:keep-all;">'))
.pipe(replace(/<mark>/g, '<mark style="background-color: #EEE; padding: 0 5px;">'))
.pipe(gulp.dest('./dest/'));
	
});