<template>
    <div>
      <label class="block font-medium text-text">{{ field.title }}</label>
      <div id="app">
        <ckeditor
          :editor="editor"
          :value="value"
          :required="field.required"
          :config="editorConfig"
          class="rounded-md px-3 w-full text-textDarker focus:outline-none focus:ring-2 focus:ring-secondary bg-cardDark"
          @input="$emit('input', $event)"
        ></ckeditor>
      </div>
    </div>
  </template>
  
  <script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor'
  import CKEditor from '@ckeditor/ckeditor5-vue'
  
  export default {
    name: 'RichTextInput',
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        editor: ClassicEditor,
        editorConfig: {
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote'
          ]
        }
      }
    },
    components: {
      ckeditor: CKEditor.component
    }
  }
  </script>