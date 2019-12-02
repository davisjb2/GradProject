<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Edit Task</p>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <b-field label="Name" label-position="on-border">
                  <b-input
                      type="text"
                      v-model="task.name">
                  </b-input>
              </b-field>
              <b-field label="Due Date" label-position="on-border">
                  <b-datepicker
                      icon="calendar-today" v-model="task.dueDate">
                  </b-datepicker>
              </b-field>
              <b-field label="Description" label-position="on-border">
                  <b-input
                      type="textarea"
                      v-model="task.description">
                  </b-input>
                </b-field>
              <b-checkbox v-model="task.completed">Completed?</b-checkbox>
            </div>
            <div class="column">
                <div class="labels">
                  <b-checkbox v-for="(label, i) in labels" :key="i" type="is-light" :style="{ background: label.color }" v-model="labelsGroup"
                      :native-value="label.id">
                      {{ label.name }}
                  </b-checkbox>
                </div>
                <button v-if="!checklistShow" class="button" type="button" @click="createChecklist">Add Checklist</button>
            </div>
          </div>
          <div>
                <div v-if="checklistShow" class="checklist">
                  <h4>Checklist</h4>
                  <hr>
                  <checklistItem v-for="(item, i) in checklist" :key="i" :todo="item"></checklistItem>
                  <div class="level">
                    <div class="level-left widthfull">
                        <div class="level-item widthfull">
                          <b-input
                                      type="text"
                                      auto-grow
                                      v-model="newItem"
                                      class="widthfull">
                          </b-input>
                        </div>
                    </div>
                    <div class="level-right">
                          <div class="level-item">
                              <button class="button is-info" @click="newChecklistItem">
                                  <font-awesome-icon icon="save"/>
                              </button>
                          </div>
                    </div>
                </div>
              </div>
          </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="edit">Save</button>
            <button class="button danger" type="button" @click="deleteTaskItem">Delete</button>
        </footer>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import checklistItem from './checklistItem'
export default {
  name: 'edit',
  props: ['task'],
  data() {
    return {
      labels: [],
      labelsGroup: [],
      checklistShow: false,
      newItem: "",
      checklist: []
    }
  },
  components: {
    checklistItem
  },
  methods: {
    ...mapActions('task', [
      'updateTask',
      'deleteTask',
      'loadTasks'
    ]),
    ...mapActions('label', [
      'loadLabels'
    ]),
    ...mapActions('checklistItem', [
      'loadChecklist',
      'createChecklistItem'
    ]),    
    edit () {
      const data = { task: this.task, labels: this.labelsGroup }
      this.updateTask(data)
        .then(() => {
          this.$parent.close()
        }).catch((e) => {
          // eslint-disable-next-line
          console.error(e)
        })
    },
    deleteTaskItem () {
      const data = this.task.id
      this.deleteTask(data)
        .then(() => {
          this.$parent.close()
        }).catch((e) => {
          // eslint-disable-next-line
          console.error(e)
        })
      this.loadTasks()
        .then(() => {

        }).catch((e) => {
          console.error(e)
        })
    },
    createChecklist() {
      this.checklistShow = true
    },
    newChecklistItem() {
      var data = {}
      var item = {
        name: this.newItem,
        completed: false,
        order: this.checklist.length
      }
      data.checklist_item = item
      data.id = this.task.id
      this.createChecklistItem(data)
        .then(() => {
          this.newItem = ""
        }).catch((e) => {
          console.error(e)
        })
    }
  },
  computed: {
    ...mapGetters('label', [
      'getLabels'
    ]),
   ...mapGetters('checklistItem', [
      'getChecklist'
    ])        
  },
  watch: {
    getLabels() {
      this.labels = JSON.parse(JSON.stringify(this.getLabels))
    },
    getChecklist() {
      this.checklist = JSON.parse(JSON.stringify(this.getChecklist))
    }
  },
  mounted() {
      this.loadLabels().then(() => {
        this.labels = JSON.parse(JSON.stringify(this.getLabels))
      })
      for(var i = 0; i < this.task.Labels.length; i++)
      {
        this.labelsGroup.push(this.task.Labels[i].id)
      }
      this.loadChecklist(this.task.id).then(() => {
        this.checklist = JSON.parse(JSON.stringify(this.getChecklist))
      })
      if(this.getChecklist.length > 0) this.checklistShow = true
  }
}
</script>


<style scoped>
.modal-card {
  width:40vw;
  height:70vh;
  border-radius: 8px;
}
.labels .check {
  border: none !important;
  background-color: none !important;
}

.labels .checkbox {
  display: flex !important;
  margin-left: 0 !important;
  margin-bottom: 10px;
}

h4 {
  font-size: 1rem!important;
  text-align: left;
  margin-bottom: 0
}

hr {
  margin: .25rem 0px 1rem 0px;
}

.checklist {
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 8px;
  margin-top: 3px;
}

.widthfull {
  width: 100%;
}

.modal-card-body {
  padding-top: 40px;
}
</style>
