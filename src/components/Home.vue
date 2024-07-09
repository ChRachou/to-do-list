<script setup lang="ts">
import { ref } from 'vue'

import List from '@components/List/List.vue'

const lists = ref<Array<number>>([0, 1, 2])
</script>

<template>
  <div id="home">
    <List v-for="list in lists" :key="`list-${list}`" :id="list"></List>
  </div>
</template>
