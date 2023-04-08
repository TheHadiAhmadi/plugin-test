import nodeResolve from '@rollup/plugin-node-resolve'
import {rollup} from 'rollup'
import { compile } from 'svelte/compiler'
import { Plugin } from '../lib/plugin'
import { BaseContext } from './base'

async function compileSvelte(options: {ssr: boolean, filename: string}) {
	const format = options.ssr ? 'amd' : 'esm'
	const generate = options.ssr ? 'ssr' : 'dom'
	const filename = options.filename
	
	return rollup({
		input: options.filename,
		plugins: [
			{
				name: 'svelte',
				async transform(code, id) {
					if(!id.endsWith('.svelte')) return

					const compiled = compile(code, {generate, filename, hydratable: true})
					return compiled.js
				}
			},
			nodeResolve(),
		]
	}).then(build => {
		return build.generate({name: filename, format})
	}).then(result => {
		return result.output[0].code
	})
}

const htmlTemplate = ({head, css, html, url, props}: {head: string, css: any, html: string, url: string, props: any}) => `<!DOCTYPE html>
<html>
<head>
	${head}
	<style>${css.code}</style>
</head>
<body>
	<div id="app">
	${html}
	</div>
	<script type="module">
		import Root from "${url}?dom"

		new Root({
			target: document.getElementById("app"),
			hydrate: true,
			props: JSON.parse('${JSON.stringify(props)}')
		})
	</script>
</body>
</html>`

function evaluate(code: string): any {
	const prefix = `const define = (fn) => fn(); return `
	return new Function(prefix + code)()
}

async function renderSSR({code, url, props}: {code: string, url: string, props: any}) {
	const component = evaluate(code)

	const {html, css, head} = component.render(props)
	return htmlTemplate({head, css, html, url, props})
}

async function renderSvelteDOM({code}: {code: string}) {
	return code;
}

export async function renderSvelte({path, url, props, ssr}: {path: string, url: string, props: any, ssr: boolean}) {
	const code = await compileSvelte({filename: path, ssr});	
	if(ssr) {
		return renderSSR({code, url, props})
	} else {
		return renderSvelteDOM({code})
	}
}


interface SvelteContext extends BaseContext {
    addPage: (slug: string, component: string, props: Record<string, any>) => void
}
interface SveltePlugin extends Plugin<SvelteContext> {}

export default function(): SveltePlugin {
	return {

		name: 'svelte',
		init(ctx) {        
			ctx.addPage = (slug, path, props) => {
				ctx.addRoute(slug, 'get', async (req, res) => {
					const ssr = typeof req.query.dom === 'undefined'

					if(ssr) {
						res.send(await renderSvelte({url: req.url, path, props, ssr: true}))
					} else {
						res.setHeader('Content-Type', 'text/javascript')
						res.send(await renderSvelte({url: req.url, path, props, ssr: false}))
					}
				})		
			}
		}
	}
}