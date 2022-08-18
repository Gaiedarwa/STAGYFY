<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
  // created() {
  //   if (this.$route.name !="home" ) {
  //     if (localStorage.getItem("token")) {
  //       this.$router.push("/");
  //     } else {
  //       this.$router.push("/login");
  //     }
  //   }
  // },
};
</script>
<style></style>
