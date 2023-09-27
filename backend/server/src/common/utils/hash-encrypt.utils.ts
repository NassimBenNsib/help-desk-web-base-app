import {
  crypto,
  jwt,
  JWTAlgorithm,
  JwtPayload,
} from "../../../lib/external.lib";
import {
  ConsoleUtils,
  JWT_CONFIG,
  SESSIONS_CONFIG,
} from "../../../lib/internal.lib";

class HashEncryptUtils {
  private static readonly JWT_ALGORITHMS: Array<JWTAlgorithm> = [
    "HS256",
    "HS384",
    "HS512",
  ];
  public static hashPasswordRandomSalt(password: string): {
    salt: string;
    hashed: string;
    password: string;
  } {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashed = this.hashPasswordWithSalt(password, salt);
    return {
      salt: salt,
      hashed: hashed,
      password: password,
    };
  }

  public static hashPasswordWithSalt(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
  }

  public static comparePasswordWithHashed(
    password: string,
    salt: string,
    hashed: string
  ) {
    return this.hashPasswordWithSalt(password, salt) === hashed;
  }

  public static encryptSession(session: any): string | null {
    try {
      return jwt.sign(session, SESSIONS_CONFIG.SECRET as string, {
        algorithm: this.JWT_ALGORITHMS[SESSIONS_CONFIG.ALGORITHM],
      });
    } catch (e: any) {
      ConsoleUtils.error(
        "HashEncryptUtils",
        "encryptSession",
        "Error in encryptSession",
        "ERROR BEGIN"
      );
      console.table(e);
      console.log(e);
      ConsoleUtils.warn(
        "HashEncryptUtils",
        "encryptSession",
        "Error in encryptSession",
        "ERROR END"
      );
      return null;
    }
  }

  public static decryptSession(encrypted_session: string): any {
    try {
      return jwt.verify(encrypted_session, SESSIONS_CONFIG.SECRET as string, {
        algorithms: [this.JWT_ALGORITHMS[SESSIONS_CONFIG.ALGORITHM]],
      });
    } catch (e) {
      ConsoleUtils.error(["HashEncryptUtils", "decryptSession", "BEGIN ERROR"]);
      console.table(e);
      console.log(e);
      ConsoleUtils.warn(["HashEncryptUtils", "decryptSession", "END ERROR"]);
      return null;
    }
  }

  public static generateToken(data: string): string | null {
    try {
      let token = jwt.sign(
        {
          data,
          expiresDuration: JWT_CONFIG.EXPIRES_IN,
        },
        JWT_CONFIG.SECRET as string,
        {
          algorithm: this.JWT_ALGORITHMS[JWT_CONFIG.ALGORITHM],
        }
      );
      for (
        let i = 1;
        i <= parseInt(JWT_CONFIG.NUMBER_OF_CYCLES as string);
        i++
      ) {
        token = jwt.sign(token, JWT_CONFIG.SECRET as string, {
          algorithm: this.JWT_ALGORITHMS[i % (this.JWT_ALGORITHMS.length - 1)],
        });
      }
      return token;
    } catch (e) {
      ConsoleUtils.error(["HashEncryptUtils", "generateToken", "BEGIN ERROR"]);
      console.table(e);
      console.log(e);
      ConsoleUtils.warn(["HashEncryptUtils", "generateToken", "END ERROR"]);
      return null;
    }
  }

  public static reverseGeneratedToken(data: string): any {
    try {
      let broken_token: any = data;

      for (
        let i = parseInt(JWT_CONFIG.NUMBER_OF_CYCLES as string);
        i >= 1;
        i--
      ) {
        broken_token = jwt.verify(broken_token, JWT_CONFIG.SECRET as string, {
          algorithms: [
            this.JWT_ALGORITHMS[i % (this.JWT_ALGORITHMS.length - 1)],
          ],
        });
      }
      broken_token = jwt.verify(broken_token, JWT_CONFIG.SECRET as string, {
        algorithms: [this.JWT_ALGORITHMS[JWT_CONFIG.ALGORITHM]],
      });

      return broken_token;
    } catch (e) {
      ConsoleUtils.error([
        "HashEncryptUtils",
        "reverseGeneratedToken",
        "BEGIN ERROR",
      ]);
      console.table(e);
      console.log(e);
      ConsoleUtils.warn([
        "HashEncryptUtils",
        "reverseGeneratedToken",
        "END ERROR",
      ]);
      return null;
    }
  }
}

export { HashEncryptUtils };
