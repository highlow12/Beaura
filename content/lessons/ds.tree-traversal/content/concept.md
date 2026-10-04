## 재귀로 순서를 표현하기

재귀 함수는 각 하위 트리에 같은 규칙을 적용합니다. 빈 노드인 `None`을 만나면 반환하고, 노드가 있으면 약속된 위치에서 값을 기록합니다. 자식 호출이 끝나면 부모 호출로 돌아와 남은 작업을 수행합니다.

아래 코드에서 노드는 `value`, `left`, `right`를 가진 딕셔너리입니다. 자식이 없으면 `None`입니다. `result.append`는 값을 결과 리스트 끝에 추가합니다.

```python
result = []
def preorder(node):
    if node is None:
        return
    result.append(node["value"])
    preorder(node["left"])
    preorder(node["right"])
```

값을 기록하는 줄을 두 자식 호출 사이로 옮기면 중위 순회, 두 호출 뒤로 옮기면 후위 순회입니다. **현재 노드의 처리 위치**가 달라지는 것입니다.
