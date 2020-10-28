// 将相同的根路径放在单独的文件中，便于使用已经将来的维护
// 在发生Ajax之前用形参获取所有的请求信息
$.ajaxPrefilter(function (options) {
  // console.log(options);
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  // 统一设置token
  // 1. 由于$.ajaxPrefilter只要发送请求 就会被执行
  // 2. 但是登陆和注册的请求是不需要携带token的
  // 3. 因此需要将登陆和注册的请求排除掉
  if (options.url.includes('/my')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    }
  }

  //统一设置防翻墙（权限验证）
  options.complete = function  (res) {
    // 如果没有带上token服务器端会响应回来身份认证失败的信息,借此开启防翻墙
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      location.href = '../../login.html'
    }
  }
})
