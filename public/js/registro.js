document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    
    if (password !== confirmPassword) {
        console.log('Las contraseñas no coinciden.');
        return;
    }

    fetch('/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: password,
            confirm_password: confirmPassword,
            fullname: document.getElementById('fullname').value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            window.location.href = data.redirectUrl;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al registrar usuario');
    });
});