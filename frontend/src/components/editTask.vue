<template>
    <div class="modal-card">
        <section class="modal-card-body">
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

            <b-checkbox v-model="task.completed">Completed?</b-checkbox>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="edit">Save</button>
        </footer>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'edit',
  props: ['task'],
  methods: {
    ...mapActions('task', [
      'updateTask'
    ]),
    edit () {
      const data = this.task
      this.updateTask(data)
        .then(() => {
          this.$parent.close()
        }).catch((e) => {
          // eslint-disable-next-line
          console.error(e)
        })
    }
  }
}
</script>


<style scoped>
.modal-card {
    width:30vw;
    height:50vh;
    border-radius: 8px;
}
</style>
