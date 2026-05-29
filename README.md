# NOTE_STUDIO (노트 스튜디오)

> "코드에 버그가 없다면, 아직 충분히 복잡하지 않은 것이다."
> 코딩 테스트 및 알고리즘 문제 풀이 역량 강화를 위한 "개발자 맞춤형 오답노트 플랫폼"입니다.

<br/>

##  프로젝트 기획 배경
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
- **Java / Spring Boot**
- **MyBatis**
- **MySQL** 
- **JavaMailSender** (Email Authentication)
- **Bcrypt**  (password 암호화)

<br/>

 주요 기능 (Key Features)

### 1. 완벽한 다크/라이트 모드 테마 시스템
- 사용자의 눈 피로도를 덜어주는 다크모드와 깔끔한 라이트모드 실시간 전환.
- CSS Variable(`var()`)을 활용한 전역 테마 색상 제어.

### 2. 보안을 강화한 사용자 인증 시스템
- **이메일 인증 회원가입:** 가입 시 실제 동작하는 이메일 난수 인증 로직 구현.
- **비밀번호 찾기:** 가입된 아이디와 이메일 검증 후 임시 비밀번호 발급.
- **안전한 회원 관리:** 개인정보 보호를 위한 비밀번호 재설정 및 회원 탈퇴(DB `CASCADE`를 통한 하드 삭제) 기능.

### 3. 생산성 중심의 대시보드 (Dashboard)
- 컨설팅 펌 스타일의 Conclusion-Led(결론 중심) UI/UX 설계.
- 로그인한 유저를 위한 환영 인사 및 잔디밭(활동 기록) UI 제공.
- 'TODAY'S REVIEW TASK'를 통한 직관적인 복습 목표 확인.

### 4. 개발자 맞춤형 오답노트 (Review Note)
- **노트 작성:** 문제 번호, 제목, 알고리즘 분류, 핵심 개념(`concept`), 오답 원인, 그리고 작성 코드를 세분화하여 기록.
- **상세 보기:** 실제 IDE 환경과 유사한 형광 연두색 포인트의 코드 스니펫 뷰어 제공.
- 직관적인 호버(Hover) 애니메이션이 적용된 리스트 UI.

<br/>

## 화면 구성 (Screen Previews)

| 메인 대시보드 (Dark) | 메인 대시보드 (Light) |
| :---: | :---: |
|   <img width="843" height="683" alt="darkmode_main" src="https://github.com/user-attachments/assets/2146319f-c199-4a6b-9559-290532f67e54" />| <img width="850" height="680" alt="rightMode_main" src="https://github.com/user-attachments/assets/b5faa97d-77e0-4380-b462-cefbd674e89b" /> |
| **회원가입 & 이메일 인증** | **노트 작성 & 상세 보기** |
| <img width="849" height="677" alt="register" src="https://github.com/user-attachments/assets/7db5498e-8644-459f-b2bf-806723777bc1" /> | <img width="851" height="678" alt="detail" src="https://github.com/user-attachments/assets/e9f9f814-c60b-475e-8fb9-37b7c5469814" /> |


<br/>

## 🗄 Database Schema (Core Tables)

### `users` (사용자 테이블)
| Column              | Type     | Description |
| ---                 | ---      | --- |
| `id`                | INT (PK) | 유저 고유 번호 |
| `login_id`          | VARCHAR  | 사용자 로그인 아이디 |
| `password`          | VARCHAR  | 암호화된 비밀번호 |
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

## 트러블 슈팅 (Trouble Shooting)
- **Axios 404 에러 및 `[object Object]` 이슈:** API 요청 시 객체를 올바르게 직렬화하지 않아 발생한 문제를 `axios.post(url, data)` 정석 문법으로 해결.
- **컴포넌트 무한 렌더링(DDoS 효과) 방지:** `useEffect`의 의존성 배열(`[]`)을 정확히 설정하여 API 중복 호출 문제 최적화.
- **상태 관리(State)를 통한 UI 제어:** `document.getElementById` 등 안티 패턴을 배제하고, 리액트의 `useState`를 활용해 이메일 인증 버튼 노출 여부 등을 선언적으로 제어.

---
*Created by [권우현/HANE48] | 2026*
