<script setup lang="ts">
import './ItemList.scss'

import { defineEmits, ref } from 'vue'
const emit = defineEmits(['item:update', 'item:delete'])

import ButtonList from '@components/atom/ButtonList/ButtonList.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {}
  },
  idList: {
    type: Number,
    default: 0
  }
})

const modeEdit = ref(false)
const editInput = ref(props.item.item)

const handleEdit = () => (modeEdit.value = true)

const handleDelete = () => emit('item:delete', props.item.token)

const handleUpdate = () => {
  emit('item:update', { value: editInput.value, token: props.item.token })
  modeEdit.value = false
  editInput.value = props.item.item
}

const handleCancel = () => (modeEdit.value = false)
</script>

<template>
  <div class="wrapper-item" :class="{ 'wrapper-item-edit': modeEdit }">
    <div class="item edit" v-if="modeEdit">
      <input
        type="input"
        :id="`input-item-list-${props.item.key}`"
        class="input-item-list-"
        v-model="editInput"
      />
      <div class="buttons">
        <ButtonList show-icon class-icon="fa-xmark" @btn:action="handleCancel" />
        <ButtonList show-icon class-icon="fa-check" classes="primary" @btn:action="handleUpdate" />
      </div>
    </div>
    <div class="item" v-else>
      <p>{{ item.item }}</p>
      <div class="buttons">
        <ButtonList :show-text="false" show-icon class-icon="fa-pen" @btn:action="handleEdit" />
        <ButtonList :show-text="false" show-icon class-icon="fa-trash" @btn:action="handleDelete" />
      </div>
    </div>
  </div>
</template>
