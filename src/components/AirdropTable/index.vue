<template>
    <div class="app-container">
          <el-table :data="airdropList" @row-click="fireBack" :border="false">            
            <el-table-column align="left" label="Title" width="300">
                <template slot-scope="scope">
                    <span style="font-weight: 600;">{{ scope.row.shortDesc }}</span>
                    <span class="tags"><Tags :tags="scope.row.tags" :size="screenMode == 'XS' ? 14 : 18"/></span> 
                </template>
            </el-table-column>
            <el-table-column align="left" label="Token">
                <template slot-scope="scope">
                    {{ scope.row.tokenName ? scope.row.tokenName : '[TBA]' }}
                </template>
            </el-table-column> 
            <el-table-column align="left" label="Snapshot">
                <template slot-scope="scope">
                    {{ scope.row.snapshotDate ? moment(String(scope.row.snapshotDate)).format('MMM DD[,] YYYY ha') : 'N/A' }}
                </template>
            </el-table-column>
            <el-table-column align="left" label="Airdrop">
                <template slot-scope="scope">
                    {{ scope.row.airdropDate ? moment(String(scope.row.airdropDate)).format('MMM DD[,] YYYY ha') : 'N/A' }}
                </template>
            </el-table-column>                                       
          </el-table>
    </div>
</template>

<script>

import moment from 'moment';
import { getScreenMode } from '@/utils/screenmode';
import Tags from '@/components/Tags'

export default {
  props: ['airdropList', 'itemFireBack', 'tab'],   
  components: {
      Tags
  },
  data() {
    return {
        moment: moment,
        tableColumns: ["Title", "Token", "Snapshot", "Airdrop"],
        screenMode: getScreenMode()
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    fireBack(row) {
        this.itemFireBack(row.code, this.tab);
    }  
  }
}
</script>

<style>

@media (max-width: 768px) {
    
}

@media (min-width: 769px) and (max-width: 992px) {
    .el-table__row {
        font-size: 13px !important;
    }
}

@media (min-width: 993px) and (max-width: 1199px) {
    .el-table__row {
        font-size: 13px !important;
    }
}

@media (min-width: 1200px) {
    .el-table__row {
        font-size: 13px !important;
    }   
}

.el-table__empty-text {
    display: none;
}

th {
    font-size: 10px;
    font-weight: 0;
    color: rgb(208, 205, 205) !important;
}

.el-table td, .el-table th.is-leaf {
    border: none;
}

.el-table::before {
    height: 0px;
}

.el-table__row {
    cursor: pointer;
}

</style>