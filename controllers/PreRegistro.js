const { response } = require("express");
const PreRegistro = require("../models/preRegistro");

const crearpreUsuario = async (req, res = response) => {
  let preRegister = new PreRegistro({
    idFiscal : req.body.idFiscal,
    pais : req.body.pais,
    empresa : req.body.empresa,
    comprador : req.body.comprador,
    comentario : req.body.comentario,
    rubro: req.body.rubro
  });

  try {
    const preRegisrtroGuardado = await preRegister.save();
    

    res.json({
      ok: true,
      preRegister: preRegisrtroGuardado,
    });
  } catch (error) {
    connsole.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admnistrador...",
    });
  }
};

/* const updatepreUsuario = async (req, res = response) => {
  const preRegisterId = req.params.id;
  const uid = req.uid;

  try {
    const preRegister = await PreRegistro.findById(preRegisterId);

    if (!preRegister) {
      return res.status(400).json({
        ok: false,
        msg: "Registro no existe por ese ID",
      });
    }

    if (preRegister.user.toString() !== uid) {
      return res.status(400).json({
        ok: false,
        msg: "No tiene privilegio para editar este registro",
      });
    }

    const nuevoRegister = {
      ...req.body,
      user: uid,
    };

    const registerActualizado = await PreRegistro.findByIdAndUpdate(
      preRegisterId,
      nuevoRegister,
      { new: true }
    );

    res.json({
      ok: true,
      register: registerActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
}; */

/* const deletepreUsuario = async (req, res = response) => {
  const preRegisterId = req.params.id;
  const uid = req.uid;

  try {
    const preRegister = await PreRegistro.findById(preRegisterId);

    if (!preRegister) {
      return res.status(400).json({
        ok: false,
        msg: "Registro no existe por ese ID",
      });
    }

    if (preRegister.user.toString() !== uid) {
      return res.status(400).json({
        ok: false,
        msg: "No tiene privilegio para eliminar este registro",
      });
    }

    await PreRegistro.findByIdAndDelete(preRegisterId);
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
}; */

module.exports = {
  crearpreUsuario,
};
