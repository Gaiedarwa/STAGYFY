<template>
  <v-container fill-height>
    <v-layout align-center justify-end>
      <v-flex xs13 sm10 md10>
<bar-app></bar-app>

    <nav-bar></nav-bar>
     <br />     <br />    <br />    <br />    
        <v-row class="list px-3 mx-auto" >
          <!-- <v-col lg="7" cols="12"> -->
            <!-- <v-alert dense text type="success">
              Login Successfully! Welcome to <strong>StagyFy</strong>
            </v-alert> -->
            <!-- <v-row> -->
              <!-- <v-col lg="6" cols="12" >
                <v-card elevation="2" class="rounded-lg" style="background-color: #fafafa">
                  <v-card-text
                    class="d-flex justify-space-between align-center"
                  >
                    <div>
                      <v-icon>mdi-account-group</v-icon>
                      <strong>Candidatures</strong>
                      <br />
                      <span>nombre total des candidats</span>
                    </div>
                    <v-avatar
                      size="40"
                      color="green accent-4"
                      style="border: 4px solid #444"
                    >
                      <span style="color: white">6 </span>
                    </v-avatar>
                  </v-card-text>
                </v-card>
              </v-col> -->
              <!-- <v-col lg="6" cols="12">
                <v-card elevation="2" class="rounded-lg" style="background-color: #fafafa">
                  <v-card-text
                    class="d-flex justify-space-between align-center"
                  >
                    <div>
                      <strong>Encadrants</strong>
                      <v-icon>mdi-account-tie</v-icon>
                      <br />

                      <span>nombre total des Encadrants</span>
                    </div>
                    <v-avatar
                      size="40"
                      color="grey"
                      style="border: 4px solid #444"
                    >
                      <span style="color: white">6 </span>
                    </v-avatar>
                  </v-card-text>
                </v-card>
              </v-col> -->
              <!-- <v-col lg="6" cols="12">
                <v-card elevation="2" class="rounded-lg" style="background-color: #fafafa">
                  <v-card-text
                    class="d-flex justify-space-between align-center"
                  >
                    <div>
                      <strong>Stagiaire</strong>
                      <v-icon>mdi-account-school</v-icon>
                      <br />

                      <span>nombres des Stagiaires après entretien</span>
                    </div>
                    <v-avatar
                      size="40"
                      color="teal lighten-2"
                      style="border: 4px solid #444"
                    >
                      <span style="color: white">0 </span>
                    </v-avatar>
                  </v-card-text>
                </v-card>
              </v-col> -->

              <!-- <v-col lg="6" cols="12">
                <v-card elevation="2" class="rounded-lg" style="background-color: #fafafa">
                  <v-card-text
                    class="d-flex justify-space-between align-center"
                  >
                    <div>
                      <v-icon>mdi-clipboard-outline</v-icon>
                      <strong>Sujets</strong>
                      <br />
                      <span>nombre total des sujets existe </span>
                    </div>
                    <v-avatar
                      size="40"
                      color="orange darken-3"
                      style="border: 4px solid #444"
                    >
                      <span style="color: white">15 </span>
                    </v-avatar>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col> -->
          <!-- <v-col cols="15" lg="5">
            <v-card style="background-color: #fafafa">
              <v-card-title>Activities</v-card-title>

              <v-card-text class="py-0">
                <v-timeline align-top dense>
                  <v-timeline-item color="indigo" small>
                    <strong>5 Minuts ago</strong>
                    <div class="text-caption">
                      You have new order please check this out    You have new order please check this out
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="green" small>
                    <strong>35 Minuts ago</strong>
                    <div class="text-caption mb-2">
                      A Product has delivered!
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-col> -->
       
    
          <v-img
            alt="dotit Logo"
            class="shrink mr-2"
            contain
            :src="require('@/assets/c4cc31df9b5c82baad0b7d286b507d87_XL.jpg')"
            max-height="300"
          />
        
          <v-col cols="12" sm="12">
            <v-card class="mx-auto" tile>
              <v-card-title style="background-color: #0db39e "></v-card-title>

              <v-simple-table style="background-color: #fafafa">
                <template>
                  <thead>
                    <tr>
                       <!-- <th style="width: 50px; text-align: center; color: teal">
                        Id
                      </th> -->
                      <th style="color: teal">Photo</th>
      
                       <th style="color: teal">Nom Prenom</th>

                        <th style="color: teal">Email</th>

                        <th style="color: teal">Accepté !</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="profilcandidat in profilcandidats"
                      :key="profilcandidat.id"
                    >
                      <!-- <td >
                        {{ profilcandidat.id }}
                      </td> -->
                      <td>
                        <v-avatar
                          ><img
                            v-bind:src="`http://127.0.0.1:8000/uploads/${profilcandidat.photo}`"
                            alt="image"
                        /></v-avatar>
                      </td>
                      <td>
                        {{ profilcandidat.firstname }}

                        {{ profilcandidat.lastname }}
                      </td>
                      <td>
                        {{ profilcandidat.email }}
                      </td>
                      <td v-if="profilcandidat.isAccepted == 1">
                        <v-icon text color="green">mdi-check </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>

    

  </v-container>
</template>

<script>
import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";
import axios from "axios";
export default {
  components: { NavBar , BarApp,},
  data: () => ({
    profilcandidats: {},
    firstname: "",
    lastname: "",
    id: "",
    email: "",
    isAccepted: false,
  }),

  created() {
    this.getCandidats();
  },
  methods: {
    getCandidats() {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.profilcandidats = response.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
