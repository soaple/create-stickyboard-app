const fse = require("fs-extra");
const path = require("path");
const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const chalk = require("chalk");

const DEFAULT_APP_NAME = "my-stickyboard-app";
// const PRIMARY_COLOR = "#FFCA29";
const PRIMARY_COLOR = "#ffff00";

const logPrimary = chalk.hex(PRIMARY_COLOR);

class CreateStickyboardAppCommand extends Command {
    static args = [{ name: "appName" }];

    async run() {
        const { flags, args } = this.parse(CreateStickyboardAppCommand);
        // let name = flags.name;

        let appName = args.appName;

        // Prompt for input application name
        if (!appName) {
            const inputAppName = await cli.prompt(
                `Enter application name(${DEFAULT_APP_NAME})`
            );

            if (inputAppName.length > 0) {
                appName = inputAppName;
            } else {
                appName = DEFAULT_APP_NAME;
            }
        }

        this.log(`Creating StickyBoard app (${appName})\n`);

        // Create a target directory
        const targetDirectory = path.join(process.cwd(), appName);
        this.log(`Target directory: ${targetDirectory}\n`);
        if (fse.existsSync(targetDirectory)) {
            const overwrite = await cli.confirm(
                `Directory ${appName} already exists. Overwrite it?(y/n)`
            );
            if (!overwrite) {
                this.log("Cancelled.");
                return;
            }
        }

        if (!fse.existsSync(targetDirectory)) {
            fse.mkdirSync(targetDirectory);
        }

        // Copy template to target directory
        try {
            await fse.copy(path.join(__dirname, 'templates',"stickyboard-simple"), targetDirectory);

            this.log(`\nSuccess! Created ${appName} at ${targetDirectory}
    Inside that directory, you can run several commands:\n`);

            this.log(logPrimary("    npm run dev"));
            this.log("      Starts the app with development mode.\n");

            this.log(logPrimary("    npm run build"));
            this.log("      Bundles the app into static files for production.\n");

            this.log(logPrimary("    npm start"));
            this.log("      Starts the app with daemon mode using PM2.\n");

            this.log("    We suggest that you begin by typing:");

            this.log(logPrimary(`      cd ${appName}`));
            this.log(logPrimary("      npm install"));
            this.log(logPrimary("      npm run dev\n"));

            this.log("Happy hacking!\n");
        } catch (err) {
            console.error(err);
        }
    }
}

CreateStickyboardAppCommand.description = `Create StickyBoard app
Create StickyBoard apps with no build configuration.
`;

CreateStickyboardAppCommand.flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    // add --help flag to show CLI version
    help: flags.help({ char: "h" })
    // name: flags.string({ char: "n", description: "application name to create" })
};

module.exports = CreateStickyboardAppCommand;
