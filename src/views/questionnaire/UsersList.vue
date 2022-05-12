<template>
  <v-container fluid class="users-list content-container">
    <v-row>
      <v-col class="col-12">
        <v-btn text class="button__color-button" @click="addQuest">Add Questionnaire</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12">
        <v-data-table
          :headers="headers"
          class="users-list__table"
        >
          <template v-slot:body>
            <tbody class="v-data-table-tbody">
            <template v-for="user in users">
              <tr v-for="quest in user.questionnaire" :key="quest">
                <td>
                  <div class="table__user-cell" @click="getUserProfile(user.userId)">
                    <img v-if="user.userIcon" :src="user.userIcon" :alt="user.userName">
                    <img v-else src="@/assets/users/default-user.png" :alt="user.userName">
                    <span>{{ user.userName }}</span>
                  </div>
                </td>
                <td>
                  <div>{{ quest.questName }}</div>
                </td>
                <td>
                  <div>{{ quest.startDate }}</div>
                </td>
                <td>
                  <div :class="`${quest.status}`">{{ quest.status }}</div>
                </td>
                <td>
                  <div>
                    <v-btn icon :disabled="quest.status !== 'open'" class="delete-button">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <create-questionnaire :dialog="dialog"></create-questionnaire>
  </v-container>
</template>

<script>
import users from '@/api/users';
import CreateQuestionnaire from '@/views/questionnaire/components/CreateQuestionnaire';

export default {
    components: {
        CreateQuestionnaire,
    },
    data () {
        return {
            users: users,
            id: null,
            dialog: false,
            headers: [
                { text: 'User', align: 'start', filterable: false, sortable: false, value: 'name', },
                { text: 'Topic of the questionnaire', filterable: false, sortable: false, value: 'questionnaire' },
                { text: 'Date of appointment', filterable: false, sortable: false, value: 'startDate' },
                { text: 'Status', filterable: false, sortable: false, value: 'status' },
                { text: '', value: 'isDelete', filterable: false, sortable: false },
            ],
        }
    },
    created() {},
    methods: {
        getUserProfile(id) {
            this.$router.push(`/user-profile/${id}`);
        },
        addQuest() {
            this.dialog = true;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/style-default.scss";

.users-list {
  .button__color-button {
    @extend %button-color;

    &:hover {
      @extend %button-color__hover;
    }
  }
  .delete-button {
    @extend %button-not-color;

    &:hover::before {
      opacity: 0;
    }
    &:hover {
      color: $color_green_dark !important;
    }
  }

  &__table {
    ::v-deep .v-data-table-header {
      th {
        color: $color_blue-dark;
        font: bold normal 14px/100% $f-family;
      }
    }

    ::v-deep .v-data-table-tbody {
      tr:hover {
        background-color: transparent !important;
      }

      td {
        > div {
          display: flex;
          align-items: center;
        }
        .table__user-cell {
          cursor: pointer;

          img {
            max-height: 40px;
            width: 40px;
            object-fit: cover;
            margin-right: 15px;
            border-radius: 100%;
          }
        }
      }
    }
  }
}
</style>