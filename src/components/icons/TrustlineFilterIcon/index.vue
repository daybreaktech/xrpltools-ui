<template>
    <span class="trustline-filter-cont" @click="toggle()">
        <div style="trustline-filter-cont-sub">
            <EyeLogo :color="status == false ? 'black' : 'blue'" :size="size"/>
        </div>
    </span>
</template>

<script>

import moment from 'moment';
import EyeLogo from '@/svg/EyeLogo'

export default {
  props: ['size', 'onFireBack', 'isFilteredTrustline'],
  components: {
      EyeLogo
  },
  data() {
    return {
        moment: moment,
        color: '',
        status: false,
    }
  },
  beforeCreate() {
  },
  created() {
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
        this.status = (this.isFilteredTrustline && this.isFilteredTrustline == true);
    },
    toggle() {
        let thisStatus = this.status == true ? false : true;
        this.onFireBack(thisStatus);
        this.status = thisStatus;
    }
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

.trustline-filter-cont {
    cursor: pointer;
}

.trustline-filter-cont-sub {
    border: 1px solid black;
}


</style>