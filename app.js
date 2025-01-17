let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
    //init controller
    controller = new ScrollMagic.Controller();
    //select some things
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    //loop over each slide
    sliders.forEach(slide => {
        const revealImg = slide.querySelector('.reveal-img');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        //GSAP

        const slideTl = gsap.timeline({
            defaults: { duratoin: 0.75, ease: "power2.inOut" }
        });
        slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' })
        slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=0.75")
        slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.3')
        slideTl.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=0.2')

        //create scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })

        .setTween(slideTl)
            .addIndicators({
                colorStart: 'white',
                colorTrigger: 'white',
                name: 'slide'
            })
            .addTo(controller);
        //New Animation
        const pageTl = gsap.timeline();
        // let nextSlide = slide.length - 1 === index ? 'end' : slide[index + 1];
        // pageTl.fromTo(nextSlide, { y: '0%' }, { y: '50%' });
        pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
        // pageTl.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-=0.5')


        //Create new scene

        pageScene = new ScrollMagic.Scene({
                triggerElement: slide,
                duration: '100%',
                triggerHook: 0

            })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTl)
            .addIndicators({
                colorStart: 'white',
                colorTrigger: 'white',
                name: 'page',
                indent: 200
            })

        .addTo(controller)
    });

}

const mouse = document.querySelector('.cursor');
const mouseTxt = mouse.querySelector('span');
const burger = document.querySelector('.burger');

function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
    const item = e.target;
    if (item.id === 'logo' || item.classList.contains('burger')) {
        mouse.classList.add('nav-active');
    } else {
        mouse.classList.remove('nav-active');
    }

    if (item.classList.contains('explore')) {
        mouse.classList.add('explore-active');
        mouseTxt.innerText = 'Tap';
        gsap.to('.title-swipe', 1, { y: "0%" });
    } else {
        mouse.classList.remove('explore-active');
        mouseTxt.innerText = '';
        gsap.to('.title-swipe', 1, { y: "100%" });

    }
}

function navToggle(e) {
    if (!e.target.classList.contains("active")) {
        e.target.classList.add("active");
        gsap.to('.line1', 0.5, { rotate: '45', y: 5, background: "black" });
        gsap.to('.line2', 0.5, { rotate: '-45', y: -5, background: "black" });
        gsap.to('#logo', 0.5, { color: "black" });
        gsap.to('.nav-bar', 1, { clipPath: 'circle(2500px at 100% -10%)' });
        document.body.classList.add("hide");
    } else {
        e.target.classList.remove("active");
        gsap.to('.line1', 0.5, { rotate: '0', y: 0, background: "white" });
        gsap.to('.line2', 0.5, { rotate: '0', y: 0, background: "white" });
        gsap.to('#logo', 0.5, { color: "white" });
        gsap.to('.nav-bar', 1, { clipPath: 'circle(50px at 100% -10%)' });
        document.body.classList.remove("hide");
    }
}

//Barba page transitions

barba.init({
    views: [{
            namespace: 'home',
            beforeEnter() {
                animateSlides();
                logo.href = './index.html'
            },
            beforeLeave() {
                slideScene.destroy();
                pageScene.destroy();
                controller.destroy();
            }
        },
        {
            namespace: 'fashion',
            beforeEnter() {
                logo.href = '../index.html';
                detailAnimation();
                gsap.fromTo('.nav-header', 1, { y: '100%' }, { y: '0%', ease: "power2.inOut" })
            }
        }
    ],
    transitions: [{
        leave({ current, next }) {
            let done = this.async();
            //Animation
            const t1 = gsap.timeline({ defaults: { ease: "power2.inOut" } });
            t1.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
            t1.fromTo('.swipe', 0.75, { x: '-100%' }, { x: '0', onComplete: done }, '-=0.5');
        },
        enter({ current, next }) {
            let done = this.async();
            window.scrollTo(0, 0);
            //Animation
            const t1 = gsap.timeline({ defaults: { ease: "power2.inOut" } });
            t1.fromTo('.swipe', 0.75, { x: '0%' }, { x: '100%', stagger: 0.25, onComplete: done }, '-=0.5');
            t1.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        }
    }]
});



//event listeners
burger.addEventListener('click', navToggle);
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);