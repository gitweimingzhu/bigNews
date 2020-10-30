$(function () {
  //1.获取文章分类列表
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

  // 2.新增文章分类
  $('.btn-add').on('click', function () {
    window.addIndex = layer.open({
      type: 1,
      title: '添加文章分类',
      content: $('#addCteTmp').html(),
      area: '500px',
    })
  })

  // 3.表单校验
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

  // 4.文章分类之添加分类
  // 4.1注意：整个表单都是通过模板引擎创建的，所以需要注册委托事件
  $('body').on('submit', '.myForm', function (e) {
    // 4.2 阻止默认行为
    e.preventDefault()
    // 4.3 发送ajax请示
    $.ajax({
      type: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (info) {
        // 4.4 添加成功后要关闭弹窗
        if (info.status === 0) {
          layer.close(window.addIndex)
          // 4.5 重新渲染分类列表
          renderTable()
        }
      },
    })
  })

  // 5. 删除文章分类
  // 5.1 使用委托的方式给删除按钮注册事件
  $('tbody').on('click', '.btn-del', function () {
    // 5.2 获取要删除的文章分类的id
    // var id = $(this).attr('data-id')
    var id = $(this).data('id')
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url: '/my/article/deletecate/' + id,
        success: function (info) {
          if (info.status === 0) {
            layer.msg(info.message)
            renderTable()
          }
        },
      })
      layer.close(index)
    })
  })

  // 6. 编辑文章分类之数据回显
  // 6.1给编辑按钮注册委托事件
  $('tbody').on('click', '.btn-edit', function () {
    // 6.2 获取要编辑的文章分类的id
    var id = $(this).data('id')
    // 6.3 弹出模态框
    window.editIndex = layer.open({
      type: 1,
      title: '修改文章分类',
      content: $('#editCteTmp').html(),
      area: '500px',
    })
    // 6.4 数据回显
    $.ajax({
      url: '/my/article/cates/' + id,
      success: function (info) {
        if (info.status === 0) {
          //给表单赋值
          var form = layui.form
          form.val('formTest', info.data)
        }
      },
    })
  })
  //7.更新文章分类
  // 7.1 通过委托的方式给确定按钮注册事件
  $('body').on('submit','.editForm',function  (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function  (info) {
        if (info.status === 0) {
          layer.close(window.editIndex)
          renderTable()
        }
      }
    })
  })
})
