<template>
    <div class="home">
        <announce></announce>
        <div id="search-area" class="container search-box-container">
            <div class="inner-addon left-addon">
                  <i class="fa fa-search"></i>
                  <input class="form-control mr-sm-2" type="text" v-model="search" @click="scollTo('#search-area')" @input="scollTo('#search-area')"  placeholder="ค้นหารายชื่อ">
            </div>
        </div>
        <div class="container result-area" style="height:80vh;">
            <div class="row">
              <div class="col not-found-text" v-if="filterAnnouncementList.length<=0">ไม่พบรายชื่อ</div>
                <div class="col-lg-3 col-md-6" v-for="major in majorGroups" v-if="filterMajorList(filterAnnouncementList,major).length>0">
                    <ul class="list-group">
                        <li class="list-group-item active list-header text-left"><strong>{{major.toUpperCase()}}</strong></li>
                        <li class="list-group-item list-item text-left" v-for="interviewee in filterMajorList(filterAnnouncementList,major)">
                        <div class="container">
                          <div class="row">
                        <div class="col-3 item-ref font-400">{{interviewee.interviewRef}}</div>
                          <div class="col-9 item-ref">{{interviewee.firstName}} {{interviewee.lastName}}</div>
                        </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>

    </div>
</template>

<script>
  import Game from '@/components/Game'
  import Announce from '@/components/Announce'
  import scrollToElement from 'scroll-to-element'
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
      },
      scollTo(e){
      scrollToElement(e, {
        offset: -10,
        ease: 'outBack',
        duration: 500
      })
    },
    },
    components:{
      Announce
    },
    computed: {
      filterAnnouncementList () {
        return this.announcementList.filter(interviewee => {
          let searchText = this.search.replace(' ','')
          console.warn('searchText',searchText)
          let joinedString = 
          (
            interviewee.firstName.toLowerCase().trim()
          + interviewee.lastName.toLowerCase().trim()
          + interviewee.interviewRef.toLowerCase().trim()
          + interviewee.major.toLowerCase().trim()
          )
          return (joinedString).includes(searchText.toLowerCase())
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

.inner-addon { 
    position: relative; 
}

/* style icon */
.inner-addon .fa {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align icon */
.left-addon .fa  { left:  0px;}
.right-addon .fa { right: 0px;}

.input-group-addon{
  background:#282a36;
  color:#bd93f9;
  border-color:transparent;
}
*{
  border-radius:0px;
}
.fa {
  color:#bd93f9;
  font-size:1.5em;
}
  .search-box-container{
    position:relative;
    margin-top:3%;
    margin-bottom:10px;
    background:#282a36;
    padding:12px 25px;
  }
  .not-found-text{
    color:#f8f8f2;
    margin-top:10%;
    font-size:2.5em;
  }
  .list-header{
    border-radius:0px;
    background:#282a36;
    border:0;
    color:#bd93f9;
    font-weight:700;
  }
  .list-item{
    border-radius:0px;
    background:#303844;
    /*border-color:#bd93f9;
    border-top:0px;*/
    margin-top:5px;
    color:#f8f8f2;
  }
  .item-ref{
    padding:0;
  }
  .list-group{
    margin-top:16px;
    margin-bottom:16px;
  }
  .form-control:hover, .form-control:focus{
    border-top:transparent;
    border-left:transparent;
    border-right:transparent;
    border-bottom:2px solid #bd93f9;
  }
  .form-control{
    font-size:1.5em;
    font-family: 'Athiti', sans-serif;
    font-weight:600;
    padding-left:50px;
    border-radius:0px;
    background:transparent;
    color:#f8f8f2;
    border-top:transparent;
    border-left:transparent;
    border-right:transparent;
    border-bottom:2px solid #636C71;
  }
  .font-400{
    font-weight:600;
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
