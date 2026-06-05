# AWS S3 + CloudFront + GitHub Actions 프론트엔드 자동 배포

> AWS 프리티어를 활용한 React 앱 CI/CD 파이프라인 구축 실습 프로젝트

<br>

## 프로젝트 개요 및 흐름 

블로그 정리 글: [Day78 - S3, CloudFront, GitHub Actions를 이용한 프론트 배포](https://myblog73329.tistory.com/98)

<br>

## 사용 기술

| 분류 | 기술 |
|------|------|
| Frontend | React, Vite, Redux Toolkit |
| CI/CD | GitHub Actions |
| Infra | AWS S3, AWS CloudFront, AWS IAM |

<br>

## 아키텍처

```
GitHub (main push)
    ↓
GitHub Actions
    ├── npm install & build
    └── AWS 자격증명 (IAM Access Key)
         ↓
    S3 버킷 (정적 파일 업로드)
         ↓
    CloudFront (CDN 배포 + 캐시 무효화)
         ↓
    사용자 접근 (HTTPS)
```

<br>



<br>

## 트러블슈팅

| 문제 | 원인 | 해결 |
|------|------|------|
| Build 실패 | Node.js 18 → Vite가 20+ 요구 | `node-version: 20` 으로 변경 |
| S3 업로드 실패 | 빌드 결과물 경로 오류 (`build/` → `dist/`) | Vite 기본 출력 경로 `dist/`로 수정 |
| CloudFront AccessDenied | S3 버킷 정책 미적용 | OAC 정책 복사 후 S3 버킷 정책에 적용 |
| SPA 새로고침 404 | CloudFront 오류 페이지 미설정 | 403/404 → `/index.html` 200 응답 설정 |

<br>


## 디렉토리 구조

```
aws-s3-cloudfront-deploy/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions CI/CD 파이프라인
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── .gitignore
```
