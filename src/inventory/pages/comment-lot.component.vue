<script>
import { useRoute, useRouter } from 'vue-router'
import CommentView from '../components/comment-view.component.vue'

export default {
  name: "comment-lot",
  components: { CommentView },
  setup() {
    const route = useRoute()
    const router = useRouter()
    return { route, router }
  }
}
</script>

<template>
  <div>
    <button class="close-btn" @click="router.back()">×</button>
    <CommentView :lotId="route.params.id" />
  </div>
</template>

<style scoped>
.close-btn {
  position: absolute;
  top: 18px;
  right: 24px;
  font-size: 32px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>