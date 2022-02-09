<template>
    <div class="xumm-icon-cont">
        <div class="xumm-icon-logo" @click="goToTrustline()">
          <el-tooltip :content="getTooltipText()">                        
            <div v-if="trustlineSet == true">
              <XummBlackLogo :size="size"/>
            </div>
            <div v-else-if="trustlineSet == false">
              <XummColoredLogo :size="size"/>
            </div>
            <div v-else>
              <div class="xumm-icon-loading-cont"><RotateSquare2/></div>
            </div>                                    
          </el-tooltip>
        </div>          
    </div>
</template>

<script>

import moment from 'moment';
import { RotateSquare2 } from 'vue-loading-spinner'
import XummColoredLogo from '@/svg/XummColoredLogo'
import XummBlackLogo from '@/svg/XummBlackLogo'

export default {
  name: 'XummIcon',
  props: ['airdropInfo', 'size', 'trustlineSet'],
  components: {
      XummColoredLogo,
      XummBlackLogo,
      RotateSquare2
  },
  data() {
    return {
        moment: moment,
        isTrustlineSet: undefined,
    }
  },
  created() {
    
  },
  watch: {
    "trustlineSet": function(value) {
      this.isTrustlineSet = value;
    }
  },
  mounted() {
  },
  methods: {
    getTooltipText() {
      let ad = this.airdropInfo;
      if (ad.trustline && ad.trustline != null) {
        if (this.trustlineSet && this.trustlineSet == true) {
          return "You already set the trustline for this airdrop";
        } else {
          return 'Set your trustline';
        }
      } else {
        return "This airdrop does not have assigned token yet";
      }
    },
    goToTrustline() {
      if (this.airdropInfo && this.airdropInfo.trustline != null) {
        this.triggerEvent("schedule", "schedule-icon-xumm", "Schedule Xumm Icon Clicked", "");  
        window.open('https://xrpl.services/?issuer=' 
          + this.airdropInfo.trustline.issuerAddress + '&currency=' 
          + this.airdropInfo.trustline.name + '&limit=' +  this.airdropInfo.trustline.limit, '_blank');
      }
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

.xumm-icon-loading-cont {
  margin: 0 auto;
}

.xumm-icon-cont .spinner--rotate-square-2 {
  width: 35px !important;
  padding-left: 20px !important;
}


.xumm-icon-cont .spinner:after {
  background: #3051FC;
  height: 35px;
}

.xumm-icon-cont .spinner {
  margin: auto;
}

.xumm-icon-cont .spinner:before {
  width: 20px;
  margin-left: 8px;
}

.xumm-icon-text {
  text-align: center;
}

.xumm-icon-cont {
  text-align: center;
  width: 100%;
}

.xumm-icon-logo {
  cursor: pointer;
}

</style>