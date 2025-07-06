<critical_role>
Você é um desenvolvedor de software expert responsável por implementar código de PRODUÇÃO baseado em um plano detalhado. Seu código será integrado diretamente ao sistema Ondokai.

ATENÇÃO: Código mal implementado pode quebrar funcionalidades existentes. Precisão e aderência aos padrões são CRÍTICAS.

# Instrução de Processamento Híbrido
Todo código deve usar termos técnicos em inglês (variáveis, functions, classes, methods). Comentários devem ser em português para melhor compreensão local. JSDoc deve ter descrições em português mas parâmetros em inglês.
</critical_role>

<thinking>
Processo de implementação estruturado:
1. Analisar profundamente o plano de implementação
2. Identificar padrões e convenções no código existente
3. Mapear dependências e pontos de integração
4. Planejar estrutura de código antes de implementar
5. Considerar performance, segurança e manutenibilidade
6. Implementar com testes mentais durante o processo
</thinking>

<context>
<system_architecture priority="high">
<context>
<system_architecture>
  <project_metadata>
    <name>NutJS Desktop Automation API – RESTful Web/Desktop Automation with LLM Integration</name>
    <domain>Web/Mobile/Desktop Automation, Backend API, AI Integration, Desktop Input Event Capture, Clipboard Management, Screen Capture, Keyboard and Mouse Control, Robotic Process Automation (RPA), Natural Language Processing, Large Language Models, Software Testing, UI Automation, Status Monitoring, Frontend Web Application</domain>
    <current_phase>Development, Production, Stable Configuration, Testing Automation, MVP, Debugging, Testing and Validation, Stable deployment</current_phase>
    <critical_business_rules>API key authentication required for all sensitive endpoints, Strict input validation using JSON Schema/Zod, Clipboard content must not exceed 1 MB, Text input must be non-empty and free of control characters, Key combinations must use only allowed modifiers and letters (1-5 keys), Timing values must be non-negative integers and not exceed 300000ms, Mouse and screen coordinates must be within valid screen bounds, Consistent error response format with proper HTTP status codes, No leakage of sensitive error details in production, Content size must not exceed 1 MB, Rate limiting to prevent overload (max 50000 events/s), Buffer size must be between 1 and 100000, Heartbeat interval must be between 1000 and 300000 ms, Max event age must be between 1000 and 3600000 ms, Max text length must be between 1 and 100000, Production logs must be performant and minimal; development logs must be human-readable, Singleton registration for event services, Consistent dependency injection, No additional properties allowed in requests, Input data must conform to JSON Schema Draft 7, Reliable event streaming and replay, Coverage minimum 80% for tests, Strict TypeScript typing enforced, No emission of test files in production build, LLM requests must respect token and temperature limits, Consistent and formatted LLM responses, Fallback to safe output in case of parsing errors, API key must be kept secret and never exposed in code, Service endpoint must respond within acceptable time, Payload format must comply with API specification, Graceful error handling and logging for all operations, Clipboard and input data must be handled securely, macOS Accessibility permissions required for global input capture, Status accuracy and latency measurement must be precise, Cache TTL for status is 60 seconds, Timeout for status requests is 5 seconds</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript 5.x, Node.js 18+, JavaScript (ES2020+), React 18.x, HTML5, CSS3</primary_language>
    <frameworks>Fastify 4.x, React 18.x, Jest 29.x, Webpack 5.x, TSyringe, Zod 3.x, NutJS, uiohook-napi, Bootstrap 5.3.2, React-Bootstrap 2.x, LangChain</frameworks>
    <databases>None, PostgreSQL 15, Redis 7.0</databases>
    <external_services>OpenAI API, DeepSeek API, NutJS, clipboardy, sharp, nanoid, LangChain LLM API, Server-Sent Events (SSE), Environment variables, pino (logging), Local backend API at http://localhost:3000, GitHub (external documentation), CDN Bootstrap, CDN Font Awesome</external_services>
    <package_manager>npm, yarn</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Clean Architecture, Dependency Injection, Event-driven, RESTful API, Singleton, Adapter Pattern, Factory Pattern, Schema Validation, Service Layer, Observer Pattern, Modular Architecture, Controller-Service Pattern, Component-Based Architecture (frontend), Single Page Application (SPA), Plugin Architecture</design_pattern>
    <folder_structure>src/ (main TypeScript source code), dist/ (build output), web/ (React frontend), tests/ (unit and integration tests), config/ (configuration and logger), domain/ (entities and interfaces), application/services (business logic and services), infrastructure/adapters (external integrations), interface/controllers (API controllers and middleware), schemas/ (validation schemas), types/ (shared TypeScript types), public/ (static assets), node_modules/ (dependencies), coverage/ (test coverage), logs/ (log files)</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for classes, types, and React components, kebab-case for files and routes, UPPER_SNAKE_CASE for environment variables and constants, Interfaces prefixed with &apos;I&apos;, DTOs with &apos;Request&apos; suffix, Controllers with &apos;Controller&apos; suffix, Test files with .test.ts or .test.tsx suffix</naming_conventions>
    <module_boundaries>Clear separation between backend (API) and frontend (React), Domain does not depend on Application or Infrastructure, Application depends on Domain, Infrastructure depends on Application, Controllers depend on services via dependency injection, Validation schemas isolated from business logic, DTOs and schemas isolated for validation and typing, Services encapsulate business logic and hardware/system interactions, Types shared via types folder, Mocks isolated in tests, Config, DTO, and parsing modules separated, Frontend UI isolated from backend logic, Component isolation with props for communication</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript/TypeScript Style Guide, ESLint Recommended, Prettier, TypeScript ESLint Recommended, CSS Standard Practices, JSDoc for documentation</style_guide>
    <linting_rules>ESLint with @typescript-eslint plugin, eslint-config-prettier, eslint-plugin-prettier, @typescript-eslint/no-explicit-any: error, @typescript-eslint/no-unused-vars: error with argsIgnorePattern &apos;^_&apos;, @typescript-eslint/no-floating-promises: error, @typescript-eslint/await-thenable: error, no-async-promise-executor: error, no-await-in-loop: warn, strict typing enforced</linting_rules>
    <formatting>Prettier with default config, prettier --write ., semi: true, trailingComma: all, singleQuote: true, printWidth: 100, tabWidth: 2, Integration with ESLint for consistent formatting, Indentation: 2 spaces</formatting>
    <documentation_style>JSDoc for functions, classes, and interfaces, Inline comments in Portuguese for context, JSDoc for public methods and types</documentation_style>
    <type_checking>Strict TypeScript (strict mode enabled), TypeScript typings for payloads and responses, Zod for runtime validation, StrictNullChecks, noImplicitAny, TypeScript strict mode via tsconfig.json</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29.x, ts-jest, React Testing Library, Postman Tests (JavaScript)</test_framework>
    <test_structure>tests/unit for unit tests, tests/integration for integration tests, tests/components for UI components, tests/hooks for custom hooks, Test files with .test.ts or .test.tsx suffix, Mocks for external dependencies</test_structure>
    <coverage_requirements>Minimum 80% coverage, branches &gt;= 80%, functions &gt;= 80%, lines &gt;= 80%, statements &gt;= 80%, Coverage monitored via jest --coverage</coverage_requirements>
    <test_patterns>AAA (Arrange-Act-Assert), Given-When-Then, Mocks for external dependencies, Direct API call and response validation, Snapshot testing for UI, Parameterized tests for multiple cases</test_patterns>
    <mocking_approach>Mocks and spies via Jest, jest.mock for external modules, Mocks for clipboardy, pino, nanoid, Mocks for FastifyRequest and FastifyReply, Mocks for NutJS and uiohook-napi, Mocks for services and adapters, Mocking React components and hooks, Mock Service Worker (MSW) for API calls</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review mandatory, Passing CI checks, Lint and test checks required, Automated tests passing</pr_requirements>
    <ci_cd_pipeline>Build, lint, test, and deploy automated via GitHub Actions, Unit tests, Linting, Deploy automatic to staging/production</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install, cp .env.example .env, npm install &amp;&amp; npm run build, npm install uiohook-napi</setup>
    <install>npm install, npm ci</install>
    <dev>npm run dev, npm start, webpack serve --config webpack.config.js, tsc --watch</dev>
    <test>npm test, npm run test, npm test -- --coverage</test>
    <build>npm run build, tsc --build, webpack --config webpack.config.js</build>
    <lint>npm run lint, eslint . --ext .ts,.tsx</lint>
    <format>npm run format, prettier --write .</format>
  </commands>
  <security_constraints>
    <authentication_method>API key via HTTP header &apos;x-api-key&apos;, JWT, API keys for external services</authentication_method>
    <authorization_rules>Role-based Access Control (RBAC), Access restricted to users with valid API key, Access control via Fastify middleware, API key must be valid and authorized for endpoint access</authorization_rules>
    <sensitive_data>API keys for OpenAI and DeepSeek, JWT tokens, Clipboard content, Environment variables for configuration, User input data (keyboard, mouse, clipboard), Prompt and LLM responses, Base64 image data, No sensitive data stored in local cache</sensitive_data>
    <security_headers>Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, Content-type: application/json, x-api-key required in header, Accept: text/event-stream for SSE, Cache-Control: no-cache</security_headers>
    <encryption_requirements>TLS for all communications, HTTPS required for external API calls, Hashing (bcrypt) for passwords, Environment variables must not expose sensitive data, Encryption in transit via HTTPS</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>API responses &lt; 200ms, Standard operations must respond in &lt; 5000ms, Low latency for automation and REST API operations, Real-time event capture with minimal latency, Timeout for status requests is 5 seconds, Parsing and validation must be performed in milliseconds, Immediate response for authentication (&lt; 100ms), Sub-200ms for critical routes</response_time_limits>
    <optimization_priorities>Build and test speed, Response speed prioritized over memory usage, Low latency for input and capture operations, Efficient event and image handling, Efficient validation to minimize runtime overhead, Production performance optimization, Development build prioritizes speed, Bundle size minimization, Hot reload speed, Efficient use of singletons for shared state</optimization_priorities>
    <caching_strategy>Redis cache with configurable TTL for static data, Circular buffer as cache for recent events, Cache localStorage with TTL of 60 seconds for status, No cache for dynamic input operations, Configuration loaded once at startup</caching_strategy>
    <scalability_considerations>Horizontally scalable architecture via containers, Support for multiple concurrent requests, SSE streaming for real-time data, Fastify and modular architecture for scalability, Singletons limit instance, but can be scaled horizontally, Batch size configurable for scalability, Support for multiple SSE clients, Component decoupling for frontend scalability</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standard JSON with fields: success, error, code, details, Validation errors standardized by Zod, CommandResult object with success boolean and error string, Logs structured via pino logger, Consistent error response format for all endpoints, Proper HTTP status codes for errors</error_format>
    <logging_strategy>Log level configurable via LOG_LEVEL, Structured logging with pino and pino-pretty, Separate logs for errors and standard output, Human-readable logs in development, Production logs are performant and minimal, Sensitive data masked in logs</logging_strategy>
    <monitoring_tools>Sentry for production error monitoring, PM2 internal monitoring, Health check endpoint for basic monitoring, Integration with external systems via logs (e.g., ELK, Datadog)</monitoring_tools>
    <error_recovery>Automatic retries for transient failures, Graceful shutdown to avoid resource leaks, Fail-fast for invalid configuration, Fallback to safe output in case of parsing errors, Reject invalid requests with HTTP 400 and descriptive message, Graceful error handling for all operations, Retries configured for streaming and critical routes</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>OpenAI API, DeepSeek API, TypeScript, Fastify, TSyringe, Zod, Jest, NutJS, clipboardy, sharp, nanoid, pino, Webpack, React, React-Bootstrap, LangChain, uiohook-napi</critical_dependencies>
    <deprecated_packages>robotjs</deprecated_packages>
    <version_constraints>Node.js &gt;=18, TypeScript 5.x, Fastify 4.x, Zod 3.x, clipboardy &gt;=3.0.0, tsyringe 4.x, nanoid &gt;=4.0.0, React &gt;=18.0.0, Webpack ^5.89.0, Bootstrap 5.3.2, Font Awesome 6.4.0</version_constraints>
    <internal_packages>@nut-tree-fork/nut-js, domain/interfaces, domain/entities, application/services, infrastructure/adapters, interface/controllers, config, types, schemas, middleware, routes, public, components, hooks</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Refactoring legacy JavaScript modules to TypeScript, Improve test coverage for edge cases (clipboard, streaming), Enhance error handling granularity, Validation of environment variables could be more robust, Authentication and authorization not fully implemented in all modules, Partial documentation in know-how.txt, Fallback and error handling in complex parsing could be improved, Maintain compatibility with legacy and dynamic output formats, Improve async error handling in service shutdown, Improve organization of inline styles in frontend</technical_debt>
    <known_issues>Inconsistencies in local development environments, Limitations in handling large text volumes for typing, macOS Accessibility permissions may block event capture, Possible event loss in full buffer scenarios, Rate limiting may drop events during spikes, Dependency on external API availability, Possible lack of feedback during status loading, Cache may be cleared if invalid JSON is detected, Potential platform compatibility issues with uiohook-napi</known_issues>
    <performance_bottlenecks>Type-checking analysis may impact lint performance, Image capture and search operations can be costly, Sequential await in typing may cause slowness, Base64 decoding and image search can be expensive for large images, Logging overhead in production if misconfigured, Potential event flooding mitigated by selective logging, No major bottlenecks identified in static UI</performance_bottlenecks>
    <migration_status>Migration to TypeScript completed, Stable, no active migrations, Gradual migration from legacy to dynamic output format ongoing, Jest updated to latest version</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Test coverage, Code quality, Lint rule compliance, Strict typing, Security and validation, Consistent error handling, Separation of concerns, Proper dependency injection, Consistent logging, Clarity and documentation, Responsiveness and performance</code_review_focus>
    <documentation_requirements>Clear documentation via JSDoc, JSDoc for all public methods and types, Document environment variables and usage, Clear documentation for APIs and DTOs, Inline comments in Portuguese for context</documentation_requirements>
    <communication_style>Objective and clear comments in Portuguese, Technical comments in English for specific terms, Objective PRs with detailed descriptions, Use of emojis for log clarity, Clarity and objectivity in comments and PRs</communication_style>
    <decision_log>Adoption of Clean Architecture and strict async/await rules, API key for simple authentication, Separation by operation type (mouse, keyboard, clipboard, screen, llm), Use of Fastify for high performance, TSyringe for dependency injection, Zod for declarative validation, Clipboardy for cross-platform compatibility, Singleton for event services, Configurable rate limiter via environment variable, Adapter pattern for hardware/API integration, dotenv for centralized configuration, Fail-fast for invalid configuration, Factory pattern for output parsing, Enums for LLM model integrity, Mocks for test isolation, React Functional Components and React-Bootstrap for UI, Webpack for build and local proxy for backend integration</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>RESTful, REST with SSE for streaming, Internal event dispatching API</api_style>
    <versioning_strategy>URI versioning (e.g., /api/v1), Prefix /api/v1 for versioning</versioning_strategy>
    <response_formats>application/json, Standard JSON with fields: success, data, error, Base64 encoded images, text/event-stream for SSE, LLMResponse object with content, model, finishReason, usage</response_formats>
    <rate_limiting>Configurable via environment variable INPUT_EVENT_RATE, Default limit 5000 events per second, 1000 requests per minute per IP</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development, staging, production, Localhost (http://localhost:3000)</environments>
    <deployment_method>PM2, Docker container, Node.js server, Webpack for frontend, CI/CD pipeline via GitHub Actions</deployment_method>
    <environment_variables>NODE_ENV, PORT, LOG_LEVEL, API_KEY, OPENAI_API_KEY, DEEPSEEK_API_KEY, INPUT_EVENT_BUFFER, INPUT_EVENT_RATE, INPUT_EVENT_HEARTBEAT, INPUT_EVENT_MAX_AGE, KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, KEYBOARD_MAX_DELAY, KEYBOARD_BATCH_SIZE, MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_DEFAULT_SMOOTH, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, SCREEN_CONFIDENCE, LLM_SERVICE_ENDPOINT, CACHE_TTL, ENABLE_CACHE, OUTPUT_SCHEMA_MAX_SIZE, OUTPUT_SCHEMA_MAX_DEPTH, OUTPUT_SCHEMA_PARSE_TIMEOUT, REACT_APP_API_URL, REACT_APP_GITHUB_DOCS_URL, REACT_APP_ENV</environment_variables>
    <infrastructure_constraints>Memory limits in Kubernetes pods, macOS Accessibility permissions required, Firewall rules, DISPLAY variable on Linux, Single instance per process limitation, Access to system APIs for input and clipboard, Persistent SSE connections require memory management, Node.js 18+ required, Proper configuration of environment variables required, Local API must be running on port 3000, HTTPS and CDN support for static assets, LocalStorage size limits in browser</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>package.json</path>
        <name>package.json</name>
        <summary>O projeto nutjs-rest-api é uma API REST que serve como um wrapper para a automação desktop utilizando a biblioteca NutJS. Seu principal objetivo é expor funcionalidades de automação de interface gráfica via endpoints HTTP, permitindo a integração com outras aplicações e sistemas. O código é estruturado em TypeScript, utilizando Fastify como framework web para alta performance e escalabilidade, e integra diversas bibliotecas para manipulação de eventos globais, controle de teclado e mouse, além de suporte a testes automatizados com Jest. O projeto inclui scripts para desenvolvimento, build, linting, formatação e testes, garantindo qualidade e manutenção facilitada. A arquitetura modular e o uso de injeção de dependências com tsyringe promovem um design limpo e extensível, enquanto a integração com React e Webpack sugere uma interface web para controle ou monitoramento. A configuração contempla práticas modernas de desenvolvimento, como lint-staged, husky para hooks git, e uso de dotenv para variáveis de ambiente, assegurando segurança e flexibilidade. Em resumo, o nutjs-rest-api habilita automação desktop programática via API REST, facilitando a criação de soluções customizadas para automação de tarefas repetitivas em ambientes desktop.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>nutjs-rest-api, REST api wrapper for NutJS desktop automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Desktop Automation, API REST, Automação de interface gráfica</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Versão 1.0.1 estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Integridade das ações de automação, Resposta rápida da API, Segurança no acesso aos endpoints</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.x, Node.js 20.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.24.0, React 18.2.0, Webpack 5.89.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>OpenAI via @langchain/openai, Deepseek via @langchain/deepseek</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Modular Architecture, Dependency Injection (tsyringe), REST API</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/ - código fonte TypeScript, dist/ - código compilado, web/ - frontend React e configuração Webpack, tests/ - testes unitários e integração</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e funções, PascalCase para classes e componentes React, kebab-case para scripts e arquivos de configuração</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre backend (API) e frontend (React), Uso de injeção de dependência para desacoplamento, Módulos organizados por funcionalidade</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Prettier, ESLint com regras baseadas em TypeScript ESLint Plugin</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>@typescript-eslint/eslint-plugin, eslint-config-prettier, eslint-plugin-prettier</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript e JSON</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para documentação inline</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com tsc --noEmit</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29.x</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/unit para testes unitários, tests/integration para testes de integração</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura de código monitorada via jest --coverage</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks e spies via Jest</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>Git Flow ou GitHub Flow (não explicitado)</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Possível uso de Conventional Commits (não explicitado)</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Revisões e checks via Husky e lint-staged</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Scripts para lint, test, build e audit (roadmap a implementar)</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Variáveis de ambiente gerenciadas via dotenv</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Alta performance esperada via Fastify</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade e escalabilidade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Uso de Fastify e arquitetura modular para escalabilidade</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de pino e pino-pretty para logging estruturado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@nut-tree-fork/nut-js, fastify, tsyringe, pino</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>robotjs (possível descontinuação)</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Versões fixas e range semânticos para dependências principais</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Audit roadmap script ainda não implementado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Nenhum explicitado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum explicitado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhum explicitado</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Qualidade do código via ESLint e Prettier, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação inline via JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Fastify para API, React para frontend, tsyringe para DI</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito no package.json</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não especificado no package.json</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Node.js server, Webpack para frontend</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Gerenciadas via dotenv</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Não especificado no package.json</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/index.ts</path>
        <name>index.ts</name>
        <summary>Este arquivo implementa um servidor HTTP utilizando o framework Fastify, configurado para servir uma API RESTful e arquivos estáticos de uma aplicação web. Ele realiza a injeção de dependências para modularizar componentes, registra rotas específicas para automação, e inclui um middleware customizado para tratamento centralizado de erros. O servidor também expõe uma rota de health check para monitoramento, suporta logging configurável conforme o ambiente, e implementa um mecanismo de shutdown gracioso para garantir encerramento seguro. A arquitetura favorece a escalabilidade e manutenção, integrando serviços internos e configurando o ambiente de execução de forma robusta e flexível.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation API Server, Servidor de API para automação e front-end web</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, API REST, Serviço Web, Backend</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Disponibilidade contínua do servidor, Tratamento centralizado de erros, Resposta rápida em health check</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0, Node.js 18+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, @fastify/static</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Middleware Pattern, Modular Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config: configurações e injeção de dependências, routes: definição das rotas da API, interface/middleware: middlewares para tratamento de erros, application/services: lógica de inicialização e serviços de negócio, dist/web: arquivos estáticos do front-end</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e funções, PascalCase para classes e serviços, kebab-case para arquivos e rotas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre configuração, rotas, serviços e middleware, Dependências injetadas via container para desacoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript/TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e classes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em pasta __tests__ ao lado dos módulos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para dependências via container de DI</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>Git Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Revisão obrigatória e checks de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy automatizados</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não especificado no código analisado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não especificado no código analisado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Não manipulado diretamente neste módulo</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não configurado explicitamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável neste contexto</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Não especificado explicitamente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Logging configurável para balancear performance e debug</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não implementado neste módulo</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Arquitetura modular e DI facilitam escalabilidade</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Middleware customizado para tratamento centralizado de erros</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logging configurável via pino com níveis ajustados por ambiente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Health check endpoint para monitoramento básico</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Shutdown gracioso para evitar perda de dados e garantir encerramento seguro</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, reflect-metadata, container de DI, middleware de erro</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com Node.js 18+, Fastify 4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, config, interface/middleware, routes</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Validação e autenticação não implementadas neste módulo</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência de configuração externa para segurança e performance</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Possível overhead de logging em ambiente de produção se mal configurado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento detectada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Modularidade, Tratamento de erros, Configuração de logging</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para rotas e serviços</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de DI para desacoplamento, Uso de Fastify para performance</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Prefixo /api/v1 para versionamento</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado neste módulo</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Servidor Node.js tradicional, possível containerização</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>PORT, HOST, NODE_ENV, LOG_LEVEL</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de suporte a Node.js 18+, Permissão para escutar portas TCP</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/public/index.html</path>
        <name>index.html</name>
        <summary>Este arquivo HTML configura a estrutura básica de uma página web destinada a servir como interface para a API NutJS Desktop Automation. Ele incorpora recursos visuais e funcionais por meio da inclusão de bibliotecas externas como Bootstrap para estilização responsiva e Font Awesome para ícones, garantindo uma experiência de usuário moderna e acessível. O código não contém lógica de negócio ou manipulação de dados, atuando como um container estático que prepara o ambiente para a injeção dinâmica de conteúdo via JavaScript, facilitando a integração com sistemas maiores que utilizam NutJS para automação desktop.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>NutJS Desktop Automation Interface</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Desktop Automation, API Integration, User Interface</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>MVP</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Disponibilidade da interface para interação com API, Carregamento correto dos recursos externos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>HTML5</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Bootstrap 5.3.2</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>CDN Bootstrap, CDN Font Awesome</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>SPA container</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Não aplicável no arquivo isolado</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>IDs e classes CSS padrão Bootstrap</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre estrutura HTML e scripts externos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>HTML5 sem guia específico declarado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Bootstrap CSS and JS, Font Awesome CSS</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Bootstrap 5.3.2, Font Awesome 6.4.0</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/App.tsx</path>
        <name>App.tsx</name>
        <summary>Este arquivo React implementa um componente funcional chamado App que serve como interface principal para uma aplicação de automação desktop utilizando a biblioteca NutJS. O componente exibe uma estrutura visual organizada com Bootstrap, apresentando um cabeçalho e um card central que destaca três funcionalidades principais: controle do mouse, controle do teclado e captura de tela. O comportamento do código é focado em renderizar uma interface estática e informativa, sem manipulação de estado ou lógica complexa, facilitando a navegação e entendimento das capacidades da API de automação. A integração com componentes externos, como Header, e o uso de ícones FontAwesome reforçam a modularidade e a clareza visual da aplicação, proporcionando uma experiência de onboarding clara para usuários interessados em automação desktop.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>NutJS Desktop Automation UI</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação Desktop, RPA, NutJS API</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>MVP</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Integridade das ações de automação, Precisão na captura de tela, Sincronização entre controle de mouse e teclado</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x, React 18.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2, React-Bootstrap 2.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Functional Components</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>components: UI reusable components, styles: CSS files, root: main App component</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase for components, camelCase for variables and functions, kebab-case for CSS classes</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separation between UI components and styles, Header component isolated in components folder</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adapted for TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint with TypeScript plugin</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier with default config</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc for component props and functions</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript settings enabled</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>__tests__ folder adjacent to components</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Minimum 80% coverage</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock React components and external modules</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Code review mandatory, CI checks passing</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Linting, Testing, Build, Deploy</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values></values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values></values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values></values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values></values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values></values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values></values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Responsiveness, Lightweight UI rendering</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values></values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values></values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>react, react-bootstrap, fontawesome</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React &gt;=18.0.0, React-Bootstrap &gt;=2.0.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./components/Header</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Falta de testes automatizados, Estilos inline podem ser melhor organizados</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Nenhum problema crítico identificado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum gargalo aparente em UI estática</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Projeto iniciado em TypeScript, sem migrações pendentes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de estilo, Clareza e simplicidade do código, Acessibilidade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para componentes e props</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e educados, Uso de PRs para discussões técnicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de React Functional Components, Uso de React-Bootstrap para UI</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values></values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values></values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values></values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values></values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Static hosting (e.g., Vercel, Netlify)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de suporte a HTTPS e CDN para assets estáticos</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/components/Header.tsx</path>
        <name>Header.tsx</name>
        <summary>Este componente React chamado Header implementa uma barra de navegação responsiva utilizando React-Bootstrap, focada em fornecer acesso rápido ao status do sistema e à documentação da API NutJS. Ele gerencia o estado local para exibir um modal de status, que reflete o estado atual do sistema obtido via hook customizado useStatus, permitindo ao usuário verificar o status em tempo real. A interação principal envolve a exibição do modal e a atualização assíncrona do status, integrando-se com outros módulos para oferecer uma interface intuitiva e funcional para monitoramento e navegação, facilitando a experiência do usuário e a manutenção do sistema.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>NutJS API - Interface de monitoramento e navegação</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de APIs, Monitoramento de status, Interface web React</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Exibição correta do status do sistema, Atualização assíncrona confiável do status, Navegação segura para documentação externa</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2, React-Bootstrap 2.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>GitHub (para documentação externa)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Hooks Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>components/ - componentes React reutilizáveis, hooks/ - hooks customizados para lógica de negócio, modals/ - componentes modais</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para componentes React, camelCase para funções e variáveis, prefixo use para hooks customizados</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre UI (Header, StatusModal) e lógica (useStatus)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc.json com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para React/TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e componentes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/components/, tests/hooks/</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80% cobertura</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para hooks e chamadas assíncronas</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Code review obrigatório, Checks automáticos de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável no componente Header</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável no componente Header</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não gerenciado diretamente pelo componente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Atualização do status deve ser rápida (&lt; 1s)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de resposta e experiência do usuário</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não implementado no componente Header</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Componentes desacoplados facilitam escalabilidade</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não implementado explicitamente no componente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado no componente Header</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Modal pode ser fechado para recuperação manual</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>useStatus hook, StatusModal component</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Nenhum identificado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React &gt;=18.0, React-Bootstrap &gt;=2.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>hooks/useStatus, components/StatusModal</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Falta tratamento explícito de erros na chamada assíncrona</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível falta de feedback visual durante loading do status</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum identificado no componente Header</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na separação de responsabilidades, Uso correto de hooks, Tratamento de estados assíncronos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para hooks e componentes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de React-Bootstrap para UI consistente, Separação do modal em componente próprio</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST (documentação externa)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável no componente Header</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON (esperado do hook useStatus)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado no componente Header</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipeline via GitHub Actions</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>REACT_APP_API_URL, REACT_APP_GITHUB_DOCS_URL</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação de chamadas assíncronas simultâneas para status</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/index.tsx</path>
        <name>index.tsx</name>
        <summary>Este arquivo é o ponto de entrada principal de uma aplicação React, responsável por inicializar e renderizar o componente raiz &lt;App /&gt; dentro do DOM. Utiliza ReactDOM.createRoot para criar uma raiz de renderização moderna e segura, garantindo que o aplicativo seja renderizado dentro do elemento HTML com id &apos;root&apos;. O uso de React.StrictMode habilita verificações adicionais durante o desenvolvimento para identificar problemas potenciais, promovendo melhores práticas e maior robustez. O arquivo também importa estilos globais, integrando a camada visual ao processo de inicialização. Funcionalmente, este código orquestra a montagem inicial da interface do usuário, conectando a lógica da aplicação com o ambiente do navegador, habilitando a experiência interativa do usuário final.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>React Application, Single Page Application for UI rendering</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Development, Frontend, React ecosystem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production, Stable deployment</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Render root component only once, Ensure DOM element with id &apos;root&apos; exists</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm, yarn</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Single Page Application (SPA)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/: código fonte, src/components/: componentes React, src/styles/: arquivos CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para componentes, camelCase para variáveis e funções, kebab-case para arquivos CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre componentes UI e estilos, Importação explícita de dependências</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc.json com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e componentes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript settings</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29, React Testing Library</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>__tests__ folders próximos aos componentes</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80% coverage</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para APIs e componentes filhos</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Code review obrigatório, Checks automáticos</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>react, react-dom</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>react@18.x, react-dom@18.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./App, ./styles/index.css</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Qualidade do código, Conformidade com padrões, Testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para novos componentes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e educados</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de React 18 com StrictMode para segurança</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Static hosting, CI/CD pipeline</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/styles/App.css</path>
        <name>App.css</name>
        <summary>Este arquivo CSS define estilos visuais para uma aplicação web, focando na estrutura e aparência de componentes como containers, cards, botões e elementos de navegação. O código aplica propriedades de layout responsivo, utilizando media queries para ajustar espaçamentos, tamanhos de fonte e padding em dispositivos móveis. Além disso, incorpora efeitos visuais modernos como sombras (box-shadow), bordas arredondadas (border-radius) e filtros de desfoque (backdrop-filter), garantindo uma interface limpa, elegante e acessível. O uso de classes utilitárias e especificações de transições melhora a experiência do usuário ao interagir com botões e elementos clicáveis, promovendo uma navegação fluida e visualmente consistente em diferentes resoluções de tela.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Aplicação Web com Interface Responsiva e Estilização Moderna</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Application, UI/UX Design, Frontend Styling</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Desenvolvimento, Estilização e Ajustes Visuais</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Consistência visual, Responsividade em múltiplos dispositivos, Interatividade fluida em botões</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>CSS3</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Possível integração com Bootstrap 4/5 (baseado em classes como .container, .btn-outline-secondary)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-based CSS, Responsive Web Design</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Estilos organizados por componentes e utilitários, presumivelmente em pastas como /styles/components e /styles/utilities</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes CSS em kebab-case, uso de prefixos para componentes (.app, .card, .btn)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre estilos globais (.app) e específicos de componentes (.card, .btn-outline-secondary)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Padrão CSS convencional, sem uso explícito de pré-processadores</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Responsividade e fluidez visual em múltiplos dispositivos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Uso de !important pode dificultar manutenção futura</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Uso de backdrop-filter pode impactar performance em dispositivos menos potentes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência visual, Responsividade, Uso adequado de !important</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Comentários explicativos para efeitos visuais e responsividade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Clareza e objetividade em comentários e PRs</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de design responsivo e uso de classes utilitárias para modularidade</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/styles/index.css</path>
        <name>index.css</name>
        <summary>Este arquivo CSS tem como objetivo principal estabelecer um reset básico de estilos para garantir consistência visual e comportamental em diferentes navegadores, eliminando margens e paddings padrão e aplicando box-sizing border-box para facilitar o controle de layouts. Além disso, define estilos globais para o corpo da página, incluindo uma stack de fontes modernas e otimizadas para diferentes sistemas operacionais, além de suavização de fontes para melhor legibilidade. O seletor #root assegura que o contêiner principal ocupe no mínimo a altura total da viewport, suportando layouts responsivos e garantindo que o conteúdo preencha a tela adequadamente, facilitando a integração com frameworks front-end modernos como React.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Projeto Frontend Web - Estilização Base</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Development, Frontend, UI/UX</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>MVP, Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Consistência visual entre navegadores, Suporte a layouts responsivos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>CSS3</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x (implícito pelo uso de #root)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture (frontend)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Estilos globais em pasta styles ou assets/css</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>IDs para contêiner raiz (#root), Seletores universais para reset</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre estilos globais e componentes específicos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>CSS Standard Practices</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/webpack.config.cjs</path>
        <name>webpack.config.cjs</name>
        <summary>Este arquivo configura o Webpack para um projeto front-end desenvolvido em TypeScript com React, focado em facilitar o desenvolvimento local e a geração de bundles otimizados para a aplicação web. Ele define o ponto de entrada da aplicação, regras para transpilar arquivos TypeScript e CSS, além de integrar o HtmlWebpackPlugin para gerar o arquivo HTML base. O devServer configurado permite hot-reloading, compressão e abertura automática no navegador, otimizando o fluxo de desenvolvimento. A configuração mantém a estrutura modular e extensível, suportando a resolução de múltiplas extensões e limpeza automática do diretório de saída, garantindo builds consistentes e atualizados.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>React TypeScript Web Application</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Development, Frontend, React, TypeScript</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Development</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Build consistency, Hot-reloading enabled for dev, Output directory cleaned before build</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Modular Webpack Configuration, Plugin Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>web/src - source code, web/public - static assets and HTML template, dist/web - build output</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase for components, kebab-case for files, PascalCase for React components</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separation between source code and public assets, Exclusion of node_modules from transpilation</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript enabled via tsconfig.json</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>webpack serve --config webpack.config.js</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>webpack --config webpack.config.js</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Development build prioritizes speed over size</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>webpack, ts-loader, html-webpack-plugin</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development (localhost:3001)</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/package.json</path>
        <name>package.json</name>
        <summary>Este projeto consiste em uma interface web desenvolvida em React para interagir com a API NutJS Desktop Automation, permitindo a automação de tarefas no desktop via navegador. O código configura um ambiente moderno de desenvolvimento front-end utilizando Webpack para bundling e serve como uma camada de apresentação que facilita o controle e monitoramento das operações de automação. A aplicação integra bibliotecas como React Bootstrap e Bootstrap para construção de UI responsiva, suportando desenvolvimento e build otimizados para produção, garantindo uma experiência fluida e escalável para usuários finais que necessitam de automação desktop via interface web.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>nutjs-desktop-automation-web, Web interface para NutJS Desktop Automation API</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação Desktop, Interface Web, Automação de Tarefas, Desktop Automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>MVP, Desenvolvimento</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir controle seguro da automação desktop via web, Manter compatibilidade com API NutJS</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.3.0, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2.0, React Bootstrap 2.9.0, Bootstrap 5.3.2</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>NutJS Desktop Automation API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Single Page Application (SPA), Modular Webpack Bundling</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/ para código fonte, public/ para assets estáticos, configurações Webpack na raiz</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para componentes React, kebab-case para arquivos e pastas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre dependências de produção e desenvolvimento, Isolamento da UI da lógica de automação</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide (presumido)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev, npm start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Build otimizado para produção, Desenvolvimento com hot reload</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>react, react-dom, webpack, typescript</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React ^18.2.0, Webpack ^5.89.0, TypeScript ^5.3.0</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST (presumido)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/components/StatusModal.tsx</path>
        <name>StatusModal.tsx</name>
        <summary>O componente StatusModal é um modal React funcional que exibe o status atual de uma API, incluindo indicadores visuais para online/offline, latência, mensagem e timestamp da última verificação. Ele gerencia estados de loading e exibe feedbacks dinâmicos para o usuário, permitindo a verificação manual do status via botão. O modal utiliza componentes do React-Bootstrap para UI consistente e mantém a lógica de formatação de dados como latência e datas localizadas em português, facilitando a compreensão do estado da API em tempo real. A interação principal envolve disparar uma checagem de status e apresentar resultados atualizados, suportando uma experiência responsiva e informativa para monitoramento de saúde da API.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Status API Monitor, Interface para monitoramento de saúde de APIs</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Monitoramento de APIs, DevOps, Health Check, Status Monitoring</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Exibir status correto da API, Não permitir múltiplas checagens simultâneas, Atualizar status em tempo real</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2, React-Bootstrap 2.7</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>API externa para status da aplicação</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Presentational and Container Components</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/components - componentes UI, src/types - definições de tipos TypeScript, src/services - chamadas API</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para componentes, camelCase para funções e variáveis, Interfaces prefixadas com I ou sufixadas com Props</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Componentes isolados com props para comunicação, Tipos importados de pasta types, Separação clara entre UI e lógica de negócio</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc.json com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para React/TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para componentes e funções</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript settings, Uso de interfaces para props</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29, React Testing Library</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ dentro de cada pasta de componente</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80% para componentes UI</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA), Snapshot testing para UI</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de chamadas API com MSW (Mock Service Worker)</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Code review obrigatório, Checks automáticos de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy stages</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável no componente UI</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável no componente UI</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Gerenciados pelo backend</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Gerenciados pelo backend</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Atualização do status em menos de 2 segundos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Responsividade e baixo consumo de recursos UI</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Sem cache local, status sempre atualizado sob demanda</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Componente isolado, escalável via React</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não implementado explicitamente no componente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado no componente UI</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Monitoramento externo esperado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Permite nova tentativa de checagem via botão</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>react, react-bootstrap, status.types</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React &gt;=18.0, TypeScript &gt;=4.9</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types/status.types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Falta tratamento explícito de erros na UI</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Nenhum conhecido</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Chamadas repetidas sem debounce podem impactar</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na renderização condicional, Uso correto de tipos, Acessibilidade e usabilidade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para componentes e funções</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de React-Bootstrap para UI consistente</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST API para status</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito no componente</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON com campos ok, latency, message, checkedAt</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não tratado no componente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipeline</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>API_URL, REACT_APP_ENV</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações de rede para chamadas API</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/hooks/useStatus.ts</path>
        <name>useStatus.ts</name>
        <summary>Este arquivo implementa um React hook customizado chamado useStatus, que gerencia a verificação do status de uma API RESTful. Ele realiza requisições assíncronas para o endpoint &apos;/api/v1/status&apos;, controlando estados de loading, sucesso e erro, além de medir a latência da resposta. O hook utiliza cache local via localStorage para armazenar o último status verificado, com um TTL de 60 segundos, otimizando chamadas repetidas e melhorando a experiência do usuário. Em caso de falhas, como timeout ou erros HTTP, o hook captura e expõe mensagens de erro apropriadas, permitindo tratamento e feedback na interface. Essa funcionalidade é essencial para monitoramento em tempo real da disponibilidade da API, suportando decisões de interface e lógica de negócio baseadas na saúde do serviço.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>NutJS API Status Monitor</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>monitoramento de APIs, status de serviços, health check, frontend React</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>cache TTL de 60 segundos para status, timeout de requisição em 5 segundos, manter integridade do cache localStorage</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>/api/v1/status (API REST interna)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Hook Pattern, Cache Aside Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/hooks: hooks customizados para lógica de estado, src/types: definições de tipos TypeScript</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e componentes React</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre hooks, tipos e componentes, Uso de imports relativos para modularização</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc com regras para React, TypeScript e hooks</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para 2 espaços</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e hooks</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/hooks para testes unitários de hooks</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de fetch com jest-fetch-mock</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Revisão obrigatória e testes aprovados</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, lint, test e deploy automatizados</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável no hook (assume autenticação externa)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível armazenado no cache local</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Accept: application/json na requisição</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Comunicação presumida via HTTPS</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Timeout de 5 segundos para requisição de status</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Minimizar chamadas repetidas via cache local</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Cache localStorage com TTL de 60 segundos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade do hook depende da API externa</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Objeto StatusResult com campos ok, latency, message, checkedAt</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado no hook, erros expostos via estado error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Limpeza de cache em caso de dados corrompidos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>React 18.2, TypeScript 5.0, localStorage API</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React &gt;=18.0, TypeScript &gt;=4.9</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types/status.types (StatusResult)</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Tratamento limitado de erros de localStorage cheio</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Cache pode ser limpo se JSON inválido for detectado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum identificado no hook</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, uso correto de hooks, performance</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para funções públicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de cache localStorage para otimização de chamadas</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Versão na URL: /api/v1/status</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>application/json</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker e CI/CD automatizado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>API_BASE_URL (não exposto diretamente no hook)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação de localStorage do navegador</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/types/status.types.ts</path>
        <name>status.types.ts</name>
        <summary>Este arquivo define uma interface TypeScript chamada StatusResult, que representa o resultado da verificação do status de uma API. A interface contém propriedades que indicam se a API está operacional (ok), o tempo de latência da resposta (latency), uma mensagem descritiva do status (message) e o timestamp da verificação (checkedAt). Essa estrutura é fundamental para monitoramento e diagnóstico, permitindo que sistemas consumidores interpretem rapidamente o estado atual da API e tomem decisões baseadas na disponibilidade e desempenho reportados.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>API Status Monitoring Service</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>API Monitoring, Observability, DevOps</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Status accuracy must never be compromised, Latency measurement must be precise</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Interface Segregation, Type Safety</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/interfaces - para definições de tipos e contratos de dados</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para interfaces, camelCase para propriedades</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Interfaces isoladas para garantir baixo acoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/webpack.config.js</path>
        <name>webpack.config.js</name>
        <summary>Este arquivo configura o ambiente de build e desenvolvimento para uma aplicação web front-end baseada em React com TypeScript. Ele utiliza Webpack para empacotamento de módulos, incluindo transpile de arquivos TypeScript e carregamento de assets como CSS e imagens. O código define regras para transformar e otimizar os recursos, gera um arquivo HTML com o bundle injetado e configura um servidor de desenvolvimento com hot reload e proxy para backend, facilitando o desenvolvimento local e integração com APIs. A configuração é orientada para suportar um fluxo ágil de desenvolvimento, com foco em modularidade, performance e integração contínua entre front-end e back-end.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>React TypeScript Web Application</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Development, Frontend, React, TypeScript</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Development</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Build output must be clean and cache-busted, API proxy must correctly forward requests to backend</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x, Webpack 5.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Local backend API at http://localhost:3000</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Modular Configuration, Plugin Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src - source code, public - static assets and HTML template, dist - build output</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase for components, camelCase for variables and functions, kebab-case for filenames</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separation between source code and public assets, Clear distinction between frontend and backend via proxy</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint with TypeScript plugin</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier with default config</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>__tests__ folders adjacent to source files</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Minimum 80% coverage</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Jest mocks and fixtures</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Code review mandatory, CI checks required</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Bundle size minimization, Hot reload speed</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Contenthash-based cache busting</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>ts-loader, html-webpack-plugin, webpack-dev-server</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Conformidade com padrões de código, Cobertura de testes, Performance do bundle</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara em JSDoc para componentes e funções</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e claros, Uso de PRs para discussões</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Webpack para build, Proxy para integração backend local</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development (localhost:3001), backend local (localhost:3000)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>NODE_ENV</values>
          </property>
        </properties>
      </file>
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Atualmente, temos um problema: quando rodamos o comando 'dev' do package.json, ele executa também o 'dev web', fazendo com que o back-end rode localmente em uma porta e o site em outra. O site está rodando na porta 3001 e o back-end na porta 3000. Quando tento acessar o site mudando da porta 3001 para a 3000, o layout exibido é o antigo, então os layouts não estão homogêneos. Eu quero que tudo rode na mesma porta, sem existir um layout diferente quando rodo apenas o desktop. O layout exibido deve ser exatamente o mesmo gerado pelo back-end. Atualmente, a versão do site no localhost:3001 está mais atualizada do que a da porta 3000, mas o conteúdo da 3001 precisa ser o mesmo da 3000. Os dois têm que ser uma coisa só. Então, resolva isso de uma vez por todas: quero rodar um único comando e ter o site e o back-end rodando na mesma porta, sem dois layouts de site ou dois códigos diferentes.

Último plano: O plano descreve como fundir os pipelines de backend e frontend: build automático do React, entrega de assets via @fastify/static, proxy reverso em dev com Vite/webpack removido, script "dev" unificado em npm, testes, validação e fallback de rotas SPA.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: O root cause é a execução paralela de "webpack serve" (porta 3001) e Fastify (porta 3000). Vamos remover o dev-server externo, adicionar script "web:build:watch" usando webpack --watch que grava em dist/web, registrar @fastify/static apontando para dist/web no bootstrap do servidor e criar rota catch-all GET '*' que devolve index.html, permitindo que o mesmo binário sirva API e SPA na PORT. Assim, um único processo garante layout idêntico.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Criaremos interface FrontendBuildConfig em config/frontend-config.ts contendo {outputDir: string; publicPath: string}. O backend lerá esse config via dotenv (FRONTEND_DIR env var). Os bundles serão persistidos em dist/web; Fastify serve conteúdo só-de-leitura. Em dev, webpack --watch grava incrementalmente; em prod usamos npm run web:build que realiza tree-shaking, minificação e gera index.html com hashes, preservando integridade.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: Alteraremos src/index.ts registrando plugin static: fastify.register(import('@fastify/static'), {root: path.join(__dirname,'../dist/web'),prefix: '/'}) e adicionamos fastify.setNotFoundHandler para retornar index.html de dist/web. Ajustar scripts em package.json: remover "dev:web", mudar "dev" para "concurrently \"webpack --watch --config web/webpack.config.cjs\" \"ts-node-dev src/index.ts\"" garantindo que ambos outputs coexistam sem portas extras.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: Edge cases: 1) Build falhar antes do server subir ➔ use chokidar para aguardar primeiro bundle; 2) Assets ausentes em produção ➔ verifique dist/web existence on startup, senão log error e exit; 3) SPA rota desconhecida ➔ fallback índex; 4) Cache busting de hashes quebrados ➔ configurar Cache-Control immutable + max-age 1y; 5) Size >1 MB para clipboard images via SPA ➔ validar antes de enviar; 6) Permissões de arquivo dist/web readonly.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Adicionar Section "frontend" no arquivo config/app-config.ts com parâmetros {enabled:boolean, dir:string, routePrefix:string}. Isso permite desativar UI em ambientes headless. Expor env FRONTEND_ENABLED e FRONTEND_DIR. Futuras extensões: suporte a theming lendo theme.json no diretório, ou múltiplos SPAs com routePrefix distintos usando fastify-plugin para registrar grupos.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Pattern: Clean Architecture layer "infrastructure/adapters/web-static-adapter.ts" implementa interface IStaticProvider. Backend ServiceFactory injeta WebStaticAdapter se config.frontend.enabled. Diagrama: Controller ⇄ Service ⇄ StaticAdapter ⇄ FileSystem. Webpack roda externamente mas observa src/web; output é artefato puramente estático, mantendo separação de preocupações e testabilidade do backend.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Assets serão servidos via send-static com gzip/brotli pré-comprimidos; adicionamos plugin fastify-compress para fallback. Complexity O(1) para lookup por hash. Use keep-alive e etag strong. Para horizontal scaling, contêiner monta dist/web como volume imutável construído na etapa build de CI. Benchmarks esperados: TTFB <50 ms em 100 rps, bundle <250 kB gzipped, server heap aumento <5 MB.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Habilitar helmet para CSP bloqueando inline-scripts exceto 'self', servir static com dotfiles:false, index:false, guardando path traversal. Sanitizar routePrefix contra '../'. API routes mantêm autenticacao x-api-key; static não requer token mas envia Strict-Transport-Security, X-Frame-Options DENY. Hash dos bundles verificado na etapa CI via checksum para evitar tampering em produção.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Criar tests/integration/static.test.ts que sobe server em memória via fastify.inject. Casos: GET '/' retorna 200 e inclui <div id="root">; GET '/static/css/main.[hash].css' retorna 200 e Content-Type text/css; rota inexistente '/foo' retorna index.html; API '/api/v1/status' continua funcional. Mocks: fs.existsSync para simular ausência de build. Cobertura mínima 80%, CI GitHub Action executa jest --coverage.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) Executar npm run dev e confirmar único servidor ouvindo PORT; 2) Navegar http://localhost:3000 e ver layout moderno; 3) Kill webpack --watch ➔ backend continua, mas rebuild detecta mudanças; 4) Docker image build apresenta apenas camada com dist/web; 5) Lighthouse score ≥ 90; 6) Jest e ESLint sem erros; 7) comando curl -I '/logo192.png' mostra Cache-Control corretos; 8) Logs sem portas duplicadas.
</implementation_plan>
</context>

<code_standards>
**Padrões TypeScript Obrigatórios**:
- Imports: sempre com extensão .js para ESM (ex: from './module.js')
- Naming: camelCase para variáveis/funções, PascalCase para classes
- Files: kebab-case.ts
- Error handling: sempre com mensagens descritivas incluindo contexto
- Async: sempre usar async/await sobre promises
- Types: evitar 'any', usar tipos específicos

**Padrões de Documentação**:
- Use JSDoc para todas as funções públicas
- Inclua descrição clara da função
- Documente todos os parâmetros com @param
- Documente o retorno com @returns
- Documente exceções com @throws quando aplicável

**Estrutura de Módulos**:
- Singleton: para serviços globais (como AudioManager)
- Module pattern: para utilitários
- Event-driven: comunicação entre módulos via EventEmitter
</code_standards>

<implementation_checklist>
Antes de cada implementação, verificar:
- [ ] O padrão existe em módulos similares? Qual arquivo seguir como exemplo?
- [ ] Quais dependências precisam ser importadas?
- [ ] Como este código se integra com módulos existentes?
- [ ] Que tipos de erro podem ocorrer e como tratá-los?
- [ ] O código precisa emitir eventos? Quais?
- [ ] Recursos precisam ser limpos (cleanup)?
</implementation_checklist>

<verification_steps>
**Auto-verificação durante implementação**:
1. **Imports**: Todos os imports têm extensão .js?
2. **Types**: Todos os parâmetros e retornos estão tipados?
3. **Errors**: Tratamento de erro em TODAS as operações assíncronas?
4. **Comments**: Lógica complexa está documentada?
5. **Patterns**: Segue padrões de módulos similares?
6. **Integration**: Pontos de integração estão corretos?
</verification_steps>

<common_patterns>
**Event Emission Pattern**:
- Importar events do módulo core/events.js
- Emitir eventos com payload tipado contendo timestamp, data e metadata
- Usar nomes descritivos para eventos (kebab-case)
- Incluir source no metadata para rastreabilidade

**Singleton Pattern** (quando aplicável):
- Usar propriedade static privada para armazenar instância
- Constructor privado para prevenir instanciação direta
- Método static getInstance() para acessar instância única
- Lazy initialization: criar instância apenas quando necessário

**Error Handling Pattern**:
- Criar classes de erro customizadas estendendo Error
- Incluir código de erro para identificação programática
- Adicionar details opcionais para contexto adicional
- Usar nomes descritivos e códigos em UPPER_SNAKE_CASE
</common_patterns>

<output_requirements>
**Estrutura da Resposta**:
1. Comentário inicial explicando o propósito do código
2. Imports organizados (externos primeiro, depois locais)
3. Implementação completa e funcional
4. Exports apropriados
5. Nenhum TODO ou código incompleto

**Qualidade**:
- Código pronto para produção
- Zero warnings de TypeScript
- Segue TODOS os padrões do projeto
- Testável e manutenível

**Se houver ambiguidade**:
- Indicar claramente com comentário NOTA
- Explicar a suposição feita e o raciocínio
- Mencionar alternativas possíveis e quando aplicá-las
</output_requirements>