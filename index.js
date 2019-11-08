let logModal = (function () {
    let tab = function (id) {
        let $gameNews_nav = $(id);
        let $demo = $gameNews_nav.find('.news_nav-i a');
        let $slide_item = $gameNews_nav.find('.slid-w .cba');
        $demo.on('mouseenter', function () {
            let n = $(this).index();
            $slide_item.eq(0).show().siblings().hide();
            $demo.eq(n).addClass('on').siblings().removeClass('on');
            $slide_item.eq(n).show().siblings().hide();
        })
    };
    let upDown = function () {
        let $container = $('.NIT_top_ad'),
            $wrapper = $container.find('.swiper');

        let n = 0,
            Interval = 4000,
            aotuTimer = null;
        aotuTimer = setInterval(aotuMove, Interval)

        function aotuMove() {
            n++;
            if (n >= 3) {
                $wrapper.css('top', 0);
                n = 1;
            }
            $wrapper.stop().css({
                opacity: 0
            }).animate({
                top: -n * 54,
                opacity: 1
            }, 900)
        }
    }
    let move = function (id) {
        let $oDiv = $(id);
        $oDiv.on('mouseenter', function moveIn(e) {
            var resL = Math.abs(e.pageX - $oDiv.offset().left), //距离左边
                resT = Math.abs(e.pageY - $oDiv.offset().top), //距离上边
                resR = Math.abs(e.pageX - ($oDiv.offset().left + $oDiv.outerWidth())), //距离右边
                resB = Math.abs(e.pageY - ($oDiv.offset().top + $oDiv.outerHeight())); //距离下边
            var min = Math.min(resL, resB, resR, resT);
            let $oMask = $(this).find('.mask');
            //console.log(resL, resB, resR, resT, min);
            if (min === resL) {
                console.log('左边移入');
                $oMask.css({
                    left: -$oDiv.outerWidth()
                }).animate({
                    left: 0,
                    opacity: 1
                }, 400)
            } else if (min === resT) {
                //    console.log('上边移入');
                $oMask.css({
                    top: -$oDiv.outerHeight()
                }).animate({
                    top: 0,
                    opacity: 1
                }, 400)
            } else if (min === resR) {
                // console.log('右边移入');
                $oMask.css({
                    left: $oDiv.outerWidth()
                }).animate({
                    left: 0,
                    opacity: 1
                }, 400)
            } else {
                //    console.log('下边移入');
                $oMask.css({
                    top: $oDiv.outerHeight()
                }).animate({
                    top: 0,
                    opacity: 1
                }, 400)
            }
        })
        $oDiv.on('mouseleave', function moveOut(e) {
            var resL = Math.abs(e.pageX - $oDiv.offset().left), //距离左边
                resT = Math.abs(e.pageY - $oDiv.offset().top), //距离上边
                resR = Math.abs(e.pageX - ($oDiv.offset().left + $oDiv.outerWidth())), //距离右边
                resB = Math.abs(e.pageY - ($oDiv.offset().top + $oDiv.outerHeight())); //距离下边
            var min = Math.min(resL, resB, resR, resT);
            let $oMask = $(this).find('.mask');
            //console.log(resL, resB, resR, resT, min);
            if (min === resL) {
                // console.log('左边移出');
                $oMask.animate({
                    left: -$oDiv.outerWidth()
                }, 400).animate({
                    left: 0,
                    opacity: 0
                }, 1)
            } else if (min === resT) {
                //console.log('上边移出');
                $oMask.animate({
                    top: -$oDiv.outerHeight()
                }, 400).animate({
                    top: 0,
                    opacity: 0
                }, 1)
            } else if (min === resR) {
                //console.log('右边移出');
                $oMask.animate({
                    left: $oDiv.outerWidth()
                }, 400).animate({
                    left: 0,
                    opacity: 0
                }, 1)
            } else {
                //console.log('下边移出');
                $oMask.animate({
                    top: $oDiv.outerHeight()
                }, 400).animate({
                    top: 0,
                    opacity: 0
                }, 1)
            }
        })
    }
    let piano = function () {
        let $group = $('.hand-piano .group-box'),
            $olis = $('.slide-jy li');
        $group.click(function () {
            $(this).addClass('on').siblings().removeClass('on')
        })
        $olis.mouseenter(function () {
            $(this).addClass('on').siblings().removeClass('on')
        })
    }   
    let change = function(){
        let $come_point = $('.come_point');
        $come_point.mouseenter(function(){
            $(this).addClass('cur');
        })
        $come_point.mouseleave(function(){
            $(this).removeClass('cur');
        })
    }
    return {
        tab,
        upDown,
        move,
        piano,
        change
    }
})();

let bannerMoudle = (function () {
    let idSelector = '';
    let $box = null,
        $container = null,
        $containerQ = null,
        $sildeT = null,
        $footer = null,
        $spanL = null,
        $wriper = null,
        $silde = null,
        $span = null,
        $click = null;

    let n = 0,
        Interval = 2000,
        aotuTimer = null;
    //节流
    function throttle(fn, wait = 300) {
        let timer = null
        return function () {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, ...arguments)
            }, wait)
        }
    }
    //获取元素
    function initEle(id) {
        $box = $(id);
        $container = $('.container');
        $containerQ = $('.container-1');
        $sildeT = $containerQ.find('.silde-1');
        $footer = $containerQ.find('footer');
        $spanL = $containerQ.find('span');
        $wriper = $container.find('.wriper');
        $silde = $container.find('.silde');
        $span = $container.find('span');
        $click = $box.find('a');
        $silde.eq(0).siblings().hide();
    }
    //自动轮播   
    function autoMove() {
        aotuTimer = setInterval(move, Interval)
    }
    function move() {
        n++;
        if (n >= $silde.length) {
            n = 0;
        }
        $silde.eq(n).css({
            opacity: 0
        }).show().animate({
            opacity: 1
        }, 300).siblings().animate({
            opacity: 0
        }, 300, function () {
            $silde.eq(n).siblings().hide()
        })
    }
    //绑定事件
    function evenBind() {
        $container.on('mouseenter', function () {
            clearInterval(aotuTimer)
        })
        $container.on('mouseleave', function () {
            autoMove();
        })
        $span.on('mouseenter', throttle(function () {
            let index = $(this).index();
            n = index;
            n--;
            move();
            $span.eq(n).addClass('active').siblings().removeClass('active')
        }))
        $click.on('click', function (e) {
            let tar = e.target || e.srcElement;
            if (tar.nodeName.toLowerCase() === 'a') {
                if (tar.getAttribute('type') === 'ok') {
                    $(this).addClass('on').siblings().removeClass('on')
                    $container.css({
                        display: 'block'
                    });
                    $containerQ.css({
                        display: 'none'
                    })
                } else {
                    $container.css({
                        display: 'none'
                    });
                    $containerQ.css({
                        display: 'block'
                    });
                    $(this).addClass('on').siblings().removeClass('on');
                }
            }
        })
        $spanL.on('mouseenter', function () {
            let n = $(this).index();
            $sildeT.eq(n).show().siblings().hide()
            $spanL.eq(n).addClass('active').siblings().removeClass('active')
        })
    }

    return {
        init(id) {
            idSelector = id;
            initEle(id);
            autoMove();
            evenBind();
        }
    }
})();
bannerMoudle.init('#box')
logModal.move('#outer')
logModal.move('.jy-img')
logModal.move('.wf1')
logModal.move('.wf2')
logModal.move('.wf3')
logModal.move('.wf4')
logModal.move('.wf5')
logModal.move('.wf6')
logModal.move('.wf7')
logModal.move('.wf8')
logModal.tab('.news_box03')
logModal.tab('.news_box04')
logModal.tab('.news_box05')
logModal.tab('.news_box06')
logModal.upDown()
logModal.piano()
logModal.change()