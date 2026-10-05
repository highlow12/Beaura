# 테스트 가치와 경계 조건 감사

감사일: 2026-10-05. 기준 커밋: `fb487d9` 이후의 답안 표시·진행도 리팩터링을 포함한 작업 상태.

전체 23개 테스트 파일을 대응 구현과 비교했다. 대부분은 저장 원자성, 채점, 복습 정책, 콘텐츠 변환처럼 실제 사용자 동작을 검증한다. 테스트 수 자체보다 **서로 다른 조건이 결합되는 경우**와 **실제 화면 실행 경로**의 누락이 문제다. 이번 감사는 정적 검토와 선택한 입력의 재현이며, 전체 mutation testing이나 브라우저 E2E 검증은 수행하지 않았다.

보완 후 `npm run verify` 통과: 23개 파일, 106개 테스트 통과·6개 하트 활성 정책 테스트 건너뜀, Svelte/TypeScript 오류·경고 0개, 콘텐츠 품질·구조 검사와 정적 빌드 성공. 콘텐츠의 문제 수 안내 2건, 큰 번들 청크 경고와 플러그인 실행 시간 안내는 남아 있다. 이 성공은 아래에 재현한 미해결 결함을 포함한 모든 입력의 정확성을 뜻하지 않는다.

## 파일별 판단

| 테스트 파일 | 유지 가치 | 빠진 조건 또는 검증의 한계 |
| --- | --- | --- |
| `learning/learning-repository.test.ts` | 높음: 원자성, 중복 제출, 복원, 세션 복구 | 독립 revision × 백업, 시계 역행, 같은 레슨의 오래된 세션 저장 |
| `learning/long-term-stability.test.ts` | 높음: 대량 복원과 DB 연결 간 sequence 보존 | 500문제는 모두 같은 시각에 한 번씩 학습한다. 장기간 반복 복습·날짜 변화·같은 레슨의 두 탭 충돌은 보장하지 않는다 |
| `learning/hearts.test.ts` | 현재 비활성 정책 검증은 유효 | 활성 정책 6개는 건너뛰므로 현재 검증 결과에 포함할 수 없다 |
| `learning/study-calendar.test.ts` | 유효: 실제 달력 기대값 | 같은 날짜의 주·월만 검사. 윤년, 연도 경계, 6주 월, 주 중간 날짜 부족 |
| `lesson/lesson-engine.test.ts` | 높음: 뒤로 가기와 지연 재시도 정책 | 중복 retry, 잘못된 retry ID, 완료 세션 입력. 일부 불변성 검사는 변경 함수를 호출하지 않아 가치가 낮다 |
| `integration/learning-flow.test.ts` | 높음: 실제 콘텐츠 → Host → 저장 → 복습 | 도메인 통합 테스트다. Svelte 화면 이벤트·버튼·비동기 경합을 검사하는 E2E가 아니다 |
| `application/dashboard-selection.test.ts` | 높음: 이어 학습할 레슨 정책 | 삭제된 레슨 기록, 날짜 동률, 여러 진행 중 레슨, 빈 카탈로그 |
| `application/review-queue.test.ts` | 높음: 제한된 문제 본문 로딩과 revision 검사 | ID·lessonId 불일치, 부분 fetch 실패, 제한값 0 |
| `application/review-candidates.test.ts` | 유효: due/revised/new 분기 | 정확한 due 시각, suspended·revision 변경의 우선순위 |
| `questions/host.test.ts` | 높음: 중복 제출, 저장 재시도, stale callback, 풀이 시간 | pause/resume과 중첩된 손상 질문. 전체 질문 `null` 검사만으로 내부 배열 손상을 막지 못한다 |
| `questions/registry.test.ts` | 높음: 독립적인 정답·오답 예제 | 잘못된 정답 ID 타입, 여러 코드 빈칸, 의미 있는 앞쪽 들여쓰기. 일부 테스트 이름이 실제 fixture보다 넓다 |
| `questions/presentation.test.ts` | 이번에 실사용 `contentLabel` 검사로 변경 | 기존 약 250줄은 현재 호출되지 않는 두 표시 API를 검증했다. 화면 피드백의 실제 클릭 동작은 여전히 별도 검증 필요 |
| `content/pipeline.test.ts` | 높음: 구조 검증, 생성 기본값, 안정 build ID | 경로·정렬 검사의 일부는 구현을 반복한다. 신규 입력의 builder/runtime 계약 일치, 실제 생성 파일 검증 부족 |
| `content/playable.test.ts` | 높음: 출고 문제 전체의 빌드·채점 연결 | 현재 저작 콘텐츠만 검사한다. canonical 답으로 평가하므로 오답 판별 정확성은 registry 테스트가 별도로 필요. 유형 수 7의 고정 기대값은 콘텐츠 구성과 결합돼 있다 |
| `content/advanced-question-validation.test.ts` | 높음: 경로·결정적 전이 규칙 | 잘못된 중첩 객체, runtime validator와 source validator의 계약 일치 |
| `content/markdown.test.ts` | 높음: HTML 정제, 외부 링크, 로컬 이미지 | 이미 변환된 공개 경로를 직접 넣어 검사하므로 source 경로 치환 오류는 못 잡는다 |
| `content/syntax-highlight.test.ts` | 높음: HTML escaping과 fallback | Markdown 하이라이트 검사와 일부 겹치지만 서로 다른 경계이므로 유지. 여러 줄 문자열은 추가 후보 |
| `curriculum/progress.test.ts` | 높음: 선행 조건, 트랙 노출, 스와이프와 저장소 실패 | in-progress 상태의 선행 조건 변화, 동일 order의 트랙 |
| `curriculum/dag-layout.test.ts` | 유효: 분기·합류·외부 선수조건·분리 노드 | 빈 트랙, 노드 겹침·경계. deterministic이라는 테스트는 두 번 실행한 결과를 비교하지 않는다 |
| `application-theme.test.ts` | 유효: 설정 저장과 이벤트 동기화 | 이번에 저장소 getter/write 실패 시 화면·이벤트 유지, 잘못된 이벤트 무시를 보완. OS 테마 변화의 실제 layout 연결은 미검증 |
| `error-reporting.test.ts` | 높음: 신고 링크, 개인정보 제거, 동의 기록 | 유효 JSON 내부의 손상 레코드, global error/SW 메시지 연결, 전송 실패와 보관 상한 |
| `sentry-consent.test.ts` | 높음: 초기화·전송 직전 동의 재검사 | SDK 자체는 mock. 실제 네트워크 전송, 복수 탭의 철회 반영, 초기화·close 실패는 미검증 |
| `offline/service-worker.test.ts` | 높음: 실제 worker를 캐시·네트워크 모형에서 실행 | 이번에 하위 경로, 이전 버전 업데이트·캐시 정리·일회성 migration·오류 메시지를 보완. 실제 브라우저 설치·할당량·대기 상태 전환은 미검증 |

같은 기능의 단위 테스트와 통합 테스트가 겹친다고 바로 삭제하지 않는다. 예를 들어 registry의 독립적인 정오답 예제는 채점 정확성을, playable 검사는 출고 콘텐츠의 계약 연결을, integration 검사는 저장과 복습의 연결을 각각 확인한다.

## 재현한 미해결 결함

아래는 테스트 부족의 추측이 아니라 현재 코드에서 재현한 결과다. 이번 작업에서는 제품 코드를 수정하지 않았다. 재현에 사용한 데이터는 임시 IndexedDB 또는 메모리 콘텐츠 bundle이며 저장소의 저작 콘텐츠는 바꾸지 않았다.

### 1. 높음: 독립 revision의 백업 복원에서 진행 답안 소실

- 위치: `src/lib/storage/repositories/learning-repository.ts:1724`, `:1762`, `:968`.
- 입력: 레슨 revision 1, 문제 revision 2 → 레슨 시작 → 첫 답 저장 → 백업 export/import → 같은 레슨 다시 시작.
- 기대: 레슨 revision 1과 기존 답안 1개 보존.
- 실제: 복원된 레슨 state revision이 문제 revision인 2가 된다. 기존 세션을 revision 불일치로 거절해 답안이 0개가 된다.
- 기존 독립 revision 검사와 백업 검사는 각각 있지만 둘을 결합한 입력이 없다. 수정 시 해당 조합을 영구 회귀 테스트로 추가해야 한다.

### 2. 높음: 같은 revision의 오래된 세션이 저장 답안을 덮어씀

- 위치: `learning-repository.ts:1015`, `:1034`; 실제 레슨 페이지의 세션 저장 경로와 연결된다.
- 입력: `stale = startLesson()` → `saveAttempt()` → `saveSession(stale)` → 레슨 재시작.
- 기대: 이미 원자적으로 저장한 답 보존 또는 오래된 저장 요청 거절.
- 실제: 답안 개수가 1에서 0으로 바뀐다.
- 현재 두 탭 검사는 서로 다른 review 이벤트의 sequence만 확인한다. 같은 레슨의 session 충돌을 검사하지 않는다. 이번 재현은 repository 호출 순서로 확인했으며 실제 브라우저 두 탭에서의 발생 빈도는 검증하지 않았다.

### 3. 중간: 시계 역행 후 연속 학습일 부풀림

- 위치: `learning-repository.ts:1158`.
- 입력: 서로 다른 문제를 로컬 날짜 1월 3일 → 4일 → 3일 → 4일에 학습.
- 기대: 실제 학습 날짜 2개에 해당하는 streak 2.
- 실제: streak가 1 → 2 → 2 → 3이 된다. 백업 복원 후에는 streak와 longestStreak가 3에서 2로 달라진다.
- 별도 입력으로 같은 문제의 복습 시계를 하루 되돌리면 FSRS가 `Invalid delta_t "-1"`을 던져 제출이 실패한다. 역행 시 복습 시각 처리 정책도 정해야 한다.

### 4. 중간: 손상된 중첩 질문이 오류 상태 대신 예외를 던짐

- 위치: `src/lib/questions/advanced-registry.ts:150`, `:231`, `:272`, `:379`.
- 입력: graph-path의 `nodes: null`, 정상 `acceptedPaths`; simulation의 `transitions: [null]`, 정상 `canonicalActionIds`.
- 기대: evaluator의 `invalid-question` 결과 또는 Host의 validation error 상태.
- 실제: `map` 또는 `fromStateId` 접근에서 TypeError. `createQuestionHost` 생성자도 예외를 던진다.
- 정상 출고 콘텐츠의 실패를 확인한 것은 아니다. 오류를 반환해야 하는 runtime 검증 경계가 손상 입력에서 깨진다.

### 5. 중간: 잘못된 정답 ID 배열을 정상 질문으로 수용

- 위치: `src/lib/questions/registry.ts:378`, `:442`.
- 입력: `correctOptionIds: ["a", 42]` 또는 `correctOrder: ["a", "b", 42]`.
- 기대: 문자열이 아닌 정답 ID를 포함하므로 `invalid-question`.
- 실제: multi-select는 정상 답 `['a']`를 오답으로 평가하고, ordering은 `['a','b']`를 정답으로 평가한다.
- builder는 이 타입을 거절하므로 현재 정상 출고 콘텐츠에 대한 영향은 제한적이다. runtime validator가 문자열만 필터링하고 원본 길이와 비교하지 않는 입력 누락이다.

### 6. 중간: builder가 잘못된 빈칸 placeholder를 통과시킴

- 위치: `scripts/content/model.ts:804`, `:856` 대 `registry.ts:637`.
- 입력: 유효한 code-completion template 뒤에 ` {{blank:BAD}}` 추가.
- 실제: source validation 오류 없음 → compile 성공 → runtime에서 `invalid-question`.
- 현재 playable 테스트는 기존 콘텐츠만 순회하므로 이 신규 저작 입력의 계약 불일치를 놓친다.

### 7. 중간: code block 언어 규칙이 builder와 runtime에서 다름

- 위치: `model.ts:424` 대 `registry.ts:180`.
- 입력: prompt의 `{ type: 'code', language: 'python3', code: 'print(1)' }`.
- 실제: builder는 숫자·하이픈을 허용해 검증·컴파일을 통과시키지만 runtime은 소문자 알파벳만 허용해 문제를 거절한다.
- 수정 전 명세의 언어 식별자 허용 범위를 결정하고 두 검증기의 계약을 맞춰야 한다.

### 8. 중간: title이 붙은 로컬 Markdown 이미지가 빌드에서 사라짐

- 위치: `model.ts:869`, `scripts/content/compiler.ts:44`, `scripts/content/markdown.ts:55`.
- 입력: 존재하는 asset을 참조하는 `![image](../../../assets/a.png "title")`.
- 기대: 공개 asset 경로로 변환되고 이미지와 title 보존.
- 실제: 검증은 통과하지만 title 때문에 정확한 문자열 치환이 실패하고 sanitizer가 상대 src 이미지를 제거한다. HTML은 `<p></p>\n`이 된다.
- Markdown 직접 테스트 대신 source → compiler → sanitized HTML을 연결한 테스트가 필요하다.

### 9. 중간: 유효 JSON 내부의 손상된 진단 레코드가 신고를 막음

- 위치: `src/lib/application/error-reporting.ts:52`, `:187`.
- 입력: localStorage의 `cs-duolingo:error-reports` 값이 `[null]` 또는 필수 필드 타입이 잘못된 배열.
- 기대: 잘못된 레코드를 무시하고 신고 링크 생성.
- 실제: 배열 여부만 검사해 `null`을 그대로 전달하고, 링크 생성 중 `buildCommit` 접근에서 TypeError.
- 기존 `{broken` 검사는 JSON 파싱 실패만 다루므로 유효 JSON의 내부 shape 손상을 놓친다.

## 이번 테스트 정리와 보완

- 미사용 답안 표시 API의 긴 fixture를 제거하고 실제 renderer의 접근성 레이블에 쓰는 `contentLabel`의 내용 선택·공백·빈 값 검증으로 교체했다.
- 서비스 워커의 기존 새 설치 검사에 실제 이전 버전 상태, 하위 경로, migration marker, 캐시 정리와 클라이언트 오류 알림을 추가했다.
- 테마 저장이 차단돼도 현재 화면과 이벤트는 적용되는지, 잘못된 이벤트 payload가 무시되는지 보완했다.
- 확인한 제품 결함을 `skip`이나 예상 실패 테스트로 숨기지 않았다. 현재 통과 테스트와 이 문서의 미해결 결함은 구분해서 읽어야 한다.

## 남은 검증의 우선순위

1. 답안 소실 두 사례부터 제품 수정과 실패→통과 회귀 테스트를 함께 진행한다.
2. 시계 역행의 streak·FSRS 정책, source/runtime 검증 계약, 이미지 경로 변환을 보완한다.
3. 실제 Svelte 화면에서 저장 중 연속 클릭, 라우트 변경, 레슨 재개, 복습 재시도, 진행도 정렬, 백업 파일 교체를 검사한다.
4. 실제 브라우저에서 PWA 업데이트·오프라인 재실행·할당량 실패와 모바일 입력을 확인한다.

실행 결과는 [검증 및 출시 점검](TESTING.md)의 명령으로 다시 확인할 수 있다. 하트 활성 정책의 건너뛴 6개 테스트와 브라우저·실기기 미검증을 통과 보장으로 표현하지 않는다.
