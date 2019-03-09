export default [
  {
    path: '/',
    component: '../layouts/BasicLayout/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/Room'
      },
      {
        path: '/Room',
        component: './Room/Room',
      },
    ],
  },
];
