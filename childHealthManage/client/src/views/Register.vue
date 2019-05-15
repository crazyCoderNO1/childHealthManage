<template>
    <div class="register">
        <div class="registerContainer">
            <div class="registerImg">
                <img src="../assets/background10.jpg" alt="">
            </div>
            <section class="form_container">
                <div class="manage_tip">
                    <span class="title">幼儿健康管理系统</span>
                </div>
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input size="mini" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input size="mini" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input size="mini" type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input size="mini" type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="身份选择" prop="identity">
                        <el-select size="mini" v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="教师" value="teacher"></el-option>
                            <el-option label="家长" value="parent"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button  size="mini" type="primary" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <div class="bottomBanner"></div>

        </div> 
    </div>
</template>
<script>
export default {
    name:"register",
    components:{},
    data(){
        var validatePass2 = (rule, value, callback) => {
        if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            registerUser:{
                name:"",
                email:"",
                password:"",
                password2:"",
                identity:""
            },
            rules:{
                name:[{
                    required:true,
                    message:"用户名不能为空",
                    trigger:"blur"
                },{
                    min:2,
                    max:30,
                    message:"长度在2到30个字符之间",
                    trigger:"blur"
                }],
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
                }],
                password2:[{
                    required:true,
                    message:"确认密码不能为空",
                    trigger:"blur"
                },{
                    min:6,
                    max:30,
                    message:"长度在6到30个字符之间",
                    trigger:"blur"
                },{
                    validator: validatePass2,
                    trigger: "blur"
                }]
            }
        }
    },
    methods:{
        submitForm(formName){
                this.$refs[formName].validate((valid) => {
            if (valid) {
                //alert('submit!');
                this.$axios.post("/api/users/register",this.registerUser)
                .then(res => {
                    //注册成功
                    this.$message({
                        message:"账号注册成功",
                        type:"success"
                    });
                });
               this.$router.push('/login');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    }
}
</script>
<style>
.register,.registerContainer{
    width: 100%;
    height: 100%;
}
.register .registerImg>img{
    width: 100%;
    height: 445px;
}
.register .form_container{
    position: absolute;
    top: 120px;
    left: 480px;
    width: 420px;
    height: 384px;
    background: #333;
    border-radius: 5px;
    box-shadow: 0 0 8px #666;
    z-index: 100;
}
.register .form_container>.manage_tip{
    text-align: center;
    margin-top: 20px;
}
.register .form_container>.manage_tip>span{
    color: #fff;
    font-weight: bold;
    font-size: 22px;
}
.bottomBanner{
    width: 100%;
    height: 240px;
    background-color: rgb(236, 225, 225);
    position: absolute;
    bottom: 0;
    left:0;
    z-index: 1;
}
.registerForm{
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
.register,.registerContainer .el-form-item__label{
    color: #fff;
}
.register,.registerContainer .el-form-item__error{
    padding-top: 0px;
}
</style>

