<template>
  <div>
       <nav-bar></nav-bar>
    <br />
    <div align="right" class="my-16" >
      <v-col cols="9">

        <!-- <v-row class="list px-3 mx-auto"> -->
        <v-card center width="900" class="mx-auto my-12">
          <v-card-title
            class="teal lighten-2 white--text text-h5"
            justify="center"
          >
          </v-card-title>

          <v-col md="11">
            <!-- <v-card-title class="text-h5 teal lighten-2"> </v-card-title> -->
            <!-- <v-col cols="12" sm="12"> -->
            <!-- <v-checkbox v-model="accepter.isAccepted" required></v-checkbox> -->
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-col md="6" >
                  <!-- <v-text-field
                    label="vous etes sur d'envoyer une notifications a :"
                    disabled
                  ></v-text-field> -->
                vous êtes sûr d'accepter et d'envoyer une notification à:
                </v-col>
                <v-col md="3">
              <v-text-field

                v-model="firstname"
                required
                label="nom"
              ></v-text-field>

    
              <v-text-field

                v-model="lastname"
                required
                label="prenom"
              ></v-text-field>

                   </v-col>
              </v-row>
            <!-- <v-col>
              <v-text-field v-model="ReponseFinal" required> </v-text-field> 
             
            </v-col> -->

            <!-- <v-col>
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
              </v-col> -->
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="teal lighten-2"
                text
                @click.prevent="dateheur(notifications.id)"
                v-on:click="stagiaire(accepter.id)"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>

              <!-- <v-btn color="red" text v-on:click="isaccepted(accepter.id)">
                  <v-icon>mdi-send</v-icon>
                </v-btn> -->
            </v-card-actions>
          </v-form>
          </v-col>

          <!-- </v-col> -->
        </v-card>
        <!-- </v-row> -->
      </v-col>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import NavBar from "@/components/modules/encadrant/NavBar.vue";

export default {
  components: { NavBar },
  name: "NotifacceptStagiaire",
  data: () => ({
    ReponseFinal: "",

    entretien: [],
    // entretien:{id:""},
    candidats: [],
    notifications: { ReponseFinal: "", id: "" },
    // Candidatid: [],
    // Candidat: [],

    id: "",
    dateEntretien: "",
    heurEntretien: "",
    accepter: { role: "" },
    firstname: "",
    lastname: "",
    notificationId: null,
    candidatsId: null,
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
        this.notifications = response.data;
        this.notificationId = response.data.candidats.notifications[0];
        this.candidatsId = response.data.candidats.id;
        console.log(response.data);
        this.firstname = response.data.candidats.firstname;
        this.lastname = response.data.candidats.lastname;
        this.heurEntretien = response.data.heurEntretien;
        this.dateEntretien = response.data.dateEntretien;
            this.dateEntretien = response.data.sujet.titre;
        // this.Candidat = response.data.candidats.notifications.Candidat;
      });
  },

  methods: {
    stagiaire() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/roleStagiaire/" + this.candidatsId,

          this.accepter,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
           this.$router.push("/PlanificationAvis");
        });
    },
    dateheur() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/notifstagiaire/" + this.notificationId.id,

          {
            entretien: this.entretien.id,
      
           ReponseFinal:' Nous avons le plaisir de vous annoncer que votre profil a été retenu au sujet' + this.titre + 'Vous pourrez donc intégrer notre entreprise afin d y effectuer votre stage Nous vous invitons à prendre rapidement contact avec nous afin de convenir d un rendez-vous pour la signature de votre convention de stage.'
             
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