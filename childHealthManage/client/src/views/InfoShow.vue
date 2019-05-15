<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
                <div class="user-avator">
                    <img src="../assets/luergou.jpg" alt="">
                </div>
                <div class="user-info">
                    <div class="user-item">
                        <i class="iconfont icon-yonghu"></i>
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="iconfont icon-user-info-copy-copy"></i>
                        <span>{{user.identity}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="userCard">
                    <el-card v-for="usr in usrData" :key="usr._id" :value="usr._id">
                        <div class="usrAvator">
                            <img src="../assets/luergou.jpg" class="image">
                        </div>
                        <div class="usrSign">
                            <div class="usrName">姓名：{{usr.name}}</div>
                            <div class="usrEmail">邮箱：{{usr.email}}</div>
                            <div class="usrIdentity">身份：{{usr.identity}}</div>
                            <div class="usrRegisterDate">注册时间：{{usr.date}}</div>
                        </div>
                    </el-card>
                </div>
                 <!--分页-->
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
</template>
<script>
export default {
    name:'infoshow',
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    data(){
        return {
            usrData:[],
            allUsrData:[],
            paginations:{
                page_index: 1, //当前位于哪一页
                total: 0,   //总页数
                page_size: 6,    //1页显示多少条
                page_sizes: [3,6],   //每页显示多少条
                layout:"total,sizes,prev,pager,next,jumper"   //翻页属性
            },
        }
    },
    created(){
        this.getAllUser();
    },
    methods: {
        getAllUser(){
            //获取数据
            this.$axios.get('/api/users')
            .then(res => {
                //console.log(res);
               this.allUsrData = res.data;
              // console.log(res.data);
              //设置分页
               this.setPaginations();
            }).catch(err => {
                console.log(err);
            });
        },
        setPaginations(){
            //分页属性设置
            this.paginations.total = this.allUsrData.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 6;
            //设置默认分页数据
            this.usrData = this.allUsrData.filter((item,index) => {
                return index < this.paginations.page_size;
            });
        },
        handleSizeChange(page_size){
            //切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.usrData = this.allUsrData.filter((item,index) => {
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
                if(this.allUsrData[i]){
                    tables.push(this.allUsrData[i]);
                }
                this.usrData = tables;
            }
        },
    }
    
}
</script>
<style>
.infoshow{
    width: 100%;
    height: 100%;
}
.infoshow .el-row{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.infoshow .el-col:first-child{
    background-color: rgb(245, 236, 236);
}
.infoshow .el-col:nth-child(2){
    background-color: rgb(219, 207, 207);
}
.user-avator{
    position: relative;
    left:-60px;
    top: 40px;
}
.user-info{
    position: relative;
    left:30px;
    top: 60px;
}
.user-info .user-item{
    margin-bottom: 16px;
    margin-left: 40px;
}
.user-avator img{
    width: 200px;
    height: 200px;
    margin-left: 130px;
}
.user-item i.iconfont{
    display: inline-block;
    margin-right: 10px;
    font-size: 20px;
}
.infoshow .userCard{
    width: 100%;
    overflow: hidden;
}
.infoshow .userCard .el-card{
    width: 250px;
    float: left;
    margin: 10px 0 0 10px;
    font-size: 14px;
    background: rgb(245, 236, 236);   
}
.infoshow .userCard .usrAvator{
    width: 60px;
    height: 60px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
}
.infoshow .userCard .usrAvator>img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.infoshow .userCard .usrSign>div{
    line-height: 24px;
}
.infoshow .pagination{
    margin-top: 10px;
    margin-right: 240px;
}
</style>
