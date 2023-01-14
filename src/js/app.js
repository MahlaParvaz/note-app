import NotesAPI from './notesAPI.js';
import NotesAppView from './notesAppView.js';
const app = document.getElementById('app');

const view = new NotesAppView(app, {
  onNoteAdd() {
    console.log('add');
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle, newBody);
  },
});
