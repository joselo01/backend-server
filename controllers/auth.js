const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

   const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }

    usuario = new Usuario(req.body);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Gegerar JWT

    const token = await generarJWT(usuario.id, usuario.nombre, usuario.role);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      nombre: usuario.nombre,
      role: usuario.role,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador...",
    });
  }
};

const loginUsuario = async (req, res = response) => {

  const { email, password } = req.body;
  try {

    const usuario = await Usuario.findOne({ email });

    if ( !usuario ) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync( password, usuario.password );

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no valida",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.nombre, usuario.role);

    res.json({
      ok: true,
      uid: usuario.id,
      nombre: usuario.nombre,
      role: usuario.role,
      token

    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "por favor Hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response ) => {

  const { uid, nombre, role } = req;

  // Generar nuevo JWT
  const token = await generarJWT( uid, nombre, role );

  res.json({
      ok: true,
      uid,
      nombre,
      token
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
};
