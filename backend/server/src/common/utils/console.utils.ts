class ConsoleUtils {
  static closeByNewLine = false;
  static useIcons = true;
  static logsTitle = "LOGS";
  static warningsTitle = "WARNINGS";
  static errorsTitle = "ERRORS";
  static informationsTitle = "INFORMATIONS";
  static successesTitle = "SUCCESS";
  static debugsTitle = "DEBUG";
  static assertsTitle = "ASSERT";
  static getColor(foregroundColor = "", backgroundColor = "") {
    let fgc = "\x1b[37m";
    switch (foregroundColor.trim().toLowerCase()) {
      case "black":
        fgc = "\x1b[30m";
        break;
      case "red":
        fgc = "\x1b[31m";
        break;
      case "green":
        fgc = "\x1b[32m";
        break;
      case "yellow":
        fgc = "\x1b[33m";
        break;
      case "blue":
        fgc = "\x1b[34m";
        break;
      case "magenta":
        fgc = "\x1b[35m";
        break;
      case "cyan":
        fgc = "\x1b[36m";
        break;
      case "white":
        fgc = "\x1b[37m";
        break;
    }

    let bgc = "";
    switch (backgroundColor.trim().toLowerCase()) {
      case "black":
        bgc = "\x1b[40m";
        break;
      case "red":
        bgc = "\x1b[44m";
        break;
      case "green":
        bgc = "\x1b[44m";
        break;
      case "yellow":
        bgc = "\x1b[43m";
        break;
      case "blue":
        bgc = "\x1b[44m";
        break;
      case "magenta":
        bgc = "\x1b[45m";
        break;
      case "cyan":
        bgc = "\x1b[46m";
        break;
      case "white":
        bgc = "\x1b[47m";
        break;
    }

    return `${fgc}${bgc}`;
  }
  static getColorReset() {
    return "\x1b[0m";
  }
  static clear() {
    console.clear();
  }
  static print(
    foregroundColor = "white",
    backgroundColor = "black",
    ...strings: any
  ) {
    const c = this.getColor(foregroundColor, backgroundColor);
    // turns objects into printable strings
    strings = strings.map((item: any) => {
      if (typeof item === "object") item = JSON.stringify(item);
      return item;
    });
    console.log(c, strings.join(""), this.getColorReset());
    if (this.closeByNewLine) console.log("");
  }
  static log(...strings: any) {
    const fg = "white";
    const bg = "";
    const icon = "\u25ce";
    const groupTile = ` ${this.logsTitle}`;
    if (strings.length > 1) {
      const c = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : "") + groupTile);
      const nl = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: any) => {
        this.print(fg, bg, item, this.getColorReset());
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: any) => {
          return `${this.useIcons ? `${icon} ` : ""}${item}`;
        })
      );
    }
  }
  static warn(...strings: any) {
    const fg = "yellow";
    const bg = "";
    const icon = "\u26a0";
    const groupTile = ` ${this.warningsTitle}`;
    if (strings.length > 1) {
      const c = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : "") + groupTile);
      const nl = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: any) => {
        this.print(fg, bg, item, this.getColorReset());
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: any) => {
          return `${this.useIcons ? `${icon} ` : ""}${item}`;
        })
      );
    }
  }
  static error(...strings: any) {
    const fg = "red";
    const bg = "";
    const icon = "\u26D4";
    const groupTile = ` ${this.errorsTitle}`;
    if (strings.length > 1) {
      const c = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : "") + groupTile);
      const nl = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: any) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: any) => {
          return `${this.useIcons ? `${icon} ` : ""}${item}`;
        })
      );
    }
  }
  static info(...strings: any) {
    const fg = "blue";
    const bg = "";
    const icon = "\u2139";
    const groupTile = ` ${this.informationsTitle}`;
    if (strings.length > 1) {
      const c = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : "") + groupTile);
      const nl = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: any) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: any) => {
          return `${this.useIcons ? `${icon} ` : ""}${item}`;
        })
      );
    }
  }
  static success(...strings: any) {
    const fg = "green";
    const bg = "";
    const icon = "\u2713";
    const groupTile = ` ${this.successesTitle}`;
    if (strings.length > 1) {
      const c = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : "") + groupTile);
      const nl = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: any) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: any) => {
          return `${this.useIcons ? `${icon} ` : ""}${item}`;
        })
      );
    }
  }
  static debug(...strings: any) {
    const fg = "magenta";
    const bg = "";
    const icon = "\u1367";
    const groupTile = ` ${this.debugsTitle}`;
    if (strings.length > 1) {
      const c = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : "") + groupTile);
      const nl = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: any) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: any) => {
          return `${this.useIcons ? `${icon} ` : ""}${item}`;
        })
      );
    }
  }
  static assert(...strings: any) {
    const fg = "cyan";
    const bg = "";
    const icon = "\u0021";
    const groupTile = ` ${this.assertsTitle}`;
    if (strings.length > 1) {
      const c = this.getColor(fg, bg);
      console.group(c, (this.useIcons ? icon : "") + groupTile);
      const nl = this.closeByNewLine;
      this.closeByNewLine = false;
      strings.forEach((item: any) => {
        this.print(fg, bg, item);
      });
      this.closeByNewLine = nl;
      console.groupEnd();
      if (nl) console.log();
    } else {
      this.print(
        fg,
        bg,
        strings.map((item: any) => {
          return `${this.useIcons ? `${icon} ` : ""}${item}`;
        })
      );
    }
  }

  static table(data: any) {
    console.table(data);
  }
}

export { ConsoleUtils };
