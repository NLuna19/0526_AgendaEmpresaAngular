import { Empresa } from '@/app/features/company/models/empresa';
import { Persona } from '@/app/features/person/models/persona';

export interface Contacto {
  idContacto: number;
  empresa: Empresa;
  persona: Persona;
  cargo: string;
}
