document.addEventListener("DOMContentLoaded", function() {
    let noteList = document.getElementById('noteList');
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.forEach((note) => {
        let div = document.createElement('div');
        div.classList.add('noteListItem');
        let h2 = document.createElement('h2');
        h2.innerHTML = note.title + ' ' + note.date;
        let p = document.createElement('p');
        p.innerHTML = note.notes;
        div.appendChild(h2);
        div.appendChild(p);
        noteList.appendChild(div);
    });
});