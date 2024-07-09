import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

// Typage des éléments
interface ListItem {
  item: string
  token: string
}

export const useItemsStore = defineStore('items', () => {
  // getters
  // Retourne la bonne liste correspondant à la to-do liste
  const getItems = (id: number): ListItem[] => {
    const storedData = useLocalStorage<ListItem[]>(`list_${id}`, []).value
    return storedData ? storedData : []
  }

  //actions
  // Permet de save les valeurs dans le localStorage après une modification
  const saveItems = (list: ListItem[], idList: number): void => {
    const storageRef = useLocalStorage<ListItem[]>(`list_${idList}`, [])
    storageRef.value = list
  }

  //Sauvegarde de l'action effectué dans l'historique du navigateur
  const saveHistory = (idList: number, list: ListItem[]) => {
    window.history.pushState(
      { id: `list_${idList}`, list: JSON.stringify(list) },
      'Task Dashboard',
      ''
    )
  }

  // Fonctions qui permets de manipuler les données au sein d'une liste - Ajout, Modification, Suppression-
  const addItem = (dataItem: string, list: ListItem[], idList: number): void => {
    const item = { item: dataItem, token: Math.random().toString(36).substring(2) } // Permet un randomize de chiffre et lettre

    list.push(item)
    saveHistory(idList, list)
    saveItems(list, idList)
  }

  const deleteItem = (token: string, list: ListItem[], idList: number): void => {
    saveHistory(idList, list)

    const index = list.findIndex((item) => item.token === token)
    if (index !== -1) {
      list.splice(index, 1)
      saveItems(list, idList)
    }
  }

  const updateItem = (
    newItem: { token: string; value: string },
    list: ListItem[],
    idList: number
  ): void => {
    saveHistory(idList, list)
    const index = list.findIndex((item) => item.token === newItem.token)
    if (index !== -1) {
      list[index].item = newItem.value
      saveItems(list, idList)
    }
  }

  return {
    // getters
    getItems,
    //actions
    addItem,
    deleteItem,
    updateItem,
    saveItems
  }
})
