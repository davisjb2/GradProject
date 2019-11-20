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
            title: 'Title Alert',
            message: 'I have a title, a custom button and <b>HTML</b>!',
            confirmText: 'Cool!',
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
    console.log("Mounted")
    console.log(this.getUser)
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
</style>
