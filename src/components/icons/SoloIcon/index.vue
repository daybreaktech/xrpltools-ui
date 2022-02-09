<template>
    <div class="solo-icon-cont">
        <div class="solo-icon-logo" @click="goToDex()">
          <el-tooltip :content="trustline && trustline != null ? 'View token on Sologenic Dex' : 'This airdrop does not have assigned token yet'">
            <SoloLogo :size="40" :color="trustline && trustline != null ?  '#3d3c3c' : '#acabab'"/>
          </el-tooltip>
        </div>          
    </div>
</template>

<script>

import moment from 'moment';
import SoloLogo from '@/svg/SoloLogo'

export default {
  props: ['trustline'],
  components: {
      SoloLogo
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
    goToDex() {
      if (this.trustline && this.trustline != null) {
        this.triggerEvent("schedule", "schedule-icon-solo", "Schedule Solo Icon Clicked", "");  
        window.open('https://sologenic.org/trade?market=' 
        + this.trustline.currencyCode + '%2B' + this.trustline.issuerAddress 
        + '%2FXRP&network=mainnet', '_blank');        
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

.solo-icon-text {
  text-align: center;
}

.solo-icon-logo {
  margin: auto;
}

.solo-icon-cont {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 10px;
  width: 70px;
  margin: auto;
  text-align: center;
}

.solo-icon-cont {
  font-family: 'Dongle';
}

.solo-icon-logo {
  cursor: pointer;
}

</style>