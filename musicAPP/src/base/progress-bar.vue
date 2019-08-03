<template>
<div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
        <div class="progress" ref="progress"></div>
        <div class="progress-btn-wrapper" ref="progressBtn"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend="progressTouchEnd">
            <div class="progress-btn"></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:{
        percent:{
            type:Number,
            default:0
        }
    },
    created(){
        this.touch={} //在不同回调函数之间的数据通信
    },
    methods:{
        //移动
        _offset(offsetWidth){
            this.$refs.progress.style.width=`${offsetWidth}px`
            this.$refs.progressBtn.style['transform']=`translate3d(${offsetWidth}px,0,0)`
        },
        progressTouchStart(e){
            this.touch.init=true
            this.touch.startX=e.touches[0].pageX
            this.touch.left=this.$refs.progress.clientWidth
        },
        progressTouchMove(e){
            if(!this.touch.init){
                return
            }
            const delta=e.touches[0].pageX-this.touch.startX
            const offsetWidth=Math.min(this.$refs.progressBar.clientWidth-16,Math.max(0,this.touch.left+delta))
            this._offset(offsetWidth)
        },
        progressTouchEnd(e){
            this.touch.init=false
            this._triggerPercent()
        },
        progressClick(e){
            //offsetX 表示鼠标指针位置相对于触发事件的对象的 x 坐标。 
            this._offset(e.offsetX)
            this._triggerPercent()
        },
        //子组件将percent抛给父组件
        _triggerPercent(){
            const percent=this.$refs.progress.clientWidth/(this.$refs.progressBar.clientWidth-16)
            this.$emit('percentChange',percent)
        }
    },
    watch:{
        percent:function(newPercent){
            if(newPercent>=0 && !this.touch.init){
                const barWidth=this.$refs.progressBar.clientWidth-16
                const offsetWidth=newPercent*barWidth
                this._offset(offsetWidth)
            }
        }
    }
    
}
</script>
<style lang="stylus" scoped>
.progress-bar
    z-index: 300
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: #ffcd32
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid white
          border-radius: 50%
          background: #ffcd32
</style>

