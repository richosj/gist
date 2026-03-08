import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/** 빌드 시 HTML에서 <!-- include path --> 를 해당 파일 내용으로 치환 */
function htmlIncludePlugin() {
  return {
    name: 'html-include',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const root = typeof ctx.server !== 'undefined' ? ctx.server.config.root : process.cwd()
        const publicDir = join(root, 'public')
        return html.replace(/<!--\s*include\s+([^\s]+)\s*-->/g, (_, path) => {
          const file = join(publicDir, path.trim())
          try {
            return readFileSync(file, 'utf-8')
          } catch {
            return `<!-- include failed: ${path} -->`
          }
        })
      },
    },
  }
}

export default defineConfig({
  root: '.',
  base: '/gist/', // GitHub Pages: https://richosj.github.io/gist/
  publicDir: 'public',
  plugins: [htmlIncludePlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: [
        './index.html',
        './pages/search.html',
        './pages/indoor.html',
        './pages/land.html',
        './pages/dataprovide.html',
        './pages/layers3d.html',
        './pages/mydata.html',
      ],
    },
  },
})
