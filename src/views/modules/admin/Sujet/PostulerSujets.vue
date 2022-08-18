<template>
  <div>
    <bar-app></bar-app>

    <nav-bar></nav-bar>
    <br />
    <div align="right" class="my-16">
      <v-col cols="9">
        <!-- <v-row class="list px-3 mx-auto"> -->
        <v-card center width="900" class="mx-auto my-12" style="background-color: #fafafa">
          <v-card-title
            class="teal lighten-2 white--text text-h5"
            justify="center"
            >Ajouter votre Sujet
          </v-card-title>
        
          <v-col md="11">
            <v-form ref="form" lazy-validation>
                <v-alert v-model="error" :color="colorAlert" icon="mdi-alert">ajouté avec succès </v-alert>
              <v-text-field
                v-model="titre"
                :rules="[rules.required]"
                label="Title"
                required
              ></v-text-field>
              <v-text-field
                v-model="description"
                :rules="[rules.required]"
                label="Description"
                required
              ></v-text-field>
              <v-text-field
                v-model="technologie"
                :rules="[rules.required]"
                label="Technologie"
                required
              ></v-text-field>

              <v-row>
                <v-col cols="12" class="text-right">
                  <v-btn color="teal" small @click="submit()"> Ajouter </v-btn>
                  <v-btn
                    color="teal"
                    dark
                    class="mb-2"
                    text
                    router
                    to="/ListSujets"
                  >
                    <v-icon left> mdi-arrow-right-bottom</v-icon> retour
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <!-- </v-col> -->
        </v-card>
        <!-- </v-row> -->
      </v-col>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";
// import { type } from "os";

export default {
  components: { NavBar, BarApp },
  name: "PostulerSujets",
  data() {
    return {
      error: "false",
      titre: "",
      description: "",
      technologie: "",
      employe: "",
      options: [],
        msgAlert: "",
    error: false,
    colorAlert: "",
      // items: ["Foo", "Bar", "Fizz", "Buzz"],
      rules: {
        required: (value) => !!value || "Required",
      },
    };
  },

  methods: {
    empty() {
      if (this.field.value) {
        return this.field.value.length === 0;
      }
      return true;
    },
    submit() {
      const token = localStorage.getItem("token");

      // if (
      //   this.titre == "" ||
      //   this.technologie == "" ||
      //   this.description == ""
      // ) {
      //   alert("Il manque des informations !!");
      //   console.log(this.errors);
      //   return false;
      // } else {
      axios

        .post(
          "http://127.0.0.1:8000/api/Sujets",

          {
            employe: localStorage.getItem("id"),
            titre: this.titre,
            description: this.description,
            technologie: this.technologie,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
     .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            this.msgAlert = response.data;
            this.error = true;
            this.colorAlert = "success";
           
              
        setTimeout(() => {
this.$router.push("/ListSujets");
             
            }, 2000);
         
          
          }
           
          
        });
       
      // }
    },
  },
};
</script>
