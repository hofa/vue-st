<script>

import Store from './store.js';
    export default {
        data(){
            return {
                //将Store.state绑定在data上
                data:Store.state,
            }
        },
        ready(){
        },
        watch:{
            // 通过这种语法来watch就行，文档里有。。。看需求，还可以直接watch data，使用deep:true来深度观察
            'data.status':{
                handler:(val,oldVal)=>{
                    //要执行的任务
                    //这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
                    //现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
                },
                // 深度观察
                deep:true
            }
        },
        methods:{
        }
    }
</script>
