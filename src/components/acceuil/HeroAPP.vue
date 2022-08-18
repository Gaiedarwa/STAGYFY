<template>
  <div class="heroBlock"  >
    <v-carousel cycle hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-img
          alt="dotit Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/dotit.png')"
          transition="scale-transition"
          max-width="80"
        />

        <v-spacer />
        <v-row align-end>
          <v-btn text>
            <router-link
              to="/signup"
              style="text-decoration: none; color: black"
              >Sign up</router-link
            >
          </v-btn>
          <v-btn text>
            <router-link to="/login" style="text-decoration: none; color: black"
              >Login</router-link
            >
          </v-btn>
        </v-row>
        <v-row
          class="title fill-height hidden-xs-only"
          align="center"
          justify="center"
          >{{ item.title }}</v-row
        >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "HeroApp",
  data() {
    return {
      items: [
        {
          src: require("@/assets/test.jpeg"),
          title: "We are creative",
        },
        {
          src: require("@/assets/img-carousel2.jpg"),
          title: "We are hard worker",
        },
        {
          src: require("@/assets/img-carousel3.jpg"),
          title: "We are professional",
        },
      ],
    };
  },
};
</script>

