## WHERE는 TRUE인 행만 남긴다

SQL의 조건식은 참·거짓만이 아니라 `UNKNOWN`도 만들 수 있습니다. 특히 `NULL`과 비교한 결과는 보통 `UNKNOWN`이므로, `WHERE`는 `TRUE`인 행만 결과에 남기고 `FALSE`와 `UNKNOWN`은 모두 버립니다.

```sql
-- Student(id, score)
-- (1, 90), (2, NULL), (3, 70)
SELECT id FROM Student WHERE score <> 80;
-- 1, 3

SELECT id FROM Student WHERE score IS NULL;
-- 2
```

`score = NULL`이나 `score <> NULL`은 원하는 비교가 아닙니다. 값이 없다는 사실을 찾으려면 `IS NULL` 또는 `IS NOT NULL`을 사용해야 합니다. 여러 조건을 섞을 때는 `AND`가 `OR`보다 먼저 계산되므로, 업무 규칙이 분명하도록 괄호를 쓰는 것이 안전합니다.

### 자주 틀리는 포인트

“80이 아닌 모든 점수”가 NULL 점수까지 포함한다고 생각하면 안 됩니다. NULL은 80과 같지도 다르지도 않은 미확정 상태입니다. NULL을 포함할지 제외할지는 질의마다 명시해야 하며, 애플리케이션에서 결과가 비어 있다는 사실을 곧 데이터가 없다는 뜻으로 해석해서도 안 됩니다.
