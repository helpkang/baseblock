# file shareing

## file chunk
[] stream 기반으로 만들기


## 파일 송신

### 전체 파일 -> 부분으로 나눈다 -> 부분을 해쉬한다.
파일 사이즈를 어떻게 나눌지 정해야 
블록을 파일로 나누고 hash값과 블록 번호를 조합해서 만든다.



### 해쉬한 정보를 별도의 파일로 저장한다.

### 서버에 register 한다.

### 해쉬 블럭 요청을 하면 해쉬 파일 정보를 전송한다
블록은 나누는 방법 필요함

### 파일 정보를 전송한다.
블록별로 파일 변경이 없는지 확인을 한다. 

## 파일 수신

### 서버에서 송신자 정보를 받는다.

### 송신자들 에게 해쉬 정보를 요청한다.

### 해쉬 정보를 통해서 파일 블럭을 요청한다.


