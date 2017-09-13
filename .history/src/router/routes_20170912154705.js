import Home from '@/views/'
import singleton from '@/docs/patterns/singleton.md'

// let fs = require('fstream')
// let join = require('path').join
// /**
//  *
//  * @param startPath  起始目录文件夹路径
//  * @returns {Array}
//  */
// function findSync (startPath) {
//   let result = []
//   function finder (path) {
//     let files = fs.readdirSync(path)
//     files.forEach((val, index) => {
//       let fPath = join(path, val)
//       let stats = fs.statSync(fPath)
//       if (stats.isDirectory()) finder(fPath)
//       if (stats.isFile()) result.push(fPath)
//     })
//   }
//   finder(startPath)
//   return result
// }
// let fileNames = findSync('../doc')
// console.log(fs)

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
