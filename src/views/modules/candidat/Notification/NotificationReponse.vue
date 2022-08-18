<template>
  <div >
    <nav-bar></nav-bar>
    <v-sheet height="80"></v-sheet>
    <center>
    <v-row >
       <v-col   class="my-16" >
        <v-col
          center
          width="800"
          class="mx-auto my-16"
         
        >
        <v-alert
          border="right"
          colored-border
          color="teal lighten-2"
          elevation="2"
          type="info"
            style="background-color: #fafafa"
        >
          <p v-for="notification in notifications" :key="notification.id">
            {{ notification.Reponse }}
          </p></v-alert
        >
        <br />

        <v-alert outlined color="teal lighten-2"   style="background-color: #fafafa">
          <div class="text-h6">Entretien</div>
          <div>
            <p v-for="notification in notifications" :key="notification.id">
              {{ notification.NotifDateEntretien }}
            </p>
          </div>
        </v-alert>
        <br />
        <v-alert border="right"     colored-border
          color="teal lighten-2"
          elevation="2"
          type="info"  style="background-color: #fafafa">
          <p v-for="notification in notifications" :key="notification.id">
            {{ notification.ReponseFinal }}
          </p></v-alert>
          </v-col>
           </v-col>
      <v-col cols="5"   class="my-16"  >
        <v-img
          alt="dotit Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/notif.png')"
          transition="scale-transition"
          max-width="310"
        />
      </v-col>
      

    </v-row>
    </center>
  </div>
</template>
<script>
import axios from "axios";

import NavBar from "@/components/modules/candidat/NavBar.vue";

export default {
  components: { NavBar },
  name: "NotificationReponse",
  data() {
    return {
      notifications: [],
      candidat: [],
      Reponse: "",
      NotifDateEntretien: "",
      ReponseFinal: "",
    };
  },
  created() {
    this.getReponse();
  },
  methods: {
    getReponse() {
      const token = localStorage.getItem("token");

      axios

        .get("http://127.0.0.1:8000/api/monnotifs", {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then((response) => {
          this.notifications = response.data[1];
          this.candidat = response.data[0];
          // console.log(response.data);
          localStorage.setItem("id", this.candidat.id);

          console.log(this.candidat.id);
          console.log(this.notifications);
          // .then((response) => {
          //   this.notifications.Reponse = response.data.Reponse;
          //   this.notifications.ReponseFinal = response.data.ReponseFinal;
          //   this.notifications.NotifDateEntretien =
          //     response.data.NotifDateEntretien;
          //   console.log(this.notifications);
          // localStorage.setItem("id", this.notifications.id);
        });
    },
  },
};
</script>
