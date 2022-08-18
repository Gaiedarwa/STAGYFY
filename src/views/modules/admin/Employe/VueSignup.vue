<template>
  <v-container fill-height>
    <v-layout align-center justify-end>
      <v-flex xs10 sm8 md8>
        <v-card elevation="01">
          <v-toolbar  color="#0db39e">
            <v-toolbar-title style="color: black"
              ></v-toolbar-title
            >
          </v-toolbar>
          <v-card-text style="background-color: #fafafa">
            <v-form>
              <v-alert v-model="error" :color="colorAlert" icon="mdi-alert">{{
                msgAlert
              }}</v-alert>

              <v-text-field
                prepend-icon="mdi-account"
                name="login"
                v-model="firstname"
                label="nom"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                name="login"
                v-model="lastname"
                label="prenom"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions style="background-color: #fafafa">
            <v-spacer></v-spacer>

            <v-btn large color="#0db39e"
            
              dark
              tile
              class="pa-6 font-weight-bold"
              elevation="0" @click.prevent="employe()">
              employé
              <v-icon>mdi-keyboard_arrow_up</v-icon>
            </v-btn>
            <v-btn large color="#0db39e"
            
              dark
              tile
              class="pa-6 font-weight-bold"
              elevation="0" @click.prevent="encadrant()">
              encadrant
              <v-icon>mdi-keyboard_arrow_up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <bar-app></bar-app>

    <nav-bar></nav-bar>
  </v-container>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";

export default {
  components: { NavBar, BarApp },
  name: "VueSignup",
  data: () => ({
    firstname: "",
    lastname: "",
    email: "",
    msgAlert: "",
    error: false,
    colorAlert: "",
    rules: {
      required: (value) => !!value || "Required",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    valid() {
      return this.password === this.confirm_password;
    },
    employe() {
      axios
        .post("http://127.0.0.1:8000/api/employe", {
         firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
        })
        .then((response) => {
          console.log(response.data.status);
          if (response.data.status == 201) {
            this.msgAlert = response.data.message;
            this.error = true;
            this.colorAlert = "success";
          } else {
            this.msgAlert = response.data.message;
            this.error = true;
            this.colorAlert = "error";
            setTimeout(() => {
              this.error = false;
            }, 1500);
            return;
          }
        });
    },
    encadrant() {
      axios
        .post("http://127.0.0.1:8000/api/encadrant", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
        })
        .then((response) => {
          console.log(response.data.status);
          if (response.data.status == 201) {
            this.msgAlert = response.data.message;
            this.error = true;
            this.colorAlert = "success";
          } else {
            this.msgAlert = response.data.message;
            this.error = true;
            this.colorAlert = "error";
            setTimeout(() => {
              this.error = false;
            }, 1500);
            return;
          }
        });
      // .catch((error) => console.log(error));
    },
  },
};
</script>
