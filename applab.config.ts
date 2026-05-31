export default {
  name: "code-mentors",
  description: "AppLab managed project",
  type: "monorepo",
  apps: [
    {
      description: "Coder School web application",
      dev: {
        command: "bun dev",
        port: 10170
      },
      name: "web-app",
      path: "apps/web-app",
      type: "web-app"
    }
  ]
};
