## 힙으로 구현하기

우선순위 큐는 힙의 루트에서 최우선 항목을 보고 제거할 수 있습니다. Python heapq에서는 (priority, value) 튜플을 넣으면 priority가 먼저 비교됩니다.

우선순위가 같은 항목을 어떤 순서로 처리할지도 필요하면 sequence 번호를 함께 저장해 안정성을 보장합니다.

예를 들어 `(2, "normal")`과 `(1, "urgent")`는 우선순위 숫자가 첫 칸인 튜플입니다. Python에서 `min`은 튜플의 첫 칸부터 비교하므로 `min([(2, "normal"), (1, "urgent")])`는 `(1, "urgent")`를 고릅니다. `heapq.heappop(queue)`는 최소 힙의 첫 항목을 제거해 돌려줍니다. 힙을 사용하려면 먼저 `import heapq`하고 큐가 힙 규칙을 만족하도록 준비해야 합니다.
