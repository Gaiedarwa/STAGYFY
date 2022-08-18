<template>
  <div>
    <bar-app></bar-app>

    <nav-bar></nav-bar>
    <br />
    <div align="right" class="my-13">
      <v-col cols="9">
        <v-row class="list px-3 mx-auto">
          <v-col cols="14" md="8">
            <!-- <v-text-field label="Search by Title"></v-text-field> -->
          </v-col>
          <v-col cols="12" md="4">
            <v-card-actions>
              <v-btn class="mt-n2" elevation="1" fab small>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn color="teal" to="/PostulerSujets">
                <v-spam style="color: white">Ajouter Sujet +</v-spam>
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card class="mx-auto" tile style="color: teal">
              <v-card-title style="background-color: #0db39e"></v-card-title>
              <v-simple-table style="background-color: #fafafa">
                <template>
                  <thead>
                    <tr>
                      <!-- <th style="width: 50px; text-align: center; color: teal">
                        Id
                      </th> -->
                      <th style="color: teal">Titre</th>
                      <th style="color: teal">Description</th>
                      <th style="color: teal">Technologies</th>
                      <th style="color: teal">Sujet affecté</th>
                      <th style="color: teal">Employé</th>
                      <th style="color: teal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="sujet in sujets" :key="sujet.id">
                      <!-- <td>{{ sujet.id }}</td> -->
                      <td>{{ sujet.titre }}</td>
                      <td>{{ sujet.description }}</td>
                      <td>{{ sujet.technologie }}</td>
                      <td></td>
                      <td>
                        {{ sujet.employe.firstname }}
                        {{ sujet.employe.lastname }}
                      </td>
                      <td style="border-collapse: collapse">
                        <v-row>
                          <v-icon
                            small
                            class="mr-2"
                            color="green"
                            @click="testsujet(sujet.id)"
                            >mdi-pencil</v-icon
                          >

                          <router-view></router-view>

                          <v-dialog width="500">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                v-on="on"
                                text
                                small
                                color="red"
                              >
                                <v-icon small>mdi-delete</v-icon>
                              </v-btn>
                            </template>

                            <v-card>
                              <v-card-title class="text-h5 teal lighten-2">
                              </v-card-title>
                              <v-col>
                              vous êtes sur de supprimer ce sujet?!
                              </v-col>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-dialog width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      v-bind="attrs"
                                      v-on="on"
                                      text
                                      small
                                      color="red"
                                      @click="deletedata(sujet.id)"
                                    >
                                      <v-icon small>mdi-delete</v-icon>
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title
                                      class="text-h5 teal lighten-2"
                                    >
                                    </v-card-title>
                                    <v-col> suppression effectuée avec succès </v-col>
                                  </v-card>
                                </v-dialog>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-row>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

              <v-card-actions>
                <v-col cols="12" class="text-right">
                  <!-- <v-btn color="error" small @click="deleteAlldata(sujet.id)">
                    Supprimer Tous
                  </v-btn> -->
                  <v-dialog width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
               
                        small
                        color="red"
                        class="mr-2"
                      >
                        supprimer tous
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 teal lighten-2">
                      </v-card-title>
                      <v-col> vous etes sur de supprimer les sujets?! </v-col>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-dialog width="500">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              text
                              small
                              color="red"
                              @click="deleteAlldata(sujet.id)"
                            >
                              <v-icon small>mdi-delete</v-icon>
                            </v-btn>
                          </template>

                          <v-card>
                            <v-card-title class="text-h5 teal lighten-2">
                            </v-card-title>
                          </v-card>
                        </v-dialog>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-card-actions>
            </v-card>
            <br />
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="4"
                circle
                color="teal lighten-2"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>
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

  name: "ListSujets",
  data() {
    return {
      sujets: {},
      id: "",
      titre: "",
      descriptions: "",
      technologie: "",

      firstname: "",
      lastname: "",
      page: 1,
    };
  },
  created() {
    this.getsujets();
  },
  methods: {
    getsujets() {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/SujetsEmlployes", {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then((response) => {
          this.sujets = response.data;
          // this.employe = response.data[0].employe;
          console.log(this.sujets);
          console.log(this.employe.employe);
        });
    },

    deletedata(id) {
      const token = localStorage.getItem("token");
      {
        axios
          .delete("http://127.0.0.1:8000/api/suppSujets/" + id, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(
            setTimeout(() => {
              location.reload();
            }, 200)
          );
      }
    },
    deletedataAll(id) {
      const token = localStorage.getItem("token");
      {
        axios
          .delete("http://127.0.0.1:8000/api/cleansujet", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(
            setTimeout(() => {
              location.reload();
            }, 200)
          );
      }
    },

    testsujet(id) {
      this.$router.push({ name: "ModificationSujets", params: { id: id } });
    },
  },
};
</script>
