---
title: Verilog Basics
date: 2025-05-22
category: Verilog
author: VINI
---

## 시작하기에 앞서

- 강의  
  [반도체 설계 교육 센터](https://www.idec.or.kr/main/)에 올라와 있는 송재훈 강사님의 **Verilog HDL 언어 초급 및 설계 가이드라인** 강의를 듣고 작성한 필기노트입니다.

---

## Verilog HDL

- **HDL description**: 내가 작성한 코드  
- **library**: 각 게이트에 대한 라이브러리  
- **Constrain**: 해당 모듈이 실리콘에서 차지할 **Area**, **Timing**, **Power**, **Testability**

---

## Module

- Systems & Circuit/Logic Designs are represented as **module** unit in Verilog HDL  
- Module은 C에서 함수 정도의 위치  
- 각 Module끼리는 **Signal**로 연결됨

### Structure of Module

- **Name of a Module**
  - Start with letter or underscore
  - `$`, `_`, letter, digit 사용 가능

- **Comment**
  - `//` (한 줄), `/* */` (블록)

- **Module Interface**
  - in/out 방향 지정
  - `[3:0]`처럼 multibit 표현 가능
  - signal type (wire, reg) 지정

- **Module Body Styles**
  - **Structural Style**: 게이트 나열
  - **Dataflow Style**: input의 변화를 따라 output 묘사
  - **Behavioral Style**: 가장 자연어에 가까운 묘사 방식

---

## Signals

- **Verilog 시그널 값**
  - `0`, `1`, `X`, `Z`
    - `X` = 미정 상태
    - `Z` = 고임피던스

- **Signal 클래스**
  - **Net**: 소자 간 물리 연결
  - **Register**: 값 저장 가능 변수 (reg)

- **Signal Types**
  - `wire`: 단일 소스
  - `tri`: 복수 소스 가능, Z 상태 가능
  - `wand`, `wor`: 시뮬레이션용

- **Scalar & Vector**
  - Scalar: 단일 비트 (예: `clock`)
  - Vector: 복수 비트 (예: `[7:0]`)

- **External Signal**
  - `input`: 외부에서 읽기만 가능
  - `output`: 외부로 출력
  - `inout`: 양방향

---

## Module Instantiation

- Module은 **템플릿**, instance를 생성하여 사용
- 이름은 직접 정해야 함

### Port 연결 규칙

- **input**: internal은 net, external은 net/reg  
- **output**: internal은 reg/net, external은 net  
- **inout**: 둘 다 net  

### Port Mapping

- **Ordered list**: 순서 기반 연결  
- **Named list**: 이름 기반 연결  
- **Unconnected**: 사용하지 않는 포트는 생략 가능  

---

## Signal Transformation

### Operand Types

- **Constant**
  - Literal: `23`, `0.1`, `2'b01`
  - `parameter`, `define` 구분
    - `parameter`: 로컬
    - `define`: 글로벌

- Signal, Function Call

💡 **정수 상수 표현**  
예: `2'b01` → 2비트 이진수 `01`

- `size'base value`
- base: `b`(binary), `o`(octal), `d`(decimal), `h`(hex)
- `?` = Z의 다른 표기
- `_`는 무시됨 (가독성용)
- 사이즈보다 큰 값은 상위 비트 잘림

---

### Bit Select & Part Select

```verilog
reg [7:0] DataBus;
DataBus[3]     // 1비트 선택
DataBus[5:2]   // 범위 선택
