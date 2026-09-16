const themeToggle = document.getElementById("theme-toggle");
const containerWithDots = document.getElementById("dots");
const mediumWidget = document.getElementById("medium-widget");

themeToggle.onchange = () => {
  document.body.classList.toggle("another-color-theme");
  containerWithDots.classList.toggle("glowing-shadow");
  containerWithDots.classList.toggle("default-shadow");
  mediumWidget?.classList.toggle("glowing-shadow");
};
