import quotes from "./quotes.js";

let currentQuoteIndex = -1;
let currentCategory = "science";
let filteredQuotes = [];

// Function to update button text based on selected category
function updateButtonText() {
  const selectedCategory = document.querySelector(
    'input[name="radio"]:checked'
  );
  const button = document.getElementById("fetch-quote");

  if (selectedCategory) {
    currentCategory =
      selectedCategory.id === "fetch-science-quote" ? "science" : "inspiration";
    button.textContent = `Generate a Random ${
      currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)
    } Quote`;

    // Update filtered quotes based on the new category
    filteredQuotes = quotes.filter(
      (quote) => quote.category === currentCategory
    );
    currentQuoteIndex = -1; // Reset index when category changes
    document.getElementById("quote-container").classList.remove("show"); // Hide container initially
  } else {
    button.textContent = "Generate a Random Quote";
    filteredQuotes = [];
    document.getElementById("quote-container").classList.remove("show"); // Hide container initially
  }
}

// Function to display a quote
function displayQuote(index) {
  if (
    filteredQuotes.length > 0 &&
    index >= 0 &&
    index < filteredQuotes.length
  ) {
    const quote = filteredQuotes[index];
    document.getElementById(
      "demo"
    ).textContent = `"${quote.quote}" - ${quote.author}`;
    document.getElementById("quote-container").classList.add("show"); // Show container
  } else {
    document.getElementById("demo").textContent = "No quotes available.";
    document.getElementById("quote-container").classList.remove("show"); // Hide container
  }
}

// Event listener for radio buttons to update button text and filter quotes
document.querySelectorAll('input[name="radio"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    updateButtonText();
  });
});

// Event listener for the button to generate a random quote
document.getElementById("fetch-quote").addEventListener("click", function () {
  if (filteredQuotes.length > 0) {
    currentQuoteIndex = Math.floor(Math.random() * filteredQuotes.length);
    displayQuote(currentQuoteIndex);
  } else {
    document.getElementById("demo").textContent =
      "Please select a category first.";
    document.getElementById("quote-container").classList.remove("show"); // Hide container initially
  }
});

// Event listeners for Next and Previous buttons
document.getElementById("prev-quote").addEventListener("click", function () {
  if (filteredQuotes.length > 0) {
    currentQuoteIndex =
      (currentQuoteIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
    displayQuote(currentQuoteIndex);
  }
});

document.getElementById("next-quote").addEventListener("click", function () {
  if (filteredQuotes.length > 0) {
    currentQuoteIndex = (currentQuoteIndex + 1) % filteredQuotes.length;
    displayQuote(currentQuoteIndex);
  }
});

// Set initial button text based on the default selected radio button and hide navigation buttons initially
document.addEventListener("DOMContentLoaded", () => {
  updateButtonText(); // Update button text when the page loads
});
