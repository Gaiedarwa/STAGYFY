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
          <v-card-title
            class="teal lighten-2 white--text text-h5"
            justify="center"
            >Planifier Entretien
          </v-card-title>

          <v-col md="11">
            <v-form ref="form" lazy-validation>
              <v-card-text>
                  <v-alert
                      v-model="error"
                      :color="colorAlert"
                      icon="mdi-alert"
                      >ajouter un entretien avec succès!</v-alert
                    >
                <v-row>
                  <v-col>
                  
                    <v-text-field
                      v-model="candidats.firstname"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col>
                    <v-text-field
                      v-model="candidats.lastname"
                      required
                    ></v-text-field></v-col
                ></v-row>
                <v-text-field v-model="employe" required></v-text-field>
                <!-- 
                  <v-checkbox
                    prepend-icon="mdi-phone"
                    color="green"
                    v-model="appeler"
                    required
                    hide-details
                  ></v-checkbox> -->

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
                        label="Picker in menu"
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

                <v-text-field
                  prepend-icon="mdi-clock-time-four-outline"
                  v-model="heurEntretien"
                  label="heur Entretien"
                  required
                ></v-text-field>

                <!-- <v-select
                  v-model="encadrantsid"
                  :items="encadrants"
                  label="choisir un encadrant"
                  multiple
                  chips
                  persistent-hint
                  item-text="firstname"
                  item-value="id"
                  dense
                >
                  <option v-for="encadrant in encadrants" :key="encadrant.id">
                    {{ encadrant.id }}
                    {{ encadrant.firstname }} {{ encadrant.lastname }}
                  </option>
                </v-select> -->
                <v-select
                  v-model="sujetid"
                  :items="sujet"
                  label="choisir un sujet"
                  multiple
                  chips
                  persistent-hint
                  item-text="titre"
                  item-value="id"
                  dense
                  @change="tkry()"
                >
                  <option v-for="Sujet in sujet" :key="Sujet.id">
                    {{ Sujet.titre }}
                  </option>
                </v-select>

                <!-- <v-text-field
                    v-model="avisEncadrant"
                    label="avisEncadrant"
                    required
                  ></v-text-field> -->
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn color="teal" small v-on:click="postEntretien()">
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

<script>
import axios from "axios";
import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";

export default {
  components: { NavBar, BarApp },
  name: "PostulerEntretien",

  data: () => ({
    candidats: [],
    encadrantsid: [],
    sujetid: [],
    employeId: "",
    encadrants: [],
    entretiens: [],
    firstname: "",
    lastname: "",
    sujet: [],
    e7: [],
    employe: "",
    id: "",
    msgAlert: "",
    error: false,
    colorAlert: "",
    // appeler: false,

    menu: false,
    dateEntretien: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    heurEntretien: "",
    avisDate: "",
    avisHeur: "",
  }),
  methods: {
    tkry() {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/getparidsujet/" + this.sujetid, {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then((response) => {
          console.log(response.data);
          this.employe =
            response.data[0].employe.firstname +
            response.data[0].employe.lastname;
          this.employeId = response.data[0].employe.id;
        });
      // console.log(this.sujetid);
    },
    postEntretien() {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/addEntretien",
          {
            candidats: this.candidats.id,
            // appeler: this.appeler,
            dateEntretien: this.dateEntretien,
            heurEntretien: this.heurEntretien,
            avisDate: this.avisDate,
            avisHeur: this.avisHeur,
            encadrants: this.employeId,
            sujet: this.sujetid[0],
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
              this.$router.push("/PlanificationEntretien");
            }, 2000);
          }
        });
    },
    // getencadrants() {
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get("http://127.0.0.1:8000/api/getencadrants", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })

    //     .then((response) => {
    //       this.encadrants = response.data;

    //       console.log(this.encadrants);
    //     });
    // },

    getsujettrier() {
      // console.log(this.$route.params.id);
      // this.sujet.id = this.$route.params.id;
      const token = localStorage.getItem("token");
      axios
        .get(
          "http://127.0.0.1:8000/api/getsujetstrierparcandidat/" +
            this.$route.params.id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          this.sujet = response.data[0].sujet;
          console.log(this.sujet.sujet);
        });
    },
  },
  created() {
    console.log(this.$route.params.id);
    this.candidats.id = this.$route.params.id;
    const token = localStorage.getItem("token");
    axios
      .get(
        "http://127.0.0.1:8000/api/get_Candidat_id2/" + this.$route.params.id,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.candidats = response.data;
        // this.candidats.lastname = response.data.lastname;
        console.log(this.candidats);
      }),
      // this.getencadrants();
      this.getsujettrier();
  },
};
</script>
