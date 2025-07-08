<script setup>
import { ref } from 'vue';
import InventoryApiService from '@/app/add-products/services/inventory-api.service';
import ModalConfirmDeleteHistory from '@/shared/modal.confirm.delete.history.vue';

const props = defineProps({
  lot: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['comment', 'deleted'])

const showDeleteModal = ref(false);
const deleteMessage = ref('');

function openDeleteModal() {
  deleteMessage.value = `¿Seguro que deseas eliminar el lote de "${props.lot.producto}"?`;
  showDeleteModal.value = true;
}
function closeDeleteModal() {
  showDeleteModal.value = false;
}
async function confirmDeleteBatch() {
  try {
    await InventoryApiService.deleteBatchInventory(props.lot.id);
    emit('deleted', props.lot.id);
  } catch (e) {
    alert('Error al eliminar el lote');
  }
  closeDeleteModal();
}
</script>

<template>
  <div class="lot-card">
    <div class="card-header">
      <h3>{{ lot.producto }}</h3>
      <span class="provider">{{ lot.proveedor }}</span>
    </div>
    <div class="card-content">
      <p><strong>Fecha de entrada:</strong> {{ lot.fechaEntrada }}</p>
      <p><strong>Cantidad por unidad:</strong> {{ lot.cantidad }}</p>
      <p><strong>Precio por unidad:</strong> S/ {{ lot.precio }}</p>
      <p><strong>Unidad de medida:</strong> {{ lot.unidad }}</p>
    </div>
    <div class="card-actions">

      <button
        class="action-button"
        title="Eliminar"
        @click="openDeleteModal"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#c0392b" stroke-width="2"/>
          <rect x="5" y="6" width="14" height="14" rx="2" stroke="#c0392b" stroke-width="2"/>
          <path d="M10 11v6" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/>
          <path d="M14 11v6" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <!-- Modal de confirmación -->
    <modal-confirm-delete-history
      :visible="showDeleteModal"
      :mensaje="deleteMessage"
      @cancelar="closeDeleteModal"
      @confirmar="confirmDeleteBatch"
    />
  </div>
</template>

<style scoped>
.lot-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.lot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.card-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  text-align: center;
}

.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
  text-align: center;
}

.provider {
  display: inline-block;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  text-align: center;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.card-content p {
  margin: 0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.card-content p strong {
  color: #333;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.action-button[title="Eliminar"] {
  background: #ff9800;
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 0.5rem;
}
.action-button[title="Eliminar"] svg {
  color: #fff;
  fill: #fff;
}
.action-button[title="Eliminar"]:hover {
  background: #dc3545;
}

.action-button:hover .tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
}

.delete-btn:hover svg path {
  stroke: white;
}

.action-button i {
  font-size: 16px;
}
</style>