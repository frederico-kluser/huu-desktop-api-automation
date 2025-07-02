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
    <name>NutJS REST API for Desktop and UI Automation via HTTP</name>
    <domain>Desktop Automation, UI Automation, Input Device Control, Screen Capture, Clipboard Management, Keyboard Input Automation, Mouse Control, Backend API, Test Automation, Real-time Event Streaming, Image Processing, Optical Character Recognition, System Integration, Validation, Error Handling</domain>
    <current_phase>Production, MVP, Version 1.0.0, Stable with real-time streaming support, Development, Initial implementation of command architecture, Pre-production, Optimized build, Integration tests, Automated tests, Unit tests implemented for core features, Maintenance</current_phase>
    <critical_business_rules>System permissions must be respected, Strict input validation to prevent invalid commands, Maintain integrity of automation operations, Continuous service availability, Automatic restart on excessive memory usage, Error and output logs for auditing, Safe execution of UI commands, Maintain consistent system state, Strict validation of input coordinates to prevent out-of-bounds actions, Minimum confidence threshold for image recognition, Timeouts for template waits, Image buffer integrity, Sequential and correct execution of automation commands, Isolate hardware dependencies via adapters, Environment variables must be correctly defined, API key must not be empty in production, Standardized result return for integration, Extensibility for new command types, Immutability of actions after creation, Consistent typing of options, Accurate definition of regions, Consistent conversion from MatchResult to ScreenRegion, Stop execution on command failure, Detailed success/failure results, Server availability must be maintained, Consistent API response integrity, Precise cursor movement, Correct mouse button mapping, Reliable execution of clicks and drags, Configurable confidence for screen capture, Strict JSON Schema input validation, Standardized responses with success status, Integrity of SSE stream, Errors must be handled and returned with appropriate HTTP status, Clear and standardized error messages, Error logs must contain sufficient context for debugging, No stack trace exposure in production, Immediate response to invalid data with status 400, Reliable event streaming, Accurate keyboard input handling, Stable route registration, Build must be clean and error-free, Strict typing to prevent bugs, Sensitive configuration files must not be versioned, No versioning of dependencies and generated artifacts, Clipboard content must not be empty or exceed 1 MB, Text must not be empty or contain only control characters, Supported key list enforcement, Key combinations limited to 5 valid keys, Operations must return standardized results, Failures must be handled and reported, Strict text sanitization to prevent control characters, Max text length for typing: 10000 characters, Max delay for timing strategies: 300000ms, Batch size between 1 and 1000, Default mode must be one of: instant, perChar, total, Consistent response for success and failure, No loss of error messages, Returned data integrity, Services must implement automation contracts, Command execution must be traceable via CommandResult, Standard key support, Robust error handling, Input operations must be atomic and reliable, Clipboard content integrity must be preserved, Error responses must be consistent and informative, Payloads must conform to JSON Schema Draft 7, Clipboard content must be a non-empty string, No additional properties allowed in requests, Strict input data validation to prevent injection or malformed commands, API key authentication required for all endpoints, Strict parameter validation to prevent invalid commands, Max response time of 5000ms to ensure performance, Max size limits for text and clipboard content (e.g., 10,000 characters for typing, 1MB for clipboard), Correct HTTP responses for routes, Complete logs for auditing, Chronological event order must be maintained, Correct replay after reconnection, Buffer size limit to prevent memory overflow, Rate limiting to prevent overload, Reliable event distribution to all listeners, Invalid event filtering, Buffer size between 1 and 100000, Heartbeat interval between 1000 and 300000 ms, Max event rate between 1 and 50000 events/s, Max event age between 1000 and 3600000 ms, Logs must be configured according to environment, Log levels must respect environment variables, Reliable event delivery, SSE connections must remain active with heartbeats, No event loss during reconnections, Real-time event delivery via SSE, Event buffer integrity and consistency, Respect max event age limits for stored events, Event integrity and order, Correct timestamp for synchronization, Unique event identification, API key must be provided for connection, Event logs must not exceed 100 entries, Connection status must be accurately reflected, API must return success:true, Image field must be present and valid base64, Saved PNG must have valid header and minimum size</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript 5.x, JavaScript (Node.js), Node.js 18+, ECMAScript 2022</primary_language>
    <frameworks>Fastify 4.x, TSyringe 4.x, Zod 3.x, PM2 5.x, Jest 29.x, ESLint 8.x, NutJS 4.2, dotenv 16.0, Sharp, Clipboardy 3.x, OpenCV 4.7, Tesseract OCR 5.0</frameworks>
    <databases>None</databases>
    <external_services>@nut-tree-fork/nut-js, dotenv, Clipboardy, Sharp, MouseService, ScreenService, API key authentication, Server-Sent Events (SSE), pino logger, nanoid, Operating System APIs for keyboard and clipboard control, EventSource (SSE client), Cloud Storage API, Authentication Service (OAuth2), Environment Variables (process.env)</external_services>
    <package_manager>npm, yarn, pip</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Clean Architecture, Dependency Injection, Modular Architecture, REST API, Schema Validation Pattern, Command Pattern, Service Layer, Adapter Pattern, Singleton, Factory Method, Middleware Pattern, Layered Architecture, Plugin Pattern, Controller Pattern, DTO, Observer, Circular Buffer, Rate Limiter, Strategy</design_pattern>
    <folder_structure>src/ - main source code, dist/ - build output, tests/ - unit and integration tests, config/ - global configuration, domain/entities - domain entities, application/services - business logic and services, infrastructure/adapters - hardware adapters, interface/controllers - HTTP controllers, schemas/ - JSON Schema and Zod validation, types/ - TypeScript type definitions, logs/ - log files, node_modules/ - external dependencies, coverage/ - test coverage reports</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for classes and interfaces, kebab-case for files, UPPER_SNAKE_CASE for environment variables, Suffix Service, Adapter, Controller for responsibilities, Prefix I for interfaces, Suffix Middleware for middlewares, Suffix Schema for validation objects</naming_conventions>
    <module_boundaries>Unidirectional dependencies from Domain to Application, Infrastructure, and Interface, Clear separation between business logic and infrastructure, Dependency injection to decouple modules, Separation between API (Fastify) and automation logic (NutJS), Isolated data validation modules, Separation between domain, DTOs, and services, Controllers encapsulate business logic, Routes only register endpoints and delegate to controllers, Isolated error definition and error handling middleware, Isolated configuration module exported for global use, Separation between production code and tests, Mocks isolated in test configuration, Separation between mouse, keyboard, clipboard, and screen operations, Isolated authentication module, Buffer and dispatcher modules for event streaming</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript Style Guide adapted for TypeScript, ESLint Recommended, Prettier</style_guide>
    <linting_rules>ESLint with @typescript-eslint plugin, eslint-config-prettier to disable conflicting rules, Prohibition of explicit any, Strict typing, No unused variables, Async/await required for async operations</linting_rules>
    <formatting>Prettier with default settings, semi: true, singleQuote: true, tabWidth: 2, trailingComma: all, printWidth: 100</formatting>
    <documentation_style>JSDoc for functions and classes, JSDoc for public methods and interfaces, Inline comments in Portuguese for context</documentation_style>
    <type_checking>Strict TypeScript, noImplicitAny, strictNullChecks, Explicit types for parameters and returns</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29.x, Postman Tests (JavaScript), Pytest 7.4</test_framework>
    <test_structure>tests/unit for unit tests, tests/integration for integration tests, **/__tests__/**/*.test.ts, **/tests/**/*.spec.ts, Mocks for external dependencies</test_structure>
    <coverage_requirements>Minimum 80% coverage, branches &gt;= 80%, functions &gt;= 80%, lines &gt;= 80%, statements &gt;= 80%</coverage_requirements>
    <test_patterns>Arrange-Act-Assert (AAA), Given-When-Then for integration tests, Use of mocks for external dependencies, Async tests with fake timers</test_patterns>
    <mocking_approach>Jest mocks and spies, Mocks for MouseService and ScreenService, Mocks for hardware adapters and event dispatchers, Mocks for external services and timers, Mocks for FastifyRequest and FastifyReply, Mocks for clipboardy, Mocks for environment variables</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review mandatory, Passing CI checks, Automated tests passing, Lint and test checks</pr_requirements>
    <ci_cd_pipeline>Linting, Testing, Build, Deployment, Build, test, lint, deploy automated via GitHub Actions</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>cp .env.example .env, npm install, python -m venv venv &amp;&amp; source venv/bin/activate &amp;&amp; pip install -r requirements.txt</setup>
    <install>npm install, yarn install, pip install -r requirements.txt</install>
    <dev>npm run dev, tsc --watch, node --loader esm src/index.js, flask run --reload</dev>
    <test>npm test, npm run test, pytest --cov=ocr_module tests/</test>
    <build>npm run build, npm run build:prod, tsc, docker build -t ocr-service .</build>
    <lint>npm run lint, npx eslint ., eslint . --ext .ts,.tsx, flake8 ocr_module/</lint>
    <format>npm run format, npx prettier --write ., prettier --write ., black ocr_module/</format>
  </commands>
  <security_constraints>
    <authentication_method>API key via HTTP header x-api-key, JWT (JSON Web Token), OAuth2</authentication_method>
    <authorization_rules>Role-based access control for sensitive endpoints, Requests without or with invalid API key are rejected, API key required for all API connections and calls</authorization_rules>
    <sensitive_data>Environment variables for configuration, API keys, Clipboard content must be handled carefully to avoid leaks, User input data, JWT tokens, Buffers of base64 images must be protected, Sensitive configuration files (.env) are ignored in version control</sensitive_data>
    <security_headers>Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security, Cache-Control, CORS, Content-Type: application/json, x-api-key for authentication</security_headers>
    <encryption_requirements>TLS for HTTP communication, AES-256 for data at rest, JWT token encryption, HTTPS recommended for secure transport</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>&lt; 200ms for REST routes, &lt; 100ms for event streaming, Minimum 100ms, maximum 5000ms for actions, Default timeout 5000ms for template waits, Screen capture must be performed in milliseconds to seconds, Error responses must be fast to avoid UX impact, At least 5 events per second for streaming, Test timeout set to 10000ms, Operations should respond in less than 500ms under normal conditions, Low latency expected for clipboard operations, Real-time updates with minimal latency</response_time_limits>
    <optimization_priorities>Speed and responsiveness for automation commands, Memory control to avoid crashes, Fastify server speed and scalability, Reliability and accuracy over raw speed, Smooth movement prioritized over raw speed, Efficient resource usage for responsiveness, Efficient validation to avoid overhead on large payloads, Low latency for real-time event streaming, Efficient logging and buffer management, Performance in production, readability in development</optimization_priorities>
    <caching_strategy>In-memory buffer for event streaming, Configurable TTL for routes, No cache for real-time streaming, Buffer for event replay and loss reduction</caching_strategy>
    <scalability_considerations>Modular architecture for horizontal scalability, Support for multiple SSE connections, Stateless middleware for scalability, Horizontal scaling via multiple Fastify instances, Configurable for different event loads, Efficient management of listeners and SSE connections, Singleton limits direct horizontal scalability; possible future extension</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standard JSON with message and HTTP code, CommandResult with success boolean and optional error string, Centralized error handler middleware format, JSON with fields: success, error, code, and optional details, Zod validation errors with clear messages, HTTP status codes for not found and validation errors</error_format>
    <logging_strategy>Structured logging with pino and pino-pretty, Separate logs for errors (logs/error.log) and output (logs/out.log), Log level configurable via environment variable, Logs stored in /logs, *.log files ignored in version control, Pretty print in development, Logs disabled in tests</logging_strategy>
    <monitoring_tools>PM2 for monitoring and automatic restart, Prometheus, Grafana, EventDispatcher for input events</monitoring_tools>
    <error_recovery>Automatic process restart on memory limit (1G), Error handling via Fastify middleware, Immediate response with status 400 for validation errors, Graceful shutdown to avoid request loss, Retry mechanism for transient failures, Fallbacks for critical routes, Recovery via last-event-id for lost events, Removal of listeners and cleanup on disconnect</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>@nut-tree-fork/nut-js, Fastify, TSyringe, Zod, Node.js, PM2, pino, dotenv, Sharp, Clipboardy, Jest, TypeScript, nanoid, EventSource, OpenCV, Tesseract OCR</critical_dependencies>
    <deprecated_packages>None</deprecated_packages>
    <version_constraints>@nut-tree-fork/nut-js ^4.2.0, fastify ^4.24.0, typescript ^5.3.2, zod &gt;=3.0.0, tsyringe 4.x, pino 8.x, clipboardy &gt;=3.0.0, dotenv &gt;=16.0.0, Jest &gt;=29.x, Node.js &gt;=18</version_constraints>
    <internal_packages>domain/entities, domain/use-cases, application/services, infrastructure/adapters, interface/controllers, schemas, types, config, routes, shared</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Error handling could be more granular, Input validation can be strengthened, Base execute methods not implemented in subclasses, Lack of formal automated tests, Authentication and authorization missing on endpoints, Documentation incomplete for controllers, Test coverage can be expanded for edge and integration cases, Supported key list maintenance, Clipboard content size limit is fixed and may be inflexible, Need to support more typing strategies, Performance improvements for very long texts, Interface is too generic and may lead to inconsistent implementations, Validation of maximum content size not implemented in schema, Missing static typing may hinder maintenance, Routes not implemented, Manual listener management could be improved with abstractions</technical_debt>
    <known_issues>Possible latency in smooth scroll with many steps, Potential overhead in frequent base64 decoding, Risk of exceptions if execute is not overridden, Search and wait functionalities not implemented, Potential resource leak in SSE streams if connections are not closed properly, Possible latency in streaming under high load, Dependency on local API availability, Compatibility limited to environments with ES2022 and decorators support, No explicit validation of environment variable values, Clipboardy may show inconsistencies on some OS, Delay accumulation may impact UX for large texts, Possible acceptance of payloads larger than 1MB, Performance limitations in screen capture and recognition operations, Possible event loss when exceeding rate limit, Direct dependency on environment variables may cause failures if not configured correctly, Possible overhead with many simultaneous SSE clients, Insecure storage of API key, Unsecured connection (HTTP)</known_issues>
    <performance_bottlenecks>Single instance limitation may impact performance under high load, Potential latency in UI automation depending on environment, Async loops in scroll may impact responsiveness, Synchronous buffer operations may impact performance, Sequential execution may limit throughput, Delays in loops may impact performance in long movements, Large image processing may impact memory and CPU, Continuous streaming may impact performance under high load, Fixed delays may impact total execution time, Image preprocessing step is CPU intensive, Interpolated movements may be costly at high frequency, Smooth scroll may generate multiple calls, impacting performance on limited devices, Intensive use of await in sequential loops, Incorrect configurations may impact typing performance, Screen capture and image recognition operations may be costly, Synchronous processing of listeners may impact performance, Buffer and dispatcher may become bottlenecks at scale</performance_bottlenecks>
    <migration_status>Initial project, no migrations in progress, Migration to Fastify 4 completed, Stable, no migrations ongoing</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Code quality, Test coverage, Security and validation, Type and limit validation, Naming consistency, Error handling validation, Dependency injection consistency, Coordinate validation, Clear separation of responsibilities, Strict typing, Clear documentation, No unjustified any usage, Schema validation, error handling, correct use of dependency injection, Test coverage for all error cases, Correct schema validation, Clear and simple schemas, Performance of async processing, Correct buffer usage, Logging clarity, Error handling completeness</code_review_focus>
    <documentation_requirements>Clear documentation via JSDoc and README, JSDoc for public methods and interfaces, Document environment variables and default values, Clear documentation for each command and its parameters, JSDoc for all schemas and types, Clear documentation for endpoints and data contracts, JSDoc for all public methods, Clear documentation for configuration values and limits, JSDoc for all interfaces and public functions, Clear documentation for each implemented service</documentation_requirements>
    <communication_style>Clear and objective comments, Use of PRs for discussions, Technical and objective comments, PRs with detailed description, Clear comments in Portuguese for context, Use of technical terms in English for rules, Objective comments and use of JSDoc, Clear and informative comments, no excessive verbosity</communication_style>
    <decision_log>Adoption of Fastify for performance, Use of tsyringe for DI, Validation with Zod, Separation between mouse and screen services, Use of DI for testability and modularity, Use of NutJS for hardware abstraction, Use of dotenv for configuration, Command pattern for modularity and extensibility, Factory Method for action creation, Use of interfaces for data contracts, Immediate stop on failures for safety, Use of Clean Architecture and SSE for real-time streaming, Centralized error handling in middleware, Declarative validation with Zod, 1MB limit for clipboard content, Strategy pattern for typing flexibility, EventDispatcher for event decoupling, Immutable configuration for safety and predictability, Adapter pattern for hardware abstraction, Strict coordinate validation, Strict async/await and explicit types for quality, Jest for testing, Global logger mock to avoid log pollution in tests, Linear interpolation for smooth movement, Singleton pattern for unique instance, Configurable rate limiting for flow control, SSE for unidirectional streaming, Buffer for replay of lost events, Local persistence for API key, Base64 image decoding and PNG header validation</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>REST, RESTful API, REST with HTTP POST and GET endpoints, REST with SSE endpoint for streaming</api_style>
    <versioning_strategy>URL versioning (/api/v1/), Semantic versioning via package.json, URI prefix /api/v1</versioning_strategy>
    <response_formats>JSON, { success: boolean, error?: string, data?: any }, Base64 encoded images, CommandResult with success, data, and error, application/json, JSON for REST endpoints, text/event-stream for SSE</response_formats>
    <rate_limiting>Configurable rate limiting per route, Default limit of 5000 events per second, Configurable maxRate in inputEventsConfig</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development (http://localhost:3000), production (configurable via .env), staging, test</environments>
    <deployment_method>PM2 process manager, Docker container, CI/CD pipeline, Node.js runtime</deployment_method>
    <environment_variables>NODE_ENV, PORT, HOST, LOG_LEVEL, MOUSE_SPEED, SCREEN_CONFIDENCE, API_KEY, API_URL, SCREEN_ADAPTER_IMPLEMENTATION, KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, KEYBOARD_MAX_DELAY, KEYBOARD_BATCH_SIZE, INPUT_EVENT_BUFFER, INPUT_EVENT_RATE, INPUT_EVENT_HEARTBEAT, INPUT_EVENT_MAX_AGE, INPUT_EVENT_DEBUG, OCR_API_KEY, DATABASE_URL, REDIS_URL</environment_variables>
    <infrastructure_constraints>Accessibility permissions on macOS, DISPLAY variable on Linux, Memory limit set to 1G for automatic restart, Requires Node.js &gt;=18, Compatible with Linux, Windows, and macOS, Requires access to desktop for automation, Requires access to OS APIs for input and clipboard, Requires local API running on port 3000, Persistent SSE connections required, Resource limits depend on execution environment</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/application/services/mouse.service.ts</path>
        <name>mouse.service.ts</name>
        <summary>O código implementa um serviço de controle de mouse que abstrai operações como movimento, clique, arrasto e scroll, garantindo validação de coordenadas e suporte a movimentos suaves (smooth). Ele integra um adaptador de mouse para executar ações físicas e um despachante de eventos para emitir eventos relacionados a interações do mouse, promovendo rastreabilidade e extensibilidade. O serviço é projetado para ser injetável e modular, facilitando testes e substituição de implementações, além de aplicar logging detalhado para monitoramento e tratamento de erros robusto para garantir confiabilidade operacional.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Automation Service, Controle e automação de ações do mouse</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de UI, Testes automatizados, Controle de dispositivos de entrada</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa de coordenadas para evitar ações fora da tela, Emissão correta de eventos para sincronização com outros módulos</values>
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
            <values>@nut-tree-fork/nut-js (screen API)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Service Layer, Event Dispatcher</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/entities - entidades do domínio, dto - objetos de transferência de dados, services - lógica de negócio e integração, types - definições de tipos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e interfaces, camelCase para métodos e variáveis, Sufixo Service para classes de serviço</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio, DTOs e serviços, Dependência unidirecional do serviço para adaptadores e eventos</values>
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
            <values>Testes localizados em __tests__ próximos aos serviços, Testes unitários para MouseService e mocks para IMouseAdapter</values>
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
            <values>Mocks para adaptadores de mouse e despachantes de eventos</values>
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
            <values>Build, Testes unitários, Lint, Deploy automático em staging</values>
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
            <values>Não aplicável (serviço local)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
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
            <values>Movimento e clique com duração configurável, padrão 1000ms</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Suavidade do movimento priorizada sobre velocidade bruta</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Projeto para uso local, sem escalabilidade distribuída</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados com mensagens claras sobre coordenadas inválidas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de pino com níveis debug, info e error para rastreamento detalhado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado, mas logging estruturado facilita integração</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Propagação de erros para camadas superiores para tratamento</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>IMouseAdapter, EventDispatcher, @nut-tree-fork/nut-js</values>
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
            <values>Nenhum identificado explicitamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível latência em scroll suave com muitos passos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Loops assíncronos em scroll podem impactar responsividade</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de coordenadas, Tratamento de erros, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara em JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos, sem excesso</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de DI para facilitar testes e modularidade</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (API interna de serviço)</values>
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
            <values>Desenvolvimento, Staging, Produção</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipeline automatizado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>LOG_LEVEL, NODE_ENV</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Execução local com acesso a dispositivos de entrada</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/screen.service.ts</path>
        <name>screen.service.ts</name>
        <summary>Este arquivo implementa um serviço de captura e busca de imagens na tela, utilizando injeção de dependência para abstrair a interface de captura e reconhecimento visual. O ScreenService oferece métodos para localizar templates gráficos em regiões específicas da tela, capturar imagens em formatos base64 e aguardar a aparição de um template dentro de um timeout configurável. A classe manipula buffers de imagens codificadas em base64, delegando a lógica de reconhecimento para um adaptador externo, enquanto registra eventos e erros para monitoramento. Essa abordagem modular e orientada a interfaces permite integração flexível com diferentes implementações de captura de tela, suportando automação visual e testes baseados em reconhecimento de padrões visuais.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Screen Automation Service, Serviço de automação visual para captura e reconhecimento de tela</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Reconhecimento visual, Automação de interface gráfica</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Precisão mínima de confiança para reconhecimento, Timeouts para espera de templates, Integridade dos buffers de imagem</values>
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
            <values>Nenhum serviço externo direto, mas integração com adaptadores de captura de tela</values>
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
            <values>dto para objetos de transferência de dados, domain para entidades de negócio, services para lógica de aplicação</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e interfaces, camelCase para métodos e variáveis, Prefixo I para interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre DTOs, entidades de domínio e serviços, Dependência invertida via injeção</values>
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
            <values>Prettier configurado para TypeScript</values>
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
            <values>Testes localizados em pasta __tests__ ao lado dos serviços</values>
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
            <values>Mock de adaptadores via tsyringe e jest.mock</values>
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
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Buffers de imagem base64 devem ser tratados com cuidado para evitar vazamento</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Nenhuma criptografia aplicada internamente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Timeout padrão de 5000ms para espera de template</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre precisão de reconhecimento e tempo de resposta</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Nenhuma estratégia de cache implementada</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Arquitetura modular permite substituição do adaptador para escalabilidade</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados diretamente com logging detalhado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso do pino com níveis debug, info e error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Propagação de erros para camadas superiores</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe para DI, pino para logging</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Nenhum identificado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript 5.x, tsyringe 4.x, pino 8.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../dto/automation-request.dto.js, ../../domain/entities/screen-region.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Tratamento de erros pode ser mais granular, Validação de inputs pode ser reforçada</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível overhead na decodificação base64 em chamadas frequentes</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Operações síncronas de buffer podem impactar performance</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na separação de responsabilidades, Cobertura de testes, Tratamento de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara dos métodos públicos com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de DI para facilitar testes e substituição de adaptadores</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável diretamente, serviço interno</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Base64 encoded images, Arrays de MatchResult</values>
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
            <values>Docker container</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>LOG_LEVEL, SCREEN_ADAPTER_IMPLEMENTATION</values>
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
        <summary>Este arquivo é responsável pela configuração e registro das dependências essenciais para um sistema de automação de input e controle de dispositivos, utilizando injeção de dependência via o container do tsyringe. Ele integra serviços que manipulam mouse, teclado, tela e clipboard, além de orquestrar casos de uso para execução de automações e gerenciamento de eventos. A configuração promove a modularidade e a escalabilidade do sistema, registrando adaptadores específicos para interação com hardware via NutJS, e garantindo que componentes como EventDispatcher e EventBuffer sejam singletons para manter estado compartilhado consistente. Assim, o arquivo habilita a coordenação eficiente entre camadas de aplicação, domínio e infraestrutura, facilitando a extensão e manutenção do sistema de automação.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation Input System, Sistema para automação de controle de dispositivos de input</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, Input Devices, Hardware Abstraction, NutJS</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir execução correta e sequencial das automações, Manter estado consistente dos eventos, Isolar dependências de hardware via adapters</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe 4.x, NutJS (versão compatível)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>NutJS hardware interaction libraries</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Singleton, Adapter, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - lógica de negócio e serviços, domain/use-cases - regras de negócio e casos de uso, infrastructure/adapters - adaptação para hardware externo, interface/controllers - controle de entrada e eventos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes, camelCase para variáveis e funções, sufixos Service, Adapter, Controller para responsabilidades</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio, aplicação, infraestrutura e interface, Dependências unidirecionais do domínio para infraestrutura</values>
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
            <values>tests localizados em pastas __tests__ correspondentes a cada módulo</values>
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
            <values>Mocks para adaptadores de hardware e serviços externos</values>
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
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na execução de automações, Uso eficiente de recursos para manter responsividade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Modularidade para extensão de novos adaptadores e serviços</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, NutJS adapters</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0, tsyringe compatível com reflect-metadata</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, domain/use-cases, infrastructure/adapters, interface/controllers</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência na injeção de dependências, Uso correto de singletons, Separação clara de responsabilidades</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar serviços e adaptadores com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e claros, PRs com descrição detalhada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção do tsyringe para DI, Uso de NutJS para abstração de hardware</values>
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
        </properties>
      </file>
      <file>
        <path>src/index.ts</path>
        <name>index.ts</name>
        <summary>Este arquivo implementa um servidor HTTP utilizando o framework Fastify, configurado para atuar como backend de uma aplicação que expõe rotas de automação via API RESTful. Ele inicializa dependências via injeção, registra rotas com prefixo versionado, e define um endpoint de health check para monitoramento do estado do serviço. O servidor é configurado para logging customizado conforme ambiente, tratamento centralizado de erros e suporta shutdown gracioso ao receber sinais do sistema, garantindo estabilidade e controle operacional. A arquitetura modular permite fácil extensão e manutenção, integrando middleware, configuração e rotas de forma desacoplada, promovendo escalabilidade e robustez na entrega de serviços HTTP.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation API Server</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, API REST, Backend</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Manter disponibilidade do servidor, Garantir integridade das respostas de API, Tratamento consistente de erros</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, pino 8.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Middleware, Modular API Design</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config - configurações e injeção de dependências, routes - definição das rotas da API, interface/middleware - middlewares para tratamento de erros, src - código fonte principal</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e funções, PascalCase para classes, kebab-case para arquivos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre configuração, rotas, middleware e inicialização do servidor</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, sem regras explícitas no código</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão, uso de pino-pretty para logs em dev</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>Comentários inline e JSDoc para funções públicas</values>
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
            <values>npm run dev</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Centralized error handler middleware format</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Pino logger com níveis configuráveis por ambiente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Graceful shutdown para evitar perda de requisições</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, pino, reflect-metadata</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./routes/automation.routes.js, ./interface/middleware/error-handler.middleware.js, ./config/dependency-injection.js, ./config/environment.js</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>URI prefix /api/v1</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>port, host, nodeEnv, logLevel</values>
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
        <path>src/infrastructure/adapters/nutjs/nutjs-screen.adapter.ts</path>
        <name>nutjs-screen.adapter.ts</name>
        <summary>O arquivo implementa um adaptador de tela utilizando a biblioteca NutJS para captura de imagens da tela, com foco em capturar regiões específicas ou a tela inteira e converter os dados brutos em imagens PNG otimizadas via Sharp. Ele oferece funcionalidades básicas de captura de tela com logging detalhado para monitoramento e diagnóstico, enquanto métodos para busca de templates e espera por elementos na tela estão declarados mas ainda não implementados. A classe é projetada para integração em um sistema maior, atuando como um serviço injetável que abstrai a complexidade da captura e manipulação de imagens da tela, facilitando a automação e análise visual em aplicações que dependem de reconhecimento e manipulação de conteúdo visual na interface do usuário.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>NutJS Screen Capture Adapter, Serviço de captura e manipulação de imagens da tela</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de UI, Reconhecimento visual, Testes automatizados</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Desenvolvimento inicial, Implementação parcial com funcionalidades pendentes</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Captura precisa da tela com confiança configurável, Integridade dos dados de imagem capturados</values>
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
            <values>NutJS API, Sharp image processing</values>
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
            <values>application/services - serviços de aplicação e adaptadores, domain/entities - entidades de domínio, config - configurações de ambiente</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, PascalCase para interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio, aplicação e infraestrutura, Interfaces definem contratos entre camadas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript ESLint Recommended</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>eslint-config-standard, no-explicit-any, strict typing</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para tipos e métodos públicos</values>
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
            <values>tests/unit para testes unitários, mocks para dependências externas</values>
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
            <values>Mock de serviços externos e interfaces</values>
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
            <values>Code review obrigatório, Checks de lint e testes</values>
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
            <values>Captura de tela deve ser realizada em tempo aceitável para automação (milissegundos a segundos)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre compressão de imagem e velocidade de processamento</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados com objetos Error padrão e logging estruturado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso do pino para logging estruturado com níveis debug, info, error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Erro na captura propaga exceção para camada superior</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@nut-tree-fork/nut-js, sharp, pino, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, domain/entities, config</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Implementação incompleta dos métodos find e waitFor</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Funcionalidades de busca e espera não implementadas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Processamento de imagens grandes pode impactar memória e CPU</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza no logging, Tratamento de erros, Uso correto de async/await</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para métodos públicos e interfaces</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e uso de emojis para facilitar leitura</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de NutJS para captura de tela por sua precisão e suporte a regiões</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Buffer PNG para imagens capturadas</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, Serverless</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>screenConfidence</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/middleware/error-handler.middleware.ts</path>
        <name>error-handler.middleware.ts</name>
        <summary>Este arquivo implementa um middleware de tratamento de erros para aplicações construídas com Fastify, focado em capturar, categorizar e responder adequadamente a diferentes tipos de erros que podem ocorrer durante o processamento de requisições HTTP. Ele define classes customizadas para erros de domínio, como NotFoundError, UnauthorizedError e LimitExceededError, facilitando a padronização das respostas de erro. O handler centraliza a lógica para identificar erros de validação (Zod e Fastify), erros de domínio, erros HTTP com status code específico e erros genéricos, garantindo respostas estruturadas e consistentes, além de realizar logging detalhado para facilitar o monitoramento e debugging, especialmente em ambiente de desenvolvimento.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Fastify API Error Handling Middleware</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Backend API, Error Handling, HTTP, Validation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Erros devem ser tratados e retornados com status HTTP apropriado, Mensagens de erro devem ser claras e padronizadas, Logs de erro devem conter contexto suficiente para debugging, Não expor stack trace em ambiente de produção</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.x</values>
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
            <values>Middleware Pattern, Custom Error Classes</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/errors - classes de erro customizadas, src/handlers - middlewares e handlers globais</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes PascalCase (DomainError, NotFoundError), Funções camelCase (errorHandler)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre definição de erros e middleware de tratamento, Dependência unidirecional do handler para as classes de erro</values>
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
            <values>JSDoc para classes e funções</values>
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
            <values>tests/unit/errors, tests/integration/handlers</values>
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
            <values>Mocks para FastifyRequest e FastifyReply</values>
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
            <values>JWT (implícito no contexto Fastify)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Erros Unauthorized e Forbidden tratados explicitamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Stack trace oculto em produção</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Respostas de erro devem ser rápidas para não impactar UX</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência em tratamento de erros</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Middleware deve ser stateless e escalável</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>JSON com campos success, error, code e detalhes opcionais</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logging estruturado com contexto da requisição, Stack trace somente em desenvolvimento</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Respostas padronizadas para facilitar tratamento no cliente</values>
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
            <values>Manutenção do mapeamento de códigos HTTP</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência no tratamento de erros, Cobertura de testes para todos os casos de erro</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para classes de erro e handler</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de classes customizadas para erros de domínio, Centralização do tratamento de erros em middleware</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON padronizado com campos success, error, code e detalhes</values>
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
        <path>src/application/services/keyboard.service.ts</path>
        <name>keyboard.service.ts</name>
        <summary>Este arquivo implementa um serviço de automação de teclado que permite a digitação programada de texto com controle refinado de timing, suportando diferentes estratégias de entrada: instantânea, por caractere com delay individual e com tempo total distribuído uniformemente. O serviço abstrai a interação com o hardware via um adaptador de teclado, garantindo flexibilidade e testabilidade, além de emitir eventos de tecla pressionada para integração com sistemas de monitoramento ou logging. Ele valida e sanitiza o texto de entrada para evitar caracteres de controle perigosos, gerencia erros de forma robusta e suporta operações adicionais como pressionar teclas isoladas e combinações de teclas, respeitando limites de segurança e performance. A arquitetura modular e orientada a interfaces facilita a extensão e manutenção, enquanto o uso de injeção de dependências promove desacoplamento e integração com outros componentes do sistema.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Keyboard Automation Service, Serviço de automação de teclado com controle de timing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Automação de interface, Input simulation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Sanitização rigorosa do texto para evitar caracteres de controle, Limite máximo de 10000 caracteres para digitação, Delay máximo de 300000ms para estratégias de timing</values>
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
            <values>Strategy, Dependency Injection, Service Layer</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/interfaces (interfaces de domínio), domain/entities (entidades de domínio), services (implementações de serviços), shared (componentes compartilhados como EventDispatcher)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Interfaces prefixadas com &apos;I&apos;, Classes em PascalCase, Métodos em camelCase, Constantes e enums em UPPER_SNAKE_CASE</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio e infraestrutura, Serviços dependem de interfaces e injeção de dependência, Eventos desacoplados via EventDispatcher</values>
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
            <values>Testes localizados em __tests__ próximos aos serviços, Testes unitários para estratégias e KeyboardService</values>
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
            <values>Revisão obrigatória, Build e testes passando</values>
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
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável (serviço local)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável (serviço local)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Texto digitado deve ser sanitizado para evitar caracteres de controle</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Delay máximo configurável até 300000ms (5 minutos)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre velocidade de digitação e emissão de eventos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Processamento em lotes para textos longos para evitar bloqueios</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Objeto com success: boolean, data ou error string</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Emissão de eventos via EventDispatcher para monitoramento</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>EventDispatcher para eventos de tecla</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de exceções com mensagens claras e fallback para falha controlada</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>IKeyboardAdapter, EventDispatcher, @nut-tree-fork/nut-js</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Timing value máximo 300000ms, Texto máximo 10000 caracteres</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>domain/interfaces, domain/entities, services, shared</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Necessidade de suportar mais estratégias de digitação, Melhorar performance para textos muito longos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Delay acumulado pode impactar UX em textos grandes</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Uso intensivo de await em loops sequenciais</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de sanitização, Cobertura de testes das estratégias, Tratamento de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para todos os métodos públicos e interfaces</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, foco em comportamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Escolha do padrão Strategy para flexibilidade de digitação, Uso de EventDispatcher para desacoplamento de eventos</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (serviço local)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Objeto JSON com success, data ou error</values>
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
            <values>Não aplicável diretamente para este serviço</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de acesso a APIs de input do sistema operacional</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/event-buffer.service.ts</path>
        <name>event-buffer.service.ts</name>
        <summary>O código implementa um serviço de buffer circular para armazenamento temporário de eventos do tipo InputEvent, permitindo o replay eficiente de eventos após reconexões de clientes SSE (Server-Sent Events). Ele mantém um histórico limitado e gerenciável de eventos, suportando operações como adição, recuperação por ID, intervalo de tempo, limpeza e remoção de eventos antigos, garantindo a integridade e atualização contínua do buffer. A classe utiliza injeção de dependência para facilitar testes e integração, além de registrar logs para monitoramento das operações, habilitando a continuidade da experiência do usuário em sistemas reativos e em tempo real.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>EventBuffer, Serviço de buffer circular para eventos SSE</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Realtime Systems, Server-Sent Events, Event Replay</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Manter ordem cronológica dos eventos, Garantir replay correto após reconexão, Limitar tamanho do buffer para evitar estouro de memória</values>
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
            <values>Circular Buffer, Dependency Injection</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/config - configurações gerais, src/types - definições de tipos, src/services - serviços de negócio</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, PascalCase para interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, serviços e configuração, Uso de injeção para dependências</values>
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
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para dependências externas, Fixtures para dados de eventos</values>
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
            <values>Build, Testes, Lint, Deploy automático em staging</values>
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
            <values>Memória e velocidade equilibradas via buffer circular</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Buffer circular com tamanho configurável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Limitação do buffer para evitar uso excessivo de memória</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs informativos e de debug para operações do buffer</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, logger interno, InputEvent type</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../types/input-event.types.js, ../../config/logger.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Uso incorreto de &apos;array&apos; em vez de &apos;Array&apos; no construtor do buffer</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Verificação de uso correto do buffer circular, Confirmação de logging adequado, Validação de tipagem e tratamento de erros</values>
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
            <values>Escolha do buffer circular para balancear memória e performance, Uso de tsyringe para injeção de dependência</values>
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
            <values>INPUT_EVENT_BUFFER</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/event-dispatcher.service.ts</path>
        <name>event-dispatcher.service.ts</name>
        <summary>O código implementa um serviço singleton chamado EventDispatcher que gerencia o despacho e distribuição de eventos de input, especificamente eventos de mouse e teclado, para múltiplos ouvintes registrados. Utilizando o padrão Observer, ele enfileira eventos recebidos, aplica um rate limiter configurável para controlar a taxa de eventos processados por segundo, filtra teclas não imprimíveis e distribui os eventos de forma assíncrona para todos os listeners ativos. O serviço mantém estado interno para controle de listeners, fila de eventos e estatísticas, garantindo processamento eficiente e seguro dos eventos de input em tempo real, com logs para monitoramento e tratamento de erros durante a notificação dos ouvintes.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Event Dispatcher, Serviço de gerenciamento e distribuição de eventos de input</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Sistemas interativos, Input handling, Eventos de mouse e teclado</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Rate limiting para evitar sobrecarga, Distribuição confiável de eventos para todos os listeners, Filtragem de eventos inválidos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>tsyringe 4.7.0</values>
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
            <values>config/ - configurações de ambiente e logger, types/ - definições de tipos para eventos, services/ - implementação do dispatcher</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, PascalCase para interfaces e tipos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, configuração e lógica de serviço, Dependência unidirecional do dispatcher para config e types</values>
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
            <values>Mocks para listeners e eventos, Fixtures para eventos de input</values>
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
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável (serviço interno)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de acesso não implementado no dispatcher</values>
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
            <values>Velocidade de despacho e controle de taxa para evitar sobrecarga</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Singleton limita escalabilidade horizontal direta; possível extensão futura para múltiplas instâncias</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Logs estruturados via logger configurado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Níveis debug, warn e error para monitoramento e diagnóstico</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado, mas logs integrados podem ser coletados externamente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de exceções isolado para cada listener para evitar falha global</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, nanoid, logger interno</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0, tsyringe compatível com TS 5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../types/input-event.types.js, ../../config/environment.js, ../../config/logger.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Ausência de persistência de eventos, Limitação do singleton para escalabilidade</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível perda de eventos ao exceder rate limit</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Processamento síncrono dos listeners pode impactar performance</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, Performance do processamento assíncrono, Conformidade com padrões de design</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos, sem redundância</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do padrão Singleton para garantir instância única, Rate limiting configurável para controle de fluxo</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Interno, baseado em eventos e listeners</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Eventos do tipo InputEvent com IDs únicos e timestamps</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Configuração via variável de ambiente INPUT_EVENT_RATE, Limite padrão de 5000 eventos por segundo</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Container Docker, Deploy em servidores Node.js</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>INPUT_EVENT_RATE</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação de instância única por design (singleton)</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/input-events.config.ts</path>
        <name>input-events.config.ts</name>
        <summary>Este arquivo configura e valida parâmetros essenciais para o sistema de eventos de input, garantindo que o buffer, taxa e tempo de vida dos eventos estejam dentro de limites seguros e operacionais. Ele importa variáveis de ambiente para definir configurações como bufferSize, heartbeatMs, maxRate, maxEventAge e debug, aplicando validações rigorosas para evitar configurações inválidas que possam comprometer a estabilidade do sistema. Ao validar automaticamente na inicialização, o código assegura que o sistema de input event processing opere com parâmetros consistentes, prevenindo falhas e facilitando o monitoramento e ajuste dinâmico via variáveis de ambiente.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Events Configuration System, Gerenciamento e validação de configurações para eventos de input</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Sistemas de eventos em tempo real, Input event processing, Configuração e monitoramento</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Buffer size deve estar entre 1 e 100000, Heartbeat interval entre 1000 e 300000 ms, Taxa máxima de eventos entre 1 e 50000 eventos/s, Idade máxima do evento entre 1000 e 3600000 ms</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0, Node.js 18+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>dotenv 16.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Variáveis de ambiente do sistema operacional</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Singleton, Defensive Programming</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config/ - arquivos de configuração e validação, src/ - código fonte principal</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e funções, PascalCase para interfaces e tipos, UPPER_SNAKE_CASE para variáveis de ambiente</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Configuração isolada em módulo próprio, Validação executada na inicialização do módulo</values>
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
            <values>JSDoc para documentação de funções e interfaces</values>
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
            <values>tests/config/ para testes de configuração</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 90% para módulos críticos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de variáveis de ambiente via jest-mock</values>
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
            <values>Lint, Testes, Build e Deploy automatizados</values>
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
            <values>Variáveis de ambiente devem ser protegidas</values>
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
            <values>Configurações devem garantir baixa latência no processamento de eventos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre throughput e uso de memória</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Buffer de eventos com tamanho configurável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Configurações permitem ajuste para diferentes cargas de eventos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados com mensagens claras e específicas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs de erro no console com mensagem detalhada</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Processo encerra em caso de configuração inválida para evitar estado inconsistente</values>
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
            <values>Validação simples pode ser expandida para incluir logs estruturados</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência direta de variáveis de ambiente pode causar falhas se não configuradas corretamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum identificado no escopo atual</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de limites e tratamento de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para interfaces e funções</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de configuração imutável para evitar alterações em runtime</values>
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
            <values>Configuração de maxRate para limitar eventos por segundo</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker e CI/CD pipelines</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>INPUT_EVENT_BUFFER, INPUT_EVENT_HEARTBEAT, INPUT_EVENT_RATE, INPUT_EVENT_MAX_AGE, INPUT_EVENT_DEBUG</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limites de memória e CPU para processamento de eventos</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/controllers/input-events.controller.ts</path>
        <name>input-events.controller.ts</name>
        <summary>Este arquivo implementa um controller para streaming de eventos de input do usuário via Server-Sent Events (SSE), permitindo a transmissão em tempo real de cliques do mouse e teclas digitadas. Ele gerencia conexões persistentes com clientes, garantindo a entrega de eventos perdidos através de um buffer e mantendo a conexão ativa com heartbeats periódicos. Além disso, oferece endpoints para monitoramento das estatísticas do sistema de eventos, limpeza e poda do buffer, suportando a manutenção e controle do fluxo de eventos em um ambiente escalável e resiliente, integrando-se com serviços de dispatcher e buffer para garantir consistência e performance na transmissão dos dados.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Events Streaming Service</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Real-time event streaming, User input tracking, SSE communication</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir entrega confiável de eventos, Manter conexões SSE ativas com heartbeats, Evitar perda de eventos durante reconexões</values>
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
            <values>Nenhum serviço externo explícito, integrações internas via EventDispatcher e EventBuffer</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, Observer, Service Layer, MVC (Controller)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>controllers/ - Controllers REST e SSE, application/services/ - Serviços de negócio como dispatcher e buffer, config/ - Configurações e logger, types/ - Definições de tipos TypeScript</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e interfaces, camelCase para métodos e variáveis, Sufixo Controller para controllers</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Controllers dependem de serviços via DI, Serviços isolados para lógica de eventos, Configurações centralizadas em config/</values>
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
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/unit/controllers, tests/integration/services</values>
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
            <values>Mocks para EventDispatcher e EventBuffer</values>
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
            <values>Não especificado no código (possível autenticação externa)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não implementado explicitamente neste controller</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Eventos de input do usuário, tratados como dados não sensíveis</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Cache-Control: no-cache, Connection: keep-alive, X-Accel-Buffering: no</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Recomendado uso de HTTPS para SSE</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Baixa latência para eventos em tempo real</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade e escalabilidade para múltiplos clientes SSE</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Buffer de eventos para replay e redução de perda</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Gerenciamento eficiente de listeners e conexões SSE</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Logs via logger, respostas JSON com success flag</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Níveis info, debug e error via logger configurado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado, presumivelmente externo</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Remoção de listeners e limpeza de intervalos em desconexão</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>EventDispatcher, EventBuffer, inputEventsConfig, logger</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify &gt;=4.x, tsyringe &gt;=4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../application/services, ../../config, ../../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Gerenciamento manual de listeners pode ser melhorado com abstrações</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível overhead com muitos clientes SSE simultâneos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Buffer e dispatcher podem se tornar gargalos em alta escala</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento detectada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Manutenção da injeção de dependências, Tratamento correto de conexões SSE, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação JSDoc para todos os métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, uso de português para contexto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de SSE para streaming unidirecional, Buffer para replay de eventos perdidos</values>
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
            <values>JSON para endpoints REST, texto SSE para streaming</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Configuração de maxRate no inputEventsConfig</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker e Kubernetes presumidos</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Configurações externas via inputEventsConfig</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de suporte a conexões persistentes SSE</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/routes/input-events.routes.ts</path>
        <name>input-events.routes.ts</name>
        <summary>Este arquivo implementa um conjunto de rotas RESTful para gerenciamento e streaming de eventos de input em tempo real utilizando Fastify. Ele oferece endpoints para streaming via Server-Sent Events (SSE), consulta de estatísticas do sistema de eventos, limpeza e poda do buffer de eventos antigos, garantindo controle eficiente do fluxo e armazenamento dos eventos. A arquitetura modularizada com injeção de dependência permite desacoplamento entre a camada de roteamento e a lógica de negócio, facilitando manutenção e escalabilidade. O uso de schemas JSON para validação de entrada e resposta assegura a integridade dos dados trafegados, enquanto o foco em eventos de input (mouse e teclado) habilita aplicações que dependem de monitoramento e análise em tempo real de interações do usuário.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Events Streaming Service</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Real-time event streaming, User input monitoring, SSE</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir entrega em tempo real dos eventos via SSE, Manter integridade e consistência do buffer de eventos, Respeitar limites de idade máxima para eventos armazenados</values>
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
            <subProperty>external_services</subProperty>
            <values>Dependency Injection Container (custom)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Dependency Injection, MVC (Controller)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config: configurações e injeção de dependências, interface/controllers: controladores da aplicação, routes: definição das rotas HTTP</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e controladores, kebab-case para rotas, PascalCase para schemas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre rotas e lógica de negócio via controllers, Uso de container para resolver dependências</values>
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
            <values>JSDoc para documentação de funções e schemas</values>
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
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocking de dependências via Jest mocks</values>
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
            <values>Não especificado no código (possível autenticação externa)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não detalhado, presumivelmente controle externo</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Baixa latência para streaming SSE</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade e eficiência no streaming e gerenciamento do buffer</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Buffer interno para eventos com controle de idade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a múltiplos listeners SSE simultâneos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Formato padrão com success, message, data e error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não detalhado no código fornecido</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Recuperação via last-event-id para eventos perdidos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Fastify, Dependency Injection Container, InputEventsController</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify versão 4.x recomendada</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../config/dependency-injection.js, ../interface/controllers/input-events.controller.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Nenhum identificado explicitamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Nenhum conhecido explicitamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Potencial gargalo no buffer se não for gerenciado adequadamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de schemas, tratamento de erros, performance do streaming</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para rotas e schemas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de SSE para streaming em tempo real, Separação via controllers e DI</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST com endpoints SSE</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON para respostas padrão, text/event-stream para SSE</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, Kubernetes (presumido)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de suporte a conexões SSE persistentes</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/types/input-event.types.ts</path>
        <name>input-event.types.ts</name>
        <summary>Este arquivo define tipos TypeScript e interfaces para modelar eventos de input do usuário, especificamente eventos de mouse e teclado, transmitidos via Server-Sent Events (SSE). Ele estrutura os dados de eventos com propriedades essenciais como identificador único, timestamp e coordenadas do cursor, permitindo a captura precisa da interação do usuário. Além disso, especifica contratos para publicadores e ouvintes de eventos, facilitando a emissão e o recebimento desses eventos em sistemas reativos ou distribuídos. O código promove a padronização e tipagem rigorosa para garantir integridade e interoperabilidade dos dados de input, habilitando a construção de sistemas que monitoram e respondem a interações em tempo real com alta fidelidade e escalabilidade.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Input Event Tracking System</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>User Interaction Monitoring, Real-time Event Streaming, SSE</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>MVP</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir integridade e ordem dos eventos, Timestamp correto para sincronização, Identificação única de eventos</values>
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
            <values>Observer, Type Discrimination</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - definição de tipos e interfaces, src/events - lógica de publicação e escuta de eventos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para tipos e interfaces, verbos para métodos (dispatch, onEvent)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, publicadores e ouvintes, Interfaces para desacoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript ESLint Recommended</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>@typescript-eslint/no-explicit-any, strict typing enforced</values>
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
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Server-Sent Events (SSE)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>SSE</values>
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
Comando original: Bem, existe um endpoint chamado Automation Execute, que sinceramente eu não pedi para criar. Então, você pode removê-lo e também todo o código relacionado a ele, certo?

Agora, o que eu quero é um endpoint, algo como um Recorder endpoint, que vai funcionar no modo streaming, parecido com o Stream Mouse Position que já implementamos. Mas esse novo endpoint de streaming, o que ele vai fazer? Enquanto a conexão do streaming estiver aberta, esse endpoint de recorder vai capturar, toda vez que o mouse clicar, a posição XY do mouse, qual botão foi clicado (esquerdo, direito ou do meio) e o timestamp do clique. Além disso, ele faz um print da tela nesse momento. Todos esses dados devem ser retornados.

Também deve ser retornado quando a pessoa apertar uma tecla do teclado. No caso do teclado, deve haver um evento para soltar a tecla, indicando qual tecla foi pressionada ou solta, e o timestamp da ação. Ou seja, quando a tecla for pressionada, registra um timestamp; quando for solta, registra outro timestamp.

Um detalhe importante: para o mouse, o clique deve registrar o timestamp tanto do pressionar quanto do soltar, para todos os botões (esquerdo, direito ou do meio). Porém, o print da tela só deve ser feito na ação de pressionar o clique, não ao soltar. Esse print deve usar a tecnologia baseada no nosso endpoint de Capture Screen, que você pode encontrar no código. O valor deve ser retornado em PNG por esse novo stream que estamos criando.

Outro ponto: se a pessoa fizer um drag (clicar e arrastar), enquanto o botão do mouse estiver pressionado, a posição XY do mouse deve ser retornada continuamente junto com a informação de qual botão está sendo pressionado (esquerdo, direito ou do meio). Normalmente, esse stream não retorna a posição do mouse o tempo todo, apenas quando houver clique, arrasto ou ao soltar o clique.

Esse é o novo endpoint que quero que você crie.

Último plano: Implementaremos um Recorder SSE endpoint que reutiliza Dispatcher, Buffer e ScreenService, eliminando completamente AutomationExecute.*. O plano detalha remoção de código, novos módulos, fluxos de captura e teste.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Necessitamos remover o endpoint src/routes/automation-execute.routes.ts e todas as dependências (controllers, tests) pois não foi solicitado. No lugar, criaremos src/routes/recorder.routes.ts que registra uma rota GET /api/v1/recorder/stream. Ela usará InputEventsControllerRecorder (novo) para abrir SSE, ouvindo EventDispatcher e agregando dados de MouseService e KeyboardService. Ao mouseDown enviará {x,y,button,timestamps,screenshot}. Ao keyDown/up enviará {key,state,timestamp}.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Introduziremos interface RecordedEvent em src/types/recorder-event.types.ts com discriminação em "mouse" | "keyboard". MouseEvent inclui {id,nanoTs,action:'down'|'up'|'move',x,y,button,'screenshot'?:string}. KeyboardEvent inclui {id,nanoTs,action:'down'|'up',key}. Persistência é apenas transitória via EventBuffer existente; campo id mantém ordenação. Nenhum armazenamento em disco, garantindo baixa latência.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: Usaremos EventDispatcher (publish), EventBuffer (replay) e ScreenService (capture). Adicionaremos um interceptor em MouseService (src/application/services/mouse.service.ts) para emitir 'move' em drag e 'down/up' nos clicks. KeyboardService recebe similar patch. Dependências são injetadas via dependency-injection.ts registrando RecorderListener que converte eventos em RecordedEvent e injeta screenshot via ScreenService.capture().

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: Casos: 1) screenshot falha → enviar evento com screenshot: null e campo error. 2) Clique fora da tela → MouseService já valida; emitiremos DomainError e SSE enviará tipo 'error'. 3) Arrasto muito longo >5min: dispatcher pára emitir move após 60 s inativos para evitar flood. 4) Buffer overflow → EventBuffer.trimOldest(). 5) Tecla especial não imprimível filtrada mas ainda registrada em keyboard channel.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Criaremos recorder.config.ts com flags: INCLUDE_SCREENSHOT (bool, default true), MOVE_INTERVAL_MS (20-200ms), MAX_SCREENSHOT_SIZE (2 MB). Valores lidos de ENV e validados via Zod. Future plugins podem registrar IRecorderEnhancer via tsyringe token 'RecorderEnhancer' para adicionar áudio, vídeo etc., mantendo Open/Closed principle.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Pattern Observer: Mouse/Keyboard Services → EventDispatcher. Decorator RecorderListener adiciona screenshot (Factory via ScreenCaptureFactory) e adapta ao RecordedEvent DTO. Controller mantém mapa de clients SSE. Diagrama: Services → Dispatcher → RecorderListener → Controller → SSE clients. Singleton para Dispatcher/Buffer; transient para Listener por connection para isolar config.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: mouseMove batched: emit a cada MOVE_INTERVAL_MS, O(n) listeners; dispatcher usa setImmediate para async loop. Screenshot usa sharp.resize({width:1280}) quando MAX_SCREENSHOT_SIZE excede; captura paralela com worker_threads se CPU>4. Complexity: move O(1) per event, screenshot cost amortized porque só em 'down'. PM2 clustering possível pois buffer in-memory per instance; future Redis pub/sub planned.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Headers: x-api-key obrigatório (middleware já existente). CORS conforme config. Limite de 10 connections por IP usando fastify-rate-limit. Screenshot é PNG base64 com tamanho checado antes de write(). Nenhum dado sensível armazenado. Sanitização de key string (regex /^[\w\d]{1,20}$/). SSE resposta inclui "retry:1000" para mitigar reconexão agressiva.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Unit: recorder-listener.spec.ts mocka MouseService, ScreenService (jest.fn().mockResolvedValue('<png>')) e assegura evento correto. Integration: recorder.e2e.spec.ts inicia Fastify, conecta via EventSource, dispara events sintéticos, espera JSON correto. Coverage >90% lines. Use fake timers para drag stream. Load test: autocannon 100 conns/30s verifica latência <50ms p95.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) AutomationExecute removido (grep -R "automation-execute" == 0). 2) New route returns 200 & content-type text/event-stream. 3) Mouse down includes screenshot; up não inclui; move enviado durante drag. 4) Keyboard down/up eventos corretos. 5) Env vars default via .env.example. 6) Jest passes & coverage thresholds. 7) Lint clean. 8) Manual test with real mouse verifies PNG decodável.
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