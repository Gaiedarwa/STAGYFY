<template>
  <div>
    <bar-app></bar-app>

    <nav-bar></nav-bar>
    <br />
    <div align="right" class="my-16">
      <v-col cols="9">
        <!-- <v-row class="list px-3 mx-auto"> -->
        <v-card center width="900" class="mx-auto my-12">
          <v-card-title
            class="teal lighten-2 white--text text-h5"
            justify="center"
          >
          </v-card-title>
          <v-row>
            <v-col>
              <v-scroll-y-transition mode="out-in">
                <v-card class="pt-6 mx-auto" flat width="600" style="background-color: white;width: 500px">
                  <v-card-text>
                    <!-- <v-avatar v-if="avatar" size="88">
                  <v-img
                    :src="`https://avataaars.io/${avatar}`"
                    class="mb-6"
                  ></v-img>
                </v-avatar> -->
                    <v-img
                      v-bind:src="`http://127.0.0.1:8000/uploads/${profils.photo}`"
                      class="mb-6"
                      max-height="250"
                      max-width="250"
                      alt="image"
                    />
                    
                    <h3 class="text-center , text-h4 lighten-1">
                      {{ profils.firstname }} {{ profils.lastname }}
                    </h3>
                    <div
                      class="teal--text mb-2 , text-center , text-h4 lighten-1"
                    >
                      {{ profils.email }}
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-row class="text-left" tag="v-card-text">
                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      Date de naissance:
                    </v-col>
                    <v-col>{{ profils.dateBirth }}</v-col>
                    <!-- <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                  Website:
                </v-col> -->
                    <!-- <v-col>
                  <a :href="`//${selected.website}`" target="_blank">{{
                    selected.website
                  }}</a>
                </v-col> -->
                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      Télephone:
                    </v-col>
                    <v-col>{{ profils.Phone }}</v-col>

                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      Competence:
                    </v-col>
                    <v-col>{{ profils.competence }}</v-col>

                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      CV:
                    </v-col>
                    <v-col>
                      <a
                        class="teal--text mb-2"
                        :href="`http://127.0.0.1:8000/uploads/${profils.cv}`"
                        target="_blank"
                        >Telecharger
                      </a>
                    </v-col>
                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      Attestation:
                    </v-col>
                    <v-col>
                      <a
                        class="teal--text mb-2"
                        :href="`http://127.0.0.1:8000/uploads/${profils.attestation}`"
                        target="_blank"
                        >Telecharger
                      </a>
                    </v-col>
                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      LettreDeMotivation:
                    </v-col>
                    <v-col>
                      <a
                        class="teal--text mb-2"
                        :href="`http://127.0.0.1:8000/uploads/${profils.lettreDeMotivation}`"
                        target="_blank"
                        >Telecharger</a
                      >
                    </v-col>
                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      Sujets:
                    </v-col>
                    <v-col v-for="Sujet in profils.sujet" :key="Sujet.id">
                      {{ Sujet.titre }}
                    </v-col>
                  </v-row>
                </v-card>
              </v-scroll-y-transition>
            </v-col>
          </v-row>
          </v-card>
        </v-col>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";

export default {
  components: { NavBar, BarApp },

  name: "voirCandidat",
  // data() {
  //   return {
  //     profils: {},
  //   };
  data: () => ({
    profils: [],

    firstname: "",
    lastname: "",
    email: "",
    photo: "",
    id: "",
    Phone: "",
    dateBirth: "",
    competence: "",
    cv: new FormData(),
    lettreDeMotivation: new FormData(),
    attestation: new FormData(),

    titre: "",
    sujet: { titre: "", id: "" },
  }),
  created() {
    this.voirprofils();
  },
  methods: {
    voirprofils() {
      const token = localStorage.getItem("token");
      axios
        .get(
          "http://127.0.0.1:8000/api/voirCandidat/" + this.$route.params.id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          this.profils = response.data[0];
          this.sujet = response.data[1];
          console.log(this.profil.id);
          console.log(this.sujet);
        });
    },
  },
};
</script>
<style>
.div {
  font-size: 27px;
}
</style>
