import promptSync from "prompt-sync";
import { AdmisionService } from "../services/AdmisionService";
import { MatriculaService } from "../services/MatriculaService";
import { SistemaUniversidad } from "../patterns/SingletonSistema";
import { Estudiante } from "../models/Estudiante";

const prompt = promptSync();

export class FacadeUniversidad {
  private admision = new AdmisionService();
  private matricula = new MatriculaService();
  private sistema = SistemaUniversidad.getInstance();

  registrarEstudiante() {
    const est: Estudiante = {
      cedula: prompt("Cédula: "),
      nombres: prompt("Nombres: "),
      apellidos: prompt("Apellidos: "),
      unidad: prompt("Unidad: "),
      notaBachiller: Number(prompt("Nota: ")),
      email: prompt("Email: "),
    };

    this.sistema.estudiantes[est.cedula] = est;
    console.log("✅ Estudiante registrado");
  }

  postular() {
    this.admision.postular();
  }

  matricular() {
    const cedula = prompt("Cédula: ");
    this.matricula.matricular(cedula);
  }
}
