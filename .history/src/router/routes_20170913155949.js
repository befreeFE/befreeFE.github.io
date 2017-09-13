import Home from '@/views/'
import singleton from '@/docs/patterns/singleton.md'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/patterns',
        name: '设计模式',
        component: singleton,
        children: [
          { path: '', name: 'singleton', title: '单例模式', component: singleton }
        ]
      }
    ]
  }
]

export default routes
