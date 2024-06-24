document.addEventListener('DOMContentLoaded', function() {
    loadNotes();
});

document.getElementById('save_note_btn').addEventListener('click', function() {
    const title = document.getElementById('note_title').value;
    const content = document.getElementById('notes').value;

    if (title && content) {
        const date = new Date().toLocaleDateString();
        const note = {
            title: title,
            content: content,
            date: date
        };

        saveNoteToLocalStorage(note);

        addNoteToList(note);

        document.getElementById('note_title').value = '';
        document.getElementById('notes').value = '';
    } else {
        alert('Veuillez entrer un titre et un contenu pour la note.');
    }
});

document.getElementById('reset_notes_btn').addEventListener('click', function() {
    localStorage.removeItem('notes');
    document.getElementById('notes_list').innerHTML = '';
    document.getElementById('note_title').value = '';
    document.getElementById('notes').value = '';
});

function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToList(note);
    });
}

function addNoteToList(note) {
    const noteItem = document.createElement('li');
    const noteLink = document.createElement('a');
    noteLink.href = '#';
    noteLink.innerHTML = `${note.title} <cite>${note.date}</cite>`;
    noteLink.dataset.title = note.title;
    noteLink.dataset.content = note.content;

    noteLink.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('note_title').value = noteLink.dataset.title;
        document.getElementById('notes').value = noteLink.dataset.content;
    });

    noteItem.appendChild(noteLink);
    document.getElementById('notes_list').appendChild(noteItem);
}
