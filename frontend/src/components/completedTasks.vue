<template>
    <div class="section">
        <div class="container">
            <h1 class="title">Completed Tasks</h1>
            <b-table :data="taskData" :columns="columns" @select="edit"></b-table>
        </div>

         <b-modal :active.sync="modalEditActive" has-modal-card>
            <edit-task v-bind="formProps"></edit-task>
        </b-modal>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import editTask from '../components/editTask'
export default {
  name: 'tasks',
  data() {
            return {
                taskData: [],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'name',
                        label: 'Title',
                    },
                    {
                        field: 'dueDate',
                        label: 'Due Date',
                    }
                ],
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
    ...mapActions('task', [
        'loadTasks'
    ]),
    create() {
        this.modalActive = true;
    },
    edit(res) {
        this.formProps.task = this.taskData.filter((el) => {
            return el.id == res.id
        })[0];
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
      this.taskData = JSON.parse(JSON.stringify(this.getTasks))
        .filter(el => {
            return el.completed
        })      
        .map(el => {
            el.dueDate = (new Date(el.dueDate)).toLocaleString('en-US',{ year: "numeric", month: "2-digit", day: "numeric" })
            return el
        })
    }
  },
  mounted () {
      this.loadTasks().then(() => {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks))
        .filter(el => {
            return el.completed
        })
        .map(el => {
            el.dueDate = (new Date(el.dueDate)).toLocaleString('en-US',{ year: "numeric", month: "2-digit", day: "numeric" })
            return el
        })
        /* eslint-disable */
        console.log("taskData mounted")
      })

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>