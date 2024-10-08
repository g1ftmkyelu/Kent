// store/index.js
import { createStore } from 'vuex';
import modal from './modules/modal';
import kanban from './modules/kanban';
// other modules...

const store = createStore({
  modules: {
    modal,
    kanban,
    // other modules...
  },
});

export default store;
