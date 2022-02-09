<template>
    <div class="airdrop-footer">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" class="airdrop-footer-feed-cont"> 
            <div class="airdrop-footer-feed" @click="goToTwitterAccount()">
                <div class="airdrop-footer-icon">
                    <TwitterLogo :size="generateSize(13, 19, 19, 19)"/>
                </div>
                <div class="airdrop-footer-feed-twitter">
                    @XRP_Airdrops
                </div>                
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" class="airdrop-footer-donate-cont">
            <div class="airdrop-footer-donate" @click="fireBack()">
                <div class="airdrop-footer-icon">
                    <HeartLogo :size="generateSize(13, 19, 19, 19)"/>
                </div>
                <div class="airdrop-footer-feed-donate">
                    Tips/Donations
                </div>               
            </div>
        </el-col>
    </div>   
</template>

<script>

import moment from 'moment';
import TwitterLogo from '@/svg/TwitterLogo';
import DonationLogo from '@/svg/DonationLogo';
import HeartLogo from '@/svg/HeartLogo';
import { assignSizePerScreen } from '@/utils/screenmode'

export default {
  props: ['fireBack'],
  components: {
      TwitterLogo,
      DonationLogo,
      HeartLogo
  },
  data() {
    return {
        moment: moment
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    generateSize(a, b, c, d) {
        return assignSizePerScreen(a, b, c, d);
    },
    onClick() {
        this.fireBack();
    },
    goToTwitterAccount() {
        window.open('https://twitter.com/XRP_Airdrops', '_blank')
    }
  }
}
</script>

<style>

@media (max-width: 768px) {
    .airdrop-footer-feed {
        padding-left: 5px;
        width: 105px;
    }
    .airdrop-footer-donate {
        width: 90px; 
    }    
    .airdrop-footer {
        height: 35px;
    }
    .airdrop-footer-feed, .airdrop-footer-donate {
        padding-top: 10px;
        font-size: 10px;
    } 
}

@media (min-width: 769px) and (max-width: 992px) {
    .airdrop-footer-feed {
        padding-left: 5px;
        width: 140px;
    }
    .airdrop-footer-donate {
        width: 130px; 
    }      
    .airdrop-footer {
        height: 60px;
    }
    .airdrop-footer-feed, .airdrop-footer-donate {
        padding-top: 20px;
        font-size: 15px;
    }
    .airdrop-footer-icon {
        padding-top: 1px;
    }                
}

@media (min-width: 993px) and (max-width: 1199px) {
    .airdrop-footer-feed {
        padding-left: 70px;
        width: 200px; 
    }
    .airdrop-footer-donate {
        width: 130px; 
    }     
    .airdrop-footer {
        height: 60px;
    }
    .airdrop-footer-feed, .airdrop-footer-donate {
        padding-top: 20px;
        font-size: 15px;
    }
    .airdrop-footer-icon {
        padding-top: 1px;
    }              
}

@media (min-width: 1200px) {
    .airdrop-footer-feed {
        padding-left: 70px;
        width: 220px;  
    }
    .airdrop-footer-donate {
        width: 200px; 
    }     
    .airdrop-footer {
        height: 60px;
    }
    .airdrop-footer-feed, .airdrop-footer-donate {
        padding-top: 20px;
        font-size: 18px;
    }
    .airdrop-footer-icon {
        padding-top: 1px;
    }          
}

.airdrop-footer-account {
    font-size: 13px;
}

.airdrop-footer-feed {
    margin: auto;
    cursor: pointer;
}

.airdrop-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 20;
    font-family: 'Roboto-Regular';
}

.airdrop-footer-donate-cont {
    background-color: #FCE17A;
}

.scrollbar-wrapper {
    z-index: 9999999 !important;
}

.airdrop-footer-account {
    color: rgb(198, 195, 195);
    font-weight: 600;    
}

.airdrop-footer-donate {
    height: 200px;
    cursor: pointer;
    margin: auto;
    text-align: center;
}

.airdrop-footer-feed-twitter {
    float: left; 
    padding-top: 1px; 
    font-weight: bolder;
    color: whitesmoke;
}

.airdrop-footer-icon {
    float: left; 
    margin-right: 5px;
    text-align: center;
}

.airdrop-footer-feed-cont {
    height: 100%;
    background-color: black;
    border: 1px solid black;
}

.airdrop-footer-feed-donate {
    float: left;
    color:black;
    font-weight: bolder;
    padding-top: 1px;
}
</style>