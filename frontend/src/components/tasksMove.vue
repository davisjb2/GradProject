<template>
        <div class="container">
            <div class="hero is-primary">
                <div class="hero-body columns">
                <div class="column" style="text-align:left">
                    <b-button tag="input" class="button is-info" value="Create New Task" @click="create"/> 
                </div>
                <div class="column">
                    <div class="columns">
                        <div class="column">
                            <a href="" style="color:white"><font-awesome-icon icon="angle-left" size="2x" @click="prevWeek"/></a>
                        </div>                        
                        <div class="column">
                            <h1 class="title" style="white-space: nowrap">{{ dates[0] | formatDate }} - {{ dates[dates.length - 1] | formatDate }}</h1>
                        </div>
                        <div class="column">
                            <a href="" style="color:white"><font-awesome-icon icon="angle-right" size="2x" @click="nextWeek"/></a>
                        </div>
                    </div>
                </div>
                <div class="column"></div>
                </div>
            </div>
            <div class="columns">
                <div class="column" v-for="(date, i) in dates" :key="i">
                    <lane :id="date" :num="date | formatDateNum" :title="date | formatDateDay"></lane>
                </div>
            </div>
            <div class="level">
                <bottomLane id="0" title="Unassigned Tasks"></bottomLane>
            </div>
            <div class="level">
                <bottomLane id="1" title="Missed Tasks"></bottomLane>
            </div>
            <b-modal :active.sync="modalActive" has-modal-card>
            <create-task></create-task>
            </b-modal>
        </div>        
</template>

<script>
// import { mapGetters } from 'vuex'
import lane from './lane'
import bottomLane from './bottomLane'
import createTask from '../components/createTask'
import moment from 'moment'
export default {
  name: 'taskMove',
  data() { 
    return {
        dates: [],
        modalActive: false,
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
        lane,
        createTask,
        bottomLane,
  },
    methods: {
    create() {
        this.modalActive = true;
    },
    nextWeek(e) {
        e.preventDefault()
        var newDates = []
        for(var i = 1; i < 8; i++)
        {
            newDates.push(moment(this.dates[this.dates.length - 1]).add(i, 'day'))
        }
        this.dates = newDates
    },
    prevWeek(e) {
        e.preventDefault()
        var newDates = []
        for(var i = 7; i > 0; i--)
        {
            newDates.push(moment(this.dates[0]).subtract(i, 'day'))
        }
        this.dates = newDates
    }
  },  
  mounted() {
        for(var i = 0; i < 7; i++)
        {
            this.dates.push(moment().add(i, 'day'))
        }
  }
}
</script>

<style>
.title {
    width: 100%;
}

.headerBox {
    width: 100%;
    background: white;
    border: 1px solid #E2E4E6;
    border-radius: 7px;
    background: #E2E4E6;
    box-shadow: 2px 1px 2px 0px rgba(0, 0, 0, 0.65);
}

.button {
    background-color:white !important;
    color: black !important;
}

.hero.is-primary {
    background-color: #7666a0 !important;
    border-radius: 7px;
    margin-bottom: 5px;
}
.section {
    padding: 1rem 1.5rem;
}

.switch-left span {
    font-size: .4em !important
}
</style>
