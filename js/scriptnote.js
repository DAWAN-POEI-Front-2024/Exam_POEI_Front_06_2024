// js/notes.js

document.addEventListener('DOMContentLoaded', function() {
    const savedNotesList = document.getElementById('saved_notes_list');

    loadSavedNotes();

    function loadSavedNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addSavedNoteToUI(note));
    }

    function addSavedNoteToUI(note) {
        const newNoteItem = document.createElement('li');
        newNoteItem.innerHTML = `
            <div>${note.title} - ${note.date}</div>
            <div>${note.content}</div>
            <button class="delete-note-btn">Supprimer</button>
        `;

        const deleteBtn = newNoteItem.querySelector('.delete-note-btn');
        deleteBtn.addEventListener('click', function() {
            deleteNoteFromLocalStorage(note);
            newNoteItem.remove();
        });

        savedNotesList.appendChild(newNoteItem);
    }

    function deleteNoteFromLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.filter(existingNote =>
            !(existingNote.title === note.title && existingNote.content === note.content && existingNote.date === note.date)
        );
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
});
