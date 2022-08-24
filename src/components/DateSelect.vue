<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-date v-model="selectedDate" landscape today-btn style="width: 90%" />

      <q-card-actions class="justify-between">
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  props: {
    listId: {
      type: Number,
      required: false,
    },
    todoId: {
      type: Number,
      required: false,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const selectedDate = ref('');

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    function onOKClick() {
      onDialogOK(selectedDate.value);
    }

    return {
      selectedDate,
      dialogRef,
      onDialogHide,
      onDialogCancel,
      onOKClick,
    };
  },
});
</script>

<style></style>
