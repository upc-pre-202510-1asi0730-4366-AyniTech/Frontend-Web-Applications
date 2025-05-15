<script setup>
import { ref, onMounted } from 'vue'
import { fetchLots } from '../services/lot-api.service'
import LotComment from '../components/lot-comment.component.vue'
import LotCard from '../components/lot-card.component.vue'
import NewLot from '../models/NewLot.entity.js'

const lots = ref([])
const isCommentModalOpen = ref(false)
const selectedLot = ref(null)
const viewMode = ref('table')
const showAddLotForm = ref(false) // nuevo
const newLot = ref(new NewLot({})) // nuevo

onMounted(async () => {
  lots.value = await fetchLots()
})

const openCommentModal = (lot) => {
  selectedLot.value = lot
  isCommentModalOpen.value = true
}

const closeCommentModal = () => {
  isCommentModalOpen.value = false
  selectedLot.value = null
}


const handleAddLot = () => {

  console.log('Nuevo lote:', newLot.value)
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
        <button class="btn-generate">Generar Nuevo Lote</button>
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


    <div v-if="showAddLotForm" class="modal-overlay">
      <div class="modal-window">
        <h2>Agregar Lote</h2>

        <div class="form-content">
          <div class="form-group">
            <label>Proveedor</label>
            <input
                type="text"
                v-model="newLot.proveedor"
                class="input-field"
                placeholder="Nombre del proveedor"
            >
          </div>

          <div class="form-group">
            <label>Producto</label>
            <input
                type="text"
                v-model="newLot.producto"
                class="input-field"
                placeholder="Nombre del producto"
            >
          </div>

          <div class="form-group">
            <label>Fecha de entrada</label>
            <input
                type="date"
                v-model="newLot.fechaEntrada"
                class="input-field"
            >
          </div>

          <div class="form-group">
            <label>Cantidad</label>
            <input
                type="number"
                v-model="newLot.cantidad"
                class="input-field"
                min="0"
            >
          </div>

          <div class="form-group">
            <label>Precio por unidad</label>
            <div class="price-input">
              <span class="currency">S/</span>
              <input
                  type="number"
                  v-model="newLot.precio"
                  class="input-field"
                  step="0.01"
                  min="0"
              >
            </div>
          </div>

          <div class="form-group">
            <label>Unidad de medida</label>
            <input
                type="text"
                v-model="newLot.unidad"
                class="input-field"
                placeholder="Ej: kg, l, unidades"
            >
          </div>

          <div class="form-actions">
            <button class="btn-generate" @click="handleAddLot">Guardar</button>
            <button class="action-button" @click="showAddLotForm = false">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

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
  min-height: calc(100vh - 70px);
}

h2 {
  margin: 1rem 0;
  color: #333;
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
  margin: 1rem -1rem;
  width: calc(100% + 2rem);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.toolbar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 1rem;
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

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.table-header {
  display: grid;
  grid-template-columns: repeat(6, 1fr) 100px;
  padding: 1rem;
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr) 100px;
  padding: 1rem;
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
  background: #ff0000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-button:hover {
  background: #1a1a1a;
}

@media (max-width: 1200px) {
  .toolbar-container {
    margin: 0 1rem;
  }
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .input-field {
    width: 100%;
  }

  .btn-generate {
    width: 100%;
  }

  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .header-cell {
    display: none;
  }

  .cell {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .cell:before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 1rem;
  }
  .action-button i {
    font-size: 1rem;
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
}
</style>