export default [
  {  name:'登录', path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  {  path: '/', redirect: '/add_chart' },
  {  name:'欢迎界面', path: '/welcome', icon: 'smile', component: './Welcome' },
  {  name:'图表页', path: '/add_chart', icon: 'smile', component: './addChart' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name:'管理员界面',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },

  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
