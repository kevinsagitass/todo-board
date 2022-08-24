<template>
  <q-page class="row items-center justify-evenly">
    <Board />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from 'src/components/Board.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { Board },
  setup() {
    return {};
  },
});
</script>
