// ======================================================================
// SISTEMA UNIVERSITARIO - Versión todo en un solo archivo (actualizado 2026)
// Con más carreras realistas para Ecuador
// ======================================================================

// NOTA GENERAL SOBRE UNIDADES DEL PROYECTO:
// Este sistema aplica conceptos de POO conforme a las unidades especificadas:
//
// Unidad 1: Fundamentos de programación orientada a objetos
// - Clases y objetos: Definidas para Estudiante, LocalExamen, Matricula, etc. Se crean instancias (objetos) de clases como FacadeUniversidad.
// - Propiedades, constructores, métodos y sobrecarga: Cada clase tiene propiedades encapsuladas, constructores (e.g., en GestorCupos), métodos get/set implícitos mediante encapsulamiento.
// - Encapsulamiento: Uso de modificadores de acceso (private, public, protected) en clases como SistemaUniversidad. Paso por valor/parámetro en métodos como postular() y matricular().
//
// Unidad 2: Herencia y polimorfismo
// - Herencia simple: GestorCupos hereda de Subject (superclase abstracta).
// - Constructores en la superclase: Llamada a super() en GestorCupos.
// - Polimorfismo con clases abstractas: Subject es abstracta, con métodos como notify() implementados en subclases.
// - Polimorfismo con interfaces: Observer es una interface implementada por Notificador.
//
// Unidad 3: Patrones de diseño
// - Principios SOLID: S (Singleton en SistemaUniversidad), O (abierto a extensión en Observer), L (polimorfismo en herencia), I (interfaces pequeñas como Observer), D (dependencias invertidas en Facade).
// - Patrones Creacionales: Singleton (SistemaUniversidad).
// - Patrones Estructurales: Facade (FacadeUniversidad simplifica el sistema).
// - Patrones de Comportamiento: Observer (para notificaciones de cupos en GestorCupos).

import promptSync from "prompt-sync";

const prompt = promptSync();

// ----------------------------------------------------------------------
// 1. INTERFACES / TIPOS (Unidad 2: Polimorfismo con interfaces - Interfaces definen contratos para clases implementadoras)
// ----------------------------------------------------------------------

interface Estudiante {
  cedula: string;
  nombres: string;
  apellidos: string;
  unidad: string;
  notaBachiller: number;
  email: string;
}

interface LocalExamen {
  sede: string;
  aula: string;
  jornada: string;
  hora: string;
}

interface Matricula {
  codigo: string;
  cedula: string;
  carrera: string;
  fecha: string;
  estado: "ACTIVO" | "RETIRADO";
}

// ----------------------------------------------------------------------
// 2. BASE DE DATOS EN MEMORIA (Unidad 1: Objetos - Estructuras de datos como Records y arrays son objetos que almacenan información)
// ----------------------------------------------------------------------

const ESTUDIANTES: Record<string, Estudiante> = {};

const LOCALES: LocalExamen[] = [
  { sede: "ULEAM - Bloque 3", aula: "301", jornada: "Mañana", hora: "08:00" },
  { sede: "ULEAM - Bloque 5", aula: "502", jornada: "Tarde", hora: "14:30" },
  { sede: "ESPE - Edificio Central", aula: "Auditorio", jornada: "Mañana", hora: "09:00" },
];

const UNIVERSIDADES: Record<string, { carreras: Record<string, number> }> = {
  ULEAM: {
    carreras: {
      Medicina: 30,
      Enfermería: 60,
      Psicología: 80,
      "Pedagogía de los Idiomas": 50,
      Turismo: 40
    },
  },
  ESPE: {
    carreras: {
      Derecho: 120,
      "Ingeniería en Sistemas": 80,
      "Ingeniería Civil": 50,
      "Ingeniería Mecánica": 45,
      "Administración de Empresas": 100,
      Ciberseguridad: 40
    }
  }
};

const ACEPTADOS: Record<string, { universidad: string; carrera: string }> = {};
const MATRICULADOS: Record<string, Matricula> = {};

// ----------------------------------------------------------------------
// 3. PATRÓN OBSERVER (para notificar reducción de cupos)
// Unidad 3: Patrones de Comportamiento - Observer permite notificar cambios (e.g., reducción de cupos) a observadores.
// Unidad 2: Polimorfismo con interfaces (Observer) y clases abstractas (Subject).
// ----------------------------------------------------------------------

interface Observer {
  update(mensaje: string): void;
}

class Notificador implements Observer {
  update(mensaje: string): void {
    console.log(`[NOTIFICACIÓN] ${mensaje}`);
  }
}

abstract class Subject {
  protected observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  notify(mensaje: string) {
    this.observers.forEach((o) => o.update(mensaje));
  }
}

class GestorCupos extends Subject {
  constructor(private universidades: Record<string, { carreras: Record<string, number> }>) {
    super();
  }

  reducir(universidad: string, carrera: string) {
    const cuposActuales = this.universidades[universidad]?.carreras[carrera];
    if (cuposActuales !== undefined && cuposActuales > 0) {
      this.universidades[universidad].carreras[carrera]--;
      this.notify(`Cupo reducido en ${universidad} - ${carrera}. Restantes: ${this.universidades[universidad].carreras[carrera]}`);
    }
  }
}

// ----------------------------------------------------------------------
// 4. SINGLETON - Sistema Universidad
// Unidad 3: Patrones Creacionales - Singleton asegura una única instancia del sistema.
// Unidad 1: Encapsulamiento - Propiedades private, constructor private.
// ----------------------------------------------------------------------

class SistemaUniversidad {
  private static instance: SistemaUniversidad | null = null;

  public estudiantes = ESTUDIANTES;
  public locales = LOCALES;
  public universidades = UNIVERSIDADES;

  private constructor() {}

  static getInstance(): SistemaUniversidad {
    if (!SistemaUniversidad.instance) {
      SistemaUniversidad.instance = new SistemaUniversidad();
    }
    return SistemaUniversidad.instance;
  }
}

// ----------------------------------------------------------------------
// 5. UTILIDADES - Simulación de examen con rangos realistas por carrera
// Unidad 1: Métodos - Función rendirExamen demuestra paso por parámetro (carrera) y retorno de valor.
// ----------------------------------------------------------------------

function rendirExamen(carrera: string): number {
  const rangos: Record<string, [number, number]> = {
    Medicina: [8.5, 10],
    Enfermería: [7.8, 9.8],
    Psicología: [7.5, 9.5],
    "Pedagogía de los Idiomas": [7.0, 9.2],
    Turismo: [6.8, 9.0],
    Derecho: [8.0, 9.9],
    "Ingeniería en Sistemas": [7.5, 9.8],
    "Ingeniería Civil": [7.2, 9.5],
    "Ingeniería Mecánica": [7.0, 9.4],
    "Administración de Empresas": [7.0, 9.3],
    Ciberseguridad: [8.0, 10],
  };

  const [min, max] = rangos[carrera] ?? [6.5, 9.5];
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// ----------------------------------------------------------------------
// 6. SERVICIOS
// Unidad 1: Clases, métodos, encapsulamiento - Servicios como AdmisionService encapsulan lógica, con propiedades private.
// Unidad 3: SOLID - Inyección de dependencias (gestor en constructor).
// ----------------------------------------------------------------------

class AdmisionService {
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

    if (ACEPTADOS[cedula]) {
      const { universidad, carrera } = ACEPTADOS[cedula];
      console.log(`❌ Ya has sido aceptado en ${universidad} - ${carrera}. No puedes postularte nuevamente.`);
      return;
    }

    console.log("\nUniversidades disponibles:");
    const universidades = Object.keys(this.sistema.universidades);
    universidades.forEach((u, i) => console.log(`${i + 1}. ${u}`));

    const opcionUni = Number(prompt("Opción de universidad: ")) - 1;
    if (isNaN(opcionUni) || opcionUni < 0 || opcionUni >= universidades.length) {
      console.log("Opción inválida ❌");
      return;
    }
    const universidad = universidades[opcionUni];

    console.log(`\nCarreras disponibles en ${universidad}:`);
    const carreras = Object.keys(this.sistema.universidades[universidad].carreras);
    carreras.forEach((c, i) =>
      console.log(`${i + 1}. ${c} (${this.sistema.universidades[universidad].carreras[c]} cupos)`)
    );

    const opcionCarrera = Number(prompt("Opción de carrera: ")) - 1;
    if (isNaN(opcionCarrera) || opcionCarrera < 0 || opcionCarrera >= carreras.length) {
      console.log("Opción inválida ❌");
      return;
    }
    const carrera = carreras[opcionCarrera];

    console.log("\n¡Postulación recibida exitosamente!");
    console.log("Sede asignada para rendir el examen de admisión:");
    console.log("Sede: ULEAM - Bloque 3 | Aula: 301 | Jornada: Mañana | Hora: 08:00\n");

    const rendir = prompt("¿Desea rendir el examen de admisión ahora? (sí/no): ").toLowerCase().trim();
    if (!["sí", "si", "s"].includes(rendir)) {
      console.log("Postulación guardada. Puedes rendir el examen más tarde.");
      return;
    }

    console.log("\nIniciando examen de admisión...");
    console.log("Procesando respuestas del estudiante...\n");

    const notaExamen = rendirExamen(carrera);
    const notaBachiller = estudiante.notaBachiller;
    const puntajeFinal = (notaExamen + notaBachiller) / 2;

    console.log("=== RESULTADOS DEL EXAMEN DE ADMISIÓN ===");
    console.log(`Nota de bachillerato:       ${notaBachiller.toFixed(2)}`);
    console.log(`Nota del examen rendido:    ${notaExamen.toFixed(2)}`);
    console.log(`Promedio final:             ${puntajeFinal.toFixed(2)}`);
    console.log("========================================\n");

    // Umbral más alto para carreras muy competitivas
    const umbral = ["Medicina", "Derecho", "Ciberseguridad"].includes(carrera) ? 8.5 : 8.0;

    if (puntajeFinal >= umbral && this.sistema.universidades[universidad].carreras[carrera] > 0) {
      this.gestor.reducir(universidad, carrera);
      ACEPTADOS[cedula] = { universidad, carrera };
      console.log(`¡FELICIDADES! Has sido ACEPTADO ✅ en ${universidad} - ${carrera}\n`);
    } else {
      if (puntajeFinal < umbral) {
        console.log(`No aceptado ❌ - Puntaje insuficiente (requerido: ${umbral.toFixed(1)} o más)`);
      } else {
        console.log(`No aceptado ❌ - No hay cupos disponibles en ${carrera}`);
      }
      console.log("");
    }
  }
}

class MatriculaService {
  matricular(cedula: string) {
    // 1. ¿Está aceptado?
    if (!ACEPTADOS[cedula]) {
      console.log("❌ El estudiante no ha sido aceptado en ninguna carrera aún.");
      return;
    }

    // 2. ¿Ya tiene matrícula activa? ← Verificación para evitar duplicados
    if (MATRICULADOS[cedula]) {
      const mat = MATRICULADOS[cedula];
      console.log(`❌ El estudiante ya está matriculado:`);
      console.log(`   Carrera: ${mat.carrera}`);
      console.log(`   Código: ${mat.codigo}`);
      console.log(`   Fecha: ${mat.fecha}`);
      console.log("No se permite matrícula múltiple.");
      return;
    }

    // Si todo bien → matricular
    const { universidad, carrera } = ACEPTADOS[cedula];

    MATRICULADOS[cedula] = {
      codigo: "MAT-" + Math.floor(100000 + Math.random() * 900000),
      cedula,
      carrera,
      fecha: new Date().toLocaleDateString("es-EC"),
      estado: "ACTIVO"
    };

    console.log(`\nMatrícula Exitosa ✅ en ${universidad} - ${carrera}`);
    console.log(`Código de matrícula: ${MATRICULADOS[cedula].codigo}`);
    console.log(`Fecha: ${MATRICULADOS[cedula].fecha}\n`);
  }
}

// ----------------------------------------------------------------------
// 7. FACHADA (Facade)
// Unidad 3: Patrones Estructurales - Facade simplifica la interacción con subsistemas (admision, matricula, sistema).
// ----------------------------------------------------------------------

class FacadeUniversidad {
  private admision = new AdmisionService();
  private matricula = new MatriculaService();
  private sistema = SistemaUniversidad.getInstance();

  registrarEstudiante() {
    const est: Estudiante = {
      cedula: prompt("Cédula: "),
      nombres: prompt("Nombres: "),
      apellidos: prompt("Apellidos: "),
      unidad: prompt("Unidad Académica de procedencia: "),
      notaBachiller: Number(prompt("Nota de bachillerato (0-10): ")),
      email: prompt("Email: "),
    };

    if (this.sistema.estudiantes[est.cedula]) {
      console.log("❌ Ya existe un estudiante con esa cédula.");
      return;
    }

    if (isNaN(est.notaBachiller) || est.notaBachiller < 0 || est.notaBachiller > 10) {
      console.log("❌ La nota de bachillerato debe estar entre 0 y 10.");
      return;
    }

    this.sistema.estudiantes[est.cedula] = est;
    console.log(`\n✅ Estudiante registrado exitosamente: ${est.nombres} ${est.apellidos}\n`);
  }

  postular() {
    this.admision.postular();
  }

  matricular() {
    const cedula = prompt("Cédula del estudiante: ");
    this.matricula.matricular(cedula);
  }
}

// ----------------------------------------------------------------------
// 8. PROGRAMA PRINCIPAL
// Unidad 1: Objetos y métodos - Creación de objeto facade y llamada a métodos en loop.
// ----------------------------------------------------------------------

function main() {
  console.log("=====================================");
  console.log("   SISTEMA DE ADMISIÓN UNIVERSITARIA  ");
  console.log("           ECUADOR 2026              ");
  console.log("=====================================\n");

  const facade = new FacadeUniversidad();

  while (true) {
    console.log("1. Registrar estudiante");
    console.log("2. Postularse (examen de admisión)");
    console.log("3. Realizar matrícula");
    console.log("4. Salir\n");

    const opcion = prompt("Seleccione una opción → ").trim();

    console.log("");

    switch (opcion) {
      case "1":
        facade.registrarEstudiante();
        break;
      case "2":
        facade.postular();
        break;
      case "3":
        facade.matricular();
        break;
      case "4":
        console.log("¡Gracias por usar el sistema! 👋\n");
        return;
      default:
        console.log("Opción no válida. Intente nuevamente.\n");
    }
  }
}

// Iniciar el programa
main();
