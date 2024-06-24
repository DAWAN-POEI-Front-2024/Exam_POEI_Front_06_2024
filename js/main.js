let titre = document.querySelector("#note_title");
let note = document.querySelector("#notes");
let btn = document.querySelector("#save_note_btn");
let delBtn = document.querySelector("#delete_btn");

const Note = {
    title: titre.value,
    note: note.value,
    Date: new Date(),
};

btn.addEventListener("click", function () {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    localStorage.getItem("notes");
    Note.title = note.value;
    Note.note = titre.value;
    Note.Date = new Date();
    notes.push(Note);
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(notes);

    let liste = document.querySelector("ul");
    notes.forEach((e) => {
        let li = document.createElement("li");
        li.textContent = `${e.title} - ${e.note} - ${e.date}`;
        liste.appendChild(li);
    });
});

delBtn.addEventListener("click", function () {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = [];
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("Note deleted");
    let liste = document.querySelector("ul");
    liste.innerHTML = "";
});
