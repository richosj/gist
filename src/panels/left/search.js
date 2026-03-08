import { icons } from '../../icons.js'

export function renderSearchPanel() {
  return `
    <div class="panel-left-header">
      <span class="panel-left-title">위치 검색</span>
      <button type="button" class="panel-left-close" data-panel-close aria-label="닫기">×</button>
    </div>
    <div class="panel-left-body">
      <div class="form-group">
        <div class="filter-row">
          <div class="filter-cell">
            <label class="form-label-sm" for="filter-sigungu">시군</label>
            <select class="select-native" id="filter-sigungu">
              <option value="">전체</option>
              <option>안동시</option>
              <option>영양군</option>
              <option>의성군</option>
              <option>포항시</option>
              <option>울진군</option>
            </select>
          </div>
          <div class="filter-cell">
            <label class="form-label-sm" for="filter-eupmyeondong">읍면동</label>
            <select class="select-native" id="filter-eupmyeondong">
              <option value="">전체</option>
            </select>
          </div>
          <div class="filter-cell">
            <label class="form-label-sm" for="filter-ri">리</label>
            <select class="select-native" id="filter-ri">
              <option value="">전체</option>
            </select>
          </div>
        </div>
        <div class="search-row">
          <input type="text" class="input-text" id="search-address" placeholder="주소 또는 장소 검색" />
          <button type="button" class="btn-primary btn-search" id="search-btn"><span class="icon">${icons.search}</span> 검색</button>
        </div>
      </div>
    </div>
  `
}
