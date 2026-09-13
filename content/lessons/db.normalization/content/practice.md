## 분해와 복원 가능성

`Enrollment(student_id, course_id, student_name, course_name, grade)`는 등록 사실과 학생·과목 설명을 한 행에 섞습니다. Student와 Course를 별도 테이블로 만들고 Enrollment에는 키와 grade를 남기면 이름 변경은 한 곳에서 일어나고 등록 행은 반복되지 않습니다.

분해한 테이블은 JOIN으로 원래 필요한 정보를 복원할 수 있어야 합니다(lossless join). 너무 많이 분해하면 질의가 복잡해지고 JOIN 비용이 늘 수 있으므로, 읽기 패턴과 무결성 요구를 고려해 정규화와 성능 사이의 절충을 판단합니다.
