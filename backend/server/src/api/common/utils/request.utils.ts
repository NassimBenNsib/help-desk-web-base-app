import { Request, geoIPLite } from "../../../../lib/external.lib";

class RequestUtils {
  public static getIPInfo(request: Request): string {
    return request.clientIp || "unknown";
  }

  public static getUserAgentInfo(request: Request): any {
    return request.useragent;
  }

  public static getUserAgentMinInfo(request: Request): {
    os: string;
    platform: string;
    version: string;
    browser: string;
    device: string;
  } {
    const userAgentObj = this.getUserAgentInfo(request);
    const device = this.getDevice(request);
    return {
      os: userAgentObj?.os || "unknown",
      platform: userAgentObj?.platform || "unknown",
      version: userAgentObj?.version || "unknown",
      browser: userAgentObj?.browser || "unknown",
      device: device || "unknown",
    };
  }

  public static getUser(request: Request): any {
    return (request.user as any).user;
  }

  public static getSession(request: Request): any {
    return request.user as any;
  }

  public static getGeoInfo(request: Request): any {
    const ip = this.getIPInfo(request);
    return geoIPLite.lookup(ip);
  }

  public static getGeoMinInfo(request: Request): {
    country: string;
    region: string;
    city: string;
    timezone: string;
  } {
    const geoObj = this.getGeoInfo(request);
    return {
      country: geoObj?.country || "unknown",
      region: geoObj?.region || "unknown",
      city: geoObj?.city || "unknown",
      timezone: geoObj?.timezone || "unknown",
    };
  }

  public static getDevice(request: Request): string {
    const userAgentObj = this.getUserAgentInfo(request);

    const isSmartTV = userAgentObj.isSmartTV;
    const isiPad = userAgentObj.isiPad;
    const isiPod = userAgentObj.isiPod;
    const isTablet =
      userAgentObj.isTablet ||
      /ipad|android|kindle|silk/i.test(userAgentObj.source);
    const isiPhone = userAgentObj.isiPhone;
    const isMobile = userAgentObj.isMobile;
    const isDesktop = !isMobile && !isiPad && !isSmartTV && !isTablet;

    if (isSmartTV) {
      return "Smart TV";
    } else if (isiPad) {
      return "iPad";
    } else if (isiPod) {
      return "iPod";
    } else if (isTablet) {
      return "Tablet";
    } else if (isiPhone) {
      return "iPhone";
    } else if (isMobile) {
      return "Mobile";
    } else if (isDesktop) {
      if (userAgentObj.isWindows) {
        return "PC (Windows)";
      } else if (userAgentObj.isLinux || userAgentObj.isLinux64) {
        return "PC (Linux)";
      } else if (userAgentObj.isMac) {
        return "Mac";
      } else if (userAgentObj.isChromeOS) {
        return "Chromebook";
      } else if (userAgentObj.isRaspberry) {
        return "Raspberry Pi";
      } else if (userAgentObj.isBada) {
        return "Samsung Bada";
      } else if (userAgentObj.isSamsung) {
        return "Samsung Phone";
      } else if (userAgentObj.isBlackberry) {
        return "Blackberry";
      } else if (userAgentObj.isWinJs) {
        return "Windows JavaScript App";
      } else if (userAgentObj.isKindleFire) {
        return "Kindle Fire";
      } else if (userAgentObj.isSilk) {
        return "Amazon Silk";
      } else if (userAgentObj.isCaptive) {
        return "Captive Portal";
      } else if (userAgentObj.isCurl) {
        return "cURL command";
      } else if (userAgentObj.isBot) {
        return "Web Bot / Crawler";
      } else {
        return "Desktop";
      }
    } else {
      return "Unknown Device";
    }
  }

  public static getRequestInfo(request: Request): any {
    return {
      useragent: this.getUserAgentMinInfo(request),
      ip: this.getGeoInfo(request) || "unknown",
      geo: this.getGeoMinInfo(request),
    };
  }
}

export { RequestUtils };
