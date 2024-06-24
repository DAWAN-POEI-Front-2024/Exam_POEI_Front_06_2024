// @ts-nocheck
import { saveNote, getNotes, deleteNote } from "./storage.js";
import { createNoteCard } from "./cards.js";

export const initEditor = () => {
  const form = document.querySelector("#editor-form");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title").trim();
    const content = formData.get("content").trim();

    if (title === "" || content === "") {
      alert("Le titre et le contenu ne peuvent pas être vides !");
      return;
    }

    const note = {
      title,
      content,
      date: new Date().toLocaleDateString(),
    };

    saveNote(note);
    displayNotes();
    form.reset();
  });

  displayNotes();
};

export const handleNoteClick = (e) => {
  const clickedElement = e.target.closest(".note-card");

  if (clickedElement) {
    const title = clickedElement.dataset.title;
    const content = clickedElement.dataset.content;

    const form = document.querySelector("#editor-form");
    form.querySelector("#note-title").value = title;
    form.querySelector("#note-content").value = content;
  }

  const deleteButton = e.target.closest(".delete-note-btn");
  if (deleteButton) {
    const noteElement = deleteButton.closest(".note-card");
    const note = {
      title: noteElement.dataset.title,
      content: noteElement.dataset.content,
    };
    deleteNoteAndRefresh(note, noteElement);

    const form = document.querySelector("#editor-form");
    if (
      form.querySelector("#note-title").value === note.title &&
      form.querySelector("#note-content").value === note.content
    ) {
      form.reset();
    }
  }
};

export const displayNotes = () => {
  const notes = getNotes();
  const notesList = document.querySelector("#notes-list");
  notesList.innerHTML = "";

  for (const note of notes) {
    const noteElement = createNoteCard(note);
    notesList.appendChild(noteElement);
  }
};

const deleteNoteAndRefresh = (note, noteElement) => {
  deleteNote(note);
  noteElement.remove();
};
