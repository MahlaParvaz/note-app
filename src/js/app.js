import NotesAPI from './notesAPI.js';
import NotesAppView from './notesAppView.js';
export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesAppView(root, this._handlers());
    this._refreshNotes();
  }
  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();
    this._setNotes(notes);
    if (notes.length > 0) {
      this._setActiveNotes(notes[0]);
    }
  }
  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }
  _setActiveNotes(note) {
    this.activeNote = note = note;
    this.view.updateActiveNotes(note);
  }
  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: 'New Note',
          body: 'Take Some Note',
        };
        NotesAPI.saveNotes(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNotes({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((note) => note.id == noteId);
        this._setActiveNotes(selectedNote);
      },
      onNoteDelete: (noteId) => {
        NotesAPI.deleteNotes(noteId);
        this._refreshNotes();
      },
    };
  }
}
