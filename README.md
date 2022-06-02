## Getting Started
这是一个介绍qiankun使用的demo项目，首先config.ts加入了配置
```
// /config/config.ts
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  base: 'microApp',
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  // ...
  // 加入qiankun子应用信息
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app1', // 唯一 id
          entry: '//localhost:7001', // html entry
        },
        {
          name: 'app2', // 唯一 id
          entry: '//localhost:7002', // html entry
        },
      ],
    },
  },
});
```
然后修改了 src/pages/index.tsx
```
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
```
在demo文件夹中，启动server-one.js, server-two.js, 这两个web服务都是不带webpack的所以在页面中加入
```html
   <script src="./entry.js" entry></script>
```
```javascript
const render = (props) => {
  return Promise.resolve(props);
};

((global) => {
  global['purehtml'] = {
    bootstrap: (props) => {
      console.log('purehtml bootstrap', props);
      return Promise.resolve();
    },
    mount: (props) => {
      console.log('purehtml mount', props);
      if (props.setLoading) {
        setTimeout(() => {
          props.setLoading(false);
        }, 500);
      }

      return render();
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
})(window);
```

[umi.js 接入qiankun](https://umijs.org/zh-CN/plugins/plugin-qiankun)<br>
[qiankun 接入子应用方式，项目实践](https://qiankun.umijs.org/zh/guide/tutorial#react-%E5%BE%AE%E5%BA%94%E7%94%A8)<br>