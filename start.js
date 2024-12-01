module.exports = ({ appName = "Whisper-WebUI" }) => ({
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env", // Edit this to customize the venv folder path
        env: {}, // Edit this to customize environment variables (see documentation)
        path: appName, // Edit this to customize the path to start the shell from
        message: ["uvicorn backend.main:app --host 0.0.0.0 --port 8001"],
        on: [
          {
            // The regular expression pattern to monitor.
            // When this pattern occurs in the shell terminal, the shell will return,
            // and the script will go onto the next step.
            event: "/http://\\S+/",

            // "done": true will move to the next step while keeping the shell alive.
            // "kill": true will move to the next step after killing the shell.
            done: true,
          },
        ],
      },
    },
    {
      method: "shell.run",
      params: {
        venv: "env", // Edit this to customize the venv folder path
        env: {}, // Edit this to customize environment variables (see documentation)
        path: appName, // Edit this to customize the path to start the shell from
        message: [
          "python app.py --inbrowser False", // Edit with your custom commands
        ],
        on: [
          {
            // The regular expression pattern to monitor.
            // When this pattern occurs in the shell terminal, the shell will return,
            // and the script will go onto the next step.
            event: "/http://\\S+/",

            // "done": true will move to the next step while keeping the shell alive.
            // "kill": true will move to the next step after killing the shell.
            done: true,
          },
        ],
      },
    },

    {
      // This step sets the local variable 'url'.
      // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        url: "{{input.event[0]}}",
      },
    },
  ],
});
