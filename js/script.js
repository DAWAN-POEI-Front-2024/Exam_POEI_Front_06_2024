document.addEventListener('DOMContentLoaded', function () {
  const noteTitle = document.querySelector('#note_title');
  const notes = document.querySelector('#notes');
  const saveNoteBtn = document.querySelector('#save_note_btn');

  displayNote();

  saveNoteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    createnewNote();
    displayNote();
  });

  function createnewNote() {
    const noteTitleValue = noteTitle.value;

    const ul = document.querySelector('#chapters ul');
    const newLi = document.createElement('li');
    newLi.innerHTML = noteTitleValue;
    ul.appendChild(newLi);
  }

  function displayNote() {
    const noteAll = document.querySelectorAll('ul li');

    noteAll.forEach((note) => {
      note.addEventListener('click', function () {
        const noteText = note.innerText;
        noteTitle.value = noteText;
      });
    });
  }
});
