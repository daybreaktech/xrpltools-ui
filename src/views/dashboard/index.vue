<template>
    <div class="app-container">
        <!-- <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in carouselItems" :key="item.url">
                <img class="timeline-image" :src="item.url"/>
            </el-carousel-item>
        </el-carousel> -->

        <div class="layout-container dashboard-container">
            <div class="chart-container" :style="showChart ? 'opacity: 0.9;' : 'opacity: 0;'">
                <apexchart type="area" :height="showDashboardMenu ? '120' : '250'" ref="chart" :options="composedOptions" :series="series"></apexchart>
            </div>
            <div v-show="!showDashboardMenu">
                <ScrollNavigator :item-fire-back="routeToFromScrollNavi"/>
            </div>
            <div>
                <el-col style="margin-top: 20px;">
                    <el-col :xs="24" :sm="24" :md="24" :lg="6">
                        <div class="list-group">
                            <div class="list-group-item list-group-header">
                                Top Markets in XRPL
                            </div>
                            <div class="list-group-item" v-for="(market, index) in topMarketTokens" :key="market.order">
                                <el-col :xs="2" :sm="2" :md="2" :lg="2" class="token-item-order-div">
                                    <div class="token-item-order">{{ index + 1 }}</div>
                                </el-col>
                                <!-- <el-col :xs="4" :sm="4" :md="4" :lg="4" class="token-image" v-bind:style="'background-image: url(' + market.imageUrl + ');'"></el-col> -->
                                <el-col :xs="21" :sm="21" :md="21" :lg="21" class="token-info">
                                    <el-row>
                                        <span class="token-name"> {{ market.decodedCurrency }} </span>
                                    </el-row>
                                    <el-row>
                                        <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                            <label>ATV:</label> {{ toCurrency(market.atv) }} <el-tooltip content="Average Trading Volume"><a href="javascript:void(0);">(?)</a></el-tooltip>
                                        </el-col>
                                        <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                            <label>ATC:</label> {{ Math.ceil(market.atc) }} <el-tooltip content="Average Trading Count"><a href="javascript:void(0);">(?)</a></el-tooltip>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <!-- <el-col :xs="4" :sm="2" :md="2" :lg="4" sstyle="float: right;" style="margin-bottom: 5px;">
                                    <el-row class="token-item-select token-item-select-dex">
                                        <div @click="openModal(market)">MORE >></div>
                                    </el-row>                                 
                                </el-col> -->
                            </div>                       
                        </div>
                    </el-col>
                </el-col>
                <div>
                    <v-modal name="token-more" :width="modalSize.width" :height="modalSize.height" :adaptive="true">
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" @click.native="closeModal()">
                                <span class="modal-close-button" style="float: right; margin-right: 10px; margin-top: 10px;">close</span>
                            </el-col>
                        </el-row>
                        <el-row class="token-modal-card-main-cont">
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" class="token-image token-image-modal" v-bind:style="'background-image: url(' + selectedCoin.imageUrl + ');'"></el-col>
                            <el-col :xs="15" :sm="15" :md="15" :lg="15" class="token-modal-card-cont">
                                <el-row class="token-modal-card-token-name">
                                    <label>{{ selectedCoin.decodedCurrency }}</label>
                                </el-row>
                                <el-row class="token-modal-card-token-website">
                                    <a href="javascript:void(0);" @click="goToLink(staticJsonProp[selectedCoin.name].website)">Go to official website >></a>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px; font-family: 'Dongle'; font-size: 15px;">
                            Other sites for {{ selectedCoin.decodedCurrency }}:
                        </el-row>
                        <el-row>
                            <div style="margin-top: 10px;">
                                <el-col :xs="11" :sm="11" :md="11" :lg="11"
                                    class="token-mini-banner"
                                    v-bind:style="'background-image: url(' + staticJsonSiteProps['solo'].iconUrl + ')'"
                                    @click.native="goToSolo(selectedCoin.name, selectedCoin.currencyCode, selectedCoin.address)">
                                </el-col>
                            </div>
                            <div style="margin-top: 10px;">
                                <el-col
                                    :xs="11" :sm="11" :md="11" :lg="11"
                                    v-for="stat in selectedLinks" :key="stat.prop"
                                    class="token-mini-banner"
                                    @click.native="goToLink(stat.linkUrl)" 
                                    v-bind:style="'background-image: url(' + staticJsonSiteProps[stat.prop].iconUrl + ')'">
                                </el-col>
                            </div>                                                                             
                        </el-row>
                        <el-row class="modal-contact-dev">
                            For issuer's information, please contact dev <a style="color: blue;" href="javascript:void(0);" @click="goToDev()">here</a>
                        </el-row>
                    </v-modal>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>

import { fetchXrpMarket, fetchXrplTopMarkets } from '@/api/dashboard'
import { getXrpUsdValue } from '@/api/accounts'
import staticJson from '@/static/token_links.json';
import staticJsonProps from '@/static/token_props.json';
import ScrollNavigator from '@/components/ScrollNavigator'

export default {
  components: {
      ScrollNavigator
  },
  data() {
    return {
        selectedCoin: {},
        staticJsonProp: staticJson,
        staticJsonSiteProps: staticJsonProps,
        selectedLinks: [],
        modalSize: {
            height: 0,
            width: 0,
        },
        topMarketTokens: [],
        showDashboardMenu: true,
        showChart: false,
        chartData: [],
        series: [],
        composedOptions: {},
        chartOptions: {
            title: {
                text: '(XRP in last 30 days)',
                align: 'left'
            },
            chart: {
                id: 'area',
                type: 'area',
                height: 120,
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: false
                }
            },
            subtitle: {
                text: 'awww yess',
                align: 'right',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: true,
                style: {
                    fontSize:  '20px',
                    fontWeight:  'normal',
                    fontFamily:  'Dongle',
                    color:  '#9699a2'
                }
            },                                                        
            fill: {
                type: 'solid',
                colors: ['white'],
                opacity: 0.1
            },
            colors: ["#3d3c3c"],
            annotations: {
            },
            dataLabels: {
                enabled: false
            },
            markers: {
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                colors: undefined,
                width: 1,
                dashArray: 0      
            },
            yaxis: {
                labels: {
                    show: false
                }
            }
                       
        },
        selection: 'one_year',   
        carouselItems: [
            {
                url: 'https://hosting.photobucket.com/images/i/xrpltools/timeline_xrp_1.jpg'
            },
            {
                url: 'https://hosting.photobucket.com/images/i/xrpltools/timeline_xrdoge_1.jpg'
            },
            {
                url: 'https://hosting.photobucket.com/images/i/xrpltools/timeline_xrp_2.jpg'
            },
            {
                url: 'https://hosting.photobucket.com/images/i/xrpltools/timeline_els.PNG'
            },
            {
                url: 'https://hosting.photobucket.com/images/i/xrpltools/timeline_xrdoge_2.jpg'
            }
        ]
    }
  },
  created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
      this.eventPageView();
  },
  destroyed() {
        window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
      this.loadChartValues();
  },
  methods: {
      routeToFromScrollNavi(route) {
         this.$router.push({ name: route });
      },      
      goToDev() {
          this.$router.push({ name: 'about' });
      },
      goToLink: function(url) {
          this.eventGoToLink(url);
          window.open(url, '_blank');
      },
      goToSolo(name, currencyCode, issuerAddress) {
          this.eventSoloDexView(name);
          window.open("https://sologenic.org/trade?market=" + currencyCode + "%2B" + issuerAddress + "%2FXRP&network=mainnet", '_blank');
      },
      closeModal() {
          this.$modal.hide("token-more")
      },
      openModal(selectedCoin) {
          this.eventMarketView(selectedCoin.name);
          this.selectedCoin = selectedCoin;
          if (this.staticJsonProp[selectedCoin.name] !== undefined) {
                this.selectedLinks = this.staticJsonProp[selectedCoin.name].links;
          } else {
              this.selectedLinks = [];
          }
          this.$modal.show("token-more");
      },
      goToTwitter() {
          this.$message.error("Not available for at this moment");
      },
      loadChartValues() {
        let meths = this;  
        getXrpUsdValue().then(response => response.json()).then(res => {
            meths.chartOptions.subtitle.text = '1 XRP ~ ' + res.ripple.usd + " USD";
            fetchXrpMarket().then(response => response.json()).then(result => {
                meths.series = [{
                    data: meths.chartData = result.prices
                }]

                meths.composedOptions = meths.chartOptions;
                meths.showChart = true;
            })            
        });
        
        fetchXrplTopMarkets().then(response => response.json()).then(res => {
            let sync = res.markets.map(function(market, index) {                
                let decodedCurrency = meths.decodeCurrency(market.base_currency);
                let makeImageUrl = "https://xrpltoolssotrage.blob.core.windows.net/photos/token_" + decodedCurrency.toLowerCase() + ".jpg";

                let token = {
                    name: decodedCurrency.toLowerCase(),
                    address: market.base_issuer,
                    currencyCode: market.base_currency,
                    decodedCurrency: decodedCurrency,
                    imageUrl: makeImageUrl,
                    atv: market.avg_volume,
                    atc: market.avg_exchange_count,
                }
                
                return token;
            })

            let syncFinal = sync.filter(function(object) {
                if (meths.findListDupicate(object.currencyCode) == false) {
                    if (!meths.getTokenException().includes(object.decodedCurrency)) {
                        meths.topMarketTokens.push(object);
                        return true;
                    }
                }
                return false;
            })
        })
      },
      findListDupicate(currencyCode) {
          let meths = this;

          let sync = meths.topMarketTokens.filter(function(obj) {
              return currencyCode == obj.currencyCode;
          })

          return sync.length > 0;
      },
      handleResize() {
        this.showDashboardMenu = window.innerWidth >= 1000;
        this.handleModalSize(window.innerWidth, window.innerHeight);
      },
      handleModalSize(windowWidth, innerHeight) {
          if (windowWidth >= 1000) {
              this.modalSize.height = 450;
              this.modalSize.width = 500;
          } else {
              this.modalSize.height = 400;
              this.modalSize.width = 400;
          }
      },
      toCurrency(balance) {
          return (Math.round(balance * 100) / 100).toLocaleString();
      },
      convertHexToText(hexx) {
        let hex  = hexx.toString();
        let str = '';
        for (let n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str.substring(0, str.indexOf('\x00'));
      },
      decodeCurrency(currency) {
          return currency.length > 10 ? this.convertHexToText(currency) : currency;
      },
      getTokenException() {
          return ["USD"]
      },

    // routes
    routeTo(route) {
        this.eventDashboardNav(route);
        this.$router.push({ name: route })
    },

    // gtag events
    eventPageView() {
        this.$gtag.event('dashboard-page-view', {
            'event_category': 'dashboard',
            'event_label': 'Dashboard View'
        })
    },
    eventDashboardNav(route) {
        this.$gtag.event('dashboard-click-navi', {
            'event_category': 'dashboard',
            'event_label': 'Dashboard Click Navigation',
            'value': route
        });
    },
    eventMarketView(tokenName) {
        this.$gtag.event('dashboard-market-view', {
            'event_category': 'dashboard',
            'event_label': 'Dashboard Market View',
            'value': tokenName
        });
    },
    eventSoloDexView(tokenName) {
        this.$gtag.event('dashboard-market-solodex-view', {
            'event_category': 'dashboard',
            'event_label': 'Dashboard Token Solodex View',
            'value': tokenName
        });        
    },
    eventGoToLink(url) {
        this.$gtag.event('dashboard-market-links-view', {
            'event_category': 'dashboard',
            'event_label': 'Dashboard Token Link View',
            'value': url
        });  
    }
  }
      
}
</script>

<style>

.list-group-header {
    font-size: 30px;
    font-weight: 100;
    color: white;
    background-color:#3d3c3c !important;
    height: 60px !important;
    padding-left: 20px !important;
    letter-spacing: 5px;
}

.token-atv, .token-atc {
    font-size: 15px;
}

.el-tooltip__popper {
    font-family: 'Dongle';
    font-size: 18px;
}

.token-name {
    font-size: 25px;
    font-weight: bolder;
    letter-spacing: 2px;
}

.token-info {
    padding-left: 10px;
}

.timeline-item {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
}

.timeline-image {
    height: 100%; 
    width: 100%; 
    object-fit: contain;
}

.apexcharts-text {
    font-family: 'Dongle' !important;
    font-size: 20px;
}

.apexcharts-title-text {
    font-family: 'Dongle' !important;
    font-size: 20px;
}

.chart-container {
    border-width: 1px;
    border-style: solid;
    border-color: #3d3c3c;
    border-width: 1px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.token-image {
    background-size: contain;
    height: 50px;
    width: 50px;
    border-radius: 100%;
}

.token-image-modal {
    height: 80px;
    width: 80px;
}

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem 0rem 0.3rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #00000020;
}

.list-group {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    font-family: 'Dongle';
}

.token-item-order {
    font-size: 15px;
    color: white;
    font-weight: bold;
    margin-top: 3px;
}

.token-item-order-div {
    background-color:#3d3c3c !important;
    border-color: #3d3c3c !important;
    height: 20px;
    width: 20px;
    margin-right: 10px;
    text-align: center;
    border-radius: 100%;
}

.token-item-select {
    border: solid 1px #3d3c3c;
    margin-top: 3px;
    text-align: center;
    padding-top: 2px;
    color: #1f2d3d;
    font-weight: 100;
    cursor: pointer;
}

.token-item-select-dex {
    text-decoration: underline;
    font-weight: bold;
}

.token-item-select-tl {
    background-color: #007bff !important;
    border-color: #007bff !important;
}

.token-item-select-twitter {
    background-color: #1da1f2 !important;
    border-color: #1da1f2 !important;
}

.modal-close-button {
    font-family: 'Dongle';
    font-size: 20px;
    font-weight: bolder;
    border: 1px solid rgb(192, 192, 192);
    width: 50px;
    text-align: center;
    cursor: pointer; 
}

.token-mini-banner {
    height: 30px; width: 120px; margin-bottom: 5px;
    background-size: cover;
    margin: 5px;
    border: 1px solid rgb(192, 192, 192);
    cursor: pointer; 
}

.vm--modal {
    padding: 10px;
}

.token-modal-card-cont {
    font-family: 'Dongle';
    margin-left: 10px;
}

.token-modal-card-token-name {
    margin-top: 5px;
    font-size: 25px;
}

.token-modal-card-token-website {
    text-decoration: underline;
    font-weight: 500;
}

.token-modal-card-main-cont {
    border: 1px solid rgb(233, 233, 233); padding: 5px; margin-top: 20px;
    border-radius: 2%;
    font-weight: 500;
}

.modal-contact-dev {
    font-size: 15px;
    position: absolute; bottom: 0; font-family: 'Dongle';
}

</style>