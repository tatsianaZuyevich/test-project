<template>
  <div>
    <v-navigation-drawer
      permanent
      app
      expand-on-hover
      fixed
      class="app-drawer"
    >
      <v-list class="app-drawer__list">
        <v-list-item class="px-2" @click="getUserProfile">
          <v-list-item-avatar>
            <v-img :src="user.userIcon"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item @click="getUserProfile">
          <v-list-item-content>
            <v-list-item-title>{{ user.userName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
        class="app-drawer__nav"
      >
        <template v-for="(item, index) in computeMenu">
          <v-list-item
            v-if="item.isShow"
            :key="index"
            link
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
          </v-list-item>
        </template>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import routes from '@/routes';
import user from '@/api/user';

export default {
    data () {
        return {
            user: user,
        }
    },
    computed: {
        computeMenu() {
            const routesList = routes.find(route => route.path === '/');
            return routesList.children;
        },
    },
    created() {},
    methods: {
        getUserProfile() {
            let id= this.user.userId;
            this.$router.push(`/user-profile/${id}`);
        },
    },
};
</script>

<style scoped lang="scss">
@import "~@/styles/style-default.scss";

.v-navigation-drawer.app-drawer {
  overflow: hidden !important;
  height: 100% !important;
  background-color: $color_blue-dark;

  .app-drawer__list {
    padding: 4px 0;

    .v-list-item {
      .v-list-item__title {
        font: bold normal 24px/117% $f-family;
        color: $color_black;
      }
      .v-list-item__subtitle {
        font: normal normal 16px/117% $f-family;
        color: $color_black;
      }
    }
  }
  .app-drawer__nav {
    .v-list-item {
      .v-list-item__title {
        font: normal normal 16px/117% $f-family;
        color: $color_white;
      }
      &.v-list-item--active {
        .v-list-item__icon {
          color: $color_white;
        }
      }
    }
  }
}
</style>
