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
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <v-card-title style="background-color: #0db39e"></v-card-title>
              <v-simple-table style="background-color: #fafafa">
                <template>
                  <thead>
                    <tr>
                      <!-- <th style="width: 50px; text-align: center; color: teal">
                        Id
                      </th> -->
                      <th style="color: teal">NOM</th>
                      <th style="color: teal">PRENOM</th>
                      <th style="color: teal">EMAIL</th>
                      <th style="color: teal">ROLES</th>
                      <th style="color: teal">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="employe in employes" :key="employe.id">
                      <!-- <td>{{ employe.id }}</td> -->
                      <td>{{ employe.firstname }}</td>
                      <td>{{ employe.lastname }}</td>
                      <td>{{ employe.email }}</td>

                      <td>
                        {{
                          employe.roles[0] == "ROLE_ENCADRANT"
                            ? "Encadrant"
                            : "Employe"
                        }}
                      </td>

                      <td style="border-collapse: collapse">
                        <v-row>
                          <v-dialog width="500">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn v-bind="attrs" v-on="on" text small
                                ><v-icon small class="mr-2" color="green"
                                  >mdi-pencil</v-icon
                                ></v-btn
                              >
                            </template>

                            <v-card>
                              <v-card-title
                                class="white--text text-h5 teal lighten-2"
                              >
                              </v-card-title>

                              <v-card-text class="text-h5 lighten-2">
                                modifier Roles?
                              </v-card-text>
                              <v-card-actions class="justify-end">
                                <v-btn @click="encadrant(employe.id)"
                                  >Encadrant</v-btn
                                >
                                <v-btn @click="modemploye(employe.id)"
                                  >Employé(e)</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-dialog>

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
                                vouz etes sur de supprimer ce compte?!
                              </v-col>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="red"
                                  @click="deletedata(employe.id)"
                                >
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
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
  name: "ComtpeEmploye",
  data() {
    return {
      employes: {},
      firstname: "",
      lastname: "",
      email: "",
      id: "",
      roles: "",
    };
  },

  created() {
    this.getemployes();
  },
  methods: {
    getemployes() {
      const token = localStorage.getItem("token");

      axios
        .get("http://127.0.0.1:8000/api/employe", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.employes = response.data;
          console.log(response.data);
        });
    },
    deletedata(id) {
      const token = localStorage.getItem("token");
      {
        axios
          .delete("http://127.0.0.1:8000/api/employe/" + id, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(
            setTimeout(() => {
              location.reload();
            }, 200)
          );
      }
    },
    encadrant(id) {
      const token = localStorage.getItem("token");
      {
        axios
          .put(
            "http://127.0.0.1:8000/api/rolesEncadrant/" + id,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            this.profil = response.data;

            console.log(response.data);
          });
      }
    },
    modemploye(id) {
      const token = localStorage.getItem("token");
      {
        axios
          .put(
            "http://127.0.0.1:8000/api/rolesEmploye/" + id,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            this.profil = response.data;

            console.log(response.data);
          });
      }
    }, ///////???????????????????????????????????????????????
  },
};
</script>
