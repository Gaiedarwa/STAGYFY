<template>
  <div>
    <bar-app></bar-app>

    <nav-bar></nav-bar>
    <br />
    <div align="right" class="my-16">
      <v-col cols="9">
        <!-- <v-row class="list px-3 mx-auto"> -->
        <v-card center width="900" class="mx-auto my-12" style="background-color: #fafafa">
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
                <v-col md="6">
                  <v-text-field
                    label="vous etes sur d'envoyer une notifications a :"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col md="3">
                  <v-text-field
                    v-model="firstname"
                    required
                    label="prenom"
                  ></v-text-field>

                  <v-text-field
                    v-model="lastname"
                    required
                    label="nom"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6">
                  <v-text-field
                    label="au date  et heur  :"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col md="3">
                  <v-text-field
                    v-model="heurEntretien"
                    required
                    label="heur Entretien"
                  ></v-text-field>

                  <v-text-field
                    v-model="dateEntretien"
                    required
                    label="date"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6">
                  <v-text-field label="A propos" disabled></v-text-field>
                </v-col>
                <v-col md="3">
                  <v-text-field
                    v-model="titre"
                    requiredimage.png
                    label="Tire de sujet"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- <v-col>
                <v-text-field
                  v-model="NotifDateEntretien"
                  required
                  @click:clear="clearMessage"
                  filled
                  clear-icon="mdi-close-circle"
                  clearable
                  type="text"
                >
                </v-text-field>
              </v-col> -->
              <!-- <v-col>
                <v-textarea
                  v-model="NotifDateEntretien"
                  required
                ></v-textarea>
              </v-col> -->

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="teal lighten-2"
                  text
                  v-on:click="dateheur(notifications.id)"
                >
                  <v-icon>mdi-send</v-icon>
                </v-btn>
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
import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";

export default {
  components: { NavBar, BarApp },
  name: "notifEntretien",
  data: () => ({
    NotifDateEntretien:
      "Nous voulons savoir si vous êtes encore intéressés par les sujets PFE proposés par notre entreprise , on vous invite à une entretien  qui aura le ",

    entretien: [],
    // entretien:{id:""},
    candidats: [],
    notifications: { ReponseFinal: "", id: "", NotifDateEntretien: "" },
    // Candidatid: [],
    // Candidat: [],
    sujet: [],
    titre: "",
    id: "",
    dateEntretien: "",
    heurEntretien: "",

    firstname: "",
    lastname: "",
    notificationId: null,
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
        this.sujet = response.data;
        // this.notifications.Candidat.id = response.data;
        this.entretien.id = response.data;
        this.notifications = response.data;
        this.notificationId = response.data.candidats.notifications[0];
        console.log(response.data);
        this.titre = response.data.sujet.titre;
        this.firstname = response.data.candidats.firstname;
        this.lastname = response.data.candidats.lastname;
        this.heurEntretien = response.data.heurEntretien;
        this.dateEntretien = response.data.dateEntretien;
        // this.titre = response.data.sujet.titre;

        // this.Candidat = response.data.candidats.notifications.Candidat;
      });
  },

  methods: {
    dateheur() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/reponseEntretien/" +
            this.notificationId.id,

          {
            entretien: this.entretien.id,
            NotifDateEntretien:
              this.NotifDateEntretien +
              this.dateEntretien +
              " à" +
              this.heurEntretien +
              "concernant le sujet " +
              this.titre,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
        });
    },
    clearMessage() {
      this.NotifDateEntretien = "";
    },
    // .put(
    //   "http://127.0.0.1:8000/api/reponseautreentretien",
    //   {
    //     entretien: this.entretien.id,
    //     // Candidat: this.Candidat.id,
    //     // Candidat: this.CandidatId,
    //     Reponse: this.Reponse,
    //     NotifDateEntretien:
    //       this.NotifDateEntretien +
    //       this.dateEntretien +
    //       this.heurEntretien +
    //       "nous avons le plaisir de vous informer que votre candidature pour un poste de stagiaire ",
    //     ReponseFinal: this.ReponseFinal,
    //   },

    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // )
    // .then((response) => {
    //   console.log(response);
    // });
  },
};
</script>