<template>
    <div class="announce">
        <div class="container-logo hidden-md-down">
            <img class="img-logo" src="../assets/logo.png" alt="">
        </div>
        <section class="container" style="">
            <h1>SEMI_FINAL ROUND</h1>
            <p>การสัมภาษณ์จะจัดขึ้นใน <span class="high-light underline">วันที่ 26 พฤศจิกายน 2560 ณ อาคาร ซี.พี.ทาวเวอร์ 1 (สีลม)</span> </p>
            <p>ซึ่งจะแบ่งออกเป็น 2 รอบ คือ <span class="high-light underline">รอบช่วงเช้าตั้งแต่เวลา 9.00 น. ถึง 12.00 น.</span> และ รอบช่วงบ่ายตั้งแต่เวลา 13.00 น. ถึง 18.00 น.</p>
            <h2 class="text-left">สิ่งที่ต้องเตรียมมาในวันสัมภาษณ์</h2>
            <ol class="ol text-left">
                <li class=""><span class="high-light underline">บัตรประชาชน</span>สำหรับการแลกบัตรเข้าอาคาร ซี.พี.ทาวเวอร์ 1 (สีลม) และ <span class="high-light underline">บัตรนักศึกษา</span>สำหรับการลงทะเบียนสัมภาษณ์ กรุณาแต่งกายด้วยชุดนักศึกษา</li>
                <li class=""><span class="high-light underline">การบ้านและสิ่งที่กรรมการสาขากำหนดไว้</span> กรุณาอ่านรายละเอียดการบ้านและสิ่งที่กรรมการให้เตรียมมาให้ครบถ้วน หากสาขาใดต้องใช้โน้ตบุ๊ค ควรชาร์ตแบตเตอรี่และเตรียมอินเทอร์เน็ตส่วนตัวมาให้พร้อม เนื่องจากสถานที่ไม่มีบริการอินเทอร์เน็ตให้ใช้</li>
                <li class=""> <span class="high-light underline">Portfolio</span> สามารถนำมาประกอบการสัมภาษณ์ได้ สำหรับน้อง ๆ สาขาดีไซน์จะต้องนำ Portfolio มาด้วยทุกคน</li>
            </ol>

            <h2 class="text-left">การเดินทางมาสัมภาษณ์</h2>
            <ol class="ol text-left">
                <li class="">ด้วยรถไฟฟ้า BTS สามารถลงสถานีศาลาแดง ณ ทางออกที่ 2</li>
                <li class="">ก้วยรถไฟฟ้า MRT สามารถลงสถานีสีลม ณ ทางออกที่ 2 โดยเดินเรียบทางเท้าไปตามถนนสีลม</li>
                <li class="">ด้วยรถประจำทาง สามารถขึ้นใช้บริการสาย 15, 77, 155, 504, 177, 76</li>
            </ol>

            <h2 class="text-left">สอบถามเพิ่มเติมติดต่อ</h2>
            <ul class="ol text-left">
                <li class=""><span class="high-light">พี่เบ๊บ:</span> 064-174-7080</li>
                <li class=""><span class="high-light">พี่ฟง:</span> 092-458-7067</li>
                <li class=""><span class="high-light">พี่เบนซ์:</span> 085-666-7571</li>
            </ul>

            <p class="text-left ps">
                <span class="high-light">หมายเหตุ:</span> สำหรับน้อง ๆ ที่ไม่สะดวกเดินทางมาสัมภาษณ์ที่อาคาร CP Tower สีลม ให้ Inbox มาทาง<a href="https://www.facebook.com/ywcth" target="_blank">เพจเฟสบุ๊ค Young Webmaster Camp</a> ภายในวันที่ 20 พฤศจิกายน 2560
            </p>

        </section>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        a{
            color:#8be9fd;
        }
        li{
            cursor: auto;
        }
        .ps{
            margin-top:50px;
        }
        p{
            font-size:1.2em;
        }
        li{
            font-size:1.2em;
            margin: 10px 0;
        }
    .announce{
        width:100%;
        height:100%;
        background:#282a36;
        color:white;
        overflow:hidden;
        padding-bottom:30px
    }

    .container-logo{
        display: inline-block;
        width: 100%;
        text-align:center;
        
    }
    .img-logo{
        width: 18%;
        height:18%;
    }
    h1{
        color:#bd93f9;
        margin: 40px 0;
    }
    h2 {
        color:#bd93f9;
        margin: 30px 0;
    }
    .high-light{
        color:#8be9fd;
    }
    .underline{
        text-decoration: underline;
    }
</style>