$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 2. 弹出选择文件的窗口
  // 2.1 给上传按钮注册事件
  $('.btn-upload').on('click', function () {
    // 2.2 弹出选择文件的窗口
    $('#avatar').click()
  })
  // 3. 预览待上传的图片
  // 3.1 给文件按钮注册change事件
  $('#avatar').on('change', function () {

    // 3.2 获取待上传的图片
   var avatar = this.files[0]

    // 3.3 生成一个链接
    var imgUrl = URL.createObjectURL(avatar)

    // 3.4 显示到img标签内
    $('#image')
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', imgUrl)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域

  })
})
