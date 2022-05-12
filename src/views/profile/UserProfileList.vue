<template>
  <div class="profile-list content-container">
    <v-card class="profile-list__card">
      <v-card-title class="profile-list__card-title">
        Select the user whose profile you would like to see
      </v-card-title>
      <v-card-text class="profile-list__card-content">
        <v-select
          v-model="select"
          :items="users"
          item-text="userName"
          item-value="userId"
          label=""
          placeholder="Select User"
          :menu-props="{ bottom: true, offsetY: true }"
          append-icon="mdi-chevron-down"
          return-object
          dense
          outlined
          class="profile-list__card-select"
        >
          <template v-slot:item="{ item }">
            <div class="card-select__item">
              <img v-if="item.userIcon" :src="item.userIcon" :alt="item.userName">
              <img v-else src="@/assets/users/default-user.png" :alt="item.userName">
              <span>{{ item.userName }}</span>
            </div>
          </template>
        </v-select>
      </v-card-text>
      <v-card-actions class="profile-list__card-button">
        <v-btn text @click="selectUser">Select</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import users from '@/api/users';

export default {
    data () {
        return {
            users: users,
            select: {},
        }
    },
    created() {},
    methods: {
        selectUser() {
            this.$router.push(`/user-profile/${this.select.userId}`);
        }
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/style-default.scss";

.profile-list {
  display: flex;
  justify-content: center;
  align-items: center;

  &__card {
    flex: 0 1 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $pad-all;

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-select {
      width: 70%;
    }
    &-button {
      .v-btn {
        @extend %button-color;

        &:hover {
          @extend %button-color__hover;
        }
      }
    }
  }
}

::v-deep .card-select__item {
  display: flex;
  align-items: center;

  > img {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    object-fit: cover;
    margin-right: 10px;
  }
}
</style>