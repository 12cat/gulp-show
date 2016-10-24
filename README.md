1、CommonJS 常用于服务端，同步的。
就是为JS的表现来制定规范，因为js没有模块的功能，它希望js可以在任何地方运行，不只是浏览器中，如node.js。
CommonJS定义的模块分为:
	模块引用：require
	模块定义：exports
	模块标识：module

2、AMD 常用于浏览器端，异步的。
它主要为前端JS的表现制定规范，推崇【依赖前置】，在定义模块的时候就要声明其依赖的模块。
AMD也支持CMD写法，但依赖前置是官方文档的默认模块定义写法。

3、CMD 常用于浏览器端，异步的。
sea.js就是遵循他的规范，推崇【就近依赖】，只有在用到某个模块的时候再去require。


yeoman
	1. 脚手架（generator [yo]）

	2. 构建工具（grunt）

	3. 包管理器（bower）

webpack
	一般配合 grunt 或 gulp 使用
	配置较为繁琐

	特点：
		1. webpack 是以 commonJS 的形式来书写脚本滴，但对 AMD/CMD 的支持也很全面，方便旧项目进行代码迁移。

		2. 能被模块化的不仅仅是 JS 了。

		3. 开发便捷，能替代部分 grunt/gulp 的工作，比如打包、压缩混淆、图片转base64等。

		4. 扩展性强，插件机制完善，特别是支持 React 热插拔。 

grunt
	CMD，配置较为繁琐（执行流程是同步的）

	接口：
		config		获取配置数据
		event		监听器
		fail		错误相关
		file		读写文件
		log			控制台输出
		option		参数
		task		任务
		template	模版
		util		工具函数/库

gulp
	AMD，简单易用，利用node.js（执行流程是异步的）

	接口：
		require		引入组件
		src			读文件，返回一个文件流
		dest		写文件
		task		定义一个任务
		start		执行任务
		pipe		输送管，用来传递
		watch		监听文件

	安装
		1. 安装node.js
		2. npm install gulp -g
		   npm install gulp --save-dev

	工具：
		gulp
		gulp-minify-css		css 压缩
		gulp-uglify			js 压缩
		gulp-jshint			js 代码检测
		jshint
		gulp-concat			文件合并
		gulp-rename			文件重命名
		gulp--clean			文件清除
		gulp-connect		webserver
		gulp-rev			给文件添加版本号
		gulp-rev-collector	更新版本号文件引用

	版本号
		/css/styl.css => /css/styl-1d87bebe.css
		/js/script.js => /js/script-61e0be79.js
		/img/img1.gif => /img/img1-35c3af8134.gif

		/css/styl.css => /css/styl.css?v=1d87bebe
		/js/script.js => /js/script.js?v=61e0be79
		/img/img1.gif => /img/img1.gif?v=35c3af8134

第一步：打开node_modules\gulp-rev\index.js
第144行
	/*manifest[originalFile] = revisionedFile;*/
	manifest[originalFile] = originalFile + '?v=' + file.revHash;

第二步：打开nodemodules\gulp-rev\nodemodules\rev-path\index.js
第10行
	/*return filename + '-' + hash + ext;*/
	return filename + ext;

第三步：打开node_modules\gulp-rev-collector\index.js
第31行
	/*if (!_.isString(json[key]) || path.basename(json[key]).replace(new RegExp(opts.revSuffix ), '')!==path.basename(key)) {
		isRev = 0;
	}*/
	if ( !_.isString(json[key]) || path.basename(json[key]).split('?')[0] !== path.basename(key) ) {
		isRev = 0;
	}
第50行
	/*return pattern.replace(/[\-\[\]\{\}\(\)\*\+\?\.\^\$\|\/\\]/g, "\\$&");*/
	var rp = pattern.replace(/[\-\[\]\{\}\(\)\*\+\?\.\^\$\|\/\\]/g, "\\$&");
	rp = pattern + "(\\?v=(\\d|[a-z]){8,10})*";
	return rp;
第90行
	/*patterns.push( escPathPattern( (path.dirname(key) === '.' ? '' : closeDirBySep(path.dirname(key)) ) + path.basename(key, path.extname(key)) )
                            + opts.revSuffix
                            + escPathPattern( path.extname(key) )
                        );*/
 	patterns.push( escPathPattern( (path.dirname(key) === '.' ? '' : closeDirBySep(path.dirname(key)) ) + path.basename(key, path.extname(key)) )
                            + opts.revSuffix
                            + escPathPattern( path.extname(key) ) + "(\\?v=(\\d|[a-z]){8,10})*"
                        );



目录结构

src
	css
		style.css
	font
		font-awesome-4.6.3（字体图标库）
	img
		coding.png
		dog.jpg
	js
		common
			plugins
				echarts.min.js
				jquery-1.8.3.js
			tools
				tool.js
		page
			login
				login.js
			main
				index.js
				detail.js
	*rev（存放版本号目录）
view
	login
		login.html
	main
		index.html
		detail.html

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

dist
	css
		style.min.css
	font
		font-awesome-4.6.3（字体图标库）
	img
		coding.png
		dog.jpg
		firefox.png
	js
		login
			login.js
		main
			index.js
			detail.js
		common.min.js
	view
		login
			login.html
		main
			index.html
			detail.html



开发模式：
	1. 文件迁移
	2. 文件合并
	3. 文件压缩
	4. 文件重命名
	5. 启动服务功能
	6. 监测代码文件
	7. 页面自动刷新

最终模式：
	1. 文件添加版本号
	2. 小于20*1024 bytes的png图片 base64格式



开发流程：	==> img / font / css(min) / js(concat, min) / html
			==> webserver / watch

最终流程：	==> img(rev) / font(rev)
			==> css(min)
			==> base64(revCollector, rev) / js(concat, min, rev)
			==> html(revCollector)