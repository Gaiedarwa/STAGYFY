<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs15 sm12 md12>
        <nav-bar></nav-bar>
        <br />

        <v-sheet height="20"></v-sheet>

        <br />
        <!-- <v-img
          alt="dotit Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/maininamge.jpg')"
          max-height="500"
        />
        <br /> -->

        <br />
        <br />

        <v-img
          alt="dotit Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/Resume-amico.png')"
          max-height="400"
        />

        <v-col cols="15" sm="15">
          <v-card class="mx-auto" tile style="background-color: #0db39e">
            <v-card-title style="color: teal"></v-card-title>

            <v-simple-table style="background-color: #fafafa">
              <template>
                <thead>
                  <tr>
                    <!-- <th style="width: 50px; color: teal; text-align: center">
                      Id
                    </th> -->
                    <!-- <th style="color: teal">Photo</th> -->
                    <th style="color: teal">Nom Prenom</th>
                    <th style="color: teal">Photo</th>
                    <th style="color: teal">Email</th>
                    <th style="color: teal">roles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="entretien in encadrant" :key="entretien.id">
                    <!-- <td>
                      {{ entretien.candidats.id }}
                    </td> -->
                    <td>
                      {{ entretien.candidats.firstname }}
                      {{ entretien.candidats.lastname }}
                    </td>
                    <td>
                      <v-avatar
                        ><img
                          v-bind:src="`http://127.0.0.1:8000/uploads/${entretien.candidats.photo}`"
                          alt="image"
                      /></v-avatar>
                    </td>

                    <td>
                      {{ entretien.candidats.email }}
                    </td>
                    <td>
                      {{
                        entretien.candidats.roles == "ROLE_STAGIAIRE"
                          ? "stagiaire"
                          : ""
                      }}
                    </td>
                    <td>
                      <v-btn
                        small
                        text
                        teal
                        lighten-2
                        @click="tryy(entretien.candidats.id)"
                      >
                        <v-icon color="teal">mdi-eye</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavBar from "@/components/modules/encadrant/NavBar.vue";

import axios from "axios";
export default {
  components: { NavBar },
  data() {
    return {
      candidats: [],

      entretiens: [],
      sujet: [],
      titre: "",
      encadrant: [],
      isAcceptedData: false,
      appeler: false,
      dateEntretien: "",
      heurEntretien: "",
      avisHeur: "",
      avisDate: "",

      id: "",
      firstname: "",
      lastname: "",
      photo: new FormData(),
    };
  },

  created() {
    this.getCandidats();
  },

  methods: {
    tryy(value) {
      console.log(value);
      localStorage.setItem("idSt", value);
      this.$router.push({ name: "BoardVue" });
    },
    getCandidats() {
      const token = localStorage.getItem("token");
      axios

        .get(
          "http://127.0.0.1:8000/api/testencadfrantlist/" +
            localStorage.getItem("idE"),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          //   this.candidats = response.data;
          //   this.entretiens = response.data;
          // this.heurEntretien = response.data.entretien.heurEntretien;
          // this.dateEntretien = response.data.entretien.dateEntretien;
          // this.avisDate = response.data.entretien.avisDate;
          // this.avisHeur = response.data.entretien.avisHeur;
          // this.isAcceptedDate = response.data.entretien.isAcceptedDate;
          //   this.encadrant = response.data;
          //   this.sujet = response.data;
          // this.entretien.candidats.email= response.data;

          for (
            let index = 0;
            index < response.data.entretiens.length;
            index++
          ) {
            if (
              response.data.entretiens[index].candidats.roles[0] ==
              "ROLE_STAGIAIRE"
            ) {
              this.encadrant.push(response.data.entretiens[index]);
            }
          }
        });
    },
    testprofil(id) {
      this.$router.push({ name: "voirProfil", params: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
