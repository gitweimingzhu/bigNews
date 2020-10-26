$(function () {
  // 获取用户名及头像
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
})
