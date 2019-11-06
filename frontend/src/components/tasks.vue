<template>
    <div>
        <div class="container">
            <FullCalendar defaultView="dayGridMonth" :aspectRatio="1.45" :buttonText="{ dayGridMonth: 'Month', dayGridWeek: 'Week', listMonth: 'List', today: 'Today'}" :events="events" :header="{ left: 'listMonth, today', center: 'prev title next', right: 'dayGridMonth, dayGridWeek' }" :plugins="calendarPlugins" />
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
                events: [
                {
                    title : 'event1',
                    date : '2019-11-01'
                },
                {
                    title : 'event2',
                    date : '2019-11-05'
                },
                {
                    title : 'event3',
                    date : '2019-11-09'
                },
            ],
            calendarPlugins: [ dayGridPlugin, listPlugin ]
            }
  },
  components: {
      createTask,
      editTask,
      FullCalendar
  },
  methods: {
    ...mapActions('task', [
        'loadTasks'
    ]),
    create() {
        this.modalActive = true;
    },
    edit(res) {
        this.formProps.task = res;
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
      this.taskData = JSON.parse(JSON.stringify(this.getTasks))
        .map(el => {
            el.dueDate = new Date(el.dueDate)
            return el
        })
    }
  },
  mounted () {
      this.loadTasks().then(() => {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks))
        .map(el => {
            el.dueDate = new Date(el.dueDate)
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
    padding-left: 0.75em !important;
    padding-right: 0.75em !important;
    padding-top: calc(0.375em - 1px) !important;
    text-align: center !important;
    white-space: nowrap !important;
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
    color:white!important;    
}

.fc-icon {
    font-size: 2em !important;
}

</style>