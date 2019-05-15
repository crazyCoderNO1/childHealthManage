<template>
    <div class="parenthnav">
        <el-row>
            <el-col :span="4" class="logo-container">
                <div class="logo">
                    <i class="iconfont icon-youeryuanxinxi"></i>
                </div>
                <div class="title">
                    <span>幼儿健康管理系统</span>
                </div>
            </el-col>
            <el-col :span="20" class="user">
                <div class="userinfo">
                    <div class="userImg">
                        <img src="../assets/luergou.jpg" alt="">
                    </div>
                    <div class="welcom">
                        <p class="name">{{user.name}}</p>
                        <span class="username">
                            <!--下拉菜单-->
                            <el-dropdown trigger="click" @command="setDialogInfo">
                                <span class="el-dropdown-link">
                                    <i class="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出系统</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:"parenthnav",
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    methods:{
        setDialogInfo(cmdItem){
            //console.log(cmdItem);
            switch(cmdItem){
                case "info":
                    this.showInfoList();
                    break;
                case "logout":
                    this.logout();
                    break;
            }
        },
        showInfoList(){
           this.$router.push("/parentShow");
        },
        logout(){
            //console.log("退出");
            //清除token
            localStorage.removeItem('eleToken');
            //设置vuex store
            this.$store.dispatch("clearCurrentState");
            //跳转
            this.$router.push("/login");
        }
    }

}
</script>
<style>
.parenthnav{
    width: 100%;
    height: 80px;
    background:url("../assets/banner1.jpg");
    min-width: 600px;
    color: #eee;
    border-bottom: 1px solid #333;
    font-size: 18px;
}
.parenthnav .logo-container{
    background-color: #333;
    height: 80px;
}
.parenthnav .logo-container i.iconfont{
    color: rgb(128, 248, 80);
    font-size: 32px;
}
.parenthnav .logo-container .title{
    float: right;
    margin-right: 28px;
    margin-top: -24px;

}
.parenthnav .logo-container .logo{
    margin-top: 24px;
    margin-left: 18px;
}
.parenthnav .user .userinfo{
    float: right;
    height: 80px;
    margin-right:54px;
}
.parenthnav .user .userinfo>div{
    float: left;
}
.parenthnav .user .userinfo>.userImg{
    border: 1px solid #ccc;
    width: 54px;
    height: 54px;
    font-size: 40px;
    border-radius: 50%;
    margin-top: 12px;
    margin-right: 18px;
}
.parenthnav .user .userinfo>.welcom{
    margin-top: 26px;
}
.parenthnav .user .userinfo>.welcom .username{
    float: right;
}
.parenthnav .user .userinfo>.userImg>img{
    width: 54px;
    height: 54px;
    border-radius: 50%;
}
.parenthnav .el-icon-caret-bottom{
    color: #eee;
}
</style>

