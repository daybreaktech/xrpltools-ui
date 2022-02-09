<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg :class="{'is-active':isActive}" width="20" height="25" viewBox="0 0 631 490" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.428711" width="629.714" height="69.9683" fill="black"/>
      <rect x="0.428711" y="209.897" width="629.714" height="69.9683" fill="black"/>
      <rect x="0.428711" y="419.81" width="314.857" height="69.9683" fill="black"/>
    </svg>    
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
