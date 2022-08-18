import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";
import VueLogin from "../views/Auth/VueLogin.vue";
import VueSignup from "../views/Auth/VueSignup.vue";
import MultistepForm from "../views/Auth/MultistepForm.vue";

import VueProfil from "../views/Auth/VueProfil.vue";
import BoardVue from "../views/Task/BoardVue.vue";


// import axios from "axios";
Vue.use(VueRouter);
// axios.defaults.baseUrl = "http://localhost:8000/api/login_check/api";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/admin',
    name: 'admin',
   
    component: () => import('../views/modules/admin/indexRH.vue')},
    {
      path: '/candidat',
      name: 'candidat',
     
      component: () => import('../views/modules/candidat/indexCandidat.vue')},

      {
        path: '/encadrant',
        name: 'encadrant',
       
        component: () => import('../views/modules/encadrant/indexEncadrant.vue')},
  {
    path: "/login",
    name: "VueLogin",
    component: VueLogin,
  },
  {
    path: "/signup",
    name: "VueSignup",
    component: VueSignup,
  },
  {
    path: "/BoardVue",
    name: "BoardVue",
    component: BoardVue,
  },//tasklist:tloumhoum koul

  {

    path: "/profil",
    name: "VueProfil",
    component: VueProfil,
  },



  {

    path: "/formulaire",
    name: "MultistepForm",
    component: MultistepForm,
  },

  {
    path: '/acceuilApp',
    name: 'acceuilApp',
    component: () => import('../acceuilApp.vue')
  },
  

  {
    path: '/ListSujets',
    name: 'ListSujets',
    component: () => import('../views/Sujets/ListSujets.vue')
  },
  {
    path: '/PostulerSujets',
    name: 'PostulerSujets',
    component: () => import('../views/Sujets/PostulerSujets.vue')
  },
  {
    path: '/PlanificationEntretien',
    name: 'PlanificationEntretien',
    component: () => import('../views/Entretien/PlanificationEntretien.vue')
  },
  {
    path: '/PostulerEntretien',
    name: 'PostulerEntretien',
    component: () => import('../views/Entretien/PostulerEntretien.vue')
  }, 
   {
    path: '/ModifierEntretien',
    name: 'ModifierEntretien',
    component: () => import('../views/Entretien/ModifierEntretien.vue')
  },
  {
    path: '/ModificationSujets',
    name: 'ModificationSujets',
    component: () => import('../views/Sujets/ModificationSujets.vue')
  },

  {
    
    path: '/listCondidats',
    name: 'listCondidats',
    component: () => import('../views/Candidat/listCondidats.vue')
  },

  {
    path: '/voirCondidat',
    name: 'voirCondidat',
    component: () => import('../views/Candidat/voirCondidat.vue')
  },

  {
    path: '/CatalogueSujets',
    name: 'CatalogueSujets',
    component: () => import('../views/Sujets/CatalogueSujets.vue')
  },
  {
    path: '/ConsulterSujet',
    name: 'ConsulterSujet',
    component: () => import('../views/Sujets/ConsulterSujet.vue')
  },
  
  {
    path: '/alertSupprimer',
    name: 'alertSupprimer',
    component: () => import('../views/Sujets/alertSupprimer.vue')
  },
 

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
