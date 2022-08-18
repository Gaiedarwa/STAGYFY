import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";
import VueLogin from "../views/Auth/VueLogin.vue";
import VueSignup from "../views/modules/admin/Employe/VueSignup.vue";
import MultistepForm from "../views/modules/candidat/formulair/MultistepForm.vue";

import VueProfil from "../views/modules/candidat/formulair/VueProfil.vue";
import ProfilStaigaire from "../views/modules/candidat/formulair/ProfilStaigaire.vue";

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
    path: "/pass",
    name: "ChangerPass",

    component: () => import("../views/Auth/ChangerPassCandidat.vue"),
  },
  {
    path: "/admin",
    name: "admin",

    component: () => import("../views/modules/admin/indexRH.vue"),
  },
  {
    path: "/candidat",
    name: "candidat",

    component: () => import("../views/modules/candidat/indexCandidat.vue"),
  },

  {
    path: "/encadrant",
    name: "encadrant",

    component: () => import("../views/modules/encadrant/indexEncadrant.vue"),
  },
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

  { path: "/BoardVue", name: "BoardVue", component: BoardVue },

  {
    path: "/profil",
    name: "VueProfil",
    component: VueProfil,
  },
  {
    path: "/profilStaigaire",
    name: "ProfilStaigaire",
    component: ProfilStaigaire,
  },

  {
    path: "/formulaire",
    name: "MultistepForm",
    component: MultistepForm,
  },

  {
    path: "/ListSujets",
    name: "ListSujets",
    component: () => import("../views/modules/admin/Sujet/ListSujets.vue"),
  },
  {
    path: "/compte",
    name: "CompteEmploye",
    component: () => import("../views/modules/admin/Employe/CompteEmploye.vue"),
  },
  {
    path: "/PostulerSujets",
    name: "PostulerSujets",
    component: () => import("../views/modules/admin/Sujet/PostulerSujets.vue"),
  },

  {
    path: "/PlanificationAvis",
    name: "PlanificationAvis",
    component: () =>
      import("../views/modules/encadrant/entretien/PlanificationAvis.vue"),
  },
  {
    path: "/avisDate",
    name: "avisDate",
    component: () =>
      import("../views/modules/encadrant/entretien/avisDate.vue"),
  },
  {
    path: "/PlanificationEntretien",
    name: "PlanificationEntretien",
    component: () =>
      import("../views/modules/admin/Entretien/PlanificationEntretien.vue"),
  },
  {
    path: "/PostulerEntretien",
    name: "PostulerEntretien",
    component: () =>
      import("../views/modules/admin/Entretien/PostulerEntretien.vue"),
  },
  {
    path: "/ModifierEntretien",
    name: "ModifierEntretien",
    component: () =>
      import("../views/modules/admin/Entretien/ModifierEntretien.vue"),
  },

  /* path: "offices/:id",
  name: "office-detail",
  component: OfficeDetails,
  props: true, */
  {
    path: "/notifEntretien",
    name: "notifEntretien",

    component: () =>
      import("../views/modules/admin/Entretien/notifEntretien.vue"),
  },

  {
    path: "/ModificationSujets",
    name: "ModificationSujets",

    component: () =>
      import("../views/modules/admin/Sujet/ModificationSujets.vue"),
  },

  {
    path: "/listCandidats",
    name: "listCandidats",
    component: () =>
      import("../views/modules/admin/Candidat/listCandidats.vue"),
  },

  {
    path: "/NotifacceptCandidat",
    name: "NotifacceptCandidat",
    component: () =>
      import("../views/modules/admin/Candidat/NotifacceptCandidat.vue"),
  },
  {
    path: "/NotifrefCandidat",
    name: "NotifrefCandidat",
    component: () =>
      import("../views/modules/admin/Candidat/NotifrefCandidat.vue"),
  },
  {
    path: "/final",
    name: "StagiairesFinal",
    component: () =>
      import("../views/modules/admin/Candidat/StagiairesFinal.vue"),
  },
  {
    path: "/NotifacceptStagiaire",
    name: "NotifacceptStagiaire",
    component: () =>
      import("../views/modules/encadrant/candidat/NotifacceptStagiaire.vue"),
  },
  {
    path: "/stageFinal",
    name: "StageFinal",
    component: () =>
      import("../views/modules/encadrant/candidat/StageFinal.vue"),
  },
  {
    path: "/stagiaireEncadrant",
    name: "StagiaireEncadrant",
    component: () =>
      import("../views/modules/encadrant/candidat/StagiaireEncadrant.vue"),
  },

  {
    path: "/NotifrefStagiaire",
    name: "NotifrefStagiaire",
    component: () =>
      import("../views/modules/encadrant/candidat/NotifrefStagiaire.vue"),
  },
  {
    path: "/passEncadrant",
    name: "PassEncadrant",
    component: () => import("../views/modules/encadrant/PassEncadrant.vue"),
  },
  {
    path: "/voirProfil",
    name: "voirProfil",
    component: () =>
      import("../views/modules/encadrant/candidat/voirProfil.vue"),
  },

  {
    path: "/voirCandidat",
    name: "voirCandidat",
    component: () => import("../views/modules/admin/Candidat/voirCandidat.vue"),
  },

  {
    path: "/CatalogueSujets",
    name: "CatalogueSujets",
    component: () => import("../views/modules/admin/Sujet/CatalogueSujets.vue"),
  },

  {
    path: "/ConsulterSujet",
    name: "ConsulterSujet",
    component: () => import("../views/modules/admin/Sujet/ConsulterSujet.vue"),
  },

  {
    path: "/NotificationReponse",
    name: "NotificationReponse",
    component: () =>
      import("../views/modules/candidat/Notification/NotificationReponse.vue"),
  },
  {
    path: "/ajouterSujet",
    name: "ajouterSujet",
    component: () => import("../views/modules/candidat/Sujet/ajouterSujet.vue"),
  },

  {
    path: "/Sujets",
    name: "Sujets",
    component: () => import("../views/modules/encadrant/Sujet/Sujets.vue"),
  },
  {
    path: "/POST",
    name: "POST",
    component: () => import("../views/modules/encadrant/Sujet/POST.vue"),
  },
  {
    path: "/Update",
    name: "Update",
    component: () => import("../views/modules/encadrant/Sujet/Update.vue"),
  },
  {
    path: "/calander",
    name: "calander",
    component: () =>
      import("../views/modules/encadrant/entretien/calander.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
