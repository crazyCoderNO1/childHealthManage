<template>
    <div class="parentlnav">
        <el-row class="menu_page">
            <el-col :span="4">
                <el-menu
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <router-link to="/parentHome">
                    <el-menu-item index="0">
                        <i class="iconfont icon-jiankangguanli1"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                 <router-link to="/healthState">
                    <el-menu-item index="1">
                        <i class="iconfont icon-tijian-copy"></i>
                        <span slot="title">幼儿健康状态</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/messageBoard">
                    <el-menu-item index="2">
                        <i class="iconfont icon-tijian-copy"></i>
                        <span slot="title">留言板</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/parentShow">
                    <el-menu-item index="3">
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
    name:'parentlnav',
    data(){
        return {
            
        }
    },
}
</script>
<style>
.parentlnav .menu_page {
  position: fixed;
  left: 0;
  min-height: 100%;
  z-index: 99;
}
.parentlnav .el-menu {
  border: none;
}
.parentlnav .fa-margin {
  margin-right: 5px;
}
.parentlnav .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 228px;
  min-height: 544px;
}
.parentlnav .el-menu-vertical-demo {
  width: 35px;
}
.left-menu .el-submenu .el-menu-item {
  min-width: 180px;
}

.parentlnav .hiddenDropdown,
.hiddenDropname {
  display: none;
}
.parentlnav a {
  text-decoration: none;
}
.parentlnav i.iconfont{
    display: inline-block;
    margin-right: 10px;
    margin-left: 4px;
}
</style>

