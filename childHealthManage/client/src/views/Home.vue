<template>
    <div class="home">
        <div class="container">
            <div class="topCon">
                <div class="title">幼儿健康管理系统</div>
                <p class="lead">欢迎您！</p>
            </div>
            <div class="cenCon">
                <el-calendar v-model="value">
                </el-calendar>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    data(){
        return {
            value: new Date()
        }
    }
}
</script>
<style>
.home{
    width: 1180px;
    height: 100%;
    background: url('../assets/banner2.jpg');
    background-size: 100% 100%;
}
.home .container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 20px;
    text-align: center;
}
.home .container .topCon{
    width: 960px;
    padding: 20px 40px 40px 40px;
    margin-left: 60px;
}
.home .container .cenCon{
    width: 920px;
    padding: 40px 60px 40px 60px;
    margin-left: 60px;
}
.home .container .title{
    color: #333;
    font-size: 28px;
    margin: 10px;
}
.home .container .lead{
    color: #333;
    font-size: 28px;
}
</style>
