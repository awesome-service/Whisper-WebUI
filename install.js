module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: ["git pull"],
      },
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "",
        },
      },
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "",
        message: [
          "pip install -r requirements.txt",
          "pip install -r backend/requirements-backend.txt",
        ],
      },
    },
    {
      when: "{{platform !== 'darwin'}}",
      method: "fs.link",
      params: {
        venv: "env",
      },
    },
  ],
};
