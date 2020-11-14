# utopier-frontend-boilerpaltes

---

## Overview

1. Stack

   - CodeEditor : VSC
   - DevBrowser : Chrome

   - **Design & CSS**

     - UI Prototype Tool : Figma
     - CSS In Js : emotion
     - Storybook
     - CSS3
     - Grid & Flex
     - Responsive Web
     - Dark Mode
     - Accessible Style
     - UIUX
     - AppShellModel

   - **Markup**

     - HTML5
     - Accessibility : aria

   - ES6
   - TypeCheck : Typescript
   - UI Library : React
   - SSR & Static Web : Nextjs
   - State Management : Rxjs & Redux & Mobx & Apollo
   - DataVisual : d3js
   - SEO : schema.org
   - PWA
   - AMP
   - CrossBrowser
   - Performance
   - Security

   - Linting : eslint, prettier
   - Testing : jest, react-testing-library, cypress
   - Build : next.config.js(babel, webpack), serverless-bundle
   - CICD : circleCI

   - Deployment : serverless, AWS
   - Auto Deployment : Netlify
   - Debbuging : Sentry
   - AWS Resources : CloudFormation, IAM, S3, CloudFront, Route53, Amplify, Lambda, API Gateway

   - VCS : Git
   - branch Management : GitFlow
   - WebHosting: Github

   - Issue Tracker : Jira
   - Wiki Tool : Confluence
   - Collaboration Massenger : Slack

2. Folder Structure

3. WorkFlow

   1. TS + Nextjs + React + Linting, Testing
   2. Agile(Jira, Confluence, Slack, Github, GitFlow)
   3. Markup & Design & CSS
   4. StateManagement
   5. DataVisual
   6. PWA
   7. SEO
   8. AMP
   9. Accessibility
   10. SSR & Static
   11. CrossBrowser
   12. Performance
   13. Security
   14. Build
   15. CICD pipeline
   16. Auto Deployment

4. 추가 고려사항

---

## 1. TS + Nextjs + React + Linting, Testing

1. Nextjs

- npm i next react react-dom
- package.json

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
}
```

- Basic Nextjs Folder structure
  - /public
  - /pages/index.js

2. TypeScript

- touch tsconfig.json
  - Nextjs가 자동으로 설정하게 됨
- npm run dev
  - Nextjs가 필요한 패키지 설치를 안내함
- npm install --save-dev typescript @types/react @types/node
- pages/index.js -> index.tsx
- npm run dev
  - tsconfig.json 자동 설정됨
  - next-env.d.ts 파일이 생성됨. Typescript 컴파일러가 Nextjs 타입을 선택하도록 함.

3. Linting(eslint, prettier)

- VSCode Extensions 설치
  - ESLint
  - Prettier
- **ESLint 설정**
  - npm i -D eslint
  - npx eslint --init
  - @typescript-eslint/eslint-plugin, @typescript-eslint/parser 설치
  - .eslintrc.json
  ```json
  {
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "ignorePatterns": ["dist/", "node_modules/"]
    ...
  }
  ```
  - package.json
  ```json
  {
    //...
    "scripts": {
      "lint": "eslint './**/*.{ts,tsx,js,jsx}'",
      "lint:fix": "eslint --fix ./**/*.{ts,tsx,js,jsx}"
    }
    //...
  }
  ```
- **React eslint 및 Airbnb 규칙 설정**
  - eslint-config-airbnb(react 관련 규칙), eslint-config-airbnb-base(react를 제외한 규칙, 서버에서 사용)
  - npm info "eslint-config-airbnb@latest" peerDependencies
  - npx install-peerdeps --dev eslint-config-airbnb
  - .eslintrc
    ```json
    {
      "parser": "@typescript-eslint/parser",
      "plugins": ["@typescript-eslint"],
      "extends": [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended"
      ]
    }
    ```
- **Prettier 설정**
  - npm i -D prettier
  - npm i -D eslint-config-prettier eslint-plugin-prettier
  - touch .prettierrc.json
  ```json
  {
    "printWidth": 80, // 한 줄의 라인 수
    "tabWidth": 2, // tab의 너비
    "useTabs": false, // tab 사용 여부
    "semi": true, // ; 사용 여부
    "singleQuote": true, // 'string' 사용 여부
    "quoteProps": "consistent", // 객체 property의 따옴표 여부
    "trailingComma": "es5", // 끝에 , 사용 여부
    "bracketSpacing": true, // Object literal에 띄어쓰기 사용 여부 (ex: { foo: bar })
    "arrowParens": "always", // 함수에서 인자에 괄호 사용 여부 (ex: (x) => y)
    "endOfLine": "lf" // 라인 엔딩 지정
  }
  ```
  - eslintrc.json
  ```json
  {
      ...
      "extends": [
          "eslint:recommended",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
          "plugin:prettier/recommended",
          "prettier/@typescript-eslint"
      ],
      ...
      }
  ```
  - package.json
  ```json
    "scripts": {
    //...
        "prettier": "prettier --write --config ./.prettierrc ./**/*.{ts,tsx}",
    //...
    }
  ```
- **VSCode Format On Save 설정**
  - Preferences > Settings > Workspace > Editor: Format On Save
  - 파일 저장시 Prettier 설정값에 맞춰 자동으로 파일이 포맷팅됨.
  - .vscode/settings.json
    ```json
    {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "eslint.validate": ["javascript"]
    }
    ```

4. Testing(jest, react-testing-library, cypress)

- **jest**

  - npm i -D jest @types/jest ts-jest
  - package.json
    ```json
    {
      "jest": {
        "transform": {
          "^.+\\.ts$": "ts-jest"
        },
        "testRegex": "\\.test\\.ts$",
        "moduleFileExtensions": ["ts", "tsx", "js", "json"],
        "globals": {
          "ts-jest": {
            "diagnostics": true
          }
        }
      }
    }
    ```
  - package.json
    ```json
    "scripts": {
        "test": "jest --detectOpenHandles --forceExit"
    },
    ```

- **react-testing-library**

  - npm i -D @testing-library/react @testing-library/jest-dom
  - setupTests.js
    ```javascript
    import '@testing-library/react/cleanup-after-each';
    import '@testing-library/jest-dom/extend-expect';
    ```
  - jest에서 import문을 사용할 수 없음.

    - npm i -D babel-jest @babel/core @babel/preset-env @babel/plugin-transform-react-jsx @babel/preset-react
    - babel.config.js

      ```javascript
      module.exports = {
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins: ['@babel/plugin-syntax-jsx'],
      };
      ```

    - package.json
      ```json
      "jest": {
        "preset": "ts-jest",
        "transform": {
          "^.+\\.(ts|tsx|js|jsx)?$": "babel-jest"
        },
        "testRegex": "\\.test\\.(ts|js)$",
        "moduleFileExtensions": [
          "ts",
          "tsx",
          "js",
          "json"
        ],
        "globals": {
          "ts-jest": {
            "diagnostics": true
          }
        }
      },
      "transformIgnorePatterns": [
        "<rootDir>/.next/",
        "<rootDir>/node_modules/"
      ],
      "setupFilesAfterEnv": [
        "<rootDir>/setupTests.js"
      ]
      ```

- **cypress**
  - npm i -D cypress
  - package.json
    ```json
    {
      "scripts": {
        "cypress:open": "cypress open"
      }
    }
    ```

---

## 2. Agile(Jira, Confluence, Slack, Github, GitFlow)

1. Github

- git init
- .gitignore
- git add .
- git commit -m 'First Commit'
- github.com -> Create a new repository
- git remote add origin https://github.com/utopier/utopier-frontend-boilerplate.git
- git push --set-upstream origin master
- git push

2. GitFlow

- 5개 Branch
  1. master
  2. develop
  3. features
  4. release
  5. hotfix

3. Jira

- **프로젝트 생성**
  - 프로젝트 만들기 -> 차세대 프로젝트 -> 이름 및 키 입력후 생성
  - 이슈 생성 후 -> 담당자 지정 -> 스프린트 생성 후 이슈 옮기기 -> 첫번째 스프린트 생성
- **Github 연결**
  - 프로젝트 설정 -> App Market -> Github For Jira -> Get it now -> Manage Organizations
  - 프로젝트 -> 항목 추가 -> 리포지토리 연결 -> Github -> https://github.com/utopier/utopier-frontend-boilerplate.git
- **Smart Commit**
  - git add .
  - git commit -m 'UTB-1 Smart Commit Test'
    - 'UTB-1 #comment Smart Commit Test'
    - 'UTB-1 #time 1w 3d 5h 30m Total work logged'
    - 'UTB-1 #close Fixed this today'
  - git push

4. Confluence
5. Slack

- **Jira 연결**
- **Github 연결**

---

## 3. Markup & Design & CSS

1. Figma
2. Storybook
3. CSS In Js(emotion)
4. UIUX
5. AppShellModel
6. Responsive
7. Layout(Grid & Flex)
8. Accessible Style
9. Animation
10. DarkMode

---

## 4. StateManagement

1. Context
2. Rxjs
3. Redux & Redux Saga
4. Mobx
5. Apollo

---

## 5. DataVisual(d3js)

---

## 6. PWA(serviceworker, manifest.json, appinstall, cache, push message)

---

## 7. SEO(schema.org)

---

## 8. AMP

---

## 9. Accessibility(aria, test)

---

## 10. SSR & Static

---

## 11. CrossBrowser(testing)

---

## 12. Performance(Rendering, Loading)

---

## 13. Security

---

## 14. Build(next.config.js, Babel, Typescript, Wepback)

---

## 15. CICD pipeline(CircleCI)

---

## 16. Auto Deployment(Netlify, Sentry, Serverless, AWS)

---
