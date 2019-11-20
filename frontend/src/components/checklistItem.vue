<template>
  <div class="level">
      <div class="level-left widthfull">
          <div class="level-item">
                <button class="button is-info" @click="complete()">
                    <font-awesome-icon icon="check"/>
                </button>
          </div>
          <div class="level-item widthfull">
            <b-input
                        type="text"
                        v-bind:class = "[todo.completed ? 'is-done' : '']"
                        @keydown.enter.prevent = "save"
                        @dblclick= "edit"
                        auto-grow :disabled="isReadOnly"
                        v-model="todo.name"
                        class="widthfull">
            </b-input>
          </div>
      </div>
      <div class="level-right">
            <div class="level-item">
                <button class="button is-info" @click="edit()">
                    <font-awesome-icon icon="edit"/>
                </button>
            </div>
            <div class="level-item">
                <button class="button is-info" @click="save()">
                    <font-awesome-icon icon="save"/>
                </button>
            </div>
            <div class="level-item">
                <button class="button is-info" @click="deleteItem()">
                    <font-awesome-icon icon="trash"/>
                </button>
            </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  props: ['todo'],
  data () {
    return {
      isReadOnly: true,
    }
  },
  computed: {
    name () {
      return this.todo.name
    }
  },
  methods: {
    ...mapActions('checklistItem', [
      'updateChecklistItem',
      'deleteChecklistItem'
    ]),
    edit () {
      this.isReadOnly = false
    },
    save () {
      const data = this.todo
      if (!this.isReadOnly) {
        this.updateChecklistItem(data)
          .then(() => {
            this.isReadOnly = true
          }).catch((e) => {
            console.error(e)
          })
      }
    },
    deleteItem() {
      const data = this.todo.id
        this.deleteChecklistItem(data)
          .then(() => {
            
          }).catch((e) => {
            console.error(e)
          })      
    },
    complete() {
      this.todo.completed = !this.todo.completed
      data = this.todo
        this.updateChecklistItem(data)
          .then(() => {
            this.isReadOnly = true
          }).catch((e) => {
            console.error(e)
          })
    }
  }
}
</script>

<style>
.is-done {
  text-decoration: line-through;
}

.level-left {
  flex-shrink: 1 !important;
}

.level-item {
  flex-shrink: 1 !important;
}

.widthfull {
  width: 100%;
}
</style>