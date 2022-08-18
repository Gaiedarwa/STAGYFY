<template>
  <div>
      <nav-bar></nav-bar>
        <v-sheet height="200"></v-sheet>
    <div align="center">
      <v-col cols="7" >
         <v-card-title  style="background-color: #0db39e "  class="teal lighten-2 white--text text-h5"
            justify="center">Modifier Entretien</v-card-title>
        <v-card style="background-color: #fafafa">
          <!-- <v-card-title>
            <span class="headline">Modifier Entretien</span>
          </v-card-title> -->
          

          <v-col>
            <v-text-field
              v-model="firstname"
              required
              label="firstname"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="lastname"
              required
              label="lastname"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="heurEntretien"
              required
              label="heur Entretien"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="dateEntretien"
              required
              label="date"
            ></v-text-field>
          </v-col>

          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-checkbox
                color="green"
                label="vous acceptez cette date et cette heure?"
                v-model="isAcceptedDate"
                required
                hide-details
              ></v-checkbox>
              <p>si non tapez votre proposition</p>

              <v-text-field v-model="avisDate" label="avisDate" required></v-text-field>
              <v-text-field v-model="avisHeur"  label="avisHeur"  required></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green" text outlined v-on:click="avisencadrant()"
                >Save</v-btn
              >
              <v-btn color="green" text outlined>retour</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </div>

  
    <br />
    <br />
  </div>
</template>

//
<script></script>
<script>
import axios from "axios";
import NavBar from "@/components/modules/encadrant/NavBar.vue";

export default {
  components: { NavBar },
  name: "avisDate",

  data: () => ({
    entretien: {
      isAcceptedDate: false,
      avisDate: "",
      avisHeur: "",
    },

    menu: false,
    id: "",
    isAcceptedDate: false,
    avisDate: "",
    avisHeur: "",
    // NotifDateEntretien: "accepter ",

    candidats: [],
    // notifications: { ReponseFinal: "", id: "", NotifDateEntretien: "" },

    id: "",
    dateEntretien: "",
    heurEntretien: "",

    firstname: "",
    lastname: "",
    // notificationId: null,
  }),

  mounted() {
    //     console.log(this.$route.params.id);
    // this.entretiens.id = this.$route.params.id;
    const token = localStorage.getItem("token");
    axios
      .get(
        "http://127.0.0.1:8000/api/getNotifsidtest/" + this.$route.params.id,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        this.candidats = response.data;

        // this.notifications.Candidat.id = response.data;
        this.entretien.id = response.data;
        //  this.notifications = response.data;
        // this.notificationId = response.data.candidats.notifications[0];
        console.log(response.data);
        this.firstname = response.data.candidats.firstname;
        this.lastname = response.data.candidats.lastname;
        this.heurEntretien = response.data.heurEntretien;
        this.dateEntretien = response.data.dateEntretien;
        this.avisDate = response.data.avisDate;
        this.avisHeur = response.data.avisHeur;
        // this.Candidat = response.data.candidats.notifications.Candidat;
      });
  },
  methods: {
    avisencadrant() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/avisencadrant/" + this.$route.params.id,
          {
            avisDate: this.avisDate,
            avisHeur: this.avisHeur,
            isAcceptedDate: this.isAcceptedDate,
          },

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
            this.$router.push("/PlanificationAvis");
        });
    },
  },
};
</script>