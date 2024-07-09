<script setup lang="ts">
import './List.scss'

import { onMounted, ref, onBeforeUnmount } from 'vue'

import InputList from '@components/atom/InputList/InputList.vue'
import ItemList from '@components/atom/ItemList/ItemList.vue'

import { useItemsStore } from '@/stores/listItems'
import { useLocalStorage } from '@vueuse/core'
const itemsStore = useItemsStore()
const { deleteItem, updateItem, addItem, saveItems } = itemsStore

const props = defineProps({
  id: {
    required: true,
    type: Number,
    default: 0
  }
})

const items = ref([])

const addItemList = (dataNewItem: string) => addItem(dataNewItem, items.value, props.id)
const deleteItemList = (tokenItemList: string) => deleteItem(tokenItemList, items.value, props.id)
const updateItemList = (tokenItemList: { token: string; value: string }) =>
  updateItem(tokenItemList, items.value, props.id)

// Permets de récupérer l'état précédent de la liste to-do
const handlePopState = (event) => {
  if (event.state !== null) {
    const state = event.state
    if (state.id === `list_${props.id}`) {
      items.value = JSON.parse(state.list)
      saveItems(items.value, props.id)
    }
  }
}

onMounted(() => {
  items.value = useLocalStorage(`list_${props.id}`, []).value
  window.addEventListener('popstate', handlePopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>

<template>
  <div class="list">
    <h3>
      liste {{ props.id }} <span> (task {{ items.length }})</span>
    </h3>
    <InputList @input:add="addItemList" />
    <div class="wrapper-item-list">
      <ItemList
        v-for="(item, idx) in items.slice().reverse()"
        :key="`list-item-${idx}`"
        :item="item"
        :id-list="props.id"
        @item:delete="deleteItemList"
        @item:update="updateItemList"
      />
    </div>
  </div>
</template>
