/**
 * Created by Administrator on 2018/6/27.
 */
$(function(){
  var currentPage=1
  var pageSize=5
  render()
  //渲染页面
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      datatype:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template("tmp",info)
        $("tbody").html(htmlStr)


        $("#paginator").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),

          // 给页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 将选中的页码更新到 currentPage
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }

  //给页面添加分类按钮注册点击事件
$("#addBtn").on("click",function(){
    $("#myModal2").modal("show")

//下拉菜单用过ajax请求后台渲染数据
  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    datatype:"json",
    data:{
      page:1,
      pageSize:100
    },
    success:function(info){
      console.log(info)
      //模板引擎渲染
      var htmlStr=template("tmp1",info)
      $(".dropdown-menu").html(htmlStr)
    }

  })
})
  //通过事件委托给下拉菜单所有渲染的数据添加点击事件
  $(".second_select").on("click","p",function(){
    //获取被点击标签的文本,赋值给second_select_text表单元素
      var txt=$(this).text()
    $(".second_select_text").text(txt)
    //获取当前被点击标签的id,赋值给隐藏表单元素categoryId,用于提交给后台
    var id=$(this).data("id")
      $(".categoryId").val(id)
    $("#form").data('bootstrapValidator').updateStatus("categoryId","VALID")

  })
  //利用fileupload插件完成图片上传功能
  //回调函数
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result.picAddr);
      var pic=data.result.picAddr
        //将获取到的图片地址添加给img标签,进行页面渲染
      $(".second_form_img").attr("src",pic)
      //将图片地址赋值给隐藏表单元素,用户提交给后台
      $(".brandLogo").val(pic)
      //表单校验,将当前表单元素的校验状态改为校验成功状态VALID
      $("#form").data('bootstrapValidator').updateStatus("brandLogo","VALID")
    }
  });

//校验表单
  $('#form').bootstrapValidator({

    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      // 品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  
//  提交添加数据,阻止默认提交方式,使用ajax请求数据
  $("#form").on("success.form.bv",function(e){
    //阻止默认表单提交,通过ajax请求提交数据
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      datatype:"json",
      data:$("#form").serialize(),//表单序列化
      success:function(info){
        if (info.success){
          //隐藏模态框
          $("#myModal2").modal("hide")
          currentPage=1
          render()
          //重置表单内容
          $("#form").data('bootstrapValidator').resetForm(true)
          //英文resetform方法只能重置表单元素和检验图标,所有下拉菜单和图片需要我们手动重置
          $(".second_form_img").attr("src","images/none.png")
          $(".second_select_text").text("请选择一级分类")
        }
      }
    })
  })
})