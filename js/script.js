document.addEventListener('DOMContentLoaded', function() {
    const saveNoteBtn = document.getElementById('save_note_btn');
    const clearStorageBtn = document.getElementById('clear_storage_btn');
    const notesList = document.getElementById('notes_list');


    loadNotes();

    saveNoteBtn.addEventListener('click', function() {
        const noteTitle = document.getElementById('note_title').value.trim();
        const noteContent = document.getElementById('notes').value.trim();

        if (noteTitle === '' || noteContent === '') {
            alert('Veuillez entrer un titre et un contenu pour la note.');
            return;
        }


        const note = {
            title: noteTitle,
            content: noteContent,
            date: new Date().toLocaleDateString()
        };

        saveNoteToLocalStorage(note);

        addNoteToUI(note);

        document.getElementById('note_title').value = '';
        document.getElementById('notes').value = '';
    });


    clearStorageBtn.addEventListener('click', function() {
        if (confirm('Êtes-vous sûr de vouloir effacer toutes les notes ?')) {
            localStorage.clear();
            notesList.innerHTML = '';
        }
    });


    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addNoteToUI(note));
    }


    function saveNoteToLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }


    function addNoteToUI(note) {
        const newNoteItem = document.createElement('div');
        newNoteItem.classList.add('note-item');
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

        notesList.appendChild(newNoteItem);
    }

    
    function deleteNoteFromLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.filter(existingNote =>
            !(existingNote.title === note.title && existingNote.content === note.content && existingNote.date === note.date)
        );
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
});
