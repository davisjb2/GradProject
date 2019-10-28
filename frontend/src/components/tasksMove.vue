<template>
    <div class="section">
        <div class="container">
            <h1 class="title">{{ dates[0] | formatDate }} - {{ dates[dates.length - 1] | formatDate }}</h1>
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
        </div>        
        
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import lane from './lane'
import bottomLane from './bottomLane'
import moment from 'moment'
export default {
  name: 'taskMove',
  data() { 
    return {
        dates: []
    }
  },
  components: {
        lane,
        bottomLane
  },
  mounted() {
        for(var i = 0; i < 7; i++)
        {
            this.dates.push(moment().add(i, 'day'))
        }
  }
}
</script>

<style scoped>
.title {
    width: 100%;
    background: white;
    border: 1px solid #E2E4E6;
    border-radius: 7px;
    background: #E2E4E6;
    box-shadow: 2px 1px 2px 0px rgba(0, 0, 0, 0.65);
}
</style>
