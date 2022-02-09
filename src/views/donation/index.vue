<template>
    <div class="app-container">
      <el-row class="tip tip-header" style="text-align: left;">
         WALLET IS OWNED BY XRP-HOLDERS-COMMUNITY IN PH AND ALL DONATIONS WILL BE GIVEN TO VICTIMS OF TYPHOON ODETTE IN VISAYAS REGION, PHILIPPINES
      </el-row>
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-row class="qr-cont" style="text-align: center; font-family: 'Dongle'; font-size: 20px; font-weight: bold;">
            <span>Scan this QR using your Xumm app!</span>
            <img class="qr" src="https://i.ibb.co/680vJ7B/odette-donation-address.png"/>
            <span>OR</span>
        </el-row>
        <el-row class="qr-cont">
            <el-button type="primary" class="tip-button tip-button-xumm" onclick="location.href='https://xumm.app/detect/request:rfwpDQvFbr1zmic9o5ChU6w9nvsuFFpJuN'">Click here to Open Xumm App</el-button>
        </el-row>        
      </el-col>     
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <div>
           <ul class="etc-text">
             <li><a style="text-decoration: underline;" href="https://www.pna.gov.ph/articles/1163057">Odette leaves 6 dead in Mandaue; no power, water in Cebu areas</a></li>
             <li><a style="text-decoration: underline;" href="https://www.rappler.com/nation/weather/typhoon-odette-pagasa-forecast-december-17-2021-5pm/">Typhoon Odette makes 9th landfall in Palawan</a></li>
             <li><a style="text-decoration: underline;" href="https://www.facebook.com/Maeybong23/videos/340636214128010">Liloan Southern Leyte bagyong odette update</a></li>
             <li><a style="text-decoration: underline;" href="https://www.facebook.com/Pinoyhistorygroup/posts/4728413637215156">Aftermath of Typhoon Odette 1</a></li>
             <li><a style="text-decoration: underline;" href="https://www.facebook.com/Pinoyhistorygroup/posts/4728440703879116">Aftermath of Typhoon Odette 2</a></li>
             <li><a style="text-decoration: underline;" href="https://www.facebook.com/watch/?v=926069954694788&extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C&ref=sharing">Aftermath of Typhoon Odette 3</a></li>
           </ul>
        </div>      
      </el-col>     
    </div>
</template>

<script>

export default {
  data() {
    return {
        ok: null
    }
  },
  created() {
    this.eventPageView();
  },
  mounted() {
  },
  methods: {
      goToTwitterLink() {
        this.eventTwitterClick();
        window.open("https://twitter.com/srspiewarmer", '_blank');
      },
      openTipbotModal() {
        this.$modal.show("modal-tipbot");

        // onclick="location.href='https://twitter.com/intent/tweet?text=%2B1%20xrp%20%40srspiewarmer%20%23tipwithxumm'"
      },
      sendTipbot() {
        window.open("https://twitter.com/intent/tweet?text=%2B1%20xrp%20%40srspiewarmer%20%23tipwithxumm", "_blank")
      },

      //events
      eventTwitterClick() {
        this.triggerEvent("about", "twitter-link-view", "Twitter Link View", "");
      },
      eventPageView(){
        this.triggerEvent("about", "page-view", "About Page View", "");
      },
      triggerEvent(category, action, label, value) {
        this.$gtag.event(action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });  
    }
  }
}
</script>

<style>

.app-container {
  font-family: 'Dongle';
}

.andrea {
  height: 190px;
  width: 190px;
}

/* unvisited link */
a:link {
  color: #409EFF;
}

/* visited link */
a:visited {
  color: #409EFF;
}

/* mouse over link */
a:hover {
  color: #409EFF;
}

/* selected link */
a:active {
  color: #409EFF;
}

.qr-cont {
  padding-top: 10px;
  padding-bottom: 10px;
  border: #e6e5e5 solid 1px;
  margin: auto; text-align: center;
}

.qr {
  height: 190px;
  width: 190px;
  margin-left: auto;
  margin-right: auto;
  display: block;  
}

.tip {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  position: relative;
  border: #e6e5e5 solid 1px;
  background-color: #409EFF;
  color: whitesmoke;
  font-weight: bolder;
  margin-bottom: 40px;
  font-size: 25px;
  padding: 10px;
}

.el {
  margin: auto;
  border-radius: 50%;
  width: 190px;
  height: 190px;
  position: relative;
  overflow: hidden;
  border: 2px solid #409EFF;
}
.el:after {
  content: url(https://img.icons8.com/doodle/2x/twitter.png);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #409EFF;
  text-align: center;
  line-height: 30px;
  color: whitesmoke;
}

.tip-button-twitter {
  width: 100%;
  background-color: rgb(3, 70, 3) !important;
  border-color: rgb(3, 70, 3) !important;
  opacity: 0.5 !important;
}

.etc-text {
  font-size: 18px;
  font-weight: 600;
}

.modal-tipbot-image {
  text-align: center;
}

.modal-tipbot-button {
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 5px;
}

.modal-tipbot-button .el-button {
  width: 100%;
  border-radius: 0;
}
</style>