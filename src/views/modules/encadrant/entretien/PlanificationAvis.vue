<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs15 sm12 md12>
        <nav-bar></nav-bar>
            <v-sheet height="45"></v-sheet>

        <!-- <v-sheet height="20"></v-sheet> -->
        <!-- <v-img
      alt="dotit Logo"
      class="shrink mr-2"
      contain
      :src="require('@/assets/what-do-students-think-of-their-virtual-internships-removebg-preview.png')"
         max-height="300"
         max-width="500"
   
     
    /> -->
        <!-- 
        <v-img
          alt="dotit Logo"
          class="shrink mr-2"
          contain
          :src="
            require('@/assets/what-do-students-think-of-their-virtual-internships.jpg')
          "
          max-height="500"
        /> -->

      
   <v-img
            alt="dotit Logo"
            class="shrink mr-2"
            contain
            :src="require('@/assets/61a716cfef9c5342567001.png')"
            max-height="350"
          />


        <v-col cols="15" sm="15">
          <v-card class="mx-auto" tile>
            <v-card-title style="background-color: #0db39e"></v-card-title>

        
                  <v-simple-table>
              <template>
                <thead>
                  <tr>
                    <!-- <th style="width: 50px; text-align: center; color: teal">
                      Id
                    </th> -->
                    <th style="color: teal">Photo</th>
                    <th style="color: teal">Nom Prenom</th>
                    <th style="color: teal">Sujets</th>
                    <th style="color: teal">date Entretien</th>
                    <th style="color: teal">heur Entretien</th>

                    <th style="color: teal">votre avis date</th>

                    <th style="color: teal">votre avis heur</th>

                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="entretien in encadrant.entretiens"
                    :key="entretien.id"
                  >
                    <!-- <td>{{ entretien.candidats.id }}</td> -->
                         <td>
                      <v-avatar
                        ><img
                          v-bind:src="`http://127.0.0.1:8000/uploads/${entretien.candidats.photo}`"
                          alt="image"
                      /></v-avatar>
                    </td>
                    <td>
                      {{ entretien.candidats.firstname }}
                      {{ entretien.candidats.lastname }}
                    </td>
                    <td>
                      {{ entretien.sujet.titre }}
                    <!-- mekech tnedi fih -->
                    </td>
                    <!-- <td>
                      {{ entretien.id }}
                    </td> -->
                    <td>
                      {{ entretien.dateEntretien }}
                    </td>
                    <td>{{ entretien.heurEntretien }}</td>
                    <td>
                      <p
                        v-if="
                          entretien.avisDate == '' &&
                          entretien.isAcceptedDate == 0
                        "
                        style="color: red"
                      >
                        en attente
                      </p>
                      <p
                        v-else-if="
                          entretien.avisHeur == '' &&
                          entretien.isAcceptedDate == 1
                        "
                        style="color: green"
                      >
                        Accepter
                      </p>
                      <p v-else style="color: blue">
                        {{ entretien.avisHeur }}
                      </p>
                    </td>
                    <td>
                      <p
                        v-if="
                          entretien.avisHeur == '' &&
                          entretien.isAcceptedDate == 0
                        "
                        style="color: red"
                      >
                        en attente
                      </p>
                      <p
                        v-else-if="
                          entretien.avisHeur == '' &&
                          entretien.isAcceptedDate == 1
                        "
                        style="color: green"
                      >
                        Accepter
                      </p>
                      <p v-else style="color: blue">
                        {{ entretien.avisHeur }}
                      </p>
                    </td>

                    <td style="border-collapse: collapse">
                      <v-row>
                        <v-icon
                          small
                          class="mr-2"
                          color="green"
                          v-on:click="test(entretien.id)"
                          >mdi-pencil</v-icon
                        >
                      </v-row>
                    </td>
                    <td>
                      <v-icon
                        class="mr-2"
                        color="green"
                        v-on:click="stagiaire(entretien.id)"
                        >mdi-checkbox-marked-circle-outline</v-icon
                      >

                      <!-- <td>
                      <div v-if="roles == ROLE_STAGIAIRE">
                        <v-btn text small color="green">
                          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                        </v-btn>
                        <v-btn text small color="red">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </div>
                      <div v-else>
                        <v-icon
                          small
                          class="mr-2"
                          color="green"
                          v-on:click="stagiaire(entretien.id)"
                          >mdi-checkbox-marked-circle-outline</v-icon
                        >

                        <v-icon
                          small
                          class="mr-2"
                          color="red"
                          v-on:click="non(entretien.id)"
                          >mdi-close</v-icon
                        >
                      </div>
                    </td>




 -->

                      <v-icon
                        class="mr-2"
                        color="red"
                        v-on:click="non(entretien.id)"
                        >mdi-close</v-icon
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
                
          </v-card>
        </v-col>
      </v-flex></v-layout
    ></v-container
  >
</template>

<script>
import axios from "axios";

import NavBar from "@/components/modules/encadrant/NavBar.vue";

export default {
  components: { NavBar },
  name: "NotifEncadrant",
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
    this.getentretiencandidat();
  },
  methods: {
    getentretiencandidat() {
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
          this.candidats = response.data;
          this.entretiens = response.data;
          // this.heurEntretien = response.data.entretien.heurEntretien;
          // this.dateEntretien = response.data.entretien.dateEntretien;
          // this.avisDate = response.data.entretien.avisDate;
          // this.avisHeur = response.data.entretien.avisHeur;
          // this.isAcceptedDate = response.data.entretien.isAcceptedDate;
          this.encadrant = response.data;
          this.sujet = response.data;
          console.log(response.data);
        });
    },
    test(id)
 {
      this.$router.push({ name: "avisDate", params: { id: id } });
    },
    stagiaire(id)
 {
      this.$router.push({ name: "NotifacceptStagiaire", params: { id: id } });
    },
    non(id)
 {
      this.$router.push({ name: "NotifrefStagiaire", params: { id: id } });
    },
  },
};
</script>