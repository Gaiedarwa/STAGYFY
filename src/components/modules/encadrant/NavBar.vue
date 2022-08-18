<template>
  <v-app-bar height="80" app color="white" margin-left="10px">
    <v-img
      alt="dotit Logo"
      class="shrink mr-2"
      contain
      :src="require('@/assets/Mon projet (1).png')"
      transition="scale-transition"
      max-width="50"
    />
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>

    <router-link to="/encadrant" class="link" style="" v-show="showTask">Acceuil </router-link>
    <!-- <router-link to="/calander" class="link" style="" v-show="showTask">Calander </router-link> -->
    <router-link to="/PlanificationAvis" class="link" style=""
       v-show="showTask">Entretien
    </router-link>
    <router-link to="/Sujets" class="link" style="">Sujets </router-link>

    <router-link to="/StagiaireEncadrant" class="link" style="" v-show="showTask">Stagiaires </router-link>

    <v-menu offset-y text>
      <template v-slot:activator="{ attrs, on }" text>
        <span text v-bind="attrs" v-on="on">
          <v-btn link text small>
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
              >{{ firstname }} {{ lastname }}</v-list-item-title
            >
            <v-list-item-subtitle>Connecté(e)</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-item router to="/passEncadrant">
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
    encadrant: [],
    firstname: "",
    lastname: "",
      showTask: true,
  }),

  created() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://127.0.0.1:8000/api/employeconnecte/${localStorage.getItem(
          "idE"
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.firstname = response.data[0].firstname;
        this.lastname = response.data[0].lastname;
        console.log(this.lastname, this.firstname);
      }
      )
         .then(() => {
          if (localStorage.getItem("roles") == "ROLE_EMPLOYE") {
            this.showTask = false;
          }
        });
  },
  methods: {
    logOut() {
      localStorage.removeItem("idE");
       localStorage.removeItem("idSt");
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      localStorage.removeItem("board-sections");
    },
  },
};
</script>
<style>
.v-toolbar__content {
  height: 49px !important;
}
</style>
