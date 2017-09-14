import demo from '@/views/'
import singleton from '@/docs/patterns/singleton.md'
import strategie from '@/docs/patterns/strategie.md'
console.log(strategie)

const routes = [
  {
    path: '/',
    name: '首页',
    component: demo
  },
  {
    path: '/patterns',
    name: '设计模式',
    component: demo,
    redirect: '/patterns/singleton',
    children: [
      { path: '/patterns/singleton', name: '单例模式', component: singleton },
      { path: '/patterns/strategie', name: '策略模式', component: strategie }
    ]
  }
]

export default routes
