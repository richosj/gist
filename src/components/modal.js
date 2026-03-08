/**
 * 모달 UI (보안각서 등) — 열기/닫기, 백드롭
 */
export function createModal(options = {}) {
  const { id = 'app-modal', title = '', bodyHtml = '', onConfirm, confirmText = '확인', cancelText = '취소', showCancel = true } = options
  const existing = document.getElementById(id)
  if (existing) existing.remove()

  const el = document.createElement('div')
  el.id = id
  el.className = 'modal-backdrop'
  el.setAttribute('role', 'dialog')
  el.setAttribute('aria-modal', 'true')
  el.innerHTML = `
    <div class="modal-box" role="document">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button type="button" class="modal-close-btn panel-left-close modal-close" aria-label="닫기"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
      <div class="modal-footer">
        ${showCancel ? `<button type="button" class="btn-secondary modal-cancel">${cancelText}</button>` : ''}
        <button type="button" class="btn-primary modal-confirm">${confirmText}</button>
      </div>
    </div>
  `

  const close = () => {
    el.remove()
    document.body.style.overflow = ''
  }

  el.querySelector('.modal-close')?.addEventListener('click', close)
  el.querySelector('.modal-cancel')?.addEventListener('click', close)
  el.querySelector('.modal-confirm')?.addEventListener('click', () => {
    if (typeof onConfirm === 'function') {
      const result = onConfirm()
      if (result !== false) close()
    } else {
      close()
    }
  })
  el.addEventListener('click', (e) => { if (e.target === el) close() })

  const onKey = (e) => {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey) }
  }
  document.addEventListener('keydown', onKey)

  document.body.style.overflow = 'hidden'
  document.body.appendChild(el)
  return { el, close }
}

/** 보안각서 및 약관 동의 모달 */
export function openSecurityAgreementModal(onAgree) {
  const bodyHtml = `
    <div class="alert-danger mb-3">
      <span class="alert-icon">!</span>
      <span>본 데이터는 국가공간정보 보안관리규정에 의거하여 제공되며, 허가받지 않은 무단 배포 및 상업적 이용을 엄격히 금지합니다.</span>
    </div>
    <div class="mb-3">
      <strong class="block mb-2">[보안 준수 서약]</strong>
      <div class="overflow-y-auto border rounded p-3 text-sm max-h-40 mb-3" style="border-color: var(--color-border); color: var(--color-text);">
        1. 본인은 제공받은 공간정보를 신청 당시의 목적 이외의 용도로 사용하지 않겠습니다.<br>
        2. 본인은 제공받은 자료를 타인에게 양도하거나 대여하지 않겠습니다.<br>
        3. 본인은 자료의 분실 또는 도난 시 즉시 관리 기관에 신고하겠습니다.
      </div>
      <label class="checkbox-wrap">
        <input type="checkbox" id="agree-check" />
        <span>위 보안 규정을 모두 확인하였으며 이에 동의합니다.</span>
      </label>
    </div>
  `
  createModal({
    id: 'security-agreement-modal',
    title: '🔒 보안각서 및 약관 동의',
    bodyHtml,
    confirmText: '동의 후 다운로드',
    cancelText: '취소',
    onConfirm() {
      const checked = document.getElementById('agree-check')?.checked
      if (!checked) return false
      if (typeof onAgree === 'function') onAgree()
    },
  })
}
