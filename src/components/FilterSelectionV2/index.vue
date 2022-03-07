<template>
  <div class="filter-selection-cont">
      <el-row>
        <el-radio-group @change="showChangeSelected" class="filter-selection-radio-group" v-model="selected">
            <el-radio-button label="NEW">New</el-radio-button>
            <el-radio-button label="CAL">All</el-radio-button>
            <el-radio-button label="HOLD">Holders</el-radio-button>
            <el-radio-button label="FCT">Faucets</el-radio-button>
            <el-radio-button label="IMP">Important</el-radio-button>
            <el-radio-button label="GID">Global ID</el-radio-button>
            <el-radio-button class="last-radio" label="EXP">Expired</el-radio-button>                                                                           
        </el-radio-group>          
      </el-row>
  </div>
</template>

<script>

import CloseLogo from '@/svg/CloseLogo'
import { getSelectedFilter, initiateFilter, setFilter } from '@/utils/filter-selection';

export default { 
  props: ['onClickFireBack'],
  components: {
      CloseLogo
  },
  data() {
      return {
          selected: getSelectedFilter(),
      }
  },
  computed: {
  },
  methods: {
      showSelected() {
          this.onClickFireBack(this.selected);
      },
      showChangeSelected(value) {
          this.onClickFireBack(value);
      }
  }
}
</script>

<style>

@media (max-width: 768px) {
    .filter-selection-radio-group .el-radio-button__inner {
        font-size: 10px;
    }    
}

@media (min-width: 769px) and (max-width: 992px) {
    .filter-selection-radio-group .el-radio-button__inner {
        font-size: 14px;
    }         
}

@media (min-width: 993px) and (max-width: 1199px) {
    .filter-selection-radio-group .el-radio-button__inner {
        font-size: 14px;
    }                         
}

@media (min-width: 1200px) {
    .filter-selection-radio-group .el-radio-button__inner {
        font-size: 14px;
    }                    
}

.filter-selection-cont {
    font-family: 'Roboto-Regular';
}

.filter-selection-radio-group .el-radio {
    font-weight: bold;
}

.el-radio__label {
    font-size: 15px;
}

.filter-selection-radio-group .el-row {
    margin-top: 10px;
    margin-bottom: 10px;
}

.el-radio__inner {
    height: 25px;
    width: 25px;
    border: 1px solid rgb(150, 149, 149);
}

.el-radio__input.is-checked+.el-radio__label {
    color: black;
    font-weight: bolder;
}

.el-radio__input.is-checked .el-radio__inner {
    border: 2px solid #D2941B;
    background: white !important;
}

.el-radio__inner::after {
    width: 16px;
    height: 16px;
    background-color: #D2941B;
}

.filter-select-button {
    font-family: 'Roboto-Regular' !important;
    font-size: 13px !important;
    border-radius: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #D2941B !important;
    border-color: #D2941B !important;
}

.filter-selection-radio-group .el-radio-button__inner {
    border: none;
    background-color: #faf7f7;
    border-left: none !important;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 5px;
    padding-right: 5px;
    border-right: 1px black solid;
    font-weight: bold;
}

.filter-selection-radio-group .last-radio .el-radio-button__inner:last-of-type {
    border-right: 0px !important;
    border-radius: none !important;
}

.filter-selection-radio-group .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #faf7f7;
    color: #EABB40;
}

</style>
