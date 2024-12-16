class Book {
	constructor(title, author, year, isRead = false) {
		this.title = title;
		this.author = author;
		this.year = year;
		this.isRead = isRead;
	}
	toggleReadStatus() {
		this.isRead = !this.isRead;
	}
}

class Library {
	constructor() {
		this.books = [];
	}
	addBook(book) {
		this.books.push(book);
		this.displayBooks();
	}
	removeBook(title) {
		this.books = this.books.filter((book) => book.title !== title);
		this.displayBooks();
	}
	getUnreadBooks() {
		return this.books.filter((book) => !book.isRead);
	}
	displayBooks() {
		const bookList = document.querySelector("#book-list");
		bookList.innerHTML = "";

		this.books.forEach((book) => {
			const bookItem = document.createElement("div");
			bookItem.className = "book-item";

			bookItem.innerHTML = `
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Read:</strong> ${book.isRead ? "Yes" : "No"}</p>
                <button class="toggle-read">Toggle Read</button>
                <button class="remove-book">Remove</button>
            `;

			bookItem
				.querySelector(".toggle-read")
				.addEventListener("click", () => {
					book.toggleReadStatus();
					this.displayBooks();
				});

			bookItem
				.querySelector(".remove-book")
				.addEventListener("click", () => {
					this.removeBook(book.title);
				});

			bookList.appendChild(bookItem);
		});
	}
}

const library = new Library();

document.querySelector("button").addEventListener("click", () => {
	const inputs = document.querySelectorAll(".inputs input");
	const title = inputs[0].value.trim();
	const author = inputs[1].value.trim();
	const year = parseInt(inputs[2].value.trim(), 10);

	if (title && author && !isNaN(year)) {
		const newBook = new Book(title, author, year);
		library.addBook(newBook);
		inputs.forEach((input) => (input.value = "")); // Clear inputs
	} else {
		alert("Please provide valid title, author, and year.");
	}
});
