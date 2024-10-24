console.log("contentScript.js loaded");

if (typeof observer === "undefined") {
  var observer; // Use var to avoid block scope issues

  function searchPage() {
      console.log("Script is running");
      const cards = document.getElementsByClassName("Card_hclCard__v27k7");

      if (cards.length === 0) {
          console.log("No cards found");
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

      const needsRenovationPattern = new RegExp(
          "(" + needsRenovationKeywordsEscaped.join("|") + ")", 
          "i" // Case insensitive flag
      );

      return needsRenovationPattern.test(description);
  }

  // Run the search function when the script is injected
  setTimeout(() => {
      searchPage();
  }, 1); // Delay the search for 1 second

  // Observe DOM changes to capture dynamically added elements
  observer = new MutationObserver(() => {
      console.log("DOM changed, running searchPage");
      searchPage(); // Re-run the search whenever the DOM changes
  });

  observer.observe(document.body, { childList: true, subtree: true });
} else {
  console.log("Observer already initialized. Skipping reinitialization.");
}
