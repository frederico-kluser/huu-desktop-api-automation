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
    <name>NutJS Desktop Automation API – Web/Desktop Automation, Input Event Streaming, and LLM Integration</name>
    <domain>Desktop Automation, Web/Mobile/Desktop, Input Automation, Clipboard Management, Screen Capture, Keyboard and Mouse Control, AI Integration, Large Language Models, Natural Language Processing, Backend API, RESTful API, Test Automation, UI Automation, Event Streaming (SSE), Command Execution, Validation, Security, Observability, Logging, DevOps, Status Monitoring</domain>
    <current_phase>Development, Production, Maintenance, Stable Configuration, Testing Automation, MVP, Debugging</current_phase>
    <critical_business_rules>Autenticação obrigatória via api key para acesso aos endpoints, Proteção das chaves de api, Configuração correta do ambiente para evitar falhas, Validação rigorosa dos parâmetros de entrada para evitar comandos inválidos, Limites de tempo e tamanho para operações de digitação e captura, Garantia de resposta em tempo hábil (menos de 5 segundos para a maioria das operações), Manter integridade dos testes automatizados, Garantir integridade do código versionado, Manter repositório limpo de arquivos temporários e sensíveis, Garantir execução correta dos comandos de automação, Manter integridade e segurança das operações de controle do mouse, Validação rigorosa dos dados de entrada, Disponibilidade contínua da api, Limite de uso de memória para evitar crashes, Integridade das ações de automação, Segurança no acesso ao clipboard, api deve garantir segurança no controle remoto da automação, Manter integridade do sistema operacional durante automação, Garantia de valores default para parâmetros opcionais, Content size must not exceed 1 MB, Text input must not be empty or contain only control characters, Key presses must be from a predefined supported set, Key combinations must have between 1 and 5 keys and only use allowed modifiers and letters, Timing values must be non-negative integers and not exceed 300000ms, Operações devem retornar resultados padronizados, Tratamento robusto de erros, Manter ordem cronológica dos eventos, Garantir replay correto após reconexão, Rate limiting para evitar sobrecarga, Garantir entrega de eventos para todos os listeners, Filtragem de teclas não imprimíveis, Limite máximo de 10.000 caracteres para digitação, Delay máximo permitido de 300.000ms (5 minutos), Validação rigorosa de coordenadas dentro dos limites da tela, Emissão correta e sequencial de eventos de mouse, Execução confiável das ações físicas do mouse, Precisão mínima de reconhecimento (confidence) deve ser respeitada, Timeouts para espera de templates não devem ser ultrapassados, Logs devem registrar falhas para auditoria, Registro único de singletons para serviços de eventos, Consistência na injeção de dependências, Variáveis de ambiente devem estar definidas para evitar falhas, Chaves de api não devem ser expostas em código fonte, Ambiente deve ser corretamente identificado para habilitar comportamentos específicos, bufferSize deve estar entre 1 e 100000, heartbeatMs deve estar entre 1000 e 300000 ms, maxRate deve estar entre 1 e 50000 eventos/s, maxEventAge deve estar entre 1000 e 3600000 ms, maxTextLength must be between 1 and 100000, defaultDelayPerChar must be non-negative, maxDelay must be between 0 and 3600000, batchSize must be between 1 and 1000, defaultMode must be one of: instant, perChar, total, Log level must reflect environment settings, Development logs must be human-readable, Production logs must be performant and minimal, minDuration must be less than maxDuration, Duration values must be positive integers, Smooth movement flag must be boolean, Garantir resposta consistente para sucesso e falha, Não perder mensagens de erro, Precisão na posição do cursor, Execução correta da sequência de eventos, Respeito aos tipos de botões e opções, Regiões devem ser definidas com coordenadas válidas, Confiança deve ser considerada para decisões automatizadas, Serviços de automação devem implementar contratos definidos, Execução de comandos deve ser consistente e rastreável, api versioning deve ser respeitada, Rotas /api protegidas contra conflito com SPA, Shutdown gracioso para evitar perda de dados, Garantir digitação instantânea sem delays, Suporte apenas a teclas mapeadas, Tratamento robusto de erros para operações de teclado, Movimentação precisa do cursor, Execução correta de cliques e arrastos, Configuração dinâmica da velocidade do mouse, Captura precisa e confiável da tela, Conversão correta e eficiente para PNG, Logging detalhado para auditoria, Autenticação obrigatória para streaming de posição do mouse, Validação rigorosa de schemas JSON para todas as requisições, Garantia de resposta consistente com status de sucesso, Garantir entrega ordenada e completa dos eventos, Manter conexões SSE ativas com heartbeat, Preservar integridade do buffer de eventos para replay, Garantir que operações de teclado e clipboard sejam executadas com sucesso ou retornem erros claros, Validar rigorosamente os dados de entrada para evitar comandos inválidos, Manter integridade e segurança dos dados manipulados no clipboard, Requisições devem conter api key válida, Falha na autenticação bloqueia acesso, Consistent error response format, Proper HTTP status codes, No leakage of sensitive error details in production, request body must strictly conform to defined Zod schemas, Invalid requests must be rejected with HTTP 400, Proibição de propriedades adicionais não definidas, Garantia de valores dentro dos limites especificados, Content must be a non-empty string, No additional properties allowed in requests, Input data must conform to JSON Schema Draft 7, Text input length between 1 and 10000 characters, Registro correto e consistente das rotas, Disponibilidade das APIs de automação, Segurança no acesso às rotas, Garantir entrega em tempo real dos eventos via SSE, Manter integridade e consistência do buffer de eventos, Respeitar limites de idade máxima para eventos armazenados, Garantir que comandos de mouse sejam enviados e recebidos corretamente, Não causar efeitos colaterais inesperados no sistema alvo, Garantir integridade e precisão dos dados de input, Diferenciar corretamente eventos de mouse e teclado, Manter sincronização temporal dos eventos, Garantir unicidade do id do evento, Manter ordem temporal dos eventos, Precisão na captura das coordenadas do cursor, Cobertura mínima de testes 80%, Padrões de nomenclatura *.test.tsx, Documentação contínua no know-how.txt, api must return valid base64 image data, Saved file must be a valid PNG, Errors must abort process, Isolamento completo dos testes, Consistência dos mocks, Ambiente de testes controlado, Não emitir arquivos durante compilação (noEmit: true), Excluir node_modules da compilação, Garantir tipagem estrita, Separação clara entre src e dist, Exclusão de testes do build, Excluir arquivos de teste da compilação, Remover comentários no output, Não gerar source maps em produção, Validação rigorosa dos parâmetros de entrada para evitar chamadas inválidas ao LLM, Respeito aos limites de tokens e temperatura, Validação rigorosa de formatos de saída, Garantia de resposta consistente e formatada, Fallback seguro em caso de erro no parsing, Manter limites de maxTokens por modelo, Respeitar custo por token para controle financeiro, Timeout e retries configurados para evitar falhas silenciosas, Garantir integridade dos dados de resposta, Manter compatibilidade com versões do modelo, Garantir resposta consistente do LLM, Manter segurança das chaves api, Registrar logs de uso e erros, Validação rigorosa do input, Autenticação obrigatória via x-api-key, Limite máximo para tamanho do outputFormat, Respeito aos limites de tokens e temperatura para controle de custo e performance, Registro correto e único de dependências no container, Isolamento de serviços para evitar efeitos colaterais, Registro correto e sequencial das rotas, Propagação adequada de erros, Isolamento dos controllers, Validação estrita do formato JSON de saída, Prevenção de prototype pollution, Controle de profundidade de esquemas para evitar recursão infinita, Validação estrita dos dados conforme esquema, Cache de esquemas deve respeitar TTL para evitar dados obsoletos, Garantir compatibilidade entre formatos legado e dinâmico, Padronizar respostas de sucesso e erro, Evitar perda de dados em transformações, Garantir integridade e formato correto da resposta do LLM, Tratar erros do modelo sem falhas silenciosas, Limitar tamanho e profundidade do schema de saída, Mapeamento correto entre modelo e provedor, Consistência na enumeração de modelos, api key must be valid and kept secret, Service endpoint must respond within acceptable time, Payload format must comply with api specification, Resposta válida do modelo deve conter dados no formato esperado, Testes devem validar múltiplos modelos para cobertura funcional, Suporte correto a todas as teclas mapeadas, Tratamento robusto de erros para evitar falhas silenciosas, Execução correta da ordem de pressionar e liberar em combinações, Reliable input simulation, Consistent clipboard state, Graceful error handling, Captura precisa e em tempo real dos eventos globais de mouse e teclado, Encerramento gracioso para evitar vazamento de recursos, Captura precisa e confiável de eventos de input, Tratamento correto de erros para evitar crashes, Garantir inicialização correta do GlobalInputCaptureService, Registrar falhas críticas de inicialização, Parar serviços de captura de eventos de forma segura, Não perder eventos de input relevantes, Evitar sobrecarga por excesso de eventos, Garantir compatibilidade multiplataforma, especialmente macOS, Ensure reliable start and stop of event capture, Avoid resource leaks on shutdown, Garantir rate limiting configurável para evitar sobrecarga, Manter singleton para consistência do dispatcher, Listeners devem ser gerenciados corretamente para evitar leaks, Disponibilidade da interface para interação com api, Carregamento correto dos recursos externos, Precisão na captura de tela, Sincronização entre controle de mouse e teclado, Exibição correta do status do sistema, Atualização assíncrona confiável do status, Navegação segura para documentação externa, render root component only once, Ensure DOM element with id &apos;root&apos; exists, Consistência visual, Responsividade em múltiplos dispositivos, Interatividade fluida em botões, Consistência visual entre navegadores, Suporte a layouts responsivos, Manter tipagem estrita, Garantir compatibilidade JSX, Excluir node_modules e dist do build, Build consistency, Hot-reloading enabled for dev, Output directory cleaned before build, Garantir controle seguro da automação desktop via web, Manter compatibilidade com api NutJS, Exibir status correto da api, Não permitir múltiplas checagens simultâneas, Atualizar status em tempo real, cache TTL de 60 segundos para status, timeout de requisição em 5 segundos, manter integridade do cache localStorage, Status accuracy must never be compromised, Latency measurement must be precise, Build output must be cache-busted, Dev server proxy must route api calls correctly, endpoint de status deve estar sempre disponível, Resposta deve conter latência e timestamp atual</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript 5.x, Node.js 18+, JavaScript (ES2020+), React 18.x, HTML5, CSS3</primary_language>
    <frameworks>Fastify 4.x, React 18.x, Jest 29.x, Webpack 5.x, PM2 5, TSyringe, Zod 3.x, LangChain 0.x, Express.js, NutJS, uiohook-napi, React-Bootstrap 2.x, Bootstrap 5.3.2, dotenv 16.x, pino 8.x</frameworks>
    <databases>PostgreSQL 15, Redis 7.0, None</databases>
    <external_services>OpenAI API, DeepSeek API, NutJS, clipboardy, sharp, LangChain LLM API, SSE clients, nanoid, @nut-tree-fork/nut-js, pino, Server-Sent Events (SSE), GitHub (external documentation), NutJS Desktop Automation API, Local backend API (http://localhost:3000/api), Environment variables</external_services>
    <package_manager>npm, yarn</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Clean Architecture, Dependency Injection, Modular Architecture, RESTful API, Event-driven (SSE for streaming), Singleton, Adapter Pattern, Factory Pattern, Observer Pattern, Service Layer, DTO Pattern, Schema Validation, Plugin Architecture, Component-Based Architecture (frontend), Responsive Web Design</design_pattern>
    <folder_structure>src/ (main source code), dist/ (build output), web/ (frontend), tests/ (unit and integration tests), config/ (configuration and logger), domain/ (entities and interfaces), application/services (business logic and services), infrastructure/adapters (external integrations), interface/controllers (controllers and middleware), schemas/ (validation schemas), types/ (shared types), public/ (static assets and HTML template), node_modules/ (dependencies), coverage/ (test coverage), logs/ (log files)</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for classes and types, kebab-case for files and folders, UPPER_SNAKE_CASE for environment variables and constants, Interfaces prefixed with &apos;I&apos;, Suffix &apos;Service&apos; for service classes, Suffix &apos;request&apos; for DTOs, CamelCase for enums, PascalCase for React components</naming_conventions>
    <module_boundaries>Clear separation between backend (api) and frontend (React), Domain does not depend on Application or Infrastructure, Application depends on Domain, Infrastructure depends on Application, Interface depends on Application and Infrastructure, Separation between controllers, services, and infrastructure, Dependency injection for decoupling, Separation between validation (schemas) and business logic, Isolated configuration modules, Isolated DTOs and validation schemas, Controllers expose routes and delegate to services, Services encapsulate business logic and hardware/system interactions, Types and interfaces separated from logic, Isolated error handling, Frontend components isolated from business logic</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript/TypeScript Style Guide, ESLint Recommended, Prettier, TypeScript ESLint Recommended, CSS Standard Practices, JSDoc for documentation</style_guide>
    <linting_rules>ESLint with @typescript-eslint plugin, eslint-config-prettier, eslint-plugin-prettier, @typescript-eslint/no-explicit-any: error, @typescript-eslint/no-unused-vars: error with argsIgnorePattern &apos;^_&apos;, @typescript-eslint/no-floating-promises: error, no-async-promise-executor: error, no-await-in-loop: warn, strict typing, Regras para evitar any e garantir tipagem forte</linting_rules>
    <formatting>Prettier with default config, prettier --write ., semi: true, trailingComma: all, singleQuote: true, printWidth: 100, tabWidth: 2, Integration with ESLint for consistent formatting</formatting>
    <documentation_style>JSDoc for functions and classes, JSDoc for public methods and interfaces, Markdown comments for endpoint descriptions, Inline comments in Portuguese for context</documentation_style>
    <type_checking>TypeScript strict mode enabled, StrictNullChecks, noImplicitAny, Strict TypeScript with explicit types for parameters and returns, Zod for runtime validation, TypeScript typings for payloads and responses</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29.x, ts-jest, React Testing Library, Postman Tests (JavaScript)</test_framework>
    <test_structure>tests/ for unit and integration tests, tests/unit for unit tests, tests/integration for integration tests, tests/components/ for UI components, tests/hooks/ for custom hooks, __tests__ folders adjacent to code</test_structure>
    <coverage_requirements>Minimum 80% coverage, branches &gt;= 80%, functions &gt;= 80%, lines &gt;= 80%, statements &gt;= 80%</coverage_requirements>
    <test_patterns>AAA (Arrange, Act, Assert), Given-When-Then, Mocks for external dependencies, Direct API call and response validation, Snapshot testing for UI, **/__tests__/**/*.test.ts, **/tests/**/*.test.ts, **/tests/**/*.spec.ts</test_patterns>
    <mocking_approach>Mocks and spies via Jest, jest.mock for external dependencies, Mocks for clipboardy, pino, nanoid, Mocks for services and adapters, Mocks for FastifyRequest and FastifyReply, Mocks for React components and external modules, Mocks for hooks and async calls, Mocks for APIs and child components</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review obrigatório, Revisão obrigatória e testes aprovados, Checks automáticos de lint e testes, Passing CI checks</pr_requirements>
    <ci_cd_pipeline>Build, lint, test, Deploy automatizados via GitHub Actions, Unit tests, Deploy automático para staging, Build, test, Lint, Deploy stages</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install, cp .env.example .env, npm install &amp;&amp; npm run build, npm install uiohook-napi</setup>
    <install>npm install, npm ci</install>
    <dev>npm run dev, npm run dev:web, npm run dev:full, npm start, webpack serve --config webpack.config.js</dev>
    <test>npm test, npm run test, npm run test:unit, npm run test:integration, npm run test:coverage, npm test -- --coverage</test>
    <build>npm run build, npm run build:web, npm run build:prod, tsc, webpack --config webpack.config.js</build>
    <lint>npm run lint, eslint . --ext .ts,.tsx, npm run lint:fix</lint>
    <format>npm run format, prettier --write ., npm run format:check</format>
  </commands>
  <security_constraints>
    <authentication_method>api Key via HTTP Header, JWT, api Keys for external services</authentication_method>
    <authorization_rules>Role-based Access Control (RBAC), Acesso restrito a usuários com chave válida, Controle de acesso via middleware Fastify, Requisição deve conter api key válida para acesso</authorization_rules>
    <sensitive_data>api Keys para OpenAI e DeepSeek, Tokens JWT, Clipboard data, Environment variables, User input event data (mouse, keyboard), Prompt e respostas do LLM, Base64 image data</sensitive_data>
    <security_headers>Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, Content-type: application/json, x-api-key</security_headers>
    <encryption_requirements>TLS para comunicação, Uso de HTTPS para comunicação com APIs externas, Criptografia em trânsito via HTTPS, Hashing bcrypt para senhas</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>api responses &lt; 200ms, Respostas em menos de 5000ms para operações padrão, Baixa latência para operações de automação e api REST, Delay máximo configurável até 300.000ms (5 minutos), Operações de captura e busca devem responder em até 5 segundos, Baixa latência para streaming SSE, Resposta imediata para autenticação, &lt; 100ms, Timeout de 5 segundos para requisição de status</response_time_limits>
    <optimization_priorities>Velocidade de build e testes, Velocidade de resposta priorizada sobre uso de memória, Controle de memória para evitar crashes, Validação eficiente para evitar overhead em runtime, Baixa latência e uso eficiente de memória, Performance otimizada em produção, Logging configurável para desenvolvimento e produção, Redução do tamanho do bundle, Responsividade e fluidez visual em múltiplos dispositivos</optimization_priorities>
    <caching_strategy>Cache Redis com TTL configurado para dados estáticos, Buffer circular atua como cache de eventos recentes, Configuração carregada uma única vez na inicialização, Cache localStorage com TTL de 60 segundos, Cache de esquemas compilados com TTL configurável, Filename hashing for cache invalidation</caching_strategy>
    <scalability_considerations>Arquitetura escalável horizontalmente via containers, Suporte a múltiplas requisições simultâneas, Streaming SSE para dados em tempo real, Escalabilidade horizontal via Fastify e Node.js cluster, Configuração centralizada facilita escalabilidade horizontal, Suporte para múltiplos ambientes (desktop e web), Batch size configurável para escalabilidade no processamento, Suporte a múltiplos clientes SSE simultâneos, Componentes desacoplados facilitam escalabilidade</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>JSON padrão com campos success, error, code e detalhes, Zod validation error format, Objeto CommandResult com success boolean e error string opcional, Logs estruturados via logger configurado, Resposta JSON com campo success e mensagens de erro padronizadas</error_format>
    <logging_strategy>Log level configurável via LOG_LEVEL, Logging estruturado com pino, Logs separados em logs/ e *.log, Níveis debug, info, warn e error para monitoramento detalhado, Mascaramento de dados sensíveis em logs, Formato human-readable em dev</logging_strategy>
    <monitoring_tools>Sentry para monitoramento de erros em produção, PM2 internal monitoring, Integrável com sistemas externos via logs (ex: ELK, Datadog), Logger customizado integrado ao sistema de monitoramento</monitoring_tools>
    <error_recovery>Retries automáticos para falhas temporárias, Fallbacks configurados, Validação prévia para evitar execução de comandos inválidos, Tratamento de erros via middleware Fastify, Shutdown gracioso para evitar falhas abruptas, Recuperação de eventos perdidos via last-event-id, Fallback seguro em caso de erro no parsing, Reject invalid requests with HTTP 400 and descriptive message</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>OpenAI API, DeepSeek API, TypeScript, Jest, Fastify, TSyringe, Zod, clipboardy, @nut-tree-fork/nut-js, pino, LangChain, dotenv, webpack, react, uiohook-napi, sharp, nanoid</critical_dependencies>
    <deprecated_packages>None</deprecated_packages>
    <version_constraints>Node.js &gt;=18, TypeScript 5.x, Fastify 4.x, Zod &gt;=3.x, clipboardy &gt;=3.0.0, tsyringe &gt;=4.0.0, React &gt;=18.0.0, Bootstrap 5.3.2, Font Awesome 6.4.0, Webpack ^5.89.0</version_constraints>
    <internal_packages>@nut-tree-fork/* (nut-js ecosystem), src, web, domain/interfaces, domain/entities, application/services, infrastructure/adapters, interface/controllers, config, dto, types, schemas</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Refatoração de módulos legados em JavaScript para TypeScript, Necessidade de testes mais abrangentes para edge cases do clipboard, Melhorar tratamento de eventos estendidos, Manutenção das estratégias de digitação e eventos pode crescer em complexidade, Tratamento de erros mais granular, Melhorar cobertura de testes, Validação de variáveis de ambiente ainda não implementada, Uso de &apos;as any&apos; pode comprometer segurança de tipos, Falta de validação de parâmetros nas classes, interface ainda sem métodos definidos pode levar a inconsistências, Implementação incompleta dos métodos find e waitFor, Necessidade de testes mais abrangentes para streaming SSE, Autenticação e autorização não implementadas, Monitoramento e alertas não integrados, Uso de any para logger pode ser melhorado para tipagem forte, Autenticação baseada em chave estática pode ser melhorada, Necessidade de padronizar novos erros customizados, Validação de tamanho máximo do conteúdo não implementada no schema, Falta de tratamento explícito de erros no registro de rotas, Ausência de testes automatizados formais e validação de respostas, Ausência de validação runtime dos eventos, Necessidade de maior detalhamento em testes unitários, Documentação parcial em know-how.txt, Necessidade de melhorar fallback e tratamento de erros em parsing complexo, Tratamento de erros genérico pode ser refinado, Suporte limitado a uma única estratégia de parsing, Manutenção da retrocompatibilidade pode aumentar complexidade, Necessidade de testes de integração com LLM real, api key exposta no código, Falta de tratamento detalhado de erros, Chave api exposta no código, Manutenção do mapeamento de teclas e suporte a novas teclas, Ausência de testes automatizados, Melhorar tratamento assíncrono na parada do serviço, Mapeamento de keycodes pode ser ampliado para maior cobertura, Melhorar tratamento de eventos não-printable, Falta de testes automatizados, Estilos inline podem ser melhor organizados, Falta tratamento explícito de erros na chamada assíncrona, Uso de !important pode dificultar manutenção futura, Falta tratamento explícito de erros na UI, Tratamento limitado de erros de localStorage cheio, Falta de logging detalhado para erros</technical_debt>
    <known_issues>Inconsistências em ambientes de desenvolvimento local, Limitações na manipulação de grandes volumes de texto para digitação, Dependência de permissões específicas do SO, Compatibilidade entre versões de Node.js e dependências nativas, Limitação fixa de 1 MB pode ser insuficiente para alguns casos, Possíveis falhas em sistemas operacionais com restrições de acesso ao clipboard, Possível perda de eventos em buffer cheio, Rate limit pode descartar eventos em picos, Performance pode ser impactada em textos muito longos com delays altos, Dependência da resolução da tela para validação de coordenadas, Dependência da qualidade do adaptador externo para reconhecimento, Dependência de variáveis de ambiente pode causar falhas se não configuradas, Possível falha silenciosa se variáveis de ambiente forem mal formatadas, Valores inválidos em variáveis de ambiente podem causar comportamento inesperado, Possível vazamento de recursos se conexão SSE não for fechada corretamente, Possível desconexão silenciosa se heartbeat falhar, Possível excesso de logs em ambiente de desenvolvimento, Possível aceitação de payloads maiores que 1MB sem validação extra, Ausência de controle explícito de autenticação e autorização, Possível falta de controle de rate limiting, Dependência da disponibilidade da api local, Dependência externa pode causar inconsistências se alterada, Cobertura inicial baixa em alguns módulos, Mocks insuficientes causam falhas intermitentes, Dependência de schemas externos pode causar inconsistências se não sincronizados, Parsing pode exceder timeout em schemas muito grandes, Dependência de chaves api externas sujeitas a expiração, Possível overhead na validação de schemas grandes, Possível mascaramento de erros reais devido a mocks, Possível complexidade em esquemas muito aninhados, Possível falha em esquemas muito profundos ou complexos, Limitação na validação de schemas muito grandes pode impactar performance, Necessidade de manter sincronização entre enum e mapeamento, Dependência de endpoint local limita testes em outros ambientes, Tratamento limitado para erros lançados como tipos não-Error, Necessidade de mocks extensivos para testes isolados, Possível falha na captura se uiohook-napi não inicializar corretamente, macOS Accessibility permissions may block event capture, Possível perda de eventos em picos de alta frequência, Potential platform compatibility issues with uiohook-napi, Rate limiting depende de variável de ambiente, pode ser inválida, Cache pode ser limpo se JSON inválido for detectado, Latência medida não inclui tempo real de rede</known_issues>
    <performance_bottlenecks>Análise de type-checking pode impactar performance do lint, Operações de captura e busca de imagens podem ser custosas, Uso de uma única instância pode limitar throughput, Processamento intensivo de imagens pode impactar performance, Operações lineares em tamanho do buffer para recuperação, Processamento sequencial da fila pode atrasar em alta carga, Uso de await sequencial em digitação por caractere pode causar lentidão, Scroll suave pode causar delays perceptíveis em durações longas, Decodificação base64 e busca podem ser custosas em imagens grandes, Configurações incorretas podem impactar throughput e latência, Configurações incorretas podem impactar performance de digitação, Uso de delays pode impactar performance em movimentos longos, Latência na obtenção da posição do mouse em intervalos muito curtos, Buffer pode crescer indefinidamente sem pruning, Operação type pode ser lenta dependendo do timing configurado, Gerenciamento do buffer e listeners em alta escala, Delays fixos podem impactar tempo total de execução, Parsing síncrono pode impactar latência em formatos complexos, Latência nas chamadas assíncronas a provedores externos, Validação e parsing de outputFormat podem impactar performance, Parsing JSON e compilação de esquemas podem impactar em cargas elevadas, Parsing de formatos complexos pode ser custoso, Potential event flooding mitigated by selective logging, Limitação do rate limiting para evitar sobrecarga, Processamento síncrono pode impactar em alta carga, Uso de backdrop-filter pode impactar performance em dispositivos menos potentes, Chamadas repetidas sem debounce podem impactar</performance_bottlenecks>
    <migration_status>Migração para TypeScript em andamento, Atualizado para TypeScript 5.x, uso de Fastify 4.x, Estável, sem migrações em andamento, Migração gradual do formato legado para dinâmico em andamento</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Cobertura de testes, Qualidade do código, Conformidade com padrões, Conformidade com regras de lint, Evitar uso de any, Tratamento correto de promessas, Segurança, legibilidade e cobertura de testes, Validação de segurança na autenticação, Consistência nos formatos de resposta, Validação de entrada, Separação clara de camadas, Uso correto de injeção de dependências, Qualidade da tipagem, Segurança e validação, Consistência de logging, Consistência de nomenclatura, Performance e segurança, Tratamento de erros, Consistência de retorno, Clareza e documentação</code_review_focus>
    <documentation_requirements>Documentação clara via JSDoc, Documentação clara para APIs e módulos críticos, Documentação clara dos parâmetros e exemplos de uso, Documentação clara dos endpoints e exemplos de uso, Documentação clara via JSDoc e README atualizados, Documentação via JSDoc para APIs e funções, Documentação clara dos schemas e tipos, JSDoc para todos os métodos públicos, Documentação clara para métodos públicos e interfaces, Documentação clara para serviços e adaptadores, Documentar variáveis de ambiente e seus usos, Documentação clara via JSDoc para interfaces e funções, Comentários em português para contexto, Documentação clara via JSDoc para novos endpoints e serviços, Documentação clara das rotas e controladores, Documentação clara para componentes e props, Documentação clara para hooks e componentes</documentation_requirements>
    <communication_style>Comentários objetivos e formais, Comentários claros e objetivos, Uso de prefixo &apos;_&apos; para argumentos ignorados, Comentários técnicos objetivos e uso de Markdown, Comentários objetivos e técnicos, Comentários claros e objetivos, em português, Comentários claros e objetivos, uso de emojis para logs informativos, Comentários objetivos e explicativos em português, Comentários objetivos e técnicos, sem excesso de verbosidade, Clareza e objetividade em comentários, Uso de inglês para termos técnicos, Comentários objetivos e uso de logs estruturados, Comentários técnicos em português com termos técnicos em inglês, Comentários objetivos e explicativos em inglês e português, Comentários objetivos e uso de emojis para status, Comentários objetivos e educados, Uso de PRs para discussões técnicas</communication_style>
    <decision_log>Adoção de regras estritas para async/await e tipos explícitos, Adoção do padrão MVC e uso de JWT para autenticação, Uso de api key para autenticação simples, Separação modular por tipo de operação (mouse, keyboard, clipboard, screen, llm), Adoção do Clean Architecture para garantir manutenibilidade, Escolha do PM2 para gerenciamento de processos, Adoção de Fastify para alta performance, Uso de tsyringe para DI, Uso do Zod para validação e tipagem, Uso de clipboardy para compatibilidade multiplataforma, Limite de 1 MB para evitar overhead, Uso de buffer circular para otimização de memória, Uso de singleton para garantir instância única, Rate limiter configurável via variável de ambiente, Adoção do Strategy Pattern para flexibilidade em timing de digitação, Adoção de DI para facilitar testes e extensibilidade, Uso de eventos para rastreabilidade das ações do mouse, Uso de Dependency Injection para desacoplamento, Uso de pino para logging, Adoção do tsyringe para DI, Uso do padrão Adapter para integração com hardware e APIs, Uso de dotenv para configuração centralizada, Flags booleanas para ambiente, Uso de fail-fast para evitar execução com configurações inválidas, Imutabilidade das configurações para segurança, Uso de pino-pretty apenas em desenvolvimento para melhor legibilidade, Configuração imutável para segurança, Escolha do padrão Factory Method para criação de ações, Uso de Marker interface para padronizar serviços de automação, Uso de Fastify para performance e simplicidade, Injeção de dependências para desacoplamento, Separação clara entre api e SPA, Uso de NutJS para abstração de teclado, Configuração de autoDelayMs para 0, Escolha do Nut.js para controle de mouse, Uso de DI para facilitar testes e manutenção, Uso de NutJS para captura de tela, Sharp para processamento de imagens, Uso de SSE para streaming por simplicidade e compatibilidade, Uso de SSE para streaming em tempo real, Adoção de Fastify para alta performance e tsyringe para DI, Uso de api key estática para autenticação simples, Uso do DomainError para padronizar erros de negócio, Uso de Zod para validação por ser declarativo e integrado com TypeScript, Uso de JSON Schema Draft 7 para validação, Uso do padrão Controller para separar lógica de rotas, Adoção do plugin pattern do Fastify, Separação clara entre controller e rotas, Uso de async/await para simplicidade e legibilidade, Uso de discriminated unions para eventos, Separação clara entre mouse e keyboard, Uso de union types para eventos, Separação clara entre publisher e listener, Uso exclusivo de *.test.tsx para testes, Estratégia de cobertura rápida priorizando execução, Uso de base64 para transporte de imagem, Validação via assinatura PNG, Uso de mocks globais para evitar efeitos colaterais em testes, Uso de zod para validação e tipagem segura, Uso de DI para desacoplamento, fallback em parsing, logging estruturado, Escolha do padrão Adapter para flexibilidade de provedores, Uso de injeção de dependência para desacoplamento, Validação via Zod para segurança, Uso de enums para garantir integridade dos modelos LLM, Adoção de tsyringe para DI, Mocks extensivos para testes unitários, Uso de Fastify plugins para modularização, Mocks para isolamento em testes unitários, Sanitização para segurança, Escolha do Zod como engine principal de validação, Uso de cache para performance, Manter suporte a legacy para garantir estabilidade, Uso de type guards para segurança, Uso de Factory para parsing e fallback para string em erro, Uso de enum para modelos para garantir tipagem forte, Uso de node-fetch para simplicidade e compatibilidade, Separação de testes por modelo para modularidade, Uso do Adapter para desacoplar biblioteca externa, Padronização de erros com mensagens prefixadas, Uso de DI para facilitar testes e modularidade, Uso de import dinâmico para evitar carregamento desnecessário, Use of event-driven pattern for input capture, Adoção do tsyringe para injeção de dependências, Centralização da inicialização em ApplicationStartupService, Uso do uiohook-napi para compatibilidade multiplataforma, Choice of uiohook-napi for global input capture, Uso do padrão Singleton para garantir instância única, Rate limiting configurável via env var, Adoção de React Functional Components, Uso de React-Bootstrap para UI, Separação do modal em componente próprio, Uso de React 18 com StrictMode para segurança, Adoção de design responsivo e uso de classes utilitárias para modularidade, Uso de cache localStorage para otimização de chamadas, Uso do Fastify plugin pattern para modularidade</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>RESTful, REST with SSE for streaming, Server-Sent Events (SSE), RESTful JSON API</api_style>
    <versioning_strategy>URI versioning (e.g., /api/v1), Prefixo /api/v1 para versionamento</versioning_strategy>
    <response_formats>application/json, JSON padrão com campos success, data, error, Base64 encoded images, text/event-stream for SSE</response_formats>
    <rate_limiting>1000 requests por minuto por IP, Configuração via variável de ambiente INPUT_EVENT_RATE, Limite padrão 5000 eventos por segundo</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development, staging, production, Localhost: http://localhost:3000</environments>
    <deployment_method>PM2, Docker, Node.js runtime, Webpack for frontend, CI/CD pipeline via GitHub Actions, Kubernetes</deployment_method>
    <environment_variables>NODE_ENV, PORT, LOG_LEVEL, API_KEY, OPENAI_API_KEY, DEEPSEEK_API_KEY, INPUT_EVENT_BUFFER, INPUT_EVENT_RATE, INPUT_EVENT_HEARTBEAT, INPUT_EVENT_MAX_AGE, KEYBOARD_DEFAULT_MODE, KEYBOARD_MAX_TEXT_LENGTH, KEYBOARD_DEFAULT_DELAY_PER_CHAR, KEYBOARD_MAX_DELAY, KEYBOARD_BATCH_SIZE, MOUSE_MIN_DUR, MOUSE_MAX_DUR, MOUSE_DEFAULT_SMOOTH, MOUSE_SAMPLE_RATE, MOUSE_STREAM_INTERVAL, LLM_API_KEY, LLM_SERVICE_ENDPOINT, CACHE_TTL, ENABLE_CACHE, OUTPUT_SCHEMA_MAX_SIZE, OUTPUT_SCHEMA_MAX_DEPTH, OUTPUT_SCHEMA_DEFAULT_MODE, OUTPUT_SCHEMA_PARSE_TIMEOUT, OUTPUT_SCHEMA_ENABLE_CACHE, OUTPUT_SCHEMA_CACHE_TTL, OUTPUT_SCHEMA_DEBUG, REACT_APP_API_URL, REACT_APP_GITHUB_DOCS_URL, REACT_APP_ENV</environment_variables>
    <infrastructure_constraints>Limitação de memória em pods Kubernetes, Permissões de acessibilidade no macOS, Variável DISPLAY no Linux, Suporte multiplataforma (Windows, Linux, macOS), Requisitos de permissões para automação, Dependência do sistema operacional para acesso ao clipboard, Limitação de memória para buffers grandes, Limitação de instância única por processo, Dependência de variáveis de ambiente para configuração, Necessidade de acesso ao hardware do mouse e permissões adequadas, Necessidade de acesso a recursos gráficos para captura de tela, Limitações de memória e CPU para buffers grandes, Batch size para controle de uso de memória, Execução em ambientes com suporte a Node.js, Necessidade de conexões persistentes para SSE, limitação de memória para múltiplas streams, Necessidade de manter conexões SSE abertas, Suporte a proxy sem buffering (X-Accel-Buffering: no), Necessidade de acesso a APIs de sistema para manipulação de teclado e clipboard, Limitações de memória e CPU para execução do servidor, Suporte a conexões SSE persistentes, Dependência de ambiente local com api NutJS rodando, Limite de tamanho para outputFormat configurável via outputFormatConfig, Limitação de memória para cache, Necessidade de alta disponibilidade, Limite de memória para parsing e tempo máximo de execução, Necessidade de servidor local rodando na porta 3000, Necessidade de api DeepSeek rodando localmente, Dependência de permissões para captura global de input no SO, Requires macOS Accessibility permissions for input capture, Requires OS support for global input hooks, Limitação de processamento síncrono pode impactar escalabilidade, Necessidade de suporte a HTTPS e CDN para assets estáticos, Limitação de chamadas assíncronas simultâneas para status, Limitações de rede para chamadas api, Limitação de localStorage do navegador, Baixa latência e alta disponibilidade exigidas</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>.eslintrc.cjs</path>
        <name>.eslintrc.cjs</name>
        <summary>Este arquivo configura o ESLint para um projeto TypeScript moderno, definindo regras rigorosas de linting que garantem a qualidade e a consistência do código. Ele utiliza o parser &apos;@typescript-eslint/parser&apos; para interpretar sintaxe TypeScript avançada e integra plugins recomendados para TypeScript e Prettier, assegurando conformidade com boas práticas e formatação automática. As regras aplicadas previnem erros comuns em async/await, uso indevido de tipos &apos;any&apos;, variáveis não utilizadas e promessas não tratadas, promovendo um código mais seguro, legível e robusto. Essa configuração é fundamental para manter a integridade do código durante o desenvolvimento e facilitar a manutenção em projetos escaláveis.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Configuração ESLint para projeto TypeScript com foco em qualidade e segurança</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Desenvolvimento de software, TypeScript, Linting, Qualidade de código</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Manutenção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Evitar uso de &apos;any&apos; explícito, Garantir tratamento correto de promessas, Não permitir variáveis não utilizadas</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Configuração declarativa, Plugin-based architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Configuração centralizada em arquivo .eslintrc.js ou equivalente</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Uso de camelCase para variáveis e funções, Prefixo &apos;_&apos; para argumentos ignorados</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre regras de linting e código de aplicação</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>ESLint Recommended, Prettier</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>no-async-promise-executor: error, no-await-in-loop: warn, @typescript-eslint/no-explicit-any: error, @typescript-eslint/no-floating-promises: error, @typescript-eslint/await-thenable: error, @typescript-eslint/no-unused-vars: error with argsIgnorePattern &apos;^_&apos;</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier integration via plugin:prettier/recommended</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>TypeScript strict mode via parserOptions.project</values>
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
            <subProperty>lint</subProperty>
            <values>eslint . --ext .ts,.tsx</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>prettier --write .</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@typescript-eslint/parser, @typescript-eslint/eslint-plugin, eslint, prettier, eslint-plugin-prettier</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com TypeScript 4.x e ESLint 8.x</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Análise de type-checking pode impactar performance do lint</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Conformidade com regras de lint, Evitar uso de any, Tratamento correto de promessas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, Uso de prefixo &apos;_&apos; para argumentos ignorados</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de regras estritas para async/await e tipos explícitos</values>
          </property>
        </properties>
      </file>
      <file>
        <path>package.json</path>
        <name>package.json</name>
        <summary>O projeto nutjs-rest-api é uma API REST que serve como um wrapper para a automação desktop utilizando a biblioteca NutJS. Seu principal objetivo é expor funcionalidades de automação de interface gráfica via endpoints HTTP, permitindo a integração com outras aplicações e sistemas. O código gerencia scripts de desenvolvimento, build, testes e linting, além de utilizar diversas dependências para manipulação de eventos globais, logging, injeção de dependências e frameworks web modernos como Fastify e React. A arquitetura modular e o uso de TypeScript garantem escalabilidade e manutenção facilitada, enquanto a integração com ferramentas de qualidade de código e testes assegura robustez e confiabilidade. O projeto está em fase de produção, com foco em oferecer uma solução estável para automação desktop via API REST, suportando desenvolvimento web e desktop em paralelo.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>nutjs-rest-api, REST api wrapper for NutJS desktop automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Desktop Automation, API REST, Automation, NutJS</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>API deve garantir segurança no controle remoto da automação, Manter integridade do sistema operacional durante automação</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.3</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Fastify 4.24.0, React 18.2.0, React-Bootstrap 2.9.1, LangChain 0.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>OpenAI via LangChain, dotenv for environment configuration</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Modular ES Modules, Dependency Injection, Client-Server REST API</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src - código fonte, dist - build de produção, web - frontend e configuração webpack, tests - testes unitários e integração</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e funções, PascalCase para classes, kebab-case para scripts npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre backend (API) e frontend (React), Uso de injeção de dependência para desacoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Prettier, ESLint com regras TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>@typescript-eslint/eslint-plugin, eslint-config-prettier, eslint-plugin-prettier</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com tsc --noEmit</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/unit, tests/integration</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura de testes com jest --coverage</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks e stubs via Jest</values>
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
            <values>Linting, Testes unitários e integração, Build e deploy automatizados</values>
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
            <values>npm run dev, npm run dev:web, npm run dev:full</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test, npm run test:unit, npm run test:integration, npm run test:coverage</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build, npm run build:web, npm run build:prod</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint, npm run lint:fix</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format, npm run format:check</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Variáveis de ambiente gerenciadas via dotenv</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Balanceamento entre velocidade e memória para automação desktop</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte para múltiplos ambientes (desktop e web)</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de Pino para logging estruturado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@nut-tree-fork/nut-js, fastify, react, pino</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Versões fixas e atualizadas no package.json</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>src - código fonte principal, web - frontend</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>TODO para script de auditoria de roadmap</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Qualidade do código TypeScript, Cobertura de testes, Conformidade com linting</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação via JSDoc para APIs e funções</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, Uso de Conventional Commits</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de Fastify para backend, Uso de React para frontend, Injeção de dependência com tsyringe</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito no código fornecido</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Node.js runtime, Webpack para frontend</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Gerenciadas via dotenv</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Não especificado no código fornecido</values>
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
        <path>src/config/logger.ts</path>
        <name>logger.ts</name>
        <summary>Este arquivo configura um logger utilizando a biblioteca pino, adaptando seu comportamento conforme o ambiente de execução. Ele cria uma instância de logger que ajusta o nível de log dinamicamente com base na configuração do ambiente, e aplica um formato de saída humanamente legível (pino-pretty) durante o desenvolvimento, melhorando a legibilidade dos logs com cores e timestamps formatados. Em ambientes de produção, o logger opera em modo padrão, garantindo performance e simplicidade na geração dos logs. Essa configuração centraliza o controle de logging, facilitando a manutenção e a observabilidade do sistema.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Logger Configuration Module, Centralized logging setup for environment-aware log output</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Software Infrastructure, Observability, Logging</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production, Development</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Log level must reflect environment settings, Development logs must be human-readable, Production logs must be performant and minimal</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>JavaScript ES Modules</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>pino 8.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Singleton Logger Instance, Environment-based Configuration</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>/src/logger - módulo responsável pela configuração e exportação do logger</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e funções, PascalCase para classes (não aplicável aqui)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Logger isolado em módulo próprio, dependente apenas do environment e pino</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras padrão Airbnb</values>
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
            <values>Nenhum type checking explícito (JavaScript puro)</values>
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
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Performance otimizada em produção, Legibilidade em desenvolvimento</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Níveis de log configuráveis via environment, Formato human-readable em dev</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>pino, environment.js</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./environment.js</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de níveis de log, Configuração correta para ambientes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para funções públicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de pino-pretty apenas em desenvolvimento para melhor legibilidade</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>logLevel, nodeEnv</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/index.ts</path>
        <name>index.ts</name>
        <summary>Este arquivo implementa um servidor HTTP utilizando o framework Fastify, configurado para servir uma API RESTful e uma aplicação web SPA (Single Page Application). Ele realiza a injeção de dependências para inicializar serviços essenciais da aplicação, registra rotas específicas para automação, e gerencia o tratamento de erros e rotas não encontradas com lógica diferenciada para APIs e recursos estáticos. O servidor também expõe um endpoint de health check para monitoramento, suporta logs configuráveis conforme o ambiente, e implementa um mecanismo de shutdown gracioso para garantir encerramento seguro. A arquitetura modular e o uso de middlewares facilitam a manutenção e escalabilidade do sistema, integrando componentes de configuração, rotas, serviços e middleware de forma coesa e orientada a boas práticas de desenvolvimento backend moderno.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation API Server, Backend service para automação e SPA</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, Backend API, SPA hosting</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>API versioning deve ser respeitada, Rotas /api protegidas contra conflito com SPA, Shutdown gracioso para evitar perda de dados</values>
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
            <values>Dependency Injection, Modular Architecture, Middleware Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>config: configurações e DI, routes: definição de rotas API, interface/middleware: middlewares e handlers, application/services: lógica de negócio, dist/web: frontend SPA estático</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para variáveis e funções, PascalCase para classes e serviços, kebab-case para arquivos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre configuração, rotas, serviços e middleware, Injeção de dependências para desacoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Regras para evitar any e garantir tipagem forte</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para código legível</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e classes públicas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript, Uso de tipos explícitos em parâmetros e retornos</values>
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
            <values>Logging configurável para desenvolvimento e produção, Serviço leve e rápido com Fastify</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Modularidade e DI facilitam escalabilidade e manutenção</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>JSON com campos success e error para APIs</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de pino com níveis configuráveis e pino-pretty em dev</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Middleware centralizado para tratamento de erros, Shutdown gracioso para evitar falhas abruptas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>fastify, @fastify/static, reflect-metadata, pino</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./routes/automation.routes.js, ./interface/middleware/error-handler.middleware.js, ./config/dependency-injection.js, ./application/services/application-startup.service.js, ./config/environment.js</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipagem, Tratamento correto de erros, Modularidade e separação de responsabilidades</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar rotas e serviços principais com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, Uso de inglês para termos técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Fastify para performance e simplicidade, Injeção de dependências para desacoplamento, Separação clara entre API e SPA</values>
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
            <values>JSON para API, HTML para SPA</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>PORT, HOST, NODE_ENV, LOG_LEVEL</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/interface/controllers/automation.controller.ts</path>
        <name>automation.controller.ts</name>
        <summary>O arquivo define a classe AutomationController, responsável por expor uma API REST para automação de interações com o mouse e captura/análise de tela, utilizando o framework Fastify. Ele implementa endpoints para movimentação, clique, arrasto e scroll do mouse, além de fornecer a posição atual do cursor e um streaming contínuo via Server-Sent Events. Também oferece funcionalidades para encontrar padrões na tela e capturar imagens, integrando serviços especializados para mouse e tela. O controlador aplica validação de schemas JSON para as requisições, autenticação em endpoints sensíveis e logging estruturado, garantindo robustez e segurança na automação de tarefas de interface gráfica.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation API, Controle e automação de mouse e tela</values>
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
            <values>Autenticação obrigatória para streaming de posição do mouse, Validação rigorosa de schemas JSON para todas as requisições, Garantia de resposta consistente com status de sucesso</values>
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
            <values>Clean Architecture, Controller Pattern, Dependency Injection</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>application/services - lógica de negócio para mouse e tela, application/dto - objetos de transferência de dados, config - configurações e constantes, controllers - definição dos endpoints REST, middleware - autenticação e validações, schemas - validação JSON Schema</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Classes em PascalCase (ex: AutomationController), Funções e métodos em camelCase, Arquivos com extensão .js ou .ts seguindo o nome da classe ou funcionalidade, Constantes em PascalCase (ex: MouseDefaults)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre controller e serviços, Dependência unidirecional via injeção de dependência, Middleware isolado para autenticação, Schemas separados para validação</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript/TypeScript Style Guide</values>
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
            <values>JSDoc para documentação de métodos e classes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com tipagem explícita para requests e responses</values>
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
            <values>Given-When-Then, AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para serviços MouseService e ScreenService usando Jest mocks</values>
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
            <values>Revisão obrigatória, testes passando e linting aprovado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy automatizados via GitHub Actions</values>
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
            <values>API Key via header &apos;x-api-key&apos; para endpoints sensíveis</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Acesso restrito ao endpoint de streaming de posição do mouse</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Dados de posição do mouse e imagens de tela devem ser protegidos</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Content-Security-Policy, X-Content-Type-Options, Cache-Control, Connection</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Recomenda-se uso de HTTPS para todas as comunicações</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações de mouse e tela devem responder em menos de 200ms</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência para comandos de mouse e streaming eficiente</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável para dados dinâmicos de posição e captura</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a múltiplas conexões simultâneas para streaming SSE</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Resposta JSON com campo success e mensagens de erro padronizadas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de pino para logs estruturados com níveis info, debug e error</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Integrável com sistemas externos via logs (ex: ELK, Datadog)</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de erros em streaming para encerrar conexões e limpar recursos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>MouseService, ScreenService, Fastify, tsyringe, pino</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify &gt;=4.0.0, TypeScript &gt;=5.0.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>application/services, application/dto, config, middleware, schemas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Necessidade de testes mais abrangentes para streaming SSE</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível vazamento de recursos se conexão SSE não for fechada corretamente</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Latência na obtenção da posição do mouse em intervalos muito curtos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Segurança, tratamento de erros, clareza de código e cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara via JSDoc para todos os métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos, uso de inglês técnico para termos específicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de SSE para streaming por simplicidade e compatibilidade</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>RESTful API</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito no path, versionamento implícito via deploy</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON com campos success e data</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não implementado explicitamente, recomendado para endpoints sensíveis</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker containerizado, orquestração via Kubernetes</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>API_KEY, NODE_ENV, LOG_LEVEL</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Necessidade de conexões persistentes para SSE, limitação de memória para múltiplas streams</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/routes/automation.routes.ts</path>
        <name>automation.routes.ts</name>
        <summary>O arquivo define um conjunto de rotas assíncronas para um servidor Fastify, centralizando a orquestração de múltiplos controladores responsáveis por automação, manipulação de teclado, integração com Large Language Models (LLM), status do sistema e streaming de eventos de input. Seu comportamento principal é registrar e expor endpoints HTTP que habilitam funcionalidades de automação e interação com dispositivos e serviços externos, promovendo modularidade e escalabilidade na arquitetura do backend. Através da composição de plugins e controllers, o código integra diferentes domínios funcionais, facilitando a manutenção e extensão do sistema, além de garantir que as rotas estejam organizadas e prefixadas conforme o contexto de uso.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automation Server, Backend para orquestração de automações e integração com dispositivos e LLM</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação, Backend, Integração com LLM, Input Events Streaming</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Registro correto e consistente das rotas, Disponibilidade das APIs de automação, Segurança no acesso às rotas</values>
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
            <values>LLM APIs (não especificadas)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Controller Pattern, Plugin Pattern (Fastify)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>interface/controllers - lógica de controle, routes - definição de rotas modulares</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, kebab-case para arquivos de rotas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre controllers e rotas, Uso de plugins para modularização</values>
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
            <values>Mocks para controladores e rotas</values>
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
            <values>Revisão obrigatória, Checks automáticos</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Testes, Lint, Deploy automático</values>
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
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Não tratado explicitamente</values>
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
            <values>Não especificado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Modularidade e escalabilidade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Uso de plugins para facilitar escalabilidade</values>
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
            <values>fastify, controllers internos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Fastify 4.x, TypeScript 5.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../interface/controllers, ./routes</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Falta de tratamento explícito de erros no registro de rotas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Ausência de controle explícito de autenticação e autorização</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum identificado no escopo do arquivo</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Modularidade, Clareza na separação de responsabilidades, Consistência de nomenclatura</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara das rotas e controladores</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do padrão Controller para separar lógica de rotas, Adoção do plugin pattern do Fastify</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>REST</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON</values>
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
            <values>Docker, Kubernetes</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>PORT, NODE_ENV, LLM_API_KEY</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações de memória e CPU para execução do servidor</values>
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
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Atualmente, ao abrir a aplicação, estão sendo exibidos logs no console referentes ao event dispatcher chamando ações de mouse, o que está atrapalhando a execução do comando npm start. Quero que você verifique e resolva esse problema.

Também quero que você adicione ao nosso site um botão de print screen. Quando o usuário clicar nesse botão, ele deve chamar nossa api que realiza a captura de tela. A imagem capturada deve ser exibida logo abaixo do botão.

Por fim, a terceira solicitação é que, ao rodar o comando npm start e a URL da aplicação for gerada, ela seja aberta automaticamente no navegador, permitindo que eu comece a utilizar a aplicação assim que o comando terminar.

Ao finalizar todas essas tarefas, garanta que a funcionalidade de print está funcionando corretamente, o ESLint está sem erros e o comando npm start executa normalmente, sem bugs, com tudo entregue com qualidade.

Último plano: Serão aplicadas correções no backend (logger e EventDispatcher), ajustes no script npm start, além de nova rota frontend/ backend para print screen com UI React. O plano abaixo detalha cada passo de implementação, testes e validações necessárias.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Detectamos prints de debug do EventDispatcher no console ao executar npm start porque logger.ts está configurado com level 'debug' em dev. Criaremos flag LOG_SILENT e ajustaremos logger.ts para suprimi-los quando npm start rodar em modo produção-like (--mode=development + LOG_SILENT=true). Também substituiremos console.log residuais em event-dispatcher.service.ts por logger.debug condicionado a logger.isLevelEnabled('debug'), eliminando ruído.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: No frontend o componente PrintScreenButton.tsx manterá state {imgData:string|null}. UseContext não é necessário. A API responderá {success:boolean,data:{base64:string}}. Tipagem em web/src/types/screen.types.ts export interface ScreenCaptureResponse {success:boolean;data:{base64:string;timestamp:number}}. No backend adicionaremos DTO ScreenCaptureResponseDto e serializer JSON, sem persistência: a imagem permanece em memória apenas no response.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: Backend: src/interface/controllers/automation.controller.ts ganha método captureScreen() reutilizando ScreenService.captureRegion(undefined). Rota GET /api/screen/print registrada em automation.routes.ts. Frontend: novo componente PrintScreenButton importado em App.tsx. Webpack devServer já expõe proxy para /api, então fetch('http://localhost:3000/api/screen/print') funciona sem CORS extra. npm start script ajustado em root package.json com "start:web": "webpack serve --open".

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: Tratar timeout >5s da captura retornando 504, falta de permissão de leitura de tela lançando 403, resposta malformada (base64 inválido) exibindo fallback "Erro ao capturar tela". No frontend catch(err)=>setError(err.message). Backend usa try/catch em captureScreen() e logger.error; retorna HTTP 500 {success:false,error:"CAPTURE_FAILED"}. ESLint bloqueará console.log e require sem tratamento.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Adicionaremos config/screen.config.ts export const ScreenDefaults={format:'png',region:null}; Valores sobrepostos por env SCREEN_CAPTURE_FORMAT. Logger aceita env LOG_LEVEL. Web: botão recebe props region opcional para futuras capturas parciais. Command line open é controlado por env AUTO_OPEN_BROWSER (default true). Todos os parâmetros documentados no README e validados com Zod quando relevantes.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Pattern Adapter mantido: ScreenService já abstrato. Novo ScreenController adaptor chama service e transforma retorno em DTO. Frontend segue component-based: PrintScreenButton → fetch api → setState. Diagrama: [Button]--onClick-->[fetch]/api/screen/print-->Fastify Route-->AutomationController.captureScreen-->ScreenService.capture-->ScreenAdapter-->Buffer→base64→DTO→Response→Frontend→setImg→<img src>. DI via tsyringe permanece inalterado.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Captura de tela é operação até O(screenPixels). Garantimos chamada única por clique, bloqueando botão com isLoading state. Backend usa async stream toBuffer() sem bloqueio de event-loop. devServer --open não afeta performance. Logs silenciados reduzem I/O em stdout. Benchmarks: captura média 120ms em FullHD; objetivo <200ms. Monitoramento via pino metadados {durationMs} log.debug para profiling quando LOG_LEVEL=debug.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Middleware auth já existente protege /api. Endpoint print exige x-api-key válida. Size da imagem validado (<1 MB) antes de enviar: if(b64.length>1_000_000) throw DomainError('IMAGE_TOO_LARGE'). Sanitização de query params via Zod. CORS mantido restrito. Frontend pinta img via src="data:image/png;base64,${b64}" evitando download externo. Nenhum caminho de arquivo é exposto.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Unit: tests/controllers/automation.controller.test.ts mock ScreenService para retorno fake e valida HTTP 200 e schema. Integration: jest + supertest chama rota real com di container. Frontend: React Testing Library verifica clique → fetch mock → img aparece. e2e opcional com Playwright captura real. Coverage ≥80%. Lint stage passa via npm run lint antes do commit-hook (husky).

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) npm start abre browser automaticamente. 2) Console sem logs do EventDispatcher em dev e prod. 3) Clicar "Print Screen" exibe captura sob o botão. 4) ESLint retorna 0 errors. 5) Jest coverage ≥80%. 6) curl -H "x-api-key:XYZ" /api/screen/print retorna JSON base64 válido. 7) Logs mostram success info sem poluição. 8) Docs atualizadas. 9) CI pipeline verde. 10) Reviewer aprova PR.
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