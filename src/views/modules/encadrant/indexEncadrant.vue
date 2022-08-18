<template>
  <div>
    <nav-bar></nav-bar>
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs15 sm12 md12>
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
            :src="require('@/assets/maininamge-removebg-preview.png')"
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="entretien in entretiens" :key="entretien.id">
                      <!-- <td>{{ entretien.candidats.id }}</td> -->

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
                        <v-btn small text teal lighten-2>
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
  </div>
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
      id: "",
      firstname: "",
      lastname: "",

      isAcceptedData: false,
      appeler: false,
      dateEntretien: "",
      heurEntretien: "",
      avisHeur: "",
      avisDate: "",

      firstname: "",
      lastname: "",
      photo: new FormData(),
    };
  },

  created() {
    this.getCandidats();
  },

  methods: {
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
          // this.candidats = response.data;
          // this.entretiens = response.data;

          // this.encadrant = response.data;
          // this.sujet = response.data;
          this.id = response.data.id;
          this.firstname = response.data.firstname;
          this.lastname = response.data.lastname;
          this.entretiens = response.data.entretiens;
          console.log(this.entretiens);
        });
    },
    testprofil(id) {
      this.$router.push({ name: "voirProfil", params: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
