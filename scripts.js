const indicators = document.querySelectorAll(".indicator");
const sections = document.querySelectorAll("section");

const resetCurrentActiveIndicator = () => {
  const activeIndicator = document.querySelector(".active");
  activeIndicator.classList.remove("active");
};

const onSectionLeavesViewport = (section) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetCurrentActiveIndicator();
          const element = entry.target;
          const indicator = document.querySelector(`a[href='#${element.id}']`);
          indicator.classList.add("active");
          return;
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.75
    }
  );
  observer.observe(section);
};

indicators.forEach((indicator) => {
  indicator.addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    resetCurrentActiveIndicator();
    this.classList.add("active");
  });
});

sections.forEach(onSectionLeavesViewport);



// Keep track of the current section index
let currentSection = 0;

// Add a keydown event listener to the document
document.addEventListener("keydown", function(event) {
  // Check which arrow key is pressed
  if (event.key === "ArrowDown") {
    // If down arrow is pressed, increment the current section index
    currentSection++;
    // If the current section index is out of bounds, reset it to the last section
    if (currentSection >= sections.length) {
      currentSection = sections.length - 1;
    }
    // Scroll to the next section smoothly
    sections[currentSection].scrollIntoView({ behavior: "smooth" });
  } else if (event.key === "ArrowUp") {
    // If up arrow is pressed, decrement the current section index
    currentSection--;
    // If the current section index is out of bounds, reset it to the first section
    if (currentSection < 0) {
      currentSection = 0;
    }
    // Scroll to the previous section smoothly
    sections[currentSection].scrollIntoView({ behavior: "smooth" });
  }
  console.log("Arrow key pressed")
});