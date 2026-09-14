## 재시도 가능한 트랜잭션을 설계하기

네트워크가 끊긴 순간에는 클라이언트가 commit 결과를 받았는지 알 수 없을 수 있습니다. 응답이 없다고 같은 결제를 무조건 다시 실행하면 첫 번째 트랜잭션이 이미 성공한 경우 중복 청구가 됩니다. 요청마다 idempotency key를 저장하고 유일성 제약을 두면 재시도를 안전하게 판별할 수 있습니다.

```sql
CREATE TABLE TransferRequest (
  request_id TEXT PRIMARY KEY,
  from_account INTEGER NOT NULL,
  to_account INTEGER NOT NULL,
  amount INTEGER NOT NULL
);

BEGIN;
INSERT INTO TransferRequest VALUES ('req-42', 1, 2, 100);
-- 같은 req-42의 재시도는 PRIMARY KEY 충돌로 중복 실행을 막음
UPDATE Account SET balance = balance - 100 WHERE id = 1;
UPDATE Account SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

트랜잭션은 DB 안의 원자성을 보장하지만, commit 뒤 이메일을 보내거나 외부 결제 API를 호출하는 것까지 자동으로 되돌리지는 않습니다. 외부 부작용은 outbox에 기록한 뒤 별도 작업으로 전달하는 식으로 DB 경계와 재시도 규칙을 나눠야 합니다. 그만큼 중복 방지 상태를 저장·정리하는 비용이 생깁니다.

### 자주 틀리는 포인트

타임아웃이 곧 rollback을 뜻하지는 않습니다. 서버는 commit했지만 응답만 유실됐을 수 있으므로, 실패를 단순 재실행하지 말고 요청 ID와 결과 조회 경로를 준비해야 합니다. 반대로 `request_id`만 저장하고 실제 계좌 변경과 다른 트랜잭션으로 처리하면 원자성이 다시 깨집니다.
