// import axios from "axios";

// export default {
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {
//     LOGIN: ( payload) => {
//       console.log(payload);
     
//       return new Promise((resolve, reject) => {
//         axios
//           .post("http://localhost:8000/api/login_check", payload)
//           .then(({  status }) => {
//             if (status === 200) {
//               resolve(true);
//             }
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   }
// }
// };
// const store = createStore({
//     state: {
//       profilCondidat: [
//         { id:{} , 
//         firstname:{},
//          latsname: {}
//         },
    
//       ]
//     },
//     getters: {
//       doneCondidat (state) {
//         return state.profilCondidat.filter(profil => profil.done)
//       },
//       action{}
//     }
//   })