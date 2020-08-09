class Comment {
    constructor (comment){
        this.id = comment.id,
        this.body = comment.body,
        this.book_id = comment.book_id, 
        this.username = comment.username 
    }

renderComment() {
    this.template = this.template.replace("USERNAME", this.username);
    this.template = this.template.replace("BODY", this.body);
    this.template = this.template.replace("BOOKID", this.book_id);

    document.getElementById("commentsList").innerHTML += this.template;

    document.getElementById("commentForm").hidden = true;
    document.getElementById("top").hidden = true;
} 

template =
    "<div id='commentsList' class='media text-muted pt-3'>" +
    "  <p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'>" +
    "    <strong class='d-block text-gray-dark'>@USERNAME</strong>" +
    "     BODY " +
    "   </p>" +
    "</div>"
}