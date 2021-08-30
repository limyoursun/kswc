$(function () {
  $("#tabs").tabs();
  $('.damage_press>li').click(function () {
    $('.damage_press>li').removeClass('on');
    $(this).addClass('on');
  })

  $('.damage_press>li').click(function () {
    $('.damage_press>li').children('ul').slideUp('fast');
    $(this).children('ul').slideDown('fast');
    $('.damage_press>li').removeClass('on');
    $(this).addClass('on');
  })
})
