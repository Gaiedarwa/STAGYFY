<template>
  <div :class="classList">
    <button class="delete-button" @click="deleteTaskI">
      <v-icon color="red">mdi-close</v-icon>
    </button>
    <button class="edit-button" @click="updateTaskI" color="black">
      <v-icon small color="green">mdi-pencil</v-icon>

      {{ isEditing ? "Update" : "edit" }}
      <!-- {{ isEditing ? "Update" : "Edit" }} -->
    </button>
    <v-btn   class="mx-2"
      fab
      dark
      color="teal lighten-2" small @click="etat(1)">todo</v-btn>
    <v-btn   class="mx-2"
      fab
      dark
      color="teal lighten-2" small @click="etat(2)">doing</v-btn>
    <v-btn   class="mx-2"
      fab
      dark
      color="teal lighten-2" small @click="etat(3)">done</v-btn>
    <v-btn  class="mx-2"
      fab
      dark
      color="teal lighten-2" small @click="etat(4)">bug</v-btn>
    <h3 v-if="!isEditing">{{ this.task.content }}</h3>
    <div v-else>
      <input
        :value="newContent"
        @change="taskContentChange"
        type="text"
        class="input-task"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  // Board -> Section -> sectionIndex / Section -> task, taskIndex
  props: {
    sectionIndex: {
      type: Number,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newContent: "",
      isEditing: false,
    };
  },
  computed: {
    classList() {
      const classList = ["task"];
      return classList;
    },
  },
  methods: {
    ...mapActions(["deleteTask", "updateTask"]),
    deleteTaskI() {
      this.deleteTask({
        taskIndex: this.taskIndex,
        sectionIndex: this.sectionIndex,
        task: this.task,
      });
    },
    taskContentChange(e) {
      this.newContent = e.target.value;
      console.log(this.newContent);
      axios.put(
        "http://127.0.0.1:8000/api/taskkk/" + this.task.id,
        {
          title: this.newContent,
        },

        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
    },
    etat(index) {
      console.log(index);
      console.log(localStorage.getItem("token"));
      console.log(this.task.id);
      axios.put(
        "http://127.0.0.1:8000/api/taskk/" + this.task.id,
        {
          etat: index,
        },

        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
    },
    updateTaskI() {
      console.log(this.isEditing);

      this.isEditing = this.isEditing == true ? false : true;

      if (this.isEditing) {
        this.newContent = this.task.content;
        console.log(this.newContent);
        this.updateTask(this.task);
      }
    },
  },
};
</script>
