<template>
  <div v-if="editor" class="editor">
    <menu-bar :hide-tg-button="hideTgButton" class="editor__header" :full-screen="showDialog" :editor="editor"
      @fullScreen="toggleDialog" />
    <editor-content v-if="!showDialog" :editor="editor" class="scroll"
      :style="{ height: height, 'max-height': maxHeight }" />
    <el-dialog v-model="showDialog" fullscreen :show-close="false">
      <menu-bar class="editor__header" :full-screen="showDialog" :editor="editor" @fullScreen="toggleDialog" />
      <editor-content v-if="showDialog" :editor="editor" class="scroll"
        :style="{ height: 'auto', 'max-height': '80vh' }" />
    </el-dialog>
    <!-- <div class="counter">{{ counter }}&nbsp;{{ limit }}</div> -->
  </div>
</template>

<script lang="ts">
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Underline from '@tiptap/extension-underline';

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

import { mergeAttributes, Node } from '@tiptap/core';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { defineComponent, Ref, ref, watch } from 'vue';

import MenuBar from './MenuBar.vue';

export default defineComponent({
  name: 'WysiwygEditor',
  components: {
    EditorContent,
    MenuBar,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: 'auto',
    },
    maxHeight: {
      type: String,
      default: '700px',
    },
    // limit: {
    //   type: Number,
    //   default: 500,
    // },
    hideTgButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const showDialog: Ref<boolean> = ref(false);
    const toggleDialog = (value: boolean) => {
      showDialog.value = value;
    };
    const Video = Node.create({
      name: 'video', // unique name for the Node
      group: 'block', // belongs to the 'block' group of extensions
      selectable: true, // so we can select the video
      draggable: true, // so we can drag the video
      atom: true, // is a single unit

      addAttributes() {
        return {
          src: {
            default: null,
            autoplay: false,
          },
        };
      },

      parseHTML() {
        return [
          {
            tag: 'video',
          },
        ];
      },

      renderHTML({ HTMLAttributes }) {
        return ['video', mergeAttributes(HTMLAttributes)];
      },

      addNodeView() {
        return ({ editor, node }) => {
          const div = document.createElement('div');
          div.className = 'aspect-w-16 aspect-h-9' + (editor.isEditable ? ' cursor-pointer' : '');
          const iframe = document.createElement('iframe');
          if (editor.isEditable) {
            iframe.className = 'pointer-events-none';
          }
          iframe.width = '640';
          iframe.height = '360';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = false;
          iframe.src = node.attrs.src;
          div.append(iframe);
          return {
            dom: div,
          };
        };
      },
    });
    const editor = new Editor({
      extensions: [
        StarterKit.configure(),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'editor-table',
          },
        }),
        TableRow,
        TableHeader,
        CustomTableCell,
        Link.configure({
          HTMLAttributes: { target: '_blank' },
          linkOnPaste: false,
          openOnClick: true,
        }),
        Image,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        Underline,
        Highlight.configure({
          multicolor: true,
        }),
        Youtube.configure({
          controls: false,
        }),
        Video,
      ],
      content: props.modelValue,
      onUpdate: () => {
        emit('update:modelValue', editor.getHTML());
      },
    });

    watch(
      () => props.modelValue,
      (value) => {
        const v = value as unknown as string;
        const isSame = editor.getHTML() == v;
        if (isSame) {
          return;
        }
        editor.commands.setContent(value, false);
      }
    );

    return { editor, showDialog, toggleDialog };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.editor {
  margin: 10px 0 10px 0;
  border: 1px solid #d1d5db;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 1px solid #d1d5db;
  }
}

.ProseMirror {
  min-height: 200px;
  padding: 12px 15px;

  &:focus-visible {
    outline: none;
    // border-bottom: 1px solid #d1d5db;
  }

  >p {
    margin: 0;
  }

  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }
}

/* Table-specific styling */
.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
    line-height: 1.5;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      >* {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

ul[data-type='taskList'] {
  list-style: none;
  padding: 0;

  p {
    margin: 0;
  }

  li {
    display: flex;

    >label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    >div {
      flex: 1 1 auto;
    }
  }
}

.editor__header {
  border: 1px solid grey;
}

.scroll {
  overflow-y: auto;
  border: 1px solid grey;
  border-top: 0;
}

// .counter {
//   display: flex;
//   justify-content: right;
//   margin-right: 10px;
//   font-size: 12px;
//   color: #909299;
// }

// .video-container {
//   position: relative;
//   overflow: hidden;
//   padding-bottom: 56.25%;
// }

// .video-container > iframe {
//   position: absolute;
//   top: 0px;
//   right: 0px;
//   bottom: 0px;
//   left: 0px;
//   width: 100%;
//   height: 100%;
// }
// .pointer-events-none {
//   pointer-events: none;
// }
// .cursor-pointer {
//   cursor: pointer;
// }</style>
