# Beaura (배우라)

짧은 설명과 9종 문제, 개인 복습 일정으로 컴퓨터과학을 익히는 **오프라인 우선 학습 앱 베타**입니다. Svelte 5 + SvelteKit 정적 SPA이며 계정이나 서버 없이 동작합니다.

👉 **[GitHub Pages에서 바로 실행하기](https://highlow12.github.io/Beaura/)**

## 실행

Node.js 24를 사용합니다.

```bash
npm ci
npm run dev
```

브라우저에서 `http://localhost:5173`을 엽니다. 프로덕션 동작은 `npm run build && npm run preview`로 확인합니다. PWA는 HTTPS 또는 localhost에서 한 번 온라인으로 열고 오프라인 자료 준비를 마친 뒤 사용할 수 있습니다.

## 구현 범위

- 홈: 이어 학습하기, 복습 대기 문제, 오늘 목표와 경험치.
- 학습 경로: Python·컴퓨터 구조·이산수학에서 시작해, 선행 레슨을 완료하면 다음 트랙과 레슨이 열리는 DAG.
- 레슨: 설명과 문제를 순서대로 진행하고 저장된 단계부터 이어하기.
- 문제: 단일 선택, 복수 선택, 빈칸, 순서, 연결, 코드 출력, 제한된 코드 완성.
- CS 상호작용 문제: 그래프 경로 구성, 결정적 상태 전이 시뮬레이션.
- 첫 오답에는 정답을 숨기고 한 번 재시도. 최종 제출 후 설명과 정답 표시.
- Dexie 트랜잭션 기반 학습 기록, 중복 제출 방지, 완료 상태 보존.
- ts-fsrs 복습 일정, 복습 세션, 경험치·로컬 날짜 연속 학습.
- 진행도, 일일 목표, JSON 백업·복원, 기록 초기화.
- 명시적 동의 뒤에만 동작하는 Sentry 전역 브라우저/SvelteKit 오류 자동 집계, 로컬 진단과 GitHub 기반 수동 문제 신고.
- 빌드 시 안전하게 변환한 Markdown, 전체 학습 자료 오프라인 캐시, 학습을 방해하지 않는 업데이트 적용.
- Capacitor Android/iOS 소스 프로젝트와 CI.
- 하트 데이터와 정책 구현은 보존하지만, 베타 테스트 중에는 차감과 UI를 비활성화.

학습 데이터는 브라우저/기기별로 분리됩니다. 다른 기기로 옮길 때 설정에서 백업을 다운로드하고 복원하세요. 서버 동기화는 제공하지 않습니다.

## 학습 콘텐츠

15개 활성 트랙, 236개 레슨, 1,190개 문제를 제공합니다. 모든 레슨은 최소 설명 블록 3개와 문제 5개라는 콘텐츠 품질 게이트를 통과해야 빌드됩니다.

| 영역        | 트랙                                                     |
| ----------- | -------------------------------------------------------- |
| 프로그래밍  | Python 기초, 프로그래밍 언어와 컴파일러, 소프트웨어 공학 |
| CS 핵심     | 자료구조, 알고리즘, 계산이론, 데이터베이스               |
| 시스템      | 컴퓨터 구조, 운영체제, 네트워크                          |
| 수학        | 이산수학, 선형대수, 미적분, 확률과 통계                  |
| 시각 컴퓨팅 | 컴퓨터 그래픽스                                          |

Python·컴퓨터 구조·이산수학에서 시작하고, 완료한 레슨에 따라 관련 트랙이 단계적으로 열립니다. 예를 들어 Python과 이산수학은 자료구조·알고리즘·계산이론으로, 컴퓨터 구조는 운영체제·네트워크·그래픽스로 이어집니다. 영구 ID 호환을 위한 빈 `computer-systems` 트랙은 데이터에만 남아 있으며 학습 화면에는 표시되지 않습니다.

## 오류 보고

모든 화면 하단의 `문제 신고`에서 증상을 적고 GitHub Issue를 만들 수 있습니다. 최근 자동 진단 정보가 함께 첨부되며 학습 답안과 학습 기록은 포함하지 않습니다. Sentry 오류 자동 보고는 첫 방문 동의 뒤에만 활성화되며 설정에서 언제든지 철회할 수 있습니다. 자세한 수집·국외 이전·보유 기간은 [개인정보 처리방침](https://highlow12.github.io/Beaura/privacy)과 [docs/ERROR_REPORTING.md](docs/ERROR_REPORTING.md)를 참고하세요.

## 주요 명령

```bash
npm run content:validate  # YAML, ID, 참조, 정답, DAG 검증
npm run content:quality   # 설명·문제 최소 수 품질 게이트
npm run content:build     # 작성 원본 → 정적 JSON과 정제된 HTML
npm run check            # Svelte·TypeScript·콘텐츠 검사
npm test                 # 도메인·콘텐츠·오프라인 캐시 테스트
npm run build            # build/ 정적 웹 배포 산출물
npm run verify           # 콘텐츠 품질, 전체 검증과 빌드
npm run mobile:sync      # 웹 빌드 + Android/iOS 동기화
npm run mobile:android   # Android Studio로 열기
npm run mobile:ios       # Xcode로 열기 (macOS)
```

정적 호스팅에서는 `build/`를 게시하고 앱 경로의 fallback을 `index.html`로 설정합니다. 네이티브 서명 빌드에는 별도로 Android SDK/JDK 또는 macOS/Xcode와 개발자 서명 설정이 필요합니다. 현재 환경에서는 네이티브 소스 생성·동기화까지만 검증합니다.

## 구조

```text
content/        YAML/Markdown 작성 원본
scripts/content 콘텐츠 검증·변환
src/lib/content 정적 콘텐츠 repository
src/lib/questions 순수 evaluator, host, renderer registry 및 9종 입력 UI
src/lib/learning 진행도 모델, FSRS adapter, 게임화 정책
src/lib/storage Dexie와 learningRepository
src/lib/curriculum 선행 조건 정책
src/routes/     홈·학습·복습·진행도·설정
android/, ios/  Capacitor 네이티브 소스
```

새 레슨은 `content/lessons/<id>/lesson.yaml`, `content/*.md`, `questions/*.yaml`로 작성하고 curriculum graph에 등록합니다. 앱은 generated JSON만 읽습니다. ID는 재사용하지 않고 의미·정답 변경 시 revision을 증가시킵니다.

상위 구조는 [SYSTEM_SPEC.md](SYSTEM_SPEC.md), 작성 규칙은 [CONTENT_SPEC.md](CONTENT_SPEC.md), 문제 계약은 [QUESTION_SPEC.md](QUESTION_SPEC.md), 저장·복습 정책은 [PROGRESS_SPEC.md](PROGRESS_SPEC.md)를 참고하세요. 검증 범위와 실제 기기 점검은 [docs/TESTING.md](docs/TESTING.md), 현재 완료 상태는 [IMPLEMENTATION.md](IMPLEMENTATION.md)에 기록합니다.

## 라이선스

이 저장소는 코드와 교육자료에 서로 다른 라이선스를 적용합니다.

- 소프트웨어 코드, 빌드 스크립트, 설정, 프로젝트 문서와 자체 UI 자산: [GNU GPL v3.0 only](LICENSE-CODE)
- `content/`의 커리큘럼·레슨·문제와 `static/generated/`에 생성된 사본: [CC BY-SA 4.0](LICENSE-CONTENT)

교육자료를 공유하거나 수정해 배포할 때는 **Beaura contributors**를 저작자로 표시하고, 원본 저장소 링크와 CC BY-SA 4.0 라이선스를 함께 제공하며, 수정 사실을 밝히고 동일하거나 호환되는 라이선스로 배포해야 합니다. 파일에 별도 라이선스가 표시된 제3자 자료와 의존성은 해당 라이선스를 따릅니다. 자세한 적용 범위는 [LICENSE](LICENSE)를 참고하세요.
