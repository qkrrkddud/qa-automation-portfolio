# 🎭 Playwright E2E 자동화 테스트 포트폴리오

## 📌 프로젝트 개요
Playwright를 활용한 E2E 자동화 테스트 프로젝트입니다.
Page Object Model 패턴과 데이터 드리븐 테스트를 적용하여
유지보수성과 확장성을 고려한 테스트를 설계했습니다.

---

## 🛠 기술 스택
- **Language**: TypeScript
- **Framework**: Playwright
- **Pattern**: Page Object Model (POM)
- **CI**: GitHub Actions (예정)

---

## 📁 프로젝트 구조
tests/
├── e2e/
│   └── ohouse/
│       └── login.spec.ts        # 오늘의집 QA 환경 로그인 테스트
└── saucedemo/
├── pages/                   # Page Object Model 클래스
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   └── auth.setup.ts        # 로그인 상태 저장 (storageState)
├── tests/
│   ├── login.spec.ts        # 로그인 테스트
│   ├── inventory.spec.ts    # 상품 목록 & 정렬 테스트
│   ├── cart.spec.ts         # 장바구니 테스트
│   ├── checkout.spec.ts     # 결제 테스트
│   └── e2e-purchase.spec.ts # E2E 구매 플로우 테스트
└── test-data/
└── users.json           # 데이터 드리븐 테스트 데이터

---

## 🧪 테스트 시나리오

### 1. 로그인 테스트 (`login.spec.ts`)
| 시나리오 | 설명 |
|---------|------|
| 정상 로그인 | 정상 계정으로 로그인 후 inventory 페이지 이동 확인 |
| 잠긴 계정 | locked_out_user 접근 시 에러 메시지 확인 |
| 잘못된 비밀번호 | 에러 메시지 노출 확인 |
| 빈 필드 | Username is required 메시지 확인 |
| 데이터 드리븐 | 6가지 계정 시나리오 자동 순환 검증 |

### 2. 상품 목록 & 정렬 테스트 (`inventory.spec.ts`)
| 시나리오 | 설명 |
|---------|------|
| 상품 수량 확인 | 전체 상품 6개 표시 확인 |
| 가격 오름차순 | 정렬 후 실제 가격 배열 순서 검증 |
| 가격 내림차순 | 정렬 후 실제 가격 배열 순서 검증 |
| 이름 A-Z | 알파벳 순서 검증 |
| 이름 Z-A | 역순 검증 |
| 장바구니 추가/삭제 | 뱃지 숫자 증가 및 삭제 확인 |

### 3. 장바구니 테스트 (`cart.spec.ts`)
| 시나리오 | 설명 |
|---------|------|
| 상품 추가 확인 | 추가 후 장바구니 상품 존재 확인 |
| 상품 삭제 | 삭제 후 0개 확인 |
| 다중 상품 | 3개 추가 후 수량 확인 |
| 빈 장바구니 | 계속 쇼핑 버튼 동작 확인 |

### 4. 결제 테스트 (`checkout.spec.ts`)
| 시나리오 | 설명 |
|---------|------|
| 정상 결제 | 배송 정보 입력 후 결제 요약 페이지 이동 확인 |
| 이름 미입력 | First Name is required 에러 확인 |
| 성 미입력 | Last Name is required 에러 확인 |
| 우편번호 미입력 | Postal Code is required 에러 확인 |

### 5. E2E 구매 플로우 (`e2e-purchase.spec.ts`)
| 시나리오 | 설명 |
|---------|------|
| 전체 구매 플로우 | 상품 선택 → 장바구니 → 결제 → 주문 완료 |

---

## ✨ 주요 구현 포인트

- **Page Object Model**: 셀렉터와 액션을 page 클래스로 분리하여 유지보수성 향상
- **storageState**: 로그인 상태를 저장하여 테스트마다 재로그인 불필요
- **데이터 드리븐**: users.json으로 다양한 계정 시나리오를 효율적으로 커버
- **실패 시 자동 수집**: 스크린샷, 영상, 트레이스 자동 저장

---

## 🚀 실행 방법

```bash
# 패키지 설치
npm install

# Playwright 브라우저 설치
npx playwright install

# setup 실행 (최초 1회)
npx playwright test --project=saucedemo-setup

# 전체 테스트 실행
npx playwright test --project=saucedemo

# 특정 파일만 실행
npx playwright test --project=saucedemo login.spec.ts

# HTML 리포트 확인
npx playwright show-report
```