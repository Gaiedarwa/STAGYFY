<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <div>
        <v-card center width="800" class="align-center">
          <v-card-title
            class="teal lighten-2 white--text text-h5"
            justify="center"
          >
            Catalogue BOOK
          </v-card-title>

          <v-card
            v-for="sujet in sujets"
            :key="sujet.id"
            class="pa-15"
            width="800"
            outlined
          >
            <v-row class="text-center">
              <v-col md="9">
                <!-- <v-card-title> Sujet: {{ sujet.id }}</v-card-title> -->
                <v-card-title> Sujet: {{ sujet.titre }}</v-card-title>
                <!-- <v-card-title>
                  Description: {{ sujet.description }}</v-card-title
                >
                -->
                <v-card-title>
                  Technologie: {{ sujet.technologie }}</v-card-title
                >
              </v-col>
              <v-col md="3"
                ><v-card-actions>
                  <v-row>
                    <!-- <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >From the bottom</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Opening from the bottom</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col> -->

                    <v-col md="12">
                      <v-dialog width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            block
                            x-large
                            color="teal lighten-2"
                            small
                            class="mb-2"
                            >Postuler</v-btn
                          >
                        </template>

                        <v-card>
                          <v-toolbar
                            class="white--text text-h5 teal lighten-2"
                          ></v-toolbar>
                          <v-alert
                            color="error"
                            :value="error"
                            icon="mdi-alert"
                          >
                            Vous avez postuler sur 3 sujets
                          </v-alert>
                          <v-card-text class="text-h5 lighten-2">
                            confirmer votre postulat!
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              @click="getsujet(sujet.id)"
                              v-on:click="dialog = false"
                              >confirmer</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>

                    <v-col md="12">
                      <v-dialog width="800">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            block
                            x-large
                            class="mb-2"
                            small
                          >
                            Consulter
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title
                            class="white--text text-h5 teal lighten-2"
                          >
                            {{ sujet.titre }}
                          </v-card-title>

                          <v-card-text>
                            Description: {{ sujet.description }}</v-card-text
                          >
                          <v-card-text>
                            Technologie: {{ sujet.technologie }}</v-card-text
                          >
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="dialog = false">
                              OK
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "CatalogueSujets",

  data() {
    return {
      sujets: {},
      id: "",
      titre: "",
      technologie: "",
      description: "",
      dialog: false,
      error: false,
    };
  },
  created() {
    this.getsujets();
  },
  methods: {
    getsujets() {
      const token = localStorage.getItem("token");

      axios
        .get("http://127.0.0.1:8000/api/catalogue", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.sujets = response.data;
        });
    },

    testsujet(id) {
      this.$router.push({ name: "ConsulterSujet", params: { id: id } });
    },
    getsujet(id) {
      if (!localStorage.getItem("token")) {
        this.$router.push({ name: "MultistepForm", params: { id: id } });
      } else {
        const token = localStorage.getItem("token");
        axios
          .get("http://127.0.0.1:8000/api/monprofil", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            if (res.data[1].length < 3) {
              axios
                .put(
                  "http://127.0.0.1:8000/api/ajouterSujet/" +
                    localStorage.getItem("id"),
                  {
                    sujet: id,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((response) => {
                  this.sujets = response.data;
                });
            } else {
              this.error = true;
              console.log("ey haja");
            }
          });

        // const token = localStorage.getItem("token");
        // axios
        //   .put(
        //     "http://127.0.0.1:8000/api/ajouterSujet/" +
        //       localStorage.getItem("id"),
        //     {
        //       sujet: id,
        //     },
        //     {
        //       headers: { Authorization: `Bearer ${token}` },
        //     }
        //   )
        //   .then((response) => {
        //     this.sujets = response.data;
        //   });
      }
    },
  },
};
</script>
<style>
.div {
  font-size: 27px;
}
</style>
