export function rendirExamen(carrera: string): number {
  const rangos: Record<string, [number, number]> = {
    Medicina: [8.5, 10],
    "Ingeniería en Sistemas": [7.5, 9.8],
  };

  const [min, max] = rangos[carrera] ?? [6.5, 9.5];
  return +(Math.random() * (max - min) + min).toFixed(2);
}
