<template>
    <div class="share-icon-cont">
        <div class="share-icon-logo" @click="goShare()">
          <el-tooltip :content="this.disabled == false ? 'Share this airdrop information' : 'Sharing this airdrop is disabled'">
            <ShareLogo :size="45" :color="disabled === false ? '#343434' : '#aeadadaa'"/>
          </el-tooltip>
        </div>          
    </div>
</template>

<script>

import moment from 'moment';
import ShareLogo from '@/svg/ShareLogo'

export default {
  props: ['airdropInfo', 'disabled'],
  components: {
      ShareLogo
  },
  data() {
    return {
        moment: moment
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    goShare() {
      if (this.disabled == false) {
        this.shareToTwitter();
      }
    },
    shareToTwitter() {
      this.triggerEvent("schedule", "schedule-icon-share", "Schedule Share Icon Clicked", "");  
      const airdrop = this.airdropInfo;

      if (airdrop) {
        let text = `#Airdrop - ${airdrop.shortDesc}` + 
        `\n` +
        `\n` +        
        `Token: ${airdrop.trustline && airdrop.trustline != null ? '$' + airdrop.trustline.name : 'TBA'} \n` +
        `Twitter: ${airdrop.trustline && airdrop.trustline.twitterUrl && airdrop.trustline.twitterUrl != null ? this.getTwitterHandle(airdrop.trustline.twitterUrl) : 'TBA'} \n` +        
        `More Details: \n` +
        `https://xrpltools.com/#/schedule?code=${airdrop.code}&route=airdrops \n` +
        `\n` +
        `For more airdrops: \n` +
        `https://xrpltools.com/#/airdrops \n` +        
        `\n` +
        `Feeds provided by @XRP_Airdrops \n` + 
        `Powered by @xrpltool - xrpltools.com \n` + 
        `\n` +  
        `#XRP #XRPCommunity #XRPARMY #XRPL`;

        window.open('https://twitter.com/intent/tweet?text=' + escape(text), '_blank');
      }
    },
    getTwitterHandle(twitterUrl) {
        if (twitterUrl && twitterUrl != null && twitterUrl != '') {
          let last = twitterUrl.charAt(twitterUrl.length - 1);
          let twitt = twitterUrl;

          if (last == "/") {
            twitt = twitt.substring(0, twitt.length - 1);
          }

          return '@' + twitt.substring(twitt.lastIndexOf('/') + 1);
        }

        return undefined;
    },
    // events
    
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

@media (max-width: 768px) {
    
}

@media (min-width: 769px) and (max-width: 992px) {

}

@media (min-width: 993px) and (max-width: 1199px) {

}

@media (min-width: 1200px) {
   
}

.share-icon-text {
  text-align: center;
}

.share-icon-logo {
  margin: auto;
}

.share-icon-cont {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 10px;
  width: 70px;
  margin: auto;
  text-align: center;
}

.share-icon-cont {
  font-family: 'Dongle';
}

.share-icon-logo {
  cursor: pointer;
}

.collalala {
  color: #aeadadaa;
}

</style>