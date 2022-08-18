<template>
  <div class="section">
    <div class="listheader">
      <p class="section-title">{{ title }}</p>
      <div class="deleteSection" @click="deleteSectionI">×</div>
    </div>

    <draggable
      group="tasks"
      :list="tasks"
      @end="$emit('change', dragedElement)"
      :move="movecheck"
    >
      <!-- props data -- Section -> Task (content, taskIndex, sectionIndex) -->
      <TaskVue
        v-for="(task, index) in tasks"
        :key="task.id"
        :task="task"
        :taskIndex="index"
        :sectionIndex="sectionIndex"
      />
      <!-- props data -- Section -> TaskCreate (sectionIndex) -->
      <TaskCreate :sectionIndex="sectionIndex" />
    </draggable>
  </div>
</template>

<script>
import TaskCreate from "./TaskCreate.vue";
import TaskVue from "./TaskVue.vue";
import draggable from "vuedraggable";
import { mapActions } from "vuex";
export default {
  components: {
    TaskCreate,
    TaskVue,
    draggable,
  },
  // Boardからのデータ -> sectionIndex, title, , tasks
  props: {
    title: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
    sectionIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dragedElement: {
        element: [],
        idsec: "",
      },
    };
  },
  methods: {
    movecheck: function (ev) {
      this.dragedElement.element = ev.draggedContext.element;
      this.dragedElement.idsec = this.sectionIndex;

      console.log(ev.relatedContext.element);
      //console.log(ev.draggedContext.futureIndex);
      //console.log(ev.draggedContext);
      this.$emit("draged");
    },
    ...mapActions(["deleteSection"]),
    deleteSectionI() {
      this.deleteSection({ sectionIndex: this.sectionIndex });
    },
  },
};
</script>
