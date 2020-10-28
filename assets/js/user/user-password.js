$(function () {
  // 表单校验
  var form = layui.form
  form.verify({
    repass: function  (value,item) {
      var passVal = $('.pass').val()
      if (passVal !== value) {
        $('.myForm .pass').val('')
        $('.myForm .repass').val('')
        return '两次输入的密码不一致'
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\d]{6,12}$/, '密码必须6到12位数字，且不能出现空格'],
  })
  // 重置密码
  $('.myForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function  (info) {
        var layer =layui.layer
        layer.msg(info.message)
        if (info.status !== 0) {
          $('.myForm').get(0).reset()
        }
      }
    })
  })
})
