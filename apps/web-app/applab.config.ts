const config = {
  apps: [
    {
      description: 'SummonSkill web workspace application',
      dev: {
        autoOpenBrowser: true,
        port: 3020,
        tools: {
          eslint: {},
          prettier: {},
          tailwind: {},
          typescript: {},
        },
      },
      name: 'SummonSkill Web',
      scripts: {
        build: 'bun db:generate && next build',
        dev: 'dotenv -- next dev --turbopack --port $PORT',
        start: 'next start',
      },
      type: 'web-app',
    },
  ],
  description: 'SummonSkill virtual workspace for students and mentors',
  features: {
    ai: {
      provider: 'openai',
    },
    auth: {
      provider: 'better-auth',
    },
    database: {
      orm: 'prisma',
      port: 5432,
      provider: 'postgresql',
    },
    email: {
      provider: 'resend',
    },
    errorReporting: {
      provider: 'sentry',
    },
    realtime: {
      provider: 'pusher',
    },
    scraping: {
      provider: 'serpapi',
    },
  },
  name: 'SummonSkill',
  packageManager: 'bun',
  ports: [3020, 3030],
  version: '0.1.0',
  linear: {
    teamId: 'BRI',
    projectName: 'SummonSkill',
    projectUrl: 'https://linear.app/bright-and-early/project/summon-skill',
  },
  mcp: {
    servers: [
      {
        name: 'filesystem',
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-filesystem', process.cwd()],
        description: 'File system access for project',
      },
    ],
  },
};

export default config;
