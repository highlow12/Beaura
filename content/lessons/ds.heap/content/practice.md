## 힙의 비용

루트 확인은 배열 첫 칸을 읽으면 되어 O(1)입니다. 삽입과 루트 삭제는 트리 높이만큼 이동할 수 있어 O(log n)이고, 전체 원소를 정렬하는 데도 힙을 활용할 수 있습니다.

힙은 전체 순서를 유지하지 않고 최우선 원소만 보장한다는 점에서 BST와 다릅니다.

Python의 `heapq`는 리스트를 최소 힙으로 다루는 표준 모듈입니다. `import heapq`한 뒤 `heapq.heapify(values)`는 기존 리스트를 힙으로 바꾸고, `heapq.heappush(values, x)`는 x를 추가하며, `heapq.heappop(values)`는 가장 작은 값을 제거해 돌려줍니다. 예를 들어 `values = [5, 2, 8]`을 heapify하면 `values[0]`은 2입니다. 나머지 칸까지 정렬되었다는 뜻은 아닙니다.
