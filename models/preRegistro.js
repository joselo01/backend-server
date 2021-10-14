const { Schema, model } = require("mongoose");

const preRegistroSchema = Schema({
  idFiscal: {
    type: String,
    required: true,
  },

  pais: {
    type: String,
    required: true,
  },

  rubro: { 
    type: Array, 
    required: true 
  },

  empresa: {
    type: String,
    required: true,
  },

  comprador: {
    type: String,
  },

  comentario: {
    type: String,
  },
});

preRegistroSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("PreRegistro", preRegistroSchema);
