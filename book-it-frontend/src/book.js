class Book {
    constructor(book) {
        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.publisher = book.publisher;
        this.subject = book.subject;
        this.review = book.review;
        this.rating = book.rating;
        this.poster_username = book.poster_username;
        this.poster_email = book.poster_email;
        this.poster_grade = book.poster_grade;
        this.likes = book.likes;
        this.image = book.image;
    }

    renderBook() {
        this.template = this.template.replace("TITLE", this.title);
        this.template = this.template.replace("AUTHOR", this.author);
        this.template = this.template.replace("REVIEW", this.review);
        this.template = this.template.replace("RATING", this.rating);
        this.template = this.template.replace("LIKES", this.likes);
        this.template = this.template.replace(/BOOKID/g, this.id);

        this.template = this.template.replace("USERNAME", this.poster_username);
        this.template = this.template.replace("EMAIL", this.poster_email);
        this.template = this.template.replace("GRADE", this.poster_grade);

        document.getElementById("books").innerHTML += this.template;

        document.getElementById("bookForm").hidden = true;
        document.getElementById("top").hidden = false;
    }

    template =
        "<div class='col-md-4' style='padding: 8px'>" +
        "  <div class='card shadow-sm'>" +
        "    <div class='card-body overflow-auto' style='padding: 15px; height: 15rem;'>" +
        "      <h4 class='mb-0'>TITLE</h4>" +
        "      <strong class='d-inline-block mb-1 text-success'>AUTHOR</strong>" +
        "      <div class='text-muted'>Rating: RATING/5</div>" +
        "      <p class='card-text mb-1 mt-3 font-italic'>REVIEW</p>" +
        "      <div class='text-muted mb-2'>Posted By: USERNAME, EMAIL, GRADE grade</div>" +
        "      <div class='d-flex justify-content-between align-items-center mt-2'>" +
        "        <div>" +
        "          <button id='comments' type='button' class='btn btn-sm btn-outline-secondary'onclick='toggleComments(BOOKID)'>Comments</button>" +
        "        </div>" +
        "        <div class='text-right'>LIKES <svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-heart' fill='currentColor' onclick='likeBook(event,BOOKID)'" +
        "          xmlns='http://www.w3.org/2000/svg'>" +
        "          <path fill-rule='evenodd'" +
        "            d='M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />" +
        "        </svg></div>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>";
}