<template>
    <el-tooltip content="Reputable Project with Large Following">
      <svg :width="size" :height="size" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="107" r="14" fill="#e26666"/>
          <path d="M50 7H78L71 84H64H57L50 7Z" fill="#e26666"/>
      </svg>      
    </el-tooltip>
</template>

<script>

import moment from 'moment';

export default {
  props: ['size'],
  components: {
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

.el-tooltip__popper {
    padding: 3px !important;
    font-family: 'Dongle';
    color: whitesmoke !important;
    margin-top: 2px !important;
    font-size: 15px;
}

.popper__arrow {
    display: none !important;
}


</style>