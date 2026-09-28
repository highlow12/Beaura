<script lang="ts">
  import { onMount } from "svelte";
  let online = $state(true);
  let offlineReady = $state(false);
  let update = $state<ServiceWorker | null>(null);
  let updating = $state(false);
  let checking = $state(false);
  let checkMessage = $state("");
  let registration: ServiceWorkerRegistration | undefined;
  onMount(() => {
    let disposed = false;
    const connection = () => {
      online = navigator.onLine;
    };
    connection();
    window.addEventListener("online", connection);
    window.addEventListener("offline", connection);
    const detect = () => {
      if (disposed) return;
      offlineReady = !!registration?.active;
      update = registration?.waiting ?? null;
      if (update) {
        checking = false;
        checkMessage = "";
      } else if (checking && !registration?.installing) {
        checking = false;
        checkMessage = "현재 최신 버전입니다.";
      }
    };
    const watch = () => {
      registration?.installing?.addEventListener("statechange", detect);
      detect();
    };
    const controller = () => {
      if (updating) window.location.reload();
      else detect();
    };
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", controller);
      void navigator.serviceWorker.ready.then((r) => {
        if (disposed) return;
        registration = r;
        detect();
        r.addEventListener("updatefound", watch);
        watch();
      });
    }
    return () => {
      disposed = true;
      window.removeEventListener("online", connection);
      window.removeEventListener("offline", connection);
      registration?.removeEventListener("updatefound", watch);
      navigator.serviceWorker?.removeEventListener(
        "controllerchange",
        controller,
      );
    };
  });
  async function checkForUpdate() {
    if (checking) return;
    checkMessage = "";
    if (!navigator.onLine) {
      checkMessage = "인터넷에 연결한 뒤 확인해 주세요.";
      return;
    }
    if (!registration) {
      checkMessage = "앱 업데이트를 확인할 수 없습니다.";
      return;
    }
    checking = true;
    try {
      await registration.update();
      if (registration.waiting) {
        update = registration.waiting;
        checking = false;
      } else if (!registration.installing) {
        checking = false;
        checkMessage = "현재 최신 버전입니다.";
      }
    } catch {
      checking = false;
      checkMessage = "새 버전을 확인하지 못했습니다. 다시 시도해 주세요.";
    }
  }
  function refresh() {
    if (!update) return;
    updating = true;
    update.postMessage({ type: "ACTIVATE_UPDATE" });
  }
</script>

<div class="connection" role="status">
  <span
    >{!online
      ? "오프라인 학습 중"
      : offlineReady
        ? "오프라인 학습 준비 완료"
        : "기기에서 바로 학습"}</span
  ><button onclick={checkForUpdate} disabled={checking || updating}
    >{checking ? "확인 중…" : "새 버전 확인"}</button
  >{#if update}<span>새 버전이 있어요.</span><button
      onclick={refresh}
      disabled={updating}>{updating ? "새로 여는 중…" : "버전 업데이트"}</button
    >{:else if checkMessage}<span>{checkMessage}</span>{/if}
</div>

<style>
  .connection {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.8rem;
  }

  .connection::before {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--success);
    content: "";
  }

  .connection button {
    min-height: 44px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--primary-soft);
    color: var(--primary-strong);
    padding: 0.5rem 0.75rem;
    font-weight: 650;
  }

  .connection button:hover {
    border-color: var(--primary);
  }
</style>
