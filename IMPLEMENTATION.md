# 베타 구현 상태

SYSTEM_SPEC.md, CONTENT_SPEC.md, QUESTION_SPEC.md 기준의 오프라인 학습 앱 MVP를 구현했고, 현재는 실제 사용과 피드백을 받는 베타 단계다.

## 구현 완료

- 6개 트랙, 22개 레슨, 83개 문제와 선행 조건 DAG.
- 7종 입력 Renderer와 공통 Question Host, 첫 오답 재시도, 최종 결과 저장.
- Dexie 원자적 학습 이벤트·상태·Outbox 저장, 중복 방지와 세션 복구.
- ts-fsrs 5.4.2 복습 일정, 경험치·연속 학습·일일 목표.
- 레슨당 차감되는 하트 3개, 8시간 회복, 로컬 자정 초기화와 전역 하트 UI.
- 홈, 학습 경로, 레슨, 복습, 진행도, 설정 및 JSON 백업·복원.
- 빌드 시 정제된 Markdown HTML과 전체 학습 자료 오프라인 캐시.
- 사용자 선택으로 적용하는 서비스 워커 업데이트.
- Capacitor Android/iOS 소스 프로젝트 및 검증 CI.
- 전역 브라우저와 SvelteKit 오류 자동 진단, 최근 오류 로컬 보관, 선택적 원격 전송, GitHub 기반 수동 문제 신고.

## 검증

- `npm run verify`가 콘텐츠 검증, Svelte/TypeScript 검사, 테스트, 정적 프로덕션 빌드를 수행한다.
- Android/iOS 웹 자산 및 네이티브 프로젝트 동기화까지 검증한다.
- 실제 브라우저 UI, 모바일 터치, Android/iOS 서명 빌드와 실기기 검증은 베타 과정에서 계속 확인한다.

계정, 서버 동기화, 자유 코드 실행, 학부 전과정 콘텐츠는 현재 범위 밖이다. 오류 보고 구조는 `docs/ERROR_REPORTING.md`에 기록한다.
