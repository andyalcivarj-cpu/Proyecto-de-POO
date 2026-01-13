import { ACEPTADOS, MATRICULADOS } from "../data/BaseDatos";
import { Matricula } from "../models/Matricula";

export class MatriculaService {
  matricular(cedula: string) {
    if (!ACEPTADOS[cedula]) {
      console.log("No ha sido aceptado❌.");
      return;
    }

    // Extraemos universidad y carrera del objeto ACEPTADOS
    const { universidad, carrera } = ACEPTADOS[cedula];

    // Creamos la matrícula (solo usamos 'carrera' porque el modelo Matricula solo tiene ese campo)
    MATRICULADOS[cedula] = {
      codigo: "UNI-" + Math.floor(Math.random() * 100000),
      cedula,
      carrera,
      fecha: new Date().toLocaleDateString(),
      estado: "ACTIVO",
    };

    console.log(`Matrícula Exitosa✅ en ${universidad} - ${carrera}`);
  }
}