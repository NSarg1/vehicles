import { useContext } from 'react';
import toast from 'react-hot-toast';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import { AppContext, VehicleProps } from 'src/app/App.context';
import useAsyncFn from 'src/hooks/useAsyncFn.hook';
import { vehiclesApi } from 'src/service/vehicles.api';

import styles from './queue-item.module.scss';

import { CreatedVehicleProps } from '../../pages/chargers/components/Charger/charger.dto';

type QueueItemProps = {
  registeredVehicle?: VehicleProps;
  queueVehicle?: CreatedVehicleProps;
};

const QueueItem: React.FC<QueueItemProps> = ({ queueVehicle, registeredVehicle }) => {
  const { setVehicles, vehicles } = useContext(AppContext);
  const id = queueVehicle ? queueVehicle.plate : registeredVehicle?.id;

  console.log(vehicles);

  const isUserQueue = vehicles.some((vehicle: VehicleProps) => vehicle.id === id);

  const [removeVehicleFromQueue, isLoading] = useAsyncFn(async () => {
    if (!queueVehicle) return;
    try {
      await vehiclesApi.deleteVehicle(queueVehicle.id);
    } catch (error: any) {
      toast.error(error?.response?.data?.message as string);
    }
  });

  const removeRegisteredVehicle = () => {
    setVehicles((prev: VehicleProps[]) => {
      return prev.filter((vehicle: VehicleProps) => vehicle.id !== registeredVehicle?.id);
    });
  };

  return (
    <li className={styles.item}>
      <span>{queueVehicle ? queueVehicle?.plate : registeredVehicle?.id}</span>
      <Space align="center">
        {queueVehicle && <span>{dayjs(queueVehicle.registerTime).format('HH:mm')}</span>}
        {isUserQueue && (
          <Button
            type="text"
            danger
            onClick={queueVehicle ? removeVehicleFromQueue : removeRegisteredVehicle}
            size="small"
            className={styles.btn}
          >
            {!isLoading ? <DeleteFilled className={styles.icon} /> : <Spin size="small" />}
          </Button>
        )}
      </Space>
    </li>
  );
};

export default QueueItem;
