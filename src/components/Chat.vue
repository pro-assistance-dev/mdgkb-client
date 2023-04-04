<template>
  <div class="chat">
    <div id="chat-body" ref="chat-body" class="chat-body">
      <div
        v-for="message of chat.chatMessages"
        :key="message.id"
        class="chat-body-message-container"
        :class="[{ incoming: !user || message.user.id !== user.id }, { outgoing: user && message.user.id === user.id }]"
      >
        <div class="chat-body-avatar-container">
          <el-avatar class="chat-body-avatar" :src="'https://avatars.dicebear.com/v2/jdenticon/${message.user.firstName}.svg'"></el-avatar>
        </div>
        <div class="chat-body-message">
          <div class="chat-body-message-header">
            <div>
              <!--              <span class="chat-body-message-header-name"> {{ message.usjhhygtttttter.lastName }}&nbsp; </span>-->
              <span class="chat-body-message-header-name">
                {{ message.userName ?? message.user.human.getFullName() }}
              </span>
            </div>
            <!--                      <span class="msg_time">{{ $moment(message.created_on).format('DD.MM.YYYY HH:mm:ss') }}</span>-->
            <span class="chat-body-message-header-time">
              <!--              {{ moment.utc(message.createdOn).format('HH:mm') }}-->
            </span>
          </div>
          <div class="chat-body-message-body">
            {{ message.message }}
          </div>
        </div>
      </div>
    </div>
    <div class="chat-footer">
      <div class="chat-footer-message">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Введите сообщение"
          class="chat-footer-message-input"
          @keyup.enter="sendMessage"
        />
        <button class="chat-footer-message-button" @click.prevent="sendMessage">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Chat from '@/services/classes/Chat';
import ChatMessage from '@/services/classes/ChatMessage';
import Provider from '@/services/Provider/Provider';
import WebSocketClient from '@/services/WebSocketClient';

export default defineComponent({
  name: 'Chat',
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
  },
  setup(props) {
    let client: Ref<WebSocketClient> = computed(() => Provider.store.getters['chats/client']);
    const chat: Ref<Chat> = computed(() => Provider.store.getters['chats/item']);
    const newMessage: Ref<string> = ref('');
    const chatBody = ref();

    const sendMessage = async () => {
      if (newMessage.value === '') {
        return;
      }
      const message = ChatMessage.Create(props.chatId, props.userId, newMessage.value, props.userName);
      await Provider.store.dispatch('chatMessages/create', message);
      client.value.send(JSON.stringify(message));
      chat.value.chatMessages.push(message);
      newMessage.value = '';
      // document.getElementById('chat-body')?.scrollTo({ top: 999999999999 });
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('chats/get', props.chatId);
      await Provider.store.dispatch('chats/connect', { chatId: props.chatId, userId: props.userId });
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
.incoming {
  .chat-body-message {
    background-color: lighten(#c9f76f, 15%);
  }
  .chat-body-message::after {
    border-bottom: 10px solid lighten(#c9f76f, 15%);
  }
}
.outgoing {
  .chat-body-message {
    background-color: lighten(#ffff73, 15%);
  }
  .chat-body-message::after {
    border-bottom: 10px solid lighten(#ffff73, 15%);
  }
}
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  opacity: 0.9;
  min-width: 350px;
  max-width: 350px;
  padding: 10px 0 0 10px;
  font-size: 14px;
  &-body {
    width: 100%;
    overflow-y: scroll;
    height: 100%;

    &-message-container {
      margin-bottom: 5px;
      display: flex;
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
      margin: auto 5px auto 10px;
      border-radius: 10px 10px 10px 0;
      padding: 10px;
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
        }

        &-time {
          color: rgba(0, 0, 0, 0.5);
          margin-left: 10px;
          display: inline-block;
          vertical-align: middle;
          line-height: normal;
        }
      }

      &-body {
        font-weight: lighter;
      }
    }
  }

  &-footer {
    width: 100%;
    margin: 5px 0;

    &-message {
      z-index: 0;
      height: 30px;
      font-size: 0;
      font-weight: 500;
      display: flex;
      flex-wrap: nowrap;
      &-input {
        // height: 30px;
        width: 100%;
        border-color: #e3e9ef;
        font-size: 14px;
        font-family: 'Montserrat', sans-serif;
        border-right: none;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        padding: 10px;

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: #aca6cc;
        }
      }
      &-button {
        font-size: 14px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        color: white;
        height: 30px;
        border: none;
        background-color: #224af2;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        margin-right: 10px;

        &:hover {
          filter: brightness(130%);
          cursor: pointer;
        }
      }
    }
  }
}
@media screen and (max-width: 1230px) {
  .chat {
    max-width: 100%;
    height: 600px;
  }
}
@media screen and (max-width: 768px) {
  .chat {
    font-size: 12px;
    height: 500px;
  }
}
@media screen and (max-width: 480px) {
  .chat {
    height: 500px;
    &-footer-message-input {
      height: 25px;
      font-size: 12px;
    }
    &-footer-message-button {
      height: 25px;
      font-size: 12px;
    }
  }
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

//input.chat-footer-message-input,
//textarea {
//  background-color: rgba(0, 0, 0, 1);
//  opacity: 0.5;
//  background-color: white;
//}
</style>
