$(function  ( ) {
  // 获取文章分类列表
  $.ajax({
    url: '/my/article/cates',
    success: function  (info) {
      if (info.status === 0) {
        var htmlStr = template('categoryList',info)
        $('tbody').html(htmlStr)
      }
    }
  })
})