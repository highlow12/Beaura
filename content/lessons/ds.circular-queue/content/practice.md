## 경계 연산

enqueue는 다음 삽입 위치에 값을 쓰고 size를 하나 늘립니다. dequeue는 front의 값을 읽고 front를 (front + 1) % capacity로 이동한 뒤 size를 줄입니다.

고정 용량이므로 가득 찬 입력을 거부하거나 크기를 늘리는 정책도 명시해야 합니다.
