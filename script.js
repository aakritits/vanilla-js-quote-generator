import quotes from "./quotes.js";

document.getElementById("fetch-quote").addEventListener("click", function () {
  const selectedCategory = document.querySelector(
    'input[name="radio"]:checked'
  );

  if (selectedCategory) {
    const category =
      selectedCategory.id === "fetch-science-quote" ? "science" : "inspiration";
    const filteredQuotes = quotes.filter(
      (quote) => quote.category === category
    );
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    document.getElementById(
      "demo"
    ).textContent = `"${randomQuote.quote}" - ${randomQuote.author}`;
  } else {
    document.getElementById("demo").textContent =
      "Please select a category first.";
  }
});
