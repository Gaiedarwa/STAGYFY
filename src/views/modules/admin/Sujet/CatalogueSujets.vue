<template>
  <div style="background-color: #e0e0e0">
    <div class="mx-auto" style="width: 90%">
      <div class="bg">
        <v-row
          ><v-col md="6">
            <v-img
              alt="dotit Logo"
              contain
              :src="require('@/assets/1610575139.jpg')"
            />
            <div
              style="
                height: 10px;
                margin-top: 36px;
                border-radius: 19px;
                background-color: white;
                opacity: 0.9;
                text-align: center;
                width: 93%;
                margin-left: 31px;
              "
            >
              <!-- <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
                facere itaque eos officiis ea, debitis et, cumque sint tempora,
                qui possimus dolor! Dolore quam saepe quisquam. Nam porro
                reiciendis tempora.
              </p> -->
            </div></v-col
          >
          <v-col md="6"
            ><div>
              <v-img
                alt="dotit Logo"
                contain
                :src="require('@/assets/1610575139.jpg')"
              /></div></v-col
        ></v-row>
      </div>
      <h1></h1>
      <br />
      <v-row>
        <v-col md="6" v-for="sujet in sujets" :key="sujet.id">
          <v-card
            class="pa-5"
            width="800"
            outlined
            style="background-color: #fdf9f9"
          >
            <v-row>
              <v-col md="12">
                <v-card-title class="text-center">
                  Sujet: {{ sujet.titre }}</v-card-title
                >
                <v-card-text> Technologie: {{ sujet.technologie }}</v-card-text>
              </v-col>
              <v-col md="12"
                ><v-card-actions>
                  <v-row>
                    <v-col md="6">
                      <v-dialog width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            block
                            x-large
                            color="teal lighten-2"
                            small
                            class="mb-2 white--text"
                            elevation="0"
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
                              dark
                              color="#0db39e"
                              class="pa-6 font-weight-bold"
                              elevation="0"
                              @click="getsujet(sujet.id)"
                              v-on:click="dialog = false"
                              >confirmer</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>

                    <v-col md="6">
                      <v-dialog width="800">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            block
                            x-large
                            class="mb-2"
                            elevation="0"
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
          </v-card></v-col
        >
      </v-row>
    </div>
  </div>
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
          console.log(this.sujets);
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
