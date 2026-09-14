<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>개인정보 처리방침 | Beaura</title>
  <meta name="description" content="Beaura의 개인정보 처리방침과 오류 자동 보고 동의 안내" />
</svelte:head>

<article class="policy stack">
  <div class="page-heading">
    <span class="page-kicker">CS 듀오 / Privacy</span>
    <h1>개인정보 처리방침</h1>
    <p class="muted">시행일: 2026년 9월 13일 · 버전 1.0</p>
  </div>

  <section class="card stack">
    <h2>1. 기본 원칙</h2>
    <p>
      Beaura는 계정 없이 학습하는 오프라인 우선 앱입니다. 학습에 필요한 기록은 기본적으로 이
      브라우저 또는 기기에 저장하며, 학습 기록을 운영자 서버로 자동 전송하지 않습니다.
    </p>
    <p>
      오류 자동 보고는 선택 사항입니다. 첫 방문 시 별도로 동의를 요청하며, 동의하기 전에는 Sentry를
      초기화하거나 오류를 외부로 전송하지 않습니다. 거부해도 학습·복습·로컬 저장·수동 문제 신고를
      이용할 수 있고 불이익이 없습니다.
    </p>
  </section>

  <section class="card stack">
    <h2>2. 처리 주체와 문의</h2>
    <dl class="details">
      <div><dt>운영 주체</dt><dd>Beaura 프로젝트 운영자(highlow12)</dd></div>
      <div>
        <dt>일반 문의 및 권리 행사 안내</dt>
        <dd>
          <a href="https://github.com/highlow12/Beaura/issues" target="_blank" rel="noreferrer">GitHub Issues</a>
          에 문의해 주세요. 공개 게시판에 이름, 연락처, 오류 원문 등 개인정보를 적지 말고, 개인정보
          관련 요청이라는 사실만 남긴 뒤 운영자의 안내를 따라 주세요.
        </dd>
      </div>
      <div>
        <dt>Sentry에 이미 전송된 정보에 관한 요청</dt>
        <dd>
          <a href="https://sentry.io/contact/gdpr/" target="_blank" rel="noreferrer">Sentry 데이터 요청 양식</a>을
          이용할 수 있습니다. Sentry는 별도의 데이터 처리자 정책과 요청 절차를 운영합니다.
        </dd>
      </div>
    </dl>
  </section>

  <section class="card stack">
    <h2>3. 수집·저장 항목과 이용 목적</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>구분</th><th>항목</th><th>목적·저장 위치</th><th>보유 기간</th></tr></thead>
        <tbody>
          <tr>
            <th>학습 기록</th>
            <td>진행도, 문제 상태, 복습 일정, XP, 연속 학습, 앱 설정</td>
            <td>학습 흐름과 복습 제공 · 이 브라우저/기기의 IndexedDB</td>
            <td>사용자가 초기화하거나 브라우저/앱 데이터를 삭제할 때까지</td>
          </tr>
          <tr>
            <th>로컬 자동 진단</th>
            <td>오류 종류·메시지·가능한 stack trace, 화면 경로, 빌드 정보, 브라우저 user agent</td>
            <td>문제 확인을 위한 최근 진단 · 이 기기의 localStorage 최대 20건</td>
            <td>사용자가 지우거나 브라우저/앱 데이터를 삭제할 때까지</td>
          </tr>
          <tr>
            <th>오류 자동 보고</th>
            <td>동의 후의 오류 메시지·stack trace·쿼리를 제외한 화면 경로·앱 릴리스/환경 및 SDK가 생성하는 기술적 메타데이터. Sentry는 전송 과정에서 접속 IP 등 기술 정보를 처리할 수 있습니다.</td>
            <td>오류 재현·수정 · Sentry 전송</td>
            <td>전송일로부터 30일. 운영자는 Sentry 프로젝트의 보존 설정을 30일로 유지해야 합니다.</td>
          </tr>
          <tr>
            <th>동의 기록</th>
            <td>오류 자동 보고 허용/거부 선택, 선택 시각, 동의 버전</td>
            <td>동의 상태를 기억하고 철회 처리 · 이 기기의 localStorage</td>
            <td>사용자가 선택을 변경하거나 브라우저/앱 데이터를 삭제할 때까지</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="muted">
      오류 자동 보고에서는 사용자 식별자, 쿠키, 요청 헤더, URL query parameter, 요청·응답 본문,
      breadcrumb, 세션 재생과 성능 tracing을 수집하지 않도록 설정했습니다. 오류 메시지나 stack trace에
      애플리케이션이 우연히 포함한 문자열까지 완전히 예측할 수는 없으므로, 문제 설명·답안·개인정보를
      입력하지 말아 주세요.
    </p>
  </section>

  <section class="card stack">
    <h2>4. 국외 이전 및 외부 서비스</h2>
    <p>
      아래 전송은 오류 자동 보고에 동의한 동안 오류가 발생할 때만 일어납니다. 동의하지 않으면 Sentry
      전송이 없으며, 철회하면 이후 전송을 중지합니다. 이미 전송된 정보는 철회만으로 Sentry에서
      자동 삭제되지 않으므로 삭제 요청은 해당 서비스 절차를 이용해 주세요.
    </p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>수탁자·국가</th><th>이전 시점·방법</th><th>이전 목적</th><th>보유 기간</th></tr></thead>
        <tbody>
          <tr>
            <th>
              Functional Software, Inc. d/b/a Sentry 및 Sentry가 고지하는 계열사·하위 수탁자<br />
              미국, 독일 및 Sentry 정책에 따라 처리될 수 있는 캐나다·유럽 등
            </th>
            <td>동의 후 오류 발생 시 브라우저에서 DSN의 HTTPS 수집 주소로 자동 전송</td>
            <td>오류·장애 진단과 앱 안정성 개선</td>
            <td>전송 후 30일을 목표로 운영. Sentry 프로젝트 설정과 서비스 정책을 함께 확인하며, 법적 보존이 필요한 경우에는 예외가 있을 수 있습니다.</td>
          </tr>
          <tr>
            <th>GitHub, Inc. (미국)</th>
            <td>사용자가 문제 신고 내용을 확인한 뒤 GitHub 신고 계속하기를 직접 누를 때 HTTPS로 전송</td>
            <td>사용자가 선택한 문제 신고와 유지보수</td>
            <td>GitHub의 정책과 해당 Issue의 공개 상태에 따름. 자동 전송하지 않음</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="muted">
      현재 DSN은 <code>ingest.de.sentry.io</code>인 독일 수집 주소를 가리킵니다. Sentry는 저장 위치·계열사·하위
      수탁자에 관한 최신 정보를 변경할 수 있으므로, 자세한 내용은
      <a href="https://sentry.io/legal/dpa/" target="_blank" rel="noreferrer">Sentry DPA</a>와
      <a href="https://sentry.io/legal/subprocessors/" target="_blank" rel="noreferrer">하위 수탁자 목록</a>을
      함께 확인해 주세요.
    </p>
    <p class="muted">
      배포 환경에서 <code>PUBLIC_ERROR_REPORT_ENDPOINT</code>를 별도로 설정하는 경우에도 원격 자동 전송은
      같은 동의 뒤에만 동작합니다. 해당 수집기의 수탁자·국가·보유 기간을 확인해 이 방침을 먼저 갱신해야
      하며, 기본 설정에는 별도 수집기가 없습니다.
    </p>
  </section>

  <section class="card stack">
    <h2>5. 이용자의 권리와 행사 방법</h2>
    <ul>
      <li>개인정보의 열람, 정정, 삭제, 처리정지 등을 요청할 수 있습니다.</li>
      <li>이 기기의 학습 기록은 설정의 ‘학습 기록 초기화’에서 삭제할 수 있습니다.</li>
      <li>이 기기의 자동 진단은 문제 신고 창의 ‘진단 기록 지우기’로 삭제할 수 있습니다.</li>
      <li>오류 자동 보고 동의는 설정에서 언제든지 철회하거나 다시 허용할 수 있습니다.</li>
      <li>동의 거부와 철회는 학습 기능 이용에 불이익을 주지 않습니다.</li>
      <li>국외 수탁자에게 이미 전송된 데이터의 열람·삭제 등은 위 문의 경로 또는 Sentry 요청 양식을 이용해 주세요.</li>
    </ul>
  </section>

  <section class="card stack">
    <h2>6. 만 14세 미만 이용자</h2>
    <p>
      앱은 법정대리인 동의를 적법하게 확인할 별도 절차를 운영하지 않습니다. 따라서 만 14세 미만 이용자는
      오류 자동 보고를 허용할 수 없으며 로컬 진단만 사용할 수 있습니다. 이를 위해 이름·생년월일·법정대리인의
      연락처를 별도로 수집하지 않습니다.
    </p>
  </section>

  <section class="card stack">
    <h2>7. 안전성·변경 사항</h2>
    <p>
      전송 시 HTTPS를 사용하고, 오류 보고 설정에서 사용자 식별 정보와 불필요한 요청 데이터를 제거합니다.
      정적 호스팅 사업자가 자체적으로 처리하는 접속 로그는 해당 사업자의 정책이 적용되며, 앱은 그 로그를
      조회하거나 학습 기록과 결합하지 않습니다.
    </p>
    <p>
      법령, 서비스 구성 또는 수집 항목이 바뀌면 이 페이지의 버전과 시행일을 갱신하고, 필요한 경우 다시
      동의를 받겠습니다.
    </p>
  </section>

  <a class="text-link back-link" href={`${base}/settings`}>설정으로 돌아가기</a>
</article>

<style>
  .policy {
    max-width: 880px;
    margin: 0 auto;
  }

  .policy h2 {
    margin: 0;
    font-size: 1.15rem;
  }

  .policy p {
    margin: 0;
    line-height: 1.75;
  }

  .details {
    display: grid;
    gap: var(--space-3);
    margin: 0;
  }

  .details > div {
    display: grid;
    grid-template-columns: minmax(9rem, 0.35fr) 1fr;
    gap: var(--space-4);
  }

  dt {
    color: var(--muted);
    font-weight: 650;
  }

  dd {
    margin: 0;
    line-height: 1.65;
  }

  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    font-size: 0.9rem;
    line-height: 1.55;
  }

  th,
  td {
    border-bottom: 1px solid var(--border);
    padding: var(--space-3);
    text-align: left;
    vertical-align: top;
  }

  thead th {
    background: var(--surface-muted);
    color: var(--muted);
    font-size: 0.8rem;
    font-weight: 650;
  }

  tbody th {
    width: 20%;
    font-weight: 650;
  }

  .policy ul {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding-left: 1.25rem;
    line-height: 1.7;
  }

  code {
    overflow-wrap: anywhere;
  }

  a {
    color: var(--primary);
  }

  .back-link {
    align-self: flex-start;
  }

  @media (max-width: 640px) {
    .details > div {
      grid-template-columns: 1fr;
      gap: var(--space-1);
    }
  }
</style>
