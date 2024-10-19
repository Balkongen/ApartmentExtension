// The text you're searching for
const searchText = "specific text";

// Check if the text is present in the body of the page
if (document.body.innerText.includes(searchText)) {
  console.log(`The text "${searchText}" was found on this page!`);
  alert(`The text "${searchText}" was found!`);
} else {
  console.log(`The text "${searchText}" was NOT found on this page.`);
}
