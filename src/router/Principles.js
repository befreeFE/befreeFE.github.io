import demo from '@/views/demo'
import srp from '@/docs/Principles/srp.md'
import lkp from '@/docs/Principles/lkp.md'
import ocp from '@/docs/Principles/ocp.md'
import port from '@/docs/Principles/port.md'
import refactor from '@/docs/Principles/refactor.md'

export default {
  path: '/Principles',
  name: '设计原则',
  component: demo,
  redirect: '/Principles/srp',
  children: [
    { path: '/Principles/srp', name: '单一职责原则', component: srp },
    { path: '/Principles/lkp', name: '最少知识原则', component: lkp },
    { path: '/Principles/ocp', name: '开放-封闭原则', component: ocp },
    { path: '/Principles/port', name: '接口编程', component: port },
    { path: '/Principles/refactor', name: '代码重构', component: refactor }
  ]
}
