// 将相同的根路径放在单独的文件中，便于使用已经将来的维护
// 在发生Ajax之前用形参获取所有的请求信息
$.ajaxPrefilter(function  (options) {
  // console.log(options);
  options.url = 'http://ajax.frontend.itheima.net' + options.url
}) 