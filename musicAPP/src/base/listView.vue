<template>
<Scroll :data="data"
        class="listview"
        ref="listView"
        @scroll="scroll"
        :probeType="probeType"
>
    <ul class="list">
        <li v-for="(item1,index1) in data" :key="index1" class="list_group" ref="listview_item">
            <h2 class="list_group_title">{{item1.title}}</h2>
            <ul class="list-item">
                <li v-for="(item2,index2) in item1.items" :key="index2" class="list_group_item" @click="selectItem(item2)">
                    <img v-lazy="item2.avatar" alt="" class="list_group_item_img">
                    <span class="list_group_item_name">{{item2.name}}</span>
                </li>
            </ul>
        </li>
    </ul>
    <div class="tab_right" >
        <ul >
            <li class="tab_right_item" v-for="(item3,index) in data" :key="index" :data-index="index" @touchmove.stop.prevent="toTouchMove" @touchstart="toTouchScroll" :class="{'current':currentIndex===index}">
                {{item3.title}}
            </li>
        </ul>
    </div>
</Scroll> 
</template>
<script>
import Scroll from '@/base/scroll.vue'
import { setTimeout } from 'timers';
export default {
    created(){
        this.touch = {}
        this.listheight=[]
        this.probeType=3
    },
    data(){
        return {
            scrollY:-1,
            currentIndex:0,
        }
    },
    props:{
        data:{
            type:Array,
            default:[]
        },
    },
    components:{
        Scroll,
    },
    methods:{
        selectItem(item){
            this.$emit('select',item)
        },
        toTouchScroll(e){
            //根据data-index属性获取当前li的index值
            let anchorIndex=e.target.getAttribute('data-index')
            //移动到anchorIndex位置
            this.$refs.listView.scrollToElement(this.$refs.listview_item[anchorIndex],0)
            //事件触点的第一个位置
            let firsttouch=e.touches[0]
            //纵坐标存入touch对象中，touch为公共对象（为了在toTouchMove中共享）
            this.touch.y1=firsttouch.pageY
            //anchorIndex存入touch对象
            this.touch.anchorIndex=anchorIndex
            
            this.scrollY = -this.listheight[anchorIndex]
        },
        toTouchMove(e){
            let firsttouch=e.touches[0]
            this.touch.y2=firsttouch.pageY
            //两次纵坐标之差除以每个字母所占的高度，向上取整
            let delta=Math.floor((this.touch.y2-this.touch.y1)/18)
            let anchorIndex=parseInt(this.touch.anchorIndex)+delta
            this.$refs.listView.scrollToElement(this.$refs.listview_item[anchorIndex],0);
        },
        scroll(pos){
            //@scroll='scroll'监听滚动事件，pos对象包括x，y值
            this.scrollY=pos.y
        },
        _caculatedY(){
            let height=0
            this.listheight.push(height)
            let el=this.$refs.listview_item
            //获取每一个li高度的数组
            for(let i = 0 ; i < el.length; i++){
                let item = el[i]
                height += item.clientHeight
                this.listheight.push(height)
            }
        }
    },
    watch:{
        //监听data的变化
        data(){
            setTimeout(()=>{
                this._caculatedY()
            },20)
        },
        //监听scrollY的变化
        scrollY:function(newY){
            // 当滚动到顶部，newY>0
            if (newY > 0 || newY == 0) { 
                this.currentIndex = 0
                return
            }
            for(let i = 0;i < this.listheight.length; i++){
                let height1=this.listheight[i]
                let height2=this.listheight[i+1]
                if(!height2||(-newY >= height1 && -newY < height2)){
                    this.currentIndex=i
                    return
                }
            }
            this.currentIndex=0
        }
    }
}
</script>
<style lang="stylus" scoped>
.listview
    width: 100%
    height: 100%
    overflow: hidden
    background: rgb(34, 34, 34)
    .list
        .list_group
            padding-bottom: 30px
            .list_group_title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: 12px
                color: rgba(255, 255, 255, 0.5)
                background: #333
        .list-item
            .list_group_item
                display: flex
                align-items: center
                padding: 20px 0px 0px 30px
                .list_group_item_img
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .list_group_item_name
                    margin-left: 20px
                    color:rgba(255, 255, 255, 0.5)
    .tab_right
        position: absolute
        z-index: 100
        right: 0
        top: 50%
        transform: translateY(-50%)
        width: 20px
        padding: 20px 0
        border-radius: 10px
        background: rgba(0, 0, 0, 0.3)
        font-family: Helvetica
        .tab_right_item
            padding-bottom: 6px
            line-height: 1
            text-align: center
            color: hsla(0, 0%, 100%, 0.5)
            font-size: 12px
            &.current
                color:red
</style>


