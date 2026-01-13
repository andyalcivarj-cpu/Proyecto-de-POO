export interface Matricula {
  codigo: string;
  cedula: string;
  carrera: string;
  fecha: string;
  estado: "ACTIVO" | "RETIRADO";
}