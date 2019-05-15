import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import childsList from './views/childsList.vue'
import teacherList from './views/teacherList.vue'

import teacherShow from './views/teacherShow.vue'
import teacherIndex from './views/teacherIndex.vue'
import teacherHome from './views/teacherHome.vue'
import medicalExam from './views/medicalExam.vue'
import dietRecords from './views/dietRecords.vue'
import healthLog from './views/healthLog.vue'

import firstClassMedicalExam from './views/firstClassMedicalExam.vue'
import secondClassMedicalExam from './views/secondClassMedicalExam.vue'
import thirdClassMedicalExam from './views/thirdClassMedicalExam.vue'
import fourthClassMedicalExam from './views/fourthClassMedicalExam.vue'

import firstClassDietrecords from './views/firstClassDietrecords.vue'
import secondClassDietrecords from './views/secondClassDietrecords.vue'
import thirdClassDietrecords from './views/thirdClassDietrecords.vue'
import fourthClassDietrecords from './views/fourthClassDietrecords.vue'

import parentShow from './views/parentShow.vue'
import parentIndex from './views/parentIndex.vue'
import parentHome from './views/parentHome.vue'
import healthState from './views/healthState.vue'
import messageBoard from './views/messageBoard.vue'

import mondayDietrecords from './views/mondayDietrecords.vue'
import tuesdayDietrecords from './views/tuesdayDietrecords.vue'
import wednesdayDietrecords from './views/wednesdayDietrecords.vue'
import thursdayDietrecords from './views/thursdayDietrecords.vue'
import fridayDietrecords from './views/fridayDietrecords.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {
          path: '',
          component: Home
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },{
          path: '/childslist',
          name: 'childslist',
          component: childsList
        },{
          path: '/teacherlist',
          name: 'teacherlist',
          component: teacherList
        }
      ]
    }, 
    {
      path: '/teacherindex',
      name: 'teacherindex',
      component: teacherIndex,
      children:[
        {
          path: '',
          component: teacherHome
        },
        {
          path: '/teacherhome',
          name: 'teacherhome',
          component: teacherHome
        },
        {
          path: '/teachershow',
          name: 'teachershow',
          component: teacherShow
        },{
          path: '/medicalexam',
          name: 'medicalexam',
          component: medicalExam,
          children:[
            {
              path: '/firstclassmedicalexam',
              name: 'firstclassmedicalexam',
              component: firstClassMedicalExam
            },
            {
              path: '/secondclassmedicalexam',
              name: 'secondclassmedicalexam',
              component: secondClassMedicalExam
            },
            {
              path: '/thirdclassmedicalexam',
              name: 'thirdclassmedicalexam',
              component: thirdClassMedicalExam
            },
            {
              path: '/fourthclassmedicalexam',
              name: 'fourthclassmedicalexam',
              component: fourthClassMedicalExam
            }
          ]   
        },{
          path: '/dietrecords',
          name: 'dietrecords',
          component: dietRecords,
          children:[
            { 
              path: '/firstclassdietrecords',
              name: 'firstclassdietrecords',
              component: firstClassDietrecords,
              children:[
                {
                  path: '/mondaydietrecords',
                  name: 'mondaydietrecords',
                  component: mondayDietrecords,
                },{
                  path: '/tuesdaydietrecords',
                  name: 'tuesdaydietrecords',
                  component: tuesdayDietrecords,
                },{
                  path: '/wednesdaydietrecords',
                  name: 'wednesdaydietrecords',
                  component: wednesdayDietrecords,
                },{
                  path: '/thursdaydietrecords',
                  name: 'thursdaydietrecords',
                  component: thursdayDietrecords,
                },{
                  path: '/fridaydietrecords',
                  name: 'fridaydietrecords',
                  component: fridayDietrecords,
                }
              ]
            },
            {
              path: '/secondclassdietrecords',
              name: 'secondclassdietrecords',
              component: secondClassDietrecords
            },
            {
              path: '/thirdclassdietrecords',
              name: 'thirdclassdietrecords',
              component: thirdClassDietrecords
            },
            {
              path: '/fourthclassdietrecords',
              name: 'fourthclassdietrecords',
              component: fourthClassDietrecords
            }
          ]   
        },{
          path: '/healthlog',
          name: 'healthlog',
          component: healthLog
        }
      ]
    },
    {
      path: '/parentindex',
      name: 'parentindex',
      component: parentIndex,
      children:[
        {
          path: '',
          component: parentHome
        },
        {
          path: '/parenthome',
          name: 'parenthome',
          component: parentHome
        },
        {
          path: '/parentshow',
          name: 'parentshow',
          component: parentShow
        },{
          path: '/healthstate',
          name: 'healthstate',
          component: healthState
        },{
          path: '/messageboard',
          name: 'messageboard',
          component: messageBoard
        }
      ]
    }
    ,
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
//路由守卫
 router.beforeEach((to,from,next) =>{
   const isLogin = localStorage.eleToken ? true : false;
   if(to.path == "/login" || to.path == "/register"){
     next();
   }else{
     isLogin ? next() : next("/login");
   }
 });


export default router;