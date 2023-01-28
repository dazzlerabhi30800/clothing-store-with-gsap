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
