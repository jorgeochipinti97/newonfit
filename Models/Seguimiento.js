import mongoose from "mongoose";

const seguimientoSchema = new mongoose.Schema({
  ultimoCodigo: { type: Number, required: true },
});

const Seguimiento = mongoose.models.Seguimiento || mongoose.model("Seguimiento", seguimientoSchema);

export default Seguimiento;
