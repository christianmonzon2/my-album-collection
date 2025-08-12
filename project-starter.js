// Week 1 Session 5: JavaScript Data Manipulation Project
// Student Name: [Your Name]
// Project Theme: Album Catalog

let libraryData = {
    projectName: "My Album Collection",
    records: [
        {
            id: 1, 
            title: "(What's the Story) Morning Glory?", 
            artist: "Oasis", 
            genre: "Rock", 
            yearPublished: 1995, 
            status: "listened", 
            rating: 4 

        },
        { 
            id: 2, 
            title: "Abbey Road", 
            artist: "The Beatles", 
            genre: "Rock", 
            yearPublished: 1969, 
            status: "listened", 
            rating: 5 
        },
        { 
            id: 3, 
            title: "Grace", 
            artist: "Jeff Buckley", 
            genre: "Alternative", 
            yearPublished: 1994, 
            status: "listened", 
            rating: 5 
        },
        { 
            id: 4, 
            title: "The Queen is Dead", 
            artist: "The Smiths", 
            genre: "Alternative", 
            yearPublished: 1986, 
            status: "listened", 
            rating: 4 },
        { 
            id: 5, 
            title: "Either/Or", 
            artist: "Elliott Smith", 
            genre: "Alternative", 
            yearPublished: 1997, 
            status: "listened", 
            rating: 5 },
        { 
            id: 6, 
            title: "Is This It", 
            artist: "The Strokes", 
            genre: "Rock", 
            yearPublished: 2001, 
            status: "listened", 
            rating: 4 }
    ],
    metadata: {
        totalRecords: 6,
        lastUpdated: new Date().toISOString()
    }
};

function updateMetadata() {
    libraryData.metadata.totalRecords = libraryData.records.length;
    libraryData.metadata.lastUpdated = new Date().toISOString();
}

function addRecord(record) {
    const { valid, message } = validateRecord(record);
    if (!valid) {
        console.log("Error adding record:", message);
        return false;
    }
    record.id = libraryData.records.length
        ? Math.max(...libraryData.records.map(r => r.id)) + 1
        : 1;
    libraryData.records.push(record);
    updateMetadata();
    return true;
}

function removeRecord(id) {
    const index = libraryData.records.findIndex(r => r.id === id);
    if (index === -1) return false;
    libraryData.records.splice(index, 1);
    updateMetadata();
    return true;
}

function updateRecord(id, updates) {
    const record = libraryData.records.find(r => r.id === id);
    if (!record) return false;
    Object.assign(record, updates);
    updateMetadata();
    return true;
}

function searchRecords(criteria) {
    return libraryData.records.filter(record =>
        Object.entries(criteria).every(([key, value]) =>
            String(record[key]).toLowerCase().includes(String(value).toLowerCase())
        )
    );
}

function generateSummary() {
    const total = libraryData.records.length;
    const avgRating = total > 0
        ? (libraryData.records.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(2)
        : 0;
    const genres = [...new Set(libraryData.records.map(r => r.genre))];
    return {
        totalAlbums: total,
        averageRating: avgRating,
        uniqueGenres: genres.length,
        genresList: genres
    };
}

function loadData(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        if (!parsed.records || !Array.isArray(parsed.records)) {
            throw new Error("Invalid data structure.");
        }
        libraryData = parsed;
        return true;
    } catch {
        return false;
    }
}

function saveData() {
    return JSON.stringify(libraryData, null, 2);
}

function validateRecord(record) {
    const required = ["title", "artist", "genre", "yearPublished", "status", "rating"];
    for (let field of required) {
        if (!(field in record)) {
            return { valid: false, message: `Missing field: ${field}` };
        }
    }
    if (typeof record.yearPublished !== "number" || record.yearPublished < 0) {
        return { valid: false, message: "Invalid yearPublished" };
    }
    if (typeof record.rating !== "number" || record.rating < 0 || record.rating > 5) {
        return { valid: false, message: "Rating must be between 0 and 5" };
    }
    return { valid: true };
}

function displayRecords() {
    console.log("\n--- Album Records ---");
    libraryData.records.forEach(r => {
        console.log(`${r.id}. "${r.title}" by ${r.artist} (${r.yearPublished}) - ${r.genre} | Rating: ${r.rating}/5`);
    });
    console.log(`Total: ${libraryData.metadata.totalRecords}`);
}

function displaySearchResults(results) {
    if (results.length === 0) {
        console.log("No matching records found.");
    } else {
        console.log(`Found ${results.length} result(s):`);
        results.forEach(r => {
            console.log(`- ${r.title} by ${r.artist}`);
        });
    }
}

function displaySummary(summary) {
    console.log("\n--- Collection Summary ---");
    console.log(`Total Albums: ${summary.totalAlbums}`);
    console.log(`Average Rating: ${summary.averageRating}`);
    console.log(`Unique Genres: ${summary.uniqueGenres}`);
    console.log(`Genres: ${summary.genresList.join(", ")}`);
}

function main() {
    console.log("=== My Album Collection ===\n");
    displayRecords();
}

function runTests() {
    console.log("\n=== Running Tests ===");

    console.assert(addRecord({
        title: "OK Computer",
        artist: "Radiohead",
        genre: "Alternative",
        yearPublished: 1997,
        status: "listened",
        rating: 5
    }), "Test 1 Failed: Add Record");

    console.assert(removeRecord(1), "Test 2 Failed: Remove Record");

    console.assert(updateRecord(2, { rating: 4 }), "Test 3 Failed: Update Record");

    let results = searchRecords({ genre: "Alternative" });
    console.assert(results.length > 0, "Test 4 Failed: Search Records");

    let summary = generateSummary();
    console.assert(summary.totalAlbums === libraryData.records.length, "Test 5 Failed: Generate Summary");

    console.log("=== Tests Complete ===\n");
}

main();
runTests()

function runTests() {
    console.log("=== Tests Complete ===\n");
    displayRecords(); 
}

function renderAlbums() {
    const container = document.getElementById('albums-container');
    if (!container) return;
    container.innerHTML = '';
    if (!libraryData.records || libraryData.records.length === 0) {
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
        `;
        container.appendChild(albumDiv);
    });
}

document.addEventListener('DOMContentLoaded', renderAlbums);

function addRecord(album) {
    renderAlbums();
    return true; 
}

function updateRecord(id, updates) {
    renderAlbums();
    return true; 
}

function removeRecord(id) {
    renderAlbums();
    return true; 
}

