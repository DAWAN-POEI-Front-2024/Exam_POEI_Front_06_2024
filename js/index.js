// @ts-nocheck
import { initEditor, handleNoteClick } from "./modules/notes.js";

document.addEventListener("DOMContentLoaded", () => {
  initEditor();
  document
    .querySelector("#notes-list")
    .addEventListener("click", handleNoteClick);
});
