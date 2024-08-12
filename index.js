/* CLASS SETUP */
class Book {
  constructor(id, title, author, numOfPages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
  }

  changeStatus() {
    this.read = !this.read;
  }
}

class Library {
  #books = [];

  #dialogBox;
  #closeBtn;
  #addBookForm;
  #modalBtn;
  #libraryBody;

  constructor() {
    this.#init();
    const book1 = new Book(1, "The Hobbit", "J.R.R Tolkien", 250, false);
    const book2 = new Book(2, "Harry Potter", "J.K Rowling", 295, true);
    this.#books = [book1, book2];
    this.#render();
  }

  #init() {
    this.#cacheDOM();
    this.#addEventListeners();
  }

  #cacheDOM() {
    this.#dialogBox = document.querySelector("dialog");
    this.#closeBtn = document.querySelector("dialog .close-btn");
    this.#addBookForm = document.querySelector("dialog .book-form");
    this.#modalBtn = document.querySelector(".modal-btn");
    this.#libraryBody = document.querySelector(".library tbody");
  }

  #addEventListeners() {
    this.#closeBtn.onclick = () => {
      this.#addBookForm.reset();
      this.#dialogBox.close();
    };
    this.#modalBtn.onclick = () => {
      this.#dialogBox.showModal();
    };
    this.#addBookForm.onsubmit = (e) => {
      e.preventDefault();
      const data = {};

      // Create form data object and
      // add key-value pairs to data
      const formData = new FormData(e.currentTarget);
      for (let [key, value] of formData) {
        data[key] = value;
      }
      // Add book to myLibrary
      this.#addBookToLibrary(data);
      this.#dialogBox.close();
      this.#addBookForm.reset();
    };
  }

  #addBookToLibrary(data) {
    const bookId = this.#books.length
      ? this.#books[this.#books.length - 1].id + 1
      : 1;
    const book = new Book(
      bookId,
      data.title,
      data.author,
      parseInt(data.pages),
      data.status === "on" ? true : false
    );
    this.#books.push(book);
    this.#render();
  }

  #removeBookFromLibrary(index) {
    this.#books.splice(index, 1);
    this.#render();
  }

  #render() {
    this.#libraryBody.innerHTML = "";

    if (this.#books.length === 0) {
      const tr = `
        <tr>
          <td colspan="5" style="text-align: center;">No Books.</td>
        </tr>
      `;
      this.#libraryBody.innerHTML = tr;
    } else {
      this.#books.forEach((book, index) => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const author = document.createElement("td");
        const numOfPages = document.createElement("td");
        const statusTd = document.createElement("td");
        const removeTd = document.createElement("td");
        const statusBtn = document.createElement("button");
        const removeBtn = document.createElement("button");

        title.innerText = book.title;
        author.innerText = book.author;
        numOfPages.innerText = book.numOfPages;
        statusBtn.innerText = book.read ? "Read" : "Not Read";
        removeBtn.innerText = "X";

        statusTd.className = 'status-box';
        removeBtn.className = "remove-book-btn";
        statusBtn.className = book.read ? "read-btn" : "unread-btn";

        statusBtn.addEventListener("click", () => {
          book.changeStatus();
          this.#render();
        });
        removeBtn.addEventListener("click", () =>
          this.#removeBookFromLibrary(index)
        );

        statusTd.appendChild(statusBtn);
        removeTd.appendChild(removeBtn);
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(numOfPages);
        row.appendChild(statusTd);
        row.appendChild(removeTd);
        this.#libraryBody.appendChild(row);
      });
    }
  }
}

new Library();
