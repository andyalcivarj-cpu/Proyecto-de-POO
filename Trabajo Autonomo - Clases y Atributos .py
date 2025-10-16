#Crear 5 clases de su proyecto de aula.

#Definicion de clase
#Clase 1 Aspirante
class Postulantes:
    #Atributos de instancia
    def __init__(self, nombre, apellido, correo):
        self.nombre = nombre
        self.apellido = apellido
        self.correo = correo
    
    def registro(self):
        print(f"Registro de {self.nombre} {self.apellido} con correo {self.correo} realizado.")
    
    def actualizarDatos(self, nuevo_correo):
        self.correo = nuevo_correo
        print(f"Datos de {self.nombre} actualizados. Nuevo correo: {self.correo}.")
    
    def mostrar_info(self):
        print(f"Postulante: {self.nombre} {self.apellido}, Correo: {self.correo}.")
    

class Inscripcion:
    def __init__(self, postulantes, fechainscripcion, carrera):
       #Atributos de instancia
        self.postulantes = postulantes  
        self.fechainscripcion = fechainscripcion
        self.carrera = carrera
    
    def iniciar(self):
        print(f"Inscripción para {self.postulantes.nombre} {self.postulantes.apellido} en {self.carrera} iniciada el {self.fechainscripcion}.")
    
    def cancelar(self):
        print(f"Inscripción de {self.postulantes.nombre} {self.postulantes.apellido} en {self.carrera} cancelada.")
    
    def validar(self):
        print(f"Inscripción de {self.postulantes.nombre} {self.postulantes.apellido} validada para {self.carrera}.")

class Evaluacion:
    def __init__(self, tipoEvaluacion, fecha, nota):
       #Atributos de instancia
        self.tipoEvaluacion = tipoEvaluacion
        self.fecha = fecha
        self.nota = nota
    
    def registroEvaluacion(self):
        print(f"Evaluación de tipo {self.tipoEvaluacion} registrada el {self.fecha} con nota {self.nota}.")
    
    def realizar(self):
        print(f"Evaluación de tipo {self.tipoEvaluacion} realizada el {self.fecha}.")
    
    def resultado(self):
        print(f"Resultado de la evaluación {self.tipoEvaluacion}: Nota {self.nota}.")

class Cupos:
    #Atributo de clase
    cupo_total = 200  
    
    def __init__(self, numeroCupos, totalCupos, disponibles):
        #Atributos de instancia
        self.numeroCupos = numeroCupos
        self.totalCupos = totalCupos
        self.disponibles = disponibles
    
    def asignacion(self):
        print(f"Asignación de {self.numeroCupos} cupos")
        print(f"Disponibles: {self.disponibles} de {self.totalCupos}")
    
    def aceptar(self):
        print(f"Asignación de cupos aceptada")
        print(f"Quedan {self.disponibles} disponibles")
    
    def rechazar(self):
        print(f"Asignación de cupos rechazada")
        print(f"Disponibles: {self.disponibles}.")

class Matriculas:
    def __init__(self, idpostulante, fecha, comprobante):
        #Atributos de instancia
        self.idpostulante = idpostulante  
        self.fecha = fecha  
        self.comprobante = comprobante
    
    def matricular(self):
        print(f"Matricula para el postulante {self.idpostulante} registrada el {self.fecha} con comprobante {self.comprobante}.")
    
    def comprobarMatricula(self):
        print(f"Comprobante de matrícula {self.comprobante} para {self.idpostulante} verificado.")
    
    def renovar(self):
        print(f"Renovación de matrícula para {self.idpostulante} realizada el {self.fecha}.")

#Ejemplos de uso
#Crear instancia de Postulantes
postulante1 = Postulantes("Ana", "Gomez", "ana.gomez@email.com")
postulante1.registro()
postulante1.actualizarDatos("ana.nueva@email.com")

#Crear instancia de Inscripcion asociada a Postulantes
inscripcion1 = Inscripcion(postulante1, "2025-10-06", "Ingeniería")
inscripcion1.iniciar()
inscripcion1.validar()

#Crear instancia de Evaluacion
evaluacion1 = Evaluacion("en computadora", "2025-10-07", 85)
evaluacion1.registroEvaluacion()
evaluacion1.resultado()

#Crear instancia de Cupos
cupos1 = Cupos(50, 200, 150)
cupos1.asignacion()
cupos1.aceptar()
#Cambiar atributo de clase
print(f"Cupo total inicial: {Cupos.cupo_total}")
Cupos.cupo_total = 250
print(f"Cupo total nuevo: {Cupos.cupo_total}")
cupos1.asignacion()

#Crear instancia de Matriculas
matricula1 = Matriculas(postulante1, "2025-10-08", "COMP1")
matricula1.matricular()
matricula1.comprobarMatricula()