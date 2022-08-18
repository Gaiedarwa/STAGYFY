<template>
  <v-container>
    <v-footer padless>
      <v-card flat class="text-center">
        <v-row justify="space-around">
          <v-col cols="5">
            <v-img
              alt="dotit Logo"
              class="shrink mr-2"
              contain
              :src="require('@/assets/dotit.png')"
              transition="scale-transition"
              max-width="300"
            />
          </v-col>

          <v-col cols="5">
            <v-card-text class="text-center">
              Parc El Ghazala des Technologies de la Communication, <br />B22
              Bloc Ericsson, <br />
              1 er Etage Bureau N°1 /N°2 Route de Raoued km 3,5 2083 Ariana<br />
              Email: contact@dotit.com.tn<br />
              TEL : (+216) 70 834 163<br />
              Fax : (+216) 70 834 074
            </v-card-text>
          </v-col>

          <v-card-text class="text-center">
            <v-divider></v-divider>
            Copyright
            {{ new Date().getFullYear() }} —
            <strong> Dot-IT Tous les droits réservés www.dotit-corp.com</strong>
          </v-card-text>
        </v-row>
      </v-card>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: "FooterApp",
  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram",
    ],
  }),
};
</script>
