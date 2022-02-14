<template>
    <div :class="'subscription-cont ' + permissionStatus" v-if="permissionStatus != ''">
        <div v-if="permissionStatus === 'default' || permissionStatus === 'unsubscribed'">
            <div class="notification-cont">
                <div class="bell-logo-cont"><BellLogo size="10" color="#6F6F6F"/></div>
                Click <span class="here" @click="subscribe()">here</span> to turn on Airdrop Notifications
            </div>
        </div>
        <div v-if="permissionStatus === 'subscribed'">
             <div class="notification-cont">
                <div class="bell-logo-cont"><BellLogo size="10" color="#6F6F6F"/></div> 
                Click <span class="here" @click="unsubscribe()">here</span> to turn off Airdrop Notifications
            </div>           
        </div>
        <div v-if="permissionStatus === 'denied'">
            <div class="notification-cont">
                <div class="bell-logo-cont"><BellLogo size="10" color="#6F6F6F"/></div> 
                Notification feature is blocked by your browser
            </div> 
        </div>
        <div v-if="permissionStatus === 'not_supported'">
            <div class="notification-cont">
                <div class="bell-logo-cont"><BellLogo size="10" color="#6F6F6F"/></div>
                Your browser does not support push notifications
            </div>             
        </div>                                                                  
    </div>
</template>

<script>

import { init, subscribe, checkPermission, unsubscribe } from '@/utils/notification';
import BellLogo from '@/svg/BellLogo';

export default {
  props: [''],   
  components: {
      BellLogo
  },
  data() {
    return {
        permissionStatus: ''
    }
  },
  beforeCreate() {
  },
  created() {
    this.pageInit();
  },
  mounted() {
  },
  methods: {
    pageInit() {
      let meths = this;
      init(function(result){
          meths.permissionStatus = result;
      });
    },
    subscribe() {
        let meths = this;
        subscribe(function(result) {
            meths.permissionStatus = result;
        });
    },
    unsubscribe() {
        let meths = this;
        unsubscribe(function(result) {
            meths.permissionStatus = result;
        });
    },   
    checkPermission() {
        this.permissionStatus = checkPermission();
    }      
  }
}
</script>

<style>

.here {
    text-decoration: underline;
    color: red;
    cursor: pointer;
    font-weight: bolder;
}

.subscription-cont {
    font-family: 'Roboto-Regular';
    font-size: 12px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 8px;
    font-weight: 500;
    text-align: center;
}

.default, .unsubscribed {
    border: 2px solid #FFDA4E;
    background-color: #FFFBEC;
}

.subscribed {
    border: 2px rgb(165, 165, 165) solid;
    background-color: rgba(165, 165, 165, 0);
}

.subscribed .here {
    color: #6F6F6F !important;
}

.denied, .not_supported {
    border: 2px #FF0000 solid;
    background-color: #FFF8F8;
}

.notification-cont {
    text-align: center;
    border-radius: 20px;
    color: #6F6F6F;
    display: inline-block;
    padding-top: 2px;
    font-size: 11px;
    font-weight: 600;
}

.bell-logo-cont {
    float: left; 
    margin-right: 7px;
}



</style>