# Linting

Linting is a static code analysis functionality that checks, if the code fulfills different styling rules. A linter enforces these rules by stating violations as errors and warnings.

Code Example:
```typescript
// no linting error
x: number;
...
x = 5;

// linting error because variable is declared but never assigned
y: number;
...
```



## Usage

In the PriOSS project we use the [ESLinter](https://eslint.org/). This one is also available as a Visual Studio Code Extension and **should be used**.
This is important as the ESlinter is also used for our pipeline and enforces a 0 warning tolerance there.



## Ignoring Warnings

Warnings should be only ignored, if it is not possible to fulfill the violated rule otherwise. Sometimes because the linter is limited in its analysis it tries to enforce a rule that cannot be fulfilled. If that is the case, the following can be added on top of the failing line:
```typescript
// eslint-disable-next-line  @'specific rule'

// for example
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
x = any;
```

