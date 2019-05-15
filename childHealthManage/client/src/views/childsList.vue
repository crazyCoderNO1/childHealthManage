<template>
    <div class="childslist">
        <div class="addContainer">
            <el-form :inline="true" ref="add_data" :model="searchData">
                <!--筛选-->
                <el-form-item label="按照入园时间筛选：">
                    <el-date-picker size="mini" v-model="searchData.startTime" type="datetime" placeholder="选择开始日期时间">
                    </el-date-picker>
                    --
                    <el-date-picker size="mini" v-model="searchData.endTime" type="datetime" placeholder="选择结束日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="searchChild()">筛选</el-button>
                </el-form-item>
                <el-form-item class="rightBtn">
                    <el-button type="primary" size="mini" @click="addChild()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableContainer">
            <el-table v-if="tableData.length > 0" :data="tableData" style="width: 100%" max-height="450" size="mini"
                border>
                <el-table-column fixed type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="child_num" label="学号" width="120">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="80">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="60">
                </el-table-column>
                <el-table-column prop="birthday" label="出生年月" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="birthplace" label="籍贯" width="100">
                </el-table-column>
                <el-table-column prop="id_number" label="身份证号" width="180">
                </el-table-column>
                <el-table-column prop="admission_time" label="入园时间" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.admission_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="class" label="所在班级" width="120">
                </el-table-column>
                <el-table-column prop="father_name" label="父亲" width="100">
                </el-table-column>
                <el-table-column prop="father_workplace" label="工作单位" width="120">
                </el-table-column>
                <el-table-column prop="father_phone" label="联系电话" width="120">
                </el-table-column>
                <el-table-column prop="mother_name" label="母亲" width="100">
                </el-table-column>
                <el-table-column prop="mother_workplace" label="工作单位" width="120">
                </el-table-column>
                <el-table-column prop="mother_phone" label="联系电话" width="120">
                </el-table-column>
                <el-table-column prop="address" label="现住址" width="240">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <i class="iconfont icon-bianji1" title="编辑" @click="editChild(scope.$index, scope.row)"></i>
                        <i class="iconfont icon-shanchu" title="删除" @click="deleteChild(scope.$index, scope.row)"></i>
                    </template>   
                </el-table-column>
            </el-table>
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
        <Dialog :dialog="dialog" :childDialogData="childDialogData" @update="getChild"></Dialog> 
        
    </div>
</template>
<script>
import Dialog from "../components/Dialog";
export default {
    name:'childslist',
    components:{
        Dialog
    },
    data(){
        return {
            searchData:{
                startTime:"",
                endTime:""
            },
            filterTableData: [],
            paginations:{
                page_index: 1, //当前位于哪一页
                total: 0,   //总页数
                page_size: 5,    //1页显示多少条
                page_sizes: [5,10,15],   //每页显示多少条
                layout:"total,sizes,prev,pager,next,jumper"   //翻页属性
            },
            tableData:[],
            allTableData:[],
            childDialogData: {
                id:"",
                child_num:"",
                name:"",
                sex:"男",
                birthday:"",
                birthplace:"",
                id_number:"",
                admission_time:"",
                class:"",
                address:"",
                father_name:"",
                father_workplace:"",
                father_phone:"",
                mother_name:"",
                mother_workplace:"",
                mother_phone:""
            },
            dialog:{
                show: false,
                title: "",
                option: "edit"
            }
        }
    },
    created(){
        this.getChild();
    },
    methods:{
        getChild(){
            //获取数据
            this.$axios.get('/api/children')
            .then(res => {
               // console.log(res);
               this.allTableData = res.data;
               this.filterTableData = res.data;
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
            this.tableData = this.allTableData.filter((item,index) => {
                return index < this.paginations.page_size;
            });
        },
        //添加信息
        addChild(){
            this.dialog = {
               show: true,
               title: "添加幼儿信息",
               option: 'add'
           };
           this.childDialogData = {
                id:"",
                child_num:"",
                name:"",
                sex:"男",
                birthday:"",
                birthplace:"",
                id_number:"",
                admission_time:"",
                class:"",
                address:"",
                father_name:"",
                father_workplace:"",
                father_phone:"",
                mother_name:"",
                mother_workplace:"",
                mother_phone:""
           }
        },
        //编辑信息
        editChild(index,row){
           // console.log(this.dialog);
           this.dialog = {
               show: true,
               title: "修改幼儿信息",
               option: 'edit'
           };
           this.childDialogData = {
                id:row._id,
                child_num:row.child_num, 
                name:row.name,
                sex:row.sex,
                birthday:row.birthday,
                birthplace:row.birthplace,
                id_number:row.id_number,
                admission_time:row.admission_time,
                class:row.class,
                address:row.address,
                father_name:row.father_name,
                father_workplace:row.father_workplace,
                father_phone:row.father_phone,
                mother_name:row.mother_name,
                mother_workplace:row.mother_workplace,
                mother_phone:row.mother_phone
           }
        },

        //删除信息
        deleteChild(index,row){
            this.$axios.delete(`/api/children/delete/${row._id}`)
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
                    this.getChild();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            });
        },
        handleSizeChange(page_size){
            //切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.tableData = this.allTableData.filter((item,index) => {
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
                this.tableData = tables;
            }
        },
        //筛选
        searchChild(){
            if(!this.searchData.startTime || !this.searchData.endTime){
                this.$message({
                    type: "warning",
                    message: "请选择时间区间"
                });
                this.getChild();
                return ;
            }
            const sTime = this.searchData.startTime.getTime();
            const eTime = this.searchData.endTime.getTime();

            this.allTableData = this.filterTableData.filter(item => {
                //console.log(item);
                let date = new Date(item.admission_time);
                let time = date.getTime();
                return sTime <= time && eTime >= time;
            });
            //分页数据调用
            this.setPaginations();

        }
    }
}
</script>
<style>
.childslist{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}
.addContainer{
    width: 100%;
    height: 48px;
}
.addContainer .rightBtn{
    position: relative;
    left: 368px;
}
.tableContainer{
    width: 1100px;
}
.tableContainer i.iconfont.icon-bianji1{
    color: rgb(23, 6, 124);
    cursor: pointer;
}
.tableContainer i.iconfont.icon-shanchu{
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
