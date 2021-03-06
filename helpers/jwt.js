const jwt = require('jsonwebtoken');

const generarJWT = ( uid, nombre, role ) => {

    return new Promise ((resolve, reject) => {

        const payload = {
            uid,
            nombre,
            role
        }
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
    
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
    
        });

    })   
}

module.exports = {
    generarJWT
}