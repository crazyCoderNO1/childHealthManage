<template>
    <div class="teacherlist">
        <div class="teacherAddCon">
            <el-form :inline="true" ref="add_data">
                <el-form-item class="rightBtn">
                    <el-button type="primary" size="mini" @click="addTeacher()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="teacherTableCon">
             <el-table v-if="teacherTableData.length > 0" :data="teacherTableData" style="width: 100%" max-height="450" size="mini"
                border>
                <el-table-column fixed type="index" label="序号" width="50">
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
                <el-table-column prop="nation" label="民族" width="60">
                </el-table-column>
                <el-table-column prop="marital_status" label="婚姻状况" width="80">
                </el-table-column>
                <el-table-column prop="politics_status" label="政治面貌" width="80">
                </el-table-column>
                <el-table-column prop="education" label="学历" width="80">
                </el-table-column>
                <el-table-column prop="registered_address" label="户口地址" width="240">
                </el-table-column>
                <el-table-column prop="contact_address" label="联系地址" width="240">
                </el-table-column>
                <el-table-column prop="contact_phone" label="联系电话" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <i class="iconfont icon-bianji1" title="编辑" @click="editTeacher(scope.$index, scope.row)"></i>
                        <i class="iconfont icon-shanchu" title="删除" @click="deleteTeacher(scope.$index, scope.row)"></i>
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
        <teacherDialog :teacherdialog="teacherdialog" :teacherDialogData="teacherDialogData" @update="getTeacher"></teacherDialog>
    </div>
</template>
<script>
import teacherDialog from "../components/teacherDialog";
export default {
    name:'teacherlist',
    components:{
        teacherDialog
    },
    data(){
        return {
            paginations:{
                page_index: 1, //当前位于哪一页
                total: 0,   //总页数
                page_size: 5,    //1页显示多少条
                page_sizes: [5,10,15],   //每页显示多少条
                layout:"total,sizes,prev,pager,next,jumper"   //翻页属性
            },
            allTableData:[],
            teacherTableData:[],
            teacherDialogData: {
                id:"",
                name:"",
                sex:"男",
                birthday:"",
                birthplace:"",
                id_number:"",
                nation:"",
                marital_status:"",
                education:"",
                politics_status:"",
                registered_address:"",
                contact_address:"",
                contact_phone:""
            },
            teacherdialog:{
                show: false,
                title: "",
                option: "edit"
            }
        }
    },
    created(){
        this.getTeacher();
    },
    methods: {
        getTeacher(){
            //获取数据
            this.$axios.get('/api/teachers')
            .then(res => {
               // console.log(res);
               this.allTableData = res.data;
               //this.filterTableData = res.data;
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
            this.teacherTableData = this.allTableData.filter((item,index) => {
                return index < this.paginations.page_size;
            });
        },
         handleSizeChange(page_size){
            //切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.teacherTableData = this.allTableData.filter((item,index) => {
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
                this.teacherTableData = tables;
            }
        },
         //添加信息
        addTeacher(){
            this.teacherdialog = {
               show: true,
               title: "添加教师信息",
               option: 'add'
           };
           this.teacherDialogData = {
                id:"",
                name:"",
                sex:"男",
                birthday:"",
                birthplace:"",
                id_number:"",
                nation:"",
                marital_status:"",
                education:"",
                politics_status:"",
                registered_address:"",
                contact_address:"",
                contact_phone:""
           }
        },
        //编辑信息
        editTeacher(index,row){
           // console.log(this.dialog);
           this.teacherdialog = {
               show: true,
               title: "修改教师信息",
               option: 'edit'
           };
           this.teacherDialogData = {
                id:row._id,
                name:row.name,
                sex:row.sex,
                birthday:row.birthday,
                birthplace:row.birthplace,
                id_number:row.id_number,
                nation:row.nation,
                marital_status:row.marital_status,
                education:row.education,
                politics_status:row.politics_status,
                registered_address:row.registered_address,
                contact_address:row.contact_address,
                contact_phone:row.contact_phone
           }
        },

        //删除信息
        deleteTeacher(index,row){
            this.$axios.delete(`/api/teachers/delete/${row._id}`)
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
                    this.getTeacher();
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
.teacherlist{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
}
.teacherAddCon{
    width: 100%;
    height: 48px;
}
.teacherAddCon .rightBtn{
    position: relative;
    left: 1040px;
}
.teacherTableCon{
    width: 1100px;
    height: 100%;
}
.teacherTableCon i.iconfont.icon-bianji1{
    color: rgb(23, 6, 124);
    cursor: pointer;
}
.teacherTableCon i.iconfont.icon-shanchu{
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


