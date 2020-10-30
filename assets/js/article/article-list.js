$(function () {
  // 获取分类名称
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (info) {
      if (info.status === 0) {
        var htmlStr = template('tem', info)
        $('.select').html(htmlStr)
      }
    },
  })
})
