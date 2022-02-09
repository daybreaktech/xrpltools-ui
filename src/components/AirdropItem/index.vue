<template>
    <div>
        <div style="cursor: pointer;" @click="fireBack(ad.code)" class="airdrop-other-cont" v-for="ad in airdropList" :key="ad.id">
            <el-col :xs="2" :sm="2" :md="2" :lg="2" class="chuck"></el-col>
            <el-col :xs="22" :sm="22" :md="10" :lg="10">
                <div class="airdrop-other-title"> 
                    <span class="airdrop-other-token">[{{ ad.tokenName ? ad.tokenName : 'No-Token' }}]</span> {{ ad.shortDesc }}
                    <span class="tags"><Tags :tags="ad.tags" :size="screenMode == 'XS' ? 14 : 18"/></span> 
                </div>
                <el-col class="airdrop-other-snapshot" :xs="12" :sm="12" :md="12" :lg="12">
                   Snapshot: {{ ad.snapshotDate ? moment(String(ad.snapshotDate)).format('MMM DD[,] ha') : 'N/A' }}
                </el-col>
                <el-col class="airdrop-other-airdrop" :xs="12" :sm="12" :md="12" :lg="12">
                   Airdrop: {{ ad.airdropDate ? moment(String(ad.airdropDate)).format('MMM DD[,] ha') : 'N/A' }}
                </el-col>                        
            </el-col>
        </div>        
    </div>
</template>

<script>

import moment from 'moment';
import { getScreenMode } from '@/utils/screenmode';
import Tags from '@/components/Tags'

export default {
  props: ['airdropList', 'itemFireBack', 'tab'],
  components: {
      Tags
  },
  data() {
    return {
        moment: moment,
        screenMode: getScreenMode()
    }
  },
  methods: {
    fireBack(code) {
        this.itemFireBack(code, this.tab);
    }         
  }
}
</script>

<style>

@media (max-width: 768px) {
    .airdrop-other-title {
        font-size: 12px;
        padding-bottom: 5px;
    }
    .airdrop-other-snapshot, .airdrop-other-airdrop {
        font-size: 10px;
    }
    .airdrop-other-cont {
        margin-bottom: 5px;
        padding-top: 10px;
        height: 50px;
    }    
}

/* @media (min-width: 769px) and (max-width: 992px) {
    .airdrop-other-title {
        font-size: 17px;
    }
    .airdrop-other-snapshot, .airdrop-other-airdrop {
        font-size: 15px;
    }
    .airdrop-other-cont {
        height: 55px;
    }    
}

@media (min-width: 993px) and (max-width: 1199px) {
    .airdrop-other-title {
        font-size: 17px;
    }
    .airdrop-other-snapshot, .airdrop-other-airdrop {
        font-size: 15px;
    }
    .airdrop-other-cont {
        height: 60px;
    }    
}

@media (min-width: 1200px) {
    .airdrop-card-title {
        font-size: 20px;
    }   
} */

.airdrop-other-token {
    font-weight: 600;
}

.airdrop-other-title {
    margin-bottom: 5px;
}

.chuck {
    margin-right: 10px; 
    height: 100%; 
    /* background-color: #6c9cd1; */
    background-color: #6c9cd1;
    width: 10px;
}

.airdrop-other-cont {
    border-bottom: 1px #e7e5e5 solid; 
}

</style>
