document.addEventListener('DOMContentLoaded', function () {
    const noteText = document.getElementById('note-text');
    const saveNoteBtn = document.getElementById('save-note');
    const notesList = document.getElementById('notes-list');

    // Load notes from localStorage
    loadNotes();

    // Save note button click event
    saveNoteBtn.addEventListener('click', function () {
        const noteContent = noteText.value.trim();
        if (noteContent) {
            saveNoteToLocalStorage(noteContent);
            addNoteToDOM(noteContent);
            noteText.value = '';
        }
    });

    // Function to load notes from localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            addNoteToDOM(note);
        });
    }

    // Function to save note to localStorage
    function saveNoteToLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Function to add note to DOM
    function addNoteToDOM(noteContent) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.textContent = noteContent;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-note');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', function () {
            deleteNoteFromDOM(noteDiv);
            deleteNoteFromLocalStorage(noteContent);
        });

        noteDiv.appendChild(deleteBtn);
        notesList.appendChild(noteDiv);
    }

    // Function to delete note from DOM
    function deleteNoteFromDOM(noteElement) {
        notesList.removeChild(noteElement);
    }

    // Function to delete note from localStorage
    function deleteNoteFromLocalStorage(noteContent) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.filter(note => note !== noteContent);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
});
