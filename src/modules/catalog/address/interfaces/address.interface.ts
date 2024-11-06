export interface Address {
  codigoPostal: string;
  colonias:     string[];
  pais:         Pais;
  estado:       Estado;
  municipio:    Municipio;
}


export interface Pais {
  id:     number;
  nombre: string;
  codigo: string;
}

export interface Estado {
  id:     number;
  nombre: string;
}

export interface Municipio {
  id:     number;
  nombre: string;
}

