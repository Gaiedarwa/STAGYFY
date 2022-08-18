<template>
  <div>
    <!-- <v-container class="bg"> -->
    <v-app-bar color="white" flat dense height="30px">
      <v-img
        alt="dotit Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/Mon projet (1).png')"
        max-width="55"
      />
      <v-spacer></v-spacer>
      <router-link to="/" class="link" style="">Acceuil </router-link>
      <router-link to="/login" class="link" style="">Connexion </router-link>
    </v-app-bar>
    <v-sheet height="45"></v-sheet>

    <div class="bg1">
      <!-- 
      <v-layout class="bg1"> -->

      <v-row justify="space-around" margin-top="50px">
        <v-col cols="5">
          <div class="heroBlock">
            <br />
            <br />
            <v-carousel cycle hide-delimiters>
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
                aspect-ratio="1.4"
                contain
              >
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-col>
        <v-col cols="5" margin-top="70px">
          <br />

          <div>
            <h1 class="h">Découvrez notre PFE Book</h1>

            <br />
            <!-- <h2 style="font-family: 'Square Peg', cursive">
          des sujets et des projets de
          <strong style="color: firebrick"> Découvrez notre PFE Book</strong>
        </h2> -->
            <!-- <div>
  comment postuler?
  -consulter le pfe Book
  -choisir un sujet et clicker sur postuler 
  -remplir le formulaire et cliquer ..
  -posibilier d'ajouter deux autres sujets
  -
</div> -->
            <ul class="style">
              <li>
                Vous êtes un étudiant(e) en ingénierie informatique,
                industrielle, financière ou d’une école de commerce et à la
                recherche d’une entreprise pour vous accueillir et vous encadrer
                lors de votre stage de fin d’études ?
              </li>
              <li>N’hésitez pas à consulter nos thématiques et nos sujets!</li>
              <li>
                Réussissez votre stage de fin d’études en découvrant le vrai
                #DigitalWorld! et Rejoignez notre équipe d’expert à Sousse
              </li>
            </ul>

            <br />

            <v-btn color="#0db39e" elevation="10" to="/CatalogueSujets"
              >Voir Catalogue</v-btn
            >

            <br />

            <br />
            <div>
              <ul>
                <h3>Comment postuler?</h3>

                <li>consulter le pfe Book</li>
                <li>choisir un sujet et clicker sur postuler</li>
                <li>remplir le formulaire et cliquer sur</li>
                <li>posibilier d'ajouter deux autres sujets</li>
              </ul>
            </div>

            <!-- <div class="circle"></div> -->
            <!-- <v-card-text class="text-right">
                <strong>PFE BOOK</strong> —
                {{ new Date().getFullYear() }}
              </v-card-text> -->
        
            

            <v-card-text class="text-right">
              <v-btn
              v-for="icon in icons"
              :key="icon"
              class="cc"
              icon
              color="teal "
            >
              <v-icon >{{ icon }}</v-icon>
            </v-btn>
         
              <strong color="teal lighten-1">PFE BOOK</strong> -
              {{ new Date().getFullYear() }}
            </v-card-text>
            <br />

            <br />

            <br />
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- </v-layout>
    </v-container> -->
  </div>
  <!-- <v-col>
      <v-app-bar id="app-bar" absolute app color="white" flat height="30">
        <v-container>
          <v-row>
            <v-list dense nav>
              <v-list-item>
                <v-list-item-avatar color="white" contain>
                  <v-img :src="require('@/assets/dotit.png')" max-height="90" />
                </v-list-item-avatar>
                <v-card-text style="font-family: 'Dancing Script', cursive"
                  >Stagi</v-card-text
                >
              </v-list-item>
            </v-list>
          </v-row>
        </v-container>

        <v-spacer />

        <div class="mx-3" />

        <v-btn
          class="ml-2"
          min-width="0"
          text
          style="font-family: 'Square Peg', cursive"
          href="http://www.dotit-corp.com/"
          > Home
        </v-btn>
        <v-btn
          class="ml-2"
          min-width="0"
          text
          to="/Login"
          style="font-family: 'Square Peg', cursive"
        >
          Cantact
        </v-btn>
        <v-btn
          class="ml-2"
          min-width="0"
          text
          to="/Login"
          style="font-family: 'Square Peg', cursive"
        >
          About
        </v-btn>
        <v-btn
          class="ml-2"
          min-width="0"
          text
          to="/Login"
          style="font-family: 'Square Peg', cursive"
        >
          Login
        </v-btn>
        <v-btn
          class="ml-2"
          min-width="0"
          text
          to="/Login"
          style="font-family: 'Square Peg', cursive"
        >
          <span style="color: #0db39e !important" @click="logOut">
            <v-icon left>mdi-logout</v-icon>
            log out
          </span>
        </v-btn>
        
      </v-app-bar>
    </v-col> -->

  <!-- <v-row justify="space-around">
      <v-col cols="6">
        <div class="heroBlock">
          <v-carousel cycle hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
              aspect-ratio="1.4"
              contain
            >
              <v-row
                class="title fill-height hidden-xs-only"
                align="center"
                justify="center"
                >{{ item.title }}</v-row
              >
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-col>

      <div>
        <h1 style="font-size: 100px">Catalogue</h1>

        <br />
        <h2 style="font-family: 'Square Peg', cursive">
          des sujets des projets de
        </h2>
        <div class="circle"></div>
        <br />
        <h2><strong style="color: firebrick"> FIN D'ETUDES</strong></h2>
        <br /><br />

        <v-btn color="teal lighten-2" elevation="6" to="/CatalogueSujets"
          >Voir Catalogue</v-btn
        >
        <br /><br /><br /><br />
        <v-card-text class="text-right">
          <strong>PFE BOOK</strong> —
          {{ new Date().getFullYear() }}
        </v-card-text>
        <br />
        <div>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
            color="teal lighten-1"
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </div>
      </div>
    </v-row> -->
</template>
<script>
export default {
  name: "VueHome",

  components: {},

  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram",
    ],
    items: [
      {
        src: require("../assets/acceuil.png"),
        // title: "We are creative",
      },
      {
        src: require("../assets/acceuil2-removebg-preview.png"),
        // title: "We are hard worker",
      },
      {
        src: require("../assets/acceuil3-removebg-preview.png"),
        // title: "We are professional",
      },
    ],
  }),
  methods: {
    logOut() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      localStorage.removeItem("board-sections");
    },
  },
};
</script>
<style>
.circle {
  /* margin:50px 20px 20px 20px; */
  width: 80px;
  height: 80px;
  background: url("../assets/pfe.png");
  background-size: 100% 100%;
  float: right;
  shape-outside: circle();
  margin: 50px 10px 100px;
}

/* .hey {
  background-color: white;
  height: 100%;
} */
.bg {
  margin-top: 20px;
  background-color: white;
  /* width: 1000px;
  height: 750px; */
}
.h {
  font-size: 50px;
  color: teal;
}
.bg1 {
  background: url("@/assets/backkk.jpg");
  background-size: cover;
  height: 100vh;
}
.style {
  font-size: 20px;
}
.text-right {
  color: #1b998b;
}
.cc{
  margin-left: 20px;
}
</style>
