document.addEventListener("DOMContentLoaded", function() {
    let saveBtn = document.getElementById('save_note_btn');
    let notes = document.getElementById('notes');
    let title = document.getElementById('note_title');
    let ul = document.getElementsByTagName('ul')[0];
    let liList = document.querySelectorAll('li');
    let resetBtn = document.getElementById('resetLocalStorage');

    let noteList = JSON.parse(localStorage.getItem('notes'));

    if(noteList && noteList.length > 0) {
        noteList.map(note => {
            let li = document.createElement("li");
            let div = document.createElement('div');
            div.innerHTML = note.title +' '+ note.date;
            div.classList.add('item')
            // li.innerHTML = title.value + ' ' + date;
            div.addEventListener('click', (e) => {
                let noteTitle = e.target.innerHTML;
                noteTitle = noteTitle.split(' ');
                noteTitle = noteTitle.splice(0, noteTitle.length - 1).join(' ');
                let noteList = JSON.parse(localStorage.getItem('notes'));
                let note = noteList.find(note => note.title === noteTitle);
                title.value = note.title;
                notes.value = note.notes;
            });
            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete_btn');
            deleteBtn.innerHTML = 'Supr';
            deleteBtn.addEventListener('click', (e) => {
                let noteList = JSON.parse(localStorage.getItem('notes'));
                noteList = noteList.filter(noteEl => noteEl.title !== note.title);
                localStorage.setItem('notes', JSON.stringify(noteList));
                location.reload();
            });
            li.appendChild(div);
            li.appendChild(deleteBtn);
            ul.appendChild(li);
        });
    }

    saveBtn.addEventListener('click', function() {
        let noteList = JSON.parse(localStorage.getItem('notes'));

        let currentDate= new Date();
        let date = currentDate.getFullYear()+'/'+(currentDate.getMonth()+1)+'/'+currentDate.getDate();

        if(noteList && noteList.length > 0) {
            let noteList = JSON.parse(localStorage.getItem('notes'));
            let note = noteList.find(note => note.title === title.value);
            if (note) {
                noteList.map(noteEl => {
                    if(noteEl.title === title.value) {
                        noteEl.notes = notes.value;
                        noteEl.date = date;
                        localStorage.setItem('notes', JSON.stringify(noteList));
                        location.reload();
                        return;
                    }
                })
            } else {
                noteList.push({title: title.value, notes: notes.value, date: date});
                localStorage.setItem('notes', JSON.stringify(noteList));

                location.reload();

                // let li = document.createElement("li");
                // let div = document.createElement('div');
                // div.innerHTML = title.value +' '+ date;
                // div.classList.add('item')
                // // li.innerHTML = title.value + ' ' + date;
                // li.appendChild(div);
                // ul.appendChild(li);
            }
            
        } else {
            localStorage.setItem('notes', JSON.stringify([{title: title.value, notes: notes.value, date: date}]));

            location.reload();

            // let li = document.createElement("li");
            // let div = document.createElement('div');
            // div.innerHTML = title.value +' '+ date;
            // div.classList.add('item')
            // // li.innerHTML = title.value + ' ' + date;
            // li.appendChild(div);
            // ul.appendChild(li);
        }

        notes.value = "";
        title.value = "";
    });

    resetBtn.addEventListener('click', function() {
        localStorage.removeItem('notes');
        location.reload();
    });

});

