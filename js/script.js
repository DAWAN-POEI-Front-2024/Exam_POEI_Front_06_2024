document.addEventListener('DOMContentLoaded', function() {
    const saveNoteBtn = document.getElementById('save_note_btn');
    const clearStorageBtn = document.getElementById('clear_storage_btn');
    const notesList = document.getElementById('notes_list');

    // Chargement des notes depuis le localStorage
    loadNotes();

    // Écouteur de clic sur le bouton "Sauvegarder"
    saveNoteBtn.addEventListener('click', function() {
        const noteTitle = document.getElementById('note_title').value.trim();
        const noteContent = document.getElementById('notes').value.trim();

        if (noteTitle === '' || noteContent === '') {
            alert('Veuillez entrer un titre et un contenu pour la note.');
            return;
        }

        // Création d'un objet note
        const note = {
            title: noteTitle,
            content: noteContent,
            date: new Date().toLocaleDateString()
        };

        // Sauvegarde de la note dans le localStorage
        saveNoteToLocalStorage(note);

        // Ajout de la note à l'interface utilisateur
        addNoteToUI(note);

        // Réinitialisation des champs après sauvegarde
        document.getElementById('note_title').value = '';
        document.getElementById('notes').value = '';
    });

    // Écouteur de clic sur le bouton "Effacer tout"
    clearStorageBtn.addEventListener('click', function() {
        if (confirm('Êtes-vous sûr de vouloir effacer toutes les notes ?')) {
            localStorage.clear();
            notesList.innerHTML = ''; // Effacer toutes les notes de l'interface
        }
    });

    // Chargement des notes depuis le localStorage au chargement de la page
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addNoteToUI(note));
    }

    // Sauvegarde d'une note dans le localStorage
    function saveNoteToLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Ajout d'une note à l'interface utilisateur
    function addNoteToUI(note) {
        const newNoteItem = document.createElement('div');
        newNoteItem.classList.add('note-item');
        newNoteItem.innerHTML = `
            <div>${note.title} - ${note.date}</div>
            <div>${note.content}</div>
            <button class="delete-note-btn">Supprimer</button>
        `;

        // Écouteur de clic sur le bouton "Supprimer"
        const deleteBtn = newNoteItem.querySelector('.delete-note-btn');
        deleteBtn.addEventListener('click', function() {
            deleteNoteFromLocalStorage(note);
            newNoteItem.remove();
        });

        notesList.appendChild(newNoteItem);
    }

    // Suppression d'une note du localStorage
    function deleteNoteFromLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.filter(existingNote =>
            !(existingNote.title === note.title && existingNote.content === note.content && existingNote.date === note.date)
        );
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
});
