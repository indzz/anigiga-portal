export default {
    defaultEditor: 'tinymce',
    editors: {
        ckeditor: false, 

        tinymce: {
            plugins: ['paste', 'link', 'lists', 'table', 'media', 'image', 'imagetools'],
            toolbar: [
                'undo redo | styleselect | bold italic underline strikethrough | fontsizeselect formatselect',
                'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor formatpainter removeformat | insertfile image media link | table'
            ]
        },

        tiptap: false, 
    }
}
