## 호출마다 생기는 함수 안의 이름

함수를 호출하면 매개변수와 함수 안에서 만든 변수는 그 호출을 계산하는 데 사용됩니다. 같은 함수를 다른 값으로 다시 호출하면 매개변수도 새 값으로 시작합니다.

~~~python
def discount(price, amount):
    result = price - amount
    return result

first = discount(10, 2)
second = discount(20, 5)
~~~

첫 호출의 `price`와 두 번째 호출의 `price`는 서로 다른 호출의 입력입니다. 함수를 추적할 때는 호출마다 매개변수 값을 따로 적고, `return`이 어떤 값을 호출한 곳으로 돌려주는지 확인하세요.
