<template>
  <div>
    <template v-for="(item, index) in items">
      <div v-if="item.type === 'divider'" :key="`divider${index}`" class="divider" />
      <MenuItem v-else :key="index" v-bind="item" :action="item.action" :icon="item.icon" :title="item.title" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import IEditorMenuItem from '@/interfaces/IEditorMenuItem';

import MenuItem from './MenuItem.vue';

export default defineComponent({
  name: 'MenuBar',
  components: {
    MenuItem,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
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
        icon: 'double-quotes-l',
        title: 'Цитата',
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
    ];

    const addImage = () => {
      const url = window.prompt('URL');

      if (url) {
        props.editor.chain().focus().setImage({ src: url }).run();
      }
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

    const addVideo = () => {
      const url = window.prompt('Enter YouTube URL');

      if (url) {
        props.editor.commands.setYoutubeVideo({
          src: url,
          // width: Math.max(320, parseInt(this.width, 10)) || 640,
          // height: Math.max(180, parseInt(this.height, 10)) || 480,
        });
      }
    };
    return { items };
  },
});
</script>

<style lang="scss" scoped>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
