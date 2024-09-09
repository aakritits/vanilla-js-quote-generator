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
    currentQuoteIndex = -1;
    document.getElementById("quote-container").classList.remove("show");
  } else {
    button.textContent = "Generate a Random Quote";
    filteredQuotes = [];
    document.getElementById("quote-container").classList.remove("show");
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
    document.getElementById("quote-container").classList.add("show");
  } else {
    document.getElementById("demo").textContent = "No quotes available.";
    document.getElementById("quote-container").classList.remove("show");
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
    document.getElementById("quote-container").classList.remove("show");
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

// Set initial button text based on the default selected radio button
document.addEventListener("DOMContentLoaded", () => {
  updateButtonText();
});
// Theme toggle switch
const themeToggle = document.getElementById("theme-toggle");

// Check the saved theme preference and apply it
document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("dark-mode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
  }
});

// Initialize the font size
let currentFontSize = 16; // Default font size in px

// Function to update font size
function updateFontSize(size) {
  const quoteText = document.getElementById("demo");
  currentFontSize += size;
  if (currentFontSize < 12) currentFontSize = 12;
  if (currentFontSize > 36) currentFontSize = 18;
  quoteText.style.fontSize = `${currentFontSize}px`;
}

// Event listener for the increase font size button
document.getElementById("increase-font").addEventListener("click", function () {
  updateFontSize(2); //2px
});

// Event listener for the decrease font size button
document.getElementById("decrease-font").addEventListener("click", function () {
  updateFontSize(-2);
});

// Event listener for the theme toggle switch
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "true");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "false");
  }
});
