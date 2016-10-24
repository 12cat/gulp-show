'use strict'

module.exports = {
	base64: {
		// baseDir: '',
		extensions: ['png'],
		maxImageSize: 20 * 1024,	// bytes
		// extensions: ['svg', 'png', /\.jpg#datauri$/i],
		debug: false
	},
	uglify: {
        mangle: true,       	// 默认：true 是否修改变量名
        compress: true,     	// 默认：true 是否完全压缩
        preserveComments: 'all' // 保留所有注释 some
    }
};