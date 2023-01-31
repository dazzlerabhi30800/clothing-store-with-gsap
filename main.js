let heading = document.querySelector(".heading");
let girlImg = document.querySelector(".girl--img img");

gsap.fromTo(
  heading,
  { opacity: 0, x: -500, duration: 2 },
  { x: 0, opacity: 1, duration: 2, delay: 1 }
);

gsap.fromTo(
  girlImg,
  { opacity: 0, x: 500, duration: 2 },
  { x: 0, opacity: 1, duration: 2 },
  "<"
);

gsap.registerPlugin(ScrollTrigger);

gsap.from(".gallery--heading", {
  scrollTrigger: {
    trigger: ".gallery--heading",
    start: "0% 90%",
    end: "bottom bottom",
    // markers: true,
    scrub: 3,
    toggleActions: "restart pause reverse pause",
  },

  x: -400,
  opacity: 0,
  duration: 3,
  ease: "none",
});

// gsap.utils.toArray(".gallery").forEach((gallery) => {
//   ScrollTrigger.create({
//     trigger: gallery,
//     start: "top top",
//     pin: true,
//     pinSpacing: false,
//   });
// });
