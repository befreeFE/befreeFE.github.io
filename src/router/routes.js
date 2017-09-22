import home from '@/views/home'
import patterns from './patterns'
import Principles from './Principles'
const routes = [
  {
    path: '/',
    name: '首页',
    component: home
  },
  patterns,
  Principles

]

export default routes
