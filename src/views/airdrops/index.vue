<template>
    <div class="app-container" id="appContainer">
        <el-col class="airdro-cont" :xs="24" :sm="24" :md="12" :lg="12">
            <div class="fixed-header-cont">
                <div class="fixed-header-cover" style="background-color: white;">
                    <span><AirdropBanner :fire-back="showWalletModal" :wallet="assignedWallet"/></span>
                </div>
            </div>
            <div class="layout-container airdrop-container">
                <el-row style="margin-bottom: 10px;">
                    <Subscription/>
                </el-row>              
                <el-row class="airdrop-title-cont">
                    <span class="airdrop-title">Featured</span>
                </el-row>
                <el-row>
                    <!-- <AirdropCard :airdrop-list="featuredList" :item-fire-back="airdropItemClicked"/> -->
                    <div class="airdrop-featured airdrop-list" v-loading="featuredLoading">
                        <AirdropFeatured :airdrops="airdrops.featured" :on-click-fire-back="fireBackFromCard"/>
                    </div>
                </el-row>               

                <el-row class="airdrop-adsense-cont">
                    <Adsense 
                        class="adsbygoogle"
                        style="display:block"
                        data-ad-format="fluid"
                        data-ad-layout-key="-ha+1t+5k-3a-94"
                        data-ad-client="ca-pub-5777388526924455"
                        data-ad-slot="9117021700">
                    </Adsense>
                </el-row>

                <el-row>
                    <el-row class="airdrop-title-cont">
                        <transition name="fade" mode="out-in">
                            <span :key="selectedFilterLabel" class="airdrop-title">{{ selectedFilterLabel }} ({{ airdrops.filtered.length }})</span>
                        </transition>
                        <span class="airdrop-filter" v-show="assignedWallet != undefined && accountTrustlines != undefined">
                            <el-tooltip :content="trustlineFiltered == false ? 'Toggle to show only trustline from wallet' : 'Toggle to show all airdrops'">
                                <TrustlineFilterIcon size="30" :on-fire-back="trustlineFilterIconClick" :is-filtered-trustline="trustlineFiltered"/>
                            </el-tooltip>
                        </span>  
                    </el-row>
                    <div v-loading="filteredLoading">
                        <el-row class="margin-bottom: 10px;">
                            <FilterSelectionV2 :on-click-fire-back="modalFilterSelectFireback"/>
                        </el-row>
                        <el-row>
                            <div class="airdrop-list">
                                <div :class="'airdrop-list-item ' + assignLast(airdrops.filtered, index)"
                                    v-for="(item, index) in airdrops.filtered" :key="(item, index)"
                                    :style="applyBackgroundColorVisited(item.id)">
                                    <AirdropListCard :airdrop="item" :on-click-fire-back="fireBackFromCard"  :account-trustlines="accountTrustlines"/>
                                </div>                                     
                            </div>   
                        </el-row>  
                    </div>                  
                </el-row>

            </div>

            <v-modal class="filter-modal" :clickToClose="false" name="filter-modal" height="420" width="320" transition="fade" :adaptive="true"> 
                <el-row class="filter-modal-top">
                    <el-row>
                        <div class="filter-modal-close-cont" @click="closeFilterModal()">
                            <div @click="closeFilterModal()"> 
                                <CloseLogo size="30"/>
                            </div>
                        </div>                        
                    </el-row>
                    <el-row>
                        <div class="filter-modal-header-cont" @click="closeFilterModal()">
                            <span>Filter Airdrops</span>
                        </div>                           
                    </el-row>
                </el-row>
                <el-row class="filter-modal-cont">
                    <FilterSelection :on-click-fire-back="modalFilterSelectFireback"/>
                </el-row>
            </v-modal>

            <v-modal class="filter-modal" :clickToClose="false" name="wallet-modal" height="350" width="320" transition="fade" :adaptive="true"> 
                <el-row class="filter-modal-top">
                    <el-row>
                        <div class="filter-modal-close-cont" @click="closeFilterModal()">
                            <div @click="closeWalletModal()"> 
                                <CloseLogo size="30"/>
                            </div>
                        </div>                        
                    </el-row>
                </el-row>
                <el-row class="filter-modal-cont">
                    <WalletSelection :on-save-fire-back="fireBackFromWallet" :on-remove-fire-back="removeWallet"/>
                </el-row>
            </v-modal>                        
        </el-col>  
    </div>
</template>

<script>

import moment from 'moment';
import { getSelectedFilter, initiateFilter, setFilter } from '@/utils/filter-selection';
import { setAirdropAccount, getSavedAirdropAccount, removeAirdropAccount, getAccountTrustlinesRipple } from '@/utils/airdrop-account';
import { initVisits, getVisitsToArray } from '@/utils/airdrop-visit';
import { getScreenMode } from '@/utils/screenmode'
import AirdropItem from '@/components/AirdropItem';
import AirdropTable from '@/components/AirdropTable';
import AirdropCard from '@/components/AirdropCard';
import AirdropListCard from '@/components/AirdropListCard'
import Tags from '@/components/Tags';
import { getAirdropsByFeatured, getAirdropsByNew, getAirdropsByCalendar, getAirdropsByTag, getAirdropsByHolders, getAirdropsByExpired, getAirdropsByFaucets } from '@/api/airdrops-api';
import AirdropLogo from '@/svg/AirdropLogo';
import TwitterLogo from '@/svg/TwitterLogo';
import FilterLogo from '@/svg/FilterLogo';
import TrustlineFilterIcon from '@/components/icons/TrustlineFilterIcon';
import AirdropBanner from '@/components/AirdropBanner';
import Subscription from '@/components/Subscription';
import FilterSelection from '@/components/FilterSelection';
import CloseLogo from '@/svg/CloseLogo'
import WalletSelection from '@/components/WalletSelection';
import FilterSelectionV2 from '@/components/FilterSelectionV2';
import AirdropFeatured from '@/components/AirdropFeatured'

export default {
  name: 'AirdropList',
  components: {
      AirdropItem,
      AirdropTable,
      AirdropCard,
      AirdropFeatured,
      Tags,
      AirdropLogo,
      TwitterLogo,
      AirdropListCard,
      FilterLogo,
      AirdropBanner,
      FilterSelection,
      CloseLogo,
      WalletSelection,
      Subscription,
      FilterSelectionV2,
      TrustlineFilterIcon
  },
  data() {
    return {
        headerTextSize: 35,
        moment: moment,
        screenMode: getScreenMode(),
        selectedFilter: getSelectedFilter(),
        selectedFilterLabel: '',
        airdrops: {
            featured: [],
            filtered: []
        },
        featuredLoading: false,
        filteredLoading: false,
        visitedAirdrops: null,
        assignedWallet: null,
        processing: false,
        trustlineFiltered: false,
        accountTrustlines: undefined,
        permissionStatus: '',  
    }
  },
  watch: {
  },
  beforeCreate() {
      initiateFilter();
      this.selectedFilter = getSelectedFilter();
  },
  created() {
      this.fetchAirdropSchedules();
  },
  async mounted() {
      this.initWalletAddress();
      this.setFilterLabel();
  },
  methods: {
    initTrustlineFilter() {
        let meths = this;
        if (meths.processing == false) {
            meths.checkTrustlineCondition(function(value) {
                meths.processing = true;
                meths.filterFilteredAirdropsFromTrustline(function(list) {
                    meths.airdrops.filtered = list;
                    meths.processing = false;
                });                
            })
        }
    },
    checkTrustlineCondition(callback) {
        if (this.trustlineFiltered == true 
            && this.assignedWallet != null 
            && this.accountTrustlines != undefined 
            && this.airdrops.filtered != []) {
            callback(true);
        }       
    },
    trustlineFilterIconClick(value) {
        this.trustlineFiltered = value;
        if (value == true) {
            this.initTrustlineFilter();
        } else {
            this.callFromApi();
        }
    },
    filterFilteredAirdropsFromTrustline(callback) {
        let meths = this;   
        let filteredAirdrops = meths.airdrops.filtered.filter(airdrop => {
            return meths.lookupAirdropTrustline(airdrop);
        });
        callback(filteredAirdrops);
    },
    lookupAirdropTrustline(airdrop) {
        if (airdrop.trustline && airdrop.trustline != null) {
            let matches = this.accountTrustlines.filter(trustline => {
                return airdrop.trustline.issuerAddress == trustline.issuerAddress 
                && airdrop.trustline.currencyCode == trustline.currencyCode;
            });

            return matches.length > 0;
        } else {
            return false;
        } 
    },
    removeWallet() {
        this.closeWalletModal();
        removeAirdropAccount();
        this.initWalletAddress();
        this.callFromApi();
    },
    initWalletAddress() {
        let meths = this;
        const account = getSavedAirdropAccount();

        if (account && account != null) {
            this.assignedWallet = account;
            getAccountTrustlinesRipple(meths.assignedWallet).then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        if (data.result === "success") {
                            const lines = data.balances.map(line => {
                                return {
                                    issuerAddress: line.counterparty,
                                    currencyCode: line.currency
                                }
                            });
                            meths.accountTrustlines = lines;                            
                        } else {
                            this.accountTrustlines = [];
                        }
                    })
                }
            })            
        } else {
            this.trustlineFiltered = false;
            this.assignedWallet = null;
            this.accountTrustlines = [];
        }
    },
    fireBackFromWallet(address) {
        setAirdropAccount(address);
        this.initWalletAddress();
        this.closeWalletModal();
        this.triggerEvent("airdrops", "wallet-added", "Saved New Wallet", "");
    },
    showWalletModal() {
        this.$modal.show('wallet-modal');
    },  
    closeWalletModal() {
        this.$modal.hide('wallet-modal');
    },
    hasVisitedAirdrop(airdropId) {
        if (this.visitedAirdrops != null) {
            const hasVisited = this.visitedAirdrops.filter(visiteds => visiteds == airdropId);
            return hasVisited.length;
        }
        return false;
    },
    applyBackgroundColorVisited(airdropId) {
        return this.hasVisitedAirdrop(airdropId) == true ? 'background-color: #EEEEEE !important' : '';
    },
    fireBackFromCard(airdropInfo) {
      this.triggerEvent("airdrops", "click-to-airdrop-details", "To Aidrop Details", airdropInfo.code);  
      this.$router.push({
        name: 'schedule',
        query: {
            code: airdropInfo.code,
            route: 'airdrops',
        },
        params: {
            carryInfo: {
                airdrops: this.airdrops,
                position: document.documentElement.scrollTop,
                trustlineFiltered: this.trustlineFiltered
            }
        }
      });
    },
    setFilterLabel() {
        switch (this.selectedFilter) {
            case "NEW":
                this.selectedFilterLabel = "New / Recently Added";
                break;
            case "CAL":
                this.selectedFilterLabel = "All";
                break;
            case "HOLD":
                this.selectedFilterLabel  = "For Holders"
                break;   
            case "FCT":
                this.selectedFilterLabel  = "Faucets"
                break;                                 
            case "HOT":
                this.selectedFilterLabel = "Hot";
                break;
            case "IMP":
                this.selectedFilterLabel = "Important";
                break;
            case "GID":
                this.selectedFilterLabel = "Global-ID Required";
                break;      
            case "EXP":
                this.selectedFilterLabel = "Expired";
                break;                                                                                                                           
        }
    },
    modalFilterSelectFireback(selection) {
        setFilter(selection);
        this.closeFilterModal();
        this.refreshSelectedFilters();
        this.navigateToFilterApiCall();
        this.triggerEvent("airdrops", "wallet-remove", "Removed Saved Wallet", "");
    },
    refreshSelectedFilters() {
        this.selectedFilter = getSelectedFilter();
        this.setFilterLabel();        
    },
    closeFilterModal() {
        this.$modal.hide("filter-modal");
    },
    showFilterModal() {
        this.$modal.show("filter-modal");
    },
    assignLast(list, index) {
        if (list.length == 1) {
            return 'airdrop-list-item-single';
        } else if (index <= 0) {
            return 'airdrop-list-item-first';
        } else if (index >= (list.length -1)) {
            return 'airdrop-list-item-last';
        } else {
            return '';
        }
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
        let meths = this;
        if (meths.$route.params && meths.$route.params.carryInfo) {
            const carryInfo = meths.$route.params.carryInfo;
            meths.visitedAirdrops = getVisitsToArray();
            meths.populateData(carryInfo.airdrops);
            document.documentElement.scrollTop = carryInfo.position;
            meths.trustlineFiltered = carryInfo.trustlineFiltered;

            setTimeout(function(){ 
                window.scrollTo({
                    top: carryInfo.position,
                    left: 0,
                    behavior: 'smooth'
                });         
            }, 1)            
            this.triggerEvent("airdrops", "page-view-cache", "Airdrop Page View Cached", "");
        } else {
            this.triggerEvent("airdrops", "page-view-new", "Airdrop Page View New", "");
            this.callFromApi();
        }        
    },
    callFromApi() {
        let meths = this;
        meths.featuredLoading = true;
        initVisits(function(visits) {
            meths.visitedAirdrops = visits;
            
            getAirdropsByFeatured()
            .then(response => response.json()).then(data => {
                meths.populateFeatured(data);
                meths.featuredLoading = false;
            })

            meths.navigateToFilterApiCall();
        });
    },
    navigateToFilterApiCall() {
        this.filteredLoading = true;
        switch (this.selectedFilter) {
            case "NEW":
                this.populateFilteredFromData(getAirdropsByNew);
                this.triggerEvent("airdrops", "filter-new", "Selected Filter New", "New");
                break;
            case "CAL":
                this.populateFilteredFromData(getAirdropsByCalendar);
                this.triggerEvent("airdrops", "filter-cal", "Selected Filter Calender", "Calender");
                break;
            case "HOLD":
                this.populateFilteredFromData(getAirdropsByTag, "HOLD");
                this.triggerEvent("airdrops", "filter-hold", "Selected Filter Hold", "Hold");
                break;     
            case "FCT":
                this.populateFilteredFromData(getAirdropsByFaucets);
                this.triggerEvent("airdrops", "filter-fct", "Selected Filter Faucets", "Hold");
                break;                              
            case "HOT":
                this.populateFilteredFromData(getAirdropsByTag, "HOT");
                this.triggerEvent("airdrops", "filter-hot", "Selected Filter Hot", "Hot");
                break;
            case "IMP":
                this.populateFilteredFromData(getAirdropsByTag, "IMP");
                this.triggerEvent("airdrops", "filter-imp", "Selected Filter Important", "Important");
                break;
            case "GID":
                this.populateFilteredFromData(getAirdropsByTag, "GID");
                this.triggerEvent("airdrops", "filter-gid", "Selected Filter Global-ID", "Global-ID");
                break;       
            case "EXP":
                this.populateFilteredFromData(getAirdropsByExpired);
                this.triggerEvent("airdrops", "filter-exp", "Selected Filter Expired", "Expired");
                break;                                                                             
        }        
    },
    populateFilteredFromData(method, tag) {
        let meths = this;
        method(tag).then(response => response.json()).then(data => {
            meths.populateFiltered(data);
            meths.filteredLoading = false;
        })
    },
    populateFeatured(data) {
        let meths = this;
        meths.airdrops.featured = data;
    },
    populateFiltered(data) {
        let meths = this;
        meths.airdrops.filtered = data;
        this.initTrustlineFilter();
    },
    populateData(data) {
        let meths = this;
        meths.populateFeatured(data.featured);
        meths.populateFiltered(data.filtered);
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
    .airdrop-adsense-cont .adsbygoogle {
        height: 150px;
    }                        
}

/* .fixed-header-cont {
    width: 100%;
    position: fixed;
    z-index: 999999;
} */

.filter-modal-cont {
    padding-top: 5px;
    padding-left: 30px;
    padding-right: 23px;
    padding-bottom: 15px;
}

.airdrop-list-count {
    font-family: 'Roboto-Regular';
    font-size: 20px;
    font-weight: bold;
    color: #6F6F6F;
}

.airdrop-title {
    font-family: 'Roboto-Regular';
    font-size: 23px;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: #323232;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
}

.airdrop-title-cont {
    margin-bottom: 15px;
}

.airdrop-list {
    background: #FFFFFF;
    border: 1px solid #C0C0C2;
    box-sizing: border-box;
    border-radius: 15px;
    min-height: 100px;
    margin-top: 15px;    
}

.airdrop-list-item {
    height: 98px;
    border-bottom: 1px solid #C0C0C2;
}

.airdrop-list-item-first {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
}

.airdrop-list-item-last {
    border-bottom: none;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
}

.airdrop-list-item-single {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
}

.fixed-header-cover {
    height: 55px;
    border: 1px solid rgb(216, 215, 215);
    background-color: #EEEEEE !important;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
}

.airdrop-container {
    z-index: 0;
    color: rgb(79, 77, 77) !important;
    padding-bottom: 75px;
    background-color: #faf7f7;
    padding-left: 25px;
    padding-right: 25px;
    font-family: 'Roboto';
    min-height: calc(100vh - 50px);    
}

.el-tabs__item {
    color: rgb(220, 220, 220);
}

.is-active {
    font-weight: bold;
}

.el-tabs {
    min-height: 170px;
}

.fixed-header-logo-cont {
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
    margin-top: 30px;
    margin-bottom: 30px;
}

.airdrop-filter {
    float: right;
    margin-top: 5px;
    margin-right: 0px;
    cursor: pointer;
    border: 1px solid black;
    padding-top: 5px;
    padding-bottom: 2px;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 5px;
}

.filter-modal .vm--modal {
    border-radius: 15px;
}

.filter-modal-close-cont {
    display: inline-block;
    cursor: pointer;
    float: right;
}

.filter-modal-header-cont {
    display: inline-block;
    text-align: left;
}

.filter-modal-header-cont span {
    font-size: 22px;
    font-weight: bolder;
}

.filter-modal-top {
    padding-top: 8px;
    padding-left: 30px;
    padding-right: 12px;
    margin-bottom: 5px;
}

.airdro-cont {
    margin: auto;
}

.airdro-cont .el-loading-mask {
    z-index: 19;
    border-radius: 15px;
}

.airdrop-featured {
    padding: 10px;
}
</style>