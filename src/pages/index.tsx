import { MicroApp } from 'umi';
import React from 'react';
import styles from './index.less';

export default function IndexPage() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <div>
        <div
          onClick={() => {
            setName('app1');
          }}
        >
          app1 qiankun
        </div>
        <div
          onClick={() => {
            setName('app2');
          }}
        >
          app2 qiankun
        </div>
      </div>
      {name ? (
        <MicroApp
          base="/microApp"
          className="myContainer"
          wrapperClassName="myWrapper"
          name={name}
          autoSetLoading
        />
      ) : null}
    </div>
  );
}
