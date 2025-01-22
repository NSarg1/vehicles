import styles from './chargers.module.scss';

import { ChargerProps } from './chargers.dto';
import Charger from './components/Charger/Charger';

const chargers: ChargerProps[] = [{ name: 'Tesla' }, { name: 'Charger 1' }, { name: 'Charger 2' }];

const ChargersPage = () => {
  return (
    <div className={styles.chargers}>
      {chargers.map((charger) => {
        return <Charger key={charger.name} charger={charger} />;
      })}
    </div>
  );
};

export default ChargersPage;
