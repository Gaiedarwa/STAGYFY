import axios from "axios";

export default {
  createSection(state, payload) {
    // const token = localStorage.getItem("token");
    // axios.post(
    //   "http://127.0.0.1:8000/api/container",
    //   {
    //     title: payload.title,
    //     stagiaire: localStorage.getItem("id"),
    //     encadrant: 195,
    //   },

    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );

    state.sections.push({ title: payload.title, tasks: [] });
  },
  deleteSection(state, payload) {
    state.sections.splice(payload.sectionIndex, 1);
  },
  createTaskInSection(state, payload) {
    // const token = localStorage.getItem("token");
    // axios.post(
    //   `http://127.0.0.1:8000/api/container/${payload.sectionIndex + 1}/tasks`,
    //   { title: payload.content },

    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );
    const token = localStorage.getItem("token");

    axios.post(
      `http://127.0.0.1:8000/api/taskk `,
      {
        title: payload.content,

        stagiaire: payload.stagiaire,
        encadrant: localStorage.getItem("idE"),
        etat: payload.sectionIndex + 1,
      },
      //ki nenzel add nekho l index mt3 section
      //koul element 3ando l index mt3o


      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    state.sections[payload.sectionIndex].tasks.push({
      content: payload.content,
      //sectionIndex:blassa eli bech npushi feha l task 
    });
  },
  deleteTask(state, payload) {
    const token = localStorage.getItem("token");
    console.log(payload.task.id);

    axios.delete("http://127.0.0.1:8000/api/taskk/" + payload.task.id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    state.sections[payload.sectionIndex].tasks.splice(payload.taskIndex, 1);
  },
  updateTask(state, payload) {
    console.log("====================================");
    console.log(payload);
    console.log("====================================");
    let index = state.sections[payload.sectionIndex].tasks.findIndex(
      (t) => t.id == payload.id
    );
    if (index != -1) {
      state.sections[payload.sectionIndex].tasks[index] = payload;
    }
  },

  saveSections(state, payload) {
    // const token = localStorage.getItem("token");
    // console.log(payload);

    // axios.put(
    //   "http://127.0.0.1:8000/api/taskk/" + payload.sections,
    //   {
    //     etat: state.sections,
    //   },
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );

    state.sections = payload.sections;
    // console.log(payload.sections);
    // console.log(state.sections);
  },
};
