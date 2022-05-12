<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
  >
    <v-card class="questionnairee">
      <v-toolbar dark class="questionnairee__toolbar">
        <v-toolbar-title>Create Questionnaire</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          dark
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="questionnairee__title">
        <v-card-title>Add a title for the questionnairee</v-card-title>
        <v-text-field
          v-model="title"
          label=""
          placeholder="Add a title"
          outlined
          dense
          class="content-card__input-large"
        ></v-text-field>
      </v-card-text>

      <v-card-title>Fill in the questionnaire fields with information:</v-card-title>

      <v-card-text class="questionnairee__content">
        <v-list class="questionnairee__content-list">
          <v-timeline dense class="questionnairee__timeline">
            <v-timeline-item
              v-for="(step, index) in steps"
              :key="step"
            >
              <v-card class="questionnairee-create__content-card">
                <v-card-title class="content-card__title">
                  Step {{ step.number }}
                </v-card-title>
                <v-card-text class="content-card__question-block">
                  <v-card-subtitle class="content-card__subtitle">{{ step.description }}</v-card-subtitle>
                  <v-select
                    v-model="step.selected"
                    :items="typeOfSteps"
                    :placeholder="step.description"
                    dense
                    outlined
                    :menu-props="{ bottom: true, offsetY: true }"
                    append-icon="mdi-chevron-down"
                    class="content-card__input"
                  >
                    <template v-slot:item="{ item }">
                      <v-radio
                        :label="item"
                        :value="item"
                        class="questionnairee-create__select-item"
                        @click="getSelectedValue(index, item)"
                      ></v-radio>
                    </template>
                  </v-select>
                </v-card-text>
                <v-card-text v-if="step.selected === 'text'" class="d-flex">
                  <v-card-subtitle class="content-card__subtitle">Add you text</v-card-subtitle>
                  <v-textarea
                    v-model="step.text"
                    outlined
                    label=""
                    placeholder="Add you text"
                    class="content-card__input-large"
                  ></v-textarea>
                </v-card-text>

                <v-card-text v-if="step.selected === 'questions'">
                  <div v-for="(item, i) in step.questions" :key="item" class="mb-7">
                    <v-card-subtitle class="content-card__subtitle mb-4">
                      {{ i + 1 }}. Write your question and select question type
                    </v-card-subtitle>
                    <div class="d-flex align-center ml-4 mb-4">
                      <v-text-field
                        v-model="item.question"
                        label=""
                        placeholder="Write your question"
                        outlined
                        dense
                        class="content-card__input-large mr-5"
                      ></v-text-field>
                      <v-select
                        v-model="item.questionType"
                        :items="typeOfQuestions"
                        placeholder="Select question type"
                        dense
                        outlined
                        :menu-props="{ bottom: true, offsetY: true }"
                        append-icon="mdi-chevron-down"
                        class="content-card__input mr-5"
                      >
                        <template v-slot:item="{ item }">
                          <v-radio
                            :label="item"
                            :value="item"
                            class="questionnairee-create__select-item"
                            @click="getSelectedQuestion(index, i, item)"
                          ></v-radio>
                        </template>
                      </v-select>
                      <v-btn class="content-card__delete-button" @click="deleteQuestion(index, i)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                    <div
                      v-if="item.questionType === 'one-choice question' || item.questionType === 'multiple-choice question'"
                      class="d-flex align-center flex-wrap"
                    >
                      <v-card-subtitle class="content-card__subtitle ml-4">
                        Add answer choice
                      </v-card-subtitle>
                      <template v-if="item.answers.length > 0">
                        <v-text-field
                          v-for="ans in item.answers"
                          :key="ans"
                          label=""
                          :value="ans"
                          outlined
                          dense
                          class="content-card__input-small mr-5"
                        ></v-text-field>
                      </template>
                      <v-text-field
                        v-if="item.questionType === 'one-choice question'"
                        v-model="step.answerItem"
                        label=""
                        placeholder="Write answer"
                        outlined
                        dense
                        class="content-card__input-small mr-5"
                      ></v-text-field>
                      <v-text-field
                        v-if="item.questionType === 'multiple-choice question'"
                        v-model="step.answerItemMore"
                        label=""
                        placeholder="Write answer"
                        outlined
                        dense
                        class="content-card__input-small mr-5"
                      ></v-text-field>
                      <v-btn class="questionnairee-create__button-border" @click="addAnswer(index, i)">
                        Add Answer
                      </v-btn>
                    </div>
                  </div>
                  <v-btn class="questionnairee-create__button-border" @click="addQuestion(index)">Add Question</v-btn>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-list>
        <v-card-actions class="questionnairee__button-block">
          <v-btn class="button-block__button-border" @click="addStep">Add Step</v-btn>
          <v-card-subtitle class="content-card__subtitle">Assign to:</v-card-subtitle>
          <div
            v-if="selectedUser.length > 0"
            class="d-flex align-center"
          >
            <template v-for="(icon, i) in selectedUser">
              <img
                v-if="icon.icon"
                :key="icon"
                :src="icon.icon"
                :alt="icon.name"
                class="button-block__image"
                :style="{ left: -i * 8 + 'px'}"
              >
              <img
                v-else
                :key="icon"
                src="@/assets/users/default-user.png"
                :alt="icon.name"
                class="button-block__image"
                :style="{ left: -i * 8 + 'px'}"
              >
            </template>
          </div>
          <v-menu :close-on-content-click="false" offset-y top offset-x right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="button-block__button-dashed"
                :style="{ left: -selectedUser.length * 8 + 'px' }"
                v-on="on"
              >
                <v-icon>mdi-account-multiple-plus-outline</v-icon>
              </v-btn>
            </template>
            <v-list class="questionnairee-create__assign-list">
              <v-text-field
                id="search-tag"
                v-model="assignSearch"
                placeholder="Search"
                class="assign-list__search-line"
                @input="searchAssign"
              ></v-text-field>
              <v-list-item-group class="assign-list__employees-block">
                <v-checkbox
                  v-for="user in usersForSearch"
                  :key="user"
                  label=""
                  :value="`${user.userName}`"
                  class="employees-block__check-item"
                  @click="getAssign(user.userName)"
                >
                  <template v-slot:label>
                    <div>
                      <img v-if="user.userIcon" :src="user.userIcon" :alt="user.userName">
                      <img v-else src="@/assets/users/default-user.png" :alt="user.userName">
                      <span>{{ user.userName }}</span>
                    </div>
                  </template>
                </v-checkbox>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn text class="button-block__button-color" @click="saveQuestionnairee">Save</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import users from '@/api/users';

export default {
    components: {},
    props: {
        dialog: Boolean,
    },
    data: () => ({
        users: users,
        usersForSearch: [],
        title: '',
        steps: [
            {
                number: 1,
                description: 'Select task type',
                selected: '',
                type: '',
                text: '',
                questionSelected: '',
                questions: [],
                answerItem: '',
                answerItemMore: '',
            },
        ],
        typeOfSteps: [ 'text', 'questions', ],
        typeOfQuestions: [ 'question - answer', 'one-choice question', 'multiple-choice question', ],

        assignSearch: '',
        selectedUser: [],
    }),
    created() {
        for (let i = 0; i < this.users.length; i++) {
            this.usersForSearch[i] = this.users[i];
        }
    },
    methods: {
        addStep() {
            let obj = {
                number: this.steps.length + 1,
                description: 'Select task type',
                selected: '',
                type: '',
                text: '',
                questionSelected: '',
                questions: [],
                answerItem: '',
                answerItemMore: '',
            };

            this.steps.push(obj);
        },
        getSelectedValue(index, item) {
            this.steps[index].selected = item;
            if (item === 'questions') {
                let obj = {
                    question: '',
                    questionType: '',
                    answers: [],
                };

                this.steps[index].questions.push(obj);
            }
        },
        getSelectedQuestion(index, i, item) {
            this.steps[index].questions[i].questionType = item;
        },
        addQuestion(index) {
            let obj = {
                question: '',
                questionType: '',
                answers: [],
            };

            this.steps[index].questions.push(obj);
        },
        deleteQuestion(index, i) {
            this.steps[index].questions.splice(i, 1);
        },
        addAnswer(index, i) {
            if (this.steps[index].questions[i].questionType === 'one-choice question') {
                this.steps[index].questions[i].answers.push(this.steps[index].answerItem);
                this.steps[index].answerItem = '';
            }
            else {
                this.steps[index].questions[i].answers.push(this.steps[index].answerItemMore);
                this.steps[index].answerItemMore = '';
            }
        },
        searchAssign() {
            this.assignSearch = this.assignSearch.toLowerCase();
            let arr = [];

            for (let i = 0; i < this.users.length; i++) {
                this.users[i].userName = this.users[i].userName.toLowerCase();
                if (this.assignSearch === '') {
                    arr.push(this.users[i]);
                } else if (this.users[i].userName.includes(this.assignSearch)) {
                    arr.push(this.users[i]);
                }
            }
            this.usersForSearch = arr;
        },
        getAssign(name) {
            if (this.selectedUser.find((item) => item.userName === name)) {
                let index = this.selectedUser.findIndex((item) => item.name === name);

                this.selectedUser.splice(index, 1);
            } else {
                let arr = {};

                arr = this.users.find((item) => item.userName === name);
                this.selectedUser.push(arr);
            }
        },
        saveQuestionnairee() {
            this.selectedUser.forEach(item => {
                let id = item.userId;
                let index = this.users.findIndex(item => item.userId === id);
                let quest = {};
                quest.questName = this.title;
                quest.steps = this.steps;
                quest.status = 'open';
                let date = new Date();
                quest.startDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

                this.users[index].questionnaire.push(quest);
            });
            this.title = '';
            this.steps = [];
            this.dialog = false;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/style-default.scss";

.questionnairee {
  &__toolbar {
    background-color: $color_blue-dark !important;
  }

  &__timeline {
    ::v-deep .v-timeline-item__inner-dot.primary {
      background-color: $color_green_dark !important;
      color: $color_green_dark !important;
    }
  }

  ::v-deep .v-text-field {
    &.primary--text {
      color: $color_green_dark !important;
      caret-color: $color_green_dark !important;
    }

    .v-input__control {
      .v-input__slot {
        margin-bottom: 0;
      }
      .v-icon.primary--text {
        color: $color_green_dark !important;
        caret-color: $color_green_dark !important;
      }

      .v-text-field__details {
        display: none;
      }
    }
  }

  &__title {
    .v-card__title {
      padding: 20px 0;
      color: $color_black
    }
  }

  &__button-block {
    padding: 8px 30px 8px 48px;

    .content-card__subtitle {
      font: 500 normal 16px/117% $f-family;
      color: $color-black;
      padding: 0;
      margin-right: 10px;
      margin-left: 70px;
    }
    .button-block__button-border.v-btn {
      @extend %button-border;

      &:hover {
        @extend %button-border__hover;
      }
    }
    .button-block__button-color.v-btn {
      @extend %button-color;

      &:hover {
        @extend %button-color__hover;
      }
    }
    .button-block__button-dashed.v-btn {
      @extend %button-dashed;
      min-width: 40px;
      width: 40px !important;
      height: 40px;
      border-radius: 100%;
      padding: 0;
      position: relative;

      &:hover::before {
        opacity: 0;
      }
      &:hover {
        border-color: $color_green_dark !important;
        color: $color_green_dark !important;
      }
    }
    .button-block__image {
      width: 36px;
      height: 36px;
      border-radius: 100%;
      position: relative;
    }
  }

  &__content {
    box-shadow: none !important;
    padding-bottom: 20px;

    &-list {
      padding: 30px 30px 30px 0;

      .questionnairee-create__content-card {
        min-height: 200px;

        .content-card__title {
          font: normal normal 22px/117% $f-family;
          padding: 16px;
        }

        .v-card__text {
          padding: 20px 16px;
        }

        .content-card__question-block {
          display: flex;
          align-items: center;
        }

        .content-card__subtitle {
          font: 500 normal 16px/117% $f-family;
          color: $color-black;
          padding: 0;
          margin-right: 30px;
        }

        .content-card__input {
          max-width: 300px;
        }

        .content-card__input-large {
          max-width: 600px;
        }

        .content-card__input-small {
          max-width: 200px;
        }

        .content-card__delete-button {
          @extend %button-not-color;

          &:hover::before {
            opacity: 0;
          }
          &:hover {
            color: $color_green_dark !important;
          }
        }

        .questionnairee-create__button-border {
          @extend %button-border;

          &:hover {
            @extend %button-border__hover;
          }
        }
      }
    }
  }
}

.questionnairee-create__assign-list {
  padding: 16px 0;
  width: 200px;

  .assign-list__search-line {
    margin: 0 16px 16px 16px;
    padding: 2px 12px;
    background-color: #F7F7F7;
    border-radius: 4px;

    &.primary--text {
      color: transparent !important;
    }

    ::v-deep .v-input__control {
      .v-input__slot {
        margin-bottom: 0;
        &:before {
          border: none;
        }

        .v-text-field__slot {
          margin-bottom: 0;

          input {
            font: normal normal 14px/114% $f-family;
            color: $color_black;
          }
        }
      }

      .v-text-field__details {
        display: none;
      }
    }
  }

  .assign-list__employees-block {
    height: 215px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 16px;

    &::-webkit-scrollbar {
      width: 5px;
      //background-color: $border-color;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #959595;
      border-radius: 3px;
    }
  }

  .employees-block__check-item {
    margin-top: 0;
    padding-top: 0;

    ::v-deep .v-input__control {
      .v-input__slot {
        margin-bottom: 0;

        .v-input--selection-controls__input {
          display: none;
        }

        .v-label {
          > div {
            display: flex;
            align-items: center;
            min-height: 32px;
          }
          img {
            width: 26px;
            height: 26px;
            border-radius: 100%;
            margin-right: 16px;
          }
          span {
            font: normal normal 14px/117% $f-family;
            color: $color_black;
            text-transform: capitalize;
          }
        }
      }

      .v-messages {
        display: none;
      }
    }

    &.v-input--is-label-active {
      ::v-deep .v-input__control {
        .v-input__slot {
          .v-label {
            img {
              //border: 2px solid $color_blue-lite;
            }
            span {
              font-weight: bold;
            }
          }
        }

        .v-messages {
          display: none;
        }
      }
    }
  }
}

.questionnairee-create__select-item {
  width: 100%;

  ::v-deep .v-input--selection-controls__input {
    display: none;
  }
  ::v-deep .v-label {
    font: normal normal 14px/117% $f-family;
    color: $color_black;
    text-transform: capitalize;
  }
}
</style>