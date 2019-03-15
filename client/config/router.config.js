export default [
  {
    path: '/',
    component: '../layouts/BasicLayout/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/room',
      },
      {
        path: '/room',
        component: './Room/Room',
      },
    ],
  },
];
