const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getpreUsuario,
  crearpreUsuario,
  updatepreUsuario,
  deletepreUsuario,
} = require("../controllers/PreRegistro");

const router = Router();

router.use(validarJWT);

// Obtener datos del usuario
router.get("/", getpreUsuario);

// crear usuarios
router.post(
  "/",
  [
    check("idFiscal", "El campo idFiscal es obligatorio").not().isEmpty(),
    check("pais", "El campo pais es obligatorio").not().isEmpty(),
    check("rubro", "El campo rubro es obligatorio").not().isEmpty(),
    check("empresa", "El campo empresa es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearpreUsuario
);

// actualizar usuario
router.put(
  "/:id",
  [
    check("idFiscal", "El campo idFiscal es obligatorio").not().isEmpty(),
    check("pais", "El campo pais es obligatorio").not().isEmpty(),
    check("rubro", "El campo rubro es obligatorio").not().isEmpty(),
    check("empresa", "El campo empresa es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updatepreUsuario
);

// borrar usuario
router.delete("/:id", deletepreUsuario);

module.exports = router;
