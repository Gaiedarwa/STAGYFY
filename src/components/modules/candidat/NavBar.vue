<template>
  <v-app-bar
    dense
    flat
    elevation="0"
    height="80"
    app
    color="white"
    class="pa-5"
  >
    <!-- <v-container class="py-4 fill-height" flat height="90"> -->
    <v-img
      alt="dotit Logo"
      class="shrink mr-2"
      contain
      :src="require('@/assets/Mon projet (1).png')"
      max-width="50"
    />
    <v-spacer></v-spacer>

    <router-link to="/candidat" class="link" style="">Acceuil </router-link>
    <router-link to="/CatalogueSujets" class="link" style=""
      >Catalogue
    </router-link>
    <router-link to="/profil" class="link" style="">Profil </router-link>
    <router-link to="/BoardVue" class="link" style="" v-show="showTask"
      >Taches
    </router-link>

    <v-menu
      class="link"
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="link"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
          to="/NotificationReponse"
        >
          <v-badge color="red" overlap bordered>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
    </v-menu>

    <v-menu offset-y text>
      <template v-slot:activator="{ attrs, on }" text>
        <span text v-bind="attrs" v-on="on">
          <v-btn link text small>
            <!-- <span style="font-size:28px ;"  small>Jane Smith</span> -->

            <v-icon color="teal">mdi-account</v-icon>
          </v-btn>
        </span>
      </template>
      <v-list width="250" class="py-0" expand nav c>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon small color="green">mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              >{{ candidat.firstname }}
              {{ candidat.lastname }}</v-list-item-title
            >
            <v-list-item-subtitle>Connecté(e)</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item router to="/pass">
          <v-list-item-action>
            <v-icon small>mdi-key</v-icon>
          </v-list-item-action>
          <v-list-item-content>changer mot de passe </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/Login">
          <v-list-item-action>
            <v-icon small text to="/Login">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content style="color: #0db39e !important" @click="logOut"
            >Déconnexion
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import axios from "axios";
export default {
  name: "NavBar",

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    candidat: {},
    firstname: "",
    lastname: "",
    showTask: false,
  }),

  created() {
    if (localStorage.getItem("id")) {
      const token = localStorage.getItem("token");
      axios
        .get(
          `http://127.0.0.1:8000/api/get_Candidat_id1/${localStorage.getItem(
            "id"
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          this.candidat = response.data;
          console.log(response.data);
        })
        .then(() => {
          if (localStorage.getItem("roles") == "ROLE_STAGIAIRE") {
            this.showTask = true;
          }
        });
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("id");
         localStorage.removeItem("idE");
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      localStorage.removeItem("board-sections");
    },
  },
};
</script>

<style>
@import "./BarCandidat.css";
.v-toolbar__content {
  height: 49px !important;
}
</style>
