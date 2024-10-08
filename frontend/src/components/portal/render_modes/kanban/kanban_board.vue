<template>
  <div class="kanban-board">
    <div class="board-header">
      <input 
        v-model="searchQuery" 
        @input="updateSearch" 
        placeholder="Search tasks..."
        class="search-input"
      />
    </div>
    <div class="flex justify-between my-3">
        <i>
          <action_dispatcher :resource="{
            actions: [
              {
                name: 'ArchiveAction',
                icon: 'fa fa-archive',
                label: 'Archive'
              },
              {
                name: 'FavoriteAction',
                icon: 'pi pi-star',
                label: 'Favorite',
              },
              {
                name: 'DeleteAction',
                icon: 'pi pi-trash',
                label: 'Delete',
              }
            ]
          }" :item="{}" orientation="icons" />
        </i>
        <button @click="showAddTaskModal = true" class="add-task-btn h-12">Add Task</button>
      </div>
    <div class="columns-container">
      <KanbanColumn 
        v-for="column in filteredColumns" 
        :key="column.id" 
        :column="column"
        @drop="onDrop"
      />
    </div>
    <AddTaskModal 
      v-if="showAddTaskModal" 
      @close="showAddTaskModal = false"
      @add-task="addNewTask"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import KanbanColumn from './kanban_column.vue';
import AddTaskModal from './add_task_modal.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import action_dispatcher from '../../../action_dispatcher.vue';

export default {
  components: {
    KanbanColumn,
    AddTaskModal,
    action_dispatcher
  },
  setup() {
    const searchQuery = ref('');
    const showAddTaskModal = ref(false);

    return {
      searchQuery,
      showAddTaskModal
    };
  },
  computed: {
    ...mapGetters('kanban', ['filteredTasks']),
    filteredColumns() {
      return this.filteredTasks;
    }
  },
  methods: {
    ...mapActions('kanban', ['setSearchQuery', 'addTask', 'moveTask']),
    updateSearch() {
      this.setSearchQuery(this.searchQuery);
    },
    addNewTask(task) {
      this.addTask({ columnId: 'todo', task });
      this.showAddTaskModal = false;
      toast.success('Task added successfully!');
    },
    onDrop({ taskId, fromColumn, toColumn }) {
      this.moveTask({ taskId, fromColumn, toColumn, newIndex: this.filteredColumns.find(col => col.id === toColumn).tasks.length });
      toast.success('Task moved successfully!');
    }
  }
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 2rem;
  background-color: #f3f4f6;
}

.board-header {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.search-input {
  flex-grow: 1;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-right: 1rem;
}

.add-task-btn {
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.add-task-btn:hover {
  background-color: #4338ca;
}

.columns-container {
  display: flex;
  gap: 1.5rem; /* Adjust this to manage space between columns */
  width: 100%;
  padding-bottom: 1rem;
  overflow-x: hidden;
}

</style>