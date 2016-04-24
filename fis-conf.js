fis.match('**.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
});


fis
  .match('{css/*.css,css/*.less}', {
    optimizer: fis.plugin('clean-css')
 });


fis
  .match('*.js', {
    optimizer: fis.plugin('uglify-js', {

      // https://github.com/mishoo/UglifyJS2#compressor-options
    })
  });


// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('{css/*.css,css/*.less}', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});


fis.match('css/(*.png)',{
	release:'images/$1'
})

fis.match('src/(**)',{
    release:'$1'
})

//过滤编绎文件
fis.match('{./build,node_modules,abc.json,gulpfile.js,package.json}',{
    release:false
})


 fis.media('demo').match('*',{
 	optimizer:null,
 	useSprite:false
 })