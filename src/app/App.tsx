import { Link, Navigate, NavLink, Route, Routes } from 'react-router';
import { useLocalStorageState } from 'ahooks';
import clsx from 'clsx';
import ChargersPage from 'src/pages/chargers/Chargers.page';
import RegisterPage from 'src/pages/register/Register.page';
import RulesPage from 'src/pages/rules/Rules.page';

import styles from './app.module.scss';
import logo from 'src/assets/logo.svg';

import { AppContext, VehicleProps } from './App.context';

const App = () => {
  const [vehicles, setVehicles] = useLocalStorageState<VehicleProps[]>('VEHICLES', { defaultValue: [] });
  const hasRegisteredVehicles = !!vehicles?.length;

  const routes = [
    { route: '/rules', label: 'Rules' },
    { route: '/register', label: 'My Cars' },
  ];
  if (hasRegisteredVehicles) routes.unshift({ route: '/', label: 'Home' });

  return (
    <AppContext.Provider value={{ vehicles: vehicles || [], setVehicles }}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link className={styles['list-item']} to="/">
            <img src={logo} width={40} />
          </Link>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              {routes.map((route) => (
                <NavLink
                  className={({ isActive }) => clsx(styles['list-item'], isActive && styles.active)}
                  to={route.route}
                  key={route.route}
                >
                  {route.label}
                </NavLink>
              ))}
            </ul>
          </nav>
        </header>

        <main className={styles.main}>
          <Routes>
            {!vehicles?.length ? (
              <Route path="*" element={<Navigate to="/register" replace />} />
            ) : (
              <Route path="/" element={<ChargersPage />} />
            )}

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/rules" element={<RulesPage />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} NSarg Corp - All rights reserved </p>
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
