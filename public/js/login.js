async function signup(event) {
    event.preventDefault();

    const username = document.getElementById('username-signup').value.trim()
    const password = document.getElementById('password-signup').value.trim()

    console.log( username, password)

    if (username && password) {
        const response = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert("Sign Up failed")
        } 
    }
}

async function login(event) {
    event.preventDefault();

    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username, password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("Login Failed");
        }
    }
}

document.getElementById('signup-form').addEventListener('submit', signup);
document.getElementById('login-form').addEventListener('submit', login);