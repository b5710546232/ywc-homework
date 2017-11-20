<template>
    <div class="home vivify fadeIn">
        <div class="container search-box-container">
              <input class="form-control mr-sm-2" type="text" v-model="search" placeholder="Search name ..." autofocus>
        </div>

        <div class="container result-area">
            <div class="row">
                <div class="col-lg-3 col-md-6" v-for="major in majorGroups" v-if="filterMajorList(filterAnnouncementList,major).length>0">
                    <ul class="list-group">
                        <li class="list-group-item active list-header">Major : web {{major}}</li>
                        <li class="list-group-item list-item" v-for="interviewee in filterMajorList(filterAnnouncementList,major)">{{interviewee.interviewRef}} {{interviewee.firstName}} {{interviewee.lastName}}</li>
                    </ul>
                </div>
            </div>
        </div>

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
    methods: {
      filterMajorList(interviewees,major){
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
          console.warn('searchText',searchText)
          let joinedString = (interviewee.firstName
          + interviewee.lastName
          + interviewee.interviewRef
          + interviewee.major)
          return (joinedString).includes(searchText)
        })
      }
    },
    data () {
      return {
        search: '',
        majorGroups:['marketing','content','programming','design'],
        announcementList: []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-box-container{
    position:relative;
    margin-top:80px;
    margin-bottom:10px;
  }
  .search-box-container{
    padding:17px;
  }
  .list-header{
    border-radius:0px;
    background:#282a36;
    border-color:#bd93f9;
    color:#bd93f9;
  }
  .list-item{
    border-radius:0px;
    background:#303844;
    /*#3C4555;*/
    border-color:#bd93f9;
    color:#f8f8f2;
  }
  .list-group{
    margin-top:16px;
    margin-bottom:16px;
  }
  .form-control{
    border-radius:0px;
    background:	#282a36;
    border-color:#bd93f9;
    color:#f8f8f2;
  }
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
