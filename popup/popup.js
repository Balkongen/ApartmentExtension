// TODO Implement so that toggle switch starts with local storage value. Now starts with off when opening popup

window.onload = () => {
    const toggleButton = document.getElementById('slider');
    
    if (toggleButton) {
    toggleButton.addEventListener('change', function () {
        console.log("Switch is now:", this.checked ? "ON" : "OFF");

        chrome.storage.local.set({ isChecked: this.checked }).then(() => {
            console.log("Value is set");
          });
        
          
    });
    } else {
    console.error("Checkbox not found!");
    }
};
