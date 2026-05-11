import { Empresa } from '@/app/features/company/models/empresa';
import { Persona } from '@/app/features/person/models/persona';

export interface Contacto {
  idEmpresa: number;
  idPersona: number;
  empresa: Empresa;
  persona: Persona;
  cargo: string;
}
