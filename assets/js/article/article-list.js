$(function () {
  // 获取文章分类列表
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (info) {
      if (info.status === 0) {
        var htmlStr = template('categoryList', info)
        $('#category').html(htmlStr)
        // layui中form模块的自动化渲染是会对select radio checkbox失效
        // 更新全部
        layui.form.render()
      }
    },
  })

  // 优化筛选和列表数据的渲染
  // 准备发送给服务器的参数
  var params = {
    pagenum: 1,
    pagesize: 2,
    cate_id: $('#category').val(),
    state: $('#state').val(),
  }
  // 列表页中的列表数据渲染
  renderList()
  // 封装渲染文章列表的数据
  function renderList() {
    $.ajax({
      type: 'GET',
      url: '/my/article/list',
      data: params,
      success: function (info) {
        if (info.status === 0) {
          var htmlStr = template('articleList', info)
          $('tbody').html(htmlStr)
          // 启用分页
          renderPage(info)
        }
      },
    })
  }

  // 实现筛选功能
  $('.myForm').on('submit', function (e) {
    e.preventDefault()
    // 修改数据
    params.cate_id = $('#category').val()
    params.state = $('#state').val()
    renderList()
  })

  // 实现分布样式
  function renderPage(info) {
    var laypage = layui.laypage
    //执行一个laypage实例
    laypage.render({
      elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
      count: info.total, //数据总数，从服务端得到
      limit: params.pagesize, // 默认每页显示的条数
      limits: [2, 3, 5, 10],
      curr: params.pagenum, // 默认起始页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip', 'first'],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr) //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit) //得到每页显示的条数

        //首次不执行
        if (!first) {
          //do something
          // 需要给当前页码和每页显示的条数赋值
          params.pagenum = obj.curr
          params.pagesize = obj.limit
          renderList()
        }
      },
    })
  }

  // 给删除按钮注册委托事件
  $('tbody').on('click', '.btn-del', function () {
    // 判断当前页中文章的数量
    var count = $('tbody .btn-del').length
    // 获取当前按钮的id
    var id = $(this).data('id')
    // 弹出提示框
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url: '/my/article/delete/' + id,
        success: function (info) {
          layer.msg(info.message)
          if (info.status === 0) {
            // 删除文章功能的优化
            // 当将最后一页的最后一条数据删除了的时候，此时会有一个bug，就是还停留在最后一页的数据
            if (count === 1) {
              params.pagenum = params.pagenum === 1 ? 1 : params.pagenum - 1
            }
            renderList()
          }
        },
      })
      layer.close(index)
    })
  })

  // 给编辑按钮注册委托事件
  $('tbody').on('click','.btn-edit',function  ( ) {
    var id = $(this).data('id')
    location.href = '../../../article/article-edit.html?id='+ id
  })
})
