<template>
    <div class="teachershow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <div class="user-avator">
                    <img src="../assets/luergou.jpg" alt="">
                </div>
            </el-col>
            <el-col :span="16">
                <div class="user-info">
                    <div class="user-item">
                        <i class="iconfont icon-yonghu"></i>
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="iconfont icon-user-info-copy-copy"></i>
                        <span>{{user.identity}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'teachershow',
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    data(){
        return {
            
        }    
    },
    created(){
       
    },
    methods:{
       
    }
    
}
</script>
<style>
.teachershow{
    width: 100%;
    height: 100%;
}
.teachershow .el-row{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.teachershow .el-col:first-child{
    background-color: rgb(245, 236, 236);
}
.teachershow .el-col:nth-child(2){
    background-color: rgb(219, 207, 207);
}
.teachershow .user-avator{
    width: 100%;
    height: 100%;
    margin-top: 100px;
}
.teachershow .user-info{
    width: 100%;
    height: 100%;
    margin-top: 100px;
}
.teachershow .user-info .user-item{
    margin-bottom: 16px;
    margin-left: 40px;
}
.teachershow .user-avator img{
    width: 200px;
    height: 200px;
    margin-left: 130px;
}
.teachershow .user-item i.iconfont{
    display: inline-block;
    margin-right: 10px;
    font-size: 20px;
}
</style>
