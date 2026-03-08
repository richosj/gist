# GitHub Pages 배포 방법

이 프로젝트는 [GitHub - richosj/gist](https://github.com/richosj/gist) 저장소 기준으로 **GitHub Pages**에 배포됩니다.

## 1. 저장소에서 Pages 설정 (최초 1회)

1. GitHub에서 **richosj/gist** 저장소로 이동
2. **Settings** → 왼쪽 메뉴 **Pages**
3. **Build and deployment**에서:
   - **Source**: `GitHub Actions` 선택

이렇게 하면 `main` 브랜치에 푸시할 때마다 자동으로 빌드 후 배포됩니다.

## 2. 배포 주소

설정이 끝나면 다음 주소에서 확인할 수 있습니다.

- **https://richosj.github.io/gist/**

(첫 배포 후 1~2분 정도 걸릴 수 있습니다.)

## 3. 로컬에서 확인

- **개발**: `npm run dev` 후 브라우저에서 **http://localhost:5173/gist/** 로 접속
- **빌드**: `npm run build` → `dist` 폴더가 생성되며, 이 내용이 GitHub Actions에서 그대로 Pages로 배포됩니다.

## 4. 배포 흐름

- `main` 브랜치에 `git push` 하면 `.github/workflows/deploy.yml`이 실행됩니다.
- **Build** → `npm run build`로 `dist` 생성  
- **Deploy** → `dist` 내용을 GitHub Pages 환경에 배포

문제가 있으면 저장소 **Actions** 탭에서 워크플로 실행 로그를 확인하면 됩니다.
