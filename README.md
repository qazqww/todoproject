# Todo Project

할 일 목록을 관리할 수 있는 웹 프로젝트.

![메인 화면](https://private-user-images.githubusercontent.com/23431236/513713862-259647ca-88e6-4e45-8ec9-6272d8431607.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjMwMjA1NTcsIm5iZiI6MTc2MzAyMDI1NywicGF0aCI6Ii8yMzQzMTIzNi81MTM3MTM4NjItMjU5NjQ3Y2EtODhlNi00ZTQ1LThlYzktNjI3MmQ4NDMxNjA3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTEzVDA3NTA1N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ3MTY1YmFiMzIzZmI2M2IzMGVlNWIwMTczODgzZmJhNjJjOTNhMWE2MjM5YjQyZGFkZmVjZDcxMDNkNTMzMDMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.lN6ksK2_8yOHrVGrY5Q6qU8iDVLWRMC2MfNLhxr87MM)
![할 일 세부 조회](https://private-user-images.githubusercontent.com/23431236/513713861-4878866e-f03d-49f7-905a-66c14b587c21.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjMwMjA1NTcsIm5iZiI6MTc2MzAyMDI1NywicGF0aCI6Ii8yMzQzMTIzNi81MTM3MTM4NjEtNDg3ODg2NmUtZjAzZC00OWY3LTkwNWEtNjZjMTRiNTg3YzIxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTEzVDA3NTA1N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY1NmZiNDlkYWJhZWNjZGYzZTk3OTAyNGUwN2NmMmZmMjNhMjE3MDk5NjQxY2YzZjRmODllZjIxNDgzMzJkYTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.6cGZxrXfJ8NqvFI-KfeawPV9RBSMmB2V79ZaAPpIDXs)

### 프로젝트 목표
- 간단한 프로젝트를 만들며 개발 감각 익히기 (백엔드, 프론트엔드, CI/CD 등)
- javascript, react 배우고 활용하기

## 개발 언어/환경 및 선택 이유

**백엔드**

Java 17, Spring Boot

-> Spring Boot로 백엔드 서버의 초기 세팅이 용이하며, 익숙한 언어이기도 하고 생태계가 방대하여 처음 개발해보는 React에 맞춰서 충분히 대응할 수 있을거라 생각하였다.
<br>

**프론트엔드**

Javascript, React

-> 웹 전반적으로 널리 쓰이는 표준적인 언어이기 때문에 익혀보고자 선택하였다.
<br>

**DB**

H2, MySQL

-> Java에서 별도 세팅 없이 사용하기 쉬운 H2를 개발 초기에 사용하였다. 하지만 인메모리 데이터베이스이고 운영 단계에 걸맞는 안정성을 갖추진 않았기 때문에 이후 안정적이고 표준적이면서 개인 프로젝트에도 적합한 규모의 DB인 MySQL로 교체하였다.
<br>

**서버 배포 및 운영**

AWS EC2, Railway, nginx, Docker, docker-compose, Github, Github Actions

-> 사용 경험도 있고 방대한 인프라를 가진 AWS EC2를 사용하였지만, 비용 문제로 Railway로 교체하였다.

CI/CD같은 경우 이전에는 Jenkins를 사용했었지만 이런 툴을 처음 접해봤던 터라 사용이 어려웠던 기억이 있다. 그래서 비교적 쉬운 Github Actions를 사용해보기로 했다.
<br>

## 기능
- 할 일 생성, 목록 조회, 수정, 삭제
- 할 일의 세부 사항 조회
- 색상에 따른 할 일 구분
- 세부 항목을 기준으로 정렬
- 디데이 표시

---

## UI/UX 및 기능적으로 고민한 부분

**1. DTO 항목이 너무 많은데 분리하는게 좋을까?**

하나로 너무 크게 만들면 성능 이슈가 발생할 가능성이 커진다. 그렇다고 너무 나누면 코드가 복잡해져 유지보수가 어렵다.

=> 내가 선택한 방법 : 하나의 DTO를 Main DTO랑 Expand DTO로 구분

설명(TEXT)랑 날짜(DATETIME) 등 무겁고 당장 불필요한 부분은 세부 조회인 Expand DTO에서 불러오도록 설정하였다.

**2. dday 구성 관리에 대해**
   
처음엔 LocalDateTime 타입으로 하나로 묶어 관리하였다.

이후 사용자가 dday의 날짜만 필요한 경우를 고려하여 LocalDate와 LocalTime 두 항목으로 분리하였고

\[dday 비활성화, 날짜만 활성화, 날짜와 시간 모두 활성화\] 이 3가지 상태로 관리할 수 있도록 하였다.

- 이 3가지 상태를 어떻게 관리할 것인가?

LocalDate, LocalTime 값으로만 관리 vs 따로 enum 타입 만들기
  
값만 관리하면 dday를 관리할 때 메모리를 덜 차지한다.

반면에 enum 타입을 만들면 더 직관적으로 관리할 수 있고, 프론트엔드와 백엔드 간의 소통에 오해 여지를 줄일 수 있다.

=> 더 직관적인 코드 작성을 위해 enum 타입을 추가하기로 결정하였다.


**3. 할 일 추가 시 할 일 리스트를 다시 불러오는 게 좋을까?**

할 일이 추가된 상태의 할 일 리스트를 바로 불러오면 DB와 항상 일치하도록 유지할 수 있지만, 불러오는 데에 추가적으로 리소스 비용이 든다.

다른 사용자와 함께 사용하는 서비스의 경우엔 변경 사항이 생길 수 있으므로 다시 불러오는 게 맞지만

이 서비스는 개인에 맞춘 서비스이므로 그냥 추가만 하고 불러오지 않아도 될 것으로 판단하였다.

(물론 추가에 실패했다거나 하면 그에 맞는 대처는 필요)

## 프로젝트 회고
이번 프로젝트는 오랜만에 인프라까지 전체적으로 관리해본데다 프론트엔드도 새로 익혀서 개발하느라 기술적인 부분에서 많이 헤맸다. 그래서 규모에 비해 시간을 오래 잡아먹은 감이 있지만, 여러 시행착오를 겪은만큼 배운 것도 많았다. 시작이 반이라고, 앞으로는 더 수월하게 프로젝트를 진행하며 역량을 쌓아나갈 수 있을 것 같다.

다음 프로젝트는 Java/Spring과 DB를 다루는 데에 좀 더 중점을 두어 실제 서비스를 할 수 있을 정도로 완성도있는 프로젝트를 목표로 잡아 열심히 개발해봐야겠다.
