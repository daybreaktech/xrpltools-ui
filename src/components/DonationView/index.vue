<template>
  <div class="donation-cont">
      <el-row style="margin-top: 10px !important; text-align: right; padding-right: 10px;"> 
        <span @click="closeModal()"><CloseLogo style="cursor: pointer;" size="30"/></span>
      </el-row>        
      <el-row class="donation-or"> 
        Scan QR code using XUMM App
      </el-row>  
      <el-row class="donation-qr-cont-main">
          <div class="donation-qr-image-cont" :style="'background-image: url(' + require('@/assets/donation_qr_code.png') + ')'">
          </div>
      </el-row>
      <el-row class="donation-address-cont">
          <span class="donation-address" :style="toolTipClicked == true ? 'background-color: #FFFF00' : ''">{{ donationAddress }}</span> 
          <el-tooltip effect="dark" content="Copy to Clipboard!"><span class="donation-address-copy" @click="clickTooltip"><CopyLogo :size="13" color="#3d3c3c"/></span></el-tooltip>   
      </el-row>
      <el-row class="donation-or"> 
        OR
      </el-row>            
      <el-row class="donation-button-cont-main">
          <div class="donation-button-cont" @click="goToXummRequestPayment()">
              <el-col :xs="6" :sm="6" :md="6" :lg="6">
                  <div class="donation-button-logo"><XummLogo size="40" color="#3d3c3c"/></div>
              </el-col>
              <el-col :xs="18" :sm="18" :md="18" :lg="18">
                  <span class="donation-button-text">Click/Tap here to open XUMM app</span>
              </el-col>              
          </div>
      </el-row>
  </div>
</template>

<script>

import CopyLogo from '@/svg/CopyLogo';
import XummLogo from '@/svg/XummLogo';
import CloseLogo from '@/svg/CloseLogo';

export default {
  components: {
      CopyLogo,
      XummLogo,
      CloseLogo
  },
  data() {
      return {
          toolTipClicked: false,
          donationAddress: "rsUyQLdNwmYnUrr2hiWbXxtSzXNirzn2gB"
      }
  },
  computed: {
  },
  methods: {
      closeModal() {
          this.$modal.hide('donation-modal');
      },
      goToXummRequestPayment() {
          window.open('https://xumm.app/detect/request:rsUyQLdNwmYnUrr2hiWbXxtSzXNirzn2gB', '_blank');
      },
      clickTooltip() {
          let meths = this;
          meths.toolTipClicked = true;
          this.copyToClipBoard();
          setTimeout(function(){
              meths.toolTipClicked = false;
          }, 100);
      },
      copyToClipBoard() {
          navigator.clipboard.writeText(this.donationAddress);
      }
  }
}
</script>

<style>
  
.donation-address {
    text-align: center;
}

.donation-address-copy {
    cursor: pointer;
    margin-left: 5px;
    padding-top: 20px;
}

.donation-address-cont {
    text-align: center;
}

.donation-cont {
    font-family: 'Dongle';
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
}

.donation-qr-image-cont {
    background-size: contain;
    height: 250px;
    width: 250px;
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 15px;
}

.donation-qr-cont-main {
}

.donation-address-cont-main {
    padding-top: 15px;
}


.donation-button-cont-main {
    margin-top: 10px;
}

.donation-button-cont {
    height: 50px;
    width: 300px;
    border: 1px solid rgb(187, 184, 184);
    margin: 0 auto;
    padding-top: 13px;
    cursor: pointer;
}

.donation-button-text {
    font-size: 15px;
}

.donation-button-logo {
    text-align: right;
    padding-right: 5px;
}

.donation-or {
    margin-top: 10px;
    text-align: center;
    color: rgb(175, 175, 175);
}

.el-tooltip:hover {
    pointer-events: auto;
}

</style>
