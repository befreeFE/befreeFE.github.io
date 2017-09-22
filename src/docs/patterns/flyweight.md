## 享元模式

享元模式是一种用于性能优化的模式，其核心是运用共享技术来有效支持大量细粒度的对象。

如果系统中因为创建了大量类似的对象而导致内存占用过高，享元模式就非常有用了。

享元模式要求将对象的属性划分为内部状态与外部状态。(状态通常指属性)。

享元模式是一种用时间换空间的优化模式。

```js
let UploadFactory = (()=>{
  let createdFlyWeightObjs = {}
  return {
    create(uploadType){
      if(createdFlyWeightObjs[uploadType]){
        return createdFlyWeightObjs[uploadType]
      }

      return createdFlyWeightObjs[uploadType] = new Upload(uploadType)
    }
  }
})()

let uploadManager = (()=>{
  let uploadDatabase = {}
  return {
    add(id,uploadType,fileName,fileSize){
      let flyWeightObj = UploadFactory.create(uploadType)
      let dom = document.createElement('div')
      dom.innerHTML = `<span>文件名称${fileName},文件大小${fileSize}</span><button class='delFile'>删除</button>`
      dom.querySelector('.delFile').onclick = ()=>{
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)

      uploadDatabase[id]={
        fileName:fileName,
        fileSize:fileSize,
        dom:dom
      }
      return flyWeightObj
    },
    setExternalState(id,flyWeightObj){
      let uploadData = uploadDatabase[id]
      for(let i in uploadData){
        flyWeightObj[i]=uploadData[i]
      }
    }
  }
})()
```

### 享元模式的适用性

- 一个程序中使用了大量的相似对象。
- 由于使用了大量对象，造成很大的内存开销。
- 对象的大多数状态都可以变为外部状态。
- 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。

### 对象池

```js
let objectPoolFactory = (createObjFn){
  let objectPool = [];
  return {
    create(){
      let obj = objectPool.length === 0?createObjFn.apply(this,arguments):objectPool.shift()
      return obj
    },
    recover(obj){
      objectpool.push(obj)
    }
  }
}
```
