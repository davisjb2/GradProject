<template>
    <div>
        <h4>{{ title }}</h4>
        <div class="lane-body card-list">
            <h4 class="datenum">{{ num }}</h4>
            <draggable class="lane-body" v-model="taskData" :options="{ group: 'default' }" @change="doChange">
                <div v-for="task in taskData" :key="task.id">
                    <card :task="task"></card>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import card from './card'
export default {
  name: 'lane',
  data() {
        return {
            taskData: []
        }
  },
  props: [ 'id', 'title', 'num' ],
  components: {
      draggable,
      card
  },
  methods: {
      ...mapActions('task', [
          'updateTask',
          'loadTasks'
      ]),
      doChange (evt) {
         if(evt.added) {
            const data = evt.added.element
            data.assignedDate= new Date(this.id)
            this.updateTask(data)
                .then(() => {
                }).catch((e) => {
                // eslint-disable-next-line
                console.error(e)
            })
        }
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
                return new Date(el.assignedDate).setHours(0,0,0,0) === new Date(this.id).setHours(0,0,0,0)
            })
    },
    id() {
        this.loadTasks().then(() => {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks)).filter(el => 
            {
                return new Date(el.assignedDate).setHours(0,0,0,0) === new Date(this.id).setHours(0,0,0,0)
            })
      })
    }
  },
  mounted () { 
      this.loadTasks().then(() => {
        this.taskData = JSON.parse(JSON.stringify(this.getTasks)).filter(el => 
            {
                return new Date(el.assignedDate).setHours(0,0,0,0) === new Date(this.id).setHours(0,0,0,0)
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
</style>
