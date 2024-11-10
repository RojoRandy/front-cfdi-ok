export interface RegimenFiscal {
  id:                  number;
  isActive:            boolean;
  createdAt:           Date;
  updatedAt:           Date;
  codigo:              string;
  descripcion:         string;
  aplicaPersonaFisica: boolean;
  aplicaPersonaMoral:  boolean;
}
