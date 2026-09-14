## LEFT JOIN에서는 ON과 WHERE의 위치가 의미를 바꾼다

`ON`은 오른쪽 행을 짝으로 인정할 조건이고, `WHERE`는 조인이 끝난 결과에서 남길 행을 다시 거르는 조건입니다. 특히 `LEFT JOIN`의 오른쪽 열 조건을 `WHERE`에 두면 미매칭 행의 NULL이 제거되어 사실상 `INNER JOIN`처럼 변할 수 있습니다.

```sql
-- Student: (1, 'Mina'), (2, 'Joon')
-- Enrollment: (1, 'active'), (1, 'done')
SELECT s.name, e.status
FROM Student AS s
LEFT JOIN Enrollment AS e
  ON e.student_id = s.id AND e.status = 'active';
-- Mina | active
-- Joon | NULL
```

위 질의는 active 수강만 짝으로 연결하면서도 Joon을 보존합니다. 다음처럼 `WHERE e.status = 'active'`로 옮기면 Joon의 NULL 행이 제거됩니다. 조인 전에 후보를 줄이는 것이 성능상 유리할 때도 있지만, 외부 행을 보존해야 하는지까지 함께 판단해야 합니다.

### 자주 틀리는 포인트

`ON`과 `WHERE`가 단순히 같은 조건을 다른 위치에 쓴 것이라고 생각하면 안 됩니다. 내부 조인에서는 결과가 같아 보이는 경우가 많지만, 외부 조인에서는 미매칭 행의 보존 여부가 달라집니다. 먼저 “짝을 만드는 조건”과 “최종 결과에서 제외할 조건”을 분리해 쓰세요.
