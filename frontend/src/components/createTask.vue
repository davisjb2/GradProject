<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">New Task</p>
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
                <b-tooltip label="Checklists will be enabled when the task is created." multilined>
                  <button class="button" disabled type="button">Add Checklist</button>
                </b-tooltip>
              </div>

          </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-success" @click="create">Create</button>
        </footer>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'create',
  data () {
    return {
      task: {
        name: '',
        completed: false,
        dueDate: new Date(),
        assignedDate: undefined,
        description: ""
      },
      labels: [],
      labelsGroup: []
    }
  },
  methods: {
    ...mapActions('task', [
      'createTask'
    ]),
    ...mapActions('label', [
      'loadLabels'
    ]),
    create () {
      const data = { task: this.task, labels: this.labelsGroup }
      // eslint-disable-next-line
      console.log(JSON.stringify(data, null, 2))
      this.createTask(data)
        .then(() => {
          this.$parent.close()
        }).catch((e) => {
          // eslint-disable-next-line
          console.error(e)
        })
    }
  },
  computed: {
    ...mapGetters('label', [
      'getLabels'
    ])
  },
  watch: {
    getLabels() {
      this.labels = JSON.parse(JSON.stringify(this.getLabels))
    }
  },
  mounted() {
      this.loadLabels().then(() => {
        this.labels = JSON.parse(JSON.stringify(this.getLabels))
      })
  }
}
</script>


<style>
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

button.is-success {
  background: rgb(181, 227, 126) !important;
}

.modal-card-body {
  padding-top: 40px;
}
</style>
