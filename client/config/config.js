import pageRoutes from './router.config';

const plugins = [
  ['umi-plugin-react', {
    antd: true,
    dva: true,
    dynamicImport: {
      webpackChunkName: true,
    },
    title: 'client',
    dll: true,

    routes: {
      exclude: [
        /models\//,
        /services\//,
        /model\.(t|j)sx?$/,
        /service\.(t|j)sx?$/,
        /components\//,
      ],
    },
  }],
];

export default {
  routes: pageRoutes,
  treeShaking: true,
  plugins,
};
