<!-- <template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark color="teal lighten-2">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-alert color="error" :value="error" icon="mdi-alert">
              The username or the password are incorrect.
            </v-alert>
            <v-card-text>
              <v-text-field
                v-model="email"
                prepend-icon="mdi-account"
                name="login"
                label="Login"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn to="/signup" rounded color="teal" dark>Sign up</v-btn>

              <v-btn rounded color="green" dark @click.prevent="login()">
                Login
                <v-icon></v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "VueLogin",
  data: () => ({
    email: "",
    password: "",
    error: false,
  }),
  methods: {
    login() {
      // this.$store
      //   .dispatch("LOGIN", {
      //     email: this.email,
      //     password: this.password,
      //   })
      //         .then(() => {

      //            this.$router.push("/");
      //         })
      //         .catch(() => {
      //           this.error = true;
      //         });

      axios
        .post("http://localhost:8000/api/login_check", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          // this.$router.push("/");
        })
        .then(() => {
          const token = localStorage.getItem("token");

          axios

            .get("http://localhost:8000/api/token", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              console.log(res);
              localStorage.setItem("id", res.data[0].id);
              localStorage.setItem("roles", res.data[0].roles[0]);
            });
        })
        .then(this.$router.push("/"))

        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script> -->

<template>
  <v-container fill-height>
    <v-card class="mx-auto" max-width="800" outlined>
      <v-layout align-center justify-center style="background-color: #fafafa">
        <div class="form-container sign-in-container mt-12">
          <v-form
            action="#"
            :class="{
              'px-2': $vuetify.breakpoint.smAndDown,
              'px-8': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <v-img
              alt="dotit Logo"
              class="shrink mr-2"
              contain
              :src="require('@/assets/maininamge.jpg')"
              transition="scale-transition"
              width="1000"
              height="200"
            />
            <h1 class="pb-8 font-weight-bold">Connexion</h1>
            <v-alert color="error" :value="error" icon="mdi-alert">
              The username or the password are incorrect.
            </v-alert>
            <v-text-field
              prepend-inner-icon="mdi-account"
              placeholder="Login"
              filled
              v-model="email"
              :rules="[rules.required, rules.email]"
              name="login"
              type="text"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              placeholder="Password"
              type="password"
              filled
              v-model="password"
              :rules="[rules.required]"
              name="password"
            ></v-text-field>
            <v-btn
              color="teal"
              block
              dark
              tile
              class="pa-6 font-weight-bold"
              elevation="0"
              @click.prevent="login()"
              >Connexion</v-btn
            >
          </v-form>
        </div>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "VueLogin",
  data: () => {
    return {
      email: "",
      password: "",
      error: false,

      rules: {
        required: (value) => !!value || "Required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
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
    login() {
      // this.$store
      //   .dispatch("LOGIN", {
      //     email: this.email,
      //     password: this.password,
      //   })
      //         .then(() => {

      //            this.$router.push("/");
      //         })
      //         .catch(() => {
      //           this.error = true;
      //         });

      axios
        .post("http://localhost:8000/api/login_check", {
          email: this.email,
          password: this.password,
        })
        // .then(this.error = true)

        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);

          const token = localStorage.getItem("token");

          axios

            .get("http://localhost:8000/api/token", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              console.log(res);
              if (res.data[0].roles[0] == "ROLE_ENCADRANT") {
                localStorage.setItem("roles", res.data[0].roles[0]);
                localStorage.setItem("idE", res.data[0].id);
              } else if ("ROLE_EMPLOYE") {
                localStorage.setItem("roles", res.data[0].roles[0]);
                localStorage.setItem("idE", res.data[0].id);
              } else {
                localStorage.setItem("id", res.data[0].id);
                localStorage.setItem("roles", res.data[0].roles[0]);
              }

              setTimeout(() => {
                if (res.data[0].roles[0] == "ROLE_CANDIDAT") {
                  this.$router.push("/candidat");
                } else if (res.data[0].roles[0] == "ROLE_ENCADRANT") {
                  this.$router.push("/encadrant");
                } else if (res.data[0].roles[0] == "ROLE_STAGIAIRE") {
                  this.$router.push("/candidat");
                } else if (res.data[0].roles[0] == "ROLE_EMPLOYE") {
                  this.$router.push("/encadrant");
                } else {
                  this.$router.push("/admin");
                }
              }, 1000);
            });
          // setTimeout(() => {
          //   // this.$router.push("/");
          // //      .then((res) => {

          // //   if (res.data[0].roles[0] == ROLE_CANDIDAT) {
          // //     this.$router.push("/candidat");
          // //   }
          // //   else if (res.data[0].roles[0] == ROLE_ENCADRANT) {
          // //   this.$router.push("/encadrant")
          // //   } else{
          // //     this.$router.push("/admin")
          // //  }
          // //   // this.$router.push("/");
          // // },
          // }, 1000);
        })
        .catch(() => {
          this.error = true;
        });
      // .then(() => {
      //   const token = localStorage.getItem("token");

      //   axios

      //     .get("http://localhost:8000/api/token", {
      //       headers: { Authorization: `Bearer ${token}` },
      //     })
      //     .then((res) => {
      //       console.log(res);
      //       localStorage.setItem("id", res.data[0].id);
      //       localStorage.setItem("roles", res.data[0].roles[0]);
      //     });
      // })
      // .then(this.error = true)

      // .catch(() => {
      //   this.error = true;
      // });
    },
  },
};
</script>
<style scoped>
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.team-img {
  width: 50%;
}
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.mx-auto {
  margin-left: 170px;
}
</style>
