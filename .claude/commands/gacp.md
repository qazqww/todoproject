---
description: 변경사항을 add → commit → push까지 한 번에 처리한다
argument-hint: [커밋 메시지 (생략 가능)]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git branch:*), Bash(git add:*), Bash(git restore:*), Bash(git commit:*), Bash(git push:*), Bash(date:*)
---

사용자가 입력한 커밋 메시지: `$ARGUMENTS`

아래 순서대로 실행한다.

## 1. 현재 상태 확인

```
git status --short
git branch --show-current
```

스테이징할 변경이 하나도 없으면 (`git status --short`가 비어 있으면) 커밋하지 말고
"커밋할 변경사항이 없습니다"라고만 알린 뒤 종료한다.

## 2. 스테이징

```
git add -A
git restore --staged '*.DS_Store' 2>/dev/null || true
```

`.DS_Store`는 macOS가 만드는 파일이라 커밋에서 제외한다.
스테이징 후 `git status --short`로 무엇이 올라갔는지 한 번 보여준다.

## 3. 커밋

- `$ARGUMENTS`가 비어 있지 않으면 그 값을 커밋 메시지로 그대로 사용한다.
- 비어 있으면 `MODIFY: 자동 커밋 $(date '+%Y-%m-%d %H:%M')` 을 메시지로 사용한다.

이 저장소의 커밋 메시지는 `ADD:` / `MODIFY:` / `DELETE:` 접두사를 쓰는 관례가 있다.
사용자가 접두사 없이 메시지를 주면 그대로 존중하고 임의로 바꾸지 않는다.

```
git commit -m "<메시지>"
```

## 4. 푸시

현재 브랜치가 `main`이면, push 시 `.github/workflows/deploy.yml`이 돌면서 **운영 서버(EC2)에 자동 배포**된다는 점을 한 줄로 알리고 진행 여부를 확인받은 뒤 push 한다.
그 외 브랜치는 확인 없이 바로 push 한다.

```
git push
```

업스트림이 설정되지 않아 push가 실패하면 `git push -u origin <현재브랜치>`로 재시도한다.

## 5. 결과 보고

커밋 해시(짧은 형식), 커밋 메시지, push된 브랜치를 한두 줄로 요약한다.
어느 단계에서든 실패하면 다음 단계로 넘어가지 말고 에러 출력을 그대로 보여준다.
