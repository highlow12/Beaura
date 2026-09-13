# 베타 오류 보고

CS 듀오링고 베타는 자동 진단 수집과 사용자가 직접 보내는 문제 신고를 함께 사용한다.

## 자동 진단 수집

브라우저의 전역 `error`, `unhandledrejection`과 SvelteKit 클라이언트 오류를 잡아 최근 20건을 이 기기의 `localStorage`에 보관한다. 각 기록에는 다음 정보만 들어간다.

- 발생 시각
- 오류 종류와 메시지
- 가능한 경우 오류 stack trace
- 현재 화면 경로
- 배포 커밋
- 브라우저 user agent

학습 답안, 학습 진행 DB, 백업 내용, 이름이나 계정 정보는 수집하지 않는다. 저장 공간을 사용할 수 없는 환경에서는 앱 동작을 방해하지 않고 진단 저장을 건너뛴다.

`PUBLIC_ERROR_REPORT_ENDPOINT`가 설정되어 있으면 새 오류를 JSON POST로 같은 시점에 전송한다. GitHub Pages 배포에서는 Repository variable `ERROR_REPORT_ENDPOINT` 값을 빌드 시 `PUBLIC_ERROR_REPORT_ENDPOINT`로 전달한다. 이 값이 비어 있으면 원격 전송만 비활성화되고 로컬 자동 수집과 수동 신고는 계속 동작한다.

원격 수집 엔드포인트는 인증 비밀을 URL에 넣지 말고, 공개 클라이언트에서 호출되는 엔드포인트라는 전제로 CORS, rate limit, 보존 기간을 설정해야 한다.

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

`kind`는 `error`, `unhandledrejection`, `sveltekit` 중 하나다. 클라이언트는 전송 실패를 사용자 오류로 표시하지 않으며 로컬 기록은 유지한다.
