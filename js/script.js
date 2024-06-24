document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save_note_btn');
    const removeButton = document.getElementById('remove_btn');
    const noteTitleInput = document.getElementById('note_title');
    const notesInput = document.getElementById('notes');
    const notesList = document.querySelector('#chapters ul');

    
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            addNoteToList(note, index);
        });
    }

    
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

 
    function addNoteToList(note, index) {
        const li = document.createElement('li');
        li.innerHTML = `${note.title} <cite>${note.date}</cite>`;
        li.addEventListener('click', () => {
            noteTitleInput.value = note.title;
            notesInput.value = note.content;
        });
        notesList.appendChild(li);
    }

    
    saveButton.addEventListener('click', saveNote);
    removeButton.addEventListener('click', function () {localStorage.clear();});

    
    loadNotes();
});