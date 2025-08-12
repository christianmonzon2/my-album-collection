# Week 1 Practicum: JavaScript Data Manipulation Project

## Project Information
- **Student Name**: Christian Monzon
- **Project Theme**: My Album Collection
- **Date**: August 15, 2025

## Project Description
This project is a simple JavaScript program that lets me keep track of my favorite music albums.
It stores a collection of albums in JSON format and lets me add new albums, remove ones I don’t want anymore, update album details, and search for albums by artist or title.
## Data Structure
My data is stored in an array of objects.

Example:
```javascript
{
    id: 1, // A unique number for each album
    title: "Meat is Murder", // Album name
    artist: "The Smiths", // Artist name
    year: 1985, // Year the album was released
    genre: "Alternative" // Type of music
},
```

## Core Functions
List and briefly describe each function in your project:

1. addRecord(record): Adds a new album to the collection with a unique ID.
2. removeRecord(id): Deletes an album from the collection by its ID.
updateRecord(id, updatedFields): Changes details (title, artist, etc.) for an album with a given ID.
3. findRecordById(id): Finds and returns the album that matches the given ID.
4. filterByArtist(artistName): Returns all albums by a certain artist.
5. listRecords(): Shows all albums currently in the collection.

## How to Use
Provide step-by-step instructions on how to use your application:

1. Run the program using `project-starter.js`
2. Choose from the menu options
3. Run the program in the terminal using: node project-starter.js
4. The program will run the test cases automatically.
5. You can edit the runTests() section to try different album actions like adding, removing, or searching.

## Test Cases
Describe the test cases you've implemented:

1. Add Album Test: Add a new album and check if it appears in the list.
2. Remove Album Test: Remove an album by ID and check if it’s gone.
3. Update Album Test: Change an album’s year and see if the update worked.
4. Find Album by ID Test: Search for an album by its unique ID.
5. Filter by Artist Test: Get all albums from the same artist.


## Special Features
1. Each new album gets an automatic unique ID.
2. Can search by artist name.
3. Easy to expand by adding more properties like “rating” or “favorite track.”
## Challenges and Solutions
Challenge: Making sure IDs don’t repeat after deleting an album.
Solution: Used a variable to always track the highest used ID and add 1 for each new record.
Challenge: Making updates without replacing the whole album.
Solution: Used Object.assign() so I can update just the changed fields.
## Future Improvements
1. Add a menu system so I can choose actions while the program runs instead of editing test cases.
2. Save data to a JSON file so my collection is kept even after closing the program.
3. Add a search by year or search by genre feature.