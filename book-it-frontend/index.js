let currentUser = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  //COMMENTS
  //comments.addEventListener("click", toggleComments); //many comments buttons now 
  closeComments.addEventListener("click", toggleComments);

  //USER
  newUser.addEventListener("click", () => {
    const userFormContainer = document.getElementById("userForm")
    const topSectionContainer = document.getElementById("top")

    if (userFormContainer.style.display === "none") {
      userFormContainer.style.display = "block";
      topSectionContainer.style.display = "none";
    } else {
      userFormContainer.style.display = "none";
      topSectionContainer.style.display = "block"
    }
  });

  //USER
  document.getElementById("submitNewUser").addEventListener("click", function (event) {
    event.preventDefault();
    assembleCurrentUser();
  });

  //BOOK
  newBook.addEventListener("click", () => {
    const bookFormContainer = document.getElementById("bookForm")
    const topSectionContainer = document.getElementById("top")

    if (bookFormContainer.style.display === "none") {
      bookFormContainer.style.display = "block";
      topSectionContainer.style.display = "none";
    } else {
      bookFormContainer.style.display = "none";
      topSectionContainer.style.display = "block"
    }
  });

  //BOOK
  document.getElementById("submitNewBook").addEventListener("click", function (event) {
    event.preventDefault();
    createNewBook();
  });

});

//COMMENT
function toggleComments() {
  const commentsDiv = document.getElementById("bookComments");
  const booksDiv = document.getElementById("books");

  if (commentsDiv.style.display === "none") {
    commentsDiv.style.display = "block";
    booksDiv.style.display = "none";
  } else {
    commentsDiv.style.display = "none";
    booksDiv.style.display = "block";
  }
  // fetch comments and display them
}

//USER
function assembleCurrentUser() {
  currentUser.username = document.getElementById('username').value
  currentUser.email = document.getElementById('email').value
  currentUser.grade = document.getElementById('grade').value

  document.getElementById("interName").innerHTML = currentUser.username;

  document.getElementById("userForm").style.display = "none";
  document.getElementById("top").style.display = "block";
}

//BOOK
function createNewBook() {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const publisher = document.getElementById('publisher').value
  const subject = document.getElementById('subject').value
  const review = document.getElementById('review').value
  const rating = document.getElementById('rating').value

  let book = {
    title: title,
    author: author,
    publisher: publisher,
    subject: subject,
    review: review,
    rating: rating,
    poster_username: currentUser.username,
    poster_email: currentUser.email,
    poster_grade: currentUser.grade, 
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(book)
  }

  fetch("http://localhost:3000/books", configObj)
    .then(resp => (resp.json()))
    .then(book => {
      let b = new Book(book.id, book.title, book.author, book.publisher, book.subject, book.review, book.rating, book.poster_username, book.poster_email, book.poster_grade, book.likes)
      b.renderBook();
    })
}

//BOOK
function fetchBooks() {
  document.getElementById("books").innerHTML = '';
  fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(books => {
      for (const book of books) {
        let b = new Book(book.id, book.title, book.author, book.publisher, book.subject, book.review, book.rating, book.poster_username, book.poster_email, book.poster_grade, book.likes);
        b.renderBook();
      }
    })
}

//BOOK
function likeBook(id) {
  fetch("http://localhost:3000/books/" + id)
    .then(resp => resp.json())
    .then(json => {
      let formData = {
        "likes": json.likes + 1
      };

      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch("http://localhost:3000/books/" + id, configObj)
      .then(() => fetchBooks())
    })
}


