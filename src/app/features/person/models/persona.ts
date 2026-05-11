import { Direccion } from '@/app/features/address/models/direccion';

export interface Persona {
  idPersona: number;
  nombre: string;
  apellido: string;
  telefono: number;
  email: string;
  direccion: Direccion;
}
