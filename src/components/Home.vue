<template>
  <div class="home">
    <div class="container" style="background:red;">
      <input class="form-control mr-sm-2 text" type="text" v-model="search" placeholder="Search">
    </div>

    <!--<div class="">{{filterAnnouncementList | filterMajor('content')}}</div> -->
    <div>
    <ul>
      <li v-for="interviewee in filterAnnouncementList">
        {{ interviewee.interviewRef }}
        {{ interviewee.firstName }}
        {{ interviewee.lastName }}
      </li>
    </ul>

    </div>
    
  </div>
</template>

<script>
  import { getInterviewees } from '../utils/services'
  import announcementList from '../json/announcement.json'
  export default {
    name: 'Home',
    mounted () {
      console.log('ready')
      getInterviewees()
        .then( (announcementList) => {
          // sort
          announcementList = announcementList.sort((a, b) => {
            return a.interviewRef.localeCompare(b.interviewRef)
          })
          this.announcementList = announcementList
        })
    },
    filters: {
      filterMajor(interviewees,major){
        if (!interviewees) return ''
        let result =  interviewees.filter((interviewee) => {
          console.log(' interviewee.major =', interviewee.major === major)
            return interviewee.major === major
        } )
        console.log('majorProgramming',result,interviewees)
        return result
      }
    },
    computed: {
      filterAnnouncementList () {
        return this.announcementList.filter(interviewee => {
          let searchText = this.search.replace(' ','')
          return (interviewee.firstName
          + interviewee.lastName
          + interviewee.interviewRef
          + interviewee.major
          ).includes(searchText)
        })
      }
    },
    data () {
      return {
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
    padding: 0;
  }
  
  li {
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
