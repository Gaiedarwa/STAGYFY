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
                  v-on:click="notifrefcandidat()"
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
  name: "NotifrefCandidat",
  data: () => ({
    Candidat: {
      firstname: "",
      lastname: "",
      id: "",
      Reponse: "",
      NotifDateEntretien: "",
    },

    firstname: "",
    lastname: "",
    Reponse: "Nous avons examiné avec attention votre dossier. Malgré sa grande valeur, il ne répond pas entièrement à nos critères de sélections Nous vous remercions de lintérêt porté à l’égard de notre entreprise et notre groupe et vous souhaitons la meilleure des chances dans vos démarches",
    id: "",
    NotifDateEntretien: "",
    // Reponse: "vous etes accepter firstaccept",
  }),

  methods: {
    notifrefcandidat() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/PremierReponsenotif",
          { Candidat: this.Candidat.id, Reponse: this.Reponse },

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
