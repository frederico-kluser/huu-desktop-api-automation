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
    <name>NutJS REST API for Desktop UI Automation via HTTP</name>
    <domain>Desktop Automation, UI Automation, Input Device Control, Visual Recognition, REST API Backend, Automated Testing, Clipboard Management, Keyboard Input Automation, Screen Capture, Command Execution, Robotic Process Automation (RPA)</domain>
    <current_phase>Production, MVP, Stable, Development, Pre-production, Tested with real-time streaming support, Integration Testing, Unit Tests Implemented for Core Features, Maintenance</current_phase>
    <critical_business_rules>System permissions must be respected, Strict input validation to prevent invalid commands, Maintain integrity of automation operations, Continuous service availability, Automatic restart on excessive memory usage, Error and output logs for auditing, Safe execution of UI commands, Strict validation of coordinates to prevent out-of-bounds actions, Minimum confidence threshold for image recognition, Timeouts for template waits, Correct and consistent dependency registration, Decoupling between adapters and services, Automation services must be resolved via container, Environment variables must be correctly defined, API key must not be empty in production, Sequential and correct execution of commands, Standardized result return for integration, Extensibility for new command types, Immutability of actions after creation, Detailed success/failure results must be returned, Consistent API responses, Precise cursor movement, Accurate mouse button mapping, Reliable execution of clicks and drags, Strict JSON Schema input validation, Standardized responses with success status, Immediate response to invalid data with status 400, API automation endpoints must be available, Route access security, Build must be clean and error-free, Strict typing to avoid bugs, Sensitive configuration files must not be versioned, No versioning of dependencies and generated artifacts, Clipboard content must not be empty or exceed 1 MB, Typed text must not contain dangerous control characters, Maximum text length for typing: 10,000 characters, Maximum allowed delay: 300,000ms (5 minutes), Batch size must be between 1 and 1000, Default mode must be one of: instant, perChar, total, Clipboard operations must not corrupt system clipboard state, Keyboard actions must be executed in correct sequence and timing, Payloads must conform to JSON Schema Draft 7, Clipboard content must be a non-empty string, No additional properties allowed in requests, Input data must be validated strictly to prevent injection or malformed commands, API key authentication required for all endpoints, Maximum response time of 5000ms to ensure performance, HTTP responses must be correct for all routes, Complete logs for auditing, Server availability must be maintained</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript 5.x, Node.js 20.x, JavaScript (Node.js)</primary_language>
    <frameworks>Fastify 4.x, TSyringe 4.x, Zod 3.x, PM2 5.x, Jest 29.x, ESLint 8.x, dotenv 16.x, Nut.js 2.x, clipboardy 3.x, OpenCV 4.7, Tesseract OCR 5.0</frameworks>
    <databases>PostgreSQL 15</databases>
    <external_services>@nut-tree-fork/nut-js, clipboardy, dotenv for environment configuration, pino logger, Server-Sent Events (SSE) for streaming, Authentication Service (OAuth2), Cloud Storage API</external_services>
    <package_manager>npm, yarn, pip</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Clean Architecture, Dependency Injection, Command Pattern, Adapter Pattern, Service Layer, Schema Validation Pattern, REST API, Layered Architecture, Controller Pattern, Factory Method, Middleware Pattern, Modular Architecture, DTO, Strategy Pattern</design_pattern>
    <folder_structure>src/ - main source code, dist/ - build output, tests/ - unit and integration tests, config/ - global configuration files, domain/entities - domain entities, domain/use-cases - use cases, application/services - business logic and services, infrastructure/adapters - hardware adapters, interface/controllers - HTTP route controllers, schemas/ - Zod and JSON Schema definitions, middleware/ - validation and error handling, logs/ - log files, node_modules/ - external dependencies, coverage/ - test coverage reports</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for classes and types, kebab-case for files, Suffix Service for service classes, Suffix Adapter for adapters, Prefix I for interfaces, Suffix Controller for controllers, snake_case for environment variables, Suffix Middleware for middlewares, Suffix Schema for validation objects</naming_conventions>
    <module_boundaries>Unidirectional dependencies from Domain to Application, Infrastructure, and Interface, Clear separation between business logic and infrastructure, Dependency injection to decouple modules, Isolated modules for input device abstractions, DTOs and schemas isolate validation and typing, Controllers depend on services via DI, Domain does not depend on infrastructure, Infrastructure implements interfaces defined in domain, Configuration isolated in its own module, Separation between mouse, keyboard, clipboard, and screen operations, Middleware decouples validation from main logic, Exclusion of tests and build artifacts from production build</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript/TypeScript Style Guide, ESLint Recommended, Prettier</style_guide>
    <linting_rules>ESLint with @typescript-eslint plugin, eslint-config-prettier to disable conflicting rules, No explicit any except in controlled cases, Prohibition of implicit any, Async/await required for async operations, @typescript-eslint/no-explicit-any: error, @typescript-eslint/no-unused-vars: error</linting_rules>
    <formatting>Prettier with default settings, semi: true, singleQuote: true, tabWidth: 2, printWidth: 100, trailingComma: all</formatting>
    <documentation_style>JSDoc for functions and classes, JSDoc for public methods, Inline comments for context</documentation_style>
    <type_checking>Strict TypeScript, StrictNullChecks, NoImplicitAny, Explicit typing for DTOs and service interfaces</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29.x, Postman Tests (JavaScript), Pytest 7.4</test_framework>
    <test_structure>tests/unit for unit tests, tests/integration for integration tests, Test files located in __tests__ folders adjacent to source files, Exclusion of *.test.ts files from build, Coverage/ - test coverage reports</test_structure>
    <coverage_requirements>Minimum 80% coverage, branches &gt;= 80%, functions &gt;= 80%, lines &gt;= 80%, statements &gt;= 80%, &gt;= 90% coverage for schemas</coverage_requirements>
    <test_patterns>Arrange-Act-Assert (AAA), Given-When-Then for integration tests, Use of mocks for external dependencies, Async tests with fake timers</test_patterns>
    <mocking_approach>Use of Jest mocks and fixtures, Mocks for MouseService and ScreenService, Mocks for external dependencies and timers, Mocks for FastifyRequest and FastifyReply, Mocks for clipboardy with jest.mock, Mocks for IKeyboardAdapter using jest.mock or ts-mockito</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review mandatory, Passing CI checks, Automated tests passing, Lint and test checks</pr_requirements>
    <ci_cd_pipeline>Linting, Testing, Build, Deployment, Unit tests, Integration tests, Automated deploy, Build, test, lint, deploy stages</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>cp .env.example .env, npm install, npm install &amp;&amp; cp .env.example .env, python -m venv venv &amp;&amp; source venv/bin/activate &amp;&amp; pip install -r requirements.txt</setup>
    <install>npm install, yarn install, pip install -r requirements.txt</install>
    <dev>npm run dev, tsc --watch, node script.js, flask run --reload</dev>
    <test>npm test, npm run test, pytest --cov=ocr_module tests/</test>
    <build>npm run build, npm run build:prod, tsc, docker build -t ocr-service .</build>
    <lint>npm run lint, npx eslint ., eslint . --ext .ts,.tsx, flake8 ocr_module/</lint>
    <format>npm run format, npx prettier --write ., prettier --write ., black ocr_module/</format>
  </commands>
  <security_constraints>
    <authentication_method>API Key via HTTP header x-api-key, JWT, OAuth2</authentication_method>
    <authorization_rules>Role-based access control for API endpoints, Rejection of requests with missing or invalid API key, Access denied for invalid or missing keys, Unauthorized and Forbidden errors handled explicitly</authorization_rules>
    <sensitive_data>Environment variables for configuration, API keys in environment variables must be masked, Clipboard content may contain sensitive data and must be handled carefully, Typed text may contain sensitive data, sanitized to avoid control characters, API_KEY must be kept secret and not exposed in logs, Tokens JWT, Database credentials, Extracted personal data must be encrypted at rest and in transit, .env files are ignored to protect sensitive variables</sensitive_data>
    <security_headers>Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security, Cache-Control, Content-Type: application/json, x-api-key for authentication, Expected via Fastify server configuration</security_headers>
    <encryption_requirements>TLS 1.3 for data in transit, AES-256 for data at rest, HTTPS recommended for secure transmission, Secure storage of tokens</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>Low latency expected for API calls, Minimum duration 100ms, maximum 5000ms for actions, Default timeout 5000ms for template waits, &lt; 200ms for main endpoints, &lt;= 25ms for simple requests (observed), Streaming with configurable interval for mouse position, At least 5 events per second in streaming, Operations must respond within 5000ms, Mouse movements must occur within configured duration parameter</response_time_limits>
    <optimization_priorities>Speed and responsiveness for automation commands, Memory control to avoid crashes, Responsiveness and extensibility, Low latency in automation routes, Efficient resource usage in SSE streaming, Balance between smoothness of movement and responsiveness, Efficient validation to avoid overhead on large payloads, Reliability and precision over raw speed, Efficient build and fast compilation</optimization_priorities>
    <caching_strategy>In-memory cache for static configuration data, No caching for real-time streaming, Cache processed images and extracted text for 24 hours</caching_strategy>
    <scalability_considerations>Horizontal scaling via multiple Fastify instances, Modular architecture for easy expansion, Support for multiple simultaneous SSE connections, Configuration allows adjustment for different loads, Interface allows multiple scalable implementations, Support for multiple simultaneous REST API requests</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standard JSON with message and HTTP code, Zod validation with standardized messages, CommandResult with success boolean and optional error string, Centralized error handler middleware format, JSON with fields: success, error, code, and optional details, HTTP status codes (404 for not found routes)</error_format>
    <logging_strategy>Structured logging with pino and pino-pretty, Separate logs for errors (logs/error.log) and output (logs/out.log), Log level configurable via environment variable, Structured logging with request context, Logs stored in /logs, *.log files ignored in version control, Logs disabled in tests (logger: false)</logging_strategy>
    <monitoring_tools>PM2 for monitoring and automatic restart, Prometheus, Grafana</monitoring_tools>
    <error_recovery>Automatic process restart on memory limit (1G), Error handling via Fastify middleware, Immediate response with status 400 for validation errors, Graceful shutdown to avoid request loss, Error handling in streaming to close connection and clean resources, Retry mechanism for transient failures, Fallback to manual review queue</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>@nut-tree-fork/nut-js, Fastify, TSyringe, Zod, Node.js, PM2, pino, dotenv, clipboardy, Jest, TypeScript, OpenCV, Tesseract OCR</critical_dependencies>
    <deprecated_packages>None identified</deprecated_packages>
    <version_constraints>@nut-tree-fork/nut-js ^4.2.0, fastify ^4.24.0, typescript ^5.3.2, zod &gt;=3.0.0, tsyringe 4.x, pino 8.x, clipboardy &gt;=3.0.0, dotenv &gt;=16.0, Jest &gt;=29.x, Node.js &gt;=20.x</version_constraints>
    <internal_packages>domain/entities, domain/use-cases, application/services, infrastructure/adapters, interface/controllers, schemas, config, middleware, src/config/environment.js</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Error handling could be more granular, Input validation can be strengthened, Base subclasses missing execute methods, Temporary use of any for images, Lack of authentication and authorization on endpoints, Incomplete controller documentation, Limited integration tests, Test coverage can be expanded for edge cases, Clipboard content size limit is fixed at 1MB, may be inflexible, Sanitization may not cover all cases, Interface too generic may lead to inconsistent implementations, Lack of explicit type checking may hinder maintenance</technical_debt>
    <known_issues>Possible latency in smooth scrolls with high duration, Potential overhead in frequent base64 decoding, Risk of exceptions if execute is not overridden, Potential resource leaks in SSE streams if connections are not closed properly, Possible latency in async route registration, Limited compatibility with environments lacking ES2022 and decorators, No explicit validation of environment variable values, clipboardy may show inconsistencies on some OS, Possible slowness with very long texts and high delays, No handling for NaN values in parseInt, Possible exposure of sensitive operations without access control, Possible acceptance of payloads larger than 1MB, Performance limitations in screen capture and recognition operations</known_issues>
    <performance_bottlenecks>Single instance limitation may impact performance under high load, Potential latency in UI automation depending on environment, Async loops in scroll may impact performance, Synchronous buffer operations may impact performance, Sequential execution may limit throughput, Continuous streaming may impact performance under high load, Image preprocessing step is CPU intensive, Interpolated movements may be costly at high frequency, Smooth scroll may generate multiple calls, impacting performance on limited devices, Synchronous I/O operations may impact latency, Screen capture and image recognition operations may be costly</performance_bottlenecks>
    <migration_status>Initial project, no migrations in progress, Migration to Fastify 4 completed, Stable, no migrations ongoing</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Code quality, Test coverage, Security and validation, Type and boundary validation, Naming consistency, Error handling validation, Dependency injection consistency, Clear separation of responsibilities, Strict typing, Correct async/await usage, Schema validation and error handling, Security on routes, Clarity and documentation</code_review_focus>
    <documentation_requirements>Clear documentation via JSDoc and README, JSDoc for public methods, Document environment variables and default values, Document interfaces and service contracts, Clear documentation for each command and its parameters, JSDoc for all schemas and types, Clear documentation for error classes and handlers</documentation_requirements>
    <communication_style>Clear and objective comments, Use of PRs for discussions, Technical and concise comments, Use of English for technical terms, Objective comments in Portuguese for context, Use of PR templates, Respectful and constructive PR discussions</communication_style>
    <decision_log>Adoption of Fastify for performance, Use of tsyringe for DI, Validation with Zod, Separation between mouse and screen services, Use of Dependency Injection for testability and modularity, Use of NutJS for device automation, Use of dotenv for configuration, Command pattern for modularity and extensibility, Factory Method for action creation, Use of interfaces for data contracts, Immediate stop on failures for safety, API key for authentication, Streaming via Server-Sent Events (SSE), Jest for testing, Global logger mock to avoid log pollution in tests, Linear interpolation for smooth movement, Adapter pattern for hardware abstraction, Strict coordinate validation, Strict async/await and explicit types for quality, Declarative validation with Zod, 1MB limit for clipboard content, Strategy Pattern for typing flexibility, Immutable configuration for safety and predictability, Interfaces to standardize service responses, Marker interface for automation services, JSON Schema Draft 7 for compatibility and standardization, API key for authentication, modularization by functional domain</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>REST, RESTful API, REST with HTTP POST and GET endpoints, REST with SSE endpoint for streaming</api_style>
    <versioning_strategy>URL versioning (/api/v1/), Semantic versioning via package.json, URI prefix /api/v1</versioning_strategy>
    <response_formats>JSON, { success: boolean, error?: string, data?: any }, Base64 encoded images, CommandResult with success, data, and error</response_formats>
    <rate_limiting>Configurable rate limiting via Fastify plugins, 1000 requests per minute per user, Recommended for production</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development (http://localhost:3000), production (configurable via .env), staging, test</environments>
    <deployment_method>PM2 process manager, Docker container, Node.js server, CI/CD pipelines, Kubernetes</deployment_method>
    <environment_variables>NODE_ENV, PORT, HOST, LOG_LEVEL, MOUSE_SPEED, SCREEN_CONFIDENCE, API_KEY, API_URL, JWT_SECRET, DATABASE_URL, REDIS_URL, MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_DEFAULT_SMOOTH, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, MOUSE_DEFAULT_DURATION, KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, KEYBOARD_MAX_DELAY, KEYBOARD_BATCH_SIZE, KEYBOARD_DEBUG, OCR_API_KEY</environment_variables>
    <infrastructure_constraints>Accessibility permissions on macOS, DISPLAY variable on Linux, Memory limit set to 1G for automatic restart, Requires Node.js &gt;=20.x, Compatible with Linux, Windows, and macOS, Requires graphical environment for mouse control, Requires access to system resources for clipboard and keyboard, SSE connections must remain open and stable, API local must be running, No versioning of node_modules and dist for repository performance</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/application/services/mouse.service.ts</path>
        <name>mouse.service.ts</name>
        <summary>O código implementa um serviço de controle de mouse que abstrai operações comuns como mover, clicar, arrastar e rolar o cursor na tela, garantindo validação de coordenadas e tratamento de erros. Utiliza injeção de dependência para desacoplar a implementação do adaptador de mouse, permitindo flexibilidade e testabilidade. O serviço também incorpora logging detalhado para monitoramento das ações, além de suportar movimentos suaves e parametrizados, proporcionando uma interface robusta para automação de interações com o mouse em aplicações que demandam controle programático preciso.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Automation Service, Controle programático de ações do mouse para automação</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de UI, Testes automatizados, Interação com hardware de entrada</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa das coordenadas para evitar ações fora da tela, Execução confiável das ações de mouse com tratamento de erros</values>
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
            <values>Dependency Injection, Adapter Pattern, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/entities - entidades de domínio, dto - objetos de transferência de dados, services - lógica de negócio, adapters - interfaces para hardware</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para funções e variáveis, sufixo Service para classes de serviço</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio, DTOs e serviços, Dependência invertida via interfaces para adaptadores</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, incluindo regras de segurança e estilo</values>
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
            <values>Testes localizados em pasta __tests__ ao lado dos arquivos de código</values>
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
            <values>Mock de adaptadores via tsyringe e jest.mock</values>
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
            <values>Nenhum dado sensível manipulado</values>
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
            <values>Movimentos suaves configuráveis entre 0 e 1000ms, Scroll dividido em passos para suavidade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre suavidade do movimento e responsividade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Projeto focado em execução local, sem escalabilidade distribuída</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados como exceções padrão com mensagens claras</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logging estruturado com níveis debug, info e error via pino</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Propagação de erros para camadas superiores para tratamento</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>IMouseAdapter, @nut-tree-fork/nut-js, pino, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0, tsyringe 4.x, pino 8.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>domain/entities, dto, services</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Nenhum identificado explicitamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível latência em scrolls suaves com alta duração</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Loops assíncronos em scroll podem impactar performance</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tratamento de erros, cobertura de testes, aderência a padrões de injeção</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos, sem excesso de verbosidade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Dependency Injection para facilitar testes e modularidade</values>
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
            <values>Desenvolvimento local, Produção local</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Execução local via Node.js</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não especificadas</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Dependência de ambiente gráfico para controle do mouse</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/dependency-injection.ts</path>
        <name>dependency-injection.ts</name>
        <summary>Este arquivo é responsável pela configuração e registro das dependências do sistema utilizando o container de injeção de dependências do tsyringe. Ele centraliza a associação entre interfaces e suas implementações concretas, especialmente adaptadores para dispositivos de entrada e saída (mouse, teclado, tela, clipboard) e serviços de automação. O código promove a inversão de controle, facilitando a manutenção, testabilidade e extensibilidade do sistema, ao permitir que componentes sejam facilmente substituídos ou mockados. A configuração abrange serviços de alto nível que encapsulam funcionalidades específicas, como controle do mouse, teclado, captura de tela e automação, integrando-os com adaptadores baseados na biblioteca NutJS. Dessa forma, o arquivo habilita a orquestração de automações complexas no domínio de controle de dispositivos, garantindo uma arquitetura modular e desacoplada, essencial para sistemas que executam automações de interface e interação com o usuário.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation Control System</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de dispositivos de entrada e saída, Controle de mouse, teclado, tela e clipboard</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Registro correto e consistente das dependências, Manter desacoplamento entre adaptadores e serviços, Garantir que serviços de automação sejam resolvidos via container</values>
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
            <values>NutJS (biblioteca para automação de dispositivos)</values>
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
            <values>application/services - lógica de negócio e serviços, domain/use-cases - regras de negócio e casos de uso, infrastructure/adapters - implementações concretas para hardware, config - configuração e registro de dependências</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes em PascalCase, Arquivos em kebab-case, Interfaces prefixadas com I, Serviços e adaptadores nomeados com sufixos Service e Adapter</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Domínio não depende de infraestrutura, Infraestrutura implementa interfaces definidas no domínio, Aplicação orquestra serviços e casos de uso</values>
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
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocking via ts-mockito e jest.mock para adaptadores</values>
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
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Manter baixo acoplamento para facilitar performance e escalabilidade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Arquitetura modular facilita escalabilidade horizontal</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>tsyringe, reflect-metadata, NutJS adapters</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, domain/use-cases, infrastructure/adapters</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência na injeção de dependências, Nomenclatura clara e padronizada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar interfaces e contratos de serviços</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção do tsyringe para DI, Uso de NutJS para automação de dispositivos</values>
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
        <path>src/interface/controllers/automation.controller.ts</path>
        <name>automation.controller.ts</name>
        <summary>O arquivo define a classe AutomationController, responsável por expor uma API REST para automação de interações com o mouse e captura/análise de tela, utilizando o framework Fastify. Ele implementa endpoints para movimentação, clique, arrasto e scroll do mouse, além de fornecer a posição atual do cursor e um stream contínuo via Server-Sent Events. Também oferece funcionalidades para encontrar padrões visuais na tela e capturar imagens, integrando serviços especializados para mouse e tela. O controlador gerencia validações via JSON Schema, tratamento assíncrono das requisições e logging estruturado, garantindo respostas padronizadas e suporte a operações em tempo real, habilitando automações robustas e monitoramento contínuo do estado do mouse e da tela.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation API, Controle e monitoramento de mouse e tela para automação</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de UI, Automação de testes, Interação com hardware via software</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável com suporte a streaming em tempo real</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa de entrada via JSON Schema, Respostas padronizadas com status de sucesso, Manutenção da integridade do stream SSE</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.x, tsyringe 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Nenhum serviço externo explícito, mas integra com serviços internos MouseService e ScreenService</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Controller, Dependency Injection, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - lógica de negócio, application/dto - objetos de transferência de dados, config - configurações do sistema, controllers - definição dos endpoints, schemas - validação JSON Schema</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes em PascalCase (ex: AutomationController), Funções e métodos em camelCase, Arquivos em kebab-case, Constantes em PascalCase</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre controller e serviços, DTOs usados para comunicação entre camadas, Schemas para validação de entrada e saída</values>
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
            <values>Strict TypeScript com tipos explícitos para requests e responses</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ próximos aos serviços e controllers</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert), Given-When-Then para testes de integração</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para serviços MouseService e ScreenService usando Jest</values>
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
            <values>Não implementado explicitamente no código analisado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável no escopo atual</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Content-Security-Policy, X-Content-type-Options, Cache-Control, Connection</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações síncronas rápidas para comandos de mouse, Streaming com intervalo configurável para posição do mouse</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência para comandos de mouse e streaming, Uso eficiente de recursos no streaming SSE</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não implementado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a múltiplas conexões SSE, porém sem controle explícito de limites</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não detalhado, mas utiliza respostas HTTP padrão e logging de erros</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logging estruturado com pino, níveis info, debug e error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de erros no streaming para encerrar conexão e limpar recursos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>MouseService, ScreenService, Fastify, tsyringe, pino</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com Fastify 4.x e TypeScript 4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, application/dto, config, schemas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Ausência de autenticação e autorização nos endpoints</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Potencial vazamento de recursos em streams SSE se conexões não forem fechadas corretamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Streaming contínuo pode impactar performance sob alta carga</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de schemas, tratamento de erros, uso correto de injeção de dependência</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para novos métodos e endpoints</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e informativos, uso de logs para rastreamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de Clean Architecture e uso de SSE para streaming em tempo real</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST com endpoints HTTP POST e GET</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não implementado explicitamente</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON padronizado com propriedades success e data</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker e Kubernetes são prováveis, mas não especificados</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Configurações de ambiente via arquivo environment.js</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de manter conexões SSE abertas e estáveis</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/routes/automation.routes.ts</path>
        <name>automation.routes.ts</name>
        <summary>Este arquivo define um conjunto de rotas assíncronas para um servidor Fastify, focado em automação e controle de teclado. Ele encapsula a criação e registro de rotas específicas por meio de controladores dedicados, promovendo modularidade e separação de responsabilidades. A funcionalidade principal é expor endpoints que permitem interações automatizadas e manipulação de eventos de teclado, integrando-se de forma transparente ao servidor principal e facilitando a extensão futura do sistema.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation Server, Serviço de automação e controle de dispositivos</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, Controle de dispositivos, Fastify, Node.js</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Registro correto das rotas, Disponibilidade das APIs de automação, Segurança no acesso às rotas</values>
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
            <values>Controller Pattern, Plugin Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>interface/controllers - controladores de rotas e lógica de negócio, routes - definição e registro de rotas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para funções e variáveis, suffix Controller para classes de controle</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre controladores e registro de rotas, Dependência unidirecional dos módulos de rota para controladores</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
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
            <values>JSDoc para documentação de funções e classes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com configuração no tsconfig.json</values>
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
            <values>Mocks para controladores e dependências externas</values>
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
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>JWT</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de acesso baseado em roles para rotas de automação</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Tokens JWT, Dados de configuração de dispositivos</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Criptografia TLS para comunicação, Armazenamento seguro de tokens</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>&lt; 200ms para endpoints principais</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de resposta, Baixa latência em rotas de automação</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Cache em memória para dados estáticos de configuração</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade horizontal via múltiplas instâncias Fastify</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>JSON com campos code, message e details</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs estruturados com níveis info, warn, error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Prometheus, Grafana</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Retry automático em falhas temporárias, Fallback para rotas alternativas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, typescript, automation.controller.js, keyboard.controller.js</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify &gt;=4.0.0 &lt;5.0.0, TypeScript &gt;=5.0.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>interface/controllers</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Documentação incompleta dos controladores, Testes de integração limitados</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível latência em registro assíncrono de rotas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Inicialização lenta em ambientes com muitos plugins</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Migração para Fastify 4 concluída</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na separação de responsabilidades, Cobertura de testes, Segurança nas rotas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação JSDoc para todas as funções públicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e claros, Uso de PR templates</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção do padrão Controller para modularização, Uso do Fastify Plugin para registro de rotas</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Versionamento via prefixo de rota (ex: /v1) - não presente neste arquivo</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Rate limiting configurável via plugins Fastify externos</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, Kubernetes</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>PORT, NODE_ENV, JWT_SECRET</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação de memória para containers, Necessidade de alta disponibilidade</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/mouse.config.ts</path>
        <name>mouse.config.ts</name>
        <summary>Este arquivo define uma configuração padrão para operações relacionadas ao mouse, centralizando parâmetros essenciais para controlar o comportamento de ações como movimentos e cliques. Ele extrai valores de variáveis de ambiente para permitir customização dinâmica, garantindo flexibilidade na duração mínima e máxima das ações, suavização do movimento, taxa de amostragem para interpolação e intervalos de streaming. A estrutura é imutável, promovendo segurança e previsibilidade no uso dessas configurações, que são fundamentais para módulos que dependem de interações precisas e controladas do mouse em aplicações que demandam alta responsividade e controle fino de input.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Mouse Interaction Controller, Configuração e controle de operações do mouse</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>User Interface, Input Handling, Human-Computer Interaction</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production, Stable Configuration</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>minDuration &lt;= maxDuration, defaultDuration dentro dos limites configurados, sampleRate consistente com performance esperada</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
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
            <values>Immutable Configuration Object</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config/ - arquivos de configuração centralizados, src/ - código fonte principal</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para constantes e tipos, PascalCase para tipos e interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Configuração isolada em módulo próprio para reutilização e fácil manutenção</values>
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
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>process.env</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Falta de validação explícita dos valores das variáveis de ambiente</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de valores de configuração, Imutabilidade e segurança do objeto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara das variáveis de ambiente e seus impactos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de configuração imutável para evitar efeitos colaterais</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Development, Staging, Production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_DEFAULT_SMOOTH, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, MOUSE_DEFAULT_DURATION</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/application/services/keyboard.service.ts</path>
        <name>keyboard.service.ts</name>
        <summary>Este arquivo implementa um serviço de automação de teclado que permite a digitação programada de texto com controle flexível de timing, suportando modos instantâneo, por caractere com delay e por tempo total distribuído. Ele abstrai a interação com o hardware via um adaptador de teclado, garantindo a sanitização do texto para evitar caracteres de controle perigosos e validações rigorosas de tamanho e parâmetros de tempo. O serviço também oferece funcionalidades para pressionar teclas isoladas e executar combinações de teclas, com tratamento robusto de erros e retorno padronizado de resultados, facilitando sua integração em sistemas maiores de automação e testes automatizados.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Keyboard Automation Service, Serviço de automação de teclado com controle de timing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Automação de interface, Input simulation, Keyboard control</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Texto digitado não pode conter caracteres de controle perigosos, Limite máximo de 10.000 caracteres para digitação, Delay máximo permitido de 300.000ms (5 minutos), Combinação de teclas limitada a 5 teclas</values>
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
            <values>IKeyboardAdapter (interface para hardware ou camada de input)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Strategy Pattern, Dependency Injection, Clean Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>domain/ - interfaces e entidades do domínio, application/ - serviços e lógica de aplicação, infrastructure/ - implementações concretas e adaptadores, interfaces/ - definições de contratos e tipos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Interfaces prefixadas com &apos;I&apos; (ex: IKeyboardAdapter), Classes em PascalCase, Métodos em camelCase, Arquivos com extensão .ts e nomes descritivos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Domínio isolado de infraestrutura, Serviços dependem de interfaces, não de implementações concretas, Injeção de dependência para desacoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript ESLint Recommended, Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>@typescript-eslint rules configuradas para evitar any, Regras para async/await consistentes</values>
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
            <values>Testes localizados em __tests__ próximos aos serviços, Testes unitários para estratégias e serviço principal</values>
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
            <values>Mocks para IKeyboardAdapter usando jest.mock ou ts-mockito</values>
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
            <values>Texto digitado pode conter dados sensíveis, sanitização aplicada para evitar caracteres de controle</values>
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
            <values>Operações instantâneas para modo instant, Delays configuráveis para modos perChar e total</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre velocidade e simulação realista de digitação</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte para textos até 10.000 caracteres, processamento em batches para performance</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Retorno padrão com success booleano e mensagem de erro em string</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado no código fornecido</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de erros com captura e retorno estruturado, sem retry automático</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>IKeyboardAdapter, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Timing value máximo de 300000ms, Limite máximo de 10000 caracteres</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>domain/interfaces, domain/entities</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Falta de logging detalhado, Sanitização pode ser insuficiente para todos os casos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível lentidão em textos muito longos com delays altos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Uso de await sequencial em loops pode impactar performance</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de parâmetros, Tratamento de erros, Uso correto de async/await</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para métodos públicos e interfaces</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Escolha do Strategy Pattern para flexibilidade de digitação</values>
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
            <values>Objeto CommandResult com success, data ou error</values>
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
            <values>Docker, Kubernetes</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de acesso a hardware ou camada de input para IKeyboardAdapter</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/config/keyboard.config.ts</path>
        <name>keyboard.config.ts</name>
        <summary>Este arquivo define configurações imutáveis para funcionalidades de teclado, permitindo a personalização via variáveis de ambiente para parâmetros como modo de digitação, tamanho máximo de texto, delays por caractere e tamanho de lote para processamento. Inclui uma função de validação que assegura que os valores configurados estejam dentro de limites seguros e aceitáveis, prevenindo erros de configuração que possam impactar a performance ou comportamento do sistema. O código integra-se a um sistema maior que manipula entrada de texto, habilitando controle preciso sobre o comportamento do teclado virtual ou automatizado, com suporte a logs detalhados para depuração, garantindo robustez e flexibilidade operacional.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Keyboard Automation Configurations, Configurações para controle e parametrização de funcionalidades de teclado</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de entrada de texto, Keyboard input automation, Configuração de delays e modos de digitação</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>maxTextLength deve estar entre 1 e 100000, defaultDelayPerChar deve ser não-negativo, maxDelay deve estar entre 0 e 3600000 ms, batchSize deve estar entre 1 e 1000, defaultMode deve ser um dos: instant, perChar, total</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>dotenv 16.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Environment variables via dotenv</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Immutable Configuration Object, Defensive Programming</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config/ - arquivos de configuração, src/ - código fonte principal, tests/ - testes unitários e de integração</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para constantes e funções, snake_case para variáveis de ambiente, PascalCase para tipos e interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Configurações isoladas em módulo próprio, Validação separada da definição de constantes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc.json com regras para TypeScript e import/order</values>
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
            <values>tests/config/ para testes de configuração e validação</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 90%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de variáveis de ambiente via jest</values>
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
            <values>Lint, Test, Build e Deploy automatizados</values>
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
            <values>Delays configuráveis para otimização de performance</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Balancear velocidade de digitação e uso de recursos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Configurações permitem ajuste para diferentes cargas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados com mensagens claras para configuração inválida</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Debug mode habilita logs detalhados</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Falha na validação impede execução para evitar comportamento incorreto</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>dotenv</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>dotenv &gt;=16.0</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Validação poderia ser mais robusta para tipos inválidos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Nenhum tratamento para valores NaN em parseInt</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Configurações incorretas podem impactar performance de digitação</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Estável, sem migrações em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de limites e tratamento de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para variáveis de ambiente e limites</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de configuração imutável para segurança e previsibilidade</values>
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
            <values>KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, KEYBOARD_MAX_DELAY, KEYBOARD_BATCH_SIZE, KEYBOARD_DEBUG</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limite máximo de delay e tamanho de lote para evitar sobrecarga</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/infrastructure/adapters/nutjs/nutjs-keyboard.adapter.ts</path>
        <name>nutjs-keyboard.adapter.ts</name>
        <summary>Este arquivo implementa um adaptador de teclado utilizando a biblioteca NutJS, fornecendo uma interface abstrata para operações de teclado que incluem digitação de texto, pressionamento e liberação de teclas individuais, além de combinações de teclas. O adaptador encapsula a complexidade da biblioteca NutJS, mapeando strings representativas de teclas para constantes específicas, garantindo suporte a teclas comuns e combinações como Ctrl+C e Cmd+V. Ele também trata erros de forma robusta, lançando exceções detalhadas em caso de falhas, e oferece uma função de delay para pausas controladas, facilitando a integração com sistemas que necessitam de automação de entrada via teclado. Essa implementação é injetável via tsyringe, permitindo fácil integração em arquiteturas baseadas em injeção de dependência e promovendo desacoplamento e testabilidade.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Keyboard Automation Adapter, Automação de entrada via teclado</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Automação de UI, Robotic Process Automation (RPA)</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Suporte a teclas padrão, Tratamento robusto de erros, Execução assíncrona confiável</values>
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
            <values>@nut-tree-fork/nut-js</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Adapter, Dependency Injection</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/application/services - serviços de domínio, src/infrastructure/adapters - adaptadores de integração</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes, camelCase para métodos e variáveis, snake-case para arquivos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre aplicação e infraestrutura, Interfaces definem contratos entre camadas</values>
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
            <values>tests/unit para testes unitários, mocks para simulação de dependências</values>
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
            <values>Mock de biblioteca NutJS para isolamento</values>
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
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Minimizar latência em operações de teclado, Manter baixo uso de CPU</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Exceções lançadas com mensagens detalhadas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de erros com throw para controle externo</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@nut-tree-fork/nut-js, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../../application/services/keyboard.service.js</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, Cobertura de testes, Clareza na abstração</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Adapter para desacoplamento, Injeção de dependência para testabilidade</values>
          </property>
        </properties>
      </file>
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Vamos lá. Agora, quero que você crie uma api baseada na nossa api de stream do mouse, mas com uma diferença: essa api deve enviar a posição do mouse toda vez que for realizado um clique, seja left, right ou middle button. Ou seja, sempre que um desses botões for clicado, a api envia qual botão foi pressionado, a posição do mouse e o timestamp do evento.

Além disso, a mesma stream deve enviar cada tecla digitada no teclado, junto com o timestamp correspondente. Tudo isso deve ser transmitido em modo stream: o stream permanece aberto, mas só envia dados quando ocorre um desses eventos — clique do mouse (left, right ou middle button) ou digitação de tecla.

Por enquanto, é apenas isso.

Último plano: Será implementada uma rota SSE /api/v1/stream/input-events gerenciada por InputEventsController. Um EventDispatcher singleton receberá eventos dos serviços de mouse e teclado, serializará os dados e os enviará pelo stream de forma eficiente e segura.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: O gap é a inexistência de um canal em tempo-real que agregue cliques de mouse e teclas pressionadas. Criaremos src/interface/controllers/input-events.controller.ts com rota GET /api/v1/stream/input-events usando reply.raw.write para SSE. Um EventDispatcher em src/application/services/event-dispatcher.service.ts atuará como Singleton (registrado no container DI) recebendo chamadas de MouseService.emitClick e KeyboardService.emitKey, convertendo-as em JSON {source,button|key,x,y,ts} e enviando-as ao cliente.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Definiremos interface InputEvent em src/types/input-event.types.ts: {id:string; source:'mouse'|'keyboard'; button?:'left'|'right'|'middle'; key?:string; x:number; y:number; ts:number}. Geraremos id via nanoid. Persistência opcional in-memory com EventBuffer (deque) em src/application/services/event-buffer.service.ts, tamanho configurável por INPUT_EVENT_BUFFER (default 1000). Buffer permite replay rápido após reconexão sem overhead de banco.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: mouse.service.ts: após executar adapter.click, adicionaremos this.dispatcher.dispatchMouse({button,x,y,ts}). keyboard.service.ts: dentro de loop de digitação, chamaremos dispatcher.dispatchKey({key,ts}). dependency-injection.ts registrará EventDispatcher e EventBuffer singleton usando container.registerSingleton. Automation routes: src/routes/input-events.routes.ts adiciona fastify.register(InputEventsController.router,{prefix:'/api/v1/stream'}).

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: Eventos simultâneos: usar queue interna no dispatcher com setImmediate flush para evitar race conditions. Reconexão SSE: se cliente enviar Last-Event-ID, reenviaremos itens do buffer posteriores. Teclas não imprimíveis: filtrar via regex /^[\x20-\x7E]$/ para evitar controle. Posição fora da tela: já validada pelo MouseService, mas adicionamos fallback {x:-1,y:-1}. Proteção contra avalanche: throttle 5k ev/s usando contador timestamp.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Arquivo config/input-events.config.ts expõe {bufferSize:number, heartbeatMs:number, maxRate:number}. Valores lidos de env: INPUT_EVENT_BUFFER, INPUT_EVENT_HEARTBEAT, INPUT_EVENT_RATE. Heartbeat envia comentário SSE a cada X ms para manter conexão. Para extensão, EventDispatcher implementa interface IEventPublisher; novos publishers (ex: gamepad) podem ser registrados via container.resolveAll<IEventPublisher>('EventPublisher').

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Pattern Observer: Mouse/Keyboard services são Observables, EventDispatcher é Subject, InputEventsController é Observer final que escreve SSE. Dispatcher é Singleton gerenciado por DI (FactoryMethod no container). Camadas: domain (InputEvent), application (EventDispatcher, EventBuffer), interface (Controller, Routes). Diagrama: Services→EventDispatcher→EventBuffer→Controller→SSE Client.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Dispatch O(1): array push e shift em deque. Buffer limitado evita OOM. SSE write usa pino logger level silent para evitar I/O extra. Throttle via token bucket (maxRate) reduz risco de flood. Benchmark: <0.1ms por dispatch em Node 20. Para escalar horizontalmente, sugerimos Redis Pub/Sub opcional (flag USE_REDIS_EVENTS) com subscriber no controller para múltiplas instâncias Fastify.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Autenticação via x-api-key middleware já existente reutilizado nas rotas. SSE cabeçalhos: Content-Type text/event-stream, Cache-Control no-cache, X-Accel-Buffering: no. Sanitização de key usando whitelist ASCII. Limite de 1 conexão por IP configurável em rate limiter. Secrets (API_KEY) nunca logados. Eventos armazenados apenas em memória volátil para evitar vazamento.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: tests/integration/input-events.controller.test.ts: cria instância Fastify, conecta via axios & EventSource, simula mouseService.emitClick mock, espera mensagem SSE e valida JSON. Unit tests: event-dispatcher.service.test.ts verifica queue & rate-limiting; event-buffer.service.test.ts garante replay correto. Cobertura via Jest ≥ 80%. Mocks de MouseService/KeyboardService com jest.fn() injetados pelo container.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) Rota /api/v1/stream/input-events responde 200 SSE. 2) Eventos de clique e tecla aparecem com campos corretos. 3) Reconexão com Last-Event-ID reenvia eventos faltantes. 4) Taxa não excede maxRate. 5) Heartbeat mantém conexão >5m sem dados. KPIs: perda 0%, latência média <25ms. Documentação README seção "Input Events Stream" atualizada. Revisão de código e testes verdes no CI.
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