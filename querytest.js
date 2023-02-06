// Create an object to describe the data in the query string
var query = new URLSearchParams();

// Add the rarities
var languages = [1, 2, 3, 4, 5];

languages.forEach(function (language) {
    query.append('language', language);
});

// Explicitly convert to a string
console.log(query.toString());
