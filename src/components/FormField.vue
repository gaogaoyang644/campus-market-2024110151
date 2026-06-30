<template>
  <div class="form-group">
    <label class="form-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <input
      v-if="type === 'text'"
      v-model="modelValue"
      type="text"
      class="form-input"
      :placeholder="placeholder"
    />
    <input
      v-else-if="type === 'number'"
      v-model.number="modelValue"
      type="number"
      class="form-input"
      :placeholder="placeholder"
      :min="min"
    />
    <textarea
      v-else-if="type === 'textarea'"
      v-model="modelValue"
      class="form-input form-textarea"
      :placeholder="placeholder"
    ></textarea>
    <select
      v-else-if="type === 'select'"
      v-model="modelValue"
      class="form-input"
    >
      <option value="">{{ placeholder || '请选择' }}</option>
      <option v-for="opt in stringOptions" :key="opt" :value="opt">{{ opt }}</option>
    </select>
    <input
      v-else-if="type === 'datetime-local'"
      v-model="modelValue"
      type="datetime-local"
      class="form-input"
    />
    <p v-if="error" class="form-error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  type: 'text' | 'number' | 'textarea' | 'select' | 'datetime-local'
  placeholder?: string
  required?: boolean
  min?: number
  options?: string[]
  error?: string
}>()

const modelValue = defineModel<string | number>({ required: true })

const stringOptions = (props.options ?? []) as string[]

</script>

<style scoped>
.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
  font-weight: 500;
}

.required {
  color: #f56c6c;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #409eff;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-error {
  color: #f56c6c;
  font-size: 12px;
  margin: 4px 0 0;
}

.radio-group {
  display: flex;
  gap: 20px;
  padding: 6px 0;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>
