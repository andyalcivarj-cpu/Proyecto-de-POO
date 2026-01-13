import { ESTUDIANTES, LOCALES, UNIVERSIDADES } from "../data/BaseDatos";

export class SistemaUniversidad {
  private static instance: SistemaUniversidad | null = null;

  public estudiantes = ESTUDIANTES;
  public locales = LOCALES;
  public universidades = UNIVERSIDADES;  // ← ¡Esta línea es la clave!

  private constructor() {}

  static getInstance(): SistemaUniversidad {
    if (!SistemaUniversidad.instance) {
      SistemaUniversidad.instance = new SistemaUniversidad();
    }
    return SistemaUniversidad.instance;
  }
}