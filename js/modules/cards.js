import { createElementWithClassAndText } from "../utils/utils.js";
import { deleteNote } from "./storage.js";

export const createNoteCard = (note, showContent = false) => {
  const noteElement = document.createElement("li");
  noteElement.classList.add("notes__item", "note-card");
  noteElement.dataset.title = note.title;
  noteElement.dataset.content = note.content;

  const noteTitle = createElementWithClassAndText(
    "h3",
    "note-card__title",
    note.title
  );
  const noteDate = createElementWithClassAndText(
    "cite",
    "note-card__date",
    note.date
  );

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "button-destructive", "delete-note-btn");
  deleteButton.textContent = "Supprimer";

  deleteButton.addEventListener("click", () => {
    deleteNoteAndRefresh(note, noteElement);
  });

  noteElement.appendChild(noteTitle);
  noteElement.appendChild(noteDate);

  if (showContent) {
    const noteContent = createElementWithClassAndText(
      "p",
      "note-card__content",
      note.content
    );
    noteElement.appendChild(noteContent);
  }

  noteElement.appendChild(deleteButton);

  return noteElement;
};

const deleteNoteAndRefresh = (note, noteElement) => {
  deleteNote(note);
  noteElement.remove();
};
