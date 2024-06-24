document.addEventListener("DOMContentLoaded", function() {
  const saveBtn = document.getElementById("save_note_btn");
  const notesList = document.getElementById("notes_list");
  const noteTitleInput = document.getElementById("note_title");
  const noteContentInput = document.getElementById("notes");

  saveBtn.addEventListener("click", () => {
      const title = noteTitleInput.value;
      const content = noteContentInput.value;
      if (title && content) {
          localStorage.setItem(title, content);
          addNoteToList(title);
          noteTitleInput.value = '';
          noteContentInput.value = '';
      }
  });

  notesList.addEventListener("click", (event) => {
      if (event.target.tagName === 'LI') {
          const title = event.target.dataset.title;
          noteTitleInput.value = title;
          noteContentInput.value = localStorage.getItem(title);
      }
  });

  function addNoteToList(title) {
      const date = new Date().toLocaleDateString();
      const noteItem = document.createElement("li");
      noteItem.textContent = `${title} - ${date}`;
      noteItem.dataset.title = title;
      notesList.appendChild(noteItem);
  }

  Object.keys(localStorage).forEach(addNoteToList);
});
