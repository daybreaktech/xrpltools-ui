<template>
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    :width="size" :height="size" viewBox="0 0 175.000000 177.000000">

    <g transform="translate(0.000000,177.000000) scale(0.100000,-0.100000)"
    :fill="color" stroke="none">
      <path d="M650 1739 c-301 -79 -541 -322 -621 -629 -18 -73 -20 -103 -17 -254
      4 -167 5 -173 40 -269 104 -281 326 -486 603 -557 121 -31 333 -29 449 5 251
      73 444 239 556 478 58 122 80 227 80 373 0 245 -80 443 -249 617 -110 115
      -265 205 -412 241 -97 24 -330 21 -429 -5z m397 -419 c60 -26 119 -82 144
      -135 28 -60 26 -157 -5 -210 -43 -72 -115 -107 -346 -167 -106 -27 -140 -56
      -140 -118 0 -83 88 -133 204 -116 58 9 119 54 142 105 l19 40 93 1 c105 0 104
      2 71 -84 -37 -99 -134 -177 -258 -206 -78 -18 -223 -9 -286 19 -59 26 -118 80
      -148 136 -29 53 -30 173 -3 227 26 53 88 95 184 123 45 14 120 36 166 50 104
      31 146 63 146 111 0 44 -33 79 -91 94 -87 24 -179 -11 -207 -80 l-17 -40 -87
      0 c-49 0 -88 4 -88 8 0 5 7 31 15 59 29 98 105 169 214 200 68 19 217 10 278
      -17z"/>
    </g>
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
    background-color: #343434;
  }
}

</style>