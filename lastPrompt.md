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
    <name>NutJS Desktop Automation API – Web/Mobile/Desktop automation backend with AI/LLM integration, input event capture, and RESTful API for mouse, keyboard, clipboard, and screen control</name>
    <domain>Web/Mobile/Desktop Automation, AI/LLM Integration, Backend API, RESTful API, Desktop Input Event Capture, Clipboard Management, Screen Capture, Keyboard and Mouse Control, UI Automation, Test Automation, Software Development, Event Streaming (SSE), Command Execution, Computer Vision, Natural Language Processing, Frontend Web Application, Status Monitoring, DevOps</domain>
    <current_phase>Development, Production, Maintenance, Stable Configuration, MVP, Testing Automation, Debugging</current_phase>
    <critical_business_rules>API key authentication required for sensitive endpoints, Strict input validation using JSON Schema/Zod, Clipboard content limited to 1 MB, Text input must be non-empty and not exceed 10,000 characters, Key combinations must use allowed modifiers and have 1-5 keys, Timing values must be non-negative and not exceed 300,000ms, Mouse and screen coordinates must be within valid screen bounds, Consistent error response format with proper HTTP status codes, No sensitive data leakage in production logs, Environment variables must be loaded and validated per environment, Rate limiting to prevent overload (max 50,000 events/s), Buffer size and event age must be within configured limits, Singleton pattern for event dispatcher and buffer, Consistent logging for audit and debugging, 80% minimum test coverage for critical modules, No emission of test files in production build, LLM requests must respect token and temperature limits, Output parsing must fallback safely on error, API versioning must be respected, SPA and API routes must not conflict, Graceful shutdown to prevent data loss, Consistent UI responsiveness and error feedback, Unique IDs for actions and events, No concurrent execution of conflicting actions, Secure handling of API keys and environment variables</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript 5.x, Node.js 18+, JavaScript (ES2022+), React 18.x, HTML5, CSS3</primary_language>
    <frameworks>Fastify 4.x, React 18.x, Jest 29.x, Webpack 5.x, TSyringe, Zod 3.x, LangChain, NutJS, React-Bootstrap 2.x, React Router DOM 6.x, dotenv 16.x, pino 8.x, uiohook-napi</frameworks>
    <databases>None (stateless, uses localStorage for frontend state)</databases>
    <external_services>OpenAI API, DeepSeek API, NutJS, clipboardy, sharp, nanoid, LangChain LLM API, Server-Sent Events (SSE), Environment variables via dotenv, Custom logger (pino), APIs for LLM models (gpt-4.1, deepseek-coder, etc.)</external_services>
    <package_manager>npm, yarn</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Clean Architecture, Dependency Injection, Modular Architecture, RESTful API, Event-driven (SSE), Singleton, Adapter Pattern, Factory Pattern, DTO Pattern, Schema Validation, Service Layer, Observer Pattern, Plugin Pattern, Component-Based Architecture (frontend), SPA (Single Page Application)</design_pattern>
    <folder_structure>src/ (main source code), dist/ (build output), web/ (frontend React app), tests/ (unit and integration tests), config/ (environment and logger configs), domain/ (entities, enums, interfaces), application/services/ (business logic), infrastructure/adapters/ (external integrations), interface/controllers/ (API controllers), dto/ (data transfer objects and schemas), schemas/ (validation schemas), types/ (TypeScript types), public/ (static assets for frontend)</folder_structure>
    <naming_conventions>UPPER_SNAKE_CASE for environment variables, camelCase for variables and functions, PascalCase for classes, types, and interfaces, kebab-case for files and endpoints, Suffix &apos;Service&apos; for service classes, Prefix &apos;I&apos; for interfaces, Suffix &apos;Schema&apos; for validation schemas, Files with .ts/.tsx extensions for TypeScript</naming_conventions>
    <module_boundaries>Clear separation between backend (API) and frontend (React), Domain layer independent from Application and Infrastructure, Application depends on Domain, Infrastructure depends on Application, Controllers depend on services via DI, Validation schemas isolated from business logic, DTOs and schemas separate from domain entities, Config, types, and services separated, Mocks isolated in tests, Frontend components isolated from API types</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript/TypeScript Style Guide, ESLint Recommended, Prettier, TypeScript ESLint Recommended</style_guide>
    <linting_rules>ESLint with @typescript-eslint plugin, No explicit any, no-unused-vars: error (ignore args starting with _), strict typing, eslint-config-prettier, plugin:react/recommended, plugin:react-hooks/recommended</linting_rules>
    <formatting>Prettier with default config, semi: true, singleQuote: true, trailingComma: all, printWidth: 100, tabWidth: 2, Integration with ESLint</formatting>
    <documentation_style>JSDoc for public methods, classes, and interfaces, Markdown comments for endpoints and parameters, Inline comments in Portuguese for context</documentation_style>
    <type_checking>Strict TypeScript (strict mode enabled), Types via Zod for runtime validation, No implicit any, StrictNullChecks, TypeScript typings for payloads and responses</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29.x, ts-jest, React Testing Library</test_framework>
    <test_structure>tests/unit for unit tests, tests/integration for integration tests, tests/components for UI tests, tests/hooks for custom hooks, __tests__ folders alongside source files</test_structure>
    <coverage_requirements>Minimum 80% coverage for statements, branches, functions, and lines, &gt;= 90% for DTOs and schemas, &gt;= 80% for critical modules</coverage_requirements>
    <test_patterns>AAA (Arrange-Act-Assert), Given-When-Then, Mocks for external dependencies, Snapshot testing for UI</test_patterns>
    <mocking_approach>Jest mocks and spies, jest.mock for external modules, Mocks for clipboardy, pino, nanoid, and adapters, Mocking Fastify request and reply, Mock global for localStorage, Mocks for LLM responses and adapters</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review mandatory, Passing CI checks, Automated lint and test checks, At least one reviewer approval</pr_requirements>
    <ci_cd_pipeline>Build, lint, test, and deploy automated via GitHub Actions, Unit and integration tests, Coverage reporting, Deploy to staging and production</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install, cp .env.example .env, npm install &amp;&amp; npm run build, ./install_dependencies.sh</setup>
    <install>npm install, npm ci</install>
    <dev>npm run dev, npm run dev:web, npm run dev:full, webpack serve --config webpack.config.js, npm start</dev>
    <test>npm test, npm run test, npm run test:unit, npm run test:integration, npm run test:coverage, npm test -- --coverage</test>
    <build>npm run build, npm run build:web, npm run build:prod, tsc --build, webpack --config webpack.config.js</build>
    <lint>npm run lint, eslint . --ext .ts, npm run lint:fix</lint>
    <format>npm run format, prettier --write ., npm run format:check</format>
  </commands>
  <security_constraints>
    <authentication_method>API key via HTTP header &apos;x-api-key&apos;, JWT (for external services)</authentication_method>
    <authorization_rules>API key must be valid and authorized for endpoint access, Role-based Access Control (RBAC) for future extensibility, Access restricted to streaming and screen capture via authentication middleware</authorization_rules>
    <sensitive_data>API keys for OpenAI and DeepSeek, Clipboard content (max 1 MB), Environment variables for configuration, User input event data (mouse, keyboard), Base64 image data (not stored, max 1 MB), Prompt and LLM responses (handled with confidentiality)</sensitive_data>
    <security_headers>Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, Content-type: application/json, x-api-key required in header, Cache-Control: no-cache, Connection: keep-alive, X-Accel-Buffering: no</security_headers>
    <encryption_requirements>TLS/HTTPS for all external and internal API communication, Environment variables must not expose sensitive data, No sensitive data stored at rest, Clipboard and image data handled in-memory only</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>API responses &lt; 200ms for standard operations, Screen capture and LLM responses &lt; 5000ms, Real-time event streaming with minimal latency, Keyboard and clipboard operations &lt; 100ms, Status checks &lt; 1s, Timeouts for parsing and LLM requests configurable</response_time_limits>
    <optimization_priorities>Low latency for automation and event streaming, Efficient memory usage for event buffers, Fast build and test cycles, Validation efficiency to minimize request overhead, Performance optimized for production, legibility in development, Balance between speed and accuracy for input simulation</optimization_priorities>
    <caching_strategy>In-memory circular buffer for recent events, Cache localStorage with TTL for status checks, No persistent cache for dynamic operations, Config loaded once at startup</caching_strategy>
    <scalability_considerations>Horizontal scalability via Fastify and Node.js cluster, Support for multiple concurrent SSE clients, Configurable buffer and batch sizes for high event throughput, Modular architecture for easy extension, Frontend and backend can scale independently, Singletons limit per-process state, but can scale horizontally</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standard JSON with fields: success, error, code, details, Zod validation error format for input validation, CommandResult with success:boolean, data?:object, error?:string, Consistent error response for all endpoints</error_format>
    <logging_strategy>Structured logging with pino (info, warn, error, debug), Log level configurable via LOG_LEVEL, Logs separated for errors and standard output, Sensitive data masked in production logs, Human-readable logs in development</logging_strategy>
    <monitoring_tools>Sentry for production error monitoring, PM2 internal monitoring, Custom logger with possible integration to external systems</monitoring_tools>
    <error_recovery>Automatic retries for transient failures, Graceful shutdown on critical errors, Fallbacks for output parsing errors, Reject invalid requests with HTTP 400 and descriptive message, Buffer and event dispatcher reset on failure, No sensitive data leakage on error</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>OpenAI API, DeepSeek API, Fastify, TypeScript, Jest, NutJS, TSyringe, Zod, clipboardy, pino, LangChain, uiohook-napi, React, Webpack, dotenv, nanoid, sharp, React-Bootstrap, React Router DOM</critical_dependencies>
    <deprecated_packages>None</deprecated_packages>
    <version_constraints>Node.js &gt;=18, TypeScript 5.x, Fastify 4.x, Zod 3.x, React 18.x, React-Bootstrap 2.x, dotenv 16.x, clipboardy &gt;=3.0.0, nanoid &gt;=4.0.0, Webpack 5.x</version_constraints>
    <internal_packages>src (main source code), web (frontend), domain/interfaces, domain/entities, application/services, infrastructure/adapters, interface/controllers, dto, schemas, types</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Refactoring legacy JavaScript modules to TypeScript, Improve test coverage for edge cases (clipboard, input events), Enhance error handling granularity, Validation of environment variables could be more robust, Authentication and authorization not fully implemented, Documentation needs more detail, Maintain backward compatibility with legacy formats, Improve fallback and error handling in complex parsing, API key exposure risk in some scripts, UI error feedback could be improved</technical_debt>
    <known_issues>Inconsistencies in local development environments, Clipboard access may fail on some OS configurations, macOS Accessibility permissions required for input capture, Possible event loss on buffer overflow, Rate limiting may drop events during spikes, Performance impact for long text typing with high delays, Dependency on local API availability, Possible exposure of API key in frontend, Cache may be cleared if invalid JSON detected, No explicit concurrency control for actions</known_issues>
    <performance_bottlenecks>Image processing (sharp) can be resource-intensive, Sequential await in typing may cause slowdowns for long texts, SSE streaming overhead with many concurrent clients, Buffer growth without pruning can impact memory, Delays in input simulation can impact total execution time, Parsing and validation of large schemas may impact performance</performance_bottlenecks>
    <migration_status>Migration to TypeScript completed, Jest and Fastify updated to latest versions, Gradual migration from legacy to dynamic output formats ongoing, Stable, no major migrations in progress</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Test coverage, Code quality, Linting compliance, TypeScript type safety, Security and input validation, Consistent error handling and logging, Separation of concerns, Modularity and maintainability, Responsiveness and UI feedback</code_review_focus>
    <documentation_requirements>Clear documentation via JSDoc for all public APIs and methods, README and endpoint examples, Document environment variables and usage, JSDoc for schemas and DTOs, Inline comments in Portuguese for context</documentation_requirements>
    <communication_style>Objective and technical comments, Markdown for PRs, Portuguese for context and comments, Conventional Commits for commit messages, Clear and concise PR descriptions</communication_style>
    <decision_log>Adoption of Clean Architecture and modular separation, Use of Fastify for backend and React for frontend, API key for authentication, TSyringe for dependency injection, Zod for validation and type safety, Pino for structured logging, Jest for testing, Webpack for frontend build, LocalStorage for frontend state, SSE for real-time event streaming, React-Bootstrap for UI, Conventional Commits for commit messages</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>RESTful, REST with SSE endpoints, Internal event dispatching API</api_style>
    <versioning_strategy>URI versioning (e.g., /api/v1), Prefix /api/v1 for versioning</versioning_strategy>
    <response_formats>application/json, Standard JSON: { success, data, error }, Base64 encoded images, text/event-stream for SSE, CommandResult with success, data, error</response_formats>
    <rate_limiting>Configurable via environment variable (maxRate), Default 50,000 events per second, Recommended 1000 requests per minute per IP for API</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development (http://localhost:3000), staging, production, test</environments>
    <deployment_method>PM2 process manager, Docker container, CI/CD pipeline via GitHub Actions, Webpack for frontend static hosting</deployment_method>
    <environment_variables>NODE_ENV, PORT, LOG_LEVEL, API_KEY, OPENAI_API_KEY, DEEPSEEK_API_KEY, INPUT_EVENT_BUFFER, INPUT_EVENT_RATE, INPUT_EVENT_HEARTBEAT, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, REACT_APP_API_URL, REACT_APP_GITHUB_DOCS_URL</environment_variables>
    <infrastructure_constraints>Memory limits for buffers and image processing, macOS Accessibility permissions required for input capture, Firewall and network restrictions, Support for Windows, Linux, and macOS, Environment variables must be configured correctly, Persistent SSE connections required, Local API must be running for automation, No sensitive data stored at rest</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/application/services/clipboard.service.ts</path>
        <name>clipboard.service.ts</name>
        <summary>O arquivo implementa um serviço de automação para manipulação da área de transferência (clipboard) em um ambiente Node.js utilizando TypeScript. Ele oferece funcionalidades principais para copiar, colar e limpar o conteúdo do clipboard, garantindo validações como limite máximo de tamanho do conteúdo (1 MB) e tratamento robusto de erros. A classe ClipboardService integra-se ao sistema via injeção de dependência (tsyringe) e utiliza a biblioteca clipboardy para interagir com o clipboard do sistema operacional, retornando resultados padronizados que indicam sucesso ou falha das operações, além de fornecer dados relevantes sobre o conteúdo manipulado.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Clipboard Automation Service, Serviço de automação para manipulação da área de transferência</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, Clipboard management, Sistemas desktop e web</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Conteúdo copiado não pode exceder 1 MB, Operações devem retornar resultados padronizados, Tratamento robusto de erros</values>
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
            <values>clipboardy 3.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Service Layer, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/ - entidades e interfaces de domínio, services/ - serviços de automação, infrastructure/ - integrações externas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes, camelCase para métodos e variáveis, sufixo Service para classes de serviço</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio e infraestrutura, Interfaces definem contratos para serviços, Dependências injetadas via tsyringe</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Regras para evitar any implícito e garantir tipagem forte</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para documentação de métodos e classes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript, Uso de tipos explícitos para parâmetros e retornos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/services/clipboardService.test.ts, Testes unitários focados em copy, paste e clear</values>
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
            <values>Mock de clipboardy para simular operações de clipboard</values>
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
            <values>Build, Lint, Test, Deploy automático em staging</values>
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
            <values>Conteúdo do clipboard pode conter dados sensíveis, deve ser tratado com cuidado</values>
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
            <values>Operações devem ser rápidas, idealmente &lt; 100ms</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre velocidade e uso de memória, limite de 1 MB para evitar overhead</values>
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
            <values>Objeto CommandResult com success boolean e error string opcional</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs de erros devem ser capturados externamente, não implementado diretamente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de exceções para evitar falhas e retornar mensagens claras</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>clipboardy, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>clipboardy &gt;=3.0.0, tsyringe &gt;=4.0.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../domain/interfaces/automation-service.interface.js, ../../domain/entities/command-result.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Necessidade de testes mais abrangentes para edge cases do clipboard</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possíveis falhas em sistemas operacionais com restrições de acesso ao clipboard</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, Validação de entrada, Consistência de retorno</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para todos os métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de clipboardy para compatibilidade multiplataforma, Limite de 1 MB para evitar overhead</values>
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
            <values>CommandResult com success, data e error</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values></values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipeline</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Dependência do sistema operacional para acesso ao clipboard</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/event-buffer.service.ts</path>
        <name>event-buffer.service.ts</name>
        <summary>O código implementa um serviço de buffer circular para armazenamento temporário de eventos do tipo InputEvent, permitindo o replay eficiente de eventos após reconexões de clientes SSE (Server-Sent Events). Ele mantém um histórico limitado e gerenciável de eventos, suportando operações como adição, recuperação por ID, intervalo de tempo, limpeza e remoção de eventos antigos, garantindo a integridade e disponibilidade dos dados para sincronização de estado entre servidor e clientes. O serviço é projetado para operar com alta performance e baixa latência, utilizando um buffer circular fixo para otimizar o uso de memória e facilitar a manutenção do histórico recente de eventos em sistemas reativos e distribuídos.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>EventBuffer Service, Buffer circular para eventos SSE</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Realtime event streaming, SSE (Server-Sent Events), Event replay</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Manter ordem cronológica dos eventos, Garantir replay correto após reconexão, Não perder eventos recentes dentro do buffer</values>
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
            <values>SSE clients, Environment variables</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Circular Buffer</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/config - configurações, src/types - definições de tipos, src/services - serviços de negócio</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, PascalCase para interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, serviços e configuração, Dependência unidirecional para evitar acoplamento circular</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de any implícito</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para métodos e classes</values>
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
            <values>tests/unit para testes unitários, tests/integration para testes de integração</values>
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
            <values>Mocks para InputEvent e logger</values>
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
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável diretamente (serviço interno)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de acesso externo ao serviço</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Eventos não contêm dados sensíveis diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Gerenciados em camada superior (SSE)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável ao buffer em memória</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações em tempo constante ou linear com tamanho do buffer</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência e uso eficiente de memória</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Buffer circular atua como cache de eventos recentes</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Limitação do tamanho do buffer para evitar uso excessivo de memória</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não há tratamento explícito de erros no código apresentado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de logger para info e debug em operações críticas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Reinicialização do buffer via método clear</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, logger, InputEvent type</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>tsyringe 4.x, TypeScript 5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../types/input-event.types.js, ../../config/logger.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Correção do uso incorreto de &apos;new array&apos; para &apos;new Array&apos;</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Ausência de controle de concorrência, Possível perda de eventos em buffer cheio</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Operações lineares em tamanho do buffer para recuperação</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Estável, sem migrações em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de estilo, Cobertura de testes, Performance e segurança</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc completo para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de buffer circular para otimização de memória</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (serviço interno)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Array de InputEvent</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado no serviço</values>
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
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>INPUT_EVENT_BUFFER</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação de memória para buffers grandes</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/event-dispatcher.service.ts</path>
        <name>event-dispatcher.service.ts</name>
        <summary>O código implementa um serviço singleton chamado EventDispatcher que gerencia o despacho e distribuição de eventos de input, especificamente eventos de mouse e teclado, para múltiplos ouvintes registrados. Utilizando o padrão Observer, ele mantém uma fila interna de eventos, aplica um rate limiter configurável para controlar a taxa de eventos processados por segundo e filtra teclas não imprimíveis para garantir a qualidade dos dados. O serviço suporta eventos padrão e estendidos, garantindo a atribuição de identificadores únicos e processa a fila de eventos de forma assíncrona, notificando todos os ouvintes registrados, além de fornecer estatísticas em tempo real sobre seu estado operacional.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>EventDispatcher, Serviço de despacho de eventos de input</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Input event management, User interaction tracking, Real-time event processing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Rate limiting para evitar sobrecarga, Garantir entrega de eventos para todos os listeners, Filtragem de teclas não imprimíveis</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe (Dependency Injection)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>nanoid (ID generation)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Singleton, Observer, Rate Limiter</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config/ (configurações e logger), types/ (definições de tipos), services/ (serviços singleton)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, PascalCase para interfaces e tipos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, configuração e serviços, Dependência unidirecional para evitar acoplamento circular</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de any implícito, Regras para async/await</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para métodos e classes</values>
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
            <values>tests/unit/services, tests/integration</values>
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
            <values>Mocks para listeners e eventos, Fixtures para eventos padrão e estendidos</values>
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
            <values>Code review obrigatório, Checks automáticos de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy automático em staging</values>
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
            <values>Listeners devem ser confiáveis para evitar execução maliciosa</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Processamento assíncrono imediato para minimizar latência</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de processamento e controle de taxa</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Singleton limita instância, mas pode ser escalado horizontalmente com cuidado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Logs estruturados via logger configurado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Níveis debug, info, warn e error para monitoramento detalhado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Logger customizado, possível integração com sistemas externos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Continuação do processamento mesmo após falha em listener</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, nanoid, logger interno</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>tsyringe &gt;=4.0.0, nanoid &gt;=4.0.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../types/input-event.types.js, ../../config/environment.js, ../../config/logger.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Melhorar tratamento de eventos estendidos, Documentação mais detalhada</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Rate limit pode descartar eventos em picos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Processamento sequencial da fila pode atrasar em alta carga</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Verificação de tratamento de erros, Conformidade com rate limiting, Qualidade dos logs</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para todos os métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, uso de emojis para logs informativos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de singleton para garantir instância única, Rate limiter configurável via variável de ambiente</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Internal event dispatching API</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Configuração via variável de ambiente INPUT_EVENT_RATE, Limite padrão 5000 eventos por segundo</values>
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
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>INPUT_EVENT_RATE</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação de instância única por processo, Dependência de variáveis de ambiente para configuração</values>
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
        <path>src/application/services/screen.service.ts</path>
        <name>screen.service.ts</name>
        <summary>Este arquivo implementa um serviço de captura e busca de imagens na tela, utilizando injeção de dependência para abstrair a interface de captura e reconhecimento visual. A classe ScreenService oferece métodos assíncronos para localizar templates gráficos na tela, capturar regiões específicas e aguardar a aparição de um template dentro de um timeout configurável. O serviço transforma imagens codificadas em base64 em buffers binários para processamento, delegando a lógica de reconhecimento ao adaptador injetado. Além disso, registra logs detalhados para monitoramento e tratamento de erros, garantindo rastreabilidade e robustez na operação. Essa funcionalidade é essencial para automação de testes visuais, robôs de automação ou sistemas que dependem de reconhecimento de padrões visuais em interfaces gráficas.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Screen Automation Service, Serviço de automação visual para captura e reconhecimento de tela</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Robotic Process Automation (RPA), Reconhecimento visual, Screen capture</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Precisão mínima de reconhecimento (confidence) deve ser respeitada, Timeouts para espera de templates não devem ser ultrapassados, Logs devem registrar falhas para auditoria</values>
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
            <values>ScreenAdapter (interface para captura e reconhecimento visual)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Adapter Pattern, Service Layer</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/entities - entidades de domínio, dto - objetos de transferência de dados, services - lógica de negócio e integração</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e interfaces, camelCase para métodos e variáveis, Prefixo I para interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre DTOs, entidades de domínio e serviços, Dependência invertida via injeção para adaptadores externos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript ESLint recommended</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>@typescript-eslint/recommended</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para métodos públicos</values>
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
            <values>Testes localizados em __tests__ ou pasta tests paralela</values>
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
            <values>Mock de ScreenAdapter para testes unitários</values>
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
            <values>Revisão obrigatória, Checks de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy automático</values>
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
            <subProperty>sensitive_data</subProperty>
            <values>Imagens base64 devem ser tratadas com cuidado para evitar exposição</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações de captura e busca devem responder em até 5 segundos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre velocidade e precisão do reconhecimento</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Serviço deve suportar múltiplas requisições concorrentes via injeção de dependência</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados com objetos contendo mensagem e stack trace</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso do pino para logs em níveis debug, info e error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Rejeição de promises para falhas, sem retry automático</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, pino, ScreenAdapter interface</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0, tsyringe 4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../dto/automation-request.dto.js, ../../domain/entities/screen-region.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Tratamento de erros mais granular, Melhorar cobertura de testes</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência da qualidade do adaptador externo para reconhecimento</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Decodificação base64 e busca podem ser custosas em imagens grandes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, Clareza nos logs, Uso correto de async/await</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Dependency Injection para desacoplamento, Uso de pino para logging</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Base64 encoded images, JSON objects for match results</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker container</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de acesso a recursos gráficos para captura de tela</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/dependency-injection.ts</path>
        <name>dependency-injection.ts</name>
        <summary>Este arquivo é responsável pela configuração e registro das dependências do sistema utilizando o container de injeção de dependências do tsyringe. Ele centraliza a associação entre interfaces e suas implementações concretas, especialmente adaptadores para dispositivos de entrada (mouse, teclado, tela) e serviços de alto nível que encapsulam funcionalidades como captura global de input, manipulação da área de transferência e integração com modelos de linguagem (LLM). O código promove a modularidade e a inversão de controle, facilitando a manutenção e a escalabilidade do sistema. Além disso, registra singletons para componentes que gerenciam eventos e buffers, garantindo estado compartilhado consistente. Essa configuração é fundamental para o funcionamento coordenado dos serviços e controladores que compõem a aplicação, habilitando a orquestração de eventos de input e a interação com o ambiente operacional e modelos de IA.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Automation System, Sistema para automação e captura de eventos de input</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de desktop, Input devices, Integração com LLM</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Registro único de singletons para serviços de eventos, Consistência na injeção de dependências</values>
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
            <values>LangChain LLM API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Singleton, Adapter Pattern, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - lógica de negócio e serviços, infrastructure/adapters - adaptadores para hardware e APIs externas, interface/controllers - controladores para input e eventos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes, camelCase para variáveis e funções, Sufixo Service para serviços, Adapter para adaptadores</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre application, infrastructure e interface, Dependências unidirecionais do container para serviços</values>
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
            <values>tests/unit para testes unitários, tests/integration para testes de integração</values>
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
            <values>Mocking de adaptadores e serviços externos</values>
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
            <values>Revisão obrigatória, Checks automáticos de lint e testes</values>
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
            <values>Baixa latência na captura de eventos, Uso eficiente de singletons para estado compartilhado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Facilidade para adicionar novos adaptadores e serviços via DI</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, nutjs adapters, LangChain LLM Adapter</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, infrastructure/adapters, interface/controllers</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência na injeção de dependências, Uso correto de singletons, Clareza na separação de responsabilidades</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para serviços e adaptadores</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção do tsyringe para DI, Uso do padrão Adapter para integração com hardware e APIs</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/environment.ts</path>
        <name>environment.ts</name>
        <summary>Este arquivo de configuração em TypeScript tem como objetivo principal centralizar e padronizar a leitura das variáveis de ambiente essenciais para a aplicação, garantindo que parâmetros críticos como NODE_ENV, porta, host, níveis de log e chaves de API estejam disponíveis de forma consistente. Ele utiliza a biblioteca dotenv para carregar variáveis de ambiente de arquivos .env, permitindo flexibilidade entre ambientes de desenvolvimento e produção. Além disso, expõe flags booleanas para facilitar a identificação do ambiente atual, habilitando comportamentos condicionais no sistema. Essa abordagem promove a manutenção, segurança e escalabilidade da aplicação ao isolar configurações sensíveis e facilitar a integração com serviços externos como OpenAI e Deepseek.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Configuração de Ambiente Centralizada, Gerenciamento de variáveis de ambiente para controle de execução</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Backend Node.js, Configuração e integração com APIs externas (OpenAI, Deepseek)</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Desenvolvimento, Preparação para produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Variáveis de ambiente devem estar definidas para evitar falhas, Chaves de API não devem ser expostas em código fonte, Ambiente deve ser corretamente identificado para habilitar comportamentos específicos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.x, Node.js 18+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>dotenv 16.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>OpenAI API, Deepseek API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Configuration Object, Feature Flags</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/config - arquivos de configuração e variáveis de ambiente, src/modules - lógica de negócio e integração com APIs</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e propriedades, PascalCase para tipos e constantes exportadas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Configuração isolada em módulo próprio para evitar acoplamento, Exposição apenas do objeto environment e flags para uso externo</values>
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
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de variáveis de ambiente e serviços externos</values>
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
            <values>npm install &amp;&amp; cp .env.example .env</values>
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
            <values>API Keys para autenticação de serviços externos</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de acesso baseado em ambiente e chaves</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>API Keys e tokens devem ser mantidos fora do código fonte</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Uso de HTTPS para comunicação com APIs externas</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na leitura de configuração, Minimizar overhead no carregamento de variáveis</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Configuração carregada uma única vez na inicialização</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a múltiplos ambientes e escalabilidade horizontal</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Níveis de log configuráveis via variável LOG_LEVEL</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>dotenv</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>dotenv &gt;=16.0.0</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Validação de variáveis de ambiente ainda não implementada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de variáveis de ambiente e segurança das chaves</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar variáveis de ambiente e seus usos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de dotenv para configuração centralizada, Flags booleanas para ambiente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, Kubernetes</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>NODE_ENV, PORT, HOST, LOG_LEVEL, MOUSE_SPEED, SCREEN_CONFIDENCE, API_KEY, OPENAI_API_KEY, DEEPSEEK_API_KEY</values>
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
        <path>src/interface/controllers/input-events.controller.ts</path>
        <name>input-events.controller.ts</name>
        <summary>Este arquivo implementa um controller para streaming de eventos de input via Server-Sent Events (SSE), permitindo a transmissão em tempo real de cliques do mouse e teclas digitadas para clientes conectados. Ele gerencia conexões persistentes, reenvio de eventos perdidos com base no Last-Event-ID, manutenção de um buffer de eventos para replay e limpeza do buffer via endpoints dedicados. Além disso, oferece endpoints para obtenção de estatísticas do sistema de eventos e controle do buffer, garantindo alta disponibilidade e integridade dos dados transmitidos, com mecanismos de heartbeat para manter conexões ativas e logging detalhado para monitoramento e depuração. A arquitetura modular e injeção de dependências facilitam a integração com serviços de dispatcher e buffer, promovendo escalabilidade e manutenção eficiente do sistema de streaming de eventos de input.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Events Streaming Service, Streaming de eventos de input em tempo real via SSE</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Real-time event streaming, User input tracking, SSE (Server-Sent Events)</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir entrega ordenada e completa dos eventos, Manter conexões SSE ativas com heartbeat, Preservar integridade do buffer de eventos para replay</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, tsyringe (Dependency Injection)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Logger service (custom), Config service (inputEventsConfig)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Observer Pattern, MVC (Controller layer)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - serviços de negócio, config - configurações e logger, types - definições de tipos, controllers - camada de controle HTTP</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, kebab-case para endpoints</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Controllers dependem de serviços via injeção, Serviços isolados para lógica de buffer e dispatcher, Tipos compartilhados via pasta types</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de any explícito, Regras para async/await</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão, Quebra de linha em 80-100 caracteres</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para métodos públicos, Comentários em português para contexto</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript, Tipos explícitos para parâmetros e retornos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ ao lado dos controllers e serviços</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then, Mocking de dependências via ts-mockito ou jest.mock</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de EventDispatcher e EventBuffer para testes unitários</values>
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
            <values>Revisão obrigatória, Checks automáticos de lint e testes</values>
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
            <values>Não especificado no código (possível autenticação externa)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não implementado explicitamente no controller</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Cache-Control: no-cache, Connection: keep-alive, X-Accel-Buffering: no</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não tratado no código (depende do transporte HTTPS externo)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Baixa latência para streaming SSE</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência e alta disponibilidade, Minimizar overhead de buffering</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Buffer local de eventos para replay</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a múltiplos clientes SSE simultâneos, Heartbeat para manter conexões vivas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Logs detalhados via logger, Resposta padrão JSON para endpoints REST</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logger customizado com níveis info, debug e error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado, mas logger sugere integração externa possível</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de erros no envio SSE com limpeza de heartbeat</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Fastify, tsyringe, EventDispatcher, EventBuffer, inputEventsConfig, logger</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify 4.x, TypeScript 5.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../application/services/event-dispatcher.service.js, ../../application/services/event-buffer.service.js, ../../config/input-events.config.js, ../../config/logger.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Autenticação e autorização não implementadas, Monitoramento e alertas não integrados</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível desconexão silenciosa se heartbeat falhar</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Buffer pode crescer indefinidamente sem pruning</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Cobertura de testes, Tratamento de erros, Clareza e documentação</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para métodos públicos, Comentários em português para contexto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e claros, Uso de português para contexto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de SSE para streaming em tempo real, Injeção de dependências para desacoplamento</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST com endpoints SSE</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Prefixo /api/v1 para versionamento</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON para endpoints REST, text/event-stream para SSE</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Configuração maxRate no inputEventsConfig (não implementado explicitamente)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, Kubernetes (provável)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Configurações via inputEventsConfig (heartbeatMs, bufferSize, etc.)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de manter conexões SSE abertas, Suporte a proxy sem buffering (X-Accel-Buffering: no)</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/controllers/keyboard.controller.ts</path>
        <name>keyboard.controller.ts</name>
        <summary>Este arquivo implementa um controller REST para operações de automação relacionadas a teclado e clipboard, permitindo a interação programática com entrada de texto e gerenciamento da área de transferência. Ele expõe endpoints para digitar texto com controle de timing, pressionar teclas individuais, executar combinações de teclas, além de copiar, colar e limpar o conteúdo do clipboard. O controller utiliza injeção de dependências para integrar serviços especializados, valida as requisições via schemas JSON e gerencia respostas padronizadas, incluindo tratamento robusto de erros e logging detalhado. Essa funcionalidade habilita automações de input e manipulação de clipboard em aplicações que demandam controle remoto ou testes automatizados, garantindo consistência e segurança nas operações de entrada e saída de dados.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Keyboard and Clipboard Automation Service</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automation, Input Control, Clipboard Management, Software Testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir que operações de teclado e clipboard sejam executadas com sucesso ou retornem erros claros, Validar rigorosamente os dados de entrada para evitar comandos inválidos, Manter integridade e segurança dos dados manipulados no clipboard</values>
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
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Controller-Service Pattern, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - lógica de negócio e serviços, application/dto - objetos de transferência de dados e validações, controllers - definição de endpoints REST, schemas - definições JSON Schema para validação, middleware - middlewares para validação e tratamento</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes em PascalCase (KeyboardController, KeyboardService), Métodos em camelCase (registerRoutes, clipboardCopy), Schemas com sufixo JsonSchema, DTOs com sufixo Request</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Controllers expõem rotas e delegam lógica para services, Services encapsulam regras de negócio e interações com hardware ou sistema, DTOs e schemas isolam validação e tipagem</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript ESLint Recommended</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>eslint-config-standard, no-explicit-any restrito</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para métodos públicos e classes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript (strict mode enabled)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ próximos aos controllers e services</values>
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
            <values>Mocks para serviços externos e injeção de dependências</values>
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
            <values>Não implementado neste controller</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável diretamente, deve ser tratado em middleware externo</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Conteúdo do clipboard tratado com cuidado para evitar vazamento</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Configuração externa ao controller</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações devem responder em milissegundos, exceto typing com timing configurável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência e confiabilidade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade horizontal via instâncias Fastify</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>JSON com campos success:boolean, data:object, error:string</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs estruturados com níveis info e error via Fastify logger</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Retorno de erro padronizado e captura de exceções para evitar crashes</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Fastify, tsyringe, keyboardService, clipboardService</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify 4.x, tsyringe 4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, application/dto, controllers, schemas, middleware</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Uso de any para logger pode ser melhorado para tipagem forte</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Nenhum problema funcional aparente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Operação type pode ser lenta dependendo do timing configurado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Projeto em produção, sem migrações ativas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de schemas, tratamento de erros, logging e injeção de dependências</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para novos endpoints e serviços</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e informativos, sem excesso</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de Fastify para alta performance e tsyringe para DI</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não implementado explicitamente</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON padronizado com success, data e error</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado neste controller</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker containerizado com orquestração externa</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Configuração externa via environment.ts, sem valores sensíveis no código</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de acesso a APIs de sistema para manipulação de teclado e clipboard</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/middleware/auth.middleware.ts</path>
        <name>auth.middleware.ts</name>
        <summary>Este arquivo implementa um middleware de autenticação para uma aplicação backend utilizando Fastify, cuja função principal é validar a presença e a validade de uma API key enviada via header HTTP &apos;x-api-key&apos;. O middleware intercepta requisições, compara a chave recebida com a chave configurada no ambiente e, caso a validação falhe, responde com status 401 Unauthorized, bloqueando o acesso. Essa abordagem garante controle de acesso simples e eficaz para proteger endpoints sensíveis, integrando-se ao fluxo de requisições do servidor e habilitando uma camada básica de segurança para a API. O código é conciso, focado em autenticação baseada em chave estática, sem manipulação de estado além da resposta HTTP, e depende da configuração externa para a chave de autenticação.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>API Authentication Middleware, Controle de acesso via API key</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Backend API, Segurança, Autenticação</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Requisições devem conter API key válida, Falha na autenticação bloqueia acesso</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Middleware Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config/ - configurações de ambiente, middlewares/ - middlewares da aplicação</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e classes</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre configuração e lógica de middleware</values>
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
            <values>tests/middlewares/</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de requisição e resposta Fastify</values>
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
            <values>Code review obrigatório, Testes automatizados</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Lint, Testes, Build, Deploy</values>
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
            <values>API Key via HTTP Header</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Requisição deve conter API key válida para acesso</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>API key armazenada em variáveis de ambiente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Transporte via HTTPS obrigatório</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Resposta imediata para autenticação, &lt; 100ms</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Middleware leve para alta escalabilidade</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>JSON com campos success: false e error: string</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Bloqueio imediato sem retry</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, environment configuration</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify &gt;=4.0.0, TypeScript &gt;=5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../config/environment.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Autenticação baseada em chave estática pode ser melhorada</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Ausência de logs para tentativas falhas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Segurança da autenticação, Clareza e simplicidade do middleware</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação JSDoc para middlewares</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de API key estática para autenticação simples</values>
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
            <values>API_KEY</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/middleware/error-handler.middleware.ts</path>
        <name>error-handler.middleware.ts</name>
        <summary>Este arquivo implementa um mecanismo robusto e centralizado de tratamento de erros para aplicações construídas com Fastify, focando em capturar, categorizar e responder adequadamente a diferentes tipos de exceções que podem ocorrer durante a execução. Ele define classes customizadas para erros de domínio, como NotFoundError, UnauthorizedError e LimitExceededError, facilitando a padronização das respostas HTTP e códigos de erro associados. O handler de erros processa erros de validação do Zod, erros específicos do Fastify, erros de domínio e erros genéricos, garantindo respostas estruturadas e logs detalhados para facilitar o monitoramento e a depuração, além de adaptar o nível de detalhe das mensagens conforme o ambiente (desenvolvimento ou produção).</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>API Error Handling Module, Centralized error management for Fastify-based APIs</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Backend API, Error handling, HTTP status management, Domain-driven design</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production, Stable error handling implementation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Consistent error response format, Proper HTTP status codes, No leakage of sensitive error details in production</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, Zod 3.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Domain Error Pattern, Middleware Pattern, Centralized Error Handling</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>/errors - classes de erro customizadas, /handlers - middlewares e handlers globais</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes PascalCase, Funções camelCase, Constantes UPPER_SNAKE_CASE</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Errores de domínio isolados em módulo próprio, Handler de erro centralizado importado no core do servidor</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, incluindo regras para erros e imports</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para classes e funções</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript settings (strictNullChecks, noImplicitAny)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>/tests/unit/errors, /tests/integration/errorHandler</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 90% coverage on error handling modules</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then, Mocking Fastify request and reply</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para FastifyRequest e FastifyReply, Fixtures para erros customizados</values>
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
            <values>Build, Lint, Test, Deploy automático para staging</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install &amp;&amp; npm run build</values>
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
            <values>JWT (externamente gerenciado)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Erros 401 e 403 para controle de acesso</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Não expor stack trace em produção, Mensagens de erro genéricas para usuários finais</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Respostas de erro rápidas para não impactar UX</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência, Logging eficiente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Handler deve ser stateless e escalável</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>JSON com campos success, error, code e detalhes opcionais</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logging estruturado com contexto da requisição, Níveis de log ajustados por ambiente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Respostas padronizadas para facilitar retry e tratamento no cliente</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, zod</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify &gt;=4.x, Zod &gt;=3.x</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Necessidade de padronizar novos erros customizados</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível excesso de logs em ambiente de desenvolvimento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência no tratamento de erros, Cobertura de testes para casos de erro</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar novas classes de erro e formatos de resposta</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, uso de JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do DomainError para padronizar erros de negócio</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON padronizado com success, error, code e detalhes</values>
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
            <values>NODE_ENV</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/middleware/validation.middleware.ts</path>
        <name>validation.middleware.ts</name>
        <summary>Este arquivo implementa uma função middleware para validação de requisições HTTP em um servidor Fastify utilizando schemas do Zod. Seu propósito principal é garantir que o corpo da requisição esteja conforme o schema definido, promovendo a integridade dos dados recebidos antes do processamento posterior. Em caso de falha na validação, a função responde com um erro 400 detalhado, evitando que dados inválidos avancem na pipeline, o que contribui para a robustez e segurança da aplicação. A abordagem assíncrona e o uso de tipagem forte com Fastify e Zod facilitam a integração e manutenção em sistemas modernos baseados em TypeScript.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Fastify API Validation Middleware</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Backend API, Validation, TypeScript, Fastify</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Request body must strictly conform to defined Zod schemas, Invalid requests must be rejected with HTTP 400</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, Zod 3.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Middleware Pattern, Schema Validation</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/middleware - middlewares para validação e autenticação, src/schemas - definições de schemas Zod, src/routes - definição das rotas Fastify</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e classes, validateRequest para middleware de validação</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Middleware isolado para validação, desacoplado da lógica de negócio, Schemas importados e reutilizados nas rotas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc.json com regras para TypeScript e Fastify</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e tipos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript settings (strictNullChecks, noImplicitAny)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/middleware - testes unitários para middlewares</values>
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
            <values>Mock FastifyRequest and FastifyReply objects</values>
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
            <values>Lint, Test, Build, Deploy</values>
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
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>{ success: false, error: string, message: string }</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Reject invalid requests with HTTP 400 and descriptive message</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, zod</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>fastify &gt;=4.x, zod &gt;=3.x</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação correta de schemas, Tratamento adequado de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar middleware e schemas com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Zod para validação por ser declarativo e integrado com TypeScript</values>
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
        <path>src/interface/schemas/clipboard.schemas.ts</path>
        <name>clipboard.schemas.ts</name>
        <summary>Este arquivo define JSON Schemas compatíveis com JSON Schema Draft 7 para validação de requisições relacionadas ao gerenciamento de clipboard em uma aplicação Fastify. Ele especifica um schema para o endpoint de copiar conteúdo para o clipboard, exigindo uma string não vazia com limite implícito de tamanho, e schemas vazios para os endpoints de colar e limpar o clipboard, garantindo que não sejam aceitas propriedades adicionais. O foco principal é garantir a integridade e conformidade dos dados recebidos para operações de clipboard, facilitando a validação automática e segura das requisições HTTP, sem alterar estado diretamente, mas definindo contratos claros para integração com a lógica de negócio do sistema.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Clipboard API Validation Module</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>API Development, Clipboard Management, Fastify Framework</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Content must be a non-empty string, No additional properties allowed in requests</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Declarative Validation, Modular Schema Design</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>schemas/ - Contém definições de JSON Schema para validação de endpoints</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e propriedades, PascalCase para tipos e interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Schemas isolados para cada endpoint, importados conforme necessidade</values>
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
            <values>tests/schemas/ - testes unitários para validação de schemas</values>
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
            <values>Mock JSON payloads para validação</values>
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
            <values>Lint, Test, Build, Deploy</values>
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
            <values>Não definido no schema</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não definido no schema</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Conteúdo do clipboard tratado como string simples</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Gerenciados externamente ao schema</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável no schema</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Não definido no schema</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Validação leve e rápida</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Schemas reutilizáveis para múltiplos endpoints</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Padronizado pelo Fastify via JSON Schema validation errors</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Gerenciado externamente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não definido no schema</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Rejeição de requisições inválidas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>json-schema, fastify</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatível com JSON Schema Draft 7</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Validação de tamanho máximo do conteúdo não implementada no schema</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível aceitação de payloads maiores que 1MB sem validação extra</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Conformidade com JSON Schema, Clareza e simplicidade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para schemas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários técnicos objetivos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de JSON Schema Draft 7 para validação</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não definido no schema</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não definido no schema</values>
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
        <path>src/interface/schemas/keyboard.schemas.ts</path>
        <name>keyboard.schemas.ts</name>
        <summary>Este arquivo define JSON Schemas compatíveis com Draft 7 para validação de requisições relacionadas a operações de teclado em um servidor Fastify. Ele especifica três schemas distintos para endpoints que permitem digitar texto, pressionar uma tecla individual e enviar combinações de teclas, garantindo que os dados recebidos estejam estruturados e validados conforme regras claras, como tipos, tamanhos e valores permitidos. A funcionalidade habilita controle programático e seguro de interações de teclado, suportando modos de digitação variados e combinações complexas, facilitando a integração com sistemas que necessitam simular ou processar eventos de teclado de forma robusta e padronizada.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Keyboard Input Validation Service</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automation, Input Simulation, Keyboard Events</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Input data must conform to JSON Schema Draft 7, No additional properties allowed in requests, Text input length between 1 and 10000 characters</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Declarative Validation, Schema-based Validation</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>schemas/ - Contém definições JSON Schema para validação de dados de entrada</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para propriedades JSON, PascalCase para constantes exportadas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Schemas isolados para cada tipo de operação de teclado, importados conforme necessidade</values>
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
            <values>JSDoc para comentários de tipos e propriedades</values>
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
            <values>tests/schemas/ - testes unitários para validação de schemas</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 90% cobertura para schemas</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de requisições HTTP para validação de schemas</values>
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
            <values>Lint, Test, Build, Deploy</values>
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
            <values>Validação rápida e eficiente para alta performance</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Padrão JSON Schema Validation Error</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>json-schema, fastify</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>json-schema compatible with Draft 7</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação correta dos schemas, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de JSON Schema Draft 7 para validação</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/types/extended-input-event.types.ts</path>
        <name>extended-input-event.types.ts</name>
        <summary>Este arquivo define tipos TypeScript para eventos de input estendidos, focando em capturar dados detalhados de interações do usuário via mouse e teclado. Ele estrutura eventos genéricos com propriedades comuns como id, tipo, timestamp e posição do cursor, além de dados específicos para mouse (ações como click, release e move) e teclado (ações down e up). O código habilita um sistema de gravação ou monitoramento de inputs com precisão, facilitando a distinção clara entre eventos de mouse e teclado, e garantindo tipagem rigorosa para manipulação segura e consistente desses eventos em sistemas que dependem de input detalhado do usuário. A abordagem modular e tipada promove integração eficiente com outros módulos que processam ou armazenam eventos de input, suportando funcionalidades como replay, análise ou automação.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Event Extended Types, Sistema de captura e gravação de eventos de input</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>User Interaction Monitoring, Input Event Processing, Terminologia: mouse events, keyboard events, input recording</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir integridade e precisão dos dados de input, Diferenciar corretamente eventos de mouse e teclado, Manter sincronização temporal dos eventos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Nenhum framework específico declarado</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Nenhum serviço externo declarado</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Discriminated Union Types, Modularização por interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - definição de tipos e interfaces, src/input - lógica relacionada a eventos de input</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Interfaces prefixadas com &apos;I&apos; ou nome descritivo (ex: ExtendedMouseEvent), CamelCase para tipos e propriedades</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos genéricos e específicos, Dependência unidirecional para tipos externos (MouseButton)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript Standard Style, JSDoc para documentação</values>
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
            <values>Não especificado</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Não especificado</values>
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
            <values>Dados de input do usuário (teclas, posição do cursor)</values>
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
            <values>Baixa latência para captura de eventos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de processamento e baixa latência</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a alto volume de eventos simultâneos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Tipo MouseButton do módulo &apos;./input-event.types.js&apos;</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Nenhum</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./input-event.types.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Ausência de validação runtime dos eventos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência externa pode causar inconsistências se alterada</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum identificado no código de tipagem</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Estável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipos, Clareza na separação de eventos, Documentação adequada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para todas as interfaces</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de discriminated unions para eventos, Separação clara entre mouse e keyboard</values>
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
            <values>Dev, Staging, Prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Não aplicável</values>
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
        <path>src/application/services/llm.service.ts</path>
        <name>llm.service.ts</name>
        <summary>O arquivo implementa um serviço LLM (Large Language Model) que orquestra a geração de respostas a partir de requisições contendo prompts e formatos de saída opcionais. Ele valida formatos personalizados de output, interage com um adaptador LLM para obter respostas brutas, e processa essas respostas aplicando parsing conforme o formato desejado, com tratamento de erros e logging detalhado. O serviço suporta fallback para saída simples em caso de falhas no parsing, garantindo robustez e flexibilidade na integração com modelos de linguagem, além de monitorar performance e respeitar limites configurados para schemas e tempo de parsing.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>LLMService, Serviço de geração de completions para modelos de linguagem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Inteligência Artificial, Processamento de Linguagem Natural, Modelos de Linguagem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa de formatos de saída, Garantia de resposta consistente e formatada, Fallback seguro em caso de erro no parsing</values>
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
            <values>LLMAdapter (interface para modelos de linguagem externos)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Factory Pattern, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/ - entidades de negócio, dto/ - objetos de transferência de dados, infrastructure/ - adaptadores e integrações externas, service/ - lógica de negócio e serviços, factory/ - criação de estratégias e parsers, config/ - configurações globais</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes em PascalCase, Interfaces prefixadas com I, Métodos e variáveis em camelCase, Arquivos com extensão .ts e nomes kebab-case</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre DTOs, serviços, adaptadores e entidades, Dependências injetadas via container, Módulos isolados para parsing e configuração</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript/TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras padrão Airbnb e customizações para TS</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para documentação de métodos e classes</values>
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
            <values>Testes localizados em pasta __tests__ paralela aos arquivos de código</values>
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
            <values>Mock de adaptadores externos e factories</values>
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
            <values>Revisão obrigatória e testes automatizados aprovados</values>
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
            <values>Não aplicável diretamente neste serviço</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável diretamente neste serviço</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Conteúdo de prompts e respostas LLM, tratado com cuidado nos logs</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável diretamente neste serviço</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável diretamente neste serviço</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Timeout de parsing configurado (ex: 2000ms)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre velocidade de parsing e robustez na validação</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não implementado neste serviço</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Serviço assíncrono e desacoplado para suportar múltiplas requisições simultâneas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Resposta padronizada com sucesso booleano, dados ou mensagem de erro e código</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs estruturados com níveis info, warn, error e debug via pino</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código, presumivelmente integrado externamente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Fallback para saída string simples em caso de falha no parsing customizado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>LLMAdapter, OutputParserFactory, outputFormatConfig</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0, tsyringe 4.x, pino &gt;=7.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>dto, domain, infrastructure, factory, config, types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Necessidade de melhorar fallback e tratamento de erros em parsing complexo</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Parsing pode exceder timeout em schemas muito grandes</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Parsing síncrono pode impactar latência em formatos complexos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tipos, tratamento de erros, cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e informativos, sem excesso</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de DI para desacoplamento, fallback em parsing, logging estruturado</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável diretamente, serviço interno</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Formato padrão com sucesso booleano, dados ou erro e código</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado neste serviço</values>
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
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Configurações de outputFormatConfig, variáveis para logging e adaptadores</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limites de tempo para parsing, capacidade de escalabilidade assíncrona</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/controllers/llm.controller.ts</path>
        <name>llm.controller.ts</name>
        <summary>O arquivo implementa um controlador RESTful para integração com um serviço de Large Language Model (LLM) utilizando Fastify, focado em receber requisições autenticadas, validar entradas via Zod e processar prompts para geração de respostas dinâmicas. Ele gerencia múltiplos formatos de saída, incluindo strings, objetos, arrays, números e booleanos, além de tratar erros específicos relacionados à validação, tamanho do schema e parsing do output. O controlador registra rotas protegidas por middleware de autenticação, realiza logging detalhado das requisições e respostas, e responde com formatos padronizados para sucesso e falhas, garantindo robustez e clareza na comunicação com clientes. Essa implementação é parte de uma arquitetura modular que utiliza injeção de dependências para desacoplar a lógica de negócio do serviço LLM, promovendo escalabilidade e manutenção facilitada.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>LLM API Service, API para geração de texto via Large Language Models</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Inteligência Artificial, Processamento de Linguagem Natural, APIs RESTful</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa do input, Autenticação obrigatória via x-api-key, Limite máximo para tamanho do outputFormat</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, tsyringe</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Serviço LLM interno via LLMService, Middleware de autenticação customizado</values>
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
            <values>application/ - lógica de negócio e DTOs, config/ - configurações globais, infrastructure/ - integração com frameworks e serviços externos, presentation/ - controllers e rotas HTTP, middleware/ - middlewares para autenticação e validação</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para funções e variáveis, kebab-case para arquivos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre camada de aplicação, infraestrutura e apresentação, Uso de injeção de dependência para desacoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, incluindo regras de segurança e melhores práticas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para documentação de classes e métodos públicos</values>
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
            <values>Testes localizados em __tests__ próximos aos módulos correspondentes</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert), Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para serviços externos e middlewares</values>
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
            <values>API Key via header &apos;x-api-key&apos;</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Validação obrigatória do API Key para acesso à rota /llm</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Prompt e respostas do LLM, tokens usados, dados de autenticação</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>x-api-key obrigatório no header</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Recomenda-se HTTPS para transporte seguro</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Resposta rápida para geração de completions, idealmente &lt; 1s</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de resposta priorizada sobre uso de memória</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não implementado no controlador, possível cache no serviço LLM</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade horizontal via múltiplas instâncias Fastify</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>JSON com campos success, error e code</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de pino para logs de info e error com contexto detalhado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código, mas compatível com ferramentas externas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de erros específicos com códigos HTTP adequados e mensagens claras</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>LLMService, authenticationMiddleware, llmRequestSchema, outputFormatConfig</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify 4.x, TypeScript 5.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services/llm.service.js, middleware/auth.middleware.js, application/dto/llm-request.dto.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Nenhum identificado explicitamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível overhead na validação de schemas grandes</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Validação e parsing de outputFormat podem impactar performance</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação rigorosa, tratamento de erros, segurança e logging</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para APIs e DTOs</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e uso de logs estruturados</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de injeção de dependência para desacoplamento, Validação via Zod para segurança</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não explícito no código, presumivelmente via versionamento de rota futura</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON com campos success, data (dinâmico), metadata</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado no controlador, pode ser aplicado via middleware externo</values>
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
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>API_KEY_SECRET, LOG_LEVEL, LLM_SERVICE_ENDPOINT</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limite de tamanho para outputFormat configurável via outputFormatConfig</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/schemas/llm.schemas.ts</path>
        <name>llm.schemas.ts</name>
        <summary>Este arquivo define um JSON Schema para validação de requisições destinadas a modelos de linguagem (LLM). Seu propósito principal é garantir que os dados enviados para a API estejam estruturados corretamente, incluindo propriedades essenciais como prompt, modelo, temperatura, limite de tokens e formato de saída esperado. O schema impõe restrições de tipo, valores mínimos e máximos, além de enumerar opções válidas para o modelo e o formato de saída, assegurando a integridade e previsibilidade das requisições. Funcionalmente, ele atua como uma camada de validação estática que previne erros de entrada e facilita a interoperabilidade entre componentes do sistema que consomem modelos LLM, promovendo robustez e consistência no fluxo de dados. A estrutura modular e o uso de enums externos indicam integração com um domínio maior, reforçando a governança dos dados e a aderência a regras de negócio específicas do projeto.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>LLM Request Validation Schema</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Inteligência Artificial, Natural Language Processing, Modelos de Linguagem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa dos parâmetros de entrada para evitar chamadas inválidas ao LLM, Respeito aos limites de tokens e temperatura para controle de custo e performance</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Modelos LLM integrados via enum LlmModel</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Schema Validation, Domain-Driven Design (uso de enums do domínio)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/enums (definição de enums de domínio), schemas (validação de dados)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para enums e constantes, camelCase para propriedades JSON</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio (enums) e validação (schemas)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript/TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras padrão para TypeScript</values>
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
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
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
            <values>../../domain/enums/llm-model.enum.js</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>domain enums para padronização de modelos LLM</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tipos e enums, Conformidade com schema JSON</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara dos schemas e enums</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários técnicos em português com termos técnicos em inglês</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de enums para garantir integridade dos modelos LLM</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>object, array, string, number, boolean</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/types/output-shape.ts</path>
        <name>output-shape.ts</name>
        <summary>Este arquivo define tipos TypeScript e funções utilitárias para padronizar e facilitar o tratamento de respostas de modelos de linguagem (LLM) em diferentes formatos, suportando tanto respostas legadas quanto dinâmicas. Ele oferece mecanismos para criar respostas de sucesso e erro, além de type guards para identificar o formato da resposta, garantindo compatibilidade e flexibilidade na manipulação dos dados retornados. O código foca em abstrair a estrutura das respostas, permitindo que consumidores do módulo processem dados LLM de forma consistente e segura, promovendo interoperabilidade e manutenção simplificada em sistemas que utilizam APIs de modelos de linguagem.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>LLM Response Handler, Módulo para padronização e manipulação de respostas de modelos de linguagem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Inteligência Artificial, Processamento de Linguagem Natural, APIs de Modelos de Linguagem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Manutenção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir compatibilidade entre formatos legado e dinâmico, Padronizar respostas de sucesso e erro, Evitar perda de dados em transformações</values>
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
            <subProperty>external_services</subProperty>
            <values>APIs de modelos de linguagem (LLM)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Factory Functions, Type Guard Pattern, Union Types para flexibilidade</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - definição de tipos, src/utils - funções utilitárias para respostas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para tipos e interfaces, camelCase para funções e variáveis</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos e funções utilitárias, Isolamento do tratamento de respostas LLM</values>
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
            <values>JSDoc para documentação de tipos e funções</values>
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
            <values>tests/unit para testes de funções utilitárias e type guards</values>
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
            <values>Mocks para simular respostas LLM em diferentes formatos</values>
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
            <values>Revisão obrigatória e testes automatizados</values>
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
            <values>Não aplicável diretamente neste módulo</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável diretamente neste módulo</values>
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
            <values>Operações síncronas rápidas, sem impacto significativo</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Clareza e segurança de tipos sobre micro-otimizações</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade não impactada diretamente pelo módulo</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Objeto com success: false, error: string e código opcional</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado neste módulo</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Padronização de erros para facilitar tratamento externo</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=4.9 para suporte a features usadas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Manutenção da retrocompatibilidade pode aumentar complexidade</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível confusão entre formatos dinâmico e legado em uso incorreto</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum identificado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Migração gradual do formato legado para dinâmico em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipos, Cobertura de type guards, Padronização de respostas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para tipos e funções</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Manter suporte a legacy para garantir estabilidade, Uso de type guards para segurança</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>RESTful API consumindo respostas LLM</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Controle via tipos e formatos de resposta</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Formato legado e formato dinâmico suportados</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não tratado neste módulo</values>
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
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Nenhum específico para este módulo</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Nenhuma restrição específica</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/application-startup.service.ts</path>
        <name>application-startup.service.ts</name>
        <summary>O código implementa um serviço de inicialização responsável por gerenciar o ciclo de vida do GlobalInputCaptureService, que captura eventos globais de entrada na aplicação. Ele provê métodos assíncronos para iniciar a captura de eventos durante a inicialização da aplicação e métodos síncronos para parar esses serviços durante o desligamento, garantindo logging detalhado para monitoramento e tratamento de erros. Essa estrutura facilita a coordenação centralizada dos serviços essenciais para o funcionamento da aplicação, promovendo robustez e controle sobre o estado dos sistemas de captura de eventos.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>ApplicationStartupService - Serviço de inicialização para captura global de eventos</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Sistemas de captura de eventos, Event-driven architecture, Input event monitoring</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir inicialização correta do GlobalInputCaptureService, Registrar falhas críticas de inicialização, Parar serviços de captura de eventos de forma segura</values>
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
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Service Layer</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config/ - configurações gerais, services/ - serviços de negócio e infraestrutura, modules/ - agrupamento modular do sistema</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, Arquivos com extensão .service.js para serviços</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Serviços isolados por responsabilidade, Injeção de dependências para desacoplamento, Módulos comunicam-se via interfaces e injeção</values>
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
            <values>Prettier com configuração padrão, Quebra de linha em 80 caracteres</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para documentação de métodos e classes</values>
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
            <values>tests/services/ para testes unitários de serviços</values>
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
            <values>Mock de serviços injetados via tsyringe, Uso de jest.mock para dependências externas</values>
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
            <values>Revisão obrigatória por pelo menos 2 desenvolvedores, Checks automáticos de lint e testes</values>
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
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na inicialização do serviço, Minimizar bloqueios síncronos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Serviço deve suportar múltiplas instâncias e inicializações concorrentes</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Logs estruturados com mensagens e stack traces</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Níveis info, error com mensagens claras e emojis para status</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Propagação de erros para camadas superiores para tratamento</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>GlobalInputCaptureService, tsyringe, logger</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../config/logger.js, ./global-input-capture.service.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Melhorar tratamento assíncrono na parada do serviço</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Verificação de tratamento de erros, Conformidade com padrões de injeção de dependência</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e uso de emojis para status em logs</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção do tsyringe para injeção de dependências, Centralização da inicialização em ApplicationStartupService</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/global-input-capture.service.ts</path>
        <name>global-input-capture.service.ts</name>
        <summary>O GlobalInputCaptureService é um serviço especializado para captura global e em tempo real de eventos de mouse e teclado no sistema operacional, com foco em máxima compatibilidade no macOS. Utilizando a biblioteca uiohook-napi, ele intercepta eventos como cliques, movimentos, arrastos e pressionamentos de teclas, aplicando controle de taxa para evitar sobrecarga. O serviço transforma eventos brutos do sistema em eventos estruturados e despacha-os para um EventDispatcher, permitindo integração com outras partes do sistema. Além disso, implementa tratamento de erros, logging detalhado e controle de estado para iniciar, parar e monitorar a captura, garantindo robustez e eficiência na coleta de dados de input global.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>GlobalInputCaptureService, Captura global de eventos de input para monitoramento e integração</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Sistemas operacionais, Input event monitoring, macOS compatibility</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Não perder eventos de input relevantes, Evitar sobrecarga por excesso de eventos, Garantir compatibilidade multiplataforma, especialmente macOS</values>
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
            <values>uiohook-napi (native input event capture)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Observer</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/config (configurações), src/services (serviços de captura e lógica), src/types (tipos e interfaces), src/utils (utilitários)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, PascalCase para interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre captura de eventos, despacho e logging, Dependência unidirecional do serviço para EventDispatcher</values>
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
            <values>JSDoc para documentação de métodos e classes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript (strict mode enabled)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ dentro de src/services</values>
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
            <values>Mock de uiohook-napi e EventDispatcher para testes unitários</values>
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
            <values>Build, Test, Lint, Deploy automáticos</values>
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
            <values>Não aplicável (serviço local de captura de input)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Eventos de input podem conter dados sensíveis, devem ser tratados com confidencialidade</values>
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
            <values>Processamento em tempo real com latência mínima</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade e eficiência no processamento de eventos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao ambiente local, foco em estabilidade e baixa latência</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Logs estruturados com mensagens e stack traces</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Níveis de log: info, warn, debug, error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Logger customizado integrado ao sistema</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de erros com logs e tentativa de parada segura</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>uiohook-napi, tsyringe, EventDispatcher</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>uiohook-napi versão compatível com macOS atual</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>EventDispatcher interno para propagação de eventos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Mapeamento de keycodes pode ser ampliado para maior cobertura</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível perda de eventos em picos de alta frequência</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Limitação do rate limiting para evitar sobrecarga</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza no tratamento de eventos e robustez no controle de estado</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e uso de emojis para facilitar leitura</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do uiohook-napi para compatibilidade multiplataforma</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Event-driven interno, não expõe API REST ou similar</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Versionamento interno via controle de pacotes</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Eventos estruturados com timestamp, tipo, posição e dados específicos</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Limite de 1000 eventos por segundo para evitar spam</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker e deployment tradicional em servidores macOS</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>LOG_LEVEL, UIOHOOK_CONFIG_PATH</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de permissões para captura global de input no SO</values>
          </property>
        </properties>
      </file>
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Eu quero criar um novo endpoint feito exclusivamente para adicionar funcionalidade de OCR. Esse endpoint vai receber uma imagem em base64 e vai devolver o texto extraído, junto com a posição desse texto na imagem, utilizando duas bibliotecas específicas, que vou te passar em um documento a seguir. Esse documento contém o guia completo de instalação e implementação, porém você deve modificar os códigos desse guia para que façam sentido dentro do nosso projeto.

Documentação:

"""
# Implementing OCR API with Sharp and Tesseract.js in Node.js TypeScript

Optical Character Recognition (OCR) has become essential for modern applications that need to extract text from images. This comprehensive guide demonstrates how to build a production-ready OCR API using Sharp for image preprocessing and Tesseract.js for text recognition in a Node.js TypeScript environment.

## Architecture overview and key components

The OCR pipeline consists of three main components working together: Sharp handles image preprocessing to enhance text clarity, Tesseract.js performs the actual text recognition, and Express.js serves the REST API endpoints. This architecture provides optimal performance while maintaining flexibility for different use cases.

### Essential dependencies and project setup

Start by creating a new TypeScript project with all necessary dependencies:

```bash
# Core dependencies
npm install tesseract.js sharp express cors helmet multer

# TypeScript and development dependencies
npm install --save-dev typescript @types/node @types/express @types/sharp @types/multer ts-node nodemon

# Optional language data packages for offline use
npm install @tesseract.js-data/eng @tesseract.js-data/por
```

Configure TypeScript with optimal settings for Node.js:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Configuring Tesseract.js for offline operation

Offline configuration ensures your OCR service works without internet connectivity, crucial for secure environments or areas with limited network access. Language data files must be downloaded and stored locally.

### Language data file management

Create a dedicated directory structure for language files:

```
project-root/
├── src/
│   ├── tessdata/
│   │   ├── eng.traineddata.gz  # ~4.9 MB compressed
│   │   └── por.traineddata.gz  # ~4.2 MB compressed
│   └── cache/                   # Runtime cache directory
```

Download language files from the official CDN:
- English: `https://cdn.jsdelivr.net/npm/@tesseract.js-data/eng@1.0.0/4.0.0_best_int/eng.traineddata.gz`
- Portuguese: `https://cdn.jsdelivr.net/npm/@tesseract.js-data/por@1.0.0/4.0.0_best_int/por.traineddata.gz`

### Implementing the offline Tesseract wrapper

```typescript
import { createWorker, Worker, OEM, PSM } from 'tesseract.js';
import * as path from 'path';

export class OfflineTesseract {
  private worker: Worker | null = null;
  private readonly langPath: string;
  private readonly cachePath: string;

  constructor(config: { langPath: string; cachePath: string }) {
    this.langPath = config.langPath;
    this.cachePath = config.cachePath;
  }

  async initialize(languages: string[] = ['eng', 'por']): Promise<void> {
    try {
      this.worker = await createWorker(languages, OEM.LSTM_ONLY, {
        langPath: this.langPath,
        cachePath: this.cachePath,
        logger: process.env.NODE_ENV === 'development' ? console.log : null,
      });
      
      // Set optimal parameters for accuracy
      await this.worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO,
        preserve_interword_spaces: '1',
      });
    } catch (error) {
      throw new Error(`Failed to initialize Tesseract: ${error.message}`);
    }
  }

  async recognizeWithCoordinates(imagePath: string | Buffer): Promise<any> {
    if (!this.worker) {
      throw new Error('Worker not initialized');
    }

    const result = await this.worker.recognize(imagePath, {}, {
      blocks: true,
      words: true,
      lines: true,
      paragraphs: true,
    });

    return result.data;
  }

  async terminate(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}
```

## Image preprocessing with Sharp for optimal OCR

**Image quality directly impacts OCR accuracy**. Sharp provides high-performance preprocessing capabilities that can dramatically improve text recognition rates. The library operates 4-5x faster than ImageMagick alternatives, making it ideal for production environments.

### Core preprocessing pipeline

```typescript
import sharp from 'sharp';

interface PreprocessingOptions {
  targetWidth?: number;
  threshold?: number;
  contrastBoost?: boolean;
  denoiseLevel?: number;
  sharpen?: boolean;
}

export class ImagePreprocessor {
  async preprocessForOCR(
    inputBuffer: Buffer,
    options: PreprocessingOptions = {}
  ): Promise<Buffer> {
    const {
      targetWidth = 1000,
      threshold = 128,
      contrastBoost = true,
      denoiseLevel = 0,
      sharpen = true
    } = options;

    let pipeline = sharp(inputBuffer);

    // Step 1: Resize to optimal dimensions (minimum 300 DPI equivalent)
    pipeline = pipeline.resize({
      width: targetWidth,
      fit: 'inside',
      withoutEnlargement: false
    });

    // Step 2: Convert to grayscale for consistent processing
    pipeline = pipeline.grayscale();

    // Step 3: Enhance contrast using histogram stretching
    if (contrastBoost) {
      pipeline = pipeline.normalize({ lower: 1, upper: 99 });
    }

    // Step 4: Apply noise reduction if needed
    if (denoiseLevel > 0) {
      pipeline = pipeline.median(denoiseLevel);
    }

    // Step 5: Sharpen text edges
    if (sharpen) {
      pipeline = pipeline.sharpen({
        sigma: 1.0,
        m1: 1.0,    // Flat area sharpening
        m2: 2.0,    // Jagged area sharpening
        x1: 2.0,    // Threshold
        y2: 10.0,   // Maximum brightening
        y3: 20.0    // Maximum darkening
      });
    }

    // Step 6: Binarize using threshold
    pipeline = pipeline.threshold(threshold, { greyscale: true });

    // Step 7: Set proper metadata
    pipeline = pipeline.withMetadata({ density: 300 });

    return pipeline.toBuffer();
  }

  async adaptivePreprocess(inputBuffer: Buffer): Promise<Buffer> {
    // Analyze image characteristics first
    const metadata = await sharp(inputBuffer).metadata();
    const stats = await sharp(inputBuffer).stats();
    
    // Determine optimal preprocessing based on image properties
    const isDarkImage = stats.channels[0].mean < 100;
    const isLowContrast = stats.channels[0].stdev < 50;
    
    let pipeline = sharp(inputBuffer)
      .resize({ width: 1000, fit: 'inside' })
      .grayscale();

    if (isDarkImage) {
      pipeline = pipeline.gamma(2.2);
    }

    if (isLowContrast) {
      pipeline = pipeline.clahe({
        width: 3,
        height: 3,
        maxSlope: 3
      });
    }

    return pipeline
      .normalize()
      .sharpen()
      .threshold(isDarkImage ? 160 : 128)
      .toBuffer();
  }
}
```

## Building the REST API with comprehensive TypeScript types

Creating a type-safe API ensures reliability and maintainability. Define comprehensive interfaces for all OCR-related data structures:

```typescript
// types/ocr.types.ts
export interface OCRBoundingBox {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface OCRWord {
  text: string;
  confidence: number;
  bbox: OCRBoundingBox;
  baseline: OCRBoundingBox;
}

export interface OCRLine {
  text: string;
  confidence: number;
  bbox: OCRBoundingBox;
  words: OCRWord[];
}

export interface OCRResponse {
  success: boolean;
  text: string;
  confidence: number;
  words: Array<{
    text: string;
    confidence: number;
    bbox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
  lines: OCRLine[];
  processingTime: number;
  error?: string;
}
```

### Implementing the API service layer

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { body, validationResult } from 'express-validator';

export class OCRService {
  private tesseract: OfflineTesseract;
  private preprocessor: ImagePreprocessor;

  constructor() {
    this.tesseract = new OfflineTesseract({
      langPath: path.join(__dirname, 'tessdata'),
      cachePath: path.join(__dirname, 'cache')
    });
    this.preprocessor = new ImagePreprocessor();
  }

  async initialize(): Promise<void> {
    await this.tesseract.initialize(['eng', 'por']);
  }

  async processImage(base64Image: string): Promise<OCRResponse> {
    const startTime = Date.now();
    
    try {
      // Convert base64 to buffer
      const imageData = base64Image.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(imageData, 'base64');
      
      // Preprocess image
      const processedImage = await this.preprocessor.adaptivePreprocess(imageBuffer);
      
      // Perform OCR
      const result = await this.tesseract.recognizeWithCoordinates(processedImage);
      
      // Format response with bounding boxes
      const words = result.words.map((word: any) => ({
        text: word.text,
        confidence: word.confidence,
        bbox: {
          x: word.bbox.x0,
          y: word.bbox.y0,
          width: word.bbox.x1 - word.bbox.x0,
          height: word.bbox.y1 - word.bbox.y0
        }
      }));

      return {
        success: true,
        text: result.text,
        confidence: result.confidence,
        words,
        lines: result.lines,
        processingTime: Date.now() - startTime
      };
    } catch (error) {
      throw new Error(`OCR processing failed: ${error.message}`);
    }
  }
}
```

### Creating the Express endpoints

```typescript
const app = express();
const ocrService = new OCRService();

// Middleware configuration
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Validation middleware
const validateBase64Image = [
  body('image')
    .isBase64()
    .withMessage('Invalid base64 format')
    .custom((value: string) => {
      const imageRegex = /^data:image\/(jpeg|jpg|png|gif|bmp|webp);base64,/;
      if (!imageRegex.test(value)) {
        throw new Error('Invalid image format');
      }
      
      const sizeInBytes = (value.length * 3) / 4;
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (sizeInBytes > maxSize) {
        throw new Error('Image size exceeds 10MB limit');
      }
      
      return true;
    })
];

// OCR endpoint
app.post('/api/ocr/base64', validateBase64Image, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const result = await ocrService.processImage(req.body.image);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Initialize service before starting server
ocrService.initialize().then(() => {
  app.listen(3000, () => {
    console.log('OCR API running on port 3000');
  });
});
```

## Performance optimization strategies

**Worker pools provide the most significant performance improvement** for processing multiple images. Implementing a scheduler-based approach can yield 3x speedup compared to sequential processing.

### Implementing worker pools for concurrent processing

```typescript
import { createWorker, createScheduler, Scheduler } from 'tesseract.js';
import os from 'os';

export class OptimizedOCRService {
  private scheduler: Scheduler;
  private workerCount: number;
  private jobCount: number = 0;
  private readonly MAX_JOBS_PER_WORKER = 500;

  constructor() {
    this.scheduler = createScheduler();
    this.workerCount = Math.min(4, os.cpus().length);
  }

  async initialize(): Promise<void> {
    // Create worker pool
    for (let i = 0; i < this.workerCount; i++) {
      const worker = await createWorker('eng', OEM.LSTM_ONLY, {
        langPath: './tessdata',
        cacheMethod: 'write',
        logger: null // Disable logging in production
      });
      this.scheduler.addWorker(worker);
    }
  }

  async processImageBatch(images: Buffer[]): Promise<string[]> {
    // Reset workers periodically to prevent memory leaks
    if (this.jobCount >= this.MAX_JOBS_PER_WORKER) {
      await this.resetWorkers();
      this.jobCount = 0;
    }

    const preprocessor = new ImagePreprocessor();
    
    // Preprocess all images first
    const processedImages = await Promise.all(
      images.map(img => preprocessor.preprocessForOCR(img))
    );

    // Process in parallel using scheduler
    const results = await Promise.all(
      processedImages.map(img => this.scheduler.addJob('recognize', img))
    );

    this.jobCount += images.length;
    
    return results.map(({ data }) => data.text);
  }

  private async resetWorkers(): Promise<void> {
    await this.scheduler.terminate();
    this.scheduler = createScheduler();
    await this.initialize();
  }
}
```

### Configuration for accuracy vs speed tradeoffs

Tesseract.js offers multiple configuration options to balance accuracy and processing speed:

```typescript
interface OCRConfiguration {
  mode: 'fast' | 'balanced' | 'accurate';
  pageSegmentationMode: PSM;
  characterWhitelist?: string;
}

const configurations: Record<string, any> = {
  fast: {
    langPath: 'https://tessdata.projectnaptha.com/4.0.0_fast',
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    tessedit_enable_doc_dict: '0'
  },
  balanced: {
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    tessedit_pageseg_mode: PSM.AUTO
  },
  accurate: {
    langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
    tessedit_pageseg_mode: PSM.AUTO,
    tessedit_enable_doc_dict: '1',
    textord_heavy_nr: '1'
  }
};
```

## Memory management for large images

**Large images can cause memory crashes** if not handled properly. iPhone and Android photos often exceed memory limits, requiring preprocessing before OCR.

### Implementing smart image handling

```typescript
export class MemoryEfficientOCR {
  private readonly MAX_IMAGE_SIZE = 1000; // pixels
  private readonly MAX_MEMORY_MB = 100;

  async processLargeImage(imageBuffer: Buffer): Promise<string> {
    const metadata = await sharp(imageBuffer).metadata();
    
    // Calculate memory usage estimate
    const estimatedMemoryMB = (metadata.width * metadata.height * 4) / (1024 * 1024);
    
    if (estimatedMemoryMB > this.MAX_MEMORY_MB) {
      // Process in chunks
      return await this.processImageInChunks(imageBuffer, metadata);
    }
    
    // Scale down if needed
    const scale = Math.min(
      this.MAX_IMAGE_SIZE / metadata.width,
      this.MAX_IMAGE_SIZE / metadata.height,
      1
    );
    
    if (scale < 1) {
      imageBuffer = await sharp(imageBuffer)
        .resize({
          width: Math.floor(metadata.width * scale),
          height: Math.floor(metadata.height * scale)
        })
        .toBuffer();
    }
    
    return await this.performOCR(imageBuffer);
  }

  private async processImageInChunks(
    imageBuffer: Buffer,
    metadata: sharp.Metadata
  ): Promise<string> {
    const chunkSize = 1000;
    const results: string[] = [];
    
    for (let y = 0; y < metadata.height; y += chunkSize) {
      for (let x = 0; x < metadata.width; x += chunkSize) {
        const chunk = await sharp(imageBuffer)
          .extract({
            left: x,
            top: y,
            width: Math.min(chunkSize, metadata.width - x),
            height: Math.min(chunkSize, metadata.height - y)
          })
          .toBuffer();
        
        const text = await this.performOCR(chunk);
        results.push(text);
      }
    }
    
    return results.join(' ');
  }
}
```

## Error handling patterns for robust operation

Comprehensive error handling ensures graceful degradation and helpful debugging information:

```typescript
export class OCRErrorHandler {
  static handleOCRError(error: any): OCRError {
    if (error.message?.includes('Invalid image')) {
      return {
        code: 'INVALID_IMAGE',
        message: 'The provided image is invalid or corrupted',
        statusCode: 400
      };
    }

    if (error.message?.includes('abort') || error.message?.includes('terminated')) {
      return {
        code: 'PROCESSING_ABORTED',
        message: 'OCR processing was aborted',
        statusCode: 500
      };
    }

    if (error.message?.includes('timeout')) {
      return {
        code: 'PROCESSING_TIMEOUT',
        message: 'OCR processing timed out',
        statusCode: 504
      };
    }

    if (error.message?.includes('memory')) {
      return {
        code: 'OUT_OF_MEMORY',
        message: 'Insufficient memory to process image',
        statusCode: 507
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      statusCode: 500
    };
  }
}

// Middleware for global error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const ocrError = OCRErrorHandler.handleOCRError(error);
  
  console.error('OCR Error:', {
    code: ocrError.code,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
  
  res.status(ocrError.statusCode).json({
    success: false,
    error: ocrError
  });
});
```

## Production deployment considerations

**Production environments require careful resource management** and monitoring. Based on real-world implementations, here are critical considerations:

### Resource usage patterns and limits

- Each worker consumes approximately 100MB of memory
- Processing time ranges from 2-20 seconds for 640x640px images
- Maximum recommended workers: 4 per CPU core
- Worker recycling after 500 jobs prevents memory leaks

### Production-ready deployment configuration

```typescript
export class ProductionOCRService {
  private scheduler: Scheduler;
  private metrics: {
    totalJobs: number;
    successfulJobs: number;
    failedJobs: number;
    averageProcessingTime: number;
  };

  constructor(private config: {
    maxWorkers?: number;
    maxJobsPerWorker?: number;
    enableMetrics?: boolean;
  }) {
    this.metrics = {
      totalJobs: 0,
      successfulJobs: 0,
      failedJobs: 0,
      averageProcessingTime: 0
    };
  }

  async processWithMetrics(imageBuffer: Buffer): Promise<OCRResponse> {
    const startTime = Date.now();
    
    try {
      const result = await this.process(imageBuffer);
      
      if (this.config.enableMetrics) {
        this.updateMetrics(true, Date.now() - startTime);
      }
      
      return result;
    } catch (error) {
      if (this.config.enableMetrics) {
        this.updateMetrics(false, Date.now() - startTime);
      }
      throw error;
    }
  }

  private updateMetrics(success: boolean, processingTime: number): void {
    this.metrics.totalJobs++;
    if (success) {
      this.metrics.successfulJobs++;
    } else {
      this.metrics.failedJobs++;
    }
    
    // Calculate rolling average
    this.metrics.averageProcessingTime = 
      (this.metrics.averageProcessingTime * (this.metrics.totalJobs - 1) + processingTime) 
      / this.metrics.totalJobs;
  }

  getMetrics() {
    return {
      ...this.metrics,
      successRate: this.metrics.successfulJobs / this.metrics.totalJobs,
      uptime: process.uptime()
    };
  }
}
```

### Graceful shutdown implementation

```typescript
class GracefulShutdown {
  private isShuttingDown = false;

  setupHandlers(ocrService: ProductionOCRService): void {
    const shutdown = async (signal: string) => {
      if (this.isShuttingDown) return;
      
      this.isShuttingDown = true;
      console.log(`Received ${signal}, starting graceful shutdown...`);
      
      // Stop accepting new requests
      server.close(() => {
        console.log('HTTP server closed');
      });
      
      // Wait for ongoing OCR jobs
      await this.waitForJobCompletion();
      
      // Cleanup resources
      await ocrService.cleanup();
      
      console.log('Graceful shutdown complete');
      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  }

  private async waitForJobCompletion(timeout = 30000): Promise<void> {
    const startTime = Date.now();
    
    while (this.hasActiveJobs() && Date.now() - startTime < timeout) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    if (this.hasActiveJobs()) {
      console.warn('Timeout reached, forcing shutdown with active jobs');
    }
  }
}
```

## Conclusion

Building a production-ready OCR API with Sharp and Tesseract.js requires careful attention to image preprocessing, memory management, and performance optimization. The combination of Sharp's high-performance image processing and Tesseract.js's accurate text recognition provides a robust foundation for OCR applications.

Key takeaways for successful implementation include using worker pools for concurrent processing, implementing proper image preprocessing pipelines, managing memory carefully for large images, and establishing comprehensive error handling. With these techniques, you can build an OCR service that handles real-world production demands while maintaining high accuracy and performance.
"""

Último plano: Será implementado um pipeline completo de OCR composto por ImagePreprocessor (Sharp), OcrWorkerPool (Tesseract.js) e OcrService, exposto via OcrController em /api/v1/ocr/base64. O plano cobre arquivos, integrações, erros, performance, testes, segurança e extensibilidade.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Precisamos extrair texto de imagens base64 no backend Fastify mantendo padrão Clean Architecture. Criaremos src/application/services/ocr.service.ts orquestrando ImagePreprocessor (src/application/services/image-preprocessor.service.ts) e OcrWorkerPool (src/application/services/ocr-worker-pool.service.ts). Endpoint /api/v1/ocr/base64 em src/interface/controllers/ocr.controller.ts receberá payload validado por src/interface/schemas/ocr.schemas.ts, processará a imagem e retornará {success,text,confidence,words,lines,processingTime}. DI é registrado em src/config/dependency-injection.ts.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Tipos estarão em src/types/ocr.types.ts definindo OCRBoundingBox, OCRWord, OCRLine e OCRResponse. Não há persistência; resposta é stateless. Para cache opcional criaremos Map<string,OCRResponse> em OcrService com TTL configurável via env OCR_CACHE_TTL. Chaves serão SHA256 da imagem para evitar reprocessamento; invalidamos no máximo 10k entradas via LRU simples.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: Integrar Fastify (controllers), tsyringe (DI), pino (logs), error-handler.middleware.ts para padronizar erros e auth.middleware.ts para proteger rota opcionalmente. dependency-injection.ts registrará Singleton ImagePreprocessor e OcrWorkerPool, além do transient OcrService. Logger é injetado em serviços para métricas. validation.middleware.ts usará novo OCR schema para validar request body antes da lógica de negócio.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: Casos: imagem >10 MB (LimitExceededError 413), base64 malformado (ValidationError 400), formato não suportado (UnsupportedMediaType 415), Tesseract timeout 30 s (ProcessingTimeoutError 504), out-of-memory ao processar imagem 4K (OutOfMemoryError 507), worker não inicializado (ServiceUnavailable 503), texto vazio retornado (NoTextFoundError 204), falha interna Sharp/Tesseract (InternalError 500). Cada um lançará DomainError mapeado por error-handler.middleware.ts.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Arquivo src/config/ocr.config.ts exportará interface OcrConfig { maxImageSizeMb, maxProcessingMs, workerCount, cacheTtl, languages, preprocessing } carregada de env (OCR_MAX_MB, OCR_TIMEOUT_MS, OCR_WORKERS, OCR_CACHE_TTL, OCR_LANGS). Preprocessing aceita JSON (threshold, denoiseLevel, sharpen). Futuras linguagens bastam adicionar traineddata + atualizar env. Estratégia WorkerPool implementa reset após OCR_JOBS_PER_WORKER.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Camada Domain: tipos OCR. Camada Application: ImagePreprocessor (Strategy Pattern para ‘basic’ e ‘adaptive’), OcrWorkerPool (Singleton, Factory p/ workers, Observer para métricas), OcrService (Facade). Camada Interface: ocr.controller.ts (Controller Pattern) + schemas/ocr.schemas.ts. DI Container liga tudo. Diagrama: Controller → ValidationMW → AuthMW → OcrService → [ImagePreprocessor → Sharp] + [OcrWorkerPool → Tesseract Worker] → Response ↘ ErrorHandler.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: OcrWorkerPool cria N=MIN(cpu, OCR_WORKERS,4) workers; cada job é Promise.all com preprocess assíncrono e scheduler.addJob('recognize'). Big-O: preprocessing O(pixels), OCR O(words). Cache LRU evita reproces-sar mesma imagem. processingTime registrado em pino; histogram prometheus exposto em /metrics. Workers reciclam após 500 jobs p/ evitar leak; graceful-shutdown.service aguarda queue vazia antes de terminate().

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: validation.middleware.ts usa Zod schema: { image: string(max 14 MB, regex data:image/(png|jpe?g|webp);base64, min 1) }. auth.middleware.ts exige x-api-key. Rate limiting via Fastify-rate-limit (20 req/min por IP). Files nunca gravados em disco; processamento happens in-memory. Pino redige base64 no log (mask '[base64-image-omitted]'). HTTPS recomendado; CSP e HSTS já aplicados globalmente. Env paths validados no startup.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Unit: image-preprocessor.test.ts (assert buffer transforms), ocr-worker-pool.test.ts (mock tesseract, ensure concurrency), ocr.service.test.ts (mock deps, verify OCRResponse shape). Integration: ocr.controller.int.test.ts usando Fastify.inject com sample base64 image, expect 200 and text. Edge-case tests: oversize image → 413, invalid base64 → 400, empty text → 204. Coverage target 90% for new modules. Mocks via jest.mock('tesseract.js') e sharp spyOn.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: (1) Endpoint /api/v1/ocr/base64 registrado, protected, validated. (2) DI container resolve OcrService sem circular deps. (3) Sample image returns expected string ≥90% confidence. (4) All error cases return standardized JSON {success:false,error}. (5) pino shows processingTime. (6) Jest coverage ≥90%. (7) Lint passes. (8) Docker build succeeds with tessdata included. (9) Graceful shutdown completes within 30 s. (10) Metrics endpoint shows OCR successRate >0.
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