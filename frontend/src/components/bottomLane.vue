<template>
    <div class="horizontal">
        <h4>{{ title }}</h4>
        <div>
            <draggable class="lane-body card-list" v-model="taskData" :options="{ group: 'default' }" @change="doChange">
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
  name: 'bottomLane',
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
  props: [ 'id', 'title' ],
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
         if(evt.added) {
            const data = evt.added.element
            data.assignedDate = null
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
        this.taskData = JSON.parse(JSON.stringify(this.getTasks)).filter((el) => 
          {
            if(this.id == 0)
            {
              return el.assignedDate == undefined  && (!el.completed)
            } else
            {
              return el.assignedDate != undefined && (new Date(el.assignedDate)).setHours(0,0,0,0) < (new Date()).setHours(0,0,0,0)  && (!el.completed)
            }
          })
    }
  },
  mounted () { 
      this.loadTasks().then(() => {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks)).filter((el) => 
          {
            if(this.id == 0)
            {
              return el.assignedDate == undefined  && (!el.completed)
            } else
            {
              return el.assignedDate != undefined && (new Date(el.assignedDate)).setHours(0,0,0,0) < (new Date()).setHours(0,0,0,0) && (!el.completed)
            }
          })
      })
   }
}
</script>

<style scoped>
.card-list {
  width: 100%;
  background: white;
  border: 1px solid #E2E4E6;
  border-radius: 7px;
  margin: 0 auto;
  background: #E2E4E6;
  box-shadow: 2px 1px 2px 0px rgba(0, 0, 0, 0.65);
  margin-bottom: 5px;
  min-height:8vh;
  display:flex;
}

.horizontal {  
  width: 85vw;
}

@media (max-width: 700px) {
  .card-list {
    margin: none;
    width: 100%;
  }
}

h4 {
    font-size: 20px;
    text-align: left;
    padding-left: 5px;
    font-weight: 700;
}
</style>
