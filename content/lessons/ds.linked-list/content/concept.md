## 끝과 빈 리스트

마지막 노드의 next는 더 이어지는 노드가 없다는 뜻의 None입니다. head가 None이면 리스트 자체가 비어 있습니다.

포인터를 이동할 때 current = current["next"]처럼 다음 참조를 사용하고, current가 None인지 먼저 확인하면 끝을 지나 읽는 오류를 막을 수 있습니다.
