import promptSync from "prompt-sync";
import { FacadeUniversidad } from "./facade/FacadeUniversidad";

const prompt = promptSync();
const sistema = new FacadeUniversidad();

while (true) {
  console.log("\n===== SISTEMA UNIVERSITARIO =====");
  console.log("1. Registrar estudiante");
  console.log("2. Postulación");
  console.log("3. Matrícula");
  console.log("4. Salir");

  const op = prompt("Opción: ");

  if (op === "1") sistema.registrarEstudiante();
  else if (op === "2") sistema.postular();
  else if (op === "3") sistema.matricular();
  else if (op === "4") break;
}
