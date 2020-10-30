$(function () {
  // 获取文章分类列表
  renderTable()
  function renderTable() {
    $.ajax({
      url: '/my/article/cates',
      success: function (info) {
        if (info.status === 0) {
          var htmlStr = template('categoryList', info)
          $('tbody').html(htmlStr)
        }
      },
    })
  }

  // 新增文章分类
  $('.btn-add').on('click', function () {
    window.addIndex = layer.open({
      type: 1,
      title: '添加文章分类',
      content: $('#addCteTmp').html(),
      area: '500px',
    })
  })

  // 表单校验
  var form = layui.form
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'"
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字'
      }
    },
  })

  //  文章分类之添加分类
  // 注意：整个表单都是通过模板引擎创建的，所以需要注册委托事件
  $('body').on('submit', '.myForm', function (e) {
    // 4.2 阻止默认行为
    e.preventDefault()
    // 4.3 发送ajax请示
    $.ajax({
      type: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (info) {
        console.log(info)
        // 4.4 添加成功后要关闭弹窗
        if (info.status === 0) {
          layer.close(window.addIndex)
          // 4.5 重新渲染分类列表
          renderTable()
        }
      },
    })
  })
})
