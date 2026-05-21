const storageKey = "simple-node-localstorage.notes";
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const list = document.querySelector("#note-list");
const count = document.querySelector("#note-count");
const clearButton = document.querySelector("#clear-button");
const template = document.querySelector("#note-template");

function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(storageKey, JSON.stringify(notes));
}

function renderNotes() {
  const notes = loadNotes();
  list.replaceChildren();
  count.textContent = String(notes.length);

  notes.forEach((note) => {
    const item = template.content.firstElementChild.cloneNode(true);
    item.querySelector(".note-text").textContent = note.text;
    item.querySelector(".delete-button").addEventListener("click", () => {
      saveNotes(loadNotes().filter((current) => current.id !== note.id));
      renderNotes();
    });
    list.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  const notes = loadNotes();
  notes.unshift({
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  });
  saveNotes(notes);
  input.value = "";
  input.focus();
  renderNotes();
});

clearButton.addEventListener("click", () => {
  saveNotes([]);
  renderNotes();
});

renderNotes();
