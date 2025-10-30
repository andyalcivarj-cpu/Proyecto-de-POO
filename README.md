#Parte 1(Elkin) Registro nacional 

class RegistroNacional:
    def _init_(self):
        # Listas con datos de los bachilleres
        self.cedulas = ["19012345", "19012346", "19012347"]
        self.nombres = ["Juan Moreira", "María López", "Carlos Pérez"]
        self.notas_bachiller = [18.5, 17.2, 16.8]

    def buscar(self, cedula):
        if cedula in self.cedulas:
            pos = self.cedulas.index(cedula)
            print("Registro encontrado")
            print("Cédula:", cedula)
            print("Nombre:", self.nombres[pos])
            print("Nota Bachiller:", self.notas_bachiller[pos])
            return self.nombres[pos], self.notas_bachiller[pos]
        else:
            print("Cédula no encontrada")
            return None, None


class Universidad:
    def _init_(self, nombre, salas, computadoras, jornada):
        self.nombre = nombre
        self.salas = salas
        self.computadoras = computadoras
        self.jornada = jornada
        self.cupos_totales = salas * 30
        self.cupos_ocupados = 0

    def asignar_examen(self):
        if self.cupos_ocupados < self.cupos_totales:
            self.cupos_ocupados += 1
            sala_num = (self.cupos_ocupados - 1) // 30 + 1
            fecha = "2025-11-15"
            hora = "08:00 AM"
            sala = "Sala " + str(sala_num)
            jornada = self.jornada
            return [fecha, hora, sala, jornada]
        else:
            print("No hay cupos disponibles")
            return None


class Carrera:
    def _init_(self, codigo, nombre, cupos):
        self.codigo = codigo
        self.nombre = nombre
        self.cupos = cupos
