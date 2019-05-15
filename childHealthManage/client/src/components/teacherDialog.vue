<template>
    <div class="teacherdialog">
        <el-dialog :title="teacherdialog.title" :visible.sync="teacherdialog.show" :close-on-click-modal="true"
        :close-on-press-escape="true" :modal-append-to-body="true"> 
        <div class="form_container">
            <el-form ref="form" :model="teacherDialogData" :rules="form_rules" label-width="120px"
            style="width: auto;" size="mini" :inline="true">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名：" prop="name">
                        <el-input type="name" v-model="teacherDialogData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" prop="sex">
                        <el-radio v-model="teacherDialogData.sex" value="man" label="男">男</el-radio>
                        <el-radio v-model="teacherDialogData.sex" value="woman" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="出生年月：" prop="birthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="teacherDialogData.birthday">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="籍贯：" prop="birthplace">
                        <el-input type="birthplace" v-model="teacherDialogData.birthplace"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：" prop="id_number">
                        <el-input type="id_number" v-model="teacherDialogData.id_number"></el-input>
                    </el-form-item>
                    <el-form-item label="民族：" prop="nation">
                        <el-input type="nation" v-model="teacherDialogData.nation"></el-input>                    
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="学历：">
                        <el-select v-model="teacherDialogData.education" placeholder="请选择">
                            <el-option v-for="(eduName,index) in eduList" :key="index" :label="eduName"
                            :value="eduName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="婚姻状况：">
                    <el-select v-model="teacherDialogData.marital_status" placeholder="请选择">
                            <el-option v-for="(mariName,index) in mariList" :key="index" :label="mariName"
                            :value="mariName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="政治面貌：">
                        <el-select v-model="teacherDialogData.politics_status" placeholder="请选择">
                            <el-option v-for="(politicsName,index) in politicsList" :key="index" :label="politicsName"
                            :value="politicsName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="户口地址：" prop="registered_address">
                        <el-input type="father_phone" v-model="teacherDialogData.registered_address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系地址：" prop="contact_address">
                        <el-input type="mother_name" v-model="teacherDialogData.contact_address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="contact_phone">
                        <el-input type="mother_workplace" v-model="teacherDialogData.contact_phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
             <div class="subBtn">
                    <el-button @click="teacherdialog.show=false" type="primary" size="mini">取消</el-button>
                    <el-button @click="onSubmit('form')" type="primary" size="mini">提交</el-button>   
             </div>             
            </el-form>
        </div>  
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"teacherdialog",
    data(){
        return {
            mariList:[
                "已婚",
                "未婚",
            ],
            eduList:[
                "专科",
                "本科",
                "硕士",
                "博士"
            ],
            politicsList:[
                "中共党员","中共预备党员","共青团员",
                " 民革党员","民盟盟员","民建会员",
                "民进会员","农工党党员","致公党党员",
                "九三学社社员","台盟盟员","无党派人士" ,
                "群众"
            ],
            form_rules:{
                name:[
                    { required: true, message: "姓名不能为空！", trigger: "blur" }
                ],
                sex: [
                    { required: true, message: '请选择性别！', trigger: 'change' }
                ],
                birthday:[
                    { required: true, message: "出生日期不能为空！", trigger: "blur" }
                ],
                id_number:[
                    { required: true, message: "身份证号不能为空！", trigger: "blur" }
                ],
                nation:[
                    { required: true, message: "民族不能为空！", trigger: "blur" }
                ],
                education:[
                    { required: true, message: "学历不能为空！", trigger: "blur" }
                ],
                marital_status:[
                    { required: true, message: "婚姻状况不能为空！", trigger: "blur" }
                ],
                politics_status:[
                    { required: true, message: "政治面貌不能为空！", trigger: "blur" }
                ],
                registered_address:[
                    { required: true, message: "户口地址不能为空！", trigger: "blur" }
                ],
                contact_address:[
                    { required: true, message: "联系地址不能为空！", trigger: "blur" }
                ],
                contact_phone:[
                    { required: true, message: "联系方式不能为空！", trigger: "blur" }
                ]
            }
        }
    },
    props:{
        teacherdialog: Object,
        teacherDialogData:Object
    },
    methods:{
        onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            //alert(this.childDialogData);
            //判断是添加还是编辑
            const url = this.teacherdialog.option == 'add' ? 'add' : `/edit/${this.teacherDialogData.id}`; 
            this.$axios.post(`/api/teachers/${url}`,this.teacherDialogData)
            .then(res => {
                //添加成功
                this.$message({
                    message:"数据添加成功",
                    type:"success"
                });
                //隐藏模态框
                this.teacherdialog.show = false;
                //刷新数据
                this.$emit("update");
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>
<style>
.teacherdialog .el-dialog{
    width: 760px;
    overflow: hidden;
}
.teacherdialog .el-dialog .el-dialog__header{
    background-color: #333;
    padding: 20px;
}
.teacherdialog .el-dialog .el-dialog__title{
    color: #fff;
}
.teacherdialog .el-dialog .el-dialog__body{
    padding: 0;
    padding-bottom: 10px;
}
.form_container .subBtn{
    position: relative;
    left: 566px;
}
</style>
