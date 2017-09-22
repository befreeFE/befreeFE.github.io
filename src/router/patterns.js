import demo from '@/views/demo'
import singleton from '@/docs/patterns/singleton.md'
import strategie from '@/docs/patterns/strategie.md'
import proxy from '@/docs/patterns/proxy.md'
import observer from '@/docs/patterns/observer.md'
import order from '@/docs/patterns/order.md'
import composite from '@/docs/patterns/composite.md'
import template from '@/docs/patterns/template.md'
import flyweight from '@/docs/patterns/flyweight.md'
import chain from '@/docs/patterns/chain.md'
import intermediary from '@/docs/patterns/intermediary.md'
import decorator from '@/docs/patterns/decorator.md'
import state from '@/docs/patterns/state.md'
import adaptor from '@/docs/patterns/adaptor.md'

export default {
  path: '/patterns',
  name: '设计模式',
  component: demo,
  redirect: '/patterns/singleton',
  children: [
    { path: '/patterns/singleton', name: '单例模式', component: singleton },
    { path: '/patterns/strategie', name: '策略模式', component: strategie },
    { path: '/patterns/proxy', name: '代理模式', component: proxy },
    { path: '/patterns/observer', name: '发布-订阅模式', component: observer },
    { path: '/patterns/order', name: '命令模式', component: order },
    { path: '/patterns/composite', name: '组合模式', component: composite },
    { path: '/patterns/template', name: '模板方法模式', component: template },
    { path: '/patterns/flyweight', name: '享元模式', component: flyweight },
    { path: '/patterns/chain', name: '职责链模式', component: chain },
    { path: '/patterns/intermediary', name: '中介者模式', component: intermediary },
    { path: '/patterns/decorator', name: '装饰者模式', component: decorator },
    { path: '/patterns/state', name: '状态模式', component: state },
    { path: '/patterns/adaptor', name: '适配器模式', component: adaptor }
  ]
}
