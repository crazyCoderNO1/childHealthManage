<template>
    <div class="dietrecords">
        <div class="dietrecordsHNav">
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">
                    <router-link to="./firstClassDietrecords">
                    幼儿一班
                    </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="./secondClassDietrecords">
                    幼儿二班
                    </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="./thirdClassDietrecords">
                    幼儿三班
                    </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link to="./fourthClassDietrecords">
                    幼儿四班
                    </router-link>
                </el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>
        
    </div>
</template>
<script>
export default{
    name:"dietrecords",
    data(){
        return {

        }
    },
    created(){
        this.getPages();
    },
    methods:{
        getPages(){
            this.$router.push('/firstclassdietrecords');
        }
    }
}
</script>
<style>
.dietrecords{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
}
.dietrecords .dietrecordsHNav{
    width: 1100px;
    margin-bottom: 10px;
}
.dietrecordsHNav .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #ffd04b;
    color: #303133;
}
.dietrecords .el-menu--horizontal>.el-menu-item a{
    text-decoration: none;
}
</style>


