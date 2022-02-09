<template>
    <div class="app-container" v-show="showMainCont">
        <div class="layout-container account-container">
            <!-- <el-progress class="account-progress" :show-text="false" color="#1f2d3d" :percentage="perc" v-show="true"></el-progress> -->
            <el-col :xs="24" :sm="24" :md="10" :lg="10">
                <el-row class="account-main-cont">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="account-cont">
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" class="xrp-logo"></el-col>
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" style="font-size: 35px; font-weight: bolder;">
                            {{ totalXrp }}
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" style="font-size: 20px;">
                            = {{ totalInUsd }}
                        </el-col>
                    </el-col>
                </el-row>

                <el-row class="accounts-adsense-cont">
                    <Adsense 
                        class="adsbygoogle"
                        style="display:block"
                        data-ad-format="fluid"
                        data-ad-layout-key="-ha+17+74-19-fb"
                        data-ad-client="ca-pub-5777388526924455"
                        data-ad-slot="4498533112">
                    </Adsense>
                </el-row>

                <el-col class="account-cont account-main-cont" v-loading="addNewAccountLoading">
                    <el-col :xs="24" :sm="24" :md="8" class="el-comp">
                        <el-input placeholder="Account Name" v-model="accountNameField"></el-input>
                    </el-col>   
                    <el-col :xs="24" :sm="24" :md="8" class="el-comp">
                        <el-input placeholder="Address" v-model="addressField"></el-input>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="8" class="el-comp">
                        <el-button class="account-button" type="primary" :xs="24" :sm="12" @click="addNewAccount()">ADD</el-button>
                    </el-col>                           
                </el-col>
                
                <el-row class="account-cont" style="width: 100%;" v-loading="loadAccountsLoading">
                    <el-collapse accordion>
                        <el-collapse-item v-for="account in accountsList" :key="account.address" 
                        :title="account.accountName" :name="account.accountName" >
                            <el-row class="account-item">
                                <label>ADDRESS:</label> {{ account.address }}
                            </el-row>
                            <el-row class="account-item">
                                <label>BALANCE:</label> {{ toCurrency(account.totalBalance) }} XRP ({{ toCurrency(account.totalBalanceUsd) }} USD)
                            </el-row>
                            <el-row class="account-item">
                                <label>TOKENS</label>
                            </el-row>
                            <el-row class="account-item">
                                <div class="tag-cont">
                                    <el-tag class="trustline-items" v-for="balance in account.balances" 
                                    :key="balance.currency" 
                                    :name="balance.currency">

                                        <el-popover v-if="!(balance.currency == 'XRP')"
                                            :key="balance.currency"
                                            placement="top-start"
                                            trigger="click"
                                            width="100">
                                            <span slot="reference"><span class="currency-label">{{ decodeCurrency(balance.currency) }}</span> : {{ toCurrency(balance.value) }} {{ balance.currency === 'XRP' ? '' : '(' + toCurrency(balance.balanceInXrp) + ' XRP)'  }}</span>

                                            <div>
                                                <el-row>
                                                    <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                                        <div @click="goToDex(decodeCurrency(balance.currency), balance.counterparty, balance.currency)">
                                                            <SoloLogo :size="40" color="#3d3c3c"/>
                                                        </div>
                                                    </el-col>
                                                    <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                                        <div @click="goToLookup(decodeCurrency(balance.currency), account.address, balance.counterparty)">
                                                            <LookupLogo :size="40" color="#3d3c3c"/>
                                                        </div>
                                                    </el-col>                                                       
                                                </el-row>  
                                                <el-row class="trustline-popover-item-text">
                                                    <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                                        Go To Dex
                                                    </el-col>
                                                    <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                                        Look-Up
                                                    </el-col>                                                       
                                                </el-row>                                                                                              
                                            </div>
                                        </el-popover>

                                        <span v-if="balance.currency == 'XRP'"><span class="currency-label">{{ decodeCurrency(balance.currency) }}</span> : {{ toCurrency(balance.value) }} {{ balance.currency === 'XRP' ? '' : '(' + toCurrency(balance.balanceInXrp) + ' XRP)'  }}</span>
                                    </el-tag>
                                </div>
                            </el-row>
                            <el-row style="margin-top: 10px;">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" style="float: right;">
                                    <el-button style="width: 100%;" type="danger" class="remove-account-button" @click="removeAccount(account.address)">REMOVE ACCOUNT</el-button>
                                </el-col>
                            </el-row>                                        
                        </el-collapse-item>
                    </el-collapse>
                </el-row>                
            </el-col>
        </div>
    </div>
</template>

<script>

import { findAccount, generateFindAccountRequest, generateFindTrustRequest, fetchSoloMarket, generateExchangeRates, getXrpUsdValue } from '@/api/accounts'
import axios from 'axios';
import SoloLogo from '@/svg/SoloLogo';
import LookupLogo from '@/svg/LookupLogo'
let exceedErrorAppeared = false;

export default {
  components: {
      SoloLogo,
      LookupLogo
  },  
  data() {
    return {
        accountNameField: null,
        addressField: null,
        accountsList: [],
        tokens: [],
        tokenRates: [],
        soloTokenFetched: [],
        totalXrp: "Fetching...",
        totalInUsd: "Fetching...",
        perc: 0,
        progressIncrement: 0,
        showProgress: false,
        addNewAccountLoading: false,
        loadAccountsLoading: false,
        showMainCont: true,
        disableReloadButton: false,
    }
  },
  created() {
      this.eventViewPage();
      exceedErrorAppeared == false;
      this.axiosIntercept();
      this.loadAccounts();
      //localStorage.removeItem("accounts");
  },
  mounted() {
      exceedErrorAppeared == false;
  },
  methods: {
      goToDex(tokenName, issuerAddress, currencyCode) {
          this.eventClickDex(tokenName);
          window.open("https://sologenic.org/trade?market=" + currencyCode + "%2B" + issuerAddress + "%2FXRP&network=mainnet", '_blank');
      },
      goToLookup(tokenName, yourAddress, issuerAddress) {
        this.eventClickLookup(tokenName);
        this.$router.push({
            name: 'lookup',
            params: { 
                issuer: issuerAddress,
                address: yourAddress
            }
        });
      },
      removeAccount(address) {
          let meths = this;
          this.$confirm("Do you really want to remove this account?")
            .then(function(){
                meths.excludeAccount(address);
            }).catch(() => {
            })
      },
      excludeAccount(address) {
          let accounts = JSON.parse(localStorage.getItem("accounts"));

          let updatedAccounts = accounts.filter(function(account){
              if (!(account.address === address)) {
                  return true;
              }
          });

          localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
          this.$message.success("Account successfully removed");
          this.eventRemoveAccount();
          this.loadAccounts();
      },
      reloadUsdRate() {
        let meths = this;
        getXrpUsdValue()
            .then(response => response.json()).then(result => {
                meths.totalInUsd = meths.toCurrency(meths.totalXrp * result.ripple.usd) + " USD";
            })
      },
      initProgressParam() {
          let accounts = JSON.parse(localStorage.getItem("accounts"));

          if (accounts && accounts.length > 0) {
              this.progressIncrement = 100 / accounts.length;
          }
          
          this.perc = 0;
          this.showProgress = true;
      },
      axiosIntercept() {
        let meths = this;
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            meths.blockScreenfromError(error);
        });


        axios.interceptors.request.use(function (config) {
            
            if (config.url && config.url.indexOf("balances") > 0) {
                setTimeout(function(){}, 1000);
            }

            return config;
        }, function (error) {
            console.log(error);
        });
      },
      reloadBalance() {
          this.eventReloadClick();
          this.loadAccounts();
      },
      toCurrency(balance) {
          return (Math.round(balance * 100) / 100).toLocaleString();
      },
      convertHexToText(hexx) {
        let hex  = hexx.toString();
        let str = '';
        for (let n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str.substring(0, str.indexOf('\x00'));
      },
      decodeCurrency(currency) {
          return currency.length > 3 ? this.convertHexToText(currency) : currency;
      },
      validateNewAccountInput(callback) {
        let meths = this;
        if (this.accountNameField == null || !this.ifStringNotWhitespace(this.accountNameField) 
        || this.addressField == null || !this.ifStringNotWhitespace(this.addressField) ) {
            meths.$message.error("INVALID INPUT");
            callback(false);
            return false;
        } else {
            meths.addNewAccountLoading = true;
            findAccount(this.addressField)
                .then(response => response.json()).then(account => {
                    if (!account.account) {
                        meths.$message.error("ADDRESS NOT FOUND");
                        callback(false);
                        return false;
                    } else {
                        if (localStorage.getItem("accounts") != null) {
                            let accounts = JSON.parse(localStorage.getItem("accounts"));

                            const syncResAddress = accounts.filter((account) => {
                                return account.address == meths.addressField
                            });
                            const syncResAccountName = accounts.filter((account) => {
                                return account.accountName.toLowerCase() == meths.accountNameField.toLowerCase()
                            });

                            if (syncResAddress.length > 0) {
                                meths.$message.error("ADDRESS EXISTS");
                                callback(false);
                            } else if (syncResAccountName.length > 0) {
                                meths.$message.error("ACCOUNT NAME EXISTS");
                                callback(false);
                            } 
                            else {
                                callback(true);
                            }
                        } else {
                            callback(true);
                        }              
                    }
            });               
        }
      },
      ifStringNotWhitespace(value) {
          return /\S/.test(value);
      },
      blockScreenfromError(error) {
          if (error.response && error.response.data && error.response.data.error) {
              let errorMessage = error.response.data.error;

              if (errorMessage.indexOf("exceeded") > 0 && exceedErrorAppeared == false) {
                  exceedErrorAppeared = true;
                  this.$alert("XRPL Error: exceeded request threshold! Please try again after a minute.");
                  this.showMainCont = false;
              }
          }
      },
      addNewAccount() {
        let meths = this;
        let newAccount = {
            accountName: this.accountNameField,
            address: this.addressField
        }

        this.validateNewAccountInput(function(value) {
            if (value == true) {
                console.log('AWWW')
                let jsonString = JSON.stringify(newAccount);
                if (localStorage.getItem("accounts") == null) {
                    localStorage.setItem("accounts", "[" + jsonString + "]");
                    console.log("Initiated accounts");
                } else {
                    var accounts = JSON.parse(localStorage.getItem("accounts"));
                    accounts.push(newAccount);
                    localStorage.setItem("accounts", JSON.stringify(accounts));
                }

                meths.$message.success("Account added!");
                meths.eventAddedNewAccount();
                meths.loadAccounts();
                meths.accountNameField = null;
                meths.addressField = null;
                meths.addNewAccountLoading = false;
            } else {
                meths.addNewAccountLoading = false;
            }
        })
      },
      addToTokens(currencyCode, issuerAddress) {
          this.tokens.push({
              currencyCode: currencyCode,
              issuerAddress: issuerAddress
          })
      },      
      loadAccounts() {
          this.totalXrp = "Fetching...";
          this.totalInUsd = "Fetching..."
          let meths = this;
          let accounts = JSON.parse(localStorage.getItem("accounts"));
          let newAccounts = [];
          let thisTotalXrp = 0;
          let usdRate = 0;

          this.initProgressParam();

          getXrpUsdValue()
            .then(response => response.json()).then(result => {
                usdRate = result.ripple.usd;
            })

          if (accounts != null) {
              this.loadAccountsLoading = true;
              this.accountsList = accounts;

              const syncRequests = this.accountsList.map(function(account) {
                  return axios.get(generateFindAccountRequest(account.address));
              });

              axios.all(syncRequests, {
                  headers: {
                      "mehnigga": "true"
                  }
              }).then(axios.spread((...responses) => {
                  const sync = responses.map(function(result, index){

                      return {
                          accountName: meths.accountsList[index].accountName,
                          address: meths.accountsList[index].address,
                          balances: result.data.balances
                      }
                  });
                  newAccounts = sync;
              })).catch(errors => {
                  console.log(errors);
                  meths.blockScreenfromError(errors);
              }).finally(() => {

                let syncedAccounts = newAccounts.map(function(account){
                    let xrpBalance = 0;
                    account.balances.map(function(bal) {
                        let currencyCode = bal.currency;
                        let issuerAddress = bal.counterparty;
                        if (currencyCode === "XRP") {
                            xrpBalance = bal.value;
                        } else {
                            meths.addToTokens(currencyCode, issuerAddress);
                        }
                    });
                    account.xrpBalance = xrpBalance;
                    return account;
                });

                let syncRequests = meths.tokens.map(function(token) {
                    return axios.get(generateExchangeRates(token.currencyCode + "+" + token.issuerAddress + "/XRP"));
                });

                axios.all(syncRequests).then(axios.spread((...responses) => {

                    let sync = responses.map(function(result, index){
                        meths.tokens[index].rate = result.data.rate;
                        meths.tokenRates[meths.tokens[index].currencyCode] = meths.tokens[index];
                    });
                    
                    let syncTrustlines = newAccounts.map(function(account){
                        let accountBalanceXrp = 0;
                        let accounts = account.balances.map(function(bal) {
                            let currencyCode = bal.currency;
                            let balance = Number.parseFloat(bal.value);

                            if (currencyCode === "XRP") {
                                accountBalanceXrp = accountBalanceXrp + balance;
                            } else {
                                let rate = Number.parseFloat(meths.tokenRates[currencyCode].rate);
                                let balanceInXrp = bal.value * rate;
                                bal.balanceInXrp = balanceInXrp;
                                accountBalanceXrp = accountBalanceXrp + balanceInXrp;
                            }
                            return bal;
                        });
                        account.totalBalance = accountBalanceXrp;
                        account.totalBalanceUsd = accountBalanceXrp * usdRate;
                        meths.perc = meths.perc + meths.progressIncrement;
                        return account;
                    });

                    syncTrustlines.map(function(account) {
                        thisTotalXrp = thisTotalXrp + account.totalBalance;
                    })

                })).catch(errors => {
                    console.log("DAMN ERROR");
                    meths.blockScreenfromError(errors);
                }).finally(() => {
                    meths.totalXrp = meths.toCurrency(thisTotalXrp) + " XRP";
                    meths.totalInUsd = meths.toCurrency(thisTotalXrp * usdRate) + " USD";
                    meths.accountsList = newAccounts;
                    meths.showProgress = false;
                    meths.loadAccountsLoading = false;
                });                
              });
          } else {
              localStorage.setItem("accounts", JSON.stringify([]));
          } 
      },
      //events
      eventViewPage() {
          this.triggerEvent("accounts", "page-view", "Page View", "");
      },
      eventReloadClick() {
          this.triggerEvent("accounts", "reload-click", "Pressed Overall Currency Reload", "");
      },
      eventClickLookup(issuer) {
          this.triggerEvent("accounts", "token-lookup-click", "Pressed Lookup Key for Token", issuer);
      },
      eventClickDex(issuer) {
          this.triggerEvent("accounts", "token-dex-click", "Pressed Dex Key for Token", issuer);
      },
      eventAddedNewAccount() {
          this.triggerEvent("accounts", "added-new-account", "Added New Account", "");
      },
      eventRemoveAccount() {
          this.triggerEvent("accounts", "added-remove-account", "Removed Account", "");
      },
      triggerEvent(category, action, label, value) {
        this.$gtag.event(action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });  
      }
  }
}
</script>

<style>

@media (max-width: 768px) {
    .accounts-adsense-cont .adsbygoogle {
        height: 100px;
    }
}

@media (min-width: 769px) and (max-width: 992px) {
    .accounts-adsense-cont .adsbygoogle {
        height: 120px;
    }                 
}

@media (min-width: 993px) and (max-width: 1199px) {
    .accounts-adsense-cont .adsbygoogle {
        height: 150px;
    }                           
}

@media (min-width: 1200px) {
    .accounts-adsense-cont .adsbygoogle {
        height: 150px;
    }                        
}

.accounts-adsense-cont {
    margin-top: 5px;
    margin-bottom: 5px;
}

.el-comp {
    padding: 3px;
}
.account-button {
    width: 100%;
}
.account-cont {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid rgb(223, 223, 223);
    display: inline-block;
}

.xrp-logo {
    background-image: url(https://i.ibb.co/PGLP3Bx/xrp.png);
    background-size: contain;
    height: 100px;
    width: 100px;
    margin-right: 10px;
}

.account-container {
    font-family: 'Dongle' !important;
}

.el-message-box {
    height: 150px;
    width: 300px;
    text-align: center;
}

.el-message-box__close {
    display: none;
}

.el-message-box__message {
    font-family: 'Dongle' !important;
    font-size: 30px;
    font-weight: 900;
}

.el-collapse-item__header {
    font-family: 'Dongle' !important;
    font-size: 25px;
    font-weight: 900;
}

.el-message {
    font-family: 'Dongle' !important;
    font-size: 30px;
    font-weight: 900;
    width: 200px !important;
    border-color: #1f2d3d;
    background-color: #1f2d3d;;
}

.el-message-box__header {
    background-color:#1f2d3d;
    border-color:#1f2d3d;
}

.el-message__content {
    font-size: 30px;
}

.account-item {
    font-size: 18px;
}

.trustline-items {
    font-size: 18px;
    cursor: pointer;
    margin: 2px;
    border-radius: 0px !important;
    background-color: whitesmoke;
    border-color: #3d3c3c;
    color: #3d3c3c;
}

.currency-label {
    font-weight: bold;
}

.remove-account-button {
    background-color: rgb(186, 79, 79) !important;
    border-color: rgb(186, 79, 79) !important;
}

.el-popper {
    width: 210px !important;
    text-align: center;;
}

.popover-dex {
    background-color: #d81d3c !important;
    border-color: #d81d3c !important;
}

.el-collapse-item__header, .el-collapse, .el-collapse-item__content {
    border: none;
    border-bottom: none !important;
}

.el-popover {
    border: 1px solid #3d3c3c;
}

.popper__arrow {
    display: none !important;
}

.trustline-popover-item-text {
    font-family: 'Dongle';
    font-weight: bold;
}

</style>