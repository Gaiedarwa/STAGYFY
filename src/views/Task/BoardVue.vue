<template>
  <!-- <v-container   fi  ll-height> -->
  <div style="height: 100vh; background-color: #0db39e">
    <nav-bar ></nav-bar>

    <draggable class="d-flex" :list="sections" @end="movingSections">
      <SectionVue
        v-for="(section, index) in sections"
        :key="section.id"
        :title="section.title"
        :tasks="section.tasks"
        :sectionIndex="index"
        @change="movingTasks"
      />
      <SectionCreate />
    </draggable>
  </div>

  <!-- </v-container> -->
</template>
<script>
import SectionCreate from "./SectionCreate.vue";
import SectionVue from "./SectionVue.vue";
import TaskVue from "./TaskVue.vue";
import axios from "axios";
import draggable from "vuedraggable";
import { mapState } from "vuex";
import NavBar from "@/components/modules/candidat/NavBar.vue";
export default {
  components: {
    SectionCreate,
    SectionVue,
    draggable,
    TaskVue,

    NavBar,
  },
  data: () => ({
    todo: [],
    doing: [],
    done: [],
    bug: [],
    tt: "",
    idStagiaire: "",
    show: false,
  }),
  computed: {
    ...mapState(["sections"]),
  },
  methods: {
    try() {
      console.log("psst");
    },
    checkMove: function (ev) {
      console.log(ev);
    },
    movingSections: function (event) {
      console.log(event);
      this.$store.dispatch("saveSections", { sections: this.sections });
    },
    movingTasks: function (index) {
      console.log(index);

      this.$store.dispatch("saveSections", {
        sections: this.sections,
      });
    },
    getprofils() {
      const token = localStorage.getItem("token");
      this.tt = localStorage.getItem("idStagiaire");
      axios
        .get("http://127.0.0.1:8000/api/monprofil", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // console.log(response.data[1][0]);
          localStorage.setItem("idE", response.data[1][0].employe.id);
        });
    },//hethi bech tjib l encadrant mt3 koul candidat
  },
  mounted() {
    this.getprofils();
    const token = localStorage.getItem("token");
    var idget = localStorage.getItem("id") || localStorage.getItem("idSt");
    console.log("geid " + idget);
    this.tt = idget;
    var tab1 = [];
    var tab2 = [];
    var tab3 = [];
    var tab4 = [];
    axios
      .get(
        `http://127.0.0.1:8000/api/taskk/${idget}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.todo = response.data.filter(
          (element) => element.title && element.etat == 1
        );
        this.doing = response.data.filter(
          (element) => element.title && element.etat == 2
        );
        this.done = response.data.filter(
          (element) => element.title && element.etat == 3
        );
        this.bug = response.data.filter(
          (element) => element.title && element.etat == 4
        );
      })
      .then(() => {
        tab1 = this.todo.map((datum) => {
          //.map:koul element fel todo w thouto sections board id et titre
          return {
            content: datum.title,
            id: datum.id,
          };
        });
        tab2 = this.doing.map((datum) => {
          return {
            content: datum.title,
            id: datum.id,
          };
        });
        tab3 = this.done.map((datum) => {
          return {
            content: datum.title,
            id: datum.id,
          };
        });

        tab4 = this.bug.map((datum) => {
          return {
            content: datum.title,
            id: datum.id,
          };
        });
      })
      .then(() => {
        localStorage.setItem(
          "board-sections",
          JSON.stringify([
            { title: "TO DO", tasks: tab1 },
            { title: "Doing", tasks: tab2 },
            { title: "Done", tasks: tab3 },
            { title: "Bug", tasks: tab4 },
          ])
        );
      });
  },
};
</script>
<style>
@import "../../assets/css/styles.css";
.board {
  background-color: #0db39e;
}
</style>
