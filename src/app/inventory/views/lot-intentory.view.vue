<script setup>
import { ref, onMounted } from 'vue'
import { fetchLots } from '../services/lot-api.service'

const lots = ref([])

onMounted(async () => {
  lots.value = await fetchLots()
})
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
      </div>
    </div>

    <div class="table-container">
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
          <button class="action-button">
            <i class="fas fa-table"></i>
          </button>
          <button class="action-button">
            <i class="fas fa-comments"></i>
          </button>
        </div>
      </div>
    </div>
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
  background: #2D2D2D;
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

}
</style>