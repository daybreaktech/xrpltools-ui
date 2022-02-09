<template>
    <div class="app-container" v-loading="loading">
        <el-button type="primary" style="margin-bottom: 5px;" @click="refresh()">Refresh/Fetch New Trustlines</el-button>
        <el-table
        :data="tokens"
        border
        fit
        highlight-current-row>
            <el-table-column label="Tokens">
                <template slot-scope="scope">
                    <div v-for="tok in scope.row.tokens" :key="tok.account">
                        <div> Currency: {{ tok.decodedCurrency }} </div>
                        <div> Limit: {{ tok.amount }} </div>
                        <div> Trustlines: {{ tok.trustlines }} </div>
                        <div> Xumm Trusline: <a class="sol-link" :href="'https://xumm.community/?issuer=' + scope.row.account + '&currency=' + tok.decodedCurrency + '&limit=' + tok.amount" target="_blank">Link</a> </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Date Created">
                <template slot-scope="scope">
                    {{ new Date(scope.row.dateCreated).toLocaleString() }}
                </template>
            </el-table-column>   
        </el-table>
    </div>
</template>

<script>
import { getTokens } from '@/api/token'

export default {
  data() {
    return {
      tokens: null, 
      loading: false
    }
  },
  created() {
      //this.fetchTokens();
  },
  mounted() {
      // this.refeshList();
  },
  methods: {
      refresh() {
        this.fetchTokens();
      },
      refeshList() {
          // let meth = this;
          // setInterval(function(){
          //     meth.fetchTokens();
          // }, 60000);
      },
      fetchTokens() {
        this.tokens = [];
        let meth = this;
        meth.loading = true;
        getTokens()
        .then(response => response.json()).then(data => {
            this.generateFromTokens(data.issuers);
             meth.loading = false;
        })          
      },
      isHex(currency) {
        let a = parseInt(currency, 16);
        return (a.toString(16) === currency)
      },
      convertHexToText(hexx) {
        let hex  = hexx.toString();
        let str = '';
        for (let n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str.substring(0, str.indexOf('\x00'));
      },
      sortTokensByDate(a, b) {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      },
      isNumeric: function (n) {
        let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
        return format.test(n.toString());
      },
      generateFromTokens(tokenList) {
        let tokens = [];
        let meths = this;
        for (let key in tokenList) {
            if (tokenList.hasOwnProperty(key)) {
                let data = tokenList[key].data;
                let dataToken = tokenList[key].tokens;

                if (data.created && data.created.date) {
                    let today = new Date();
                    let dataCreated = Date.parse(data.created.date);
                    const diffTime = Math.abs(today - dataCreated);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays <= 7) {
                        let newTokens = [];

                        dataToken.map(function(value) {
                            if (!meths.isNumeric(value.amount)) {
                                let currency = value.currency;
                                let decodedCurrency = currency.length > 3 ? meths.convertHexToText(currency) : currency;

                                let tok = {
                                    currency: currency,
                                    decodedCurrency: decodedCurrency,
                                    amount: value.amount,
                                    trustlines: value.trustlines,
                                    offers: value.offers
                                }

                                newTokens.push(tok);                                    
                            }                        
                        })

                        if (newTokens.length > 0) {
                            let newToken = {
                                resolvedBy: data.resolvedBy,
                                account: data.account,
                                username: data.username,
                                domain: data.domain,
                                twitter: data.twitter,
                                verified: data.verified,
                                kyc: data.kyc,
                                dateCreated: data.created.date,
                                tokens: newTokens
                            }

                            tokens.push(newToken);
                        }
                    }
                }  
            }
        }
        // Set token here
        tokens.sort(this.sortTokensByDate);
        this.tokens = tokens;
        this.$message("Fetched created tokens from the last 7 days..")
    }
  }
}
</script>

<style>

/* unvisited link */
a:link {
  color: red;
}

/* visited link */
a:visited {
  color: green;
}

/* mouse over link */
a:hover {
  color: hotpink;
}

/* selected link */
a:active {
  color: blue;
}

el-table {
    font-family: "Poppins, sans-serif" !important;
    font-size: 14px;
}

.el-table--border,
.el-table--border td,
.el-table--border th,
.el-table th.is-leaf {
  border-color: #d6d6d6;
}

</style>