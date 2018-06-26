/**
 * Created by Administrator on 2018/6/25.
 */
$(function(){
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//成功时候显示图标
      invalid: 'glyphicon glyphicon-remove',//失败时显示图标
      validating: 'glyphicon glyphicon-refresh'//检验过程中显示的图标
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min: 2,
            max: 6,
            message:"用户名长度必须在2-6位"
          },
          callback:{
            message:"用户名错误"
          }
        },

      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min: 6,
            max: 12,
            message:"密码长度为6-12位"
          },
          callback:{
            message:"密码错误"
          }
        },

      }
    }
  })
  $("[type=reset]").click(function(){
    $("#form").data("bootstrapValidator").resetForm()
  });


//添加进度条功能
  $("#form").on('success.form.bv', function (e) {
    //阻止表单的默认提交方式
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:"/employee/employeeLogin",
      type:"post",
      datatype:"json",
      //利用表单序列化进行提交表单
      data:$("#form").serialize(),
      success:function(info){
       //接收返回值
        //检验表单元素,如果返回的info.success是true ,则跳转到首页
        if (info.success){
          location.href="index.html"
        };
        //检验用户名,如果失败返回error,判断是否等于1000
        if (info.error===1000){
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        };
        //检验密码,如果失败返回error,判断是否等于1001
        if (info.error===1001){
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }
        }
    })
  });
  //全局变量ajaxStart表示当有ajax开始时触发,ajaxStop表示当ajax结束时候触发
  $(document).ajaxStart(function(){
    NProgress.start()
  });
  $(document).ajaxStop(function(){
    NProgress.done()
  });
})