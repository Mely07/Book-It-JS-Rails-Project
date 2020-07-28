let currentUser = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  //COMMENTS
  comments.addEventListener("click", toggleComments);
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
  document.getElementById("submitNewUser").addEventListener("click", function(event){
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
  document.getElementById("submitNewBook").addEventListener("click", function(event){
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
  }

  //USER
  function assembleCurrentUser() {
      currentUser.username = document.getElementById('username').value
      currentUser.email = document.getElementById('email').value
      currentUser.grade  = document.getElementById('grade').value

      document.getElementById("interName").innerHTML = currentUser.username;

      document.getElementById("userForm").style.display = "none";
      document.getElementById("top").style.display = "block";
  }

  //BOOK
  function createNewBook(){
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
      rating: rating
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
    .then(book => {let b = new Book(book.id, book.title, book.author, book.publisher, book.subject, book.review, book.rating)
      b.renderBook();
    })
  }

  //BOOK
  function fetchBooks(){
      return fetch("http://localhost:3000/books")
      .then(resp => resp.json())
      .then(books => {
        for(const book of books) {
          let b = new Book(book.id, book.title, book.author, book.publisher, book.subject, book.review, book.rating);
          b.renderBook();
        }
      })
  }
