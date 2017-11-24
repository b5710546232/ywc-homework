<template>
    <div class="game vivify fadeIn">   
        <div class="header">
        <p class="header-typed" style="height:100px;"> ... </p>
        </div>
        <div class="game-stage">
            <div class="message-area">
                <div class="text">
                    <span style="color:#6272a4;">{{previous}}</span>
                    <span :style="currentStyle" v-html="current"></span>
                    <span style="color:#8be9fd;">{{next}}</span>
                </div>
            </div>
            <div class="input-control">
                <div class="input-box-container">
            <div class="inner-addon left-addon">
                <i class="fa fa-keyboard-o"></i>
                <input placeholder="type here ..." ref="input" class="form-control" :disabled="isGameComplete||!isGameReady" :style="inputStyle" type="text" v-model="textInput" @input="onInput">
            </div>
        </div>


            </div>
        </div>
        <button v-if="isGameComplete" type="button" class="btn btn-outline-primary btn-playagain" @click="initGame()">play again</button>
        <p  class="wpm-text" v-if="wpm.length>0">wpm : {{wpm}}</p>
    </div>
</template>

<script>
    import Typed from 'typed.js';
    import { getInterviewees } from '../utils/services'
    export default {
        name: 'Game',
        mounted() {
         this.initGame()
         var options = {
        strings: ["","<i>มาพิมพ์ชื่อ เพื่อนๆของคุณกัน</i>", "พร้อมแล้ว ลุย!เลย"],
        typeSpeed: 100,
        showCursor:true,
        backSpeed:50
        }

        var typed = new Typed(".header-typed", options);
        },
        computed: {
            previous() {
                return this.msg.substr(0, this.charDone)
            },
            current() {
                return this.msg.substr(this.charDone).split(' ')[0]
            },
            next() {
                console.log('next', this.current.length)
                return this.msg.substr(this.charDone + this.current.length)
            }
        },
        data() {
            return {
                msg: '',
                isGameReady:false,
                textInput: '',
                charDone: 0,
                currentStyle: 'color:#50fa7b;text-decoration: underline;',
                inputStyle:'',
                wpm:'',
                isGameStart:false,
                isGameComplete:false,
                startTime:0
            }
        },
        methods: {
            generateMessage(targetItems){
                let msg = ''
                for (let item of targetItems) {
                    let firstName = item.firstName.replace(' ', '').replace('\u200b','').match(/^\S+[u0E00-\u0E7Fa-zA-Z' ]|^'|'$|''/)[0]
                    console.log('first-name',firstName)
                    let lastName = item.lastName.replace(' ', '').match(/^\S+[u0E00-\u0E7Fa-zA-Z' ]|^'|'$|''/)[0]
                    .replace('\u200b','')
                    msg += [firstName, lastName].join(' ') + ' '
                }
                return msg
            },
            initGame () {
                // reset
                this.textInput = ''
                this.isGameReady = false
                this.charDone =  0
                this.currentStyle = 'color:#50fa7b;text-decoration: underline;'
                this.inputStyle = ''
                this.wpm = ''
                this.isGameStart = false
                this.isGameComplete = false
                this.startTime = 0
                getInterviewees().then((interviewwees) => {
                    this.isGameReady = true
                    let tempList = interviewwees.map(o => o)
                    let targetItems = []
                    let ranNumber = 5 /* number of name */
                    for (let i = 0; i < ranNumber; i++) {
                    let item = tempList[Math.floor(Math.random() * tempList.length)];
                        tempList.splice(tempList.indexOf(item), 1)
                        targetItems.push(item)
                    }
                    this.msg = this.generateMessage(targetItems)
                    setTimeout(()=>{
                        this.$refs.input.focus()
                    },10)

                })

            },
            onInput(event) {
                if(!this.isGameStart){
                    this.isGameStart = true
                    this.startTime = Date.now()
                    this.wpm = ''
                }
                console.log('on-type', this.textInput, this.current)
                if (event.data === ' ') {
                    if (this.current === this.textInput.slice(0,this.textInput.length-1)){
                        // type correct
                        this.charDone += this.textInput.split(' ')[0].length + 1
                        console.log('charDone', this.charDone)
                        this.textInput = '' // clear
                        this.currentStyle = 'color:#50fa7b;text-decoration: underline;'
                        // Gross WPM = (All typed entires / 5 ) / Time(min)
                        const TIMEMIN = 60000
                        this.wpm = ( this.charDone / 5 / ( (Date.now() - this.startTime ) / TIMEMIN) ).toFixed(0)
                    } else {
                        // type wrong
                        this.currentStyle = 'color:#f8f8f2;background:#ff5555;'
                    }
                } else {
                    for (let i = 0; i < this.current.length; i++) {
                        console.log(this.current[i], this.textInput[i])
                        if (this.current[this.textInput.length - 1] !== this.textInput[this.textInput.length - 1]) {
                            this.currentStyle = 'color:#f8f8f2;background:#ff5555;'
                            // old #ff9bad
                            // new #ff79c6
                            this.inputStyle = 'color:#f8f8f2;background:#ff5555;'
                        } else {
                            this.currentStyle = 'color:#50fa7b;text-decoration: underline;'
                            this.inputStyle = ''
                        }
                    }
                }

                if(this.charDone===this.msg.length){
                    this.onComplete()
                }
    
            },
            onComplete(){
                this.isGameComplete = true
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

    .fa {
        color:#bd93f9;
        font-size:1.5em;
    }
    .input-box-container{
        position:relative;
        margin-top:50px;
        margin-bottom:10px;
        background:#282a36;
        padding:12px 25px;
    }

    *{
        border-radius:0;
    }
    .btn-playagain{
        font-size:1.5em;
    }
    .wpm-text{
        font-size:1.5em;
    }
    .game{
        color:#f8f8f2;
    }
    .header{
        font-size:2em;
        color:#bd93f9;
        height:2em;
    }
    .game-stage{
        position:relative;
        /*background:#282a36;*/
        padding:1%;
        margin:10px;
        margin-top:2%;
    }
    .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        font-size: 26px;
    }

    .btn-outline-primary{
        color:#bd93f9;
        border-color:#bd93f9;
        border:2px solid;
    }
     .btn-outline-primary:hover{
        background:#282a36;
        color:#bd93f9;;
    }
    .message-area{
        /*border:1px solid #ff5555;*/
        background:#282a36;
        padding-left:1%;
        padding-right:1%;
        padding-bottom:5%;
        padding-top:1%;
        margin-bottom:25px;
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
</style>
