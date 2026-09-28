<script lang="ts">
  import { onMount } from 'svelte';
  import { locale, t } from '$lib/application/locale';
  const tr = (korean: string, english: string) => t(korean, english, $locale);
  let online=$state(true);
  let offlineReady=$state(false);
  let update=$state<ServiceWorker | null>(null);
  let updating=$state(false);
  onMount(()=>{
    let disposed=false;
    const connection=()=>{online=navigator.onLine;};connection();
    window.addEventListener('online',connection);window.addEventListener('offline',connection);
    let registration:ServiceWorkerRegistration|undefined;
    const detect=()=>{if(disposed)return;offlineReady=!!registration?.active;update=registration?.waiting??null;};
    const watch=()=>{registration?.installing?.addEventListener('statechange',detect);detect();};
    const controller=()=>{if(updating)window.location.reload();else detect();};
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange',controller);
      void navigator.serviceWorker.ready.then((r)=>{if(disposed)return;registration=r;detect();r.addEventListener('updatefound',watch);watch();});
    }
    return ()=>{disposed=true;window.removeEventListener('online',connection);window.removeEventListener('offline',connection);registration?.removeEventListener('updatefound',watch);navigator.serviceWorker?.removeEventListener('controllerchange',controller);};
  });
  function refresh(){if(!update)return;updating=true;update.postMessage({type:'ACTIVATE_UPDATE'});}
</script>
<div class="connection" role="status"><span>{!online ? tr('오프라인 학습 중', 'Learning offline') : offlineReady ? tr('오프라인 학습 준비 완료', 'Ready for offline learning') : tr('기기에서 바로 학습', 'Learn on this device')}</span>{#if update}<span>{tr('새 버전이 있어요.', 'An update is ready.')}</span><button onclick={refresh} disabled={updating}>{updating ? tr('새로 여는 중…', 'Reloading…') : tr('문제를 마친 뒤 새로고침', 'Refresh after this question')}</button>{/if}</div>
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
