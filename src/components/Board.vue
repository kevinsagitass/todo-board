<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="board-container" style="width: 100%;">
    <div class="board">
      <div class="lists-container">
        <div
          class="drop-zone"
          @dragover.prevent
          @dragenter.prevent
          @drop="onDrop($event, list)"
          v-for="list in boardStore.getLists"
          :key="list.id"
        >
          <section class="list-container" ref="list" :data-id="list.id">
            <div class="list-header">
              <span
                class="list-drag-handle"
                style="margin-right: 5px; font-weight: bold"
                >&#x2630;</span
              >
              <strong>{{ list.title }}</strong>
            </div>

            <Card
              :todo="item"
              :listId="list.id"
              v-for="item in list.items"
              :key="item.id"
              :draggable="true"
              @dragstart="startDrag($event, item)"
            />

            <div class="item-entry">
              <TodoInput
                :list-id="list.id"
                placeholder="Add a todo"
                icon="publish"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Card from './Card.vue';
import { useBoardStore } from '../stores/board-store';
import TodoInput from './TodoInput.vue';

const boardStore = useBoardStore();

export default defineComponent({
  components: {
    Card,
    TodoInput,
  },
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('itemID', item.id);
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData('itemID');
      const previousList = this.boardStore.lists.find(
        (list) => list.items.filter((item) => item.id == itemID).length != 0
      );
      let moveItem = null;
      this.boardStore.lists.forEach((list) => {
        list.items.forEach((item) => {
          if (item.id == itemID) {
            moveItem = item;
          }
        });
      });
      if (previousList.id != list.id) {
        list.items.push(moveItem);
        previousList.items = previousList.items.filter(
          (item) => item.id != itemID
        );
      }
    },
  },
  setup() {

    return {
      boardStore,
    };
  },
});
</script>

<style>
.drop-zone {
  background-color: #eee;
  margin: 10px;
  padding: 15px;
  vertical-align: top;
  display: inline-block;
  width: 25%;
  max-height: 100%;
  overflow-y: scroll;
  height: fit-content;
  width: 20%;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
.lists-container {
  height: 90vh;
  display: flex;
  justify-content: center;
}
</style>
