import promptSync from "prompt-sync";
import { SistemaUniversidad } from "../patterns/SingletonSistema";
import { ACEPTADOS } from "../data/BaseDatos";
import { GestorCupos } from "../patterns/GestorCupos";
import { Notificador } from "../patterns/Observer";
import { rendirExamen } from "../utils/ExamenUtils";

const prompt = promptSync();

export class AdmisionService {
  private sistema = SistemaUniversidad.getInstance();
  private gestor = new GestorCupos(this.sistema.universidades);

  constructor() {
    this.gestor.attach(new Notificador());
  }

  postular() {
    const cedula = prompt("Cédula: ");
    const estudiante = this.sistema.estudiantes[cedula];

    if (!estudiante) {
      console.log("❌ Estudiante no registrado.");
      return;
    }

    // Bloquear si ya fue aceptado en alguna universidad
    if (ACEPTADOS[cedula]) {
      const { universidad, carrera } = ACEPTADOS[cedula];
      console.log(`❌ Ya has sido aceptado en ${universidad} - ${carrera}. No puedes postularte nuevamente.`);
      return;
    }

    // Selección de universidad
    console.log("\nUniversidades disponibles:");
    const universidades = Object.keys(this.sistema.universidades);
    universidades.forEach((u, i) => console.log(`${i + 1}. ${u}`));

    const opcionUni = Number(prompt("Opción de universidad: ")) - 1;
    if (isNaN(opcionUni) || opcionUni < 0 || opcionUni >= universidades.length) {
      console.log("Opción inválida❌");
      return;
    }
    const universidad = universidades[opcionUni];

    // Selección de carrera
    console.log(`\nCarreras disponibles en ${universidad}:`);
    const carreras = Object.keys(this.sistema.universidades[universidad].carreras);
    carreras.forEach((c, i) =>
      console.log(`${i + 1}. ${c} (${this.sistema.universidades[universidad].carreras[c]} cupos)`)
    );

    const opcionCarrera = Number(prompt("Opción de carrera: ")) - 1;
    if (isNaN(opcionCarrera) || opcionCarrera < 0 || opcionCarrera >= carreras.length) {
      console.log("Opción inválida❌");
      return;
    }
    const carrera = carreras[opcionCarrera];

    // Mostrar sede asignada
    console.log("\n¡Postulación recibida exitosamente!");
    console.log("Sede asignada para rendir el examen de admisión:");
    console.log(`"sede": "ULEAM - Bloque 3", "aula": "301", "jornada": "Mañana", "hora": "08:00"\n`);

    // Preguntar si desea rendir el examen ahora
    const rendir = prompt("¿Desea rendir el examen de admisión ahora? (sí/no): ").toLowerCase().trim();
    if (rendir !== "sí" && rendir !== "si" && rendir !== "s") {
      console.log("Postulación guardada. Puedes rendir el examen más tarde (pero por ahora no se reserva cupo).");
      return;
    }

    console.log("\nIniciando examen de admisión...");
    console.log("Procesando respuestas del estudiante...\n");

    // Generar nota del examen
    const notaExamen = rendirExamen(carrera);
    const notaBachiller = estudiante.notaBachiller;
    const puntajeFinal = (notaExamen + notaBachiller) / 2;

    // Mostrar resultados detallados
    console.log("=== RESULTADOS DEL EXAMEN DE ADMISIÓN ===");
    console.log(`Nota de bachillerato:       ${notaBachiller.toFixed(2)}`);
    console.log(`Nota del examen rendido:    ${notaExamen.toFixed(2)}`);
    console.log(`Promedio final:             ${puntajeFinal.toFixed(2)}`);
    console.log("========================================\n");

    // Evaluar aceptación
    if (puntajeFinal >= 8 && this.sistema.universidades[universidad].carreras[carrera] > 0) {
      this.gestor.reducir(universidad, carrera);
      ACEPTADOS[cedula] = { universidad, carrera };
      console.log(`¡FELICIDADES! Has sido ACEPTADO✅ en ${universidad} - ${carrera}\n`);
    } else {
      if (puntajeFinal < 8) {
        console.log(`No aceptado❌ - Puntaje insuficiente (requerido: 8.00 o más)`);
      } else {
        console.log(`No aceptado❌ - No hay cupos disponibles en ${carrera}`);
      }
      console.log("");
    }
  }
}