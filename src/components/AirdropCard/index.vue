<template>
    <div>
        <div class="featured-title">Featured</div>
        <div style="cursor: pointer;" @click="fireBack(featuredAd.code)" v-for="featuredAd in airdropList" :key="featuredAd.id" >
            <el-col class="airdrop-card-cont" :xs="24" :sm="24" :md="12" :lg="8">
                <el-col class="airdrop-card-image" :xs="3" :sm="3" :md="3" :lg="3">
                    <div class="icon-image" :style="'background-image: url(' + featuredAd.imageUrl + '),' + 'url(' + require('@/assets/no-image.png') + ')'"></div>
                </el-col>
                <el-col class="airdrop-card-details" :xs="20" :sm="20" :md="20" :lg="20">
                    <el-row style="margin-bottom: 5px;">
                        <div class="airdrop-card-title"> 
                            <span class="airdrop-card-header-token">[{{ featuredAd.tokenName ? featuredAd.tokenName : 'No-Token' }}]</span> {{ featuredAd.shortDesc }} 
                            <span class="tags"><Tags :tags="featuredAd.tags" :size="screenMode == 'XS' ? 14 : 18"/></span> 
                        </div>                           
                    </el-row>                    
                    <el-row>
                        <el-col class="airdrop-card-snapshot" :xs="12" :sm="12" :md="12" :lg="12">
                           Snapshot: {{ featuredAd.snapshotDate ? moment(String(featuredAd.snapshotDate)).format('MMM DD[,] ha') : 'N/A' }}
                        </el-col>
                        <el-col class="airdrop-card-airdrop" :xs="12" :sm="12" :md="12" :lg="12">
                           Airdrop:  {{ featuredAd.airdropDate ? moment(String(featuredAd.airdropDate)).format('MMM DD[,] ha') : 'N/A' }}
                        </el-col>                               
                    </el-row>                   
                </el-col>
            </el-col>             
        </div>       
    </div>
</template>

<script>

import moment from 'moment';
import { getScreenMode } from '@/utils/screenmode'
import AirdropItem from '@/components/AirdropItem';
import AirdropTable from '@/components/AirdropTable';
import Tags from '@/components/Tags';

export default {
  props: ['airdropList', 'itemFireBack'],
  components: {
      AirdropItem,
      AirdropTable,
      Tags
  },
  data() {
    return {
        moment: moment,
        screenMode: getScreenMode(),
    }
  },
  methods: {
    fireBack(code) {
        this.itemFireBack(code);
    }
  }
}
</script>

<style>

@media (max-width: 768px) {
    .icon-image{
        width: 35px;
        height: 35px;
    }
    .airdrop-card-title {
        font-size: 13px;
    }
    .airdrop-card-snapshot, .airdrop-card-airdrop {
        font-size: 10px;
    }
    .airdrop-card-cont {
        height: 60px;
    }
}

@media (min-width: 769px) and (max-width: 992px) {
    .icon-image{
        width: 45px;
        height: 45px;
    }
    .airdrop-card-title {
        font-size: 15px;
    }
    .airdrop-card-snapshot, .airdrop-card-airdrop {
        font-size: 10px;
    }
    .airdrop-card-cont {
        height: 60px;
        margin-right: 5px;
        margin-left: 5px;
    }
}

@media (min-width: 993px) and (max-width: 1199px) {
    .icon-image{
        width: 45px;
        height: 45px;
    }
    .airdrop-card-title {
        font-size: 15px;
    }
    .airdrop-card-snapshot, .airdrop-card-airdrop {
        font-size: 10px;
    }
    .airdrop-card-cont {
        height: 70px;
        margin-right: 5px;
        margin-left: 5px;
    }
}

@media (min-width: 1200px) {
    .icon-image{
        width: 45px;
        height: 45px;
    }
    .airdrop-card-title {
        font-size: 15px;
    }
    .airdrop-card-snapshot, .airdrop-card-airdrop {
        font-size: 10px;
    }
    .airdrop-card-cont {
        height: 70px;
        margin-right: 5px;
        margin-left: 5px;
    }     
}

.airdrop-card-cont {
    border: 1px #ebe8e8 solid;  
    padding: 10px;
    margin-top: 2px;
    margin-bottom: 5px;
}

.airdrop-cont {
    height: 40px;
    border: 1px rgb(235, 232, 232) solid;  
    padding: 3px;
    margin-bottom: 3px;    
}

/* .featured-title {
    font-size: 18px;
    color: rgb(213, 209, 209);
    margin-bottom: 10px;
} */

.airdrop-card-image {
    height: 100%; border-radius: 50%; margin-right: 10px;
}

.airdrop-card-details {
    height: 100%;
}

.airdrop-card-title {
    margin-bottom: 1px;
}

.airdrop-card-token {
    font-size: 15px;
}

.icon-image {
    background-size: contain;
    border-radius: 50%;
}

.airdrop-card-header-token {
    font-weight: bold !important;
}

.fixed-header-footer-text {
    color: white;
}

</style>