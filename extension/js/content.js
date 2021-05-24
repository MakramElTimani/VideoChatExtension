

fetch(chrome.runtime.getURL('/popup.html')).then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    // not using innerHTML as it would break js event listeners of the page
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3000/api/rooms', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            var ul = document.createElement("ul");
            data.forEach(element => {
                var li = document.createElement('li')
                var aTag = document.createElement('a')
                aTag.setAttribute('href', 'http://localhost:3000/' + element.roomId);
                aTag.innerHTML = element.roomName;
                li.append(aTag);
                ul.append(li);
            });
            document.getElementById('my-very-unique-id').append(ul);
        }
    };
    xhr.send();
});