export interface Observer {
  update(mensaje: string): void;
}

export class Notificador implements Observer {
  update(mensaje: string): void {
    console.log(`[NOTIFICACIÓN] ${mensaje}`);
  }
}

export abstract class Subject {
  protected observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  notify(mensaje: string) {
    this.observers.forEach(o => o.update(mensaje));
  }
}
