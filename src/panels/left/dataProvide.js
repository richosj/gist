import { icons } from '../../icons.js'
import { openSecurityAgreementModal } from '../../components/modal.js'

const SAMPLE_DATA = [
  { id: 1, name: '연속지적도 (SHP)', size: '1.2GB', date: '2023.10.15', canDownload: true },
  { id: 2, name: '건물 데이터 (법정동)', size: '450MB', date: '2023.09.20', canDownload: true },
  { id: 3, name: '토지이용계획 (DXF)', size: '890MB', date: '2023.11.01', canDownload: false },
  { id: 4, name: '인구밀도 통계 (CSV)', size: '120MB', date: '2023.08.15', canDownload: false },
]

export function renderDataProvidePanel() {
  const items = SAMPLE_DATA.map((d) => `
    <div class="data-list-item" data-id="${d.id}">
      <span class="data-list-item-title">${d.name}</span>
      <span class="data-list-item-meta">${d.size} · ${d.date}</span>
      ${d.canDownload
        ? `<button type="button" class="btn-primary btn-sm btn-block btn-download-secure" data-id="${d.id}">다운로드 (보안서약)</button>`
        : `<button type="button" class="btn-secondary btn-sm btn-block">자료 요청하기</button>`
      }
    </div>
  `).join('')

  return `
    <div class="panel-left-header">
      <span class="panel-left-title">주제도 자료제공</span>
      <div class="panel-header-actions">
        <button type="button" class="btn-secondary btn-sm">초기화</button>
        <button type="button" class="panel-left-close" data-panel-close aria-label="닫기">×</button>
      </div>
    </div>
    <div class="panel-left-body">
      <p class="panel-intro">
        공공데이터 요청 및 다운로드<br>
        데이터를 사용하려면 먼저 [자료요청]을 진행해 주세요. 관리자 승인 후 다운로드가 활성화됩니다.
      </p>
      <div class="data-list">
        ${items}
      </div>
    </div>
  `
}

export function bindDataProvidePanel(container) {
  if (!container) return
  container.querySelectorAll('.btn-download-secure').forEach((btn) => {
    btn.addEventListener('click', () => {
      openSecurityAgreementModal(() => {
        console.log('동의 후 다운로드:', btn.dataset.id)
      })
    })
  })
  container.querySelectorAll('[data-panel-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = container.closest('.panel-left')
      if (panel) panel.classList.add('hidden')
    })
  })
}
