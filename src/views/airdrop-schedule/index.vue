<template>
    <el-col class="airdrop-schedule-cont" :xs="24" :sm="24" :md="12" :lg="12">
        <div style="margin-top: 10px; margin-bottom: 15px; cursor: pointer;">
            <div @click="goBack()">
                <span class="airdrop-schedule-return"><ReturnLogo :size="8"/></span><span class="airdrop-schedule-heading">Airdrop</span>
            </div>
        </div>        
        <el-row class="airdrop-schedule-info-cont">
            <el-row class="airdrop-schedule-info-token">
                <div class="airdrop-schedule-info-token-sub-cont">
                    <el-col :xs="10" :sm="10" :md="10" :lg="10">
                        <div class="airdrop-schedule-info-image" :style="'background-image: url(' + getImage(airdropInfo) + '),' + 'url(' + require('@/assets/no-image.png') + ')'"></div>
                    </el-col>
                    <el-col :xs="14" :sm="14" :md="14" :lg="14">  
                        <el-row class="airdrop-schedule-airdrop-title-cont">
                            <span class="airdrop-schedule-airdrop-title">{{ airdropInfo.shortDesc }}</span>
                        </el-row>
                        <el-row class="airdrop-schedule-token-name-cont">
                            <span class="airdrop-schedule-token-name">[{{ getTrustlineName(airdropInfo.trustline) }}]</span>
                            <span style="margin-left: 5px; cursor: pointer;" v-if="validateTwitter(airdropInfo.trustline)" @click="goToLink(airdropInfo.trustline.twitterUrl)">
                                <TwitterLogo size="15"/>
                            </span>                            
                        </el-row>
                        <el-row style="margin-top: 10px;" v-if="isDateExpired(airdropInfo.isAirdropExpired) && !isTokenScam(airdropInfo.trustline)">
                            <span class="airdrop-expired">EXPIRED</span>
                        </el-row>                        
                    </el-col>
                </div>
            </el-row>
            <el-row class="airdrop-schedule-info-buttons" >
                <el-row class="schedule-buttons" style="margin-top: 5px;">
                    <el-row v-if="!isTokenScam(airdropInfo.trustline)">
                        <el-col style="padding-top: 7px;" :xs="8" :sm="8" :md="8" :lg="8">
                            <SoloIcon :trustline="airdropInfo.trustline"/>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="8" :lg="8" style="padding-top: 15px; text-align: center;">
                            <div style="margin: auto;"><XummIcon :airdrop-info="airdropInfo" size="40" :trustline-set="isSetTrustline"/></div>
                        </el-col>
                        <el-col style="padding-top: 7px;" :xs="8" :sm="8" :md="8" :lg="8">
                            <ShareIcon :airdrop-info="airdropInfo" :disabled="isDisabled(airdropInfo.category)"/>
                        </el-col>   
                    </el-row>
                    <el-row style="padding-left: 20px; padding-right: 20px; padding-top: 20px;" v-else>
                        <div class="scam-cont">
                            This token is a scam!
                        </div>
                    </el-row>                             
                </el-row>
            </el-row>
        </el-row>

        <el-row class="schedule-adsense-cont">
            <Adsense class="adsbygoogle infeed"
                    style="display:block"
                    data-ad-format="fluid"
                    data-ad-layout-key="-go+2n+2p-5o+2f"
                    data-ad-client="ca-pub-5777388526924455"
                    data-ad-slot="7773285914">
            </Adsense>
        </el-row>        

        <el-row v-show="!isTokenScam(airdropInfo.trustline)">
            <div style="margin-top: 20px; margin-bottom: 15px;">
                <span class="airdrop-schedule-heading">Dates</span>
            </div>
            <el-row class="airdrop-schedule-info-cont airdrop-schedule-date-cont">
                <el-row class="airdrop-schedule-snapshot-cont">
                    <span class="airdrop-schedule-date-label">Snapshot:</span>
                    <span :class="'airdrop-schedule-date-value ' + isDateExpiredForDateClass(airdropInfo.isSnapshotExpired)" > 
                        &nbsp;{{ airdropInfo.snapshotDate ? moment(String(airdropInfo.snapshotDate)).format('MMM DD [@] ha') : 'N/A' }}
                    </span>
                </el-row>
                <el-row class="airdrop-schedule-airdrop-cont">
                    <span class="airdrop-schedule-date-label">Airdrop:</span>
                    <span :class="'airdrop-schedule-date-value ' + isDateExpiredForDateClass(airdropInfo.isAirdropExpired)"> 
                        &nbsp;{{ airdropInfo.airdropDate ? moment(String(airdropInfo.airdropDate)).format('MMM DD [@] ha') : 'N/A' }}
                    </span>
                </el-row>
            </el-row>

            <div style="margin-top: 20px; margin-bottom: 15px;">
                <span class="airdrop-schedule-heading">Details</span>
            </div>

            <el-row :class="'airdrop-schedule-info-cont airdrop-schedule-details-cont ' + isDescDisabled(airdropInfo.category)">
                <el-row>
                    <div style="white-space: pre-line; word-wrap: break-word;" v-linkified v-html="airdropInfo.longDesc">

                    </div>
                </el-row>
                <el-row v-if="airdropInfo.refsUrl" class="schedule-reference" style="margin-top: 20px;">
                    <span class="schedule-details-ref">&#8269; Source Reference <a :href="airdropInfo.refsUrl" target="_blank">here</a></span>
                </el-row>            
            </el-row>            
        </el-row>
    </el-col> 
</template>

<script>

import XummIcon from '@/components/icons/XummIcon'
import SoloIcon from '@/components/icons/SoloIcon'
import ShareIcon from '@/components/icons/ShareIcon'
import TwitterLogo from '@/svg/TwitterLogo'
import ReturnLogo from '@/svg/ReturnLogo';
import { getAirdropByCode } from '@/api/airdrops-api'
import moment from 'moment';
import { putVisit } from '@/utils/airdrop-visit';
import { getSavedAirdropAccount, getAccountTrustlinesRipple } from '@/utils/airdrop-account';

export default {
  props: ['airdrop'],
  components: {
      XummIcon,
      SoloIcon,
      ShareIcon,
      TwitterLogo,
      ReturnLogo,
  },
  data() {
    return {        
        airdropInfo: null,
        moment: moment,
        carryInfo: undefined,
        isSetTrustline: undefined,
        accountTrustlines: [],
    }
  },
  beforeCreate() {
  },
  created() {
      this.initAirdropInfo();
      this.initParams();
  },
  mounted() {
  },
  methods: {
    isDescDisabled(category) {
        return this.isDisabled(category) ? 'desc-disabled' : '';
    },
    isDisabled(category) {
        return category && category != null && category != '' && (category === "ARCHIVE" || category === "TRASH");
    },
    isTokenScam(trusline) {
        return trusline && trusline != null && trusline.isScam && trusline.isScam == true;
    },
    isDateExpiredForDateClass(theDate) {
        return this.isDateExpired(theDate) == true ? 'date-expired' : '';
    },
    isDateExpired(theDate) {
      return theDate === true;
    },      
    initAddressAndWallet() {
        let meths = this;
        this.initWalletAddress(function(value){
            if (value != []) {
                meths.accountTrustlines = value;
                meths.initSetTrustline();
            }
        });
    },  
    initWalletAddress(callback) {
        const account = getSavedAirdropAccount();
        if (account && account != null) {
            getAccountTrustlinesRipple(account).then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        if (data.result === "success") {
                            const lines = data.balances.map(line => {
                                return {
                                    issuerAddress: line.counterparty,
                                    currencyCode: line.currency
                                }
                            });
                            callback(lines);                           
                        } else {
                            callback([]);
                        }
                    })
                }                
            })            
        } else {
            callback([]);
        }
    },      
    initSetTrustline() {
      let meths = this;
      this.checkAccountForTrustline(function (value) {
        meths.isSetTrustline = value;
      });
    },
    checkAccountForTrustline(callback) {
      const account = getSavedAirdropAccount();
      const airdropTrustline = this.airdropInfo.trustline;
      const savedTrustlines = this.accountTrustlines;

      if (account && account != null && airdropTrustline && airdropTrustline != null && savedTrustlines != []) {
        let filtered = savedTrustlines.filter(saved => {
          return saved.currencyCode == airdropTrustline.currencyCode && 
          saved.issuerAddress == airdropTrustline.issuerAddress;
        });
        
        callback(filtered.length && filtered.length > 0 ? true : false);
      } else {
        callback(false);
      }
    },      
    initParams() {
        if (this.$route.params && this.$route.params.carryInfo) {
            this.carryInfo = this.$route.params.carryInfo;
        }
    },
    goBack() {
        const route = this.$route.query.route;

        this.$router.push({
            name: route ? route : 'airdrops',
            params: {
                carryInfo: this.carryInfo
            }
        })
    },
    initAirdropInfo() {
        let meths = this;
        if (meths.airdrop && meths.airdrop != null) {
            meths.airdropInfo = meths.airdrop;
        } else {
            const code = this.$route.query.code;
            getAirdropByCode(code)
                .then(body => body.json()).then(data => {
                    meths.airdropInfo = data;
                    meths.initAddressAndWallet();
                    putVisit(meths.airdropInfo.id);
                });
        }
    },
    getImage(air) {
        if (air.useTrustlineImg && air.useTrustlineImg != null && air.useTrustlineImg == true) {
            return air.trustline.imageUrl;
        } else {
            return air.imageUrl;
        }
    },    
    getTrustlineName(trustline) {
      return trustline && trustline != null ? trustline.name : "No-Token";
    },
    validateTwitter(trustline) {
        return trustline && trustline != null && trustline.twitterUrl && trustline.twitterUrl != null && trustline.twitterUrl != '';
    },
    goToLink(url) {
        window.open(url, '_blank');
    }   
  }
}
</script>

<style>

@media (max-width: 768px) {
    .schedule-adsense-cont .adsbygoogle {
        height: 120px;
    }
}

@media (min-width: 769px) and (max-width: 992px) {
    .schedule-adsense-cont .adsbygoogle {
        height: 120px;
    }                 
}

@media (min-width: 993px) and (max-width: 1199px) {
    .schedule-adsense-cont .adsbygoogle {
        height: 150px;
    }                           
}

@media (min-width: 1200px) {
    .schedule-adsense-cont .adsbygoogle {
        height: 150px;
    }                        
}

.schedule-adsense-cont {
    margin-top: 30px;
    margin-bottom: 30px;
}

.schedule-details-ref {
  font-size: 10px;
  font-style: italic;
}

.airdrop-schedule-cont {
    padding-top: 10px;
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 80px;
    font-family: 'Roboto-Regular';
    min-height: calc(100vh - 50px);
    background-color: #faf7f7;
}

.airdrop-schedule-info-cont {
    box-sizing: border-box;
    background-color: #FFFFFF;
    border: 1px solid #C0C0C2;
    border-radius: 15px;
}

.airdrop-schedule-info-token {
    border-bottom: 1px solid #C0C0C2;
    padding: 10px;
    padding-top: 15px;
    position: relative;
}

.airdrop-schedule-info-token-sub-cont {
    margin: auto;
    width: 250px;
    height: 100%;
}

.airdrop-schedule-info-image {
    border-radius: 50%;
    height: 65px;
    width: 65px;
    margin: auto;
    background-size: cover;
}

.airdrop-schedule-airdrop-title {
    color: #6F6F6F;
    font-weight: 600;
    font-size: 13px;
}

.airdrop-schedule-token-name {
    color: #181818;
    font-weight: bolder;
    font-size: 15px;
}

.airdrop-schedule-airdrop-title-cont {
    padding-top: 10px;
}

.airdrop-schedule-token-name-cont {
    padding-top: 10px;
}

.airdrop-schedule-heading {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.5px;    
}

.airdrop-schedule-snapshot-cont {
    padding-top: 17px;
    height: 50px;
    border-bottom: 1px solid #C0C0C2;
    text-align: center;
}

.airdrop-schedule-airdrop-cont {
    padding-top: 17px;
    height: 50px;
    text-align: center;
}

.airdrop-schedule-date-label {
    color: #6A6A6A;
    font-weight: bold;
    font-size: 13px;
}

.airdrop-schedule-date-value {
    font-weight: bold;
    color: #181818;
    font-size: 15px;
}

.airdrop-schedule-details-cont {
    min-height: 200px;
    padding: 20px;
    white-space: pre-line;
    font-size: 13px;
}

.airdrop-schedule-details-cont a {
    text-decoration: underline;
    color: rgb(12, 12, 192);
}

.airdrop-schedule-return {
    margin-right: 8px;
}

.date-expired {
  color: #FF0000 !important;
}

.schedule-buttons {
    min-height: 80px;
}

.scam-cont {
    font-family: 'Roboto-Regular';
    font-size: 12px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    border: 2px #FF0000 solid;
    background-color: #FFF8F8;
    color: #FF0000;    
}

.airdrop-expired {
    color: #FF0000;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 15px;
}

.desc-disabled {
    background-color: #6a6a6a25;
}

</style>