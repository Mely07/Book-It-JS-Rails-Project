document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("comments").addEventListener("click", toggleComments);
    document.getElementById("close").addEventListener("click", toggleComments)
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



