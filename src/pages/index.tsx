import { MicroApp } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <MicroApp
        base="/microApp"
        className="myContainer"
        wrapperClassName="myWrapper"
        name={'app1'}
        autoSetLoading
      />
    </div>
  );
}
