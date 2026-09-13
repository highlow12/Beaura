## import 방식과 이름 공간

from math import sqrt처럼 필요한 이름만 가져올 수도 있습니다. 이 방식은 호출이 짧지만 현재 파일에 어떤 이름이 들어왔는지 추적해야 합니다. import math 방식은 math.sqrt라는 출처가 코드에 남습니다.

모듈 이름을 별칭으로 바꾸는 import numpy as np 같은 문법도 있지만, 별칭은 팀에서 통용되는 규칙을 따르는 것이 좋습니다.
