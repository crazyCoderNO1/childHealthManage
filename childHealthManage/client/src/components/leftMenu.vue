<template>
    <div class="left-menu">
        <el-row class="menu_page">
            <el-col :span="4">
                <el-menu
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <router-link to="/Home">
                    <el-menu-item index="0">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <template v-for="item in items">
                        <el-submenu  v-if="item.children" :index="item.path" :key="item.path">
                            <template slot="title">
                                <i :class="'iconfont '+item.icon"></i>
                                <span slot="title">{{item.name}}</span>

                            </template>
                            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex"> 
                                <el-menu-item :index="citem.path">
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                </template>
                <router-link to="/InfoShow">
                    <el-menu-item index="4">
                        <i class="iconfont icon-gerenxinxi2"></i>
                        <span slot="title">用户信息</span>
                    </el-menu-item>
                </router-link>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'left-menu',
    data(){
        return {
            items:[{
                icon: 'icon-youeryuanxinxi',
                name:"幼儿信息",
                path:'childs',
                children: [
                    {
                        path: 'childsList',
                        name: '基本信息'
                    }
                ]

            },{
                icon: 'icon-jiaoshixinxi',
                name:"教师信息",
                path:'teachers',
                children: [
                    {
                        path: 'teacherList',
                        name: '基本信息'
                    }
                ]

            }]
        }
    },
}
</script>
<style>
.left-menu .menu_page {
  position: fixed;
  left: 0;
  min-height: 100%;
  z-index: 99;
}
.left-menu .el-menu {
  border: none;
}
.left-menu .fa-margin {
  margin-right: 5px;
}
.left-menu .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 228px;
  min-height: 544px;
}
.left-menu .el-menu-vertical-demo {
  width: 35px;
}
.left-menu .el-submenu .el-menu-item {
  min-width: 180px;
}

.left-menu .hiddenDropdown,
.hiddenDropname {
  display: none;
}
.left-menu a {
  text-decoration: none;
}
.left-menu i.iconfont{
    display: inline-block;
    margin-right: 10px;
    margin-left: 4px;
}
</style>

