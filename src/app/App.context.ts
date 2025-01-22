import React from 'react';

export type VehicleProps = {
  name: string;
  plate: string;
  telephone: string;
  model: string;
  id: string;
};

type AppContextProps = {
  vehicles: VehicleProps[];
  setVehicles: (vehicles: any) => void;
};

export const AppContext = React.createContext<AppContextProps>({
  vehicles: [],
  setVehicles: () => undefined,
});
