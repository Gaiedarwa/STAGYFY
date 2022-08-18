<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Etape1</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Etape2</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Etape3</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- <v-alert :value="error" color="error" icon="mdi-alert"
              >This user already exists, try a different set of data.</v-alert
            > -->
            <v-stepper-content step="1">
              <v-text-field
                prepend-icon="mdi-pencil-box"
                label="sujet"
                v-model="sujets.titre"
                :rules="[rules.required]"
              ></v-text-field>

              <!-- v-model="sujets.titre"
              >
              </v-text-field> -->

              <v-text-field
                prepend-icon="mdi-account"
                v-model="firstname"
                label="nom"
                :rules="[rules.required]"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                v-model="lastname"
                label="prenom"
                :rules="[rules.required]"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-email"
                label="email"
                v-model="email"
                :rules="[rules.required, rules.email]"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                label="mot de passe"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                counter
                v-model="password"
                @click:append="show1 = !show1"
              >
              </v-text-field>
              <v-text-field
                v-model="confirm_password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                counter
                prepend-icon="mdi-lock"
                label="Confirme mot de passe"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                :error="!valid()"
                @click:append="show1 = !show1"
              >
              </v-text-field>
              <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-text-field
                v-model="Phone"
                maxlength="8"
                label="numero de telephone"
                prepend-icon="mdi-phone"
                :rules="[rules.required, rules.min1]"
              >
              </v-text-field>
              <!-- <v-text-field
                v-model="dateBirth"
                label="date de naissance"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
              >
              </v-text-field> -->

              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dateBirth"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateBirth"
                    label="date de naissance"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateBirth" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(dateBirth)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-text-field
                v-model="competence"
                label="competences"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
              >
              </v-text-field>
              <v-file-input
                v-model="photo"
                label="photo "
                filled
                prepend-icon="mdi-camera"
                :rules="[rules.required]"
              ></v-file-input>
              <v-file-input
                multiple
                label="cv"
                v-model="cv"
                :rules="[rules.required]"
              ></v-file-input>
              <v-file-input
                multiple
                label="lettre de motivation"
                v-model="lettreDeMotivation"
                :rules="[rules.required]"
              ></v-file-input>
              <v-file-input
                multiple
                v-model="attestation"
                label="attestation"
                :rules="[rules.required]"
              ></v-file-input>
            </v-stepper-content>

            <v-stepper-content step="2">
              <!-- <v-layout>
                <v-flex sm6 class="pa-2">
                  <v-card class="elevation-3">
                    <v-img
                      alt="dotit Logo"
                      class="shrink mr-2"
                      contain
                      :src="require('@/assets/images (1).jpg')"
                      transition="scale-transition"
                      width="1000"
                      height="200"
                    />
                  </v-card>
                </v-flex>
              </v-layout> -->

              <v-btn @click="e1 = 1" color="warning">précédent</v-btn>

              <v-btn color="primary" @click.prevent="profil()" @click="e1 = 3">
                postuler
              </v-btn>
            </v-stepper-content>
            <!-- <div v-if="empty" class="empty">Must not be empty</div> -->
            <v-stepper-content step="3">
              <v-alert v-model="error" :color="colorAlert" icon="mdi-alert">{{
                msgAlert
              }}</v-alert>
              <v-btn @click="e1 = 1" color="warning" v-if="aa">précédent</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "MultiStepForm",
  data: () => ({
    firstname: "",
    lastname: "",
    email: "",
    show1: false,

    // sujets: "",
    menu: false,
    password: "",
    confirm_password: "",
    Phone: "",
    dateBirth: "",
    competence: "",
    cv: new FormData(),
    lettreDeMotivation: new FormData(),
    attestation: new FormData(),
    photo: new FormData(),
    error: false,
    e1: 1,
    aa: false,
    sujets: { id: "", titre: "" },
    id: "",
    titre: "",
    msgAlert: "",
    error: false,
    colorAlert: "",

    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      min1: (v) => v.length == 8,

      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
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
    profil() {
  

      if (
        (this.firstname == "" ||
        this.lastname == "" ||
        this.email == "" ||
        this.sujets == "" ||
        this.password == "" ||
        this.Phone == "" ||
        this.dateBirth == "" ||
        this.competence == "" ||
        this.lettreDeMotivation == "" ||
        this.cv == "" ||
        this.attestation == "" ||
        this.photo == "")
        &&(this.password.length<8 && this.Phone.length !=8)
      ) {
        this.msgAlert = " veuillez remplir tous les champs obligatoires";
        this.error = true;
        this.colorAlert = "error";
        this.aa = true;
      } else {
        const myData = new FormData();
        myData.append("firstname", this.firstname);
        myData.append("sujets", this.sujets.id);
        myData.append("lastname", this.lastname);
        myData.append("email", this.email);
        myData.append("password", this.password);
        myData.append("Phone", this.Phone);
        myData.append("dateBirth", this.dateBirth);
        myData.append("competence", this.competence);
        myData.append("cv", this.cv[0]);
        myData.append("lettreDeMotivation", this.lettreDeMotivation[0]);
        myData.append("attestation", this.attestation[0]);
        myData.append("photo", this.photo);

        axios
          .post("http://127.0.0.1:8000/api/profil", myData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.status == 201) {
              this.msgAlert = response.data.message;
              this.error = true;
              this.colorAlert = "success";
            } else {
              this.msgAlert = response.data.message;
              this.error = true;
              this.colorAlert = "error";

              return;
            }
          })
          .then((response) => {
            axios
              .post("http://localhost:8000/api/login_check", {
                email: this.email,
                password: this.password,
              })

              .then((response) => {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                this.$router.push("/profil");
              })
              .then(() => {
                const token = localStorage.getItem("token");

                axios

                  .get("http://localhost:8000/api/token", {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res) => {
                    console.log(res);
                    if (res.data[0].roles[0] == "ROLE_ENCADRANT") {
                      localStorage.setItem("roles", res.data[0].roles[0]);
                      localStorage.setItem("idEncadrant", res.data[0].id);
                    } else {
                      localStorage.setItem("id", res.data[0].id);
                      localStorage.setItem("roles", res.data[0].roles[0]);
                    }
                  });
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(response);
            // this.$router.push("/profil");
          })
          .catch((error) => console.log(error));
      }
    },
  },
  created() {
    console.log(this.$route.params.id);
    this.sujets.id = this.$route.params.id;
    //jey mel page eli 9balha
    axios
      .get(
        "http://127.0.0.1:8000/api/get_nom_sujet_id/" + this.$route.params.id
      )

      .then((response) => {
        this.sujets.titre = response.data.titre;

        console.log(this.sujets);
      });
  },
};
</script>
<style scoped>
.example {
  color: red;
}
</style>
