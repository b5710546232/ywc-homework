<template>
    <div class="game">   

        <div class="message-area container">
            <div class="text">
                <span style="color:grey;">{{previous}}</span>
                <span :style="currentStyle" v-html="current"></span>
                <span style="color:blue;">{{next}}</span>
            </div>
        </div>

        <div class="input-text container">
            <input class="form-control" v-if="!isGameComplete" :style="inputStyle" type="text" v-model="textInput" @input="onInput">
            <button v-if="isGameComplete" type="button" class="btn btn-primary" @click="initGame()">play again</button>
            <p>wpm : {{wpm}}</p>
        </div>

    </div>
</template>

<script>
    import announcementList from '../json/announcement.json'
    export default {
        name: 'Game',
        mounted() {
         this.initGame()
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
            // ,
            // currentDisplay(){
            //     let displayText = ''
            //         for(let i=0;i<this.current.length;i++){
            //             console.log(this.current[i],this.textInput[i])
            //             if(this.current[i]===this.textInput[i]){
            //                 displayText += '<span style="color:green;">'+this.current[i]+'</span>'
            //             }else if(this.current[this.textInput.length-1]!==this.textInput[this.textInput.length-1] && this.textInput.length<this.current.legnth){
            //                 displayText += '<span style="color:red;">'+this.current[i]+'</span>'
            //             } else{
            //                 displayText += '<span style="color:grey;">'+this.current[i]+'</span>'
            //             }
            //         }
            //         // console.log('dis',displayText)
            //     return displayText
            // }
        },
        data() {
            return {
                msg: '',
                textInput: '',
                charDone: 0,
                currentStyle: 'color:green;text-decoration: underline;',
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
                this.charDone =  0
                this.currentStyle = 'color:green;text-decoration: underline;'
                this.inputStyle = ''
                this.wpm = ''
                this.isGameStart = false
                this.isGameComplete = false
                this.startTime = 0

                let tempList = announcementList.map(o => o)
                let targetItems = []
                let ranNumber = 2
                for (let i = 0; i < ranNumber; i++) {
                let item = tempList[Math.floor(Math.random() * tempList.length)];
                    tempList.splice(tempList.indexOf(item), 1)
                    targetItems.push(item)
                }
                this.msg = this.generateMessage(targetItems)

            },
            onInput(event) {
                if(!this.isGameStart){
                    this.isGameStart = true
                    this.startTime = Date.now()
                    this.wpm = ''
                }
                console.log('on-type', this.textInput, this.current)
                if (event.data === ' ') {
                    if (this.current === this.textInput.split(' ').join('')) {
                        this.charDone += this.textInput.split(' ')[0].length + 1
                        console.log('charDone', this.charDone)
                        this.textInput = '' // clear
                        this.currentStyle = 'color:green;'
                        // Gross WPM = (All typed entires / 5 ) / Time(min)
                        const TIMEMIN = 60000
                        this.wpm = ( this.charDone / 5 / ( (Date.now() - this.startTime ) / TIMEMIN) ).toFixed(0)
                    } else {
                        this.currentStyle = 'color:red;'
                    }
                } else {
                    for (let i = 0; i < this.current.length; i++) {
                        console.log(this.current[i], this.textInput[i])
                        if (this.current[this.textInput.length - 1] !== this.textInput[this.textInput.length - 1]) {
                            this.currentStyle = 'color:red;background:#ff9bad;'
                            this.inputStyle = 'color:red;background:#ff9bad;'
                        } else {
                            this.currentStyle = 'color:green;text-decoration: underline;'
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
    span#current-text {
        z-index: 1;
        letter-spacing: 10px;
        color: #fff;
    }
    
    .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        font-size: 26px;
    }
    .message-area{
        border:1px solid red;
        padding:1%;
        margin-top:12%;
        margin-bottom:5%;
    }
    
    span#current-text:before {
        /* pink boxes */
        content: '';
        top: 0;
        left: 0;
        background: red;
        z-index: -1;
        height: 100%;
        width: 100%;
        background-image: -webkit-repeating-linear-gradient(right, pink, pink 50px, transparent 50px, transparent 55px, pink 55px, pink 105px, transparent 105px, transparent 110px, pink 110px, pink 160px, transparent 160px, transparent 176px);
        background-image: -moz-repeating-linear-gradient(right, pink, pink 50px, transparent 50px, transparent 55px, pink 55px, pink 105px, transparent 105px, transparent 110px, pink 110px, pink 160px, transparent 160px, transparent 176px);
    }
</style>
