<template>
    <div class="dietrecordsdialog">
        <el-dialog :title="dietrecordsdialog.title" :visible.sync="dietrecordsdialog.show" :close-on-click-modal="true"
        :close-on-press-escape="true" :modal-append-to-body="true"> 
        <div class="form_container">
            <el-form ref="form" :model="dietRecordsDialogData" :rules="form_rules" label-width="120px"
            style="width: auto;" size="mini" :inline="true">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="学号：" prop="childNum">
                        <el-input type="childNum" v-model="dietRecordsDialogData.childNum"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input type="name" v-model="dietRecordsDialogData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" prop="sex">
                        <el-radio v-model="dietRecordsDialogData.sex" value="man" label="男">男</el-radio>
                        <el-radio v-model="dietRecordsDialogData.sex" value="woman" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="班级：">
                        <el-select v-model="dietRecordsDialogData.class" placeholder="请选择">
                            <el-option v-for="(className,index) in classList" :key="index" :label="className"
                            :value="className"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="记录时间：" prop="recordsTime">
                        <el-date-picker type="date" placeholder="选择时间" v-model="dietRecordsDialogData.recordsTime">
                        </el-date-picker>
                    </el-form-item> 
                </el-col>
                <el-col :span="12">
                    <el-form-item label="周期：" prop="recordsWeek">
                        <el-input type="recordsWeek" v-model="dietRecordsDialogData.recordsWeek"></el-input>
                    </el-form-item>
                    <el-form-item label="星期：">
                        <el-select v-model="dietRecordsDialogData.recordsDay" placeholder="请选择">
                            <el-option v-for="(dayName,index) in dayList" :key="index" :label="dayName"
                            :value="dayName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="早餐：" prop="breakfast">
                        <el-input type="breakfast" v-model="dietRecordsDialogData.breakfast"></el-input>
                    </el-form-item>
                    <el-form-item label="午餐：" prop="lunch">
                        <el-input type="lunch" v-model="dietRecordsDialogData.lunch"></el-input>                    
                    </el-form-item>
                    <el-form-item label="晚餐：" prop="dinner">
                        <el-input type="dinner" v-model="dietRecordsDialogData.dinner"></el-input>                    
                    </el-form-item>
                </el-col>
            </el-row>
             <div class="subBtn">
                    <el-button @click="dietrecordsdialog.show=false" type="primary" size="mini">取消</el-button>
                    <el-button @click="onSubmit('form')" type="primary" size="mini">提交</el-button>   
             </div>             
            </el-form>
        </div>  
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"dietrecordsdialog",
    data(){
        return {
            classList:[
                "幼儿一班",
                "幼儿二班",
                "幼儿三班",
                "幼儿四班"
            ],
            dayList:[
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五"
            ],
            form_rules:{
                childNum:[
                    { required: true, message: "学号不能为空！", trigger: "blur" }
                ],
                name:[
                    { required: true, message: "姓名不能为空！", trigger: "blur" }
                ],
                sex: [
                    { required: true, message: '请选择性别！', trigger: 'change' }
                ],
                recordsTime:[
                    { required: true, message: "记录时间不能为空！", trigger: "blur" }
                ],
                class:[
                    { required: true, message: "班级不能为空！", trigger: "change" }
                ],
                breakfast:[
                    { required: true, message: "早餐不能为空！", trigger: "blur" }
                ],
                lunch:[
                    { required: true, message: "午餐不能为空！", trigger: "blur" }
                ],
                dinner:[
                    { required: true, message: "晚餐不能为空！", trigger: "blur" }
                ],
                
            }
        }
    },
    props:{
        dietrecordsdialog: Object,
        dietRecordsDialogData:Object
    },
    methods:{
        
        onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            //判断是添加还是编辑
            const url = this.dietrecordsdialog.option == 'add' ? 'add' : `/edit/${this.dietRecordsDialogData.id}`; 
            this.$axios.post(`/api/dietrecords/${url}`,this.dietRecordsDialogData)
            .then(res => {
                //添加成功
                this.$message({
                    message:"数据添加成功",
                    type:"success"
                });
                //隐藏模态框
                this.dietrecordsdialog.show = false;
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
.dietrecordsdialog .el-dialog{
    width: 760px;
    overflow: hidden;
}
.dietrecordsdialog .el-dialog .el-dialog__header{
    background-color: #333;
    padding: 20px;
}
.dietrecordsdialog .el-dialog .el-dialog__title{
    color: #fff;
}
.dietrecordsdialog .el-dialog .el-dialog__body{
    padding: 0;
    padding-bottom: 10px;
}
.dietrecordsdialog .form_container .subBtn{
    position: relative;
    left: 566px;
}
</style>
