# 인덱스와 원소를 함께 순회하기

enumerate(values)는 반복할 때 (인덱스, 원소) 쌍을 차례로 제공합니다. 직접 range(len(values))를 만들지 않아도 위치와 값을 함께 사용할 수 있습니다.

보통 for index, value in enumerate(values):처럼 두 변수에 언패킹해 읽습니다. 인덱스는 기본적으로 0에서 시작합니다.
