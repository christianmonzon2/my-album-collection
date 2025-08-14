let libraryData = {
    projectName: "My Album Collection",
    records: [
        { id: 1, title: "(What's the Story) Morning Glory?", artist: "Oasis", genre: "Rock", yearPublished: 1995, status: "listened", rating: 4 },
        { id: 2, title: "Abbey Road", artist: "The Beatles", genre: "Rock", yearPublished: 1969, status: "listened", rating: 5 },
        { id: 3, title: "Grace", artist: "Jeff Buckley", genre: "Alternative", yearPublished: 1994, status: "listened", rating: 5 },
        { id: 4, title: "The Queen is Dead", artist: "The Smiths", genre: "Alternative", yearPublished: 1986, status: "listened", rating: 4 },
        { id: 5, title: "Either/Or", artist: "Elliott Smith", genre: "Alternative", yearPublished: 1997, status: "listened", rating: 5 },
        { id: 6, title: "Is This It", artist: "The Strokes", genre: "Rock", yearPublished: 2001, status: "listened", rating: 4 }
    ],
    metadata: { totalRecords: 6, lastUpdated: new Date().toISOString() }
};

function updateMetadata() {
    libraryData.metadata.totalRecords = libraryData.records.length;
    libraryData.metadata.lastUpdated = new Date().toISOString();
    updateStatsUI();
}

function validateRecord(record) {
    const required = ["title", "artist", "genre", "yearPublished", "status", "rating"];
    for (let field of required) {
        if (!(field in record)) return { valid: false, message: `Missing field: ${field}` };
    }
    if (typeof record.yearPublished !== "number" || record.yearPublished < 0) return { valid: false, message: "Invalid yearPublished" };
    if (typeof record.rating !== "number" || record.rating < 0 || record.rating > 5) return { valid: false, message: "Rating must be between 0 and 5" };
    return { valid: true };
}

function addRecord(record) {
    const { valid } = validateRecord(record);
    if (!valid) return false;
    record.id = libraryData.records.length ? Math.max(...libraryData.records.map(r => r.id)) + 1 : 1;
    libraryData.records.push(record);
    updateMetadata();
    renderAlbums();
    populateGenreFilter();
    return true;
}

function removeRecord(id) {
    const index = libraryData.records.findIndex(r => r.id === id);
    if (index === -1) return false;
    libraryData.records.splice(index, 1);
    updateMetadata();
    renderAlbums();
    populateGenreFilter();
    return true;
}

function updateRecord(id, updates) {
    const record = libraryData.records.find(r => r.id === id);
    if (!record) return false;
    Object.assign(record, updates);
    updateMetadata();
    renderAlbums();
    populateGenreFilter();
    return true;
}

function openEditModal(id) {
    const album = libraryData.records.find(r => r.id === id);
    if (!album) return;
    document.getElementById('edit-id').value = album.id;
    document.getElementById('edit-title').value = album.title;
    document.getElementById('edit-artist').value = album.artist;
    document.getElementById('edit-genre').value = album.genre;
    document.getElementById('edit-year').value = album.yearPublished;
    document.getElementById('edit-status').value = album.status;
    document.getElementById('edit-rating').value = album.rating;
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function renderAlbums() {
    const container = document.getElementById('albums-container');
    container.innerHTML = '';
    if (!libraryData.records.length) {
        container.innerHTML = '<p>No albums in your collection yet.</p>';
        return;
    }
libraryData.records.forEach(album => {
    const albumDiv = document.createElement('div');
    albumDiv.className = 'album-card';
    albumDiv.innerHTML = `
    <h3>${album.title}</h3>
    <p><strong>Artist:</strong> ${album.artist}</p>
    <p><strong>Genre:</strong> ${album.genre}</p>
    <p><strong>Year:</strong> ${album.yearPublished}</p>
    <p><strong>Status:</strong> ${album.status}</p>
    <p><strong>Rating:</strong> ${'★'.repeat(album.rating)}</p>
    <div class="album-actions">
    <button class="btn-small btn-edit" onclick="openEditModal(${album.id})">Edit</button>
    <button class="btn-small btn-delete" onclick="removeRecord(${album.id})">Delete</button>
    </div>
    `;
    container.appendChild(albumDiv);
});
}

function updateStatsUI() {
    const total = libraryData.records.length;
    const avgRating = total > 0 ? (libraryData.records.reduce((sum, record) => sum + record.rating, 0) / total).toFixed(1) : '0.0';
    const uniqueGenres = new Set(libraryData.records.map(record => record.genre)).size;
    const listenedCount = libraryData.records.filter(record => record.status === 'listened').length;

   
    document.getElementById('total-albums').textContent = `${total} Albums`;
    document.getElementById('avg-rating').textContent = `★ ${avgRating}`;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-avg-rating').textContent = avgRating;
    document.getElementById('stat-genres').textContent = uniqueGenres;
    document.getElementById('stat-listened').textContent = listenedCount;
}

function populateGenreFilter() {
    const genreFilter = document.getElementById('filter-genre');
    const genres = [...new Set(libraryData.records.map(record => record.genre))].sort();
    genreFilter.innerHTML = '<option value="">All Genres</option>';
    genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
});
}

function filterAndSearchAlbums() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const genreFilter = document.getElementById('filter-genre').value;
    const statusFilter = document.getElementById('filter-status').value;

    let filteredAlbums = libraryData.records;

    if (searchTerm) {
        filteredAlbums = filteredAlbums.filter(album => 
        album.title.toLowerCase().includes(searchTerm) ||
        album.artist.toLowerCase().includes(searchTerm) ||
        album.genre.toLowerCase().includes(searchTerm)
        );
    }

    if (genreFilter) {
        filteredAlbums = filteredAlbums.filter(album => album.genre === genreFilter);
    }

    if (statusFilter) {
        filteredAlbums = filteredAlbums.filter(album => album.status === statusFilter);
    }

    renderFilteredAlbums(filteredAlbums);
}

function renderFilteredAlbums(albums) {
    const container = document.getElementById('albums-container');
    container.innerHTML = '';
    if (!albums.length) {
        container.innerHTML = '<p>No albums match your search criteria.</p>';
        return;
    }
    albums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.className = 'album-card';
        albumDiv.innerHTML = `
        <h3>${album.title}</h3>
        <p><strong>Artist:</strong> ${album.artist}</p>
        <p><strong>Genre:</strong> ${album.genre}</p>
        <p><strong>Year:</strong> ${album.yearPublished}</p>
        <p><strong>Status:</strong> ${album.status}</p>
        <p><strong>Rating:</strong> ${'★'.repeat(album.rating)}</p>
        <div class="album-actions">
        <button class="btn-small btn-edit" onclick="openEditModal(${album.id})">Edit</button>
        <button class="btn-small btn-delete" onclick="removeRecord(${album.id})">Delete</button>
        </div>
        `;
        container.appendChild(albumDiv);
    });
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-genre').value = '';
    document.getElementById('filter-status').value = '';
    renderAlbums();
}

document.addEventListener('DOMContentLoaded', () => {
    renderAlbums();
    updateStatsUI();
    populateGenreFilter();

    document.getElementById('add-album-form').addEventListener('submit', e => {
    e.preventDefault();
    const record = {
        title: document.getElementById('title').value,
        artist: document.getElementById('artist').value,
        genre: document.getElementById('genre').value,
        yearPublished: parseInt(document.getElementById('year').value),
        status: document.getElementById('status').value,
        rating: parseInt(document.getElementById('rating').value)
    };
    if (addRecord(record)) e.target.reset();
});

document.querySelector('#edit-album-form').addEventListener('submit', e => {
    e.preventDefault();
    const id = parseInt(document.getElementById('edit-id').value);
    const updates = {
        title: document.getElementById('edit-title').value,
        artist: document.getElementById('edit-artist').value,
        genre: document.getElementById('edit-genre').value,
        yearPublished: parseInt(document.getElementById('edit-year').value),
        status: document.getElementById('edit-status').value,
        rating: parseInt(document.getElementById('edit-rating').value)
    };
    updateRecord(id, updates);
    closeEditModal();
});

document.querySelector('#edit-modal .close').addEventListener('click', closeEditModal);
window.addEventListener('click', e => {
    if (e.target.id === 'edit-modal') closeEditModal();
});

document.getElementById('grid-view').addEventListener('click', () => {
        const container = document.getElementById('albums-container');
        container.className = 'albums-grid';
        document.getElementById('grid-view').classList.add('active');
        document.getElementById('list-view').classList.remove('active');
});

document.getElementById('list-view').addEventListener('click', () => {
    const container = document.getElementById('albums-container');
    container.className = 'albums-list';
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
});

    document.getElementById('search-input').addEventListener('input', filterAndSearchAlbums);
    document.getElementById('filter-genre').addEventListener('change', filterAndSearchAlbums);
    document.getElementById('filter-status').addEventListener('change', filterAndSearchAlbums);
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
});