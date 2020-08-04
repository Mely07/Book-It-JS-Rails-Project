let currentUser = {};
let currentBookId;


document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  //USER
  newUser.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("userForm").hidden = !document.getElementById("userForm").hidden 
    document.getElementById("top").hidden = !document.getElementById("top").hidden;
  });

  //USER
  document.getElementById("submitNewUser").addEventListener("click", function (event) {
    document.getElementById("newBook").hidden = false;
    document.getElementById("newUser").hidden = true;

    event.preventDefault();
    assembleCurrentUser();
  });

  //BOOK
  newBook.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("bookForm").hidden = !document.getElementById("bookForm").hidden;
    document.getElementById("top").hidden = !document.getElementById("top").hidden;
  });

  //BOOK
  document.getElementById("submitNewBook").addEventListener("click", function (event) {
    event.preventDefault();
    createNewBook();
  });

  //COMMENT
  document.getElementById("submitNewComment").addEventListener("click", function (event) {
    event.preventDefault();
    createNewComment();
  });

  //COMMENT
  document.getElementById("closeComments").addEventListener("click", (event) => {
    event.preventDefault();
    closeAllComments();
  })  
  
  //USER && COMMENT
  if (Object.keys(currentUser).length === 0) {
     document.getElementById("newBook").hidden = true;
     document.getElementById("newUser").hidden = false;
  }; 

  document.getElementById("getSubject").addEventListener("click", (event) => {
    event.preventDefault();
    let selSubject = document.getElementById("selectSubject");
    let subject = (selSubject[selSubject.selectedIndex].value)

    fetchBooks(subject)
  })

  
})



//COMMENT
function newComment() {
  document.getElementById("commentForm").hidden = !document.getElementById("commentForm").hidden
  document.getElementById("top").hidden = !document.getElementById("top").hidden;
}

//COMMENT
function createNewComment() {
  const body= document.getElementById('body').value
  const username = currentUser.username
  const book_id = currentBookId

  let comment = {
    body: body,
    username: username,
    book_id: book_id
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(comment)
  }

  fetch("http://localhost:3000/books/" + currentBookId + "/comments", configObj)
  
    .then(resp => (resp.json()))
    .then(comment => {
      //.log(comment)
      let c = new Comment(comment.id, comment.body, comment.book_id, comment.username)
      c.renderComment();
    })
}

//COMMENT
function toggleComments(id) {
  currentBookId = id

  closeAllComments();
 
  fetchComments(id);
}

//COMMENT
function closeAllComments() {
  document.getElementById("bookComments").hidden = !document.getElementById("bookComments").hidden;
  document.getElementById("books").hidden = !document.getElementById("books").hidden;
}


//COMMENT
function fetchComments(id) {
  document.getElementById("dropDown").hidden = !document.getElementById("dropDown").hidden;

  fetch("http://localhost:3000/books/" + id + "/comments")
    .then(resp => resp.json())
    .then(comments => {
      console.log(comments)
      for (const comment of comments) {
        let c = new Comment(comment.id, comment.body, comment.book_id, comment.username);
        c.renderComment();
      }
    })
}

//BOOK
function createNewBook() {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const publisher = document.getElementById('publisher').value
  const subject = document.getElementById('subject').value
  const review = document.getElementById('review').value
  const rating = document.getElementById('rating').value
  const image = document.getElementById('image').value

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
    likes: 0,
    image: image
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
      let b = new Book(book.id, book.title, book.author, book.publisher, book.subject, book.review, book.rating, book.poster_username, book.poster_email, book.poster_grade, book.likes, book.image)
      b.renderBook();
    })
}

//BOOK
function fetchBooks(subject) {
  document.getElementById("dropDown").hidden = !document.getElementById("dropDown").hidden;

  document.getElementById("books").innerHTML = '';
  fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(books => {
      if (subject) {
        let filteredBooks = books.filter(book => book.subject == subject);
        console.log(filteredBooks)
        filteredBooks.sort((a, b) => a.id - b.id);
        for (const book of filteredBooks) {
          let b = new Book(book.id, book.title, book.author, book.publisher, book.subject, book.review, book.rating, book.poster_username, book.poster_email, book.poster_grade, book.likes, book.image);
          b.renderBook();
        }
      }
      else {
      books.sort((a, b) => a.id - b.id);
      for (const book of books) {
        let b = new Book(book.id, book.title, book.author, book.publisher, book.subject, book.review, book.rating, book.poster_username, book.poster_email, book.poster_grade, book.likes, book.image);
        b.renderBook();
      }
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

//USER
function assembleCurrentUser() {
  currentUser.username = document.getElementById('username').value
  currentUser.email = document.getElementById('email').value
  currentUser.grade = document.getElementById('grade').value

  if (currentUser){
  document.getElementById("interName").hidden = !document.getElementById("interName").hidden;
  document.getElementById("interName").innerHTML = ', ' + currentUser.username;
  }
  document.getElementById("userForm").hidden = true;
  document.getElementById("top").hidden = false;
}
