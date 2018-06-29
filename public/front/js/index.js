/**
 * Created by Administrator on 2018/6/29.
 */
$(function(){
  //轮播图初始化
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });

})