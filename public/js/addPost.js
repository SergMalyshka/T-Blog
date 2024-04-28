async function addPost(event) {
    event.preventDefault()

    const title = document.getElementById('post-title').value;
    const text = document.getElementById('post-text').value; 

    console.log('post data ' + title + ' ' + text)

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            text: text
        }),
        headers: {
             'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert("Unable to create new post")
    }
}

document.getElementById('newPost').addEventListener('submit', addPost)