
function saveNote() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let currentDate = `${day}/${month}/${year} ${hour}:${minute}:${second}  `;
    var title = document.getElementById('note_title').value
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.classList.add("note");
    li.appendChild(document.createTextNode(title + " " + currentDate));
    ul.appendChild(li);
}