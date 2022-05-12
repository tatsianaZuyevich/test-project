<template>
  <v-toolbar class="header-default">
    <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
@import "~@/styles/style-default.scss";

.v-toolbar.header-default {
  box-shadow: none !important;
  flex: 0 0 auto;
  padding-left: 64px;
  background-color: $color_blue-light !important;

  .v-toolbar__title {
    font: bold normal 24px/117% $f-family;
    color: $color_black;
  }
}
</style>