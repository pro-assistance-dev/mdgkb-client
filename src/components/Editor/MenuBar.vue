<template>
  <div>
    <template v-for="(item, index) in items">
      <template v-if="item.type === 'divider'">
        <div v-if="!item.condition" :key="`divider${index}`" class="divider" />
      </template>
      <template v-else>
        <MenuItem v-if="!item.condition" :key="index" v-bind="item" :action="item.action" :icon="item.icon" :title="item.title" />
      </template>
    </template>
    <el-dialog v-model="showDialog" @closed="clearDialogData">
      <template #title>
        <div class="dialog-header">
          <div>{{ dialogType === 'image' ? 'Добавить картинку' : 'Добавить видео' }}</div>
          <div>
            <el-button type="success" size="mini" @click="saveDialog">Сохранить</el-button>
          </div>
        </div>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Ссылкой" name="link">
          <el-form-item title="Ссылка на картинку">
            <el-input v-model="inputLink" placeholder="Вставьте ссылку"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="Файлом" name="file">
          <UploderImage v-if="showDialog && dialogType === 'image'" :file-info="image" :height="300" @ratio="(e) => (element.ratio = e)" />
          <FileUploader v-if="showDialog && dialogType === 'video'" :file-info="image" :formats="['webm', 'mp4']" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';

import FileInfo from '@/services/classes/FileInfo.ts';
import News from '@/classes/News';
import FileUploader from '@/components/FileUploader.vue';
import IEditorMenuItem from '@/interfaces/IEditorMenuItem';
import Provider from '@/services/Provider/Provider';

import MenuItem from './MenuItem.vue';

export default defineComponent({
  name: 'MenuBar',
  components: {
    MenuItem,
    FileUploader,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
    fullScreen: {
      type: Boolean,
      required: true,
    },
    hideTgButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['fullScreen'],
  setup(props, { emit }) {
    const items: IEditorMenuItem[] = [
      {
        icon: 'bold',
        title: 'Полужирный',
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive('bold'),
      },
      {
        icon: 'italic',
        title: 'Курсив',
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive('italic'),
      },
      {
        icon: 'underline',
        title: 'Подчеркнутый',
        action: () => props.editor.chain().focus().toggleUnderline().run(),
        isActive: () => props.editor.isActive('underline'),
      },
      {
        icon: 'strikethrough',
        title: 'Зачеркнутый',
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive('strike'),
      },
      {
        icon: 'code-view',
        title: 'Код',
        action: () => props.editor.chain().focus().toggleCode().run(),
        isActive: () => props.editor.isActive('code'),
      },
      {
        icon: 'mark-pen-line',
        title: 'Выделить',
        action: () => props.editor.chain().focus().toggleHighlight().run(),
        isActive: () => props.editor.isActive('highlight'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'h-1',
        title: 'Заголовок 1',
        action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 1 }),
      },
      {
        icon: 'h-2',
        title: 'Заголовок 2',
        action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 2 }),
      },
      {
        icon: 'paragraph',
        title: 'Абзац',
        action: () => props.editor.chain().focus().setParagraph().run(),
        isActive: () => props.editor.isActive('paragraph'),
      },
      {
        icon: 'list-unordered',
        title: 'Маркированный список',
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive('bulletList'),
      },
      {
        icon: 'list-ordered',
        title: 'Нумерованный список',
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive('orderedList'),
      },
      {
        icon: 'list-check-2',
        title: 'Маркированный список',
        action: () => props.editor.chain().focus().toggleTaskList().run(),
        isActive: () => props.editor.isActive('taskList'),
      },
      {
        icon: 'code-box-line',
        title: 'Блок кода',
        action: () => props.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => props.editor.isActive('codeBlock'),
      },
      {
        type: 'divider',
      },
      {
        title: 'Цитата',
        icon: 'double-quotes-l',
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive('blockquote'),
      },
      {
        icon: 'separator',
        title: 'Горизонтальная линия',
        action: () => props.editor.chain().focus().setHorizontalRule().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'text-wrap',
        title: 'Перенос на следующую строку',
        action: () => props.editor.chain().focus().setHardBreak().run(),
      },
      {
        icon: 'format-clear',
        title: 'Сброс стилей',
        action: () => props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'arrow-go-back-line',
        title: 'Назад',
        action: () => props.editor.chain().focus().undo().run(),
      },
      {
        icon: 'arrow-go-forward-line',
        title: 'Вперед',
        action: () => props.editor.chain().focus().redo().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'layout-grid-line',
        title: 'Добавить таблицу',
        action: () => props.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
      },
      {
        icon: 'split-cells-horizontal',
        title: 'Добавить колонку справа',
        action: () => props.editor.chain().focus().addColumnAfter().run(),
      },
      {
        icon: 'merge-cells-horizontal',
        title: 'Удалить колонку',
        action: () => props.editor.chain().focus().deleteColumn().run(),
      },
      {
        icon: 'split-cells-vertical',
        title: 'Добавить строку снизу',
        action: () => props.editor.chain().focus().addRowAfter().run(),
      },
      {
        icon: 'merge-cells-vertical',
        title: 'Удалить строку',
        action: () => props.editor.chain().focus().deleteRow().run(),
      },
      {
        icon: 'delete-bin-line',
        title: 'Удалить таблицу',
        action: () => props.editor.chain().focus().deleteTable().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'image-add-line',
        title: 'Добавить картинку',
        action: () => addImage(),
      },
      {
        icon: 'video-add-line',
        title: 'Добавить видео',
        action: () => addVideo(),
      },
      {
        icon: 'links-line',
        title: 'Добавить ссылку',
        action: () => setLink(),
      },
      {
        type: 'emoji',
        icon: 'emotion-happy-line',
        title: 'Добавить emoji',
        action: (content?: string) => props.editor.chain().focus().insertContent(content).run(),
      },
      {
        type: 'divider',
      },
      {
        condition: props.hideTgButton,
        icon: 'send-plane-fill',
        title: 'Отправить в тг',
        action: () => sendToTg(),
      },
      {
        condition: props.hideTgButton,
        type: 'divider',
      },
      {
        icon: props.fullScreen ? 'fullscreen-exit-line' : 'fullscreen-line',
        title: props.fullScreen ? 'Выйти из полного экрана' : 'Полный экран',
        action: () => emit('fullScreen', props.fullScreen ? false : true),
      },
    ];

    const showDialog: Ref<boolean> = ref(false);
    const inputLink: Ref<string> = ref('');
    const image: Ref<FileInfo> = ref(new FileInfo());
    const activeName: Ref<string> = ref('link');
    const dialogType: Ref<string> = ref('');

    const addImage = () => {
      dialogType.value = 'image';
      showDialog.value = true;

      // const url = window.prompt('URL');

      // if (url) {
      //   props.editor.chain().focus().setImage({ src: url }).run();
      // }
    };
    const saveImage = (value: string) => {
      props.editor.chain().focus().setImage({ src: value }).run();
    };
    const saveDialog = async () => {
      if (activeName.value === 'link') {
        if (!inputLink.value.length) {
          ElMessage({ message: 'Не добавлена ссылка', type: 'error' });
          return;
        }
        if (dialogType.value === 'image') {
          saveImage(inputLink.value);
        } else {
          saveVideo(inputLink.value);
        }
      } else {
        if (!image.value.fileSystemPath) {
          ElMessage({ message: 'Не загружена картинка', type: 'error' });
          return;
        }
        // const result = await Provider.store.dispatch('fileInfos/create', image.value);
        // console.log(new FileInfo(result).getImageUrl());
        // if (dialogType.value === 'image') {
        //   saveImage(new FileInfo(result).getImageUrl());
        // } else {
        //   saveVideo(new FileInfo(result).getImageUrl());
        // }
      }
      showDialog.value = false;
    };

    const clearDialogData = () => {
      inputLink.value = '';
      image.value = new FileInfo();
      activeName.value = 'link';
    };

    const setLink = () => {
      const previousUrl = props.editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);
      // cancelled
      if (url === null) {
        return;
      }
      // empty
      if (url === '') {
        props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
      // update link
      props.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const getYtId = (item: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = item.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    };

    const makeEmbed = (id: string) => {
      const link = '//www.youtube.com/embed/';
      return link + id;
    };

    const saveVideo = (url: string) => {
      let embedUrl;
      const id = getYtId(url);
      if (id) {
        embedUrl = makeEmbed(id);
      }
      props.editor
        .chain()
        .focus()
        .insertContent(`<video src="${embedUrl ? embedUrl : url}"></video>`)
        .run();
    };

    const addVideo = () => {
      dialogType.value = 'video';
      showDialog.value = true;

      // const url = window.prompt('Enter YouTube URL');

      // if (url) {
      // props.editor.commands.setYoutubeVideo({
      //   src: url,
      //   // width: Math.max(320, parseInt(this.width, 10)) || 640,
      //   // height: Math.max(180, parseInt(this.height, 10)) || 480,
      // });
      // }
    };

    const news: Ref<News> = NewsStore.Item();

    const sendToTg = async () => {
      PHelp.Notification.Dev();
      // await NewsStore.SendToTg(news.content);
    };

    return { items, showDialog, image, saveDialog, activeName, inputLink, clearDialogData, dialogType };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
}
</style>
