<template>
    <div class="app-container">
        <div class="layout-container">
            <el-col class="lookup-container" :xs="24" :sm="24" :md="10" :lg="10">
                <div style="margin-bottom: 10px;">
                    <el-input class="lookup-input" v-model="issuerAddress" placeholder="Issuer's Address"></el-input>
                </div>
                <div style="margin-bottom: 10px;">
                    <el-input class="lookup-input" type="password" v-model="yourAddress" placeholder="Your Address"></el-input>
                </div>
                <div>
                    <el-button style="width: 100%; font-weight: bold;" type="primary" @click="clickLookup()"> {{ buttonLoad ? "LOOK IT UP" : "LOADING.."  }} </el-button>
                </div>

                <el-row class="lookup-adsense-cont" v-if="resultsLoaded == false">
                    <Adsense style="display:block" class="adsbygoogle infeed"
                        data-ad-format="fluid"
                        data-ad-layout-key="-ff+31+19-26-o"
                        data-ad-client="ca-pub-5777388526924455"
                        data-ad-slot="2543680975" 
                        data-full-width-responsive="true"></Adsense>
                </el-row>

                <div class="result-cont" v-loading="loading">
                    <div
                    loading="lazy"
                    :class="isLoaded ? 'div-show' : 'div-hide'"
                    @load="loadDivMethod">
                        <div v-for="trust in trustlines" :key="trust.currencyCode">
                            <el-row class="trustline-banner">
                                <TokenBanner :token-info="trust.misc"/>
                            </el-row>

                            <el-row class="lookup-result-info">
                                <el-row  class="lookup-result-label">
                                    <el-col class="lookup-result-label-cont-left" :xs="12" :sm="12" :md="12" :lg="12">
                                        <span>NO OF TRUSTLINES</span>
                                    </el-col> 
                                    <el-col class="lookup-result-label-cont-right" :xs="12" :sm="12" :md="12" :lg="12">
                                        <span>POSITION</span>
                                    </el-col>                                                                
                                </el-row>
                                <el-row  class="lookup-result-text">
                                    <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                        <span>{{ trust.count }}</span>
                                    </el-col> 
                                    <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                        <span>{{ trust.yourPlace }}</span>
                                    </el-col>                                                                
                                </el-row>                            
                            </el-row>                                  
                        </div>   
                    </div> 
                </div>                  
            </el-col>         
        </div>
    </div>
</template>

<script>
import { getTrustlines, getOblications } from '@/api/lookup'
import TokenBanner from '@/components/TokenBanner'

export default {
  components: {
      TokenBanner
  },
  data() {
    return {
      trustlines: null,
      issuerAddress: '', 
      yourAddress: '',
      issuerAddressResult: null,
      buttonLoad: true,
      yourPlaceResult: null,
      isLoaded: false,
      trustlines: [],
      trust: {
          currencyCode: '',
          count: '',
          yourPlace: ''
      },
      resultsLoaded: false,
      loading: false
    }
  },
  created() {
      this.autoLoadFromParams();
      this.eventPageView();
  },
  mounted() {
  },
  methods: {
    clickLookup() {
        this.eventClickedLookup();
        this.lookUp();
    },
    autoLoadFromParams() {
        let params = this.$route.params;

        if (params && params.issuer && params.address) {
            this.issuerAddress = params.issuer;
            this.yourAddress = params.address;
            this.eventLookupFromAccounts();
            this.lookUp();
        }
    }, 
    loadDivMethod () {
       this.isLoaded = !this.isLoaded
    },
    copyTrustline(trust) {
        let el = document.createElement('textarea');

        let zeroStr = "------——————-—Trustline Lookup-----————————\n";
        let firstStr = zeroStr + 'Token ' + trust.currencyCode + ' has ' + trust.count + ' trustlines';
        
        if (trust && trust != '') {
            firstStr += '\n';
            firstStr += 'My order is at ' + trust.yourPlace + '\n';
        }

        firstStr += "--------------------------———————————————————\n";

        el.value = firstStr;
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.$message("Results copied to clipboard!");
    },
    convertHexToText(hexx) {
        let hex  = hexx.toString();
        let str = '';
        for (let n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str.substring(0, str.indexOf('\x00'));
    },    
    lookUp () {
        let meths = this;
        meths.trustlines = [];
        meths.isLoaded = false;
        meths.buttonLoad = false;
        meths.loading = true;
        getTrustlines(meths.issuerAddress)
        .then(response => response.json()).then(trustlines => {
            getOblications(meths.issuerAddress)
                .then(response => response.json()).then(obligations => {
                    obligations.map(function(obj, index) {
                        let decodedCurrency = obj.currency.length > 3 ? meths.convertHexToText(obj.currency) : obj.currency;

                        meths.calculate(trustlines, obj.currency, function(thisObj){
                            let myObj = {};
                            myObj.currencyCode = decodedCurrency;
                            myObj.count = thisObj.total;
                            myObj.yourPlace = thisObj.yourPlace;

                            myObj.misc = {
                                tokenName: decodedCurrency,
                                twitterUrl: undefined,
                                imageUrl: undefined
                            }

                            meths.trustlines = [...meths.trustlines, myObj];
                            meths.isLoaded = true;
                            meths.buttonLoad = true;
                            meths.resultsLoaded = true;
                            meths.loading = false;
                        });
                    });
            })
        })         
    },
    calculate(data, undecodedCurrency, callback) {
        let pub = this;
        let thisObj = {};
        this.getTrustlineCount(data, undecodedCurrency, function(result){
            thisObj.total = result.length;
            pub.getPosition(data, function(place) {
                thisObj.yourPlace = place;
                callback(thisObj);
            })
        })
    },
    getTrustlineCount(data, undecodedCurrency, callback) {
        const syncRes = data.filter((obj) => {
            let trustlineObj = obj.specification;
            return trustlineObj.currency == undecodedCurrency;
        });
        callback(syncRes)      
    },
    getPosition(data, callback) {
        let pub = this;
        let ind = 0;
        const syncRes = data.filter((obj, index) => {
            if (obj.specification.counterparty == pub.yourAddress) {
                ind = index;
                return obj;
            }
        });
        callback(ind);
    },

    //events
    eventPageView() {
        this.triggerEvent("lookup", "page-view", "Lookup Page View", "");
    },
    eventClickedLookup() {
        this.triggerEvent("lookup", "lookup-button-click", "Clicked Lookup Button", "");
    },
    eventLookupFromAccounts() {
        this.triggerEvent("lookup", "lookup-from-accounts", "Lookup from Accounts Page", "");
    },
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

<style scoped>

@media (max-width: 768px) {
    .lookup-adsense-cont .adsbygoogle {
        height: 100px;
    }
}

@media (min-width: 769px) and (max-width: 992px) {
    .lookup-adsense-cont.adsbygoogle {
        height: 120px;
    }                 
}

@media (min-width: 993px) and (max-width: 1199px) {
    .lookup-adsense-cont .adsbygoogle {
        height: 150px;
    }                           
}

@media (min-width: 1200px) {
    .lookup-adsense-cont .adsbygoogle {
        height: 150px;
    }                        
}

.card-header {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    background-color: #409EFF;
    border-color: #409EFF;
    color: whitesmoke;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
}

.card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;  
    border: solid 1px rgb(232, 231, 231);
    height: 150px;
    font-weight: bolder;
}

.div-hide {
  opacity: 0;
  transition: 1.5s;
}

.div-show {
  opacity: 1;
  transition: 3s;
}

.lookup-adsense-cont .adsbygoogle {
    margin-top: 10px;
    margin-bottom: 10px;
}

.trustline-banner {
    margin-top: 15px;
}

.infeed {
      height: 150px;
}

.lookup-result-info {
    border: 1px rgb(235, 232, 232) solid;
    margin-top: 5px;
    margin-top: 10px;    
}

.lookup-result-text {
    height: 100px;
    text-align: center;
}

.lookup-result-text {
    padding-top: 30px;
    font-size: 30px;
}

.lookup-result-label {
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    font-size: 20px;
    letter-spacing: 2px;
    font-weight: bolder;
}

.lookup-result-label-cont-left {
    border-right: 0.5px solid rgb(235, 232, 232);
    border-bottom: 1px solid rgb(235, 232, 232);
}

.lookup-result-label-cont-right {
    border-left: 0.5px solid rgb(235, 232, 232);
    border-bottom: 1px solid rgb(235, 232, 232);
}

.lookup-container {
    font-family: 'Dongle';
}

.lookup-container > .schedule-card-token-name {
    font-size: 25px !important;
}

.result-cont {
    min-height: 500;
}

</style>