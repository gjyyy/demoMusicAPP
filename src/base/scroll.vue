<template>
<div ref="wrapper">
    <slot></slot>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props:{
        probeType:{
            type:Number,
            default:1,
        },
        click:{
            type:Boolean,
            default:true,
        },
        data:{
            type:Array,
            default:null,
        },
        //scroll是否监听
        listenScroll:{
            type:Boolean,
            default:true
        },
        //上拉刷新
        pullup:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        setTimeout(()=>{
            this._initScroll()
        },20)
    },
    methods:{
        _initScroll(){
            if(!this.$refs.wrapper){
                return;
            }
            this.scroll=new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click:this.click,
            })
            //是否派发监听事件
            if(this.listenScroll){
                let me = this
                this.scroll.on('scroll',(pos)=>{
                    me.$emit('scroll',pos)
                })
            }
            //上拉加载 派发什么时候刷新
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        this.$emit('scrollToEnd')
                    }
                })
            }
        },
        disable(){
            this.scroll && this.scroll.disable()
        },
        enable(){
            this.scroll && this.scroll.enable()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        },
        
    },
    watch:{
        data(){
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        }
    }
}
</script>
<style>

</style>