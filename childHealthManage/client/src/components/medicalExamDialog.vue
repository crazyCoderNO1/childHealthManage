<template>
    <div class="medicalexamdialog">
        <el-dialog :title="medicalexamdialog.title" :visible.sync="medicalexamdialog.show" :close-on-click-modal="true"
        :close-on-press-escape="true" :modal-append-to-body="true"> 
        <div class="form_container">
            <el-form ref="form" :model="medicalExamDialogData" :rules="form_rules" label-width="120px"
            style="width: auto;" size="mini" :inline="true">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="学号：" prop="child_num">
                        <el-input type="child_num" v-model="medicalExamDialogData.child_num"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input type="name" v-model="medicalExamDialogData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" prop="sex">
                        <el-radio v-model="medicalExamDialogData.sex" value="man" label="男">男</el-radio>
                        <el-radio v-model="medicalExamDialogData.sex" value="woman" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="班级：">
                        <el-select v-model="medicalExamDialogData.class" placeholder="请选择">
                            <el-option v-for="(className,index) in classList" :key="index" :label="className"
                            :value="className"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="体检日期：" prop="medicalExamTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="medicalExamDialogData.medicalExamTime">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="身高：" prop="height">
                        <el-input type="height" v-model="medicalExamDialogData.height"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="左眼视力：" prop="leftVision">
                        <el-input type="leftVision" v-model="medicalExamDialogData.leftVision"></el-input>                    
                    </el-form-item>
                    <el-form-item label="右眼视力：" prop="rightVision">
                        <el-input type="rightVision" v-model="medicalExamDialogData.rightVision"></el-input>                    
                    </el-form-item>
                    <el-form-item label="色盲：">
                        <el-radio v-model="medicalExamDialogData.colorBlindness" value="true" label="是">是</el-radio>
                        <el-radio v-model="medicalExamDialogData.colorBlindness" value="false" label="否">否</el-radio>
                    </el-form-item>
                    <el-form-item label="左耳听力：" prop="leftHear">
                        <el-input type="leftHear" v-model="medicalExamDialogData.leftHear"></el-input>                    
                    </el-form-item>
                    <el-form-item label="右耳听力：" prop="rightHear">
                        <el-input type="rightHear" v-model="medicalExamDialogData.rightHear"></el-input>                    
                    </el-form-item>
                    <el-form-item label="龋齿：" prop="decayedTooth">
                        <el-input type="decayedTooth" v-model="medicalExamDialogData.decayedTooth"></el-input>
                    </el-form-item>
                    <el-form-item label="体重：" prop="weight">
                        <el-input type="weight" v-model="medicalExamDialogData.weight"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
             <div class="subBtn">
                    <el-button @click="medicalexamdialog.show=false" type="primary" size="mini">取消</el-button>
                    <el-button @click="onSubmit('form')" type="primary" size="mini">提交</el-button>   
             </div>             
            </el-form>
        </div>  
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"medicalexamdialog",
    data(){
        return {
            childrenData:[],
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
                medicalExamTime:[
                    { required: true, message: "体检日期不能为空！", trigger: "blur" }
                ],
                class:[
                    { required: true, message: "班级不能为空！", trigger: "change" }
                ],
                height:[
                    { required: true, message: "身高不能为空！", trigger: "blur" }
                ],
                weight:[
                    { required: true, message: "体重不能为空！", trigger: "blur" }
                ],
                leftVision:[
                    { required: true, message: "左眼视力不能为空！", trigger: "blur" }
                ],
                rightVision:[
                    { required: true, message: "右眼视力不能为空！", trigger: "blur" }
                ],
                colorBlindness:[
                    { required: true, message: "请确认是否为色盲！", trigger: "change" }
                ],
                leftHear:[
                    { required: true, message: "左耳听力不能为空！", trigger: "blur" }
                ],
                rightHear:[
                    { required: true, message: "右耳听力不能为空！", trigger: "blur" }
                ],
                decayedTooth:[
                    { required: true, message: "请确认是否有龋齿！", trigger: "blur" }
                ]
            }
        }
    },
    props:{
        medicalexamdialog: Object,
        medicalExamDialogData:Object
    },
    methods:{
        //获取儿童信息
        getChild(){
            //获取数据
            this.$axios.get('/api/children')
            .then(res => {
               // console.log(res);
               this.childrenData = res.data;
            }).catch(err => {
                console.log(err);
            });
        },
        onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            //alert(this.childDialogData);
            //判断是添加还是编辑
            const url = this.medicalexamdialog.option == 'add' ? 'add' : `/edit/${this.medicalExamDialogData.id}`; 
            this.$axios.post(`/api/medicalexam/${url}`,this.medicalExamDialogData)
            .then(res => {
                //添加成功
                this.$message({
                    message:"数据添加成功",
                    type:"success"
                });
                //隐藏模态框
                this.medicalexamdialog.show = false;
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
.medicalexamdialog .el-dialog{
    width: 760px;
    overflow: hidden;
}
.medicalexamdialog .el-dialog .el-dialog__header{
    background-color: #333;
    padding: 20px;
}
.medicalexamdialog .el-dialog .el-dialog__title{
    color: #fff;
}
.medicalexamdialog .el-dialog .el-dialog__body{
    padding: 0;
    padding-bottom: 10px;
}
.medicalexamdialog .form_container .subBtn{
    position: relative;
    left: 566px;
}
</style>
