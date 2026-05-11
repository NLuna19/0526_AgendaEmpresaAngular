import { Ciudad } from '@/app/features/city/models/ciudad';

export interface Direccion {
  idDireccion: number;
  calle: string;
  numero: number;
  piso: string;
  depto: string;
  cp: string;
  ciudad: Ciudad;
}
