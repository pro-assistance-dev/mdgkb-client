<template>
  <div>
    <div>- Родительский компонент -</div>
    <!-- Пропс msg, полученный из MainLayout: -->
    <div>{{ msg }}</div>
    <!-- Текст из локал стейта mixin'а, но так делать теперь не советуют: -->
    <div>{{ propertyFromMixin }}</div>
    <!-- Счётчик из альтернативного mixin'а, как советуют делать сейчас: -->
    <button @click="increment">Увеличить циферку</button>
    <div>{{ count }}</div>
    <div>{{ double }}</div>
    <button @click="getRandomPockemon">Получить нового покемона</button>
    <div>Случайный покемон из локал стейта:</div>
    <div>{{ randomPockemonName }}</div>
    <!-- Покемон из computed-свойства: -->
    <div>{{ pockemonNameWithAdditionalText }}</div>
    <ChildComponent />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import ExampleMixing from '@/mixins/ExampleMixing.vue';
import useCounter from '@/mixinsAsModules/useCounter';

import ChildComponent from './ChildComponent.vue';

export default defineComponent({
  name: 'ParentComponent',
  components: {
    ChildComponent,
  },
  mixins: [ExampleMixing],
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    // А-ля локальный стейт.
    const randomPockemonName = ref('');

    // А-ля computed-свойства.
    const pockemonNameWithAdditionalText = computed(() => `Покемон ${randomPockemonName.value} из computed-свойства.`);

    // А-ля методы.
    const getRandomPockemon = async (): Promise<void> => {
      await store.dispatch('pockemons/getRandom');
      randomPockemonName.value = store.getters['pockemons/name'];
    };

    // Хитровыкрученная альтернатива миксинам.
    const { count, double, increment } = useCounter();

    onMounted(getRandomPockemon);

    return {
      randomPockemonName,
      pockemonNameWithAdditionalText,
      getRandomPockemon,
      count,
      double,
      increment,
    };
  },
});
</script>
