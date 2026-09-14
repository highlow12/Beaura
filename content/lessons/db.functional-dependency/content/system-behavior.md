## 속성 폐포로 후보 키를 판정하기

함수적 종속을 실제 설계에 적용할 때는 어떤 속성 집합으로 relation의 모든 열을 결정할 수 있는지 계산합니다. 이를 속성 폐포라고 하며, 모든 속성이 나오면 그 집합은 superkey입니다. 더 작은 부분집합으로도 같은 결과가 나오지 않을 때만 candidate key가 됩니다.

```text
Enrollment(student_id, course_id, student_name, course_name, grade)
student_id → student_name
course_id → course_name
(student_id, course_id) → grade
```

`{student_id, course_id}+`를 시작하면 이름·과목명·성적까지 얻어 모든 속성이 됩니다. 반면 `student_id+`에는 학생 이름만, `course_id+`에는 과목 이름만 추가되므로 둘 중 하나만으로는 전체 행을 결정할 수 없습니다. 따라서 이 규칙에서는 두 열의 조합이 최소 candidate key가 됩니다.

### 자주 틀리는 포인트

모든 속성을 결정하는 집합이라고 해서 곧바로 후보 키인 것은 아닙니다. 불필요한 열을 더한 superkey는 최소성이 없어 candidate key가 아닐 수 있습니다. 또 DBMS가 일반적인 함수적 종속을 자동으로 추론해 주는 것도 아니므로, 폐포 계산 결과를 기본 키·`UNIQUE`·분해 같은 명시적인 제약과 설계로 옮겨야 합니다.
