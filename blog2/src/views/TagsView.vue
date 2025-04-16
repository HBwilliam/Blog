<template>
    <div class="tags-view">
        <h2>Tags</h2>
        <br>
        <TagList />
    </div>
</template>

<script>
import TagList from '@/components/TagList.vue';

export default {
  name: 'TagsView',
  components: {
    TagList
  },
  setup() {
    return {};
  }
};
</script>

<style scoped>
    .tags-view {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px;
        text-align: left;
        width: 100%;
    }

    .tags-view h2 {
        font-size: 2em;
        margin: 0;
        margin-top: 5px;
    }
</style>
