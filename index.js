let myLibrary = [];

// Book constructor
function Book(id, title, author, numOfPages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.read = read;
}

Book.prototype.changeStatus = function () {
  this.read = !this.read;
};

// Initial setup
function initialSetup() {
  const book1 = new Book(1, "The Hobbit", "J.R.R Tolkien", 250, false);
  const book2 = new Book(2, "Harry Potter", "J.K Rowling", 295, true);
  myLibrary.push(book1);
  myLibrary.push(book2);
  refreshBooks(myLibrary);

  // DOM elements
  const dialogBox = document.querySelector("dialog");
  const closeBtn = document.querySelector("dialog .close-btn");
  const addBookForm = document.querySelector("dialog .book-form");
  const modalBtn = document.querySelector(".modal-btn");

  // Event listeners
  closeBtn.onclick = () => {
    addBookForm.reset();
    dialogBox.close();
  };
  modalBtn.onclick = () => {
    dialogBox.showModal();
  };
  addBookForm.onsubmit = (e) => {
    e.preventDefault();
    const data = {};
  
    // Create form data object and
    // add key-value pairs to data
    const formData = new FormData(e.currentTarget);
    for (let [key, value] of formData) {
      data[key] = value;
    }
    // Add book to myLibrary
    addBookToLibrary(data);
    dialogBox.close();
    addBookForm.reset();
  };
}
initialSetup();

// Add books to myLibrary
function addBookToLibrary(data) {
  const bookId = myLibrary.length ? myLibrary[myLibrary.length - 1].id + 1 : 1;
  const book = new Book(
    bookId,
    data.title,
    data.author,
    parseInt(data.pages),
    data.status === "on" ? true : false
  );
  myLibrary.push(book);
  refreshBooks(myLibrary);
}

// Remove book
function removeBook(index) {
  myLibrary.splice(index, 1);
  refreshBooks(myLibrary);
}

// Change book status
function toggleStatus(index) {
  console.log(index);
  myLibrary[index].changeStatus();
  refreshBooks(myLibrary);
}

// Refresh books table
function refreshBooks(library) {
  const libraryBody = document.querySelector(".library tbody");
  libraryBody.innerHTML = "";

  if (library.length === 0) {
    const tr = `
      <tr>
        <td colspan="5" style="text-align: center;">No Books.</td>
      </tr>
    `;
    libraryBody.innerHTML = tr;
  } else {
    library.forEach((book, index) => {
      const tr = `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.numOfPages}</td>
          <td class="status-box">
            <button class="${
              book.read ? "read-btn" : "unread-btn"
            }" onclick="toggleStatus(${index})">
              ${book.read ? "Read" : "Not Read"}
            </button>
          </td>
          <td>
            <button class="remove-book-btn" onclick="removeBook(${index})">
              X
            </button>
          </td>
        </tr>
      `;
      libraryBody.innerHTML += tr;
    });
  }
}
