$(function () {
    $(".nav li").hover(function () {

        $(this).children("ul").stop().slideToggle(500)

    })
    var swiper = new Swiper(".mainBanner", {
        loop: true,
        effect:'fade',

        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",

        },
        breakpoints: { //반응형 조건 속성
            640: { //640 이상일 경우
                slidesPerView: 1, //레이아웃 2열
            },
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            },
        }
    });


    //프리미엄 미니펫
    //현재보여지는 배너가 누구인지 체크할 변수 만들기
    let sNum = 0;
    let count = 4;
    //배너 하나의 너비값을 저장할 변수 만들기
    let liWidth = $(".banner>li").outerWidth();
    console.log(liWidth);
    //복사전 배너의 개수
    let liCount = $(".banner>li").length;
    //배너의 앞에서 두개를 복사하여 배너의 마지막에 붙이기
    let objFirst = $(".banner>li:lt(4)").clone();
    $(".banner").append(objFirst);
    //복사후의 li의 개수
    let copyCount = $(".banner>li").length;
    console.log(copyCount);
    let bannerWidth ;
    function moveBanner() {
        $(".banner").stop().animate({
            "margin-left": -sNum * liWidth
        }, 2000)
        console.log(sNum)
    }

    function bannerInit() {
        wWidth = $(window).width();
        sNum=0;
        $(".banner").css("margin-left", sNum);
        
        if (wWidth > 767) {
            count = 4;
        }
        else {
            count = 2;
        }
        //부모의 너비는
        bannerWidth = 100 * copyCount / count;
        $(".banner").outerWidth(bannerWidth + "%");
        liWidth = 100 / copyCount
        $(".banner>li").outerWidth(liWidth + "%");
        liWidth = $(".banner>li").outerWidth();
    }

    bannerInit();

    $(window).on("resize", function () {
        bannerInit();
    })
    // 샐럽
    $(".rightBtn").on("click", function () {
        if (sNum >= liCount) {
            sNum = 0;
            $(".banner").css("margin-left", sNum);
        }
        sNum++;
        moveBanner();
    })

    $(".leftBtn").on("click", function () {
        if (sNum <= 0) {
            sNum = liCount;
            $(".banner").css("margin-left", -liWidth * liCount)
        }
        sNum--;
        moveBanner();
    })


    let timer = setInterval(() => {
        $(".rightBtn").trigger("click");
    }, 5000);


    $("#mainBanner").on({
        "mouseenter": function () {
            clearInterval(timer);
        },
        "mouseleave": function () {
            timer = setInterval(() => {
                $(".rightBtn").trigger("click");
            }, 5000);
        }
    })
   
        //ham버튼을 클릭하면 x바뀌면서 #nav가 나오도록
        //다시 클릭하면 ham으로 변경되면서 #nav가 들어가도록
        $(".hamBtn>a").click(function (e) {
            e.preventDefault();
    
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                // $("#nav").css("left","-100%");
                $("#nav").stop().animate({ "left": "-100%" }, 300);
            }
            else {
                $(this).addClass("active");
                // $("#nav").css("left","0");
                $("#nav").stop().animate({ "left": 0 }, 300)
            }
        })
    
        //내가 active클래스를 가지고 있는지 체크해서 없으면 active클래스를 주고, 형제로 있는 li는 active클래스가 제거되도록, 있을면 active 제거하도록
    
        //#nav>li를 자식인 sub를 보이고,
        //형제의 자식인 sub는 닫히고   
    
        $("#nav>li>a").click(function () {
            if($(this).hasClass("active")){
                $(this).removeClass("active").next(".sub").css("display","none")
            }
            else{
                $("#nav>li>a").removeClass("active").next().css("display","none");
                $(this).addClass("active").next(".sub").css("display","block");
                // $(this).parent().siblings().children("a").removeClass("active").next().css("display","none");
            }
        })
        $(document).ready(function () {
            $('.carousel').slick({
                slidesToShow: 3,
                dots: true,
                centerMode: true,
                responsive: [ 
                    {
                        breakpoint: 960, 
                        settings: {
                           
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768, 
                        settings: {
                         
                            slidesToShow: 1
                        }
                    }
                ]

            });
        });
    })












