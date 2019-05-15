<template>
    <div class="index">
       <HeaderNav></HeaderNav>
       <leftMenu></leftMenu>
       <div class="rightContainer">
           <router-view></router-view>
       </div>
       
    </div>
</template>
<script>
import HeaderNav from "../components/HeaderNav";
import leftMenu from "../components/leftMenu";

export default {
    name:"index",
    components:{
        HeaderNav,
        leftMenu
    }
}
</script>
<style>
.index{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.rightContainer{
    position: relative;
    top: 0;
    left: 228px;
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>

