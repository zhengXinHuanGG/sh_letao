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
      var htmlStr=template("tmp1",info)
      $(".dropdown-menu").html(htmlStr)
    }

  })
})
  $(".second_select").on("click","p",function(){
      var txt=$(this).text()
    $(".second_select_text").text(txt)
    var id=$(this).data("id")
    console.log(id)
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
      $(".second_form_img").attr("src",pic)
      $(".brandLogo").val(pic)
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
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      datatype:"json",
      data:$("#form").serialize(),
      success:function(info){
        if (info.success){
          $("#myModal2").modal("hide")
          currentPage=1
          render()
          $("#form").data('bootstrapValidator').resetForm(true)
          $(".second_form_img").attr("src","images/none.png")
          $(".second_select_text").text("请选择一级分类")
        }
      }
    })
  })
})