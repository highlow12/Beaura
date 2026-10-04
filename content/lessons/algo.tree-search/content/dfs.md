## 깊이 우선 탐색: 먼저 한 경로로 내려가기

DFS는 한 자식의 하위 트리를 끝까지 확인한 뒤 다음 자식으로 이동합니다. 아래 함수는 현재 노드를 먼저 비교하고 왼쪽, 오른쪽 순으로 내려갑니다. 노드는 `value`, `left`, `right`를 가진 딕셔너리이고 빈 자식은 `None`입니다.

```python
def contains(node, target):
    if node is None:
        return False
    if node["value"] == target:
        return True
    if contains(node["left"], target):
        return True
    return contains(node["right"], target)
```

왼쪽에서 찾으면 `True`를 반환하여 오른쪽 탐색을 생략합니다. 왼쪽에서 못 찾았을 때만 오른쪽으로 갑니다. 두 하위 트리 모두 실패하면 최종 결과는 `False`입니다.

루트에서 자식 방향으로만 내려가는 정상적인 트리는 같은 노드를 다시 만나지 않으므로 별도의 방문 집합이 필요 없습니다. 부모 방향까지 따라가거나 일반 그래프로 확장하면 방문 기록을 고려해야 합니다.
