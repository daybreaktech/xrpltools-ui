<template>
    <div class="wallet-selection-cont">
        <el-row class="wallet-selection-saved" style="margin-bottom: 20px;">
            <div class="wallet-section-saved-address">
                <span> {{ savedWallet != null ? savedWallet : "You've got no saved wallet/address." }} </span>
            </div>
            <div style="float: right; padding-top: 3px;" @click="onRemoveFireBack">
                <span class="wallet-section-saved-remove" v-if="savedWallet != null"><CloseLogo size="15" color="red"/></span>
            </div>
        </el-row>         
        <el-row class="wallet-selection-heading">
            Select From Accounts
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-select class="wallet-selection-select" v-model="selectedWallet" style="width: 100%;" @change="onAccountDropdownSelect">
                <el-option v-for="wallet in savedWallets" :key="wallet.address" :value="wallet.address" :label="wallet.accountName">
                    {{ wallet.accountName }}
                </el-option>
            </el-select>
        </el-row> 
        <el-row style="margin-top: 20px;" class="wallet-selection-heading">
            Or Input Address
        </el-row>    
        <el-row style="margin-top: 10px;">
            <el-col :xs="20" :sm="20" :md="20" :lg="20">
                <el-input placeholder="rNixerUVPwrhxGDt4UooDu6FJ7zuofvjCF" :class="'wallet-selection-input ' + resultStyle" v-model="inputedWallet" @change="onAccountFieldChange" :disabled="disableInput"></el-input>
            </el-col>
            <el-col v-if="isLoading == true" :xs="4" :sm="4" :md="4" :lg="4">
                <div class="wallet-selection-loading-icon"><Circle2/></div>
            </el-col>
            <el-col v-if="isLoading == false" :xs="4" :sm="4" :md="4" :lg="4">
                <el-tooltip content="Paste address!">
                    <div class="wallet-selection-paste-icon" @click="pasteValue()">
                        <PasteLogo size="30"/>
                    </div>                
                </el-tooltip>
            </el-col>
            <el-col style="margin-top: 2px; padding-left: 5px;">
                <span class="wallet-selection-search-result">{{ resultText }}</span>
            </el-col>
                        
        </el-row>
        <el-row style="margin-top: 20px; float: right;">
            <el-button v-if="canSave == true" class="wallet-selection-button" @click="save()">Save</el-button>
        </el-row>                            
    </div>
</template>

<script>

import { Circle2 } from 'vue-loading-spinner'
import { getSavedAccounts, getAccount, getSavedAirdropAccount } from '@/utils/airdrop-account'
import PasteLogo from '@/svg/PasteLogo';
import CloseLogo from '@/svg/CloseLogo';

export default {
  props: ['onSaveFireBack', 'onRemoveFireBack'],
  components: {
      Circle2,
      PasteLogo,
      CloseLogo
  },
  data() {
    return {
        savedWallets: [],
        selectedWallet: null,
        inputedWallet: null,
        walletPassed: false,
        disableInput: false,
        isLoading: false,
        resultStyle: '',
        canSave: false,
        resultText: '',
        savedWallet: getSavedAirdropAccount(),
    }
  },
  created() {
      this.savedWallets = getSavedAccounts();
  },
  watch: {
      "inputedWallet" : function(value) {
          this.validateInput(value);
      },
      "resultStyle" : function(value) {
          if (value == 'success') {
              this.resultText = 'Address is valid';
              this.canSave = true;
          } else if (value == 'fail') {
              this.resultText = 'Address is not valid';
              this.canSave = false;
          } else {
              this.resultText = '';
              this.canSave = false;
          }
      }
  },
  mounted() {
  },
  methods: {
      save() {
          const walletAddress = this.inputedWallet;
          this.onSaveFireBack(walletAddress);
      },
      pasteValue() {
        const meths = this;
        const text = navigator.clipboard.readText();

        if (text && text != null && text != '') {
            text.then(value => {
                meths.inputedWallet = value;
            });
        }
      },
      validateInput(value) {
          const meths = this;
          meths.resultStyle = '';
          if (value && value.length >= 32) {
            meths.isLoading = true;
            getAccount(value).then(response => {
                meths.isLoading = false;
                if (response.status == 200) {
                    meths.resultStyle = 'success';
                } else {
                    meths.resultStyle = 'fail';
                }
            })           
          } 
      },
      onAccountDropdownSelect(selected) {
          this.inputedWallet = selected;
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

.wallet-selection-cont {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 5px;
    font-family: 'Roboto-Regular' !important;    
}

.wallet-selection-button {
    font-family: 'Roboto-Regular' !important;
    font-size: 13px !important;
    border-radius: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #0029FF !important;
    border-color: #0029FF !important;
}

.wallet-selection-loading-icon {
    padding: 5px;
}

/* .cube.panelLoad .cube-face {
    color: #0029FF !important;
    border: 1px solid #0029FF !important;
    -webkit-box-shadow: inset 0 0 0 1px #0029FF, 0 0 1px 1px #0029FF !important;
} */

.wallet-selection-cont .spinner {
    height: 30px !important;
    width: 30px !important;
    border-color: #0029FF #909091 #909091 !important;
}

.wallet-selection-select .el-input__inner {
    border: solid 2px black !important;
    background-color: #EEEEEE !important;
    font-family: 'Roboto-Regular' !important;
    font-size: 15px !important;
    font-weight: bold !important;
}

.wallet-selection-input .el-input__inner {
    font-family: 'Roboto-Regular' !important;
    font-size: 15px !important;
    font-weight: bold !important;
}

.wallet-selection-input.success .el-input__inner {
    background-color: #84e89d58 !important;
}

.wallet-selection-input.fail .el-input__inner {
    background-color: #ff83834f !important;
}

.wallet-selection-heading {
    font-size: 18px;
    font-weight: bold;
}

.wallet-selection-small {
    font-size: 15px;
    font-weight: bold;
}

.wallet-selection-paste-icon {
    margin-left: 10px;
    margin-top: 5px;
    cursor: pointer;
}

.wallet-selection-saved {
    font-size: 10px;
    letter-spacing: 0.5px;
    text-decoration: underline;
}

.wallet-section-saved-remove {
    cursor: pointer;
}

.wallet-section-saved-address {
    float: left; padding-top: 1px;
    border: 1px solid black;
    padding: 5px;
    background-color: #EEEEEE !important;
}

.wallet-selection-search-result {
    margin-top: 2px;
    font-size: 10px;
    font-weight: bold;
}

</style>