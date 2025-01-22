import axios, { AxiosPromise } from 'axios';

export const vehiclesApi = {
  getVehicles: (charger: string) => axios.get(`/vehicles`, { params: { charger } }),
  createVehicle: (body: { plate: string; charger: string }) => axios.post(`/vehicles`, body),
  deleteVehicle: (id: number): AxiosPromise => axios.delete(`/vehicles/${id}`),
};
