<script>
import { useRouter } from 'vue-router'
import LotInventoryView from "../../inventory/components/lot-inventory-view.vue";

export default {
  name: "inventory",
  components: {LotInventoryView},
  setup() {
    const router = useRouter()
    return {
      router
    }
  }
}
</script>

<template>
  <div class="top-buttons">
    <button class="switch-btn" @click="router.push('/inventory/product-inventory')">{{ $t('byProduct') }}</button>
    <button class="switch-btn" @click="router.push('/inventory/lot-inventory')">{{ $t('byLot') }}</button>
  </div>
</template>

<style scoped>

</style>