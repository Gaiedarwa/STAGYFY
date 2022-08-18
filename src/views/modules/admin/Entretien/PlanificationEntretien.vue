<template>
  <div>
    <div align="right">
      <v-col cols="9">
        <v-row class="list px-3 mx-auto">
          <v-col cols="14" md="5" align="right">
            <v-text-field label="Search by Title"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-card-actions>
              <v-btn class="mt-n2" elevation="1" fab small>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card class="mx-auto" tile>
              <v-card-title style="background-color: #0db39e"></v-card-title>
              <v-simple-table style="background-color: #fafafa">
                <template>
                  <thead>
                    <tr>
                      <!-- <th style="width: 50px; text-align: center; color: teal">
                        Id
                      </th> -->
                      <th style="color: teal">Photos</th>
                      <th style="color: teal">Nom Prenom</th>

                      <th style="color: teal">Sujets</th>
                      <th style="color: teal"></th>

                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="candidat in candidats" :key="candidat.id">
                      <!-- <td>{{ candidat.id }}</td> -->
                      <td>
                        <v-avatar
                          ><img
                            v-bind:src="`http://127.0.0.1:8000/uploads/${candidat.photo}`"
                            alt="image"
                        /></v-avatar>
                      </td>
                      <td>{{ candidat.firstname }} {{ candidat.lastname }}</td>

                      <td>
                        <v-simple-table style="background-color: #fafafa">
                          <template>
                            <tbody>
                              <tr
                                v-for="entretien in candidat.entretiens"
                                :key="entretien.id"
                              >
                                <!-- <td>
                                  {{ entretien.id }}
                                </td> -->
                                <td>
                                  {{ entretien.sujet.titre }}
                                </td>

                                <td>
                                  <div v-if="entretien.appeler == 1">
                                    <v-icon color="green">mdi-phone</v-icon>
                                  </div>
                                  <div v-else>
                                    <v-icon color="red">mdi-phone</v-icon>
                                  </div>
                                </td>
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
                                      entretien.avisDate == '' &&
                                      entretien.isAcceptedDate == 1
                                    "
                                    style="color: green"
                                  >
                                    Accepté votre date
                                  </p>
                                  <p v-else style="color: blue">
                                    {{ entretien.avisDate }}
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
                                    Accepté votre heur
                                  </p>
                                  <p v-else style="color: blue">
                                    {{ entretien.avisHeur }}
                                  </p>
                                </td>

                                <!-- <td>
                                  <v-dialog width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        text
                                        small
                                        color="red"
                                        class="mr-2"
                                      >
                                        <v-icon small>mdi-delete</v-icon>
                                      </v-btn>
                                    </template>

                                    <v-card>
                                      <v-card-title
                                        class="text-h5 teal lighten-2"
                                      >
                                      </v-card-title>
                                      <v-col>
                                        vouz etez sur de supprimer ce
                                        entretien?!
                                      </v-col>
                                      <v-divider></v-divider>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-dialog width="500">
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-btn
                                              v-bind="attrs"
                                              v-on="on"
                                              text
                                              small
                                              color="red"
                                              @click="
                                                deleteentretien(entretien.id)
                                              "
                                            >
                                              <v-icon small>mdi-delete</v-icon>
                                            </v-btn>
                                          </template>

                                          <v-card>
                                            <v-card-title
                                              class="text-h5 teal lighten-2"
                                            >
                                            </v-card-title>
                                            <v-col>
                                              supprission avec succée
                                            </v-col>
                                          </v-card>
                                        </v-dialog>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>

                                  <v-icon
                                    small
                                    class="mr-2"
                                    color="green"
                                    v-on:click="putdate(entretien.id)"
                                    >mdi-pencil</v-icon
                                  >
                                </td>

 -->

                                <td>
                                  <v-icon
                                    small
                                    class="mr-2"
                                    color="green"
                                    v-on:click="putdate(entretien.id)"
                                    >mdi-pencil</v-icon
                                  >
                                  <v-dialog width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        text
                                        small
                                        color="red"
                                        class="mr-2"
                                      >
                                        <v-icon small>mdi-delete</v-icon>
                                      </v-btn>
                                    </template>

                                    <v-card>
                                      <v-card-title
                                        class="text-h5 teal lighten-2"
                                      >
                                      </v-card-title>
                                      <v-col>
                                        vous etes sur de supprimer ce
                                        entretien?!
                                      </v-col>
                                      <v-divider></v-divider>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-dialog width="500">
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-btn
                                              v-bind="attrs"
                                              v-on="on"
                                              text
                                              small
                                              color="red"
                                              @click="
                                                deleteentretien(entretien.id)
                                              "
                                            >
                                              <v-icon small>mdi-delete</v-icon>
                                            </v-btn>
                                          </template>

                                          <v-card>
                                            <v-card-title
                                              class="text-h5 teal lighten-2"
                                            >
                                            </v-card-title>
                                            <v-col>
                                              suppression avec succée
                                            </v-col>
                                          </v-card>
                                        </v-dialog>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </td>

                                <td>
                                  <v-icon
                                    small
                                    class="mr-2"
                                    color="teal"
                                    v-on:click="idcandidat(entretien.id)"
                                    >mdi-send</v-icon
                                  >
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </td>

                      <td>
                        <v-icon
                          small
                          class="mr-2"
                          color="green"
                          v-on:click="test(candidat.id)"
                          >mdi-plus</v-icon
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

              <!-- <v-card-actions>
                <v-col cols="12" class="text-right">
                  <v-btn color="error" small> Supprimer Tous </v-btn>
                </v-col>
              </v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </div>
    <bar-app></bar-app>

    <nav-bar></nav-bar>
  </div>
</template>
<script>
import axios from "axios";

import NavBar from "@/components/modules/admin/NavBar.vue";
import BarApp from "@/components/modules/admin/BarApp.vue";
import ModifierEntretien from "./ModifierEntretien.vue";

export default {
  components: { NavBar, BarApp, ModifierEntretien },
  name: "PlanificationEntretien",
  data() {
    return {
      candidats: {},
      notifications: { id: "" },

      entretiens: { id: "" },
      sujet: {},
      titre: "",
      // encadrant: "",
      isAcceptedData: false,
      appeler: false,
      dateEntretien: "",
      heurEntretien: "",
      avisDate: "",
      avisHeur: "",

      id: "",
      firstname: "",
      lastname: "",
      photo: new FormData(),
    };
  },
  created() {
    this.getentretien();
  },
  methods: {
    getentretien() {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/getEntretien", {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then((response) => {
          this.candidats = response.data;
          this.entretiens = response.data;

          this.entretiens.sujet = response.data[0].sujet.titre;
          console.log(this.candidats);

          console.log(this.entretiens.id);

          console.log(this.sujet.sujet);
        });
    },
    deleteentretien(id) {
      const token = localStorage.getItem("token");
      {
        axios
          .delete("http://127.0.0.1:8000/api/suppEntretien/" + id, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(
            setTimeout(() => {
              location.reload();
            }, 200)
          );
      }
    },
    test(id) {
      this.$router.push({ name: "PostulerEntretien", params: { id: id } });
    },

    putdate(id) {
      this.$router.push({ name: "ModifierEntretien", params: { id: id } });
    },
    idcandidat(id) {
      this.$router.push({ name: "notifEntretien", params: { id: id } });
    },
  },
};
</script>
