/*controls the 404 page: shows the address that was not found in the prompt and the log*/
let missingPath = location.pathname;

// turn %20 and friends back into normal characters, a broken one is shown as it is
try {
    missingPath = decodeURIComponent(missingPath);
} catch (error) { }

/* show the address in the prompt and the log (textContent, so whatever was typed is never read as HTML) */
document.querySelectorAll("#missing-path, #missing-path-log").forEach(function (element) {
    element.textContent = missingPath;
});
