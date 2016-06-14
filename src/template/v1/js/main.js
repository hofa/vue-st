$(function() {
	var screenHeight = $(window).height();
	var documentHeight = $(document).height();
	var header = $("#header");
	var footer = $("#footer");
	var banner = $(".banner");
	var bodyHeight = screenHeight-banner.height();

	var nav = $(".nav");
	var navW = 180;
	console.log(screenHeight);
	nav.css({"height":screenHeight});
	nav.find('.mask').css({"height":screenHeight});
	//nav.find('.navlist').css({"height":screenHeight});
	$('.register').css({"height":bodyHeight-10});
	$('.login').css({"height":bodyHeight-10});
	$('#aboutus').css({"height":bodyHeight-10});



	if (documentHeight <= screenHeight) {
		$('#aboutus').find('#footer').css({"position":"absolute", "bottom":0})
	}

	/*绑定菜单按钮*/
	$(".btn-show").on("click", function(event) {
		nav.animate({right:'0px'}, 300);
	});
	$(".btn-close").on("click", function(event) {
		nav.animate({right:'-'+navW+'px'}, 300);
	});

	/*绑定导航*/
	nav.find(".navlist").find('li').on('click', function(event) {
		$(this).addClass('on').siblings().removeClass('on');
		var pageId = $(this).attr('data-page-id')// 获得导航ID
		nav.animate({right: '-'+navW+'px'}, 300);

		switch (pageId) {
			case '0':
				console.log(pageId);
				window.location.href="/index.html";
				break;
			case '1':
				window.location.href="/apply/apply.html";
				break;
			case '2':
				window.location.href="/center/mine.html";
				break;
			case '3':
				window.location.href="/guide/guide.html";
				break;
			case '4':
				window.location.href="/aboutus/aboutus.html";
				break;
			default:
				console.log('error:'+pageId);
		}
	});
	/*个人中心导航事件绑定*/
	var catalog = $("#catalog");
	catalog.find(".cataloglist").find('li').on('click', function(event) {
		$(this).addClass('on').siblings().removeClass('on');
		var pageId = $(this).attr('data-page-id');// 获得个人中心导航ID
		console.log(pageId);
		$('#mine-title').removeClass('open');
		$('#catalog').removeClass('open');

		switch (pageId) {
			case '20':
				window.location.href="mine.html";
				break;
			case '21':
				window.location.href="progress.html";
				break;
			case '22':
				window.location.href="gains.html";
				break;
			case '23':
				window.location.href="profile.html";
				break;
			case '24':
				window.location.href="mycode.html";
				break;
			case '221':
				window.location.href="mall.html";
				break;
			case '222':
				window.location.href="points.html";
				break;
			case '223':
				window.location.href="record.html";
				break;
			default:
				console.log('error:'+pageId);
		}
	});

	$('#mine-title').click(function() {
		var cls = $(this).attr('class');
		if (cls == 'open') {
			$(this).removeClass('open');
			$('#catalog').removeClass('open');
		} else {
			$(this).addClass('open');
			$('#catalog').addClass('open');
		}
	});
	
	$('#back-to-top').bind("click",function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});
	
	$(window).scroll(function(){
		if ($(window).scrollTop() > (screenHeight/2)){
			$("#back-to-top").fadeIn();
		} else {
			$("#back-to-top").fadeOut();
		}
	});


});
