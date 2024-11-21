const express = require('express');
const connection = require('./myconnection'); // Modificado porque están en la misma carpeta
const app = express();

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para registrar usuario
app.post('/registrar', (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    
    if (password !== confirm_password) {
        res.status(400).json({ error: 'Las contraseñas no coinciden' });
        return;
    }

    const nuevoUsuario = {
        nombre_usuario: username,
        correo_electronico: email,
        contraseña_usuario: password,
    };

    connection.query('INSERT INTO usuarios SET ?', nuevoUsuario, (error, results) => {
        if (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
            return;
        }
        
        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            userId: results.insertId,
            redirectUrl: '/HTML/inicio-secion.html'
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});