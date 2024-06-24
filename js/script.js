document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save_note_btn');
    const noteTitleInput = document.getElementById('note_title');
    const notesInput = document.getElementById('notes');
    const notesList = document.querySelector('#chapters ul');

    // Load notes from local storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            addNoteToList(note, index);
        });
    }

    // Save a new note
    function saveNote() {
        const title = noteTitleInput.value.trim();
        const content = notesInput.value.trim();
        if (title && content) {
            const note = { title, content, date: new Date().toLocaleString() };
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            addNoteToList(note, notes.length - 1);
            noteTitleInput.value = '';
            notesInput.value = '';
        }
    }

    // Add a note to the list in the DOM
    function addNoteToList(note, index) {
        const li = document.createElement('li');
        li.innerHTML = `${note.title} <cite>${note.date}</cite>`;
        li.addEventListener('click', () => {
            noteTitleInput.value = note.title;
            notesInput.value = note.content;
        });
        notesList.appendChild(li);
    }

    // Event listener for the save button
    saveButton.addEventListener('click', saveNote);

    // Load notes on page load
    loadNotes();
});