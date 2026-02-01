const filterButtons = document.querySelectorAll(".pill");
const topicCards = document.querySelectorAll(".card");
const searchInput = document.querySelector("#topic-search");
const clearButton = document.querySelector("#clear-search");
const resultCount = document.querySelector("#result-count");

let activeFilter = "all";

const updateResultCount = (visibleCount) => {
  const label = visibleCount === 1 ? "topic" : "topics";
  resultCount.textContent = `Showing ${visibleCount} ${label}`;
};

const matchesQuery = (card, query) => {
  if (!query) {
    return true;
  }
  const text = card.textContent.toLowerCase();
  return text.includes(query);
};

const applyFilters = () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  topicCards.forEach((card) => {
    const matchesDomain =
      activeFilter === "all" || card.dataset.domain === activeFilter;
    const matchesSearch = matchesQuery(card, query);
    const shouldShow = matchesDomain && matchesSearch;

    card.classList.toggle("hidden", !shouldShow);

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  updateResultCount(visibleCount);
};

const setActiveFilter = (filter) => {
  activeFilter = filter;
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive);
  });

  applyFilters();
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

searchInput.addEventListener("input", applyFilters);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  applyFilters();
  searchInput.focus();
});

setActiveFilter("all");
