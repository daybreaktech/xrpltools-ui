<template>
  <div class="filter-selection-cont">
      <el-row>
        <el-radio-group class="filter-selection-radio-group" v-model="selected">
            <el-row><el-radio label="NEW">Recently Added / New</el-radio></el-row>
            <el-row><el-radio label="CAL">Calendar</el-radio></el-row>
            <el-row><el-radio label="HOLD">For Holders</el-radio></el-row>
            <el-row><el-radio label="IMP">Important</el-radio></el-row>
            <el-row><el-radio label="GID">Global-ID Required</el-radio></el-row>
        </el-radio-group>          
      </el-row>
      <el-row style="float: right; margin-top: 10px;">
          <el-button class="filter-select-button" @click="showSelected()">Confirm</el-button>
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
      }
  }
}
</script>

<style>

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

</style>
