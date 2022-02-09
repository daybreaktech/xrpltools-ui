<template>
    <el-tooltip content="Popular Project (or Large Social Following)">
        <svg :width="size" :height="size" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.215 62.4356C-1.14182 95.8572 38.8802 119.404 62.3108 127C73.7095 127 90.8075 121.303 106.006 90.9199C121.204 60.5367 96.5068 54.8398 100.306 58.6377C104.106 62.4356 98.4066 66.2335 96.5068 70.0314C94.6071 73.8293 88.9077 85.2231 90.8075 43.4461C92.3273 10.0246 62.3108 5.46709 47.1126 7.36604C49.0124 7.99903 54.3317 10.4044 60.411 14.9618C68.0102 20.6587 60.411 28.2545 56.6115 35.8503C52.8119 43.4461 45.2128 45.3451 41.4132 52.9409C37.6137 60.5367 50.9121 70.0314 37.6137 73.8294C26.9749 76.8677 25.5817 67.4995 26.215 62.4356Z" fill="#e26666"/>
            <path d="M42.2937 91.4135C26.5781 110.352 49.5695 123.696 63.0296 128C69.5778 128 79.4001 124.772 88.131 107.555C96.8619 90.3374 82.6741 87.1092 84.8569 89.2614C87.0396 91.4135 83.7655 93.5657 82.6741 95.7178C81.5828 97.87 78.3087 104.326 79.4001 80.6528C80.2731 61.7139 63.0296 59.1314 54.2987 60.2074C55.3901 60.5661 58.4459 61.9291 61.9383 64.5117C66.3037 67.7399 61.9383 72.0442 59.7555 76.3485C57.5728 80.6528 53.2074 81.7289 51.0246 86.0332C48.8419 90.3375 56.4814 95.7178 48.8419 97.87C42.7303 99.5917 41.9299 94.2831 42.2937 91.4135Z" fill="#f8aa7c"/>
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