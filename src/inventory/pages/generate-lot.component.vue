<script>
import GenereateNewLot from "../components/genereate-new-lot.component.vue"
import { useRouter } from 'vue-router'

export default {
  name: "generate-lot",
  components: { GenereateNewLot },
  setup() {
    const router = useRouter()
    const goToLotInventory = () => {
      router.push({ name: 'lot-inventory' })
    }
    return { goToLotInventory }
  }
}
</script>

<template>
  <genereate-new-lot @created="goToLotInventory" @cancel="goToLotInventory" />
</template>