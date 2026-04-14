/**
 * Two module-level state variables (activeGenre, searchQuery) are combined
 * inside a single filterBooks() function so both filters always apply together
 * without duplicating any render logic.
 */

/*  Data */

const books = [
  {
    id:          1,
    title:       'The Midnight Library',
    author:      'Matt Haig',
    genre:       'Fiction',
    year:        2020,
    description: 'Between life and death there is a library filled with every life you could have lived.',
    image:       'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80'
  },
  {
    id:          2,
    title:       'Sapiens',
    author:      'Yuval Noah Harari',
    genre:       'Non-Fiction',
    year:        2011,
    description: 'A brief history of humankind — from the Stone Age through to the twenty-first century.',
    image:       'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80'
  },
  {
    id:          3,
    title:       'The Girl with the Dragon Tattoo',
    author:      'Stieg Larsson',
    genre:       'Mystery',
    year:        2005,
    description: 'A journalist and a hacker unravel a decades-old family mystery in Sweden.',
    image:       'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=600&q=80'
  },
  {
    id:          4,
    title:       'Dune',
    author:      'Frank Herbert',
    genre:       'Sci-Fi',
    year:        1965,
    description: 'An epic tale of politics, religion, and survival on a desert planet.',
    image:       'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&q=80'
  },
  {
    id:          5,
    title:       'Educated',
    author:      'Tara Westover',
    genre:       'Biography',
    year:        2018,
    description: 'A memoir of a young woman raised in the mountains of Idaho who earns a place at Cambridge.',
    image:       'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80'
  },
  {
    id:          6,
    title:       'Project Hail Mary',
    author:      'Andy Weir',
    genre:       'Sci-Fi',
    year:        2021,
    description: 'A lone astronaut wakes with no memory and must save the Earth from an extinction-level threat.',
    image:       'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=600&q=80'
  },
  {
    id:          7,
    title:       'Normal People',
    author:      'Sally Rooney',
    genre:       'Fiction',
    year:        2018,
    description: 'Two students from the west of Ireland navigate connection, class, and identity.',
    image:       'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80'
  },
  {
    id:          8,
    title:       'Gone Girl',
    author:      'Gillian Flynn',
    genre:       'Mystery',
    year:        2012,
    description: 'On their fifth wedding anniversary, Nick Dunne reports that his wife Amy has disappeared.',
    image:       'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80'
  }
];

/*State */

let activeGenre = 'All';
let searchQuery = '';

/* Filter  */

/**
 * Applies both the genre filter and the search query simultaneously.
 * Returns a filtered subset of the books array.
 */
function filterBooks() {
  return books.filter(function (book) {
    var matchGenre  = activeGenre === 'All' || book.genre === activeGenre;
    var matchSearch = book.title.toLowerCase().includes(searchQuery) ||
                      book.author.toLowerCase().includes(searchQuery);
    return matchGenre && matchSearch;
  });
}

/*  Template  */

function createCardHTML(book) {
  return (
    '<article class="card">' +
      '<div class="card-img">' +
        '<img src="' + book.image + '" alt="Book cover \u2014 ' + book.title + '" loading="lazy" />' +
        '<span class="card-badge">' + book.genre + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<span class="card-year">' + book.year + '</span>' +
        '<h3 class="card-title">' + book.title + '</h3>' +
        '<p class="card-author">' + book.author + '</p>' +
        '<p class="card-desc">' + book.description + '</p>' +
      '</div>' +
    '</article>'
  );
}

/*  Render  */

function render() {
  var grid       = document.getElementById('cards-grid');
  var emptyState = document.getElementById('empty-state');
  var countEl    = document.getElementById('result-count');

  var filtered = filterBooks();

  grid.innerHTML = filtered.map(createCardHTML).join('');

  /* Result count label */
  if (countEl) {
    countEl.textContent = filtered.length === books.length
      ? books.length + ' books'
      : filtered.length + ' of ' + books.length + ' books';
  }

  /* Empty state visibility */
  emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
}

/*  Event Listeners  */

/* Search — filter on every keystroke */
document.getElementById('search-input').addEventListener('input', function () {
  searchQuery = this.value.trim().toLowerCase();
  render();
});

/* Genre tabs — single delegated listener on the filter bar */
document.getElementById('filter-bar').addEventListener('click', function (e) {
  var btn = e.target.closest('.filter-btn');
  if (!btn) return;

  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.remove('active');
    b.removeAttribute('aria-pressed');
  });

  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  activeGenre = btn.dataset.genre;
  render();
});

/*  Init  */
render();
