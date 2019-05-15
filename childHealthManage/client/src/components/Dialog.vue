<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal="true"
        :close-on-press-escape="true" :modal-append-to-body="true" :inline="true"> 
        <div class="form_container">
            <el-form ref="form" :model="childDialogData" :rules="form_rules" label-width="120px"
            style="width: auto;" size="mini">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="学号：" prop="child_num">
                        <el-input type="child_num" v-model="childDialogData.child_num"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input type="name" v-model="childDialogData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" prop="sex">
                        <el-radio v-model="childDialogData.sex" value="man" label="男">男</el-radio>
                        <el-radio v-model="childDialogData.sex" value="woman" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="出生年月：" prop="birthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="childDialogData.birthday">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="籍贯：" prop="birthplace">
                        <el-input type="birthplace" v-model="childDialogData.birthplace"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：" prop="id_number">
                        <el-input type="id_number" v-model="childDialogData.id_number"></el-input>
                    </el-form-item>
                    <el-form-item label="入园时间：" prop="admission_time">
                        <el-date-picker type="date" placeholder="选择日期" v-model="childDialogData.admission_time">
                        </el-date-picker>
                    </el-form-item>
                     <el-form-item label="所在班级：">
                        <el-select v-model="childDialogData.class" placeholder="请选择">
                            <el-option v-for="(className,index) in classList" :key="index" :label="className"
                            :value="className"></el-option>
                        </el-select>
                    </el-form-item>  
                </el-col>
                <el-col :span="12">
                    <el-form-item label="父亲：" prop="father_name">
                        <el-input type="father_name" v-model="childDialogData.father_name"></el-input>
                    </el-form-item>
                    <el-form-item label="工作单位：" prop="father_workplace">
                        <el-input type="father_workplace" v-model="childDialogData.father_workplace"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="father_phone">
                        <el-input type="father_phone" v-model="childDialogData.father_phone"></el-input>
                    </el-form-item>
                    <el-form-item label="母亲：" prop="mother_name">
                        <el-input type="mother_name" v-model="childDialogData.mother_name"></el-input>
                    </el-form-item>
                    <el-form-item label="工作单位：" prop="mother_workplace">
                        <el-input type="mother_workplace" v-model="childDialogData.mother_workplace"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="mother_phone">
                        <el-input type="mother_phone" v-model="childDialogData.mother_phone"></el-input>
                    </el-form-item>
                    <el-form-item label="现住址：" prop="address">
                        <el-input type="address" v-model="childDialogData.address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialog.show=false" type="primary" size="mini">取消</el-button>
                        <el-button @click="onSubmit('form')" type="primary" size="mini">提交</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form>
        </div>  
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"dialog",
    data(){
        return {
            classList:[
                "幼儿一班",
                "幼儿二班",
                "幼儿三班",
                "幼儿四班"
            ],
            form_rules:{
                child_num:[
                    { required: true, message: "学号不能为空！", trigger: "blur" }
                ],
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
                admission_time:[
                    { required: true, message: "入园时间不能为空！", trigger: "blur" }
                ],
                father_name:[
                    { required: true, message: "父亲姓名不能为空！", trigger: "blur" }
                ],
                father_workplace:[
                    { required: true, message: "父亲工作单位不能为空！", trigger: "blur" }
                ],
                father_phone:[
                    { required: true, message: "父亲联系方式不能为空！", trigger: "blur" }
                ],
                mother_name:[
                    { required: true, message: "母亲姓名不能为空！", trigger: "blur" }
                ],
                mother_workplace:[
                    { required: true, message: "母亲工作单位不能为空！", trigger: "blur" }
                ],
                mother_phone:[
                    { required: true, message: "母亲联系方式不能为空！", trigger: "blur" }
                ],
                address:[
                    { required: true, message: "现住址不能为空！", trigger: "blur" }
                ],
            }
        }
    },
    props:{
        dialog: Object,
        childDialogData:Object
    },
    methods:{
        onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            //alert(this.childDialogData);
            //判断是添加还是编辑
            const url = this.dialog.option == 'add' ? 'add' : `/edit/${this.childDialogData.id}`; 
            this.$axios.post(`/api/children/${url}`,this.childDialogData)
            .then(res => {
                //添加成功
                this.$message({
                    message:"数据添加成功",
                    type:"success"
                });
                //隐藏模态框
                this.dialog.show = false;
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
.dialog .el-dialog{
    width: 800px;
    overflow: hidden;
}
.dialog .el-dialog .el-dialog__header{
    background-color: #333;
    padding: 20px;
    border: 1px solid #eee;
}
.dialog .el-dialog .el-dialog__title{
    color: #fff;
}
.dialog .el-dialog .el-dialog__body{
    padding: 0;
    padding-bottom: 10px;
}
</style>
