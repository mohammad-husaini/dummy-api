async function fetchQuotes() {
  try {
    const response = await fetch("https://dummyjson.com/quotes");
    const data = await response.json();
    return data.quotes;
  } catch (error) {
    console.log("Error:", error);
  }
}
async function displayQuotes(quotes) {
  const quoteList = document.getElementById("quote-list");
  quoteList.innerHTML = "";

  quotes.forEach((quote) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${quote.quote} - ${quote.author}`;
    quoteList.appendChild(listItem);
  });
}
async function searchQuotes() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase();
  const quotes = await fetchQuotes();

  const filteredQuotes = quotes.filter((quote) => {
    const quoteText = quote.quote.toLowerCase();
    const author = quote.author.toLowerCase();
    return quoteText.includes(searchTerm) || author.includes(searchTerm);
  });

  displayQuotes(filteredQuotes);
}
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", searchQuotes);
fetchQuotes().then(displayQuotes);
