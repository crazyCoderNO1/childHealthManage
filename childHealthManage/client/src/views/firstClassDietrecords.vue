<template>
    <div class="firstclassdietrecords">
        <div class="dietrecordsHNav">
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">
                    <router-link to="./mondayDietrecords">
                    星期一
                    </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="./tuesdayDietrecords">
                    星期二
                    </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="./wednesdayDietrecords">
                    星期三
                    </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link to="./thursdayDietrecords">
                   星期四
                    </router-link>
                </el-menu-item>
                <el-menu-item index="5">
                    <router-link to="./fridayDietrecords">
                   星期五
                    </router-link>
                </el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:'firstclassdietrecords',
    data(){
        return {

        }
    },
    created(){
        this.getPages();
    },
    methods:{
        getPages(){
            this.$router.push('/mondaydietrecords');
        }
    }
    
}
</script>
<style>

</style>