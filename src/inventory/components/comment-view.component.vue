<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { InventoryService } from '../services/inventory.service.js'
import { CommentService } from '../services/comment.service.js'
import { Comment } from '../model/comment.entity.js'

export default {
  name: "comment-view",
  props: {
    lotId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const lot = ref(null)
    const comments = ref([])
    const newComment = ref("")
    const inventoryService = new InventoryService()
    const commentService = new CommentService()
    const router = useRouter()

    const fetchData = async () => {
      if (!props.lotId) return
      const { data } = await inventoryService.getById(props.lotId)
      lot.value = data
      const { data: commentData } = await commentService.getAllByLotId(props.lotId)
      comments.value = commentData
    }

    onMounted(fetchData)
    watch(() => props.lotId, fetchData)

    const saveComment = async () => {
      if (!newComment.value.trim()) return
      const comment = new Comment({
        lotId: lot.value.id,
        product: lot.value.product,
        user: "User",
        text: newComment.value
      })
      await commentService.create(comment)
      await fetchData()
      newComment.value = ""
    }

    // Función para cerrar y redirigir
    const closeModal = () => {
      router.push({ name: 'lot-inventory' }) // Asegúrate que la ruta tenga este nombre en tu router
    }

    return { lot, comments, newComment, saveComment, closeModal }
  }
}
</script>
<template>
  <div v-if="lot" class="comment-modal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">✖</button>
      <h2>{{ $t('comments.title') }}</h2>
      <div class="info-row">
        <label>{{ $t('lotInventory.byLot') }}:</label>
        <input :value="lot.id" readonly />
      </div>
      <div class="info-row">
        <label>{{ $t('lotInventory.products') }}:</label>
        <input :value="lot.product" readonly />
      </div>
      <div class="comments-section">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-user">👤 {{ comment.user }}</div>
          <div class="comment-text">{{ comment.text }}</div>
        </div>
      </div>
      <div class="new-comment-section">
        <div class="comment-user">👤 User</div>
        <input
            v-model="newComment"
            :placeholder="$t('comments.write')"
            @keyup.enter="saveComment"
        />
        <button class="save-btn" @click="saveComment">{{ $t('comments.save') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ... mismo CSS sugerido antes ... */
.comment-modal {
  width: 100%;
}
.modal-content {
  background: #fff;
  border-radius: 32px;
  padding: 32px 32px 24px 32px;
  min-width: 480px;
  max-width: 90vw;
  box-shadow: 0 4px 32px #0002;
  position: relative;
  margin: 0 auto;
}
h2 {
  font-size: 2rem;
  margin-bottom: 18px;
}
.info-row input,
.new-comment-section input {
  flex: 1;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f7f7f7;
  color: #222; /* Color oscuro para el texto */
}
.info-row label {
  font-weight: bold;
  min-width: 70px;
}
.info-row input {
  flex: 1;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f7f7f7;
}
.comments-section {
  background: #fff7d6;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 18px;
  max-height: 180px;
  overflow-y: auto;
}
.comment-item {
  margin-bottom: 12px;
}
.comment-user {
  font-weight: bold;
  margin-bottom: 2px;
}
.comment-text {
  background: #fff;
  border-radius: 6px;
  padding: 6px 12px;
  margin-bottom: 4px;
}
.new-comment-section {
  background: #fff7d6;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.save-btn {
  background: #C0392B;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
}
</style>