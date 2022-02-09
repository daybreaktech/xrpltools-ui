<template>
    <span>
        <span :style="tags && tags.includes('NEW') ? '': 'display: none;'"><NewIcon class="tag" :size="size"/></span>
        <span :style="tags && tags.includes('HOT') ? '': 'display: none;'"><HotIcon class="tag" :size="size"/></span>
        <span :style="tags && tags.includes('IMP') ? '': 'display: none;'"><ImpIcon class="tag" :size="size"/></span>
    </span>
</template>

<script>

import NewIcon from '@/svg/New'
import HotIcon from '@/svg/Hot'
import ImpIcon from '@/svg/Important'

export default {
  props: ['tags', 'size'],
  components: {
    NewIcon,
    HotIcon,
    ImpIcon
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style>

.tag {
    margin-right: 2px;
    margin-left: 2px;
    top: 20px;
}

</style>