import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Button, Flex, Form, Input } from 'antd';
import { AppContext } from 'src/app/App.context';

import styles from './register.module.scss';

import QueueItem from '../../components/queue-item/QueueItem';
import { VehicleProps } from '../chargers/components/Charger/components/VehicleForm/vehicleForm.utils';

const RegisterPage = () => {
  const { setVehicles, vehicles } = useContext(AppContext);
  const navigate = useNavigate();
  const handleRegister = (values: VehicleProps) => {
    setVehicles((prev: VehicleProps[]) => [
      ...prev,
      { ...values, id: `${values.plate} / ${values.name} / ${values.model} / ${values.telephone}` },
    ]);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <Flex gap={20} wrap justify="center">
        <div className={styles.wrapper}>
          <h1>New Car Registration</h1>
          <Form className={styles.list} onFinish={handleRegister}>
            <div className={styles.main}>
              <Form.Item required name="name">
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item required name="plate">
                <Input placeholder="Plate number" />
              </Form.Item>
              <Form.Item required name="telephone">
                <Input placeholder="Telegram ID / Telephone" />
              </Form.Item>
              <Form.Item required name="model">
                <Input placeholder="Vehicle type" />
              </Form.Item>
            </div>
            <div className={styles.bottom}>
              <Button htmlType="reset" type="text">
                Reset
              </Button>
              <Button htmlType="submit">Register</Button>
            </div>
          </Form>
        </div>
        {!!vehicles?.length && (
          <div className={styles.wrapper}>
            <h1>Existing Cars</h1>

            <Flex vertical className={styles.list} gap={8}>
              {vehicles.map((vehicle) => (
                <QueueItem key={vehicle.id} registeredVehicle={vehicle} />
              ))}
            </Flex>
          </div>
        )}
      </Flex>
    </div>
  );
};

export default RegisterPage;
