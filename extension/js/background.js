chrome.tabs.getSelected(null, function(tab){
    console.log(tab);
    chrome.tabs.executeScript(tab.id, {
        file: './js/content.js'
    })
})