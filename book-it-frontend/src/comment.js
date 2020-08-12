class Comment {
    static all = [];

    constructor(comment) {
        this.id = comment.id,
            this.body = comment.body,
            this.book_id = comment.book_id,
            this.username = comment.username,
            this.save();
    }

    save() {
        Comment.all.push(this);
    };

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

    static createNewComment() {
        const body = document.getElementById('body').value
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
                let c = new Comment(comment)
                c.renderComment();
            })
    }

    static fetchComments(id) {
        document.getElementById("commentsList").innerHTML = '';
        console.log(document.getElementById("commentsList").innerHTML)
        fetch("http://localhost:3000/books/" + id + "/comments")
            .then(resp => resp.json())
            .then(comments => {
                for (const comment of comments) {
                    let c = new Comment(comment);
                    c.renderComment();
                }
            })
    }

    //COMMENT
    static toggleComments(id) {
        (event) => {
            event.preventDefault()
        };
        currentBookId = id;
        Comment.fetchComments(id);
        Comment.closeAllComments();
    }

    //COMMENT
    static closeAllComments() {
        document.getElementById("comments").innerHTML = '';
        document.getElementById("bookComments").hidden = !document.getElementById("bookComments").hidden;
        document.getElementById("books").hidden = !document.getElementById("books").hidden;
        document.getElementById("top").hidden = !document.getElementById("top").hidden;
        document.getElementById("dropDown").hidden = !document.getElementById("dropDown").hidden;
    }
}