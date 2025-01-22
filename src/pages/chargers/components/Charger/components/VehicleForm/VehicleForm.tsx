import { useContext } from 'react';
import toast from 'react-hot-toast';
import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Grid, Select, Spin } from 'antd';
import { AppContext } from 'src/app/App.context';
import useAsyncFn from 'src/hooks/useAsyncFn.hook';
import { vehiclesApi } from 'src/service/vehicles.api';

import styles from './vehicle-form.module.scss';

type VehicleFormProps = {
  chargerName: string;
};
type VehicleOptionProps = { vehicle: { label: string; value: string } };

const VehicleForm: React.FC<VehicleFormProps> = ({ chargerName }) => {
  const { vehicles } = useContext(AppContext);
  const [formRef] = Form.useForm();
  const vehicle = Form.useWatch(['vehicle'], formRef);
  const { xs } = Grid.useBreakpoint();

  const [handleSubmit, isLoading] = useAsyncFn(async ({ vehicle }: VehicleOptionProps) => {
    try {
      await vehiclesApi.createVehicle({ plate: vehicle.value, charger: chargerName });
      formRef.resetFields();
    } catch (error: any) {
      toast.error(error?.response?.data?.message as string);
    }
  });

  const hasOneVehicle = vehicles?.length === 1;

  return (
    <Form
      initialValues={{ vehicle: { value: vehicles[0].id, label: vehicles[0].id } }}
      form={formRef}
      onFinish={handleSubmit}
      className={styles.form}
    >
      <Form.Item name="vehicle" required className={styles.select}>
        <Select
          placeholder="Select vehicle"
          popupClassName={styles['select-popup']}
          options={vehicles}
          fieldNames={{ label: 'id', value: 'id' }}
          labelInValue
          showSearch
          virtual={false}
          disabled={hasOneVehicle}
        />
      </Form.Item>
      <Button
        htmlType="submit"
        disabled={!vehicle || isLoading}
        className={styles.btn}
        type={xs && !isLoading ? 'primary' : 'default'}
      >
        {!isLoading ? <SendOutlined /> : <Spin size="small" />}
      </Button>
    </Form>
  );
};

export default VehicleForm;
