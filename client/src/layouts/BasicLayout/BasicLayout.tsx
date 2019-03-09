import React from 'react';
import styles from './BasicLayout.scss';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return (
    <div className={styles.normal}>
      {props.children}
    </div>
  );
};

export default BasicLayout;
