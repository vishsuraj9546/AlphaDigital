import  { Schema, model, models } from "mongoose";

const applicationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    skill: { type: String, required: true },
    message: { type: String, required: true },
    resume: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ models.Application check कर रहे हैं ताकि recompile होने पर error न आए
const Application = models.Application || model("Application", applicationSchema);

export default Application;
