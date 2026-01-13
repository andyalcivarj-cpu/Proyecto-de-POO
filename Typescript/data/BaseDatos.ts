import { Estudiante } from "../models/Estudiante";
import { LocalExamen } from "../models/LocalExamen";
import { Matricula } from "../models/Matricula";

export const ESTUDIANTES: Record<string, Estudiante> = {};

export const LOCALES: LocalExamen[] = [
  { sede: "ULEAM - Bloque 3", aula: "301", jornada: "Mañana", hora: "08:00" },
  { sede: "ULEAM - Bloque 5", aula: "502", jornada: "Tarde", hora: "14:30" },
  { sede: "ESPE - Edificio Central", aula: "Auditorio", jornada: "Mañana", hora: "09:00" },
];

export const UNIVERSIDADES: Record<string, { carreras: Record<string, number> }> = {
  ULEAM: {
    carreras: {
      Medicina: 30,
      "Ingeniería en Sistemas": 80,
    },
  },
  ESPE: {
    carreras: {
      Derecho: 120,
      "Ingeniería Civil": 50,
    },
  },
};

export const ACEPTADOS: Record<string, { universidad: string; carrera: string }> = {};
export const MATRICULADOS: Record<string, Matricula> = {};