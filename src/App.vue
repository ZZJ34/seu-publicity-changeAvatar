<template>
  <div id="app" @touchmove.prevent @mousewheel.prevent>
    <div id='main'>
      <div v-if="isSupportCanvas && iswxConfig" >
        <canvas id="init" @click="change"></canvas>
        <canvas id="page"></canvas>
        <!--<canvas id="avatar"></canvas>-->
        <img id="avatar" :src="avatarExtend" crossorigin='anonymous'>
        <img v-if="avatar" id="avatarPre" :src="avatar" >
        <canvas id="left" @click="changeLeft"></canvas>
        <canvas id="right" @click="changeRight"></canvas>
        <button id="upload" @click="chooseImg">{{ this.buttonTip }}</button>
        <div id="tip">
          <p>长按头像保存</p>
        </div>
      </div>
      <div v-else id="empty">
        <img style="width:200px" :src="emptyPlaceholder">
        <p>我好像用不了啊～～～</p>
      </div>
    </div>
    <div id='loading' style="text-align: center;">
      <div id='percentTip'>
        <div id = 'percent'>{{ percent }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import background from "./assets/anniversary-background.jpg"
import backgroundInit from "./assets/y-anniversary-background-init.png"
import emptyPlaceholder from "./assets/home-empty.png";
import avatar1 from "./assets/y1.png"
// eslint-disable-next-line no-unused-vars
import avatar2 from "./assets/y2.png"
// eslint-disable-next-line no-unused-vars
import avatar3 from "./assets/y3.png"
// eslint-disable-next-line no-unused-vars
import avatar4 from "./assets/y4.png"
// eslint-disable-next-line no-unused-vars
import avatar5 from "./assets/y5.png"
// eslint-disable-next-line no-unused-vars
import avatar6 from "./assets/y6.png"
// eslint-disable-next-line no-unused-vars
import avatar7 from "./assets/y7.png"
// eslint-disable-next-line no-unused-vars
import avatar8 from "./assets/y8.png"
// eslint-disable-next-line no-unused-vars
import avatar9 from "./assets/y9.png"
// eslint-disable-next-line no-unused-vars
import avatar10 from "./assets/y10.png"
// eslint-disable-next-line no-unused-vars
import avatar11 from "./assets/y11.png"
// eslint-disable-next-line no-unused-vars
import avatar12 from "./assets/y12.png"
// eslint-disable-next-line no-unused-vars
import avatar13 from "./assets/y13.png"
import arrowLeft from "./assets/anniversary-left.png"
import arrowRight from "./assets/anniversary-right.png"
export default {
  name: 'App',
  data(){
    return{
      background,
      backgroundInit,
      arrowLeft,
      arrowRight,
      emptyPlaceholder,
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
        11:avatar12,
        12:avatar13,
      },
      avatarTotal: 13,
      avatarCurrent: 0,
      isSupportCanvas: true,
      iswxConfig: true,
      avatar: '',
      avatarBase64: '',
      avatarExtend: '',
      buttonTip:'上传头像',
      isAndriod: false,
      isiOS: false,
      count: 0,
      percent: '0%'
    }
  },
  methods:{
    // 初始化一开始的背景
    initFirstCanvas(){
      let canvas = document.getElementById('init')
      let ctx = canvas.getContext('2d')
      // 画布高度
      let winH = window.innerHeight
      // 画布宽度
      let winW = 906 / 1671 * winH 
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
      imgBackground.src = this.backgroundInit
    },
    // 初始化背景画布
    initCanvas(){
      let canvas = document.getElementById('page')
      let ctx = canvas.getContext('2d')
      // 画布高度
      let winH = window.innerHeight
      // 画布宽度
      let winW = 906 / 1671 * winH 
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
    // 初始化头像装饰画布
    initAvatar(){
      let canvas = document.getElementById('avatar')
      let ctx = canvas.getContext('2d')
      let sideLength = 0.23 * window.innerHeight
      canvas.width = sideLength
      canvas.height = sideLength
      //解决一下清晰度
      let devicePixelRatio = window.devicePixelRatio || 1  
      let backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
      let ratio = devicePixelRatio / backingStoreRatio
      let oldWidth = canvas.width 
      let oldHeight = canvas.height
      canvas.width = oldWidth * ratio 
      canvas.height = oldHeight * ratio 
      canvas.style.width = oldWidth + 'px' 
      canvas.style.height = oldHeight + 'px' 
      ctx.scale(ratio, ratio); 
      // 装载图片
      let imgAvatar = new Image()
      imgAvatar.onload = () => {
        ctx.drawImage(imgAvatar,0,0,sideLength,sideLength)
      }
      imgAvatar.src = this.avatarList[Math.abs(this.avatarCurrent % this.avatarTotal)]
      if(this.avatar !== ''){
        let img = new Image()
        img.onload = () => {
          ctx.drawImage(img,0,0,sideLength,sideLength)
        }
        img.src = this.avatar
      }
    },
    // 初始化箭头画布
    initArrow(){
      let arrowHeight = 0.05 * window.innerHeight
      let arrowWidth = arrowHeight
      
      // 左箭头
      let canvasLeft = document.getElementById('left')
      let ctxLeft = canvasLeft.getContext('2d')
      canvasLeft.width = arrowWidth
      canvasLeft.height = arrowHeight
      //解决一下清晰度
      let devicePixelRatio = window.devicePixelRatio || 1  
      let backingStoreRatio = ctxLeft.webkitBackingStorePixelRatio || ctxLeft.mozBackingStorePixelRatio || ctxLeft.msBackingStorePixelRatio || ctxLeft.oBackingStorePixelRatio || ctxLeft.backingStorePixelRatio || 1
      let ratio = devicePixelRatio / backingStoreRatio
      let oldWidth = canvasLeft.width 
      let oldHeight = canvasLeft.height
      canvasLeft.width = oldWidth * ratio
      canvasLeft.height = oldHeight * ratio
      canvasLeft.style.width = oldWidth + 'px'
      canvasLeft.style.height = oldHeight + 'px'
      ctxLeft.scale(ratio, ratio)
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
    // 初始化原始头像画布
    initAvatarPre(){
      let canvas = document.getElementById('avatarPre')
      let ctx = canvas.getContext('2d')
      let sideLength = 0.23 * window.innerHeight
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
      let img = new Image()
      img.onload = () => {
        ctx.drawImage(img,0,0,sideLength,sideLength)
      }
      img.src = this.avatar
        
    },
    // 初始化头像装饰图片
    initImg(){
      this.avatarExtend = this.avatarList[Math.abs(this.avatarCurrent % this.avatarTotal)]
    },

    // 点击，隐藏初始化界面
    change(){
      document.getElementById("init").style.display="none"
    },

    changeLeft(){
      // console.log(this.avatarCurrent)
      // console.log(Math.abs(this.avatarCurrent % this.avatarTotal))
      this.avatarCurrent = this.avatarCurrent - 1
      // this.initAvatar()
      this.initImg()
      this.mergeImg()
    },
    changeRight(){
      // console.log(this.avatarCurrent)
      // console.log(Math.abs(this.avatarCurrent % this.avatarTotal))
      this.avatarCurrent = this.avatarCurrent + 1
      // this.initAvatar()
      this.initImg()
      this.mergeImg()
    },


    chooseImg(){
      this.buttonTip = "上传中..."
      let that = this
      // 选择头像
      window.wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.avatar = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          window.wx.getLocalImgData({
            localId: that.avatar, // 图片的localID
            success: function (res) {
              if(that.isiOS){
                that.avatar = res.localData 
                that.avatarBase64 = res.localData
              }else{
                that.avatarBase64 = 'data:image/png;base64,' + res.localData
              }

              that.buttonTip = '上传完成，点击重新上传'
              that.mergeImg()
              //console.log(that.avatarBase64)
            }
          })
        }
      })
      
      
    },
    // 头像和并
    mergeImg(){
      let that = this
      let canvas = document.createElement("canvas");
      let sideLength = 0.23 * window.innerHeight
      canvas.width = sideLength
      canvas.height = sideLength
      let context = canvas.getContext("2d");

       //解决一下清晰度
      let devicePixelRatio = window.devicePixelRatio || 1  
      let backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1
      let ratio = devicePixelRatio / backingStoreRatio
      let oldWidth = canvas.width
      let oldHeight = canvas.height 
      canvas.width = oldWidth * ratio
      canvas.height = oldHeight * ratio 
      canvas.style.width = oldWidth + 'px' 
      canvas.style.height = oldHeight + 'px' 
      //context.scale(ratio, ratio)
      


      let firstImage = new Image()
      firstImage.src = this.avatarBase64
      firstImage.crossOrigin = 'anonymous'
  

      firstImage.onload = function(){
        context.drawImage(firstImage , 0 , 0 , ratio*sideLength , ratio * sideLength)
        
        
        let secondImage = new Image()
        secondImage.src = that.avatarExtend
        secondImage.crossOrigin = 'anonymous'
        
        secondImage.onload = function(){
          context.drawImage(secondImage ,0 , 0 , ratio*sideLength ,  ratio*sideLength)
          
          let base64 = canvas.toDataURL("image/png")
          let img = document.getElementById('avatar')
          img.setAttribute('src' , base64)
          img.setAttribute('crossOrigin','anonymous');

        }
      }


    }
    
  },
  // canves 的初始化
  mounted(){
    document.getElementById("main").style.display="none"
    let canvas = document.getElementById('page')
    if (canvas.getContext){
      console.log("我可以支持")
      this.initCanvas()
      this.initFirstCanvas()
      // this.initAvatar()
      this.initImg()
      this.initArrow()
      window.onresize = () => {
        this.initCanvas()
        // this.initAvatar()
        this.initImg()
        this.initArrow()
        this.initFirstCanvas()
      }
    } else {
      console.log("我不支持")
      this.isSupportCanvas = false
    }
    
    
    for(let i = 0 ; i < this.avatarTotal ; i++){
      let image = new Image();
      image.src = this.avatarList[i]
      image.onload = () =>{
        this.count++
        this.percent = `${Math.floor(this.count / this.avatarTotal * 100)}%`
        document.getElementById("percent").style.background=`linear-gradient(to top, #f6ab00 ${this.percent}, white ${this.percent})`
        document.getElementById("percent").style.WebkitBackgroundClip='text'
        document.getElementById("percent").style.color='transparent'
      }
    }

    
  },
  watch: {
    count: async(val) => {
      // 根据实际的头像挂饰数量修改
      
      if (val === 13) {
        setTimeout(() =>{
          document.getElementById("loading").style.display="none"
          document.getElementById("main").style.display="inline"
        },300);
      }
    }
  },
  // 页面初始化
  async created(){
    // 微信配置
    // console.log(window.navigator.userAgent)
    if(window.navigator.userAgent.indexOf('Android') !== -1){
      this.isAndriod = true
    }else{
      this.isiOS = true
    }
    
  }
  
}
</script>

<style lang="less" scoped>
@page-height: calc(100vh);
@page-weight: calc( 906 / 1671 * @page-height ) ;
@side-length: calc(0.23 * 100vh);
@arrow-height: calc(0.05 * 100vh);
@arrow-width: calc( @arrow-height);
@arrow-interval: calc(0.2 * 100vh);
@button-height: calc(0.045 * 100vh);
@button-width:  calc(510 / 85 * @button-height);

@font-face {
	font-family:fs;
	src: url('./assets/font/华文仿宋.ttf');
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
}
#page {
  z-index: -1;
  position: absolute;
  left: calc(50vw - @page-weight * 0.5);
  top: 0px;
}
#init {
  z-index: 100;
  position: absolute;
  left: calc(50vw - @page-weight * 0.5);
  top: 0px;
}
#avatar{
  z-index: 10;
  position: absolute;
  left: calc(50vw - @side-length * 0.50);
  top: calc(50vh - @side-length * 0.53);
  width: @side-length;
  height: @side-length;
}
#avatarPre{
  z-index: 9;
  position: absolute;
  left: calc(50vw - @side-length * 0.50);
  top: calc(50vh - @side-length * 0.53);
  width: @side-length;
  height: @side-length;
}
#left{
  z-index: 20;
  position: absolute;
  left: calc(50vw - @arrow-interval - @arrow-width * 0.5);
  top: calc(50vh - @arrow-height * 0.54);
  width: @arrow-width;
  height: @arrow-height;
}
#right{
  z-index: 20;
  position: absolute;
  left: calc(50vw + @arrow-interval - @arrow-width * 0.5);
  top: calc(50vh - @arrow-height * 0.54);
  width: @arrow-width;
  height: @arrow-height;
}
#upload{
  z-index: 10;
  position: absolute;
  left: calc(50vw - @button-width * 0.5);
  top: calc(66vh);
  border-radius: 20px;
  outline: none;
  padding: 0px;
  border: 0px;
  background:url("./assets/anniversary-button.png") no-repeat;
  background-size:100% 100%;
  box-shadow: 1px -1px 2px 1px #a4a4a4;
  width: @button-width;
  height: @button-height;
  font-family: 'fs';
  font-size: calc(0.022 * 100vh);
  &:active {
    color:white;
  }
}
#empty{
  width:100%; 
  display:flex; 
  flex-direction:column;
  align-items:center; 
  justify-content:center;
}
#tip{
  z-index: 10;
  font-family: 'fs';
  font-size: calc(0.022 * 100vh);
  position: absolute;
  left: calc(50vw - 6 * 0.022 * 100vh * 0.5);
  top: calc(50.5vh);
  
}
#percentTip{
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  justify-content:  center;
  font-size: calc(0.037 * 100vh);
  font-style: italic;
  div {
    background: linear-gradient(to top, #f6ab00 10%, white 10%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

  }
}

</style>
