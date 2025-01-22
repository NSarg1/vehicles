import React, { ReactNode } from 'react';
import { Spin } from 'antd';

import styles from './wrapper-loader.module.scss'; // Add styles for the loader

type WrapperLoaderProps = {
  isLoading: boolean;
  children: ReactNode;
};

const WrapperLoader: React.FC<WrapperLoaderProps> = ({ isLoading, children }) => {
  return isLoading ? (
    <div className={styles.loader}>
      <Spin />
    </div>
  ) : (
    children
  );
};

export default WrapperLoader;
