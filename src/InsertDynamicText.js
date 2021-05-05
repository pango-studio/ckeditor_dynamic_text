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

		// Get the dynamic text labels available for this instance of the editor
		const labels = editor.config.get('dynamicTextOptions.labels')
		// Get the syntax of the labels
		const syntax = editor.config.get('dynamicTextOptions.syntax')

		// If there are no labels, don't add the dropdown view
		if (!labels) {
			return
		}

		editor.ui.componentFactory.add('insertDynamicText', (locale) => {
			const dropdownView = createDropdown(locale, SplitButtonView)

			dropdownView.buttonView.actionView.set({
				withText: false,
				label: 'Insert dynamic text',
				icon: dynamicTextIcon,
				tooltip: true,
			})

			const dynamicTextItems = new Collection()

			// For each label, add an option in the dropdown list
			labels.forEach((label) => {
				dynamicTextItems.add({
					type: 'button',
					model: new Model({
						withText: true,
						label:
							syntax === 'mailchimp'
								? `*|${label}|*`
								: `{{${label}}}`,
					}),
				})
			})

			addListToDropdown(dropdownView, dynamicTextItems)

			// Add the selected tag at the current insertion point
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
