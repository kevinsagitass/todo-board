<template>
  <div class="ui-item-entry field has-addons">
    <div class="control is-expanded">
      <q-input
        class="input"
        v-model="input"
        :placeholder="placeholder"
        @keydown.enter="onEnter"
      />

      <q-btn
        type="submit"
        class="button is-primary"
        @click="onClick"
        :icon-right="icon"
        :disabled="input.length === 0"
        style="width: 100%"
      >
      </q-btn>
    </div>
  </div>
</template>

<script>
import { useBoardStore } from 'src/stores/board-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    listId: [String, Number],
    placeholder: String,
    icon: {
      type: String,
      default: 'angle-right',
    },
  },
  setup(props) {
    const input = ref('');
    const boardStore = useBoardStore();

    const onClick = () => {
      let list = boardStore.lists.find((list) => list.id == props.listId);

      list.items.push({
        id: list.items.length,
        name: input.value,
        status: 'todo',
        dueDate: '1-Aug-2022',
        priority: 1,
      });

      input.value = '';
    };

    const onEnter = () => {
      if (input.value.length > 0) {
        let list = boardStore.lists.find((list) => list.id == props.listId);

        list.items.push({
          id: boardStore.todoId++,
          name: input.value,
          status: 'todo',
          dueDate: '1-Aug-2022',
          priority: 1,
        });

        input.value = '';
      }
    };

    return {
      input,
      onClick,
      onEnter
    };
  },
});
</script>

<style lang="scss">
.ui-item-entry {
  margin: 5px;
}
</style>
