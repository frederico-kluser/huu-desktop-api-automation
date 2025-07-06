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
    <name>NutJS REST API for Desktop Automation and Real-Time User Interaction Recording</name>
    <domain>Desktop Automation, UI Automation, Input Simulation, Screen Capture, Event Streaming, Clipboard Management, Robotic Process Automation (RPA), User Interaction Analytics, Automated Testing, Natural Language Processing, AI Integration, Backend API, Software Development</domain>
    <current_phase>Development, Production, Maintenance, MVP, Stable, Testing Automation</current_phase>
    <critical_business_rules>API key authentication required for sensitive endpoints, Strict validation of input parameters to prevent invalid commands, Continuous API availability, Memory usage limits to prevent crashes, Consistent and secure handling of mouse and clipboard operations, Order and integrity of received events must be maintained, Real-time event delivery without data loss, Graceful connection shutdown to prevent resource leaks, Strict JSON schema validation for all requests, No exposure of API keys or sensitive data in code or logs, Replay of events after reconnection must be accurate, Rate limiting to prevent overload, Buffer size must be between 1 and 100000, Heartbeat interval must be between 1000 and 300000 ms, Max event age must be between 1000 and 3600000 ms, Max text length must be between 1 and 100000, Default delay per char must be non-negative, Max delay must be between 0 and 3600000, Batch size must be between 1 and 1000, Default mode must be one of: instant, perChar, total, Log level must reflect environment settings, Production logs must be performant and minimal, Min duration must be less than max duration, Duration values must be positive integers, Smooth movement flag must be boolean, RECORDER_MOVE_INTERVAL_MS must be between 20 and 200 ms, RECORDER_MAX_SCREENSHOT_SIZE must be between 10KB and 10MB, RECORDER_INCLUDE_SCREENSHOT must be an implicit boolean, Clipboard content must not exceed 1 MB, Content cannot be empty for copy operation, Text input must not be empty or contain only control characters, Key presses must be from a predefined supported set, Key combinations must have between 1 and 5 keys and only use allowed modifiers and letters, Timing values must be non-negative integers and not exceed 300000ms, Non-printable keys must be filtered, Typed text must not contain dangerous control characters, Max typing length is 10,000 characters, Max allowed delay is 300,000ms (5 minutes), Key combinations support up to 5 keys, Strict validation of coordinates within screen bounds, Correct and sequential emission of mouse events, Reliable execution of physical mouse actions, Minimum recognition confidence must be respected, Timeouts for template waits must not be exceeded, Logs must record failures for audit, Singletons for event services must be maintained, Hardware adapters must be isolated for maintainability, Environment variables must be defined and valid, No additional properties allowed in requests, Input data must conform to JSON Schema Draft 7, Text input length between 1 and 10000 characters, Correct and secure route registration, Strict type enforcement, No test files emitted in build, Strict validation of output formats, Consistent error response format, Proper HTTP status codes, No leakage of sensitive error details in production, Request body must strictly conform to defined Zod schemas, Invalid requests must be rejected with HTTP 400, Strict validation of output format schema size, Safe fallback to string response on parsing error, Consistent and formatted response for success and failure, No data loss during transformations, Padronized success and error responses</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript 5.x, Node.js 18.x, JavaScript (ESM)</primary_language>
    <frameworks>Fastify 4.x, Jest 29.x, ESLint, Prettier, TSyringe, Zod, NutJS, LangChain</frameworks>
    <databases>None</databases>
    <external_services>OpenAI API, NutJS, Server-Sent Events (SSE) endpoint, clipboardy, sharp, nanoid, pino, LangChain, LLM APIs</external_services>
    <package_manager>npm, yarn</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Clean Architecture, Modular Architecture, Event-driven Architecture, Dependency Injection, REST API, Schema Validation, DTO Pattern, Service Layer, Singleton, Observer Pattern, Adapter Pattern, Factory Pattern, Configuration Management, Fail-fast, Middleware Pattern, Controller-Service Pattern, Plugin-based Architecture, Strategy Pattern, Rate Limiter, Factory Method, Domain Model, Encapsulation, Declarative Validation, Immutable Configuration</design_pattern>
    <folder_structure>src/, dist/, tests/, config/, domain/, application/services, infrastructure/adapters, interface/controllers, dto/, types/, schemas/, middleware/, logs/, coverage/</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for classes and types, UPPER_SNAKE_CASE for environment variables, kebab-case for files and routes, Suffix Service, Adapter, Controller for service and controller classes, Prefix I for interfaces, DTOs with suffix Request, Files with .ts extension</naming_conventions>
    <module_boundaries>Clear separation between source code, tests, logs, and builds, Separation between linting rules and application code, Separation between mouse, keyboard, clipboard, screen, and recorder modules, Domain does not depend on Application or Infrastructure, Application depends on Domain, Infrastructure depends on Application, Interface depends on Application and Infrastructure, Controllers expose routes and delegate logic to services, Services encapsulate business logic and hardware/system interactions, DTOs and schemas isolate validation and typing, Middleware isolated for authentication and validation, Schemas separated for validation, Dependency injection for decoupling, Singletons for event services, Config isolated in its own module</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb TypeScript Style Guide, ESLint Recommended, Prettier</style_guide>
    <linting_rules>Configured via .eslintrc.js, @typescript-eslint/no-explicit-any: error, @typescript-eslint/no-unused-vars: error with argsIgnorePattern &apos;^_&apos;, @typescript-eslint/no-floating-promises: error, @typescript-eslint/await-thenable: error, ESLint with @typescript-eslint plugin, Strict typing enforcement</linting_rules>
    <formatting>Prettier integration via plugin:prettier/recommended, semi: true, singleQuote: true, trailingComma: all, printWidth: 100, tabWidth: 2, Indentation of 2 spaces</formatting>
    <documentation_style>JSDoc for functions and classes, JSDoc for interfaces and methods, Markdown comments for endpoint descriptions</documentation_style>
    <type_checking>Strict TypeScript (strict mode enabled), Types explicitly defined for parameters and returns, StrictNullChecks, noImplicitAny, TypeScript strict mode via tsconfig base, Zod for runtime validation</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29.x, ts-jest</test_framework>
    <test_structure>tests/unit for unit tests, tests/integration for integration tests, tests/__tests__ for module-specific tests, Coverage stored in coverage/, Test files with .test.ts and .spec.ts suffixes</test_structure>
    <coverage_requirements>Minimum 80% coverage on statements, branches, functions, and lines</coverage_requirements>
    <test_patterns>Arrange-Act-Assert (AAA), Mocks for external dependencies, **/tests/**/*.test.ts, **/tests/**/*.spec.ts</test_patterns>
    <mocking_approach>Jest mocks and spies for isolation, Mocks for clipboardy, pino, nanoid, and external services, Mocks for hardware adapters and event dispatchers, Fixtures for input events</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow with feature, main, and hotfix branches</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Mandatory code review, Automated lint and test checks, Passing CI checks</pr_requirements>
    <ci_cd_pipeline>Build, lint, test, and deploy automated via GitHub Actions, Unit tests, Linting, Deploy</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install &amp;&amp; cp .env.example .env</setup>
    <install>npm install</install>
    <dev>npm run dev, tsc --watch</dev>
    <test>npm test, npm test -- --coverage</test>
    <build>npm run build, tsc</build>
    <lint>npm run lint, eslint . --ext .ts,.tsx</lint>
    <format>npm run format, prettier --write .</format>
  </commands>
  <security_constraints>
    <authentication_method>API key via header &apos;x-api-key&apos;, JWT (externally managed)</authentication_method>
    <authorization_rules>Access restricted to sensitive endpoints with valid API key, Validation of API key on server, Role-based access control on backend</authorization_rules>
    <sensitive_data>API_KEY, OPENAI_API_KEY, Clipboard data (must be handled securely), Environment variables (must not expose sensitive data), Base64 image data (should be protected), User input events (mouse, keyboard)</sensitive_data>
    <security_headers>Content-Type: application/json, Accept: text/event-stream, Header &apos;x-api-key&apos; required, Content-Security-Policy, X-Content-Type-Options, Cache-Control, Strict-Transport-Security</security_headers>
    <encryption_requirements>HTTPS required for secure transport, TLS for external API communication, Environment variables must be protected</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>REST endpoints must respond in under 5000ms, Low latency for real-time SSE events, Automation and API operations should respond in under 200ms, Max delay for operations: 300000ms, Screen capture and recognition must respond within 5 seconds</response_time_limits>
    <optimization_priorities>Efficient resource usage, Low latency for event streaming, Performance-optimized screen capture, Memory usage control to prevent crashes, Validation efficiency to minimize request overhead, Balance between speed and recognition accuracy, Production performance prioritized, development logs human-readable</optimization_priorities>
    <caching_strategy>Circular buffer acts as cache for recent events, Immutable configuration avoids need for dynamic cache, Cache of compiled schemas with configurable TTL</caching_strategy>
    <scalability_considerations>Support for multiple simultaneous SSE connections, Horizontal scalability via Fastify and Node.js cluster, Configurable buffer size for event replay, Modular architecture for horizontal scaling, Stateless adapters for easy horizontal scaling, Heartbeat to keep connections alive</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standard JSON with fields: success, error, code, details, Zod validation error format, Consistent error response format for REST and SSE</error_format>
    <logging_strategy>Structured logging with pino, Log level configurable via LOG_LEVEL, Logs stored in logs/ directory, Sensitive data masked in logs, Debug, info, warn, and error levels</logging_strategy>
    <monitoring_tools>PM2 internal monitoring, Integrable with external systems (e.g., ELK, Datadog, Sentry)</monitoring_tools>
    <error_recovery>Pre-validation and clear responses for input and authentication errors, Graceful shutdown to prevent data loss, Fallback to default values on parsing errors, Retry on transient failures (configurable), Reject invalid requests with HTTP 400 and descriptive message</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>OpenAI API, NutJS, Fastify, TSyringe, Zod, Jest, ESLint, Prettier, clipboardy, sharp, nanoid, pino, LangChain, typescript</critical_dependencies>
    <deprecated_packages>None</deprecated_packages>
    <version_constraints>TypeScript 5.x, Node.js 18+, Fastify 4.x, Zod 3.x, clipboardy &gt;=3.0.0, tsyringe 4.x, Jest &gt;=29, Compatible with JSON Schema Draft 7</version_constraints>
    <internal_packages>src/, domain/interfaces, domain/entities, application/services, infrastructure/adapters, interface/controllers, dto/, types/, schemas/, middleware/</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Lack of advanced error handling and reconnection logic, Need for more comprehensive tests for edge cases, Partial documentation in know-how.txt, Validation of environment variables can be improved, Authentication and authorization not implemented in all endpoints, Replay of events not fully implemented, Fallback and error handling in complex parsing can be improved, Standardization of new custom errors needed</technical_debt>
    <known_issues>Limitations on max outputFormat size for LLM, Dependency on local endpoint and lack of fallback, Possible loss of events if buffer is full, Possible resource leak if SSE connection is not closed properly, Possible silent disconnection if heartbeat fails, Possible overhead in validation of large schemas, Dependency on environment variables may cause failures if not configured, Possible latency in long key combinations, Possible excessive logs in development environment</known_issues>
    <performance_bottlenecks>Type-checking analysis may impact lint performance, Throttling needed for mouse move events in SSE streaming, Image capture and search operations can be costly, Sequential await in per-character typing may cause slowness, Base64 decoding and search can be costly for large images, Parsing and validation of outputFormat may impact performance, High-frequency event streaming may require rate limiting</performance_bottlenecks>
    <migration_status>Stable, no migrations in progress, Project uses modern TypeScript and ES modules, Migration to TypeScript 5.x and Fastify 4.x completed</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Lint rule compliance, Avoidance of any, Correct promise handling, Input validation, Separation of concerns, Proper dependency injection, Logging clarity and error handling, Test coverage, Security and validation, Consistent return types, Performance and security</code_review_focus>
    <documentation_requirements>Clear documentation of endpoints and usage examples, JSDoc for all public methods and interfaces, Documentation of environment variables and their usage, Markdown documentation for endpoints</documentation_requirements>
    <communication_style>Clear and objective comments, Use of &apos;_&apos; prefix for ignored arguments, Technical and concise comments in test scripts, Portuguese for context, English for technical terms</communication_style>
    <decision_log>Adoption of Clean Architecture for maintainability, Use of SSE for real-time streaming and API key for authentication, Use of Fastify for high performance, Use of tsyringe for dependency injection, Use of Zod for declarative validation, Use of clipboardy for cross-platform compatibility, Circular buffer for memory optimization, Singleton for unique event dispatcher and buffer, Strategy Pattern for typing timing flexibility, Factory Method for action creation, Adapter Pattern for decoupling NutJS and LLM integration, Fail-fast validation to avoid invalid runtime configurations, Prettier for code formatting, Conventional Commits for commit messages</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>REST with versioned endpoints (api/v1), Server-Sent Events (SSE) for real-time streaming</api_style>
    <versioning_strategy>Versioning via URL (/api/v1)</versioning_strategy>
    <response_formats>JSON for REST, text/event-stream for SSE, Standardized JSON with success, data, and error fields, Base64 encoded images</response_formats>
    <rate_limiting>Configurable via environment variable INPUT_EVENT_RATE, MaxRate setting for event streaming</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development, staging, production, test, localhost:3000</environments>
    <deployment_method>PM2 process manager, Docker container, CI/CD pipeline, Node.js runtime</deployment_method>
    <environment_variables>NODE_ENV, PORT, HOST, LOG_LEVEL, API_KEY, OPENAI_API_KEY, RECORDER_INCLUDE_SCREENSHOT, RECORDER_MOVE_INTERVAL_MS, RECORDER_MAX_SCREENSHOT_SIZE, INPUT_EVENT_BUFFER, INPUT_EVENT_RATE, INPUT_EVENT_HEARTBEAT, INPUT_EVENT_MAX_AGE, KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, KEYBOARD_MAX_DELAY, KEYBOARD_BATCH_SIZE, MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_DEFAULT_SMOOTH, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, LLM_API_KEY, LLM_SERVICE_ENDPOINT, CACHE_TTL, ENABLE_CACHE, OUTPUT_SCHEMA_MAX_SIZE, OUTPUT_SCHEMA_MAX_DEPTH, OUTPUT_SCHEMA_PARSE_TIMEOUT</environment_variables>
    <infrastructure_constraints>Need to keep SSE connections open and stable, Accessibility permissions required on macOS, DISPLAY variable on Linux, Memory limit of 1GB for automatic restart, Cross-platform support (Windows, Linux, macOS), Server SSE must be available and stable, Proper configuration of environment variables required, Access to system APIs for mouse, keyboard, clipboard, and screen automation, Singleton may limit scalability without additional strategies, Batch size and buffer size for memory control</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/application/dto/llm-request.dto.ts</path>
        <name>llm-request.dto.ts</name>
        <summary>Este arquivo define um schema de validação para requisições a um modelo de linguagem (LLM) utilizando a biblioteca Zod, garantindo que os dados de entrada estejam conformes com os parâmetros esperados para chamadas a APIs de modelos GPT. Ele especifica propriedades essenciais como prompt, modelo, temperatura, limite de tokens, prompt do sistema e formato de saída, assegurando tipos e restrições para cada campo. A funcionalidade principal é validar e tipar as requisições para evitar erros de entrada e facilitar a integração com serviços de LLM, promovendo robustez e consistência no fluxo de dados entre o front-end e o back-end ou serviços externos.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>LLM Request Validation Module</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Inteligência Artificial, Modelos de Linguagem, APIs GPT</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Validação rigorosa dos parâmetros de entrada para evitar chamadas inválidas à API GPT</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>OpenAI GPT APIs</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Schema Validation, Modular Design</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>dto - Data Transfer Objects e schemas de validação</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para tipos e schemas, kebab-case para arquivos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre schemas de validação e lógica de negócio</values>
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
            <values>Testes localizados em pasta __tests__ ao lado dos arquivos de schema</values>
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
            <values>Mocks para schemas externos e validação de erros</values>
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
            <values>OAuth2 via token para API GPT</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de acesso baseado em roles no backend</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Tokens de API e prompts sensíveis devem ser protegidos</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>CORS, CSP e outros headers padrão de segurança</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>TLS para comunicação com APIs externas</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Resposta em até 2 segundos para validação local</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência e validação eficiente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Nenhum cache aplicado neste módulo</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade horizontal via stateless validation</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros padronizados via ZodError com mensagens claras</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs de erros críticos para monitoramento</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Sentry para captura de erros em produção</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Fallback para mensagens de erro amigáveis ao usuário</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>zod, outputFormatSchema</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>zod &gt;=3.0.0 &lt;4.0.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./output-format.dto.js</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Necessidade de manter schemas sincronizados com APIs externas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Limites de tokens podem variar conforme modelo GPT</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Migração para TypeScript 5.0 concluída</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tipos e cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara dos schemas e exemplos de uso</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e PRs detalhados</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Zod para validação por simplicidade e robustez</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Versionamento semântico via URL e headers</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Rate limiting aplicado pela API GPT externa</values>
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
            <values>OPENAI_API_KEY, NODE_ENV</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limite de memória para containers de 512MB</values>
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
        <path>src/config/langchain.config.ts</path>
        <name>langchain.config.ts</name>
        <summary>O arquivo LangChainConfig define uma configuração centralizada para parâmetros de modelos de linguagem utilizados em uma aplicação, incluindo valores padrão para temperatura, tokens máximos, timeout e tentativas de requisição. Ele especifica características técnicas e econômicas de diferentes modelos GPT, como limites de tokens e custo por token, permitindo que o sistema ajuste dinamicamente o uso dos modelos conforme restrições e custos. Essa configuração suporta a integração eficiente com APIs de modelos de linguagem, facilitando controle de recursos e otimização de custos em processos de geração de texto automatizada.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>LangChainConfig, Configuração centralizada para modelos GPT</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Inteligência Artificial, Natural Language Processing, Modelos de linguagem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Respeitar limites de tokens por modelo, Controlar custo por token para otimização financeira, Timeout máximo para requisições</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>OpenAI API, LangChain</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Immutable Configuration, Modular Design</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Configuração centralizada em arquivo único para fácil manutenção e extensão</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para constantes e tipos, PascalCase para tipos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Configuração isolada para ser importada por módulos de lógica de negócio e integração</values>
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
            <values>Prettier</values>
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
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Timeout configurado em 30000 ms (30 segundos) para requisições</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Balancear custo por token e capacidade de geração de texto</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Número de retries configurado para 3 tentativas em caso de falha</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>OpenAI API, LangChain</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/domain/entities/llm-response.ts</path>
        <name>llm-response.ts</name>
        <summary>Este arquivo define uma interface TypeScript chamada LLMResponse, que modela a estrutura de dados esperada para respostas de um Large Language Model (LLM). A interface especifica propriedades essenciais como o conteúdo textual da resposta, o modelo utilizado, e opcionalmente informações de uso de tokens e o motivo de finalização da geração. Funcionalmente, o código serve para garantir tipagem forte e padronização na manipulação das respostas do LLM, facilitando a integração e o controle de recursos consumidos durante a geração de texto. Não há transformações ou efeitos colaterais diretos, pois trata-se apenas de uma definição de tipo, mas habilita práticas robustas de desenvolvimento e manutenção em sistemas que consomem APIs de modelos de linguagem.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>LLM Response Handler, Interface para padronização de respostas de modelos de linguagem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Inteligência Artificial, Natural Language Processing, APIs de modelos de linguagem</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir integridade dos dados de resposta, Manter compatibilidade com versões do modelo</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>OpenAI API, Outros provedores de LLM</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Interface Segregation, Data Contract</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/interfaces - definição de tipos e contratos de dados</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para interfaces, camelCase para propriedades</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Interfaces isoladas para desacoplamento e reutilização</values>
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
            <values>JSDoc para interfaces e propriedades</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/infrastructure/adapters/langchain/langchain-llm.adapter.ts</path>
        <name>langchain-llm.adapter.ts</name>
        <summary>Este arquivo implementa um adapter para integração com modelos de linguagem da OpenAI via LangChain, encapsulando a geração de completions baseadas em prompts fornecidos. Seu comportamento central consiste em receber uma requisição contendo parâmetros como modelo, temperatura e prompts, construir mensagens formatadas para o modelo, invocar a API do ChatOpenAI e retornar uma resposta estruturada com conteúdo gerado e metadados de uso. O código também realiza logging detalhado para monitoramento e tratamento de erros, garantindo robustez na comunicação com o serviço externo. Essa implementação habilita a aplicação a consumir capacidades avançadas de NLP de forma desacoplada e configurável, facilitando a extensão e manutenção do sistema.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>LangChain LLM Integration Adapter</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Natural Language Processing, AI Integration, OpenAI API</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir segurança da chave API, Manter integridade das respostas do modelo, Registrar logs de sucesso e falha</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>LangChain, tsyringe 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>OpenAI API</values>
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
            <values>application/dto para DTOs, domain/entities para entidades de domínio, config para configurações, adapters para integração com serviços externos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes, camelCase para métodos e variáveis, Interfaces prefixadas com I</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre domínio, aplicação e infraestrutura, Dependências unidirecionais</values>
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
            <values>Mocks para chamadas externas e APIs</values>
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
            <values>API Key (OpenAI)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de acesso via roles no sistema principal</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Chave API OpenAI deve ser protegida e não exposta</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Headers padrão de segurança HTTP aplicados no gateway</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>TLS para comunicação externa</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Timeout configurado via LangChainConfig.timeout</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Balancear latência da API com retries para confiabilidade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Nenhum cache implementado neste adapter</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Adapter stateless para fácil escalabilidade horizontal</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erro lançado com mensagem detalhada em caso de falha</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs estruturados com pino, níveis info e error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Integrado a sistema de logs centralizados (ex: ELK)</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Retries configurados via LangChainConfig.retries</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@langchain/openai, pino, tsyringe</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com versões recentes do TypeScript e LangChain</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/dto, domain/entities, config</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Tratamento de erros pode ser mais granular</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência da estabilidade da API OpenAI</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Latência da API externa pode impactar tempo de resposta</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, cobertura de testes, clareza do logging</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do Adapter para desacoplar integração com LLM</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST (indireto via OpenAI API)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Versionamento gerenciado externamente pela OpenAI</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON com conteúdo textual e metadados de uso</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Gerenciado pela OpenAI, não tratado localmente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker containerizado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>OPENAI_API_KEY</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações de timeout e conexões externas</values>
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
        <summary>Este arquivo define um JSON Schema para validação de requisições destinadas a chamadas de modelos de linguagem (LLM) da OpenAI, como GPT-3.5 e GPT-4. Ele especifica a estrutura esperada do objeto de entrada, incluindo propriedades obrigatórias como &apos;prompt&apos; e &apos;model&apos;, além de parâmetros opcionais para controle do comportamento do modelo, como &apos;temperature&apos; e &apos;maxTokens&apos;. O schema também permite a definição detalhada do formato de saída esperado, suportando tipos primitivos e compostos, com validação de propriedades internas, garantindo robustez e flexibilidade na integração com sistemas que consomem APIs de LLM. Essa definição facilita a padronização, validação e documentação das requisições, assegurando conformidade e previsibilidade no processamento das chamadas ao modelo.</summary>
        <properties>
          <property>
            <name>prompt</name>
            <subProperty>type</subProperty>
            <values>string</values>
          </property>
          <property>
            <name>prompt</name>
            <subProperty>minLength</subProperty>
            <values>1</values>
          </property>
          <property>
            <name>model</name>
            <subProperty>type</subProperty>
            <values>string</values>
          </property>
          <property>
            <name>model</name>
            <subProperty>enum</subProperty>
            <values>gpt-3.5-turbo, gpt-4, gpt-4-turbo, gpt-4o, gpt-4o-mini</values>
          </property>
          <property>
            <name>temperature</name>
            <subProperty>type</subProperty>
            <values>number</values>
          </property>
          <property>
            <name>temperature</name>
            <subProperty>minimum</subProperty>
            <values>0</values>
          </property>
          <property>
            <name>temperature</name>
            <subProperty>maximum</subProperty>
            <values>2</values>
          </property>
          <property>
            <name>temperature</name>
            <subProperty>default</subProperty>
            <values>0.7</values>
          </property>
          <property>
            <name>maxTokens</name>
            <subProperty>type</subProperty>
            <values>integer</values>
          </property>
          <property>
            <name>maxTokens</name>
            <subProperty>minimum</subProperty>
            <values>1</values>
          </property>
          <property>
            <name>maxTokens</name>
            <subProperty>maximum</subProperty>
            <values>4096</values>
          </property>
          <property>
            <name>maxTokens</name>
            <subProperty>default</subProperty>
            <values>1000</values>
          </property>
          <property>
            <name>systemPrompt</name>
            <subProperty>type</subProperty>
            <values>string</values>
          </property>
          <property>
            <name>outputFormat</name>
            <subProperty>type</subProperty>
            <values>object</values>
          </property>
          <property>
            <name>outputFormat</name>
            <subProperty>properties.type.enum</subProperty>
            <values>object, array, string, number, boolean</values>
          </property>
          <property>
            <name>outputFormat</name>
            <subProperty>required</subProperty>
            <values>type</values>
          </property>
        </properties>
      </file>
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Verifique todo o código que está em staged no git, ok? Esse código é o que você acabou de fazer. Analise todo esse código e ajuste para que ele passe no Lint, no ESLint, no Prettier e no Jest, garantindo que não haja nenhuma falha em nenhum deles. Basicamente, você precisa garantir que o código passe no pre-commit do Husky. Então, faça todos os ajustes necessários.

Além disso, aproveite para adicionar mais variantes de todos os endpoints no nosso arquivo do Postman. Inclua mais exemplos de variantes para cada endpoint, porque atualmente não está bem documentado quais valores podem ser utilizados. Preciso que você coloque mais exemplos de variantes para os mesmos endpoints.

Último plano: O plano detalha perguntas e respostas que cobrem ajustes de estilo, testes, configuração de CI, geração e validação de mocks, bem como atualização do Postman Collection para incluir múltiplos exemplos por rota.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Precisamos alinhar o código à toolchain: ESLint (Airbnb+TS), Prettier, Jest e Husky. Criaremos um script fix:lint em package.json, rodaremos eslint --fix sobre src/**/*.ts, ajustaremos tsconfig ("moduleResolution":"node16") e revisaremos imports duplicados. Alteraremos configs em .eslintrc.js para parserOptions.project, atualizaremos .prettierrc para printWidth 100, e garantiremos que husky/pre-commit execute "npm run lint && npm test --passWithNoTests" sem erros.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Adicionaremos directory .postman/collections com file nutjs-api.postman_collection.json. Dentro, cada item terá "event" com script pré‐req e trio de exemplos (happy, edge, invalid). Persistiremos variantes como exemplos Postman ("request","response") para GET /health, POST /llm, SSE /events, etc. Usaremos JSON schema conforme src/interface/schemas para gerar exemplos via script scripts/generate-postman-examples.ts que salva no mesmo diretório.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: Integraremos lint e test no pipeline GitHub Actions (ci.yml). No job test, steps: npm ci, npm run lint, npm run test. Ajustaremos jest.config.ts para roots ['<rootDir>/src','<rootDir>/tests'] e transform ESM via ts-jest. Em src/application/services/llm.service.ts removeremos console.log, usaremos logger.info. No adapter langchain-llm.adapter.ts aplicaremos export default class para consistência e ajustaremos import type para interfaces.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: Cobrir edge cases: jest tests para 1) request sem prompt, 2) temperatura fora de range, 3) parsing timeout, 4) SSE reconnection após 204. Adicionaremos custom errors ValidationError e TimeoutError em src/domain/errors. Controllers capturarão e mapearão para 400/504. Postman incluirá exemplos invalid-* exibindo mensagens "temperature must be between 0 and 2" e "schema size exceeds OUTPUT_SCHEMA_MAX_SIZE".

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Vamos centralizar flags em src/config/tooling.config.ts exportando interfaces ToolingConfig { strict: boolean; autofix: boolean; jestCoverage: number }. Carregar padrão via dotenv-expand (.env). Husky passará env HUSKY_FLAG=strict. Futuramente poderemos alternar padrões (por ex. printWidth) sem modificar script, bastando alterar config ou variável CLI.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Aplicaremos Factory Pattern para gerador de exemplos Postman: ExampleFactory cria ExampleBuilder<T>. Observer Pattern no watcher src/scripts/watch-staged.ts que usa chokidar para disparar lint/test onSave. Arquitetura: tools/ (factories, builders), scripts/ (cli), config/ (tooling). Services não dependem de scripts. Flow: git add → husky/pre-commit → lintFixService → TestRunner → ExampleSyncService → commit.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Lint e testes rodarão em execução paralela: eslint --max-warnings=0 -c .eslintrc.js . && jest --runInBand=false. Cache de Jest habilitado ("cache": true) e diretório .jest-cache ignorado no repo. Scripts Postman gerados incrementalmente; ExampleFactory calcula hash SHA256 do schema para evitar regravação (O(1) lookup). CI usará actions/cache para ~/.npm e jest cache, reduzindo build <60s em média.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: ESLint plugins @typescript-eslint/security e eslint-plugin-sonarjs ativados; regras no security.js extendidas. Secrets detectadas via git-secrets, adicionado ao pre-commit. Postman examples mascaram apiKey ("<API_KEY>"). Headers de exemplos incluem Content-Security-Policy e x-api-key. CI bloqueia push de arquivos contendo OPENAI_API_KEY pattern usando secretlint.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Criar tests: tests/lint/lint.spec.ts executa ESLint API programaticamente e espera 0 errors. tests/postman/example-factory.spec.ts usa fs-extra e aispath-to create tmp collection, verifica número de exemplos >=3 por endpoint. Coverage target 85%; jest config collectCoverageFrom ['src/**/*.ts','!src/scripts/**/*.ts']. Mocks via jest.mock('openai') e fixtures JSON em tests/fixtures.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) npm run lint => exit 0. 2) npm test => all pass, coverage ≥85%. 3) Prettier --check . => no differences. 4) git commit via Husky em branch feature/* sem abortar. 5) Generated Postman collection contém ≥3 exemplos cada. 6) GitHub Actions main passes. 7) Manual import Postman shows working examples. Após tudo, PR aprovado e tag vX.Y.Z criada.
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