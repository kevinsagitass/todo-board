<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="board-container">
    <div class="board">
      <div class="lists-container">
        <div
          class="drop-zone"
          @dragover.prevent
          @dragenter.prevent
          @drop="onDrop($event, list)"
          v-for="list in boardStore.lists"
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
                @enter="onAddItem"
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
import { makeDropHandler } from 'src/util/plugins';

export default defineComponent({
  components: {
    Card,
    TodoInput,
  },
  methods: {
    onAddList({ text }) {
      this.$store.commit('addList', { title: text });
      this.$nextTick(() => {
        const lists = this.$refs.list;
        lists[lists.length - 1].querySelector('input').focus();
      });
    },

    onAddItem({ id, text, more }) {
      if (more) {
        this.activeListId = id;
        this.modal = true;
        this.showModal({ title: text });
        return;
      }
      this.addItem(id, text);
    },

    onAddFullItem(item) {
      item.id
        ? this.$store.commit('updateItem', { itemId: item.id, ...item })
        : this.addItem(
            this.activeListId,
            item.title,
            item.description,
            item.date
          );
      this.hideModal();
    },

    addItem(listId, title, description, date) {
      this.$store.commit('addItem', { listId, title, description, date });
    },

    editItem(item) {
      this.showModal(item);
    },

    onListDrop: makeDropHandler('onListDropComplete'),

    onListDropComplete: function (src, trg) {
      this.$store.commit('moveList', [src.index, trg.index]);
    },

    onCardDrop: makeDropHandler('onCardDropComplete'),

    onCardDropComplete(src, trg) {
      this.$store.commit('moveItem', [
        src.params[1],
        src.index,
        trg.params[1],
        trg.index,
      ]);
    },

    showModal(item) {
      this.modal = true;
      this.$nextTick(() => {
        this.$refs.form.show(item);
      });
    },

    hideModal() {
      this.focusInput(this.activeListId);
      this.modal = false;
    },

    focusInput(listId) {
      const index = this.lists.findIndex((list) => list.id === listId);
      if (index > -1) {
        this.$refs.list[index].querySelector('input').focus();
      }
    },

    reset() {
      if (confirm('Are you sure you want to reset the board?')) {
        this.$store.commit('reset');
      }
    },
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
    const boardStore = useBoardStore();

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
  max-height: 100%;
  overflow-y: scroll;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
.lists-container {
  height: 90vh;
}
</style>
