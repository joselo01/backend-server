const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password, nombre } = req.body;

  try {
    const usuarioBD = await Usuario.findOne({
      email,
    });

    if (!usuarioBD) {
      return res.status(404).json({
        ok: false,
        msg: "email no encontrado",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuarioBD.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no valida",
      });
    }

    const token = await generarJWT(usuarioBD.id);


    res.json({
      ok: true,
      token,
      nombre
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
