<template>
  <v-container fill-height>
   
      <v-layout align-center justify-center>
         <v-flex xs12 sm8 md8>
        <v-card>
          <v-list style="background-color: #0db39e ">
            <v-list-item >
              

              <v-list-item-content >
                <!-- <v-list-item-title> {{ encadrant[0].firstname }} {{ encadrant[0].lastname }}</v-list-item-title> -->
                <v-list-item-title>changer votre mot de passe?</v-list-item-title>
                <!-- <v-list-item-subtitle>{{ encadrant.email }}</v-list-item-subtitle> -->
              </v-list-item-content>

              <v-list-item-action>
                <!-- <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav"> -->
                  <!-- <v-icon></v-icon>
                </v-btn> -->
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list style="background-color: #fafafa">
          <v-alert v-model="error" :color="colorAlert" icon="mdi-alert">votre mot de passe à été changé avec succès </v-alert>
              <v-text-field
            prepend-icon="mdi-lock"
            label="saisir un nouveau mot de passe"
            type="password"
            v-model="password"
            :rules="[rules.required]"
          >
          </v-text-field>
         
              <v-text-field 
                v-model="confirm_password"
                type="password"
                prepend-icon="mdi-lock"
                label="Confirme mot de passe"
                :rules="[rules.required]"
                :error="!valid()"
              >
              </v-text-field>
            <!-- <v-list-item>
              <v-list-item-action>
                <v-switch v-model="message" color="purple"></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable messages</v-list-item-title>
            </v-list-item> -->

            <!-- <v-list-item>
              <v-list-item-action>
                <v-switch v-model="hints" color="purple"></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable hints</v-list-item-title>
            </v-list-item> -->
          </v-list>

          <!-- <v-card-actions>
            <v-spacer></v-spacer> -->

            <!-- <v-btn text @click="menu = false"> Cancel </v-btn>
            <v-btn color="primary" text @click="menu = false"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </div> -->
  
          <v-card-actions class="justify-end" style="background-color: #fafafa"> 
            <v-btn @click="changer()" color="teal">modifier</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  
</v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "PassEncadrant",
  data: () => ({
   
    menu: false,
    message: false,
    hints: true,
    email:"",
    password: "",
    confirm_password: "",
    firstname: "",
    lastname: "",
    photo: "",
    encadrant: [],
        msgAlert: "",
    error: false,
    colorAlert: "",

    rules: {
      required: (value) => !!value || "Required",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  created() {
    this.getencadrant();
  },
  methods: {
    valid() {
      return this.password === this.confirm_password;
    },
    empty() {
      if (this.field.value) {
        return this.field.value.length === 0;
      }
      return true;
    },
    changer() {
      const token = localStorage.getItem("token");
      axios
        .put(
          `http://127.0.0.1:8000/api/changerpasswordEmploye/${localStorage.getItem(
            "idE"
          )}`,
          {
            password: this.password,
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
      //  this.$router.push("/Sujets");  
    },
    getencadrant() {
      const token = localStorage.getItem("token");

      axios
        .get(
          `http://127.0.0.1:8000/api/encadrantconnecte/${localStorage.getItem(
            "id"
          )}`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          this.encadrant = response.data;

          console.log(response.data);
        });
    },
  },
};
</script>
