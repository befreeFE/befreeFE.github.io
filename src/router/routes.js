import demo from '@/views/demo'
import home from '@/views/home'
import singleton from '@/docs/patterns/singleton.md'
import strategie from '@/docs/patterns/strategie.md'
import proxy from '@/docs/patterns/proxy.md'

const routes = [
  {
    path: '/',
    name: '首页',
    component: home
  },
  {
    path: '/patterns',
    name: '设计模式',
    component: demo,
    redirect: '/patterns/singleton',
    children: [
      { path: '/patterns/singleton', name: '单例模式', component: singleton },
      { path: '/patterns/strategie', name: '策略模式', component: strategie },
      { path: '/patterns/proxy', name: '代理模式', component: proxy }
    ]
  }
]

export default routes
