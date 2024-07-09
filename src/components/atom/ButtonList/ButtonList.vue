<script setup lang="ts">
import './ButtonList.scss'
import { defineEmits } from 'vue'

const emit = defineEmits(['btn:action'])

defineProps({
  text: {
    type: String,
    default: ''
  },
  input: {
    type: String,
    default: ''
  },
  classes: {
    type: String,
    default: 'default'
  },
  showIcon: {
    type: Boolean,
    default: false
  },
  classIcon: {
    type: String,
    default: ''
  },
  showText: {
    type: Boolean,
    default: true
  }
})

const handleInput = () => emit('btn:action')
</script>

<template>
  <button v-if="showIcon" :class="`button-list ${classes}`" @click="handleInput">
    <i :class="`fa-solid ${classIcon}`"></i>
  </button>
  <button v-else :class="`button-list ${classes}`" @click="handleInput">{{ text }}</button>
</template>
