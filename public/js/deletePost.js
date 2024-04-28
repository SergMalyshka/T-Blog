async function deletePost(event) {
    event.preventDefault();

    const id = document.getElementById('submit').dataset.id

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert("Unable to delete post")
    }
}

document.getElementById('submit').addEventListener('click', deletePost)