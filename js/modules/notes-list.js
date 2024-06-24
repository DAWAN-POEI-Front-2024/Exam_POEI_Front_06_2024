// @ts-nocheck
import { getNotes } from "./storage.js";
import { createNoteCard } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.querySelector("#notes-list");

  const notes = getNotes();
  for (const note of notes) {
    const noteElement = createNoteCard(note, true);
    notesList.appendChild(noteElement);
  }
});
