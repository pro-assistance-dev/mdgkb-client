<template>
  <label class="custom-checkbox">
    <!-- <input class="hidden-checkbox" type="checkbox" /> -->
    <div class="checkbox">
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="#ffffff" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
      </svg>
    </div>
    {{ label }}
  </label>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String as PropType<string>,
    required: false,
    default: 'Текст лейбла',
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.custom-checkbox {
  // Тут мы просто центрируем чекбокс и текст
  display: flex;
  align-items: center;
}

.custom-checkbox .checkbox {
  margin-right: 10px;
}

.custom-checkbox input {
  -webkit-appearance: none; // Скрываем оригинальный чекбокс
  position: absolute; // После скрытия оставется пустое пространство,
  // но абсолютное позиционирование это устранит
}

.checkbox {
  // Тут стилизуем сам чекбокс
  margin: 5px;
  position: relative;
  min-width: 30px;
  min-height: 30px;
  max-width: 30px;
  max-height: 30px;
  border: 2px solid #006bb4;
  background: #006bb4;
  border-radius: 3px;
}

.checkbox:hover {
  // Тут стилизуем сам чекбокс
  border: 2px solid #343e5c;
}

.checkmark {
  // Тут центритуем и пишем стили для иконки
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: auto;
  display: none; // Скрываем иконку
}

.custom-checkbox input:checked ~ .checkbox .checkmark {
  display: block; // Показываем иконку, когда чекбокс активен
}

.custom-checkbox input:checked ~ .checkbox {
  background: #006bb4;
  border: 2px solid #343e5c;
  // Если вы хотите не только отображать икнонку, но и менять
  // сам чекбокс после активации - напишите сюда код для активного состояния
}

@media screen and (max-width: 500px) {
  .custom-checkbox {
    // Тут мы просто центрируем чекбокс и текст
    font-size: 12px;
  }
}
</style>
