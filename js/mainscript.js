var WhatsApp = function (a, b) {
  this.mutex = a;
  this.majordomo = b;
};
WhatsApp.prototype.wrapCallbackWithDelay = function (a, b) {
  var c = this.mutex,
    d = this,
    e = function () {
      a.call(d);
      c.unlock();
    };
  c.lock(
    void 0 !== b
      ? function () {
          setTimeout(e, b);
        }
      : e
  );
};
WhatsApp.prototype.majordomoHandler = function (a) {};
WhatsApp.prototype.readContacts = function (a) {
  a = a || !1;
  this.wrapCallbackWithDelay(function () {
    this.majordomo.sendData({ action: "readContacts", params: { reset: a } });
  }, 500);
};
function setCookie() {
  const a = new Date();
  a.setTime(a.getTime() + 31104e6);
  document.cookie = `wa_build=c;expires=${a.toUTCString()};domain=.web.whatsapp.com;path=/;Secure`;
}
chrome.runtime.sendMessage({ tipo: "limpatudo" }, function (a) {});
chrome.runtime.sendMessage(
  { tipo: "deixaAcontecerNaturalmente" },
  function (a) {}
);
var minhaDataToda;
chrome.storage.local.get(function (a) {
  try {
    Object.keys(a).forEach((b) => {
      b.includes("file_") && delete a[b];
      b.includes("msgautosalvas") &&
        (a[b] = btoa(unescape(encodeURIComponent(a[b]))));
    }),
      (minhaDataToda = a);
  } catch (b) {
    console.log(b);
  }
});
window.addEventListener(
  "SalvaNoBd",
  function (a) {
    chrome.storage.local.set({ [a.detail.msg]: a.detail.dir });
  },
  !1
);
window.addEventListener(
  "DeletaDoBd",
  function (a) {
    chrome.storage.local.remove(a.detail.msg);
  },
  !1
);
window.addEventListener(
  "exportadados",
  function (a) {
    chrome.storage.local.get(function (b) {
      Object.keys(b).forEach((d) => {
        d.includes("file_") && delete b[d];
      });
      var c = new CustomEvent("recebedados", { detail: { msg: b } });
      this.dispatchEvent(c);
    });
  },
  !1
);
window.addEventListener(
  "PegaTodosFiles",
  function (a) {
    let b = [];
    chrome.storage.local.get(function (c) {
      for (let [d, e] of Object.entries(c))
        d.includes("file_") && b.push({ name: d, file: e });
      meutimer = setInterval(function () {
        if (0 < b.length) {
          clearInterval(meutimer);
          var d = new CustomEvent("DevolveTodosFiles", { detail: { msg: b } });
          this.dispatchEvent(d);
        }
      }, 1e3);
    });
  },
  !1
);
window.addEventListener(
  "PegaNoBd",
  function (a) {
    chrome.storage.local.get(a.detail.msg, function (b) {
      b = new CustomEvent("RecebeDoBd", { detail: { msg: b[a.detail.msg] } });
      this.dispatchEvent(b);
    });
  },
  !1
);
var meugrupoatual = chrome.runtime.id;
function injectScript(a, b) {
  if (!document.getElementById(b)) {
    var c = document.createElement("script");
    c.setAttribute("type", "text/javascript");
    c.setAttribute("src", "chrome-extension://" + meugrupoatual + "/" + a);
    c.setAttribute("id", b);
    document.body.appendChild(c);
  }
}
let inter = window.setInterval(function () {
  document.querySelector(".landing-wrapper")
    ? (clearInterval(inter),
      injectScript("js/public/vendors.min.js", "vendors-min-js"),
      injectScript("js/public/alertify.min.js", "alertify-min-js"),
      injectScript("js/public/wonderplug.js", "wonderplug-js"),
      injectScript("js/public/selectize.min.js", "selectize-min-js"),
      injectScript("js/public/p.js", "p-js"),
      (injetado_parcial = !0))
    : injectScript("js/public/p2.js", "p2-js");
}, 100);
var main = window.main || {};
main.utils = {
  injectScript: function (a, b) {
    if (!document.getElementById(b)) {
      var c = document.createElement("script");
      c.setAttribute("type", "text/javascript");
      c.setAttribute("src", "chrome-extension://" + meugrupoatual + "/" + a);
      c.setAttribute("id", b);
      document.body.appendChild(c);
    }
  },
};
main.api = {
  pageScriptsReady: !1,
  objs: {},
  isReady: function () {
    document.querySelector("#pane-side") &&
      (window.clearInterval(main.api.intervalObject), main.api.onReady());
  },
  onReady: function () {
    var a = new Mutex(),
      b = main.api.initPageScripts();
    main.api.objs.whatsApp = new WhatsApp(a, b);
  },
  initPageScripts: function () {
    return (
      (main.api.pageScriptsReady = !1),
      (main.api.objs.majordomo = new Majordomo(
        window,
        !0,
        "https://web.whatsapp.com",
        "https://web.whatsapp.com"
      )),
      main.api.objs.majordomo.setUpListener(function (a) {
        main.api.pageScriptsReady
          ? main.api.objs.whatsApp.majordomoHandler(a)
          : main.api.onPageScriptsReady();
      }),
      main.utils.injectScript("js/public/vendors.min.js", "vendors-min-js"),
      main.utils.injectScript("js/public/alertify.min.js", "alertify-min-js"),
      main.utils.injectScript(
        "js/public/alertifyjs.init.js",
        "alertifyjs-init-js"
      ),
      main.utils.injectScript("js/public/app.js", "app.js"),
      main.utils.injectScript("js/public/wonderplug.js", "wonderplug-js"),
      main.utils.injectScript(
        "js/public/ion.rangeSlider.min.js",
        "ion-rangeSlider-min-js"
      ),
      main.utils.injectScript("js/public/selectize.min.js", "selectize-min-js"),
      main.utils.injectScript(
        "js/public/bootstrap-rating.min.js",
        "bootstrap-rating-min-js"
      ),
      main.utils.injectScript("js/public/toastr.min.js", "toastr-min-js"),
      main.utils.injectScript(
        "js/public/jquery.magnific-popup.min.js",
        "jquery-magnific-popup-min-js"
      ),
      main.utils.injectScript("js/public/apex.js", "apex-js"),
      main.utils.injectScript(
        "js/public/apexcharts.min.js",
        "apexcharts-min-js"
      ),
      main.utils.injectScript("js/public/xlsx.full.min.js", "xlsx-full-min-js"),
      main.utils.injectScript("js/public/maj.js", "maj-js"),
      main.utils.injectScript(
        "js/public/bootstrap.bundle.min.js",
        "bootstrap-bundle-min-js"
      ),
      main.utils.injectScript("js/public/dropzone.min.js", "dropzone-min-js"),
      main.utils.injectScript(
        "js/public/form-advanced.init.js",
        "form-advanced-init-js"
      ),
      main.utils.injectScript(
        "js/public/sweetalert2.min.js",
        "sweetalert2-min-js"
      ),
      main.utils.injectScript("js/public/flatpickr.min.js", "flatpickr-min-js"),
      main.utils.injectScript("js/public/dropzone.js", "dapps-js"),
      main.utils.injectScript("js/public/in.js", "apps-js"),
      main.api.objs.majordomo
    );
  },
  onPageScriptsReady: function () {
    main.api.objs.whatsApp.readContacts(minhaDataToda);
  },
};
chrome.runtime && chrome.runtime.onMessage;
main.api.intervalObject = window.setInterval(main.api.isReady, 1);
chrome.runtime.onMessage.addListener(function (a, b, c) {
  "setblack" == a.type ? abreMenuAe() : "reset" == a.type && abreMenuAe();
});
chrome.runtime.onMessage.addListener(function (a, b, c) {
  "compartilha" == a.type && compartilhAA(a.data, a.tipo);
});
var currentURL = "" + window.location;
chrome.runtime.sendMessage({ BlackOn: 1 }, function (a) {
  a && a.black && 0 < currentURL.indexOf("web.whatsapp.com") && abreMenuAe();
});
function abreMenuAe() {
  var a = new CustomEvent("abremenuaew", {
    detail: { msg: "hey", tipo: "how" },
  });
  this.dispatchEvent(a);
}
function compartilhAA(a, b) {
  a = new CustomEvent("compartilha", { detail: { msg: a, tipo: b } });
  this.dispatchEvent(a);
}
window.addEventListener("track-event", function (a) {}, !1);
window.addEventListener(
  "logoutallgcontacts",
  function (a) {
    chrome.runtime.sendMessage({ tipo: "logoutallgcontacts" }, function (b) {});
  },
  !1
);
window.addEventListener(
  "salvapersonalia",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "salvapersonalia", id: a.detail.id, data: a.detail.data },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "salvapersonalia",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "salvapersonalia", id: a.detail.id, data: a.detail.data },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "salvaflow",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "salvaflow",
        id: a.detail.id,
        drawflow: a.detail.drawflow,
        msgsalvas: a.detail.msgsalvas,
      },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "limpageral",
  function (a) {
    chrome.runtime.sendMessage({ tipo: "limpageral" }, function (b) {});
  },
  !1
);
window.addEventListener(
  "msg_teste",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "msg_teste",
        id: a.detail.id,
        text: a.detail.text,
        lid: a.detail.lid,
      },
      function (b) {
        b = new CustomEvent("recebe_msg_teste", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "pegapersonalia",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "pegapersonalia", id: a.detail.id },
      function (b) {
        b = new CustomEvent("recebepersonalia", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "flow",
  function (a) {
    chrome.runtime.sendMessage({ tipo: "flow", id: a.detail.id }, function (b) {
      b = new CustomEvent("recebeflow", { detail: { msg: b.resposta } });
      this.dispatchEvent(b);
    });
  },
  !1
);
window.addEventListener(
  "getuserinfo",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "getuserinfo", interactive: a.detail.interactive },
      function (b) {
        b = new CustomEvent("respostauserinfo", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "salvacontato",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "salvacontato", number: a.detail.number, name: a.detail.name },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "addtomytr",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "addtomytr", ids: a.detail.ids },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "transcreve",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "transcreve", b64: a.detail.b64 },
      function (b) {
        b = new CustomEvent("respostatranscreve", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "fazupload",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "fazupload",
        number: a.detail.number,
        filename: a.detail.filename,
        type: a.detail.type,
        file: a.detail.file,
      },
      function (b) {
        b = new CustomEvent("respostaupload", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "criawebhook",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "criawebhook", id: a.detail.id, numero: a.detail.numero },
      function (b) {
        b = new CustomEvent("respostacriawebhook", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "envialinkagrupador",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "envialinkagrupador",
        id: a.detail.id,
        numero: a.detail.numero,
        linkgrupos: a.detail.linkgrupos,
      },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "enviawebhook",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "enviawebhook", url: a.detail.url, body: a.detail.body },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "criaagrupador",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "criaagrupador", id: a.detail.id, numero: a.detail.numero },
      function (b) {
        b = new CustomEvent("respostacriaGL", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "criasmartrsmwh",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "criasmartrsmwh", id: a.detail.id, numero: a.detail.numero },
      function (b) {
        b = new CustomEvent("respostacriaSRWH", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
function grupospublis() {
  var a = chrome.runtime.id;
  0 >= a.indexOf("hhlaibcklk") &&
    0 >= a.indexOf("abebjmbieeeabnc") &&
    0 >= a.indexOf("oglfgkokogbociko") &&
    0 >= a.indexOf("dnkgdlkpbndnjjfdka") &&
    ((a = new CustomEvent("retorna-grupos-publicos", {
      detail: { msg: "grupo-lotado" },
    })),
    this.dispatchEvent(a));
}
grupospublis();
window.addEventListener(
  "getgrouppublic",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "criawebhookpersonal", id: a.detail.id, numero: a.detail.numero },
      function (b) {
        "grupo-lotado" == b.resposta &&
          ((b = new CustomEvent("retorna-grupos-publicos", {
            detail: { msg: "grupo-lotado" },
          })),
          this.dispatchEvent(b));
      }
    );
  },
  !1
);
window.addEventListener(
  "criawebhookpersonal",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "criawebhookpersonal", id: a.detail.id, numero: a.detail.numero },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "salvaparametroswebhookpersonal",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "salvaparametroswebhookpersonal",
        id: a.detail.id,
        numero: a.detail.numero,
        parametros: a.detail.parametros,
      },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "criawebhookpersonal2",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "criawebhookpersonal2",
        id: a.detail.id,
        numero: a.detail.numero,
      },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "salvaparametroswebhookpersonal2",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "salvaparametroswebhookpersonal2",
        id: a.detail.id,
        numero: a.detail.numero,
        parametros: a.detail.parametros,
        msgsalvas: a.detail.msgsalvas,
      },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "deletaagrupador",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "deletaagrupador", id: a.detail.id, numero: a.detail.numero },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "deletawebhook",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "deletawebhook", id: a.detail.id },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "deletawebhookpersonal",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "deletawebhookpersonal", id: a.detail.id },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "deletawebhookpersonal2",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "deletawebhookpersonal2", id: a.detail.id },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "pttext",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "pttext", file: a.detail.file },
      function (b) {
        b = new CustomEvent("textodoptt", { detail: { response: b } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "enviabotao",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "enviabotao",
        number: a.detail.number,
        content: a.detail.content,
        to: a.detail.to,
        buttons: a.detail.buttons,
        filename: a.detail.filename,
        type: a.detail.type,
        file: a.detail.file,
      },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "api-grupos-publicos_old",
  function (a) {
    a = chrome.runtime.id;
    0 >= a.indexOf("hhlaibcklk") &&
      0 >= a.indexOf("abebjmbieeeabnc") &&
      0 >= a.indexOf("oglfgkokogbociko") &&
      0 >= a.indexOf("dnkgdlkpbndnjjfdka") &&
      ((a = new CustomEvent("retorna-grupos-publicos", {
        detail: { msg: "grupo-lotado" },
      })),
      this.dispatchEvent(a));
  },
  !1
);
window.addEventListener(
  "seta-proxy",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "seta-proxy", ip: a.detail.ip },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "pega-proxy",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "pega-proxy", lid: a.detail.lid },
      function (b) {
        b = new CustomEvent("retorna-proxy", {
          detail: {
            meuip: b.ip,
            online: b.online,
            pais: b.pais,
            listaproxy: b.lista,
          },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "voice",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "voice",
        texto: a.detail.texto,
        voz: a.detail.voz,
        time: a.detail.time,
      },
      function (b) {
        b = new CustomEvent("retorna-voice", {
          detail: { msg: b.resposta, time: b.time },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "gli",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "gli", id: a.detail.id, numero: a.detail.numero },
      function (b) {
        b = new CustomEvent("retorna-gli", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "gli2",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "gli2", id: a.detail.id, numero: a.detail.numero },
      function (b) {
        b = new CustomEvent("retorna-gli2", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "api-grupos-publicos",
  function (a) {
    var b = chrome.runtime.id;
    0 >= b.indexOf("hhlaibcklk") &&
      0 >= b.indexOf("abebjmbieeeabnc") &&
      0 >= b.indexOf("oglfgkokogbociko") &&
      0 >= b.indexOf("dnkgdlkpbndnjjfdka") &&
      ((b = new CustomEvent("retorna-grupos-publicos", {
        detail: { msg: "grupo-lotado" },
      })),
      this.dispatchEvent(b));
    chrome.runtime.sendMessage(
      { tipo: "api-grupos-publicos", groupid: a.detail.groupid },
      function (c) {
        c = new CustomEvent("retorna-grupos-publicos", {
          detail: { msg: c.resposta },
        });
        this.dispatchEvent(c);
      }
    );
  },
  !1
);
window.addEventListener(
  "api-grupos-publicos-2",
  function (a) {
    chrome.runtime.sendMessage({ tipo: "getgrouppublic" }, function (b) {
      b = new CustomEvent("retorna-grupos-publicos", {
        detail: { msg: JSON.stringify({ b: b.resposta }) },
      });
      this.dispatchEvent(b);
    });
  },
  !1
);
window.addEventListener(
  "license_ia",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "license", license: a.detail.license },
      function (b) {
        b = new CustomEvent("recebelicense_ia", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "license",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "license", license: a.detail.license },
      function (b) {
        b = new CustomEvent("recebelicense", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "licensesalva",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "license", license: a.detail.license },
      function (b) {
        b = new CustomEvent("recebelicensesalva", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "myipdata",
  function (a) {
    chrome.runtime.sendMessage({ tipo: "myipdata" }, function (b) {
      b = new CustomEvent("recebe-myipdata", { detail: { msg: b.resposta } });
      this.dispatchEvent(b);
    });
  },
  !1
);
window.addEventListener(
  "qrcode-botoes",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "qrcode", number: a.detail.number },
      function (b) {
        b = new CustomEvent("recebe-qr-botoes", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "qrcode-webhook",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "qrcode", number: a.detail.number },
      function (b) {
        b = new CustomEvent("recebeu-qr-webhook", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "remove-dispositivo",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "remove-dispositivo", number: a.detail.number },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "deleta-voz-clonada",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "deleta-voz-clonada", number: a.detail.id, lid: a.detail.lid },
      function (b) {}
    );
  },
  !1
);
window.addEventListener(
  "cria-voz-clonada",
  function (a) {
    chrome.runtime.sendMessage(
      {
        tipo: "cria-voz-clonada",
        number: a.detail.id,
        lid: a.detail.lid,
        name: a.detail.name,
        audios: a.detail.audios,
      },
      function (b) {
        b = new CustomEvent("recebe-voz-clonada", { detail: { response: b } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "add-dispositivo",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "add-dispositivo", number: a.detail.number, lid: a.detail.lid },
      function (b) {
        b = new CustomEvent("recebe-dispositivo", {
          detail: { msg: b.resposta, number: b.numero, online: b.online },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "verifica-dispositivo",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "busca-dispositivo", number: a.detail.number, lid: a.detail.lid },
      function (b) {
        b = new CustomEvent("recebe-verifica-dispositivo", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "qrcode_numeroconectado",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "qrcode_numeroconectado", number: a.detail.number },
      function (b) {
        b = new CustomEvent("recebe_qrcode_numeroconectado", {
          detail: { msg: b.resposta, number: a.detail.number },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "qrcode",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "qrcode", number: a.detail.number },
      function (b) {
        b = new CustomEvent("recebeqr", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "linkpreview",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "linkpreview", link: a.detail.link },
      function (b) {
        b = new CustomEvent("recebelinkpreview", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "get-group-list",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "api-restaga-grupos", msg: a.detail.msg, dir: a.detail.dir },
      function (b) {
        console.log(b);
        b = new CustomEvent("recebe", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "verificawebhookpersonal",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "verificawebhookpersonal", id: a.detail.id },
      function (b) {
        b = new CustomEvent("respostawebhookpersonal", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "verificawebhookpersonal2",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "verificawebhookpersonal2", id: a.detail.id },
      function (b) {
        b = new CustomEvent("respostawebhookpersonal2", {
          detail: { msg: b.resposta },
        });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "verificawebhook",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "verificawebhook", id: a.detail.id },
      function (b) {
        b = new CustomEvent("respostawebhook", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
window.addEventListener(
  "get-group-list-total",
  function (a) {
    chrome.runtime.sendMessage(
      { tipo: "api-resgata-todos-grupos", msg: a.detail.msg },
      function (b) {
        b = new CustomEvent("recebe2", { detail: { msg: b.resposta } });
        this.dispatchEvent(b);
      }
    );
  },
  !1
);
