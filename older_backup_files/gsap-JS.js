





gsap.from('.header', { duration: 1, y: '-100%', ease: 'bounce' });

gsap.from('.link', { duration: 0.1, opacity: 0, stagger: '0.5' });

// 
gsap.registerEffect({
    name: "fade",
    effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
    },
    defaults: { duration: 2 }, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});

// now we can use it like this:
//gsap.effects.fade(".box");

gsap.registerEffect({
    name: "explode",
    effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, y: -100, ease: 'bounce'});
    },
    defaults: { duration: 2 }, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
});
// gsap.effects.explode(".box", {
//     // direction: "up", // reference any properties that the author decides - in this case "direction".
//     duration: 3
// });
let tl = gsap.timeline();
tl.fade(".dot", { duration: 3 })
    .fade(".box2", { duration: 1 }, "+=2")
    .to(".box3", { x: 100 });
