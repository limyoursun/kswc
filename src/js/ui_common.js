$(function () {
  // 20211201 적용 캘린더 변경으로 인한 수정 -- S
  /*calendar*/
  // 시간까지
  $.datetimepicker.setLocale('kr');
  $('.datetimepicker').datetimepicker();
// 시간제외
  $.datetimepicker.setLocale('kr');
  $('.datepicker').datetimepicker({
    format: 'Y/m/d',
    timepicker: false
  });
// 시작 날짜
  $('#date_timepicker_start').datetimepicker({
    format: 'Y/m/d',
    onShow: function (ct) {
      this.setOptions({
        maxDate: $('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
      })
    },
    timepicker: false
  });
// 종료 날짜
  $('#date_timepicker_end').datetimepicker({
    format: 'Y/m/d',
    onShow: function (ct) {
      this.setOptions({
        minDate: $('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : false
      })
    },
    timepicker: false
  });
  // 20211201 적용 캘린더 변경으로 인한 수정 -- E

  // tab
  var tab_conts = $('.tab_conts'),
    tab_list = $('.tab_list'),
    tab_btn = $('.tab_list li');

  tab_conts.find('.tab_cont').hide();
  tab_conts.find('.tab_cont:first').show();
  tab_list.find('li:first').find('a').addClass('on');
  tab_btn.on('click', 'a', function (e) {
    e.preventDefault();
    var getId = $(this).prop('href').split('#')[1];
    $(this).parents('.tab').next('.tab_conts').find('.tab_cont').hide();
    $(this).parents('.tab_list').find('a').removeClass('on');
    $(this).addClass('on');
    $('#' + getId).show();
  });

  // pop
  var popBtn = $('[openpop]');
  popBtn.on('click', function () {
    var target = $(this).attr('openpop');
    $('#' + target).show();
  })

  $('.btn_pop_close').on('click', function () {
    $(this).parents('.pop_overlay').hide();
  })

  $('.con_list .more').on('click', function () {
    $(this).toggleClass('on');
    $(this).parent('p').nextAll('ul').slideToggle('fast');
  })

  function gnb() {
    var lm = $("#gnb");
    lm.a = lm.find(">li>a");
    lm.dep2 = lm.find(">li>ul");
    lm.dep2.a = lm.dep2.find(">li>a");
    lm.dep2.hide();
    lm.a.each(function () {
      if (!$(this).next().length) {
        $(this).addClass("empty");
      }
      if ($(this).hasClass("on")) {
        $(this).next("ul").show();
      }
    });
    lm.a.on("click", function () {
      lm.a.removeClass("on");
      if ($(this).next("ul").is(":hidden")) {
        lm.dep2.slideUp("fast");
        $(this).next("ul").slideDown("fast");
      } else {
        $(this).removeClass("on");
        $(this).next("ul").slideUp("fast");
      }
      // 클릭 후 슬라이드
      var url = $(this).attr("href");
      if ($(this).next("ul").is("ul")) {
        $(this).addClass('on');
        $(this).next("ul").slideDown("fast", function () {
          document.location.href = url;
        });
      } else if ($(this).next("ul").not("ul")) {
        lm.dep2.slideUp('fast');
        $(this).addClass("on");
        setTimeout(function () {
          document.location.href = url;
        }, 200);
      }
      return false;
    });
  }
  gnb();

  // sortable
  $(function () {
    $("#sortable1, #sortable2").sortable({
      connectWith: ".tasklist"
    }).disableSelection();
  });
})

// editor(summernote)
$('#summernote').summernote({
  height: 200,
  width: 1400,
  minHeight: null,
  maxHeight: null,
  lang: "ko-KR",
  focus: true,
  toolbar: [
    ['fontsize', ['fontsize']],
    ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
    ['color', ['forecolor', 'color']],
    ['table', ['table']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']],
    ['insert', ['picture']]
  ],
  fontSizes: ['9', '10', '12', '14', '16', '18', '20', '30', '32']
});

// editor(summernote)
$('.summernote_pop').summernote({
  height: 200,
  width: 650,
  minHeight: null,
  maxHeight: null,
  lang: "ko-KR",
  focus: true,
  toolbar: [
    ['fontsize', ['fontsize']],
    ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
    ['color', ['color']],
    ['table', ['table']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']],
    ['insert', ['picture']]
  ],
  fontSizes: ['9', '10', '12', '14', '16', '18', '20', '30', '32']
});

// p_common02_1 select
$(".checkbox_group").on("click", ".contactAll", function () {
  $(this).parents(".checkbox_group").find('input').prop("checked", $(this).is(":checked"));
});
$(".checkbox_group").on("click", ".normal", function () {
  var is_checked = true;
  $(".checkbox_group .normal").each(function () {
    is_checked = is_checked && $(this).is(":checked");
  });
  $(".contactAll").prop("checked", is_checked);
});

// main board hide/show button
$('.btn_open').on('click', function () {
  $(this).toggleClass('on');
  $(this).parent('.tit').next('.list_depth2').slideToggle();
})

$('.btn_treeclose').on('click', function () {
  $(this).parent('.step_top').children('.btn_tree').toggleClass('on');
  $(this).parent('.step_top').next('.flex_wrap').find('.btn_open').removeClass('on');
  $(this).parent('.step_top').next('.flex_wrap').find('.tit').next('.list_depth2').slideUp();
})
$('.btn_treeopen').on('click', function () {
  $(this).parent('.step_top').children('.btn_tree').toggleClass('on');
  $(this).parent('.step_top').next('.flex_wrap').find('.btn_open').addClass('on');
  $(this).parent('.step_top').next('.flex_wrap').find('.tit').next('.list_depth2').slideDown();
})

// main board slide
var banList = $('.board_list'),
  banW = banList.children('li').outerWidth(),
  banLength = banList.children('li').length,
  preB = $('.list_prev'),
  nxtB = $('.list_next'),
  presentLoc = 0,
  itemLengPage = 1,
  maxNum = banLength / itemLengPage - 1,
  presentNum = 0;
console.log(banLength);

initBan();
function initBan() {
  banList.width(banW * banLength);
  preB.removeClass('on').attr('disabled', true);
  (banLength <= itemLengPage) ? preB.removeClass('on').attr('disabled', true) : nxtB.addClass('on').attr('disabled', false);
  presentNum = 0;
  presentLoc = 0;
  banList.animate({ left: presentLoc })
}

preB.on('click', function () {
  preMove();
})
nxtB.on('click', function () {
  nxtMove();
})

function preMove() {
  if (presentNum <= 0) return;
  nxtB.addClass('on').attr('disabled', false);
  presentNum -= 1;
  presentLoc = presentLoc + (banW * itemLengPage);
  banList.animate({ left: presentLoc });
  if (presentNum <= 0) preB.removeClass('on').attr('disabled', true);
}
function nxtMove() {
  if (presentNum >= maxNum) return true;
  preB.addClass('on').attr('disabled', false);
  presentNum += 1;
  presentLoc = presentLoc - (banW * itemLengPage);
  banList.animate({ left: presentLoc });
  if (presentNum >= maxNum) nxtB.removeClass('on').attr('disabled', true);
}

var el = $('textarea');
function textareaAutoHeight(el) {
  setTimeout(() => {
    el.style.height = 'auto';
    let scrollHeight = el.scrollHeight;
    let outlineHeight = el.offsetHeight - el.clientHeight;
    el.style.height = (scrollHeight + outlineHeight) + 'px';
  }, 0);
}

// textarea auto height
$('textarea').each(function () {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

$("textarea").on('keydown keyup', function () {
  $(this).parents('tr').children('td').children('textarea').height(1).height($(this).prop('scrollHeight' + 0) + 'px');
  var noneSelectTextarea = $(this).parent('td').siblings('td').children('textarea');
  var meHeight = $(this)[0].scrollHeight;
  var youHeight = noneSelectTextarea[0].scrollHeight;
  if (meHeight < youHeight) {
    $(this).height(1).height(youHeight + 1);
    noneSelectTextarea.height(1).height(youHeight + 1);
  } else {
    $(this).height(1).height(meHeight + 1);
    noneSelectTextarea.height(1).height(meHeight + 1);
  }
});