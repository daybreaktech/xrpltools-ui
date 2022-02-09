<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <!-- <span class="title">XRP Tools Beta v1.0.2</span> -->
    <!-- <div v-show="showTipButton">
      <el-button class="tip-button" type="primary" @click="goToAbout()">Click/Tap here to send tips!</el-button>
    </div> -->

    <div class="airdrop-logo-cont" v-if="ifAirdropRoute()"><AirdropLogoNew size="40" color="black"/></div>
    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import AirdropLogoNew from '@/svg/AirdropLogoNew';

export default {
  data() {
    return {
      showTipButton: true
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    AirdropLogoNew
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
  },
  methods: {
    ifAirdropRoute() {
      return this.$route.name == 'airdrops' || this.$route.name == 'schedule';
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    goToAbout() {
      this.$router.push({ name: 'about' })
    },
    goToDonation() {
      this.$router.push({ name: 'donation' })
    }
  },
  watch:{
    $route (to){
        this.showTipButton = to.name == 'about' ? false : true;
    }
} 
}
</script>

<style lang="scss" scoped>

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  margin-top: 10px;
  padding-right: 15px;

  .airdrop-logo-cont {
    float: right;
  }

  .title {
    font-family: 'Dongle';
    float: left;
    text-align: center;
    margin-top: 15px;
    font-size: 20px;
    font-weight: bolder;
  }
  
  .tip-button {
    font-size: 1rem !important;
    float: right;
    background-color: rgb(47, 150, 47) !important;
    border-color:rgb(47, 150, 47) !important;
  }

  .donate-button {
    font-size: 1.2rem !important;
    float: left;
    background-color: rgb(172, 40, 35) !important;
    border-color:rgb(172, 40, 35) !important;
    animation: blinker 1s linear infinite;
  }
  
  @keyframes blinker {
    10% {
      opacity: 0;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
