<template>
    <div class="airdrop-banner-cont">

        <el-col class="airdrop-banner-xrp-logo-cont" :xs="4" :sm="2" :md="2" :lg="2">
            <XrpLogo size="35"/> 
        </el-col>  
        <el-col :xs="13" :sm="18" :md="18" :lg="18">
            <el-row>
                <span class="airdrop-banner-xrp-label">XRP</span>
            </el-row>
            <el-row>
                <div><span class="airdrop-banner-xrp-rate">$ {{ xrpPrice.price }}</span></div>
                <div>
                    <span :class="'airdrop-banner-xrp-percentage airdrop-banner-xrp-result-' + xrpPrice.result">
                        {{ xrpPrice.result == 'up' ? '+' : '-' }} {{ xrpPrice.percentage }}% 1h
                    </span>
                </div>                
            </el-row>
        </el-col> 
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
            <div class="airdrop-banner-wallet-button" @click="fireBack">
                {{ wallet && wallet != null && wallet != '' ? generateWalletText(wallet) : 'Add Wallet' }}
            </div>            
        </el-col> 
    </div>
</template>

<script>

import XrpLogo from '@/svg/XrpLogo';
import { getXRPValue } from '@/api/airdrops-api';
import CloseLogo from '@/svg/CloseLogo';

export default {
  props: ['fireBack', 'wallet'],
  components: {
      XrpLogo,
      CloseLogo
  },
  created() {
      this.fetchAndComputeXRP();
  },
  data() {
    return {
        xrpPrice: {
            price: 0,
            result: '',
            percentage: 0
        }         
    }
  },
  methods: {
    generateWalletText(wallet) {
        const first = wallet.substring(0, 4);
        const second = wallet.substring((wallet.length - 4));
        return first + "..." + second;
    },
    fetchAndComputeXRP() {
        let meths = this;
        getXRPValue()
        .then(response => response.json()).then(data => {
            const length = data.prices.length -2;
            const recent = data.prices[(length - 1) + 1];
            const current = data.prices[(length - 1) + 2];

            meths.computeXRP(recent, current);
        })        
    },
    computeXRP(recent, current) {
        const recentPrice = parseFloat(recent[1]);
        const currentPrice = parseFloat(current[1]);
        const computedPrice = recentPrice - currentPrice;

        this.xrpPrice = {
            price: currentPrice.toFixed(2),
            result: this.getXrpComputationResult(computedPrice),
            percentage: this.percentage(recentPrice, currentPrice)
        }
    },
    getXrpComputationResult(computedPrice) {
        return computedPrice < 0 ? 'up' : 'down';
    },
    percentage(num, per){
        const perc = (num/100) * per;
        return perc.toFixed(4);
    },      
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

.airdrop-banner-xrp-result-up {
    color: #329D00;;
}

.airdrop-banner-xrp-result-down {
    color: #b30a0a;;
}

.airdrop-banner-cont {
    margin: auto;
    font-family: 'Roboto-Regular';
}

.airdrop-banner-cont .el-col {
}

.airdrop-banner-xrp-logo-cont {
    text-align: center;
}

.airdrop-banner-xrp-label {
    font-weight: bold;
    font-size: 14px;
    color: #515151;
}

.airdrop-banner-xrp-rate {
    font-size: 18px;
    font-weight: bold;
    float: left;
}

.airdrop-banner-wallet-button {
    text-align: center;
    width: 100px;
    background-color: #0029FF;
    border-radius: 15px;
    height: 30px;
    color: #FFFFFF;
    font-size: 13px;
    padding-top: 9px;
    cursor: pointer;
    margin-top: 5px;
    display: inline-block;
}

.airdrop-banner-wallet-remove {
    display: inline-block;
}

.airdrop-banner-xrp-percentage {
    font-size: 10px;
    font-weight: bold;
    margin-left: 5px;
}


</style>