// Sauvegarder une note
function saveNote() {
    let title = document.getElementById('note_title').value;
    let content = document.getElementById('notes').value;
    if (title && content) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ title, content, date: new Date().toLocaleString() });
        localStorage.setItem('notes', JSON.stringify(notes));
        updateNotesList();
        document.getElementById('note_title').value = ''; // Clear the input field
        document.getElementById('notes').value = ''; // Clear the textarea
    }
}

// Mettre à jour la liste des notes
function updateNotesList() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let notesList = document.querySelector('.notes-list');
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        notesList.innerHTML += `<li onclick="loadNote(${index})">${note.title} <cite>${note.date}</cite><button onclick="deleteNote(${index})">Supprimer</button></li>`;
    });
}

// Charger une note
function loadNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (notes[index]) {
        document.getElementById('note_title').value = notes[index].title;
        document.getElementById('notes').value = notes[index].content;
    }
}

// Supprimer une note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateNotesList();
}

// Remettre à zéro le local storage
function resetStorage() {
    localStorage.removeItem('notes');
    updateNotesList();
}

// Charger la liste des notes 
window.onload = updateNotesList;
