const notes = [
  {
    id: 1,
    title: 'first note',
    body: 'some dummy text first',
    date: '2021-10-31T15:02:00.411Z',
  },
  {
    id: 2,
    title: 'second note',
    body: 'some dummy text second',
    date: '2021-10-31T15:03:23.556Z',
  },
  {
    id: 3,
    title: 'third note',
    body: 'this is third note',
    date: '2021-11-01T10:47:26.889Z',
  },
];
export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes-app')) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.date) > new Date(b.date) ? -1 : 1;
    });
  }
  static saveNotes(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existedNotes = notes.find((note) => note.id == noteToSave.id);
    if (existedNotes) {
      existedNotes.title = noteToSave.title;
      existedNotes.body = noteToSave.body;
      existedNotes.date = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.id = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem('notes-app', JSON.stringify(notes));
  }
  static deleteNotes(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((note) => note.id != id);
    localStorage.setItem('notes-app', JSON.stringify(filteredNotes));
  }
  static editNotes() {}
}