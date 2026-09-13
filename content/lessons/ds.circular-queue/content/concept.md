## 인덱스와 상태

front는 현재 가장 먼저 꺼낼 원소의 위치이고 size는 저장된 원소 수입니다. size가 0이면 비어 있고 size가 capacity이면 가득 찬 상태입니다.

배열 자체의 모양만 보고 비어 있는 칸을 판단하면 wrap-around 상황에서 오류가 생길 수 있으므로 front와 size를 함께 보관합니다.
