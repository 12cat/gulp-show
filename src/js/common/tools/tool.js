'use strict';

/**
 * 日期插件
 * 将日期转化为 2016-01-01 01:01:01
 *
 * @param date 日期类
 *
 */
function date2str(date) {
	var _y = date.getFullYear(),
		_M = date.getMonth() +1,
		_d = date.getDate(),
		_h = date.getHours(),
		_m = date.getMinutes(),
		_s = date.getSeconds();
	_M = _M>9 ? _M : '0'+ _M;
	_d = _d>9 ? _d : '0'+ _d;
	_h = _h>9 ? _h : '0'+ _h;
	_m = _m>9 ? _m : '0'+ _m;
	_s = _s>9 ? _s : '0'+ _s;
	return [_y, _M, _d].join('-') + ' ' + [_h, _m, _s].join(':');
}