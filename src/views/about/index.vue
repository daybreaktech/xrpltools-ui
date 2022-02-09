<template>
    <div class="app-container">
      <!-- <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-row class="tip tip-header">
            IF YOU FIND THIS USEFUL, WE'D APPRECIATE SOME TIPS!
        </el-row>
        <el-row class="qr-cont" style="text-align: center; font-family: 'Dongle'; font-size: 20px; font-weight: bold;">
            <span>Scan this QR using your Xumm app!</span>
            <img class="qr" src="https://gcdn.pbrd.co/images/N5nF2DMu9qSV.png?o=1"/>
            <span>OR</span>
        </el-row>
        <el-row class="qr-cont">
            <el-button type="primary" class="tip-button tip-button-xumm" onclick="location.href='https://xumm.app/detect/request:rMfEg9Vy3VhPjZ3z7Sd44EpTaNzkPjCK5S'">Click here to Open Xumm App</el-button>
        </el-row>
        <el-row class="qr-cont">
            <el-button type="primary" class="tip-button tip-button-twitter" @click="openTipbotModal()">SEND +1 XRP USING TIPBOT</el-button>
        </el-row>         
      </el-col> -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-row class="tip tip-text">
            ABOUT DEVELOPER
        </el-row>
        <div class="el" @click="goToTwitterLink()">
            <a href="javascript:void(0);">
            <img class="andrea" src="https://pbs.twimg.com/profile_images/1473378251208740865/8U7Ob9u7_400x400.jpg"/>
            </a>
        </div>
        <el-row style="text-align: center;">
          <a @click="goToTwitterLink()" href="javascript:void(0);" style="font-size: 30px; font-weight: bold; text-align: center;">@xrpltool</a>
        </el-row>        
      </el-col>      
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-row class="tip tip-text">
            FUTURE PLANS, RELEASE AND ETC.
        </el-row>
        <div>
           <ul class="etc-text">
             <li>This is just a beta version, we plan to replace the url to xrpl.tools.app and xrpltools.com as homepage for both web and mobile gateways in the future or something liek that</li>
             <li>Primary plan is to put this on native Android and iOS but it looks like we're going hybrid, idk we're not genuises here =)</li>
             <li>XRPL Tools Airdrop API and Client - Berinays 1.0.0 (Don't call airdrop tools as BOT FFS, they are dumb computer program that follows the programmer's code, automation perhaps!)</li>
             <li>XRPL Super Highend Specs Validator (LOL)</li>
             <li style="text-decoration: line-through;">Airdrop schedules, collaboration with <a href="https://twitter.com/XRP_Airdrops">@XRP_Airdrops</a></li>
             <li>Xumm Integration: Signing, setting up trustlines and etc.</li>
             <li>Push Notifications: New airdrops, new trustlines, token price drastic changes</li>
             <li>XRPL client decentralized Exchange (DEX)</li>
             <li>We are not perfect, we're still learning everything about XRPLF >:[</li>
             <li>If you are developer (Especially in PH) please contact me us through twitter! We're looking for someone who is god at Javascript/Node/Vue</li>
           </ul>
        </div>      
      </el-col>


              <div>
                <v-modal name="modal-tipbot" :width="400" :height="450" :adaptive="true">
                  <div class="modal-tipbot-cont" style="padding: 10px;">
                    <el-row style="padding: 10px;">
                      <el-col :xs="4" :sm="4" :md="4" :lg="4">
                        <img height="50" width="50" src="https://hosting.photobucket.com/images/i/xrpltools/tipbot.png"/>
                      </el-col>
                      <el-col :xs="19" :sm="19" :md="19" :lg="19">
                        <div>
                          <label style="font-size: 30px;"> Ledger TipBot </label>
                        </div>
                        <div>
                          Send and receive tips & gift payments using Twitter
                        </div>
                      </el-col>                      
                    </el-row>
                    <el-row style="text-align: center; font-size: 20px; font-weight: bold;">
                      Setup TipBot by scanning this QR using your Xumm Wallet
                    </el-row>
                    <el-row class="modal-tipbot-image">
                      <img height="200" width="200" src="https://hosting.photobucket.com/images/i/xrpltools/tipbot_qr.PNG"/>
                    </el-row>
                    <el-row class="modal-tipbot-button">
                      <el-button type="primary" @click="sendTipbot()" class="tip-button-twitter">No, my tipbot is setup. Lets go!</el-button>
                    </el-row>
                    <el-row class="modal-tipbot-button">
                      <el-button type="primary" @click="$modal.hide('modal-tipbot')">I need more time to setup my tipbot..</el-button>
                    </el-row>
                  </div>
                </v-modal>
            </div>        
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
        window.open("https://twitter.com/xrpltool", '_blank');
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
  background-color: #3d3c3c;
  color: whitesmoke;
  font-weight: bolder;
  margin-bottom: 40px;
  font-size: 25px;
}

.el {
  margin: auto;
  border-radius: 50%;
  width: 190px;
  height: 190px;
  position: relative;
  overflow: hidden;
  border: 2px solid #3d3c3c;
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

.tip-text {
  letter-spacing: 2px;
}
</style>