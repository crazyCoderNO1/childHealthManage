<template>
    <div class="teacherlnav">
        <el-row class="menu_page">
            <el-col :span="4">
                <el-menu
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <router-link to="/teacherHome">
                    <el-menu-item index="0">
                        <i class="iconfont icon-jiankangguanli1"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                 <router-link to="/medicalExam">
                    <el-menu-item index="1">
                        <i class="iconfont icon-tijian-copy"></i>
                        <span slot="title">体检信息</span>
                    </el-menu-item>
                </router-link>
                 <router-link to="/dietRecords">
                    <el-menu-item index="2">
                        <i class="iconfont icon-yinshi1"></i>
                        <span slot="title">饮食记录</span>
                    </el-menu-item>
                </router-link>
                 <router-link to="/healthLog">
                    <el-menu-item index="3">
                        <i class="iconfont icon-jiankangguanli2"></i>
                        <span slot="title">健康日志</span>
                    </el-menu-item>
                </router-link>
               
                <router-link to="/teacherShow">
                    <el-menu-item index="4">
                        <i class="iconfont icon-gerenxinxi2"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                </router-link>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'teacherlnav',
    data(){
        return {
            
        }
    },
}
</script>
<style>
.teacherlnav .menu_page {
  position: fixed;
  left: 0;
  min-height: 100%;
  z-index: 99;
}
.teacherlnav .el-menu {
  border: none;
}
.teacherlnav .fa-margin {
  margin-right: 5px;
}
.teacherlnav .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 228px;
  min-height: 544px;
}
.teacherlnav .el-menu-vertical-demo {
  width: 35px;
}
.left-menu .el-submenu .el-menu-item {
  min-width: 180px;
}

.teacherlnav .hiddenDropdown,
.hiddenDropname {
  display: none;
}
.teacherlnav a {
  text-decoration: none;
}
.teacherlnav i.iconfont{
    display: inline-block;
    margin-right: 10px;
    margin-left: 4px;
}
</style>

