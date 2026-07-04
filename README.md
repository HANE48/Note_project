# 📓 NOTE_STUDIO (노트 스튜디오)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

> "코드에 버그가 없다면, 아직 충분히 복잡하지 않은 것이다."
> 코딩 테스트 및 알고리즘 문제 풀이 역량 강화를 위한 **개발자 맞춤형 오답노트 플랫폼**입니다.

<br/>

## 🎯 프로젝트 기획 배경
알고리즘 문제(백준, 프로그래머스 등)를 풀고 난 후, 흩어져 있는 오답 원인과 핵심 개념(Concept)을 한곳에 체계적으로 기록하고 복습하기 위해 기획되었습니다. 
일반적인 메모 앱과 달리, 개발자의 시각에 맞춘 IDE 감성의 코드 뷰어와 트렌디한 UI/UX를 제공합니다.

<br/>

## 🛠 Tech Stack
### Frontend
- **React.js** (Functional Components, Hooks)
- **React Router Dom** (SPA Routing)
- **Axios** (REST API Communication)
- **Vanilla CSS** (Custom Dark/Light Theme Design System)

### Backend
- **Java / Spring Boot** (RESTful API 기반 서버 구축)
- **MyBatis** (SQL Mapper를 활용한 유연한 쿼리 제어)
- **MySQL** (RDBMS를 통한 데이터 무결성 관리)
- **JavaMailSender** (SMTP 기반 이메일 인증 처리)
- **Bcrypt** (단방향 해시 알고리즘을 통한 패스워드 암호화)
- **Swagger UI** (API 명세 문서화 및 테스트 자동화)

<br/>

## ✨ 주요 기능 (Key Features)

### 1. 완벽한 다크/라이트 모드 테마 시스템
- 사용자의 눈 피로도를 덜어주는 다크모드와 깔끔한 라이트모드 실시간 전환.
- CSS Variable(`var()`)을 활용한 전역 테마 색상 제어.

### 2. 견고한 백엔드 아키텍처 및 REST API 설계
- **계층형 아키텍처 적용:** Controller, Service, Repository 계층을 명확히 분리하여 비즈니스 로직의 응집도를 높이고 유지보수성 향상.
- **RESTful API:** 직관적이고 일관성 있는 URI와 HTTP 메서드(GET, POST, PUT, DELETE)를 활용한 리소스 관리.

### 3. 보안을 강화한 사용자 인증 시스템
- **단방향 암호화:** `Bcrypt`를 적용해 사용자의 비밀번호를 DB에 안전하게 해싱하여 저장 (DB 탈취 시에도 보호).
- **이메일 인증 회원가입:** `JavaMailSender`를 활용해 가입 시 실제 동작하는 이메일 난수 발송 및 인증 로직 구현.
- **안전한 회원 관리:** 비밀번호 찾기(임시 비밀번호 발급) 및 회원 탈퇴(DB `CASCADE` 제약조건을 통한 하드 삭제) 기능.

### 4. 생산성 중심의 대시보드 및 맞춤형 오답노트
- 컨설팅 펌 스타일의 Conclusion-Led(결론 중심) UI/UX 설계.
- 로그인한 유저를 위한 환영 인사 및 잔디밭(활동 기록) UI 제공.
- 문제 번호, 핵심 개념(`concept`), 오답 원인, 코드를 세분화하여 기록.
- 실제 IDE 환경과 유사한 형광 연두색 포인트의 코드 스니펫 뷰어 제공.

<br/>

## 🖥 화면 구성 (Screen Previews)

| 메인 대시보드 (Dark) | 메인 대시보드 (Light) |
| :---: | :---: |
| <img width="843" height="683" alt="darkmode_main" src="https://github.com/user-attachments/assets/2146319f-c199-4a6b-9559-290532f67e54" />| <img width="850" height="680" alt="rightMode_main" src="https://github.com/user-attachments/assets/b5faa97d-77e0-4380-b462-cefbd674e89b" /> |
| **회원가입 & 이메일 인증** | **노트 작성 & 상세 보기** |
| <img width="849" height="677" alt="register" src="https://github.com/user-attachments/assets/7db5498e-8644-459f-b2bf-806723777bc1" /> | <img width="851" height="678" alt="detail" src="https://github.com/user-attachments/assets/e9f9f814-c60b-475e-8fb9-37b7c5469814" /> |

<br/>

## 📖 API 명세서 (RESTful API & Swagger UI)
RESTful 설계 원칙을 준수하여 직관적이고 일관성 있는 엔드포인트를 구성했습니다. 또한 프론트엔드와의 원활한 협업 및 API 테스트를 위해 **Swagger UI**를 적용하여 문서화했습니다.

### 👤 로그인 및 회원 관련 API (Users)
| 기능 분류 | Method | URI (Endpoint) | 설명 및 핵심 로직 |
| :--- | :---: | :--- | :--- |
| **로그인** | `POST` | `/api/users/login` | 입력받은 ID와 PWD가 DB 정보와 일치하는지 검증하고 인증 상태 부여 |
| **회원가입** | `POST` | `/api/users` | 새로 입력받은 유저 정보(ID, PWD, 닉네임)를 DB에 저장 |
| **내 정보 조회** | `GET` | `/api/users/{id}` | 마이페이지 진입 시, 해당 ID를 가진 유저의 정보(닉네임, 가입일 등) 로드 |
| **정보 수정** | `PUT` | `/api/users/{id}` | 닉네임, 비밀번호 등 해당 ID의 유저 데이터 업데이트 |
| **회원 탈퇴** | `DELETE` | `/api/users/{id}` | DB에서 해당 유저의 정보 및 작성한 오답 노트까지 완전히 삭제 |
| **비밀번호 변경**| `PUT` | `/api/users/change-pwd`| 기존 비밀번호와 새 비밀번호를 받아, 기존 정보 검증 통과 시 변경 처리 |

### 📓 오답 노트 관련 API (Notes)
| 기능 분류 | Method | URI (Endpoint) | 설명 및 핵심 로직 |
| :--- | :---: | :--- | :--- |
| **노트 등록** | `POST` | `/api/notes` | 문제 정보(플랫폼, 번호)와 피드백(틀린 이유, 해결 로직)을 DB에 신규 저장 |
| **목록 전체 조회**| `GET` | `/api/notes` | 로그인한 유저가 지금까지 작성한 모든 오답 노트의 요약 리스트 로드 |
| **노트 상세 조회**| `GET` | `/api/notes/{id}` | 리스트에서 특정 노트 클릭 시(모달/페이지), 상세 내용(틀린 이유 등)을 조회 |
| **노트 수정** | `PUT` | `/api/notes/{id}` | 이미 작성해 둔 특정 오답 노트의 내용을 수정해서 DB에 업데이트 |
| **노트 삭제** | `DELETE`| `/api/notes/{id}` | 더 이상 필요 없는 특정 오답 노트를 DB에서 삭제 처리 |

<br/>

<div align="center">
 <img width="850" alt="swagger_image" src="https://github.com/user-attachments/assets/9569e331-ee02-4e26-b194-2178bfe14972" />
</div>

<br/>

## 🗄 Database Schema (Core Tables)

### `users` (사용자 테이블)
| Column              | Type     | Description |
| ---                 | ---      | --- |
| `id`                | INT (PK) | 유저 고유 번호 |
| `login_id`          | VARCHAR  | 사용자 로그인 아이디 (Unique) |
| `password`          | VARCHAR  | Bcrypt로 암호화된 비밀번호 |
| `nickname`          | VARCHAR  | 화면 표시 이름 |
| `email`             | VARCHAR  | 인증된 이메일 |
| `email_auth_status` | CHAR(1)  | 이메일 인증 여부 (Y/N) |

### `problem_notes` (오답노트 테이블)
| Column         | Type     | Description |
| ---            | ---      | --- |
| `id`           | INT (PK) | 노트 고유 번호 |
| `user_id`      | INT (FK) | 작성자 (`ON DELETE CASCADE`) |
| `prob_number`  | VARCHAR  | 문제 번호 (ex. 1260) |
| `prob_title`   | VARCHAR  | 문제 제목 |
| `prob_type`    | VARCHAR  | 알고리즘 종류 (ex. DP, BFS) |
| `concept`      | TEXT     | **핵심 개념 / 문제 요구사항** |
| `wrong_reason` | TEXT     | 오답 원인 분석 |
| `my_code`      | TEXT     | 작성 및 리팩토링 코드 |

<br/>

## 🚀 트러블 슈팅 (Trouble Shooting)

<details>
<summary><b>1. [Backend] Spring Boot - React 연동 시 CORS 에러 해결</b></summary>
<div markdown="1">
  <br>
  - **문제:** 로컬 환경에서 React(Port 3000)가 Spring Boot(Port 8080)로 API를 요청할 때, 교차 출처 리소스 공유(CORS) 정책 위반으로 에러 발생.<br>
  - **해결:** Spring Boot의 `WebMvcConfigurer`를 구현하여 `addCorsMappings` 글로벌 설정을 추가. 프론트엔드 도메인을 허용하고 필요한 HTTP 메서드를 개방하여 안전하게 통신할 수 있도록 해결.
</div>
</details>

<details>
<summary><b>2. [Backend] MyBatis DB 매핑 불일치 (CamelCase vs Snake_Case) 이슈</b></summary>
<div markdown="1">
  <br>
  - **문제:** DB의 컬럼명은 `snake_case`(ex. `wrong_reason`)이고, Java DTO 필드명은 `camelCase`(ex. `wrongReason`)로 되어 있어 API 조회 시 해당 필드가 `null`로 반환되는 현상 발생.<br>
  - **해결:** 복잡한 ResultMap을 수동으로 작성하는 대신, `application.properties`에 `mybatis.configuration.map-underscore-to-camel-case=true` 옵션을 적용해 자동으로 매핑되도록 처리하여 코드 생산성과 가독성을 높임.
</div>
</details>

<details>
<summary><b>3. [Frontend] Axios 데이터 직렬화 및 404 에러 이슈</b></summary>
<div markdown="1">
  <br>
  - **문제:** API POST 요청 시 서버에서 데이터를 정상적으로 받지 못하고 404 에러 또는 데이터가 `[object Object]` 문자열로 전송되는 현상 발생.<br>
  - **해결:** 데이터를 JSON 형식으로 명확히 파싱하여 전송하도록 `axios.post(url, data)` 정석 문법으로 수정 및 헤더(`Content-Type`) 재설정으로 해결.
</div>
</details>

<details>
<summary><b>4. [Frontend] 상태 관리(State)를 통한 선언적 UI 제어 및 렌더링 최적화</b></summary>
<div markdown="1">
  <br>
  - **문제:** 초기 UI 제어 시 `document.getElementById` 등 DOM 직접 조작 안티 패턴을 사용했으며, 잦은 상태 변경으로 API가 재호출되는 렌더링 이슈 발생.<br>
  - **해결:** React의 `useState`를 활용해 이메일 인증 버튼 노출 등을 선언적으로 제어하도록 리팩토링하고, `useEffect`의 의존성 배열(`[]`)을 명확히 설정하여 불필요한 API 호출을 방지함.
</div>
</details>

---
*Created by [권우현/HANE48] | 2026*
