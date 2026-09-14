## 빈 그룹을 결과에 남길지 결정하기

집계 결과의 행 수는 어떤 테이블을 기준으로 삼는지에 따라 달라집니다. 모든 점포를 보여 주면서 판매가 없는 점포도 `0`으로 표시하려면 점포를 왼쪽에 둔 `LEFT JOIN`과 오른쪽 키에 대한 `COUNT`를 함께 사용해야 합니다.

```sql
-- Store: ('A'), ('B')
-- Sale:  ('A', 10), ('A', 5)
SELECT s.name, COUNT(sale.id) AS sale_count
FROM Store AS s
LEFT JOIN Sale AS sale ON sale.store_name = s.name
GROUP BY s.name;
-- A | 2
-- B | 0
```

왼쪽 행이 보존되면서 B에도 NULL로 채워진 가상의 오른쪽 행이 생깁니다. 그래서 `COUNT(*)`를 쓰면 B를 한 행으로 세어 `1`이 될 수 있고, 실제 판매 행의 키인 `COUNT(sale.id)`는 NULL을 세지 않아 `0`을 얻습니다. 빈 그룹을 보여 주는 것과 실제 사실이 있는 그룹만 보여 주는 것은 서로 다른 제품 요구사항입니다.

### 자주 틀리는 포인트

`LEFT JOIN`을 썼다고 해서 모든 집계가 자동으로 빈 그룹을 올바르게 세는 것은 아닙니다. `COUNT(*)`와 `COUNT(column)`의 대상이 무엇인지, 조인으로 행이 몇 개로 늘어났는지 먼저 확인해야 합니다. 조인 뒤 `SUM`을 계산할 때도 일대다 중복이 합계를 부풀리지 않는지 살펴보세요.
