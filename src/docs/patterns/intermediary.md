## 中介者模式

```js
  class Player {
    constructor (name,teamColor) {
      this.name = name
      this.teamColor = teamColor
      this.state = 'alive'
    }
    win(){
      console.log(`${this.name} won`)
    }
    lose(){
      console.log(`${this.name} lost`)
    }
    die(){
      this.state = 'dead'
      playerDirector.reciveMessage('playerDead',this)
    }
    remove(){
      playerDirector.reciveMessage('removePlayer',this)
    }
    changeTeam(color){
      playerDirector.reciveMessage('changeTeam',this,color)
    }
  }

  let playerFactory = (name,teamColor)=>{
    let newPlayer = new Player(name,teamColor)
    playerDirector.reciveMessage('addPlayer',newPlayer)
    return newPlayer
  }

  let playerDirector = (()=>{
    let player = {},operations = {}
    operations.addPlayer = (player)=>{
      let teamColor = player.teamColor
      players[teamColor] = players[teamColor] || []
      players[teamColor].push(player)
    }
    operations.removePlay = (player)=>{
      let teamColor = player.teamColor,
          teamPlayers = players[teamColor] || []

      for(let i = teamPlayers.length -1;i>=0;i--){
        if(teamPlayers[i]===player){
          teamPlayers.splice(i,1)
        }
      }
    },
    operations.changeTeam = (player,newTeamColor)=>{
      operations.removePlayer(player)
      player.teamColor = newTeamColor
      operations.addPlayer(player)
    }
    operations.playerDead = (player)=>{
      ler teamColor = playerDteamColor,
      teamPlayer = players[teamColor]
      let all_dead = true
      for(let i = 0,player;player=teamPlayers[i++];){
        if(player.state !== 'dead'){
          all_dead = false;
          break;
        }
      }
      if(all_dead ===true){
        for(let i = 0,player;player = teamPlayers[i++];){
          player.lose()
        }
        for(let color in players){
          if(color !== teamColor){
            let teamPlayers = players[color]
            for(let i = 0,player;player = teamPlayers[i++];){
              player.win()
            }
          }
        }
      }

      let reciveMessage = ()=>{
        let message = Array.prototype.shift.call(argumnets)
        oprections[message].apply(this,arguments)
      }

      return {
        reciveMessage:reciveMessage
      }
    }

  })()
```

中介者模式是迎合迪米特法则的一种实现。迪米特法则也教最少知识原则，是指一个对象应该尽可能少地了解另外的对象。
