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
    <name>NutJS Desktop Automation API – Web/Mobile/Desktop automation backend with AI/LLM integration, REST API, and real-time input event streaming</name>
    <domain>Desktop Automation, Web/Mobile/Desktop Automation, AI/LLM Integration, REST API, Input Event Streaming, Clipboard Management, Screen Capture, Keyboard and Mouse Control, UI Automation, Software Testing, Backend, Frontend, Security, DevOps</domain>
    <current_phase>Development, Production, Maintenance, Stable, Testing Automation, MVP</current_phase>
    <critical_business_rules>API key authentication required for all sensitive endpoints, Strict input validation for all parameters to prevent invalid commands, Clipboard content must not exceed 1 MB, Text input must be non-empty and free of control characters, Key combinations must use only allowed modifiers and letters, 1–5 keys, Timing values must be non-negative integers and not exceed 300000ms, Mouse and screen coordinates must be within valid screen bounds, Consistent error response format with proper HTTP status codes, No sensitive error details exposed in production, Environment variables must be loaded safely and set for each environment, Rate limiting to prevent overload (max 50000 events/s), Buffer size between 1 and 100000, max event age 3600000ms, Graceful shutdown to avoid data loss, Minimum 80% test coverage required, No emission of test files during production build, Strict TypeScript typing and linting enforced, Logging must be environment-aware (human-readable in dev, minimal in prod), Clipboard and keyboard operations must succeed or return clear errors, LLM requests must respect token and temperature limits, API versioning must be respected, Consistent and standardized API responses for success and error, No leakage of sensitive data (API keys, clipboard, user input), Real-time event delivery via SSE with heartbeat, Singleton pattern for event dispatcher and buffer, Proper authentication and authorization for streaming and sensitive operations</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript 5.x, Node.js 18+, JavaScript (ES2022+), React 18, HTML5, CSS3</primary_language>
    <frameworks>Fastify 4.x, React 18.x, Jest 29.x, Webpack 5.x, TSyringe, Zod 3.x, LangChain, NutJS, React-Bootstrap 2.x, Bootstrap 5.3.2, Pino 8.x, dotenv 16.x, uiohook-napi</frameworks>
    <databases>PostgreSQL 15, Redis 7.0</databases>
    <external_services>OpenAI API, DeepSeek API, LangChain LLM API, NutJS, clipboardy, sharp, nanoid, Server-Sent Events (SSE), Environment Variables, Custom Logger Service, GitHub (external documentation), Font Awesome CDN, Bootstrap CDN</external_services>
    <package_manager>npm, yarn</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Clean Architecture, Dependency Injection, RESTful API, Event-driven (SSE), Singleton, Adapter Pattern, Factory Method, DTO Pattern, Schema Validation, Service Layer, Observer Pattern, Modular Configuration, Twelve-Factor App, Component-Based Architecture (frontend), Plugin Pattern, Type-safe Data Modeling</design_pattern>
    <folder_structure>src/ (main source code), dist/ (build output), web/ (frontend React app), tests/ (unit and integration tests), config/ (configuration and DI), domain/ (entities, enums, interfaces), application/services/ (business logic), infrastructure/adapters/ (external integrations), interface/controllers/ (API controllers), schemas/ (validation schemas), types/ (TypeScript types), middlewares/ (middleware functions), public/ (static assets), logs/ (log files), coverage/ (test coverage reports)</folder_structure>
    <naming_conventions>UPPER_SNAKE_CASE for environment variables, camelCase for variables and functions, PascalCase for classes, types, and interfaces, kebab-case for files and folders, DTOs with &apos;Request&apos;/&apos;Response&apos; suffix, Interfaces prefixed with &apos;I&apos;, Test files with .test.ts or .test.tsx suffix, CamelCase for JSON properties, PascalCase for React components</naming_conventions>
    <module_boundaries>Clear separation between backend (API) and frontend (React), Domain does not depend on Application or Infrastructure, Application depends on Domain, Infrastructure depends on Application, Interface depends on Application and Infrastructure, Controllers depend on services via DI, Validation schemas isolated from business logic, Types, DTOs, and services separated, Mocks isolated in tests, Config, DTO, and parsing separated, UI components isolated from API logic, Types imported from centralized types module</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript/TypeScript Style Guide, ESLint Recommended, Prettier, TypeScript ESLint Recommended, CSS Standard Practices, JSDoc for documentation</style_guide>
    <linting_rules>ESLint with @typescript-eslint plugin, eslint-config-prettier, eslint-plugin-prettier, @typescript-eslint/no-explicit-any: error, @typescript-eslint/no-unused-vars: error (ignore args starting with &apos;_&apos;), @typescript-eslint/strict-boolean-expressions: error, no-console: warn, prefer-const: error, no-var: error, react-hooks/rules-of-hooks: error</linting_rules>
    <formatting>Prettier with default config, semi: true, trailingComma: all, singleQuote: true, printWidth: 100, tabWidth: 2, Integration with ESLint for consistent formatting, Indentation: 2 spaces</formatting>
    <documentation_style>JSDoc for functions, classes, and interfaces, Markdown comments for endpoint descriptions, Inline comments in Portuguese for context</documentation_style>
    <type_checking>Strict TypeScript mode enabled via tsconfig.json, No implicit any, StrictNullChecks, TypeScript typings for payloads and responses, Zod for runtime validation, Strict TypeScript settings (forceConsistentCasingInFileNames, strict true)</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29.x, ts-jest, React Testing Library, Postman Tests (JavaScript)</test_framework>
    <test_structure>tests/unit for unit tests, tests/integration for integration tests, tests/components for UI tests, tests/hooks for custom hooks, Test files with .test.ts or .test.tsx suffix, Mocks for external dependencies, Setup global in tests/globalSetup.ts, Coverage in coverage/</test_structure>
    <coverage_requirements>Minimum 80% coverage on statements, branches, functions, and lines, &gt;= 90% coverage for schemas and DTOs, &gt;= 80% coverage for critical features</coverage_requirements>
    <test_patterns>AAA (Arrange, Act, Assert), Given-When-Then, Mocks for external dependencies, Snapshot testing for UI, Parameterized tests for multiple cases, Direct API call and response validation</test_patterns>
    <mocking_approach>Jest mocks and spies, jest.mock for external dependencies, Mocks for clipboardy, pino, nanoid, and NutJS, Mocks for FastifyRequest and FastifyReply, Mocks for environment variables, Mocks for adapters and services, Mocks for React hooks and components</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review mandatory, Passing CI checks, Automated lint and test checks, At least one reviewer approval</pr_requirements>
    <ci_cd_pipeline>Build, lint, test, and deploy automated via GitHub Actions, Unit and integration tests, Coverage reporting, Deploy to staging and production</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install, cp .env.example .env, npm install &amp;&amp; npm run build, npm install uiohook-napi</setup>
    <install>npm install, npm ci</install>
    <dev>npm run dev, npm run dev:web, npm run dev:full, tsc --watch, webpack serve --config webpack.config.js, npm start</dev>
    <test>npm test, npm run test, npm run test:unit, npm run test:integration, npm run test:coverage, npm test -- --coverage</test>
    <build>npm run build, npm run build:web, npm run build:prod, tsc, webpack --config webpack.config.js</build>
    <lint>npm run lint, eslint . --ext .ts,.tsx, npm run lint:fix, npm run lint:check</lint>
    <format>npm run format, prettier --write ., npm run format:check</format>
  </commands>
  <security_constraints>
    <authentication_method>API Key via HTTP header &apos;x-api-key&apos;, JWT (for external services), API Keys for external services</authentication_method>
    <authorization_rules>Role-based Access Control (RBAC), Valid API Key required for endpoint access, Access restricted to users with valid key, 401/403 errors for unauthorized access</authorization_rules>
    <sensitive_data>API Keys for OpenAI and DeepSeek, JWT tokens, Clipboard content (max 1 MB), User input data (keyboard, mouse, screen), Environment variables for configuration, Base64 image data (max 1 MB), Prompt and LLM responses, No sensitive data exposed in logs or responses</sensitive_data>
    <security_headers>Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, Content-Type: application/json, x-api-key header required, Cache-Control: no-cache, X-Content-Type-Options: nosniff</security_headers>
    <encryption_requirements>TLS/HTTPS required for all communication, Hashing (bcrypt) for passwords, Environment variables must not expose sensitive data, Base64 image data handled transiently, no persistent storage</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>API responses &lt; 200ms for standard operations, Screen capture and LLM responses &lt; 5000ms, Real-time event streaming with minimal latency, Authentication responses &lt; 100ms, Timeout for status requests: 5 seconds, Typing and mouse actions: configurable, max 300000ms</response_time_limits>
    <optimization_priorities>Low latency for automation and event streaming, Efficient memory usage (buffer, images, events), Fast build and test cycles, Validation efficiency to minimize request overhead, Performance optimized for production, legibility in development, Rate limiting and buffer size to prevent overload, Efficient logging and error handling</optimization_priorities>
    <caching_strategy>Redis cache with configurable TTL for static data, Circular buffer for recent events, LocalStorage cache with 60s TTL for status, Immutable configuration loaded once at startup, No cache for dynamic input operations</caching_strategy>
    <scalability_considerations>Horizontal scalability via containers (Docker/Kubernetes), Support for multiple concurrent requests and SSE clients, Singleton pattern for event dispatcher (per instance), Batch processing for long texts, Modular architecture for easy extension, Configurable buffer and rate limits for high event volume, Frontend and backend can scale independently</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standard JSON with fields: success, error, code, details, Zod validation error format, CommandResult with success:boolean, data?:object, error?:string, Consistent error response format for all APIs, Proper HTTP status codes for errors</error_format>
    <logging_strategy>Structured logging with Pino (info, warn, error, debug), Log level configurable via LOG_LEVEL, Human-readable logs in development, minimal in production, Sensitive data masked in logs, Logs stored in logs/ directory</logging_strategy>
    <monitoring_tools>Sentry for production error monitoring, PM2 internal monitoring, Custom logger with possible integration to external systems</monitoring_tools>
    <error_recovery>Automatic retries for temporary failures, Graceful shutdown to avoid data loss, Fallbacks for parsing and LLM errors, Centralized error handling middleware, Reject invalid requests with HTTP 400 and descriptive message, Buffer reset and event replay for lost events, No sensitive error details in production</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>OpenAI API, DeepSeek API, TypeScript, Node.js, Fastify, React, Jest, Webpack, TSyringe, Zod, clipboardy, sharp, nanoid, pino, uiohook-napi, LangChain, dotenv, React-Bootstrap, Bootstrap, Font Awesome</critical_dependencies>
    <deprecated_packages>None</deprecated_packages>
    <version_constraints>Node.js &gt;=18, TypeScript 5.x, Fastify 4.x, Zod &gt;=3.x, React &gt;=18.0.0, React-Bootstrap &gt;=2.0.0, Bootstrap 5.3.2, clipboardy &gt;=3.0.0, tsyringe &gt;=4.0.0, nanoid &gt;=4.0.0, dotenv &gt;=16.0.0, Jest &gt;=29, uiohook-napi compatible with Node.js 18+ and macOS</version_constraints>
    <internal_packages>@nut-tree-fork/* (nut-js ecosystem), src (main source code), web (frontend), domain/interfaces, domain/entities, application/services, infrastructure/adapters, interface/controllers, config, types, dto, schemas, middlewares</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Refactoring legacy JavaScript modules to TypeScript, Improve error handling granularity, Expand test coverage for edge cases, Enhance environment variable validation, Standardize custom error classes, Improve fallback and error handling in complex parsing, Maintain compatibility with legacy and dynamic output formats, Authentication and authorization improvements, Monitor and alert integration pending, Improve logging detail for errors, Implement caching for images</technical_debt>
    <known_issues>Inconsistencies in local development environments, Clipboard access limitations on some OSes, macOS Accessibility permissions may block event capture, Possible event loss in full buffer scenarios, Rate limiting may drop events during spikes, Performance impact for long texts with high delays, Dependency on local API availability, Possible silent disconnection if SSE heartbeat fails, API key exposure risk if not configured properly, Potential platform compatibility issues with uiohook-napi, Cache may be cleared if invalid JSON detected, No fallback for API failure</known_issues>
    <performance_bottlenecks>Image capture and processing can be costly, Sequential await in typing may cause slowness for long texts, Streaming SSE can generate overhead with many connections, Buffer growth without pruning can impact memory, Parsing and validation of large schemas may impact performance, Potential event flooding mitigated by selective logging, UI rendering of large images may impact performance</performance_bottlenecks>
    <migration_status>Migration to TypeScript completed, Updated to TypeScript 5.x and Fastify 4.x, Gradual migration from legacy to dynamic output format ongoing, Stable, no active migrations</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Test coverage, Code quality, TypeScript type safety, Linting compliance, Security and input validation, Consistent error handling, Separation of concerns, Modularity and dependency injection, Consistent logging, Documentation clarity, Responsiveness and accessibility in UI, Consistent naming conventions</code_review_focus>
    <documentation_requirements>Clear documentation via JSDoc for all public methods and interfaces, README with API and module usage examples, Document environment variables and their usage, JSDoc for schemas and DTOs, Inline comments in Portuguese for context</documentation_requirements>
    <communication_style>Objective and technical comments, Markdown for PRs, Portuguese for context and comments, Conventional Commits, Clear and concise PR descriptions, Use of emojis for log/status clarity</communication_style>
    <decision_log>Adoption of Clean Architecture and Dependency Injection, Use of Fastify for backend and React for frontend, API key for authentication, Zod for declarative validation and type safety, Singleton pattern for event dispatcher and buffer, Rate limiting configurable via environment variable, Use of LangChain for LLM integration, Separation of backend and frontend for scalability, Prettier and ESLint for code style enforcement, Jest for testing with minimum 80% coverage, Use of circular buffer for event memory optimization, Modular folder structure for maintainability, React-Bootstrap for UI consistency, LocalStorage cache for status optimization, Webpack for frontend build, Dotenv for environment configuration</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>RESTful API, REST with SSE for streaming, Event-driven internal API</api_style>
    <versioning_strategy>URI versioning (e.g., /api/v1), Version in URL (/api/v1/llm, /api/v1/status)</versioning_strategy>
    <response_formats>application/json, Standard JSON with fields: success, data, error, Base64 encoded images, text/event-stream for SSE, CommandResult with success, data, error</response_formats>
    <rate_limiting>Configurable via environment variable (maxRate), Default 5000 events per second, 1000 requests per minute per IP (recommended for REST endpoints)</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development (http://localhost:3000), staging (http://staging.example.com), production (http://example.com), test</environments>
    <deployment_method>Docker container, PM2 process manager, CI/CD pipeline via GitHub Actions, Node.js runtime, Webpack for frontend, Static hosting for build</deployment_method>
    <environment_variables>NODE_ENV, PORT, LOG_LEVEL, API_KEY, OPENAI_API_KEY, DEEPSEEK_API_KEY, INPUT_EVENT_BUFFER, INPUT_EVENT_RATE, INPUT_EVENT_HEARTBEAT, INPUT_EVENT_MAX_AGE, KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, KEYBOARD_MAX_DELAY, KEYBOARD_BATCH_SIZE, MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_DEFAULT_SMOOTH, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, SCREEN_CONFIDENCE, LLM_API_KEY, LLM_SERVICE_ENDPOINT, CACHE_TTL, ENABLE_CACHE, OUTPUT_SCHEMA_MAX_SIZE, OUTPUT_SCHEMA_MAX_DEPTH, OUTPUT_SCHEMA_PARSE_TIMEOUT, REACT_APP_API_URL, REACT_APP_GITHUB_DOCS_URL</environment_variables>
    <infrastructure_constraints>Memory limits in Docker/Kubernetes pods, macOS Accessibility permissions required for input capture, Firewall rules for API access, Environment variables must be configured correctly, Support for Windows, Linux, macOS, Persistent SSE connections required, Local API must be running for automation, HTTPS required for secure communication, Access to system APIs for keyboard, mouse, clipboard, and screen, LocalStorage limits in browser, Batch size and buffer size must be tuned for memory usage</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/application/dto/automation-request.dto.ts</path>
        <name>automation-request.dto.ts</name>
        <summary>Este arquivo define schemas de validação utilizando a biblioteca Zod para representar e validar dados relacionados a interações de mouse e operações de captura e busca na tela. Ele estrutura objetos que descrevem movimentos, cliques, arrastes e scroll do mouse, além de operações de captura de tela e reconhecimento de padrões visuais, garantindo que os dados recebidos estejam dentro de limites e formatos esperados. A abordagem modular e tipada permite integração segura e consistente com sistemas que automatizam ou monitoram ações de interface gráfica, facilitando a manipulação programática de eventos de input e análise visual em aplicações que demandam automação ou testes de UI. O uso de defaults e validações rigorosas assegura robustez e previsibilidade no comportamento das operações, suportando cenários de controle preciso do cursor e análise visual baseada em templates.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Interaction and Screen Automation Module</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de UI, Testes automatizados, Interação com interface gráfica</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa dos parâmetros de input para evitar ações inválidas, Garantia de valores default para parâmetros opcionais</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Zod 3.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Schema Validation, Type-safe Data Modeling</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/schemas - definição de schemas de validação, src/types - tipos inferidos a partir dos schemas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para tipos e schemas, snake_case para propriedades opcionais</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre schemas de input e tipos inferidos, Isolamento das validações em módulo dedicado</values>
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
            <values>JSDoc para funções e tipos</values>
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
            <values>tests/unit para testes de schemas e validações</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 90%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para simular inputs inválidos e defaults</values>
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
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Validação eficiente para evitar overhead em runtime</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros de validação padronizados pelo Zod</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>zod</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>zod &gt;=3.0.0 &lt;4.0.0</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação correta dos schemas, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara dos schemas e tipos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do Zod para validação e tipagem</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/keyboard.service.ts</path>
        <name>keyboard.service.ts</name>
        <summary>Este arquivo implementa um serviço de automação de teclado que permite a digitação programada de texto com controle refinado de timing, suportando diferentes estratégias de input: instantânea, por caractere com delay, e com tempo total definido. O serviço abstrai a interação com o hardware via um adaptador de teclado, emitindo eventos para rastreamento de ações e garantindo sanitização do texto para evitar caracteres de controle perigosos. Além da digitação, oferece funcionalidades para pressionar teclas isoladas e executar combinações, com validações rigorosas para limites de entrada e tempo, assegurando robustez e flexibilidade na automação de tarefas que envolvem entrada de texto e comandos de teclado.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Keyboard Automation Service, Serviço de automação de teclado com controle de timing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de software, Input simulation, Keyboard automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Texto digitado não pode conter caracteres de controle perigosos, Limite máximo de 10.000 caracteres para digitação, Delay máximo permitido de 300.000ms (5 minutos), Combinações de teclas suportam até 5 teclas</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe 4.x (Dependency Injection)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>@nut-tree-fork/nut-js (mouse position API)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Strategy Pattern, Dependency Injection, Service Layer</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/interfaces - interfaces de domínio, domain/entities - entidades de domínio, services - implementação dos serviços de automação, utils - utilitários e helpers</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Interfaces prefixadas com &apos;I&apos; (ex: IKeyboardAdapter), Classes em PascalCase, Métodos em camelCase, Constantes e enums em PascalCase</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio e serviços, Dependência invertida via injeção para adaptadores e eventos, Serviço KeyboardService como ponto central de orquestração</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, incluindo no-unused-vars, strict typing</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para documentação de métodos e interfaces</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript (strict mode habilitado)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ próximos aos serviços</values>
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
            <values>Mocks para IKeyboardAdapter e EventDispatcher</values>
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
            <values>Revisão obrigatória, testes aprovados, linting passado</values>
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
            <values>Não aplicável (serviço interno)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável (serviço interno)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Texto digitado deve ser sanitizado para evitar caracteres de controle</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Delay máximo configurável até 300.000ms (5 minutos)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre velocidade de digitação e precisão de eventos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Processamento em lotes para textos longos para evitar bloqueios</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Objeto com success boolean e mensagem de erro em string</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Eventos de teclado emitidos via EventDispatcher para auditoria</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de exceções com retorno estruturado para falhas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>IKeyboardAdapter, EventDispatcher, @nut-tree-fork/nut-js</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Timing value máximo de 300000ms, Limite máximo de 10000 caracteres</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>domain/interfaces, domain/entities, services</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Manutenção das estratégias de digitação e eventos pode crescer em complexidade</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Performance pode ser impactada em textos muito longos com delays altos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Uso de await sequencial em digitação por caractere pode causar lentidão</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de limites, tratamento de erros, clareza nas estratégias</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para interfaces e métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção do Strategy Pattern para flexibilidade em timing de digitação</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (serviço interno)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Objeto com success boolean, data ou error string</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, Kubernetes</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/mouse.service.ts</path>
        <name>mouse.service.ts</name>
        <summary>O código implementa um serviço de automação para controle do mouse, fornecendo funcionalidades para mover, clicar, arrastar e rolar o cursor na tela com suporte a movimentos suaves e validação de coordenadas. Ele integra um adaptador de mouse abstrato para executar ações físicas e um despachante de eventos para emitir eventos relacionados às ações do mouse, garantindo rastreabilidade e controle. O serviço é projetado para ser injetável e extensível, facilitando a integração em sistemas maiores que demandam automação de input, com tratamento robusto de erros e logging detalhado para monitoramento e diagnóstico.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Automation Service, Controle programático de ações do mouse para automação</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de UI, Input Automation, Controle de dispositivos de entrada</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa de coordenadas dentro dos limites da tela, Emissão correta e sequencial de eventos de mouse, Execução confiável das ações físicas do mouse</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe 4.x (Dependency Injection)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>@nut-tree-fork/nut-js (screen dimension API), pino (logging)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Adapter Pattern, Observer Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/entities (entidades de domínio), dto (objetos de transferência de dados), services (serviços de aplicação), types (tipos compartilhados)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e interfaces, camelCase para métodos e variáveis, Sufixo &apos;Request&apos; para DTOs</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio, DTOs e serviços, Dependência unidirecional via injeção</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de any implícito, Regras para async/await</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para métodos públicos e interfaces</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript (strict mode ativado)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em pasta __tests__ paralela aos serviços</values>
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
            <values>Mock de IMouseAdapter e EventDispatcher para testes unitários</values>
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
            <values>Revisão obrigatória por pelo menos um revisor, Checks de lint e testes automatizados</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, lint, test, deploy automatizados via GitHub Actions</values>
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
            <values>Não aplicável (serviço local de automação)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de acesso externo recomendado para uso do serviço</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Movimentos e cliques com duração configurável, padrão 1000ms</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Suavidade do movimento priorizada sobre velocidade bruta</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Nenhum cache implementado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Projeto para uso local, escalabilidade não aplicável</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados como exceções padrão com mensagens descritivas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logging detalhado com níveis debug, info e error via pino</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado, recomendação para integração externa</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Propagação de erros para camadas superiores para tratamento</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>IMouseAdapter, EventDispatcher, @nut-tree-fork/nut-js, pino</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0, tsyringe 4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>domain/entities, dto, services, types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Nenhum débito técnico identificado explicitamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência da resolução da tela para validação de coordenadas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Scroll suave pode causar delays perceptíveis em durações longas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tratamento de erros, Cobertura de testes, Consistência de logging</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para métodos públicos e interfaces</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos, sem excesso de verbosidade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de DI para facilitar testes e extensibilidade, Uso de eventos para rastreabilidade das ações do mouse</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (serviço local)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Local development, Production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Node.js runtime</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de acesso ao hardware do mouse e permissões adequadas</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/keyboard.config.ts</path>
        <name>keyboard.config.ts</name>
        <summary>Este arquivo define configurações imutáveis para funcionalidades de teclado, permitindo a personalização via variáveis de ambiente. Ele estabelece parâmetros como modo padrão de digitação, tamanho máximo de texto, delays por caractere e tamanho de lote para processamento, além de habilitar logs para debug. A função de validação assegura que os valores configurados estejam dentro de limites seguros e aceitáveis, prevenindo erros de configuração que possam impactar a performance ou comportamento do sistema. O código integra-se a um sistema maior que manipula entrada de texto, garantindo flexibilidade e robustez na configuração do comportamento do teclado, com foco em controle preciso de timing e volume de dados processados.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Keyboard Input Configuration Module</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Software Development, Input Automation, Keyboard Event Handling</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>maxTextLength must be between 1 and 100000, defaultDelayPerChar must be non-negative, maxDelay must be between 0 and 3600000, batchSize must be between 1 and 1000, defaultMode must be one of: instant, perChar, total</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Node.js 18</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>dotenv (environment variable loader)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Immutable Configuration Object, Environment-based Configuration, Validation Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config/ - configurações do sistema, src/ - código fonte principal, tests/ - testes unitários e de integração</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para constantes e funções, PascalCase para tipos e interfaces, snake_case para variáveis de ambiente</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Configurações isoladas em módulo próprio, Validação separada da definição de constantes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
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
            <values>JSDoc para funções e constantes</values>
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
            <values>tests/unit/config/keyboardConfig.test.ts</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock environment variables with jest</values>
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
            <values>Code review mandatory, Passing CI checks</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Linting, Unit tests, Build, Deploy</values>
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
            <values>N/A</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Environment variables should not expose sensitive data</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Delays configuráveis para otimização de performance</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Balance entre velocidade de digitação e uso de recursos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Batch size configurável para escalabilidade no processamento</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Lançamento de Error com mensagens claras</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Debug mode habilita logs detalhados</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Validação prévia evita estados inválidos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>dotenv</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>dotenv latest stable</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Validação poderia ser mais robusta para tipos e NaN</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível falha silenciosa se variáveis de ambiente forem mal formatadas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Configurações incorretas podem impactar performance de digitação</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de limites e tipos, Clareza e imutabilidade das configurações</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para todas as funções e constantes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de dotenv para configuração via ambiente, Imutabilidade das configurações para segurança</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, Kubernetes</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, KEYBOARD_MAX_DELAY, KEYBOARD_BATCH_SIZE, KEYBOARD_DEBUG</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limite máximo de delay para evitar bloqueios longos, Batch size para controle de uso de memória</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/mouse.config.ts</path>
        <name>mouse.config.ts</name>
        <summary>Este arquivo define uma configuração padrão para operações relacionadas ao mouse, centralizando parâmetros essenciais para controlar o comportamento de ações como movimentos e cliques. Ele extrai valores de variáveis de ambiente para permitir customização dinâmica, garantindo flexibilidade na duração mínima e máxima das ações, suavização do movimento, taxa de amostragem para interpolação e intervalos de streaming. A estrutura é imutável, promovendo segurança e previsibilidade no uso dessas configurações em diferentes partes do sistema, facilitando a integração com módulos que dependem de parâmetros consistentes para manipulação de eventos do mouse.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Control Configuration, Configuração padrão para operações do mouse</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>User Interaction, Input Device Management, Mouse Event Handling</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production, Stable Configuration</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>minDuration must be less than maxDuration, Duration values must be positive integers, Smooth movement flag must be boolean</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>None (Library/Utility Module)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Environment Variables (process.env)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Immutable Configuration Object, Environment-based Configuration</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config/ - arquivos de configuração, src/ - código fonte principal, types/ - definições de tipos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para constantes e tipos, snake_case para variáveis de ambiente</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Configurações isoladas em módulo próprio, Exportação de tipos para tipagem forte</values>
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
            <values>JSDoc para comentários de código</values>
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
            <values>tests/unit/config/</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 90%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock environment variables</values>
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
            <values>Code review mandatory, Passing CI checks</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Linting, Unit Tests, Build</values>
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
            <values>N/A</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Environment variables devem ser protegidas</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Configuração deve ser carregada rapidamente na inicialização</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na leitura de configurações</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Configuração imutável evita necessidade de cache dinâmico</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Configuração centralizada facilita escalabilidade horizontal</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>N/A - valores padrão aplicados em caso de ausência</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Fallback para valores padrão em parsing de variáveis de ambiente</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>process.env</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Nenhum</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;= 4.5</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Validação de variáveis de ambiente pode ser melhorada</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Valores inválidos em variáveis de ambiente podem causar comportamento inesperado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum identificado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Estável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de valores padrão e tipos, Imutabilidade das configurações</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Comentários JSDoc para todas as propriedades</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Clareza e objetividade em comentários</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de variáveis de ambiente para flexibilidade, Configuração imutável para segurança</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>N/A</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, Kubernetes</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_DEFAULT_SMOOTH, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, MOUSE_DEFAULT_DURATION</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Variáveis de ambiente devem ser configuradas corretamente para evitar falhas</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/domain/entities/mouse-action.ts</path>
        <name>mouse-action.ts</name>
        <summary>Este arquivo define uma abstração para ações de mouse em um ambiente de automação ou interface gráfica, encapsulando operações como movimento, clique, arrasto e rolagem. Ele utiliza interfaces e enums para tipar pontos e botões do mouse, garantindo precisão e flexibilidade na configuração das ações, como movimentos suaves ou cliques duplos. A classe MouseAction centraliza a criação dessas ações, facilitando a composição e execução de comandos de interação com o cursor, sendo ideal para sistemas que necessitam simular ou controlar eventos de mouse programaticamente, como testes automatizados ou ferramentas de automação de UI.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Automation Toolkit, Biblioteca para simulação e controle de eventos de mouse</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de UI, Testes automatizados, Interação com interface gráfica</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>MVP, Desenvolvimento inicial</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Precisão na posição do cursor, Execução correta da sequência de eventos, Respeito aos tipos de botões e opções</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Nenhum framework específico</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Factory Method, Domain Model</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/models - definições de tipos e interfaces, src/actions - implementação das ações do mouse</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e interfaces, Enums em PascalCase, métodos estáticos para criação de instâncias</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos (interfaces/enums) e lógica de ação (classe MouseAction)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript Standard Style</values>
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
            <values>JSDoc para documentação inline</values>
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
            <values>tests/unit para testes unitários das ações</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para simular eventos de mouse</values>
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
            <values>Revisão obrigatória e testes aprovados</values>
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
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações devem ser executadas com latência mínima para simulação realista</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade e precisão na execução das ações</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte para múltiplas ações sequenciais ou paralelas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Exceções lançadas em caso de parâmetros inválidos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs para depuração de ações de mouse</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Reexecução ou fallback para ações falhas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>Nenhum</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Uso de &apos;as any&apos; pode comprometer segurança de tipos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Falta de validação robusta dos parâmetros</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum identificado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipos, Clareza na definição das ações, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara das interfaces e métodos estáticos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Escolha do padrão Factory Method para criação de ações</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Nenhum específico para este módulo</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Execução em ambientes com suporte a Node.js</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/infrastructure/adapters/nutjs/nutjs-keyboard.adapter.ts</path>
        <name>nutjs-keyboard.adapter.ts</name>
        <summary>Este arquivo implementa um adaptador de teclado utilizando a biblioteca NutJS, fornecendo uma interface abstrata para operações de teclado que incluem digitação de texto, pressionamento e liberação de teclas individuais, além de combinações de teclas. O adaptador encapsula a complexidade da biblioteca NutJS, garantindo que as operações sejam realizadas de forma confiável e com tratamento de erros robusto. Ele suporta um conjunto definido de teclas comuns e combinações, possibilitando automação de entrada de teclado em aplicações que requerem controle programático do teclado, mantendo a configuração de digitação instantânea para maior responsividade. A classe é decorada com @injectable para integração via injeção de dependência, facilitando seu uso em arquiteturas modulares e testáveis. Além disso, inclui um método para delay assíncrono, permitindo pausas controladas entre ações de teclado.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>NutJS Keyboard Adapter, Interface para controle programático de teclado</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Automação de UI, Controle de dispositivos</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir digitação instantânea sem delays, Suporte apenas a teclas mapeadas, Tratamento robusto de erros para operações de teclado</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe 4.x (Dependency Injection)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>@nut-tree-fork/nut-js (Keyboard control library)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Adapter Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - Serviços de domínio, infrastructure/adapters - Implementações concretas de interfaces, domain - Entidades e interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes PascalCase, Métodos camelCase, Interfaces prefixadas com I</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre interface (IKeyboardAdapter) e implementação (NutJSKeyboardAdapter), Dependência invertida via injeção</values>
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
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/unit - testes unitários para adaptadores</values>
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
            <values>Mock de biblioteca NutJS para simular teclado</values>
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
            <values>Revisão obrigatória, Checks de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Lint, Test, Deploy automático</values>
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
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Digitação instantânea sem delays configurados</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de execução sobre uso de memória</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados com mensagens detalhadas e contexto</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de exceções para operações de teclado com mensagens claras</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@nut-tree-fork/nut-js, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services/keyboard.service.js</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, Cobertura de teclas suportadas, Conformidade com padrões de injeção</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de NutJS para abstração de teclado, Configuração de autoDelayMs para 0</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/infrastructure/adapters/nutjs/nutjs-mouse.adapter.ts</path>
        <name>nutjs-mouse.adapter.ts</name>
        <summary>O arquivo implementa um adaptador de mouse utilizando a biblioteca Nut.js para abstrair operações de controle do mouse em um ambiente TypeScript. Ele oferece funcionalidades para movimentação do cursor com suporte a movimentos instantâneos e suaves via interpolação linear, cliques simples e duplos, arrasto de elementos, rolagem vertical e obtenção da posição atual do mouse. O adaptador integra-se a um sistema maior por meio da interface IMouseAdapter, garantindo desacoplamento e injeção de dependências, além de configurar parâmetros como velocidade do mouse conforme variáveis de ambiente. Seu comportamento central foca em traduzir comandos de alto nível em ações físicas precisas e controladas do mouse, habilitando automação e controle programático de interfaces gráficas com alta fidelidade e flexibilidade.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Control Automation, Nut.js Mouse Adapter</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Interface, Controle de dispositivos de entrada, Mouse Actions</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Movimentação precisa do cursor, Execução correta de cliques e arrastos, Configuração dinâmica da velocidade do mouse</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Nut.js (mouse control library)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Adapter Pattern, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - Serviços de aplicação, domain/entities - Entidades de domínio, config - Configurações do sistema, adapters - Implementações concretas de interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes em PascalCase, Interfaces prefixadas com I, Constantes em camelCase ou PascalCase, Métodos em camelCase</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio, aplicação e infraestrutura, Dependências unidirecionais do domínio para aplicação e infraestrutura</values>
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
            <values>JSDoc para métodos públicos e privados</values>
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
            <values>Testes localizados em __tests__ próximos aos módulos</values>
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
            <values>Mock de dependências externas como Nut.js</values>
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
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Movimentação instantânea deve ser imediata, Movimentação suave respeita duração configurada</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Precisão e suavidade do movimento priorizadas sobre uso mínimo de CPU</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Nut.js, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, domain/entities, config</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Uso de delays pode impactar performance em movimentos longos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de injeção de dependências, Precisão dos movimentos, Tratamento assíncrono correto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Escolha do Nut.js para controle de mouse, Uso de DI para facilitar testes e manutenção</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipelines</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>environment.mouseSpeed</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/controllers/automation.controller.ts</path>
        <name>automation.controller.ts</name>
        <summary>O arquivo define a classe AutomationController, responsável por expor uma API RESTful para automação de interações com mouse e captura de tela, utilizando o framework Fastify. Ele oferece endpoints para movimentação, clique, arrasto e scroll do mouse, além de captura e busca de imagens na tela, incluindo streaming em tempo real da posição do mouse via Server-Sent Events. A classe integra serviços especializados (MouseService e ScreenService) para executar as operações, aplicando validação de dados via JSON Schema e autenticação em rotas sensíveis. O controlador também implementa tratamento de erros robusto e logging detalhado para monitoramento e diagnóstico, garantindo respostas padronizadas e controle de acesso, habilitando automação remota e monitoramento visual em aplicações que demandam controle programático da interface gráfica.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation API, Controle remoto de mouse e captura de tela</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de interface gráfica, Automação de testes, RPA (Robotic Process Automation)</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Autenticação obrigatória para streaming e captura sensível, Limite de tamanho para imagens capturadas, Respostas padronizadas para sucesso e erro</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, tsyringe 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Nenhum serviço externo explícito, integração interna com serviços de automação</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Clean Architecture, Controller Pattern, Dependency Injection</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - lógica de negócio, application/dto - objetos de transferência de dados, config - configurações globais, controllers - definição de rotas e controle de fluxo, middleware - autenticação e validações, schemas - validação de payloads</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes em PascalCase, Funções e variáveis em camelCase, Arquivos com extensão .js ou .ts seguindo o nome da classe ou funcionalidade</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre serviços de domínio e controladores, Dependência unidirecional via injeção de dependência, Middleware isolado para autenticação</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, incluindo checagem de tipos e estilo</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para documentação inline</values>
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
            <values>Testes localizados em pasta __tests__ paralela aos módulos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then, AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para serviços externos e injeção de dependência</values>
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
            <values>Revisão obrigatória e checks de CI</values>
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
            <values>API Key via header &apos;x-api-key&apos; para rotas sensíveis</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Acesso restrito a streaming e captura de tela via middleware de autenticação</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Imagens capturadas tratadas como base64, limitadas a 1MB</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Content-Security-Policy, X-Content-type-Options, Cache-Control para SSE</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não explícito no código, presumido uso de HTTPS para transporte seguro</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações síncronas rápidas, streaming com intervalo configurável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência para comandos de mouse, controle de tamanho de imagens para memória</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável explicitamente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Streaming SSE pode impactar escalabilidade, uso de autenticação para limitar acesso</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Resposta JSON com campo success boolean e mensagem de erro em caso de falha</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de pino para logs estruturados com níveis info, warn, error e debug</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não explícito, presumido integração com sistemas externos via logs</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de exceções com respostas HTTP 500 e encerramento controlado de streams</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>MouseService, ScreenService, authenticationMiddleware</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify 4.x, tsyringe 4.x, pino 7.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, application/dto, middleware, schemas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Nenhum identificado explicitamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Limitação de tamanho de imagem pode impactar casos de uso com imagens maiores</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Streaming SSE pode gerar overhead em conexões simultâneas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de schemas, tratamento de erros, segurança em endpoints sensíveis</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação JSDoc para métodos públicos e endpoints</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos, uso de logs para rastreamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de injeção de dependência para desacoplamento, Streaming SSE para dados em tempo real</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>RESTful</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não explícito no código</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON com campos success e data</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado explicitamente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker (presumido)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>API_KEY para autenticação, Configurações de mouse e streaming</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação de memória para imagens capturadas, Necessidade de conexões persistentes para SSE</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/schemas/automation.schemas.ts</path>
        <name>automation.schemas.ts</name>
        <summary>Este arquivo define múltiplos JSON Schemas para validação de objetos relacionados a interações de mouse e operações de captura e busca na tela, focando em ações como movimento, clique, arrasto e scroll do mouse, além de funcionalidades de reconhecimento e captura de regiões específicas da tela. Cada schema especifica propriedades detalhadas, tipos e restrições para garantir a integridade dos dados de entrada, como coordenadas, duração, suavidade e botões do mouse, além de parâmetros para reconhecimento visual com níveis de confiança e regiões delimitadas. O comportamento central do código é fornecer uma estrutura rigorosa para validar comandos de automação de interface gráfica, assegurando que as ações sejam executadas com parâmetros corretos e consistentes, facilitando a integração com sistemas de automação e testes visuais. A ausência de propriedades adicionais e a definição de valores padrão indicam um controle estrito sobre os dados, promovendo segurança e previsibilidade no uso das ações definidas. Este conjunto de schemas é essencial para garantir que as interações com a interface sejam precisas, configuráveis e validadas antes da execução, suportando fluxos automatizados robustos e confiáveis.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse and Screen Interaction Automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Interface Gráfica, UI Automation, Testes Automatizados</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>MVP</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa dos parâmetros de entrada, Proibição de propriedades adicionais não definidas, Garantia de valores dentro dos limites especificados</values>
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
            <values>Schema Validation, Data Contract</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Schemas definidos em módulo separado para validação e reutilização</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para propriedades, PascalCase para constantes exportadas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre schemas de diferentes ações (mouseMove, mouseClick, etc.)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript typings via JSON Schema</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/types/input-event.types.ts</path>
        <name>input-event.types.ts</name>
        <summary>Este arquivo define tipos TypeScript e interfaces para modelar eventos de input do usuário, especificamente eventos de mouse e teclado, transmitidos via Server-Sent Events (SSE). Ele estrutura eventos com propriedades detalhadas como identificador único, timestamp, origem do evento, e coordenadas do cursor, permitindo a captura precisa de interações do usuário. Além disso, especifica contratos para publicadores e ouvintes de eventos, facilitando a emissão e o recebimento desses eventos em sistemas reativos. O código promove uma arquitetura clara para integração de eventos de input em aplicações web, garantindo interoperabilidade e rastreabilidade dos eventos em tempo real, com foco em precisão e extensibilidade para múltiplas fontes de input.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Event Tracking System</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Interaction Analytics, Real-time User Input Capture, SSE</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>MVP</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir unicidade do id do evento, Manter ordem temporal dos eventos, Precisão na captura das coordenadas do cursor</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Server-Sent Events (SSE)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Observer Pattern, Discriminated Union</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/events - definição de tipos e interfaces de eventos, src/publishers - implementações de IEventPublisher, src/listeners - implementações de IEventListener</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para tipos e interfaces, camelCase para funções e variáveis, constantes em UPPER_SNAKE_CASE</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre definição de tipos, publicação e escuta de eventos, Interfaces para desacoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript ESLint Recommended</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>@typescript-eslint/no-explicit-any, @typescript-eslint/strict-boolean-expressions</values>
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
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/unit para testes de tipos e interfaces, tests/integration para fluxos de eventos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para IEventPublisher e IEventListener</values>
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
            <values>Code review obrigatório, Checks de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Lint, Testes unitários, Build, Deploy automático em staging</values>
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
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>SSE API, TypeScript typings</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipos, Cobertura de testes, Clareza na documentação</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para todas as interfaces e funções públicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de union types para eventos, Separação clara entre publisher e listener</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Server-Sent Events (SSE)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON com payload InputEvent</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/components/PrintScreenButton.tsx</path>
        <name>PrintScreenButton.tsx</name>
        <summary>O componente React PrintScreenButton é responsável por permitir que o usuário capture a tela atual via uma chamada assíncrona a uma API RESTful, exibindo o resultado em formato de imagem base64. Ele gerencia estados internos para controlar o loading, erros e a imagem capturada, garantindo uma experiência responsiva e robusta ao usuário. O componente utiliza React Bootstrap para UI, implementa tratamento de erros detalhado e previne múltiplos cliques simultâneos, integrando-se a um backend que fornece a captura de tela, habilitando funcionalidades de captura visual para aplicações web.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>PrintScreen Web Capture, Componente para captura de tela via API</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Application, User Interface, Screen Capture, API Integration</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Não permitir múltiplas requisições simultâneas, Exibir mensagens claras de erro, Garantir segurança da chave API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x, React Bootstrap 2.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>API REST /api/v1/screen/print, Environment Variables for API Key</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Hooks Pattern, Separation of Concerns</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/components - UI components, src/types - TypeScript types, src/api - API interaction abstractions (implied)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase for Components, camelCase for functions and variables, Upper snake case for environment variables</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>UI components isolated from API logic, Types imported from centralized types module</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide (implied)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint with React plugin (implied)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier with default config (implied)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc style comments</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript typing</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest (implied)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>__tests__ folders or alongside components (implied)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;=80% coverage (implied)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock fetch API calls</values>
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
            <values>API Key via HTTP Header</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Valid API Key required for endpoint access</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>API Key stored in environment variables, não exposta no código</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>x-api-key header</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>HTTPS obrigatório para comunicação segura</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Resposta da API em até 2 segundos (recomendado)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Minimizar latência da captura, Evitar bloqueio UI durante requisição</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Nenhum cache explícito no cliente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>API deve suportar múltiplas requisições simultâneas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Objeto JSON com campos success, message e data</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Console.error para erros no cliente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Reset de estado de erro via dismissible Alert</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>React, React Bootstrap, API REST /api/v1/screen/print</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React 18.x, React Bootstrap 2.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types/api.types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Melhorar tratamento de erros e retries, Implementar caching para imagens</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Nenhum fallback para falha na API, Chave API pode ser exposta se não configurada corretamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Renderização de imagens grandes pode impactar UI</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, Manutenção da responsividade, Segurança da chave API</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Comentários JSDoc para funções públicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Clareza e objetividade em comentários e PRs</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de React Bootstrap para UI, Separação da lógica assíncrona do handler de evento</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Versionamento via URL (/v1/)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON com campos success, message, data</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não especificado no cliente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Development, Staging, Production (URLs variáveis)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker (implied), CI/CD pipelines</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>REACT_APP_API_KEY</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de HTTPS para segurança</values>
          </property>
        </properties>
      </file>
      <file>
        <path>web/src/types/api.types.ts</path>
        <name>api.types.ts</name>
        <summary>Este arquivo define interfaces TypeScript para padronizar as respostas da API de automação relacionadas à captura de tela. Ele especifica a estrutura dos dados retornados em casos de sucesso, incluindo a imagem capturada e o timestamp, além de um formato unificado para erros, com mensagens e detalhes opcionais. O código facilita o tratamento consistente das respostas da API, permitindo que consumidores do serviço interpretem facilmente o sucesso ou falha das operações, promovendo robustez e clareza na comunicação entre front-end e back-end.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>API de automação para captura de tela</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, API, Screen Capture</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Respostas da API devem seguir o formato definido para garantir interoperabilidade</values>
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
            <values>Type-safe API Response Modeling</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - definição de tipos e interfaces para API</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para interfaces e tipos, camelCase para propriedades</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Módulo isolado para tipagem, sem dependências externas</values>
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
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>success: boolean, message: string, error?: string</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
          </property>
        </properties>
      </file>
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Analise o código que ainda não foi commitado e está dentro da pasta web. Esse código foi criado com o objetivo de permitir a criação de ações, possibilitando adicionar e remover ações, baseado em todas as opções disponíveis na nossa api. Portanto, quero que você verifique esse código, veja se ele está correto e se atende a esses requisitos.

Em segundo lugar, execute o comando 'npm start' e, caso ocorra algum erro — que eu já sei que está acontecendo —, corrija todos os erros até que o comando 'npm start' funcione corretamente. Quando terminar isso, você deve conseguir commitar tudo. Se houver qualquer problema de pre-commit, ESLint ou qualquer outro, corrija até conseguir commitar também.

Ou seja, é necessário garantir que o 'npm start' está funcionando e que o commit pode ser realizado. Além disso, é preciso garantir que a feature foi corretamente implementada: adicionar e remover itens, e, ao adicionar um item, ter todos os seletores baseados em mouse e teclado disponíveis.

Último plano: Serão analisados componentes, tipos e fluxos Redux/Context relacionados ao builder de ações. Corrigiremos dependências, tipagens, handlers e validações até o projeto inicializar sem erros, permitindo commit limpo. O plano detalha cada etapa técnica e pontos críticos.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: O builder de ações falha por tipagens incompletas, imports quebrados e ausência de enums que espelhem todas as rotas /api/v1/automation. Criaremos src/web/types/action.types.ts com union MouseActionType | KeyboardActionType, ajustaremos PrintScreenButton para reutilizar hooks, moveremos state para Context ActionsProvider e corrigiremos caminhos errados em imports relativos. O fluxo final: UI ➜ ActionSelector ➜ ActionForm ➜ dispatch(addAction) ➜ Preview.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Estruturaremos interface ActionItem { id: string; kind: 'mouse'|'keyboard'; subtype: string; payload: Record<string, unknown>; } em web/src/types. ActionsContext manterá const [actions,setActions] = useState<ActionItem[]>([]). Persistência em runtime via LocalStorage: useEffect sincroniza actions em "automationActions:v1" a cada mudança; On load, parse JSON e valida via zod schema ActionListSchema para evitar corrupção.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: Integraremos components/ActionList.tsx, ActionCreator.tsx e api/automation.client.ts. ActionCreator consome GET /api/v1/automation/meta para popular select; geraremos service file web/src/api/automation.client.ts com fetch wrapper e cache de 5min via SWR. ActionList receberá onRemove(id) para splice, e KeyboardService adapter já usado no backend será mapeado em constantes para exibição human-friendly, mantendo DRY entre frontend e schemas compartilhados.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: Tratamos: tentativa de adicionar ação sem todos campos obrigatórios (mostrar inline error), subtype incompatível com kind (validação zod), remoção de índice inexistente (noop + warn), LocalStorage acima de 5 MB (catch e fallback memory), falha de fetch meta (retry exponencial 3x), conflito de ids (usaremos nanoid(8)). Para build, capturaremos Missing JSX import React em tsconfig com "jsxImportSource": "react".

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Criaremos config/actionBuilder.config.ts exportando {storageKey, metaEndpoint, maxActions}. Valores podem ser sobrescritos via env REACT_APP_ACTION_META_ENDPOINT. Para extensão, ActionRegistry: Map<string, React.FC<ActionFormProps>> registrado em index.ts. Novas ações só precisam registrar componente e payload serializer. Hook useActionRegistry expõe register/unregister permitindo plugins posteriores.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Usaremos Component + Context pattern. Diagrama: App ➜ <ActionsProvider> ➜ {ActionCreator, ActionList, PreviewPane}. Provider encapsula estado. ActionCreator dividido: Selector (Factory), DynamicForm (Observer: lista vive no registry). Adapter Pattern converte payload local em DTO AutomationRequestDTO ao enviar. useReducer gerencia estado com actions ADD, REMOVE, CLEAR mantendo imutabilidade. Todos arquivos em web/src/actions/*.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Operações O(1) para add/remove via array + index; acima de 500 itens muda para Map para evitar splice O(n). Lazy-load dos forms via React.lazy e Suspense evitando bundle inicial >150 kB. Memoização de ActionItemRow com React.memo previne re-render. LocalStorage sync debounced 300 ms. SWR cache evita consultas repetidas ao endpoint meta. Lighthouse alvo: 90+ performance score.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Zod ActionItemSchema valida fields, impede script injection no payload via z.string().max(1000). Fetch wrapper inclui header x-api-key de process.env.REACT_APP_API_KEY e verifica HTTPS origin. Escapamos valores exibidos no JSX. Linter rule jsx-no-target-blank para links. Env vars tipadas no vite-env.d.ts garantindo que chave não vaze para bundle se NODE_ENV==='production' (webpack DefinePlugin).

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Unit: ActionReducer.test.ts confirma ADD/REMOVE fluxo. Component: ActionCreator.test.tsx com React Testing Library cria nova ação e verifica render. Integration: start mock server msw interceptando /meta e /automation/execute; run jest --runInBand para evitar race. Coverage target 85%. e2e: playwright script adiciona 3 ações, remove 1, compara LocalStorage length. CI job ‘npm run test:ci’ obrigatório no PR.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: (1) `npm start` sem erros, vite/webpack dev server acessível; (2) ESLint `npm run lint` zero warnings; (3) Husky pre-commit passa; (4) UI permite adicionar todos 14 subtypes (move, click, drag, scroll, typeText, pressKey, combo etc.); (5) Remoção atualiza Context e LocalStorage; (6) Tests >85% coverage; (7) Commit signed e push sem rejeição. Documentação README seção “Action Builder” atualizada.
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