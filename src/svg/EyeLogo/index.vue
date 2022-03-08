<template>

    <svg :width="size" :height="size * 0.511" viewBox="0 0 796 407" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M398.356 406.976C617.957 406.976 795.979 316.03 795.979 203.843C795.979 91.655 617.957 0.708984 398.356 0.708984C178.754 0.708984 0.732422 91.655 0.732422 203.843C0.732422 316.03 178.754 406.976 398.356 406.976ZM398.358 389.685C498.61 389.685 579.881 308.414 579.881 208.161C579.881 107.908 498.61 26.6373 398.358 26.6373C298.105 26.6373 216.834 107.908 216.834 208.161C216.834 308.414 298.105 389.685 398.358 389.685Z" :fill="color"/>
        <circle cx="398.345" cy="208.16" r="121.016" :fill="color"/>
    </svg>

</template>

<script>

import moment from 'moment';

export default {
  props: ['size', 'color'],
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
  .asdadsd {
    background-color: #e2aa0f;
  }
}

</style>