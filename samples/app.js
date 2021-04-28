import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'

import InsertDynamicText from '../src/InsertDynamicText'

ClassicEditor.create(document.querySelector('#editor'), {
	plugins: [Essentials, Paragraph, Bold, Italic, InsertDynamicText],
	toolbar: ['bold', 'italic', 'InsertDynamicText'],
	dynamicTextOptions: {
		labels: ['app_name', 'app_url', 'user_email', 'password_link'],
	},
})
	.then((editor) => {
		console.log('Editor loaded successfully', editor)
	})
	.catch((error) => {
		console.error(error.stack)
	})
