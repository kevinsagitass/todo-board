<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-card class="my-card q-btn--actionable q-ma-md" bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs title">{{ todo.name }}</div>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="event" @click="prompt('date')" />
      <q-btn flat @click="prompt('date')">
        {{ todo.dueDate }}
      </q-btn>
      <q-btn
        class="float-right"
        flat
        round
        :icon="priorityIcon[todo.priority - 1]"
        @click="prompt('priority')"
        style="margin-left: auto;"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useBoardStore } from 'src/stores/board-store';
import { defineComponent } from 'vue';
import DateSelect from './DateSelect.vue';
import PrioritySelect from './PrioritySelect.vue';
import moment from 'moment';

export default defineComponent({
  props: {
    listId: {
      type: Number,
      required: true,
    },
    todo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const $q = useQuasar();
    const boardStore = useBoardStore();
    const priorityIcon = ['priority_high', 'low_priority', 'bookmark_remove'];

    const prompt = (type: string) => {
      if (type == 'priority') {
        $q.dialog({
          dark: true,
          component: PrioritySelect,
          componentProps: {
            listId: props.listId,
            todoId: props.todo.id,
          },
          cancel: true,
          persistent: true,
        })
          .onOk((data) => {
            if (data) {
              const todo = boardStore.lists
                .find((list) => list.id == props.listId)
                ?.items.find((item) => item.id == props.todo.id);
              if (todo) {
                todo.priority = data;
              }
            }
          });
      } else if (type == 'date') {
        $q.dialog({
          dark: true,
          component: DateSelect,
          componentProps: {
            listId: props.listId,
            todoId: props.todo.id,
          },
          cancel: true,
          persistent: true,
        })
          .onOk((data) => {
            if (data) {
              const todo = boardStore.lists
                .find((list) => list.id == props.listId)
                ?.items.find((item) => item.id == props.todo.id);
              if (todo) {
                todo.dueDate = moment(String(data)).format('DD-MMM-YYYY');
              }
            }
          });
      }
    };

    return {
      priorityIcon,
      prompt,
    };
  },
});
</script>

<style>
.my-card {
  width: 90%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.title {
  word-wrap: break-word;
}
</style>
