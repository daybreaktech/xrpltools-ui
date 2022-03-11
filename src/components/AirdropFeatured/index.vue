<template>
    <div class="airdrop-featured">
        <div class="airdrop-featured-main-cont" v-for="index in chuckedAirdrops" :key="index">
            <div class="airdrop-featured-cont" v-for="airdrop in index" :key="airdrop">
                <div class="airdrop-featured-item-cont">
                    <div class="airdrop-featured-icon" @click="goToFireback(airdrop)" :style="'background-image: url(' + getImage(airdrop) + '),' + 'url(' + require('@/assets/no-image.png') + ')'"></div>
                    <span class="airdrop-card-info-token">{{ getTrustlineName(airdrop.trustline) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AirdropFeatured',
    props:['airdrops', 'onClickFireBack'],
    data() {
        return {
            mainCount: 0,
            chuckedAirdrops: [],
        }
    },
    watch: {
        "airdrops": {
            handler(list) {
                this.loadFeaturedList(list);
            },
            deep: true
        }
    },
    beforeCreate() {

    },
    created() {
        this.loadFeaturedList(this.airdrops);
    },
    methods:{
        loadFeaturedList(list) {
            this.chuckedAirdrops = this.chunkify(list, 4);
        },
        getImage(airdrop) {
            if (airdrop.useTrustlineImg && airdrop.useTrustlineImg != null && airdrop.useTrustlineImg == true) {
                return airdrop.trustline.imageUrl;
            } else {
                return airdrop.imageUrl;
            }
        },
        getTrustlineName(trustline) {
             return trustline.name && trustline != null ? trustline.name : "No-Token";
        },
        goToFireback(airdrop) {
            this.onClickFireBack(airdrop);
        },
        chunkify(list, limit) {
            const res = [];

            for (let i = 0; i < list.length; i += limit) {
                const chunk = list.slice(i, i + limit);
                res.push(chunk);
            }

            return res;           
        }
    }

}
</script>

<style>

.airdrop-featured-icon {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-size: cover;
    margin: auto;
}

.airdrop-featured-main-cont{
    margin: 0 auto;
    width: fit-content;
}

.airdrop-featured-item-cont {
    text-align: center;
    cursor: pointer;
}

.airdrop-featured {
    width: 100%;
    margin: auto;
}

.airdrop-card-info-token {
  font-size: 12px;
  font-weight: bolder;
  color: #181818;
  white-space:nowrap;
  font-family: 'Roboto-Regular';
}

@media (max-width: 319px) {
    .airdrop-featured-cont {
        width: 37px;
    }
    
}
@media (min-width: 320px) and (max-width: 480px) {
    .airdrop-featured-cont {
        width: 50px;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    .airdrop-featured-cont {
        width: 80px
    }
}
@media (min-width: 769px) and (max-width: 992px) {
    .airdrop-featured-cont {
        width: 120px;
    }
}

@media (min-width: 993px) and (max-width: 1199px) {
    .airdrop-featured-cont {
        width: 80px; 
    }        
}

@media (min-width: 1200px) {
     .airdrop-featured-cont {
        width: 110px;
    }   
                      
}

.airdrop-featured-cont {
    display: inline-block; 
    margin-right: 5px; 
    margin-left: 5px;
    margin-bottom: 10px;
 }


</style>