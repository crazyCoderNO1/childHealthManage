<template>
    <div class="parentindex">
       <parentHNav></parentHNav>
       <parentLNav></parentLNav>
       <div class="rightContainer">
           <router-view></router-view>
       </div>
       
    </div>
</template>
<script>
import parentHNav from "../components/parentHNav";
import parentLNav from "../components/parentLNav";

export default {
    name:"parentindex",
    components:{
        parentHNav,
        parentLNav
    }
}
</script>
<style>
.parentindex{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.parentindex .rightContainer{
    position: relative;
    top: 0;
    left: 228px;
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>

