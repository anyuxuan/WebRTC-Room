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
        path: '/welcome',
        component: './Welcome/Welcome',
      },
      {
        path: '/room',
        component: './Room/Room',
      },
    ],
  },
];
