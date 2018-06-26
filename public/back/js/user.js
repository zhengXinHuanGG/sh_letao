/**
 * Created by Administrator on 2018/6/26.
 */


$(function(){
  //查询后台数据渲染页面
  //申明一个变量表示当前页面
  var currentPage = 1;
  //申明一个变量表示每页的数据数量
  var pageSize = 5;
  render()
function render(){
  $.ajax({
    type:"get",
    url:"/user/queryUser",
    datatype:"json",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function(info){
      //模板引擎渲染页面
      console.log(info)
      var htmlStr=template("tmp",info)
      $("tbody").html(htmlStr)

//分页功能实现
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage=page

          render()
        }
      });
    }
  })


  //模态框功能实现
$("tbody").on("click",".btn",function(){
  $("#myModal2").modal("show")
console.log($(this))
  var id=$(this).parent().data("id")
  console.log(id)
  var isDelete=$(this).hasClass("btn-danger")?0:1;

//给模态框的确认按钮添加点击事件
  //需要注意的是,因为页面有俩个模态框,所有点击事件有重叠,所以需要先清除原有的点击事件,再给当前按钮添加事件
  $('#myModal2 [type="submit"]').off("click").on("click",function(){
    //发送ajax请求后台修改数据
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      datatype:"json",
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(info){
        //隐藏模态框
        $("#myModal2").modal("hide")
        //重新渲染页面
        render()
      }
    })
  })
})

  }


})
