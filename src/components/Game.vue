<template>
    <div class="game">    
        <div class="text container">
            <span style="color:grey;">{{previous}}</span>
            <span :style="currentStyle" v-html="current"></span>
            <span style="color:blue;">{{next}}</span>
        </div>
        <!--<input-box :on-type="onType" :text-input="textInput"></input-box> -->
        <div class="input-text">
            <input :style="inputStyle" type="text" v-model="textInput" @input="onInput">
        </div>
    </div>
</template>

<script>
    import announcementList from '../json/announcement.json'
    export default {
        name: 'Game',
        mounted() {
            let tempList = announcementList.map(o => o)
            let targetItems = []
            for (let i = 0; i < 10; i++) {
                let item = tempList[Math.floor(Math.random() * tempList.length)];
                tempList.splice(tempList.indexOf(item), 1)
                targetItems.push(item)
            }
    
            //generate string
            for (let item of targetItems) {
                this.msg += [item.firstName.replace(' ', ''), item.lastName.replace(' ', '')].join(' ') + ' '
            }
    
            console.log('item', targetItems)
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
                currentStyle: 'color:green;',
                inputStyle:''
            }
        },
        methods: {
            onInput(event) {
                console.log('on-type', this.textInput, this.current)
                if (event.data === ' ') {
                    if (this.current === this.textInput.split(' ').join('')) {
                        this.charDone += this.textInput.split(' ')[0].length + 1
                        console.log('charDone', this.charDone)
                        this.textInput = '' // clear
                        this.currentStyle = 'color:green;'
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
                            this.currentStyle = 'color:green;'
                            this.inputStyle = ''
                        }
                    }
                }
    
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
        /* fallback */
        -webkit-line-clamp: 2;
        /* number of lines to show */
        -webkit-box-orient: vertical;
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
