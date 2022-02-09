<template>
    <div class="airdrop-list-card-cont">
        <el-col class="airdrop-card-image-cont" :xs="4" :sm="2" :md="3" :lg="3">
          <div @click="goToFireback(airdrop)" class="airdrop-card-frame" :style="'background-image: url(' + getImage(airdrop) + '),' + 'url(' + require('@/assets/no-image.png') + ')'">
          </div>
        </el-col>
        <el-col class="airdrop-card-info-cont" :xs="16" :sm="20" :md="18" :lg="18">
          <div @click="onClickFireBack(airdrop)">
            <el-row class="airdrop-card-info-title-cont">
              <span class="airdrop-card-info-token">[{{ getTrustlineName(airdrop.trustline) }}]</span> <span class="airdrop-card-info-short-desc">{{ airdrop.shortDesc }}</span>
            </el-row>
            <el-row>
              <span class="airdrop-card-info-dates">Snapshot:</span> 
              <span class="airdrop-card-info-dates-val">
                {{ airdrop.snapshotDate ? moment(String(airdrop.snapshotDate)).format('MMM DD [@] ha') : 'N/A' }}
                </span>
            </el-row>
            <el-row>
              <span class="airdrop-card-info-dates">Airdrop:</span> 
              <span class="airdrop-card-info-dates-val">
                {{ airdrop.airdropDate ? moment(String(airdrop.airdropDate)).format('MMM DD [@] ha') : 'N/A' }}
              </span>
            </el-row> 
            <el-row>
              <div class="airdrop-tags-cont">
                  <span class="airdrop-tags" v-for="tag in airdrop.tags" :key="tag" v-if="tag != 'GID'" :style="'background-color: ' + getTagColor(tag) + ';'">
                    {{ getTagLabel(tag) }}
                  </span>
              </div>
              <!-- <div class="global-id-tag" v-if="airdrop.formUrl && airdrop.formUrl != null && airdrop.formUrl != ''">
                <GobalLogo size="40"/>
              </div> -->
            </el-row>            
          </div>                              
        </el-col>
        <el-col class="airdrop-card-misc-cont" :xs="4" :sm="2" :md="3" :lg="3">
          <el-row class="airdrop-card-misc-xumm-icon">
            <XummIcon :airdrop-info="airdrop" size="35" :trustline-set="isSetTrustline"/>
          </el-row>
          <el-row v-if="airdrop.formUrl && airdrop.formUrl != null" class="airdrop-card-misc-form">
            <div @click="goToUrl(airdrop.formUrl)">(FORM)</div>
          </el-row>
          <el-row class="airdrop-card-misc-global-id" v-if="hasGlobalID(airdrop.tags)">
              <span style="cursor: pointer;" @click="goToGlobalIdTweet()"><GlobalLogo size="45"/></span>
          </el-row>                              
        </el-col>
    </div>
</template>

<script>

import moment from 'moment';
import { getSavedAirdropAccount } from '@/utils/airdrop-account';
import XummColoredLogo from '@/svg/XummColoredLogo';
import XummIcon from '@/components/icons/XummIcon';
import GlobalLogo from '@/svg/GlobalLogo';

export default {
  name: 'AirdropList',
  props: ['airdrop', 'onClickFireBack', 'accountTrustlines'],
  components: {
    XummColoredLogo,
    XummIcon,
    GlobalLogo
  },
  data() {
    return {
      moment: moment,
      isSetTrustline: undefined,
      renderComponent: true
    }
  },
  beforeCreate() {
  },
  created() {
    this.initSetTrustline();
  },
  mounted() {
  },
  watch: {
    "accountTrustlines": function(value) {
      this.initSetTrustline();
    },
    "airdrop": function(value) {
      this.initSetTrustline();
    }
  },
  mounted() {
  },
  methods: {
    goToGlobalIdTweet() {
      window.open('https://twitter.com/XRP_Airdrops/status/1473284266205265921', '_blank');
    },
    initSetTrustline(value) {
      let meths = this;

      if (!meths.accountTrustlines) {
        meths.isSetTrustline = undefined;
      } else {
        this.checkAccountForTrustline(function (value) {
          meths.isSetTrustline = value;
        });        
      }
    },
    checkAccountForTrustline(callback) {
      const account = getSavedAirdropAccount();
      const airdropTrustline = this.airdrop.trustline;
      const savedTrustlines = this.accountTrustlines;
      

      if (account && account != null && airdropTrustline && airdropTrustline != null && savedTrustlines != []) {

        let filtered = savedTrustlines.filter(saved => {
          return saved.currencyCode == airdropTrustline.currencyCode && 
          saved.issuerAddress == airdropTrustline.issuerAddress
        });

        callback(filtered.length && filtered.length > 0 ? true : false);
      } else {
        callback(false);
      }
    },
    hasGlobalID(tags) {
      return tags && tags != null && tags != [] && tags.includes("GID");
    },
    goToFireback(airdrop) {
      this.onClickFireBack(airdrop);
    },
    goToUrl(url) {
      window.open(url, '_blank');
    },
    getTagLabel(tag) {
       let label = "";
      switch (tag) {
        case "IMP":
          label = "Important";
          break;
        case "NEW":
          label = "New";
          break;   
        case "HOT":
          label = "Hot";
          break;                                     
      }
      return label;
    },
    getTrustlineName(trustline) {
      return trustline && trustline != null ? trustline.name : "No-Token";
    },
    getImage(airdrop) {
      if (airdrop.useTrustlineImg && airdrop.useTrustlineImg != null && airdrop.useTrustlineImg == true) {
        return airdrop.trustline.imageUrl;
      } else {
        return airdrop.imageUrl;
      }
    },
    getTagColor(tag) {
      let color = "";
      switch (tag) {
        case "IMP":
          color = "#E00000";
          break;
        case "NEW":
          color = "#F4B906";
          break;   
        case "HOT":
          color = "#ca5507";
          break;                                     
      }
      return color;
    }
  }
}
</script>

<style>

.airdrop-card-image-cont {
  cursor: pointer;
}

.airdrop-list-card-cont {
  height: 100%;
  font-family: 'Roboto-Regular';
}

.airdrop-list-card-cont .el-col {
  height: 100%;
}

.airdrop-card-frame {
  height: 40px;
  width: 40px;
  margin: auto;
  border-radius: 50%;
  margin-top: 8px;
  background-size: contain;
  border: 1px solid #C0C0C2; 
}

.airdrop-card-info-cont {
  padding: 5px;
  cursor: pointer;
}

.airdrop-card-info-title-cont {
  height: 20px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;  
}

.airdrop-card-info-dates {
  font-weight: 600;
  color: #6A6A6A;
  font-size: 8px;
}

.airdrop-card-info-token {
  font-size: 12px;
  font-weight: bolder;
  color: #181818;
}

.airdrop-card-info-short-desc {
  font-size: 11px;
  font-weight: bold;
  color: #6F6F6F;
}

.airdrop-card-info-dates-val {
  font-size: 8px;
  font-weight: 600;
  color: #181818;
}

.airdrop-card-misc-xumm-icon {
  text-align: center;
  margin-top: 8px;
  cursor: pointer;
}

.airdrop-card-misc-form {
  margin-top: 2px;
  text-align: center;
  font-size:9px;
  font-weight: bold;
  color: #6C009F;
  letter-spacing: 0.5px;
  cursor: pointer;
}

.airdrop-tags {
  font-size: 8px;
  height: 7px;
  color: white;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 1px;
  padding-bottom: 1px;
  border-radius: 15px;
  margin-right: 5px;
}

.airdrop-tags-cont {
  float: left;
}

.global-id-tag {
  padding-top: 3px;
  float: left;
}

.color-test {
  background-color: #ca5507;
}

.airdrop-card-misc-global-id {
  text-align: center;
  margin-top: 5px;
}


</style>