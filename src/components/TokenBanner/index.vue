<template>
        <el-row class="schedule-card-trustline-cont">
            <el-row v-if="tokenInfo && tokenInfo.imageUrl" class="schedule-card-image-cont" 
                :style="'background-image: url(' + tokenInfo.imageUrl + ')'">
            </el-row>
            <el-row v-if="!(tokenInfo && tokenInfo.imageUrl)" class="schedule-card-image-cont" 
                :style="'background-image: url(' + require('@/assets/no-image.png') + ')'">
            </el-row>

            <el-row class="schedule-card-token">
                <span class="schedule-card-token-name"> {{ tokenInfo.tokenName ? tokenInfo.tokenName : '[No-Token]' }} </span>
                <span v-if="!tokenInfo.tokenName">
                    <el-tooltip content="Issuer's token/trustline to be announced">
                    <span class="schedule-card-token-tooltip">(?)</span>
                    </el-tooltip>                  
                </span> 
                <span class="schedule-card-twitter-handle" @click="goToLink(tokenInfo.twitterUrl)">
                    <TwitterLogo :size="15" color="#1DA1F2"/>
                    <!-- <span @click="goToLink(airdropInfo.twitterUrl)">{{ getTwitterHandle(airdropInfo.twitterUrl) }}</span> -->
                </span>     
            </el-row>                                
        </el-row>    
</template>

<script>

import TwitterLogo from '@/svg/TwitterLogo'

var obj = {
    tokenName: '',
    imageUrl: '',
    twitterUrl: ''
}

export default {
  props: ['tokenInfo'],
  components: {
      TwitterLogo
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    goToLink(url) {
      if (url && url != null && url != '') {
          this.triggerEvent("schedule", "schedule-token-twitter-profile-click", "Schedule profile twitter click", "");
          window.open(url, '_blank');
      }  
    },
    isTwitterExist(obj) {
      return obj.twitterUrl && obj.twitterUrl != null && obj.twitterUrl != '';
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

.schedule-card-trustline-cont {
  background-color: rgb(49, 47, 47);
  padding-bottom: 10px;
}

.schedule-card-image-cont {
  border: 1px black solid;
  height: 100px;
  border-radius: 50%;
  width: 100px;
  margin: 0 auto;
  margin-top: 20px;
  background-size: contain;
}

.schedule-card-token {
  margin-top: 10px;
  height: 20px;
  text-align: center;
  padding-left: 16px;
}

.schedule-card-token-name {
  font-weight: 600;
  color: whitesmoke;
  letter-spacing: 2px;
}

.schedule-card-token-tooltip {
  text-decoration: underline;
  color: blue;
  font-size: 10px;
}

.schedule-card-twitter-handle {
  font-family: 'Dongle';
  color: #1DA1F2;
  letter-spacing: 2px;
  font-weight: 600;
  cursor: pointer;
}


</style>