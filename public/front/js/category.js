/**
 * Created by Administrator on 2018/6/29.
 */
$(function(){

  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    datatype:"json",
    success:function(info){
      var  htmlStr=template("tmp",info)
      $(".lt_category_left ul").html(htmlStr)
      renderSecondById(info.rows[0].id)
    }
  })
  $(".lt_category_left ul").on("click","a",function(){
    var id=$(this).data("id")
    $(this).addClass("current").parent().siblings().find("a").removeClass("current")
    renderSecondById(id)
  })
  function renderSecondById(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      datatype:"json",
      data:{
        id:id
      },
      success:function(info){
        console.log(info)
        var  htmlStr=template("tmp1",info)
        $(".lt_category_right ul").html(htmlStr)
      }
    })
  }
})