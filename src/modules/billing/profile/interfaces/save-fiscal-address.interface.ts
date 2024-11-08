export interface SaveFiscalAddressRequest {
  codigoPostal:    string;
  calle?:           string;
  numeroExterior?:  string;
  numeroInterior?:  string;
  colonia?:         string;
  paisId?:          number;
  estadoId?:        number;
  estadoNombre?:    string;
  municipioId?:     number;
  municipioNombre?: string;
  localidad?:       string;
  referencias?:     string;
}
