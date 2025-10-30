# Parte 1 (Elkin) Registro nacional 

class RegistroNacional:
    def _init_(self):
        #Listas con datos de los bachilleres
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

# Parte 2 (Jeremmy) Sistema CNSIS + Inscripcion

class SistemaCNSIS:
    def __init__(self):
        self.registro = RegistroNacional()
        self.universidades = {
            "UCentral": Universidad("Universidad Central", 10, 300, "Mañana"),
            "UNorte": Universidad("Universidad del Norte", 5, 150, "Tarde")
        }
        self.carreras = {
            "MED": Carrera("MED", "Medicina", 50),
            "ING": Carrera("ING", "Ingeniería", 80),
            "DER": Carrera("DER", "Derecho", 60)
        }
        self.postulantes = []

#Inscripcion Automatica
    def inscribir(self, cedula, carrera_deseada):
        # 1. Validar cédula
        nombre, nota_bachiller = self.registro.buscar(cedula)
        if nombre is None:
            print(f"Cédula {cedula} NO registrada en CNSIS.")
            return

 #2 Evitar duplicados
        if any(p["cedula"] == cedula for p in self.postulantes):
            print("Ya estás inscrito.")
            return

#3 Asignar universidad y examen automáticamente
        uni = self.universidades["UCentral"]
        examen = uni.asignar_examen()
        if examen is None:
            print("No hay cupos para examen.")
            return

#4 Guardar postulante
        postulante = {
            "cedula": cedula,
            "nombre": nombre,
            "bachiller": nota_bachiller,
            "carrera": carrera_deseada,
            "universidad": uni.nombre,
            "examen": {
                "fecha": examen[0],
                "hora": examen[1],
                "sala": examen[2],
                "jornada": examen[3]
            },
            "nota_examen": None,
            "nota_final": None
        }
        self.postulantes.append(postulante)

#5 Primer correo (simulado)
        print(f"\nCORREO 1 → {postulante['nombre']}")
        print(f" Asunto: CONFIRMACIÓN DE EXAMEN")
        print(f" Fecha: {examen[0]} | Hora: {examen[1]}")
        print(f" Lugar: {uni.nombre} - {examen[2]} ({examen[3]})")
        print(f" Lleve: Cédula y lápiz\n")
        
# Parte 3 (Andy) Registrar nota y correo 2
   #Registrar Nota Examen
    def registrar_nota(self, cedula, nota_examen):
        for p in self.postulantes:
            if p["cedula"] == cedula:
                p["nota_examen"] = nota_examen
                p["nota_final"] = round((nota_examen * 0.5) + (p["bachiller"] * 0.5), 2)

#Segundo Correo (simulado)
                print(f"CORREO 2 → {p['nombre']}")
                print(f" Asunto: RESULTADO DEL EXAMEN")
                print(f" Nota Examen: {nota_examen}/20")
                print(f" Nota Bachiller: {p['bachiller']}/20")
                print(f" NOTA FINAL: {p['nota_final']}/20\n")
                return
        print("Cédula no encontrada.")

