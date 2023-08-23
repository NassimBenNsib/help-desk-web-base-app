import {
  wrongRequestDataCaseExpected,
  normalCaseExpected,
  takenEmailCaseExpected,
  RegisterData,
  ApplicationCore,
  MailerCore,
  DatabaseCore,
  deepMerge,
  faker,
  request,
  UsersServices,
  HashEncryptUtils,
} from "./auth.register.test.needs";

let requester: request.SuperTest<request.Test> | null = null;

beforeAll(async () => {
  DatabaseCore.init();
  await DatabaseCore.setup();
  MailerCore.init();
  await MailerCore.setup();
  ApplicationCore.init();
  ApplicationCore.setup();
  // registerData.server = ApplicationCore.start();
  requester = request(ApplicationCore?.instance);
});

beforeEach(async () => {});

afterEach(() => {});

afterAll(() => {});

describe("Scenarios", () => {
  it.concurrent("Normal case", async () => {
    /*==========================================================================
      ==========================================================================
                                  Pre-Test
      ==========================================================================
      ========================================================================== */

    /* ***************************************************************************
     * Data
     * **************************************************************************/
    const registerData: RegisterData = {
      data: [
        {
          email: faker.internet.email(),
          password: faker.internet.password({
            length: 8,
            prefix: "Aa1!",
          }),
          termsAndConditions: true,
        },
      ],
      response: [],
      request: [],
      expected: [],
      database: [],
    };
    registerData.data[0].passwordConfirmation = registerData.data[0].password;
    /* ***************************************************************************
     * Request
     * **************************************************************************/
    registerData.response[0] = await requester
      ?.post("/api/v1/auth/register")
      .send(registerData.data[0]);
    registerData.expected[0] = deepMerge.all([
      registerData.response?.[0]?.body,
      normalCaseExpected(registerData.data?.[0]),
    ]);
    /* ***************************************************************************
     * Database
     * **************************************************************************/
    registerData.database[0] = await UsersServices.deepFindOneById(
      registerData.response?.[0]?.body?.details?.output?.profile?.id
    );
    registerData.database[1] = await UsersServices.deepDeleteOneById(
      registerData.response?.[0]?.body?.details?.output?.profile?.id
    );
    /* ***************************************************************************
     * Normalizer
     * **************************************************************************/
    const {
      profile: profileDatabase,
      generalPreference: generalPreferenceDatabase,
      notificationPreference: notificationPreferenceDatabase,
      emailPreference: emailPreferenceDatabase,
    } = registerData.database?.[0];
    const {
      profile: profileDeleted,
      generalPreference: generalPreferenceDeleted,
      notificationPreference: notificationPreferenceDeleted,
      emailPreference: emailPreferenceDeleted,
    } = registerData.database?.[1];
    const {
      code: codeReceived,
      title: titleReceived,
      hint: hintReceived,
      message: messageReceived,
      description: descriptionReceived,
      result: resultReceived,
      details: {
        input: {
          body: bodyReceived,
          headers: headersReceived,
          params: paramsReceived,
          query: queryReceived,
        },
        output: {
          emailPreference: emailPreferenceReceived,
          notificationPreference: notificationPreferenceReceived,
          profile: profileReceived,
          generalPreference: generalPreferenceReceived,
        },
        warning: warningReceived,
        error: errorReceived,
      },
    } = registerData.response?.[0]?.body;
    const {
      code: codeExpected,
      title: titleExpected,
      hint: hintExpected,
      description: descriptionExpected,
      message: messageExpected,
      result: resultExpected,
      details: {
        input: {
          body: bodyExpected,
          headers: headersExpected,
          params: paramsExpected,
          query: queryExpected,
        },
        output: {
          emailPreference: emailPreferenceExpected,
          generalPreference: generalPreferenceExpected,
          notificationPreference: notificationPreferenceExpected,
          profile: profileExpected,
        },
        warning: warningExpected,
        error: errorExpected,
      },
    } = registerData.expected?.[0];

    /*==========================================================================
      ==========================================================================
                                  Test
      ==========================================================================
      ========================================================================== */

    /* ***************************************************************************
     * Input Details (Body, Headers, Params, Query)
     * **************************************************************************/
    console.log("headersExpected", headersExpected);
    console.log("headersReceived", headersReceived);
    expect(headersReceived).toEqual(headersExpected);
    console.log("bodyExpected", bodyExpected);
    console.log("bodyReceived", bodyReceived);
    expect(bodyReceived).toEqual(bodyExpected);
    console.log("paramsExpected", paramsExpected);
    console.log("paramsReceived", paramsReceived);
    expect(paramsReceived).toEqual(paramsExpected);
    console.log("queryExpected", queryExpected);
    console.log("queryReceived", queryReceived);
    expect(queryReceived).toEqual(queryExpected);

    /***************************************************************************
     * Basic Details (Code, Title, Message, Hint, Result)
     * **************************************************************************/
    console.log("codeExpected", codeExpected);
    console.log("codeReceived", codeReceived);
    expect(codeReceived).toEqual(codeExpected);
    console.log("titleExpected", titleExpected);
    console.log("titleReceived", titleReceived);
    expect(titleReceived).toEqual(titleExpected);
    console.log("messageExpected", messageExpected);
    console.log("messageReceived", messageReceived);
    expect(messageReceived).toEqual(messageExpected);
    console.log("hintExpected", hintExpected);
    console.log("hintReceived", hintReceived);
    expect(hintReceived).toEqual(hintExpected);
    console.log("resultExpected", resultExpected);
    console.log("resultReceived", resultReceived);
    expect(resultReceived).toEqual(resultExpected);

    /***************************************************************************
     * Description Details (Description, Warning, Error)
     * **************************************************************************/
    console.log("warningExpected", warningExpected);
    console.log("warningReceived", warningReceived);
    expect(warningReceived).toEqual(warningExpected);
    console.log("errorExpected", errorExpected);
    console.log("errorReceived", errorReceived);
    expect(errorReceived).toEqual(errorExpected);
    console.log("descriptionExpected", descriptionExpected);
    console.log("descriptionReceived", descriptionReceived);
    expect(descriptionReceived).toEqual(descriptionExpected);

    /***************************************************************************
     * Output Details (Output, Profile, Preferences, Settings)
     * **************************************************************************/
    console.log("profileExpected", profileExpected);
    console.log("profileReceived", profileReceived);
    expect(profileReceived).toEqual(profileExpected);
    console.log("generalPreferenceExpected", generalPreferenceExpected);
    console.log("generalPreferenceReceived", generalPreferenceReceived);
    expect(generalPreferenceReceived).toEqual(generalPreferenceExpected);
    console.log(
      "notificationPreferenceExpected",
      notificationPreferenceExpected
    );
    expect(notificationPreferenceReceived).toEqual(
      notificationPreferenceExpected
    );
    console.log("emailPreferenceExpected", emailPreferenceExpected);
    console.log("emailPreferenceReceived", emailPreferenceReceived);
    expect(emailPreferenceReceived).toEqual(emailPreferenceExpected);

    console.log(
      "emailPreferenceReceived.userId",
      emailPreferenceReceived.userId
    );
    expect(emailPreferenceReceived.userId).toEqual(profileExpected.id);
    console.log(
      "generalPreferenceReceived.userId",
      generalPreferenceReceived.userId
    );
    expect(generalPreferenceReceived.userId).toEqual(profileExpected.id);
    console.log(
      "notificationPreferenceReceived.userId",
      notificationPreferenceReceived.userId
    );
    expect(notificationPreferenceReceived.userId).toEqual(profileExpected.id);

    console.log("profileReceived.password", profileReceived.password);
    console.log(
      "passwordExpected",
      HashEncryptUtils.hashPasswordWithSalt(
        registerData.data[0].password,
        profileReceived.salt
      )
    );
    expect(profileReceived.password).toBe(
      HashEncryptUtils.hashPasswordWithSalt(
        registerData.data[0].password,
        profileReceived.salt
      )
    );

    /* ***************************************************************************
     * Database
     * **************************************************************************/
    console.log("emailPreferenceDatabase", emailPreferenceDatabase);
    console.log("emailPreferenceReceived", emailPreferenceReceived);
    expect(JSON.stringify(emailPreferenceDatabase)).toEqual(
      JSON.stringify(emailPreferenceReceived)
    );
    console.log(
      "notificationPreferenceDatabase",
      notificationPreferenceDatabase
    );
    console.log(
      "notificationPreferenceReceived",
      notificationPreferenceReceived
    );
    console.log("generalPreferenceDatabase", generalPreferenceDatabase);
    console.log("generalPreferenceReceived", generalPreferenceReceived);
    expect(JSON.stringify(generalPreferenceDatabase)).toEqual(
      JSON.stringify(generalPreferenceReceived)
    );
    console.log(
      "notificationPreferenceDatabase",
      notificationPreferenceDatabase
    );
    console.log(
      "notificationPreferenceReceived",
      notificationPreferenceReceived
    );
    expect(JSON.stringify(notificationPreferenceDatabase)).toEqual(
      JSON.stringify(notificationPreferenceReceived)
    );
    console.log("profileDatabase", profileDatabase);
    console.log(
      "profileReceived",
      deepMerge.all([profileExpected, profileDatabase])
    );
    expect(JSON.stringify(profileDatabase)).toEqual(
      JSON.stringify(deepMerge.all([profileExpected, profileDatabase]))
    );
    console.log("generalPreferenceDeleted", generalPreferenceDeleted);
    expect(generalPreferenceDeleted.count).toBe(1);
    console.log("notificationPreferenceDeleted", notificationPreferenceDeleted);
    expect(notificationPreferenceDeleted.count).toBe(1);
    console.log("emailPreferenceDeleted", emailPreferenceDeleted);
    expect(emailPreferenceDeleted.count).toBe(1);
    console.log("profileDeleted", profileDeleted);
    expect(profileDeleted.count).toBe(1);

    /*==========================================================================
      ==========================================================================
                                  Post-Test
      ==========================================================================
      ========================================================================== */
  });
  it.concurrent("Taken email case", async () => {
    /*==========================================================================
      ==========================================================================
                                  Pre-Test
      ==========================================================================
      ========================================================================== */

    /* ***************************************************************************
     * Data
     * **************************************************************************/
    const registerData: RegisterData = {
      data: [
        {
          email: faker.internet.email(),
          password: faker.internet.password({
            length: 8,
            prefix: "Aa1!",
          }),
          termsAndConditions: true,
        },
      ],
      response: [],
      request: [],
      expected: [],
      database: [],
    };
    registerData.data[0].passwordConfirmation = registerData.data[0].password;
    /* ***************************************************************************
     * Request
     * **************************************************************************/
    registerData.response[0] = await requester
      ?.post("/api/v1/auth/register")
      .send(registerData.data[0]);
    registerData.response[1] = await requester
      ?.post("/api/v1/auth/register")
      .send(registerData.data[0]);
    registerData.expected[0] = deepMerge.all([
      registerData.response?.[0]?.body,
      takenEmailCaseExpected(registerData.data?.[0]),
    ]);
    /* ***************************************************************************
     * Database
     * **************************************************************************/
    registerData.database[0] = await UsersServices.deepFindOneById(
      registerData.response?.[0]?.body?.details?.output?.profile?.id
    );
    registerData.database[1] = await UsersServices.deepDeleteOneById(
      registerData.response?.[0]?.body?.details?.output?.profile?.id
    );
    registerData.database[2] = await UsersServices.deepFindOneById(
      registerData.response?.[0]?.body?.details?.output?.profile?.id
    );

    /* ***************************************************************************
     * Normalizer
     * **************************************************************************/
    const {
      profile: profileDatabase,
      generalPreference: generalPreferenceDatabase,
      notificationPreference: notificationPreferenceDatabase,
      emailPreference: emailPreferenceDatabase,
    } = registerData.database?.[2];
    const {
      code: codeReceived,
      title: titleReceived,
      hint: hintReceived,
      message: messageReceived,
      description: descriptionReceived,
      result: resultReceived,
      details: {
        input: {
          body: bodyReceived,
          headers: headersReceived,
          params: paramsReceived,
          query: queryReceived,
        },
        output: outputReceived,
        warning: warningReceived,
        error: errorReceived,
      },
    } = registerData.response?.[1]?.body;
    const {
      code: codeExpected,
      title: titleExpected,
      hint: hintExpected,
      description: descriptionExpected,
      message: messageExpected,
      result: resultExpected,
      details: {
        input: {
          body: bodyExpected,
          headers: headersExpected,
          params: paramsExpected,
          query: queryExpected,
        },
        output: outputExpected,
        warning: warningExpected,
        error: errorExpected,
      },
    } = registerData.expected?.[0];

    /*==========================================================================
      ==========================================================================
                                  Test
      ==========================================================================
      ========================================================================== */

    /* ***************************************************************************
     * Input Details (Body, Headers, Params, Query)
     * **************************************************************************/
    console.log("headersExpected", headersExpected);
    console.log("headersReceived", headersReceived);
    // expect(headersReceived).toEqual(headersExpected);
    console.log("bodyExpected", bodyExpected);
    console.log("bodyReceived", bodyReceived);
    expect(bodyReceived).toEqual(bodyExpected);
    console.log("paramsExpected", paramsExpected);
    console.log("paramsReceived", paramsReceived);
    expect(paramsReceived).toEqual(paramsExpected);
    console.log("queryExpected", queryExpected);
    console.log("queryReceived", queryReceived);
    expect(queryReceived).toEqual(queryExpected);

    /***************************************************************************
     * Basic Details (Code, Title, Message, Hint, Result)
     * **************************************************************************/
    console.log("codeExpected", codeExpected);
    console.log("codeReceived", codeReceived);
    expect(codeReceived).toEqual(codeExpected);
    console.log("titleExpected", titleExpected);
    console.log("titleReceived", titleReceived);
    expect(titleReceived).toEqual(titleExpected);
    console.log("messageExpected", messageExpected);
    console.log("messageReceived", messageReceived);
    expect(messageReceived).toEqual(messageExpected);
    console.log("hintExpected", hintExpected);
    console.log("hintReceived", hintReceived);
    expect(hintReceived).toEqual(hintExpected);
    console.log("resultExpected", resultExpected);
    console.log("resultReceived", resultReceived);
    expect(resultReceived).toEqual(resultExpected);

    /***************************************************************************
     * Description Details (Description, Warning, Error)
     * **************************************************************************/
    console.log("warningExpected", warningExpected);
    console.log("warningReceived", warningReceived);
    expect(warningReceived).toEqual(warningExpected);
    console.log("errorExpected", errorExpected);
    console.log("errorReceived", errorReceived);
    expect(errorReceived).toEqual(errorExpected);
    console.log("descriptionExpected", descriptionExpected);
    console.log("descriptionReceived", descriptionReceived);
    expect(descriptionReceived).toEqual(descriptionExpected);

    /***************************************************************************
     * Output Details (Output, Profile, Preferences, Settings)
     * **************************************************************************/
    console.log("outputExpected", outputExpected);
    console.log("outputReceived", outputReceived);
    /* ***************************************************************************
     * Database
     * **************************************************************************/
    console.log("profileDatabase", profileDatabase);
    console.log("emailPreferenceDatabase", emailPreferenceDatabase);
    expect(profileDatabase).toEqual(null);
    expect(emailPreferenceDatabase).toEqual(null);
    console.log(
      "notificationPreferenceDatabase",
      notificationPreferenceDatabase
    );
    expect(notificationPreferenceDatabase).toEqual(null);
    console.log("generalPreferenceDatabase", generalPreferenceDatabase);
    expect(generalPreferenceDatabase).toEqual(null);

    /*==========================================================================
      ==========================================================================
                                  Post-Test
      ==========================================================================
      ========================================================================== */
  });
  it.concurrent("Wrong request data case", async () => {
    /*==========================================================================
      ==========================================================================
                                  Pre-Test
      ==========================================================================
      ========================================================================== */

    /* ***************************************************************************
     * Data
     * **************************************************************************/
    const registerData: RegisterData = {
      data: [
        {
          email: "nano",
          password: true,
          passwordConfirmation: 123456,
          termsAndConditions: "hello",
        },
      ],
      response: [],
      request: [],
      expected: [],
      database: [],
    };
    /* ***************************************************************************
     * Request
     * **************************************************************************/
    registerData.response[0] = await requester
      ?.post("/api/v1/auth/register")
      .send(registerData.data[0]);
    registerData.expected[0] = deepMerge.all([
      registerData.response?.[0]?.body,
      wrongRequestDataCaseExpected(registerData.data?.[0]),
      {
        details: {
          error: wrongRequestDataCaseExpected(registerData.data?.[0]).details
            .error,
        },
      },
    ]);
    /* ***************************************************************************
     * Database
     * **************************************************************************/
    registerData.database[0] = await UsersServices.deepFindOneByEmail(
      registerData.data?.[0]?.email
    );
    /* ***************************************************************************
     * Normalizer
     * **************************************************************************/
    const {
      profile: profileDatabase,
      generalPreference: generalPreferenceDatabase,
      notificationPreference: notificationPreferenceDatabase,
      emailPreference: emailPreferenceDatabase,
    } = registerData.database?.[0];
    const {
      code: codeReceived,
      title: titleReceived,
      hint: hintReceived,
      message: messageReceived,
      description: descriptionReceived,
      result: resultReceived,
      details: {
        input: {
          body: bodyReceived,
          headers: headersReceived,
          params: paramsReceived,
          query: queryReceived,
        },
        output: outputReceived,
        warning: warningReceived,
        error: errorReceived,
      },
    } = registerData.response?.[0]?.body;
    const {
      code: codeExpected,
      title: titleExpected,
      hint: hintExpected,
      description: descriptionExpected,
      message: messageExpected,
      result: resultExpected,
      details: {
        input: {
          body: bodyExpected,
          headers: headersExpected,
          params: paramsExpected,
          query: queryExpected,
        },
        output: outputExpected,
        warning: warningExpected,
        error: errorExpected,
      },
    } = registerData.expected?.[0];

    /*==========================================================================
      ==========================================================================
                                  Test
      ==========================================================================
      ========================================================================== */

    /* ***************************************************************************
     * Input Details (Body, Headers, Params, Query)
     * **************************************************************************/
    console.log("headersExpected", headersExpected);
    console.log("headersReceived", headersReceived);
    expect(headersReceived).toEqual(headersExpected);
    console.log("bodyExpected", bodyExpected);
    console.log("bodyReceived", bodyReceived);
    expect(bodyReceived).toEqual(bodyExpected);
    console.log("paramsExpected", paramsExpected);
    console.log("paramsReceived", paramsReceived);
    expect(paramsReceived).toEqual(paramsExpected);
    console.log("queryExpected", queryExpected);
    console.log("queryReceived", queryReceived);
    expect(queryReceived).toEqual(queryExpected);

    /***************************************************************************
     * Basic Details (Code, Title, Message, Hint, Result)
     * **************************************************************************/
    console.log("codeExpected", codeExpected);
    console.log("codeReceived", codeReceived);
    expect(codeReceived).toEqual(codeExpected);
    console.log("titleExpected", titleExpected);
    console.log("titleReceived", titleReceived);
    expect(titleReceived).toEqual(titleExpected);
    console.log("messageExpected", messageExpected);
    console.log("messageReceived", messageReceived);
    expect(messageReceived).toEqual(messageExpected);
    console.log("hintExpected", hintExpected);
    console.log("hintReceived", hintReceived);
    expect(hintReceived).toEqual(hintExpected);
    console.log("resultExpected", resultExpected);
    console.log("resultReceived", resultReceived);
    expect(resultReceived).toEqual(resultExpected);

    /***************************************************************************
     * Description Details (Description, Warning, Error)
     * **************************************************************************/
    console.log("warningExpected", warningExpected);
    console.log("warningReceived", warningReceived);
    expect(warningReceived).toEqual(warningExpected);
    console.log("errorExpected", errorExpected);
    console.log("errorReceived", errorReceived);
    errorReceived?.issues?.forEach((issue: any, index: number) => {
      expect(issue).toEqual(errorExpected.issues[index]);
      console.log("errorReceived.issue", issue);
      console.log("errorExpected.issue", errorExpected.issues[index]);
    });
    console.log("descriptionExpected", descriptionExpected);
    console.log("descriptionReceived", descriptionReceived);
    expect(descriptionReceived).toEqual(descriptionExpected);

    /***************************************************************************
     * Output Details (Output, Profile, Preferences, Settings)
     * **************************************************************************/
    console.log("outputExpected", outputExpected);
    console.log("outputReceived", outputReceived);
    /* ***************************************************************************
     * Database
     * **************************************************************************/
    console.log("profileDatabase", profileDatabase);
    console.log("emailPreferenceDatabase", emailPreferenceDatabase);
    expect(profileDatabase).toEqual(null);
    expect(emailPreferenceDatabase).toEqual(null);
    console.log(
      "notificationPreferenceDatabase",
      notificationPreferenceDatabase
    );
    expect(notificationPreferenceDatabase).toEqual(null);
    console.log("generalPreferenceDatabase", generalPreferenceDatabase);
    expect(generalPreferenceDatabase).toEqual(null);

    /*==========================================================================
      ==========================================================================
                                  Post-Test
      ==========================================================================
      ========================================================================== */
  });
});
