async function addComment(event) {
    event.preventDefault()

    const text = document.getElementById("comment-text").value
    const post_id =document.getElementById("comment-text").dataset.id

    if (text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                text: text,
                post_id: post_id
            }),
            headers: {
                'Content-Type': 'application/json'
              }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert("Unable to post comment")
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', addComment)