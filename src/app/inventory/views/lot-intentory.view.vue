<script setup>
import { ref, onMounted } from 'vue'

import LotComment from '../components/lot-comment.component.vue'
import LotCard from '../components/lot-card.component.vue'
import NewLot from '../models/NewLot.entity.js'
import AddLot from '../components/add-lot.component.vue'

const lots = ref([])
const isCommentModalOpen = ref(false)
const selectedLot = ref(null)
const viewMode = ref('table')
const showAddLotForm = ref(false)

onMounted(async () => {
})

const openCommentModal = (lot) => {
  selectedLot.value = lot
  isCommentModalOpen.value = true
}

const closeCommentModal = () => {
  isCommentModalOpen.value = false
  selectedLot.value = null
}

const handleAddLot = (newLot) => {
  console.log('Nuevo lote:', newLot)
  showAddLotForm.value = false
}
</script>


<template>
  <div class="inventory-lote">
    <h2>Inventario por lote</h2>

    <div class="toolbar-container">
      <div class="toolbar">
        <input type="text" placeholder="Productos..." class="input-field" />
        <input type="text" placeholder="Proveedor..." class="input-field" />
        <div class="date-container">
          <input type="date" class="date-input" />
          <button class="calendar-button">
            <i class="fas fa-calendar"></i>
          </button>
        </div>
        <input type="number" placeholder="Cantidad" class="input-field" />
        <input type="number" placeholder="Precio" class="input-field" />
        <button class="btn-generate" @click="showAddLotForm = true">Generar Nuevo Lote</button>
        <div class="view-toggle">
          <button
              :class="['view-btn', viewMode === 'table' ? 'active' : '']"
              @click="viewMode = 'table'"
              title="Vista de tabla"
          >
            <i class="fas fa-table"></i>
          </button>
          <button
              :class="['view-btn', viewMode === 'card' ? 'active' : '']"
              @click="viewMode = 'card'"
              title="Vista de tarjetas"
          >
            <i class="fas fa-th-large"></i>
          </button>
        </div>
      </div>


    </div>


    <div v-if="viewMode === 'table'" class="table-container">
      <div class="table-header">
        <div class="header-cell">Proveedor</div>
        <div class="header-cell">Producto</div>
        <div class="header-cell">Fecha de entrada</div>
        <div class="header-cell">Cantidad por unidad</div>
        <div class="header-cell">Precio por unidad</div>
        <div class="header-cell">Unidad de medida</div>
        <div class="header-cell">Acciones</div>
      </div>

      <div v-for="lot in lots" :key="lot.id" class="table-row">
        <div class="cell">{{ lot.proveedor }}</div>
        <div class="cell">{{ lot.producto }}</div>
        <div class="cell">{{ lot.fechaEntrada }}</div>
        <div class="cell">{{ lot.cantidad }}</div>
        <div class="cell">S/{{ lot.precio }}</div>
        <div class="cell">{{ lot.unidad }}</div>
        <div class="cell actions">
          <button
              class="action-button"
              title="Comentarios"
              @click="openCommentModal(lot)"
          >
            <i class="fas fa-comments"></i>
          </button>
          <button class="action-button" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
    </div>


    <div v-else class="cards-container">
      <LotCard
          v-for="lot in lots"
          :key="lot.id"
          :lot="lot"
          class="card-item"
          @comment="openCommentModal"
      />
    </div>


    <AddLot
        :is-open="showAddLotForm"
        @close="showAddLotForm = false"
        @save="handleAddLot"
    />

    <LotComment
        v-if="isCommentModalOpen"
        :lot="selectedLot"
        @close="closeCommentModal"
    />
  </div>
</template>


<style scoped>
.inventory-lote {
  padding: 1rem;
  background-color: #FFF5E0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0 0 1rem 0;
  color: #333;
  text-align: center;
}

.date-container {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  flex: 1;
  min-width: 150px;
}

.date-input {
  padding: 0.5rem;
  border: none;
  flex: 1;
  min-width: 120px;
}

.calendar-button {
  background: none;
  border: none;
  padding: 0.5rem;
  color: #666;
  cursor: pointer;
}

.toolbar-container {
  background-color: #F4A460;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.toolbar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.input-field {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: white;
  min-width: 150px;
  outline: none;
}

.btn-generate {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.view-toggle {
  display: flex;
  gap: 0.25rem;
}

.view-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: #fff;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.view-btn.active {
  background: #ff9800;
  color: #fff;
}

.view-btn:hover {
  background: #ffb74d;
  color: #fff;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: repeat(6, 1fr) 100px;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr) 100px;
  padding: 0.75rem 1rem;
  border-top: 1px solid #eee;
  background: white;
}

.table-row:hover {
  background: #fff9e6;
}

.cell {
  display: flex;
  align-items: center;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #2D2D2D;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-button:hover {
  background: #1a1a1a;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.card-item {
  width: 100%;
}

@media (max-width: 1200px) {
  .toolbar-container {
    margin: 0;
  }
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .input-field, .date-container {
    width: 100%;
  }

  .btn-generate {
    width: 100%;
    margin: 0.5rem 0;
  }

  .view-toggle {
    justify-content: center;
    margin-top: 0.5rem;
  }

  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .header-cell {
    display: none;
  }

  .cell {
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
    position: relative;
  }

  .cell:before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 0.5rem;
    min-width: 40%;
  }

  .actions {
    justify-content: flex-start;
    border-bottom: none;
    padding-top: 0.5rem;
  }
}

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

  .modal-window {
    background: #FFF5E0;
    border-radius: 12px;
    padding: 2rem;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .form-content {
    margin-top: 1rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .price-input {
    position: relative;
  }

  .currency {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }

  .price-input .input-field {
    padding-left: 2rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

@media (max-width: 768px) {
  .modal-window {
    padding: 1.5rem;
    width: 95%;
  }
}
</style>