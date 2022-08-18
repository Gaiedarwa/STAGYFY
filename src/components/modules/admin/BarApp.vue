<template>
<!-- <v-app-bar app elevate-on-scroll elevation="3" color="white"></v-app-bar> -->
  <v-app-bar app elevate-on-scroll  elevation="3" color="white">
    <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
    <v-spacer />
    <!-- <v-col lg="6" cols="12">
      <v-form>
        <v-text-field
          class="p-0 m-0 mt-6"
          full-width
          dense
          append-icon="mdi-magnify"
          outlined
          rounded
          placeholder="Search"
        />
      </v-form>
    </v-col> -->
    <v-spacer />
 
    <!-- <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link color="teal lighten-2" >
  
            <span class="ml-3">   <v-icon small>mdi-account</v-icon> <v-icon small>mdi-triangle-small-down</v-icon> </span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">
        <v-list-item two-line>
   
 <div class="text-center">
          <v-list-item-content>
            <v-list-item-title  >ADMIN</v-list-item-title>
            <v-list-item-subtitle>Connecté</v-list-item-subtitle>
          </v-list-item-content>
          </div>
        </v-list-item>
        <v-divider />
  <v-list expand nav>
        <v-list-item router to="/signup">
          <v-list-item-action>
            <v-icon small>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>profil
            </v-list-item-content>
            
            </v-list-item>
             <v-list-item router to="/signup">
          <v-list-item-action>
            <v-icon small>mdi-key</v-icon>
          </v-list-item-action>
          <v-list-item-content>changer mot de passe
            </v-list-item-content>
            
            </v-list-item>
             <v-list-item router to="/signup">
          <v-list-item-action>
            <v-icon small>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>Parametre
            </v-list-item-content>
            
            </v-list-item>
             <v-list-item router to="/signup">
          <v-list-item-action>
            <v-icon small>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>Quit
            </v-list-item-content>
            
            </v-list-item>
      </v-list>
      </v-list>
    </v-menu> -->
    <v-menu offset-y text>

      <template v-slot:activator="{ attrs, on }" text >
        <span text v-bind="attrs" v-on="on">
          <v-btn link text small>
            <!-- <span style="font-size:28px ;"  small>Jane Smith</span> -->
       
               <v-icon style="color: teal;">mdi-account</v-icon>
              
       
            
  </v-btn> 
        </span>
      </template>
     
        <v-list width="250" class="py-0" expand nav>
        <v-list-item two-line>
        
                        <v-list-item-avatar>
           <v-icon small style="color: teal;">mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>ADMIN</v-list-item-title>
            <v-list-item-subtitle>Connecté</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
    
        <v-list-item router to="/passEncadrant">
          <v-list-item-action>
            <v-icon small>mdi-key</v-icon>
          </v-list-item-action>
          <v-list-item-content>changer mot de passe </v-list-item-content>
        </v-list-item>
  
         <v-list-item router to="/Login">
          <v-list-item-action>
            <v-icon small text to="/Login">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content style="color: #0db39e !important" @click="logOut"
            >Déconnexion
          </v-list-item-content>
        </v-list-item>
 </v-list>

    </v-menu>
  </v-app-bar>
 
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
     
      
    };
    
  },
   methods: {
    logOut() {
      localStorage.removeItem("idE");

      localStorage.removeItem("token");
      localStorage.removeItem("roles");
 
    },
  },
};
</script>

<style scoped></style>
