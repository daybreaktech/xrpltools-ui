<template>
    <div>
        <el-col class="scroll-container" :md="24" :lg="24">

            <div class="scroll-item" @click="onFireBack('airdrops')">
                <el-row class="scroll-item-icon" style="padding-top: 17px !important;">
                    <AirdropLogo :size="45" color="#3d3c3c"/>
                </el-row>
                <el-row class="scroll-item-label">
                    Airdrops
                </el-row>
            </div>
            <div class="scroll-item" @click="onFireBack('accounts')">
                <el-row class="scroll-item-icon" style="padding-top: 25px !important;">
                    <AccountLogo :size="40" color="#3d3c3c"/>
                </el-row>
                <el-row class="scroll-item-label">
                    ACCOUNTS
                </el-row>
            </div>
            <div class="scroll-item" @click="onFireBack('lookup')">
                <el-row class="scroll-item-icon" style="padding-top: 25px !important;">
                    <LookupLogo :size="40" color="#3d3c3c"/>
                </el-row>
                <el-row class="scroll-item-label">
                    LOOK-UP
                </el-row>
            </div>
            <div class="scroll-item" @click="onFireBack('about')">
                <el-row class="scroll-item-icon" style="padding-top: 25px !important;">
                    <DevsLogo :size="40" color="#3d3c3c"/>
                </el-row>
                <el-row class="scroll-item-label">
                    ABOUT DEVS
                </el-row>
            </div>                                    
        </el-col>        
    </div>
</template>

<script>

import AirdropLogo from '@/svg/AirdropLogo'
import AccountLogo from '@/svg/AccountLogo'
import LookupLogo from '@/svg/LookupLogo'
import DevsLogo from '@/svg/DevsLogo'

export default {
  props: ['itemFireBack'],   
  components: {
      AirdropLogo,
      AccountLogo,
      LookupLogo,
      DevsLogo
  },
  data() {
    return {
        onFireBack(route) {
            this.itemFireBack(route);
        } 
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {   
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

.scroll-container {
  overflow: auto;
  white-space: nowrap;
  text-align: center;
  margin-top: 10px;
  overflow-y: hidden;
}


.scroll-item {
    display: inline-block;
    height: 105px !important;
    width: 150px !important;
    margin-right: 5px;
    padding: 5px;
    padding-top: 8px;
    border: 1px #ebe8e8 solid; 
}

.scroll-item-text {
    font-family: 'Dongle';
    font-size: 20px;
    color: rgb(230, 228, 228);
    width: 100%;
    margin-top: 5px;
    font-weight: bold;
}

.scroll-item-icon {
    height: 80%;
    text-align: center;
    padding-top: 5px;
}

.scroll-item-label {
    height: 80%;
    text-align: center;
    letter-spacing: 2px;
    font-size: 17px;
    font-family: 'Dongle';
    color: #3d3c3c;
}

.scroll-container::-webkit-scrollbar { width: 0 !important }
.scroll-container { overflow: -moz-scrollbars-none; }
.scroll-container { -ms-overflow-style: none; }

what {
    color: #5b5a5a;
}

</style>