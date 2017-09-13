import Home from '@/views/'
import singleton from '@/docs/patterns/singleton.md'
import strategie from '@/docs/patterns/strategie.md'

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
          { path: '', name: '单例模式', component: singleton },
          { path: '/strategie', name: '策略模式', component: strategie }

        ]
      }
    ]
  }
]

export default routes
