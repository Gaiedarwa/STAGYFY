<template>
  <div>
    <div align="right" class="my-13">
      <v-col cols="9">
        <v-row class="list px-3 mx-auto">
          <v-col cols="14" md="8">
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
              <v-card-title style="background-color: #0db39e "></v-card-title>

              <v-simple-table  style="background-color: #fafafa">
                <template >
                  <thead>
                    <tr>
                      <!-- <th style="width: 50px; text-align: center; color: teal">
                        Id
                      </th> -->
                      <th style="color: teal">Nom et Prenom</th>

                      <th style="color: teal">Photo</th>
                      <th style="color: teal">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="stagiaire in stagiaires[0]" :key="stagiaire.id">
                      <!-- <td v-if="stagiaire.roles[0] == 'ROLE_STAGIAIRE'">
                        {{ stagiaire.id }}
                      </td> -->

                      <td v-if="stagiaire.roles[0] == 'ROLE_STAGIAIRE'">
                        {{ stagiaire.firstname }}

                        {{ stagiaire.lastname }}
                      </td>
                      <td v-if="stagiaire.roles[0] == 'ROLE_STAGIAIRE'">
                        <v-avatar
                          ><img
                            v-bind:src="`http://127.0.0.1:8000/uploads/${stagiaire.photo}`"
                            alt="image"
                        /></v-avatar>
                      </td>
                      <td v-if="stagiaire.roles[0] == 'ROLE_STAGIAIRE'">
                       
                         {{
                        stagiaire.roles[0] == "ROLE_STAGIAIRE"
                          ? "stagiaire"
                          : ""
                      }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
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

export default {
  components: { NavBar, BarApp },

  name: "FinalVue",
  data: () => ({
    stagiaires: [],
    firstname: "",
    lastname: "",
    id: "",
    roles: "",
    photo: "",
  }),

  mounted() {
    this.getstagiaires();
  },
  methods: {
    getstagiaires() {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/role", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          //      this.stagiaires = response.data.filter(
          //       (element) => element.roles == "ROLE_STAGIAIRE");
          //        console.log(response.data);
          //          console.log(response.data.roles);
          //          var tab1 = this.stagiaires.map((datum) => {
          //       return {
          //         roles: datum.roles,

          //       };
          // });

          this.stagiaires = response.data;
          console.log(this.stagiaires);

          // this.roles = response.data.filter(
          //   (data) => data.roles == "ROLE_STAGIAIRE"
          // );
          // console.log(response.data);
        });
    },
  },
};
</script>
