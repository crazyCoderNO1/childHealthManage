<template>
    <div class="thursdaydietrecords">
        <div class="dietrecordsAddCon">
            <el-form :inline="true" ref="add_data">
                <!--筛选-->

                <!--添加-->
                <el-form-item class="rightBtn">
                    <el-button type="primary" size="mini" @click="addDietrecords()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="dietrecordsTableCon">
            <!--表格开始-->
             <el-table :data="dietrecordsTableData" style="width: 100%" max-height="420" size="mini" border>
                <el-table-column fixed type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="childNum" label="学号" width="120">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="80">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="60">
                </el-table-column>
                <el-table-column prop="class" label="班级" width="100">
                </el-table-column>
                <el-table-column prop="recordsTime" label="记录时间" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.recordsTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="recordsWeek" label="周期" width="100">
                </el-table-column>
                <el-table-column prop="recordsDay" label="星期" width="100">
                </el-table-column>
                <el-table-column prop="breakfast" label="早餐" width="150">
                </el-table-column>
                <el-table-column prop="lunch" label="午餐" width="150">
                </el-table-column>
                <el-table-column prop="dinner" label="晚餐" width="150">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <i class="iconfont icon-bianji1" title="编辑" @click="editDietrecords(scope.$index, scope.row)"></i>
                        <i class="iconfont icon-shanchu" title="删除" @click="deleteDietrecords(scope.$index, scope.row)"></i>
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
        <dietRecordsDialog :dietrecordsdialog="dietrecordsdialog"
         :dietRecordsDialogData="dietRecordsDialogData" @update="getDietRecords">
        </dietRecordsDialog>
    </div>
</template>
<script>
import dietRecordsDialog from "../components/dietRecordsDialog";
export default {
    name:'thursdaydietrecords',
    components:{
       dietRecordsDialog 
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
            dietrecordsTableData:[],
            dietRecordsDialogData: {
                id:"",
                childNum:"",
                name:"",
                sex:"男",
                recordsTime:"",
                recordsWeek:"",
                recordsDay:"",
                class:"",
                breakfast:"",
                lunch:"",
                dinner:"",
            },
            dietrecordsdialog:{
                show: false,
                title: "",
                option: "edit"
            }
        }
    },
    created(){
        this.getDietRecords();
    },
    methods:{
        getDietRecords(){
            this.$axios.get('api/dietrecords')
            .then(res => {
                //this.dietrecordsTableData = res.data;
                //this.filterTableData = res.data;
                this.allTableData = res.data;
                let recordsTables = [];
                // console.log(this.allTableData[0].class);
                for(let i=0;i<=this.allTableData.length;i++){
                    //console.log(this.allTableData[i].class);
                    if(this.allTableData[i].class == "幼儿一班"){
                        if(this.allTableData[i].recordsDay == '星期四'){
                            recordsTables.push(this.allTableData[i]);
                        }     
                    }
                    this.dietrecordsTableData = recordsTables;
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
            this.dietrecordsTableData = this.allTableData.filter((item,index) => {
                return index < this.paginations.page_size;
            });
        },
         handleSizeChange(page_size){
            //切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.dietrecordsTableData = this.allTableData.filter((item,index) => {
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
                this.dietrecordsTableData = tables;
            }
        },
        addDietrecords(){
            this.dietrecordsdialog = {
               show: true,
               title: "添加饮食记录信息",
               option: 'add'
            };
            this.dietrecordsTableData = {
                id:"",
                childNum:"",
                name:"",
                sex:"男",
                recordsTime:"",
                recordsWeek:"",
                recordsDay:"",
                class:"",
                breakfast:"",
                lunch:"",
                dinner:"",
           }
        },
        editDietrecords(index,row){
            this.dietrecordsdialog = {
               show: true,
               title: "修改饮食记录信息",
               option: 'edit'
            };
            this.dietRecordsDialogData = {
                id:row._id,
                childNum:row.childNum,
                name:row.name,
                sex:row.sex,
                recordsTime:row.recordsTime,
                recordsWeek:row.recordsWeek,
                recordsDay:row.recordsDay,
                class:row.class,
                breakfast:row.breakfast,
                lunch:row.lunch,
                dinner:row.dinner,
           }

        },
        deleteDietrecords(index,row){
            this.$axios.delete(`/api/dietrecords/delete/${row._id}`)
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
                    this.getDietRecords();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            });

        }

    }
}
</script>
<style>
.thursdaydietrecords{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 10px;
    overflow: hidden;
}
.thursdaydietrecords .dietrecordsAddCon{
    width: 100%;
    height: 48px;
}
.thursdaydietrecords .dietrecordsAddCon .rightBtn{
    position: relative;
    left: 0px;
}
.thursdaydietrecords .dietrecordsTableCon{
    width: 1100px;
    height: 100%;
}
.dietrecordsTableCon i.iconfont.icon-bianji1{
    color: rgb(23, 6, 124);
    cursor: pointer;
}
.dietrecordsTableCon i.iconfont.icon-shanchu{
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





