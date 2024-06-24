document.addEventListener('DOMContentLoaded', function() {
    const btnSaveNote = document.getElementById('save_note_btn');
    const noteTitleInput = document.getElementById('note_title');
    const notesTextarea = document.getElementById('notes');
    const notesList = document.getElementById('chapters').getElementsByTagName('ul')[0];

    btnSaveNote.addEventListener('click', function() {
        const title = noteTitleInput.value.trim();
        const content = notesTextarea.value.trim();

        if (title === '' || content === '') {
            alert('Veuillez remplir le titre et le contenu de la note.');
            return;
        }

        const currentDate = new Date().toLocaleDateString();
        const newNoteItem = document.createElement('li');
        const newNoteBtn = document.createElement('button');
        newNoteBtn.textContent = `${title} - ${currentDate}`;
        newNoteBtn.classList.add('note-button');

        newNoteItem.dataset.content = content;

        newNoteBtn.addEventListener('click', function() {
            const content = newNoteItem.dataset.content;
            noteTitleInput.value = title;
            notesTextarea.value = content;
        });

        newNoteItem.appendChild(newNoteBtn);

        notesList.appendChild(newNoteItem);

        noteTitleInput.value = '';
        notesTextarea.value = '';
    });

    notesList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('note-button')) {
            const buttonText = target.textContent.trim();
            const [title, date] = buttonText.split(' - ');

            const items = notesList.getElementsByTagName('li');
            for (let item of items) {
                if (item.firstChild.textContent.trim() === buttonText) {
                    const content = item.dataset.content;
                    
                    noteTitleInput.value = title;
                    notesTextarea.value = content;
                    break;
                }
            }
        }
    });
});
