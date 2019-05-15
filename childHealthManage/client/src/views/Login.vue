<template>
    <div class="login">
        <div class="loginContainer">
            
            <div class="loginImg">
                <img src="../assets/background10.jpg" alt="">
            </div>
            <section class="form_container">
                <div class="manage_tip">
                    <span class="title">欢迎登录幼儿健康管理系统</span>
                </div>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input size="mini" v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input size="mini" type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <template>
                            <el-radio-group v-model="loginUser.identity">
                                <el-radio label="manager">管理员</el-radio>
                                <el-radio label="teacher">教师</el-radio>
                                <el-radio label="parents">家长</el-radio>
                            </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button  size="mini" type="primary" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号？现在 <router-link to="/register">注册</router-link></p>
                    </div>
                </el-form>
            </section>
            <div class="bottomBanner"></div>

        </div> 
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode';
export default {
    name:"login",
    components:{},
    data(){
        return {
            loginUser:{
                email:"",
                password:"",
                identity:""
            },
            rules:{
                email:[{
                    required:true,
                    message:"邮箱格式不正确",
                    trigger:"blur"
                }],
                password:[{
                    required:true,
                    message:"密码不能为空",
                    trigger:"blur"
                },{
                    min:6,
                    max:30,
                    message:"长度在6到30个字符之间",
                    trigger:"blur"
                }]
            }
        }
    },
    methods:{
        submitForm(formName){
                this.$refs[formName].validate((valid) => {
            if (valid) {
                //alert('submit!');
                this.$axios.post("/api/users/login",this.loginUser)
                .then(res => {
                    //拿到token
                    //console.log(res);
                    const { token } = res.data;
                    //存储到localStorage
                    localStorage.setItem("eleToken",token);
                    //解析token
                    const decoded = jwt_decode(token);
                   // console.log(decoded);
                   //token存储到vuex中
                   this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded));
                   this.$store.dispatch("setUser",decoded);
                   if(this.loginUser.identity == "manager"){
                        this.$router.push('/index');
                   }else if(this.loginUser.identity == "teacher"){
                       this.$router.push('/teacherindex');
                   }else if(this.loginUser.identity == "parents"){
                       this.$router.push('/parentindex');
                   }    
                });    
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        isEmpty(value){
            return (
                value === undefined ||
                value === null ||
                (typeof value === "Object" && Object.keys.length === 0) ||
                (typeof value === "String" && value.trim().length === 0)
            );
        }
    }
}
</script>
<style>
.login,.loginContainer{
    width: 100%;
    height: 100%;
}
.login .loginImg>img{
    width: 100%;
    height:445px;
}
.login .form_container{
    position: absolute;
    top: 130px;
    left: 480px;
    width: 420px;
    height: 320px;
    background: #333;
    border-radius: 5px;
    box-shadow: 0 0 8px #666;
    z-index: 100;
}
.login .form_container>.manage_tip{
    text-align: center;
    margin-top: 20px;
}
.login .form_container>.manage_tip>span{
    color: #fff;
    font-weight: bold;
    font-size: 22px;
}
.form_container .tiparea{
    font-size: 12px;
    color: #fff;
    margin-bottom: 20px;
    margin-left: 238px;
}  
.form_container .tiparea a{
    color: rgb(64, 179, 64);
}
.bottomBanner{
    width: 100%;
    height: 240px;
    background-color: rgb(236, 225, 225);
    z-index: 1;
    position: absolute;
    bottom: 0;
    left:0;
}
.loginForm{
    margin-top: 0px;
    padding: 0px 5px 0px 5px;
    border-radius: 5px;
    box-shadow: 0 5px 10px #ccc;
}
.form_container .el-form{
    margin-top: 25px;
    padding-bottom: 10px;
}
.form_container .el-form-item{
    margin-bottom: 12px;
    margin-right: 48px;
}
.login .form_container .el-form-item__label{
    color: #fff;
}
.login .form_container .el-form-item__error{
    padding-top: 1px;
}
.login .el-radio .el-radio__label{
    color: #eee;
}
</style>

