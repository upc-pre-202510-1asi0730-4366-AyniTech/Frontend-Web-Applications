<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EditView from "../components/edit-view.component.vue"
import { InventoryService } from '../services/inventory.service.js'

export default {
  name: "edit-product",
  components: { EditView },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const product = ref(null)
    const inventoryService = new InventoryService()

    onMounted(async () => {
      const id = route.params.id
      const { data } = await inventoryService.getById(id)
      product.value = data
    })

    // Función para redireccionar al inventario de productos
    const goToProductInventory = () => {
      router.push({ name: 'product-inventory' })
    }

    return { product, goToProductInventory }
  }
}
</script>

<template>
  <edit-view
      v-if="product"
      :product="product"
      :show="true"
      @close="goToProductInventory"
  />
</template>