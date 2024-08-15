import { defineStore } from 'pinia';
export const useStore = defineStore('myStore', {
    state() {
        return {
            isCollapse: false,
            showModal: false,
        }
    },
    actions: {
        toggleModel() {
            this.showModal = !this.showModal;
        }
    }
})