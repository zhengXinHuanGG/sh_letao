/**
 * Created by Administrator on 2018/6/27.
 */
$(function(){
  var currentPage=1
  var pageSize=2
  render()
 function render(){
   $.ajax({
     type:"get",
     url:"/product/queryProductDetailList",
     datatype:"json",
     data:{
       page:currentPage,
       pageSize:pageSize
     },
     success:function(info){
       var htmlStr=template("tmp",info)
       $("tbody").html(htmlStr)

       $("#paginator").bootstrapPaginator({
         // 版本号
         bootstrapMajorVersion: 3,

         size:"normal",

         itemTexts:function(type, page, current){
              switch (type){
                case "first":
                  return  "首页";
                case "next":
                  return "下一页";
                case "last":
                  return "尾页";
                case "prev":
                  return "上一页";
                case "page":
                  return page
              }
         },

         tooltipTitles: function( type, page, current) {
           switch( type ) {
             case "first":
               return "首页";
             case "last":
               return "尾页";
             case "prev":
               return "上一页";
             case "next":
               return "下一页";
             case "page":
               return "前往第" + page + "页";
           }
         },
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
         },
         // 使用 bootstrap 样式的提示框组件
         useBootstrapTooltip: true
       })

     }
   })
 }
  $("#addBtn").on("click",function(){
    $("#myModal2").modal("show")
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      datatype:"json",
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info)
        var htmlStr1=template("tmp1",info)
        $(".second_select").html(htmlStr1)
      }

    })
  })
  $(".second_select").on("click","p",function(){
    var txt=$(this).text()
    $(".second_select_text").html(txt)
    var id=$(this).data("id")
    $(".brandId").val(id)
  })


//  发送图片给后台,请求数据
  var picArr=[]
  $("#fileupload").fileupload({
    dataType:"json",

    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var picObj=data.result
      var picAddr=data.result.picAddr
      picArr.unshift(picObj)
      if (picArr.length>3){
        picArr.pop()
        //移除最后一个img标签
        $(".product_form_img img:last-of-type").remove()
      }
      //通过jq的方法prepend()创建子元素放到父元素的第一个位置
      $(".product_form_img").prepend('<img src="'+picAddr+'" width="100">')
      //判断数组中的数据个数,如果数据等于3,说明按要求上传了3张图片,则我们需要手动修改校验的状态
    if (picArr.length===3){
      $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID")
    }
    },

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

    // 配置校验字段
    fields: {
      // 二级分类id, 归属品牌
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      // 商品名称
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 商品库存
      // 要求: 必须是非零开头的数字, 非零开头, 也就是只能以 1-9 开头
      // 数字: \d
      // + 表示一个或多个
      // * 表示零个或多个
      // ? 表示零个或1个
      // {n} 表示出现 n 次
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      // 尺码校验, 规则必须是 32-40, 两个数字-两个数字
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      // 商品价格
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      // 标记图片是否上传满三张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });
  //阻止默认提交方式,通过ajax方式提交给后台
  $("#form").on("success.form.bv",function(e){
    e.preventDefault()
    //通过表单序列化得到表单中提交元素,将把数组中的数据添加到表单序列化后面进行提交
    var params=$("#form").serialize()
    params+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr
    params+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr
    params+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      datatype:"json",
      data:params,
      success:function(info){
        //关闭模态框
        $("#myModal2").modal("hide")
        //清空校验状态和图标
        $("#form").data("bootstrapValidator").resetForm(true)
        //手动清空下拉菜单
        $(".second_select_text").text("请选择二级分类")
        //清空渲染的图片
        $(".product_form_img").html("")
        currentPage=1
        render()
        //重置数组中的数据
        picArr=[]
      }
    })
  })
})