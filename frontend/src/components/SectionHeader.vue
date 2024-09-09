<template>
  <div>
    <div class="conteiner">
      <div class="text-center">
        <h1 class="display-4 font-weight-bolder">{{ title }}</h1>
        <p class="lead">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
