/*controles the terminal on shell.html*/
const terminalLog = document.querySelector("#terminal-log");
const terminalInput = document.querySelector("#terminal-input");

const commandHistory = [];
let commandHistoryIndex = 0;

function scrollLogToBottom() {
    terminalLog.scrollTop = terminalLog.scrollHeight;
}

function printLine(text, className) {
    const line = document.createElement("div");
    line.textContent = text;
    if (className) line.className = className;
    terminalLog.append(line);
    scrollLogToBottom();
}

function isMailLink(url) {
    return url.startsWith("mailto:");
}

function createCell(text, className) {
    const cell = document.createElement("span");
    cell.className = className;
    cell.textContent = text;
    return cell;
}

function printHelpRow(command) {
    const row = document.createElement("div");
    row.className = "terminal-row terminal-help";
    row.append(createCell(command.usage, "terminal-usage"), createCell(command.about, "terminal-about"));
    terminalLog.append(row);
    scrollLogToBottom();
}

function printLinkRow(number, link) {
    const row = document.createElement("a");
    row.className = "terminal-row terminal-link";
    row.href = link.url;
    if (!isMailLink(link.url)) {
        row.target = "_blank";
        row.rel = "noopener";
    }

    row.append(
        createCell(number, "terminal-number"),
        createCell(link.name, "terminal-name"),
        createCell(link.display, "terminal-address")
    );
    terminalLog.append(row);
    scrollLogToBottom();
}

function openLink(url) {
    if (isMailLink(url)) window.location.href = url;
    else window.open(url, "_blank", "noopener");
}

const commands = {
    help: {
        usage: "help",
        about: "show this list",
        run: function () {
            printLine("commands", "terminal-note");
            Object.values(commands).forEach(printHelpRow);
        }
    },
    ls: {
        usage: "ls",
        about: "list every link (click or tap one to open it)",
        run: function () {
            printLine("links - click or tap one to open it", "terminal-note");
            links.forEach(function (link, index) {
                printLinkRow(index + 1, link);
            });
        }
    },
    open: {
        usage: "open <n|name>",
        about: "open a link by number or name, e.g. open 2 or open github",
        run: function (argument) {
            if (!argument) return printLine("open: which link? try open 2 or open github (type ls to see them)", "terminal-error");

            const link = links[parseInt(argument, 10) - 1] || links.find(function (item) { return item.name === argument; });
            if (!link) return printLine(`open: no link called '${argument}'. type ls to see them`, "terminal-error");

            printLine(`opening ${link.name} ...`);
            openLink(link.url);
        }
    },
    whoami: {
        usage: "whoami",
        about: "who runs this page",
        run: function () {
            printLine("dias stas - studying & writing code");
        }
    },
    home: {
        usage: "home",
        about: "go back to the contact page",
        run: function () {
            printLine("going home ...");
            goToPage("index.html");
        }
    },
    clear: {
        usage: "clear",
        about: "clear the screen",
        run: function () {
            terminalLog.replaceChildren();
        }
    }
};

function runCommand(text) {
    const [commandName, ...argumentWords] = text.trim().split(/\s+/);
    if (!commandName) return;

    const commandKey = commandName.toLowerCase();
    if (!Object.hasOwn(commands, commandKey)) {
        return printLine(`${commandName}: command not found. type help to see what you can do`, "terminal-error");
    }
    commands[commandKey].run(argumentWords.join(" ").toLowerCase());
}

terminalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const text = terminalInput.value;
        printLine(`$ ${text}`, "terminal-command");
        if (text.trim()) commandHistory.push(text);
        commandHistoryIndex = commandHistory.length;
        terminalInput.value = "";
        runCommand(text);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistoryIndex > 0) terminalInput.value = commandHistory[--commandHistoryIndex];
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (commandHistoryIndex < commandHistory.length - 1) {
            terminalInput.value = commandHistory[++commandHistoryIndex];
        } else {
            commandHistoryIndex = commandHistory.length;
            terminalInput.value = "";
        }
    }
})

printLine("welcome - type help to see what you can do");

// on a phone the keyboard would cover the page, so only focus the input where there is a mouse
if (window.matchMedia("(hover: hover)").matches) terminalInput.focus();
