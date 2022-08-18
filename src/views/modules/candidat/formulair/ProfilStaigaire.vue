<template>
  <v-container fill-height >
    <v-layout align-center justify-center>
      <div>
        <v-card center width="1100" class="align-center"  style="background-color: white">
          <v-card-title
            class="teal lighten-2 white--text text-h5"
            justify="center"
          >
            PROFIL
          </v-card-title>
          <v-row>
            <v-col >
              <v-scroll-y-transition mode="out-in">
                <v-card class="pt-6 mx-auto" flat width="600 " style="background-color: white;width: 500px">
                  <v-card-text>
                    <!-- <v-avatar v-if="avatar" size="88">
                  <v-img
                    :src="`https://avataaars.io/${avatar}`"
                    class="mb-6"
                  ></v-img>
                </v-avatar> -->
                    <v-img
                      v-bind:src="`http://127.0.0.1:8000/uploads/${profil.photo}`"
                      class="mb-6"
                      max-height="250"
                      max-width="250"
                      alt="image"
                    />
                    <h3 class="text-center , text-h4 lighten-1">
                      {{ profil.firstname }} {{ profil.lastname }}
                    </h3>
                    <div
                      class="teal--text mb-2 , text-center , text-h4 lighten-1"
                    >
                      {{ profil.email }}
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-row class="text-left" tag="v-card-text">
                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      Date de naissance:
                    </v-col>
                    <v-col>{{ profil.dateBirth }}</v-col>
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
                    <v-col>{{ profil.Phone }}</v-col>

                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      Competence:
                    </v-col>
                    <v-col>{{ profil.competence }}</v-col>

                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      CV:
                    </v-col>
                    <v-col>
                      <a
                        class="teal--text mb-2"
                        :href="`http://127.0.0.1:8000/uploads/${profil.cv}`"
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
                        :href="`http://127.0.0.1:8000/uploads/${profil.attestation}`"
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
                        :href="`http://127.0.0.1:8000/uploads/${profil.lettreDeMotivation}`"
                        target="_blank"
                        >Telecharger</a
                      >
                    </v-col>
                    <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                      Sujets:
                    </v-col>
                    <v-col>
                      <!-- <ul>
                        <li v-for="profil in profils" v-bind:key="profil.id">
                          {{ profil.titre }}
                          <router-view></router-view>

                          <v-dialog width="500">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                v-on="on"
                                text
                                small
                                color="red"
                              >
                                <v-icon small>mdi-delete</v-icon>
                              </v-btn>
                            </template>

                            <v-card>
                              <v-card-title class="text-h5 teal lighten-2">
                              </v-card-title>
                              <v-col>
                                vouz etes sur de supprimer ce sujet?!
                              </v-col>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="red"
                                  @click="deletedata(profil.id)"
                                >
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </li>
                      </ul> -->
                      <!-- <ul>
                        <li v-for="profil in profils" v-bind:key="profil.id">
                          {{ profil.titre }}
                        </li>
                      </ul> -->
                      <v-select
                        v-model="e7"
                        @change="select(e7)"
                        :items="profil.sujet"
                        label="Select"
                        multiple
                        chips
                        persistent-hint
                        item-text="titre"
                      >
                        <option v-for="sujet in profil.sujet" v-bind:key="sujet.id">
                    
                          {{sujet.titre }}
                        </option>
                      </v-select>
                    </v-col>
                  </v-row>
                </v-card>
              </v-scroll-y-transition>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "ProfilStaigaire",
  // data() {
  //   return {
  //     profils: {},
  //   };
  data: () => ({
    profil: [],
    profils: [],
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    // sujets: "",
    Phone: "",
    dateBirth: "",
    competence: "",
    cv: new FormData(),
    lettreDeMotivation: new FormData(),
    attestation: new FormData(),
    photo: new FormData(),
    e7: [],
    loader: null,
    loading: false,
    loading2: false,
    loading3: false,
    loading4: false,
    loading5: false,
    titre: "",
    // sujets: [],
  }),
  created() {
    // this.getprofils();
   this.voirprofil();
  },
  methods: {
    select(obj) {
      console.log(obj[0]); //eli nzelet 3lih khdhit l index mt3o , chna3mlo tableau /de lindex de l element
      var tab = this.profil.sujet.filter((key) => key.titre != obj[0]); //fih eli menzeltech 3lihoum

      console.log(tab);
      for (let i = 0; i < tab.length; i++) {
        const element = tab[i];
        this.deletedata(element.id);
      } //koul element bech yetfasakh eli mawjoud fi woset tab
    },
    // getprofils() {
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get("http://127.0.0.1:8000/api/monprofil", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     .then((response) => {
    //       this.profils = response.data[1]; //sujets
    //       this.profil = response.data[0]; //profil
    //       console.log(this.profils);
    //       localStorage.setItem("id", this.profil.id);
    //     });
    // },
    voirprofil() {
      const token = localStorage.getItem("token");
      axios
        .get(
          "http://127.0.0.1:8000/api/voirCandidat/" + this.$route.params.id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
         this.profil = response.data[0];
          // this.sujet = response.data[1];
          console.log(this.profil);
          console.log(this.profil[0].sujet);
        })
    },
    // getsujets() {
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get("http://127.0.0.1:8000/api/get_nom_sujet", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     .then((response) => {
    //       this.sujets = response.data;
    //       // console.log(response.data);
    //     });
    // },
    deletedata(id) {
      console.log(id, this.profil.id);
      const token = localStorage.getItem("token");

      axios
        .delete("http://127.0.0.1:8000/api/supprimerSujet/" + this.profil.id, {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            sujet: id,
          },
        })
        .then(
          setTimeout(() => {
            location.reload();
          }, 1000)
        );
    },
  },
};
</script>

<style>
.div {
  font-size: 27px;
}
</style>

