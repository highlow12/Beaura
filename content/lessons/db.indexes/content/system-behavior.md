## 복합 인덱스는 선두 열에서 시작한다

B-tree 복합 인덱스는 열을 사전순처럼 정렬합니다. 따라서 인덱스의 왼쪽 열을 먼저 좁힐 수 있는 질의와, 그 열로 시작하지 않는 질의는 활용 정도가 다릅니다.

```sql
CREATE INDEX orders_customer_created
  ON Orders(customer_id, created_at);

-- customer_id로 좁힌 뒤 날짜순으로 읽기 쉬운 질의
SELECT id, created_at
FROM Orders
WHERE customer_id = 7
ORDER BY created_at DESC;

-- customer_id 조건이 없어 선두 범위를 건너뛰는 질의
SELECT id FROM Orders WHERE created_at >= '2026-01-01';
```

두 번째 질의가 반드시 느리다는 뜻은 아니지만, 이 인덱스만으로 날짜 범위를 효율적으로 찾을 수 있다고 가정해서는 안 됩니다. DBMS는 통계와 결과 규모를 보고 인덱스를 선택하며, 인덱스에서 찾은 뒤 원본 행을 다시 읽는 비용까지 비교합니다. 필요한 열이 인덱스 안에 모두 있으면 이 table lookup을 줄일 수 있지만 저장 공간과 쓰기 갱신 비용은 커집니다.

### 자주 틀리는 포인트

인덱스를 만들었다고 해서 모든 질의가 빨라지거나 항상 인덱스만 사용되는 것은 아닙니다. 선택도가 낮거나 결과 대부분을 반환하면 전체 스캔이 더 쌀 수 있습니다. 실제 데이터에서 `EXPLAIN`과 실행 시간으로 확인하고, 복합 인덱스의 열 순서를 실제 WHERE·ORDER BY 패턴에 맞추세요.
