<template>
  <div>
    <nav-bar></nav-bar>
    <v-sheet height="40"></v-sheet>
    <v-row>
      <v-col cols="3">
        <v-img
          alt="dotit Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/5.png')"
          transition="scale-transition"
          max-width="350"
        />
      </v-col>

      <v-col cols="20" sm="15" class="my-16" >
        <v-card
          center
          width="800"
          class="mx-auto my-16"
          style="background-color: #fafafa"
        >
          <!-- elevation="2" class="rounded-lg" style="background-color: #d9d9d9" -->

          <v-col>
            <v-row>
              <v-col>
                <h1 style="color: teal">Bienvenue dans notre Application Stagyfy</h1></v-col
              >

              <v-img
                alt="dotit Logo"
                class="shrink mr-2"
                contain
                :src="require('@/assets/Mac.png')"
                transition="scale-transition"
                max-width="200"
              />
            </v-row>
            <h2 style="color: brown">Notre Application Vous Permettre De:</h2>
            <br /><br />
            <h4>
              • Postuler 3 sujets au maximum .<br />
              • Consulter les notifications de réponse et le date et l’heur
              d’entretien<br />

              • à l'aide de l'interface taches vous pouvez postuler votre suivie
              de travail a votre encadrant.<br />
            </h4>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NavBar from "@/components/modules/candidat/NavBar.vue";
// import BarApp from "@/components/modules/admin/BarApp.vue";
// import axios from "axios";
export default {
  components: { NavBar },

  name: "indexCandidat",
};
</script>
<style>
.div {
  font-size: 27px;
}
</style>