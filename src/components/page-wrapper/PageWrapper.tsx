import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './page-wrapper.module.scss';

type PageWrapperProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className, ...restProps }) => {
  return (
    <div className={clsx(styles.container, className)} {...restProps}>
      {children}
    </div>
  );
};

export default PageWrapper;
