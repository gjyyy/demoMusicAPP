<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      }
    },
    data(){
        return {
            showFlag:false
        }
    },
    methods:{
        show() {
            this.showFlag = true
        },
        hide() {
            this.showFlag = false
        },
        confirm(){
            this.showFlag=false
            this.$emit('confirm')
        },
        cancel(){
            this.showFlag=false
            this.$emit('cancel')
        }
    }
    
}
</script>
<style lang="stylus" scoped>
.confirm
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: rgba(255, 255, 255, 0.3)
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .confirm-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .confirm-content
        width: 270px
        border-radius: 13px
        background: #333
        .text
          padding: 19px 15px
          line-height: 22px
          text-align: center
          font-size: 18px
          color: rgba(255, 255, 255, 0.5)
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: 18px
          .operate-btn
            flex: 1
            line-height: 22px
            padding: 10px 0
            border-top: 1px solid rgba(0, 0, 0, 0.3)
            color: rgba(255, 255, 255, 0.3)
            &.left
              border-right: 1px solid rgba(0, 0, 0, 0.3)
@keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
