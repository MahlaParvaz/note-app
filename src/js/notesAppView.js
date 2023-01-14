export default class NotesAppView {
  constructor(root, handler) {
    this.root = root;
    const { onNoteAdd, onNoteEdit } = handler;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;

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
      <input class="notes__title-input" type="text" placeholder="Note Title" />
    </div>
    <div class="notes__text">
      <textarea name="" class="notes__text-input">Take Some Note</textarea>
      <button class="notes__save-btn">Save Note</button>
    </div>
  </div>
    
    `;

    const addNoteBtn = this.root.querySelector('.notes__add-btn');
    const inputTitle = this.root.querySelector('.notes__title-input');
    const inputTextBody = this.root.querySelector('.notes__text-input');

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
  }
}
