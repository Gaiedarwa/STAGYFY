<template>
  <div>
    <bar-app></bar-app>

    <nav-bar></nav-bar>
    <br />
    <div align="right" class="my-16">
      <v-col cols="9">
        <!-- <v-row class="list px-3 mx-auto"> -->
        <v-card
          center
          width="900"
          class="mx-auto my-12"
          style="background-color: #fafafa"
        >
          <v-alert v-model="error" :color="colorAlert" icon="mdi-alert"
            >ajouter un entretien avec succès!</v-alert
          >
          <v-card-title
            class="teal lighten-2 white--text text-h5"
            justify="center"
            >Modifier Entretien
          </v-card-title>

          <v-col>
            <v-form ref="form" lazy-validation>
              <v-card-text>
                <v-row>
                  <v-col md="6">
                    <v-checkbox
                      color="green"
                      v-model="appeler"
                      required
                      hide-details
                      label="confirmer l'appel au candidat : "
                    ></v-checkbox>
                  </v-col>
                  <v-col md="3">
                    <v-text-field
                      v-model="firstname"
                      required
                      label="prenom"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="lastname"
                      required
                      label="nom"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="avisDate"
                  :rules="[(v) => !!v || 'Avis est requis']"
                  label="Avis Date Encadrant"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="avisHeur"
                  :rules="[(v) => !!v || 'Avis est requis']"
                  label="Avis Heur Encadrant"
                  required
                ></v-text-field>

                <v-col cols="12" lg="10">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dateEntretien"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateEntretien"
                        label="Date Enretien"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateEntretien" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(dateEntretien)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <!-- <v-text-field
                  prepend-icon="mdi-clock-time-four-outline"
                  v-model="heurEntretien"
                  label="heur Entretien"
                  required
                ></v-text-field> -->
                <v-col cols="11" sm="5">
                  <!-- <v-dialog
                    ref="dialog"
                    v-model="modal2"
                    :return-value.sync="heurEntretien"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="heurEntretien"
                        label="Heur Entretien"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="modal2"
                      ampm-in-title
                      v-model="heurEntretien"
                      full-width
                      no-title
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal2 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(heurEntretien)"
                      >
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog> -->
                  <v-text-field
                    v-model="heurEntretien"
                    :rules="[(v) => !!v || 'Avis est requis']"
                    label="Avis Heur Encadrant"
                    required
                  ></v-text-field>
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn color="teal" small @click.prevent="putEntretien()">
                      Ajouter
                    </v-btn>
                    <v-btn
                      color="teal"
                      dark
                      class="mb-2"
                      text
                      router
                      to="/PlanificationEntretien"
                    >
                      <v-icon left> mdi-arrow-right-bottom</v-icon> retour
                    </v-btn>
                  </v-col>
                </v-row>
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
<script></script>
<script>
import axios from "axios";
import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";

export default {
  components: { NavBar, BarApp },
  name: "ModifierEntretien",
  data: () => ({
    entretien: [],
    dateEntretien: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    heurEntretien: "",

    e7: [],

    id: "",
    heurEntretien: "",
    avisDate: "",
    avisHeur: "",

    menu: false,
    dateEntretien: "",
    heurEntretien: "",
    avisDate: "",
    avisHeur: "",
    appeler: false,
    firstname: "",
    lastname: "",
    error: "",

    modal2: false,
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

        console.log(response.data);
        this.firstname = response.data.candidats.firstname;
        this.lastname = response.data.candidats.lastname;
        // this.heurEntretien = response.data.heurEntretien;
        this.dateEntretien = response.data.dateEntretien;
        this.heurEntretien = response.data.heurEntretien;
        this.avisDate = response.data.avisDate;
        this.avisHeur = response.data.avisHeur;
        // this.Candidat = response.data.candidats.notifications.Candidat;
      });
  },
  methods: {
    putEntretien() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/EntretienModif/" + this.$route.params.id,

          {
            dateEntretien: this.dateEntretien,
            heurEntretien: this.heurEntretien,
            appeler: this.appeler,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
