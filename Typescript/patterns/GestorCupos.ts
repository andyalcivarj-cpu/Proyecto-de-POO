import { Subject } from "./Observer";

export class GestorCupos extends Subject {
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