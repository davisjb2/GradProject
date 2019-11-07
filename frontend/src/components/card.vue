<template>
  <div>
    <div class="task-card" @click="edit">
        <div class="task-container">
            <div class="level">
              <div v-for="(label,i) in task.labels" :key="i" class="level-item">
                {{ label.id }} 
              </div>
            </div>
            <h3>
                {{ task.name }}
            </h3>
            <small>{{ task.dueDate | formatDate }}</small>
        </div>
    </div>

    <b-modal :active.sync="modalEditActive" has-modal-card>
        <edit-task v-bind="formProps"></edit-task>
    </b-modal>  
  </div>  
</template>

<script>
import editTask from '../components/editTask'
export default {
  name: 'card',
  props: [
      'task'
  ],
  data() {
            return {
                modalEditActive: false,
                formProps: {
                    task: {
                        id: 0,
                        dueDate: '',
                        name: '',
                        completed: false
                    }                    
                }
            }
  },
  components: {
    editTask
  },
  methods: {
    edit() {
        this.formProps.task = this.task;
        this.formProps.task.dueDate = new Date(this.formProps.task.dueDate)
        this.modalEditActive = true;
    }
  }
}
</script>

<style>
.task-card {
  background-color: white;
  margin: 3%;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  text-align:left;
  border-radius: 6px;
}

.task-card h3 {
    font-size: 18px !important;
    margin-bottom: 0 !important;
}

.task-card:hover {
  background-color: #f3f3f3;
}

.task-card .task-container {
  padding: 0.1% 2% 0.1% 2%;
}

.task-card .task-container p {
  font-size: 0.9em;
  letter-spacing: 0.05em;
  -webkit-margin-before: 0.2em;
  -webkit-margin-after: 0.2em;
}

.task-card .task-container .task-label {
  width: 50px;
  height: 10px;
  border-radius: 3px;
  margin-top: 8px;
  display: inline-block;
  margin-right: 2%;
}

.task-card .task-container .task-notifications {
  margin-bottom: 5px;
}

.task-card .task-container .task-notifications i {
  display: inline-block;
  font-size: 0.8em;
}

.task-card .task-container .task-notifications i.fa-list {
  margin-right: 7px;
}

.task-card .task-container .task-notifications .comments-number {
  display: inline-block;
  font-size: 0.8em;
}
</style>
