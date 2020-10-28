$(function () {
  // 获取用户的基本信息
  var form = layui.form
  getUser()
  function getUser() {
    $.ajax({
      url: '/my/userinfo',
      success: function (info) {
        if (info.status === 0) {
          /* $('.myForm [name="username"]').val(info.data.username)
        $('.myForm [name="nickname"]').val(info.data.nickname)
        $('.myForm [name="email"]').val(info.data.email) */
          form.val('formTest', info.data)
        }
      },
    })
  }

  // 表单校验
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户昵称不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户昵称首尾不能出现下划线'_'"
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户昵称不能全为数字'
      }
    },
  })

  // 更新用户的基本信息
  $('.myForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (info) {
        var layer = layui.layer
        layer.msg(info.message)
        if (info.status === 0) {
          // 获取用户信息
          getUser()
          // 用parent调用父页面的方法
          parent.window.getUserInfo()
        }
      },
    })
  })
  $('.reset').on('click',function  (e) {
    e.preventDefault()
    // 用数据重新渲染页面
    getUser()
  })
})
