/**
 * Created by Administrator on 2018/6/26.
 */
$(function(){
  var currentPage=1
  var pageSize=5
  render()
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      datatype:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        var htmlStr=template("tmp",info)
        $("tbody").html(htmlStr)

      //  分页初始化
        $('#paginator').bootstrapPaginator({
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
  $(".mb_20").on("click",function(){
    $("#myModal2").modal("show")


    //  给模态框添加按钮添加点击事件
    $('#form').on("success.form.bv", function( e ) {
      e.preventDefault();
      $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        datatype:"json",
        data:$("#form").serialize(),
        success:function(info){
          if (info.success){
            $("#myModal2").modal("hide")
            render()
            $("#form").data("bootstrapValidator").resetForm(true)
          }
        }
      })


    })
  })
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//成功时候显示图标
      invalid: 'glyphicon glyphicon-remove',//失败时显示图标
      validating: 'glyphicon glyphicon-refresh'//检验过程中显示的图标
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
        },
      },
    }
  })
})