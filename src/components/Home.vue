<template>
  <div class="home">
  
    <input type="text" v-model="search"> {{filterAnnouncementList}}
  </div>
</template>

<script>
  import axios from 'axios'
  import announcementList from '../json/announcement.json'
  export default {
    name: 'Home',
    mounted () {
      console.log('ready', announcementList)
      this.announcementList = []
      // JSON.parse(JSON.stringify(announcementList))
      // https://ywc15.ywc.in.th/
      const options = {
        // proxy: {
        //   host: 'https://ywc15.ywc.in.th/',
        // },
      }
      const API = 'https://ywc15.ywc.in.th/static/announcement.json'
      axios.get(API, options).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.error(error)
      })
    },
    computed: {
      filterAnnouncementList () {
        return this.announcementList.filter(interviewee => {
          return interviewee.firstName.includes(this.search) ||
            interviewee.lastName.includes(this.search) ||
            interviewee.interviewRef.includes(this.search) ||
            interviewee.major.includes(this.search)
        })
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        search: '',
        announcementList: []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
