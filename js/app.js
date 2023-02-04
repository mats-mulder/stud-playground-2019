window.onload = function () {
    startBarba();
    createCanvas();
    titleDrop();
    startForm();
    startSketch();
    if(document.getElementById("svgHolder") != null){
        loadSVG();
    }
};

function loadSVG(){
    var div = document.getElementById("svgHolder");
    if(div !== null) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "../assets/map.svg", true);
        ajax.send();
        ajax.onload = function (e) {
            div.innerHTML = ajax.responseText;
            const load = document.getElementById("loadScreen")
            load.style.opacity = 0;
            load.style.visibility = 'hidden';
            startMap();
            setMapFunction();
        };
    }
}


function startForm(){

    var el = document.getElementById("my-embedded-typeform");

    if(el !== null) {

        window.typeformEmbed.makeWidget(el, "https://matsmulder.typeform.com/to/aZHws1", {
            hideFooter: true,
            hideHeaders: true,
            opacity: 0
        });
    }

};


function startBarba() {
    Barba.Pjax.start();
    var FadeTransition = Barba.BaseTransition.extend({
        start: function () {
            /**
             * This function is automatically called as soon the Transition starts
             * this.newContainerLoading is a Promise for the loading of the new container
             * (Barba.js also comes with an handy Promise polyfill!)
             */

            // As soon the loading is finished and the old page is faded out, let's fade the new page
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function () {
            /**
             * this.oldContainer is the HTMLElement of the old Container
             */

            return $(this.oldContainer).animate({opacity: 0},).promise();
        },

        fadeIn: function () {
            document.getElementsByTagName("body")[0].style.backgroundColor = document.getElementsByClassName("barba-container")[1].style.backgroundColor;
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;

            /**
             * this.newContainer is the HTMLElement of the new Container
             * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
             * Please note, newContainer is available just after newContainerLoading is resolved!
             */
            createCanvas();
            titleDrop();
            var _this = this;
            var $el = $(this.newContainer);

            $(this.oldContainer).hide();

            $el.css({
                visibility: 'visible',
                opacity: 0
            });
           startSketch();
            startForm();
            loadSVG();
            $el.animate({opacity: 1}, 1000, function () {
                /**
                 * Do not forget to call .done() as soon your transition is finished!
                 * .done() will automatically remove from the DOM the old Container
                 */

                _this.done();
            });
        }
    });

    /**
     * Next step, you have to tell Barba to use the new Transition
     */

    Barba.Pjax.getTransition = function () {
        /**
         * Here you can use your own logic!
         * For example you can use different Transition based on the current page or link...
         */

        return FadeTransition;
    };
}



function startSketch(){
    const sketch = document.getElementById("simple_sketch");
    const sketch2 = document.getElementById("simple_sketch2");
    if(sketch !== null){
        setTimeout(function () {
            $('#simple_sketch').sketch();
            if(sketch2 !== null){
                $('#simple_sketch2').sketch();
            }
        },1000);
    }
}

function createCanvas() {
    var style = ['zigzag', 'cross-hatch', 'hachure'];

    $('.canvas').each(function (i, obj) {
        var fill = '#89d1c6';
        obj.style.width = '100%';
        obj.style.height = '108%';
        obj.width = obj.offsetWidth;
        obj.height = obj.offsetHeight;
        if (obj.classList.contains('midPink')) {
            fill = '#f6c0d8'
        } else if(obj.classList.contains('grey')){
            fill='#437971'
        } else if(obj.classList.contains('green')){
            fill='#c8d39f'
        } else if(obj.classList.contains('yellow')){
            fill='#fcf489'
        } else if(obj.classList.contains('lightPink')){
            fill='#f9eef3'
        } else if(obj.classList.contains('transparant')){
            fill= 'rgba(0,0,0,0)';
        }

        var fillWeight = (Math.random() * 3 + 2);
        if(fill == '#437971'){
            fillWeight = 5;
        }

        if(!obj.classList.contains('noborder')){
        rough.canvas(obj).rectangle(10, 15, obj.width - 20, obj.height - 50, {
            roughness: (Math.random() + 2),
            fillStyle: style[Math.floor(Math.random() * style.length)],
            fill: fill,
            fillWeight: fillWeight,
            hachureAngle: (Math.random() * 360),
        })};
    });

    $('.canvasFooter').each(function (i, obj) {
        obj.style.width = '90%';
        obj.style.height = '50px';
        obj.width = obj.offsetWidth;
        obj.height = obj.offsetHeight;
        rough.canvas(obj).rectangle(10, 15, obj.offsetWidth, 10, {
            roughness: 3,
        });
    });

};

function titleDrop(){
    const titles = document.getElementsByClassName("title");
    for (i = 0; i < titles.length; i++) {
        titles[i].style.animationDelay = (Math.random()*500).toString()+'ms';
        titles[i].classList.add('animated', 'bounceInDown', 'faster');
        titles[i].style.opacity = 1;
    }
}


function startMap() {
    totalmap = document.getElementById("SVGMAP");
    datelocation = document.getElementsByClassName("st210")[0];
    welcometext = document.getElementById("welcomeText");
    ondergrond = document.getElementById("Ondergrond_x5F_NIETAANKOMEN");
    bomen = document.getElementById("BOMEN");
    glijbaan = document.getElementById("glijbaan");
    zandbak = document.getElementById("zandbak");
    rad = document.getElementsByClassName("rad");
    stofwolk = document.getElementById("Stofwolk");
    culture = document.getElementsByClassName("lettersCulture");
    music = document.getElementsByClassName("lettersMusic");
    stands = document.getElementsByClassName("lettersStands");
    wolken = document.getElementsByClassName("wolken");
    musicnotes = document.getElementsByClassName("musicnotes");
    birds = document.getElementsByClassName("vogels");
    schep = document.getElementById("Schepje_x5F_zandbak");
    delayGlijbaan = 0;
    delayZandbak = 0;
    delayrad = 0;

    bomen.style.animationDelay = '150ms';
    glijbaan.style.animationDelay = '300ms';
    zandbak.style.animationDelay = '400ms';
    rad[0].style.animationDelay = '550ms';
    wolken[0].style.animationDelay = '350ms';
    wolken[1].style.animationDelay = '450ms';
    welcometext.style.animationDelay = '150ms';
    datelocation.style.animationDelay = '150ms';

    ondergrond.classList.add('animated', 'bounceInLeft','fast');
    bomen.classList.add('animated', 'bounceInRight', 'fast');
    glijbaan.classList.add('animated', 'slideInDown', 'faster');
    zandbak.classList.add('animated', 'slideInDown', 'faster');
    rad[0].classList.add('animated', 'slideInDown', 'faster');
    wolken[0].classList.add('animated', 'bounceInDown', 'fast');
    wolken[1].classList.add('animated','bounceInDown','fast');
    welcometext.classList.add('animated','fadeIn','slow');
    datelocation.classList.add('animated','fadeIn','slow');


    ondergrond.style.opacity = 1;
    glijbaan.style.opacity = 1;
    bomen.style.opacity = 1;
    zandbak.style.opacity = 1;
    rad[0].style.opacity = 1;
    wolken[0].style.opacity = 1;
    wolken[1].style.opacity = 1;

    for (i = 0; i < music.length; i++) {
        music[i].style.animationDelay = (Math.random()*200+300).toString()+'ms';
        music[i].classList.add('animated', 'slideInDown', 'faster');
        music[i].style.opacity = 1;
    }
    for (i = 0; i < culture.length; i++) {
        culture[i].style.animationDelay = (Math.random()*200+400).toString()+'ms';
        culture[i].classList.add('animated', 'slideInDown', 'faster');
        culture[i].style.opacity = 1;
    }
    for (i = 0; i < stands.length; i++) {
        stands[i].style.animationDelay = (Math.random()*200+550).toString()+'ms';
        stands[i].classList.add('animated', 'slideInDown', 'faster');
        stands[i].style.opacity = 1;
    }
    for (i = 0; i < birds.length; i++) {
        birds[i].style.animationDelay = (Math.random()*800).toString()+'ms';
        birds[i].classList.add('animated', 'slideInDown', 'faster');
        birds[i].style.opacity = 1;
    }

    wolken[0].addEventListener('animationend', function() {
        wolken[0].classList.remove('animated', 'bounceInDown', 'fast');
        wolken[0].classList.add(('wolkeffect1'));
    });
    wolken[1].addEventListener('animationend', function() {
        wolken[1].classList.remove('animated', 'bounceInDown', 'fast');
        wolken[1].classList.add(('wolkeffect2'));
    });
    ondergrond.addEventListener('animationend', function() {
        totalmap.classList.add(('undergroundeffect'));

    });
    setTimeout(function () {
        for (i = 0; i < birds.length; i++) {
            birds[i].classList.remove('animated', 'slideInDown', 'faster');
            birds[i].classList.add('fly','fly'+i.toString());
        }
    },800)

}

function mobilecheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function setMapFunction() {

    $('#SVGMAP').on('click', 'a', function (event) {
        event.preventDefault();
        var link = '/music/index.html';
        if(this.id === 'standsLink'){
            link = '/stands/index.html'
        } else if(this.id === 'cultureLink') {
            link = '/culture/index.html'
        }
        if(mobilecheck() == false){
            Barba.Dispatcher.trigger('linkClicked', link, {target: link, type: "click"});
            Barba.Pjax.goTo(link && link.baseVal ? link.baseVal : link);
        }else{
            setTimeout(function () {
                Barba.Dispatcher.trigger('linkClicked', link, {target: link, type: "click"});
                Barba.Pjax.goTo(link && link.baseVal ? link.baseVal : link);
            },500)
        }

    });


    $("#glijbaan").hover(function() {

        if(delayGlijbaan === 0) {
            delayGlijbaan = 1;
            delayZandbak = 0;
            delayrad = 0;
            schep.classList.add('animated', 'fadeOut', 'fast');
            shakeLetters(music);
            for (i = 0; i < musicnotes.length; i++) {
                musicnotes[i].classList.remove('animated', 'fadeOut', 'fast');
                musicnotes[i].style.opacity = 1;
                musicnotes[i].style.animationDelay = (Math.random() * 50).toString() + 'ms';
                musicnotes[i].classList.add('animated', 'bounceIn');
            }
            setTimeout(function () {
                for (i = 0; i < musicnotes.length; i++) {
                    musicnotes[i].classList.remove('animated', 'bounceIn');
                }
            }, 1000);
        }
    }, function() {

    });

    $("#zandbak").hover(function() {

        if(delayZandbak === 0) {
            delayZandbak = 1;
            delayGlijbaan = 0;
            delayrad = 0;
            for (i = 0; i < musicnotes.length; i++) {
                musicnotes[i].classList.add('animated', 'fadeOut', 'fast');
            }
            shakeLetters(stands);
            schep.classList.remove('animated', 'fadeOut', 'fast');
            schep.classList.add('animated', 'jackInTheBox','fast');
            schep.style.opacity = 1;
            setTimeout(function () {
                schep.classList.remove('animated', 'jackInTheBox','fast');
            }, 1000)
        }
    }, function() {

    });

    $(".rad").hover(function() {
        if(delayrad ==- 0) {
            delayrad = 1;
            delayZandbak = 0;
            delayGlijbaan = 0;
            schep.classList.add('animated', 'fadeOut', 'fast');
            shakeLetters(culture);
            for (i = 0; i < musicnotes.length; i++) {
                musicnotes[i].classList.add('animated', 'fadeOut', 'fast');
            }
            stofwolk.style.opacity = 1;
            stofwolk.classList.add('animated', 'shake', 'FadIn');
            for (i = 0; i < rad.length; i++) {
                rad[i].classList.add('animated', 'jello');
            }
            rad[0].style.opacity = 0;
            rad[1].style.opacity = 1;
            setTimeout(function () {
                rad[1].style.opacity = 0;
                rad[2].style.opacity = 1;
            }, 100);
            setTimeout(function () {
                rad[2].style.opacity = 0;
                rad[3].style.opacity = 1;
            }, 200);
            setTimeout(function () {
                rad[3].style.opacity = 0;
                rad[0].style.opacity = 1;
            }, 300);
            setTimeout(function () {
                rad[0].style.opacity = 0;
                rad[1].style.opacity = 1;
            }, 400);
            setTimeout(function () {
                rad[1].style.opacity = 0;
                rad[2].style.opacity = 1;
            }, 500);
            setTimeout(function () {
                rad[2].style.opacity = 0;
                rad[3].style.opacity = 1;
                stofwolk.style.opacity = 0;
            }, 600);
            setTimeout(function () {
                rad[3].style.opacity = 0;
                rad[0].style.opacity = 1;
            }, 700);
            setTimeout(function () {
                rad[0].style.opacity = 0;
                rad[1].style.opacity = 1;
                stofwolk.classList.remove('animated', 'shake', 'FadeIn');
                for (i = 0; i < rad.length; i++) {
                    rad[i].classList.remove('animated', 'jello');
                }
            }, 800);
        }

    }, function() {

    });
}

function shakeLetters(category){
    for (i = 0; i < category.length; i++) {
        category[i].classList.remove('animated', 'slideInDown', 'faster','bounceInDown');
        category[i].style.animationDelay = (Math.random()*50).toString()+'ms';
        category[i].classList.add('animated','bounce');
    }
    setTimeout(function(){
        for (i = 0; i < category.length; i++) {
            category[i].classList.remove('animated','bounce');
        }
    }, 1000);
}
