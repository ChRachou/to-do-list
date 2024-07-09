<script setup lang="ts">
import './InputList.scss'

import { ref, defineEmits } from 'vue'

import ButtonList from '@components/atom/ButtonList/ButtonList.vue'

const props = defineProps({
  idList: {
    type: Number,
    default: 0
  }
})

const dataInput = ref('')

const emit = defineEmits(['input:add'])

const handleInput = () => {
  if (dataInput.value !== null && dataInput.value !== '') {
    emit('input:add', dataInput.value)
    dataInput.value = ''
  }
}
</script>

<template>
  <div class="input-list">
    <input
      type="input"
      :id="`input-list-${props.idList}`"
      class="input-list"
      placeholder="entrez une nouvelle tâche"
      v-model="dataInput"
      @keyup.enter="handleInput"
    />

    <ButtonList :text="'Ajouter'" classes="primary" @btn:action="handleInput" />
  </div>
</template>
