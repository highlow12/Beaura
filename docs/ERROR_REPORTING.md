# 베타 오류 보고

Beaura 베타는 기기 내 자동 진단, 사용자가 직접 보내는 문제 신고, 선택적 원격 오류 보고를 구분한다.

## Sentry 자동 집계

배포 빌드는 사용자가 첫 방문 동의 화면에서 명시적으로 허용한 경우에만 Sentry 브라우저 SDK를 초기화한다. 동의 전·거부 후에는 SDK를 초기화하지 않고 Sentry로 전송하지 않는다. 철회 시 현재 클라이언트를 닫고 이후 이벤트를 차단한다. 앱은 정적 SPA이므로 서버 훅이나 서버 런타임은 사용하지 않는다. Sentry의 브라우저 전역 오류 핸들러와 `src/hooks.client.ts`의 SvelteKit 오류 훅을 통해 각각 수집하며, 서비스 워커에서 same-origin `fetch`가 네트워크 오류로 실패하면 열린 앱 창으로 경로와 요청 종류만 전달해 Sentry에 명시적으로 예외를 기록한다.

동의 선택은 `cs-duolingo:telemetry-consent` 키로 이 기기에만 저장한다. 저장값은 허용/거부, 동의 버전, 선택 시각이며 계정·기기 식별자는 포함하지 않는다. 설정에서 상태를 확인하고 철회하거나 다시 허용할 수 있다. 법정대리인 동의를 확인하는 절차가 없으므로 만 14세 미만 이용자는 원격 오류 보고를 허용할 수 없다.

Sentry DSN은 브라우저에 공개되는 프로젝트 식별자이므로 기본값이 앱 번들에 포함되어 있다. 배포 환경에서 바꾸려면 빌드 시 `PUBLIC_SENTRY_DSN`을 지정한다. `PUBLIC_SENTRY_ENABLED=false` 또는 `0`으로 끌 수 있으며, 동의가 없으면 이 값과 무관하게 비활성화된다. `PUBLIC_SENTRY_ENVIRONMENT`와 `PUBLIC_BUILD_COMMIT`으로 환경·릴리스를 지정할 수 있다.

Sentry 전송 이벤트는 오류 메시지와 stack trace, query를 제외한 화면 경로, 앱 버전·환경과 SDK가 생성하는 기술 정보만을 최소 범위로 허용한다. 서비스 워커 네트워크 오류 역시 query 없이 pathname과 `asset`/`navigation` 구분만 사용한다. Sentry 서비스가 전송 과정에서 접속 IP 등 기술 정보를 처리할 가능성도 있으므로 이를 정책에 고지한다. 개인정보 보호를 위해 사용자 식별자, 쿠키, 요청 헤더, query parameter, 요청·응답 body, 브라우저 breadcrumb, 세션 이벤트, 성능 tracing은 수집하지 않는다. `beforeSend`에서 동의 상태를 다시 확인하고 `sanitizeSentryEvent`를 적용한다. 오류 메시지나 stack trace에 예기치 않은 문자열이 포함될 가능성까지 제거할 수는 없으므로 사용자가 개인정보나 답안을 입력하지 않도록 안내한다.

Sentry 보유 기간은 전송일로부터 30일로 고지한다. 운영자는 Sentry 프로젝트의 Data Retention 설정을 30일로 맞추고, 실제 설정·계약·하위 수탁자 변경을 정기적으로 확인해야 한다. 법적 보존이나 백업 등 서비스 정책상 예외가 있는지는 Sentry 정책을 확인해야 하며, 앱은 동의 철회만으로 이미 전송된 데이터를 삭제하지 않는다.

## 자동 진단 수집

브라우저의 전역 `error`, `unhandledrejection`, SvelteKit 클라이언트 오류와 서비스 워커가 감지한 same-origin 네트워크 `fetch` 실패를 잡아 최근 20건을 이 기기의 `localStorage`에 보관한다. 각 기록에는 다음 정보만 들어간다.

- 발생 시각
- 오류 종류와 메시지
- 가능한 경우 오류 stack trace
- 현재 화면 경로 또는 실패한 요청의 pathname
- 배포 커밋
- 브라우저 user agent

학습 답안, 학습 진행 DB, 백업 내용, 이름이나 계정 정보는 수집하지 않는다. 저장 공간을 사용할 수 없는 환경에서는 앱 동작을 방해하지 않고 진단 저장을 건너뛴다.

`PUBLIC_ERROR_REPORT_ENDPOINT`가 설정되어 있으면 기존 수집기로도 새 오류를 JSON POST로 같은 시점에 전송하지만, Sentry와 동일하게 명시적 오류 자동 보고 동의가 있을 때만 전송한다. 기본 설정에는 이 값이 없다. GitHub Pages 배포에서 이 수집기를 추가하려면 수탁자·국가·전송 시점·목적·보유 기간을 먼저 확인해 개인정보 처리방침을 갱신하고, Repository variable `ERROR_REPORT_ENDPOINT` 값을 빌드 시 `PUBLIC_ERROR_REPORT_ENDPOINT`로 전달한다.

원격 수집 엔드포인트는 인증 비밀을 URL에 넣지 말고, 공개 클라이언트에서 호출되는 엔드포인트라는 전제로 CORS, rate limit, 30일 이하의 보존 기간을 설정해야 한다.

## 배포 전 개인정보 점검

- [ ] 개인정보 처리방침의 운영자·문의 경로가 실제 운영 주체와 일치하는지 확인한다.
- [ ] Sentry 프로젝트의 저장 위치와 하위 수탁자 목록을 확인한다.
- [ ] Sentry Data Retention을 30일로 설정하고, 설정 화면을 보관한다.
- [ ] Sentry에서 사용자 식별자, 쿠키, breadcrumb, replay, tracing이 비활성화되어 있는지 확인한다.
- [ ] Sentry에 이미 전송된 이벤트를 삭제·열람할 담당자와 요청 절차를 확인한다.
- [ ] `PUBLIC_ERROR_REPORT_ENDPOINT`를 사용한다면 해당 수집기의 국외 이전·보유 기간을 처리방침에 추가한다.
- [ ] 만 14세 미만 이용자에게 원격 오류 보고를 허용하지 않는 안내가 유지되는지 확인한다.

## 수동 문제 신고

모든 화면 하단의 `문제 신고`를 누르면 앱 안에서 증상을 적을 수 있다. 이어서 GitHub Issue 작성 화면을 열며 다음 내용이 미리 채워진다.

- 사용자가 작성한 문제 설명
- 재현 절차 입력란
- 최근 자동 진단 최대 5건의 발생 시각, 종류, 화면 경로, 빌드, 메시지

사용자는 GitHub에 제출하기 전에 전체 내용을 확인하고 수정할 수 있다. 신고 창에서 이 기기에 저장된 진단 기록 전체를 지울 수도 있다.

## 원격 수집기 계약

엔드포인트는 `POST` 요청의 JSON body를 받는다.

```json
{
  "id": "uuid",
  "occurredAt": "2026-09-13T03:00:00.000Z",
  "kind": "error",
  "message": "example failure",
  "stack": "Error: ...",
  "path": "/learn/python-variables",
  "buildCommit": "...",
  "userAgent": "..."
}
```

`kind`는 `error`, `unhandledrejection`, `sveltekit`, `network` 중 하나다. 클라이언트는 전송 실패를 사용자 오류로 표시하지 않으며 로컬 기록은 유지한다.
