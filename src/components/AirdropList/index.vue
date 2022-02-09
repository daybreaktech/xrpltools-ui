<template>
    <div class="app-container" id="appContainer">
        
        <div class="fixed-header-cont">
            <div class="fixed-header-cover" style="background-color: white;">
                <div class="fixed-header-logo-cont">
                    <div class="fixed-header-logo">
                        <div @click="callFromApi()">
                            <!-- <div v-if="screenMode == 'XS'">
                                <AirdropLogo :size="100" color="#e2aa0f"/>
                            </div>
                            <div v-if="screenMode == 'SM'">
                                <AirdropLogo :size="150" color="#e2aa0f"/>
                            </div>   
                            <div v-if="screenMode == 'MD'">
                                <AirdropLogo :size="200" color="#e2aa0f"/>
                            </div>  
                            <div v-if="screenMode == 'MD'">
                                <AirdropLogo :size="250" color="#e2aa0f"/>
                            </div> -->
                            
                            <img class="fixed-header-logo-img" :src="require('@/assets/xrpairdropslogoblack.png')"/>
                        </div>                         
                    </div>
                </div>                                              
            </div>
        </div>
        <div class="layout-container airdrop-container" v-loading="loading">
            <el-row>
                <AirdropCard :airdrop-list="featuredList" :item-fire-back="airdropItemClicked"/>
            </el-row>

            <el-row class="airdrop-adsense-cont">
                <Adsense 
                    class="adsbygoogle"
                    style="display:block"
                    data-ad-format="fluid"
                    data-ad-layout-key="-hc+1u+5i-34-9f"
                    data-ad-client="ca-pub-5777388526924455"
                    data-ad-slot="9117021700">
                </Adsense>
            </el-row>

            <el-row v-if="screenMode !== 'XS'" style="margin-top: 30px;" id="airdropItemTab">
                <el-tabs style="margin-right: 10px;" v-model="activeTab">
                    <el-tab-pane :label="'Upcoming ' + '(' + upcomingList.length + ')'" name="upcoming">
                        <AirdropTable :airdrop-list="upcomingList" :tab="'upcoming'" :item-fire-back="airdropItemClicked"/>
                    </el-tab-pane>
                    <el-tab-pane :label="'Misc ' + '(' + miscList.length + ')'" name="misc">
                        <AirdropTable :airdrop-list="miscList" :tab="'misc'" :item-fire-back="airdropItemClicked"/>                
                    </el-tab-pane>                      
                    <el-tab-pane :label="'Holders ' + '(' + holdersList.length + ')'" name="holders">
                        <AirdropTable :airdrop-list="holdersList" :tab="'holders'" :item-fire-back="airdropItemClicked"/>                
                    </el-tab-pane>               
                    <el-tab-pane :label="'Faucets ' + '(' + faucetsList.length + ')'" name="faucets">
                        <AirdropTable :airdrop-list="faucetsList" :tab="'faucets'" :item-fire-back="airdropItemClicked"/>                      
                    </el-tab-pane>       
                    <el-tab-pane :label="'Expired ' + '(' + expiredList.length + ')'" name="expired">
                        <AirdropTable :airdrop-list="expiredList" :tab="'expired'" :item-fire-back="airdropItemClicked"/>                      
                    </el-tab-pane>                                                                     
                </el-tabs>                   
            </el-row>

            <el-row v-if="screenMode == 'XS'" style="margin-top: 30px;" id="airdropItemTab">
                <el-tabs style="margin-right: 10px;" @tab-click="handleTabClick()" v-model="activeTab">
                    <el-tab-pane :label="'Upcoming ' + '(' + upcomingList.length + ')'" name="upcoming">
                        <AirdropItem :airdrop-list="upcomingList" :tab="'upcoming'" :item-fire-back="airdropItemClicked"/>
                    </el-tab-pane>
                    <el-tab-pane :label="'Misc ' + '(' + miscList.length + ')'" name="misc">
                        <AirdropItem :airdrop-list="miscList" :tab="'misc'" :item-fire-back="airdropItemClicked"/>                
                    </el-tab-pane>                     
                    <el-tab-pane :label="'Holders ' + '(' + holdersList.length + ')'"  name="holders">
                        <AirdropItem :airdrop-list="holdersList" :tab="'holders'" :item-fire-back="airdropItemClicked"/>                
                    </el-tab-pane>                 
                    <el-tab-pane :label="'Faucets ' + '(' + faucetsList.length + ')'" name="faucets">
                        <AirdropItem :airdrop-list="faucetsList" :tab="'faucets'" :item-fire-back="airdropItemClicked"/>                      
                    </el-tab-pane>   
                    <el-tab-pane :label="'Expired ' + '(' + expiredList.length + ')'" name="expired">
                        <AirdropItem :airdrop-list="expiredList" :tab="'expired'" :item-fire-back="airdropItemClicked"/>                      
                    </el-tab-pane>                                                                         
                </el-tabs>         
            </el-row>            
        </div>  
    </div>
</template>

<script>

import moment from 'moment';
import { getScreenMode } from '@/utils/screenmode'
import AirdropItem from '@/components/AirdropItem';
import AirdropTable from '@/components/AirdropTable';
import AirdropCard from '@/components/AirdropCard';
import Tags from '@/components/Tags';
import { getAirdropSchedules } from '@/api/airdrops-api';
import AirdropLogo from '@/svg/AirdropLogo';
import TwitterLogo from '@/svg/TwitterLogo';

export default {
  name: 'AirdropList',
  components: {
      AirdropItem,
      AirdropTable,
      AirdropCard,
      Tags,
      AirdropLogo,
      TwitterLogo
  },
  data() {
    return {
        headerTextSize: 35,
        moment: moment,
        featuredList: [],
        upcomingList: [],
        faucetsList: [],
        miscList: [],
        holdersList: [],
        expiredList: [],
        screenMode: getScreenMode(),
        loading: false,
        activeTab: 'upcoming'
    }
  },
  created() {
      this.fetchAirdropSchedules();
      this.applySourcePosition();
  },
  mounted() {
  },
  methods: {
    scrollToState() {
        let meths = this;
        this.applyActiveTab();
        setTimeout(function(){ 
            window.scrollTo({
                top: meths.$route.params.sourcePosition,
                left: 0,
                behavior: 'smooth'
            });         
        }, 1)
    },
    applyActiveTab() {
        if (this.$route.params && 
        this.$route.params.sourceHasParams && 
        this.$route.params.sourceTab) {
            this.activeTab = this.$route.params.sourceTab;
        }
    },
    applySourcePosition() {
        if (this.$route.params && this.$route.params.sourceHasParams) {
            this.scrollToState();
        }
    },
    airdropItemClicked(code, tab) {
        this.routeToSchedule(code, tab);
    },      
    routeToSchedule(code, tab) {
        this.$router.push({
            name: 'schedule',
            query: {
                code: code,
                route: 'airdrops',
            },
            params: {
                sourceList: this.generateData(),
                position: document.documentElement.scrollTop,
                hasParams: true,
                tab: tab
            }
        });        
    },      
    handleTabClick() {
        var container = this.$el.querySelector("#airdropItemTab").scrollIntoView();
    },
    handleScroll(event) {
        const position = window.top.scrollY;
        if (position <= 300) {
            this.headerHeight = 300 - position;
            //this.headerTextSize = 35 - (position / 10);
        }
    },
    fetchAirdropSchedules() {
        this.loading = true;
        if (this.$route.params && this.$route.params.sourceHasParams) {        
            this.populateData(this.$route.params.sourceList);
            document.documentElement.scrollTop = this.$route.params.sourcePosition;
            this.triggerEvent("airdrops", "page-view-cache", "Airdrop Page View Cached", "");
        } else {
            this.triggerEvent("airdrops", "page-view-new", "Airdrop Page View New", "");
            this.callFromApi();
        }        
    },
    callFromApi() {
        let meths = this;
        getAirdropSchedules()
        .then(response => response.json()).then(data => {
            meths.populateData(data);
        })           
    },
    populateData(data) {
        let meths = this;
        meths.featuredList = data.items.FEATURED;
        meths.upcomingList = data.items.UPCOMING;
        meths.faucetsList = data.items.FAUCETS;
        meths.miscList = data.items.MISC;
        meths.holdersList = data.items.HOLDERS;
        meths.expiredList = data.items.EXPIRED;  
        this.loading = false;     
    },
    generateData() {
        return {
            items: {
                FEATURED: this.featuredList,
                UPCOMING: this.upcomingList,
                HOLDERS: this.holdersList,
                FAUCETS: this.faucetsList,
                EXPIRED: this.expiredList,
                MISC: this.miscList
            }
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
    .el-tabs__item {
        font-size: 12px;
        padding-right: 8px;
        padding-left: 8px;
    }
    .fixed-header-cover {
        height: 200px;
    }
    .fixed-header-logo {
        padding-top: 30px;
    }
    .fixed-header-logo-img {
        height: 100px;
        width: 180px;
    }
    .airdrop-adsense-cont .adsbygoogle {
        height: 100px;
    }
}

@media (min-width: 769px) and (max-width: 992px) {
    .el-tabs__item {
        font-size: 15px;
        padding-right: 15px;
        padding-left: 15px;
    }
    .fixed-header-cover {
        height: 250px;
    }
    .fixed-header-logo {
        padding-top: 30px;
    }
    .fixed-header-logo-img {
        height: 150px;
        width: 270px;
    }
    .airdrop-adsense-cont .adsbygoogle {
        height: 120px;
    }                 
}

@media (min-width: 993px) and (max-width: 1199px) {
    .el-tabs__item {
        font-size: 15px;
        padding-right: 15px;
        padding-left: 15px;        
    }
    .fixed-header-cover {
        height: 250px;
    }
    .fixed-header-logo {
        padding-top: 25px;
    }
    .fixed-header-logo-img {
        height: 180px;
        width: 324px;
    }
    .airdrop-adsense-cont .adsbygoogle {
        height: 150px;
    }                           
}

@media (min-width: 1200px) {
    .el-tabs__item {
        font-size: 15px;
        padding-right: 15px;
        padding-left: 15px;        
    }
    .fixed-header-cover {
        height: 250px;
    }
    .fixed-header-logo {
        padding-top: 10px;
    }
    .fixed-header-logo-img {
        height: 200px;
        width: 360px;
    }
    .airdrop-adsense-cont .adsbygoogle {
        height: 150px;
    }                        
}

/* .fixed-header-cont {
    width: 100%;
    position: fixed;
    z-index: 999999;
} */

.fixed-header-cover {
    box-shadow: 0px 3px 11px -2px rgba(0,0,0,0.75) inset;
    -webkit-box-shadow: 0px 3px 11px -2px rgba(0,0,0,0.75) inset;
    -moz-box-shadow: 0px 3px 11px -2px rgba(0,0,0,0.75) inset;
    background-color: rgb(220, 220, 220);
}

.airdrop-container {
    margin-top: 5px;
    z-index: 0;
    color: rgb(79, 77, 77) !important;
    padding-bottom: 75px;
}

.el-tabs__item {
    color: rgb(220, 220, 220);
}

.is-active {
    font-weight: bold;
}

.airdrop-container {
    font-family: 'Tajawan';
}

.el-tabs {
    min-height: 170px;
}

.fixed-header-logo-cont {
    text-align: center;
    padding-top: 20px;
}

.fixed-header-logo {
    margin-bottom: 5px;
}

.fixed-header-logo-text {
    font-size: 17px;
    color: rgb(117, 109, 7);
}

.el-loading-mask {
    background-color: rgba(255,255,255);
}

.el-loading-spinner .circular {
    height: 100px;
    width: 100px;
}

.el-loading-spinner {
    top: 20% !important;
}

.el-icon-arrow-right, .el-icon-arrow-left {
    font-size: 20px;
}

.airdrop-adsense-cont {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>