<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs15 sm12 md12>
        <nav-bar></nav-bar>
        <br />
        <br />
        <br />
        <br />
        <v-row
          ><v-col>
            <v-img
              :src="require('@/assets/Update.jpg')"
              max-height="500"
              max-width="500"
          /></v-col>

          <v-col>
            <v-card
              class="mx-auto my-12"
              max-width="720"
              style="background-color: #fafafa"
            >
              <h1 style="color: teal">Postuler votre sujet</h1>
              <v-alert v-model="error" :color="colorAlert" icon="mdi-alert"
                >ajouté avec succès
              </v-alert>

              <v-col md="11">
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    v-model="titre"
                    :rules="[(v) => !!v || 'Titre est requis']"
                    label="Title"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="description"
                    :rules="[(v) => !!v || 'Technologie est requis']"
                    label="Description"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="technologie"
                    :rules="[(v) => !!v || 'Description est requis']"
                    label="Technologie"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-col cols="12" class="text-right">
                      <v-btn color="teal" small @click="submit(id)">
                        Ajouter
                      </v-btn>

                      <v-btn
                        color="teal"
                        dark
                        class="mb-2"
                        text
                        router
                        to="/Sujets"
                      >
                        <v-icon left> mdi-arrow-right-bottom</v-icon> retour
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/modules/encadrant/NavBar.vue";

export default {
  components: { NavBar },
  name: "POST",
  data() {
    return {
      titre: "",
      description: "",
      technologie: "",
      employe: "",
      msgAlert: "",
      error: false,
      colorAlert: "",
    };
  },

  methods: {
    submit() {
      const token = localStorage.getItem("token");

      axios

        .post(
          "http://127.0.0.1:8000/api/Sujets",

          {
            employe: localStorage.getItem("idE"),
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
            axios
              .put(
                `http://127.0.0.1:8000/api/rolesEncadrant/${localStorage.getItem(
                  "idE"
                )}`,
                {},

                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then((response) => {
                localStorage.setItem("roles", "ROLE_ENCADRANT");
              });
          }
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push("/Sujets");
          }, 2000);
        });
    },
  },
};
</script>
