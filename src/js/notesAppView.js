export default class NotesAppView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
    <div class="notes__sidebar">
    <div class="notes__logo">
      <h2>note app</h2>
      <hr />
    </div>
    <div class="notes__list"></div>
    <button class="notes__add-btn">add note</button>
    </div>
    <div class="notes__preview">
    <div class="notes__title">
      <input class="notes__title-input" type="text" placeholder="Note Title" onfocus="this.placeholder = ''"
      onblur="this.placeholder = 'Note Title'"/>
    </div>
    <div class="notes__text">
      <textarea name="" class="notes__text-input" onfocus="if(this.value==this.defaultValue)this.value='';" onblur="if(this.value=='')this.value=this.defaultValue;">Take Some Note</textarea>
      <button class="notes__save-btn">Save Note</button>
    </div>
    </div>
    
    `;

    const addNoteBtn = this.root.querySelector('.notes__add-btn');
    const inputTitle = this.root.querySelector('.notes__title-input');
    const inputTextBody = this.root.querySelector('.notes__text-input');
    const saveNoteBtn = this.root.querySelector('.notes__save-btn');
    addNoteBtn.addEventListener('click', () => {
      this.onNoteAdd();
    });
    [inputTitle, inputTextBody].forEach((inputField) => {
      inputField.addEventListener('blur', () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputTextBody.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });
    saveNoteBtn.addEventListener('click', () => {
      const newTitle = inputTitle.value.trim();
      const newBody = inputTextBody.value.trim();
      this.onNoteEdit(newTitle, newBody);
    });

    // hide notes preview in first loading:
    this.updateNotePreviewVisibility(false);
  }
  // create list item html
  _createListItemHTML(id, title, body, date) {
    const MAX_BODY_LENGTH = 50;
    return `
    <div class="notes__list-item" data-note-id="${id}">
    <div class="notes__list-header">
    <div class="notes__list-title" >${title}</div>
      <div class="notes__list-icons">
        <i class="fa-solid fa-trash-can"data-note-id="${id}" ></i>
      </div>
    
    </div>
    <div class="notes__list-body">
    ${body.substring(0, MAX_BODY_LENGTH)}
    ${body.length > MAX_BODY_LENGTH ? '...' : ''}
    </div>
    <div class="notes__list-date">
    ${new Date(date).toLocaleString('en', {
      dateStyle: 'full',
      timeStyle: 'short',
    })}
    </div>
  </div>
    `;
  }
  updateNoteList(notes) {
    const notesContainer = this.root.querySelector('.notes__list');
    // empty notelist
    notesContainer.innerHTML = '';
    let notesList = '';
    for (const note of notes) {
      const { id, title, body, date } = note;
      const html = this._createListItemHTML(id, title, body, date);
      notesList += html;
    }
    notesContainer.innerHTML = notesList;
    notesContainer.querySelectorAll('.notes__list-item').forEach((noteItem) => {
      noteItem.addEventListener('click', () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });
    notesContainer.querySelectorAll('.fa-trash-can').forEach((noteItem) => {
      noteItem.addEventListener('click', (event) => {
        {
          event.stopPropagation();
          this.onNoteDelete(noteItem.dataset.noteId);
        }
      });
    });
  }
  updateActiveNotes(note) {
    this.root.querySelector('.notes__title-input').value = note.title;
    this.root.querySelector('.notes__text-input').value = note.body;
    // add selected class :
    this.root.querySelectorAll('.notes__list-item').forEach((item) => {
      item.classList.remove('notes__list-item--selected');
    });
    this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add('notes__list-item--selected');
  }
  updateNotePreviewVisibility(visible) {
    this.root.querySelector('.notes__preview').style.visibility = visible ? 'visible' : 'hidden';
  }
}
