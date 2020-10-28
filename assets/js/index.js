$(function () {
  // 获取用户名及头像
  getUserInfo()
  window.getUserInfo = getUserInfo
  function getUserInfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (info) {
        if (info.status === 0) {
          // 替换成真正的欢迎语
          $('.userInfo .welcome').html(
            `欢迎&nbsp;&nbsp;${info.data.nickname || info.data.username}`
          )
          // 是要显示头像图片还是显示字母头像要进行判断
          if (info.data.user_pic) {
            $('.userInfo .layui-nav-img')
              .show()
              .attr('scr', info.data.user - pic)
              .prev()
              .hide()
            $('.layui-header .layui-nav-img')
              .show()
              .attr('src', res.data.user_pic)
              .prev.hide()
          } else if (info.data.nickname) {
            $('.userInfo .text-avatar').text(
              info.data.nickname.slice(0, 1).toUpperCase()
            )
            $('.layui-header .text-avatar').text(
              info.data.nickname.slice(0, 1).toUpperCase()
            )
          } else {
            $('.userInfo .text-avatar').text(
              info.data.username.slice(0, 1).toUpperCase()
            )
            $('.layui-header .text-avatar').text(
              info.data.username.slice(0, 1).toUpperCase()
            )
          }
        }
      },
    })
  }
  // 实现退出功能
  $('.logout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (
      index
    ) {
      //do something
      // 注意：要删除本地浏览器储存的token
      localStorage.removeItem('token')
      // 跳转到login.html页面
      location.href = '../../login.html'
      // 隐藏当前弹出层
      layer.close(index)
    })
  })
})
