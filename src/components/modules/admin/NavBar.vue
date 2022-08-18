<template>
  <nav>
    <!-- id="core-navigation-drawer"
      v-model="drawer" -->
    <v-navigation-drawer color="white" app width="300"  dense
    flat
    elevation="25">
      <!-- <v-img
      height="140"
      class="pa-4"
      
    >
      <div class="text-center">
        <v-avatar class="mb-4" color="white" size="64">
          <v-img
            aspect-ratio="50"
           width="50"
          :src="require('@/assets/Blue_Graduation_Icon_Modern_Logo__2_-removebg-preview.png')"
          />
        </v-avatar>
        <h2 >StagyFy</h2>
      </div>
    </v-img> -->

      <v-img
        alt="dotit Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/Mon projet (1).png')"
      width="450px"
        max-height="150px"
      />
      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <br />
      <v-list class="link" expand nav>
        <v-list-item router to="/admin">
          <v-list-item-action>
            <v-icon small style="color: #0db39e">mdi-home-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="link">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/signup">
          <v-list-item-action>
            <v-icon small style="color: #0db39e">fas fa-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="link">créer compte</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/compte">
          <v-list-item-action>
            <v-icon small style="color: #0db39e">mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="link">Les Comptes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/listCandidats">
          <v-list-item-action>
            <v-icon small style="color: #0db39e">mdi-account-school</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="link">Candidats</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/ListSujets">
          <v-list-item-action>
            <v-icon small style="color: #0db39e">mdi-clipboard-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="link">Sujets</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/PlanificationEntretien">
          <v-list-item-action>
            <v-icon small style="color: #0db39e">fas fa-clipboard-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="link">Entretiens</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/final">
          <v-list-item-action>
            <v-icon small style="color: #0db39e">mdi-account-school</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="link">List Final </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item router to="/calander">
          <v-list-item-action>
            <v-icon small style="color: #0db39e">fas fa-calendar-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="link"> Calander</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
//import Popup from './Popup.vue'
export default {
  data: () => ({
    interval: {},
    value: 0,
  }),
  components: {
    //Popup
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000);
  },
  

};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.soft {
  margin-top: auto;
  margin-bottom: 5px;
}
.link {
  color: #0db39e !important;
  cursor: pointer;

  font-size: 16px;
  text-decoration: none;
}
.v-image__image,
.v-image__placeholder {
  z-index: -1;
  position: absolute;
  top: 50px;
  left: 20px;
  width: 50%;
  height: 50%;
}
</style>
