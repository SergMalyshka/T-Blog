async function editPost(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const text = document.getElementById('post-text').value;

    const id = document.getElementById('submit').dataset.id

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            text: text
        }),
        headers: {
            'Content-Type': 'application/json'
          }
    })

    console.log(response)

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert("Unable to update post")
    }
}

document.getElementById('updatePost').addEventListener('submit', editPost)