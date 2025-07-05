<template>
  <div class="alert-card">
    <div class="alert-grid">
      <div class="field">
        <label>{{ $t('alerts.catalert') }}</label>
        <div class="value">{{ alert.alert_type }}</div>
      </div>
      <div class="field">
        <label>{{ $t('alerts.catproduct') }}</label>
        <div class="value">{{ alert.product_category }}</div>
      </div>
      <div class="field">
        <label>{{ $t('alerts.product') }}</label>
        <div class="value">{{ alert.product_name }}</div>
      </div>
      <div class="field">
        <label>{{ $t('alerts.date') }}</label>
        <div class="value">{{ alert.alert_date }}</div>
      </div>
      <div class="actions">
        <button class="btn btn-dark" @click="openModal">...</button>
        <button class="btn btn-danger" @click="requestDelete">🗑</button>
      </div>
    </div>
    <!-- Modal local -->
    <div v-if="modalVisible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ $t('alerts.details') }}</h3>
          <button class="close-btn" @click="modalVisible = false">✕</button>
        </div>
        <textarea class="modal-textarea" readonly>
Cuidado esto se considera esapcio PON LO QUE QUIERAS
        </textarea>
        <div class="modal-actions">
          <button class="btn btn-warning" @click="modalVisible = false">{{ $t('alerts.accept') }}</button>
          <button class="btn btn-danger">{{ $t('alerts.report') }}</button>
        </div>
      </div>
    </div>
    <!-- Modal de Confirmación de Eliminación -->
    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="modal-content confirm-modal">
        <div class="modal-icon">
          <span>          ⚠️</span>
        </div>
        <h3 class="modal-title">{{ $t('alerts.confirmTitle') }}</h3>
        <p class="modal-text">{{ $t('alerts.confirmDelete') }}</p>
        <div class="modal-actions">
          <button class="btn btn-warning" @click="showDeleteConfirm = false">
            {{ $t('alerts.back') }}
          </button>
          <button class="btn btn-danger" @click="confirmDelete">
            {{ $t('alerts.continue') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: "StockAlertCard",
  setup() {
    const { locale } = useI18n();
    const router = useRouter();

    const toggleLanguage = () => {
      locale.value = locale.value === 'es' ? 'en' : 'es';
    };

    return {
      toggleLanguage
    }
  },
  props: {
    alert: Object
  },
  data() {
    return {
      modalVisible: false,
      showDeleteConfirm: false
    };
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    requestDelete() {
      this.showDeleteConfirm = true;
    },
    confirmDelete() {
      this.$emit('delete', this.alert);
      this.showDeleteConfirm = false;
    }
  }
};
</script>

<style scoped>
.alert-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 5px solid #ffa500;
  transition: transform 0.2s ease;
}

.alert-card:hover {
  transform: translateY(-2px);
}

.alert-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 1rem;
  align-items: center;
}

.field label {
  display: block;
  font-size: 0.85rem;
  font-weight: bold;
  color: #333;
}

.value {
  background-color: #fff3cd;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  margin-top: 0.25rem;
  font-size: 0.95rem;
  line-height: 1.2;
  min-height: 2.2rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: end;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
}

.modal-textarea {
  width: 100%;
  height: 120px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #333;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.btn-warning {
  background-color: #f7941d;
  color: #fff;
}

.btn-danger {
  background-color: #c62828;
  color: #fff;
}

</style>
