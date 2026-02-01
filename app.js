const filterButtons = document.querySelectorAll(".pill");
const topicCards = document.querySelectorAll(".card");

const setActiveFilter = (filter) => {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });

  topicCards.forEach((card) => {
    const match = filter === "all" || card.dataset.domain === filter;
    card.classList.toggle("hidden", !match);
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

setActiveFilter("all");
