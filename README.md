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
	`/css/styl.css => /css/styl-1d87bebe.css`
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

* src
	- css
		+ style.css
	- font
		+ font-awesome-4.6.3（字体图标库）
	- img
		+ coding.png
		+ dog.jpg
	- js
		+ common
			* plugins
				* echarts.min.js
				* jquery-1.8.3.js
			* tools
				* tool.js
		+ page
			* login
				* login.js
			* main
				* index.js
				* detail.js
	- rev（存放版本号目录）
* view
	* login
		* login.html
	* main
		* index.html
		* detail.html

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

* dist
	* css
		* style.min.css
	* font
		* font-awesome-4.6.3（字体图标库）
	* img
		* coding.png
		* dog.jpg
		* firefox.png
	* js
		* login
			* login.js
		* main
			* index.js
			* detail.js
		* common.min.js
	* view
		* login
			* login.html
		* main
			* index.html
			* detail.html



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