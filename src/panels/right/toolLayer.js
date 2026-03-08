import { icons } from '../../icons.js'

const TOOL_ITEMS = [
  { id: 'thematic', label: '주제도', icon: icons.layers },
  { id: '3d', label: '3D', icon: icons.cube },
  { id: 'distance', label: '거리', icon: icons.ruler },
  { id: 'area', label: '면적', icon: icons.square },
  { id: 'elevation', label: '표고', icon: icons.mountain },
  { id: 'radius', label: '반경', icon: icons.circle },
  { id: 'draw', label: '그리기', icon: icons.pencil, hasPopover: true },
  { id: 'print', label: '인쇄', icon: icons.printer },
  { id: 'save', label: '저장', icon: icons.save },
  { id: 'roadview', label: '로드뷰', icon: icons.camera },
  { id: 'info', label: '정보보기', icon: icons.info },
]

const FIXED_CONTROLS = [
  { id: 'compass', icon: icons.compass, title: '나침반' },
  { id: 'crosshair', icon: icons.crosshair, title: '중심이동' },
  { id: 'zoomIn', icon: icons.zoomIn, title: '확대' },
  { id: 'zoomOut', icon: icons.zoomOut, title: '축소' },
  { id: 'home', icon: icons.home, title: '홈' },
  { id: 'fullscreen', icon: icons.fullscreen, title: '전체화면' },
]

/** 메뉴별 표시할 도구 ID 목록 (없으면 전부) */
export const MENU_TOOLS = {
  search: ['thematic', '3d', 'distance', 'area', 'elevation', 'radius', 'draw', 'print', 'save', 'roadview', 'info'],
  realtime: ['thematic', '3d', 'distance', 'area', 'draw', 'print', 'save', 'roadview', 'info'],
  stats: ['thematic', '3d', 'distance', 'area', 'draw', 'print', 'save', 'info'],
  mydata: ['thematic', '3d', 'print', 'save', 'info'],
  layers3d: ['thematic', '3d', 'distance', 'area', 'elevation', 'draw', 'print', 'save', 'roadview', 'info'],
  dataprovide: ['thematic', '3d', 'print', 'save', 'info'],
}

export function renderToolLayer(activeMenu = 'search') {
  const toolIds = MENU_TOOLS[activeMenu] || MENU_TOOLS.search
  const tools = TOOL_ITEMS.filter((t) => toolIds.includes(t.id))

  const toolButtons = tools.map((t) => {
    const drawExtra = t.hasPopover
      ? `<div class="tool-popover" id="popover-${t.id}" hidden>
           <div class="tool-popover-header"><strong>도형 선택</strong></div>
           <div class="tool-popover-body">
             <button type="button" class="btn-primary btn-sm draw-mode" data-mode="point">점 그리기</button>
             <button type="button" class="btn-primary btn-sm draw-mode" data-mode="line">선 그리기</button>
             <button type="button" class="btn-primary btn-sm draw-mode" data-mode="polygon">면 그리기</button>
             <p class="tool-popover-hint">도형 타입을 선택하세요.</p>
           </div>
         </div>`
      : ''
    return `
      <div class="tool-item-wrap">
        <button type="button" class="tool-btn" data-tool="${t.id}" title="${t.label}">
          <span class="icon-wrap">${t.icon}</span>
          <span>${t.label}</span>
        </button>
        ${drawExtra}
      </div>
    `
  }).join('')

  const fixedButtons = FIXED_CONTROLS.map((c) => `
    <button type="button" class="tool-btn" data-tool="${c.id}" title="${c.title}">${c.icon}</button>
  `).join('')

  return `
    <div class="panel-right" id="tool-layer">
      ${toolButtons}
      <div class="tool-divider"></div>
      ${fixedButtons}
    </div>
  `
}

export function bindToolLayer(container, callbacks = {}) {
  if (!container) return
  const { onTool, onDrawMode, onZoomIn, onZoomOut, onHome, onFullscreen } = callbacks

  container.querySelectorAll('.tool-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.tool
      if (id === 'draw') {
        const wrap = btn.closest('.tool-item-wrap')
        const pop = wrap?.querySelector('.tool-popover')
        if (pop) {
          pop.hidden = !pop.hidden
          if (!pop.hidden) pop.classList.add('popover')
        }
        return
      }
      if (id === 'zoomIn') onZoomIn?.()
      else if (id === 'zoomOut') onZoomOut?.()
      else if (id === 'home') onHome?.()
      else if (id === 'fullscreen') onFullscreen?.()
      else onTool?.(id)
    })
  })

  container.querySelectorAll('.draw-mode').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode
      onDrawMode?.(mode)
      container.querySelectorAll('.tool-popover').forEach((p) => { p.hidden = true })
    })
  })
}
