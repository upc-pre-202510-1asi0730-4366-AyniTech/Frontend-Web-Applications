<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  productId: [String, Number],
  productName: String
})

const emit = defineEmits(['close', 'save'])
const newComment = ref('')

const handleSave = () => {
  emit('save', {
    productId: props.productId,
    comment: newComment.value
  })
  newComment.value = ''
}

const handleClose = () => {
  emit('close')
  newComment.value = ''
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Comentarios</h2>
        <button class="close-button" @click="handleClose">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>Lote:</label>
          <input type="text" :value="productId" disabled class="form-input" />
        </div>

        <div class="form-group">
          <label>Producto</label>
          <input type="text" :value="productName" disabled class="form-input" />
        </div>

        <div class="comments-section">
          <div class="user-comment">
            <div class="user-info">
              <i class="fas fa-user"></i>
              <span>User</span>
            </div>
            <div class="comment-input-container">
              <textarea
                  v-model="newComment"
                  placeholder="Escribir comentario..."
                  class="comment-input"
              ></textarea>
              <div class="comment-actions">
                <button class="btn-save" @click="handleSave">Guardar</button>
                <button class="btn-cancel" @click="handleClose">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fa;
}

.comments-section {
  margin-top: 1.5rem;
}

.user-comment {
  background-color: #fff9e6;
  border-radius: 8px;
  padding: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.comment-input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-input {
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.comment-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-save {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-save:hover, .btn-cancel:hover {
  opacity: 0.9;
}
</style>