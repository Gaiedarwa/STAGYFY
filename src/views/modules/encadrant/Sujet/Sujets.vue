<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs15 sm12 md12>
        <nav-bar></nav-bar>
        <v-sheet height="45"></v-sheet>
        <br />
        <br />
        <br />
        <br />
        <v-img
          alt="dotit Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/Capture d’écran 2022-05-22 224811.png')"
          max-height="300"
        />
        <br />
        <br />

        <v-col>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="teal" to="/POST">
              <v-spam style="color: white">Ajouter Sujet +</v-spam>
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
                    <th style="width: 50px; text-align: center; color: teal">
                      Id
                    </th>
                    <th style="color: teal">Titre</th>
                    <th style="color: teal">Description</th>
                    <th style="color: teal">Technologies</th>
                    <th style="color: teal">Employé</th>
                    <th style="color: teal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sujet in sujets" :key="sujet.id">
                    <td>{{ sujet.id }}</td>
                    <td>{{ sujet.titre }}</td>
                    <td>{{ sujet.description }}</td>
                    <td>{{ sujet.technologie }}</td>
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
                          v-if="sujet.employe.id == tt "
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
                              v-if="sujet.employe.id == tt    "                        >
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
                                  <v-card-title class="text-h5 teal lighten-2">
                                  </v-card-title>
                                  <v-col>suppression effectuée avec succès </v-col>
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
        </v-col> </v-flex></v-layout
  ></v-container>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/modules/encadrant/NavBar.vue";

export default {
  components: { NavBar },

  name: "Sujets",
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
      tt: "",
    };
  },
  created() {
    this.getsujets();
  },
  methods: {
    getsujets() {
      const token = localStorage.getItem("token");
      this.tt = localStorage.getItem("idE");
      axios
        .get("http://127.0.0.1:8000/api/SujetsEmlployes", {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then((response) => {
          this.sujets = response.data;

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

    testsujet(id) {
      this.$router.push({ name: "Update", params: { id: id } });
    },
  },
};
</script>
