<template>
  <v-app class="app">
    <default-header />
    <default-navigation />
    <v-main class="app__wrapper">
      <!-- Page Wrapper -->
      <div class="wrapper__content">
        <router-view />
      </div>
      <!-- App Footer -->
      <v-footer class="app__footer">
        © By Tatsiana Zuyevich
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import DefaultHeader from '../components/DefaultHeader';
import DefaultNavigation from '../components/DefaultNavigation';

export default {
    name: 'LayoutDefault',
    components: {
        DefaultHeader,
        DefaultNavigation,
    },
    data: () => ({}),
};
</script>

<style lang="scss" scoped>
@import "~@/styles/style-default.scss";

.app__wrapper {
  padding: 0 0 0 56px !important;
  min-height: calc(100vh - 64px);
  width: 100%;

  ::v-deep .v-main__wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .wrapper__content {
    flex: 1 0 auto;
    padding: $pad-all;
    background-color: $bg_gray;
  }
  .app__footer {
    background-color: $bg_gray;
    min-height: 48px;
    border-top: 1px solid $color_blue-light;
    padding: 4px $pad-all;
    font: normal normal 14px/114% $f-family;
    color: $color_black;
  }
}
</style>
