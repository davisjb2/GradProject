<template>
    <div>
        <h4>{{ title }}</h4>
        <div class="lane-body card-list">
            <h4 class="datenum">{{ num }}</h4>
            <draggable class="lane-body" v-model="taskData" :options="{ group: 'default' }" @change="doChange">
                <div v-for="task in taskData" :key="task.id" @click="edit(task)">
                    <card :task="task"></card>
                </div>
            </draggable>
        </div>
        <b-modal :active.sync="modalEditActive" has-modal-card>
            <edit-task v-bind="formProps"></edit-task>
        </b-modal> 
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import editTask from '../components/editTask'
import card from './card'
export default {
  name: 'lane',
  data() {
        return {
            taskData: [],
            formProps: {
                    task: {
                        id: 0,
                        dueDate: '',
                        name: '',
                        completed: false
                    }                    
            },
            modalEditActive: false
        }
  },
  props: [ 'id', 'title', 'num' ],
  components: {
      draggable,
      card,
      editTask
  },
  methods: {
      ...mapActions('task', [
          'updateTaskMove',
          'loadTasks'
      ]),
      doChange (evt) {
         if(evt && evt.added && evt.added.element.lane != this.id) {
            const data = evt.added.element
            data.assignedDate = new Date(this.id)
            if((new Date(data.assignedDate)).setHours(0,0,0,0) < (new Date()).setHours(0,0,0,0))
            {
                data.assignedDate = -1
            }
            this.updateTaskMove(data)
                .then(() => {
                    
                }).catch((e) => {
                // eslint-disable-next-line
                console.error(e)
            })
        }
      },
      edit(task) {
        this.formProps.task = task;
        this.formProps.task.dueDate = new Date(this.formProps.task.dueDate)
        this.modalEditActive = true;
      }
  },
  computed: {
    ...mapGetters('task', [
        'getTasks'
    ])
  },
  watch: {
    getTasks() {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks)).filter(el => 
            {
                return new Date(el.assignedDate).setHours(0,0,0,0) === new Date(this.id).setHours(0,0,0,0) && (!el.completed)
            })
    },
    id() {
        this.loadTasks().then(() => {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks)).filter(el => 
            {
                return new Date(el.assignedDate).setHours(0,0,0,0) === new Date(this.id).setHours(0,0,0,0) && (!el.completed)
            })
      })
    }
  },
  mounted () { 
      this.loadTasks().then(() => {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks)).filter(el => 
            {
                return new Date(el.assignedDate).setHours(0,0,0,0) === new Date(this.id).setHours(0,0,0,0) && (!el.completed)
            })
      })
   }
}
</script>

<style>
.lane-body {
    min-height: 35vh;
}

.card-list {
  width: 100%;
  background: white;
  border: 1px solid #E2E4E6;
  border-radius: 7px;
  margin: 0 auto;
  background: #E2E4E6;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.65);
  margin-bottom: 20px;
}

@media (max-width: 700px) {
  .card-list {
    margin: none;
    width: 100%;
  }
}

h4 {
    font-size: 13.5px !important;
    font-weight: lighter !important;
}

.datenum {
    text-align: left;
    padding-left: 8px;
}

.modal-background {
  background-color: rgba(10, 10, 10, 0.69) !important;
}
</style>
