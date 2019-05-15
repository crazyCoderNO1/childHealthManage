<template>
    <div class="parenthome">
        <div class="container">
            <div class="topCon">
                <div class="title">幼儿健康管理系统</div>
                <p class="lead">欢迎您！</p>
            </div>
            <div class="cenCon">
                <template>
                    <el-carousel :interval="4000" arrow="always" height="460px">
                        <el-carousel-item>
                            <img src="../assets/background1.jpg" alt="">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/background2.jpg" alt="">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/background3.jpg" alt="">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/background4.jpg" alt="">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/background5.jpg" alt="">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/background6.jpg" alt="">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/background7.jpg" alt="">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/background8.jpg" alt="">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="../assets/background9.jpg" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'parenthome',
    data(){
        return {
        }
    }
}
</script>
<style>
.parenthome{
    width: 1180px;
    height: 100%;
    background: rgb(231, 222, 222);
    background-size: 100% 100%;
}
.parenthome .container::after{
    clear: both;
    content: "";
    display: block;
}
.parenthome .container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 0px;
    overflow: hidden;
}
.parenthome .container .topCon{
    width: 840px;
    position: absolute;
    top: 60px;
    left: 100px;
    z-index: 400;
    text-align: center;
}
.parenthome .container .cenCon{
    width: 920px;
    border: 1px solid #fff;
    margin-left: 100px;
    margin-top: 20px;
}
.parenthome .container .title{
    color: #312f2f;
    font-size: 28px;
    margin: 10px;
}
.parenthome .container .lead{
    color: #312f2f;
    font-size: 28px;
}
.parenthome .el-carousel__item img {
    width: 100%;
    height: 460px;
}

</style>
