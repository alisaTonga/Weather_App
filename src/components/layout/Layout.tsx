import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import styles from './layout.module.css';

function Layout() {

  return (

    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
