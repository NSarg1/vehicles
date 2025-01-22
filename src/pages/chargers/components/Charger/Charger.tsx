import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { Card } from 'antd';
import { Empty } from 'antd';
import { produce } from 'immer';
import QueueItem from 'src/components/QueueItem/QueueItem';
import WrapperLoader from 'src/components/wrapper-loader/WrapperLoader';
import socket from 'src/configs/socket.config';
import { vehiclesApi } from 'src/service/vehicles.api';

import styles from './charger.module.scss';

import { ChargerProps, VehicleListProps } from '../../chargers.dto';
import { CreatedVehicleProps } from './charger.dto';
import VehicleForm from './components/VehicleForm/VehicleForm';

const getCharger = async (chargerName: string) => {
  return await vehiclesApi.getVehicles(chargerName);
};
const Charger: React.FC<{ charger: ChargerProps }> = ({ charger }) => {
  const QUERY = useMemo(() => ['GET_CHARGER_QUEUE', charger.name], [charger.name]);
  const queryClient = useQueryClient();

  const { data, isFetching }: UseQueryResult<VehicleListProps> = useQuery({
    queryKey: QUERY,
    queryFn: ({ queryKey }) => getCharger(queryKey[1]),
    select: (res) => res.data,
  });

  const handleVehicleCreated = useCallback(
    (newVehicle: CreatedVehicleProps) => {
      queryClient.setQueryData(QUERY, (response: { data: VehicleListProps }) => {
        return produce(response, (draft) => {
          if (!draft.data) draft.data = []; // If no data exists, initialize it with the new vehicle
          draft.data.push(newVehicle); // Append the new vehicle to the list
        });
      });
    },
    [QUERY, queryClient],
  );

  const handleVehicleDeleted = useCallback(
    (removedVehicle: CreatedVehicleProps) => {
      queryClient.setQueryData(QUERY, (response: { data: VehicleListProps }) => {
        return produce(response, (draft) => {
          if (!draft?.data) return draft; // If no data, return as is
          draft.data = draft.data.filter((vehicle) => vehicle.id !== removedVehicle.id);
        });
      });
    },
    [QUERY, queryClient],
  );

  useEffect(() => {
    socket.on(`${charger.name}.vehicle.created`, handleVehicleCreated);
    socket.on(`${charger.name}.vehicle.deleted`, handleVehicleDeleted);

    return () => {
      socket.off(`${charger.name}.vehicle.created`, handleVehicleCreated);
      socket.off(`${charger.name}.vehicle.deleted`, handleVehicleDeleted);
    };
  }, [QUERY, charger.name, queryClient, handleVehicleCreated, handleVehicleDeleted]);

  return (
    <Card
      key={charger.name}
      title={charger.name}
      className={styles.card}
      styles={{
        body: { padding: 10, flex: 1, display: 'flex', flexDirection: 'column' },
      }}
      bordered={false}
    >
      <div className={styles.block}>
        <WrapperLoader isLoading={isFetching}>
          {data?.length ? (
            <ul className={styles['waiting-queue']}>
              {data?.map((vehicle) => {
                return <QueueItem key={vehicle.id} queueVehicle={vehicle} />;
              })}
            </ul>
          ) : (
            <Empty style={{ margin: 'auto' }} />
          )}
        </WrapperLoader>

        <VehicleForm chargerName={charger.name} />
      </div>
    </Card>
  );
};

export default Charger;
