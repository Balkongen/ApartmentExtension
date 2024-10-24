let lastURL = window.location.href; // Store the initial URL

function searchPage() {
    console.log("Script is running");
    const cards = document.getElementsByClassName("Card_hclCard__v27k7");
    
    if (cards.length === 0) {
        console.log("No cards");
        return; // Exit if there are no cards
    }

    for (const card of cards) {
        const p = card.getElementsByTagName("p");

        if (p.length === 0) continue; // No text, skip card.

        const text = p[0].textContent;

        if (classifyApartmentRenovation(text)) {
            card.firstElementChild.style.border = "5px solid red"; 
        } else {
            card.firstElementChild.style.display = "none";
        }
    }
}

function classifyApartmentRenovation(description) {
    const needsRenovationKeywords = [
        "sliten", "omodern", "behöver renoveras",
        "totalrenovering krävs", "i behov av uppfräschning",
        "slitage", "ytskikt behöver åtgärdas", "behov av upprustning", "ej renoverad",
        "omfattande renovering(?!ar)",
        "behöver uppdateras", "i behov av modernisering",
        "äldre standard", "behöver fixas till",
        "i behov av stambyte", "byggnadsår utan större renovering",
        "behov av renovering", "renoveringschans",
        "renoveringspotential", "renoveringsbehov",
        "renoveringsobjekt", "renoveringsdröm"
    ];

    const needsRenovationKeywordsEscaped = needsRenovationKeywords.map(keyword =>
        keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special characters
    );

    // Create the regex pattern by combining the keywords
    const needsRenovationPattern = new RegExp(
        "(" + needsRenovationKeywordsEscaped.join("|") + ")", 
        "i" // Case insensitive flag
    );

    // Return true if any of the keywords are found in the description
    return needsRenovationPattern.test(description);
}

// Function to check for URL changes
function checkURLChange() {
    const currentURL = window.location.href;
    if (currentURL !== lastURL) {
        console.log("URL changed: " + currentURL);
        lastURL = currentURL; // Update the last URL
        searchPage(); // Run the search function directly
    }
}

// Observe the DOM for changes
function observeDOMChanges() {
    console.log("Starting to observe DOM changes...");
    const targetNode = document.body;

    const observer = new MutationObserver((mutationsList) => {
        // Check for URL changes on DOM mutations
        checkURLChange();

        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                // Optionally, you can call searchPage() here if you want it to run on every DOM change
                searchPage(); 
            }
        }
    });

    const config = { childList: true, subtree: true };
    observer.observe(targetNode, config);
}

// Initialize the search and DOM observer
searchPage();
observeDOMChanges();
