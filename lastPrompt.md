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
    <name>NutJS Desktop Automation API – RESTful service for programmatic mouse and screen control using Node.js and nut-js</name>
    <domain>Desktop Automation, UI Automation, Mouse and Screen Control, Computer Vision, Backend API, Test Automation, Input Device Control, Optical Character Recognition, Data Capture, Error Handling, Configuration Management</domain>
    <current_phase>Production, Stable, MVP, Initial Command Architecture Implementation, Active Development, Pre-production, Optimized Build, Integration Testing, Automated Testing, Environment Configuration</current_phase>
    <critical_business_rules>Ensure code is free from common async/await errors, Avoid explicit use of any, Maintain style consistency with Prettier, System permissions must be respected, Strict input validation to prevent invalid commands, Maintain integrity of automation operations, Continuous service availability, Automatic restart on excessive memory usage, Error and output logs for auditing, Safe execution of UI commands, Strict validation of coordinates to prevent out-of-bounds actions, Minimum confidence threshold for image recognition, Timeouts for template waits, Immutability of actions after creation, Do not expose sensitive keys in logs or code, Environment variables must be correctly set to avoid failures, Standardized API responses for integration, Extensibility for new command types, Strict typing must be maintained, Exclude node_modules and dist from build, Support for experimental decorators, Sensitive configuration files must not be committed, Accurate mouse coordinate handling, Maintain integrity of screenshots, Respect duration and smoothing in movements, Accuracy thresholds for text extraction, Data privacy compliance, Non-modification of original images, Exclude test files from build, Immediate response to invalid data with status 400, Authentication required via API key, Continuous and ordered event streaming, Proper streaming closure on connection end, Test environment isolation, Suppression of logs during tests, Accurate smooth movement interpolation, Button mapping must be consistent, Drag sequence must follow press-move-release order, Correct division of scroll for smooth scrolling</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript 5.x, JavaScript (Node.js), ECMAScript 2024, Python 3.11</primary_language>
    <frameworks>Fastify 4.x, TSyringe 4.x, Zod 3.x, PM2 5.x, Jest 29.x, ESLint 8.x, NutJS 2.x, dotenv 16.0, pino 8.x, Express 4.x, Tesseract OCR 5.0, OpenCV 4.7, Flask 2.3, @nut-tree-fork/nut-js</frameworks>
    <databases>PostgreSQL 15</databases>
    <external_services>NutJS APIs for mouse and screen control, dotenv for environment configuration, MouseService, ScreenService, @nut-tree-fork/nut-js (screen API), APIs via API_KEY, AutomationService (IAutomationExecutor interface), Local REST API NutJS Mouse Control, Postman for API testing, Cloud Storage API, Authentication Service (OAuth2), EventSource (SSE client), Environment configuration service, pino logger</external_services>
    <package_manager>npm, yarn, pip</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Plugin-based Architecture, Declarative Configuration, Clean Architecture, Process Manager Pattern, Dependency Injection, Modular Architecture, REST API, Schema Validation Pattern, Type-safe API Contracts, Command Pattern, Adapter Pattern, Service Layer, Configuration Centralization, Immutable Object Pattern, Template Method, Factory Method, Middleware Pattern, Controller Pattern, Centralized Error Handling, Layered Architecture, Plugin Pattern, Client-Server, API Client Abstraction, Strict typing enforcement, Modular API endpoints by resource (mouse, screen), Pipeline, Configuration Inheritance, Configuration Object, Immutable Constants, Controller-Service Pattern, Test Setup Pattern, Mocking Pattern, Dependency Injection via Adapter Pattern</design_pattern>
    <folder_structure>src/ - main source code, dist/ - compiled build output, tests/ - unit and integration tests, config/ - global configurations and constants, domain/entities - domain entities, application/services - business logic and services, infrastructure/adapters - external library integrations, interface/controllers - HTTP route controllers, src/config - environment variables and configuration files, src/schemas - Zod schema definitions, src/types - type and interface definitions, src/commands - automation commands, src/models - domain interfaces and classes, src/utils - utility functions, routes - API route definitions, logs/ - log files, coverage/ - test coverage reports, node_modules/ - external dependencies, .vscode/, .idea/ - IDE configurations, .eslintrc.js - ESLint configuration, jest.config.js - Jest configuration, ecosystem.config.js - PM2 configuration, /preprocessing - image cleaning, /recognition - OCR logic, /postprocessing - text correction, /api - integration endpoints</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for classes and types, kebab-case for files and scripts, snake_case for environment variables, Suffix Service for service classes, Suffix Adapter for adapters, Suffix Controller for controllers, Suffix Handler for middlewares, Prefix I for interfaces, Const assertions for immutable objects, Files with .ts extension for TypeScript code, Files with .test.ts and .spec.ts for tests</naming_conventions>
    <module_boundaries>Clear separation between domain, application, and infrastructure, Dependency injection to decouple modules, Use of interfaces for abstractions, Isolated configuration in its own module, Separation between API, automation services, and infrastructure, Isolated data validation, Controllers depend on services via DI, Services encapsulate business logic, Isolated modules for input device abstractions, Separation between handlers, routes, and services, Separation between schemas and inferred types, Separation between production code and tests, Mocks isolated in test configuration, Separation between mouse and screen operations, API layer isolated from core OCR logic, Exclusion of tests and build artifacts from compilation, Centralized configuration in environment.js, Use of plugins for modularization, Explicit export of constants for global use</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>ESLint Recommended, Prettier, Airbnb JavaScript/TypeScript Style Guide, TypeScript ESLint Recommended, PEP8</style_guide>
    <linting_rules>no-async-promise-executor: error, no-await-in-loop: warn, @typescript-eslint/no-explicit-any: error, @typescript-eslint/no-floating-promises: error, @typescript-eslint/await-thenable: error, @typescript-eslint/no-unused-vars: error with argsIgnorePattern ^_, eslint-config-prettier to disable conflicting rules, eslint-config-standard-with-typescript, Prohibition of explicit any, Mandatory use of async/await for async operations, Config via .eslintrc.js, flake8 with max line length 88</linting_rules>
    <formatting>Prettier integration via plugin:prettier/recommended, semi: true, trailingComma: all, singleQuote: true, printWidth: 100, tabWidth: 2, Prettier 3.x with default settings, Black</formatting>
    <documentation_style>JSDoc for functions and classes, JSDoc for public and private methods, Inline comments and JSDoc for public functions, Google Docstrings, Descriptions embedded in each endpoint in Postman</documentation_style>
    <type_checking>Strict TypeScript type checking via plugin:@typescript-eslint/recommended-requiring-type-checking, Strict TypeScript settings enabled, Strict TypeScript with tsc --noEmit, Strict TypeScript with explicit typing in DTOs and methods, Strict TypeScript with strict true in tsconfig.json, noImplicitAny, strictNullChecks, mypy strict</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29.x, Postman Collection Runner, Pytest 7.4</test_framework>
    <test_structure>**/__tests__/**/*.test.ts, **/tests/**/*.spec.ts, tests directory parallel to src, Unit tests for services, Integration tests for API endpoints, tests/unit, tests/integration, mocks for external dependencies, coverage/ - coverage reports</test_structure>
    <coverage_requirements>branches &gt;= 80%, functions &gt;= 80%, lines &gt;= 80%, statements &gt;= 80%, Minimum 80% coverage, &gt;= 90% for middlewares, &gt;= 85%, Full coverage for public MouseService functions</coverage_requirements>
    <test_patterns>Arrange-Act-Assert (AAA), Given-When-Then, Sequence of GET and POST calls to validate state and effects, Use of mocks for external dependencies, Async tests with fake timers</test_patterns>
    <mocking_approach>Use of Jest mocks and fixtures, Mocks for MouseService and ScreenService, Mocks for adapters via tsyringe and jest.mock, Mocks for external adapters, Fixtures for input data, Mocks for process.env to simulate environment variables, Mocks for external dependencies and timers, Mocks for input events, Mocks for MatchResult input data, Mocks for FastifyRequest and FastifyReply, Mocks for external modules (@nut-tree-fork/nut-js), Mocks for async functions, Use of jest.useFakeTimers for time control</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review mandatory, Passing CI checks, Checks de lint e testes automatizados, Revisão obrigatória por pelo menos um membro</pr_requirements>
    <ci_cd_pipeline>Linting, Testing, Build, Deployment, Build, lint, test and deploy automated via GitHub Actions, Unit tests, Integration tests</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install &amp;&amp; cp .env.example .env, python -m venv venv &amp;&amp; source venv/bin/activate &amp;&amp; pip install -r requirements.txt</setup>
    <install>npm install, yarn install, pip install -r requirements.txt</install>
    <dev>npm run dev, tsc --watch, flask run --reload</dev>
    <test>npm test, npm run test, pytest --cov=ocr_module tests/, Executar coleção Postman via Newman ou Postman Runner</test>
    <build>npm run build, npm run build:prod, tsc, docker build -t ocr-service .</build>
    <lint>npx eslint . --ext .ts,.tsx, npm run lint, flake8 ocr_module/</lint>
    <format>npx prettier --write ., npm run format, black ocr_module/</format>
  </commands>
  <security_constraints>
    <authentication_method>API Key via environment variable, API Key via header x-api-key, OAuth2</authentication_method>
    <authorization_rules>Strict input validation to prevent unauthorized execution, External control based on API Key, API Key validation for streaming endpoint, Role-based access control for API endpoints, Reject requests without or with invalid API key</authorization_rules>
    <sensitive_data>Environment variables for configuration, Accessibility permissions on macOS, API_KEY must be kept secret and not exposed, Base64 encoded images must be protected, Extracted personal data must be encrypted at rest and in transit, .env files, API keys, Database credentials</sensitive_data>
    <security_headers>Content-Security-Policy: default-src &apos;none&apos;, X-Content-Type-Options: nosniff, Cache-Control: no-cache, Strict-Transport-Security, Content-Type: application/json, Mandatory validation of x-api-key header</security_headers>
    <encryption_requirements>TLS 1.3 for data in transit, AES-256 for data at rest, HTTPS recommended for secure transmission</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>Low latency expected for API calls, Minimum duration 100ms, maximum 5000ms for actions, Async operations should be fast, ideally &lt; 500ms for simple actions, Smooth movements configurable between 0 and 1000ms, Default timeout of 5000ms for template waits, At least 5 events per second in streaming, &lt; 2 seconds per image for OCR processing, Test timeout set to 10000ms</response_time_limits>
    <optimization_priorities>Speed and responsiveness for automation commands, Memory control to avoid crashes, Execution in fork mode for isolation, Speed and efficiency in UI manipulation, HTTP server speed and scalability, Precision and reliability over extreme speed, Efficient resource usage in SSE streaming, Balance between speed and accuracy, Reduce bundle size, Avoid source map generation for production</optimization_priorities>
    <caching_strategy>Configuration loaded once and immutable, Cache processed images and extracted text for 24 hours</caching_strategy>
    <scalability_considerations>Current config limits to 1 instance, can scale via multiple PM2 instances, Modular architecture for easy horizontal scaling, Streaming SSE may require load balancing for multiple clients, Horizontal scaling of OCR workers, Load balancing API requests, Support for multiple simultaneous SSE connections</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standard JSON with message and HTTP code, Validation via Zod with standardized messages, Object with success (boolean) and error (string), Centralized error handler middleware format, JSON with error code, message and details, Promises rejected on failure</error_format>
    <logging_strategy>Structured logging with pino and pino-pretty, Logs separated for errors (logs/error.log) and output (logs/out.log), LogLevel configurable via environment variable, Logs stored in /logs, *.log files ignored in version control, Console.log for results and errors, Logs disabled in tests (logger: false)</logging_strategy>
    <monitoring_tools>PM2 for monitoring and automatic restart, Prometheus, Grafana</monitoring_tools>
    <error_recovery>Automatic process restart on 1G memory limit, Error handling via Fastify middleware, Standardized error response for failures, no automatic retry, Graceful shutdown to avoid request loss, Immediate response with status 400 for validation errors, Interruption of streaming on error, 401 response for failed authentication, Try/catch for error capture, no retry</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>@typescript-eslint/parser, @typescript-eslint/eslint-plugin, eslint, prettier, NutJS, Fastify, TSyringe, Zod, Node.js, PM2, @nut-tree-fork/nut-js, pino, dotenv, TypeScript 5.0, Jest, Tesseract OCR, OpenCV, TypeScript compiler, Node.js runtime, Postman for testing, EventSource</critical_dependencies>
    <deprecated_packages>None identified</deprecated_packages>
    <version_constraints>ECMAScript 2024, TypeScript 5.0, @nut-tree-fork/nut-js ^4.2.0, fastify ^4.24.0, typescript ^5.3.2, zod &gt;=3.0.0, tsyringe &gt;=4.0.0, dotenv &gt;=16.0.0, Jest &gt;=29.x, Tesseract &gt;=5.0, OpenCV &gt;=4.5</version_constraints>
    <internal_packages>src/ modules organized by responsibility, domain/entities, domain/use-cases, dto, services, application/services, infrastructure/adapters, config, application/dto, schemas, src/interface/controllers, src/application/services, src/config, src/domain/entities/mouse-action.js, src/config/mouse.config.js</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Command validation can be more robust, Lack of timeout for async operations, Error handling can be more granular, Input validation can be strengthened, Environment variable validation not yet implemented, Use of &apos;as any&apos; for drag and scroll options may compromise typing, Temporary use of any for images, Imprecise image dimension estimation, Simple authentication may be insufficient for production, Lack of formal automated tests, Refactor legacy image preprocessing code, Improve test coverage on edge cases, Need for more integrated tests with real hardware</technical_debt>
    <known_issues>Possible silent failure on unknown commands, Possible latency in smooth scrolls with high duration, Possible overhead in frequent base64 decoding, Default values may mask incorrect configurations, Risk of exceptions if execute is not overridden, Possible failure in correct dimension detection for non-square buffers, Possible overhead in continuous streaming without connection control, Possible error message leakage in production if NODE_ENV misconfigured, Dependency on local API availability, OCR accuracy drops on low-quality scans, High memory usage on large batch processing, Limitations of mock for simulating real mouse behavior</known_issues>
    <performance_bottlenecks>Single instance limitation may impact performance under high load, Potential latency in UI automation depending on environment, Dependency on external services may impact latency, Async loops in scroll may impact performance, Synchronous buffer operations may impact performance, Sequential execution may limit throughput, Delays in loops may impact total execution time, Streaming SSE may impact CPU and memory at scale, Image preprocessing step is CPU intensive, Interpolated movements may be costly at high frequency, Smooth scroll may generate multiple calls, impacting performance on limited devices</performance_bottlenecks>
    <migration_status>Initial project, no migrations in progress, Stable project, no migrations ongoing, Migrating from Tesseract 4 to 5</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>ESLint rule compliance, Avoid explicit any, Correct use of async/await, Code quality, Test coverage, Security and validation, Type and error validation, Naming consistency, Separation of responsibilities, Correct registration in DI container, Dependency injection consistency, Immutability validation, Correct use of environment variables, Correct implementation of execute method, Documentation clarity, No unjustified any usage, Interface definition clarity, Dependency injection, Error handling, Modularity, Performance optimizations, Security compliance, Authentication validation, Streaming performance, Mock isolation, Error message clarity</code_review_focus>
    <documentation_requirements>Clear documentation via JSDoc and README, JSDoc for public methods, Clear documentation of schemas and types, Document environment variables and defaults, Clear documentation for each command and its parameters, Document static methods and interfaces, Clear documentation of error formats and handler usage, Document middleware functions with JSDoc, Clear documentation for controllers and routes, Comprehensive docstrings, Architecture decision records, Clear documentation of environment variables and their effects, Clear documentation of endpoints and data contracts</documentation_requirements>
    <communication_style>Clear and objective comments, Use of _ prefix for ignored arguments, Objective and technical comments, Use of PRs for discussions, Objective and explanatory comments in Portuguese, Objective and technical comments, no excessive verbosity, Clear, concise comments, Respectful and constructive PR discussions, Use of English for technical terms, Objective comments in Portuguese for context</communication_style>
    <decision_log>Adoption of strict rules for promises and unused variables, Adoption of Fastify for performance, Use of tsyringe for DI, Validation with Zod, Use of Dependency Injection for testability and modularity, Use of NutJS for device control, Use of dotenv for configuration, Default values to avoid failures in development, Adoption of Command pattern for modularity and extensibility, Choice of Factory Method for action creation, Use of interfaces for data contracts, Immediate stop on failures for safety, Choice of nut-js for mouse control due to robustness and multiplatform support, Use of Clean Architecture and DI for modularity, Centralized error handling for maintainability and monitoring, Use of Zod for centralized validation, Use of Controller pattern for modularization, Adoption of Fastify Plugin for routes, Use of async/await for async control, Use of ESLint and Jest for quality and testing, Clear separation of ignored files, Decision to ignore environment files and build directories to keep repository clean, Adopted pipeline pattern for modularity, Use OAuth2 for API security, Use of immutable constants for configuration, Dependency on environment variables for flexibility, Use of API key for authentication, Streaming via Server-Sent Events (SSE), Use of Jest for testing, Global logger mock to avoid log pollution, Use of nut-js for mouse abstraction, Use of linear interpolation for smooth movement, Use of adapter pattern for hardware abstraction, Strict coordinate validation</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>REST, RESTful API, REST with HTTP POST and GET endpoints, REST with SSE endpoint for streaming</api_style>
    <versioning_strategy>Versioning via URL (/api/v1/), Semantic versioning via package.json, URI versioning (e.g., /api/v1/)</versioning_strategy>
    <response_formats>JSON, Standardized JSON with success, error, and data fields, Base64 encoded images, Arrays of MatchResult, CommandResult with success, data, and error</response_formats>
    <rate_limiting>1000 requests per minute per user</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development, production, staging, test, dev (http://localhost:3000), prod, Development (http://localhost:3000), Production (configurable via environment)</environments>
    <deployment_method>PM2 process manager, Docker, Kubernetes, Node.js runtime, Docker containers orchestrated by Kubernetes, CI/CD pipelines</deployment_method>
    <environment_variables>NODE_ENV, PORT, HOST, LOG_LEVEL, MOUSE_SPEED, SCREEN_CONFIDENCE, API_KEY, API_URL, SCREEN_ADAPTER_IMPLEMENTATION, MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_DEFAULT_SMOOTH, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, MOUSE_DEFAULT_DURATION, DATABASE_URL, REDIS_URL, OCR_API_KEY</environment_variables>
    <infrastructure_constraints>Accessibility permissions on macOS, DISPLAY variable on Linux, Memory limit set to 1G for automatic restart, Requires Node.js &gt;=16, Compatible with Linux, Windows, and macOS, Requires access to desktop for automation, Requires access to graphical resources for mouse and screen capture, Persistent connections required for SSE, Low latency requirements, Limited GPU availability, Max 4 CPU cores per pod</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/application/dto/automation-request.dto.ts</path>
        <name>automation-request.dto.ts</name>
        <summary>Este arquivo define schemas de validação para operações relacionadas ao controle e interação do mouse e captura de tela, utilizando a biblioteca Zod para garantir a integridade dos dados. Ele especifica formatos rigorosos para coordenadas, botões do mouse, durações e comportamentos opcionais como suavização (smooth) e confiança em reconhecimento de imagens, permitindo a construção de comandos robustos para automação de interface gráfica. Através desses schemas, o código habilita a validação e tipagem segura de requisições para movimentos, cliques, arrastes, scrolls e buscas visuais na tela, facilitando a integração com sistemas de automação e testes automatizados, garantindo consistência e previsibilidade no comportamento das interações simuladas.</summary>
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
            <values>Validação rigorosa de coordenadas não negativas, Limites de duração entre 100 e 5000 ms, Confiança mínima para reconhecimento de imagens</values>
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
            <values>Schema Validation Pattern, Type-safe API Contracts</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/schemas - validações de dados, src/types - definições de tipos inferidos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e propriedades, PascalCase para tipos e schemas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre schemas de input e tipos inferidos, Isolamento de validação de dados</values>
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
            <values>tests/unit para validação de schemas</values>
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
            <values>Mocks para inputs inválidos e limites de valores</values>
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
            <values>Lint, Testes unitários, Build</values>
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
            <values>Duração mínima 100ms, máxima 5000ms para ações</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Precisão e confiabilidade sobre velocidade extrema</values>
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
            <values>Validação via Zod com mensagens padronizadas</values>
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
            <values>zod</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>zod &gt;=3.0.0</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values></values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values></values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values></values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values></values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tipos e limites, Consistência de naming</values>
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
            <values>Uso de Zod para validação e tipagem</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST-like JSON payloads</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values></values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
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
            <values>Docker</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values></values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/automation.service.ts</path>
        <name>automation.service.ts</name>
        <summary>O código implementa um serviço de automação que executa comandos relacionados a interações de mouse e operações de tela, como captura e reconhecimento de imagens. Ele atua como um executor central que interpreta comandos de diferentes tipos (mouse, screen, wait), delegando ações específicas para serviços especializados, garantindo tratamento de erros e retorno padronizado de resultados. Essa estrutura modular permite a extensão e integração com outros componentes do sistema, facilitando a automação de tarefas baseadas em eventos visuais e ações de input, com foco em robustez e clareza na execução dos comandos.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>AutomationService, Executor de comandos de automação para interface gráfica</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de interface, Automação de UI, Mouse actions, Screen capture, Template matching</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Execução correta e segura dos comandos, Validação de parâmetros obrigatórios, Tratamento robusto de erros</values>
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
            <values>MouseService, ScreenService</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Command Pattern, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/ - entidades e casos de uso do domínio, services/ - implementação dos serviços de mouse e tela, infrastructure/ - configuração de injeção de dependências</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, Sufixo Service para serviços</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio e infraestrutura, Serviços injetados via DI, Comandos encapsulados em entidades específicas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript ESLint Recommended</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>eslint-config-standard-with-typescript</values>
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
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de serviços MouseService e ScreenService</values>
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
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável no escopo deste serviço</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável no escopo deste serviço</values>
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
            <values>Operações assíncronas devem ser rápidas, idealmente &lt; 500ms para ações simples</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de execução das ações de automação</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade horizontal via múltiplas instâncias do serviço</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Objeto com propriedades success (boolean) e error (string)</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não explícito no código, presumivelmente via middleware externo</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Retorno de erro padronizado para falhas, sem retry automático</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>MouseService, ScreenService, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0, tsyringe compatível com TS 5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>domain/entities, domain/use-cases</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Validação de comandos pode ser mais robusta, Falta de timeout para operações assíncronas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível falha silenciosa em comandos desconhecidos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Dependência de serviços externos pode impactar latência</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tipos e erros, Clareza na separação de responsabilidades</values>
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
            <values>Uso de DI para facilitar testes e manutenção</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável - serviço interno</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Objeto JSON com success, error e data</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado</values>
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
            <values>Não especificados no código</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de acesso a recursos gráficos para captura e controle do mouse</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/dependency-injection.ts</path>
        <name>dependency-injection.ts</name>
        <summary>Este arquivo é responsável pela configuração e registro das dependências essenciais para a aplicação de automação baseada em controle de mouse e tela, utilizando injeção de dependência via o container do tsyringe. Ele centraliza a associação entre interfaces abstratas e suas implementações concretas, como adaptadores NutJS para mouse e tela, serviços de domínio e casos de uso, garantindo a modularidade e a fácil substituição de componentes. O comportamento principal é preparar o ambiente para que as funcionalidades de automação possam ser executadas de forma desacoplada, promovendo escalabilidade e manutenção facilitada dentro de uma arquitetura orientada a domínio e injeção de dependências.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation System, Automação de controle de mouse e tela</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, Controle de dispositivos, UI Automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Registro correto das dependências, Desacoplamento entre serviços e adaptadores</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe 4.7.0, NutJS 2.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>NutJS APIs para controle de mouse e tela</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - lógica de negócio, domain/use-cases - regras de domínio, infrastructure/adapters - integração com bibliotecas externas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes, camelCase para funções e variáveis, sufixo .service.js para serviços</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio, aplicação e infraestrutura, Dependências unidirecionais do domínio para infraestrutura</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Sem uso de any explícito</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
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
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para adaptadores externos, Fixtures para dados de entrada</values>
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
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Manter baixo overhead na resolução de dependências</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Facilidade para substituir implementações para suportar diferentes plataformas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, reflect-metadata, NutJS</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>tsyringe &gt;=4.0.0, TypeScript &gt;=5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, domain/use-cases, infrastructure/adapters</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Verificação de registros corretos no container, Consistência de injeção de dependência</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar serviços e casos de uso com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção do tsyringe para DI, Uso de NutJS para controle de dispositivos</values>
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
        <path>src/infrastructure/adapters/nutjs/nutjs-mouse.adapter.ts</path>
        <name>nutjs-mouse.adapter.ts</name>
        <summary>Este arquivo implementa um adaptador de mouse utilizando a biblioteca Nut.js para abstrair operações de controle do mouse em um ambiente TypeScript. Ele oferece funcionalidades para movimentação do cursor com suporte a movimentos instantâneos e suaves via interpolação linear, cliques simples e duplos, arrasto de elementos, rolagem vertical e obtenção da posição atual do cursor. O componente integra-se ao sistema por meio da injeção de dependência, respeitando configurações globais de velocidade do mouse e mapeando botões de mouse do domínio para a biblioteca externa. Seu comportamento é orientado a garantir precisão e fluidez nas interações de mouse, habilitando automações e testes que dependem de manipulação programática do cursor e eventos de mouse em interfaces gráficas.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Control Automation, Nut.js Mouse Adapter</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Interface, Controle de Mouse, Testes Automatizados</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Movimentação precisa do cursor, Mapeamento correto dos botões do mouse, Execução confiável de cliques e arrastos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe 4.x, Nut.js 2.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Nut.js API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Clean Architecture, Dependency Injection, Adapter Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - Serviços de aplicação, domain/entities - Entidades do domínio, config - Configurações globais, adapters - Implementações concretas de interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes, camelCase para métodos e variáveis, Enums em MAIÚSCULAS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Domínio desacoplado da infraestrutura via interfaces, Dependências unidirecionais do domínio para aplicação e infraestrutura</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de any implícito, Uso obrigatório de async/await para operações assíncronas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão, Quebra de linha em 80 caracteres</values>
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
            <values>Mock de dependências externas via jest.mock</values>
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
            <values>Build, Lint, Testes, Deploy automático em staging</values>
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
            <values>Movimentos de mouse devem ocorrer dentro do tempo configurado pelo parâmetro duration</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre suavidade do movimento e tempo de execução</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Nut.js, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../../application/services/mouse.service.js, ../../../domain/entities/mouse-action.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Correção do tipo incorreto &apos;promise&apos; para &apos;Promise&apos;</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Uso de delays em loops pode impactar performance em movimentos longos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipagem, Tratamento de erros assíncronos, Clareza na interpolação de movimentos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação JSDoc para métodos públicos e privados</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Escolha do Nut.js para controle de mouse por sua robustez e suporte multiplataforma</values>
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
        <summary>O arquivo define a classe AutomationController, responsável por expor uma API RESTful para controle e automação de interações com o mouse e a tela do sistema operacional. Ele implementa endpoints para movimentação, clique, arrasto e scroll do mouse, além de captura e busca de imagens na tela, utilizando serviços especializados para abstrair a lógica de automação. Um destaque funcional é o endpoint de streaming via Server-Sent Events que transmite continuamente a posição do mouse, com autenticação simples por API key. O controlador integra validações de schemas JSON para garantir a conformidade dos dados recebidos e produz respostas padronizadas, facilitando a integração com clientes externos. A arquitetura segue princípios de injeção de dependência e separação clara entre controller e serviços, promovendo manutenibilidade e escalabilidade do sistema.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation API, Controle e automação de mouse e tela</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de interface, Controle remoto, Automação de testes, Computer Vision</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável com funcionalidades completas</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa dos dados de entrada, Autenticação para streaming de dados, Respostas padronizadas para integração</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, tsyringe 4.x, pino 8.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Nenhum serviço externo explícito, mas integração via API key para streaming</values>
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
            <values>application/services - lógica de negócio, application/dto - objetos de transferência de dados, config - configurações do sistema, controllers - definição das rotas e controle de fluxo, schemas - validação de dados via JSON Schema</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes em PascalCase, Métodos em camelCase, Arquivos com extensão .js ou .ts seguindo o nome da classe ou funcionalidade, Constantes em PascalCase</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre controller e serviços, DTOs para entrada e saída de dados, Configurações isoladas em pasta config</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript/TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras padrão Airbnb e regras específicas para TypeScript</values>
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
            <values>Strict TypeScript com tipagem explícita em DTOs e métodos</values>
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
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para serviços externos e injeção de dependência</values>
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
            <values>API Key simples para streaming SSE</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Validação de API Key para acesso ao endpoint de streaming</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Chave API armazenada em variáveis de ambiente, não exposta em código</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Content-Security-Policy: default-src &apos;none&apos;, X-Content-type-Options: nosniff, Cache-Control: no-cache, Connection: keep-alive</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Recomenda-se uso de HTTPS para proteger dados em trânsito</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Respostas síncronas rápidas para comandos de mouse e tela</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência para comandos de automação, Uso eficiente de recursos no streaming SSE</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Nenhuma estratégia explícita de cache implementada</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Streaming SSE pode exigir balanceamento para múltiplos clientes</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Resposta JSON com campo success booleano e mensagem de erro opcional</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso do pino para logs estruturados com níveis info, debug e error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado, mas logs estruturados facilitam integração com sistemas externos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Interrupção do streaming em caso de erro, resposta 401 para autenticação falha</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, tsyringe, pino, MouseService, ScreenService</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com Fastify 4.x e TypeScript 5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, application/dto, config, schemas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Autenticação simples pode ser insuficiente para produção segura</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível overhead no streaming contínuo sem controle de conexões</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Streaming SSE pode impactar CPU e memória em alta escala</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tipos, tratamento de erros, segurança da API</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para novos métodos e endpoints</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos, uso de logs para rastreabilidade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Clean Architecture e injeção de dependência para modularidade</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>RESTful com endpoints HTTP POST e GET</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não explícito no código, presumivelmente versão única</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON padronizado com campos success e data</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado explicitamente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker e orquestração via Kubernetes recomendados</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>API_KEY para autenticação do streaming, Configurações de mouse e ambiente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de conexões persistentes para SSE, Requisitos de baixa latência</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/middleware/error-handler.middleware.ts</path>
        <name>error-handler.middleware.ts</name>
        <summary>Este arquivo implementa um error handler para uma aplicação backend utilizando Fastify e Zod para validação. Seu propósito principal é capturar erros ocorridos durante o processamento das requisições HTTP, classificá-los conforme sua natureza (erros de validação, erros HTTP com status code definido ou erros internos) e responder ao cliente com um formato padronizado de erro, incluindo detalhes úteis para debugging em ambiente de desenvolvimento. O handler também registra os erros no sistema de logs do Fastify, garantindo rastreabilidade e monitoramento. Essa abordagem centralizada de tratamento de erros melhora a robustez da aplicação, facilita a manutenção e oferece uma experiência consistente para consumidores da API.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>API Backend com Fastify para tratamento centralizado de erros</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Backend API, Validação de dados, Tratamento de erros HTTP</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Erros de validação devem retornar status 400 com detalhes, Erros não tratados devem retornar status 500, Logs de erro devem ser registrados para monitoramento</values>
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
            <values>Middleware Pattern, Centralized Error Handling</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/handlers - para middlewares e handlers, src/routes - definição de rotas, src/plugins - plugins Fastify</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e classes, suffix Handler para middlewares</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre handlers, rotas e serviços, Dependência unidirecional para evitar acoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, sem uso de any, preferências para async/await</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para 2 espaços e aspas simples</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções públicas e handlers</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com configuração no tsconfig.json para strict true</values>
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
            <values>Given-When-Then, AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para dependências externas e fixtures para dados de teste</values>
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
            <values>Revisão obrigatória por pelo menos um revisor, Checks automáticos de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, lint, test e deploy automatizados via GitHub Actions</values>
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
            <values>JSON com campos success (boolean), error (string), details (array opcional)</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso do request.log.error para registrar erros</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Resposta padronizada para erros conhecidos e fallback para erro 500</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, zod</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível vazamento de mensagens de erro em produção se NODE_ENV mal configurado</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Verificação de tratamento correto de erros e padronização de respostas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara dos formatos de erro e uso do handler</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e uso de JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Centralização do tratamento de erros para facilitar manutenção e monitoramento</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON padronizado com campos success, error e details</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
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
        <summary>Este arquivo implementa uma função middleware para validação de requisições HTTP em um servidor Fastify, utilizando schemas definidos com a biblioteca Zod. Seu propósito principal é garantir que o corpo da requisição (request.body) esteja conforme o schema esperado, promovendo a integridade dos dados antes do processamento posterior. Em caso de falha na validação, a função responde imediatamente com um status 400 e uma mensagem de erro padronizada, evitando que dados inválidos avancem na pipeline. Essa abordagem centraliza a validação, melhora a robustez da API e facilita a manutenção, integrando-se de forma transparente ao fluxo de requisições do Fastify.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>API Validation Middleware, Validação de requisições HTTP para APIs Fastify</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Backend API, Validação de dados, Fastify, Zod</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação estrita de dados de entrada, Resposta imediata a dados inválidos com status 400</values>
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
            <values>Middleware Pattern, Layered Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/middleware - middlewares para validação e autenticação, src/routes - definição de rotas, src/schemas - definições de schemas Zod</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e classes, suffix Middleware para middlewares</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Middleware isolado em módulo próprio, Dependência unidirecional para schemas e Fastify</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript e Fastify</values>
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
            <values>tests/middleware - testes unitários para middlewares</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 90% cobertura para middlewares</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de FastifyRequest e FastifyReply</values>
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
            <values>Baixa latência, Validação eficiente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>JSON com campos success, error e message</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Resposta imediata com status 400 para erros de validação</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, zod</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação correta de schemas, Tratamento adequado de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar funções middleware com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Zod para validação centralizada</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>application/json</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/routes/automation.routes.ts</path>
        <name>automation.routes.ts</name>
        <summary>Este arquivo define um módulo de rotas para integração com o framework Fastify, focado em automatizar o registro de endpoints relacionados a funcionalidades de automação. Seu comportamento principal é encapsular a criação e registro das rotas por meio de um controller especializado, promovendo modularidade e separação de responsabilidades. Funcionalmente, ele atua como um ponto de entrada para expor as APIs de automação, facilitando a extensão e manutenção do sistema ao delegar a lógica de roteamento para um controller dedicado.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation API, Módulo de gerenciamento e exposição de rotas para automação</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, APIs REST, Backend</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Registro correto das rotas, Isolamento da lógica de automação, Disponibilidade das APIs</values>
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
            <values>Controller Pattern, Plugin Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>interface/controllers: controllers responsáveis pela lógica de rotas e regras de negócio</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para funções e variáveis, suffix Controller para controllers</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre rotas e lógica de negócio via controllers, Uso de plugins para modularização</values>
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
            <values>Testes localizados em __tests__ próximos aos controllers</values>
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
            <values>Mocks para dependências externas e controllers</values>
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
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, AutomationController</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../interface/controllers/automation.controller.js</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Modularidade, Clareza na separação de responsabilidades, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara dos controllers e rotas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e informativos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do padrão Controller para modularização, Adoção do Fastify Plugin para rotas</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/schemas/automation.schemas.ts</path>
        <name>automation.schemas.ts</name>
        <summary>Este arquivo define múltiplos JSON Schemas para validação de objetos relacionados a interações de mouse e operações de captura e busca na tela, focando em ações como movimento, clique, arrasto e scroll do mouse, além de funcionalidades de reconhecimento e captura de regiões específicas da tela. Cada schema especifica propriedades detalhadas, tipos e restrições para garantir a integridade dos dados de entrada, como coordenadas, duração, suavidade e botões do mouse, além de parâmetros para reconhecimento visual com níveis de confiança e formatos de imagem. O comportamento central do código é fornecer uma estrutura rigorosa para validar comandos de automação de interface gráfica, assegurando que as operações sejam executadas com parâmetros corretos e dentro de limites definidos, facilitando a integração com sistemas de automação e testes visuais. A ausência de propriedades adicionais e a definição de valores padrão indicam um controle estrito sobre os dados, promovendo segurança e previsibilidade no uso das ações descritas. Este conjunto de schemas habilita a construção de fluxos automatizados confiáveis e parametrizáveis para manipulação de interfaces gráficas e análise visual, sendo essencial para sistemas que dependem de automação de UI e reconhecimento de padrões visuais.</summary>
        <properties>
          <property>
            <name>mouseMoveJsonSchema</name>
            <subProperty>x</subProperty>
            <values>integer, minimum: 0</values>
          </property>
          <property>
            <name>mouseMoveJsonSchema</name>
            <subProperty>y</subProperty>
            <values>integer, minimum: 0</values>
          </property>
          <property>
            <name>mouseMoveJsonSchema</name>
            <subProperty>smooth</subProperty>
            <values>boolean, default: true</values>
          </property>
          <property>
            <name>mouseMoveJsonSchema</name>
            <subProperty>duration</subProperty>
            <values>integer, minimum: 100, maximum: 5000, default: 1000</values>
          </property>
          <property>
            <name>mouseClickJsonSchema</name>
            <subProperty>x</subProperty>
            <values>integer, minimum: 0</values>
          </property>
          <property>
            <name>mouseClickJsonSchema</name>
            <subProperty>y</subProperty>
            <values>integer, minimum: 0</values>
          </property>
          <property>
            <name>mouseClickJsonSchema</name>
            <subProperty>button</subProperty>
            <values>left, right, middle, default: left</values>
          </property>
          <property>
            <name>mouseClickJsonSchema</name>
            <subProperty>doubleClick</subProperty>
            <values>boolean, default: false</values>
          </property>
          <property>
            <name>mouseClickJsonSchema</name>
            <subProperty>smooth</subProperty>
            <values>boolean, default: true</values>
          </property>
          <property>
            <name>mouseClickJsonSchema</name>
            <subProperty>duration</subProperty>
            <values>integer, minimum: 100, maximum: 5000, default: 1000</values>
          </property>
          <property>
            <name>mouseDragJsonSchema</name>
            <subProperty>from</subProperty>
            <values>object with x and y integers &gt;= 0</values>
          </property>
          <property>
            <name>mouseDragJsonSchema</name>
            <subProperty>to</subProperty>
            <values>object with x and y integers &gt;= 0</values>
          </property>
          <property>
            <name>mouseDragJsonSchema</name>
            <subProperty>duration</subProperty>
            <values>integer, minimum: 100, maximum: 5000, default: 1000</values>
          </property>
          <property>
            <name>mouseDragJsonSchema</name>
            <subProperty>smooth</subProperty>
            <values>boolean, default: true</values>
          </property>
          <property>
            <name>mouseScrollJsonSchema</name>
            <subProperty>direction</subProperty>
            <values>up, down</values>
          </property>
          <property>
            <name>mouseScrollJsonSchema</name>
            <subProperty>amount</subProperty>
            <values>integer, minimum: 1, maximum: 10, default: 3</values>
          </property>
          <property>
            <name>mouseScrollJsonSchema</name>
            <subProperty>smooth</subProperty>
            <values>boolean, default: true</values>
          </property>
          <property>
            <name>mouseScrollJsonSchema</name>
            <subProperty>duration</subProperty>
            <values>integer, minimum: 100, maximum: 5000, default: 1000</values>
          </property>
          <property>
            <name>screenFindJsonSchema</name>
            <subProperty>template</subProperty>
            <values>string, minLength: 1</values>
          </property>
          <property>
            <name>screenFindJsonSchema</name>
            <subProperty>confidence</subProperty>
            <values>number, minimum: 0, maximum: 1, default: 0.8</values>
          </property>
          <property>
            <name>screenFindJsonSchema</name>
            <subProperty>region</subProperty>
            <values>object with x, y integers &gt;= 0 and width, height integers &gt;= 1</values>
          </property>
          <property>
            <name>screenCaptureJsonSchema</name>
            <subProperty>region</subProperty>
            <values>object with x, y integers &gt;= 0 and width, height integers &gt;= 1</values>
          </property>
          <property>
            <name>screenCaptureJsonSchema</name>
            <subProperty>format</subProperty>
            <values>png, jpg, default: png</values>
          </property>
        </properties>
      </file>
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Pesquisando na internet, quero que adicione suporte ao keyboard, pois atualmente ele não está contemplado. As funcionalidades devem permitir que eu defina o tempo entre cada caractere ou o tempo total da digitação. Para o endpoint, eu envio o texto que será digitado e posso escolher entre essas duas opções: tempo por caractere ou tempo total. Além disso, deve haver um campo para o valor correspondente. Ou seja, o primeiro campo indica qual das opções estou usando, e o segundo campo define o valor. Se eu não passar nenhum desses parâmetros, a digitação deve ocorrer instantaneamente.

Também quero um endpoint para o clipboard, para que eu possa copiar um conteúdo para o clipboard via endpoint, e outro endpoint para colar, ou seja, acionar a colagem do conteúdo atualmente no clipboard.

Depois de implementar isso, faça ótimas tratativas de erro, garantindo que tudo fique bem amarrado e que a API realmente dispare erros caso o usuário envie dados incorretos. Considere vários cenários para isso, revise as tratativas de erro dos nossos outros endpoints e atualize o nosso arquivo Postman, pois ele está muito desatualizado. Inclua as informações atualizadas dos demais endpoints e também as informações desses novos endpoints.

Último plano: Implementaremos suporte completo a keyboard e clipboard. Serão criados novos módulos TypeScript, validações Zod, rotas Fastify, serviços e testes, garantindo configuração de velocidade, segurança, manutenibilidade e atualização do Postman.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Atualmente não há interface para keyboard e clipboard. Criaremos src/infrastructure/adapters/nutjs/nutjs-keyboard.adapter.ts (responsável por keyPress, type e paste), src/application/services/keyboard.service.ts (orquestra envio de texto com timing) e src/application/services/clipboard.service.ts (copy e paste). Controller único em src/interface/controllers/keyboard.controller.ts adicionará rotas /api/v1/keyboard/type, /clipboard/copy e /clipboard/paste. Fluxo: Controller → Service → Adapter → NutJS/clipboardy, retornando CommandResult padronizado.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Criaremos keyboard.dto.ts contendo interface TypeDTO { text: string; mode?: 'perChar'|'total'; value?: number }. Persistência não necessária; entretanto guardaremos métricas de última digitação em memória (Map<RequestId, TimingStats>) em src/state/keyboard-metrics.store.ts para debug. Clipboard usa clipboardy sem armazenamento. Schemas Zod ficam em src/schemas/keyboard.schemas.ts e clipboard.schemas.ts, inferindo tipos para estrita type-safety.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: Adicionaremos registro DI em src/config/dependency-injection.ts: container.register<IKeyboardService>('KeyboardService', { useClass: KeyboardService }) e equivalente para ClipboardService. automation.routes.ts importará KeyboardController e adicionará plugin fastify.register(KeyboardController.buildRoutes). Postman collection "Automation API.postman_collection.json" receberá novas folders Keyboard e Clipboard com exemplos completos.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: Casos: text vazio ou >10k chars, mode inválido, value negativo ou >300000ms, combinação mode+value inconsistente, charset com caracteres não suportados pelo layout, falha de permissão de clipboard em Linux Wayland, timeout de digitação excedido, interrupção de processo NutJS. Definiremos KeyboardError extends BaseError com codes INVALID_MODE, UNSUPPORTED_CHAR, TIMEOUT. Middleware error-handler.middleware.ts mapeará para 400/422 ou 500 conforme o caso, seguindo padrão JSON { success:false, error:"CODE", details:[...] }.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Arquivo config/keyboard.config.ts exportará const KeyboardConfig = { defaultMode: 'instant', maxTextLength: 10000, defaultDelayPerChar: 0, maxDelay: 300000 } as const. Valores podem ser sobrescritos via env vars KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_DELAY. Services recebem config via constructor (injeção). Hooks onBeforeType/onAfterType expostos em IKeyboardService para futura customização (ex.: key mapping nacional).

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Pattern Adapter → Service → Controller: KeyboardController valida e delega; KeyboardService usa Strategy (PerCharStrategy, TotalTimeStrategy, InstantStrategy) instanciada via Factory baseado no payload. Cada Strategy implementa interface ITypeStrategy { type(text:string, opts:TimingOpts): Promise<void> }. ClipboardService encapsula clipboardy; ambos services são Singletons fornecidos por tsyringe. Diagrama: HTTP → Controller → Service → Strategy|Adapter → NutJS|clipboardy.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: O algoritmo de per-char usa setTimeout batching de 50 teclas para reduzir overhead, complexidade O(n). totalTime divide duração pelo length para delay uniforme. Para long texts, se delay total >20s criamos chunking em Worker Thread evitando bloquear event-loop. Metrics store permite monitoramento via Prometheus exporter exposing /metrics keyboard_typing_duration_seconds histogram. Benchmarks: 1000 char instant <120 ms, perChar 10 ms/char ±2 ms jitter.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Schemas Zod: text minLength 1, unicode safe; mode optional enum; value optional number positive ≤300000. Sanitizamos text para remover control chars 0x00-0x1F exceto \n\t. Clipboard copy recusa blobs >1 MB. Headers x-api-key validados por middleware existente. Não registramos text em logs (pino child({ redact:['body.text'] })). Environment variables lidas com dotenv-safe e validadas em config/env.schema.ts.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Unit: keyboard.service.test.ts cobre estratégias (inputs extremos, delays cumulativos); adapter mocka nutjs.keyboard.type. Clipboard tests usam jest.mock('clipboardy'). Integration: fastify.inject POST /keyboard/type com payloads válidos/ inválidos esperando status 200/400. E2E (optional CI job) roda em xvfb para verificar caracteres realmente enviados. Cobertura alvo ≥90% branches nos novos módulos, total projeto ≥82%.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: (1) rotas GET /clipboard/paste e POST /clipboard/copy operam; (2) POST /keyboard/type aceita todos modos; (3) erros padronizados; (4) Postman collection importável sem warnings; (5) tests verdes e cobertura OK; (6) lint sem erros; (7) tsc --noEmit sem issues; (8) typing duration medido corresponde ao value ±5 ms; (9) metrics expostas; (10) README e CHANGELOG atualizados com instruções de env KEYBOARD_*. Validamos via pipeline CI e revisão de código.
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