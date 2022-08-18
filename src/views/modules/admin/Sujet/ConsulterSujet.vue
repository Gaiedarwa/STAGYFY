<template>
  <!-- <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text>vouz etes sur de supprimer ?!</v-card-text> -->
  <!-- <v-row align="center" class="list px-3 mx-auto">
    {{ sujets.id }}
    <br />
    {{ sujets.titre }}
    <br />
    {{ sujets.description }}
    <br />
    {{ sujets.technologie }}
  </v-row> -->
 
  <v-container fill-height>
    <v-main  style="padding:200px">
      <div>
        <v-card center width="1000" >
          

          <v-card class="pa-15" >
            <v-row class="text-center">
              <v-col md="9">
                <v-card-title> Sujet: {{ sujets.id }}</v-card-title>
                <v-card-title> Titre: {{ sujets.titre }}</v-card-title>
                <v-card-title>
                  Description: {{ sujets.description }}</v-card-title
                >
                <v-card-title>
                  Technologie: {{ sujets.technologie }}</v-card-title
                >
              </v-col>
           
                   
                  </v-row>
              
             
           
          </v-card>
        </v-card>
      </div>
    </v-main>
  </v-container>

</template>
<script>
import axios from "axios";
export default {
  name: "ConsulterSujet",
  data() {
    return {
      sujets: {},
      id: "",
      titre: "",
      technologie: "",
      description: "",
    };
  },

  
    
created(){
  const token = localStorage.getItem("token");
           axios.get('http://127.0.0.1:8000/api/Sujets/'+ this.$route.params.id,
      {headers: {"Authorization": `Bearer ${token}`}}
     )

    .then((response) => {
          this.sujets = response.data;
          console.log(response.data);
          });},
}
</script>

