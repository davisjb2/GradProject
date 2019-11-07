<template>
    <div>
        <div class="container">
            <FullCalendar defaultView="dayGridMonth" :editable="true" @eventDrop="changeDueDate" @eventClick="edit" :eventLimit="true" :aspectRatio="1.45" :buttonText="{ dayGridMonth: 'Month', dayGridWeek: 'Week', listMonth: 'List', today: 'Today'}" :events="taskData" :header="{ left: 'listMonth, today', center: 'prev title next', right: 'dayGridMonth, dayGridWeek' }" :plugins="calendarPlugins" />
        </div>

         <b-modal :active.sync="modalActive" has-modal-card>
            <create-task></create-task>
        </b-modal>

         <b-modal :active.sync="modalEditActive" has-modal-card>
            <edit-task v-bind="formProps"></edit-task>
        </b-modal>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import createTask from '../components/createTask'
import editTask from '../components/editTask'
import FullCalendar from '@fullcalendar/vue'
import interatctionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'

export default {
  name: 'tasks',
  data() {
            return {
                taskData: [],
                modalActive: false,
                modalEditActive: false,
                formProps: {
                    task: {
                        id: 0,
                        dueDate: '',
                        name: '',
                        completed: false
                    }                    
                },
                calendarPlugins: [ dayGridPlugin, listPlugin, interatctionPlugin ]
            }
  },
  components: {
      createTask,
      editTask,
      FullCalendar
  },
  methods: {
    ...mapActions('task', [
        'loadTasks',
        'updateTask'
    ]),
    create() {
        this.modalActive = true;
    },
    edit(res) {
        this.formProps.task = this.taskData.filter((el) => {
            return el.id == res.event.id
        })[0];
        this.formProps.task.dueDate = new Date(this.formProps.task.dueDate)
        this.modalEditActive = true;
    },
    changeDueDate(res) {
        var index = this.taskData.findIndex(e => e.id == res.event.id)
        this.taskData[index].dueDate = new Date(res.event.start)
        var task = this.taskData[index]
        task.dueDate = new Date(res.event.start)
        this.updateTask(task)
        .then(() => {
            this.loadTasks().then(() => {
            this.taskData = JSON.parse(JSON.stringify(this.getTasks))
                .map(el => {
                    el.date = new Date(el.dueDate)
                    el.title = el.name
                    el.allDay = true
                    return el
                })
                /* eslint-disable */
                console.log("taskData mounted")
            })
        }).catch((e) => {
          // eslint-disable-next-line
          console.error(e)
        })
    }
  },
  computed: {
    ...mapGetters('task', [
        'getTasks'
    ])
  },
  watch: {
    getTasks() {
      this.taskData = JSON.parse(JSON.stringify(this.getTasks))
        .map(el => {
            el.date = new Date(el.dueDate)
            el.title = el.name
            el.allDay = true
            return el
        })
    }
  },
  mounted () {
      this.loadTasks().then(() => {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks))
        .map(el => {
            el.date = new Date(el.dueDate)
            el.title = el.name
            el.allDay = true
            return el
        })
        /* eslint-disable */
        console.log("taskData mounted")
      })

  }
}
</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

</style>

<style>
h2 {
    display: inline !important;
    font-size: 2em !important;
    color: white !important;
}

.fc-toolbar.fc-header-toolbar {
    /* padding-bottom: 1.5em; */
    /* background-color: blue; */
    background-color: #7666a0 !important;
    border-radius: 7px;
    margin-bottom: 5px;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    padding: 3rem 1.5rem;
}

.fc-button-primary {
    background-color:white !important;
    color: black !important;
    border: 1px solid white !important;
    border-radius: 4px !important;
    justify-content: center !important;
    padding-bottom: calc(0.375em - 1px) !important;
    background-color: white;
    border-bottom: 1px solid #ccc !important;
    cursor: pointer;
    text-align:left;
    border-radius: 6px;
}

.fc-next-button {
    background-color: transparent !important;
    border: none !important;
    margin: 0 !important;
    color:white!important;
}

.fc-prev-button {
    background-color: transparent !important;
    border: none !important;
    margin: 0 !important;
    color:white !important;    
}

.fc-icon {
    font-size: 2em !important;
}

.fc-event {
    background-color: white !important;
    margin: 3% !important;
    border: 1px solid #ccc !important;
    cursor: pointer !important;
    text-align:left !important;
    border-radius: 6px !important;
    color: black !important;
    font-size: 18px !important;
}

.fc-event-container {
    padding: 0 !important;
}
</style>