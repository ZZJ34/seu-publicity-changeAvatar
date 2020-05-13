<template>
  <div id="app" @touchmove.prevent @mousewheel.prevent>
    <canvas id="page"></canvas>
    <canvas id="avatar"></canvas>
    <canvas id="left" @click="changeLeft"></canvas>
    <canvas id="right" @click="changeRight"></canvas>
    <!--
    <button id="upload">上传图片</button>
    -->
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
import arrowLeft from "./assets/anniversary-left.png"
import arrowRight from "./assets/anniversary-right.png"
export default {
  name: 'App',
  data(){
    return{
      background,
      arrowLeft,
      arrowRight,
      avatarList:{
        0:avatar1,
        1:avatar2,
        2:avatar3,
        3:avatar4,
        4:avatar5,
        5:avatar6,
        6:avatar7,
        7:avatar8,
        8:avatar9,
        9:avatar10,
        10:avatar11,
        11:avatar12
      },
      avatarTotal: 12,
      avatarCurrent: 11,
      isSupportCanvas: true,
    }
  },
  methods:{
    initCanvas(){
      let canvas = document.getElementById('page')
      let ctx = canvas.getContext('2d')
      // 画布高度
      let winH = window.innerHeight
      // 画布宽度
      let winW = 906 / 1671 * winH > window.innerWidth ? window.innerWidth : 906 / 1671 * winH
      canvas.width = winW
      canvas.height = winH
      //解决一下清晰度
      let devicePixelRatio = window.devicePixelRatio || 1  
      let backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
      let ratio = devicePixelRatio / backingStoreRatio
      let oldWidth = canvas.width; 
      let oldHeight = canvas.height; 
      canvas.width = oldWidth * ratio; 
      canvas.height = oldHeight * ratio; 
      canvas.style.width = oldWidth + 'px'; 
      canvas.style.height = oldHeight + 'px'; 
      ctx.scale(ratio, ratio); 
      // 装载图片
      let imgBackground = new Image()
      imgBackground.onload = () => {
        ctx.drawImage(imgBackground,0,0,winW,winH)
      }
      imgBackground.src = this.background
    },
    initAvatar(){
      let canvas = document.getElementById('avatar')
      let ctx = canvas.getContext('2d')
      let sideLength = 0.25 * window.innerHeight
      canvas.width = sideLength
      canvas.height = sideLength
      //解决一下清晰度
      let devicePixelRatio = window.devicePixelRatio || 1  
      let backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
      let ratio = devicePixelRatio / backingStoreRatio
      let oldWidth = canvas.width; 
      let oldHeight = canvas.height; 
      canvas.width = oldWidth * ratio; 
      canvas.height = oldHeight * ratio; 
      canvas.style.width = oldWidth + 'px'; 
      canvas.style.height = oldHeight + 'px'; 
      ctx.scale(ratio, ratio); 
      // 装载图片
      let imgAvatar = new Image()
      imgAvatar.onload = () => {
        ctx.drawImage(imgAvatar,0,0,sideLength,sideLength)
      }
      imgAvatar.src = this.avatarList[Math.abs(this.avatarCurrent % 12)]
    },
    initArrow(){
      let arrowHeight = 0.07 * window.innerHeight
      let arrowWidth = 149 / 123 * arrowHeight
      
      // 左箭头
      let canvasLeft = document.getElementById('left')
      let ctxLeft = canvasLeft.getContext('2d')
      canvasLeft.width = arrowWidth
      canvasLeft.height = arrowHeight
      //解决一下清晰度
      let devicePixelRatio = window.devicePixelRatio || 1  
      let backingStoreRatio = ctxLeft.webkitBackingStorePixelRatio || ctxLeft.mozBackingStorePixelRatio || ctxLeft.msBackingStorePixelRatio || ctxLeft.oBackingStorePixelRatio || ctxLeft.backingStorePixelRatio || 1
      let ratio = devicePixelRatio / backingStoreRatio
      let oldWidth = canvasLeft.width; 
      let oldHeight = canvasLeft.height; 
      canvasLeft.width = oldWidth * ratio; 
      canvasLeft.height = oldHeight * ratio; 
      canvasLeft.style.width = oldWidth + 'px'; 
      canvasLeft.style.height = oldHeight + 'px'; 
      ctxLeft.scale(ratio, ratio); 
      // 装载图片
      let imgLeft = new Image()
      imgLeft.onload = () => {
        ctxLeft.drawImage(imgLeft,0,0,arrowWidth,arrowHeight)
      }
      imgLeft.src = this.arrowLeft
      
      // 右箭头
      let canvasRight = document.getElementById('right')
      let ctxRight = canvasRight.getContext('2d')
      canvasRight.width = arrowWidth
      canvasRight.height = arrowHeight
      //解决一下清晰度
      devicePixelRatio = window.devicePixelRatio || 1  
      backingStoreRatio = ctxRight.webkitBackingStorePixelRatio || ctxRight.mozBackingStorePixelRatio || ctxRight.msBackingStorePixelRatio || ctxRight.oBackingStorePixelRatio || ctxRight.backingStorePixelRatio || 1
      ratio = devicePixelRatio / backingStoreRatio
      oldWidth = canvasRight.width; 
      oldHeight = canvasRight.height; 
      canvasRight.width = oldWidth * ratio; 
      canvasRight.height = oldHeight * ratio; 
      canvasRight.style.width = oldWidth + 'px'; 
      canvasRight.style.height = oldHeight + 'px'; 
      ctxRight.scale(ratio, ratio); 
      // 装载图片
      let imgRight = new Image()
      imgRight.onload = () => {
        ctxRight.drawImage(imgRight,0,0,arrowWidth,arrowHeight)
      }
      imgRight.src = this.arrowRight
    },

    changeLeft(){
      this.avatarCurrent = this.avatarCurrent - 1
      let canvas = document.getElementById('avatar')
      let ctx = canvas.getContext('2d')
      let sideLength = 0.25 * window.innerHeight
      canvas.width = sideLength
      canvas.height = sideLength
      // 装载图片
      let imgAvatar = new Image()
      imgAvatar.onload = () => {
        ctx.drawImage(imgAvatar,0,0,sideLength,sideLength)
      }
      imgAvatar.src = this.avatarList[Math.abs(this.avatarCurrent % 12)]

    },
    changeRight(){
      this.avatarCurrent = this.avatarCurrent + 1
      let canvas = document.getElementById('avatar')
      let ctx = canvas.getContext('2d')
      let sideLength = 0.25 * window.innerHeight
      canvas.width = sideLength
      canvas.height = sideLength
      //解决一下清晰度
      let devicePixelRatio = window.devicePixelRatio || 1  
      let backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
      let ratio = devicePixelRatio / backingStoreRatio
      let oldWidth = canvas.width; 
      let oldHeight = canvas.height; 
      canvas.width = oldWidth * ratio; 
      canvas.height = oldHeight * ratio; 
      canvas.style.width = oldWidth + 'px'; 
      canvas.style.height = oldHeight + 'px'; 
      ctx.scale(ratio, ratio); 
      // 装载图片
      let imgAvatar = new Image()
      imgAvatar.onload = () => {
        ctx.drawImage(imgAvatar,0,0,sideLength,sideLength)
      }
      imgAvatar.src = this.avatarList[Math.abs(this.avatarCurrent % 12)]
    }
    
  },
  // canves 的初始化
  mounted(){
    let canvas = document.getElementById('page')
    if (canvas.getContext){
      console.log("我可以支持")
      this.initCanvas()
      this.initAvatar()
      this.initArrow()
      window.onresize = () => {
        this.initCanvas()
        this.initAvatar()
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

@side-length: calc(0.25 * 100vh);
@arrow-height: calc(0.07 * 100vh);
@arrow-width: calc(149 / 123 * @arrow-height);
@arrow-interval: calc(0.2 * 100vh);


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
  left: calc(50vw - @side-length * 0.50);
  top: calc(50vh - @side-length * 0.53);
  width: @side-length;
  height: @side-length;
}
#left{
  z-index: 20;
  position: absolute;
  left: calc(50vw - @arrow-interval - @arrow-width * 0.54);
  top: calc(50vh - @arrow-height * 0.54);
  width: @arrow-width;
  height: @arrow-height;
}
#right{
  z-index: 20;
  position: absolute;
  right: calc(50vw - @arrow-interval - @arrow-width * 0.50);
  top: calc(50vh - @arrow-height * 0.54);
  width: @arrow-width;
  height: @arrow-height;
}
</style>
