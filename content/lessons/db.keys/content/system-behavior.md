## 키는 식별과 삭제 정책을 함께 결정한다

키 제약은 행을 찾는 이름만 정하는 것이 아니라, 중복과 부모 삭제가 자식 데이터에 미치는 동작까지 결정합니다. 예를 들어 수강 테이블의 학생·과목 조합을 기본 키로 만들면 같은 학생이 같은 과목에 두 번 등록되는 것을 DBMS가 거부할 수 있습니다.

```sql
CREATE TABLE Enrollment (
  student_id INTEGER,
  course_id INTEGER,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES Student(id)
    ON DELETE RESTRICT
);
```

`RESTRICT`에서는 수강 행이 남아 있는 학생을 삭제할 수 없습니다. 반대로 `ON DELETE CASCADE`를 선택하면 학생 삭제가 수강 행 삭제로 이어집니다. 전자는 실수로 이력을 지키는 데 유리하고, 후자는 소유 데이터가 함께 사라져도 되는 경우의 정리 비용을 줄입니다. 업무 규칙에 맞춰 선택해야 합니다.

### 자주 틀리는 포인트

외래 키는 “존재하는 부모를 가리키는가”를 보장할 뿐, 자식 행의 중복까지 막지는 않습니다. 중복 등록을 막으려면 이 예처럼 복합 기본 키나 별도의 `UNIQUE (student_id, course_id)`가 필요합니다. 기본 키를 단순한 검색용 인덱스로만 이해하면 이 무결성 의미를 놓치기 쉽습니다.
