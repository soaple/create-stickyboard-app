const { Command, flags } = require("@oclif/command");

class CreateStickyboardAppCommand extends Command {
  async run() {
    const { flags } = this.parse(CreateStickyboardAppCommand);
    const name = flags.name || "world";
    this.log(`hello ${name} from ./src/index.js`);
  }
}

CreateStickyboardAppCommand.description = `Describe the command here
...
Extra documentation goes here
`;

CreateStickyboardAppCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  name: flags.string({ char: "n", description: "name to print" })
};

module.exports = CreateStickyboardAppCommand;
