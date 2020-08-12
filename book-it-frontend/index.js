let currentUser = {};
let currentBookId;

document.addEventListener("DOMContentLoaded", () => {
  Book.fetchBooks();

  //USER
  newUser.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("userForm").hidden = !document.getElementById("userForm").hidden
    document.getElementById("top").hidden = !document.getElementById("top").hidden;
  });

  //USER
  closeNewUser.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("userForm").hidden = !document.getElementById("userForm").hidden
    document.getElementById("top").hidden = !document.getElementById("top").hidden;
  });

  document.getElementById("submitNewUser").addEventListener("click", (event) => {
    document.getElementById("newBook").hidden = false;
    document.getElementById("newUser").hidden = true;

    event.preventDefault();

    if (document.getElementById('username').value === "" || document.getElementById('grade').value === "") {
      alert('Please enter a Username & Grade');
    }
    else {
      assembleCurrentUser();
    }
  });

  //BOOK
  newBook.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("bookForm").hidden = !document.getElementById("bookForm").hidden;
    document.getElementById("top").hidden = !document.getElementById("top").hidden;
  });

  //BOOK
  closeNewBook.addEventListener("click", (event) => {
    document.getElementById("bookForm").hidden = true;
    document.getElementById("top").hidden = false;
  });

  //BOOK
  document.getElementById("submitNewBook").addEventListener("click", (event) => {
    event.preventDefault();
    if (document.getElementById('title').value === "" || document.getElementById('author').value === "" || document.getElementById('subject').value === "" || document.getElementById('rating').value === "") {
      alert('Required fields: Title, Author, Subject, Rating');
    }
    else {
      Book.createNewBook();
      document.getElementById("bookFormId").reset();
    }
  });

  //COMMENT
  document.getElementById("submitNewComment").addEventListener("click", (event) => {
    event.preventDefault();
    if (document.getElementById('body').value === "") {
      alert('Required field');
    }
    else {
      Comment.createNewComment();
    }
    document.getElementById("commentFormId").reset();
  });

  //COMMENT
  document.getElementById("closeNewComment").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("commentForm").hidden = !document.getElementById("commentForm").hidden;
  });

  //COMMENT
  document.getElementById("closeComments").addEventListener("click", (event) => {
    event.preventDefault();
    Comment.closeAllComments();
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

    Book.fetchBooks(subject)
  })

  document.getElementById("newComment").addEventListener("click", (event) => {
    event.preventDefault();
    if (Object.keys(currentUser).length === 0) {
      alert('Please Complete User Form to Post');
    }
    else {
      document.getElementById("commentForm").hidden = !document.getElementById("commentForm").hidden
    }
  });
});

//USER
function assembleCurrentUser() {
  currentUser.username = document.getElementById('username').value
  currentUser.email = document.getElementById('email').value
  currentUser.grade = document.getElementById('grade').value

  if (currentUser) {
    document.getElementById("interName").hidden = !document.getElementById("interName").hidden;
    document.getElementById("interName").innerHTML = ', ' + currentUser.username;
  }

  document.getElementById("userForm").hidden = true;
  document.getElementById("top").hidden = false;
}
