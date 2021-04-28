import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Model from '@ckeditor/ckeditor5-ui/src/model'
import Collection from '@ckeditor/ckeditor5-utils/src/collection'

import {
	addListToDropdown,
	createDropdown,
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import SplitButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview'

import dynamicTextIcon from './assets/dynamic-text.svg'

export default class InsertDynamicText extends Plugin {
	init() {
		const editor = this.editor

		editor.ui.componentFactory.add('insertDynamicText', (locale) => {
			const dropdownView = createDropdown(locale, SplitButtonView)

			dropdownView.buttonView.actionView.set({
				withText: false,
				label: 'Insert dynamic text',
				icon: dynamicTextIcon,
				tooltip: true,
			})

			const dynamicTextItems = new Collection()
			const labels = editor.config.get('dynamicTextOptions.labels')

			labels.forEach((label) => {
				dynamicTextItems.add({
					type: 'button',
					model: new Model({
						withText: true,
						label: `{{ ${label} }}`,
					}),
				})
			})

			addListToDropdown(dropdownView, dynamicTextItems)

			dropdownView.on('execute', (eventInfo) => {
				const { label } = eventInfo.source

				editor.model.change((writer) => {
					const dynamicText = writer.createElement('span')
					writer.insertText(label, dynamicText)
					editor.model.insertContent(dynamicText)
				})
			})

			return dropdownView
		})
	}
}
