<template>
    <div class="secondclassmedicalexam">
        <div class="medicalExamAddCon">
            <el-form :inline="true" ref="add_data">
                <!--筛选-->
                <el-form-item label="按照体检时间筛选：">
                    <el-date-picker size="mini" v-model="searchData.startTime" type="datetime" placeholder="选择开始日期时间">
                    </el-date-picker>
                    --
                    <el-date-picker size="mini" v-model="searchData.endTime" type="datetime" placeholder="选择结束日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="searchMedicalExam()">筛选</el-button>
                </el-form-item>
                <el-form-item class="rightBtn">
                    <el-button type="primary" size="mini" @click="addMedicalExam()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="medicalExamTableCon">
            <!--表格开始-->
             <el-table :data="medicalExamTableData" 
                 style="width: 100%" max-height="420" size="mini" border>
                <el-table-column fixed type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="child_num" label="学号" width="120">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="80">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="60">
                </el-table-column>
                <el-table-column prop="class" label="班级" width="100">
                </el-table-column>
                        <el-table-column prop="medicalExamTime" label="体检日期" width="200">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.medicalExamTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="height" label="身高" width="80">
                        </el-table-column>
                        <el-table-column prop="weight" label="体重" width="80">
                        </el-table-column>
                        <el-table-column prop="leftVision" label="左眼视力" width="80">
                        </el-table-column>
                        <el-table-column prop="rightVision" label="右眼视力" width="80">
                        </el-table-column>
                        <el-table-column prop="colorBlindness" label="色盲" width="60">
                        </el-table-column>
                        <el-table-column prop="leftHear" label="左耳听力" width="80">
                        </el-table-column>
                        <el-table-column prop="rightHear" label="右耳听力" width="80">
                        </el-table-column>
                        <el-table-column prop="decayedTooth" label="龋齿" width="60">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="80">
                            <template slot-scope="scope">
                                <i class="iconfont icon-bianji1" title="编辑" @click="editMedicalExam(scope.$index, scope.row)"></i>
                                <i class="iconfont icon-shanchu" title="删除" @click="deleteMedicalExam(scope.$index, scope.row)"></i>
                            </template>   
                        </el-table-column>  
            </el-table>
            <!--表格结束-->
             <!--分页-->
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="paginations.page_index"
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        :layout="paginations.layout"
                        :total="paginations.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <medicalExamDialog :medicalexamdialog="medicalexamdialog"
         :medicalExamDialogData="medicalExamDialogData" @update="getMedicalExam"></medicalExamDialog>
    </div>
</template>
<script>
import medicalExamDialog from "../components/medicalExamDialog";
export default {
    name:'secondClassMedicalExam',
    components:{
       medicalExamDialog 
    },
    data(){
        return {
            paginations:{
                page_index: 1, //当前位于哪一页
                total: 0,   //总页数
                page_size: 5,    //1页显示多少条
                page_sizes: [4,6,8],   //每页显示多少条
                layout:"total,sizes,prev,pager,next,jumper"   //翻页属性
            },
            searchData:{
                startTime:"",
                endTime:""
            },
            firstTableData:[],
            filterTableData: [],
            allTableData:[],
            medicalExamTableData:[],
            medicalExamDialogData: {
                id:"",
                child_num:"",
                name:"",
                sex:"男",
                medicalExamTime:"",
                class:"",
                height:"",
                weight:"",
                leftVision:"",
                rightVision:"",
                colorBlindness:"",
                leftHear:"",
                rightHear:"",
                decayedTooth:""  
            },
            medicalexamdialog:{
                show: false,
                title: "",
                option: "edit"
            }
        }
    },
    created(){
        this.getMedicalExam();
    },
    methods:{
        getMedicalExam(){
            //获取数据
             //获取数据
            this.$axios.get('/api/medicalexam')
            .then(res => {
               //console.log(res);
               //this.medicalExamTableData = res.data;
               this.filterTableData = res.data;
               this.allTableData = res.data;
               let firstTables = [];
               // console.log(this.allTableData[0].class);
                for(let i=0;i<=this.allTableData.length;i++){
                    //console.log(this.allTableData[i].class);
                    if(this.allTableData[i].class == "幼儿二班"){
                        firstTables.push(this.allTableData[i]);
                    }
                    this.medicalExamTableData = firstTables;
                }
               //设置分页
              this.setPaginations();
            }).catch(err => {
                console.log(err);
            });
        },
         setPaginations(){
            //分页属性设置
            this.paginations.total = this.allTableData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            //设置默认分页数据
            this.medicalExamTableData = this.allTableData.filter((item,index) => {
                return index < this.paginations.page_size;
            });
        },
         handleSizeChange(page_size){
            //切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.medicalExamTableData = this.allTableData.filter((item,index) => {
                return index < page_size;
            });
        },
        handleCurrentChange(page){
            //获取当前页
            let index = this.paginations.page_size * (page - 1);
            //数据总数
            let nums = this.paginations.page_size * page;
            //容器
            let tables = [];
            for(let i = index; i < nums; i++){
                if(this.allTableData[i]){
                    tables.push(this.allTableData[i]);
                }
                this.medicalExamTableData = tables;
            }
        },
        //筛选
        searchMedicalExam(){
            if(!this.searchData.startTime || !this.searchData.endTime){
                this.$message({
                    type: "warning",
                    message: "请选择时间区间"
                });
                this.getMedicalExam();
                return ;
            }
            const sTime = this.searchData.startTime.getTime();
            const eTime = this.searchData.endTime.getTime();

            this.allTableData = this.filterTableData.filter(item => {
                //console.log(item);
                let date = new Date(item.medicalExamTime);
                let time = date.getTime();
                return sTime <= time && eTime >= time;
            });
            //分页数据调用
            this.setPaginations();

        },
         //添加信息
        addMedicalExam(){
            this.medicalexamdialog = {
               show: true,
               title: "添加体检信息",
               option: 'add'
           };
           this.medicalExamDialogData = {
                id:"",
                child_num:"",
                name:"",
                sex:"男",
                medicalExamTime:"",
                class:"",
                height:"",
                weight:"",
                leftVision:"",
                rightVision:"",
                colorBlindness:"",
                leftHear:"",
                rightHear:"",
                decayedTooth:""
           }
        },
        //编辑信息
         editMedicalExam(index,row){
           // console.log(this.dialog);
           this.medicalexamdialog = {
               show: true,
               title: "修改体检信息",
               option: 'edit'
           };
           this.medicalExamDialogData = {
                id:row._id,
                child_num:row.child_num,
                name:row.name,
                sex:row.sex,
                medicalExamTime:row.medicalExamTime,
                class:row.class,
                height:row.height,
                weight:row.weight,
                leftVision:row.leftVision,
                rightVision:row.rightVision,
                colorBlindness:row.colorBlindness,
                leftHear:row.leftHear,
                rightHear:row.rightHear,
                decayedTooth:row.decayedTooth
           }
        },

        //删除信息
        deleteMedicalExam(index,row){
            this.$axios.delete(`/api/medicalexam/delete/${row._id}`)
            .then(res => {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getMedicalExam();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            });
        },
    }
    
}
</script>
<style>
.secondclassmedicalexam{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 10px;
    overflow: hidden;
}
.secondclassmedicalexam .medicalExamAddCon{
    width: 100%;
    height: 48px;
}
.secondclassmedicalexam .medicalExamAddCon .rightBtn{
    position: relative;
    left: 368px;
}
.secondclassmedicalexam .medicalExamTableCon{
    width: 1100px;
    height: 100%;
}
.medicalExamTableCon i.iconfont.icon-bianji1{
    color: rgb(23, 6, 124);
    cursor: pointer;
}
.medicalExamTableCon i.iconfont.icon-shanchu{
    color: rgb(238, 12, 12);
    display: inline-block;
    margin-left: 12px;
    cursor: pointer;
}
.pagination{
    text-align: right;
    margin-top: 10px;
}
</style>





