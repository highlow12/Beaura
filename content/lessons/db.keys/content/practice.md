## 좋은 키의 조건

`Student(student_id, name)`과 `Enrollment(student_id, course_id)`가 있다면 Enrollment의 student_id는 Student를 참조하는 외래 키가 될 수 있습니다. Enrollment의 한 행은 학생과 과목의 조합으로 식별되므로 두 열을 함께 기본 키로 선택하는 복합 키도 가능합니다.

키는 단순히 빠른 검색을 위한 이름이 아닙니다. 유일성 제약은 중복 행을 막고, 외래 키 제약은 테이블 사이의 연결이 실제 데이터와 맞는지 보장합니다. 애플리케이션 검사만으로 대체하면 여러 클라이언트가 동시에 쓰는 순간 규칙이 깨질 수 있습니다.
