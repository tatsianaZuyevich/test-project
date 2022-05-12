<template>
  <v-container fluid class="user-profile">
    <v-row>
      <v-col class="col-4">
        <v-card class="user-profile__card-profile content-container">
          <v-card-text class="card-profile__user-module">
            <v-img v-if="user.userIcon" :src="user.userIcon" :alt="user.userName"></v-img>
            <v-img v-else src="@/assets/users/default-user.png" :alt="user.userName"></v-img>
            <v-card-title>{{ user.userName }}</v-card-title>
            <v-card-subtitle>{{ user.position }}</v-card-subtitle>
          </v-card-text>

          <v-container class="card-profile__module">
            <v-row>
              <v-col class="col-12"><v-card-title>Contact information</v-card-title></v-col>
            </v-row>
            <v-row>
              <v-col class="col-4"><v-card-subtitle>email</v-card-subtitle></v-col>
              <v-col class="col-8"><v-card-text>{{ user.email }}</v-card-text></v-col>
            </v-row>
            <v-row>
              <v-col class="col-4"><v-card-subtitle>phone number</v-card-subtitle></v-col>
              <v-col class="col-8"><v-card-text>{{ user.phone }}</v-card-text></v-col>
            </v-row>
            <v-row>
              <v-col class="col-4"><v-card-subtitle>skype</v-card-subtitle></v-col>
              <v-col class="col-8"><v-card-text>{{ user.skype }}</v-card-text></v-col>
            </v-row>
            <v-row>
              <v-col class="col-4"><v-card-subtitle>link</v-card-subtitle></v-col>
              <v-col class="col-8"><router-link :to="user.link">{{ user.link }}</router-link></v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col class="col-8">
        <v-card class="user-profile__card-quest content-container">
          <v-tabs v-model="tab">
            <div class="card-quest__tabs">
              <div class="card-quest__tabs-tab">
                <v-tab
                  v-for="item in items"
                  :key="item"
                  class="card-quest__tabs-item"
                >
                  {{ item }}
                </v-tab>
              </div>
              <div class="card-quest__tabs-line"></div>
            </div>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-simple-table class="card-quest__table">
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th>Topic of the questionnaire</th>
                    <th>Date of appointment</th>
                    <th>Closing Date</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    v-for="quest in user.questionnaire"
                    :key="quest"
                  >
                    <td><div>{{ quest.questName }}</div></td>
                    <td><div>{{ quest.startDate }}</div></td>
                    <td><div>{{ quest.endDate }}</div></td>
                    <td>
                      <div :class="`${quest.status}`">{{ quest.status }}</div>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>

            <v-tab-item>
              <v-simple-table class="card-quest__table">
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th>Topic of the questionnaire</th>
                    <th>Date of appointment</th>
                    <th>Closing Date</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <template v-for="quest in user.questionnaire">
                    <tr
                      v-if="quest.status !== 'done'"
                      :key="quest"
                    >
                      <td><div>{{ quest.questName }}</div></td>
                      <td><div>{{ quest.startDate }}</div></td>
                      <td><div>{{ quest.endDate }}</div></td>
                      <td>
                        <div :class="`${quest.status}`">{{ quest.status }}</div>
                      </td>
                    </tr>
                  </template>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>

            <v-tab-item>
              <v-simple-table class="card-quest__table">
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th>Topic of the questionnaire</th>
                    <th>Date of appointment</th>
                    <th>Closing Date</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <template v-for="quest in user.questionnaire">
                    <tr
                      v-if="quest.status === 'done'"
                      :key="quest"
                    >
                      <td><div>{{ quest.questName }}</div></td>
                      <td><div>{{ quest.startDate }}</div></td>
                      <td><div>{{ quest.endDate }}</div></td>
                      <td>
                        <div :class="`${quest.status}`">{{ quest.status }}</div>
                      </td>
                    </tr>
                  </template>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import users from '@/api/users';

export default {
    props: {
        id: {
            type: Number,
            default: null,
        },
    },
    data () {
        return {
            users: users,
            user: {},
            tab: null,
            items: [
                'All Questionnaire', 'Active Questionnaire', 'Done Questionnaire',
            ],
        }
    },
    created() {
        this.user = this.users.find(item => item.userId === this.id);
    }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/style-default.scss";

.user-profile {
  min-height: 100%;
  padding: 0;

  > .row {
    > .col {
      > .v-card {
        box-shadow: none;

        > .v-card__text:not(:last-of-type) {
          border-bottom: 1px solid $color_blue-light;
        }
      }
    }
  }

  ::v-deep .v-tabs-slider-wrapper {
    height: 4px !important;
    border-radius: 6px;

    .v-tabs-slider {
      background-color: $color_green_dark;
      border-radius: 6px;
    }
  }
  .card-quest__tabs {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-tab {
      display: flex;
      width: 100%;
      height: 100%;

    }
    &-item {
      padding: 10px 20px 10px 10px;
      text-transform: capitalize;
      color: $color_black;

      &.v-tab--active {
        color: $color_green_dark;
      }
    }
    &-line {
      width: 100%;
      height: 4px;
      border-radius: 6px;
      background-color: $bg_gray;
    }
  }

  .user-profile__card-profile {
    .card-profile__user-module {
      display: flex;
      flex-direction: column;
      align-items: center;

      > .v-image {
        width: 120px;
        height: 120px;
        border-radius: 100%;
        object-fit: cover;
      }
      .v-card__title {
        font: normal normal 22px/100% $f-family;
        color: $color_blue-dark;
        margin-bottom: 16px;
      }
      .v-card__subtitle {
        font: normal normal 16px/100% $f-family;
        color: $color_blue-dark;
      }
    }

    .card-profile__module {
      .v-card__title {
        font: normal normal 14px/100% $f-family;
        text-transform: uppercase;
        color: $color_blue-dark;
        padding: 16px 0;
      }
      .v-card__subtitle {
        font: bold normal 14px/100% $f-family;
        color: $color_black;
        padding: 0;
      }
      .v-card__text {
        font: normal normal 14px/100% $f-family;
        color: $color_black;
        padding: 0;
      }
      a {
        word-wrap: normal;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .user-profile__card-quest {
    .card-quest__table {
      margin-top: 30px;

      ::v-deep thead {
        th {
          color: $color_blue-dark;
          font: bold normal 14px/100% $f-family;
        }
      }

      ::v-deep tbody {
        tr:hover {
          background-color: transparent !important;
        }

        td {
          > div {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>