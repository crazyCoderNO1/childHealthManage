<template>
    <div class="medicalexam">
        <div class="medicalExamHNav">
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">
                    <router-link to="./firstClassMedicalExam">
                    幼儿一班
                    </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="./secondClassMedicalExam">
                    幼儿二班
                    </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="./thirdClassMedicalExam">
                    幼儿三班
                    </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link to="./fourthClassMedicalExam">
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
    name:"medicalexam",
    data(){
        return {

        }
    },
    created(){
        this.getPages();
    },
    methods:{
        getPages(){
            this.$router.push('/firstclassmedicalexam');
        }
    }
}
</script>
<style>
.medicalexam{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
}
.medicalexam .medicalExamHNav{
    width: 1100px;
    margin-bottom: 10px;
}
.medicalExamHNav .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #ffd04b;
    color: #303133;
}
.medicalexam .el-menu--horizontal>.el-menu-item a{
    text-decoration: none;
}
</style>