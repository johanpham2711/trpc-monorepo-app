import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ?? 'Johan'}`,
        };
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];

// import { INestApplication, Injectable } from '@nestjs/common';
// import { z } from 'zod';
// import { TrpcService } from '@server/trpc/trpc.service';
// import * as trpcExpress from '@trpc/server/adapters/express';

// @Injectable()
// export class TrpcRouter {
//   constructor(
//     private readonly trpc: TrpcService,
//     private readonly userService: UserService // injected service
//   ) {}

//   appRouter = this.trpc.router({
//     getUsers: this.trpc.procedure
//       .input(
//         z.object({
//           name: z.string(),
//         }),
//       )
//       .query(async ({ input }) => {
//         const { name } = input;
//         return await this.userService.getUsers(name); // random example showing you how you can now use dependency injection
//       }),
//   });

//   async applyMiddleware(app: INestApplication) {
//     app.use(
//       `/trpc`,
//       trpcExpress.createExpressMiddleware({
//         router: this.appRouter,
//       }),
//     );
//   }
// }

// export type AppRouter = TrpcRouter[`appRouter`];
