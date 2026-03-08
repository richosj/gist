import { icons } from '../../icons.js'

export function renderLayers3DPanel() {
  return `
    <div class="panel-left-header">
      <span class="panel-left-title">3차원 가시화</span>
      <div class="flex items-center gap-1">
        <button type="button" class="panel-left-close w-6 h-6 flex items-center justify-center" title="새로고침">${icons.refresh}</button>
        <button type="button" class="panel-left-close" data-panel-close aria-label="닫기">${icons.close}</button>
      </div>
    </div>
    <div class="panel-left-body">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-muted">402 건</span>
        <button type="button" class="btn-secondary btn-sm">모두열기 +</button>
      </div>
      <div class="layer-tree">
        <div class="layer-tree-item" style="pl-0;">
          <span class="toggle">▼</span>
          <input type="checkbox" id="ly-3d" checked />
          <label for="ly-3d">3D 지도</label>
        </div>
        <div class="layer-tree-item">
          <span class="toggle">▼</span>
          <input type="checkbox" id="ly-terrain" checked />
          <label for="ly-terrain">지형</label>
        </div>
        <div class="layer-tree-item" style="padding-left: 2rem;">
          <input type="checkbox" id="ly-aerial" checked />
          <label for="ly-aerial">항공영상</label>
        </div>
        <div class="layer-tree-item" style="padding-left: 2rem;">
          <input type="checkbox" id="ly-dem" />
          <label for="ly-dem">수치표고모델(DEM)</label>
        </div>
        <div class="layer-tree-item" style="padding-left: 2rem;">
          <input type="checkbox" id="ly-real" />
          <label for="ly-real">실감영상</label>
        </div>
        <div class="layer-tree-item">
          <span class="toggle">▼</span>
          <input type="checkbox" id="ly-building" checked />
          <label for="ly-building">건물 3D</label>
        </div>
        <div class="layer-tree-item" style="padding-left: 2rem;">
          <input type="checkbox" id="ly-vworld" />
          <label for="ly-vworld">브이월드 LOD3</label>
        </div>
        <div class="layer-tree-item" style="padding-left: 2rem;">
          <input type="checkbox" id="ly-gb3d" checked />
          <label for="ly-gb3d">경북3D모델 서비스</label>
        </div>
      </div>
    </div>
  `
}
