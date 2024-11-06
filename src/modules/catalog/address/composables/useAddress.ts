import { GetEstadosByPaisAction } from "../actions/get-estados-by-pais.action";
import { GetPaisesAction } from "../actions/get-paises.action";
import { GetMunicipiosByPaisAction } from "../actions/get-municipios-by-estado.action";
import type { Address, Estado, Municipio, Pais } from "../interfaces/address.interface";
import { GetAddressByPostalCodeAction } from "../actions/get-address-by-postal-code.action";


export const useAddress = () => {

  const getPaises = async (): Promise<Pais[]> => {
    try {
      const response = await GetPaisesAction();
      
      return response?.data ?? [];
    } catch (error) {
      return [];
    }
  }

  
  const getEstadosByPais = async(paisId: number): Promise<Estado[]> => {
    try {
      const response = await GetEstadosByPaisAction(paisId);
      return response?.data ?? [];
    } catch (error) {
      return [];
    }
  }

  const getMunicipiosByEstado = async(estadoId: number): Promise<Municipio[]> => {
    try {
      const response = await GetMunicipiosByPaisAction(estadoId);
      return response?.data ?? [];
    } catch (error) {
      return [];
    }
  }

  const getAddressByPostalCode = async(postalCode: string): Promise<Address | undefined> => {
    try {
      const response = await GetAddressByPostalCodeAction(postalCode);
      return response?.data ?? null;
    } catch (error) {
      return undefined;
    }
  }

  return {
    getPaises,
    getEstadosByPais,
    getMunicipiosByEstado,
    getAddressByPostalCode
  }
}