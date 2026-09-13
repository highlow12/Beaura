## 종속을 찾아 분해하기

`Enrollment(student_id, course_id, student_name, course_name, grade)`에서 `student_id → student_name`, `course_id → course_name`, `(student_id, course_id) → grade`를 가정할 수 있습니다. 등록 키가 두 열의 조합인데 이름은 한 열만으로 결정되므로 모든 정보를 한 테이블에 두면 갱신 이상이 생기기 쉽습니다.

함수적 종속은 현재 데이터에서 우연히 관찰된 값이 아니라 도메인의 규칙이어야 합니다. 오늘의 샘플에서 두 학생이 같은 이름이라고 해서 name → id가 성립하는 것은 아닙니다. 설계자는 업무 규칙과 키 후보를 근거로 종속을 선언해야 합니다.
