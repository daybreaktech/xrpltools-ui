<template>
    <el-tooltip content="Added in the past 7 days!">
        <svg :width="size" :height="size" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 9L38.2017 44.2017L3 50L38.2017 55.7983L44 91L49.7983 55.7983L85 50L49.7983 44.2017L44 9Z" fill="#e9fa4fe1"/>
            <path d="M44 9L38.2017 44.2017L3 50L38.2017 55.7983L44 91L49.7983 55.7983L85 50L49.7983 44.2017L44 9Z" stroke="#494a3e"/>
            <path d="M93 20L94.6971 30.3029L105 32L94.6971 33.6971L93 44L91.3029 33.6971L81 32L91.3029 30.3029L93 20Z" fill="#e9fa4fe1"/>
            <path d="M93 20L94.6971 30.3029L105 32L94.6971 33.6971L93 44L91.3029 33.6971L81 32L91.3029 30.3029L93 20Z" stroke="#494a3e"/>
            <path d="M93 56L97.3841 82.6159L124 87L97.3841 91.3841L93 118L88.6159 91.3841L62 87L88.6159 82.6159L93 56Z" fill="#e9fa4fe1"/>
            <path d="M93 56L97.3841 82.6159L124 87L97.3841 91.3841L93 118L88.6159 91.3841L62 87L88.6159 82.6159L93 56Z" stroke="#494a3e"/>
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
   .asda {
       color: #494a3e;
   }
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