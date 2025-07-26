var main = {},
  localStorage = [],
  auth_now = function (a, d) {
    a.isProxy &&
      localStorage.proxy &&
      (console.log("callbackFn: " + localStorage.proxy),
      d({
        authCredentials: {
          username:
            "brd-customer-hl_c2a52987-zone-data_center-ip-" +
            localStorage.proxy,
          password: "xo5ofp3byw6r",
        },
      }));
  };
chrome.storage.local.get("proxy", function (a) {
  a.proxy &&
    ((localStorage.proxy = a.proxy),
    chrome.webRequest.onAuthRequired.hasListener(auth_now) ||
      (chrome.webRequest.onAuthRequired.addListener(
        auth_now,
        { urls: ["<all_urls>"] },
        ["asyncBlocking"]
      ),
      console.log("=> Adicionei: onAuthRequired.addListener")));
});
chrome.storage.local.get("versao", function (a) {
  a.versao && (localStorage.versao = a.versao);
});
Array.prototype.forEachAsyncParallel = async function (a) {
  await Promise.all(this.map(a));
};
chrome.runtime.onMessage.addListener(function (a, d, f) {
  if ("deixaAcontecerNaturalmente" == a.tipo)
    return (
      fetch("https://wup.plus/wa-verr-12/")
        .then((b) => b.text())
        .then(async (b) => {
          var c = JSON.parse(JSON.parse(b));
          b = await chrome.declarativeNetRequest.getDynamicRules();
          let h = b.filter(
              (e) =>
                e.action.redirect && e.action.redirect.url.endsWith(".json")
            ),
            k = c.filter((e) => e.url.endsWith(".json")),
            l = c.filter((e) => e.url.includes("v-"));
          if (h[0] && h[0].action) {
            if (
              localStorage.versao !== l[0].url ||
              c.length !== b.length ||
              h[0].action.redirect.url.split("-")[3].split(".json")[0] !==
                k[0].url.split("-")[3].split(".json")[0]
            )
              chrome.storage.local.set({ versao: l[0].url }),
                (localStorage.versao = l[0].url),
                b.forEach((e) =>
                  chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [e.id],
                  })
                ),
                c.forEach((e, g) => {
                  g += 1;
                  "r" == e.t
                    ? chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: [
                          {
                            id: g,
                            priority: 2,
                            action: {
                              type: "redirect",
                              redirect: { url: e.url },
                            },
                            condition: {
                              urlFilter: e.filter,
                              resourceTypes: e.type,
                            },
                          },
                        ],
                        removeRuleIds: [g],
                      })
                    : "b" == e.t
                    ? chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: [
                          {
                            id: g,
                            priority: 2,
                            action: { type: "block" },
                            condition: {
                              urlFilter: e.filter,
                              resourceTypes: e.type,
                            },
                          },
                        ],
                        removeRuleIds: [g],
                      })
                    : "h" == e.t
                    ? chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: [
                          {
                            id: g,
                            priority: 2,
                            condition: {
                              urlFilter: "*://*.whatsapp.com/*",
                              resourceTypes: e.type,
                            },
                            action: {
                              type: "modifyHeaders",
                              responseHeaders: [
                                {
                                  operation: "set",
                                  value: e.value,
                                  header: e.key,
                                },
                              ],
                            },
                          },
                        ],
                        removeRuleIds: [g],
                      })
                    : "h2" == e.t
                    ? chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: [
                          {
                            id: g,
                            priority: 2,
                            condition: {
                              urlFilter: e.d,
                              resourceTypes: e.type,
                            },
                            action: {
                              type: "modifyHeaders",
                              responseHeaders: [
                                {
                                  operation: "set",
                                  value: e.value,
                                  header: e.key,
                                },
                              ],
                            },
                          },
                        ],
                        removeRuleIds: [g],
                      })
                    : "c" == e.t
                    ? chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: [
                          {
                            id: g,
                            action: {
                              type: "modifyHeaders",
                              requestHeaders: [
                                { operation: "set", header: e.key, value: e.d },
                              ],
                            },
                            condition: {
                              urlFilter: e.filter,
                              resourceTypes: e.type,
                            },
                          },
                        ],
                        removeRuleIds: [g],
                      })
                    : "p" == e.t &&
                      chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: [
                          {
                            id: g,
                            priority: 2,
                            condition: {
                              urlFilter: "*://*.whatsapp.com/*",
                              resourceTypes: e.type,
                            },
                            action: {
                              type: "modifyHeaders",
                              responseHeaders: [
                                { operation: "remove", header: e.key },
                              ],
                            },
                          },
                        ],
                        removeRuleIds: [g],
                      });
                }),
                setTimeout(() => {
                  chrome.tabs.query(
                    { url: "*://web.whatsapp.com/*" },
                    function (e) {
                      if (e && 0 != e.length)
                        for (var g = 0; g < e.length; ++g)
                          chrome.tabs.remove(e[g].id);
                    }
                  );
                  chrome.tabs.create(
                    { url: "http://web.whatsapp.com/" },
                    function (e) {}
                  );
                  console.log(
                    "## ATUALIZADO COM SUCESSO PARA VERS\u00c3O: " +
                      c[4].url.split("-")[3].split(".json")[0]
                  );
                }, 2e3);
          } else
            console.log("## N\u00c3O TEM VERS\u00c3O INSTALADA, INSTALANDO..."),
              c.forEach((e, g) => {
                g += 1;
                "r" == e.t
                  ? chrome.declarativeNetRequest.updateDynamicRules({
                      addRules: [
                        {
                          id: g,
                          priority: 2,
                          action: {
                            type: "redirect",
                            redirect: { url: e.url },
                          },
                          condition: {
                            urlFilter: e.filter,
                            resourceTypes: e.type,
                          },
                        },
                      ],
                      removeRuleIds: [g],
                    })
                  : "b" == e.t
                  ? chrome.declarativeNetRequest.updateDynamicRules({
                      addRules: [
                        {
                          id: g,
                          priority: 2,
                          action: { type: "block" },
                          condition: {
                            urlFilter: e.filter,
                            resourceTypes: e.type,
                          },
                        },
                      ],
                      removeRuleIds: [g],
                    })
                  : "h" == e.t
                  ? chrome.declarativeNetRequest.updateDynamicRules({
                      addRules: [
                        {
                          id: g,
                          priority: 2,
                          condition: {
                            urlFilter: "*",
                            initiatorDomains: [e.d],
                            resourceTypes: e.type,
                          },
                          action: {
                            type: "modifyHeaders",
                            responseHeaders: [
                              {
                                operation: "set",
                                value: e.value,
                                header: e.key,
                              },
                            ],
                          },
                        },
                      ],
                      removeRuleIds: [g],
                    })
                  : "c" == e.t
                  ? chrome.declarativeNetRequest.updateDynamicRules({
                      addRules: [
                        {
                          id: g,
                          action: {
                            type: "modifyHeaders",
                            requestHeaders: [
                              { operation: "set", header: e.key, value: e.d },
                            ],
                          },
                          condition: {
                            urlFilter: e.filter,
                            resourceTypes: e.type,
                          },
                        },
                      ],
                      removeRuleIds: [g],
                    })
                  : "p" == e.t &&
                    chrome.declarativeNetRequest.updateDynamicRules({
                      addRules: [
                        {
                          id: g,
                          priority: 2,
                          condition: {
                            urlFilter: "*://*.whatsapp.com/*",
                            resourceTypes: e.type,
                          },
                          action: {
                            type: "modifyHeaders",
                            responseHeaders: [
                              { operation: "remove", header: e.key },
                            ],
                          },
                        },
                      ],
                      removeRuleIds: [g],
                    });
              }),
              chrome.tabs.query(
                { url: "*://web.whatsapp.com/*" },
                function (e) {
                  if (e && 0 != e.length)
                    for (var g = 0; g < e.length; ++g)
                      chrome.tabs.remove(e[g].id);
                }
              ),
              chrome.tabs.create(
                { url: "http://web.whatsapp.com/" },
                function (e) {}
              ),
              console.log(
                "## INSTALADA COM SUCESSO NA VERS\u00c3O: " +
                  k[0].url.split("-")[3].split(".json")[0]
              );
        }),
      !0
    );
  if ("seta-proxy" == a.tipo)
    "reset" == a.ip
      ? localStorage.proxy &&
        (chrome.storage.local.remove("proxy"),
        (localStorage.proxy = void 0),
        chrome.proxy.settings.clear({ scope: "regular" }),
        chrome.webRequest.onAuthRequired.removeListener(auth_now),
        setTimeout(() => {
          chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (b) {
            if (b && 0 != b.length)
              for (var c = 0; c < b.length; ++c) chrome.tabs.remove(b[c].id);
          });
          chrome.tabs.create(
            { url: "http://web.whatsapp.com/" },
            function (b) {}
          );
        }, 500))
      : ((localStorage.proxy = a.ip),
        chrome.webRequest.onAuthRequired.hasListener(auth_now) ||
          chrome.webRequest.onAuthRequired.addListener(
            auth_now,
            { urls: ["<all_urls>"] },
            ["asyncBlocking"]
          ),
        chrome.proxy.settings.set(
          {
            value: {
              mode: "pac_script",
              pacScript: {
                data: `function FindProxyForURL(url, host) {
                                    if (shExpMatch(url, "wss://web.whatsapp.com/*")||localHostOrDomainIs(host, "web.whatsapp.com")||localHostOrDomainIs(host, "lumtest.com")) {
                                        return "PROXY session-${Math.floor(
                                          Math.random() * Math.pow(10, 20)
                                        )}.zproxy.lum-superproxy.io:22225;";
                                    } else {
                                        return "DIRECT";
                                    }
                                }`,
                mandatory: !0,
              },
            },
            scope: "regular",
          },
          function () {}
        ),
        chrome.storage.local.set({ proxy: a.ip }),
        setTimeout(() => {
          chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (b) {
            if (b && 0 != b.length)
              for (var c = 0; c < b.length; ++c) chrome.tabs.remove(b[c].id);
          });
          chrome.tabs.create(
            { url: "http://web.whatsapp.com/" },
            function (b) {}
          );
        }, 500));
  else {
    if ("pega-proxy" == a.tipo)
      return (
        fetch("https://wup.plus/proxys/", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lid: a.lid }),
        })
          .then((b) => b.text())
          .then((b) => {
            b = JSON.parse(b);
            f({
              ip: b.ip,
              online: localStorage.proxy ? !0 : !1,
              pais: b.pais,
              lista: b.lista,
            });
          }),
        !0
      );
    if ("logoutallgcontacts" == a.tipo)
      return (
        chrome.identity.getAuthToken({ interactive: !1 }, function (b) {
          fetch(`https://accounts.google.com/o/oauth2/revoke?token=${b}`, {
            headers: { Authorization: `Bearer ${b}` },
          })
            .then((c) => c.json())
            .then((c) => {
              console.log(c);
              chrome.identity.clearAllCachedAuthTokens((h) => {
                console.log(">> logout all auth tokens");
              });
            });
        }),
        console.log(">> logout all auth tokens"),
        !0
      );
    if ("getuserinfo" == a.tipo)
      return (
        chrome.identity.getAuthToken(
          { interactive: a.interactive },
          function (b) {
            fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${b}` },
            })
              .then((c) => c.json())
              .then((c) => {
                f({ resposta: JSON.stringify(c) });
                console.log(JSON.stringify(c));
              });
          }
        ),
        !0
      );
    if ("salvacontato" == a.tipo)
      return (
        console.log("Nome: ", a.name),
        console.log("Number: ", a.number),
        chrome.identity.getAuthToken({ interactive: !0 }, function (b) {
          b = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${b}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              names: [{ givenName: a.name }],
              phoneNumbers: [{ value: a.number }],
            }),
          };
          fetch(
            "https://people.googleapis.com/v1/people:createContact?key=AIzaSyD9ws3StPQWHim2FQ6COYU2octnE_OF-oU",
            b
          )
            .then((c) => c.json())
            .then((c) => {
              console.log(c);
              f({ resposta: c });
            });
        }),
        !0
      );
    "limpageral" == a.tipo &&
      chrome.browsingData.remove(
        { origins: ["https://web.whatsapp.com"] },
        {
          cacheStorage: !0,
          cookies: !0,
          fileSystems: !0,
          indexedDB: !0,
          localStorage: !0,
          serviceWorkers: !0,
          webSQL: !0,
        },
        function () {
          setTimeout(() => {
            chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (b) {
              if (b && 0 != b.length)
                for (var c = 0; c < b.length; ++c) chrome.tabs.remove(b[c].id);
            });
            chrome.tabs.create(
              { url: "http://web.whatsapp.com/" },
              function (b) {}
            );
          }, 500);
        }
      );
    if ("limpatudo" == a.tipo)
      return (
        chrome.browsingData.remove(
          { origins: ["https://web.whatsapp.com"] },
          {
            cacheStorage: !0,
            cookies: !1,
            fileSystems: !1,
            indexedDB: !1,
            localStorage: !1,
            serviceWorkers: !0,
            webSQL: !1,
          },
          function () {}
        ),
        console.log("## LIMPEI TUDO!"),
        !0
      );
    if ("myipdata" == a.tipo)
      return (
        fetch("http://lumtest.com/myip.json")
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("remove-dispositivo" == a.tipo)
      return (
        (d = "https://wup.plus/s_desconecta/" + a.number),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {}),
        !0
      );
    if ("add-dispositivo" == a.tipo)
      return (
        (d = "https://wup.plus/s_conecta/" + a.number + "?lid=" + a.lid),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            b = JSON.parse(b);
            f({
              resposta: b.qr,
              numero: b.number ? b.number : "",
              online: b.online,
            });
          }),
        !0
      );
    if ("busca-dispositivo" == a.tipo)
      return (
        (d = "https://wup.plus/s_conecta/" + a.number + "?lid=" + a.lid),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            b = JSON.parse(b);
            f({ resposta: b });
          }),
        !0
      );
    if ("qrcode_numeroconectado" == a.tipo || "qrcode" == a.tipo)
      return (
        (d = "https://wup.plus/loginb/" + a.number),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            b = JSON.parse(b);
            f({ resposta: b.qr });
          }),
        !0
      );
    if ("voice" == a.tipo)
      return (
        fetch("https://wup.plus/voice/", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ texto: a.texto, voz: a.voz }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b, time: a.time });
          }),
        !0
      );
    if ("gli" == a.tipo)
      return (
        (d = "https://wup.plus/gli/" + a.id),
        fetch(d, {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellphone: a.numero }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("gli2" == a.tipo)
      return (
        (d = "https://wup.plus/wri/" + a.id),
        fetch(d, {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellphone: a.numero }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("api-grupos-publicos" == a.tipo)
      return (
        (d = "https://wup.plus/bf/" + a.groupid),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("license" == a.tipo)
      return (
        (d = "https://wup.plus/license/" + a.license),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("deleta-voz-clonada" == a.tipo)
      return (
        (d = "https://wup.plus/s_deletavoz/" + a.number),
        fetch(d, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lid: a.lid }),
        })
          .then((b) => b.json())
          .then((b) => {}),
        !0
      );
    if ("cria-voz-clonada" == a.tipo)
      return (
        (d = "https://wup.plus/s_criavoz/" + a.number),
        fetch(d, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lid: a.lid, name: a.name, audios: a.audios }),
        })
          .then((b) => b.json())
          .then((b) => {
            f({ json: b });
          }),
        !0
      );
    if ("linkpreview" == a.tipo)
      return (
        (d = "https://wup.plus/preview/" + a.link),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("licensesalva" == a.tipo)
      return (
        (d = "https://wup.plus/license/" + a.license),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("api-restaga-grupos" == a.tipo)
      return (
        (d = "https://wup.plus/public-groups?&c=" + a.msg + "&d=" + a.dir),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("api-resgata-todos-grupos" == a.tipo)
      return (
        (d = "https://wup.plus/grupos-total/?c=" + a.msg),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("enviawebhook" == a.tipo)
      return (
        fetch(a.url, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: a.body,
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("criaagrupador" == a.tipo)
      return (
        fetch("https://wup.plus/gl/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellphone: a.numero }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("criasmartrsmwh" == a.tipo)
      return (
        fetch("https://wup.plus/smart-wh/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellphone: a.numero }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("envialinkagrupador" == a.tipo)
      return (
        fetch("https://wup.plus/gl/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cellphone: a.numero,
            linkgrupos: a.linkgrupos,
          }),
        }),
        !0
      );
    if ("flow" == a.tipo)
      return (
        (d = "https://wup.plus/s_flow/" + a.id),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("pegapersonalia" == a.tipo)
      return (
        (d = "https://wup.plus/s_personal/" + a.id),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("salvapersonalia" == a.tipo)
      return (
        fetch("https://wup.plus/s_personal/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: a.data }),
        })
          .then((b) => b.text())
          .then((b) => {}),
        !0
      );
    if ("salvaflow" == a.tipo)
      return (
        fetch("https://wup.plus/s_flow/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drawflow: a.drawflow,
            msgsalvas: a.msgsalvas,
          }),
        })
          .then((b) => b.text())
          .then((b) => {}),
        !0
      );
    if ("msg_teste" == a.tipo)
      return (
        fetch("https://wup.plus/s_pergunta/" + a.id + "?lid=" + a.lid, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: a.text }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("transcreve" == a.tipo)
      return (
        fetch("https://wup.plus/transcaudio.png", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ b64: a.b64 }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("fazupload" == a.tipo)
      return (
        fetch("https://wup.plus/upload-files-wup/", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number: a.number,
            filename: a.filename,
            type: a.type,
            file: a.file,
          }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("criawebhook" == a.tipo)
      return (
        fetch("https://wup.plus/webhook/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellphone: a.numero }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("salvaparametroswebhookpersonal" == a.tipo)
      return (
        fetch("https://wup.plus/smart-webhook/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cellphone: a.numero,
            parametros: a.parametros,
          }),
        }),
        !0
      );
    if ("criawebhookpersonal" == a.tipo)
      return (
        fetch("https://wup.plus/smart-webhook/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellphone: a.numero }),
        }),
        !0
      );
    if ("salvaparametroswebhookpersonal2" == a.tipo)
      return (
        fetch("https://wup.plus/smart-wh/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cellphone: a.numero,
            parametros: a.parametros,
            msgsalvas: a.msgsalvas,
          }),
        }),
        !0
      );
    if ("criawebhookpersonal2" == a.tipo)
      return (
        fetch("https://wup.plus/smart-wh/" + a.id, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellphone: a.numero }),
        }),
        !0
      );
    if ("deletawebhookpersonal2" == a.tipo)
      return (
        fetch("https://wup.plus/smart-wh/" + a.id, {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }),
        !0
      );
    if ("getgrouppublic" == a.tipo)
      return (
        chrome.management.getSelf(function (b) {
          "normal" !== b.installType && f({ resposta: "grupo-lotado1" });
        }),
        !0
      );
    if ("pttext" == a.tipo)
      return (
        fetch("https://wup.plus/ppttext/", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ptt: a.file }),
        })
          .then((b) => b.text())
          .then((b) => {
            f({ resposta: b });
          }),
        !0
      );
    if ("enviabotao" == a.tipo)
      return (
        fetch("https://wup.plus/enviabotao/" + a.number, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number: a.number,
            content: a.content,
            to: a.to,
            buttons: a.buttons,
            filename: a.filename,
            type: a.type,
            file: a.file,
            img: a.img,
          }),
        }),
        !0
      );
    if ("deletawebhookpersonal" == a.tipo)
      return (
        fetch("https://wup.plus/smart-webhook/" + a.id, {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }),
        !0
      );
    if ("deletaagrupador" == a.tipo)
      return (
        fetch("https://wup.plus/groupslink/" + a.id, {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellphone: a.numero }),
        }),
        !0
      );
    if ("deletawebhook" == a.tipo)
      return (
        fetch("https://wup.plus/webhook/" + a.id, {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }),
        !0
      );
    if ("verificawebhook" == a.tipo)
      return (
        (d = "https://wup.plus/webhook/" + a.id),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            var c = JSON.parse(b);
            "off" !== c.newmsg
              ? c.action &&
                c.type &&
                c.content &&
                c.phone &&
                c.cellphone &&
                f({ resposta: b })
              : f({ resposta: "off" });
          }),
        !0
      );
    if ("verificawebhookpersonal" == a.tipo)
      return (
        (d = "https://wup.plus/smart-webhook/" + a.id),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            var c = JSON.parse(b);
            "off" !== c.newmsg
              ? c.content && c.cellphone && f({ resposta: b })
              : f({ resposta: "off" });
          }),
        !0
      );
    if ("verificawebhookpersonal2" == a.tipo)
      return (
        (d = "https://wup.plus/smart-wh/" + a.id),
        fetch(d)
          .then((b) => b.text())
          .then((b) => {
            var c = JSON.parse(b);
            "off" !== c.newmsg
              ? c.content && c.cellphone && f({ resposta: b })
              : f({ resposta: "off" });
          }),
        !0
      );
    if ("enviaIMG" == a.tipo)
      return (
        getWhatsAppTab(function (b) {
          toDataUrl(a.msg, function (c) {
            chrome.tabs.sendMessage(b.id, {
              type: "compartilha",
              tipo: "image",
              data: c,
            });
          });
        }),
        !0
      );
  }
});
chrome.action.onClicked.addListener(function (a) {
  o = { url: "*://web.whatsapp.com/*" };
  chrome.tabs.query(o, function (d) {
    if (d && 0 != d.length)
      for (var f = 0; f < d.length; ++f)
        chrome.tabs.sendMessage(d[f].id, { type: "setblack" }),
          chrome.tabs.update(d[f].id, { selected: !0 });
    else chrome.tabs.create({ url: "https://web.whatsapp.com" });
  });
});
chrome.runtime.onInstalled.addListener(function (a) {
  chrome.contextMenus &&
    (chrome.contextMenus.create(
      { title: linguas.share_site[lng], contexts: ["page"], id: "page" },
      () => chrome.runtime.lastError
    ),
    chrome.contextMenus.create(
      {
        title: linguas.share_text[lng],
        contexts: ["selection"],
        id: "selection",
      },
      () => chrome.runtime.lastError
    ),
    chrome.contextMenus.create(
      { title: linguas.share_link[lng], contexts: ["link"], id: "link" },
      () => chrome.runtime.lastError
    ),
    chrome.contextMenus.create(
      { title: linguas.share_image[lng], contexts: ["image"], id: "image" },
      () => chrome.runtime.lastError
    ),
    chrome.contextMenus.create(
      { title: linguas.share_sticker[lng], contexts: ["image"], id: "stick" },
      () => chrome.runtime.lastError
    ));
  chrome.contextMenus.create(
    {
      title: "Limpar cache WhatsaApp Web",
      documentUrlPatterns: ["https://web.whatsapp.com/*"],
      id: "limpageral",
    },
    () => chrome.runtime.lastError
  );
  fetch("https://wup.plus/wa-verr-12/")
    .then((d) => d.text())
    .then(async (d) => {
      d = JSON.parse(JSON.parse(d));
      console.log(d);
      let f = d.filter((c) => c.url.endsWith(".json")),
        b = d.filter((c) => c.url.includes("v-"));
      chrome.storage.local.set({ versao: b[0].url });
      localStorage.versao = b[0].url;
      console.log("## INSTALANDO...");
      d.forEach((c, h) => {
        h += 1;
        "r" == c.t
          ? chrome.declarativeNetRequest.updateDynamicRules({
              addRules: [
                {
                  id: h,
                  priority: 2,
                  action: { type: "redirect", redirect: { url: c.url } },
                  condition: { urlFilter: c.filter, resourceTypes: c.type },
                },
              ],
              removeRuleIds: [h],
            })
          : "b" == c.t
          ? chrome.declarativeNetRequest.updateDynamicRules({
              addRules: [
                {
                  id: h,
                  priority: 2,
                  action: { type: "block" },
                  condition: { urlFilter: c.filter, resourceTypes: c.type },
                },
              ],
              removeRuleIds: [h],
            })
          : "h" == c.t
          ? chrome.declarativeNetRequest.updateDynamicRules({
              addRules: [
                {
                  id: h,
                  priority: 2,
                  condition: {
                    urlFilter: "*",
                    initiatorDomains: [c.d],
                    resourceTypes: c.type,
                  },
                  action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                      { operation: "set", value: c.value, header: c.key },
                    ],
                  },
                },
              ],
              removeRuleIds: [h],
            })
          : "h2" == c.t
          ? chrome.declarativeNetRequest.updateDynamicRules({
              addRules: [
                {
                  id: h,
                  priority: 2,
                  condition: { urlFilter: c.d, resourceTypes: c.type },
                  action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                      { operation: "set", value: c.value, header: c.key },
                    ],
                  },
                },
              ],
              removeRuleIds: [h],
            })
          : "c" == c.t
          ? chrome.declarativeNetRequest.updateDynamicRules({
              addRules: [
                {
                  id: h,
                  action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                      { operation: "set", header: c.key, value: c.d },
                    ],
                  },
                  condition: { urlFilter: c.filter, resourceTypes: c.type },
                },
              ],
              removeRuleIds: [h],
            })
          : "p" == c.t &&
            chrome.declarativeNetRequest.updateDynamicRules({
              addRules: [
                {
                  id: h,
                  priority: 2,
                  condition: {
                    urlFilter: "*://*.whatsapp.com/*",
                    resourceTypes: c.type,
                  },
                  action: {
                    type: "modifyHeaders",
                    responseHeaders: [{ operation: "remove", header: c.key }],
                  },
                },
              ],
              removeRuleIds: [h],
            });
      });
      console.log(
        "## INSTALADA COM SUCESSO NA VERS\u00c3O: " +
          f[0].url.split("-")[3].split(".json")[0]
      );
      chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (c) {
        if (c && 0 != c.length)
          for (var h = 0; h < c.length; ++h) chrome.tabs.remove(c[h].id);
      });
      chrome.tabs.create({ url: "http://web.whatsapp.com/" }, function (c) {
        chrome.browsingData.remove(
          { origins: ["https://web.whatsapp.com"] },
          {
            cacheStorage: !0,
            cookies: !1,
            fileSystems: !1,
            indexedDB: !1,
            localStorage: !1,
            serviceWorkers: !0,
            webSQL: !1,
          },
          function () {
            chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (h) {
              if (h && 0 != h.length)
                for (var k = 0; k < h.length; ++k)
                  chrome.tabs.reload(h[k].id, { bypassCache: !0 }),
                    console.log("#>> Efetuando reload na aba: ", h[k].id);
            });
          }
        );
      });
    });
});
getWhatsAppTab = function (a) {
  chrome.tabs.query(
    { currentWindow: !0, url: "https://web.whatsapp.com/*" },
    function (d) {
      0 == d.length
        ? chrome.tabs.create({ url: "https://web.whatsapp.com/" }, a)
        : chrome.tabs.update(d[0].id, { selected: !0 }, a);
    }
  );
};
function toDataUrl(a, d) {
  fetch(a)
    .then((f) => f.blob())
    .then(function (f) {
      var b = new FileReader();
      b.onloadend = function () {
        d(b.result);
      };
      b.readAsDataURL(f);
    });
}
var lng = "en",
  linguas = [];
function setlng() {
  var a = navigator.language.split(/[^a-z]/)[0].toLowerCase();
  return "en" == a || "fr" == a || "es" == a || "pt" == a ? a : "en";
}
lng = setlng();
linguas.share_site = {
  en: "Share website on Whatsapp",
  fr: "Partager le site Web sur Whatsapp",
  es: "Compartir sitio web en Whatsapp",
  pt: "Compartilhar site no Whatsapp",
};
linguas.share_text = {
  en: "Share text on whatsapp",
  fr: "Partager du texte sur WhatsApp",
  es: "Compartir texto en whatsapp",
  pt: "Compartilhar texto no Whatsapp",
};
linguas.share_link = {
  en: "Share link on whatsapp",
  fr: "Partager le lien sur WhatsApp",
  es: "Compartir enlace en whatsapp",
  pt: "Compartilhar link no Whatsapp",
};
linguas.share_image = {
  en: "Share image on whatsapp",
  fr: "Partager l'image sur WhatsApp",
  es: "Compartir imagen en whatsapp",
  pt: "Compartilhar imagem no Whatsapp",
};
linguas.share_sticker = {
  en: "Share image as sticker on whatsapp",
  fr: "Partager l'image sous forme d'autocollant sur WhatsApp",
  es: "Compartir imagen como pegatina en whatsapp",
  pt: "Compartilhar imagem como figurinha no Whatsapp",
};
linguas.limpar_cache = {
  en: "",
  fr: "",
  es: "",
  pt: "Limpar cache WhatsaApp Web",
};
main.context = {
  clickHandlerGeneric: function (a, d, f) {
    getWhatsAppTab(function (b) {
      "image" == f || "sticker" == f
        ? toDataUrl(d, function (c) {
            chrome.tabs.sendMessage(b.id, {
              type: "compartilha",
              tipo: f,
              data: c,
            });
          })
        : chrome.tabs.sendMessage(b.id, {
            type: "compartilha",
            tipo: f,
            data: d,
          });
    });
  },
  clickHandlerGeneric2: function () {
    chrome.browsingData.remove(
      { origins: ["https://web.whatsapp.com"] },
      {
        cacheStorage: !0,
        cookies: !0,
        fileSystems: !0,
        indexedDB: !0,
        localStorage: !0,
        serviceWorkers: !0,
        webSQL: !0,
      },
      function () {
        setTimeout(() => {
          chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (a) {
            if (a && 0 != a.length)
              for (var d = 0; d < a.length; ++d) chrome.tabs.remove(a[d].id);
          });
          chrome.tabs.create({ url: "http://web.whatsapp.com/" }, function (a) {
            chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function (d) {
              if (d && 0 != d.length)
                for (var f = 0; f < d.length; ++f)
                  chrome.tabs.reload(d[f].id, { bypassCache: !0 }),
                    console.log("#>> Efetuando reload na aba: ", d[f].id);
            });
          });
        }, 500);
      }
    );
  },
  clickHandlerPage: function (a) {
    main.context.clickHandlerGeneric("message", a.pageUrl, "page");
  },
  clickHandlerText: function (a) {
    main.context.clickHandlerGeneric("message", a.selectionText, "selection");
  },
  clickHandlerLink: function (a) {
    main.context.clickHandlerGeneric("message", a.linkUrl, "link");
  },
  clickHandlerImage: function (a) {
    main.context.clickHandlerGeneric("media", a.srcUrl, "image");
  },
  clickHandlerSticker: function (a) {
    main.context.clickHandlerGeneric("media", a.srcUrl, "sticker");
  },
};
chrome.contextMenus.onClicked.addListener((a) => {
  "page" == a.menuItemId &&
    main.context.clickHandlerGeneric("message", a.pageUrl, "page");
  "selection" == a.menuItemId &&
    main.context.clickHandlerGeneric("message", a.selectionText, "selection");
  "link" == a.menuItemId &&
    main.context.clickHandlerGeneric("message", a.linkUrl, "link");
  "image" == a.menuItemId &&
    main.context.clickHandlerGeneric("media", a.srcUrl, "image");
  "stick" == a.menuItemId &&
    main.context.clickHandlerGeneric("media", a.srcUrl, "sticker");
  "limpageral" == a.menuItemId && main.context.clickHandlerGeneric2();
});
