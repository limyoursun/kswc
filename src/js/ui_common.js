$(function () {
  /*calendar*/
  $.datepicker.setDefaults({
    buttonImageOnly: true,
    showOn: "both",
    buttonImage: "../images/btn_calendar.png",
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    regional: ["ko"],
    dateFormat: "yy-mm-dd"
  });
  $("[dataformat='datepic']").datepicker({
    buttonText: "날짜를 선택해주세요."
  });
  var from = $("[dataformat='from']").datepicker({
    buttonText: "시작날짜를 선택해주세요.",
    onClose: function (selectedDate) {
      var getName = $(this).attr('name');
      $("input[name='" + getName + "'].to").datepicker("option", "minDate", selectedDate);
    }
  });
  var to = $("[dataformat='to']").datepicker({
    buttonText: "종료날짜를 선택해주세요.",
    onClose: function (selectedDate) {
      var getName = $(this).attr('name');
      $("input[name='" + getName + "'].from").datepicker("option", "maxDate", selectedDate);
    }
  });

  // pop
  var popBtn = $('[openpop]');
  popBtn.on('click', function () {
    var target = $(this).attr('openpop');
    $('#' + target).show();
  })
  var closePop = $('.btn_pop_close');
  closePop.on('click', function () {
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
  fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '30', '36', '50', '72']
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
    ['color', ['forecolor', 'color']],
    ['table', ['table']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']],
    ['insert', ['picture']]
  ],
  fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '30', '36', '50', '72']
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