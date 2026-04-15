/**
 * Fetches a random literary quote from the API Ninjas Quotes API.
 * Falls back to a hardcoded quote on network error so the page never breaks.
 *
 */



const FALLBACK = {
  quote:  'A reader lives a thousand lives before he dies. The man who never reads lives only one.',
  author: 'George R.R. Martin'
};

/**
 * Fetch a quote and update the DOM.
 * Called on page load and when the user clicks "New Quote".
 */
async function fetchQuote() {
  const quoteEl  = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');
  const btn      = document.getElementById('new-quote-btn');

  if (!quoteEl) return;

  /* Loading state */
  quoteEl.innerHTML   = '<span class="widget-loading">Fetching a new quote&hellip;</span>';
  authorEl.textContent = '';
  if (btn) btn.disabled = true;

  try {
    const res = await fetch(
      'https://api.api-ninjas.com/v1/quotes',
      { headers: { 'X-Api-Key': API_KEY } }
    );

    if (!res.ok) throw new Error('API response was not OK');

    const data = await res.json();

    if (!data || !data[0]) throw new Error('Empty API response');

    const { quote, author } = data[0];
    quoteEl.textContent  = '\u201C' + quote + '\u201D';
    authorEl.textContent = '\u2014 ' + author;

  } catch (_err) {
    /* Graceful fallback — page still works without an API key */
    quoteEl.textContent  = '\u201C' + FALLBACK.quote + '\u201D';
    authorEl.textContent = '\u2014 ' + FALLBACK.author;
  } finally {
    if (btn) btn.disabled = false;
  }
}

/* Attach button listener and run on load */
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('new-quote-btn');
  if (btn) btn.addEventListener('click', fetchQuote);
  fetchQuote();
});

const API_KEY = 'CZsOQ5d743BBiXAqaHnYtYwH9WX25tgnOu7L3aQB'; 