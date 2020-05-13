<template>
  <div id="app" @touchmove.prevent @mousewheel.prevent>
    <canvas id="page"></canvas>
    <canvas id="avatar"></canvas>
    <canvas id="left"></canvas>
    <canvas id="right"></canvas>
  </div>
</template>

<script>
import background from "./assets/anniversary-background.png"
import avatar1 from "./assets/1.png"
// eslint-disable-next-line no-unused-vars
import avatar2 from "./assets/2.png"
// eslint-disable-next-line no-unused-vars
import avatar3 from "./assets/3.png"
// eslint-disable-next-line no-unused-vars
import avatar4 from "./assets/4.png"
// eslint-disable-next-line no-unused-vars
import avatar5 from "./assets/5.png"
// eslint-disable-next-line no-unused-vars
import avatar6 from "./assets/6.png"
// eslint-disable-next-line no-unused-vars
import avatar7 from "./assets/7.png"
// eslint-disable-next-line no-unused-vars
import avatar8 from "./assets/8.png"
// eslint-disable-next-line no-unused-vars
import avatar9 from "./assets/9.png"
// eslint-disable-next-line no-unused-vars
import avatar10 from "./assets/10.png"
// eslint-disable-next-line no-unused-vars
import avatar11 from "./assets/11.png"
// eslint-disable-next-line no-unused-vars
import avatar12 from "./assets/12.png"
export default {
  name: 'App',
  data(){
    return{
      background,
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      avatar5,
      avatar6,
      avatar7,
      avatar8,
      avatar9,
      avatar10,
      avatar11,
      avatar12,
      isSupportCanvas: true,
    }
  },
  methods:{
    initCanvas(){
      let canvas = canvas = document.getElementById('page')
      let ctx = canvas.getContext('2d')
      // 画布高度
      let winH = window.innerHeight
      // 画布宽度
      let winW = 906 / 1671 * winH > window.innerWidth ? window.innerWidth : 906 / 1671 * winH
      canvas.width = winW
      canvas.height = winH
      // 装载图片
      let imgBackground = new Image()
      imgBackground.onload = () => {
        ctx.drawImage(imgBackground,0,0,winW,winH)
      }
      imgBackground.src = this.background
    },
    initAvatar(){
      let canvas = canvas = document.getElementById('avatar')
      let ctx = canvas.getContext('2d')
      let sideLength = 906 / 1671 * 0.45 * window.innerHeight
      canvas.width = sideLength
      canvas.height = sideLength
      // 装载图片
      let imgAvatar = new Image()
      imgAvatar.onload = () => {
        ctx.drawImage(imgAvatar,0,0,sideLength,sideLength)
      }
      imgAvatar.src = this.avatar5
    }
    
  },
  // canves 的初始化
  mounted(){
    let canvas = document.getElementById('page')
    if (canvas.getContext){
      console.log("我可以支持")
      this.initCanvas()
      this.initAvatar()
      window.onresize = () => {
        this.initCanvas()
      }
    } else {
      console.log("我不支持")
      this.isSupportCanvas = false
    }
  },
  // 页面初始化
  created(){

  }
  
}
</script>

<style lang="less" scoped>

@side-length: calc(906 / 1671 * 0.45 * 100vh);

body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
}
#avatar{
  z-index: 10;
  position: absolute;
  left: calc(50vw - @side-length * 0.53);
  top: calc(50vh - @side-length * 0.53);
  width: @side-length;
  height: @side-length;
}
#left{
  z-index: 10;
  position: absolute;
  width: @side-length;
  height: @side-length;
}
</style>
