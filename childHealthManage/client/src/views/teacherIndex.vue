<template>
    <div class="teacherindex">
       <teacherHNav></teacherHNav>
       <teacherLNav></teacherLNav>
       <div class="rightContainer">
           <router-view></router-view>
       </div>
       
    </div>
</template>
<script>
import teacherHNav from "../components/teacherHNav";
import teacherLNav from "../components/teacherLNav";

export default {
    name:"teacherindex",
    components:{
        teacherHNav,
        teacherLNav
    }
}
</script>
<style>
.teacherindex{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.teacherindex .rightContainer{
    position: relative;
    top: 0;
    left: 228px;
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>

