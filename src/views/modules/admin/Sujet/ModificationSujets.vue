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
            >Modifier votre Sujet
          </v-card-title>

          <v-col md="11">
             <v-alert v-model="error" :color="colorAlert" icon="mdi-alert">modifié avec succès!</v-alert>
     
            <v-form ref="form" lazy-validation>
              <v-text-field
                label="Titre"
                v-model="sujets.titre"
                :rules="[(v) => !!v || 'Titre est requis']"
                required
              ></v-text-field>
              <v-textarea
                v-model="sujets.description"
                :rules="[(v) => !!v || 'Description est requis']"
                label="Description"
                required
              ></v-textarea>
              <v-textarea
                v-model="sujets.technologie"
                :rules="[(v) => !!v || 'Technologie est requis']"
                label="Technologie"
                required
              ></v-textarea>

              <v-row>
                <v-col cols="12" class="text-right">
                  <v-btn
                        color="teal"
                        small
                        class="mr-4"
                        v-on:click="putsujet(sujets.id)"
                        ><v-spam style="color: white"> modifier</v-spam>
                      </v-btn>
                      
                      <v-dialog width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="error"
                            small
                            class="mr-4"
                          >
                            Supprimer
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 teal lighten-2">
                          </v-card-title>
                          <v-col> Êtes-vous sûr de vouloir supprimer?</v-col>
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
                                <v-col> supprimé avec succès</v-col>
                              </v-card>
                            </v-dialog>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn
                        color="teal"
                        dark
                        class="mb-2"
                        text
                        router
                        to="/ListSujets"
                      >
                        <v-icon left> mdi-arrow-right-bottom</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-card>
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
  name: "ModificationSujets",
  data() {
    return {
      sujets: { titre: "", description: "", technologie: "" },
      id: "",
      titre: "",
      description: "",
      technologie: "",
      msgAlert: "",
    error: false,
    colorAlert: "",
    };
  },

  created() {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/Sujets_id/" + this.$route.params.id, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        this.sujets = response.data;

        console.log(response.data);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    putsujet(id) {
      const token = localStorage.getItem("token");
      axios
        .put("http://127.0.0.1:8000/api/Sujets/" + id, this.sujets, {
          headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
          console.log(response.status);
          if (response.status == 201) {
            this.msgAlert = response.data;
            this.error = true;
            this.colorAlert = "success";
           
              
               setTimeout(() => {
this.$router.push("/ListSujets");
             
            }, 2000);
          
            
          
          }
           
          
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
