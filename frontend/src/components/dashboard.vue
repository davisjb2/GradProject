<template>
  <div>
    <div class="columns" style="margin-bottom:0px">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>      
      <div class="column">
        <tabs
          :tabs="tabs"
          :currentTab="currentTab"
          :wrapper-class="'default-tabs'"
          :tab-class="'default-tabs__item'"
          :tab-active-class="'default-tabs__item_active'"
          :line-class="'default-tabs__active-line'"
          @onClick="changeTabs"
        />
      </div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>      
    </div>
    <div class="content">
      <div v-if="currentTab == 'calendar'">
        <tasks></tasks>
      </div>
      <div v-if="currentTab == 'todoplan'">
        <tasksMove></tasksMove>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import tabs from 'vue-tabs-with-active-line';
import tasks from './tasks'
import tasksMove from './tasksMove'
export default {
  name: 'dashboard',
  data () {
    return {
        tabs: [
          { title: 'Calendar', value: 'calendar' },
          { title: 'To Do Plan', value: 'todoplan'}
        ],
        currentTab: 'todoplan'
    }
  },
  components: {
        tabs,
        tasks,
        tasksMove
  },
  methods: {
    changeTabs(newTab) {
        this.currentTab = newTab
    },
    ...mapActions('user', [
      'instrConfirm'
    ]),
    alertCustom() {
        this.$buefy.dialog.alert({
            title: 'Welcome! Just a few tips before you get started:',
            message: '<p>This planner offers you the ability to keep track of when you will work on your assignments while still keeping track of when they are due.</p><br><p>There are two dashboards you\'ll interact with: <b>Calendar</b> and <b>To Do Plan</b></p><br><h3><b>Calendar</b></h3><hr style="margin: .5rem 0"><p>The calendar will show your tasks on their due dates. You can drag and drop them around the calendar to change the due date.</p><br><h3><b>To Do Plan</b></h3><hr style="margin: .5rem 0"><p>The to do plan is where you will plan out when you will work on your tasks! After a task is created, it will show in the "Unassigned" section of the to do plan. You can then drag the task over to the day you plan to do it. If the day passes and the task isn\'t marked as completed it will be moved into the "Missed" section of the to do plan.</p>',
            confirmText: 'Get Started!',
            trapFocus: true,
            onConfirm: () => {
              this.instrConfirm()
                .then(() => {
                }).catch((e) => {
                  // eslint-disable-next-line
                  console.error(e)
                })
            }
        })
        
      }
  },
  computed: {
      ...mapGetters('user', [
      'getUser'
    ]),
  },
  mounted() {
    if(!this.getUser.instr) this.alertCustom()
  }
}
</script>

<style>
.tabs {
  position: relative;
  margin: 0;
  margin-top: 15px;
  border-radius: 15px;
  border: 2px solid grey;
}

.tabs__item {
  display: inline-block;
  margin: 0 3px;
  padding: 10px;
  padding-bottom: 8px;
  font-size: 16px;
  letter-spacing: 0.8px;
  color: gray;
  text-decoration: none;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.25s;
}

.tabs__item_active {
  color: rgb(34, 34, 34);
}

.tabs__item:hover {
  border-bottom: 2px solid gray;
  color: black;
}

.tabs__item:focus {
  outline: none;
  border-bottom: 2px solid gray;
  color: black;
}

.tabs__item:first-child {
  margin-left: 0;
}

.tabs__item:last-child {
  margin-right: 0;
}

.tabs__active-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  border-radius: 10px;
  background-color: #009688;
  transition: transform 0.4s ease, width 0.4s ease;
}

.modal-card {
  width: 50vw !important;
  height: 80vh !important;
  max-width: 50vw !important;
}
</style>
