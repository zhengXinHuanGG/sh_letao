/**
 * Created by Administrator on 2018/6/25.
 */
$(function(){
  $.ajax({
    url:"/employee/checkRootLogin",
    type:"get",
    datatype:"json",
    success:function(info){
      if (info.error===400){
        location.href="login.html"
      }
    }
  })


  //全局变量ajaxStart表示当有ajax开始时触发,ajaxStop表示当ajax结束时候触发
  $(document).ajaxStart(function(){
    NProgress.start()
  });
  $(document).ajaxStop(function(){
    NProgress.done()
  });


  $(".lt_aside .category").click(function() {
    $(".lt_aside .child").slideToggle()
  })
//点击按钮,左侧侧栏隐藏,并且右侧主体部分铺满整个屏幕
  $(".lt_up .icon_menu").click(function(){
    $(".lt_aside").toggleClass("hidemenu")
    $(".lt_up").toggleClass("hidemenu")
    $(".lt_main").toggleClass("hidemenu")
  })
  $(".lt_up .pull-right").click(function(){
    $("#myModal").modal("show")
  })
  //点击模态框额退出按钮,通过发送ajax请求返回数据跳转到登录页面
  $(".lt_exit").click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      datatype:"json",
      success:function(info){
        if (info.success){
          location.href="login.html"
        }
      }
    })
  })
  //$("#form").on('success.form.bv', function (e) {
  //  //阻止表单的默认提交方式
  //  e.preventDefault();
  //  //使用ajax提交逻辑
  //  $.ajax({
  //    url:"/employee/employeeLogin",
  //    type:"post",
  //    datatype:"json",
  //    //利用表单序列化进行提交表单
  //    data:$("#form").serialize(),
  //    success:function(info){
  //      //接收返回值
  //      //检验表单元素,如果返回的info.success是true ,则跳转到首页
  //      if (info.success){
  //        location.href="index.html"
  //      };
  //      //检验用户名,如果失败返回error,判断是否等于1000
  //      if (info.error===1000){
  //        $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
  //      };
  //      //检验密码,如果失败返回error,判断是否等于1001
  //      if (info.error===1001){
  //        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
  //      }
  //    }
  //  })
  //});

})