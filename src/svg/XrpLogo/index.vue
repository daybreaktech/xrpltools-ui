<template>
  <svg :width="size" :height="size" viewBox="0 0 747 747" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="373.71" cy="373.71" r="373.289" fill="#222222"/>
      <circle cx="373.71" cy="373.71" r="373.289" stroke="#C0C0C2"/>
      <path d="M509.89 213.897H565.722L449.563 328.856C407.515 370.47 339.342 370.47 297.294 328.856L181.135 213.897H236.967L325.21 301.229C351.84 327.584 395.016 327.584 421.647 301.229L509.89 213.897Z" fill="white"/>
      <path d="M236.26 533.334H180.428L297.305 417.664C339.352 376.051 407.525 376.051 449.574 417.664L566.451 533.334H510.618L421.657 445.291C395.026 418.936 351.851 418.936 325.22 445.291L236.26 533.334Z" fill="white"/>
  </svg>

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
  .asdadsd {
    background-color: #e2aa0f;
  }
}

</style>