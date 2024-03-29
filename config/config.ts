import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  base: 'microApp',
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app1', // 唯一 id
          entry: '//localhost:7001', // html entry
          activeRule: '/appOne',
        },
        {
          name: 'app2', // 唯一 id
          entry: '//localhost:7002', // html entry
          activeRule: '/yourActiveRule',
          activeRule: '/appTwo',
        },
      ],
    },
  },
});
