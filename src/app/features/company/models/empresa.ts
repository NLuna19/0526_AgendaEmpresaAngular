import { Direccion } from '@/app/features/address/models/direccion';

export interface Empresa {
  idEmpresa: number;
  razonSocial: string;
  telefono: string;
  direccion: Direccion;
}
