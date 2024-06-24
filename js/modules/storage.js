const STORAGE_KEY = "notes";

export const saveNote = (note) => {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const getNotes = () => {
  const notes = localStorage.getItem(STORAGE_KEY);
  return notes ? JSON.parse(notes) : [];
};

export const deleteNote = (noteToDelete) => {
  let notes = getNotes();
  notes = notes.filter(
    (note) =>
      !(
        note.title === noteToDelete.title &&
        note.content === noteToDelete.content
      )
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};
