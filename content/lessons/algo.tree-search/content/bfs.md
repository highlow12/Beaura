## 너비 우선 탐색: 가까운 레벨부터 확인하기

BFS는 큐에서 노드를 꺼내 목표와 비교하고, 다르면 자식을 큐 뒤에 넣습니다. 아래 예시는 노드 이름이 값이고 `children`이 왼쪽부터 자식을 저장합니다. `deque`는 큐로 쓰는 Python 자료형입니다. `popleft()`는 맨 앞을 꺼내고 `extend()`는 여러 자식을 뒤에 추가합니다.

```python
from collections import deque
children = {"A": ["B", "C"], "B": ["D"], "C": [], "D": []}
queue = deque(["A"])
while queue:
    node = queue.popleft()
    if node == "C":
        print(node)
        break
    queue.extend(children[node])
```

큐가 비면 더 확인할 노드가 없습니다. 목표를 찾으면 `break`로 반복을 끝냅니다. BFS는 같은 값이 여러 곳에 있을 때 깊이가 가장 얕은 노드를 먼저 찾습니다. DFS가 항상 더 빠르거나 BFS가 항상 더 빠른 것은 아닙니다.

노드 n개를 가진 트리에서 목표가 없으면 두 방법 모두 전부 확인하므로 최악 시간은 **O(n)**입니다. 일찍 찾으면 확인한 노드만큼만 걸립니다. 결과 저장을 제외한 보조 공간은 재귀 DFS가 높이 h에 따라 **O(h)**, BFS가 최대 너비 w에 따라 **O(w)**입니다. 한 줄로 긴 트리는 DFS 호출 스택이, 넓게 퍼진 트리는 BFS 큐가 커집니다.
