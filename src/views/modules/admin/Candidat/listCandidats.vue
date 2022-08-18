<template>
  <div>
    <bar-app></bar-app>

    <nav-bar></nav-bar>
    <br />
    <div align="right" class="my-13">
      <v-col cols="9">
        <v-row class="list px-3 mx-auto">
          <!-- <v-col cols="14" md="8">
            <v-text-field label="Search by Title"></v-text-field>
          </v-col> -->
          <v-col cols="12" md="4">
            <v-card-actions>
              <v-btn class="mt-n2" elevation="1" fab small>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card class="mx-auto" tile>
              <v-card-title  style="background-color: #0db39e " ></v-card-title>

              <v-simple-table  style="background-color: #fafafa">
                <template>
                  <thead>
                    <tr>
                      <!-- <th style="width: 50px; text-align: center; color: teal">
                        Id
                      </th> -->
                      <th style="color: teal">Photo</th>
                      <th style="color: teal">Nom Prenom</th>

                      <th style="color: teal">voir profil</th>
                      <th></th>
                      <th style="color: teal">État</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="profilcandidat in profilcandidats"
                      :key="profilcandidat.id"
                    >
                      <!-- <td>
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
                        <v-btn
                          small
                          text
                          teal
                          lighten-2
                          @click="testprofil(profilcandidat.id)"
                        >
                          <v-icon style="color: teal">mdi-eye</v-icon>
                        </v-btn>
                      </td>

                      <td>
                        <div v-if="profilcandidat.isAccepted == 1">
                          <v-btn text small color="green">
                            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                          </v-btn>
                          <v-btn text small color="red">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </div>
                        <div v-else>
                          <v-btn
                            text
                            small
                            color="green"
                            @click="getcandidatacc(profilcandidat.id)"
                          >
                            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                          </v-btn>
                          <v-btn
                            text
                            small
                            color="red"
                            @click="getcandidatref(profilcandidat.id)"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </div>
                      </td>
                      <td v-if="profilcandidat.isAccepted == 1">
                        <v-icon text color="green">mdi-check </v-icon>
                      </td>
                    </tr>
                  </tbody>
                  <!-- <v-card-actions>
                <v-col cols="12" class="text-right" style="background-color: #F7F7F2">
                  <v-btn color="error" small > Supprimer Tous </v-btn>
                </v-col>
              </v-card-actions> -->

                </template>
               
              </v-simple-table>

              
            </v-card>
          </v-col>
        </v-row>
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

  name: "listCandidats",
  data: () => ({
    profilcandidats: {},
    firstname: "",
    lastname: "",
    id: "",
    isAccepted: false,
  }),

  created() {
    this.getCandidats();
  },
  methods: {
    getCandidats() {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/get_nom_Candidat", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.profilcandidats = response.data;
        });
    },
    getcandidatacc(id) {
      this.$router.push({ name: "NotifacceptCandidat", params: { id: id } });
    },
    getcandidatref(id) {
      this.$router.push({ name: "NotifrefCandidat", params: { id: id } });
    },

    testprofil(id) {
      this.$router.push({ name: "ProfilStaigaire", params: { id: id } });
    },
  },
};
</script>
