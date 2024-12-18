
C:\Users\jmaga\code\dsh\backend\src\config.ts
   2:8  error    Unable to resolve path to module 'dotenv/config'  import/no-unresolved
  18:7  warning  Generic Object Injection Sink                     security/detect-object-injection

C:\Users\jmaga\code\dsh\backend\src\index.ts
  1:40  error  Unable to resolve path to module 'dotenv'  import/no-unresolved

C:\Users\jmaga\code\dsh\backend\src\routes\agent.ts
  2:43  error  Unable to resolve path to module 'express'  import/no-unresolved
  4:54  error  Unable to resolve path to module 'ws'       import/no-unresolved

C:\Users\jmaga\code\dsh\backend\src\routes\health.ts
  4:43  error  Unable to resolve path to module 'express'  import/no-unresolved
  5:22  error  Unable to resolve path to module 'pg'       import/no-unresolved

C:\Users\jmaga\code\dsh\backend\src\server.ts
   1:8   error  Unable to resolve path to module 'dotenv/config'       import/no-unresolved
   4:25  error  Unable to resolve path to module 'compression'         import/no-unresolved
   5:18  error  Unable to resolve path to module 'cors'                import/no-unresolved
   6:43  error  Unable to resolve path to module 'express'             import/no-unresolved
   7:27  error  Unable to resolve path to module 'express-rate-limit'  import/no-unresolved
   8:20  error  Unable to resolve path to module 'helmet'              import/no-unresolved
  10:41  error  Unable to resolve path to module 'socket.io'           import/no-unresolved
  11:43  error  Unable to resolve path to module 'ws'                  import/no-unresolved

C:\Users\jmaga\code\dsh\backend\src\types\index.ts
   6:1  error  Multiple exports of name 'AuthenticationResult'     import/export
   6:1  error  Multiple exports of name 'AuthProvider'             import/export
   6:1  error  Multiple exports of name 'AuthSession'              import/export
   7:1  error  Multiple exports of name 'AuthenticationResult'     import/export
   7:1  error  Multiple exports of name 'AuthProvider'             import/export
   7:1  error  Multiple exports of name 'AuthSession'              import/export
   7:1  error  Multiple exports of name 'Plugin'                   import/export
   7:1  error  Multiple exports of name 'PluginManager'            import/export
   7:1  error  Multiple exports of name 'ServiceWorker'            import/export
   7:1  error  Multiple exports of name 'WebSocketMessage'         import/export
   7:1  error  Multiple exports of name 'NotificationPreferences'  import/export
  10:1  error  Multiple exports of name 'MiddlewareHandler'        import/export
  12:1  error  Multiple exports of name 'NotificationPreferences'  import/export
  14:1  error  Multiple exports of name 'Plugin'                   import/export
  14:1  error  Multiple exports of name 'PluginManager'            import/export
  15:1  error  Multiple exports of name 'WorkerStatus'             import/export
  15:1  error  Multiple exports of name 'JobFilter'                import/export
  16:1  error  Multiple exports of name 'JobFilter'                import/export
  16:1  error  Multiple exports of name 'SchedulerConfig'          import/export
  17:1  error  Multiple exports of name 'ServiceWorker'            import/export
  17:1  error  Multiple exports of name 'MiddlewareHandler'        import/export
  17:1  error  Multiple exports of name 'WorkerStatus'             import/export
  17:1  error  Multiple exports of name 'SchedulerConfig'          import/export
  20:1  error  Multiple exports of name 'WebSocketMessage'         import/export

C:\Users\jmaga\code\dsh\backend\src\types\service.types.ts
  2:15  error  'User' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\jmaga\code\dsh\backend\src\utils\db.ts
  2:38  error  Unable to resolve path to module '@prisma/client'  import/no-unresolved

C:\Users\jmaga\code\dsh\backend\src\utils\logger.ts
  5:26  error  Unable to resolve path to module 'winston'  import/no-unresolved

C:\Users\jmaga\code\dsh\backend\src\utils\metrics.ts
  1:42  error  Unable to resolve path to module 'prom-client'  import/no-unresolved

C:\Users\jmaga\code\dsh\backend\src\utils\redis.ts
  1:19  error  Unable to resolve path to module 'ioredis'  import/no-unresolved

C:\Users\jmaga\code\dsh\frontend\src\App.tsx
   2:56  error  Unable to resolve path to module 'react-router-dom'  import/no-unresolved
  14:3   error  Unsafe return of an `any` typed value                @typescript-eslint/no-unsafe-return
  22:38  error  Unsafe assignment of an `any` value                  @typescript-eslint/no-unsafe-assignment
  23:45  error  Unsafe assignment of an `any` value                  @typescript-eslint/no-unsafe-assignment
  24:45  error  Unsafe assignment of an `any` value                  @typescript-eslint/no-unsafe-assignment
  25:46  error  Unsafe assignment of an `any` value                  @typescript-eslint/no-unsafe-assignment
  26:43  error  Unsafe assignment of an `any` value                  @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\components\AgentManager\AgentManager.tsx
   68:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   68:17  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   70:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   73:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   73:23  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   74:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   74:27  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   75:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   75:19  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   76:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   76:17  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   77:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   77:25  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   78:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   78:26  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   79:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   79:24  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   82:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   82:35  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   83:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   83:39  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   86:3   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   87:10  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   87:19  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   93:7   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
   93:28  error  Unsafe return of an `any` typed value                                                                                                                                                                                                                      @typescript-eslint/no-unsafe-return
   95:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
   95:24  error  Unsafe member access .target on an `any` value                                                                                                                                                                                                             @typescript-eslint/no-unsafe-member-access
  103:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  103:24  error  Unsafe member access .name on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  104:9   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  104:24  error  Unsafe member access .host on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  105:24  error  Unsafe argument of type `any` assigned to a parameter of type `string`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  105:33  error  Unsafe member access .port on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  110:7   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  112:7   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  122:7   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  122:22  error  Unsafe member access .name on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  123:7   error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  123:22  error  Unsafe member access .host on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  124:22  error  Unsafe argument of type `any` assigned to a parameter of type `string`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  124:31  error  Unsafe member access .port on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  128:11  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  128:20  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  129:5   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  129:14  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  130:5   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  131:5   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  135:9   error  Unexpected any value in conditional. An explicit comparison or type cast is required                                                                                                                                                                       @typescript-eslint/strict-boolean-expressions
  136:7   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  136:13  error  Unsafe member access .stopPropagation on an `any` value                                                                                                                                                                                                    @typescript-eslint/no-unsafe-member-access
  138:11  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  138:20  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  141:51  error  Missing return type on function                                                                                                                                                                                                                            @typescript-eslint/explicit-function-return-type
  143:5   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  143:14  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  144:9   error  Unexpected nullable string value in conditional. Please handle the nullish/empty cases explicitly                                                                                                                                                          @typescript-eslint/strict-boolean-expressions
  145:12  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  145:21  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  149:28  error  Missing return type on function                                                                                                                                                                                                                            @typescript-eslint/explicit-function-return-type
  150:10  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  150:19  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  155:7   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  155:16  error  Unsafe member access .name on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  156:7   error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  156:16  error  Unsafe member access .host on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  157:23  error  Unsafe argument of type `any` assigned to a parameter of type `string`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  157:32  error  Unsafe member access .port on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  165:13  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  167:11  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  177:44  error  'any' overrides all other types in this union type                                                                                                                                                                                                         @typescript-eslint/no-redundant-type-constituents
  180:11  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  180:21  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  180:21  error  React Hook "useAppSelector" is called in function "renderMetrics" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use"  react-hooks/rules-of-hooks
  180:76  error  Unsafe argument of type `any` assigned to a parameter of type `RootState`                                                                                                                                                                                  @typescript-eslint/no-unsafe-argument
  182:9   error  Unexpected any value in conditional. An explicit comparison or type cast is required                                                                                                                                                                       @typescript-eslint/strict-boolean-expressions
  182:41  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  183:9   error  Unexpected any value in conditional. An explicit comparison or type cast is required                                                                                                                                                                       @typescript-eslint/strict-boolean-expressions
  183:39  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  184:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required                                                                                                                                                                       @typescript-eslint/strict-boolean-expressions
  186:11  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  189:16  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  190:18  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  192:64  error  Unsafe argument of type `any` assigned to a parameter of type `number`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  192:68  error  Unsafe member access .usage on an `any` value                                                                                                                                                                                                              @typescript-eslint/no-unsafe-member-access
  193:58  error  Unsafe member access .loadAverage on an `any` value                                                                                                                                                                                                        @typescript-eslint/no-unsafe-member-access
  196:18  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  198:64  error  Unsafe argument of type `any` assigned to a parameter of type `number`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  198:71  error  Unsafe member access .usage on an `any` value                                                                                                                                                                                                              @typescript-eslint/no-unsafe-member-access
  199:63  error  Unsafe argument of type `any` assigned to a parameter of type `number`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  199:70  error  Unsafe member access .available on an `any` value                                                                                                                                                                                                          @typescript-eslint/no-unsafe-member-access
  200:59  error  Unsafe argument of type `any` assigned to a parameter of type `number`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  200:66  error  Unsafe member access .total on an `any` value                                                                                                                                                                                                              @typescript-eslint/no-unsafe-member-access
  203:18  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  205:64  error  Unsafe argument of type `any` assigned to a parameter of type `number`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  205:69  error  Unsafe member access .usage on an `any` value                                                                                                                                                                                                              @typescript-eslint/no-unsafe-member-access
  206:63  error  Unsafe argument of type `any` assigned to a parameter of type `number`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  206:68  error  Unsafe member access .available on an `any` value                                                                                                                                                                                                          @typescript-eslint/no-unsafe-member-access
  207:59  error  Unsafe argument of type `any` assigned to a parameter of type `number`                                                                                                                                                                                     @typescript-eslint/no-unsafe-argument
  207:64  error  Unsafe member access .total on an `any` value                                                                                                                                                                                                              @typescript-eslint/no-unsafe-member-access
  214:16  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  215:16  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  220:24  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  221:28  error  Unsafe return of an `any` typed value                                                                                                                                                                                                                      @typescript-eslint/no-unsafe-return
  221:28  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  221:37  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  233:16  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  234:10  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  234:22  error  Unsafe member access .map on an `any` value                                                                                                                                                                                                                @typescript-eslint/no-unsafe-member-access
  235:11  error  Unsafe return of an `any` typed value                                                                                                                                                                                                                      @typescript-eslint/no-unsafe-return
  240:43  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  241:24  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  242:26  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  248:26  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  269:15  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  271:11  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  271:20  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  272:11  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  273:11  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  286:20  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  286:29  error  Unsafe member access .name on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  294:20  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  294:29  error  Unsafe member access .host on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  302:20  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  302:29  error  Unsafe member access .port on an `any` value                                                                                                                                                                                                               @typescript-eslint/no-unsafe-member-access
  311:20  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  311:29  error  Unsafe member access .apiKey on an `any` value                                                                                                                                                                                                             @typescript-eslint/no-unsafe-member-access
  319:20  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  319:29  error  Unsafe member access .sshKey on an `any` value                                                                                                                                                                                                             @typescript-eslint/no-unsafe-member-access
  325:30  error  Unexpected any value in conditional. An explicit comparison or type cast is required                                                                                                                                                                       @typescript-eslint/strict-boolean-expressions
  325:41  error  Unsafe member access .success on an `any` value                                                                                                                                                                                                            @typescript-eslint/no-unsafe-member-access
  326:27  error  Unsafe member access .message on an `any` value                                                                                                                                                                                                            @typescript-eslint/no-unsafe-member-access
  332:24  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment
  338:34  error  Unsafe return of an `any` typed value                                                                                                                                                                                                                      @typescript-eslint/no-unsafe-return
  338:34  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  338:43  error  Unsafe call of an `any` typed value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-call
  351:20  error  Unsafe assignment of an `any` value                                                                                                                                                                                                                        @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\components\AgentManager\styles.ts
  62:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  62:28  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  73:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  73:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  77:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  77:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Chat\Chat.tsx
  10:25  error  Unable to resolve path to module '@/client/hooks/useChat'                             import/no-unresolved
  16:8   error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  17:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  17:17  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  19:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  19:53  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  23:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  32:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  33:5   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  37:51  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  38:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  41:52  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  43:13  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  43:29  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  44:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  44:36  error  Unsafe member access .id on an `any` value                                            @typescript-eslint/no-unsafe-member-access
  50:57  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  52:13  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  54:9   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  61:3   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  65:21  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  66:30  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  70:22  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  71:20  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  72:18  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  74:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  76:23  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  77:28  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  78:22  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  79:20  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\components\Chat\ChatBot.tsx
   31:29  error  Unable to resolve path to module '@/client/types/chat.types'                                       import/no-unresolved
   45:8   error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
   55:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   55:17  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   57:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   57:51  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   58:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   58:47  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   59:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   59:51  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   60:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   60:49  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   62:40  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
   63:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required               @typescript-eslint/strict-boolean-expressions
   63:10  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   63:25  error  Unsafe member access .trim on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
   65:27  error  Unsafe argument of type `any` assigned to a parameter of type `string`                             @typescript-eslint/no-unsafe-argument
   65:27  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   65:42  error  Unsafe member access .trim on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
   66:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   67:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   70:40  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
   71:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required               @typescript-eslint/strict-boolean-expressions
   73:27  error  Unsafe argument of type `any` assigned to a parameter of type `string`                             @typescript-eslint/no-unsafe-argument
   74:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   75:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   78:7   error  Unexpected nullable string value in conditional. Please handle the nullish/empty cases explicitly  @typescript-eslint/strict-boolean-expressions
   79:5   error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
   84:13  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   95:3   error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  101:40  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  101:40  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  115:11  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  116:18  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  116:26  error  Unsafe member access .id on an `any` value                                                         @typescript-eslint/no-unsafe-member-access
  119:15  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  122:19  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  122:46  error  Unsafe member access .id on an `any` value                                                         @typescript-eslint/no-unsafe-member-access
  123:19  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  131:33  error  Unsafe member access .id on an `any` value                                                         @typescript-eslint/no-unsafe-member-access
  132:46  error  Unsafe argument of type `any` assigned to a parameter of type `string`                             @typescript-eslint/no-unsafe-argument
  132:54  error  Unsafe member access .id on an `any` value                                                         @typescript-eslint/no-unsafe-member-access
  138:26  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  138:34  error  Unsafe member access .name on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
  139:37  error  Unsafe argument of type `any` assigned to a parameter of type `string | number | Date`             @typescript-eslint/no-unsafe-argument
  139:45  error  Unsafe member access .createdAt on an `any` value                                                  @typescript-eslint/no-unsafe-member-access
  148:15  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  149:24  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  149:24  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  161:20  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  162:30  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  162:30  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  162:50  error  Unsafe member access .target on an `any` value                                                     @typescript-eslint/no-unsafe-member-access
  166:34  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  166:34  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  170:24  error  Unexpected any value in conditional. An explicit comparison or type cast is required               @typescript-eslint/strict-boolean-expressions
  170:24  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  170:39  error  Unsafe member access .trim on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
  179:15  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  180:24  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  180:24  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  189:34  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  189:34  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  201:8   error  Unexpected nullable boolean value in conditional. Please handle the nullish case explicitly        @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\components\Chat\ChatDialog.tsx
   20:25  error  Unable to resolve path to module '@/client/types/chat.types'                                       import/no-unresolved
   30:8   error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
   36:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   36:17  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   38:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   38:33  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   39:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   39:26  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   41:29  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
   42:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   42:20  error  Unsafe member access .current on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   45:3   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   49:32  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
   50:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required               @typescript-eslint/strict-boolean-expressions
   50:10  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   50:18  error  Unsafe member access .trim on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
   52:19  error  Unsafe argument of type `any` assigned to a parameter of type `string`                             @typescript-eslint/no-unsafe-argument
   52:19  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   52:27  error  Unsafe member access .trim on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
   53:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   56:55  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
   57:15  error  Unsafe member access .key on an `any` value                                                        @typescript-eslint/no-unsafe-member-access
   57:35  error  Unexpected any value in conditional. An explicit comparison or type cast is required               @typescript-eslint/strict-boolean-expressions
   57:41  error  Unsafe member access .shiftKey on an `any` value                                                   @typescript-eslint/no-unsafe-member-access
   58:7   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   58:13  error  Unsafe member access .preventDefault on an `any` value                                             @typescript-eslint/no-unsafe-member-access
   63:3   error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
   65:8   error  Unexpected nullable string value in conditional. Please handle the nullish/empty cases explicitly  @typescript-eslint/strict-boolean-expressions
   73:11  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
   77:23  error  Unsafe member access .role on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
   83:20  error  Unsafe member access .role on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
   89:27  error  Unsafe argument of type `any` assigned to a parameter of type `string | number | Date`             @typescript-eslint/no-unsafe-argument
   89:31  error  Unsafe member access .timestamp on an `any` value                                                  @typescript-eslint/no-unsafe-member-access
   96:25  error  Unsafe member access .role on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
  106:22  error  Unsafe member access .content on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  111:19  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  120:18  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  121:28  error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  121:28  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  121:41  error  Unsafe member access .target on an `any` value                                                     @typescript-eslint/no-unsafe-member-access
  129:22  error  Unexpected any value in conditional. An explicit comparison or type cast is required               @typescript-eslint/strict-boolean-expressions
  129:22  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
  129:30  error  Unsafe member access .trim on an `any` value                                                       @typescript-eslint/no-unsafe-member-access
  132:12  error  Unexpected nullable boolean value in conditional. Please handle the nullish case explicitly        @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\components\Chat\__tests__\Chat.test.tsx
    7:25  error  Unable to resolve path to module '@/client/hooks/useChat'     import/no-unresolved
   39:7   error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
   42:9   error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
   42:17  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   45:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   45:17  error  Unsafe member access .mockReturnValue on an `any` value       @typescript-eslint/no-unsafe-member-access
   62:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   63:29  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
   67:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   67:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
   71:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   72:29  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
   77:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   77:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
   78:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   78:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
   79:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   79:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
   80:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   80:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
   90:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
   90:17  error  Unsafe member access .mockReturnValue on an `any` value       @typescript-eslint/no-unsafe-member-access
  101:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  102:29  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  108:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  108:15  error  Unsafe member access .click on an `any` value                 @typescript-eslint/no-unsafe-member-access
  108:21  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  108:28  error  Unsafe member access .getByTitle on an `any` value            @typescript-eslint/no-unsafe-member-access
  111:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  111:15  error  Unsafe member access .change on an `any` value                @typescript-eslint/no-unsafe-member-access
  111:22  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  111:29  error  Unsafe member access .getByLabelText on an `any` value        @typescript-eslint/no-unsafe-member-access
  116:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  116:15  error  Unsafe member access .click on an `any` value                 @typescript-eslint/no-unsafe-member-access
  116:21  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  116:28  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
  118:11  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  126:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  126:17  error  Unsafe member access .mockReturnValue on an `any` value       @typescript-eslint/no-unsafe-member-access
  137:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  138:29  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  144:11  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  144:27  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  144:34  error  Unsafe member access .getAllByTitle on an `any` value         @typescript-eslint/no-unsafe-member-access
  145:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  145:15  error  Unsafe member access .click on an `any` value                 @typescript-eslint/no-unsafe-member-access
  145:35  error  Unsafe member access [0] on an `any` value                    @typescript-eslint/no-unsafe-member-access
  148:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  148:15  error  Unsafe member access .click on an `any` value                 @typescript-eslint/no-unsafe-member-access
  148:21  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  148:28  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
  150:11  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  155:42  error  Async arrow function has no 'await' expression                @typescript-eslint/require-await
  158:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  158:17  error  Unsafe member access .mockReturnValue on an `any` value       @typescript-eslint/no-unsafe-member-access
  169:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  170:29  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  176:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  176:15  error  Unsafe member access .change on an `any` value                @typescript-eslint/no-unsafe-member-access
  176:22  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  176:29  error  Unsafe member access .getByPlaceholderText on an `any` value  @typescript-eslint/no-unsafe-member-access
  181:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  181:15  error  Unsafe member access .click on an `any` value                 @typescript-eslint/no-unsafe-member-access
  181:21  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  181:28  error  Unsafe member access .getByTitle on an `any` value            @typescript-eslint/no-unsafe-member-access
  187:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  187:17  error  Unsafe member access .mockReturnValue on an `any` value       @typescript-eslint/no-unsafe-member-access
  198:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  199:29  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  204:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  204:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
  208:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  208:17  error  Unsafe member access .mockReturnValue on an `any` value       @typescript-eslint/no-unsafe-member-access
  219:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  220:29  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  225:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  225:19  error  Unsafe member access .getByRole on an `any` value             @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Chat\__tests__\ChatDialog.test.tsx
   7:25  error  Unable to resolve path to module '@/client/types/chat.types'  import/no-unresolved
  10:9   error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  10:17  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  28:40  error  Missing return type on function                               @typescript-eslint/explicit-function-return-type
  29:5   error  Unsafe return of an `any` typed value                         @typescript-eslint/no-unsafe-return
  29:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  30:29  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  46:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  46:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
  47:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  47:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
  52:11  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  52:19  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  52:26  error  Unsafe member access .getByPlaceholderText on an `any` value  @typescript-eslint/no-unsafe-member-access
  53:11  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  53:24  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  53:31  error  Unsafe member access .getByTitle on an `any` value            @typescript-eslint/no-unsafe-member-access
  55:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  55:15  error  Unsafe member access .change on an `any` value                @typescript-eslint/no-unsafe-member-access
  56:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  56:15  error  Unsafe member access .click on an `any` value                 @typescript-eslint/no-unsafe-member-access
  64:11  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  64:19  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  64:26  error  Unsafe member access .getByPlaceholderText on an `any` value  @typescript-eslint/no-unsafe-member-access
  66:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  66:15  error  Unsafe member access .change on an `any` value                @typescript-eslint/no-unsafe-member-access
  67:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  67:15  error  Unsafe member access .keyPress on an `any` value              @typescript-eslint/no-unsafe-member-access
  75:11  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  75:24  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  75:31  error  Unsafe member access .getByTitle on an `any` value            @typescript-eslint/no-unsafe-member-access
  77:5   error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  77:15  error  Unsafe member access .click on an `any` value                 @typescript-eslint/no-unsafe-member-access
  83:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  83:19  error  Unsafe member access .getByRole on an `any` value             @typescript-eslint/no-unsafe-member-access
  88:12  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  88:19  error  Unsafe member access .getByText on an `any` value             @typescript-eslint/no-unsafe-member-access
  93:11  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  93:19  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  93:26  error  Unsafe member access .getByPlaceholderText on an `any` value  @typescript-eslint/no-unsafe-member-access
  94:11  error  Unsafe assignment of an `any` value                           @typescript-eslint/no-unsafe-assignment
  94:24  error  Unsafe call of an `any` typed value                           @typescript-eslint/no-unsafe-call
  94:31  error  Unsafe member access .getByTitle on an `any` value            @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Chat\styles.ts
   3:41  error  Missing return type on function                  @typescript-eslint/explicit-function-return-type
  73:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  73:20  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  74:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  74:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  77:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  77:20  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  78:9   error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  78:21  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  79:9   error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  79:21  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Chat\types.ts
  1:38  error  Unable to resolve path to module '@/client/types/chat.types'  import/no-unresolved

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\DockerManager.tsx
   11:19  warning  'NetworkIcon' is defined but never used. Allowed unused vars must match /^_/u         @typescript-eslint/no-unused-vars
   33:27  error    Unable to resolve path to module '../DockerCompose'                                   import/no-unresolved
   34:34  error    Unable to resolve path to module '../DockerContainers'                                import/no-unresolved
   35:27  error    Unable to resolve path to module '../LogViewer'                                       import/no-unresolved
   41:34  error    Unable to resolve path to module '@/client/hooks/useDockerManager'                    import/no-unresolved
   43:8   error    Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   44:9   error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   44:17  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   46:9   error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   46:37  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   47:9   error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   47:43  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   49:9   error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   58:7   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   60:76  error    Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   61:5   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   64:65  error    Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   65:5   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   65:27  error    Unsafe member access .currentTarget on an `any` value                                 @typescript-eslint/no-unsafe-member-access
   68:30  error    Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   69:5   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   72:7   error    Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   73:5   error    Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   76:7   error    Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   77:5   error    Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   80:3   error    Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   91:24  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   92:25  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  116:16  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  116:33  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  120:22  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  120:22  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  120:33  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  131:16  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  131:33  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  135:22  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  135:22  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  135:33  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  146:16  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  146:33  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  150:22  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  150:22  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  150:33  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  158:18  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  165:15  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  166:31  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  166:31  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  177:19  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  182:19  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  191:26  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  193:25  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  195:24  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  198:26  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  201:26  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  208:19  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\__tests__\DockerManager.test.tsx
    3:37  warning  'waitFor' is defined but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars
    5:26  error    Unable to resolve path to module 'react-redux'                             import/no-unresolved
    9:34  error    Unable to resolve path to module '@/client/hooks/useDockerManager'         import/no-unresolved
   14:27  error    Unsafe return of an `any` typed value                                      @typescript-eslint/no-unsafe-return
   18:18  error    Unsafe return of an `any` typed value                                      @typescript-eslint/no-unsafe-return
   21:20  error    Unsafe return of an `any` typed value                                      @typescript-eslint/no-unsafe-return
   24:7   error    Unsafe assignment of an `any` value                                        @typescript-eslint/no-unsafe-assignment
   24:19  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   52:30  error    Missing return type on function                                            @typescript-eslint/explicit-function-return-type
   53:5   error    Unsafe return of an `any` typed value                                      @typescript-eslint/no-unsafe-return
   53:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   55:31  error    Unsafe assignment of an `any` value                                        @typescript-eslint/no-unsafe-assignment
   64:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   64:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   69:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   69:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   70:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   70:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   71:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   71:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   78:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   78:19  error    Unsafe member access .getByTestId on an `any` value                        @typescript-eslint/no-unsafe-member-access
   81:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   81:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
   81:21  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   81:28  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   82:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   82:19  error    Unsafe member access .getByTestId on an `any` value                        @typescript-eslint/no-unsafe-member-access
   85:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   85:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
   85:21  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   85:28  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   86:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   86:19  error    Unsafe member access .getByTestId on an `any` value                        @typescript-eslint/no-unsafe-member-access
   89:47  error    Async arrow function has no 'await' expression                             @typescript-eslint/require-await
   92:11  error    Unsafe assignment of an `any` value                                        @typescript-eslint/no-unsafe-assignment
   92:27  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   92:34  error    Unsafe member access .getByTitle on an `any` value                         @typescript-eslint/no-unsafe-member-access
   93:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   93:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
  105:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  105:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  116:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  116:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  123:11  error    Unsafe assignment of an `any` value                                        @typescript-eslint/no-unsafe-assignment
  123:28  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  123:35  error    Unsafe member access .getByTitle on an `any` value                         @typescript-eslint/no-unsafe-member-access
  124:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  124:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
  126:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  126:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  127:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  127:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  130:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  130:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
  130:21  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  130:28  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  131:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  131:19  error    Unsafe member access .queryByText on an `any` value                        @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerCompose\DockerCompose.tsx
   31:34  error  Unable to resolve path to module '@/client/hooks/useDockerCompose'                    import/no-unresolved
   37:8   error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   38:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   38:17  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   40:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   55:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   57:3   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   58:10  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   61:43  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   64:9   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   64:22  error  Unsafe member access .palette on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   66:9   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   66:22  error  Unsafe member access .palette on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   68:9   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   68:22  error  Unsafe member access .palette on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   70:9   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   70:22  error  Unsafe member access .palette on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   74:34  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   75:10  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   78:3   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   86:14  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   86:29  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   88:24  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   88:38  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   92:19  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   92:28  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   92:49  error  Unsafe argument of type `any` assigned to a parameter of type `string`                @typescript-eslint/no-unsafe-argument
   92:63  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   93:19  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   93:41  error  Unsafe argument of type `any` assigned to a parameter of type `string`                @typescript-eslint/no-unsafe-argument
   93:55  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   97:14  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  100:51  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  105:46  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  105:46  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  113:34  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  113:34  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  124:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  129:13  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  132:35  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  146:18  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  147:32  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  147:32  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  147:52  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  149:24  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  153:26  error  Unsafe member access .palette on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  162:22  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  164:13  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  165:13  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  167:21  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  167:21  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  167:33  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  173:22  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  175:13  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  176:13  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  178:21  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  178:21  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  178:33  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  185:22  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  187:13  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  188:13  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  190:21  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  190:21  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  190:33  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  196:21  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  196:55  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  196:55  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  198:20  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  198:20  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  198:33  error  Unsafe member access .charAt on an `any` value                                        @typescript-eslint/no-unsafe-member-access
  198:43  error  Unsafe member access .toUpperCase on an `any` value                                   @typescript-eslint/no-unsafe-member-access
  198:59  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  198:72  error  Unsafe member access .slice on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  206:34  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  206:34  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  216:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerCompose\__tests__\DockerCompose.test.tsx
    2:37  warning  'waitFor' is defined but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars
    7:34  error    Unable to resolve path to module '@/client/hooks/useDockerCompose'         import/no-unresolved
   12:18  error    Unsafe return of an `any` typed value                                      @typescript-eslint/no-unsafe-return
   38:9   error    Unsafe assignment of an `any` value                                        @typescript-eslint/no-unsafe-assignment
   38:17  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   39:30  error    Missing return type on function                                            @typescript-eslint/explicit-function-return-type
   40:5   error    Unsafe return of an `any` typed value                                      @typescript-eslint/no-unsafe-return
   40:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   41:29  error    Unsafe assignment of an `any` value                                        @typescript-eslint/no-unsafe-assignment
   49:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   49:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   50:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   50:19  error    Unsafe member access .getByTestId on an `any` value                        @typescript-eslint/no-unsafe-member-access
   61:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   61:19  error    Unsafe member access .getByTitle on an `any` value                         @typescript-eslint/no-unsafe-member-access
   62:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   62:19  error    Unsafe member access .getByTitle on an `any` value                         @typescript-eslint/no-unsafe-member-access
   73:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   73:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   74:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   74:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   80:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   80:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
   80:21  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   80:28  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   84:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   84:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
   84:21  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   84:28  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   88:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   88:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
   88:21  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
   88:28  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  102:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  102:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  103:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  103:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  105:5   error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  105:15  error    Unsafe member access .click on an `any` value                              @typescript-eslint/no-unsafe-member-access
  105:21  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  105:28  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access
  117:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  117:19  error    Unsafe member access .getByRole on an `any` value                          @typescript-eslint/no-unsafe-member-access
  131:12  error    Unsafe call of an `any` typed value                                        @typescript-eslint/no-unsafe-call
  131:19  error    Unsafe member access .getByText on an `any` value                          @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerCompose\styles.ts
   3:41  error  Missing return type on function                  @typescript-eslint/explicit-function-return-type
  12:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  12:14  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  12:26  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerContainers\DockerContainers.tsx
   43:37  error  Unable to resolve path to module '@/client/hooks/useDockerContainers'                 import/no-unresolved
   44:33  error  Unable to resolve path to module '@/client/types/docker.types'                        import/no-unresolved
   52:8   error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   53:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   53:17  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   55:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   55:47  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   57:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   68:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   70:74  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   71:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   71:29  error  Unsafe member access .currentTarget on an `any` value                                 @typescript-eslint/no-unsafe-member-access
   74:32  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   75:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   78:3   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   84:18  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   85:21  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   87:13  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   92:13  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   92:27  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   94:51  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  108:21  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  127:34  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  140:14  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  140:33  error  Unsafe member access .map on an `any` value                                           @typescript-eslint/no-unsafe-member-access
  141:15  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  142:22  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  142:32  error  Unsafe member access .id on an `any` value                                            @typescript-eslint/no-unsafe-member-access
  145:33  error  Unsafe member access .state on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  149:30  error  Unsafe member access .name on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  151:39  error  Unsafe member access .image on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  155:28  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  155:38  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
  156:38  error  Unsafe member access .state on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  160:39  error  Unsafe member access .created on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  163:20  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  163:30  error  Unsafe member access .ports on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  164:21  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  165:36  error  Unsafe member access .privatePort on an `any` value                                   @typescript-eslint/no-unsafe-member-access
  165:56  error  Unsafe member access .publicPort on an `any` value                                    @typescript-eslint/no-unsafe-member-access
  167:38  error  Unsafe member access .publicPort on an `any` value                                    @typescript-eslint/no-unsafe-member-access
  167:57  error  Unsafe member access .privatePort on an `any` value                                   @typescript-eslint/no-unsafe-member-access
  173:30  error  Unsafe member access .state on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  177:40  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  177:40  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  178:35  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  187:40  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  187:40  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  188:35  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  198:38  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  198:38  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  199:33  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  208:38  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  208:38  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  209:33  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  216:56  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  227:21  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  227:54  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  227:54  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  232:41  error  Unsafe member access .name on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  236:34  error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  236:34  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  237:28  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  243:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerContainers\__tests__\DockerContainers.test.tsx
    2:37  warning  'waitFor' is defined but never used. Allowed unused vars must match /^_/u             @typescript-eslint/no-unused-vars
    7:37  error    Unable to resolve path to module '@/client/hooks/useDockerContainers'                 import/no-unresolved
   46:9   error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   46:17  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   47:30  error    Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
   48:5   error    Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   48:5   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   49:29  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   57:12  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   57:19  error    Unsafe member access .getByText on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   58:12  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   58:19  error    Unsafe member access .getByText on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   59:12  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   59:19  error    Unsafe member access .getByText on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   65:11  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   65:25  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   65:32  error    Unsafe member access .getByPlaceholderText on an `any` value                          @typescript-eslint/no-unsafe-member-access
   66:5   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   66:15  error    Unsafe member access .change on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   74:11  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   74:24  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   74:31  error    Unsafe member access .getByTitle on an `any` value                                    @typescript-eslint/no-unsafe-member-access
   75:5   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   75:15  error    Unsafe member access .click on an `any` value                                         @typescript-eslint/no-unsafe-member-access
   83:59  error    Async arrow function has no 'await' expression                                        @typescript-eslint/require-await
   93:12  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   93:19  error    Unsafe member access .getByText on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   94:12  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   94:19  error    Unsafe member access .getByText on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   96:11  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   96:26  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   96:33  error    Unsafe member access .getByText on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   97:5   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   97:15  error    Unsafe member access .click on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  111:12  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  111:19  error    Unsafe member access .getByRole on an `any` value                                     @typescript-eslint/no-unsafe-member-access
  117:11  error    Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  117:26  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  117:33  error    Unsafe member access .getByTestId on an `any` value                                   @typescript-eslint/no-unsafe-member-access
  117:63  error    Unsafe member access .parentElement on an `any` value                                 @typescript-eslint/no-unsafe-member-access
  118:9   error    Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  119:7   error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  119:17  error    Unsafe member access .click on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  122:12  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  122:19  error    Unsafe member access .getByText on an `any` value                                     @typescript-eslint/no-unsafe-member-access
  123:12  error    Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  123:19  error    Unsafe member access .getByText on an `any` value                                     @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerContainers\styles.ts
   3:41  error  Missing return type on function                  @typescript-eslint/explicit-function-return-type
  21:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  21:22  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  21:34  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerImages\DockerImages.tsx
   33:33  error  Unable to resolve path to module '@/client/hooks/useDockerImages'                       import/no-unresolved
   40:8   error  Missing return type on function                                                         @typescript-eslint/explicit-function-return-type
   41:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   41:17  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   43:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   43:47  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   44:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   44:49  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   45:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   45:47  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   46:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   46:53  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   47:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   47:45  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   49:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   56:7   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   58:3   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   59:10  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   62:36  error  Missing return type on function                                                         @typescript-eslint/explicit-function-return-type
   63:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
   63:29  error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
   64:11  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   65:5   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   66:5   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   67:5   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   70:38  error  Missing return type on function                                                         @typescript-eslint/explicit-function-return-type
   71:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
   72:11  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   72:37  error  Unsafe member access .hostId on an `any` value                                          @typescript-eslint/no-unsafe-member-access
   72:59  error  Unsafe member access .imageId on an `any` value                                         @typescript-eslint/no-unsafe-member-access
   73:5   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   74:5   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   88:7   error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
   89:5   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
   94:11  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   94:72  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  104:3   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  111:24  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  112:28  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  112:28  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  117:45  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  137:14  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  137:21  error  Unsafe member access .map on an `any` value                                             @typescript-eslint/no-unsafe-member-access
  138:15  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  138:30  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  138:36  error  Unsafe member access .id on an `any` value                                              @typescript-eslint/no-unsafe-member-access
  139:35  error  Unsafe member access .repository on an `any` value                                      @typescript-eslint/no-unsafe-member-access
  140:35  error  Unsafe member access .tag on an `any` value                                             @typescript-eslint/no-unsafe-member-access
  141:29  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  141:35  error  Unsafe member access .id on an `any` value                                              @typescript-eslint/no-unsafe-member-access
  142:40  error  Unsafe argument of type `any` assigned to a parameter of type `number`                  @typescript-eslint/no-unsafe-argument
  142:46  error  Unsafe member access .size on an `any` value                                            @typescript-eslint/no-unsafe-member-access
  143:38  error  Unsafe argument of type `any` assigned to a parameter of type `string | number | Date`  @typescript-eslint/no-unsafe-argument
  143:44  error  Unsafe member access .created on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  148:25  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  148:44  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  148:58  error  Unsafe member access .hostId on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  148:66  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  148:81  error  Unsafe member access .id on an `any` value                                              @typescript-eslint/no-unsafe-member-access
  149:25  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  163:21  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  163:52  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  163:52  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  172:20  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  173:30  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  173:30  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  173:51  error  Unsafe member access .target on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  182:20  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  183:30  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  183:30  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  183:50  error  Unsafe member access .target on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  188:15  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  195:34  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  195:34  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  199:24  error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
  199:44  error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
  207:21  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  207:55  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  207:55  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  215:34  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  215:34  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  226:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerImages\__tests__\DockerImages.test.tsx
    7:33  error  Unable to resolve path to module '@/client/hooks/useDockerImages'  import/no-unresolved
   30:7   error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
   33:9   error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
   33:17  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   36:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   36:25  error  Unsafe member access .mockReturnValue on an `any` value            @typescript-eslint/no-unsafe-member-access
   51:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   52:29  error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
   56:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   56:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
   60:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   61:29  error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
   66:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   66:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
   67:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   67:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
   68:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   68:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
   69:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   69:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
   74:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   74:25  error  Unsafe member access .mockReturnValue on an `any` value            @typescript-eslint/no-unsafe-member-access
   83:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   84:29  error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
   90:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   90:15  error  Unsafe member access .click on an `any` value                      @typescript-eslint/no-unsafe-member-access
   90:21  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   90:28  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
   91:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   91:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
   94:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   94:15  error  Unsafe member access .change on an `any` value                     @typescript-eslint/no-unsafe-member-access
   94:22  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   94:29  error  Unsafe member access .getByLabelText on an `any` value             @typescript-eslint/no-unsafe-member-access
   97:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   97:15  error  Unsafe member access .change on an `any` value                     @typescript-eslint/no-unsafe-member-access
   97:22  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
   97:29  error  Unsafe member access .getByLabelText on an `any` value             @typescript-eslint/no-unsafe-member-access
  102:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  102:15  error  Unsafe member access .click on an `any` value                      @typescript-eslint/no-unsafe-member-access
  102:21  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  102:28  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
  104:11  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  111:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  111:25  error  Unsafe member access .mockReturnValue on an `any` value            @typescript-eslint/no-unsafe-member-access
  120:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  121:29  error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
  127:11  error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
  127:27  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  127:34  error  Unsafe member access .getAllByTitle on an `any` value              @typescript-eslint/no-unsafe-member-access
  128:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  128:15  error  Unsafe member access .click on an `any` value                      @typescript-eslint/no-unsafe-member-access
  128:35  error  Unsafe member access [0] on an `any` value                         @typescript-eslint/no-unsafe-member-access
  131:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  131:15  error  Unsafe member access .click on an `any` value                      @typescript-eslint/no-unsafe-member-access
  131:21  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  131:28  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
  133:11  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  139:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  139:25  error  Unsafe member access .mockReturnValue on an `any` value            @typescript-eslint/no-unsafe-member-access
  148:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  149:29  error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
  154:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  154:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
  158:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  158:25  error  Unsafe member access .mockReturnValue on an `any` value            @typescript-eslint/no-unsafe-member-access
  167:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  168:29  error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
  173:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  173:19  error  Unsafe member access .getByRole on an `any` value                  @typescript-eslint/no-unsafe-member-access
  188:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  188:25  error  Unsafe member access .mockReturnValue on an `any` value            @typescript-eslint/no-unsafe-member-access
  197:5   error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  198:29  error  Unsafe assignment of an `any` value                                @typescript-eslint/no-unsafe-assignment
  203:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  203:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access
  204:12  error  Unsafe call of an `any` typed value                                @typescript-eslint/no-unsafe-call
  204:19  error  Unsafe member access .getByText on an `any` value                  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerImages\styles.ts
  3:27  warning  'theme' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  3:41  error    Missing return type on function                                          @typescript-eslint/explicit-function-return-type

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerStats\DockerStats.tsx
   32:32  error    Unable to resolve path to module '@/client/hooks/useDockerStats'                                                import/no-unresolved
   40:11  warning  'ChartData' is defined but never used. Allowed unused vars must match /^_/u                                     @typescript-eslint/no-unused-vars
   57:8   error    Missing return type on function                                                                                 @typescript-eslint/explicit-function-return-type
   62:9   error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   62:17  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   64:9   error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   64:49  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   70:28  error    Missing return type on function                                                                                 @typescript-eslint/explicit-function-return-type
   71:5   error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   74:7   error    Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
   75:5   error    Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
   80:11  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   90:3   error    Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
   96:34  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  110:27  error    Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  111:13  error    Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  121:38  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  121:38  error    Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  121:62  error    Unsafe member access .map on an `any` value                                                                     @typescript-eslint/no-unsafe-member-access
  122:38  error    Unsafe argument of type `any` assigned to a parameter of type `string | number | Date`                          @typescript-eslint/no-unsafe-argument
  122:63  error    Unsafe member access [index] on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  122:63  error    Computed name [index] resolves to an any value                                                                  @typescript-eslint/no-unsafe-member-access
  123:23  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  132:33  error    Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  132:39  error    Unsafe member access .palette on an `any` value                                                                 @typescript-eslint/no-unsafe-member-access
  145:41  error    Unsafe argument of type `any` assigned to a parameter of type `number`                                          @typescript-eslint/no-unsafe-argument
  145:41  error    Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  145:65  error    Unsafe member access [containerStats.cpuUsage.length - 1] on an `any` value                                     @typescript-eslint/no-unsafe-member-access
  145:89  error    Unsafe member access .length on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  153:36  error    Unsafe argument of type `any` assigned to a parameter of type `number`                                          @typescript-eslint/no-unsafe-argument
  153:36  error    Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  153:63  error    Unsafe member access [containerStats.memoryUsage.length - 1] on an `any` value                                  @typescript-eslint/no-unsafe-member-access
  153:90  error    Unsafe member access .length on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  161:36  error    Unsafe argument of type `any` assigned to a parameter of type `number`                                          @typescript-eslint/no-unsafe-argument
  161:36  error    Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  161:61  error    Unsafe member access [containerStats.networkRx.length - 1] on an `any` value                                    @typescript-eslint/no-unsafe-member-access
  161:86  error    Unsafe member access .length on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  169:36  error    Unsafe argument of type `any` assigned to a parameter of type `number`                                          @typescript-eslint/no-unsafe-argument
  169:36  error    Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  169:61  error    Unsafe member access [containerStats.networkTx.length - 1] on an `any` value                                    @typescript-eslint/no-unsafe-member-access
  169:86  error    Unsafe member access .length on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  179:8   error    Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerStats\__tests__\DockerStats.test.tsx
    2:37  warning  'act' is defined but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars
    7:32  error    Unable to resolve path to module '@/client/hooks/useDockerStats'       import/no-unresolved
   18:73  error    Unsafe return of an `any` typed value                                  @typescript-eslint/no-unsafe-return
   38:7   error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   41:9   error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   41:17  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   44:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   44:24  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
   57:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   58:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   62:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   62:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
   66:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   67:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   73:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   73:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
   74:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   74:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
   77:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   77:19  error    Unsafe member access .getAllByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   78:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   78:19  error    Unsafe member access .getAllByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   79:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   79:19  error    Unsafe member access .getAllByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   80:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   80:19  error    Unsafe member access .getAllByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   85:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   85:24  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
   92:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   93:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   98:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   98:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
  102:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  102:24  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
  109:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  110:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  115:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  115:19  error    Unsafe member access .getByRole on an `any` value                      @typescript-eslint/no-unsafe-member-access
  120:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  120:24  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
  127:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  128:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  133:11  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  133:25  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  133:32  error    Unsafe member access .getByTitle on an `any` value                     @typescript-eslint/no-unsafe-member-access
  134:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  134:15  error    Unsafe member access .click on an `any` value                          @typescript-eslint/no-unsafe-member-access
  140:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  141:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  147:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  147:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
  148:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  148:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
  152:11  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  152:26  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  153:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  165:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  165:24  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
  172:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  173:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  178:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  178:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerStats\styles.ts
  3:27  warning  'theme' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  3:41  error    Missing return type on function                                          @typescript-eslint/explicit-function-return-type

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerVolumes\DockerVolumes.tsx
   35:34  error  Unable to resolve path to module '@/client/hooks/useDockerVolumes'                                              import/no-unresolved
   48:8   error  Missing return type on function                                                                                 @typescript-eslint/explicit-function-return-type
   49:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   49:17  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   51:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   51:51  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   52:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   52:47  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   53:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   53:35  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   58:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   58:53  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   59:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   59:47  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   60:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   60:51  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   61:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   61:41  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   63:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   71:7   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   73:3   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   74:10  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   77:39  error  Missing return type on function                                                                                 @typescript-eslint/explicit-function-return-type
   78:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
   78:29  error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
   78:38  error  Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
   81:22  error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
   81:31  error  Unsafe member access .labels on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
   83:13  error  Unsafe argument of type `any` assigned to a parameter of type `Iterable<readonly [PropertyKey, any]>`           @typescript-eslint/no-unsafe-argument
   83:13  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   83:13  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   83:22  error  Unsafe member access .labels on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
   83:40  error  Unsafe member access .map on an `any` value                                                                     @typescript-eslint/no-unsafe-member-access
   84:21  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   84:36  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   84:36  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   84:42  error  Unsafe member access .split on an `any` value                                                                   @typescript-eslint/no-unsafe-member-access
   84:53  error  Unsafe member access .map on an `any` value                                                                     @typescript-eslint/no-unsafe-member-access
   84:64  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
   84:64  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   84:66  error  Unsafe member access .trim on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
   85:15  error  Unsafe return of an `any[]` typed value                                                                         @typescript-eslint/no-unsafe-return
   90:13  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   91:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   91:24  error  Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
   92:9   error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
   92:26  error  Unsafe member access .driver on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
   96:7   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   97:7   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
   98:7   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  104:39  error  Missing return type on function                                                                                 @typescript-eslint/explicit-function-return-type
  105:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  107:13  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  107:41  error  Unsafe member access .hostId on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  107:64  error  Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
  108:7   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  109:7   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  115:39  error  Missing return type on function                                                                                 @typescript-eslint/explicit-function-return-type
  116:10  error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  118:13  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  119:7   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  120:7   error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  126:7   error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  127:5   error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  132:11  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  132:72  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  142:3   error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  149:24  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  150:28  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  150:28  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  156:24  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  158:15  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  159:15  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  165:45  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  184:14  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  184:22  error  Unsafe member access .map on an `any` value                                                                     @typescript-eslint/no-unsafe-member-access
  185:15  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  185:40  error  Unsafe member access .hostId on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  185:57  error  Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
  186:36  error  Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
  187:36  error  Unsafe member access .driver on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  188:59  error  Unsafe member access .mountpoint on an `any` value                                                              @typescript-eslint/no-unsafe-member-access
  190:35  error  Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`  @typescript-eslint/no-unsafe-argument
  190:35  error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  190:42  error  Unsafe member access .labels on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  191:21  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  193:40  error  Invalid type "unknown" of template literal expression                                                           @typescript-eslint/restrict-template-expressions
  203:25  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  203:45  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  203:60  error  Unsafe member access .hostId on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  203:68  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  203:81  error  Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
  204:25  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  218:21  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  218:54  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  218:54  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  227:20  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  227:29  error  Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
  228:30  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  228:30  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  228:57  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  228:65  error  Unsafe member access .target on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  235:20  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  235:29  error  Unsafe member access .driver on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  236:30  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  236:30  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  236:57  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  236:67  error  Unsafe member access .target on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  243:20  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  243:29  error  Unsafe member access .labels on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  244:30  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  244:30  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  244:57  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  244:67  error  Unsafe member access .target on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  253:20  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  254:30  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  254:30  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  254:50  error  Unsafe member access .target on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  259:15  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  266:34  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  266:34  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  270:24  error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  270:33  error  Unsafe member access .name on an `any` value                                                                    @typescript-eslint/no-unsafe-member-access
  270:42  error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions
  278:21  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  278:55  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  278:55  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  286:34  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  286:34  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  298:21  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  298:54  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  298:54  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  310:20  error  Unsafe assignment of an `any` value                                                                             @typescript-eslint/no-unsafe-assignment
  311:30  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  311:30  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  311:47  error  Unsafe member access .target on an `any` value                                                                  @typescript-eslint/no-unsafe-member-access
  315:15  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  322:34  error  Unsafe return of an `any` typed value                                                                           @typescript-eslint/no-unsafe-return
  322:34  error  Unsafe call of an `any` typed value                                                                             @typescript-eslint/no-unsafe-call
  333:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required                            @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerVolumes\__tests__\DockerVolumes.test.tsx
    7:34  error  Unable to resolve path to module '@/client/hooks/useDockerVolumes'  import/no-unresolved
   28:7   error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
   31:9   error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
   31:17  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   34:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   34:26  error  Unsafe member access .mockReturnValue on an `any` value             @typescript-eslint/no-unsafe-member-access
   50:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   51:29  error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
   55:12  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   55:19  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   59:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   60:29  error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
   65:12  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   65:19  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   66:12  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   66:19  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   67:12  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   67:19  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   68:12  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   68:19  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   73:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   73:26  error  Unsafe member access .mockReturnValue on an `any` value             @typescript-eslint/no-unsafe-member-access
   83:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   84:29  error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
   90:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   90:15  error  Unsafe member access .click on an `any` value                       @typescript-eslint/no-unsafe-member-access
   90:21  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   90:28  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   91:12  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   91:19  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
   94:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   94:15  error  Unsafe member access .change on an `any` value                      @typescript-eslint/no-unsafe-member-access
   94:22  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   94:29  error  Unsafe member access .getByLabelText on an `any` value              @typescript-eslint/no-unsafe-member-access
   97:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   97:15  error  Unsafe member access .change on an `any` value                      @typescript-eslint/no-unsafe-member-access
   97:22  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
   97:29  error  Unsafe member access .getByLabelText on an `any` value              @typescript-eslint/no-unsafe-member-access
  100:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  100:15  error  Unsafe member access .change on an `any` value                      @typescript-eslint/no-unsafe-member-access
  100:22  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  100:29  error  Unsafe member access .getByLabelText on an `any` value              @typescript-eslint/no-unsafe-member-access
  103:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  103:15  error  Unsafe member access .change on an `any` value                      @typescript-eslint/no-unsafe-member-access
  103:22  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  103:29  error  Unsafe member access .getByLabelText on an `any` value              @typescript-eslint/no-unsafe-member-access
  108:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  108:15  error  Unsafe member access .click on an `any` value                       @typescript-eslint/no-unsafe-member-access
  108:21  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  108:28  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
  110:11  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  121:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  121:26  error  Unsafe member access .mockReturnValue on an `any` value             @typescript-eslint/no-unsafe-member-access
  131:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  132:29  error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
  138:11  error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
  138:27  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  138:34  error  Unsafe member access .getAllByTitle on an `any` value               @typescript-eslint/no-unsafe-member-access
  139:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  139:15  error  Unsafe member access .click on an `any` value                       @typescript-eslint/no-unsafe-member-access
  139:35  error  Unsafe member access [0] on an `any` value                          @typescript-eslint/no-unsafe-member-access
  142:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  142:15  error  Unsafe member access .click on an `any` value                       @typescript-eslint/no-unsafe-member-access
  142:21  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  142:28  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
  144:11  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  151:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  151:26  error  Unsafe member access .mockReturnValue on an `any` value             @typescript-eslint/no-unsafe-member-access
  161:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  162:29  error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
  168:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  168:15  error  Unsafe member access .click on an `any` value                       @typescript-eslint/no-unsafe-member-access
  168:21  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  168:28  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
  171:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  171:15  error  Unsafe member access .click on an `any` value                       @typescript-eslint/no-unsafe-member-access
  171:21  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  171:28  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
  173:11  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  179:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  179:26  error  Unsafe member access .mockReturnValue on an `any` value             @typescript-eslint/no-unsafe-member-access
  189:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  190:29  error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
  195:12  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  195:19  error  Unsafe member access .getByText on an `any` value                   @typescript-eslint/no-unsafe-member-access
  199:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  199:26  error  Unsafe member access .mockReturnValue on an `any` value             @typescript-eslint/no-unsafe-member-access
  209:5   error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  210:29  error  Unsafe assignment of an `any` value                                 @typescript-eslint/no-unsafe-assignment
  215:12  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  215:19  error  Unsafe member access .getByRole on an `any` value                   @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\DockerVolumes\styles.ts
  3:27  warning  'theme' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  3:41  error    Missing return type on function                                          @typescript-eslint/explicit-function-return-type

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\LogViewer\LogViewer.tsx
   29:30  error  Unable to resolve path to module '@/client/hooks/useLogViewer'                          import/no-unresolved
   30:27  error  Unable to resolve path to module '@/client/types/docker.types'                          import/no-unresolved
   49:7   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   49:16  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   49:22  error  Unsafe member access .memo on an `any` value                                            @typescript-eslint/no-unsafe-member-access
   50:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   50:17  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   52:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   53:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
   55:3   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
   56:14  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   58:19  error  Unsafe argument of type `any` assigned to a parameter of type `string | number | Date`  @typescript-eslint/no-unsafe-argument
   58:23  error  Unsafe member access .timestamp on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   61:28  error  Unsafe argument of type `any` assigned to a parameter of type `string`                  @typescript-eslint/no-unsafe-argument
   61:32  error  Unsafe member access .level on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   62:53  error  Unsafe argument of type `any` assigned to a parameter of type `string`                  @typescript-eslint/no-unsafe-argument
   62:57  error  Unsafe member access .level on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   63:16  error  Unsafe member access .level on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   66:43  error  Unsafe member access .source on an `any` value                                          @typescript-eslint/no-unsafe-member-access
   70:19  error  Unsafe member access .level on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   71:19  error  Unsafe member access .level on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   72:19  error  Unsafe member access .level on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   73:19  error  Unsafe member access .level on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   76:14  error  Unsafe member access .message on an `any` value                                         @typescript-eslint/no-unsafe-member-access
   82:8   error  Unsafe member access .displayName on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   84:8   error  Missing return type on function                                                         @typescript-eslint/explicit-function-return-type
   85:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   85:17  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   87:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   87:41  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   87:47  error  Unsafe member access .useState on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   88:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   88:39  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   88:45  error  Unsafe member access .useState on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   89:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   89:19  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
   89:26  error  'any' overrides all other types in this union type                                      @typescript-eslint/no-redundant-type-constituents
   91:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
   99:7   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  101:5   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  104:3   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  106:12  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  111:9   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  116:3   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  117:9   error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
  117:23  error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
  117:31  error  Unsafe member access .current on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  117:47  error  Unsafe member access .length on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  118:7   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  118:15  error  Unsafe member access .current on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  118:41  error  Unsafe member access .length on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  122:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  122:29  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  123:5   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  126:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  126:34  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  127:5   error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  127:25  error  Unsafe member access .target on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  130:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  130:25  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  131:10  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  134:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  134:24  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  137:9   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  139:9   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  141:9   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  143:9   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  147:9   error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  147:25  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  150:9   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  150:22  error  Unsafe member access .palette on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  152:9   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  152:22  error  Unsafe member access .palette on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  154:9   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  154:22  error  Unsafe member access .palette on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  156:9   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  156:22  error  Unsafe member access .palette on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  160:7   error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
  161:5   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  166:11  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  166:61  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  176:3   error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  183:15  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  184:26  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  185:27  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  193:30  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  193:30  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  193:46  error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
  194:22  error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
  200:34  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  205:34  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  212:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions
  217:17  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  218:35  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  218:35  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  226:17  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  227:35  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  227:35  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  235:17  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  236:35  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  236:35  error  Unsafe call of an `any` typed value                                                     @typescript-eslint/no-unsafe-call
  249:13  error  Unsafe return of an `any` typed value                                                   @typescript-eslint/no-unsafe-return
  250:20  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  251:23  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  252:22  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  253:26  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  253:31  error  Unsafe member access .length on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  256:17  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  257:17  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  258:17  error  Unsafe assignment of an `any` value                                                     @typescript-eslint/no-unsafe-assignment
  267:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required    @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\LogViewer\__tests__\LogViewer.test.tsx
    2:37  warning  'act' is defined but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars
    7:30  error    Unable to resolve path to module '@/client/hooks/useLogViewer'         import/no-unresolved
   13:35  error    Unsafe return of an `any` typed value                                  @typescript-eslint/no-unsafe-return
   13:35  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   37:7   error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   40:9   error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   40:17  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   43:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   43:22  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
   59:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   60:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   64:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   64:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
   68:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   69:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   74:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   74:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
   75:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   75:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
   76:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   76:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
   80:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   80:22  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
   90:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   91:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
   96:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
   96:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
  100:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  100:22  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
  110:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  111:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  116:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  116:19  error    Unsafe member access .getByRole on an `any` value                      @typescript-eslint/no-unsafe-member-access
  120:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  121:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  126:11  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  126:26  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  126:33  error    Unsafe member access .getByTitle on an `any` value                     @typescript-eslint/no-unsafe-member-access
  127:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  127:15  error    Unsafe member access .click on an `any` value                          @typescript-eslint/no-unsafe-member-access
  129:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  129:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
  130:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  130:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
  131:12  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  131:19  error    Unsafe member access .getByText on an `any` value                      @typescript-eslint/no-unsafe-member-access
  138:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  138:22  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
  148:11  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  148:25  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  149:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  156:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  162:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  163:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  168:11  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  168:32  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  168:39  error    Unsafe member access .getByRole on an `any` value                      @typescript-eslint/no-unsafe-member-access
  171:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  171:15  error    Unsafe member access .click on an `any` value                          @typescript-eslint/no-unsafe-member-access
  177:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  177:22  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
  187:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  188:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  193:11  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  193:25  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  193:32  error    Unsafe member access .getByTitle on an `any` value                     @typescript-eslint/no-unsafe-member-access
  194:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  194:15  error    Unsafe member access .click on an `any` value                          @typescript-eslint/no-unsafe-member-access
  201:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  201:22  error    Unsafe member access .mockReturnValue on an `any` value                @typescript-eslint/no-unsafe-member-access
  211:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  212:29  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  218:11  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  218:26  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  218:33  error    Unsafe member access .getByTitle on an `any` value                     @typescript-eslint/no-unsafe-member-access
  219:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  219:15  error    Unsafe member access .click on an `any` value                          @typescript-eslint/no-unsafe-member-access
  222:11  error    Unsafe assignment of an `any` value                                    @typescript-eslint/no-unsafe-assignment
  222:26  error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  222:33  error    Unsafe member access .getByRole on an `any` value                      @typescript-eslint/no-unsafe-member-access
  223:5   error    Unsafe call of an `any` typed value                                    @typescript-eslint/no-unsafe-call
  223:15  error    Unsafe member access .click on an `any` value                          @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\LogViewer\styles.ts
   3:41  error  Missing return type on function                  @typescript-eslint/explicit-function-return-type
  26:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  26:20  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  27:9   error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  27:21  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  28:9   error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  28:21  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  35:32  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  35:44  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  37:7   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  37:16  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  37:28  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  41:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  41:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  52:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  52:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  64:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  64:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  67:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  67:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  70:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  70:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  73:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  73:18  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\TabPanel.tsx
  5:8   error  Missing return type on function                                    @typescript-eslint/explicit-function-return-type
  6:11  error  Unsafe array destructuring of a tuple element with an `any` value  @typescript-eslint/no-unsafe-assignment
  8:3   error  Unsafe return of an `any` typed value                              @typescript-eslint/no-unsafe-return

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\components\__tests__\TabPanel.test.tsx
   8:5   error  Unsafe assignment of an `any` value                  @typescript-eslint/no-unsafe-assignment
  14:5   error  Unsafe call of an `any` typed value                  @typescript-eslint/no-unsafe-call
  15:12  error  Unsafe call of an `any` typed value                  @typescript-eslint/no-unsafe-call
  15:19  error  Unsafe member access .getByText on an `any` value    @typescript-eslint/no-unsafe-member-access
  19:5   error  Unsafe call of an `any` typed value                  @typescript-eslint/no-unsafe-call
  20:12  error  Unsafe call of an `any` typed value                  @typescript-eslint/no-unsafe-call
  20:19  error  Unsafe member access .queryByText on an `any` value  @typescript-eslint/no-unsafe-member-access
  24:5   error  Unsafe call of an `any` typed value                  @typescript-eslint/no-unsafe-call
  25:11  error  Unsafe assignment of an `any` value                  @typescript-eslint/no-unsafe-assignment
  25:19  error  Unsafe call of an `any` typed value                  @typescript-eslint/no-unsafe-call
  25:26  error  Unsafe member access .getByRole on an `any` value    @typescript-eslint/no-unsafe-member-access
  31:5   error  Unsafe call of an `any` typed value                  @typescript-eslint/no-unsafe-call
  32:11  error  Unsafe assignment of an `any` value                  @typescript-eslint/no-unsafe-assignment
  32:19  error  Unsafe call of an `any` typed value                  @typescript-eslint/no-unsafe-call
  32:26  error  Unsafe member access .getByRole on an `any` value    @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\Docker\styles.ts
   3:41  error  Missing return type on function                  @typescript-eslint/explicit-function-return-type
  12:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  12:20  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  13:9   error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  13:21  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  14:15  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  19:23  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  27:7   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  27:16  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  27:28  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  33:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  33:14  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  33:26  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  40:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  40:14  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  40:26  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  51:7   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  51:20  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  53:9   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  53:22  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  74:5   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  74:20  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  75:9   error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  75:21  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  76:15  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\EnvTest\EnvTest.tsx
  15:3  error  Unsafe return of an `any` typed value  @typescript-eslint/no-unsafe-return

C:\Users\jmaga\code\dsh\frontend\src\components\EnvTest\__tests__\EnvTest.test.tsx
   4:25  error  Unable to resolve path to module './EnvTest'       import/no-unresolved
  25:5   error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  26:12  error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  26:19  error  Unsafe member access .getByText on an `any` value  @typescript-eslint/no-unsafe-member-access
  30:5   error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  31:11  error  Unsafe assignment of an `any` value                @typescript-eslint/no-unsafe-assignment
  31:24  error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  31:31  error  Unsafe member access .getByText on an `any` value  @typescript-eslint/no-unsafe-member-access
  45:5   error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  46:11  error  Unsafe assignment of an `any` value                @typescript-eslint/no-unsafe-assignment
  46:24  error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  46:31  error  Unsafe member access .getByText on an `any` value  @typescript-eslint/no-unsafe-member-access
  53:5   error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  55:11  error  Unsafe assignment of an `any` value                @typescript-eslint/no-unsafe-assignment
  55:23  error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  55:23  error  Unsafe call of an `any` typed value                @typescript-eslint/no-unsafe-call
  55:30  error  Unsafe member access .getByText on an `any` value  @typescript-eslint/no-unsafe-member-access
  55:70  error  Unsafe member access .closest on an `any` value    @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\EnvTest\index.ts
  1:15  error  No named exports found in module './EnvTest'  import/export

C:\Users\jmaga\code\dsh\frontend\src\components\common\Card\StatusCard.tsx
  22:3   error  Unsafe return of an `any` typed value  @typescript-eslint/no-unsafe-return
  23:15  error  Unsafe assignment of an `any` value    @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\components\index.ts
  1:15  error  Unable to resolve path to module './AgentMetrics'  import/no-unresolved
  2:15  error  No named exports found in module './EnvTest'       import/export
  3:15  error  Unable to resolve path to module './SystemStatus'  import/no-unresolved

C:\Users\jmaga\code\dsh\frontend\src\components\monitoring\StatusCards\AgentStatusCard.tsx
   1:43  error  Unable to resolve path to module '@dsh/shared/utils/format.js'                        import/no-unresolved
  14:3   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
  15:22  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  19:26  error  Unsafe member access .hostname on an `any` value                                      @typescript-eslint/no-unsafe-member-access
  21:12  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  22:34  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  29:34  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
  32:22  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  32:43  error  Unsafe member access .uptime on an `any` value                                        @typescript-eslint/no-unsafe-member-access
  35:22  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  35:42  error  Unsafe member access .memory on an `any` value                                        @typescript-eslint/no-unsafe-member-access
  35:59  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  35:79  error  Unsafe member access .memory on an `any` value                                        @typescript-eslint/no-unsafe-member-access
  38:24  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  38:32  error  Unsafe member access .cpu on an `any` value                                           @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\monitoring\StatusCards\ServiceStatusCard.tsx
  14:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  14:19  error  Unexpected nullable string value in conditional. Please handle the nullish/empty cases explicitly  @typescript-eslint/strict-boolean-expressions
  20:3   error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
  22:13  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  22:13  error  Unexpected any value in conditional. An explicit comparison or type cast is required               @typescript-eslint/strict-boolean-expressions
  23:14  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  24:16  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\components\monitoring\StatusCards\styles.ts
   5:37  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
   5:37  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
   5:43  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access
   9:36  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
   9:42  error  Unsafe member access .shadows on an `any` value  @typescript-eslint/no-unsafe-member-access
  13:37  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  13:37  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  13:43  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\components\monitoring\StatusCards\utils.ts
  2:8  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions

C:\Users\jmaga\code\dsh\frontend\src\hooks\useAgent.ts
   4:53  error    Unable to resolve path to module '../api/agent.js'                                                                                                                  import/no-unresolved
   7:11  error    'any' overrides all other types in this union type                                                                                                                  @typescript-eslint/no-redundant-type-constituents
  15:9   error    Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  15:31  error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  15:40  error    'any' overrides all other types in this union type                                                                                                                  @typescript-eslint/no-redundant-type-constituents
  16:9   error    Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  16:29  error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  17:9   error    Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  17:37  error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  19:32  error    Missing return type on function                                                                                                                                     @typescript-eslint/explicit-function-return-type
  21:7   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  22:13  error    Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  22:26  error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  23:7   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  24:7   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  26:7   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  28:7   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  32:71  error    Missing return type on function                                                                                                                                     @typescript-eslint/explicit-function-return-type
  34:7   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  35:13  error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  38:7   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  41:7   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  45:3   error    Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  46:5   error    Promises must be awaited, end with a call to .catch, end with a call to .then with a rejection handler or be explicitly marked as ignored with the `void` operator  @typescript-eslint/no-floating-promises
  47:34  error    Promise returned in function argument where a void return was expected                                                                                              @typescript-eslint/no-misused-promises
  49:6   warning  React Hook useEffect has a missing dependency: 'fetchStatus'. Either include it or remove the dependency array                                                      react-hooks/exhaustive-deps
  52:5   error    Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  53:5   error    Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  54:5   error    Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\hooks\useMonitoring.ts
   5:54  error  Unable to resolve path to module '../api/monitoring.js'                                                                                                             import/no-unresolved
   8:12  error  'any' overrides all other types in this union type                                                                                                                  @typescript-eslint/no-redundant-type-constituents
   9:16  error  'any' overrides all other types in this union type                                                                                                                  @typescript-eslint/no-redundant-type-constituents
  16:9   error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  16:33  error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  16:42  error  'any' overrides all other types in this union type                                                                                                                  @typescript-eslint/no-redundant-type-constituents
  17:9   error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  17:41  error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  17:50  error  'any' overrides all other types in this union type                                                                                                                  @typescript-eslint/no-redundant-type-constituents
  18:9   error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  18:29  error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  19:9   error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  19:37  error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  21:30  error  Missing return type on function                                                                                                                                     @typescript-eslint/explicit-function-return-type
  23:7   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  24:13  error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  25:9   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  26:9   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  28:7   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  29:7   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  30:7   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  32:7   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  34:7   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  38:3   error  Unsafe call of an `any` typed value                                                                                                                                 @typescript-eslint/no-unsafe-call
  39:5   error  Promises must be awaited, end with a call to .catch, end with a call to .then with a rejection handler or be explicitly marked as ignored with the `void` operator  @typescript-eslint/no-floating-promises
  40:34  error  Promise returned in function argument where a void return was expected                                                                                              @typescript-eslint/no-misused-promises
  45:5   error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  46:5   error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  47:5   error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment
  48:5   error  Unsafe assignment of an `any` value                                                                                                                                 @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\hooks\useUI.ts
  13:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  13:17  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  14:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  14:27  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  15:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  15:39  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  17:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  17:20  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  17:34  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  17:40  error  Unsafe member access .breakpoints on an `any` value                                   @typescript-eslint/no-unsafe-member-access
  18:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  18:20  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  18:34  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  18:40  error  Unsafe member access .breakpoints on an `any` value                                   @typescript-eslint/no-unsafe-member-access
  19:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  19:21  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  19:35  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  19:41  error  Unsafe member access .breakpoints on an `any` value                                   @typescript-eslint/no-unsafe-member-access
  21:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  21:26  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  22:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  22:28  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  25:3   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  26:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  30:5   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  31:5   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  32:5   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  33:5   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  34:5   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\index.tsx
  18:11  error  Unsafe assignment of an `any` value             @typescript-eslint/no-unsafe-assignment
  18:18  error  Unsafe call of an `any` typed value             @typescript-eslint/no-unsafe-call
  19:5   error  Unsafe call of an `any` typed value             @typescript-eslint/no-unsafe-call
  19:10  error  Unsafe member access .render on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\main.tsx
   4:26  error  Unable to resolve path to module 'react-redux'      import/no-unresolved
  10:1   error  Unsafe call of an `any` typed value                 @typescript-eslint/no-unsafe-call
  10:1   error  Unsafe call of an `any` typed value                 @typescript-eslint/no-unsafe-call
  10:10  error  Unsafe member access .createRoot on an `any` value  @typescript-eslint/no-unsafe-member-access
  10:55  error  Unsafe member access .render on an `any` value      @typescript-eslint/no-unsafe-member-access
  12:22  error  Unsafe assignment of an `any` value                 @typescript-eslint/no-unsafe-assignment
  13:29  error  Unsafe assignment of an `any` value                 @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\pages\SystemStatus\components\SystemStatus.test.tsx
    4:27  error  Unable to resolve path to module '../../services/api'  import/no-unresolved
   49:16  error  Unsafe member access .get on an `any` value            @typescript-eslint/no-unsafe-member-access
   50:5   error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   51:12  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   51:19  error  Unsafe member access .getByRole on an `any` value      @typescript-eslint/no-unsafe-member-access
   55:16  error  Unsafe member access .get on an `any` value            @typescript-eslint/no-unsafe-member-access
   57:5   error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   59:11  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   60:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   60:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access
   61:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   61:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access
   62:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   62:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access
   63:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   63:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access
   64:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   64:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access
   69:16  error  Unsafe member access .get on an `any` value            @typescript-eslint/no-unsafe-member-access
   71:5   error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   73:11  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   74:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   74:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access
   79:16  error  Unsafe member access .get on an `any` value            @typescript-eslint/no-unsafe-member-access
   86:5   error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   88:11  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   89:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
   89:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access
  100:16  error  Unsafe member access .get on an `any` value            @typescript-eslint/no-unsafe-member-access
  106:5   error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
  108:11  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
  109:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
  109:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access
  114:11  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
  115:14  error  Unsafe call of an `any` typed value                    @typescript-eslint/no-unsafe-call
  115:21  error  Unsafe member access .getByText on an `any` value      @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\pages\SystemStatus\components\SystemStatus.tsx
   5:52  error  Unable to resolve path to module '../../../components/StatusCards'  import/no-unresolved
   6:33  error  Unable to resolve path to module '../../../hooks/useSystemStatus'   import/no-unresolved
  26:17  error  Unsafe call of an `any` typed value                                 @typescript-eslint/no-unsafe-call
  29:5   error  Unsafe return of an `any` typed value                               @typescript-eslint/no-unsafe-return
  37:5   error  Unsafe return of an `any` typed value                               @typescript-eslint/no-unsafe-return
  44:3   error  Unsafe return of an `any` typed value                               @typescript-eslint/no-unsafe-return
  73:9   error  Unsafe return of an `any` typed value                               @typescript-eslint/no-unsafe-return

C:\Users\jmaga\code\dsh\frontend\src\pages\SystemStatus\components\styles.ts
   8:37  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
   8:37  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
   8:43  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access
  11:37  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  11:37  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  11:43  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access
  15:36  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  15:42  error  Unsafe member access .shadows on an `any` value  @typescript-eslint/no-unsafe-member-access
  19:37  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  19:37  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  19:43  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access
  22:37  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  22:37  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  22:43  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access
  25:34  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  25:34  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  25:40  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access
  26:37  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  26:37  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  26:43  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access
  29:30  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  29:36  error  Unsafe member access .palette on an `any` value  @typescript-eslint/no-unsafe-member-access
  32:37  error  Unsafe return of an `any` typed value            @typescript-eslint/no-unsafe-return
  32:37  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  32:43  error  Unsafe member access .spacing on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\pages\SystemStatus\index.tsx
  7:3  error  Unsafe return of an `any` typed value  @typescript-eslint/no-unsafe-return

C:\Users\jmaga\code\dsh\frontend\src\pages\index.ts
  1:41  error  Unable to resolve path to module './AgentMetrics'     import/no-unresolved
  2:36  error  Unable to resolve path to module './EnvTest'          import/no-unresolved
  3:44  error  Unable to resolve path to module './MetricsOverview'  import/no-unresolved
  4:36  error  Unable to resolve path to module './Servers'          import/no-unresolved

C:\Users\jmaga\code\dsh\frontend\src\services\agent.client.ts
  64:33  error  Unsafe argument of type `any` assigned to a parameter of type `string`  @typescript-eslint/no-unsafe-argument

C:\Users\jmaga\code\dsh\frontend\src\services\api.ts
    2:19  error  Unable to resolve path to module 'axios'                                              import/no-unresolved
   15:14  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   15:41  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   15:47  error  Unsafe member access .create on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   24:1   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   24:11  error  Unsafe member access .interceptors on an `any` value                                  @typescript-eslint/no-unsafe-member-access
   27:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   27:19  error  Unsafe member access .url on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   28:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   28:22  error  Unsafe member access .method on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   32:48  error  Unsafe member access .url on an `any` value                                           @typescript-eslint/no-unsafe-member-access
   33:5   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   35:19  error  'any' overrides all other types in this union type                                    @typescript-eslint/no-redundant-type-constituents
   37:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   47:1   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   47:11  error  Unsafe member access .interceptors on an `any` value                                  @typescript-eslint/no-unsafe-member-access
   50:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   50:21  error  Unsafe member access .config on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   51:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   51:15  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   51:24  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   55:44  error  Unsafe member access .config on an `any` value                                        @typescript-eslint/no-unsafe-member-access
   56:5   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   58:19  error  'any' overrides all other types in this union type                                    @typescript-eslint/no-redundant-type-constituents
   60:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   75:1   error  Async function 'handleApiResponse' has no 'await' expression                          @typescript-eslint/require-await
   76:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   77:8   error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   77:20  error  Unsafe member access .success on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   77:32  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   77:44  error  Unsafe member access .data on an `any` value                                          @typescript-eslint/no-unsafe-member-access
   78:21  error  Unsafe argument of type `any` assigned to a parameter of type `string | undefined`    @typescript-eslint/no-unsafe-argument
   78:21  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   78:33  error  Unsafe member access .error on an `any` value                                         @typescript-eslint/no-unsafe-member-access
   80:3   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   80:22  error  Unsafe member access .data on an `any` value                                          @typescript-eslint/no-unsafe-member-access
   84:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   84:26  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   84:36  error  Unsafe member access .post on an `any` value                                          @typescript-eslint/no-unsafe-member-access
   89:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   89:26  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   89:36  error  Unsafe member access .post on an `any` value                                          @typescript-eslint/no-unsafe-member-access
   94:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   94:26  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   94:36  error  Unsafe member access .post on an `any` value                                          @typescript-eslint/no-unsafe-member-access
   99:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   99:26  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   99:36  error  Unsafe member access .get on an `any` value                                           @typescript-eslint/no-unsafe-member-access
  104:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  104:26  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  104:36  error  Unsafe member access .get on an `any` value                                           @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\setupTests.ts
  35:5  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\store.ts
  3:14  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  3:22  error  Unsafe call of an `any` typed value  @typescript-eslint/no-unsafe-call

C:\Users\jmaga\code\dsh\frontend\src\store\hooks.ts
  1:42  error  Unable to resolve path to module 'react-redux'  import/no-unresolved
  6:14  error  Unsafe assignment of an `any` value             @typescript-eslint/no-unsafe-assignment
  7:14  error  Unsafe assignment of an `any` value             @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\store\index.ts
  12:14  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  12:22  error  Unsafe call of an `any` typed value  @typescript-eslint/no-unsafe-call
  14:5   error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  15:5   error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  16:5   error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  17:5   error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  18:5   error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment

C:\Users\jmaga\code\dsh\frontend\src\store\slices\__tests__\agentSlice.test.ts
   31:14  error  'any' overrides all other types in this intersection type  @typescript-eslint/no-redundant-type-constituents
   36:5   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   36:13  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   38:9   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   49:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   49:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   49:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   50:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   50:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   50:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   51:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   53:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   53:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   53:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   54:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   54:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   54:34  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   55:27  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   63:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   63:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   63:34  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   63:43  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   64:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   64:27  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
   66:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   66:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   66:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   67:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   68:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   69:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   70:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   77:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   77:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   77:34  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   77:43  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   78:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   78:27  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
   80:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   80:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   80:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   81:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   82:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   83:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
   89:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   89:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   89:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   89:35  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
   95:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   95:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   95:34  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   95:43  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   96:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   96:30  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
   98:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   98:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   98:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   99:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  100:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  101:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  108:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  108:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  108:34  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  108:43  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  109:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  109:30  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
  111:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  111:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  111:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  112:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  113:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  114:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  123:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  123:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  123:34  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  123:43  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  124:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  124:28  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  126:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  126:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  126:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  127:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  128:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  129:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  136:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  136:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  136:34  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  136:43  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  137:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  137:28  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
  139:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  139:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  139:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  140:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  141:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access
  142:20  error  Unsafe member access .agents on an `any` value             @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\__tests__\chatSlice.test.ts
   14:14  error  'any' overrides all other types in this intersection type  @typescript-eslint/no-redundant-type-constituents
   19:5   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   19:13  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   21:9   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   31:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   31:34  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   35:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   35:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   35:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   36:27  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   36:33  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   40:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   40:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   40:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   41:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   41:34  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   47:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   47:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   47:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   47:34  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
   48:26  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   48:32  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   52:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   52:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   52:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   53:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   53:34  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   63:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   63:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   63:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   63:37  error  Unsafe member access .pending on an `any` value            @typescript-eslint/no-unsafe-member-access
   64:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   64:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   77:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   77:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   77:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   77:37  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
   78:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   78:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   87:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   87:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   87:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   87:37  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
   88:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   88:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  106:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  106:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  106:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  106:37  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  110:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  110:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  110:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  110:36  error  Unsafe member access .pending on an `any` value            @typescript-eslint/no-unsafe-member-access
  111:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  111:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  125:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  125:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  125:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  125:36  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  126:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  126:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  135:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  135:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  135:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  135:36  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
  136:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  136:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  150:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  150:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  150:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  150:36  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  155:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  155:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\__tests__\dockerSlice.test.ts
   15:14  error  'any' overrides all other types in this intersection type  @typescript-eslint/no-redundant-type-constituents
   20:5   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   20:13  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   22:9   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   32:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   32:34  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   36:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   36:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   36:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   37:29  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   37:35  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   41:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   41:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   41:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   42:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   42:34  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   48:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   48:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   48:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   48:38  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
   49:26  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   49:32  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   53:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   53:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   53:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   54:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   54:34  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   62:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   62:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   62:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   62:40  error  Unsafe member access .pending on an `any` value            @typescript-eslint/no-unsafe-member-access
   63:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   63:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   80:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   80:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   80:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   80:40  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
   81:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   81:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   89:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   89:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   89:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   89:40  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
   90:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   90:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  109:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  109:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  109:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  109:40  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  113:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  113:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  113:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  113:39  error  Unsafe member access .pending on an `any` value            @typescript-eslint/no-unsafe-member-access
  114:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  114:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  120:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  120:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  120:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  120:39  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  121:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  121:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  129:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  129:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  129:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  129:39  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
  130:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  130:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  149:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  149:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  149:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  149:40  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  153:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  153:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  153:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  153:38  error  Unsafe member access .pending on an `any` value            @typescript-eslint/no-unsafe-member-access
  154:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  154:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  160:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  160:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  160:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  160:38  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  161:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  161:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  169:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  169:15  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  169:24  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  169:38  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
  170:23  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  170:29  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\__tests__\metricsSlice.test.ts
   32:14  error  'any' overrides all other types in this intersection type  @typescript-eslint/no-redundant-type-constituents
   37:5   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   37:13  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   39:9   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   51:13  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   51:19  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   52:9   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   52:22  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
   56:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   56:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   56:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   57:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   57:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   69:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   69:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   69:34  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   69:43  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   70:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   70:27  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
   72:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   72:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   82:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   82:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   82:34  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   82:43  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   83:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   83:27  error  Unsafe member access .rejected on an `any` value           @typescript-eslint/no-unsafe-member-access
   85:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   85:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
   94:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
   94:33  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   94:39  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
   94:48  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   95:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
   95:27  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  103:13  error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  103:34  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  103:40  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  103:49  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  104:14  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  104:27  error  Unsafe member access .fulfilled on an `any` value          @typescript-eslint/no-unsafe-member-access
  106:21  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  106:27  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\__tests__\uiSlice.test.ts
   8:14  error  'any' overrides all other types in this intersection type  @typescript-eslint/no-redundant-type-constituents
  13:5   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  13:13  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  15:9   error  Unsafe assignment of an `any` value                        @typescript-eslint/no-unsafe-assignment
  23:28  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  23:34  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  27:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  27:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  27:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  28:25  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  28:31  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access
  32:7   error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  32:13  error  Unsafe member access .dispatch on an `any` value           @typescript-eslint/no-unsafe-member-access
  32:22  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  33:27  error  Unsafe call of an `any` typed value                        @typescript-eslint/no-unsafe-call
  33:33  error  Unsafe member access .getState on an `any` value           @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\agentSlice.ts
   22:14  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
   22:29  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   28:7   error  Unsafe return of an `any` typed value                    @typescript-eslint/no-unsafe-return
   28:14  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   33:14  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
   33:32  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   40:7   error  Unsafe return of an `any` typed value                    @typescript-eslint/no-unsafe-return
   40:14  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   45:14  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
   45:30  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   51:7   error  Unsafe return of an `any` typed value                    @typescript-eslint/no-unsafe-return
   51:14  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   56:7   error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
   56:20  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   61:7   error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
   61:13  error  Unsafe member access .selectedAgentId on an `any` value  @typescript-eslint/no-unsafe-member-access
   61:38  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
   64:13  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   68:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   70:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
   70:29  error  Unsafe member access .pending on an `any` value          @typescript-eslint/no-unsafe-member-access
   71:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
   72:15  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
   74:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
   74:29  error  Unsafe member access .fulfilled on an `any` value        @typescript-eslint/no-unsafe-member-access
   75:9   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   75:15  error  Unsafe member access .connections on an `any` value      @typescript-eslint/no-unsafe-member-access
   75:39  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
   76:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
   78:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
   78:29  error  Unsafe member access .rejected on an `any` value         @typescript-eslint/no-unsafe-member-access
   79:15  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
   79:30  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
   80:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
   83:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
   83:32  error  Unsafe member access .pending on an `any` value          @typescript-eslint/no-unsafe-member-access
   84:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
   85:15  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
   87:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
   87:32  error  Unsafe member access .fulfilled on an `any` value        @typescript-eslint/no-unsafe-member-access
   88:9   error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
   88:15  error  Unsafe member access .connections on an `any` value      @typescript-eslint/no-unsafe-member-access
   88:29  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
   88:35  error  Unsafe member access .connections on an `any` value      @typescript-eslint/no-unsafe-member-access
   88:69  error  Unsafe member access .id on an `any` value               @typescript-eslint/no-unsafe-member-access
   88:83  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
   89:19  error  Unsafe member access .selectedAgentId on an `any` value  @typescript-eslint/no-unsafe-member-access
   89:46  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
   90:17  error  Unsafe member access .selectedAgentId on an `any` value  @typescript-eslint/no-unsafe-member-access
   92:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
   94:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
   94:32  error  Unsafe member access .rejected on an `any` value         @typescript-eslint/no-unsafe-member-access
   95:15  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
   95:30  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
   96:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
   99:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
   99:30  error  Unsafe member access .pending on an `any` value          @typescript-eslint/no-unsafe-member-access
  100:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
  101:15  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
  103:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
  103:30  error  Unsafe member access .fulfilled on an `any` value        @typescript-eslint/no-unsafe-member-access
  104:9   error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  104:15  error  Unsafe member access .connections on an `any` value      @typescript-eslint/no-unsafe-member-access
  104:36  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
  105:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
  107:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
  107:30  error  Unsafe member access .rejected on an `any` value         @typescript-eslint/no-unsafe-member-access
  108:15  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
  108:30  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
  109:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
  115:52  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  117:58  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  119:57  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  121:54  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  123:52  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  125:14  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  125:60  error  Unsafe member access .actions on an `any` value          @typescript-eslint/no-unsafe-member-access
  126:14  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  126:40  error  Unsafe member access .reducer on an `any` value          @typescript-eslint/no-unsafe-member-access
  127:27  error  Unsafe member access .reducer on an `any` value          @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\chatSlice.ts
   35:14  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   35:28  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   37:95  error  Async arrow function has no 'await' expression                                                     @typescript-eslint/require-await
   49:7   error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
   49:14  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   54:14  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   54:29  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   56:48  error  Async arrow function has no 'await' expression                                                     @typescript-eslint/require-await
   67:7   error  Unsafe return of an `any` typed value                                                              @typescript-eslint/no-unsafe-return
   67:14  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   72:7   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   72:19  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   77:7   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   77:13  error  Unsafe member access .activeSessionId on an `any` value                                            @typescript-eslint/no-unsafe-member-access
   77:38  error  Unsafe member access .payload on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   80:13  error  Unsafe member access .error on an `any` value                                                      @typescript-eslint/no-unsafe-member-access
   84:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   84:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   84:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   84:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   84:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   84:5   error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   86:8   error  Unsafe member access .addCase on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   86:28  error  Unsafe member access .pending on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   87:15  error  Unsafe member access .loading on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   88:15  error  Unsafe member access .error on an `any` value                                                      @typescript-eslint/no-unsafe-member-access
   90:8   error  Unsafe member access .addCase on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   90:28  error  Unsafe member access .fulfilled on an `any` value                                                  @typescript-eslint/no-unsafe-member-access
   91:15  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
   91:47  error  Unsafe member access .payload on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   92:13  error  Unexpected any value in conditional. An explicit comparison or type cast is required               @typescript-eslint/strict-boolean-expressions
   92:19  error  Unsafe member access .sessions on an `any` value                                                   @typescript-eslint/no-unsafe-member-access
   92:28  error  Computed name [sessionId] resolves to an any value                                                 @typescript-eslint/no-unsafe-member-access
   93:11  error  Unsafe call of an `any` typed value                                                                @typescript-eslint/no-unsafe-call
   93:17  error  Unsafe member access .sessions on an `any` value                                                   @typescript-eslint/no-unsafe-member-access
   93:26  error  Computed name [sessionId] resolves to an any value                                                 @typescript-eslint/no-unsafe-member-access
   95:15  error  Unsafe member access .loading on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   97:8   error  Unsafe member access .addCase on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   97:28  error  Unsafe member access .rejected on an `any` value                                                   @typescript-eslint/no-unsafe-member-access
   98:15  error  Unsafe member access .error on an `any` value                                                      @typescript-eslint/no-unsafe-member-access
   98:30  error  Unsafe member access .payload on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
   99:15  error  Unsafe member access .loading on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  102:8   error  Unsafe member access .addCase on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  102:29  error  Unsafe member access .pending on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  103:15  error  Unsafe member access .loading on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  104:15  error  Unsafe member access .error on an `any` value                                                      @typescript-eslint/no-unsafe-member-access
  106:8   error  Unsafe member access .addCase on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  106:29  error  Unsafe member access .fulfilled on an `any` value                                                  @typescript-eslint/no-unsafe-member-access
  107:15  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  107:32  error  Unsafe member access .payload on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  108:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  108:15  error  Unsafe member access .sessions on an `any` value                                                   @typescript-eslint/no-unsafe-member-access
  108:24  error  Computed name [session.id] resolves to an any value                                                @typescript-eslint/no-unsafe-member-access
  108:32  error  Unsafe member access .id on an `any` value                                                         @typescript-eslint/no-unsafe-member-access
  109:9   error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  109:15  error  Unsafe member access .activeSessionId on an `any` value                                            @typescript-eslint/no-unsafe-member-access
  109:41  error  Unsafe member access .id on an `any` value                                                         @typescript-eslint/no-unsafe-member-access
  110:15  error  Unsafe member access .loading on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  112:8   error  Unsafe member access .addCase on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  112:29  error  Unsafe member access .rejected on an `any` value                                                   @typescript-eslint/no-unsafe-member-access
  113:15  error  Unsafe member access .error on an `any` value                                                      @typescript-eslint/no-unsafe-member-access
  113:30  error  Unsafe member access .payload on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  114:15  error  Unsafe member access .loading on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  120:51  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
  122:50  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
  124:57  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
  126:55  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
  128:10  error  Unexpected nullable string value in conditional. Please handle the nullish/empty cases explicitly  @typescript-eslint/strict-boolean-expressions
  131:53  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
  133:51  error  Missing return type on function                                                                    @typescript-eslint/explicit-function-return-type
  135:14  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  135:59  error  Unsafe member access .actions on an `any` value                                                    @typescript-eslint/no-unsafe-member-access
  136:14  error  Unsafe assignment of an `any` value                                                                @typescript-eslint/no-unsafe-assignment
  136:38  error  Unsafe member access .reducer on an `any` value                                                    @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\dockerSlice.ts
   29:14  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   29:32  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   31:34  error  Async arrow function has no 'await' expression                                        @typescript-eslint/require-await
   36:7   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   36:14  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   41:14  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   41:31  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   43:52  error  Async arrow function has no 'await' expression                                        @typescript-eslint/require-await
   48:7   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   48:14  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   53:14  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   53:30  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   55:52  error  Async arrow function has no 'await' expression                                        @typescript-eslint/require-await
   60:7   error  Unsafe return of an `any` typed value                                                 @typescript-eslint/no-unsafe-return
   60:14  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   65:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   65:21  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   70:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   70:13  error  Unsafe member access .selectedContainerId on an `any` value                           @typescript-eslint/no-unsafe-member-access
   70:42  error  Unsafe member access .payload on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   73:13  error  Unsafe member access .error on an `any` value                                         @typescript-eslint/no-unsafe-member-access
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   77:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   79:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   79:32  error  Unsafe member access .pending on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   80:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   81:15  error  Unsafe member access .error on an `any` value                                         @typescript-eslint/no-unsafe-member-access
   83:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   83:32  error  Unsafe member access .fulfilled on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   84:9   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   84:15  error  Unsafe member access .containers on an `any` value                                    @typescript-eslint/no-unsafe-member-access
   84:35  error  Unsafe member access .payload on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   85:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   87:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   87:32  error  Unsafe member access .rejected on an `any` value                                      @typescript-eslint/no-unsafe-member-access
   88:15  error  Unsafe member access .error on an `any` value                                         @typescript-eslint/no-unsafe-member-access
   88:30  error  Unsafe member access .payload on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   89:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   92:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   92:31  error  Unsafe member access .pending on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   93:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   94:15  error  Unsafe member access .error on an `any` value                                         @typescript-eslint/no-unsafe-member-access
   96:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   96:31  error  Unsafe member access .fulfilled on an `any` value                                     @typescript-eslint/no-unsafe-member-access
   97:15  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   97:27  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   97:33  error  Unsafe member access .containers on an `any` value                                    @typescript-eslint/no-unsafe-member-access
   97:56  error  Unsafe member access .id on an `any` value                                            @typescript-eslint/no-unsafe-member-access
   97:70  error  Unsafe member access .payload on an `any` value                                       @typescript-eslint/no-unsafe-member-access
   98:13  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   99:21  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
  101:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  103:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  103:31  error  Unsafe member access .rejected on an `any` value                                      @typescript-eslint/no-unsafe-member-access
  104:15  error  Unsafe member access .error on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  104:30  error  Unsafe member access .payload on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  105:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  108:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  108:30  error  Unsafe member access .pending on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  109:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  110:15  error  Unsafe member access .error on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  112:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  112:30  error  Unsafe member access .fulfilled on an `any` value                                     @typescript-eslint/no-unsafe-member-access
  113:15  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  113:27  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  113:33  error  Unsafe member access .containers on an `any` value                                    @typescript-eslint/no-unsafe-member-access
  113:56  error  Unsafe member access .id on an `any` value                                            @typescript-eslint/no-unsafe-member-access
  113:70  error  Unsafe member access .payload on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  114:13  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
  115:21  error  Unsafe member access .status on an `any` value                                        @typescript-eslint/no-unsafe-member-access
  117:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  119:8   error  Unsafe member access .addCase on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  119:30  error  Unsafe member access .rejected on an `any` value                                      @typescript-eslint/no-unsafe-member-access
  120:15  error  Unsafe member access .error on an `any` value                                         @typescript-eslint/no-unsafe-member-access
  120:30  error  Unsafe member access .payload on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  121:15  error  Unsafe member access .loading on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  127:53  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  129:52  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  131:61  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  134:55  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  136:53  error  Missing return type on function                                                       @typescript-eslint/explicit-function-return-type
  138:14  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  138:65  error  Unsafe member access .actions on an `any` value                                       @typescript-eslint/no-unsafe-member-access
  139:14  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  139:42  error  Unsafe member access .reducer on an `any` value                                       @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\metricsSlice.ts
  20:14  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  20:29  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
  27:7   error  Unsafe return of an `any` typed value                    @typescript-eslint/no-unsafe-return
  27:14  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
  32:7   error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  32:22  error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
  37:20  error  Unsafe member access .data on an `any` value             @typescript-eslint/no-unsafe-member-access
  37:25  error  Computed name [action.payload] resolves to an any value  @typescript-eslint/no-unsafe-member-access
  37:32  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
  40:13  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
  44:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
  44:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
  44:5   error  Unsafe call of an `any` typed value                      @typescript-eslint/no-unsafe-call
  45:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
  45:29  error  Unsafe member access .pending on an `any` value          @typescript-eslint/no-unsafe-member-access
  46:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
  47:15  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
  49:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
  49:29  error  Unsafe member access .fulfilled on an `any` value        @typescript-eslint/no-unsafe-member-access
  50:15  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  50:45  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
  51:9   error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  51:15  error  Unsafe member access .data on an `any` value             @typescript-eslint/no-unsafe-member-access
  51:20  error  Computed name [agentId] resolves to an any value         @typescript-eslint/no-unsafe-member-access
  52:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
  54:8   error  Unsafe member access .addCase on an `any` value          @typescript-eslint/no-unsafe-member-access
  54:29  error  Unsafe member access .rejected on an `any` value         @typescript-eslint/no-unsafe-member-access
  55:15  error  Unsafe member access .error on an `any` value            @typescript-eslint/no-unsafe-member-access
  55:30  error  Unsafe member access .payload on an `any` value          @typescript-eslint/no-unsafe-member-access
  56:15  error  Unsafe member access .loading on an `any` value          @typescript-eslint/no-unsafe-member-access
  62:54  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  64:53  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  69:56  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  71:54  error  Missing return type on function                          @typescript-eslint/explicit-function-return-type
  73:14  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  73:58  error  Unsafe member access .actions on an `any` value          @typescript-eslint/no-unsafe-member-access
  74:14  error  Unsafe assignment of an `any` value                      @typescript-eslint/no-unsafe-assignment
  74:44  error  Unsafe member access .reducer on an `any` value          @typescript-eslint/no-unsafe-member-access
  75:29  error  Unsafe member access .reducer on an `any` value          @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\store\slices\uiSlice.ts
  20:7   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  20:17  error  Unsafe call of an `any` typed value              @typescript-eslint/no-unsafe-call
  25:7   error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  25:13  error  Unsafe member access .dialogs on an `any` value  @typescript-eslint/no-unsafe-member-access
  25:39  error  Unsafe member access .payload on an `any` value  @typescript-eslint/no-unsafe-member-access
  31:49  error  Missing return type on function                  @typescript-eslint/explicit-function-return-type
  33:49  error  Missing return type on function                  @typescript-eslint/explicit-function-return-type
  35:60  error  Missing return type on function                  @typescript-eslint/explicit-function-return-type
  37:14  error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  37:50  error  Unsafe member access .actions on an `any` value  @typescript-eslint/no-unsafe-member-access
  38:14  error  Unsafe assignment of an `any` value              @typescript-eslint/no-unsafe-assignment
  38:34  error  Unsafe member access .reducer on an `any` value  @typescript-eslint/no-unsafe-member-access
  39:24  error  Unsafe member access .reducer on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\styles\theme.ts
  3:14  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  3:22  error  Unsafe call of an `any` typed value  @typescript-eslint/no-unsafe-call

C:\Users\jmaga\code\dsh\frontend\src\theme.ts
  3:14  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
  3:22  error  Unsafe call of an `any` typed value  @typescript-eslint/no-unsafe-call

C:\Users\jmaga\code\dsh\frontend\src\types\error.types.ts
  21:14  error  'any' overrides all other types in this union type  @typescript-eslint/no-redundant-type-constituents

C:\Users\jmaga\code\dsh\frontend\src\utils\logger.ts
  84:11  error  Unsafe assignment of an `any` value                     @typescript-eslint/no-unsafe-assignment
  84:39  error  Unsafe member access .componentStack on an `any` value  @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\frontend\src\utils\websocket-test.ts
   19:19  error  'any' overrides all other types in this union type                                    @typescript-eslint/no-redundant-type-constituents
   46:7   error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
   46:21  error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   56:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   56:19  error  Unsafe member access .on on an `any` value                                            @typescript-eslint/no-unsafe-member-access
   62:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   62:19  error  Unsafe member access .on on an `any` value                                            @typescript-eslint/no-unsafe-member-access
   66:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
   66:19  error  Unsafe member access .on on an `any` value                                            @typescript-eslint/no-unsafe-member-access
   97:11  error  Unexpected any value in conditional. An explicit comparison or type cast is required  @typescript-eslint/strict-boolean-expressions
   97:23  error  Unsafe member access .connected on an `any` value                                     @typescript-eslint/no-unsafe-member-access
  102:13  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  103:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  103:14  error  Unsafe member access .on on an `any` value                                            @typescript-eslint/no-unsafe-member-access
  104:7   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  104:14  error  Unsafe member access .on on an `any` value                                            @typescript-eslint/no-unsafe-member-access
  117:11  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  125:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  125:12  error  Unsafe member access .emit on an `any` value                                          @typescript-eslint/no-unsafe-member-access
  128:23  error  'any' overrides all other types in this union type                                    @typescript-eslint/no-redundant-type-constituents
  133:11  error  Unsafe assignment of an `any` value                                                   @typescript-eslint/no-unsafe-assignment
  137:5   error  Unsafe call of an `any` typed value                                                   @typescript-eslint/no-unsafe-call
  137:12  error  Unsafe member access .disconnect on an `any` value                                    @typescript-eslint/no-unsafe-member-access

C:\Users\jmaga\code\dsh\shared\src\index.ts
  5:15  error  Unable to resolve path to module './types/metrics'  import/no-unresolved
  6:15  error  Unable to resolve path to module './types/agent'    import/no-unresolved

C:\Users\jmaga\code\dsh\shared\src\types\index.ts
   2:1  error  Multiple exports of name 'TestResult'  import/export
   4:1  error  Multiple exports of name 'LogEntry'    import/export
  19:1  error  Multiple exports of name 'LogEntry'    import/export
  23:1  error  Multiple exports of name 'TestResult'  import/export

Γ£û 2530 problems (2518 errors, 12 warnings)

