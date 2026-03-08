/**
 * 드롭다운/팝오버 (그리기 도형 선택 등)
 */
export function bindDropdown(triggerSelector, panelSelector, options = {}) {
  const { onClose } = options
  const trigger = document.querySelector(triggerSelector)
  const panel = document.querySelector(panelSelector)
  if (!trigger || !panel) return

  const open = () => {
    panel.hidden = false
    trigger.setAttribute('aria-expanded', 'true')
  }
  const close = () => {
    panel.hidden = true
    trigger.setAttribute('aria-expanded', 'false')
    if (typeof onClose === 'function') onClose()
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation()
    if (panel.hidden) open()
    else close()
  })

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !trigger.contains(e.target)) close()
  })
  return { open, close }
}

export function bindPopover(triggerEl, contentHtml, options = {}) {
  const { position = 'left' } = options
  let pop = null
  triggerEl.addEventListener('click', (e) => {
    e.stopPropagation()
    if (pop && pop.parentNode) {
      pop.remove()
      pop = null
      return
    }
    pop = document.createElement('div')
    pop.className = 'popover'
    pop.innerHTML = contentHtml
    const rect = triggerEl.getBoundingClientRect()
    pop.style.position = 'fixed'
    if (position === 'left') {
      pop.style.right = `${window.innerWidth - rect.left + 8}px`
      pop.style.top = `${rect.top}px`
    } else {
      pop.style.left = `${rect.right + 8}px`
      pop.style.top = `${rect.top}px`
    }
    document.body.appendChild(pop)
    document.addEventListener('click', function closePopover(ev) {
      if (!pop.contains(ev.target) && !triggerEl.contains(ev.target)) {
        pop.remove()
        pop = null
        document.removeEventListener('click', closePopover)
      }
    })
  })
}
