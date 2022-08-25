<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Trelli </q-toolbar-title>

        <q-space />

        <q-btn-dropdown stretch flat label="Filter">
          <q-list>
            <q-item-label header>Status</q-item-label>
            <q-item
              clickable
              v-close-popup
              @click="filterStatus('Todo')"
              :class="boardStore.status == 'Todo' ? 'active' : ''"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="format_list_bulleted"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Todo</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="filterStatus('In Progress')"
              :class="boardStore.status == 'In Progress' ? 'active' : ''"
            >
              <q-item-section avatar>
                <q-avatar icon="handyman" color="warning" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>In Progress</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="filterStatus('Complete')"
              :class="boardStore.status == 'Complete' ? 'active' : ''"
            >
              <q-item-section avatar>
                <q-avatar icon="check" color="positive" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Complete</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="filterStatus('Canceled')"
              :class="boardStore.status == 'Canceled' ? 'active' : ''"
            >
              <q-item-section avatar>
                <q-avatar icon="close" color="negative" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Canceled</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>Priority</q-item-label>
            <q-item
              clickable
              v-close-popup
              @click="filterPriority(1)"
              :class="boardStore.priority == 1 ? 'active' : ''"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="priority_high"
                  color="negative"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>High Priority</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="filterPriority(2)"
              :class="boardStore.priority == 2 ? 'active' : ''"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="low_priority"
                  color="warning"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Medium Priority</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="filterPriority(3)"
              :class="boardStore.priority == 3 ? 'active' : ''"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="bookmark_remove"
                  color="positive"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Low Priority</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useBoardStore } from 'src/stores/board-store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const boardStore = useBoardStore();

    const filterStatus = (status: string) => {
      if (boardStore.status == status) {
        boardStore.status = '';
      } else {
        boardStore.status = status;
      }
    };

    const filterPriority = (priority: number) => {
      if (boardStore.priority == priority) {
        boardStore.priority = 0;
      } else {
        boardStore.priority = priority;
      }
    };

    return { boardStore, filterStatus, filterPriority };
  },
});
</script>

<style>
.active {
  color: blue;
}
</style>
