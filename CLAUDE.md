# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 구성

단일 Todo 앱을 두 개의 독립 빌드 단위로 나눈 모노레포다.

- `todofront/` — React 19 + Vite 6 + Tailwind 4 (JSX, JS only)
- `todoback/` — Spring Boot 3.4.5 / Java 17 / Gradle, JPA + MySQL
- `mysql/init/` — 컨테이너 최초 기동 시 실행되는 DB 초기화 SQL (테이블은 JPA가 생성)
- `docker-compose.yml` — 세 서비스(todoback / todofront / mysql)를 Docker Hub 이미지로 실행. 로컬 소스를 빌드하지 않고 `${*_IMAGE_NAME}:${*_IMAGE_TAG}`를 pull 한다.

## 자주 쓰는 명령어

프론트엔드 (`todofront/`):

```bash
npm install && npm run dev   # http://localhost:5173
```

```bash
npm run build                # dist/ 생성 (Docker 빌드도 동일 경로 사용)
```

백엔드 (`todoback/`):

```bash
./gradlew bootRun            # http://localhost:8080/api
```

```bash
./gradlew test               # 전체 테스트
```

```bash
./gradlew test --tests 'com.raptarior.todoback.service.TodoServiceTest.createAndUpdate'
```

전체 스택:

```bash
docker compose up -d --build
```

## 아키텍처

요청 흐름: 브라우저 → nginx(`todofront` 컨테이너, 80/443) → `/api/` 프록시 → `todoback:8080` → `TodoController` → `TodoService` → `TodoRepository`(JPA) → MySQL.

- 백엔드 API는 전부 `/api/todo` 아래에 있다. `/api`는 `application.yml`의 `server.servlet.context-path`이고, 컨트롤러 매핑은 `/todo`뿐이다.
- 엔티티는 `Todo` 하나뿐이며 PK 필드명은 `id`가 아니라 `no`다.
- DTO는 용도별로 3개이고 `ModelMapper`(`ModelMapperConfig`의 빈)로 변환한다. 필드를 추가할 때 어느 DTO에 넣을지가 곧 API 응답 범위가 된다.
  - `TodoMainResponse` — 목록/생성 응답(요약: content, priority, isDone, colorType, dday)
  - `TodoExpandResponse` — 행을 펼쳤을 때만 조회하는 상세(detail, createdTime, doneTime, ddayTime)
  - `TodoResponse` — 수정 모달용 전체 필드
- 프론트는 이 분할을 그대로 반영한다. `TodoPage`가 상태(`todos`)를 단독으로 소유하고, `TodoDetail`이 마운트될 때 `findTodoExpand`를 호출해 해당 행에 상세 필드를 머지한다. 하위 컴포넌트는 콜백만 받는다.
- API 호출은 `src/api/todoApi.js`에만 정의하고 컴포넌트에서 직접 axios를 쓰지 않는다(예외: `TodoItem`이 체크박스 debounce 갱신에 `updateTodo`를 직접 호출).
- 정렬(우선순위/D-Day/완료)은 서버가 아니라 `TodoPage`에서 클라이언트 정렬로 처리한다.

## 이 저장소에서 주의할 점

- **boolean 필드의 JSON 키**: 엔티티·DTO의 필드명은 `isDone`이지만 Lombok getter 때문에 직렬화 결과는 `done`이다. 프론트는 `todo.done`을 쓴다. boolean을 추가할 때 양쪽 이름이 어긋나기 쉽다.
- **`updateTodo`는 부분 수정이 아니다**: `TodoService.updateTodo`가 요청 DTO를 통째로 엔티티에 매핑해 `save`하므로, 요청에 빠진 필드는 null로 덮어써진다. `TodoModal`이 항상 전 필드를 채워 보내는 이유다.
- **axios baseURL이 하드코딩되어 있다**: `todofront/src/api/axios.js`의 `baseURL`이 `http://localhost:8080/api`이고 nginx 프록시용 `'/api'`는 주석 처리되어 있다. 배포 이미지를 빌드하기 전에 `'/api'`로 바꿔야 컨테이너에서 동작한다.
- **CORS 허용 오리진은 `WebMvcConfig`에 하드코딩**되어 있다(운영 도메인 + `http://localhost:5173`). 새 오리진은 여기에 추가한다.
- **테스트는 실제 MySQL이 필요하다**: `TodoServiceTest`는 `@SpringBootTest` + `test` 프로필이라 `localhost:3306/tododb`에 붙고 `ddl-auto: create`로 스키마를 재생성한다. 로컬 MySQL이 없으면 실패한다. 백엔드 Dockerfile은 `-x test`로 빌드한다.
- **`npm run lint`는 현재 실행되지 않는다**: `eslint.config.js`의 `no-unused-vars` severity가 `'warning'`(유효값은 `'warn'`)이라 ESLint가 설정 오류로 종료한다.
- 프론트 코드 스타일은 Prettier 설정(작은따옴표, JSX도 작은따옴표, 2칸 들여쓰기, 세미콜론)을 따른다.

## 프로필과 환경변수

- `application.yml`의 기본 활성 프로필은 `test`이며, 이 프로필은 로컬 MySQL 접속 정보가 파일에 그대로 적혀 있다.
- 운영은 `prod` 프로필: `MYSQLHOST`, `MYSQLPORT`, `MYSQL_DATABASE`, `MYSQLUSER`, `MYSQLPASSWORD` 환경변수를 읽고 `ddl-auto: update`로 동작한다. 컨테이너 실행 시 `SPRING_PROFILES_ACTIVE=prod`를 `.env`에 넣어야 한다.
- 루트 `.env`(git 제외)는 compose가 `env_file`로 주입한다. 필요한 키 목록은 `.env.example` 참고. `BACK_IMAGE_TAG` / `FRONT_IMAGE_TAG`는 배포 시 자동으로 치환된다.

## 배포

`main`에 push하면 `.github/workflows/deploy.yml`이 동작한다: 두 Dockerfile을 빌드해 커밋 SHA 앞 7자리 태그로 Docker Hub에 push → EC2에 SSH → `git reset --hard origin/main` 후 `.env`의 이미지 태그를 sed로 치환 → `docker compose pull && up -d`. 즉 서버의 배포 상태는 `main`과 `.env`의 태그 값이 결정하며, 서버에서는 소스를 빌드하지 않는다.
