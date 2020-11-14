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
  - git commit -m 'UFB-1 Smart Commit Test'
    - 'UFB-1 #comment Smart Commit Test'
    - 'UFB-1 #time 1w 3d 5h 30m Total work logged'
    - 'UFB-1 #close Fixed this today'
  - git push

4. Confluence
5. Slack

- 새 워크스페이스 생성
- **Jira 연결**

  - Apps -> jira cloud 추가
  - jira -> /jira connect -> 프로젝트 및 채널 설정 후 connect
  - Jira 프로젝트 -> Slack Integration -> 알림 세팅

  1. Slack에서 Jira 이슈 등록

  - /jira create
  - 해당 채널 및 지라 백로그 및 Slack Jira App 변경 확인

  2. Slack에서 Jira 이슈 할당

  - Slack jira App 채널에서 해당 이슈 Assign 으로 담당자 할당하기

  3. Slack에서 Jira 이슈 상태 변경

  - Slcak jira App 채널에서 해당 이슈 Transition 버튼으로 이슈 상태 변경

  4. Slack에서 Jira 이슈 코멘트 남기기

  - Slcak jira App 채널에서 해당 이슈 Comment로 댓글 남기기

- **Github 연결**
  - Apps -> GitHub 추가
  - /github subscribe utopier
  - /github subscribe utopier/utopier-frontend-boilerplate
  - /github subscribe list features
  - git add .
  - git commit -m 'Slack Github 연결'
  - git push
  - Slack Github 앱에서 알림 확인.
  - 해당 프로젝트 채널 -> /github subscribe utopier/utopier-frontend-boilerplate

---

## 3. Markup & Design & CSS

1. Figma
2. CSS In Js(emotion)

- npm i @emotion/react @emotion/styled
- **Policy**

  - @emotion/styled의 styled 사용
  - htmltagname은 semantic html 사용
  - changing based on props 활용
  - Nesting components & 활용
  - Media Queries 활용

    ```javascript
    const HomeWrapper = styled.htmltagname`
      color: ${(props) => (props.mainColor ? props.mainColor : 'white')};
      & > a {
        color: blue;
      }
      @media (min-width: 480px) {
        font-size: 12px;
      }
    `;
    ```

  - Global Styles 활용
  - npm i emotion-reset @emotion/core
  - \_app.js

    ```javascript
    import emotionReset from 'emotion-reset';
    import { Global, css } from '@emotion/core';

    render(
      <Global
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
    );
    ```

  - animation은 keyframes 활용

    ```javascript
    /** @jsx jsx */
    import { jsx, css, keyframes } from '@emotion/react';

    const bounce = keyframes`
      from, 20%, 53%, 80%, to {
        transform: translate3d(0,0,0);
      }
    
      40%, 43% {
        transform: translate3d(0, -30px, 0);
      }
    
      70% {
        transform: translate3d(0, -15px, 0);
      }
    
      90% {
        transform: translate3d(0,-4px,0);
      }
    `;

    render(
      <div
        css={css`
          animation: ${bounce} 1s ease infinite;
        `}
      >
        some bouncing text!
      </div>
    );
    ```

  - Theming 활용

    ```javascript
    /** @jsx jsx */
    import { jsx, ThemeProvider } from '@emotion/react';
    import styled from '@emotion/styled';

    const theme = {
      colors: {
        primary: 'hotpink',
      },
    };

    const SomeText = styled.div`
      color: ${(props) => props.theme.colors.primary};
    `;

    render(
      <ThemeProvider theme={theme}>
        <SomeText>some text</SomeText>
      </ThemeProvider>
    );
    ```

  - Attaching Props
  - Labels
  - Server Side Rendering
  - CacheProvider
  - pages/\_app.tsx 에 css rest 및 Global Styles 지정
  - styles/global-styles.ts
  - styels/theme.ts
    - 공통 컬러 및 디자인

3. Storybook

- mkdir designSystem
- cd designSystem
- npx -p @storybook/cli sb init --type react
- rmdir stories
- mkdir src
- .storybook/main.js

  ```javascript
  module.exports = {
    stories: ['../src/**/**/*.stories.(js|mdx|tsx)'],
    addons: [
      '@storybook/addon-docs',
      '@storybook/addon-actions',
      '@storybook/addon-links',
      '@storybook/addon-knobs',
    ],
    typescript: {
      check: false,
      checkOptions: {},
      reactDocgen: 'react-docgen-typescript',
      reactDocgenTypescriptOptions: {
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: (prop) =>
          prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
      },
    },
    webpackFinal: async (config, { configType }) => {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [['react-app', { flow: false, typescript: true }]],
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                      },
                    },
                  },
                ],
              ],
            },
          },
        ],
      });

      return config;
    },
  };
  ```

- touch tsconfig.json

  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react"
    },
    "include": ["src"]
  }
  ```

- npm i -D @storybook/addon-knobs @storybook/addon-docs babel-preset-react-app react-docgen-typescript-loader typescript
- src/typing.d.ts

  ```typescript
  declare module '*.mdx';
  declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<
      SVGSVGElement
    >>;

    const src: string;
    export default src;
  }
  ```

- npm i @emotion/core@10.0.35
- npm i -D babel-plugin-named-asset-import
- npm i react-spring

4. UIUX

- https://developers.google.com/web/fundamentals/design-and-ux/ux-basics

5. AppShellModel

- https://developers.google.com/web/fundamentals/architecture/app-shell

6. Responsive

- https://web.dev/responsive-web-design-basics/

7. Layout(Grid & Flex)
8. Accessible Style

- https://web.dev/accessible/#create-a-design-and-css-that-supports-users-with-different-needs

9. Animation

- https://developers.google.com/web/fundamentals/design-and-ux/animations

10. DarkMode

---

## 4. StateManagement( TodoApp 에서 설정)

1. Context(store/context)

2. Rxjs(store/rxjs)

3. Redux & Redux Saga(store/redux)

4. Mobx(store/mobx)

5. Apollo(store/apollo)

---

## 5. DataVisual(d3js : Bar, Line, Pie, Map)

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
