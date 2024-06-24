document.addEventListener("DOMContentLoaded", function() {
    const saveNoteBtn = document.getElementById('save_note_btn');
    const noteTitleInput = document.getElementById('note_title');
    const noteContentTextarea = document.getElementById('notes');
    const notesList = document.getElementById('notes_list');

    
    notesList.addEventListener('click', function(event) {
        const clickedItem = event.target.closest('li');
        
        if (!clickedItem) return; 

        
        editNoteItem(clickedItem);
    });

    
    function editNoteItem(item) {
        const textContent = item.textContent.trim();
        const textParts = textContent.split(' - '); 

        const title = textParts[0];
        const content = textParts[1].replace('date', '').trim(); 

        noteTitleInput.value = title;
        noteContentTextarea.value = content;

        
        saveNoteBtn.dataset.noteIndex = Array.from(notesList.children).indexOf(item);

        
        saveNoteBtn.textContent = 'Enregistrer';

       
        item.remove();

        noteTitleInput.focus(); 
    }

    
    saveNoteBtn.addEventListener('click', function() {
        const title = noteTitleInput.value.trim();
        const content = noteContentTextarea.value.trim();
        
        if (title === '' || content === '') {
            alert('Veuillez remplir le titre et le contenu de la note.');
            return;
        }
        
        const date = new Date().toLocaleDateString(); 
        const newNoteItem = document.createElement('li');
        newNoteItem.innerHTML = `${title} - <cite>${date}</cite>`;
        newNoteItem.classList.add('note-item');

        
        const noteIndex = parseInt(saveNoteBtn.dataset.noteIndex);
        if (isNaN(noteIndex) || noteIndex === -1) {
            newNoteItem.textContent += `: ${content}`;
            notesList.appendChild(newNoteItem); 
        } else {
            
            newNoteItem.textContent += `: ${content}`;
            notesList.insertBefore(newNoteItem, notesList.children[noteIndex]);
        }

        noteTitleInput.value = '';
        noteContentTextarea.value = '';
        saveNoteBtn.textContent = 'Sauvegarder';
        saveNoteBtn.dataset.noteIndex = -1; 

        noteTitleInput.focus(); 
    });
});


