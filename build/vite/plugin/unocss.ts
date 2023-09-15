import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export const configUnocssPlugin = () =>
	Unocss({
		presets: [presetAttributify(), presetUno(), presetIcons({})], // 使用自带的内部预设， 按需引用
		variants: [
			// hover:
			(matcher) => {
				if (!matcher.startsWith('hover:')) return matcher
				return {
					// slice `hover:` prefix and passed to the next variants and rules
					matcher: matcher.slice(6),
					selector: (s) => `${s}:hover`
				}
			}
		],
		rules: [
			[/^z-(\d+)$/, ([, d]) => ({ 'z-index': d })],
			[/^row-gap-(\w+)$/, ([, w]) => ({ 'row-gap': w })],
			[/^col-gap-(\w+)$/, ([, w]) => ({ 'column-gap': w })],
			[
				'p-c',
				{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}
			],
			[
				'f-c',
				{
					display: 'flex',
					'justify-content': 'center',
					'align-items': 'center'
				}
			]
		]
	})
