let currentUser = {};

document.addEventListener("DOMContentLoaded", () => {
    comments.addEventListener("click", toggleComments);
    closeComments.addEventListener("click", toggleComments);


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

    document.getElementById("submitNewUser").addEventListener("click", function(event){
        event.preventDefault();
        assembleCurrentUser();
    });
});

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

function assembleCurrentUser() {
    currentUser.username = document.getElementById('username').value
    currentUser.email = document.getElementById('email').value
    currentUser.grade  = document.getElementById('grade').value

    document.getElementById("interName").innerHTML = currentUser.username;

    document.getElementById("userForm").style.display = "none";
    document.getElementById("top").style.display = "block";
 }




