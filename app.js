let controller;
let slideScene;
let pageScene;

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

        pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 })


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

animateSlides();