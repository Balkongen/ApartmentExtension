function searchPage() {
  const cards = document.getElementsByClassName("Card_hclCard__v27k7");
  
  for (const card of cards) {

    const p = card.getElementsByTagName("p");

    if (p.length == 0) 
      continue; // No text, skip card.

    const text = p[0].textContent;

    if (classifyApartmentRenovation(text)) {
      const div = card.firstElementChild;
      div.style.border = "5px solid red"; 
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


searchPage();