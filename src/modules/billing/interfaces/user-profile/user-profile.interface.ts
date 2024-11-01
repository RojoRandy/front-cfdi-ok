import type { User } from "@/modules/auth/interfaces";


export interface EmisorProfile {
  id: number;
  nombreComercial: string;
  persona: Persona;
  usuario: User;
}

export interface Persona {
  rfc: string;
  nombreFiscal: string;
  regimenFiscal: RegimenFiscal;
  codigoPostal: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  colonia: string;
  pais: Pais;
  estado: Estado;
  municipio: Municipio;
  localidad: string;
  referencias: string;
}

export interface RegimenFiscal {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface Pais {
  id?: number;
  nombre: string;
  codigo?: string;
}

export interface Estado {
  id?: number;
  nombre: string;
}

export interface Municipio {
  id?: number;
  nombre: string;
}