<template>
    <div :class="'subscription-cont ' + permissionStatus">
        <div v-if="permissionStatus === 'default'">
            You want latest airdrops and updates on your screen? click <span class="here" @click="permit()">here</span> to subscribe!
        </div>
        <div v-if="permissionStatus === 'granted'">
            You are subscribed to XRPL Tools notifications!
        </div>        
        <div v-if="permissionStatus === 'denied'">
            XRPL Tools is blocked from sending you notifications, if you wish to unblock it please click <a class="here">here</a> for instruction to unblock from your browser
        </div>                
    </div>
</template>

<script>

import { subscribe, init, askPermission, checkPermission } from '@/utils/notification';

export default {
  props: [''],   
  components: {
  },
  data() {
    return {
        permissionStatus: 'default'
    }
  },
  beforeCreate() {
      init();
  },
  created() {
      this.checkPermission();
  },
  mounted() {
  },
  methods: {
    permit() {
        let meths = this;
        askPermission(function(result) {
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
    color: blue;
    cursor: pointer;
}

.subscription-cont {
    font-family: 'Roboto-Regular';
    font-size: 12px;
    margin-bottom: 10px;
    border: 1px black solid;
    padding: 5px;
}

.granted {
    background-color: rgba(0, 128, 0, 0.357);
}

.default {
    background-color: rgba(124, 156, 250, 0.487);
}

.denied {
    background-color: rgba(243, 188, 6, 0.487);
}

</style>