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

          <v-col md="11">
             <v-alert v-model="error" :color="colorAlert" icon="mdi-alert" >La notification est envoyé  avec succès </v-alert>
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
                    v-model="Candidat.firstname"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="Candidat.lastname"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-col>
                <v-text-field
                  v-model="Reponse"
                  required
                  @click:clear="clearMessage"
                  filled
                  clear-icon="mdi-close-circle"
                  clearable
                  type="text"
                >
                </v-text-field>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="teal lighten-2"
                  text
                  @click.prevent="notifaccptcandidat()"
                  v-on:click="isaccepted(accepter.id)"
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
import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";

export default {
  components: { NavBar, BarApp },
  name: "NotifacceptCandidat",
  data: () => ({
    Candidat: {
      firstname: "",
      lastname: "",
      id: "",
      Reponse: "",
      NotifDateEntretien: "",
      ReponseFinal: "",
    },
     msgAlert: "",
    error: false,
    colorAlert: "",

    accepter: { isAccepted: false },
    isAccepted: false,
    NotifDateEntretien: "",
    firstname: "",
    lastname: "",
    Reponse:
      "Nous avons le plaisir de vous informer que la candidature que vous nous avez adressée  a retenu toute notre attention,Nous nous engageons à vous repondre dans les meilleurs delais pour faire un entretien.",
    id: "",
    // Reponse: "vous etes accepter firstaccept",
  }),

  methods: {
    notifaccptcandidat() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/PremierReponsenotif",
          {
            Candidat: this.Candidat.id,
            Reponse: this.Reponse,
            NotifDateEntretien: this.NotifDateEntretien,
            ReponseFinal: this.ReponseFinal,
          },

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
         .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            this.msgAlert = response.data;
            this.error = true;
            this.colorAlert = "success";
           
              
        setTimeout(() => {

              this.error = false;
            }, 1500);
            return;
            
          
          }
           
          
        });
    },
    // hedhi par id eli jey mel candidat
    isaccepted() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/isAcceptedCandidat/" +
            this.$route.params.id,
          this.accepter,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
        });
    },
    clearMessage() {
      this.Reponse = "";
    },
  },
  created() {
    console.log(this.$route.params.id);
    this.Candidat.id = this.$route.params.id;
    const token = localStorage.getItem("token");
    axios
      .get(
        "http://127.0.0.1:8000/api/get_Candidat_id2/" + this.$route.params.id,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        this.Candidat.firstname = response.data.firstname;
        this.Candidat.lastname = response.data.lastname;
        console.log(this.Candidat);
      });
  },
};
</script>
