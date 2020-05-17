<template>
  <div id="app" @touchmove.prevent @mousewheel.prevent>
    <div v-if="isSupportCanvas && iswxConfig">
      <canvas id="page"></canvas>
      <!--<canvas id="avatar"></canvas>-->
      <img id="avatar" :src="avatarExtendBase64">
      <img id="avatarPre" :src="avatarBase64">
      <canvas id="left" @click="changeLeft"></canvas>
      <canvas id="right" @click="changeRight"></canvas>
      <button id="upload" @click="chooseImg">上传头像</button>
      <button id="download"  @click="downloadImg">预览</button>
      <div id="tip">
        <p>点击预览后,长按头像保存</p>
      </div>
    </div>
    <div v-else id="empty">
      <img style="width:200px" :src="emptyPlaceholder">
      <p>我好像用不了啊～～～</p>
    </div>
  </div>
</template>

<script>
import background from "./assets/anniversary-background.png"
import emptyPlaceholder from "./assets/home-empty.png";
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
        11:avatar12
      },
      avatarTotal: 12,
      avatarCurrent: 0,
      isSupportCanvas: true,
      iswxConfig: true,
      avatar: '',
      avatarBase64: '',
      avatarExtendBase64: ''
    }
  },
  methods:{
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
      if(this.avatarBase64 !== ''){
        let img = new Image()
        img.onload = () => {
          ctx.drawImage(img,0,0,sideLength,sideLength)
        }
        img.src = this.avatarBase64
      }
    },
    // 初始化箭头画布
    initArrow(){
      let arrowHeight = 0.05 * window.innerHeight
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
    // 初始化原始图像画布
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
      img.src = this.avatarBase64
        
    },
    // 初始化头像装饰图片
    initImg(){
      this.avatarExtendBase64 = this.avatarList[Math.abs(this.avatarCurrent % this.avatarTotal)]
    },

    changeLeft(){
      // console.log(this.avatarCurrent)
      // console.log(Math.abs(this.avatarCurrent % this.avatarTotal))
      this.avatarCurrent = this.avatarCurrent - 1
      // this.initAvatar()
      this.initImg()
    },
    changeRight(){
      // console.log(this.avatarCurrent)
      // console.log(Math.abs(this.avatarCurrent % this.avatarTotal))
      this.avatarCurrent = this.avatarCurrent + 1
      // this.initAvatar()
      this.initImg()
    },


    chooseImg(){
      let that = this
      window.wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.avatar = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          window.wx.getLocalImgData({
            localId: that.avatar, // 图片的localID
            success: function (res) {
              that.avatarBase64 = res.localData // localData是图片的base64数据，可以用img标签显示
              //console.log(that.avatarBase64)
            }
          })
        }
      })
      
      
    },
    downloadImg(){
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
      context.scale(ratio, ratio)

      let firstImage = new Image()
      firstImage.src = this.avatarBase64
      firstImage.crossOrigin = 'Anonymous'

      firstImage.onload = function(){
        context.drawImage(firstImage , 0 , 0 , sideLength , sideLength)

        let secondImage = new Image()
        secondImage.src = that.avatarList[Math.abs(that.avatarCurrent % that.avatarTotal)]
        secondImage.crossOrigin = 'Anonymous'
        
        secondImage.onload = function(){
          context.drawImage(secondImage ,0 , 0 , sideLength , sideLength)
          let base64 = canvas.toDataURL("image/png")
          console.log(base64)
          let img = document.getElementById('avatar')
          img.setAttribute('src' , base64)
          window.wx.previewImage({
            current: base64, // 当前显示图片的http链接
            urls: [base64] // 需要预览的图片http链接列表
          })
        }
      }


    }
    
  },
  // canves 的初始化
  mounted(){
    let canvas = document.getElementById('page')
    if (canvas.getContext){
      console.log("我可以支持")
      this.initCanvas()
      // this.initAvatar()
      this.initImg()
      this.initArrow()
      window.onresize = () => {
        this.initCanvas()
        // this.initAvatar()
        this.initImg()
        this.initArrow()
      }
    } else {
      console.log("我不支持")
      this.isSupportCanvas = false
    }
    this.isLoading = false
  },
  // 页面初始化
  async created(){
    //微信配置
    const res = await this.$axios.post("https://xgbxscwx.seu.edu.cn/api/wxConfig",{
      url: window.location.href
    })
    if (res.data.success) {
      window.wx.config(res.data.result);
      window.wx.ready(function() {
        // 检测微信设备是否支持
        window.wx.checkJsApi({
        jsApiList: ['chooseImage','previewImage','uploadImage','downloadImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          console.log(res.checkResult)
          this.iswxConfig = 
            res.checkResult.chooseImage && 
            res.checkResult.previewImage &&
            res.checkResult.uploadImage &&
            res.checkResult.downloadImage
          }
        })
      })
    }
    else {
      this.iswxConfig = false
    }
  }
  
}
</script>

<style lang="less" scoped>
@page-height: calc(100vh);
@page-weight: calc( 906 / 1671 * @page-height ) ;
@side-length: calc(0.23 * 100vh);
@arrow-height: calc(0.05 * 100vh);
@arrow-width: calc(149 / 123 * @arrow-height);
@arrow-interval: calc(0.2 * 100vh);
@button-height: calc(0.047 * 100vh);
@button-width:  calc(290 /85 * @button-height);
@button-interval: calc(0.11 * 100vh);

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif,FangSong;
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
#avatar{
  z-index: 10;
  position: absolute;
  left: calc(50vw - @side-length * 0.50);
  top: calc(46vh - @side-length * 0.53);
  width: @side-length;
  height: @side-length;
}
#avatarPre{
  z-index: 9;
  position: absolute;
  left: calc(50vw - @side-length * 0.50);
  top: calc(46vh - @side-length * 0.53);
  width: @side-length;
  height: @side-length;
}
#left{
  z-index: 20;
  position: absolute;
  left: calc(50vw - @arrow-interval - @arrow-width * 0.5);
  top: calc(46vh - @arrow-height * 0.54);
  width: @arrow-width;
  height: @arrow-height;
}
#right{
  z-index: 20;
  position: absolute;
  left: calc(50vw + @arrow-interval - @arrow-width * 0.5);
  top: calc(46vh - @arrow-height * 0.54);
  width: @arrow-width;
  height: @arrow-height;
}
#download{
  z-index: 10;
  position: absolute;
  left: calc(50vw + @button-interval - @button-width * 0.5);
  top: calc(63vh);
  border-radius: 20px;
  outline: none;
  padding: 0px;
  border: 0px;
  background:url("./assets/anniversary-button.png") no-repeat;
  background-size:100% 100%;
  box-shadow: 1px -1px 2px 1px #a4a4a4;
  width: @button-width;
  height: @button-height;
  font-family: STFangsong;
  font-size: calc(0.022 * 100vh);
  &:active {
    color:white;
  }
}
#upload{
  z-index: 10;
  position: absolute;
  left: calc(50vw - @button-interval - @button-width * 0.5);
  top: calc(63vh);
  border-radius: 20px;
  outline: none;
  padding: 0px;
  border: 0px;
  background:url("./assets/anniversary-button.png") no-repeat;
  background-size:100% 100%;
  box-shadow: 1px -1px 2px 1px #a4a4a4;
  width: @button-width;
  height: @button-height;
  font-family: STFangsong;
  font-size: calc(0.022 * 100vh);;
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
  font-family: STFangsong;
  font-size: calc(0.022 * 100vh);
  position: absolute;
  left: calc(50vw - 11.21 * 0.022 * 100vh * 0.5);
  top: calc(56.5vh);
  
}

</style>
