<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="text-center" style="display: flex; justify-content: center">
        <q-select
          v-model="selectedValue"
          :options="options"
          label="Select Priority"
          :emit-value="true"
          :map-options="true"
          style="width: 95%"
        />
      </div>

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
      required: true,
    },
    todoId: {
      type: Number,
      required: true,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const selectedValue = ref('');
    const options = [
      {
        value: 1,
        label: 'High Priority',
      },
      {
        value: 2,
        label: 'Medium Priority',
      },
      {
        value: 3,
        label: 'Low Priority',
      },
    ];

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    function onOKClick() {
      onDialogOK(selectedValue.value);
    }

    return {
      selectedValue,
      options,
      dialogRef,
      onDialogHide,
      onDialogCancel,
      onOKClick,
    };
  },
});
</script>

<style></style>
