<template>
    <div class="section">
        <div class="container">
            <h1 class="title">Moving Tasks</h1>
            <div class="columns">
                <div class="column" v-for="(date, i) in dates" :key="i">
                    <lane :id="date" :title="date | formatDate"></lane>
                </div>
            </div>
            <div class="level">
                <bottomLane id="0" title="Unassigned"></bottomLane>
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

</style>
