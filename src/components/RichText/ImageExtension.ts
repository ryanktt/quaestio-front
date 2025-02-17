/* eslint-disable @typescript-eslint/no-shadow */
import { rem } from '@mantine/core';
import { nanoid } from 'nanoid/non-secure';
import ImageResize from 'tiptap-extension-resize-image';

const ImageExtension = ImageResize.extend({
	renderHTML({ node, HTMLAttributes }) {
		return [
			'div',
			{ style: `justify-content: ${node.attrs.justify || 'start'};display: flex;` },
			['img', { ...HTMLAttributes, style: `width: ${node.attrs.width || '100%'}; border-radius: 5px;` }],
		];
	},
	addAttributes() {
		return {
			...this.parent?.(),
			width: {
				default: '100%',
				parseHTML: (element) => {
					return element.parentElement?.style.width || element.style.width || '100%';
				},
				renderHTML: (attributes) => {
					return { style: `width: ${attributes.width};` };
				},
			},
			justify: {
				default: 'start',
				parseHTML: (element) => element.parentElement?.style.justifyContent || 'start',
				renderHTML: (attributes) => ({ style: `justify-content: ${attributes.justify};` }),
			},
		};
	},

	addNodeView() {
		return ({ node, editor }) => {
			const wrapper = document.createElement('div');
			wrapper.style.position = 'relative';
			wrapper.style.display = 'flex';
			wrapper.style.justifyContent = node.attrs.justify;

			const container = document.createElement('div');
			const containerId = nanoid();
			container.id = containerId;
			container.style.position = 'relative';
			container.style.display = 'inline-block';
			container.style.width = node.attrs.width;
			wrapper.appendChild(container);

			const img = document.createElement('img');
			img.src = node.attrs.src;
			img.style.borderRadius = '5px';
			img.style.width = '100%';
			img.style.height = 'auto';
			container.appendChild(img);

			let isResizing = false;

			const resizer = document.createElement('div');
			const resizerId = nanoid();
			resizer.id = resizerId;
			resizer.style.position = 'absolute';
			resizer.style.right = '-0px';
			resizer.style.top = '-6px';
			resizer.style.background = 'transparent';
			resizer.style.cursor = 'move';
			resizer.style.display = 'none';
			resizer.style.alignContent = 'center';
			resizer.style.alignItems = 'center';

			const icon = document.createElement('span');
			icon.style.padding = rem(5);
			icon.style.paddingBottom = '0';
			icon.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
			icon.style.border = '1px solid rgba(101, 101, 101, 0.8)';
			icon.style.borderRadius = '5px';
			icon.style.fill = 'black';
			icon.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-maximize"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>`;

			resizer.appendChild(icon);
			container.appendChild(resizer);

			const controls = document.createElement('div');
			controls.id = resizerId;
			controls.style.position = 'absolute';
			controls.style.top = '-8px';
			controls.style.left = '50%';
			controls.style.transform = 'translateX(-50%)';
			controls.style.display = 'none'; // Hide initially
			controls.style.gap = rem(5);
			controls.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
			controls.style.border = '1px solid rgba(101, 101, 101, 0.8)';
			controls.style.borderRadius = '5px';

			const createButton = (iconSvg: string, onClick: () => void) => {
				const button = document.createElement('div');
				button.innerHTML = iconSvg;
				button.style.border = 'none';
				button.style.background = 'transparent';
				button.style.cursor = 'pointer';
				button.style.fontSize = rem(16);
				button.style.padding = `${rem(3)} ${rem(6)}`;
				button.onclick = onClick;
				return button;
			};

			const alignButtons = [
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l16 0" /><path d="M4 12l10 0" /><path d="M4 18l14 0" /></svg>`,
					justify: 'start',
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l16 0" /><path d="M8 12l8 0" /><path d="M6 18l12 0" /></svg>`,
					justify: 'center',
				},
				{
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l16 0" /><path d="M10 12l10 0" /><path d="M6 18l14 0" /></svg>`,
					justify: 'end',
				},
			];

			const showControls = () => {
				controls.style.display = 'flex';
				resizer.style.display = 'flex';
			};
			alignButtons.forEach(({ icon, justify }) => {
				const button = createButton(icon, () => {
					wrapper.style.justifyContent = justify;
					editor.chain().updateAttributes(node.type.name, { justify }).run();
					showControls();
				});

				controls.appendChild(button);
			});
			container.appendChild(controls);

			container.tabIndex = 0;
			container.addEventListener('focus', showControls);

			document.addEventListener('click', (event) => {
				if (!wrapper.contains(event.target as Node)) {
					controls.style.display = 'none';
					resizer.style.display = 'none';
				}
			});

			resizer.addEventListener('mousedown', (event) => {
				isResizing = true;
				event.preventDefault();
			});

			document.addEventListener('mousemove', (event) => {
				if (!isResizing) return;

				const newWidthPx = event.clientX - wrapper.getBoundingClientRect().left;
				let newWidthPercent = (newWidthPx / editor.view.dom.clientWidth) * 100;
				if (newWidthPercent < 25) newWidthPercent = 25;

				const newWidthString = `${newWidthPercent}%`;
				container.style.width = newWidthString;
				editor.chain().updateAttributes(node.type.name, { width: newWidthString }).run();
			});

			document.addEventListener('mouseup', () => {
				isResizing = false;
			});

			return {
				dom: wrapper,
				contentDOM: img,
			};
		};
	},
});

export default ImageExtension;
