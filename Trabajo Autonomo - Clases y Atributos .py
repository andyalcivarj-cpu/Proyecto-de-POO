#yo estuve aquí 
# SISTEMA 1: DELEGADO CNSIS - POSTULACIÓN AUTOMÁTICA (hola soy paul) no se porq no deja
# =============================================

class RegistroNacional:
    def __init__(self):
        # Datos de bachilleres (cédula → info)
        self.bachilleres = {
            "19012345": {"nombre": "Juan Moreira", "bachiller": 18.5},
            "19012346": {"nombre": "María López",  "bachiller": 17.2},
            "19012347": {"nombre": "Carlos Pérez", "bachiller": 16.8}
        }

    def buscar(self, cedula):
        return self.bachilleres.get(cedula, None)


class Universidad:
    def __init__(self, nombre, salas, computadoras, jornada):
        self.nombre = nombre
        self.salas = salas
        self.computadoras = computadoras
        self.jornada = jornada
        self.cupos_totales = salas * 30  # 30 por sala
        self.cupos_ocupados = 0

    def asignar_examen(self):
        if self.cupos_ocupados < self.cupos_totales:
            self.cupos_ocupados += 1
            sala = (self.cupos_ocupados - 1) // 30 + 1
            return {
                "fecha": "2025-11-15",
                "hora": "08:00 AM",
                "sala": f"Sala {sala}",
                "jornada": self.jornada
            }
        return None


class Carrera:
    def __init__(self, codigo, nombre, cupos):
        self.codigo = codigo
        self.nombre = nombre
        self.cupos = cupos


class SistemaCNSIS:
    def __init__(self):
        self.registro = RegistroNacional()
        self.universidades = {
            "UCentral": Universidad("Universidad Central", 10, 300, "Mañana"),
            "UNorte":   Universidad("Universidad del Norte", 5, 150, "Tarde")
        }
        self.carreras = {
            "MED": Carrera("MED", "Medicina", 50),
            "ING": Carrera("ING", "Ingeniería", 80),
            "DER": Carrera("DER", "Derecho", 60)
        }
        self.postulantes = []

    # =====================================
    # 1. INSCRIPCIÓN AUTOMÁTICA
    # =====================================
    def inscribir(self, cedula, carrera_deseada):
        # 1. Validar cédula
        datos = self.registro.buscar(cedula)
        if not datos:
            print(f"❌ Cédula {cedula} NO registrada en CNSIS.")
            return

        # 2. Evitar duplicados
        if any(p["cedula"] == cedula for p in self.postulantes):
            print("❌ Ya estás inscrito.")
            return

        # 3. Asignar universidad y examen automáticamente
        uni = self.universidades["UCentral"]
        examen = uni.asignar_examen()
        if not examen:
            print("❌ No hay cupos para examen.")
            return

        # 4. Guardar postulante
        postulante = {
            "cedula": cedula,
            "nombre": datos["nombre"],
            "bachiller": datos["bachiller"],
            "carrera": carrera_deseada,
            "universidad": uni.nombre,
            "examen": examen,
            "nota_examen": None,
            "nota_final": None
        }
        self.postulantes.append(postulante)

        # 5. PRIMER CORREO (simulado)
        print(f"\n📧 CORREO 1 → {postulante['nombre']}")
        print(f"   Asunto: CONFIRMACIÓN DE EXAMEN")
        print(f"   Fecha: {examen['fecha']} | Hora: {examen['hora']}")
        print(f"   Lugar: {uni.nombre} - {examen['sala']} ({examen['jornada']})")
        print(f"   Lleve: Cédula y lápiz\n")

    # =====================================
    # 2. REGISTRAR NOTA EXÁMEN
    # =====================================
    def registrar_nota(self, cedula, nota_examen):
        for p in self.postulantes:
            if p["cedula"] == cedula:
                p["nota_examen"] = nota_examen
                p["nota_final"] = round((nota_examen * 0.5) + (p["bachiller"] * 0.5), 2)

                # 6. SEGUNDO CORREO (simulado)
                print(f"📧 CORREO 2 → {p['nombre']}")
                print(f"   Asunto: RESULTADO DEL EXAMEN")
                print(f"   Nota Examen: {nota_examen}/20")
                print(f"   Nota Bachiller: {p['bachiller']}/20")
                print(f"   NOTA FINAL: {p['nota_final']}/20\n")
                return
        print("❌ Cédula no encontrada.")

    # =====================================
    # 3. MOSTRAR RESUMEN FINAL
    # =====================================
    def resumen(self):
        print("\n" + "="*60)
        print("RESUMEN FINAL - DELEGADO CNSIS")
        print("="*60)
        for p in self.postulantes:
            print(f"{p['nombre']}")
            print(f"  Cédula: {p['cedula']}")
            print(f"  Carrera: {self.carreras[p['carrera']].nombre}")
            print(f"  Examen: {p['examen']['fecha']} | {p['examen']['sala']}")
            print(f"  Nota Final: {p['nota_final'] or 'Pendiente'}")
            print("-"*50)
        print("CUPOS RESTANTES:")
        for c in self.carreras.values():
            print(f"  {c.nombre}: {c.cupos} cupos")
        print("="*60)


# =============================================
# EJECUCIÓN PARA EXPOSICIÓN
# =============================================

sistema = SistemaCNSIS()

print("SISTEMA 1: DELEGADO CNSIS - INSCRIPCIÓN AUTOMÁTICA\n")

# 1. Inscribir estudiantes
sistema.inscribir("19012345", "MED")
sistema.inscribir("19012346", "ING")
sistema.inscribir("19012347", "DER")

# 2. Registrar notas del examen
sistema.registrar_nota("19012345", 17.0)
sistema.registrar_nota("19012346", 16.5)
sistema.registrar_nota("19012347", 18.0)

# 3. Mostrar resumen
sistema.resumen()
