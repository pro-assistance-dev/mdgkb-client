<template>
  <BaseModal width="600px" background="#449D7C" border="none" :margin="margin" :icon-close="iconClose">
    <template #icon>
      <svg class="icon-close" @click="$emit('close')">
        <use xlink:href="#close"></use>
      </svg>
    </template>

    <template #title>Чат</template>
    <template #info>
      <div class="chat">
        <div id="chat-body" ref="chat-body" class="chat-body">
          <div
            v-for="message of chat.chatMessages"
            :key="message.id"
            class="chat-body-message-container"
            :class="[message.userId !== userId ? 'outgoing' : 'incoming']"
            :style="{
              justifyContent: message.isMessage() ? '' : 'center',
            }"
          >
            {{ message.id }}
            <div
              :id="message.id"
              class="chat-body-message"
              :style="{
                background: message.isMessage() ? '' : 'none',
                boxShadow: message.isMessage() ? '0 1px 3px 0 rgba(0, 0, 0, 0.23)' : 'none',
                color: message.isMessage() ? '' : '#646666',
                fontSize: message.isMessage() ? '14px' : '12px',
                margin: message.isMessage() ? '10px' : '0',
                padding: message.isMessage() ? '5px 15px 10px 15px' : '0',
              }"
            >
              <div class="chat-body-message-header">
                <div class="chat-body-message-header-name">
                  {{ message.userName ?? message.user.human.getFullName() }}
                </div>
              </div>

              <div class="chat-body-message-body">
                {{ message.message }}
              </div>
              <div
                class="tm-st"
                :style="{
                  display: message.isMessage() ? 'flex' : 'none',
                }"
              >
                <div class="chat-body-message-header-time">
                  {{ $dateTimeFormatter.format(message.createdOn, { day: undefined, hour: 'numeric', minute: 'numeric' }) }}
                </div>
                <!--                <svg class="icon-readmsg">-->
                <!--                  <use xlink:href="#readMsg"></use>-->
                <!--                </svg>-->
                <!--                <svg class="icon-sendmsg">-->
                <!--                  <use xlink:href="#sendMsg"></use>-->
                <!--                </svg>-->
              </div>
            </div>
          </div>

          <!-- <div class="date">сегодня</div> -->
        </div>
        <div class="chat-footer">
          <div class="chat-footer-message">
            <svg class="icon-smile">
              <use xlink:href="#smile"></use>
            </svg>
            <svg class="icon-attach">
              <use xlink:href="#attach"></use>
            </svg>
            <input
              v-model="newMessage"
              type="text"
              placeholder="Введите сообщение"
              class="chat-footer-message-input"
              @keyup.enter="sendMessage"
            />
            <svg class="icon-send" @click.prevent="sendMessage">
              <use xlink:href="#send"></use>
            </svg>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
  <Close />
  <Send />
  <Smile />
  <Attach />
  <SendMsg />
  <ReadMsg />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Attach from '@/assets/svg/Chat/Attach.svg';
import ReadMsg from '@/assets/svg/Chat/ReadMsg.svg';
import Send from '@/assets/svg/Chat/Send.svg';
import SendMsg from '@/assets/svg/Chat/SendMsg.svg';
import Smile from '@/assets/svg/Chat/Smile.svg';
import Close from '@/assets/svg/Main/Close.svg';
import BaseModal from '@/components/Base/BaseModal.vue';
import Chat from '@/services/classes/Chat';
import ChatMessage from '@/services/classes/ChatMessage';
import WebSocketClient from '@/services/WebSocketClient';

export default defineComponent({
  name: 'ChatComponent',
  components: {
    BaseModal,
    Close,
    Send,
    Smile,
    Attach,
    ReadMsg,
    SendMsg,
  },
  props: {
    chatId: {
      type: String as PropType<string>,
      required: true,
    },
    userId: {
      type: String as PropType<string>,
      reguired: true,
      default: '',
    },
    userName: {
      type: String as PropType<string>,
      default: undefined,
    },
    margin: {
      type: String as PropType<string>,
      reguired: false,
      default: '10px',
    },

    iconClose: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
  },
  emits: ['close'],
  setup(props) {
    const client: WebSocketClient = ChatsStore.Client();
    const chat: Chat = ChatsStore.Item();
    const newMessage: Ref<string> = ref('');
    const chatBody = ref();

    const sendMessage = async () => {
      if (newMessage.value === '') {
        return;
      }
      const message = ChatMessage.Create(props.chatId, props.userId, newMessage.value, props.userName);
      client.send(JSON.stringify(message));
      chat.chatMessages.push(message);
      newMessage.value = '';
      const index = chat.chatMessages.length - 2;
      if (index) {
        document.getElementById(`${chat.chatMessages[index].id}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    };

    onBeforeMount(async () => {
      ChatsStore.Get(props.chatId);
      // ChatsStore.Connect({ chatId: props.chatId, userId: props.userId });
      document.getElementById(`${chat.chatMessages[chat.chatMessages.length - 2].id}`)?.scrollIntoView();
    });

    // const sendWriteStatus = async () => {};

    return {
      // sendWriteStatus,
      sendMessage,
      chat,
      newMessage,
      chatBody,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.incoming {
  display: flex;
  justify-content: right;
  .chat-body-message {
    background: #ceffd1;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    border-radius: 5px 5px 0 5px;
  }
}
.outgoing {
  display: flex;
  justify-content: left;
  .chat-body-message {
    background: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    border-radius: 5px 5px 5px 0;
  }
}
.chat {
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  opacity: 1;
  font-size: 14px;
  z-index: 1;
  &-body {
    width: 100%;
    overflow-y: auto;
    height: calc(100% - 10px);
    padding: 0px;
    background: #f3f1ed;
    z-index: 0;
    padding-bottom: 100px;

    &-message-container {
      margin-bottom: 10px;
      display: flex;
      padding: 0 20px;
    }

    &-avatar-container {
      line-height: 30px;
      display: flex;
      align-items: flex-end;
    }
    &-avatar {
      height: 30px;
      width: 30px;
      line-height: 30px;
      vertical-align: bottom;
    }

    &-message {
      max-width: 70%;
      position: relative;
      min-width: 100px;
      font-family: Montserrat, sans-serif;
      &::after {
        content: '';
        position: absolute;
        border: 10px solid transparent;
        bottom: 0;
        left: -10px;
      }
      &-header {
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-name {
          display: inline-block;
          vertical-align: middle;
          line-height: normal;
          font-weight: bold;
          font-size: 12px;
          color: $main_green;
        }

        &-time {
          height: 16px;
          margin-bottom: -10px;
          display: flex;
          justify-content: right;
          align-items: end;
          font-size: 10px;
          color: $main_green;
          margin-left: 10px;
        }
      }

      &-body {
        font-weight: lighter;
      }
    }
  }

  &-footer {
    height: 60px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;

    &-message {
      z-index: 0;
      width: 100%;
      font-size: 0;
      font-weight: 500;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      &-input {
        height: 36px;
        width: calc(100% - 10px);
        margin-right: 10px;
        border: $normal-border;
        font-size: 14px;
        font-family: 'Montserrat', sans-serif;
        border-radius: 20px;
        padding-left: 20px;

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: #aca6cc;
        }
      }
    }
  }
}

.icon-close {
  width: 16px;
  height: 16px;
  fill: #c3ecdd;
  cursor: pointer;
  transition: 0.3s;
}

.icon-close:hover {
  fill: #ffffff;
}

.icon-send {
  width: 42px;
  height: 42px;
  fill: #449d7c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-send:hover {
  transform: scale(1.1, 1.1);
}

.icon-smile {
  width: 30px;
  height: 30px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 3px;
  margin-right: 10px;
}

.icon-smile:hover {
  transform: scale(1.1, 1.1);
}

.icon-attach {
  width: 34px;
  height: 34px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 10px;
}

.icon-attach:hover {
  transform: scale(1.1, 1.1);
}

::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgba(245, 245, 245, 0.47);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  height: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(85, 85, 85, 0.25);
}

.date {
  display: flex;
  justify-content: center;
  width: auto;
  color: $site_blue;
  font-size: 12px;
  padding: 3px;
  margin: 10px;
}

.msg_time {
  font-size: 10px;
}

.icon-readmsg {
  height: 16px;
  margin-bottom: -10px;
  display: flex;
  justify-content: right;
  align-items: end;
  width: 16px;
  height: 16px;
  stroke: $main_green;
  margin-left: 5px;
}

.icon-sendmsg {
  height: 16px;
  margin-bottom: -10px;
  display: flex;
  justify-content: right;
  align-items: end;
  width: 16px;
  height: 16px;
  stroke: $main_green;
  margin-left: 5px;
}

.tm-st {
  display: flex;
  justify-content: right;
  align-items: end;
}
</style>
