const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
//const { validarJWT } = require("../middlewares/validar-jwt");
const { crearpreUsuario } = require("../controllers/PreRegistro");

const router = Router();

//router.use(validarJWT);

// Obtener datos del usuario


// crear preRegistro
router.post(
  "/new",
  [
    check("idFiscal", "El campo idFiscal es obligatorio").not().isEmpty(),
    check("pais", "El campo pais es obligatorio").not().isEmpty(),
    check("empresa", "El campo empresa es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearpreUsuario
);

module.exports = router;
