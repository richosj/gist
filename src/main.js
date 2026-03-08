import './styles/main.css'
import { initTheme, cycleTheme } from './theme/themes.js'
import { openSecurityAgreementModal } from './components/modal.js'

const BODY = document.querySelector('.app-body')
const PAGES = document.querySelectorAll('.page')
const NAV_ITEMS = document.querySelectorAll('.header-nav .nav-item[data-page]')

function switchPage(pageId) {
  if (!PAGES.length) return
  const id = pageId || 'ui-guide'
  PAGES.forEach((el) => {
    el.classList.toggle('page-active', el.id === 'page-' + id)
    if (el.id === 'page-' + id) {
      el.querySelectorAll('.panel-left.hidden').forEach((p) => p.classList.remove('hidden'))
    }
  })
  NAV_ITEMS.forEach((el) => {
    el.classList.toggle('active', el.dataset.page === id)
    el.setAttribute('aria-current', el.dataset.page === id ? 'page' : null)
  })
  const hash = id === 'ui-guide' ? '' : id
  if (window.history.replaceState) {
    window.history.replaceState(null, '', hash ? '#' + hash : window.location.pathname)
  } else {
    window.location.hash = hash
  }
}

function initNav() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const isMultiPage = !document.getElementById('page-ui-guide')
  if (isMultiPage && NAV_ITEMS.length) {
    NAV_ITEMS.forEach((el) => {
      const href = el.getAttribute('href') || ''
      const linkPath = href.replace(/\/$/, '') || '/'
      const active = pathname === linkPath
      el.classList.toggle('active', active)
      el.setAttribute('aria-current', active ? 'page' : null)
    })
    return
  }
  NAV_ITEMS.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (el.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        switchPage(el.dataset.page)
      }
    })
  })
  const hash = window.location.hash.slice(1)
  if (hash && document.getElementById('page-' + hash)) {
    switchPage(hash)
  } else {
    switchPage('ui-guide')
  }
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.slice(1)
    if (h && document.getElementById('page-' + h)) switchPage(h)
  })
}

function initToolPopovers() {
  document.querySelectorAll('.tool-has-popover').forEach((wrap) => {
    const btn = wrap.querySelector('[data-tool="measure"]')
    const popover = wrap.querySelector('.tool-popover-naver')
    if (!btn || !popover) return
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const isOpen = !popover.hidden
      document.querySelectorAll('.tool-popover-naver').forEach((p) => { p.hidden = true })
      document.querySelectorAll('.tool-has-popover [aria-expanded]').forEach((b) => { b.setAttribute('aria-expanded', 'false') })
      if (!isOpen) {
        popover.hidden = false
        btn.setAttribute('aria-expanded', 'true')
      }
    })
    popover.querySelectorAll('.tool-popover-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation()
        const mode = item.dataset.measure
        showToast(mode === 'distance' ? '거리 측정' : mode === 'area' ? '면적 측정' : '반경 검색')
        wrap.querySelectorAll('.tool-btn').forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
        popover.hidden = true
        btn.setAttribute('aria-expanded', 'false')
      })
    })
  })
  document.addEventListener('click', () => {
    document.querySelectorAll('.tool-popover-naver').forEach((p) => { p.hidden = true })
    document.querySelectorAll('.tool-has-popover [aria-expanded]').forEach((b) => { b.setAttribute('aria-expanded', 'false') })
  })
}

function initMapControls() {
  const container = document.querySelector('.map-controls')
  if (!container) return
  const closeAllPopovers = () => {
    container.querySelectorAll('.map-ctrl-popover').forEach((p) => { p.hidden = true })
    container.querySelectorAll('[aria-expanded="true"]').forEach((b) => { b.setAttribute('aria-expanded', 'false') })
  }
  container.querySelectorAll('.map-ctrl-has-popover').forEach((wrap) => {
    const btn = wrap.querySelector('.map-ctrl-btn')
    const popover = wrap.querySelector('.map-ctrl-popover')
    if (!btn || !popover) return
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const isOpen = !popover.hidden
      closeAllPopovers()
      if (!isOpen) {
        popover.hidden = false
        btn.setAttribute('aria-expanded', 'true')
      }
    })
    popover.querySelectorAll('.map-ctrl-popover-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation()
        if (item.dataset.measure) {
          showToast(item.dataset.measure === 'distance' ? '거리 측정' : item.dataset.measure === 'area' ? '면적 측정' : '반경 검색')
        }
        if (item.dataset.layer) {
          showToast(item.textContent?.trim() + ' 보기')
        }
        if (item.dataset.more) {
          showToast(item.textContent?.trim())
        }
        popover.hidden = true
        btn.setAttribute('aria-expanded', 'false')
      })
    })
  })
  container.querySelectorAll('.map-ctrl-btn[data-map-ctrl]').forEach((btn) => {
    const ctrl = btn.dataset.mapCtrl
    if (btn.closest('.map-ctrl-has-popover')) return
    btn.addEventListener('click', () => {
      if (ctrl === 'zoomIn') showToast('확대')
      else if (ctrl === 'zoomOut') showToast('축소')
      else if (ctrl === 'location') showToast('내 위치')
      else if (ctrl === 'fullscreen') showToast('전체화면')
    })
  })
  document.addEventListener('click', closeAllPopovers)
}

function initPanelClose() {
  document.querySelectorAll('[data-panel-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.closest('.panel-left')
      if (panel) panel.classList.add('hidden')
    })
  })
}

function initOverlay() {
  document.querySelectorAll('[data-overlay-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.building-overlay')
      if (overlay) overlay.hidden = true
    })
  })
  document.querySelectorAll('.facility-item[data-facility="419"]').forEach((el) => {
    el.addEventListener('click', () => {
      const overlay = document.getElementById('overlay-419')
      if (overlay) overlay.hidden = false
    })
  })
}

function initDataProvide() {
  document.querySelectorAll('.btn-download-secure').forEach((btn) => {
    btn.addEventListener('click', () => {
      openSecurityAgreementModal(() => {
        console.log('동의 후 다운로드:', btn.dataset.id)
      })
    })
  })
}

function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle')
  if (themeBtn) {
    const updateTitle = () => {
      const t = document.documentElement.getAttribute('data-theme') || 'default'
      themeBtn.title = `테마 변경 (현재: ${t})`
    }
    updateTitle()
    themeBtn.addEventListener('click', () => {
      cycleTheme()
      updateTitle()
      showToast(`테마가 변경되었습니다.`)
    })
  }
}

function initTabs() {
  document.querySelectorAll('.tabs-header').forEach((header) => {
    const wrap = header.closest('.tabs-wrap')
    if (!wrap) return
    const btns = header.querySelectorAll('.tab-btn')
    const bodies = wrap.querySelectorAll('.tabs-body')
    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
        bodies.forEach((b, j) => {
          b.classList.toggle('tabs-body-active', j === i)
        })
      })
    })
  })
}

function initFloorTabs() {
  document.querySelectorAll('.floor-tabs').forEach((container) => {
    container.querySelectorAll('.floor-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.floor-tab').forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
      })
    })
  })
}

function initPanelToggle() {
  document.querySelectorAll('.map-wrap').forEach((wrap) => {
    const panel = wrap.closest('.page')?.querySelector('.panel-left')
    if (!panel) return
    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.className = 'panel-toggle-btn'
    toggle.setAttribute('aria-label', '패널 열기')
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>'
    toggle.hidden = true
    wrap.style.position = 'relative'
    wrap.appendChild(toggle)
    toggle.addEventListener('click', () => {
      panel.classList.remove('hidden')
      toggle.hidden = true
    })
    const observer = new MutationObserver(() => {
      toggle.hidden = !panel.classList.contains('hidden')
    })
    observer.observe(panel, { attributes: true, attributeFilter: ['class'] })
  })
}

function initSearchBtn() {
  document.getElementById('search-btn')?.addEventListener('click', () => {
    const addr = document.getElementById('search-address')?.value?.trim()
    showToast(addr ? `"${addr}" 검색 중…` : '검색어를 입력해 주세요.')
  })
  document.getElementById('land-search-btn')?.addEventListener('click', () => {
    const bon = document.getElementById('land-bon')?.value?.trim()
    const bu = document.getElementById('land-bu')?.value?.trim()
    showToast(bon || bu ? `본번 ${bon || '-'} 부번 ${bu || '-'} 검색 중…` : '본번·부번을 입력해 주세요.')
  })
}

function initPagination() {
  document.querySelectorAll('.pagination-wrap').forEach((wrap) => {
    const text = wrap.querySelector('.pagination-text')
    const total = parseInt(wrap.dataset.paginationTotal, 10) || 16
    const match = text?.textContent?.match(/(\d+)\s*\/\s*\d+/)
    let page = match ? parseInt(match[1], 10) : 1
    function update() {
      if (text) text.textContent = `${page} / ${total}`
    }
    wrap.querySelectorAll('[data-pagination]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.pagination
        if (action === 'first') page = 1
        else if (action === 'prev' && page > 1) page--
        else if (action === 'next' && page < total) page++
        else if (action === 'last') page = total
        update()
      })
    })
  })
}

function initLayerTree() {
  document.querySelectorAll('.layer-tree-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const branch = btn.closest('.layer-tree-branch')
      if (!branch) return
      const expanded = btn.getAttribute('aria-expanded') !== 'true'
      branch.classList.toggle('collapsed', !expanded)
      btn.setAttribute('aria-expanded', expanded)
    })
  })
  document.querySelectorAll('.layer-tree-header .btn-secondary').forEach((btn) => {
    if (btn.querySelector('.fa-angles-down')) {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.layer-tree-branch').forEach((b) => {
          b.classList.remove('collapsed')
          const t = b.querySelector('.layer-tree-toggle')
          if (t) t.setAttribute('aria-expanded', 'true')
        })
        showToast('레이어를 모두 열었습니다.')
      })
    }
  })
}

function initMiscButtons() {
  document.querySelectorAll('.panel-left-header .btn-secondary:first-of-type').forEach((btn) => {
    if (btn.textContent?.includes('초기화')) {
      btn.addEventListener('click', () => showToast('초기화되었습니다.'))
    }
  })
}

function showToast(message) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.setAttribute('role', 'status')
  el.textContent = message
  document.body.appendChild(el)
  requestAnimationFrame(() => el.classList.add('toast-visible'))
  setTimeout(() => {
    el.classList.remove('toast-visible')
    setTimeout(() => el.remove(), 300)
  }, 2500)
}

function initDemoModal() {
  document.getElementById('btn-open-demo-modal')?.addEventListener('click', () => {
    openSecurityAgreementModal(() => showToast('동의 완료'))
  })
}

function initRangeOutput() {
  document.querySelectorAll('.input-range').forEach((input) => {
    const output = document.querySelector(`output.range-value[for="${input.id}"]`)
    if (!output) return
    const unit = input.id === 'ex-range' ? ' m' : ' %'
    const update = () => { output.textContent = input.value + unit }
    update()
    input.addEventListener('input', update)
  })
}

function init() {
  initTheme()
  initNav()
  initToolPopovers()
  initMapControls()
  initPanelClose()
  initPanelToggle()
  initOverlay()
  initDataProvide()
  initThemeToggle()
  initTabs()
  initFloorTabs()
  initSearchBtn()
  initPagination()
  initDemoModal()
  initRangeOutput()
  initLayerTree()
  initMiscButtons()
  document.querySelector('.footer-help')?.addEventListener('click', () => {
    showToast('도움말 페이지는 준비 중입니다.')
  })
}

init()
