(() => {
  var e,
    t,
    n,
    a,
    o = {
      7: (e) => {
        "use strict";
        var t,
          n = "object" == typeof Reflect ? Reflect : null,
          a =
            n && "function" == typeof n.apply
              ? n.apply
              : function (e, t, n) {
                  return Function.prototype.apply.call(e, t, n);
                };
        t =
          n && "function" == typeof n.ownKeys
            ? n.ownKeys
            : Object.getOwnPropertySymbols
            ? function (e) {
                return Object.getOwnPropertyNames(e).concat(
                  Object.getOwnPropertySymbols(e)
                );
              }
            : function (e) {
                return Object.getOwnPropertyNames(e);
              };
        var o =
          Number.isNaN ||
          function (e) {
            return e != e;
          };
        function s() {
          s.init.call(this);
        }
        (e.exports = s),
          (e.exports.once = function (e, t) {
            return new Promise(function (n, a) {
              function o(n) {
                e.removeListener(t, s), a(n);
              }
              function s() {
                "function" == typeof e.removeListener &&
                  e.removeListener("error", o),
                  n([].slice.call(arguments));
              }
              W(e, t, s, { once: !0 }),
                "error" !== t &&
                  (function (e, t, n) {
                    "function" == typeof e.on && W(e, "error", t, { once: !0 });
                  })(e, o);
            });
          }),
          (s.EventEmitter = s),
          (s.prototype._events = void 0),
          (s.prototype._eventsCount = 0),
          (s.prototype._maxListeners = void 0);
        var i = 10;
        function r(e) {
          if ("function" != typeof e)
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' +
                typeof e
            );
        }
        function d(e) {
          return void 0 === e._maxListeners
            ? s.defaultMaxListeners
            : e._maxListeners;
        }
        function l(e, t, n, a) {
          var o, s, i, l;
          if (
            (r(n),
            void 0 === (s = e._events)
              ? ((s = e._events = Object.create(null)), (e._eventsCount = 0))
              : (void 0 !== s.newListener &&
                  (e.emit("newListener", t, n.listener ? n.listener : n),
                  (s = e._events)),
                (i = s[t])),
            void 0 === i)
          )
            (i = s[t] = n), ++e._eventsCount;
          else if (
            ("function" == typeof i
              ? (i = s[t] = a ? [n, i] : [i, n])
              : a
              ? i.unshift(n)
              : i.push(n),
            (o = d(e)) > 0 && i.length > o && !i.warned)
          ) {
            i.warned = !0;
            var c = new Error(
              "Possible EventEmitter memory leak detected. " +
                i.length +
                " " +
                String(t) +
                " listeners added. Use emitter.setMaxListeners() to increase limit"
            );
            (c.name = "MaxListenersExceededWarning"),
              (c.emitter = e),
              (c.type = t),
              (c.count = i.length),
              (l = c),
              console && console.warn && console.warn(l);
          }
          return e;
        }
        function c() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              0 === arguments.length
                ? this.listener.call(this.target)
                : this.listener.apply(this.target, arguments)
            );
        }
        function u(e, t, n) {
          var a = {
              fired: !1,
              wrapFn: void 0,
              target: e,
              type: t,
              listener: n,
            },
            o = c.bind(a);
          return (o.listener = n), (a.wrapFn = o), o;
        }
        function p(e, t, n) {
          var a = e._events;
          if (void 0 === a) return [];
          var o = a[t];
          return void 0 === o
            ? []
            : "function" == typeof o
            ? n
              ? [o.listener || o]
              : [o]
            : n
            ? (function (e) {
                for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                  t[n] = e[n].listener || e[n];
                return t;
              })(o)
            : m(o, o.length);
        }
        function g(e) {
          var t = this._events;
          if (void 0 !== t) {
            var n = t[e];
            if ("function" == typeof n) return 1;
            if (void 0 !== n) return n.length;
          }
          return 0;
        }
        function m(e, t) {
          for (var n = new Array(t), a = 0; a < t; ++a) n[a] = e[a];
          return n;
        }
        function W(e, t, n, a) {
          if ("function" == typeof e.on) a.once ? e.once(t, n) : e.on(t, n);
          else {
            if ("function" != typeof e.addEventListener)
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' +
                  typeof e
              );
            e.addEventListener(t, function o(s) {
              a.once && e.removeEventListener(t, o), n(s);
            });
          }
        }
        Object.defineProperty(s, "defaultMaxListeners", {
          enumerable: !0,
          get: function () {
            return i;
          },
          set: function (e) {
            if ("number" != typeof e || e < 0 || o(e))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            i = e;
          },
        }),
          (s.init = function () {
            (void 0 !== this._events &&
              this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (s.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || o(e))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            return (this._maxListeners = e), this;
          }),
          (s.prototype.getMaxListeners = function () {
            return d(this);
          }),
          (s.prototype.emit = function (e) {
            for (var t = [], n = 1; n < arguments.length; n++)
              t.push(arguments[n]);
            var o = "error" === e,
              s = this._events;
            if (void 0 !== s) o = o && void 0 === s.error;
            else if (!o) return !1;
            if (o) {
              var i;
              if ((t.length > 0 && (i = t[0]), i instanceof Error)) throw i;
              var r = new Error(
                "Unhandled error." + (i ? " (" + i.message + ")" : "")
              );
              throw ((r.context = i), r);
            }
            var d = s[e];
            if (void 0 === d) return !1;
            if ("function" == typeof d) a(d, this, t);
            else {
              var l = d.length,
                c = m(d, l);
              for (n = 0; n < l; ++n) a(c[n], this, t);
            }
            return !0;
          }),
          (s.prototype.addListener = function (e, t) {
            return l(this, e, t, !1);
          }),
          (s.prototype.on = s.prototype.addListener),
          (s.prototype.prependListener = function (e, t) {
            return l(this, e, t, !0);
          }),
          (s.prototype.once = function (e, t) {
            return r(t), this.on(e, u(this, e, t)), this;
          }),
          (s.prototype.prependOnceListener = function (e, t) {
            return r(t), this.prependListener(e, u(this, e, t)), this;
          }),
          (s.prototype.removeListener = function (e, t) {
            var n, a, o, s, i;
            if ((r(t), void 0 === (a = this._events))) return this;
            if (void 0 === (n = a[e])) return this;
            if (n === t || n.listener === t)
              0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : (delete a[e],
                  a.removeListener &&
                    this.emit("removeListener", e, n.listener || t));
            else if ("function" != typeof n) {
              for (o = -1, s = n.length - 1; s >= 0; s--)
                if (n[s] === t || n[s].listener === t) {
                  (i = n[s].listener), (o = s);
                  break;
                }
              if (o < 0) return this;
              0 === o
                ? n.shift()
                : (function (e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop();
                  })(n, o),
                1 === n.length && (a[e] = n[0]),
                void 0 !== a.removeListener &&
                  this.emit("removeListener", e, i || t);
            }
            return this;
          }),
          (s.prototype.off = s.prototype.removeListener),
          (s.prototype.removeAllListeners = function (e) {
            var t, n, a;
            if (void 0 === (n = this._events)) return this;
            if (void 0 === n.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = Object.create(null)),
                    (this._eventsCount = 0))
                  : void 0 !== n[e] &&
                    (0 == --this._eventsCount
                      ? (this._events = Object.create(null))
                      : delete n[e]),
                this
              );
            if (0 === arguments.length) {
              var o,
                s = Object.keys(n);
              for (a = 0; a < s.length; ++a)
                "removeListener" !== (o = s[a]) && this.removeAllListeners(o);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ("function" == typeof (t = n[e])) this.removeListener(e, t);
            else if (void 0 !== t)
              for (a = t.length - 1; a >= 0; a--) this.removeListener(e, t[a]);
            return this;
          }),
          (s.prototype.listeners = function (e) {
            return p(this, e, !0);
          }),
          (s.prototype.rawListeners = function (e) {
            return p(this, e, !1);
          }),
          (s.listenerCount = function (e, t) {
            return "function" == typeof e.listenerCount
              ? e.listenerCount(t)
              : g.call(e, t);
          }),
          (s.prototype.listenerCount = g),
          (s.prototype.eventNames = function () {
            return this._eventsCount > 0 ? t(this._events) : [];
          });
      },
      759: (e, t, n) => {
        "use strict";
        const a = n(276);
        e.exports = (e) => {
          if (!a(e)) return !1;
          const t = e.trim().match(a.regex),
            n = {};
          if (t[1]) {
            n.mediaType = t[1].toLowerCase();
            const e = t[1].split(";").map((e) => e.toLowerCase());
            (n.contentType = e[0]),
              e.slice(1).forEach((e) => {
                const t = e.split("=");
                n[t[0]] = t[1];
              });
          }
          return (
            (n.base64 = !!t[t.length - 2]),
            (n.data = t[t.length - 1] || ""),
            (n.toBuffer = () => {
              const e = n.base64 ? "base64" : "utf8";
              return Buffer.from(
                n.base64 ? n.data : decodeURIComponent(n.data),
                e
              );
            }),
            n
          );
        };
      },
      276: function (e, t) {
        var n, a;
        void 0 ===
          (a =
            "function" ==
            typeof (n = function () {
              "use strict";
              function e(t) {
                return e.regex.test((t || "").trim());
              }
              return (
                (e.regex =
                  /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i),
                e
              );
            })
              ? n.apply(t, [])
              : n) || (e.exports = a);
      },
      812: (e, t, n) => {
        "use strict";
        n.d(t, { Y: () => r, k: () => i });
        var a = n(658);
        const o = (0, a.WhatsUpLoad)("WAWebWidFactory"),
          s = (0, a.WhatsUpLoad)("WAWebGetProfilePicJob");
        function i(e) {
          return o.createUserWid(e);
        }
        function r(e, t) {
          return s.getProfilePic(e, t);
        }
      },
      974: (e, t, n) => {
        "use strict";
        n.d(t, { q: () => s });
        var a = n(658);
        const o = (0, a.WhatsUpLoad)("WAWebMsgCollection")?.MsgCollection;
        function s(e) {
          return o.get(e);
        }
      },
      772: (e, t, n) => {
        "use strict";
        n.d(t, { Gw: () => r, Jt: () => s, TE: () => i, w5: () => o });
        const a = (0, n(658).WhatsUpLoad)("WAWebChatCollection");
        function o() {
          return a.ChatCollection._models;
        }
        function s(e) {
          return a.ChatCollection.get(e);
        }
        function i() {
          return a.ChatCollection;
        }
        function r() {
          return a.ChatCollection;
        }
      },
      191: (e, t, n) => {
        "use strict";
        n.d(t, { O6: () => g, t5: () => W });
        var a = n(658),
          o = n(509),
          s = n(974),
          i = n(772),
          r = n(812),
          d = n(242);
        const l = (0, a.WhatsUpLoad)("WAWebUserPrefsMeUser"),
          c = (0, a.WhatsUpLoad)("WAWebMsgKey"),
          u = (0, a.WhatsUpLoad)("WAWebWidFactory"),
          p = (0, a.WhatsUpLoad)("WAWebMsgKeyNewId");
        async function g(e) {
          const t = l.getMaybeMeUser();
          let n, a;
          return (
            (n = e.id),
            n.isGroup && (a = u.toUserWid(t)),
            new c({
              from: t,
              to: n,
              id: await Promise.resolve(p.getMsgKeyNewSHA256Id()),
              participant: a,
              selfDir: "out",
            })
          );
        }
        (0, a.WhatsUpLoad)("WAWebGetEphemeralFieldsMsgActionsUtils"),
          (0, a.WhatsUpLoad)("WATimeUtils"),
          (0, a.WhatsUpLoad)("useWAWebLinkPreview"),
          (0, a.WhatsUpLoad)("WAWebLinkPreviewChatAction"),
          (0, a.WhatsUpLoad)("WAWebLinkPreviewCache"),
          (0, a.WhatsUpLoad)("WAWebBackendJobsCommon").mediaTypeFromProtobuf;
        const m = (0, a.WhatsUpLoad)("WAWebMediaOpaqueData").createFromData;
        async function W(e, t, n = {}) {
          let l = "status@broadcast" === e ? (0, d.Y)() : (0, i.Gw)().get(e);
          l ||
            ((0, i.Gw)().add(
              { id: new r.k(e, { intentionallyUsePrivateConstructor: !0 }) },
              { merge: !0, add: !0 }
            ),
            (l = (0, i.Gw)().get(e)));
          const c = await (0, a.convertToFile)(t, n.mimetype, n.filename),
            u = (c.name, await m(c, c.type)),
            p = {
              isPtt: n.isPtt,
              asDocument: n.asDocument,
              asGif: n.asGif,
              isAudio: "audio" === n.type,
              asSticker: n.asSticker,
              precomputedFields: { duration: null, waveform: null },
            };
          let g;
          "audio" === n.type
            ? ((p.isPtt = n.isPtt),
              (p.precomputedFields = await (async function (e, t) {
                if (e.isPtt)
                  try {
                    const e = await t.arrayBuffer(),
                      n = new AudioContext(),
                      a = await n.decodeAudioData(e),
                      o = a.getChannelData(0),
                      s = 64,
                      i = Math.floor(o.length / s),
                      r = [];
                    for (let e = 0; e < s; e++) {
                      const t = i * e;
                      let n = 0;
                      for (let e = 0; e < i; e++) n += Math.abs(o[t + e]);
                      r.push(n / i);
                    }
                    const d = Math.pow(Math.max(...r), -1),
                      l = r.map((e) => e * d),
                      c = new Uint8Array(l.map((e) => Math.floor(100 * e)));
                    return { duration: Math.floor(a.duration), waveform: c };
                  } catch (e) {}
              })(n, c)))
            : "image" === n.type
            ? (g = n.isViewOnce)
            : "video" === n.type
            ? (p.asGif = n.isGif)
            : "document" === n.type
            ? (p.asDocument = !0)
            : "sticker" === n.type && (p.asSticker = !0);
          const W = (0, a.WhatsUpLoad)("WAWebMedia").prepRawMedia(u, p);
          let b = {};
          if (
            (n.markIsRead &&
              (await (0, a.WhatsUpLoad)("WAWebUpdateUnreadChatAction").sendSeen(
                l,
                !1
              )),
            await W.waitForPrep(),
            n.wulp)
          ) {
            let e = (
              await (0, a.WhatsUpLoad)(
                "WAWebGenMinimalLinkPreviewChatAction"
              ).genMinimalLinkPreview2(n.wulp)
            ).data;
            b.ctwaContext = {
              description: e.description,
              title: e.title,
              sourceUrl: e.canonicalUrl,
              thumbnailUrl: "data:image/jpeg;base64," + e.thumbnail,
              renderLargerThumbnail: !0,
              mediaType: 1,
              thumbnail: e.thumbnail,
            };
          }
          if (l.isGroup && n.tagall) {
            var f = (0, o.r)(l.id).participants.map((e) => e.id);
            const e = await (0, a.verificaArrayLid)(f);
            b.mentionedJidList = e.result;
          }
          if (n.buttons) {
            (b.nativeFlowName = "quick_reply"),
              (b.interactiveHeader = {
                title: n.title ? n.title : " ",
                subtitle: n.subtitle ? n.subtitle : " ",
                mediaType: n.type.toUpperCase(),
                thumbnail: void 0,
              });
            let e = n.buttons.map((e, t) =>
              e.startsWith("http://") || e.startsWith("https://")
                ? {
                    $$unknownFieldCount: 0,
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                      display_text:
                        e.split("|").length > 1
                          ? e.split("|")[1]
                          : "Acesse já!",
                      url: e.split("|").length > 1 ? e.split("|")[0] : e,
                      merchant_url:
                        e.split("|").length > 1 ? e.split("|")[0] : e,
                    }),
                  }
                : {
                    $$unknownFieldCount: 0,
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: e,
                      id: `MYID${t}`,
                    }),
                  }
            );
            (b.interactivePayload = {
              messageVersion: 1,
              $$unknownFieldCount: 0,
              buttons: e,
            }),
              (b.interactiveType = "native_flow"),
              (b.kind = "interactive"),
              (b.type = "interactive"),
              (b.caption = n.caption);
          }
          if (
            (n.quotedMsg && (b.quotedMsg = await (0, s.q)(n.quotedMsg)),
            "status@broadcast" == e)
          )
            return {
              result: await (0, a.WhatsUpLoad)(
                "WAWebWhatsUpPlusStatusMedia"
              ).sendMediaMsgToChat(W, l, {
                addEvenWhilePreparing: !1,
                caption: n.caption,
                type: n.type,
                backgroundColor:
                  null != n.backgroundColor ? n.backgroundColor : null,
              }),
            };
          {
            if (
              ("image" === n.type || "video" === n.type) &&
              n.caption &&
              "" !== n.caption
            ) {
              let e = localStorage.getItem("contatos_traduzir"),
                t = JSON.parse(e || '[{"error":"error"}]').filter(function (e) {
                  return e.id == l.id._serialized;
                }),
                o = localStorage.getItem("meu_nome")
                  ? `*${localStorage.getItem("meu_nome")}:*\n\n`
                  : "";
              if (t[0]) {
                let e = {};
                (e.text = n.caption), (e.target = t[0].target);
                let s = await (0, a.fetchTrans)(e);
                n.caption = "" !== o ? o + s.result : s.result;
              } else "" !== o && (n.caption = o + n.caption);
            }
            const e = await (0, a.WhatsUpLoad)(
              "WAWebMediaPrep"
            ).sendMediaMsgToChat(W, l, {
              addEvenWhilePreparing: !1,
              caption: n.caption,
              type: n.buttons ? "interactive" : n.type,
              ...b,
            });
            return n.waitForAck && (await e), { sendMsgResult: e };
          }
        }
      },
      705: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            PanelChat: () => ye,
            abrirChat: () => l,
            archiveChat: () => pe,
            chat: () => a.TE,
            chat_: () => a.Gw,
            createUser: () => r.k,
            deleteChat: () => me,
            disableFilter: () => ve,
            disableUnreadChatsOnTop: () => he,
            downMedia: () => S,
            enableUnreadChatsOnTop: () => fe,
            entraKnal: () => A,
            enviaPix: () => We,
            filtraChat: () => Ae,
            get: () => a.Jt,
            getActive: () => i,
            getChatRealName: () => b,
            getFilterState: () => we,
            getMsg: () => M.q,
            getName: () => m,
            getNameStatus: () => g,
            getProfilePic: () => r.Y,
            getRealName: () => W,
            listaTodosChats: () => a.w5,
            pinChat: () => de,
            revokeMsg: () => ce,
            sendCall: () => oe,
            sendReact: () => ie,
            sfm: () => _.t5,
            spm: () => Q,
            state: () => q,
            stm: () => J,
            svm: () => L,
            unMuteKnal: () => v,
          });
        var a = n(772),
          o = n(658);
        const s = (0, o.WhatsUpLoad)("WAWebChatCollection");
        function i() {
          return s.ChatCollection.getActive();
        }
        var r = n(812);
        const d = (0, o.WhatsUpLoad)("WAWebCmd");
        function l(e) {
          return d.Cmd.openChatBottom(e);
        }
        var c = n(452);
        const u = (0, o.WhatsUpLoad)("WAWebContactCollection"),
          p = (0, o.WhatsUpLoad)("WAWebChatCollection");
        function g(e) {
          let t = u.ContactCollection.get(e);
          return t
            ? t.pushname ||
                t.name ||
                t.verifiedName ||
                (0, a.Jt)(e)?.formattedTitle ||
                (0, c.q)(t.id?.user || e)
            : (0, a.Jt)(e)?.formattedTitle || (0, c.q)(e) || e;
        }
        function m(e) {
          let t = u.ContactCollection.get(e);
          return t
            ? t.name || (0, c.q)(t.id.user)
            : (0, a.Jt)(e)?.formattedTitle || (0, c.q)(e) || e;
        }
        function W(e) {
          let t = u.ContactCollection.get(e);
          return t
            ? t.pushname || t.verifiedName || (0, c.q)(t.id.user)
            : (0, a.Jt)(e)?.formattedTitle || (0, c.q)(e) || e;
        }
        function b(e) {
          let t = p.ChatCollection.get(e);
          return t
            ? t.pushname || t.verifiedName || (0, c.q)(t.id.user)
            : (0, a.Jt)(e)?.formattedTitle || (0, c.q)(e) || e;
        }
        const f = (0, o.WhatsUpLoad)(
            "WAWebLoadNewsletterPreviewChatAction"
          )?.loadNewsletterPreviewChat,
          h = (0, o.WhatsUpLoad)(
            "WAWebMexJoinNewsletterJob"
          )?.mexJoinNewsletter,
          y = (0, o.WhatsUpLoad)(
            "WAWebNewsletterToggleMuteStateAction"
          )?.unmuteNewsletterAction;
        function A(e, t = !0) {
          f(e).then(async (e) => {
            await h(e.id._serialized), t && y(e.id, { eventSurface: 5 });
          });
        }
        function v(e) {
          f(e).then(async (e) => {
            y(e.id, { eventSurface: 5 });
          });
        }
        const w = (0, o.WhatsUpLoad)("WAWebDownloadManager")?.downloadManager;
        async function S(e) {
          return await w.downloadAndMaybeDecrypt(e);
        }
        var M = n(974),
          _ = n(191);
        n(349);
        const x = (0, o.WhatsUpLoad)("WAWebFrontendVcardUtils"),
          C = (0, o.WhatsUpLoad)("WAWebUserPrefsMeUser"),
          T =
            ((0, o.WhatsUpLoad)("WAWebMsgKeyNewId"),
            (0, o.WhatsUpLoad)("WAWebSendMsgChatAction"));
        async function L(e, t) {
          let n = (0, a.Gw)().get(e);
          n ||
            ((0, a.Gw)().add(
              { id: new r.k(e, { intentionallyUsePrivateConstructor: !0 }) },
              { merge: !0, add: !0 }
            ),
            (n = (0, a.Gw)().get(e)));
          var o = await Promise.all(
              t.map(async (e) => {
                let t = (0, a.Gw)().get(e);
                return (
                  t ||
                    ((0, a.Gw)().add(
                      {
                        id: new r.k(e, {
                          intentionallyUsePrivateConstructor: !0,
                        }),
                      },
                      { merge: !0, add: !0 }
                    ),
                    (t = (0, a.Gw)().get(e))),
                  t
                );
              })
            ),
            s = await Promise.all(o),
            i = new Array();
          for (var d in s) "object" == typeof s[d] && i.push(s[d].contact);
          var l = i.map(async (e) => {
              if ("object" == typeof e) return await x.vcardFromContactModel(e);
            }),
            c = await Promise.resolve(await (0, _.O6)(n));
          const u = await C.getMaybeMeUser();
          var p = await Promise.all(l);
          const g = {
            id: c,
            ack: 0,
            from: u,
            local: !0,
            self: "in",
            t: parseInt(new Date().getTime() / 1e3),
            to: n.id,
            ...(i.length > 1 ? { type: "multi_vcard" } : { type: "vcard" }),
            ...(i.length > 1 ? { vcardList: p } : { body: p[0].vcard }),
            isNewMsg: !0,
          };
          await T.addAndSendMsgToChat(n, g);
        }
        var P = n(509);
        (0, o.WhatsUpLoad)("useWAWebLinkPreview"),
          (0, o.WhatsUpLoad)("WAWebLinkPreviewChatAction");
        const U = (0, o.WhatsUpLoad)("WAWebMediaUploadMmsThumbnail"),
          E = (0, o.WhatsUpLoad)("WAWebGenMinimalLinkPreviewChatAction"),
          R = E.genMinimalLinkPreview;
        E.genMinimalLinkPreview2 = E.genMinimalLinkPreview;
        const k = E.genMinimalLinkPreview2,
          I = (0, o.WhatsUpLoad)("WAWebMediaOpaqueData"),
          O = (0, o.WhatsUpLoad)("WABase64"),
          D = (0, o.WhatsUpLoad)("WATimeUtils"),
          G = 200;
        var F = [];
        async function B(e) {
          const t = new TextDecoder(),
            n =
              "https://wup.plus/prev.png?get=" +
              btoa(unescape(encodeURIComponent(e))).replace("/", "_"),
            a = await (0, o.fdp)(n)
              .then((e) => t.decode(e))
              .then((e) => JSON.parse(e))
              .catch((e) => console.log(e)),
            s = /^video/.test(a.mediaType);
          return {
            title: a.title,
            description: a.description,
            canonicalUrl: a.url,
            matchedText: e,
            richPreviewType: s ? 1 : 0,
            doNotPlayInline: !s,
            imageUrl: a.image,
          };
        }
        async function N(e) {
          try {
            const t = await (0, o.downloadImage)(e).catch((e) =>
              console.log(e)
            );
            if (!t) return null;
            const n = await (function (e) {
                return new Promise((t, n) => {
                  const a = new Image();
                  (a.crossOrigin = "anonymous"),
                    (a.src = e),
                    (a.onerror = n),
                    (a.onload = () => {
                      try {
                        const e = document.createElement("canvas"),
                          n = e.getContext("2d");
                        (e.width = G), (e.height = G);
                        const o = Math.min(a.width, a.height),
                          s = (a.width - o) / 2,
                          i = (a.height - o) / 2;
                        n.drawImage(a, s, i, o, o, 0, 0, G, G),
                          t(
                            e
                              .toDataURL("image/jpeg")
                              .replace(/^data:image\/jpeg;base64,/, "")
                          );
                      } catch (e) {
                        n();
                      }
                    });
                });
              })(t.data),
              a = t.data.replace("data:image/jpeg;base64,", ""),
              s = await I.createFromBase64Jpeg(a),
              i = new Uint8Array(32),
              r =
                (window.crypto.getRandomValues(i),
                { key: O.encodeB64(i), timestamp: D.unixTime() }),
              d = new AbortController(),
              l = await U({
                thumbnail: s,
                mediaType: "thumbnail-link",
                mediaKeyInfo: r,
                uploadOrigin: 1,
                forwardedFromWeb: !1,
                signal: d.signal,
                timeout: 3e3,
                isViewOnce: !1,
              }),
              c = l.mediaEntry;
            return {
              thumbnail: n,
              thumbnailHQ: a,
              mediaKey: c.mediaKey,
              mediaKeyTimestamp: c.mediaKeyTimestamp,
              thumbnailDirectPath: c.directPath,
              thumbnailSha256: l.filehash,
              thumbnailEncSha256: c.encFilehash,
              thumbnailWidth: t.width,
              thumbnailHeight: t.height,
            };
          } catch (e) {
            console.log(e);
          }
        }
        (E.genMinimalLinkPreview2 = (0, o.wrapf)(k, (e, ...t) => {
          const [n] = t,
            a =
              "string" == typeof n
                ? (0, o.WhatsUpLoad)("useWAWebLinkPreview").findFirstWebLink(n)
                    .url
                : n.url,
            s = F.find((e) => e.url == a);
          return new Promise(async (n) => {
            try {
              if (s) n(s);
              else {
                const e = await B(a);
                if (!e) throw new Error(`preview not found for ${a}`);
                const { imageUrl: t, ...o } = e;
                let s = {};
                t &&
                  (s = await N(t).catch((e) => {
                    console.log(e);
                  }));
                const i = { url: a, data: { ...o, ...s } };
                F.push(i), n(i);
              }
            } catch (a) {
              console.log(a), n(e(...t));
            }
          });
        })),
          (E.genMinimalLinkPreview = (0, o.wrapf)(R, (e, ...t) => {
            const [n] = t,
              a =
                "string" == typeof n
                  ? (0, o.WhatsUpLoad)("useWAWebLinkPreview").findFirstWebLink(
                      n
                    ).url
                  : n.url,
              s = F.find((e) => e.url == a);
            return new Promise(async (n) => {
              try {
                if ("true" == localStorage.getItem("linkpreviwhqenabled"))
                  if (s) n(s);
                  else {
                    const e = await B(a);
                    if (!e) throw new Error(`preview not found for ${a}`);
                    const { imageUrl: t, ...o } = e;
                    let s = {};
                    t &&
                      (s = await N(t).catch((e) => {
                        console.log(e);
                      }));
                    const i = { url: a, data: { ...o, ...s } };
                    F.push(i), n(i);
                  }
                else n(e(...t));
              } catch (a) {
                console.log(a), n(e(...t));
              }
            });
          }));
        let $ = (0, o.WhatsUpLoad)(
            "WAWebSendTextMsgChatAction"
          )?.sendTextMsgToChat,
          z = (0, o.WhatsUpLoad)(
            "WAWebSendTextMsgChatAction"
          )?.addAndSendTextMsg,
          H = (0, o.WhatsUpLoad)(
            "WAWebSendTextMsgChatAction"
          )?.createTextMsgData;
        async function J(e, t, n) {
          if (!t || " " == t) return;
          let s = (0, a.Gw)().get(e);
          s ||
            ((0, a.Gw)().add(
              { id: new r.k(e, { intentionallyUsePrivateConstructor: !0 }) },
              { merge: !0, add: !0 }
            ),
            (s = (0, a.Gw)().get(e)));
          let i = {};
          if ((!1 === t.includes("http") && !n?.wulp) || 0 == n?.lp) {
            if (s.isGroup && n?.tagall) {
              var d = (0, P.r)(s.id).participants.map((e) => e.id);
              const e = await (0, o.verificaArrayLid)(d);
              i.mentionedJidList = e.result;
            } else if (s.isGroup) {
              const e = t.match(/(?<=@)(\d+)\b/g) || [];
              let n = [];
              if (e.length > 0) {
                const t = (0, P.r)(s.id);
                for (const a of e) {
                  const e = `${a}@c.us`,
                    o = t.participants.filter((t) => t.id._serialized == e);
                  1 == o.length && n.push(o[0].id);
                }
              }
              n.length > 0 && (i.mentionedJidList = n);
            }
            if (
              (n?.quotedMsg &&
                (i = { quotedMsg: await (0, M.q)(n?.quotedMsg) }),
              n?.buttons)
            ) {
              let e = await H(s, t, i);
              (e.nativeFlowName = "quick_reply"),
                (e.interactiveHeader = {
                  title: " ",
                  subtitle: " ",
                  hasMediaAttachment: !1,
                }),
                (e.interactiveHeader = {
                  title: n.title ? n.title : " ",
                  subtitle: n.subtitle ? n.subtitle : " ",
                  hasMediaAttachment: !1,
                });
              let a = n.buttons.map((e, t) =>
                e.startsWith("http://") || e.startsWith("https://")
                  ? {
                      $$unknownFieldCount: 0,
                      name: "cta_url",
                      buttonParamsJson: JSON.stringify({
                        display_text:
                          e.split("|").length > 1
                            ? e.split("|")[1]
                            : "Acesse já!",
                        url: e.split("|").length > 1 ? e.split("|")[0] : e,
                        merchant_url:
                          e.split("|").length > 1 ? e.split("|")[0] : e,
                      }),
                    }
                  : {
                      $$unknownFieldCount: 0,
                      name: "quick_reply",
                      buttonParamsJson: JSON.stringify({
                        display_text: e,
                        id: `MYID${t}`,
                      }),
                    }
              );
              return (
                (e.interactivePayload = {
                  messageVersion: 1,
                  $$unknownFieldCount: 0,
                  buttons: a,
                }),
                (e.interactiveType = "native_flow"),
                (e.kind = "interactive"),
                (e.type = "interactive"),
                (e.caption = t),
                await z(s, e)
              );
            }
            return await $(s, t, i);
          }
          if (s.isGroup && n?.tagall) {
            d = (0, P.r)(s.id).participants.map((e) => e.id);
            const e = await (0, o.verificaArrayLid)(d);
            i.mentionedJidList = e.result;
          } else if (s.isGroup) {
            const e = t.match(/(?<=@)(\d+)\b/g) || [];
            let n = [];
            if (e.length > 0) {
              const t = (0, P.r)(s.id);
              for (const a of e) {
                const e = `${a}@c.us`,
                  o = t.participants.filter((t) => t.id._serialized == e);
                1 == o.length && n.push(o[0].id);
              }
            }
            n.length > 0 && (i.mentionedJidList = n);
          }
          if (n?.quotedMsg) {
            let e = await (0, M.q)(n?.quotedMsg);
            i = { ...i, quotedMsg: e };
          }
          if (n?.lp || (!n?.lp && !n?.wulp)) {
            let e = await (0, o.WhatsUpLoad)(
              "WAWebGenMinimalLinkPreviewChatAction"
            ).genMinimalLinkPreview(t);
            e && (i.linkPreview = e.data);
          } else if (n?.wulp) {
            let e = await (0, o.WhatsUpLoad)(
              "WAWebGenMinimalLinkPreviewChatAction"
            ).genMinimalLinkPreview2(n.wulp);
            i.ctwaContext = {
              description: e.data.description,
              title: e.data.title,
              sourceUrl: e.data.canonicalUrl,
              thumbnailUrl: "data:image/jpeg;base64," + e.data.thumbnail,
              renderLargerThumbnail: !0,
              mediaType: 1,
              thumbnail: e.data.thumbnail,
            };
          }
          if (n?.buttons) {
            let e = await H(s, t, i);
            (e.nativeFlowName = "quick_reply"),
              (e.interactiveHeader = {
                title: n.title ? n.title : " ",
                subtitle: n.subtitle ? n.subtitle : " ",
                hasMediaAttachment: !1,
              });
            let a = n.buttons.map((e, t) =>
              e.startsWith("http://") || e.startsWith("https://")
                ? {
                    $$unknownFieldCount: 0,
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                      display_text:
                        e.split("|").length > 1
                          ? e.split("|")[1]
                          : "Acesse já!",
                      url: e.split("|").length > 1 ? e.split("|")[0] : e,
                      merchant_url:
                        e.split("|").length > 1 ? e.split("|")[0] : e,
                    }),
                  }
                : {
                    $$unknownFieldCount: 0,
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: e,
                      id: `MYID${t}`,
                    }),
                  }
            );
            return (
              (e.interactivePayload = {
                messageVersion: 1,
                $$unknownFieldCount: 0,
                buttons: a,
              }),
              (e.interactiveType = "native_flow"),
              (e.kind = "interactive"),
              (e.type = "interactive"),
              (e.caption = t),
              await z(s, e)
            );
          }
          return await $(s, t, i);
        }
        (0, o.WhatsUpLoad)("useWAWebLinkPreview"),
          (0, o.WhatsUpLoad)("WAWebLinkPreviewChatAction"),
          (0, o.WhatsUpLoad)("WAWebLinkPreviewCache");
        let K = (0, o.WhatsUpLoad)("WAWebChatStateBridge");
        async function q(e, t) {
          switch (e) {
            case 0:
              await K.sendChatStateComposing(t);
              break;
            case 1:
              await K.sendChatStateRecording(t);
              break;
            case 2:
              await K.sendChatStatePaused(t);
              break;
            default:
              return !1;
          }
          return !0;
        }
        const j = (0, o.WhatsUpLoad)("WAWebSendMsgChatAction"),
          V = (0, o.WhatsUpLoad)(
            "WAWebPollsActionsMetricUtils"
          )?.commitPollsActionsMetric,
          Y = (0, o.WhatsUpLoad)(
            "WAWebPollsSendPollCreationMsgAction"
          )?.createPollCreationMsgData;
        async function Q(e, t, n, s = !1) {
          let i = [];
          n.map((e) => i.push({ name: e }));
          let d = (0, a.Gw)().get(e);
          d ||
            ((0, a.Gw)().add(
              { id: new r.k(e, { intentionallyUsePrivateConstructor: !0 }) },
              { merge: !0, add: !0 }
            ),
            (d = (0, a.Gw)().get(e)));
          let l = await Y({
            poll: { name: t, options: i, selectableOptionsCount: 1 },
            chat: d,
          });
          if (d.isGroup && s) {
            var c = (await (0, P.r)(e)).participants.map((e) => e.id);
            const t = await (0, o.verificaArrayLid)(c);
            l.mentionedJidList = t.result;
          }
          const [u] = await Promise.all(j.addAndSendMsgToChat(d, l));
          V({
            action: 2,
            chat: d,
            creationDateInSeconds: u.t,
            pollOptionsCount: i.length,
          });
        }
        var X = n(707);
        const Z = (0, o.WhatsUpLoad)("WAWebCallCollection"),
          ee = (0, o.WhatsUpLoad)("WAWebDBDeviceListFanout")?.getFanOutList,
          te = (0, o.WhatsUpLoad)(
            "WAWebEncryptMsgProtobuf"
          )?.encryptMsgProtobuf,
          ne = (0, o.WhatsUpLoad)("WAWebUserPrefsMeUser")?.assertGetMe;
        async function ae(e) {
          const t = ["ACTIVE", "OUTGOING_CALLING", "OUTGOING_RING"];
          let n;
          (n = e
            ? Z.get(e)
            : Z.findFirst((e) => t.includes(e.getState()) || e.isGroup)),
            n.peerJid.isGroupCall() ||
              (await (0, o.WhatsUpLoad)(
                "WAWebManageE2ESessionsJob"
              ).ensureE2ESessions([n.peerJid]));
          const a = (0, o.WhatsUpLoad)("WASmaxJsx").smax(
            "call",
            {
              to: n.peerJid.toString({ legacy: !0 }),
              id: (0, o.WhatsUpLoad)("WAWap").generateId(),
            },
            [
              (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                "terminate",
                {
                  "call-id": n.id,
                  "call-creator": n.peerJid.toString({ legacy: !0 }),
                },
                null
              ),
            ]
          );
          return await (0, o.WhatsUpLoad)("WAComms").sendSmaxStanza(a), !0;
        }
        async function oe(e, t) {
          t = Object.assign({ isVideo: !1 }, t);
          const n = (0, X.Pq)(e),
            a = (0, o.WhatsUpLoad)("WARandomHex").randomHex(16).substr(0, 64),
            s = ne(),
            i = [
              (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                "audio",
                { enc: "opus", rate: "16000" },
                null
              ),
              (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                "audio",
                { enc: "opus", rate: "8000" },
                null
              ),
            ];
          t.isVideo &&
            i.push(
              (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                "video",
                {
                  orientation: "0",
                  screen_width: "1920",
                  screen_height: "1080",
                  device_orientation: "0",
                  enc: "vp8",
                  dec: "vp8",
                },
                null
              )
            ),
            i.push(
              (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                "net",
                { medium: "3" },
                null
              ),
              (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                "capability",
                { ver: "1" },
                new Uint8Array([1, 4, 255, 131, 207, 4])
              ),
              (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                "encopt",
                { keygen: "2" },
                null
              )
            );
          const r = self.crypto.getRandomValues(new Uint8Array(32)).buffer;
          i.push(
            ...(await (async function (e, t) {
              const n = await ee({ wids: e });
              await (0, o.WhatsUpLoad)(
                "WAWebManageE2ESessionsJob"
              ).ensureE2ESessions(n);
              let a = !1;
              const s = await Promise.all(
                  n.map(async (e) => {
                    const { type: n, ciphertext: s } = await te(e, 0, {
                      call: { callKey: new Uint8Array(t) },
                    });
                    return (
                      (a = a || "pkmsg" === n),
                      (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                        "to",
                        { jid: e.toString({ legacy: !0 }) },
                        [
                          (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                            "enc",
                            { v: "2", type: n, count: "0" },
                            s
                          ),
                        ]
                      )
                    );
                  })
                ),
                i = [];
              if (
                (i.push(
                  (0, o.WhatsUpLoad)("WASmaxJsx").smax("destination", {}, s)
                ),
                a)
              ) {
                const e = await (0, o.WhatsUpLoad)(
                  "WAWebAdvSignatureApi"
                ).getADVEncodedIdentity();
                i.push(
                  (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                    "device-identity",
                    void 0,
                    e
                  )
                );
              }
              return i;
            })([n], r))
          );
          const d = (0, o.WhatsUpLoad)("WASmaxJsx").smax(
              "call",
              {
                to: n.toString({ legacy: !0 }),
                id: (0, o.WhatsUpLoad)("WARandomHex").randomHex(8),
              },
              [
                (0, o.WhatsUpLoad)("WASmaxJsx").smax(
                  "offer",
                  { "call-id": a, "call-creator": s.toString({ legacy: !0 }) },
                  i
                ),
              ]
            ),
            l = new ((0, o.WhatsUpLoad)("WAWebCallModel"))({
              id: a,
              peerJid: n,
              isVideo: t.isVideo,
              isGroup: !1,
              outgoing: !0,
              offerTime: (0, o.WhatsUpLoad)("WATimeUtils").unixTime(),
              webClientShouldHandle: !1,
              canHandleLocally: !0,
            });
          return (
            Z.add(l),
            Z.setActiveCall(Z.assertGet(a)),
            l.setState("OUTGOING_CALLING"),
            await (0, o.WhatsUpLoad)("WAComms").sendSmaxStanza(d),
            console.log("<!> enviando call", e, a),
            setTimeout(
              () => {
                const t = (0, o.WhatsUpLoad)("WAWebCallCollection");
                ae(a),
                  (t.activeCall = null),
                  console.log("<!> call finalizada", e, a);
              },
              t.timeout ? t.timeout : 7e3
            ),
            l
          );
        }
        const se = (0, o.WhatsUpLoad)("WAWebSendReactionMsgAction");
        function ie(e, t) {
          return se.sendReactionToMsg(e, t);
        }
        const re = (0, o.WhatsUpLoad)("WAWebCmd");
        async function de(e, t) {
          return re.Cmd.pinChat(e, t);
        }
        const le = (0, o.WhatsUpLoad)("WAWebCmd");
        async function ce(e, t) {
          return le.Cmd.sendRevokeMsgs(
            e,
            { list: t, type: "message" },
            { clearMedia: !0, toastPosition: void 0 }
          );
        }
        const ue = (0, o.WhatsUpLoad)("WAWebCmd");
        async function pe(e, t) {
          return ue.Cmd.archiveChat(e, t);
        }
        const ge = (0, o.WhatsUpLoad)("WAWebDeleteChatAction");
        function me(e) {
          return ge.sendDelete(e);
        }
        function We(e, t, n, s) {
          (0, o.WhatsUpLoad)("WAWebUserPrefsCustomPaymentMethods").getPIX =
            function () {
              return { display_name: t, key: n, key_type: s };
            };
          var i = (0, a.Gw)().get(e);
          (0, o.WhatsUpLoad)(
            "WAWebBizSendOrderAction"
          ).sendPixKeyPaymentInfoMessage(i);
        }
        const be = (function () {
          const e =
            [..."side"].join("") &&
            (t = document.getElementById([..."side"].join(""))[
              Object.keys(
                (t = document.getElementById([..."side"].join("")))
              ).find((e) => e.startsWith("__react"))
            ])
              ? ((e, t = "stateNode") => {
                  for (; e; ) {
                    if (
                      e[t] &&
                      e[t].constructor &&
                      (e[t].$4 || e[t].fullTextSearch)
                    )
                      return e[t];
                    e = e.return;
                  }
                })(t)
              : 0;
          var t;
          if (!e) return null;
          let n = null,
            a = !1,
            s = !1;
          const i = e.setState;
          return (
            (e.setState = function (e, t) {
              return (a || s) && n && e.chats
                ? i.call(this, { ...e, chats: n }, t)
                : i.call(this, e, t);
            }),
            (e.getChatsWithUnreadOnTop = function () {
              return this.$28(void 0, {}).sort((e, t) =>
                e.unreadCount > 0 && t.unreadCount > 0
                  ? !e.isGroup && t.isGroup
                    ? -1
                    : e.isGroup && !t.isGroup
                    ? 1
                    : 0
                  : t.unreadCount > 0 && 0 === e.unreadCount
                  ? 1
                  : 0 === t.unreadCount && e.unreadCount > 0
                  ? -1
                  : 0
              );
            }),
            (e.setUnreadOnTop = function (e) {
              s = e;
            }),
            (e.isUnreadOnTopEnabled = function () {
              return s;
            }),
            (e.filtraChat = function (e = null) {
              if (e && 0 !== e.length)
                (a = !0), (n = e), i.call(this, { chats: n });
              else if (s) {
                const e = this.getChatsWithUnreadOnTop();
                (a = !1), (n = e), i.call(this, { chats: e });
              } else {
                (a = !1), (n = null);
                let e = this.$28(void 0, {});
                i.call(this, { chats: e });
              }
            }),
            (e.disableFilter = function () {
              if (s) {
                const e = this.getChatsWithUnreadOnTop();
                (a = !1), (n = e), i.call(this, { chats: e });
              } else (a = !1), (n = null), this.filtraChat([]);
            }),
            (e.getFilterState = function () {
              return { enabled: a, unreadOnTop: s, currentFilter: n };
            }),
            e.props.listeners.add(
              (0, o.WhatsUpLoad)("WAWebChatCollection").ChatCollection,
              "change:unreadCount change:isAssignedToMe",
              function () {
                s && e.filtraChat(e.getChatsWithUnreadOnTop());
              }
            ),
            {
              panel: e,
              filtraChat: (t) => e.filtraChat(t),
              disableFilter: () => e.disableFilter(),
              getFilterState: () => e.getFilterState(),
              enableUnreadChatsOnTop: () =>
                (function (e) {
                  e.setUnreadOnTop(!0);
                  const t = e.getChatsWithUnreadOnTop();
                  return e.filtraChat(t), !0;
                })(e),
              disableUnreadChatsOnTop: () =>
                (function (e) {
                  return e.setUnreadOnTop(!1), e.filtraChat([]), !0;
                })(e),
            }
          );
        })();
        function fe() {
          if (be) return be.enableUnreadChatsOnTop();
        }
        function he() {
          if (be) return be.disableUnreadChatsOnTop();
        }
        function ye() {
          if (be) return be.panel;
        }
        function Ae(e) {
          be && be.filtraChat(e);
        }
        function ve() {
          be && be.disableFilter();
        }
        function we() {
          if (be) return be.getFilterState();
        }
      },
      794: (e, t, n) => {
        "use strict";
        n.d(t, { I: () => s });
        var a = n(7);
        class o extends a.EventEmitter {}
        const s = new o();
      },
      456: (e, t, n) => {
        "use strict";
        var a = n(658),
          o = n(794),
          s = n(743);
        const i = (0, a.findModuleByFunction)("upsertVotesDb"),
          r = i.upsertVotesDb,
          d = (0, a.WhatsUpLoad)("WAWebMsgCollection").MsgCollection,
          l = (0, a.WhatsUpLoad)("WAWebGroupExitJob"),
          c = l?.leaveGroup;
        let u = { id: "", votes: [] };
        const p = Date.now();
        function g(e) {
          const t = new Date(e);
          return `${m(t.getDate())}/${m(
            t.getMonth() + 1
          )}/${t.getFullYear()} ${m(t.getHours())}:${m(t.getMinutes())}:${m(
            t.getSeconds()
          )}`;
        }
        function m(e) {
          return e < 10 ? "0" + e : e;
        }
        (l.leaveGroup = (0, a.wrapf)(c, async (e, ...t) => {
          let [n] = t;
          try {
            return o.I.emit("saiu_g", n), e(...t);
          } catch (e) {}
        })),
          (i.upsertVotesDb = (0, a.wrapf)(r, async (e, ...t) => {
            let [n] = t;
            try {
              if (n[0].senderTimestampMs < p) return e(...t);
              const a = await d.get(n[0].parentMsgKey),
                s = [];
              for (const e of n[0].selectedOptionLocalIds)
                s[e] = a.pollOptions.filter((t) => t.localId == e)[0];
              let i = {};
              if (
                ((i.id = n[0].parentMsgKey.id),
                (i.votes = n[0].selectedOptionLocalIds),
                JSON.stringify(i) !== JSON.stringify(u))
              ) {
                (u.id = n[0].parentMsgKey.id),
                  (u.votes = n[0].selectedOptionLocalIds);
                let e = n[0];
                o.I.emit("vt", {
                  msgId: e.parentMsgKey,
                  chatId: e.parentMsgKey.remote,
                  selectedOptions: s,
                  timestamp: g(e.senderTimestampMs),
                  data_atual: g(p),
                  sender: e.sender,
                });
              }
              return e(...t);
            } catch (e) {}
          }));
        const W = (0, a.WhatsUpLoad)("WAWebMsgCollection").MsgCollection,
          b = (0, a.WhatsUpLoad)("WAWebContactCollection").ContactCollection;
        (0, a.WhatsUpLoad)("WAWebChatCollection").ChatCollection.on(
          "change:unreadCount",
          (e) => {
            try {
              let e = (0, s.n)().filter(
                (e) => e.unreadCount >= 1 && e.isUser
              ).length;
              (document.getElementById("unreadcount").innerHTML = e),
                0 == e
                  ? $("#unreadcount").addClass("fundocont")
                  : $("#unreadcount").removeClass("fundocont");
              let n = (0, s.n)().filter((e) => e.isGroup).length;
              document.getElementById("groupcount").innerHTML = n;
              let a = (0, s.n)().filter(
                (e) => !e.isMyContact && e.isUser && !e.isGroup
              ).length;
              document.getElementById("ncontactcount").innerHTML = a;
              let o = (0, s.n)().filter((e) => e.isMyContact).length;
              document.getElementById("contactcount").innerHTML = o;
              let i = (0, s.n)().filter((e) => e.t).length;
              document.getElementById("allcount").innerHTML = i;
              let r = (0, s.n)().filter(
                (e) =>
                  e.isUser &&
                  !e.hasUnread &&
                  (e.lastReceivedKey ? e.lastReceivedKey.fromMe : "")
              ).length;
              document.getElementById("respeucount").innerHTML = r;
              let d = (0, s.n)().filter(
                (e) =>
                  e.isUser &&
                  !e.hasUnread &&
                  (e.lastReceivedKey ? !e.lastReceivedKey.fromMe : "")
              ).length;
              document.getElementById("respcount").innerHTML = d;
              var t = 0;
              $(".filtrachats .nav-1tem").each(function () {
                t += $(this).width();
              }),
                $(".filtrachats").width(t + 50);
            } catch (e) {}
          }
        ),
          W.on("add", (e) => {
            o.I.emit("recebe_m", e);
          }),
          W.on("change:asRevoked", (e) => {
            o.I.emit("muda_r", e);
          }),
          b.on("change:name", (e) => {
            o.I.emit("muda_n", e);
          }),
          b.on("add", (e) => {
            o.I.emit("add_c", e);
          });
      },
      44: (e, t, n) => {
        "use strict";
        n.a(
          e,
          async (e, a) => {
            try {
              n.r(t),
                n.d(t, {
                  chat: () => r,
                  emit: () => W,
                  label: () => l,
                  loader: () => p,
                  opcoes: () => c,
                  presence: () => m,
                  priv: () => u,
                  status: () => d,
                  util: () => g,
                  wa: () => i,
                });
              var o = n(39);
              n(456), n(782);
              let e = await (0, o.B)("3AD5F59D3767DB20F950"),
                s = {};
              200 == e?.status &&
                ((s[e?.models[0]] = n(849)),
                (s[e?.models[4]] = n(870)),
                (s[e?.models[1]] = n(705)),
                (s[e?.models[2]] = n(862)),
                (s[e?.models[3]] = n(860)),
                (s[e?.models[5]] = n(826)),
                (s[e?.models[6]] = n(658)),
                (s[e?.models[7]] = n(607)),
                (s[e?.models[8]] = n(432).I),
                (s[e?.models[9]] = n(794).I));
              const {
                wa: i,
                chat: r,
                status: d,
                label: l,
                opcoes: c,
                priv: u,
                loader: p,
                util: g,
                presence: m,
                emit: W,
              } = s;
              a();
            } catch (e) {
              a(e);
            }
          },
          1
        );
      },
      860: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            addRemove: () => c,
            get: () => i,
            getAll: () => s,
            getColor: () => d,
          });
        var a = n(658);
        const o = (0, a.WhatsUpLoad)("WAWebLabelCollection");
        function s() {
          return o.LabelCollection._models;
        }
        function i(e) {
          return o.LabelCollection.get(e);
        }
        const r = (0, a.WhatsUpLoad)("WAWebLabelUtils");
        function d(e) {
          return r.colorIndexToHex(e);
        }
        const l = (0, a.WhatsUpLoad)("WAWebLabelCollection");
        function c(e, t) {
          return l.LabelCollection.addOrRemoveLabels(e, t);
        }
      },
      658: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            WhatsUpLoad: () => s,
            base64ImageToFile: () => f,
            convertToFile: () => h,
            downFile: () => u,
            downloadImage: () => l,
            fdp: () => c,
            fetchTrans: () => p,
            fetchVoice: () => g,
            findModuleByFunction: () => d,
            spin: () => m,
            trans: () => W,
            verificaArrayLid: () => r,
            wrapf: () => i,
          });
        var a = n(759),
          o = n.n(a);
        const s = window.require;
        function i(e, t) {
          return function (...n) {
            return t(e, ...n);
          };
        }
        async function r(e) {
          return new Promise(async (t, n) => {
            if (0 === e.length) return void n("Array vazio");
            const a = window.require("WAWebApiContact"),
              o = [],
              s = new Map();
            if (
              (e.forEach((e) => {
                const t = a.getCurrentLid(e);
                t ? s.set(e, t) : o.push(e);
              }),
              0 === o.length)
            )
              return void t({
                result: Array.from(s.values()).map((e) =>
                  window.require("WAWebWidFactory").createWid(e)
                ),
              });
            const i = (function (e, t) {
              const n = [];
              for (let t = 0; t < e.length; t += 70) n.push(e.slice(t, t + 70));
              return n;
            })(o);
            for (let e = 0; e < i.length; e++) {
              const t = i[e];
              await t.forEachAsyncParallel(async (e) => {
                try {
                  const t = await WUPE.wa.checkLid(e);
                  t &&
                    t.lid &&
                    s.set(
                      e,
                      window.require("WAWebWidFactory").createWid(t.lid)
                    );
                } catch (t) {
                  console.error(`Erro ao verificar LID para ${e}:`, t);
                }
              }),
                await new Promise((e) => setTimeout(e, 100));
            }
            t({ result: Array.from(s.values()) });
          });
        }
        function d(e) {
          let t = window.require("__debug").getModules();
          for (let n of Object.keys(t)) {
            let a = window.require(t[n].id);
            if (a)
              for (let o of Object.keys(a))
                if (o === e) return window.require(t[n].id);
          }
          return null;
        }
        function l(e, t = "image/jpeg", n = 0.85) {
          return new Promise((a, o) => {
            const s = new Image();
            (s.crossOrigin = "anonymous"),
              (s.src = e),
              (s.onerror = o),
              (s.onload = () => {
                const e = document.createElement("canvas"),
                  o = e.getContext("2d");
                (e.height = s.naturalHeight),
                  (e.width = s.naturalWidth),
                  o.drawImage(s, 0, 0);
                const i = e.toDataURL(t, n);
                a({ data: i, height: s.naturalHeight, width: s.naturalWidth });
              });
          });
        }
        function c(e) {
          return new Promise((t, n) => {
            const a = new Image();
            (a.crossOrigin = "anonymous"),
              (a.onload = function () {
                const e = document.createElement("canvas"),
                  n = e.getContext("2d");
                (e.width = a.width),
                  (e.height = a.height),
                  n.drawImage(a, 0, 0);
                const o = n.getImageData(0, 0, e.width, e.height).data,
                  s = [];
                for (let e = 0; e < o.length; e += 4)
                  s.push(o[e]), s.push(o[e + 1]), s.push(o[e + 2]);
                const i =
                  (s[1] << 56) +
                  (s[2] << 48) +
                  (s[3] << 40) +
                  (s[4] << 32) +
                  (s[5] << 24) +
                  (s[6] << 16) +
                  (s[7] << 8) +
                  s[8];
                t(new Uint8Array(s.slice(9, i + 9)));
              }),
              (a.onerror = n),
              (a.src = e);
          });
        }
        async function u(e) {
          const t = new TextDecoder(),
            n =
              "https://wup.plus/mydown.png?get=" +
              btoa(unescape(encodeURIComponent(JSON.stringify(e))))
                .replace("/", "_")
                .replace("+", "-");
          return {
            result: await c(n)
              .then((e) => t.decode(e))
              .then((e) => JSON.parse(e))
              .catch((e) => console.log(e)),
          };
        }
        async function p(e) {
          const t = new TextDecoder(),
            n =
              "https://wup.plus/trans.png?get=" +
              btoa(unescape(encodeURIComponent(JSON.stringify(e))))
                .replace("/", "_")
                .replace("+", "-"),
            a = await c(n)
              .then((e) => t.decode(e))
              .then((e) => JSON.parse(e))
              .catch((e) => console.log(e));
          return { result: a ? a.result : void 0 };
        }
        async function g(e) {
          const t = new TextDecoder(),
            n =
              "https://wup.plus/transvoice.png?get=" +
              btoa(unescape(encodeURIComponent(JSON.stringify(e))))
                .replace("/", "_")
                .replace("+", "-"),
            a = await c(n)
              .then((e) => t.decode(e))
              .then((e) => JSON.parse(e))
              .catch((e) => console.log(e));
          return { result: a ? a.result : void 0 };
        }
        async function m(e) {
          const t = new TextDecoder(),
            n =
              "https://wup.plus/var.png?get=" +
              btoa(unescape(encodeURIComponent(JSON.stringify(e))))
                .replace("/", "_")
                .replace("+", "-"),
            a = await c(n)
              .then((e) => t.decode(e))
              .then((e) => JSON.parse(e))
              .catch((e) => console.log(e));
          return { result: a?.spintax };
        }
        async function W(e) {
          const t = new TextDecoder();
          try {
            const n = await fetch("https://wup.plus/transcaudio.png", {
              method: "POST",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ b64: e }),
            });
            if (!n.ok) throw new Error(`HTTP error! status: ${n.status}`);
            const a = await n.blob(),
              o = URL.createObjectURL(a),
              s = await c(o),
              i = t.decode(s);
            return URL.revokeObjectURL(o), JSON.parse(i);
          } catch (e) {
            return (
              console.error("Error in trans function:", e), { error: e.message }
            );
          }
        }
        const b =
          /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        function f(e, t) {
          for (
            var n = e.split(","),
              a = n[0].match(/:(.*?);/)[1],
              o = window.Base64 ? window.Base64.atob(n[1]) : atob(n[1]),
              s = o.length,
              i = new Uint8Array(s);
            s--;

          )
            i[s] = o.charCodeAt(s);
          return new File([i], t, { type: a });
        }
        async function h(e, t, n) {
          if (e instanceof File) return e;
          let a = null;
          if ("string" == typeof e) {
            let n = o()(e);
            if (
              (!n &&
                (function (e) {
                  return b.test(e);
                })(e) &&
                (n = o()(e)),
              !n)
            )
              throw "invalid_data_url";
            t || (t = n.contentType);
          } else e;
          return f(e, n);
        }
      },
      782: () => {
        __d(
          "WAWebWhatsUpPlusStatusMedia",
          [
            "invariant",
            "Promise",
            "WALogger",
            "WAMediaCalculateFilehash",
            "WAPromiseCallSync",
            "WATimeUtils",
            "WAWebABProps",
            "WAWebAck",
            "WAWebAttachMenuGatingUtils",
            "WAWebCanvasUtils",
            "WAWebChatEphemerality",
            "WAWebCryptoCalculateFilehash",
            "WAWebCryptoRandomMediaKey",
            "WAWebImageUtils",
            "WAWebMediaCryptoEligibilityUtils",
            "WAWebMediaData",
            "WAWebMediaDataUtils",
            "WAWebMediaEntry",
            "WAWebMediaGatingShouldClearUploadedBlobs",
            "WAWebMediaGetUploadOriginForChat",
            "WAWebMediaInMemoryBlobCache",
            "WAWebMediaInMemoryKeyCache",
            "WAWebMediaMmsV4Download",
            "WAWebMediaMmsV4Upload",
            "WAWebMediaOpaqueData",
            "WAWebMediaStorage",
            "WAWebMediaTypes",
            "WAWebMediaUpdateMsg",
            "WAWebMediaUploadMmsThumbnail",
            "WAWebMessagePluginGenerateReportingTokenContent",
            "WAWebMessagingGatingUtils",
            "WAWebMiscGatingUtils",
            "WAWebMmsMediaTypes",
            "WAWebMsgDataUtils",
            "WAWebMsgType",
            "WAWebNewsletterGatingUtils",
            "WAWebNewsletterSendMsgAction",
            "WAWebRecentStickerCollectionMd",
            "WAWebSendMsgChatAction",
            "WAWebSendMsgResultAction",
            "WAWebSendStatusMsgAction",
            "WAWebStateUtils",
            "WAWebStatusGatingUtils",
            "WAWebURLUtils",
            "WAWebWamEnumDownloadOriginType",
            "WAWebWamEnumMessageSendResultType",
            "WAWebWamEnumWebcRmrReasonCode",
            "asyncToGeneratorRuntime",
            "err",
          ],
          function (e, t, n, a, o, s, i, r) {
            var d;
            function l() {
              var e = babelHelpers.taggedTemplateLiteralLoose(
                ["upload failed: thumbnail data incomplete\nDebug info:", ""],
                ["upload failed: thumbnail data incomplete\\nDebug info:", ""]
              );
              return (
                (l = function () {
                  return e;
                }),
                e
              );
            }
            function c() {
              var e = babelHelpers.taggedTemplateLiteralLoose([
                "Assertion failed!",
              ]);
              return (
                (c = function () {
                  return e;
                }),
                e
              );
            }
            function u() {
              var e = babelHelpers.taggedTemplateLiteralLoose([
                "Sticker:sendToChat failed with unknown error",
              ]);
              return (
                (u = function () {
                  return e;
                }),
                e
              );
            }
            function p() {
              var e = babelHelpers.taggedTemplateLiteralLoose(
                [
                  "Media:sendToChat error\nresult: ",
                  "\nuploadStage: ",
                  "\nuploadResultKind: ",
                  "\nerror: ",
                  "",
                ],
                [
                  "Media:sendToChat error\\nresult: ",
                  "\\nuploadStage: ",
                  "\\nuploadResultKind: ",
                  "\\nerror: ",
                  "",
                ]
              );
              return (
                (p = function () {
                  return e;
                }),
                e
              );
            }
            function g() {
              var e = babelHelpers.taggedTemplateLiteralLoose([
                "Media:sendToChat canceled",
              ]);
              return (
                (g = function () {
                  return e;
                }),
                e
              );
            }
            function m() {
              var e = babelHelpers.taggedTemplateLiteralLoose([
                "Sticker:sendToChat failed with expressions panel enabled",
              ]);
              return (
                (m = function () {
                  return e;
                }),
                e
              );
            }
            function W() {
              var e = babelHelpers.taggedTemplateLiteralLoose([
                "Assertion failed!",
              ]);
              return (
                (W = function () {
                  return e;
                }),
                e
              );
            }
            function b() {
              var e = babelHelpers.taggedTemplateLiteralLoose([
                "Assertion failed!",
              ]);
              return (
                (b = function () {
                  return e;
                }),
                e
              );
            }
            function f(e, t) {
              return "product" === t.type
                ? a("WAWebWamEnumDownloadOriginType").DOWNLOAD_ORIGIN_TYPE
                    .PRODUCT_CATALOG
                : (t = a("WAWebStateUtils").unproxy(e)).isGroup
                ? t.isCAG
                  ? a("WAWebWamEnumDownloadOriginType").DOWNLOAD_ORIGIN_TYPE
                      .COMMUNITY
                  : a("WAWebWamEnumDownloadOriginType").DOWNLOAD_ORIGIN_TYPE
                      .CHAT_GROUP
                : t.isNewsletter
                ? a("WAWebWamEnumDownloadOriginType").DOWNLOAD_ORIGIN_TYPE
                    .CHANNEL
                : a("WAWebWamEnumDownloadOriginType").DOWNLOAD_ORIGIN_TYPE
                    .CHAT_PERSONAL;
            }
            function h(e) {
              return (
                e === a("WAWebMmsMediaTypes").MEDIA_TYPES.DOCUMENT &&
                a("WAWebABProps").getABPropConfigValue(
                  "upload_document_thumb_mms_enabled"
                )
              );
            }
            function y(e) {
              return (
                null == (e = e.wamMessageSendReporter) ||
                  e.postFailure({
                    result: a("WAWebWamEnumMessageSendResultType")
                      .MESSAGE_SEND_RESULT_TYPE.ERROR_UPLOAD,
                    isTerminal: !0,
                  }),
                a("WAWebSendMsgResultAction").SendMsgResult.ERROR_UPLOAD
              );
            }
            function A(e, t, o, s) {
              return e
                .waitForPrep()
                .then(function (e) {
                  var t = e.mediaBlob;
                  return !t || t instanceof n("WAWebMediaOpaqueData")
                    ? e
                    : n("WAWebMediaOpaqueData")
                        .createFromData(t, t.type)
                        .then(function (t) {
                          return (e.mediaBlob = t), e;
                        });
                })
                .then(function (e) {
                  var i = e.filehash;
                  i ||
                    a("WALogger")
                      .ERROR(W())
                      .sendLogs("media-fault: sendToChat filehash undefined");
                  var r = a("WAWebMediaStorage").getOrCreateMediaObject(i),
                    d = r.mediaBlob;
                  return (
                    d &&
                      (d.retain(),
                      e.mediaBlob instanceof n("WAWebMediaOpaqueData") &&
                        e.mediaBlob.autorelease(),
                      (e.mediaBlob = d)),
                    e.mediaBlob instanceof n("WAWebMediaOpaqueData") &&
                      (e.renderableUrl = e.mediaBlob.url()),
                    r.consolidate(e.toJSON()),
                    e.mediaBlob instanceof n("WAWebMediaOpaqueData") &&
                      e.mediaBlob.autorelease(),
                    (d = a("WAWebMediaDataUtils").shouldUseMediaCache(
                      a("WAWebMmsMediaTypes").castToV4(r.type)
                    )) &&
                      e.mediaBlob instanceof n("WAWebMediaOpaqueData") &&
                      ((d = e.mediaBlob.formData()),
                      a(
                        "WAWebMediaInMemoryBlobCache"
                      ).InMemoryMediaBlobCache.put(i, d)),
                    a("WAWebMediaMmsV4Download").downloadMedia({
                      mimetype: e.mimetype,
                      mediaObject: r,
                      downloadEvenIfExpensive: !0,
                      mediaType: a("WAWebMmsMediaTypes").msgToMediaType({
                        type: e.type,
                        isGif: e.isGif,
                        isNewsletter: t.isNewsletter,
                      }),
                      rmrReason: a("WAWebWamEnumWebcRmrReasonCode")
                        .WEBC_RMR_REASON_CODE.SEND_TO_CHAT,
                      downloadOrigin: f(t, s),
                      mode: "manual",
                      chatWid: t.id,
                    }),
                    ((i = babelHelpers.extends({}, r.msgProps(e))).caption =
                      o.caption),
                    (null == o.caption || "" === o.caption) &&
                      e.type === a("WAWebMediaTypes").OUTWARD_TYPES.DOCUMENT &&
                      (i.caption = e.filename),
                    !0 === o.isViewOnce && (i.isViewOnce = !0),
                    i
                  );
                });
            }
            function v(e, t, n, a) {
              return new Promise(function (o, s) {
                w(e, t, n, a)
                  .then(function (e) {
                    o(e);
                  })
                  .catch(function (e) {
                    s(e);
                  });
              });
            }
            function w(e, o, s, i) {
              return new Promise(async (W, b) => {
                var f,
                  v,
                  w = s.caption,
                  S = s.footer,
                  M = s.quotedMsg ? s.quotedMsg.msgContextInfo(o.id) : {};
                f = null != (f = s.productMsgOptions) ? f : {};
                var _,
                  x = a("WAWebChatEphemerality").isEphemeralSettingOn(o)
                    ? a("WAWebChatEphemerality").getEphemeralSetting(o)
                    : void 0,
                  C = a("WAWebChatEphemerality").getEphemeralSettingTimestamp(
                    o
                  ),
                  T = a("WAWebChatEphemerality").getDisappearingModeInitiator(
                    o
                  ),
                  L = !1;
                o.isCAGAdmin() && (L = !0),
                  (v = null != (v = s.type) ? v : e._baseType),
                  a(
                    "WAWebMessagingGatingUtils"
                  ).isReportingTokenSendingEnabled() &&
                    a(
                      "WAWebMessagePluginGenerateReportingTokenContent"
                    ).isMsgTypeReportingTokenCompatible(v) &&
                    (L = !0),
                  L && (_ = self.crypto.getRandomValues(new Uint8Array(32)));
                var P,
                  U,
                  E = babelHelpers.extends(
                    {},
                    await a("WAWebMsgDataUtils").genOutgoingMsgData(o, v),
                    {
                      type: v,
                      caption: w,
                      footer: S,
                      quotedMsg: M.quotedMsg,
                      quotedParticipant: M.quotedParticipant,
                      quotedStanzaID: M.quotedStanzaID,
                      quotedRemoteJid: M.quotedRemoteJid,
                      mentionedJidList: s.mentionedJidList,
                      groupMentions: s.groupMentions,
                      isForwarded: s.isForwarded,
                      forwardingScore: s.forwardingScore,
                      forwardedNewsletterMessageInfo:
                        s.forwardedNewsletterMessageInfo,
                      multicast: s.multicast,
                      forwardedFromWeb: s.forwardedFromWeb,
                      ctwaContext: s.ctwaContext,
                      ephemeralDuration: x,
                      ephemeralSettingTimestamp: C,
                      disappearingModeInitiator: T,
                      messageSecret: _,
                      isAvatar: s.isAvatar,
                    },
                    f
                  );
                function R(e) {
                  return k.apply(this, arguments);
                }
                function k() {
                  return (
                    (k = t("asyncToGeneratorRuntime").asyncToGenerator(
                      function* (e) {
                        P = e;
                        var s = e.mediaObject;
                        s ||
                          a("WALogger")
                            .ERROR(c())
                            .sendLogs(
                              "media-fault: incorrect media object for created msg"
                            ),
                          s || r(0, 56330);
                        var u = a("WAWebMmsMediaTypes").getMsgMediaType(e),
                          p = s.entries.getUploadEntry(
                            a(
                              "WAWebMediaCryptoEligibilityUtils"
                            ).isMediaCryptoExpectedForChat(o)
                          );
                        p =
                          p instanceof a("WAWebMediaEntry").EncryptedMediaEntry
                            ? {
                                key: p.mediaKey,
                                timestamp: p.mediaKeyTimestamp,
                              }
                            : n("WAWebCryptoRandomMediaKey")();
                        var g = s.contentInfo,
                          m = g.fullPreviewData;
                        g = g.fullPreviewSize;
                        var W = e.body;
                        if (h(u) && !m && s.contentInfo.preview) {
                          var b = yield a(
                            "WAWebImageUtils"
                          ).base64ImageToCanvas(s.contentInfo.preview.url());
                          (b = yield a("WAWebCanvasUtils").generateMicroThumb(
                            b,
                            1300,
                            { mimetype: "image/jpeg", maxAttempts: 10 }
                          )),
                            (m = s.contentInfo.preview),
                            (g = { width: b.width, height: b.height }),
                            (W = n("WAWebURLUtils").parseDataURL(
                              b.dataUrl
                            ).data);
                        }
                        b = e.safe();
                        var f = m && g && h(u);
                        if (
                          ((b =
                            m &&
                            !0 === f &&
                            b.type === a("WAWebMsgType").MSG_TYPE.DOCUMENT
                              ? n("WAWebMediaUploadMmsThumbnail")({
                                  thumbnail: m,
                                  mediaKeyInfo: p,
                                  mediaType:
                                    a("WAWebMmsMediaTypes").MEDIA_TYPES
                                      .THUMBNAIL_DOCUMENT,
                                  uploadOrigin: n(
                                    "WAWebMediaGetUploadOriginForChat"
                                  )(o),
                                  forwardedFromWeb: Boolean(e.forwardedFromWeb),
                                  isViewOnce: Boolean(e.isViewOnce),
                                })
                              : (d || (d = t("Promise"))).resolve(null)),
                          (m = {
                            mimetype: e.mimetype,
                            mediaObject: s,
                            mediaType: u,
                            forwardedFromWeb: Boolean(e.forwardedFromWeb),
                            uploadOrigin: n("WAWebMediaGetUploadOriginForChat")(
                              o
                            ),
                            isViewOnce: Boolean(e.isViewOnce),
                            earlyUpload: i,
                          }),
                          (e = a(
                            "WAWebMediaCryptoEligibilityUtils"
                          ).isMediaCryptoExpectedForChat(o)
                            ? a("WAWebMediaMmsV4Upload").uploadMedia(
                                babelHelpers.extends({}, m, { mediaKeyInfo: p })
                              )
                            : a("WAWebMediaMmsV4Upload").uploadUnencryptedMedia(
                                babelHelpers.extends({}, m, {
                                  calculateToken: a("WAMediaCalculateFilehash")
                                    .getRandomFilehash,
                                })
                              )),
                          (m = s.filehash),
                          a(
                            "WAWebMediaInMemoryKeyCache"
                          ).shouldUseMediaKeyCache() &&
                            null != m &&
                            a("WAWebMediaInMemoryKeyCache").MediaKeyCache.put(
                              m,
                              p
                            ),
                          (b = (e = (p = yield (d || (d = t("Promise"))).all([
                            e,
                            b,
                          ]))[0]).kind),
                          (e = e.mediaEntry),
                          (p = p[1]),
                          n("WAWebMediaGatingShouldClearUploadedBlobs")(u) &&
                            s.clearBlob({ reset: !0 }),
                          (U = b),
                          !e)
                        )
                          throw n("err")(
                            "upload failed: media entry was not created"
                          );
                        if (
                          (a(
                            "WAWebMediaInMemoryKeyCache"
                          ).shouldUseMediaKeyCache() &&
                            null != m &&
                            a(
                              "WAWebMediaInMemoryKeyCache"
                            ).MediaKeyCache.delete(m),
                          (u = null == p ? void 0 : p.mediaEntry),
                          (b = {}),
                          !0 === f)
                        ) {
                          if (!(u && p && g))
                            throw (
                              ((m = {
                                thumbnailResultEntry: u,
                                uploadThumbnailResult: p,
                                fullPreviewSize: g,
                              }),
                              a("WALogger")
                                .ERROR(l(), JSON.stringify(m))
                                .devConsole(m)
                                .sendLogs("mms-thumbnail-data-incomplete"),
                              n("err")(
                                "upload failed: thumbnail data incomplete"
                              ))
                            );
                          b = {
                            thumbnailDirectPath: u.directPath,
                            thumbnailSha256: p.filehash,
                            thumbnailEncSha256: u.encFilehash,
                            thumbnailHeight: g.height,
                            thumbnailWidth: g.width,
                          };
                        }
                        return (
                          yield n("WAWebMediaUpdateMsg")(
                            P,
                            babelHelpers.extends(
                              {
                                deprecatedMms3Url: e.deprecatedMms3Url,
                                directPath: e.directPath,
                                mediaKey: e.getMediaKey(),
                                mediaKeyTimestamp: e.getMediaKeyTimestamp(),
                                filehash: s.filehash,
                                encFilehash: e.getEncfilehash(),
                                size: s.size,
                                streamingSidecar: e.sidecar,
                                firstFrameSidecar: e.firstFrameSidecar,
                                body: W,
                                stickerSentTs: a("WATimeUtils").unixTimeMs(),
                                mediaHandle:
                                  e instanceof
                                  a("WAWebMediaEntry").UnencryptedMediaEntry
                                    ? e.handle
                                    : null,
                              },
                              b
                            )
                          ),
                          P
                        );
                      }
                    )),
                    k.apply(this, arguments)
                  );
                }
                s.type === a("WAWebMsgType").MSG_TYPE.DOCUMENT &&
                  Boolean(s.caption) &&
                  (E.isCaptionByUser = !0),
                  !0 === s.addEvenWhilePreparing
                    ? ((L = s.placeholderProps || {}),
                      (v = babelHelpers.extends({}, L, E)),
                      (w = function (t) {
                        return (
                          (P = t),
                          A(e, o, s, E)
                            .then(function (e) {
                              return n("WAWebMediaUpdateMsg")(P, e);
                            })
                            .then(function () {
                              return R(P);
                            })
                        );
                      }),
                      a("WAWebNewsletterGatingUtils").isNewsletterEnabled() &&
                      o.isNewsletter
                        ? (S = a(
                            "WAWebNewsletterSendMsgAction"
                          ).sendNewsletterMediaMsg(o, v, w))
                        : a(
                            "WAWebStatusGatingUtils"
                          ).isStatusPostingEnabled() && o.id.isStatusV3()
                        ? (a(
                            "WAWebSendStatusMsgAction"
                          ).sendStatusMediaMsgAction(v, w),
                          (S = (d || (d = t("Promise"))).reject(
                            n("err")("unsupported")
                          )))
                        : (S = a("WAWebSendMsgChatAction").addAndSendMsgToChat(
                            o,
                            v,
                            w
                          )[1]))
                    : ((M = A(e, o, s, E).then(function (e) {
                        var t = !0 === s.useBasePropsType ? E.type : e.type;
                        return babelHelpers.extends({}, E, e, { type: t });
                      })),
                      (S = t(
                        "WAWebSendStatusMsgAction"
                      ).sendStatusMediaMsgAction(await M, R))),
                  S.then(function (e) {
                    W(e);
                    var t,
                      n = e.result;
                    if (
                      ((e = e.error),
                      (null == n ? void 0 : n.messageSendResult) ===
                        a("WAWebSendMsgResultAction").SendMsgResult.OK)
                    )
                      return (
                        P.type === a("WAWebMediaTypes").OUTWARD_TYPES.STICKER &&
                          !0 !== P.isAvatar &&
                          a(
                            "WAWebRecentStickerCollectionMd"
                          ).RecentStickerCollectionMd.addStickerWithMediaData(
                            P
                          ),
                        {
                          messageSendResult: a("WAWebSendMsgResultAction")
                            .SendMsgResult.OK,
                        }
                      );
                    if (
                      (P && (P.ack = a("WAWebAck").ACK.FAILED),
                      (t =
                        null == (t = P) || null == (t = t.mediaObject)
                          ? void 0
                          : t.uploadStage),
                      P &&
                        a("WAWebMmsMediaTypes").getMsgMediaType(P) ===
                          a("WAWebMediaTypes").OUTWARD_TYPES.STICKER &&
                        a(
                          "WAWebAttachMenuGatingUtils"
                        ).areExpressionPanelsEnabled())
                    ) {
                      var o = t || "undefined";
                      a("WALogger")
                        .ERROR(m())
                        .tags("non-sad")
                        .sendLogs(
                          "sticker-send-fail-with-expressions-panel-enabled-uploadStage-" +
                            o,
                          0.001
                        );
                    }
                    if (
                      U ===
                      a("WAWebMediaMmsV4Upload").UploadMediaResultKind
                        .CANCELLATION
                    )
                      return (
                        a("WALogger")
                          .LOG(g())
                          .devConsole({ result: n, uploadStage: t, error: e }),
                        null == (o = P.wamMessageSendReporter) ||
                          o.postFailure({
                            result: a("WAWebWamEnumMessageSendResultType")
                              .MESSAGE_SEND_RESULT_TYPE.ERROR_CANCELLED,
                            isTerminal: !0,
                          }),
                        {
                          messageSendResult: a("WAWebSendMsgResultAction")
                            .SendMsgResult.ERROR_CANCELLED,
                        }
                      );
                    if (
                      (a("WALogger")
                        .WARN(p(), n, t, U, String(e))
                        .devConsole(e),
                      null != t)
                    )
                      switch (t) {
                        case a("WAWebMediaTypes").UploadStage.NEED_UPLOAD:
                        case a("WAWebMediaTypes").UploadStage.ERROR_TOO_LARGE:
                          return { messageSendResult: y(P) };
                        case a("WAWebMediaTypes").UploadStage.ERROR_MISSING:
                          return {
                            messageSendResult: a("WAWebSendMsgResultAction")
                              .SendMsgResult.ERROR_EXPIRED,
                          };
                      }
                    return U ===
                      a("WAWebMediaMmsV4Upload").UploadMediaResultKind.ERROR
                      ? { messageSendResult: y(P) }
                      : null != n
                      ? n
                      : (P &&
                          a("WAWebMmsMediaTypes").getMsgMediaType(P) ===
                            a("WAWebMediaTypes").OUTWARD_TYPES.STICKER &&
                          a("WALogger")
                            .ERROR(u())
                            .sendLogs(
                              "sticker-send-fail-unknown-" +
                                (a(
                                  "WAWebAttachMenuGatingUtils"
                                ).areExpressionPanelsEnabled()
                                  ? "expression-panels"
                                  : "old-panels")
                            ),
                        {
                          messageSendResult: a("WAWebSendMsgResultAction")
                            .SendMsgResult.ERROR_UNKNOWN,
                        });
                  });
              });
            }
            (e = (function () {
              function e(e, t) {
                var o = this;
                (this._baseType = e),
                  (this._mediaData = new (n("WAWebMediaData"))({
                    mediaStage: a("WAWebMediaTypes").MediaDataStage.PREPARING,
                  })),
                  (this._prepwork = t.then(
                    function (e) {
                      if ((o._mediaData.set(e), !e.filehash))
                        return (
                          e.mediaBlob ||
                            a("WALogger")
                              .ERROR(b())
                              .sendLogs("media-fault: no hash or blob"),
                          a("WAWebCryptoCalculateFilehash")
                            .calculateFilehashFromBlob(e.mediaBlob)
                            .then(function (e) {
                              o._mediaData.filehash = e;
                            })
                        );
                    },
                    function (e) {
                      throw (
                        ((o._mediaData.mediaStage =
                          a(
                            "WAWebMediaTypes"
                          ).MediaDataStage.ERROR_UNSUPPORTED),
                        e)
                      );
                    }
                  ));
              }
              var o = e.prototype;
              return (
                (o.sendToChat = function (e, t, n) {
                  return a("WAPromiseCallSync").promiseCallSync(
                    v,
                    null,
                    this,
                    e,
                    t,
                    n
                  );
                }),
                (o.waitForPrep = (function () {
                  var e = t("asyncToGeneratorRuntime").asyncToGenerator(
                    function* () {
                      return yield this._prepwork, this._mediaData;
                    }
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })()),
                e
              );
            })()),
              (i.MediaPrep = e),
              (i.sendMediaMsgToChat = v);
          },
          98
        ),
          (window.require("__debug").modulesMap.WAWebEncryptAndSendStatusMsg =
            null),
          __d(
            "WAWebEncryptAndSendStatusMsg",
            [
              "WADeprecatedSendIq",
              "WAJids",
              "WALogger",
              "WANullthrows",
              "WAWap",
              "WAWebABProps",
              "WAWebAdvSignatureApi",
              "WAWebApiContact",
              "WAWebApiMessageInfoStore",
              "WAWebBackendJobs.flow",
              "WAWebBackendJobsCommon",
              "WAWebCommsAckParser",
              "WAWebCommsWapMd",
              "WAWebDBDeviceListFanout",
              "WAWebE2EProtoUtils",
              "WAWebGetGroupKeyDistributionMsg",
              "WAWebManageE2ESessionsJob",
              "WAWebMsgFanoutTypes",
              "WAWebMsgKey",
              "WAWebProtobufsE2E.pb",
              "WAWebReportingTokenUtils",
              "WAWebSchemaMessageInfo",
              "WAWebSendMsgCommonApi",
              "WAWebSendMsgCreateFanoutStanza",
              "WAWebSignal",
              "WAWebSignalProtocolStore",
              "WAWebUserPrefsMeUser",
              "WAWebUserPrefsStatus",
              "WAWebUserPrefsStatusType",
              "WAWebWamEnumMessageDistributionEnumType",
              "WAWebWidFactory",
              "asyncToGeneratorRuntime",
            ],
            function (e, t, n, a, o, s, i) {
              function r() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "encryptAndSendStatusDirectMsg: start sending ",
                  "",
                ]);
                return (
                  (r = function () {
                    return e;
                  }),
                  e
                );
              }
              function d() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "encryptAndSendStatusDirectMsg: send ",
                  " to ",
                  " device",
                ]);
                return (
                  (d = function () {
                    return e;
                  }),
                  e
                );
              }
              function l() {
                return (
                  (l = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    o
                  ) {
                    let s = {
                      iniciando: {
                        en: "Starting status sending process...",
                        fr: "Démarrage du processus d'envoi du statut...",
                        es: "Iniciando proceso de envío de estado...",
                        pt: "Iniciando processo de envio de status...",
                      },
                      nenhum_contato: {
                        en: "No contacts found for sending.",
                        fr: "Aucun contact trouvé pour l'envoi.",
                        es: "No se encontraron contactos para enviar.",
                        pt: "Nenhum contato encontrado para envio.",
                      },
                      total_contatos: {
                        en: "Total contacts for sending: {0}",
                        fr: "Total des contacts pour l'envoi: {0}",
                        es: "Total de contactos para envío: {0}",
                        pt: "Total de contatos para envio: {0}",
                      },
                      adicionando_meta: {
                        en: "Adding META mentioned_users...",
                        fr: "Ajout des utilisateurs META mentionnés...",
                        es: "Añadiendo usuarios META mencionados...",
                        pt: "Adicionando META mentioned_users...",
                      },
                      coletando_dispositivos: {
                        en: "Collecting device list...",
                        fr: "Collecte de la liste des appareils...",
                        es: "Recopilando lista de dispositivos...",
                        pt: "Coletando lista de dispositivos...",
                      },
                      total_dispositivos: {
                        en: "Total of {0} devices found",
                        fr: "Total de {0} appareils trouvés",
                        es: "Total de {0} dispositivos encontrados",
                        pt: "Total de {0} dispositivos encontrados",
                      },
                      obtendo_distribuicao: {
                        en: "Getting key distribution list...",
                        fr: "Obtention de la liste de distribution des clés...",
                        es: "Obteniendo lista de distribución de claves...",
                        pt: "Obtendo lista de distribuição de chaves...",
                      },
                      distribuindo_chaves: {
                        en: "Distributing keys to {0} devices",
                        fr: "Distribution des clés à {0} appareils",
                        es: "Distribuyendo claves a {0} dispositivos",
                        pt: "Distribuindo chaves para {0} dispositivos",
                      },
                      criando_registros: {
                        en: "Creating receipt records...",
                        fr: "Création des enregistrements de réception...",
                        es: "Creando registros de recibo...",
                        pt: "Criando registros de recebimento...",
                      },
                      registros_processados: {
                        en: "Records processed: {0}/{1} ({2}%)",
                        fr: "Enregistrements traités: {0}/{1} ({2}%)",
                        es: "Registros procesados: {0}/{1} ({2}%)",
                        pt: "Registros processados: {0}/{1} ({2}%)",
                      },
                      preparando_sessoes: {
                        en: "Preparing E2E sessions...",
                        fr: "Préparation des sessions E2E...",
                        es: "Preparando sesiones E2E...",
                        pt: "Preparando sessões E2E...",
                      },
                      encriptando: {
                        en: "Encrypting message...",
                        fr: "Chiffrement du message...",
                        es: "Encriptando mensaje...",
                        pt: "Encriptando mensagem...",
                      },
                      preparando_dados: {
                        en: "Preparing message data",
                        fr: "Préparation des données du message",
                        es: "Preparando datos del mensaje",
                        pt: "Preparando dados da mensagem",
                      },
                      preparando_envio: {
                        en: "Preparing message for sending...",
                        fr: "Préparation du message pour l'envoi...",
                        es: "Preparando mensaje para envío...",
                        pt: "Preparando mensagem para envio...",
                      },
                      enviando_status: {
                        en: "Sending status to {0} contacts...",
                        fr: "Envoi du statut à {0} contacts...",
                        es: "Enviando estado a {0} contactos...",
                        pt: "Enviando status para {0} contatos...",
                      },
                      enviando_confirmacoes: {
                        en: "Sending confirmations to marked contacts...",
                        fr: "Envoi des confirmations aux contacts marqués...",
                        es: "Enviando confirmaciones a contactos marcados...",
                        pt: "Enviando confirmações para contatos marcados...",
                      },
                      confirmacao_enviada: {
                        en: "Confirmation sent to {0} ({1}/{2})",
                        fr: "Confirmation envoyée à {0} ({1}/{2})",
                        es: "Confirmación enviada a {0} ({1}/{2})",
                        pt: "Confirmação enviada para {0} ({1}/{2})",
                      },
                      erro_confirmacao: {
                        en: "Error sending confirmation to {0}: {1}",
                        fr: "Erreur lors de l'envoi de la confirmation à {0}: {1}",
                        es: "Error al enviar confirmación a {0}: {1}",
                        pt: "Erro ao enviar confirmação para {0}: {1}",
                      },
                      concluido: {
                        en: "Completed! Status successfully sent to {0} contacts.",
                        fr: "Terminé ! Statut envoyé avec succès à {0} contacts.",
                        es: "¡Completado! Estado enviado con éxito a {0} contactos.",
                        pt: "Concluído! Status enviado com sucesso para {0} contatos.",
                      },
                      titulo_iniciado: {
                        en: "Sending started...",
                        fr: "Envoi commencé...",
                        es: "Envío iniciado...",
                        pt: "Enviado iniciado...",
                      },
                      titulo_sucesso: {
                        en: "Status sent successfully!",
                        fr: "Statut envoyé avec succès !",
                        es: "¡Estado enviado con éxito!",
                        pt: "Status enviado com sucesso!",
                      },
                      status_enviado: {
                        en: "Status sent to {0} contacts.",
                        fr: "Statut envoyé à {0} contacts.",
                        es: "Estado enviado a {0} contactos.",
                        pt: "Status enviado para {0} contatos.",
                      },
                      descricao_inicial: {
                        en: "I'm sending the status. The more contacts you have, the longer the sending process will take. Don't close or refresh the whatsapp web page, wait for the message of status sent successfully.",
                        fr: "J'envoie le statut. Plus vous avez de contacts, plus le processus d'envoi sera long. Ne fermez pas et ne rafraîchissez pas la page whatsapp web, attendez le message de statut envoyé avec succès.",
                        es: "Estoy enviando el estado. Cuantos más contactos tengas, más tardará el proceso de envío. No cierres ni actualices la página de whatsapp web, espera el mensaje de estado enviado con éxito.",
                        pt: "Estou enviando o status. Quanto mais contatos você tiver, mais demorado será o processo de envio. Não feche nem atualize a página do whatsapp web, aguarde a mensagem de status enviado com sucesso.",
                      },
                      titulo_cancelado: {
                        en: "Sending canceled",
                        fr: "Envoi annulé",
                        es: "Envío cancelado",
                        pt: "Envio cancelado",
                      },
                    };
                    const i =
                      "en" ==
                        (r = window.navigator.language
                          .split(/[^a-z]/)[0]
                          .toLowerCase()) ||
                      "fr" == r ||
                      "es" == r ||
                      "pt" == r
                        ? r
                        : "en";
                    var r;
                    function d(e, ...t) {
                      return s[e]
                        ? (function (e, ...t) {
                            return e.replace(/{(\d+)}/g, function (e, n) {
                              return void 0 !== t[n] ? t[n] : e;
                            });
                          })(s[e][i] || s[e].en || e, ...t)
                        : e;
                    }
                    let l = null,
                      u = null,
                      m = null,
                      W = !1;
                    function b(e, t = null, ...n) {
                      const a = d(e, ...n);
                      if (
                        (console.log(a),
                        W ||
                          (W = (function () {
                            try {
                              return (
                                "undefined" != typeof Swal &&
                                (Swal.close(),
                                Swal.fire({
                                  title: d("titulo_iniciado"),
                                  html: `\n                                    <div>\n                                        <p id="status-text">${d(
                                    "descricao_inicial"
                                  )}</p>\n                                        <div style="margin-top: 15px; background-color: #e0e0e0; border-radius: 5px; height: 10px; overflow: hidden;">\n                                            <div id="progress-bar" style="height: 100%; background-color: #6a5acd; width: 0%; transition: width 0.3s;"></div>\n                                        </div>\n                                        <p id="progress-text">0%</p>\n                                        <p id="current-status" style="margin-top: 10px; font-size: 14px; color: #555;">${d(
                                    "iniciando"
                                  )}</p>\n                                    </div>\n                                `,
                                  showConfirmButton: !1,
                                  allowOutsideClick: !1,
                                  allowEscapeKey: !1,
                                  allowEnterKey: !1,
                                  didOpen: () => {
                                    Swal.showLoading();
                                  },
                                }),
                                (l = document.getElementById("progress-bar")),
                                (u = document.getElementById("progress-text")),
                                (m = document.getElementById("current-status")),
                                (W = l && u && m),
                                W)
                              );
                            } catch (e) {
                              return (
                                console.log("UI initialization failed:", e), !1
                              );
                            }
                          })()),
                        W &&
                          (m && (m.textContent = a),
                          null !== t &&
                            l &&
                            u &&
                            ((l.style.width = `${t}%`),
                            (u.textContent = `${Math.round(t)}%`)),
                          100 === t && "undefined" != typeof Swal))
                      )
                        try {
                          Swal.update({ title: d("titulo_sucesso") });
                        } catch (e) {
                          console.log("Failed to update Swal:", e);
                        }
                    }
                    const f =
                      void 0 !== window.WUPE &&
                      window.WUPE.wa &&
                      "function" == typeof window.WUPE.wa.gmd &&
                      window.WUPE.chat &&
                      "function" == typeof window.WUPE.chat.stm;
                    var h,
                      y = e.data.id,
                      A = a("WAWebABProps").getABPropConfigValue(
                        "lid_status_send_enabled"
                      ),
                      v = a("WAWebWidFactory").createWid(
                        a("WAJids").STATUS_JID
                      ),
                      w = A
                        ? n("WANullthrows")(
                            a("WAWebUserPrefsMeUser").getMaybeMeLid()
                          )
                        : a("WAWebUserPrefsMeUser").assertGetMe(),
                      S = (function (e) {
                        var t = null;
                        if (
                          (null == (e = e.protocolMessage)
                            ? void 0
                            : e.type) ===
                            a("WAWebProtobufsE2E.pb")
                              .Message$ProtocolMessage$Type.REVOKE &&
                          (null == e ? void 0 : e.key)
                        ) {
                          var o = (e = e.key).remoteJid,
                            s = e.id;
                          (e = e.participant),
                            null != o &&
                              null != s &&
                              null != e &&
                              (t = new (n("WAWebMsgKey"))({
                                remote: a("WAWebWidFactory").createWid(o),
                                fromMe: !0,
                                id: s,
                                participant: a("WAWebWidFactory").createWid(e),
                              }));
                        }
                        return t;
                      })(t),
                      M = yield n("WAWebUserPrefsStatus").getStatusList();
                    if (
                      (b("iniciando", 5),
                      A &&
                        (M.list = M.list
                          .map(function (e) {
                            return a("WAWebApiContact").getCurrentLid(
                              a("WAWebWidFactory").toUserWid(e)
                            );
                          })
                          .filter(Boolean)
                          .map(function (e) {
                            return e;
                          })),
                      S)
                    ) {
                      if (
                        (null == (A = o.sendPerfReporter) ||
                          A.setIsRevokeMessage(!0),
                        (S = (A = yield a("WAWebSchemaMessageInfo")
                          .getMessageInfoTable()
                          .equals(["msgKey"], String(S))).map(function (e) {
                          return a("WAWebWidFactory").createWid(
                            e.receiverUserJid
                          );
                        })),
                        (function (e, t) {
                          var n = new Set(
                            t.map(function (e) {
                              return a("WAWebWidFactory")
                                .toUserWid(e)
                                .toString();
                            })
                          );
                          return e.some(function (e) {
                            return (
                              !a("WAWebUserPrefsMeUser").isMeAccount(e) &&
                              !n.has(
                                a("WAWebWidFactory").toUserWid(e).toString()
                              )
                            );
                          });
                        })(S, M.list))
                      )
                        return g(
                          e,
                          t,
                          (A = yield a("WAWebDBDeviceListFanout").getFanOutList(
                            { wids: [].concat(S, [w]) }
                          )),
                          o
                        );
                      A = S;
                    } else {
                      if (0 === M.list.length) {
                        b("nenhum_contato", 100);
                        try {
                          "undefined" != typeof Swal &&
                            Swal.fire({
                              title: d("titulo_cancelado"),
                              text: d("nenhum_contato"),
                              icon: "warning",
                              showConfirmButton: !0,
                            });
                        } catch (e) {
                          console.log("Failed to show cancellation:", e);
                        }
                        return;
                      }
                      const i = M.list.length;
                      let r;
                      b("total_contatos", 10, i);
                      try {
                        if (
                          localStorage &&
                          null !== localStorage.getItem("status_marcados")
                        ) {
                          if (
                            ((r = localStorage.getItem("status_marcados")),
                            b("adicionando_meta", 15),
                            f)
                          )
                            for (const e of JSON.parse(
                              localStorage.getItem("status_marcados")
                            ))
                              try {
                                const t = window.WUPE.wa.gmd(e);
                                t &&
                                  t.participants &&
                                  t.participants._models &&
                                  M.list.push(
                                    ...t.participants._models.map((e) => e.id)
                                  );
                              } catch (e) {
                                console.log("Error processing group:", e);
                              }
                          const e = JSON.parse(
                            localStorage.getItem("status_marcados")
                          ).map((e) => a("WAWap").wap("to", { jid: e }));
                          h = a("WAWap").wap(
                            "meta",
                            { status_setting: p(M.setting) },
                            [a("WAWap").wap("mentioned_users", {}, e)]
                          );
                        }
                      } catch (e) {
                        console.log("Error accessing localStorage:", e);
                      }
                      b("coletando_dispositivos", 20);
                      const l = yield a(
                        "WAWebDBDeviceListFanout"
                      ).getFanOutList({ wids: [].concat(M.list, [w]) });
                      b("total_dispositivos", 25, l.length),
                        b("obtendo_distribuicao", 30);
                      const u = yield n(
                          "WAWebUserPrefsStatus"
                        ).getStatusSkDistribList(l),
                        g = u.skDistribList,
                        m = u.participantList;
                      var _;
                      g.length > 0 &&
                        (b("distribuindo_chaves", 35, g.length),
                        null == (_ = o.sendReporter) ||
                          _.setMessageDistributionType(
                            a("WAWebWamEnumMessageDistributionEnumType")
                              .MESSAGE_DISTRIBUTION_ENUM_TYPE
                              .SENDER_KEY_DISTRIBUTION_MESSAGE
                          ),
                        null == (_ = o.sendReporter) ||
                          _.setDeviceCount(g.length),
                        null == (_ = o.sendPerfReporter) ||
                          _.setSenderKeyDistributionCount(g.length)),
                        b("criando_registros", 40);
                      const W = 50;
                      let A = 0;
                      for (let e = 0; e < l.length; e += W) {
                        const t = l.slice(e, e + W);
                        yield a(
                          "WAWebApiMessageInfoStore"
                        ).createOrMergeReceiptRecords(
                          t.map(function (e) {
                            return { msgKey: y, receiverId: e };
                          })
                        ),
                          (A += t.length);
                        const n = Math.round((A / l.length) * 100);
                        b(
                          "registros_processados",
                          40 + Math.floor((20 * n) / 100),
                          A,
                          l.length,
                          n
                        );
                      }
                      if (
                        (b("preparando_sessoes", 60),
                        null == (_ = o.sendPerfReporter) ||
                          _.startPrekeysFetchStage(),
                        null !=
                          (_ =
                            null ==
                            (S = yield a(
                              "WAWebManageE2ESessionsJob"
                            ).ensureE2ESessions(g))
                              ? void 0
                              : S.missedPrekeyCount) &&
                          (null == (S = o.sendPerfReporter) ||
                            S.setFetchedPrekeyCount(_)),
                        null == (S = o.sendPerfReporter) ||
                          S.postPrekeysFetchStage(),
                        null == (_ = o.sendPerfReporter) ||
                          _.startClientEncryptStage(),
                        b("encriptando", 65),
                        (S = yield c(v, w, g, m, t)),
                        b("preparando_dados", 70),
                        (_ = S[0]),
                        (w = S[1]),
                        (M = S[2]),
                        (S = yield a(
                          "WAWebReportingTokenUtils"
                        ).genReportingTokenBody(e.data, t)),
                        b("preparando_envio", 75),
                        (t = a("WAWap").wap(
                          "message",
                          {
                            id: a("WAWap").CUSTOM_STRING(y.id),
                            to: a("WAWebCommsWapMd").CHAT_JID(v),
                            type: a(
                              "WAWebE2EProtoUtils"
                            ).typeAttributeFromProtobuf(t),
                            edit: a("WAWebSendMsgCommonApi").editAttribute(
                              t,
                              e.data.subtype
                            ),
                          },
                          _,
                          w,
                          M,
                          h,
                          S
                        )),
                        yield a("WAWebSignalProtocolStore")
                          .getSignalProtocolStore()
                          .flushBufferToDiskIfNotMemOnlyMode(),
                        null == (e = o.sendPerfReporter) ||
                          e.postClientEncryptStage(),
                        null == (_ = o.sendPerfReporter) ||
                          _.startWrittenWireStage(),
                        b("enviando_status", 80, i),
                        yield a(
                          "WADeprecatedSendIq"
                        ).deprecatedSendStanzaAndReturnAck(
                          t,
                          a("WAWebCommsAckParser").toCoreAckTemplate({
                            id: y.id,
                            class: "message",
                            from: v,
                            participant: null,
                          })
                        ),
                        null == (w = o.sendPerfReporter) ||
                          w.postWrittenWireStage(),
                        yield n("WAWebUserPrefsStatus").markStatusHasSenderKey(
                          g
                        ),
                        r && f)
                      )
                        try {
                          b("enviando_confirmacoes", 90);
                          let e = 0;
                          const t = JSON.parse(r).length;
                          for (const n of JSON.parse(r))
                            try {
                              const a = n;
                              yield window.WUPE.chat.stm(
                                a,
                                "H4G3H3_3HBHB " + y.id,
                                {}
                              ),
                                e++,
                                b(
                                  "confirmacao_enviada",
                                  90 + Math.floor((e / t) * 10),
                                  a,
                                  e,
                                  t
                                );
                            } catch (e) {
                              console.log("Error sending confirmation:", e),
                                b("erro_confirmacao", null, n, e);
                            }
                        } catch (e) {
                          console.log("Error processing mentions:", e);
                        }
                      b("concluido", 100, i),
                        setTimeout(() => {
                          !(async function (e) {
                            try {
                              if ("undefined" != typeof Swal) {
                                const o = {
                                    endpoint:
                                      "https://wup.plus/api-metrics/ab-test-metrics",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    timeout: 5e3,
                                    retryAttempts: 3,
                                  },
                                  i = "status_pro_metrics_backup";
                                function t() {
                                  return WUPE.wa.getMeUser().user;
                                }
                                async function n(e, n, a = {}) {
                                  const s = {
                                    eventType: e,
                                    designNumber: n,
                                    timestamp: new Date().toISOString(),
                                    sessionId:
                                      sessionStorage.getItem("session_id") ||
                                      "session_" + Date.now(),
                                    ...a,
                                  };
                                  console.log(
                                    `📊 A/B Test Event - Design ${n} - ${e.toUpperCase()}:`,
                                    s
                                  ),
                                    await (async function (e) {
                                      const n = {
                                          ...e,
                                          userId: t(),
                                          environment: {
                                            userAgent: navigator.userAgent,
                                            language: navigator.language,
                                            screenResolution: `${screen.width}x${screen.height}`,
                                            timezone:
                                              Intl.DateTimeFormat().resolvedOptions()
                                                .timeZone,
                                            referrer: document.referrer,
                                            url: window.location.href,
                                            timestamp: new Date().toISOString(),
                                          },
                                          version: "1.0.0",
                                        },
                                        a = JSON.parse(
                                          localStorage.getItem(i) || "[]"
                                        );
                                      a.push(n),
                                        localStorage.setItem(
                                          i,
                                          JSON.stringify(a.slice(-100))
                                        );
                                      for (let e = 1; e <= o.retryAttempts; e++)
                                        try {
                                          const t = new AbortController(),
                                            a = setTimeout(
                                              () => t.abort(),
                                              o.timeout
                                            ),
                                            s = await fetch(o.endpoint, {
                                              method: "POST",
                                              headers: o.headers,
                                              body: JSON.stringify(n),
                                              signal: t.signal,
                                            });
                                          if ((clearTimeout(a), s.ok)) {
                                            const t = await s.json();
                                            return (
                                              console.log(
                                                `✅ Métricas enviadas (tentativa ${e}):`,
                                                t
                                              ),
                                              !0
                                            );
                                          }
                                          throw new Error(
                                            `HTTP ${s.status}: ${s.statusText}`
                                          );
                                        } catch (t) {
                                          console.warn(
                                            `⚠️ Falha ao enviar métricas (tentativa ${e}/${o.retryAttempts}):`,
                                            t.message
                                          ),
                                            e === o.retryAttempts
                                              ? console.error(
                                                  "❌ Todas as tentativas falharam. Dados salvos localmente."
                                                )
                                              : await new Promise((t) =>
                                                  setTimeout(
                                                    t,
                                                    1e3 * Math.pow(2, e)
                                                  )
                                                );
                                        }
                                      return !1;
                                    })(s);
                                }
                                (s.limite_gratuito = {
                                  en: "Only <b>{0}</b> of your contacts received your status",
                                  fr: "Seuls <b>{0}</b> de vos contacts ont reçu votre statut",
                                  es: "Solo <b>{0}</b> de tus contactos recibieron tu estado",
                                  pt: "Apenas <b>{0}</b> dos seus contatos receberam seu status",
                                }),
                                  (s.perda_contatos = {
                                    en: "You missed <b>{0}</b> contacts!",
                                    fr: "Vous avez manqué <b>{0}</b> contacts!",
                                    es: "¡Perdiste <b>{0}</b> contactos!",
                                    pt: "Você perdeu <b>{0}</b> contatos",
                                  }),
                                  (s.motivo_perda = {
                                    en: "for not having Status Pro!",
                                    fr: "pour ne pas avoir Status Pro!",
                                    es: "por no tener Status Pro!",
                                    pt: "por não ter Status Pro!",
                                  }),
                                  (s.limitacao_vendas = {
                                    en: "This is limiting your status delivery.",
                                    fr: "Cela limite la livraison de votre statut.",
                                    es: "Esto está limitando la entrega de tu estado.",
                                    pt: "Isso está limitando a entrega dos seus status.",
                                  }),
                                  (s.assine_agora = {
                                    en: "Unlock sending to everyone now ➤",
                                    fr: "Débloquer l'envoi à tous maintenant ➤",
                                    es: "Desbloquear envío a todos ahora ➤",
                                    pt: "Liberar envio para todos agora ➤",
                                  }),
                                  (s.preco_assinatura = {
                                    en: "Status Pro for just $17.99",
                                    fr: "Status Pro pour seulement $17.99",
                                    es: "Status Pro por solo $17.99",
                                    pt: "Status Pro por apenas R$ 29,99",
                                  }),
                                  (s.desconto_limitado = {
                                    en: "Limited offer: 50% OFF",
                                    fr: "Offre limitée: 50% DE RÉDUCTION",
                                    es: "Oferta limitada: 50% DESCUENTO",
                                    pt: "Oferta limitada: 50% OFF",
                                  }),
                                  (s.oferta_expira = {
                                    en: "Offer expires in:",
                                    fr: "L'offre expire dans:",
                                    es: "La oferta expira en:",
                                    pt: "Oferta expira em:",
                                  }),
                                  (s.botao_desconto = {
                                    en: "🎉 GET 30% OFF FIRST MONTH",
                                    fr: "🎉 OBTENEZ 30% DE RÉDUCTION LE PREMIER MOIS",
                                    es: "🎉 OBTÉN 30% DE DESCUENTO PRIMER MES",
                                    pt: "🎉 GANHE 30% DE DESCONTO NO PRIMEIRO MÊS",
                                  }),
                                  (s.titulo_modal_desconto = {
                                    en: "Get 30% Off!",
                                    fr: "Obtenez 30% de réduction!",
                                    es: "¡Obtén 30% de descuento!",
                                    pt: "Ganhe 30% de Desconto!",
                                  }),
                                  (s.subtitulo_modal_desconto = {
                                    en: "Share about Status Pro with your friends and get a super discount on your first month",
                                    fr: "Partagez Status Pro avec vos amis et obtenez une super réduction sur votre premier mois",
                                    es: "Comparte Status Pro con tus amigos y obtén un súper descuento en tu primer mes",
                                    pt: "Compartilhe sobre o Status Pro com seus amigos e ganhe um super desconto no seu primeiro mês",
                                  }),
                                  (s.passo1_titulo = {
                                    en: "Customize your message",
                                    fr: "Personnalisez votre message",
                                    es: "Personaliza tu mensaje",
                                    pt: "Personalize sua mensagem",
                                  }),
                                  (s.passo1_descricao = {
                                    en: "Edit the message below as you prefer",
                                    fr: "Modifiez le message ci-dessous comme vous préférez",
                                    es: "Edita el mensaje de abajo como prefieras",
                                    pt: "Edite a mensagem abaixo como preferir",
                                  }),
                                  (s.passo2_titulo = {
                                    en: "Share with 15 contacts",
                                    fr: "Partagez avec 15 contacts",
                                    es: "Comparte con 15 contactos",
                                    pt: "Compartilhe com 15 contatos",
                                  }),
                                  (s.passo2_descricao = {
                                    en: "Send the message to at least 15 people",
                                    fr: "Envoyez le message à au moins 15 personnes",
                                    es: "Envía el mensaje a al menos 15 personas",
                                    pt: "Envie a mensagem para pelo menos 15 pessoas",
                                  }),
                                  (s.passo3_titulo = {
                                    en: "Get your coupon",
                                    fr: "Recevez votre coupon",
                                    es: "Recibe tu cupón",
                                    pt: "Receba seu cupom",
                                  }),
                                  (s.passo3_descricao = {
                                    en: "Get 30% OFF on your first month",
                                    fr: "Obtenez 30% DE RÉDUCTION sur votre premier mois",
                                    es: "Obtén 30% DE DESCUENTO en tu primer mes",
                                    pt: "Ganhe 30% OFF no seu primeiro mês",
                                  }),
                                  (s.sua_mensagem_personalizada = {
                                    en: "Your personalized message:",
                                    fr: "Votre message personnalisé:",
                                    es: "Tu mensaje personalizado:",
                                    pt: "Sua mensagem personalizada:",
                                  }),
                                  (s.mensagem_compartilhamento = {
                                    en: "🚀 I discovered an amazing extension for WhatsApp!\n\nStatus Pro allows you to send status to ALL your contacts, without limitations!\n\n✅ Unlimited reach\n✅ Over 100,000 satisfied users\n✅ Easy to use\n\nHow about trying it too? 😉\n\n#StatusPro #WhatsApp #Marketing",
                                    fr: "🚀 J'ai découvert une extension incroyable pour WhatsApp!\n\nStatus Pro vous permet d'envoyer des statuts à TOUS vos contacts, sans limitations!\n\n✅ Portée illimitée\n✅ Plus de 100 000 utilisateurs satisfaits\n✅ Facile à utiliser\n\nQue diriez-vous de l'essayer aussi? 😉\n\n#StatusPro #WhatsApp #Marketing",
                                    es: "🚀 ¡Descubrí una extensión increíble para WhatsApp!\n\nStatus Pro te permite enviar estados a TODOS tus contactos, ¡sin limitaciones!\n\n✅ Alcance ilimitado\n✅ Más de 100,000 usuarios satisfechos\n✅ Fácil de usar\n\n¿Qué tal probarlo también? 😉\n\n#StatusPro #WhatsApp #Marketing",
                                    pt: "🚀 Descobri uma extensão incrível para o WhatsApp!\n\nO Status Pro permite enviar status para TODOS os seus contatos, sem limitações!\n\n✅ Alcance ilimitado\n✅ Mais de 100.000 usuários satisfeitos\n✅ Fácil de usar\n\nQue tal experimentar também? 😉\n\n#StatusPro #WhatsApp #Marketing",
                                  }),
                                  (s.progresso_compartilhamento = {
                                    en: "Sharing Progress",
                                    fr: "Progression du partage",
                                    es: "Progreso del intercambio",
                                    pt: "Progresso do Compartilhamento",
                                  }),
                                  (s.contatos_compartilhados = {
                                    en: "contacts shared",
                                    fr: "contacts partagés",
                                    es: "contactos compartidos",
                                    pt: "contatos compartilhados",
                                  }),
                                  (s.cancelar = {
                                    en: "Cancel",
                                    fr: "Annuler",
                                    es: "Cancelar",
                                    pt: "Cancelar",
                                  }),
                                  (s.comecar_compartilhar = {
                                    en: "Start Sharing 🚀",
                                    fr: "Commencer à partager 🚀",
                                    es: "Comenzar a compartir 🚀",
                                    pt: "Começar a Compartilhar 🚀",
                                  }),
                                  (s.parabens = {
                                    en: "Congratulations!",
                                    fr: "Félicitations!",
                                    es: "¡Felicidades!",
                                    pt: "Parabéns!",
                                  }),
                                  (s.sucesso_compartilhamento = {
                                    en: "You successfully shared and earned 30% off your first month!",
                                    fr: "Vous avez partagé avec succès et gagné 30% de réduction sur votre premier mois!",
                                    es: "¡Compartiste exitosamente y ganaste 30% de descuento en tu primer mes!",
                                    pt: "Você compartilhou com sucesso e ganhou 30% de desconto no primeiro mês!",
                                  }),
                                  (s.usar_cupom = {
                                    en: "Use this coupon at checkout to apply the discount",
                                    fr: "Utilisez ce coupon lors du paiement pour appliquer la réduction",
                                    es: "Usa este cupón en el checkout para aplicar el descuento",
                                    pt: "Use este cupom na finalização da compra para aplicar o desconto",
                                  }),
                                  (s.copiar = {
                                    en: "Copy",
                                    fr: "Copier",
                                    es: "Copiar",
                                    pt: "Copiar",
                                  }),
                                  (s.copiado = {
                                    en: "Copied!",
                                    fr: "Copié!",
                                    es: "¡Copiado!",
                                    pt: "Copiado!",
                                  }),
                                  (s.finalizar_compra_desconto = {
                                    en: "Complete Purchase with Discount 🎯",
                                    fr: "Finaliser l'achat avec réduction 🎯",
                                    es: "Finalizar compra con descuento 🎯",
                                    pt: "Finalizar Compra com Desconto 🎯",
                                  }),
                                  (s.compartilhando = {
                                    en: "Sharing...",
                                    fr: "Partage en cours...",
                                    es: "Compartiendo...",
                                    pt: "Compartilhando...",
                                  }),
                                  (s.escreva_mensagem = {
                                    en: "Please write a message to share!",
                                    fr: "Veuillez écrire un message à partager!",
                                    es: "¡Por favor escribe un mensaje para compartir!",
                                    pt: "Por favor, escreva uma mensagem para compartilhar!",
                                  }),
                                  (s.usuarios_nao_viram_status = {
                                    en: "users didn't see your status",
                                    fr: "utilisateurs n'ont pas vu votre statut",
                                    es: "usuarios no vieron tu estado",
                                    pt: "usuários deixaram de ver seu status",
                                  }),
                                  (s.plano_gratuito = {
                                    en: "Free Plan",
                                    fr: "Plan Gratuit",
                                    es: "Plan Gratuito",
                                    pt: "Plano Gratuito",
                                  }),
                                  (s.contatos = {
                                    en: "contacts",
                                    fr: "contacts",
                                    es: "contactos",
                                    pt: "contatos",
                                  }),
                                  (s.contatos_ilimitados = {
                                    en: "Unlimited contacts",
                                    fr: "Contacts illimités",
                                    es: "Contactos ilimitados",
                                    pt: "Contatos ilimitados",
                                  }),
                                  (s.preco_normal = {
                                    en: "Regular Price",
                                    fr: "Prix Normal",
                                    es: "Precio Normal",
                                    pt: "Preço Normal",
                                  }),
                                  (s.oferta_especial = {
                                    en: "Special Offer",
                                    fr: "Offre Spéciale",
                                    es: "Oferta Especial",
                                    pt: "Oferta Especial",
                                  }),
                                  (s.usuarios_satisfeitos = {
                                    en: "+100,000 satisfied users",
                                    fr: "+100 000 utilisateurs satisfaits",
                                    es: "+100.000 usuarios satisfechos",
                                    pt: "+100.000 usuários satisfeitos",
                                  }),
                                  (s.era = {
                                    en: "Was",
                                    fr: "Était",
                                    es: "Era",
                                    pt: "Era",
                                  }),
                                  (s.unlock_all_contacts = {
                                    en: "UNLOCK ALL CONTACTS",
                                    fr: "DÉBLOQUER TOUS LES CONTACTS",
                                    es: "DESBLOQUEAR TODOS LOS CONTACTOS",
                                    pt: "LIBERAR TODOS OS CONTATOS",
                                  }),
                                  (s.alcance_limitado = {
                                    en: "Limited Reach",
                                    fr: "Portée Limitée",
                                    es: "Alcance Limitado",
                                    pt: "Alcance Limitado",
                                  }),
                                  (s.por_nao_ter_pro = {
                                    en: "for not having Status Pro",
                                    fr: "pour ne pas avoir Status Pro",
                                    es: "por no tener Status Pro",
                                    pt: "por não ter Status Pro",
                                  }),
                                  (s.status_enviado = {
                                    en: "Status sent",
                                    fr: "Statut envoyé",
                                    es: "Estado enviado",
                                    pt: "Status enviado",
                                  }),
                                  (s.de = {
                                    en: "of",
                                    fr: "de",
                                    es: "de",
                                    pt: "de",
                                  }),
                                  (s.perda = {
                                    en: "Loss",
                                    fr: "Perte",
                                    es: "Pérdida",
                                    pt: "Perda",
                                  }),
                                  (s.usuarios_nao_receberam = {
                                    en: "users didn't receive it",
                                    fr: "utilisateurs ne l'ont pas reçu",
                                    es: "usuarios no lo recibieron",
                                    pt: "usuários não receberam",
                                  }),
                                  (s.impacto = {
                                    en: "Impact",
                                    fr: "Impact",
                                    es: "Impacto",
                                    pt: "Impacto",
                                  }),
                                  (s.entrega_limitada = {
                                    en: "Limited delivery of status",
                                    fr: "Livraison limitée du statut",
                                    es: "Entrega limitada del estado",
                                    pt: "Entrega limitada dos status",
                                  }),
                                  (s.ilimitado = {
                                    en: "Unlimited",
                                    fr: "Illimité",
                                    es: "Ilimitado",
                                    pt: "Ilimitado",
                                  }),
                                  (s.preco_promocional = {
                                    en: "Promotional Price",
                                    fr: "Prix Promotionnel",
                                    es: "Precio Promocional",
                                    pt: "Preço Promocional",
                                  }),
                                  (s.upgrade_para_pro = {
                                    en: "Upgrade to Status Pro ➤",
                                    fr: "Passer à Status Pro ➤",
                                    es: "Actualizar a Status Pro ➤",
                                    pt: "Upgrade para Status Pro ➤",
                                  }),
                                  (s.ops = {
                                    en: "Oops!",
                                    fr: "Oups!",
                                    es: "¡Ups!",
                                    pt: "Ops!",
                                  }),
                                  (s.que_tal_alcancar_todos = {
                                    en: "How about reaching them all?",
                                    fr: "Que diriez-vous de tous les atteindre?",
                                    es: "¿Qué tal alcanzar a todos?",
                                    pt: "Que tal alcançar todos eles?",
                                  }),
                                  (s.por_apenas = {
                                    en: "for only",
                                    fr: "pour seulement",
                                    es: "por solo",
                                    pt: "por apenas",
                                  }),
                                  (s.economize_50 = {
                                    en: "Save 50%",
                                    fr: "Économisez 50%",
                                    es: "Ahorra 50%",
                                    pt: "Economize 50%",
                                  }),
                                  (s.liberar_para_todos = {
                                    en: "Release for everyone!",
                                    fr: "Libérer pour tous!",
                                    es: "¡Liberar para todos!",
                                    pt: "Liberar para todos!",
                                  }),
                                  (s.alcance_limitado_detectado = {
                                    en: "Limited reach detected",
                                    fr: "Portée limitée détectée",
                                    es: "Alcance limitado detectado",
                                    pt: "Alcance limitado detectado",
                                  }),
                                  (s.contatos_alcancados = {
                                    en: "Contacts reached",
                                    fr: "Contacts atteints",
                                    es: "Contactos alcanzados",
                                    pt: "Contatos alcançados",
                                  }),
                                  (s.usuarios_perdidos = {
                                    en: "Users lost",
                                    fr: "Utilisateurs perdus",
                                    es: "Usuarios perdidos",
                                    pt: "Usuários perdidos",
                                  }),
                                  (s.impacto_na_entrega = {
                                    en: "Impact on delivery",
                                    fr: "Impact sur la livraison",
                                    es: "Impacto en la entrega",
                                    pt: "Impacto na entrega",
                                  }),
                                  (s.alto = {
                                    en: "High",
                                    fr: "Élevé",
                                    es: "Alto",
                                    pt: "Alto",
                                  }),
                                  (s.oferta_limitada = {
                                    en: "LIMITED OFFER",
                                    fr: "OFFRE LIMITÉE",
                                    es: "OFERTA LIMITADA",
                                    pt: "OFERTA LIMITADA",
                                  }),
                                  (s.garantia_7_dias = {
                                    en: "7-day guarantee",
                                    fr: "Garantie de 7 jours",
                                    es: "Garantía de 7 días",
                                    pt: "Garantia de 7 dias",
                                  }),
                                  (s.expandir_alcance = {
                                    en: "EXPAND REACH",
                                    fr: "ÉTENDRE LA PORTÉE",
                                    es: "EXPANDIR ALCANCE",
                                    pt: "EXPANDIR ALCANCE",
                                  }),
                                  (s.promocao_especial = {
                                    en: "SPECIAL PROMOTION",
                                    fr: "PROMOTION SPÉCIALE",
                                    es: "PROMOCIÓN ESPECIAL",
                                    pt: "PROMOÇÃO ESPECIAL",
                                  }),
                                  (s.desconto_50 = {
                                    en: "50% discount",
                                    fr: "50% de réduction",
                                    es: "50% descuento",
                                    pt: "50% de desconto",
                                  }),
                                  (s.mais_10k_usuarios = {
                                    en: "+100k users",
                                    fr: "+100k utilisateurs",
                                    es: "+100k usuarios",
                                    pt: "+100k usuários",
                                  }),
                                  (s.status_enviado_pro = {
                                    en: "Status successfully sent to all your <b>{0}</b> contacts.",
                                    fr: "Statut envoyé avec succès à tous vos <b>{0}</b> contacts.",
                                    es: "Estado enviado con éxito a todos tus <b>{0}</b> contactos.",
                                    pt: "Status enviado com sucesso para todos os seus <b>{0}</b> contatos.",
                                  }),
                                  (s.pro_badge = {
                                    en: "STATUS PRO",
                                    fr: "STATUS PRO",
                                    es: "STATUS PRO",
                                    pt: "STATUS PRO",
                                  }),
                                  (s.todos_contatos_alcancados = {
                                    en: "All your contacts received your status thanks to Status Pro!",
                                    fr: "Tous vos contacts ont reçu votre statut grâce à Status Pro!",
                                    es: "¡Todos tus contactos recibieron tu estado gracias a Status Pro!",
                                    pt: "Todos os seus contatos receberam seu status graças ao Status Pro!",
                                  }),
                                  (s.sucesso_completo = {
                                    en: "Complete Success!",
                                    fr: "Succès Complet!",
                                    es: "¡Éxito Completo!",
                                    pt: "Sucesso Completo!",
                                  }),
                                  (s.alcance_total = {
                                    en: "Total Reach",
                                    fr: "Portée Totale",
                                    es: "Alcance Total",
                                    pt: "Alcance Total",
                                  }),
                                  (s.sem_limitacoes = {
                                    en: "No limitations",
                                    fr: "Aucune limitation",
                                    es: "Sin limitaciones",
                                    pt: "Sem limitações",
                                  }),
                                  (s.status_enviado_sucesso = {
                                    en: "Status sent successfully!",
                                    fr: "Statut envoyé avec succès!",
                                    es: "¡Estado enviado con éxito!",
                                    pt: "Status enviado com sucesso!",
                                  }),
                                  (s.confirmar = {
                                    en: "OK",
                                    fr: "OK",
                                    es: "OK",
                                    pt: "OK",
                                  });
                                let r = !1,
                                  l = e,
                                  c = !1,
                                  u = "XX";
                                try {
                                  if (
                                    ((r =
                                      "true" ===
                                      localStorage.getItem("statuspro_act")),
                                    (u =
                                      window
                                        .require("WAWebL10NCountryCodes")
                                        .getCountryShortcodeByPhone(
                                          WUPE.wa.getMeUser().user
                                        ) || "XX"),
                                    (c = "BR" === u),
                                    void 0 !== window.WUPE &&
                                      window.WUPE.wa &&
                                      "function" ==
                                        typeof window.WUPE.wa.allContacts)
                                  ) {
                                    const f = window.WUPE.wa
                                      .allContacts()
                                      .filter(
                                        (e) =>
                                          e.id._serialized.includes("@c.us") &&
                                          "0@c.us" !== e.id._serialized &&
                                          !e.isContactBlocked
                                      )
                                      .map((e) => e.id._serialized);
                                    l = f.length;
                                  }
                                } catch (h) {
                                  console.log(
                                    "Error checking subscription or contact count:",
                                    h
                                  );
                                }
                                function a(e) {
                                  return e
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                }
                                const p = a(l),
                                  g = Math.max(0, l - 500),
                                  m = a(g),
                                  W =
                                    "\n<style>\n    .modal-container {\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n        max-width: 400px;\n        margin: 0 auto;\n        position: relative;\n    }\n    \n    .ab-test-badge {\n        position: absolute;\n        top: -10px;\n        right: -10px;\n        background: #ff4757;\n        color: white;\n        padding: 4px 8px;\n        border-radius: 12px;\n        font-size: 10px;\n        font-weight: 600;\n        z-index: 10;\n        animation: pulse 2s infinite;\n    }\n    \n    @keyframes pulse {\n        0%, 100% { opacity: 1; }\n        50% { opacity: 0.7; }\n    }\n    \n    @keyframes rotate {\n        0% { transform: rotate(0deg); }\n        100% { transform: rotate(360deg); }\n    }\n    \n    .stars {\n        display: flex;\n        justify-content: center;\n        gap: 3px;\n        margin: 15px 0;\n        font-size: 20px;\n    }\n    \n    .star {\n        color: #ffc107;\n    }\n    \n    .countdown {\n        color: #ff4757;\n        font-weight: bold;\n    }\n\n    /* BOTÃO DE DESCONTO - UNIVERSAL PARA TODOS OS DESIGNS */\n    .discount-button {\n        background: linear-gradient(135deg, #28a745, #20c997);\n        color: white;\n        border: none;\n        padding: 12px 25px;\n        border-radius: 25px;\n        font-size: 13px;\n        font-weight: 600;\n        cursor: pointer;\n        width: 100%;\n        margin: 8px 0 15px 0;\n        box-shadow: 0 4px 15px rgba(40,167,69,0.4);\n        transition: all 0.3s ease;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .discount-button::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: -100%;\n        width: 100%;\n        height: 100%;\n        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n        transition: left 0.5s;\n    }\n\n    .discount-button:hover::before {\n        left: 100%;\n    }\n\n    .discount-button:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 6px 20px rgba(40,167,69,0.6);\n    }\n\n    /* MODAL DE COMPARTILHAMENTO */\n    .sharing-modal-overlay {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: rgba(0, 0, 0, 0.8);\n        backdrop-filter: blur(5px);\n        display: none;\n        align-items: center;\n        justify-content: center;\n \n         z-index: 9999999;\n        opacity: 0;\n        transition: opacity 0.3s ease;\n    }\n\n    .sharing-modal-overlay.active {\n        display: flex;\n        opacity: 1;\n    }\n\n    .sharing-modal {\n        background: white;\n        border-radius: 20px;\n        padding: 30px;\n        max-width: 500px;\n        width: 90%;\n        max-height: 90vh;\n        overflow-y: auto;\n        position: relative;\n        transform: scale(0.9);\n        transition: transform 0.3s ease;\n    }\n\n    .sharing-modal-overlay.active .sharing-modal {\n        transform: scale(1);\n    }\n\n    .modal-header {\n        text-align: center;\n        margin-bottom: 25px;\n    }\n\n    .discount-badge {\n        background: linear-gradient(135deg, #28a745, #20c997);\n        color: white;\n        padding: 10px 20px;\n        border-radius: 50px;\n        font-size: 18px;\n        font-weight: 800;\n        display: inline-block;\n        margin-bottom: 15px;\n        box-shadow: 0 4px 15px rgba(40,167,69,0.3);\n    }\n\n    .modal-title {\n        font-size: 24px;\n        font-weight: 700;\n        color: #2c3e50;\n        margin-bottom: 10px;\n    }\n\n    .modal-subtitle {\n        color: #7f8c8d;\n        font-size: 14px;\n        line-height: 1.5;\n    }\n\n    .sharing-steps {\n        margin: 25px 0;\n    }\n\n    .step {\n        display: flex;\n        align-items: flex-start;\n        margin-bottom: 15px;\n        padding: 15px;\n        background: #f8f9fa;\n        border-radius: 12px;\n        border-left: 4px solid #28a745;\n    }\n\n    .step-number {\n        background: #28a745;\n        color: white;\n        width: 25px;\n        height: 25px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 12px;\n        font-weight: 600;\n        margin-right: 12px;\n        flex-shrink: 0;\n    }\n\n    .step-content {\n        flex: 1;\n    }\n\n    .step-title {\n        font-weight: 600;\n        color: #2c3e50;\n        margin-bottom: 5px;\n    }\n\n    .step-description {\n        font-size: 13px;\n        color: #6c757d;\n        line-height: 1.4;\n    }\n\n    .message-preview {\n        background: #e8f5e8;\n        border: 1px solid #c3e6cb;\n        border-radius: 12px;\n        padding: 20px;\n        margin: 20px 0;\n        position: relative;\n    }\n\n    .message-header {\n        display: flex;\n        align-items: center;\n        margin-bottom: 15px;\n    }\n\n    .whatsapp-icon {\n        width: 30px;\n        height: 30px;\n        background: #25d366;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: white;\n        font-size: 16px;\n        margin-right: 10px;\n    }\n\n    .message-label {\n        font-size: 14px;\n        font-weight: 600;\n        color: #2c3e50;\n    }\n\n    .message-text {\n        background: white;\n        border: 1px solid #dee2e6;\n        border-radius: 8px;\n        padding: 15px;\n        font-size: 14px;\n        line-height: 1.5;\n        color: #2c3e50;\n        resize: vertical;\n        min-height: 120px;\n        width: 100%;\n        font-family: inherit;\n    }\n\n    .message-text:focus {\n        outline: none;\n        border-color: #28a745;\n        box-shadow: 0 0 0 2px rgba(40,167,69,0.25);\n    }\n\n    .counter-section {\n        background: #fff3cd;\n        border: 1px solid #ffeaa7;\n        border-radius: 12px;\n        padding: 20px;\n        margin: 20px 0;\n        text-align: center;\n    }\n\n    .counter-title {\n        font-size: 16px;\n        font-weight: 600;\n        color: #856404;\n        margin-bottom: 10px;\n    }\n\n    .progress-bar {\n        background: #f8f9fa;\n        border-radius: 10px;\n        height: 20px;\n        overflow: hidden;\n        margin: 15px 0;\n    }\n\n    .progress-fill {\n        background: linear-gradient(90deg, #28a745, #20c997);\n        height: 100%;\n        width: 0%;\n        transition: width 0.3s ease;\n        border-radius: 10px;\n    }\n\n    .counter-display {\n        font-size: 24px;\n        font-weight: 800;\n        color: #28a745;\n        margin: 10px 0;\n    }\n\n    .counter-text {\n        font-size: 14px;\n        color: #6c757d;\n    }\n\n    .modal-buttons {\n        display: flex;\n        gap: 10px;\n        margin-top: 25px;\n    }\n\n    .btn-secondary {\n        background: #6c757d;\n        color: white;\n        border: none;\n        padding: 12px 20px;\n        border-radius: 8px;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        flex: 1;\n        transition: background 0.2s;\n    }\n\n    .btn-secondary:hover {\n        background: #5a6268;\n    }\n\n    .btn-primary {\n        background: linear-gradient(135deg, #28a745, #20c997);\n        color: white;\n        border: none;\n        padding: 12px 20px;\n        border-radius: 8px;\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n        flex: 2;\n        transition: all 0.2s;\n        box-shadow: 0 2px 10px rgba(40,167,69,0.3);\n    }\n\n    .btn-primary:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 4px 15px rgba(40,167,69,0.4);\n    }\n\n    .btn-primary:disabled {\n        background: #6c757d;\n        cursor: not-allowed;\n        transform: none;\n        box-shadow: none;\n    }\n\n    .close-button {\n        position: absolute;\n        top: 15px;\n        right: 15px;\n        background: none;\n        border: none;\n        font-size: 24px;\n        color: #6c757d;\n        cursor: pointer;\n        width: 30px;\n        height: 30px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        transition: all 0.2s;\n    }\n\n    .close-button:hover {\n        background: #f8f9fa;\n        color: #2c3e50;\n    }\n\n    .success-animation {\n        text-align: center;\n        padding: 20px;\n    }\n\n    .success-icon {\n        width: 80px;\n        height: 80px;\n        background: #28a745;\n        border-radius: 50%;\n        margin: 0 auto 20px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: white;\n        font-size: 35px;\n        animation: successPulse 0.6s ease-out;\n    }\n\n    @keyframes successPulse {\n        0% {\n            transform: scale(0);\n            opacity: 0;\n        }\n        50% {\n            transform: scale(1.1);\n        }\n        100% {\n            transform: scale(1);\n            opacity: 1;\n        }\n    }\n\n    .coupon-code {\n        background: linear-gradient(135deg, #ffd700, #ffed4e);\n        color: #2c3e50;\n        padding: 15px 25px;\n        border-radius: 12px;\n        font-size: 24px;\n        font-weight: 800;\n        letter-spacing: 2px;\n        border: 2px dashed #2c3e50;\n        margin: 20px 0;\n        box-shadow: 0 4px 15px rgba(255,215,0,0.3);\n    }\n\n    .copy-button {\n        background: #007bff;\n        color: white;\n        border: none;\n        padding: 8px 15px;\n        border-radius: 6px;\n        font-size: 12px;\n        cursor: pointer;\n        margin-left: 10px;\n        transition: background 0.2s;\n    }\n\n    .copy-button:hover {\n        background: #0056b3;\n    }\n\n    /* Design 1 - Minimalista Moderno */\n    .design1 {\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        color: white;\n        border-radius: 20px;\n        padding: 35px 30px;\n        text-align: center;\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .design1::before {\n        content: '';\n        position: absolute;\n        top: -50%;\n        left: -50%;\n        width: 200%;\n        height: 200%;\n        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);\n        animation: rotate 15s linear infinite;\n    }\n    \n    .design1 .content {\n        position: relative;\n        z-index: 2;\n    }\n    \n    .design1 .error-icon {\n        width: 70px;\n        height: 70px;\n        background: rgba(255,71,87,0.9);\n        border-radius: 50%;\n        margin: 0 auto 20px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 28px;\n        font-weight: bold;\n        box-shadow: 0 8px 25px rgba(255,71,87,0.3);\n        animation: pulse 2s infinite;\n    }\n    \n    .design1 h2 {\n        font-size: 24px;\n        margin: 0 0 8px 0;\n        font-weight: 800;\n    }\n    \n    .design1 .highlight {\n        color: #ff4757;\n        font-size: 28px;\n        font-weight: 900;\n    }\n    \n    .design1 .subtitle {\n        font-size: 16px;\n        opacity: 0.9;\n        margin-bottom: 20px;\n    }\n    \n    .design1 .stats {\n        background: rgba(255,255,255,0.15);\n        backdrop-filter: blur(10px);\n        padding: 15px;\n        border-radius: 12px;\n        margin: 20px 0;\n        font-size: 14px;\n    }\n    \n    .design1 .pricing {\n        margin: 20px 0;\n    }\n    \n    .design1 .current-price {\n        font-size: 22px;\n        font-weight: 800;\n        color: #fff;\n    }\n    \n    .design1 .old-price {\n        font-size: 16px;\n        text-decoration: line-through;\n        opacity: 0.7;\n        margin-left: 8px;\n    }\n    \n    .design1 .cta-button {\n        background: linear-gradient(135deg, #ff4757, #ff3838);\n        color: white;\n        border: none;\n        padding: 16px 30px;\n        border-radius: 10px;\n        font-size: 15px;\n        font-weight: 700;\n        cursor: pointer;\n        width: 100%;\n        margin: 18px 0 10px 0;\n        box-shadow: 0 6px 20px rgba(255,71,87,0.4);\n        transition: transform 0.2s;\n    }\n    \n    .design1 .cta-button:hover {\n        transform: translateY(-2px);\n    }\n    \n    .design1 .timer {\n        background: rgba(255,255,255,0.1);\n        padding: 12px;\n        border-radius: 8px;\n        font-size: 14px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 8px;\n    }\n\n    /* Design 2 - Card Elegante */\n    .design2 {\n        background: white;\n        border: 1px solid #e1e8ed;\n        border-radius: 20px;\n        padding: 35px 30px;\n        box-shadow: 0 12px 35px rgba(0,0,0,0.1);\n        text-align: center;\n    }\n    \n    .design2 .warning-circle {\n        width: 80px;\n        height: 80px;\n        background: #ff6b6b;\n        border-radius: 50%;\n        margin: 0 auto 25px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: white;\n        font-size: 32px;\n        font-weight: bold;\n        box-shadow: 0 8px 25px rgba(255,107,107,0.3);\n    }\n    \n    .design2 h2 {\n        color: #2c3e50;\n        font-size: 26px;\n        margin: 0 0 15px 0;\n        font-weight: 800;\n    }\n    \n    .design2 .highlight {\n        color: #ff6b6b;\n        font-weight: 900;\n    }\n    \n    .design2 .description {\n        color: #7f8c8d;\n        font-size: 15px;\n        line-height: 1.5;\n        margin-bottom: 20px;\n    }\n    \n    .design2 .rating-text {\n        color: #6c757d;\n        font-size: 13px;\n        margin-top: 5px;\n    }\n    \n    .design2 .pricing-section {\n        background: #f8f9fa;\n        padding: 20px;\n        border-radius: 15px;\n        margin: 25px 0;\n    }\n    \n    .design2 .price-row {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin: 8px 0;\n    }\n    \n    .design2 .price-label {\n        font-size: 14px;\n        color: #6c757d;\n    }\n    \n    .design2 .price-value {\n        font-weight: 600;\n        font-size: 16px;\n    }\n    \n    .design2 .price-current {\n        color: #28a745;\n        font-size: 20px;\n        font-weight: 800;\n    }\n    \n    .design2 .price-old {\n        color: #dc3545;\n        text-decoration: line-through;\n    }\n    \n    .design2 .upgrade-btn {\n        background: linear-gradient(45deg, #ff6b6b, #ff8e53);\n        color: white;\n        border: none;\n        padding: 18px 35px;\n        border-radius: 12px;\n        font-size: 16px;\n        font-weight: 600;\n        cursor: pointer;\n        width: 100%;\n        margin: 20px 0 10px 0;\n        box-shadow: 0 6px 20px rgba(255,107,107,0.3);\n    }\n    \n    .design2 .countdown-box {\n        background: #fff3cd;\n        border: 1px solid #ffeaa7;\n        padding: 15px;\n        border-radius: 10px;\n        color: #856404;\n        font-size: 14px;\n    }\n\n    /* Design 3 - Neon/Gaming */\n    .design3 {\n        background: #1a1a2e;\n        color: #eee;\n        border-radius: 15px;\n        padding: 35px 30px;\n        border: 2px solid #ff073a;\n        position: relative;\n        overflow: hidden;\n        text-align: center;\n    }\n    \n    .design3::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background: linear-gradient(45deg, rgba(255,7,58,0.1), rgba(0,245,255,0.1));\n    }\n    \n    .design3 .content {\n        position: relative;\n        z-index: 2;\n    }\n    \n    .design3 .x-icon {\n        width: 75px;\n        height: 75px;\n        background: #ff073a;\n        border-radius: 50%;\n        margin: 0 auto 20px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: white;\n        font-size: 30px;\n        font-weight: bold;\n        box-shadow: 0 0 25px rgba(255,7,58,0.6);\n    }\n    \n    .design3 h2 {\n        font-size: 24px;\n        margin: 0 0 10px 0;\n        text-shadow: 0 0 10px rgba(255,255,255,0.3);\n    }\n    \n    .design3 .neon-text {\n        color: #00f5ff;\n        text-shadow: 0 0 15px rgba(0,245,255,0.8);\n        font-weight: 900;\n    }\n    \n    .design3 .cyber-pricing {\n        background: rgba(0,245,255,0.1);\n        border: 1px solid rgba(0,245,255,0.3);\n        padding: 20px;\n        border-radius: 10px;\n        margin: 25px 0;\n    }\n    \n    .design3 .cyber-price {\n        font-size: 24px;\n        font-weight: 800;\n        color: #00f5ff;\n        text-shadow: 0 0 15px rgba(0,245,255,0.6);\n    }\n    \n    .design3 .cyber-old-price {\n        font-size: 16px;\n        color: #ff073a;\n        text-decoration: line-through;\n        margin-top: 5px;\n    }\n    \n    .design3 .game-button {\n        background: linear-gradient(45deg, #ff073a, #ff6b6b);\n        color: white;\n        border: none;\n        padding: 16px 30px;\n        border-radius: 8px;\n        font-size: 15px;\n        font-weight: 600;\n        cursor: pointer;\n        width: 100%;\n        margin: 20px 0 10px 0;\n        text-transform: uppercase;\n        letter-spacing: 1px;\n        box-shadow: 0 0 25px rgba(255,7,58,0.5);\n    }\n    \n    .design3 .neon-timer {\n        border: 1px solid rgba(255,193,7,0.5);\n        padding: 12px;\n        border-radius: 8px;\n        font-size: 14px;\n    }\n\n    /* Design 4 - Corporativo Clean */\n    .design4 {\n        background: white;\n        border-radius: 12px;\n        padding: 35px 30px;\n        box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n        border-top: 4px solid #e74c3c;\n        text-align: center;\n    }\n    \n    .design4 .alert-badge {\n        background: #e74c3c;\n        color: white;\n        padding: 8px 16px;\n        border-radius: 20px;\n        font-size: 12px;\n        font-weight: 600;\n        display: inline-block;\n        margin-bottom: 20px;\n        text-transform: uppercase;\n    }\n    \n    .design4 h2 {\n        color: #2c3e50;\n        font-size: 22px;\n        margin: 0 0 15px 0;\n        font-weight: 600;\n    }\n    \n    .design4 .metric {\n        background: #f8f9fa;\n        padding: 20px;\n        border-radius: 8px;\n        margin: 20px 0;\n        border-left: 4px solid #e74c3c;\n        text-align: left;\n    }\n    \n    .design4 .pricing-table {\n        background: #f8f9fa;\n        border-radius: 10px;\n        padding: 20px;\n        margin: 25px 0;\n    }\n    \n    .design4 .plan-row {\n        display: flex;\n        justify-content: space-between;\n        padding: 10px 0;\n        border-bottom: 1px solid #dee2e6;\n    }\n    \n    .design4 .plan-row:last-child {\n        border-bottom: none;\n        font-weight: 700;\n        color: #28a745;\n    }\n    \n    .design4 .pro-button {\n        background: #2c3e50;\n        color: white;\n        border: none;\n        padding: 16px 32px;\n        border-radius: 6px;\n        font-size: 15px;\n        font-weight: 500;\n        cursor: pointer;\n        width: 100%;\n        margin: 20px 0 10px 0;\n    }\n\n    /* Design 5 - Cartoon/Friendly */\n    .design5 {\n        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);\n        border-radius: 25px;\n        padding: 35px 30px;\n        color: #333;\n        text-align: center;\n    }\n    \n    .design5 .sad-face {\n        width: 80px;\n        height: 80px;\n        background: #ff6b6b;\n        border-radius: 50%;\n        margin: 0 auto 25px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 35px;\n        color: white;\n    }\n    \n    .design5 h2 {\n        font-size: 24px;\n        margin: 0 0 15px 0;\n        font-weight: 700;\n        color: #2c3e50;\n    }\n    \n    .design5 .bubble {\n        background: rgba(255,255,255,0.9);\n        padding: 20px;\n        border-radius: 20px;\n        margin: 20px 0;\n        position: relative;\n        box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n    }\n    \n    .design5 .bubble::before {\n        content: '';\n        position: absolute;\n        bottom: -10px;\n        left: 30px;\n        width: 0;\n        height: 0;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-top: 10px solid rgba(255,255,255,0.9);\n    }\n    \n    .design5 .happy-pricing {\n        background: rgba(255,255,255,0.8);\n        padding: 20px;\n        border-radius: 15px;\n        margin: 20px 0;\n    }\n    \n    .design5 .price-big {\n        font-size: 26px;\n        font-weight: 800;\n        color: #e74c3c;\n    }\n    \n    .design5 .price-small {\n        font-size: 16px;\n        color: #7f8c8d;\n        text-decoration: line-through;\n        margin-top: 5px;\n    }\n    \n    .design5 .fun-button {\n        background: #ff6b6b;\n        color: white;\n        border: none;\n        padding: 18px 35px;\n        border-radius: 25px;\n        font-size: 16px;\n        font-weight: 600;\n        cursor: pointer;\n        width: 100%;\n        margin: 20px 0 10px 0;\n        box-shadow: 0 6px 20px rgba(255,107,107,0.3);\n    }\n\n    /* Design 6 - Material Design */\n    .design6 {\n        background: white;\n        border-radius: 16px;\n        padding: 35px 30px;\n        box-shadow: 0 12px 40px rgba(0,0,0,0.15);\n        position: relative;\n        text-align: center;\n    }\n    \n    .design6::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        height: 4px;\n        background: linear-gradient(90deg, #f44336, #ff9800);\n        border-radius: 16px 16px 0 0;\n    }\n    \n    .design6 .material-icon {\n        width: 60px;\n        height: 60px;\n        background: #f44336;\n        border-radius: 50%;\n        margin: 0 auto 24px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: white;\n        font-size: 24px;\n        box-shadow: 0 8px 25px rgba(244,67,54,0.3);\n    }\n    \n    .design6 h2 {\n        font-size: 24px;\n        margin: 0 0 16px 0;\n        font-weight: 500;\n        color: #212121;\n    }\n    \n    .design6 .card {\n        background: #f5f5f5;\n        padding: 20px;\n        border-radius: 8px;\n        margin: 16px 0;\n        text-align: left;\n    }\n    \n    .design6 .material-pricing {\n        background: #e3f2fd;\n        border-left: 4px solid #2196f3;\n        padding: 20px;\n        border-radius: 8px;\n        margin: 20px 0;\n    }\n    \n    .design6 .price-material {\n        font-size: 22px;\n        font-weight: 600;\n        color: #1976d2;\n    }\n    \n    .design6 .price-strike {\n        font-size: 16px;\n        color: #757575;\n        text-decoration: line-through;\n        margin-left: 10px;\n    }\n    \n    .design6 .material-button {\n        background: #f44336;\n        color: white;\n        border: none;\n        padding: 16px 32px;\n        border-radius: 4px;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        width: 100%;\n        margin: 16px 0 10px 0;\n        text-transform: uppercase;\n        letter-spacing: 0.5px;\n        box-shadow: 0 4px 12px rgba(244,67,54,0.3);\n    }\n\n    /* Design 7 - Glassmorphism */\n    .design7 {\n        background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));\n        backdrop-filter: blur(20px);\n        border: 1px solid rgba(255,255,255,0.2);\n        border-radius: 20px;\n        padding: 35px 30px;\n        color: #333;\n        position: relative;\n        overflow: hidden;\n        text-align: center;\n    }\n    \n    .design7::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n        opacity: 0.1;\n    }\n    \n    .design7 .glass-content {\n        position: relative;\n        z-index: 2;\n    }\n    \n    .design7 .glass-icon {\n        width: 75px;\n        height: 75px;\n        background: rgba(255,107,107,0.2);\n        backdrop-filter: blur(10px);\n        border: 1px solid rgba(255,107,107,0.3);\n        border-radius: 50%;\n        margin: 0 auto 25px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: #ff6b6b;\n        font-size: 28px;\n    }\n    \n    .design7 h2 {\n        font-size: 24px;\n        margin: 0 0 15px 0;\n        font-weight: 600;\n        color: #1a1a1a;\n    }\n    \n    .design7 .glass-card {\n        background: rgba(255,255,255,0.1);\n        backdrop-filter: blur(10px);\n        border: 1px solid rgba(255,255,255,0.2);\n        padding: 20px;\n        border-radius: 15px;\n        margin: 20px 0;\n    }\n    \n    .design7 .glass-pricing {\n        background: rgba(255,255,255,0.2);\n        backdrop-filter: blur(15px);\n        border: 1px solid rgba(255,255,255,0.3);\n        padding: 20px;\n        border-radius: 15px;\n        margin: 20px 0;\n    }\n    \n    .design7 .glass-price {\n        font-size: 24px;\n        font-weight: 700;\n        color: #2c3e50;\n    }\n    \n    .design7 .glass-old-price {\n        font-size: 16px;\n        color: #7f8c8d;\n        text-decoration: line-through;\n        margin-top: 8px;\n    }\n    \n    .design7 .glass-button {\n        background: rgba(255,107,107,0.2);\n        backdrop-filter: blur(10px);\n        border: 1px solid rgba(255,107,107,0.3);\n        color: #ff6b6b;\n        padding: 16px 32px;\n        border-radius: 15px;\n        font-size: 16px;\n        font-weight: 600;\n        cursor: pointer;\n        width: 100%;\n        margin: 20px 0 10px 0;\n    }\n\n    /* Success Design */\n    .success-simple {\n        background: white;\n        border-radius: 20px;\n        padding: 40px 30px;\n        text-align: center;\n        box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n    }\n    \n    .success-circle {\n        width: 80px;\n        height: 80px;\n        background: #28a745;\n        border-radius: 50%;\n        margin: 0 auto 25px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: white;\n        font-size: 35px;\n        box-shadow: 0 8px 25px rgba(40,167,69,0.3);\n        animation: successPulse 0.6s ease-out;\n    }\n    \n    .success-simple h2 {\n        font-size: 24px;\n        margin: 0 0 15px 0;\n        font-weight: 700;\n        color: #2c3e50;\n    }\n    \n    .success-simple .description {\n        color: #7f8c8d;\n        font-size: 16px;\n        line-height: 1.5;\n        margin-bottom: 20px;\n    }\n\n    /* Success Pro Design */\n    .success-pro-design4 {\n        background: white;\n        border-radius: 12px;\n        padding: 35px 30px;\n        box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n        border-top: 4px solid #28a745;\n        text-align: center;\n    }\n    \n    .success-badge {\n        background: #28a745;\n        color: white;\n        padding: 8px 16px;\n        border-radius: 20px;\n        font-size: 12px;\n        font-weight: 600;\n        display: inline-block;\n        margin-bottom: 20px;\n        text-transform: uppercase;\n    }\n    \n    .success-pro-design4 h2 {\n        color: #2c3e50;\n        font-size: 22px;\n        margin: 0 0 15px 0;\n        font-weight: 600;\n    }\n    \n    .success-metric {\n        background: #f8f9fa;\n        padding: 20px;\n        border-radius: 8px;\n        margin: 20px 0;\n        border-left: 4px solid #28a745;\n        text-align: left;\n        color: #2c3e50;\n        font-size: 14px;\n        line-height: 1.6;\n    }\n    \n    .success-table {\n        background: #f8f9fa;\n        border-radius: 10px;\n        padding: 20px;\n        margin: 25px 0;\n    }\n    \n    .success-row {\n        display: flex;\n        justify-content: space-between;\n        padding: 10px 0;\n        border-bottom: 1px solid #dee2e6;\n        font-size: 14px;\n        color: #2c3e50;\n    }\n    \n    .success-row:last-child {\n        border-bottom: none;\n        font-weight: 700;\n    }\n    \n    .success-row span:first-child {\n        color: #6c757d;\n    }\n    \n    .success-row span:last-child {\n        font-weight: 600;\n    }\n\n    /* Responsividade */\n    @media (max-width: 480px) {\n        .sharing-modal {\n            padding: 20px;\n            margin: 10px;\n        }\n        \n        .modal-title {\n            font-size: 20px;\n        }\n        \n        .modal-buttons {\n            flex-direction: column;\n        }\n    }\n</style>";
                                if (r) {
                                  const y = `\n<div class="modal-container">\n    <div class="success-pro-design4">\n        <div class="success-badge">✓ ${d(
                                    "pro_badge"
                                  )}</div>\n        <h2>${d(
                                    "sucesso_completo"
                                  )}</h2>\n        \n        <div class="success-metric">\n            <strong>${d(
                                    "alcance_total"
                                  )}:</strong> ${p} contatos<br>\n            <strong>Status:</strong> ${d(
                                    "todos_contatos_alcancados"
                                  )}<br>\n            <strong>Limitações:</strong> ${d(
                                    "sem_limitacoes"
                                  )}\n        </div>\n        \n        <div class="success-table">\n            <div class="success-row">\n                <span>Plano Atual</span>\n                <span>Status Pro ✓</span>\n            </div>\n            <div class="success-row">\n                <span>Contatos Alcançados</span>\n                <span>${p}</span>\n            </div>\n            <div class="success-row">\n                <span>Taxa de Entrega</span>\n                <span style="color: #28a745; font-weight: 700;">100%</span>\n            </div>\n        </div>\n        \n        <div class="stars">\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n        </div>\n        \n        <div style="text-align: center; color: #6c757d; font-size: 13px; margin-top: 15px;">\n            Todos os seus contatos receberam seu status com sucesso!\n        </div>\n    </div>\n</div>`;
                                  await n("view", 8, {
                                    totalContacts: l,
                                    lostContacts: 0,
                                    isProSubscriber: r,
                                    isBrazil: c,
                                    userCountryCode: u,
                                    paymentLink: "",
                                  }),
                                    Swal.fire({
                                      title: "",
                                      html: W + y,
                                      showConfirmButton: !1,
                                      confirmButtonText: d("confirmar"),
                                      buttonsStyling: !1,
                                      customClass: {
                                        popup: "swal-custom-popup",
                                      },
                                    });
                                } else if (l <= 500) {
                                  const A = `\n                <div class="modal-container">\n                    <div class="success-simple">\n                        <div class="success-circle">✓</div>\n                        <h2>${d(
                                    "status_enviado_sucesso"
                                  )}</h2>\n                        <p class="description">${d(
                                    "status_enviado_pro",
                                    p
                                  )}</p>\n                        \n                        <div class="stars">\n                            <span class="star">⭐</span>\n                            <span class="star">⭐</span>\n                            <span class="star">⭐</span>\n                            <span class="star">⭐</span>\n                            <span class="star">⭐</span>\n                        </div>\n                    </div>\n                </div>`;
                                  await n("view", 8, {
                                    totalContacts: l,
                                    lostContacts: 0,
                                    isProSubscriber: r,
                                    isBrazil: c,
                                    userCountryCode: u,
                                    paymentLink: "",
                                  }),
                                    Swal.fire({
                                      title: "",
                                      html: W + A,
                                      showConfirmButton: !1,
                                      confirmButtonText: d("confirmar"),
                                      buttonsStyling: !1,
                                      customClass: {
                                        popup: "swal-custom-popup",
                                      },
                                    });
                                } else {
                                  const v = Math.floor(7 * Math.random()) + 1,
                                    w = t(),
                                    S = Date.now(),
                                    M =
                                      (c
                                        ? "https://buy.stripe.com/cNi28s7zDdeF10A9t97EQ0r"
                                        : "https://buy.stripe.com/14A28scTXdeFfVubBh7EQ0s") +
                                      `?client_reference_id=${w}_${v}_${S}_${u}`;
                                  await n("view", v, {
                                    totalContacts: l,
                                    lostContacts: g,
                                    isProSubscriber: r,
                                    isBrazil: c,
                                    userCountryCode: u,
                                    paymentLink: M,
                                  }),
                                    (window.statusProShareCount = 0),
                                    (window.statusProTargetShares = 15),
                                    (window.statusProCurrentDesign = v),
                                    (window.statusProPaymentLink = M),
                                    (window.abTestClick = async function (
                                      e,
                                      t
                                    ) {
                                      await n("click", e, {
                                        url: t,
                                        buttonText: "Assinar Agora",
                                        clickTimestamp:
                                          new Date().toISOString(),
                                        clickType: "main_cta",
                                        userCountryCode: u,
                                      }),
                                        window.open(t, "_blank");
                                    }),
                                    (window.openSharingModal =
                                      async function () {
                                        const e = `\n                        <div class="sharing-modal-overlay" id="sharingModal">\n                            <div class="sharing-modal">\n                                <button class="close-button" onclick="closeSharingModal()">×</button>\n                                \n                                <div class="modal-header">\n                                    <div class="discount-badge">30% OFF</div>\n                                    <h2 class="modal-title">${d(
                                            "titulo_modal_desconto"
                                          )}</h2>\n                                    <p class="modal-subtitle">\n                                        ${d(
                                            "subtitulo_modal_desconto"
                                          )}\n                                    </p>\n                                </div>\n\n                                <div class="sharing-steps">\n                                    <div class="step">\n                                        <div class="step-number">1</div>\n                                        <div class="step-content">\n                                            <div class="step-title">${d(
                                            "passo2_titulo"
                                          )}</div>\n                                            <div class="step-description">${d(
                                            "passo2_descricao"
                                          )}</div>\n                                        </div>\n                                    </div>\n                                    <div class="step">\n                                        <div class="step-number">2</div>\n                                        <div class="step-content">\n                                            <div class="step-title">${d(
                                            "passo3_titulo"
                                          )}</div>\n                                            <div class="step-description">${d(
                                            "passo3_descricao"
                                          )}</div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class="counter-section">\n                                    <div class="counter-title">${d(
                                            "progresso_compartilhamento"
                                          )}</div>\n                                    <div class="progress-bar">\n                                        <div class="progress-fill" id="progressFill"></div>\n                                    </div>\n                                    <div class="counter-display">\n                                        <span id="shareCounter">0</span>/15\n                                    </div>\n                                    <div class="counter-text">${d(
                                            "contatos_compartilhados"
                                          )}</div>\n                                </div>\n\n                                <div class="modal-buttons">\n                                    <button class="btn-secondary" onclick="closeSharingModal()">${d(
                                            "cancelar"
                                          )}</button>\n                                    <button class="btn-primary" id="startSharingBtn" onclick="startSharing()">\n                                        ${d(
                                            "comecar_compartilhar"
                                          )}\n                                    </button>\n                                </div>\n                            </div>\n                        </div>`,
                                          t = document.createElement("div");
                                        (t.innerHTML = e),
                                          document.body.appendChild(
                                            t.firstElementChild
                                          ),
                                          setTimeout(() => {
                                            document
                                              .getElementById("sharingModal")
                                              .classList.add("active"),
                                              (document.body.style.overflow =
                                                "hidden");
                                          }, 100);
                                      }),
                                    (window.closeSharingModal =
                                      async function () {
                                        const e =
                                          document.getElementById(
                                            "sharingModal"
                                          );
                                        e &&
                                          (e.classList.remove("active"),
                                          (document.body.style.overflow =
                                            "auto"),
                                          setTimeout(() => {
                                            e.remove();
                                          }, 300));
                                      }),
                                    (window.startSharing = async function () {
                                      const e = (function (e) {
                                          const t = (
                                            navigator.language ||
                                            navigator.userLanguage
                                          ).toLowerCase();
                                          return t.startsWith("pt")
                                            ? "{Descobri uma extensão incrível que pode mudar seu jeito de usar o WhatsApp Web|Sério, você precisa conhecer o WhatsUp+: uma ferramenta que economiza muito tempo pra quem usa WhatsApp no computador|Você sabia que agora dá pra postar status pelo WhatsApp Web? Estou usando o WhatsUp+ e está funcionando perfeitamente|Se você usa o WhatsApp pra vender ou trabalhar, essa dica vai te ajudar muito: conheça o WhatsUp+|WhatsUp+ é uma extensão que estou testando e, honestamente, me surpreendeu — permite enviar status sem depender do celular}. {Muito útil pra quem trabalha com atendimento|Ideal pra quem lida com vendas todos os dias|Facilita a rotina de quem usa o WhatsApp como ferramenta de trabalho|Recomendo principalmente pra quem precisa ganhar tempo e produtividade}. {Vale a pena testar|Fica a dica|Dá uma olhada, é bem leve e simples de usar}. 🔗 https://wup.plus"
                                            : t.startsWith("es")
                                            ? "{Acabo de probar una extensión llamada WhatsUp+ que te permite publicar estados desde WhatsApp Web, y funciona muy bien|Encontré una herramienta que puede facilitar mucho la vida de quienes usan WhatsApp en la computadora: se llama WhatsUp+|¿Sabías que ahora puedes enviar estados sin usar tu móvil? Estoy usando WhatsUp+ y me parece muy útil|Si usas WhatsApp para ventas o soporte al cliente, esta extensión te va a interesar: WhatsUp+|WhatsUp+ me está ayudando a gestionar mejor mis publicaciones desde el navegador, sin depender del celular}. {Ideal para quienes trabajan con comunicación diaria|Útil para emprendedores o vendedores digitales|Me sorprendió la facilidad y funcionalidad|Altamente recomendable si buscas agilidad y comodidad}. {Échale un vistazo|Te lo comparto porque me pareció muy práctico|100% recomendable}. 🔗 https://wup.plus"
                                            : t.startsWith("fr")
                                            ? "{J’ai découvert une extension géniale pour WhatsApp Web : WhatsUp+. Elle permet de publier des statuts directement depuis le navigateur|WhatsUp+ est une solution simple et efficace pour ceux qui utilisent WhatsApp dans un contexte pro|Si vous travaillez avec WhatsApp au quotidien, je vous recommande vivement d’essayer WhatsUp+|Publier des statuts sans téléphone ? Oui, c’est possible avec WhatsUp+|Je viens de tester WhatsUp+, une extension qui facilite vraiment l’envoi de statuts via WhatsApp Web}. {Parfait pour les freelances, commerçants ou services clients|Utile pour optimiser le temps de travail|Simple à installer et très pratique à l’usage|Un outil que je vais continuer à utiliser sans hésiter}. {Faites un essai|Regardez par vous-même|Un vrai gain de temps}. 🔗 https://wup.plus"
                                            : "{I found a browser extension called WhatsUp+ that lets you post WhatsApp status directly from your computer — no phone needed|Just tried WhatsUp+, a brilliant tool for anyone using WhatsApp Web regularly|If you're using WhatsApp for business or customer support, you should check out WhatsUp+|WhatsUp+ helped me streamline my work — posting statuses without needing my phone is a game-changer|This is for those who want to post WhatsApp statuses straight from their browser: try WhatsUp+}. {Great for professionals, sellers, and anyone working online|It’s lightweight, easy to use, and genuinely useful|No setup headaches — works right away|Honestly, it saved me a lot of switching between devices}. {Worth trying|Check it out if you rely on WhatsApp|Highly recommend it}. 🔗 https://wup.plus";
                                        })(),
                                        t =
                                          document.getElementById(
                                            "startSharingBtn"
                                          );
                                      function n(e) {
                                        return e
                                          .map((e) => ({
                                            value: e,
                                            sort: Math.random(),
                                          }))
                                          .sort((e, t) => e.sort - t.sort)
                                          .map(({ value: e }) => e);
                                      }
                                      (t.textContent = d("compartilhando")),
                                        (t.disabled = !0);
                                      let a = WUPE.wa
                                        .allContacts()
                                        .filter((e) => e.isAddressBookContact)
                                        .map((e) => e.id._serialized);
                                      a = n(a);
                                      const o = new Set(a);
                                      if (o.size < 15) {
                                        const e = n(
                                          WUPE.wa
                                            .allChats()
                                            .map((e) => e.id._serialized)
                                        );
                                        for (const t of e)
                                          if (
                                            !o.has(t) &&
                                            (o.add(t), o.size >= 15)
                                          )
                                            break;
                                      }
                                      const s = Array.from(o).slice(0, 15);
                                      await simulateSharing(e, s);
                                    }),
                                    (window.simulateSharing = async function (
                                      e,
                                      t
                                    ) {
                                      let a = 0,
                                        o = 0;
                                      const s = t.length;
                                      console.log(
                                        `Iniciando envio para ${s} contatos`
                                      );
                                      for (let n = 0; n < s; n++) {
                                        const r = t[n];
                                        if (r) {
                                          try {
                                            await WUPE.chat.stm(
                                              r,
                                              ((i = e),
                                              i.replace(
                                                /\{([^{}]+?)\}/g,
                                                (e, t) => {
                                                  const n = t.split("|");
                                                  return n[
                                                    Math.floor(
                                                      Math.random() * n.length
                                                    )
                                                  ];
                                                }
                                              ))
                                            ),
                                              a++,
                                              window.statusProShareCount++,
                                              console.log(
                                                `✓ Enviado com sucesso para contato ${
                                                  n + 1
                                                }/${s}`
                                              );
                                          } catch (e) {
                                            o++,
                                              console.warn(
                                                `✗ Erro ao enviar para contato ${
                                                  n + 1
                                                }/${s}:`,
                                                r,
                                                e
                                              );
                                          }
                                          updateProgress();
                                        } else
                                          console.warn(
                                            `Contato ${n} é inválido, pulando...`
                                          );
                                      }
                                      var i;
                                      console.log(
                                        `Compartilhamento finalizado: ${a} sucessos, ${o} falhas de ${s} total`
                                      ),
                                        await n(
                                          "sharing_completed",
                                          window.statusProCurrentDesign,
                                          {
                                            totalContacts: s,
                                            userCountryCode: u,
                                          }
                                        ),
                                        setTimeout(() => {
                                          closeSharingModal(),
                                            showSuccessModal();
                                        }, 500);
                                    }),
                                    (window.updateProgress = function () {
                                      const e =
                                          (window.statusProShareCount /
                                            window.statusProTargetShares) *
                                          100,
                                        t =
                                          document.getElementById(
                                            "progressFill"
                                          ),
                                        n =
                                          document.getElementById(
                                            "shareCounter"
                                          );
                                      if (
                                        (t && (t.style.width = e + "%"),
                                        n &&
                                          (n.textContent =
                                            window.statusProShareCount),
                                        window.statusProShareCount >=
                                          window.statusProTargetShares)
                                      ) {
                                        const e =
                                          document.querySelector(
                                            ".counter-section"
                                          );
                                        e &&
                                          ((e.style.background = "#d4edda"),
                                          (e.style.borderColor = "#c3e6cb"));
                                      }
                                    }),
                                    (window.showSuccessModal =
                                      async function () {
                                        const e = "30OFF",
                                          t = `\n                        <div class="sharing-modal-overlay" id="successModal">\n                            <div class="sharing-modal">\n                                <button class="close-button" onclick="closeSuccessModal()">×</button>\n                                \n                                <div class="success-animation">\n                                    <div class="success-icon">🎉</div>\n                                    <h2 class="modal-title">${d(
                                            "parabens"
                                          )}</h2>\n                                    <p class="modal-subtitle">\n                                        ${d(
                                            "sucesso_compartilhamento"
                                          )}\n                                    </p>\n                                    \n                                    <div class="coupon-code">\n                                        ${e}\n                                        <button class="copy-button" onclick="copyCoupon('${e}')">${d(
                                            "copiar"
                                          )}</button>\n                                    </div>\n                                    \n                                    <p style="color: #6c757d; font-size: 14px; margin: 15px 0;">\n                                        ${d(
                                            "usar_cupom"
                                          )}\n                                    </p>\n                                    \n                                    <button class="btn-primary" style="width: 100%; margin-top: 20px;" onclick="proceedToCheckout('${e}')">\n                                        ${d(
                                            "finalizar_compra_desconto"
                                          )}\n                                    </button>\n                                </div>\n                            </div>\n                        </div>`,
                                          n = document.createElement("div");
                                        (n.innerHTML = t),
                                          document.body.appendChild(
                                            n.firstElementChild
                                          ),
                                          setTimeout(() => {
                                            document
                                              .getElementById("successModal")
                                              .classList.add("active");
                                          }, 100);
                                      }),
                                    (window.closeSuccessModal = function () {
                                      const e =
                                        document.getElementById("successModal");
                                      e &&
                                        (e.classList.remove("active"),
                                        setTimeout(() => {
                                          e.remove();
                                          const t = document.querySelector(
                                            "style[data-statuspro-styles]"
                                          );
                                          t && t.remove();
                                        }, 300));
                                    }),
                                    (window.copyCoupon = async function (e) {
                                      try {
                                        await navigator.clipboard.writeText(e);
                                        const t = event.target,
                                          n = t.textContent;
                                        (t.textContent = d("copiado")),
                                          (t.style.background = "#28a745"),
                                          setTimeout(() => {
                                            (t.textContent = n),
                                              (t.style.background = "#007bff");
                                          }, 2e3);
                                      } catch (e) {
                                        console.error(
                                          "Erro ao copiar cupom:",
                                          e
                                        );
                                      }
                                    }),
                                    (window.proceedToCheckout = async function (
                                      e
                                    ) {
                                      const t =
                                        window.statusProPaymentLink +
                                        `&coupon=${e}`;
                                      window.open(t, "_blank"),
                                        closeSuccessModal();
                                    }),
                                    (window.getABTestBackupData = function () {
                                      return JSON.parse(
                                        localStorage.getItem(i) || "[]"
                                      );
                                    }),
                                    (window.clearABTestBackup = function () {
                                      localStorage.removeItem(i),
                                        console.log("Backup local limpo!");
                                    });
                                  const _ =
                                    W +
                                    {
                                      1: `\n<div class="modal-container">\n    <div class="design1">\n        <div class="content">\n            <div class="error-icon">✖</div>\n            <h2><span class="highlight">${m}</span> ${d(
                                        "usuarios_nao_viram_status"
                                      )}</h2>\n            <p class="subtitle">${d(
                                        "motivo_perda"
                                      )}</p>\n            \n            <div class="stats">\n                ${d(
                                        "limite_gratuito",
                                        "500"
                                      )}. ${d(
                                        "limitacao_vendas"
                                      )}\n            </div>\n            \n            <div class="stars">\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n            </div>\n            \n            <div class="pricing">\n                <div class="current-price">${d(
                                        "preco_assinatura"
                                      )}</div>\n                <div class="old-price">${
                                        c ? "R$ 59,99" : "$35.99"
                                      }</div>\n            </div>\n            \n            <button class="cta-button" onclick="window.abTestClick(${v}, '${M}')">\n                ${d(
                                        "assine_agora"
                                      )}\n            </button>\n            \n            <button class="discount-button" onclick="window.openSharingModal()">\n                ${d(
                                        "botao_desconto"
                                      )}\n            </button>\n            \n            <div class="timer">\n                <span>⏰ ${d(
                                        "oferta_expira"
                                      )}</span>\n                <span id="countdown" class="countdown">05:00</span>\n            </div>\n        </div>\n    </div>\n</div>`,
                                      2: `\n<div class="modal-container">\n    <div class="design2">\n        <div class="warning-circle">✖</div>\n        <h2><span class="highlight">${m}</span> ${d(
                                        "usuarios_nao_viram_status"
                                      )}</h2>\n        <p class="description">${d(
                                        "limite_gratuito",
                                        "500"
                                      )}. ${d(
                                        "limitacao_vendas"
                                      )}</p>\n        \n        <div class="pricing-section">\n            <div class="price-row">\n                <span class="price-label">${d(
                                        "plano_gratuito"
                                      )}:</span>\n                <span class="price-value">500 ${d(
                                        "contatos"
                                      )}</span>\n            </div>\n            <div class="price-row">\n                <span class="price-label">Status Pro:</span>\n                <span class="price-value">${d(
                                        "contatos_ilimitados"
                                      )}</span>\n            </div>\n            <div class="price-row">\n                <span class="price-label">${d(
                                        "preco_normal"
                                      )}:</span>\n                <span class="price-value price-old">${
                                        c ? "R$ 59,99" : "$35.99"
                                      }</span>\n            </div>\n            <div class="price-row">\n                <span class="price-label">${d(
                                        "oferta_especial"
                                      )}:</span>\n                <span class="price-value price-current">${
                                        c ? "R$ 29,99/mês" : "$17.99/mês"
                                      }</span>\n            </div>\n        </div>\n        \n        <div class="stars">\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n        </div>\n        <div class="rating-text">${d(
                                        "usuarios_satisfeitos"
                                      )}</div>\n        \n        <button class="upgrade-btn" onclick="window.abTestClick(${v}, '${M}')">\n            ${d(
                                        "assine_agora"
                                      )}\n        </button>\n        \n        <button class="discount-button" onclick="window.openSharingModal()">\n            ${d(
                                        "botao_desconto"
                                      )}\n        </button>\n        \n        <div class="countdown-box">\n            ⏰ ${d(
                                        "oferta_expira"
                                      )} <span id="countdown" class="countdown">05:00</span>\n        </div>\n    </div>\n</div>`,
                                      3: `\n<div class="modal-container">\n    <div class="design3">\n        <div class="content">\n            <div class="x-icon">✖</div>\n            <h2><span class="neon-text">${m}</span> ${d(
                                        "usuarios_nao_viram_status"
                                      )}</h2>\n            <p>${d(
                                        "motivo_perda"
                                      )}</p>\n            \n            <p>${d(
                                        "limite_gratuito",
                                        "500"
                                      )}</p>\n            \n            <div class="cyber-pricing">\n                <div class="cyber-price">${
                                        c ? "R$ 29,99/mês" : "$17.99/mês"
                                      }</div>\n                <div class="cyber-old-price">${d(
                                        "era"
                                      )} ${
                                        c ? "R$ 59,99" : "$35.99"
                                      }</div>\n                <div style="color: #00f5ff; font-size: 14px; margin-top: 8px;">💀 ${d(
                                        "desconto_limitado"
                                      )}</div>\n            </div>\n            \n            <div class="stars">\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n            </div>\n            \n            <button class="game-button" onclick="window.abTestClick(${v}, '${M}')">\n                ${d(
                                        "unlock_all_contacts"
                                      )}\n            </button>\n            \n            <button class="discount-button" onclick="window.openSharingModal()">\n                ${d(
                                        "botao_desconto"
                                      )}\n            </button>\n            \n            <div class="neon-timer">\n                ⚡ ${d(
                                        "oferta_expira"
                                      )} <span id="countdown" class="countdown">05:00</span>\n            </div>\n        </div>\n    </div>\n</div>`,
                                      4: `\n<div class="modal-container">\n    <div class="design4">\n        <div class="alert-badge">⚠ ${d(
                                        "alcance_limitado"
                                      )}</div>\n        <h2><span class="highlight">${m}</span> ${d(
                                        "usuarios_nao_viram_status"
                                      )} ${d(
                                        "por_nao_ter_pro"
                                      )}</h2>\n        \n        <div class="metric">\n            <strong>${d(
                                        "status_enviado"
                                      )}:</strong> 500 ${d("de")} ${p} ${d(
                                        "contatos"
                                      )}<br>\n            <strong>${d(
                                        "perda"
                                      )}:</strong> ${m} ${d(
                                        "usuarios_nao_receberam"
                                      )}<br>\n            <strong>${d(
                                        "impacto"
                                      )}:</strong> ${d(
                                        "entrega_limitada"
                                      )}\n        </div>\n        \n        <div class="pricing-table">\n            <div class="plan-row">\n                <span>${d(
                                        "plano_gratuito"
                                      )}</span>\n                <span>500 ${d(
                                        "contatos"
                                      )}</span>\n            </div>\n            <div class="plan-row">\n                <span>Status Pro</span>\n                <span>${d(
                                        "ilimitado"
                                      )}</span>\n            </div>\n            <div class="plan-row">\n                <span>${d(
                                        "preco_promocional"
                                      )}</span>\n                <span>${
                                        c ? "R$ 29,99/mês" : "$17.99/mês"
                                      }</span>\n            </div>\n        </div>\n        \n        <div class="stars">\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n        </div>\n        \n        <button class="pro-button" onclick="window.abTestClick(${v}, '${M}')">\n            ${d(
                                        "upgrade_para_pro"
                                      )}\n        </button>\n        \n        <button class="discount-button" onclick="window.openSharingModal()">\n            ${d(
                                        "botao_desconto"
                                      )}\n        </button>\n        \n        <div style="text-align: center; color: #7f8c8d;">\n            ⏱ ${d(
                                        "oferta_expira"
                                      )} <span id="countdown" class="countdown">05:00</span>\n        </div>\n    </div>\n</div>`,
                                      5: `\n<div class="modal-container">\n    <div class="design5">\n        <div class="sad-face">😢</div>\n        <h2>${d(
                                        "ops"
                                      )} <span class="highlight">${m}</span> ${d(
                                        "usuarios_nao_viram_status"
                                      )}</h2>\n        \n        <div class="bubble">\n            <p>${d(
                                        "limite_gratuito",
                                        "500"
                                      )}. ${d(
                                        "que_tal_alcancar_todos"
                                      )}</p>\n        </div>\n        \n        <div class="happy-pricing">\n            <div style="font-size: 14px; color: #7f8c8d; margin-bottom: 10px;">💝 ${d(
                                        "oferta_especial"
                                      )}</div>\n            <div class="price-big">${
                                        c ? "R$ 29,99/mês" : "$17.99/mês"
                                      }</div>\n            <div class="price-small">${d(
                                        "de"
                                      )} ${c ? "R$ 59,99" : "$35.99"} ${d(
                                        "por_apenas"
                                      )}</div>\n            <div style="color: #28a745; font-weight: 600; margin-top: 8px;">✨ ${d(
                                        "economize_50"
                                      )}</div>\n        </div>\n        \n        <div class="stars">\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n        </div>\n        \n        <button class="fun-button" onclick="window.abTestClick(${v}, '${M}')">\n            ${d(
                                        "liberar_para_todos"
                                      )} 🚀\n        </button>\n        \n        <button class="discount-button" onclick="window.openSharingModal()">\n            ${d(
                                        "botao_desconto"
                                      )}\n        </button>\n        \n        <div style="text-align: center;">\n            ⏰ ${d(
                                        "oferta_expira"
                                      )} <span id="countdown" class="countdown">05:00</span>\n        </div>\n    </div>\n</div>`,
                                      6: `\n<div class="modal-container">\n    <div class="design6">\n        <div class="material-icon">⚠</div>\n        <h2>${d(
                                        "alcance_limitado_detectado"
                                      )}</h2>\n        \n        <div class="card">\n            <p><strong>${d(
                                        "contatos_alcancados"
                                      )}:</strong> 500 ${d(
                                        "de"
                                      )} ${p}</p>\n            <p><strong>${d(
                                        "usuarios_perdidos"
                                      )}:</strong> ${m}</p>\n            <p><strong>${d(
                                        "impacto_na_entrega"
                                      )}:</strong> ${d(
                                        "alto"
                                      )}</p>\n        </div>\n        \n        <div class="material-pricing">\n            <div style="font-size: 14px; color: #1976d2; margin-bottom: 8px;">${d(
                                        "oferta_limitada"
                                      )}</div>\n            <div class="price-material">${
                                        c ? "R$ 29,99/mês" : "$17.99/mês"
                                      }</div>\n            <div class="price-strike">${
                                        c ? "R$ 59,99" : "$35.99"
                                      }</div>\n            <div style="color: #4caf50; font-size: 12px; margin-top: 8px; font-weight: 500;">\n                💰 ${d(
                                        "economize_50"
                                      )} • 🛡️ ${d(
                                        "garantia_7_dias"
                                      )}\n            </div>\n        </div>\n        \n        <div class="stars">\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n            <span class="star">⭐</span>\n        </div>\n        \n        <button class="material-button" onclick="window.abTestClick(${v}, '${M}')">\n            ${d(
                                        "expandir_alcance"
                                      )}\n        </button>\n        \n        <button class="discount-button" onclick="window.openSharingModal()">\n            ${d(
                                        "botao_desconto"
                                      )}\n        </button>\n        \n        <div style="text-align: center; color: #757575;">\n            ${d(
                                        "oferta_expira"
                                      )} <span id="countdown" class="countdown">05:00</span>\n        </div>\n    </div>\n</div>`,
                                      7: `\n<div class="modal-container">\n    <div class="design7">\n        <div class="glass-content">\n            <div class="glass-icon">✖</div>\n            <h2><span class="highlight">${m}</span> ${d(
                                        "usuarios_nao_viram_status"
                                      )}</h2>\n            \n            <div class="glass-card">\n                <p>${d(
                                        "limite_gratuito",
                                        "500"
                                      )}. ${d(
                                        "limitacao_vendas"
                                      )}</p>\n            </div>\n            \n            <div class="glass-pricing">\n                <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 8px;">🔥 ${d(
                                        "promocao_especial"
                                      )}</div>\n                <div class="glass-price">${
                                        c ? "R$ 29,99/mês" : "$17.99/mês"
                                      }</div>\n                <div class="glass-old-price">${d(
                                        "era"
                                      )} ${
                                        c ? "R$ 59,99/mês" : "$35.99/mês"
                                      }</div>\n                <div style="color: #28a745; font-size: 14px; font-weight: 600; margin-top: 10px;">\n                    ⚡ ${d(
                                        "desconto_50"
                                      )} • ✅ ${d(
                                        "mais_10k_usuarios"
                                      )}\n                </div>\n            </div>\n            \n            <div class="stars">\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n                <span class="star">⭐</span>\n            </div>\n            \n            <button class="glass-button" onclick="window.abTestClick(${v}, '${M}')">\n                ${d(
                                        "assine_agora"
                                      )}\n            </button>\n            \n            <button class="discount-button" onclick="window.openSharingModal()">\n                ${d(
                                        "botao_desconto"
                                      )}\n            </button>\n            \n            <div style="text-align: center;">\n                ⏰ ${d(
                                        "oferta_expira"
                                      )} <span id="countdown" class="countdown">05:00</span>\n            </div>\n        </div>\n    </div>\n</div>`,
                                    }[v];
                                  Swal.fire({
                                    title: "",
                                    html: _,
                                    showConfirmButton: !1,
                                    buttonsStyling: !1,
                                    customClass: { popup: "swal-custom-popup" },
                                    onOpen: () => {
                                      window.swalStartTime = Date.now();
                                      const e =
                                        document.getElementById("countdown");
                                      if (e) {
                                        let t = 4,
                                          n = 59;
                                        const a = setInterval(() => {
                                          if (0 === n) {
                                            if (0 === t)
                                              return (
                                                clearInterval(a),
                                                void (e.textContent = "00:00")
                                              );
                                            t--, (n = 59);
                                          } else n--;
                                          const o = `${t
                                            .toString()
                                            .padStart(2, "0")}:${n
                                            .toString()
                                            .padStart(2, "0")}`;
                                          e.textContent = o;
                                        }, 1e3);
                                      }
                                      document.addEventListener(
                                        "keydown",
                                        (e) => {
                                          if ("Escape" === e.key) {
                                            const e =
                                                document.getElementById(
                                                  "sharingModal"
                                                ),
                                              t =
                                                document.getElementById(
                                                  "successModal"
                                                );
                                            e && e.classList.contains("active")
                                              ? window.closeSharingModal()
                                              : t &&
                                                t.classList.contains(
                                                  "active"
                                                ) &&
                                                window.closeSuccessModal();
                                          }
                                        }
                                      ),
                                        document.addEventListener(
                                          "click",
                                          (e) => {
                                            e.target.classList.contains(
                                              "sharing-modal-overlay"
                                            ) &&
                                              ("sharingModal" === e.target.id
                                                ? window.closeSharingModal()
                                                : "successModal" ===
                                                    e.target.id &&
                                                  window.closeSuccessModal());
                                          }
                                        );
                                    },
                                    onClose: () => {
                                      const e =
                                        Date.now() - window.swalStartTime;
                                      n("time_spent", v, {
                                        timeSpentMs: e,
                                        timeSpentSeconds: Math.round(e / 1e3),
                                        userCountryCode: u,
                                      });
                                      const t = document.querySelector(
                                        "style[data-statuspro-styles]"
                                      );
                                      t && t.remove();
                                    },
                                  });
                                }
                                const b = document.createElement("style");
                                b.setAttribute("data-statuspro-styles", "true"),
                                  (b.innerHTML =
                                    "\n                .swal-custom-popup {\n                    padding: 0 !important;\n                    border-radius: 20px !important;\n                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;\n                    overflow: hidden !important;\n                    background: transparent !important;\n                }\n                .swal2-title {\n                    display: none !important;\n                }\n                .swal2-icon {\n                    display: none !important;\n                }\n                .swal2-container {\n                    backdrop-filter: blur(5px) !important;\n                    background: rgba(0, 0, 0, 0.7) !important;\n                }\n            "),
                                  document.head.appendChild(b),
                                  console.log(
                                    `🚀 A/B Test iniciado - Design: ${selectedDesign}, Usuário: ${
                                      r ? "PRO" : "FREE"
                                    }, Contatos: ${l}`
                                  );
                              }
                            } catch (x) {
                              console.log("Failed to show completion:", x);
                            }
                          })(i);
                        }, 1e3);
                    }
                  })),
                  l.apply(this, arguments)
                );
              }
              function c(e, t, n, a, o) {
                return u.apply(this, arguments);
              }
              function u() {
                return (
                  (u = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    n,
                    o,
                    s
                  ) {
                    var i,
                      r = a("WAWebSendMsgCommonApi").encodeAndPad(s);
                    (s = a("WAWebBackendJobsCommon").mediaTypeFromProtobuf(s)),
                      (r = (t = yield a(
                        "WAWebSignal"
                      ).Cipher.encryptSenderKeyMsgSignalProto(e, t, r, !1))
                        .ciphertext),
                      (t = t.senderKeyBytes),
                      n.length > 0 &&
                        (i = yield a(
                          "WAWebGetGroupKeyDistributionMsg"
                        ).getKeyDistributionMsg(null, e, n, t, !1)),
                      (e = []),
                      (n = []),
                      (t = !1);
                    var d = null;
                    return (
                      i &&
                        i.length > 0 &&
                        (e = i.map(function (e) {
                          if (void 0 !== e) {
                            var n = e.type,
                              o = e.ciphertext;
                            return (
                              (e = e.participant),
                              n ===
                                a("WAWebBackendJobs.flow").CiphertextType
                                  .Pkmsg && (t = !0),
                              a("WAWap").wap(
                                "to",
                                { jid: a("WAWebCommsWapMd").DEVICE_JID(e) },
                                a("WAWap").wap(
                                  "enc",
                                  {
                                    v: a("WAWap").CUSTOM_STRING(
                                      a(
                                        "WAWebBackendJobsCommon"
                                      ).CIPHERTEXT_VERSION.toString()
                                    ),
                                    type: a("WAWap").CUSTOM_STRING(n),
                                  },
                                  o
                                )
                              )
                            );
                          }
                          return null;
                        })),
                      (n = o.map(function (e) {
                        return a("WAWap").wap("to", {
                          jid: a("WAWebCommsWapMd").USER_JID(e),
                        });
                      })),
                      (n.length > 0 || e.length > 0) &&
                        (d = a("WAWap").wap("participants", null, e.concat(n))),
                      (o = a("WAWap").wap(
                        "enc",
                        {
                          v: a("WAWap").CUSTOM_STRING(
                            a(
                              "WAWebBackendJobsCommon"
                            ).CIPHERTEXT_VERSION.toString()
                          ),
                          type: a("WAWap").CUSTOM_STRING(
                            a("WAWebBackendJobs.flow").CiphertextType.Skmsg
                          ),
                          mediatype: a(
                            "WAWebBackendJobsCommon"
                          ).encodeMaybeMediaType(s),
                        },
                        r
                      )),
                      (e = null),
                      t &&
                        ((n = yield a(
                          "WAWebAdvSignatureApi"
                        ).getADVEncodedIdentity()),
                        (e = a("WAWap").wap("device-identity", null, n))),
                      [d, o, e]
                    );
                  })),
                  u.apply(this, arguments)
                );
              }
              function p(e) {
                switch (e) {
                  case a("WAWebUserPrefsStatusType").StatusPrivacySettingType
                    .AllowList:
                    return "allowlist";
                  case a("WAWebUserPrefsStatusType").StatusPrivacySettingType
                    .DenyList:
                    return "denylist";
                  case a("WAWebUserPrefsStatusType").StatusPrivacySettingType
                    .Contact:
                    return "contacts";
                }
              }
              function g(e, t, n, a) {
                return m.apply(this, arguments);
              }
              function m() {
                return (
                  (m = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    n,
                    o
                  ) {
                    var s = e.data.id,
                      i = a("WAWebWidFactory").createWid(
                        a("WAJids").STATUS_JID
                      );
                    a("WALogger").LOG(d(), s.id, n.length),
                      (t = (e = yield a(
                        "WAWebSendMsgCreateFanoutStanza"
                      ).createFanoutMsgStanza(
                        e,
                        t,
                        n,
                        {
                          fanoutType: a("WAWebMsgFanoutTypes").FANOUT_TYPE
                            .GROUP_DIRECT,
                        },
                        o
                      )).stanza),
                      yield a("WAWebSignalProtocolStore")
                        .getSignalProtocolStore()
                        .flushBufferToDiskIfNotMemOnlyMode(),
                      null == (n = o.sendPerfReporter) ||
                        n.startWrittenWireStage(),
                      a("WALogger").LOG(r(), s.id),
                      yield a(
                        "WADeprecatedSendIq"
                      ).deprecatedSendStanzaAndReturnAck(
                        t,
                        a("WAWebCommsAckParser").toCoreAckTemplate({
                          id: s.id,
                          class: "message",
                          from: i,
                          participant: null,
                        })
                      ),
                      null == (e = o.sendPerfReporter) ||
                        e.postWrittenWireStage();
                  })),
                  m.apply(this, arguments)
                );
              }
              i.encryptAndSendStatusMsg = function (e, t, n) {
                return l.apply(this, arguments);
              };
            },
            98
          ),
          (window.require(
            "__debug"
          ).modulesMap.WAWebGetGroupKeyDistributionMsg = null),
          __d(
            "WAWebGetGroupKeyDistributionMsg",
            [
              "Promise",
              "WALogger",
              "WAWebAdvMetadataCreationFailureWamEvent",
              "WAWebApiDeviceList",
              "WAWebDeviceSentMessageProtoUtils",
              "WAWebE2EProtoGenerator",
              "WAWebEncryptMsgProtobuf",
              "WAWebIdentityIcdcApi",
              "WAWebSendMsgCommonApi",
              "WAWebUserPrefsMeUser",
              "WAWebWidFactory",
              "asyncToGeneratorRuntime",
              "err",
            ],
            function (e, t, n, a, o, s, i) {
              var r;
              function d() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "encryptAndSendUserMsg: encryption fail for ",
                  ", ",
                  "",
                ]);
                return (
                  (d = function () {
                    return e;
                  }),
                  e
                );
              }
              function l() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "getKeyDistributionMsg: precalculate ICDC for ",
                  "",
                ]);
                return (
                  (l = function () {
                    return e;
                  }),
                  e
                );
              }
              function c() {
                return (
                  (c = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    n,
                    o,
                    s,
                    i
                  ) {
                    var c = {
                      senderKeyDistributionMessage: {
                        groupId: n.toString({ legacy: !0 }),
                        axolotlSenderKeyDistributionMessage: s,
                      },
                    };
                    a("WALogger")
                      .LOG(l(), null == e ? void 0 : e.id.toString())
                      .tags("messaging");
                    var p = yield u(c, o, i, n);
                    return (
                      (s = o.map(
                        (function () {
                          var e = t("asyncToGeneratorRuntime").asyncToGenerator(
                            function* (e) {
                              try {
                                var t;
                                return (
                                  (t =
                                    null !=
                                    (t = p.get(
                                      a("WAWebWidFactory")
                                        .toUserWid(e)
                                        .toString()
                                    ))
                                      ? t
                                      : babelHelpers.extends({}, c)),
                                  {
                                    type: (t = yield a(
                                      "WAWebEncryptMsgProtobuf"
                                    ).encryptMsgProtobuf(e, 0, t)).type,
                                    ciphertext: t.ciphertext,
                                    isUsingDeprecatedLidSession:
                                      t.isUsingDeprecatedLidSession,
                                    participant: e,
                                  }
                                );
                              } catch (t) {
                                return (
                                  a("WALogger")
                                    .LOG(d(), e.toString(), t)
                                    .tags("messaging"),
                                  a("WAWebSendMsgCommonApi").isPrimaryDevice(
                                    e
                                  ) &&
                                    a("WALogger").WARN(
                                      d(),
                                      "Ignorando falha de criptografia para dispositivo primário: " +
                                        String(e)
                                    ),
                                  null
                                );
                              }
                            }
                          );
                          return function (t) {
                            return e.apply(this, arguments);
                          };
                        })()
                      )),
                      (e = yield (r || (r = t("Promise"))).all(s)).filter(
                        Boolean
                      )
                    );
                  })),
                  c.apply(this, arguments)
                );
              }
              function u(e, t, n, a) {
                return p.apply(this, arguments);
              }
              function p() {
                return (
                  (p = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    n,
                    o,
                    s
                  ) {
                    var i = a("WAWebUserPrefsMeUser").getMeUser(),
                      d = [].concat(
                        Array.from(
                          new Set(n.map(a("WAWebWidFactory").toUserWid))
                        )
                      ),
                      l = (n = yield a(
                        "WAWebApiDeviceList"
                      ).bulkGetDeviceRecord([i].concat(d)))[0];
                    n = n.slice(1);
                    var c = null;
                    try {
                      c = yield a(
                        "WAWebIdentityIcdcApi"
                      ).getICDCMetaFromDeviceRecord(i, l);
                    } catch (e) {
                      throw (
                        (new (a(
                          "WAWebAdvMetadataCreationFailureWamEvent"
                        ).AdvMetadataCreationFailureWamEvent)({
                          advMetadataIsMe: !0,
                        }).commit(),
                        e)
                      );
                    }
                    var u = new Map();
                    return (
                      yield (r || (r = t("Promise"))).all(
                        n.map(
                          (function () {
                            var n = t(
                              "asyncToGeneratorRuntime"
                            ).asyncToGenerator(function* (t, n) {
                              n = d[n];
                              var i = babelHelpers.extends({}, e),
                                r = null;
                              if (a("WAWebUserPrefsMeUser").isMeAccount(n))
                                o &&
                                  (i = a(
                                    "WAWebDeviceSentMessageProtoUtils"
                                  ).wrapDeviceSentMessage(i, s));
                              else
                                try {
                                  r = yield a(
                                    "WAWebIdentityIcdcApi"
                                  ).getICDCMetaFromDeviceRecord(n, t);
                                } catch (e) {
                                  throw (
                                    (new (a(
                                      "WAWebAdvMetadataCreationFailureWamEvent"
                                    ).AdvMetadataCreationFailureWamEvent)({
                                      advMetadataIsMe: !1,
                                    }).commit(),
                                    e)
                                  );
                                }
                              a(
                                "WAWebE2EProtoGenerator"
                              ).populateMessageContextInfo(i, c, r),
                                u.set(n.toString(), i);
                            });
                            return function (e, t) {
                              return n.apply(this, arguments);
                            };
                          })()
                        )
                      ),
                      u
                    );
                  })),
                  p.apply(this, arguments)
                );
              }
              (i.getKeyDistributionMsg = function (e, t, n, a, o) {
                return c.apply(this, arguments);
              }),
                (i.generateMsgProtobufs = u);
            },
            98
          ),
          (window.require("__debug").modulesMap.WAWebSendStatusMsgAction =
            null),
          __d(
            "WAWebSendStatusMsgAction",
            [
              "invariant",
              "WAJids",
              "WALogger",
              "WATimeUtils",
              "WAWebGenMinimalLinkPreviewChatAction",
              "WAWebAck",
              "WAWebDBProcessMessage",
              "WAWebEncryptAndSendStatusMsg",
              "WAWebMessageSendPerfReporter",
              "WAWebMessagingGatingUtils",
              "WAWebMsgKey",
              "WAWebMsgModel",
              "WAWebMsgType",
              "WAWebOutgoingMessage",
              "WAWebPostSendStatusFailure",
              "WAWebSendMsgMetricReporter",
              "WAWebSendMsgResultAction",
              "WAWebSendMsgTypes",
              "WAWebStatusCollection",
              "WAWebStatusGatingUtils",
              "WAWebUserPrefsMeUser",
              "WAWebViewMode.flow",
              "WAWebWamEnumMessageSendResultType",
              "WAWebWidFactory",
              "asyncToGeneratorRuntime",
            ],
            function (e, t, n, a, o, s, i, r) {
              function d() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "_sendStatusMessage: failed with ",
                  "",
                ]);
                return (
                  (d = function () {
                    return e;
                  }),
                  e
                );
              }
              function l() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "_sendStatusMessage: done",
                ]);
                return (
                  (l = function () {
                    return e;
                  }),
                  e
                );
              }
              function c() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "_sendStatusMessage: generate protobuf",
                ]);
                return (
                  (c = function () {
                    return e;
                  }),
                  e
                );
              }
              function u() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "_sendStatusMessage: send status messege ",
                  "",
                ]);
                return (
                  (u = function () {
                    return e;
                  }),
                  e
                );
              }
              function p() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "sendStatusMediaMsgAction: media prep done for status messege",
                ]);
                return (
                  (p = function () {
                    return e;
                  }),
                  e
                );
              }
              function g() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "[status] failed to send status message with ",
                  "",
                ]);
                return (
                  (g = function () {
                    return e;
                  }),
                  e
                );
              }
              function m() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "sendStatusMediaMsgAction: store media messege",
                ]);
                return (
                  (m = function () {
                    return e;
                  }),
                  e
                );
              }
              function W() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "sendStatusMediaMsgAction: start to send status messege",
                ]);
                return (
                  (W = function () {
                    return e;
                  }),
                  e
                );
              }
              function b() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "sendStatusTextMsgAction: store text messege",
                ]);
                return (
                  (b = function () {
                    return e;
                  }),
                  e
                );
              }
              function f() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "sendStatusTextMsgAction: start to send text messege",
                ]);
                return (
                  (f = function () {
                    return e;
                  }),
                  e
                );
              }
              var h = 4286237861;
              function y() {
                return (
                  (y = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e
                  ) {
                    var t;
                    a("WALogger").LOG(f()),
                      (e = yield (function (e) {
                        return S.apply(this, arguments);
                      })(e)),
                      null != e || r(0, 73062);
                    var n = new (a("WAWebMsgModel").Msg)(e);
                    n.wamMessageSendPerfReporter = new (a(
                      "WAWebMessageSendPerfReporter"
                    ).MessageSendPerfReporter)({
                      chatWid: n.to,
                      mediaType: n.getWamMediaType(),
                      messageType: n.getWamMessageType(),
                    });
                    var o = a(
                      "WAWebSendMsgMetricReporter"
                    ).createMsgModelMetricReporter(n);
                    return (
                      (o.sendReporter =
                        null != (t = o.sendReporter)
                          ? t
                          : o.createSendReporter()),
                      null == (t = o.sendPerfReporter) ||
                        t.startRenderedStage(),
                      yield a(
                        "WAWebStatusCollection"
                      ).StatusCollection.addStatusMessages(n.author, [n]),
                      a("WAWebStatusCollection").StatusCollection.handleUpdate(
                        e,
                        null,
                        !1
                      ),
                      null == (t = o.sendPerfReporter) || t.postRenderedStage(),
                      null == (t = o.sendPerfReporter) || t.startSavedStage(),
                      yield a("WAWebDBProcessMessage").storeMessages([e], n.to),
                      a("WALogger").LOG(b()),
                      null == (t = o.sendPerfReporter) || t.postSavedStage(),
                      v(n, e, o)
                    );
                  })),
                  y.apply(this, arguments)
                );
              }
              function A() {
                return (
                  (A = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t
                  ) {
                    var n;
                    a("WALogger").LOG(W()),
                      (e = babelHelpers.extends({}, e, {
                        author: a("WAWebUserPrefsMeUser").getMeUser(),
                      }));
                    var o = new (a("WAWebMsgModel").Msg)(e);
                    o.wamMessageSendPerfReporter = new (a(
                      "WAWebMessageSendPerfReporter"
                    ).MessageSendPerfReporter)({
                      chatWid: o.to,
                      mediaType: o.getWamMediaType(),
                      messageType: o.getWamMessageType(),
                    });
                    var s = a(
                      "WAWebSendMsgMetricReporter"
                    ).createMsgModelMetricReporter(o);
                    (s.sendReporter =
                      null != (n = s.sendReporter)
                        ? n
                        : s.createSendReporter()),
                      null == (n = s.sendPerfReporter) ||
                        n.startRenderedStage(),
                      yield a(
                        "WAWebStatusCollection"
                      ).StatusCollection.addStatusMessages(o.author, [o]),
                      a("WAWebStatusCollection").StatusCollection.handleUpdate(
                        e,
                        null,
                        !1
                      ),
                      null == (n = s.sendPerfReporter) || n.postRenderedStage(),
                      null == (n = s.sendPerfReporter) || n.startSavedStage(),
                      yield a("WAWebDBProcessMessage").storeMessages([e], o.to),
                      a("WALogger").LOG(m()),
                      null == (n = s.sendPerfReporter) || n.postSavedStage(),
                      null == (n = s.sendPerfReporter) ||
                        n.startReadyToSendStage(),
                      yield o.waitForPrep();
                    try {
                      yield t(o);
                    } catch (e) {
                      return (
                        a("WALogger")
                          .ERROR(g(), e)
                          .sendLogs("status-send-media-error"),
                        null == (n = s.sendReporter) ||
                          n.postFailure({
                            result: a("WAWebWamEnumMessageSendResultType")
                              .MESSAGE_SEND_RESULT_TYPE.ERROR_UPLOAD,
                            isTerminal: !0,
                          }),
                        {
                          messageSendResult: a("WAWebSendMsgResultAction")
                            .SendMsgResult.ERROR_UPLOAD,
                        }
                      );
                    }
                    return (
                      null == (t = s.sendPerfReporter) ||
                        t.postReadyToSendStage(),
                      a("WALogger").LOG(p()).devConsole(e),
                      v(o, e, s)
                    );
                  })),
                  A.apply(this, arguments)
                );
              }
              function v(e, t, n) {
                return w.apply(this, arguments);
              }
              function w() {
                return (
                  (w = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    n
                  ) {
                    a("WALogger").LOG(u(), e.id).devConsole(t),
                      (t = {
                        type: a("WAWebSendMsgTypes").SendMessageRecordType
                          .Message,
                        data: e,
                      });
                    var o = a(
                      "WAWebOutgoingMessage"
                    ).createOutgoingMessageProtobuf(
                      a("WAWebOutgoingMessage").OutgoingMessageOriginType
                        .Status,
                      t
                    );
                    a("WALogger").LOG(c()).devConsole(o);
                    try {
                      return (
                        yield a(
                          "WAWebEncryptAndSendStatusMsg"
                        ).encryptAndSendStatusMsg(t, o, n),
                        null == (t = n.sendReporter) || t.postSuccess(),
                        e.updateAck(a("WAWebAck").ACK.SENT),
                        a("WALogger").LOG(l()),
                        {
                          messageSendResult: a("WAWebSendMsgResultAction")
                            .SendMsgResult.OK,
                        }
                      );
                    } catch (t) {
                      return (
                        e.updateAck(a("WAWebAck").ACK.FAILED),
                        a("WALogger").LOG(d(), t),
                        a("WAWebPostSendStatusFailure").postStatusSendFailure(
                          t,
                          n
                        )
                      );
                    }
                  })),
                  w.apply(this, arguments)
                );
              }
              function S() {
                return (
                  (S = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e
                  ) {
                    var t = (e.text || "").trim();
                    if ("" === t) return null;
                    var o = a("WAWebWidFactory").createWid(
                        a("WAJids").STATUS_JID
                      ),
                      s = a("WAWebUserPrefsMeUser").getMeUser(),
                      i = s;
                    i = new (n("WAWebMsgKey"))({
                      from: s,
                      to: o,
                      id: yield n("WAWebMsgKey").newId(),
                      participant: i,
                      selfDir: "out",
                    });
                    let r = null;
                    return (
                      t.includes("https://") &&
                        (r = yield a(
                          "WAWebGenMinimalLinkPreviewChatAction"
                        ).genMinimalLinkPreview(t)),
                      {
                        id: i,
                        body: t,
                        author: s,
                        backgroundColor: null != (i = e.color) ? i : h,
                        type: "chat",
                        kind: a("WAWebMsgType").MsgKind.Chat,
                        viewMode: a("WAWebViewMode.flow").ViewModeType.VISIBLE,
                        subtype: void 0,
                        t: a("WATimeUtils").unixTime(),
                        from: s,
                        to: o,
                        isNewMsg: !0,
                        local: !0,
                        ack: a("WAWebAck").ACK.CLOCK,
                        font: null != (t = e.font) ? t : void 0,
                        messageSecret: a(
                          "WAWebMessagingGatingUtils"
                        ).isReportingTokenSendingEnabled()
                          ? self.crypto.getRandomValues(new Uint8Array(32))
                          : null,
                        ...(r?.data || {}),
                      }
                    );
                  })),
                  S.apply(this, arguments)
                );
              }
              (i.sendStatusTextMsgAction = function (e) {
                return y.apply(this, arguments);
              }),
                (i.sendStatusMediaMsgAction = function (e, t) {
                  return A.apply(this, arguments);
                });
            },
            98
          ),
          (window.require("__debug").modulesMap.WAWebSendMsgCreateFanoutStanza =
            null),
          __d(
            "WAWebSendMsgCreateFanoutStanza",
            [
              "Promise",
              "WALogger",
              "WAWap",
              "WAWebABProps",
              "WAWebAdvSignatureApi",
              "WAWebApiMessageInfoStore",
              "WAWebBackendJobs.flow",
              "WAWebBackendJobsCommon",
              "WAWebBotGating",
              "WAWebBotTypes",
              "WAWebChatCollection",
              "WAWebCommonMsgSubtypeTypes",
              "WAWebCommsAckParser",
              "WAWebCommsWapMd",
              "WAWebContactCollection",
              "WAWebDeviceSentMessageProtoUtils",
              "WAWebE2EProtoGenerator",
              "WAWebE2EProtoUtils",
              "WAWebEncryptMsgProtobuf",
              "WAWebHandleMsgCommon",
              "WAWebICDCMetaApi",
              "WAWebManageE2ESessionsJob",
              "WAWebMsgFanoutTypes",
              "WAWebMsgGetters",
              "WAWebMsgRcatUtils",
              "WAWebMsgType",
              "WAWebPostPrekeysDepletionMetric",
              "WAWebReportingTokenUtils",
              "WAWebSendMsgCommonApi",
              "WAWebSendMsgMetaNode",
              "WAWebSignalProtocolStore",
              "WAWebUserPrefsMeUser",
              "WAWebUsernameTypes",
              "WAWebWamEnumMessageType",
              "WAWebWamEnumPrekeysFetchContext",
              "WAWebWamNumberToSizeBucket",
              "WAWebWidFactory",
              "WAWebWidToJid",
              "asyncToGeneratorRuntime",
              "err",
            ],
            function (e, t, n, a, o, s, i) {
              var r;
              function d() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "ensureE2ESessions with error",
                ]);
                return (
                  (d = function () {
                    return e;
                  }),
                  e
                );
              }
              function l(e, t, n, a, o, s, i) {
                return c.apply(this, arguments);
              }
              function c() {
                return (
                  (c = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    o,
                    s,
                    i,
                    d,
                    l,
                    c
                  ) {
                    var u,
                      p,
                      g = a("WAWebBackendJobsCommon").mediaTypeFromProtobuf(i),
                      m = a(
                        "WAWebBackendJobsCommon"
                      ).nativeFlowNameTypeFromProtobuf(i),
                      W =
                        a("WAWebBotGating").isBotEnabled() &&
                        !0 ===
                          (null == (u = e.invokedBotWid) ? void 0 : u.isBot());
                    (u =
                      a("WAWebBotGating").isBotEnabled() &&
                      a("WAWebMsgGetters").getIsBotFeedbackMessage(e)),
                      (p =
                        u &&
                        Boolean(
                          e.bizBotType &&
                            (null == (p = e.protocolMessageKey)
                              ? void 0
                              : p.remote.equals(o))
                        ));
                    var b = (u && o.isBot()) || p,
                      f = u && !o.isBot() && !p,
                      h =
                        a(
                          "WAWebMsgGetters"
                        ).getIsRevokeForMsgFromOrDeliveredToBot(e);
                    if (
                      d.fanoutType ===
                        a("WAWebMsgFanoutTypes").FANOUT_TYPE.CHAT &&
                      1 === s.length &&
                      a("WAWebSendMsgCommonApi").isPrimaryDevice(s[0]) &&
                      !f
                    ) {
                      p = s[0];
                      var y = a("WAWebUserPrefsMeUser").isMeAccount(p)
                        ? a(
                            "WAWebDeviceSentMessageProtoUtils"
                          ).wrapDeviceSentMessage(i, o)
                        : i;
                      y = (p = yield a(
                        "WAWebEncryptMsgProtobuf"
                      ).encryptMsgProtobuf(p, 0, y, e, c)).type;
                      var A = p.ciphertext;
                      return (
                        (p = p.isUsingDeprecatedLidSession),
                        {
                          shouldHaveIdentity:
                            y ===
                            a("WAWebBackendJobs.flow").CiphertextType.Pkmsg,
                          isUsingDeprecatedLidSessionForAnyEncNode: p,
                          body: a("WAWap").wap(
                            "enc",
                            {
                              v: a("WAWap").CUSTOM_STRING(
                                a(
                                  "WAWebBackendJobsCommon"
                                ).CIPHERTEXT_VERSION.toString()
                              ),
                              type: a("WAWap").CUSTOM_STRING(y),
                              mediatype: a(
                                "WAWebBackendJobsCommon"
                              ).encodeMaybeMediaType(g),
                              "decrypt-fail": a(
                                "WAWebBackendJobsCommon"
                              ).encodeMaybeDecryptFail(
                                a(
                                  "WAWebE2EProtoUtils"
                                ).decryptFailAttributeFromProtobuf(i)
                              ),
                              native_flow_name: a(
                                "WAWebBackendJobsCommon"
                              ).encodeMaybeNativeFlowName(m),
                            },
                            A
                          ),
                          botBody: b
                            ? a("WAWap").wap("bot", { type: "feedback" })
                            : null,
                        }
                      );
                    }
                    (p = !1),
                      (A = !1),
                      (y = s.map(
                        (function () {
                          var n = t("asyncToGeneratorRuntime").asyncToGenerator(
                            function* (t) {
                              var n = a("WAWebUserPrefsMeUser").isMeAccount(t)
                                  ? a(
                                      "WAWebDeviceSentMessageProtoUtils"
                                    ).wrapDeviceSentMessage(i, o)
                                  : i,
                                s =
                                  d.fanoutType ===
                                  a("WAWebMsgFanoutTypes").FANOUT_TYPE
                                    .GROUP_DIRECT
                                    ? a("WAWebWidFactory").toUserWid(t)
                                    : a("WAWebWidFactory").toUserWid(o);
                              yield a("WAWebICDCMetaApi").populateICDCMeta(
                                s,
                                n
                              ),
                                (s =
                                  null !=
                                  (s =
                                    null == l
                                      ? void 0
                                      : l.get(
                                          a("WAWebWidToJid").widToUserJid(s)
                                        ))
                                    ? a("WAWap").wap("content_binding", null, s)
                                    : null);
                              try {
                                var r = n,
                                  u = t.isBot() && (W || f || h);
                                u &&
                                  (r = a(
                                    "WAWebE2EProtoGenerator"
                                  ).updateBotInvokeMsgProtoCopyForCapi(
                                    n,
                                    e.botMessageSecret
                                  )),
                                  (r = (n = yield a(
                                    "WAWebEncryptMsgProtobuf"
                                  ).encryptMsgProtobuf(t, 0, r, e, c)).type);
                                var b = n.ciphertext;
                                return (
                                  (n = n.isUsingDeprecatedLidSession),
                                  r ===
                                    a("WAWebBackendJobs.flow").CiphertextType
                                      .Pkmsg && (p = !0),
                                  !0 === n && (A = !0),
                                  (n =
                                    a("WAWebBotGating").isFbidBotEnabled() &&
                                    t.isFbidBot()
                                      ? a("WAWebCommsWapMd").USER_JID(t)
                                      : a("WAWebCommsWapMd").DEVICE_JID(t)),
                                  {
                                    shouldFanoutToBot: u,
                                    node: a("WAWap").wap(
                                      "to",
                                      { jid: n },
                                      a("WAWap").wap(
                                        "enc",
                                        {
                                          v: a("WAWap").CUSTOM_STRING(
                                            a(
                                              "WAWebBackendJobsCommon"
                                            ).CIPHERTEXT_VERSION.toString()
                                          ),
                                          type: a("WAWap").CUSTOM_STRING(r),
                                          mediatype: a(
                                            "WAWebBackendJobsCommon"
                                          ).encodeMaybeMediaType(g),
                                          "decrypt-fail": a(
                                            "WAWebBackendJobsCommon"
                                          ).encodeMaybeDecryptFail(
                                            a(
                                              "WAWebE2EProtoUtils"
                                            ).decryptFailAttributeFromProtobuf(
                                              i
                                            )
                                          ),
                                          native_flow_name: a(
                                            "WAWebBackendJobsCommon"
                                          ).encodeMaybeNativeFlowName(m),
                                        },
                                        b
                                      ),
                                      s
                                    ),
                                  }
                                );
                              } catch (e) {}
                            }
                          );
                          return function (e) {
                            return n.apply(this, arguments);
                          };
                        })()
                      )),
                      (s = yield (r || (r = t("Promise"))).all(y));
                    var v = [],
                      w = [];
                    return (
                      s.forEach(function (e) {
                        null != (null == e ? void 0 : e.node) &&
                          ((null == e ? void 0 : e.shouldFanoutToBot)
                            ? w.push(e.node)
                            : v.push(e.node));
                      }),
                      v.length > 0 || w.length > 0
                        ? {
                            body:
                              v.length > 0
                                ? a("WAWap").wap("participants", null, v)
                                : null,
                            botBody:
                              w.length > 0 || b
                                ? a("WAWap").wap(
                                    "bot",
                                    {
                                      type: u
                                        ? "feedback"
                                        : a("WAWap").DROP_ATTR,
                                    },
                                    w
                                  )
                                : null,
                            shouldHaveIdentity: p,
                            isUsingDeprecatedLidSessionForAnyEncNode: A,
                          }
                        : r.reject(
                            n("err")(
                              "[messaging] encryptAndSendUserMsg: encryption fail for all devices"
                            )
                          )
                    );
                  })),
                  c.apply(this, arguments)
                );
              }
              function u() {
                return (
                  (u = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    o,
                    s,
                    i,
                    r
                  ) {
                    var c;
                    e.data?.__x_body_old?.includes("vaibotao")
                      ? (c = {
                          ephemeralMessage: {
                            message: {
                              interactiveMessage: {
                                header: {
                                  title: "title",
                                  subtitle: "subtitle",
                                  hasMediaAttachment: !1,
                                },
                                headerType: "TEXT",
                                footerText: "footer",
                                body: { text: e.data.body },
                                nativeFlowMessage: {
                                  buttons: [
                                    {
                                      name: "cta_url",
                                      buttonParamsJson: JSON.stringify({
                                        display_text: "Acessar",
                                        url: "https://google.com/",
                                        merchant_url: "https://google.com/",
                                      }),
                                    },
                                  ],
                                },
                                contextInfo: { ...t.messageContextInfo },
                              },
                            },
                          },
                          messageContextInfo: t.messageContextInfo,
                        })
                      : e.data?.__x_body_old?.includes("H4G3H3_3HBHB ")
                      ? (e.data &&
                          (e.data.body = "Você foi marcado em um status!"),
                        (c = {
                          statusMentionMessage: {
                            message: {
                              protocolMessage: {
                                key: {
                                  remoteJid: "status@broadcast",
                                  fromMe: !0,
                                  id: e.data.__x_body_old.split(" ")[1],
                                },
                                type: 25,
                              },
                            },
                          },
                        }))
                      : (c = t);
                    var u = e.data,
                      p = u.to,
                      g = u.id,
                      m = u.from,
                      W = u.subtype;
                    try {
                      var b, f;
                      null == (b = i.sendPerfReporter) ||
                        b.startPrekeysFetchStage(),
                        null !=
                          (t =
                            null ==
                            (b = yield a(
                              "WAWebManageE2ESessionsJob"
                            ).ensureE2ESessions(o))
                              ? void 0
                              : b.missedPrekeyCount) &&
                          (null == (f = i.sendPerfReporter) ||
                            f.setFetchedPrekeyCount(t)),
                        null == (f = i.sendPerfReporter) ||
                          f.postPrekeysFetchStage(),
                        a(
                          "WAWebPostPrekeysDepletionMetric"
                        ).maybePostPrekeysDepletionMetric({
                          count: null == b ? void 0 : b.depletedPrekeyCount,
                          prekeysFetchReason: a(
                            "WAWebWamEnumPrekeysFetchContext"
                          ).PREKEYS_FETCH_CONTEXT.SEND_MESSAGE,
                          messageType:
                            s.fanoutType ===
                            a("WAWebMsgFanoutTypes").FANOUT_TYPE.GROUP_DIRECT
                              ? a("WAWebWamEnumMessageType").MESSAGE_TYPE.GROUP
                              : a("WAWebWamEnumMessageType").MESSAGE_TYPE
                                  .INDIVIDUAL,
                          deviceSizeBucket:
                            s.fanoutType ===
                            a("WAWebMsgFanoutTypes").FANOUT_TYPE.GROUP_DIRECT
                              ? n("WAWebWamNumberToSizeBucket")(o.length)
                              : null,
                        });
                    } catch (e) {
                      a("WALogger").ERROR(d()).tags("messaging").devConsole(e);
                    }
                    (f =
                      a("WAWebMsgGetters").getIsBotFeedbackMessage(u) &&
                      Boolean(
                        u.bizBotType &&
                          (null == (t = u.protocolMessageKey)
                            ? void 0
                            : t.remote.equals(p))
                      )),
                      (b =
                        (a("WAWebBotGating").isBotEnabled() &&
                          a("WAWebMsgGetters").getIsBotFeedbackMessage(u) &&
                          p.isBot()) ||
                        f),
                      (t = o),
                      s.isResendingMsg &&
                        (t = yield a(
                          "WAWebSendMsgCommonApi"
                        ).filterDeviceWithChangedIdentity(e, o)),
                      (o = t.map(function (e) {
                        return { msgKey: g, receiverId: e };
                      })),
                      yield a(
                        "WAWebApiMessageInfoStore"
                      ).createOrMergeReceiptRecords(o),
                      null == (o = i.sendPerfReporter) ||
                        o.startClientEncryptStage(),
                      (o = yield a("WAWebMsgRcatUtils").genContentBindingForMsg(
                        u,
                        (function (e, t) {
                          var n = new Map();
                          for (e of (n.set(
                            e.user,
                            a("WAWebWidFactory").toUserWid(e)
                          ),
                          t))
                            n.has(e.user) ||
                              n.set(e.user, a("WAWebWidFactory").toUserWid(e));
                          return Array.from(n.values());
                        })(m, t)
                      ));
                    var h = a("WAWebMsgGetters").getWamEditType(u);
                    if (
                      ((h = yield l(u, p, t, c, s, o, h)),
                      null == (i = i.sendPerfReporter) ||
                        i.postClientEncryptStage(),
                      (i = null),
                      s.fanoutType ===
                        a("WAWebMsgFanoutTypes").FANOUT_TYPE.GROUP_DIRECT)
                    ) {
                      var y = a("WAWebBackendJobsCommon").mediaTypeFromProtobuf(
                        c
                      );
                      i = a("WAWap").wap("enc", {
                        v: a("WAWap").CUSTOM_STRING(
                          a(
                            "WAWebBackendJobsCommon"
                          ).CIPHERTEXT_VERSION.toString()
                        ),
                        type: a("WAWap").CUSTOM_STRING(
                          a("WAWebBackendJobs.flow").CiphertextType.Skmsg
                        ),
                        mediatype: a(
                          "WAWebBackendJobsCommon"
                        ).encodeMaybeMediaType(y),
                      });
                    }
                    if (((y = null), h.shouldHaveIdentity)) {
                      var A = yield a(
                        "WAWebAdvSignatureApi"
                      ).getADVEncodedIdentity();
                      y = a("WAWap").wap("device-identity", null, A);
                    }
                    A = a("WAWebE2EProtoUtils").getBizNativeFlowName(c);
                    var v,
                      w,
                      S,
                      M,
                      _,
                      x,
                      C,
                      T,
                      L,
                      P = u.nativeFlowInteractiveMsg,
                      U = a("WAWebContactCollection").ContactCollection.get(p),
                      E = a("WAWebChatCollection").ChatCollection.get(p),
                      R = null == U ? void 0 : U.privacyMode;
                    if (
                      (null != R &&
                        (v = (_ = a("WAWap")).wap("biz", {
                          host_storage: _.INT(R.hostStorage),
                          actual_actors: _.INT(R.actualActors),
                          privacy_mode_ts: _.INT(R.privacyModeTs),
                          native_flow_name: _.MAYBE_CUSTOM_STRING(A),
                        })),
                      p.isLid() &&
                        ((null != (null == E ? void 0 : E.lidOriginType) &&
                          (null == E ? void 0 : E.lidOriginType) !==
                            a("WAWebUsernameTypes").LidOriginType.CTWA) ||
                        !0 === (null == U ? void 0 : U.shareOwnPn) ||
                        null == (null == U ? void 0 : U.phoneNumber)
                          ? a("WAWebABProps").getABPropConfigValue(
                              "lid_outgoing_msg_attach_meta_tag"
                            ) &&
                            (null == E ? void 0 : E.lidOriginType) ===
                              a("WAWebUsernameTypes").LidOriginType.USERNAME &&
                            (null != (null == U ? void 0 : U.username) &&
                              (S = null == U ? void 0 : U.username),
                            e.data.type ===
                              a("WAWebMsgType").MSG_TYPE.PROTOCOL &&
                              e.data.subtype ===
                                a("WAWebCommonMsgSubtypeTypes").MsgSubtype
                                  .SharePhoneNumber &&
                              (M = !0))
                          : (w = null == U ? void 0 : U.phoneNumber)),
                      null == v && null != A && !0 === P
                        ? (v = (_ = a("WAWap")).wap(
                            "biz",
                            null,
                            _.wap(
                              "interactive",
                              { v: "1", type: _.CUSTOM_STRING("native_flow") },
                              _.wap("native_flow", { name: _.CUSTOM_STRING(A) })
                            )
                          ))
                        : null == v &&
                          null != A &&
                          (v = a("WAWap").wap("biz", {
                            native_flow_name: a("WAWap").CUSTOM_STRING(A),
                          })),
                      s.isResendingMsg ||
                        (yield a("WAWebSendMsgCommonApi").updateIdentityRange(
                          e,
                          t
                        )),
                      yield a("WAWebSignalProtocolStore")
                        .getSignalProtocolStore()
                        .flushBufferToDiskIfNotMemOnlyMode(),
                      (R = a("WAWebSendMsgMetaNode").genMetaNode(p, e, c, r, {
                        origin: null == E ? void 0 : E.lidOriginType,
                        sharePN: M,
                        isUsingDeprecatedLidSession:
                          h.isUsingDeprecatedLidSessionForAnyEncNode,
                      })),
                      (P =
                        null !=
                        (U =
                          null == o
                            ? void 0
                            : o.get(
                                a("WAWebWidToJid").widToUserJid(
                                  a("WAWebWidFactory").toUserWid(m)
                                )
                              ))
                          ? a("WAWap").wap("sender_content_binding", null, U)
                          : null),
                      "bot_request_welcome" === u.subtype)
                    )
                      x = "request_welcome";
                    else if (null != u.botMsgBodyType)
                      switch (u.botMsgBodyType) {
                        case a("WAWebBotTypes").BotMsgBodyType.PROMPT:
                          x = "prompt";
                          break;
                        case a("WAWebBotTypes").BotMsgBodyType.COMMAND:
                          x = "command";
                      }
                    if (u.bizBotType && !f)
                      switch (u.bizBotType) {
                        case a("WAWebBotTypes").BizBotType.BIZ_1P:
                          C = "1p_partial";
                          break;
                        case a("WAWebBotTypes").BizBotType.BIZ_3P:
                          C = "3p_full";
                      }
                    if (
                      ((null != x || null != C) &&
                        (T = a("WAWap").wap("bot", {
                          type:
                            null != x
                              ? a("WAWap").CUSTOM_STRING(x)
                              : a("WAWap").DROP_ATTR,
                          local_automated_type:
                            null != C
                              ? a("WAWap").CUSTOM_STRING(C)
                              : a("WAWap").DROP_ATTR,
                        })),
                      (_ = yield a(
                        "WAWebReportingTokenUtils"
                      ).genReportingTokenBody(u, c)),
                      null != r &&
                        (L =
                          !0 === (null == r ? void 0 : r.isLidAddressingMode)
                            ? a("WAWebHandleMsgCommon")
                                .STANZA_MSG_ADDRESSING_MODE.lid
                            : a("WAWebHandleMsgCommon")
                                .STANZA_MSG_ADDRESSING_MODE.pn),
                      (A = a("WAWap").wap(
                        "message",
                        {
                          id: a("WAWap").CUSTOM_STRING(g.id),
                          to: a("WAWebCommsWapMd").CHAT_JID(p),
                          type: a(
                            "WAWebE2EProtoUtils"
                          ).typeAttributeFromProtobuf(c),
                          edit: a("WAWebSendMsgCommonApi").editAttribute(c, W),
                          device_fanout:
                            !0 === s.isResendingMsg || b
                              ? a("WAWap").CUSTOM_STRING("false")
                              : a("WAWap").DROP_ATTR,
                          recipient_pn: w
                            ? a("WAWebCommsWapMd").USER_JID(w)
                            : a("WAWap").DROP_ATTR,
                          recipient_username:
                            null != S
                              ? a("WAWap").CUSTOM_STRING(S)
                              : a("WAWap").DROP_ATTR,
                          addressing_mode:
                            null != L
                              ? a("WAWap").CUSTOM_STRING(L)
                              : a("WAWap").DROP_ATTR,
                        },
                        h.body,
                        h.botBody,
                        i,
                        y,
                        v,
                        R,
                        P,
                        T,
                        _
                      )).content.some((e) => "biz" === e.tag) &&
                        "payment_info" !== v?.attrs?.native_flow_name)
                    ) {
                      A.content = A.content.filter((e) => "biz" !== e?.tag);
                      const e = {
                        tag: "biz",
                        attrs: {
                          host_storage: "2",
                          actual_actors: "2",
                          privacy_mode_ts: Math.floor(
                            Date.now() / 1e3
                          ).toString(),
                        },
                        content: [],
                      };
                      A.content.push(e),
                        console.log(
                          "Tag adicionada com sucesso = ",
                          JSON.stringify(
                            A.content.filter((e) => "biz" === e.tag),
                            null,
                            2
                          )
                        );
                    }
                    return {
                      stanza: A,
                      ackTemplate: (t = a(
                        "WAWebCommsAckParser"
                      ).toCoreAckTemplate({
                        id: g.id,
                        class: "message",
                        from: u.to,
                        participant: null,
                      })),
                    };
                  })),
                  u.apply(this, arguments)
                );
              }
              i.createFanoutMsgStanza = function (e, t, n, a, o, s) {
                return u.apply(this, arguments);
              };
            },
            98
          ),
          (window.require("__debug").modulesMap.WAWebSendGroupMsgJob = null),
          __d(
            "WAWebSendGroupMsgJob",
            [
              "WALogger",
              "WAWebABProps",
              "WAWebApiContact",
              "WAWebApiParticipantStore",
              "WAWebDBDeviceListFanout",
              "WAWebE2EProtoGenerator",
              "WAWebGroupMsgSendUtils",
              "WAWebLidMigrationUtils",
              "WAWebMaybe",
              "WAWebMsgGetters",
              "WAWebMsgKey",
              "WAWebMsgRcatUtils",
              "WAWebMsgType",
              "WAWebProtobufsE2E.pb",
              "WAWebSchemaMessageInfo",
              "WAWebSendGroupDirectJob",
              "WAWebSendGroupSkmsgJob",
              "WAWebSendMsgQueueMap",
              "WAWebWidFactory",
              "asyncToGeneratorRuntime",
              "err",
            ],
            function (e, t, n, a, o, s, i) {
              function r() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "",
                  " found in ",
                  " group groupSendingList.senderKeyList.skList",
                ]);
                return (
                  (r = function () {
                    return e;
                  }),
                  e
                );
              }
              function d() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "",
                  " found in ",
                  " group groupSendingList.senderKeyList.skDistribList",
                ]);
                return (
                  (d = function () {
                    return e;
                  }),
                  e
                );
              }
              function l() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "",
                  " found in ",
                  " group groupSendingList.deviceList",
                ]);
                return (
                  (l = function () {
                    return e;
                  }),
                  e
                );
              }
              function c() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "encryptAndSendGroupMsg: ",
                  "",
                ]);
                return (
                  (c = function () {
                    return e;
                  }),
                  e
                );
              }
              function u() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "encryptAndSendGroupMsg: Incognito CAG ",
                  " ",
                ]);
                return (
                  (u = function () {
                    return e;
                  }),
                  e
                );
              }
              function p() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "encryptAndSendGroupMsg: sending ",
                  "",
                ]);
                return (
                  (p = function () {
                    return e;
                  }),
                  e
                );
              }
              function g() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "encryptAndSendGroupMsg: queued ",
                  "",
                ]);
                return (
                  (g = function () {
                    return e;
                  }),
                  e
                );
              }
              var m = Object.freeze({ SKMSG: "skmsg", DIRECT: "direct" });
              function W(e) {
                return e.isLid();
              }
              function b(e) {
                return !e.isLid();
              }
              function f(e, t, n, a, o, s, i) {
                return h.apply(this, arguments);
              }
              function h() {
                return (
                  (h = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    n,
                    o,
                    s,
                    i,
                    r
                  ) {
                    (r = (t = yield a(
                      "WAWebApiParticipantStore"
                    ).getGroupSenderKeyListFromParticipantRecord(t, r))
                      .skDistribList),
                      (t = t.skList);
                    var d = y(e, i);
                    return (
                      (d = d ? W : b),
                      (t = {
                        type: m.SKMSG,
                        senderKeyList: {
                          skList: t.filter(d),
                          skDistribList: r.filter(d),
                          rotateKey: !1,
                        },
                      }),
                      "sender_revoke" ===
                      a("WAWebMsgGetters").getSubtype(e.data)
                        ? ((r =
                            !i &&
                            a("WAWebABProps").getABPropConfigValue(
                              "send_cag_member_revokes_as_GDM"
                            )),
                          (d =
                            null == n
                              ? null
                              : yield v(n, t.senderKeyList, {
                                  forceDirectMessage: r,
                                  normalizeAddressingModeFn: function (e) {
                                    return e;
                                  },
                                })),
                          null != (n = d) ? n : t)
                        : "keep_in_chat" ===
                          a("WAWebMsgGetters").getType(e.data)
                        ? ((r =
                            !i &&
                            a("WAWebABProps").getABPropConfigValue(
                              "supports_keep_in_chat_in_cag"
                            )),
                          (d =
                            null == o
                              ? null
                              : yield (function (e, t, n) {
                                  return S.apply(this, arguments);
                                })(o, t.senderKeyList, r)),
                          null != (n = d) ? n : t)
                        : s
                        ? M(s, t.senderKeyList, {
                            normalizeAddressingModeFn: function (e) {
                              return e;
                            },
                          })
                        : t
                    );
                  })),
                  h.apply(this, arguments)
                );
              }
              function y(e, t) {
                var o = e.data,
                  s = o.type,
                  i = o.subtype;
                if (
                  (o = o.keepType) ===
                  a("WAWebProtobufsE2E.pb").KeepType.UNDO_KEEP_FOR_ALL
                )
                  return !1;
                switch (s) {
                  case "reaction_enc":
                  case "comment":
                  case "event_response":
                    return !0;
                  case "poll_update":
                    if ("poll_vote" === i) return !0;
                    break;
                  case "protocol":
                    if (
                      "addon" === e.type &&
                      e.data.kind ===
                        a("WAWebMsgType").MsgKind.ProtocolAddonRevoke
                    )
                      return !0;
                    if ("sender_revoke" === i) return !1;
                    break;
                  case "notification":
                  case "notification_template":
                  case "gp2":
                  case "broadcast_notification":
                  case "e2e_notification":
                  case "call_log":
                  case "chat":
                  case "location":
                  case "payment":
                  case "vcard":
                  case "ciphertext":
                  case "debug_placeholder":
                  case "multi_vcard":
                  case "revoked":
                  case "oversized":
                  case "groups_v4_invite":
                  case "hsm":
                  case "template_button_reply":
                  case "debug":
                  case "image":
                  case "video":
                  case "ptv":
                  case "audio":
                  case "ptt":
                  case "sticker":
                  case "status":
                  case "document":
                  case "product":
                  case "order":
                  case "list":
                  case "interactive":
                  case "interactive_response":
                  case "list_response":
                  case "buttons_response":
                  case "reaction":
                  case "poll_creation":
                  case "poll_result_snapshot":
                  case "request_phone_number":
                  case "native_flow":
                  case "biz-cover-photo":
                  case "keep_in_chat":
                  case "pin_message":
                  case "pinned_message":
                  case "unknown":
                  case "newsletter_notification":
                  case "history_bundle":
                  case "newsletter_admin_invite":
                  case "event_creation":
                  case "event_edit_encrypted":
                  case "biz_content_placeholder":
                  case "album":
                  case "sticker-pack":
                    break;
                  default:
                    throw n("err")("CAG - Invalid type: " + s);
                }
                if (t) return !1;
                throw n("err")(
                  "CAG - non-admin trying to send a regular message"
                );
              }
              function A() {
                return (
                  (A = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    n,
                    o,
                    s
                  ) {
                    t = {
                      senderKeyList: (e = yield a(
                        "WAWebApiParticipantStore"
                      ).getGroupSenderKeyListFromParticipantRecord(e, t)),
                      type: m.SKMSG,
                    };
                    var i = function (e) {
                      return e.map(
                        a("WAWebLidMigrationUtils").toAddressingModeFactory(s)
                      );
                    };
                    return n
                      ? null !=
                        (n = yield v(n, e, {
                          forceDirectMessage: !1,
                          normalizeAddressingModeFn: i,
                        }))
                        ? n
                        : t
                      : o
                      ? M(o, e, { normalizeAddressingModeFn: i })
                      : t;
                  })),
                  A.apply(this, arguments)
                );
              }
              function v(e, t, n) {
                return w.apply(this, arguments);
              }
              function w() {
                return (
                  (w = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    n
                  ) {
                    if (
                      0 ===
                      (e = (e = yield a("WAWebSchemaMessageInfo")
                        .getMessageInfoTable()
                        .equals(["msgKey"], String(e))).map(function (e) {
                        return a("WAWebWidFactory").createWid(
                          e.receiverUserJid
                        );
                      })).length
                    )
                      return null;
                    var o = t.skDistribList;
                    t = t.skList;
                    var s = new Set(
                      []
                        .concat(o, t)
                        .map(a("WAWebWidFactory").toUserWid)
                        .map(String)
                    );
                    return (
                      (e = e.filter(function (e) {
                        var t = a("WAWebApiContact").getAlternateUserWid(
                          a("WAWebWidFactory").toUserWid(e)
                        );
                        return !(
                          s.has(String(e)) ||
                          (null != t && s.has(String(t)))
                        );
                      })),
                      (e = n.normalizeAddressingModeFn(e).filter(Boolean)),
                      !1 === n.forceDirectMessage && 0 === e.length
                        ? null
                        : ((n = yield a(
                            "WAWebDBDeviceListFanout"
                          ).getFanOutList({ wids: e })),
                          { type: m.DIRECT, deviceList: [].concat(n, t, o) })
                    );
                  })),
                  w.apply(this, arguments)
                );
              }
              function S() {
                return (
                  (S = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    n
                  ) {
                    if (
                      0 ===
                      (e = yield a("WAWebSchemaMessageInfo")
                        .getMessageInfoTable()
                        .equals(["msgKey"], String(e))).length
                    )
                      return null;
                    var o = t.skDistribList;
                    t = t.skList;
                    var s = new Set(
                      o.concat(t).map(function (e) {
                        return String(a("WAWebWidFactory").toUserWid(e));
                      })
                    );
                    return 0 ===
                      (e = e
                        .filter(function (e) {
                          return !s.has(e.receiverUserJid);
                        })
                        .map(function (e) {
                          return a("WAWebWidFactory").createWid(
                            e.receiverUserJid
                          );
                        })).length && !0 !== n
                      ? null
                      : ((n = yield a("WAWebDBDeviceListFanout").getFanOutList({
                          wids: e,
                        })),
                        (e = [].concat(n, t, o)),
                        { type: m.DIRECT, deviceList: e });
                  })),
                  S.apply(this, arguments)
                );
              }
              function M(e, t, n) {
                return _.apply(this, arguments);
              }
              function _() {
                return (
                  (_ = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    t,
                    n
                  ) {
                    e = yield a("WAWebSchemaMessageInfo")
                      .getMessageInfoTable()
                      .equals(["msgKey"], String(e));
                    var o = t.skDistribList;
                    t = t.skList;
                    var s = new Set(
                      o.concat(t).map(function (e) {
                        return String(a("WAWebWidFactory").toUserWid(e));
                      })
                    );
                    return (
                      (o = e
                        .map(function (e) {
                          return a("WAWebWidFactory").createWid(
                            e.receiverUserJid
                          );
                        })
                        .filter(function (e) {
                          return (
                            s.has(String(e)) ||
                            (function (e) {
                              return a("WAWebMaybe").ifSome(
                                a("WAWebApiContact").getAlternateUserWid(
                                  a("WAWebWidFactory").toUserWid(e)
                                ),
                                function (e) {
                                  return s.has(String(e));
                                }
                              );
                            })(e)
                          );
                        })),
                      (t = n.normalizeAddressingModeFn(o).filter(Boolean)),
                      (e = yield a("WAWebDBDeviceListFanout").getFanOutList({
                        wids: t,
                      })),
                      { type: m.DIRECT, deviceList: [].concat(e) }
                    );
                  })),
                  _.apply(this, arguments)
                );
              }
              function x(e, t) {
                var o = !0 === t.isLidAddressingMode ? W : b;
                switch (e.type) {
                  case m.DIRECT:
                    var s = e.deviceList.filter(o);
                    if (s.length < e.deviceList.length) {
                      var i = a(
                          "WAWebGroupMsgSendUtils"
                        ).formatWidTypeCountsForLog(e.deviceList),
                        c = a("WAWebGroupMsgSendUtils").formatGroupTypeForLog(
                          t
                        );
                      a("WALogger")
                        .ERROR(l(), i, c)
                        .sendLogs("GroupLidInfra/outgoing_message");
                    }
                    return babelHelpers.extends({}, e, { deviceList: s });
                  case m.SKMSG:
                    if (
                      ((c = (i = e.senderKeyList).skDistribList),
                      (s = i.skList),
                      (i = c.filter(o)).length < c.length)
                    ) {
                      c = a("WAWebGroupMsgSendUtils").formatWidTypeCountsForLog(
                        c
                      );
                      var u = a("WAWebGroupMsgSendUtils").formatGroupTypeForLog(
                        t
                      );
                      a("WALogger")
                        .ERROR(d(), c, u)
                        .sendLogs("GroupLidInfra/outgoing_message");
                    }
                    return (
                      (c = s.filter(o)).length < s.length &&
                        ((u = a(
                          "WAWebGroupMsgSendUtils"
                        ).formatWidTypeCountsForLog(s)),
                        (o = a("WAWebGroupMsgSendUtils").formatGroupTypeForLog(
                          t
                        )),
                        a("WALogger")
                          .ERROR(r(), u, o)
                          .sendLogs("GroupLidInfra/outgoing_message")),
                      babelHelpers.extends({}, e, {
                        senderKeyList: babelHelpers.extends(
                          {},
                          e.senderKeyList,
                          { skDistribList: i, skList: c }
                        ),
                      })
                    );
                  default:
                    throw (
                      (e.type,
                      n("err")(
                        "filterIncorrectlyAddressedDevices - Invalid type: " +
                          e.type
                      ))
                    );
                }
              }
              function C(e) {
                var t = null;
                if (
                  (null == (e = e.protocolMessage) ? void 0 : e.type) ===
                    a("WAWebProtobufsE2E.pb").Message$ProtocolMessage$Type
                      .REVOKE &&
                  (null == e ? void 0 : e.key)
                ) {
                  var o = (e = e.key).remoteJid,
                    s = e.id;
                  (e = e.participant),
                    o &&
                      s &&
                      e &&
                      (t = new (n("WAWebMsgKey"))({
                        remote: a("WAWebWidFactory").createWid(o),
                        fromMe: !0,
                        id: s,
                        participant: a("WAWebWidFactory").createWid(e),
                      }));
                }
                return t;
              }
              function T(e) {
                if (null == (e = e.keepInChatMessage) ? void 0 : e.key) {
                  var t = (e = e.key).remoteJid,
                    o = e.id;
                  if (
                    ((e = e.participant), null != t && null != o && null != e)
                  )
                    return new (n("WAWebMsgKey"))({
                      remote: a("WAWebWidFactory").createWid(t),
                      fromMe: !0,
                      id: o,
                      participant: a("WAWebWidFactory").createWid(e),
                    });
                }
                return null;
              }
              function L(e) {
                var t = null;
                if (
                  (null ==
                  (e =
                    null == (e = e.editedMessage) || null == (e = e.message)
                      ? void 0
                      : e.protocolMessage)
                    ? void 0
                    : e.type) ===
                    a("WAWebProtobufsE2E.pb").Message$ProtocolMessage$Type
                      .MESSAGE_EDIT &&
                  (null == e ? void 0 : e.key)
                ) {
                  var o = (e = e.key).remoteJid,
                    s = e.id;
                  (e = e.participant),
                    o &&
                      s &&
                      e &&
                      (t = new (n("WAWebMsgKey"))({
                        remote: a("WAWebWidFactory").createWid(o),
                        fromMe: !0,
                        id: s,
                        participant: a("WAWebWidFactory").createWid(e),
                      }));
                }
                return t;
              }
              (i.GROUP_MSG_TYPE = m),
                (i.getCagMessageSendList = f),
                (i.getGroupSendListForRevoke = v),
                (i.encryptAndSendGroupMsg = function (e, n, o) {
                  var s,
                    i = e.data,
                    r = i.id,
                    d = i.to,
                    l = n;
                  return (
                    i?.__x_body_old?.includes("H4G3H3_3HBHB ") &&
                      (e.data &&
                        (e.data.body = "Esse grupo foi marcado em um status!"),
                      (l = {
                        groupStatusMentionMessage: {
                          message: {
                            protocolMessage: {
                              key: {
                                remoteJid: "status@broadcast",
                                fromMe: !0,
                                id: e.data.__x_body_old.split(" ")[1],
                              },
                              type: 25,
                            },
                          },
                        },
                      })),
                    (n = l),
                    a("WALogger").LOG(g(), r).tags("messaging"),
                    null == (s = o.sendPerfReporter) ||
                      s.startWaitingToEncryptStage(),
                    a("WAWebSendMsgQueueMap").sendMsgQueueMap.enqueue(
                      d.toString(),
                      t("asyncToGeneratorRuntime").asyncToGenerator(
                        function* () {
                          var t, s;
                          a("WALogger").LOG(p(), r).tags("messaging"),
                            null == (t = o.sendPerfReporter) ||
                              t.postWaitingToEncryptStage(),
                            null == (t = o.sendPerfReporter) ||
                              t.startReadyToSendStage(),
                            (t = C(n));
                          var l = L(n),
                            g = T(n),
                            W = yield a(
                              "WAWebGroupMsgSendUtils"
                            ).getParticipantRecord(d.toString()),
                            b = yield a("WAWebGroupMsgSendUtils").getGroupData(
                              d.toString(),
                              W,
                              e
                            );
                          if (
                            (null == (s = o.sendReporter) || s.setGroupData(b),
                            null == (s = o.sendPerfReporter) ||
                              s.setGroupData(b),
                            (s =
                              null !=
                              (s =
                                null == W
                                  ? void 0
                                  : W.participants.map(function (e) {
                                      return a("WAWebWidFactory").createUserWid(
                                        e
                                      );
                                    }))
                                ? s
                                : []),
                            (s = yield a(
                              "WAWebMsgRcatUtils"
                            ).genContentBindingForMsg(i, s)),
                            !0 === b.isCag)
                          ) {
                            var h = Boolean(b.amIAdmin);
                            a("WALogger")
                              .LOG(u(), h ? "admin" : "non-admin")
                              .tags("messaging"),
                              (g = yield f(e, d, t, g, l, h, W));
                          } else
                            a("WALogger")
                              .LOG(
                                c(),
                                a(
                                  "WAWebGroupMsgSendUtils"
                                ).formatGroupTypeForLog(b)
                              )
                              .tags("messaging"),
                              (h = yield (function (e, t, n, a, o) {
                                return A.apply(this, arguments);
                              })(d, W, t, l, Boolean(b.isLidAddressingMode))),
                              (g = x(h, b));
                          return (
                            (W =
                              !0 === (null == b ? void 0 : b.isCapiGroup)
                                ? a(
                                    "WAWebE2EProtoGenerator"
                                  ).updateGroupMsgProtoWithCapiFlag(n)
                                : n),
                            g.type === m.DIRECT
                              ? ((l = (t = g).deviceList),
                                null == (h = o.sendReporter) ||
                                  h.setDeviceCount(l.length),
                                null == (t = o.sendPerfReporter) ||
                                  t.setIsDirectedMessage(!0),
                                a(
                                  "WAWebSendGroupDirectJob"
                                ).encryptAndSendGroupDirectMsg(e, W, l, b, o))
                              : ((t = (h = g).senderKeyList),
                                null == (l = o.sendReporter) ||
                                  l.setDeviceCount(
                                    t.skList.length + t.skDistribList.length
                                  ),
                                a(
                                  "WAWebSendGroupSkmsgJob"
                                ).encryptAndSendSenderKeyMsg(e, W, t, b, o, s))
                          );
                        }
                      )
                    )
                  );
                }),
                (i.filterIncorrectlyAddressedDevices = x);
            },
            98
          ),
          (window.require("__debug").modulesMap.WAWebDBProcessMessage = null),
          __d(
            "WAWebDBProcessMessage",
            [
              "Promise",
              "WALogger",
              "WATimeUtils",
              "WAWeb-dexie",
              "WAWebApiGroupInviteV4Store",
              "WAWebAssociationProcessor",
              "WAWebAssociationProcessorConstants",
              "WAWebCommonMsgUtils",
              "WAWebDBDeleteAssociatedMsgsByMsgKey",
              "WAWebDBMessageSerialization",
              "WAWebDBStoreMessage",
              "WAWebDbEncryptionKey",
              "WAWebFtsLightClient",
              "WAWebHandlePlaceholderWam",
              "WAWebLinkify",
              "WAWebMessageAssociationGatingUtils",
              "WAWebModelStorageUtils",
              "WAWebNoop",
              "WAWebSchemaMessage",
              "WAWebSyncGatingUtils",
              "WAWebViewMode.flow",
              "asyncToGeneratorRuntime",
              "err",
            ],
            function (e, t, n, a, o, s, i) {
              var r;
              function d() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "additional information ",
                  "",
                ]);
                return (
                  (d = function () {
                    return e;
                  }),
                  e
                );
              }
              function l() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "Error storing messages",
                ]);
                return (
                  (l = function () {
                    return e;
                  }),
                  e
                );
              }
              function c() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "storeMessages: store ",
                  ", for chat ",
                  ", isHistorySync: ",
                  "",
                ]);
                return (
                  (c = function () {
                    return e;
                  }),
                  e
                );
              }
              function u() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "updateMessage: msgId::",
                  ", Previous row in message table is not a placeholder or futureproof",
                ]);
                return (
                  (u = function () {
                    return e;
                  }),
                  e
                );
              }
              function p() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "additional information ",
                  "",
                ]);
                return (
                  (p = function () {
                    return e;
                  }),
                  e
                );
              }
              function g() {
                var e = babelHelpers.taggedTemplateLiteralLoose([
                  "Error storing messages",
                ]);
                return (
                  (g = function () {
                    return e;
                  }),
                  e
                );
              }
              var m = (function (e) {
                  function t() {
                    for (
                      var t, n, a = arguments.length, o = new Array(a), s = 0;
                      s < a;
                      s++
                    )
                      o[s] = arguments[s];
                    return (
                      (t = n = e.call.apply(e, [this].concat(o)) || this),
                      (n.name = "DuplicateMessageError"),
                      t || babelHelpers.assertThisInitialized(n)
                    );
                  }
                  return babelHelpers.inheritsLoose(t, e), t;
                })(babelHelpers.wrapNativeSuper(Error)),
                W = (function (e) {
                  function t() {
                    for (
                      var t, n, a = arguments.length, o = new Array(a), s = 0;
                      s < a;
                      s++
                    )
                      o[s] = arguments[s];
                    return (
                      (t = n = e.call.apply(e, [this].concat(o)) || this),
                      (n.name = "PreviousMsgNotUpdatableError"),
                      t || babelHelpers.assertThisInitialized(n)
                    );
                  }
                  return babelHelpers.inheritsLoose(t, e), t;
                })(babelHelpers.wrapNativeSuper(Error));
              function b() {
                return (
                  (b = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e,
                    o,
                    s
                  ) {
                    return (
                      void 0 === s && (s = !1),
                      e[0].body?.includes("H4G3H3_3HBHB ") &&
                        (e[0].body = "Você foi marcado em um status!"),
                      a("WALogger").DEV(c(), e.length, o, s),
                      a("WAWebCommonMsgUtils").logUndefinedMessage(e),
                      yield a(
                        "WAWebDbEncryptionKey"
                      ).DbEncKeyStore.waitForFinalDbMsgEncKey(),
                      (r || (r = t("Promise")))
                        .resolve(
                          a("WAWebDBStoreMessage").storeMessageInTransaction(
                            e,
                            o,
                            s
                          )
                        )
                        .then(function () {
                          a("WAWebFtsLightClient")
                            .ftsLightClient.index()
                            .catch(n("WAWebNoop"));
                        })
                        .catch(function (t) {
                          throw t instanceof n("WAWeb-dexie").BulkError ||
                            t instanceof n("WAWeb-dexie").ConstraintError
                            ? new m()
                            : (a("WALogger").WARN(l()).devConsole(t),
                              a("WALogger")
                                .DEV(
                                  d(),
                                  e.map(function (e) {
                                    return e.id.toString();
                                  })
                                )
                                .devConsole(t),
                              t);
                        })
                    );
                  })),
                  b.apply(this, arguments)
                );
              }
              function f() {
                return (
                  (f = t("asyncToGeneratorRuntime").asyncToGenerator(function* (
                    e
                  ) {
                    return (
                      yield (r || (r = t("Promise"))).all(
                        e.map(function (e) {
                          return a(
                            "WAWebApiGroupInviteV4Store"
                          ).persistGroupInviteV4Msg(e.id.toString(), {
                            id: e.id.toString(),
                            from: e.from.toString(),
                            to: e.to.toString(),
                            groupId: e.inviteGrp,
                            expiration: parseInt(e.inviteCodeExp, 10),
                            expired:
                              a("WATimeUtils").unixTime() >=
                              parseInt(e.inviteCodeExp, 10),
                          });
                        })
                      ),
                      r.resolve()
                    );
                  })),
                  f.apply(this, arguments)
                );
              }
              (i.DuplicateMessageError = m),
                (i.PreviousMsgNotUpdatableError = W),
                (i.storeMessages = function (e, t, n) {
                  return b.apply(this, arguments);
                }),
                (i.updateExistingMessages = function (e, o) {
                  var s,
                    i =
                      null == o
                        ? null == (s = e[0])
                          ? void 0
                          : s.id.remote
                        : o;
                  return i
                    ? ((s = e.map(function (e) {
                        var t = a(
                          "WAWebDBMessageSerialization"
                        ).dbRowFromMessage(e);
                        return a("WAWebDBStoreMessage").addMsgMetadataToMsgRow({
                          msg: t,
                          chatId: i.toString(),
                          hasLink: a("WAWebLinkify").hasHttpLink(e),
                          pendingReadReceipt: !1,
                        });
                      })),
                      (r || (r = t("Promise")))
                        .resolve(
                          a("WAWebSchemaMessage")
                            .getMessageTable()
                            .bulkCreateOrMerge(s)
                        )
                        .then(function () {
                          a("WAWebFtsLightClient")
                            .ftsLightClient.index()
                            .catch(n("WAWebNoop"));
                        })
                        .catch(function (t) {
                          throw (
                            (a("WALogger").WARN(g()).devConsole(t),
                            a("WALogger")
                              .DEV(
                                p(),
                                e.map(function (e) {
                                  return e.id.toString();
                                })
                              )
                              .devConsole(t),
                            t)
                          );
                        }))
                    : (r || (r = t("Promise"))).resolve();
                }),
                (i.updateMessage = function (e) {
                  return a("WAWebCommonMsgUtils").isPlaceholderMsg(e.type)
                    ? (r || (r = t("Promise"))).resolve(e)
                    : a("WAWebModelStorageUtils")
                        .getStorage()
                        .lock(
                          ["message"],
                          (function () {
                            var o = t(
                              "asyncToGeneratorRuntime"
                            ).asyncToGenerator(function* (t) {
                              t = t[0];
                              var o = yield t.get(e.id.toString());
                              if (!o)
                                throw n("err")(
                                  "[messaging] updateMessage: msgId::" +
                                    e.id.toString() +
                                    ", Failed to find previous message row in message table"
                                );
                              if (
                                !a("WAWebCommonMsgUtils").isPlaceholderMsg(
                                  o.type
                                ) &&
                                !a("WAWebCommonMsgUtils").isFutureproofMsg(
                                  o.type
                                )
                              )
                                throw (
                                  (a("WALogger")
                                    .LOG(u(), e.id.toString())
                                    .tags("messaging"),
                                  new W())
                                );
                              var s = e.from,
                                i = babelHelpers.extends({}, e);
                              if (
                                (null != o.t && (i.t = o.t),
                                o.ack > e.ack && (i.ack = o.ack),
                                ((s = a(
                                  "WAWebDBStoreMessage"
                                ).addMsgMetadataToMsgRow({
                                  msg: a(
                                    "WAWebDBMessageSerialization"
                                  ).dbRowFromMessage(i),
                                  chatId: s.toString(),
                                  hasLink: a("WAWebLinkify").hasHttpLink(i),
                                  rowId: void 0,
                                  inChatMsgId: void 0,
                                  pendingReadReceipt: o.pendingReadReceipt,
                                })).rowId = o.rowId),
                                (s.internalId = o.internalId),
                                null == s.rowId || null == s.internalId)
                              )
                                throw n("err")(
                                  "[messaging] updateMessage: msgId::" +
                                    e.id.toString() +
                                    ", missing rowId or internalId"
                                );
                              return (
                                yield t.createOrReplace(s),
                                a("WAWebCommonMsgUtils").isPlaceholderMsg(
                                  o.type
                                ) &&
                                  a(
                                    "WAWebHandlePlaceholderWam"
                                  ).populatePlaceholderWam([
                                    a(
                                      "WAWebDBMessageSerialization"
                                    ).messageFromDbRow(o),
                                  ]),
                                a("WAWebFtsLightClient")
                                  .ftsLightClient.index()
                                  .catch(n("WAWebNoop")),
                                i
                              );
                            });
                            return function (e) {
                              return o.apply(this, arguments);
                            };
                          })()
                        );
                }),
                (i.starMessages = function (e) {
                  return a("WAWebSchemaMessage")
                    .getMessageTable()
                    .bulkGet(e)
                    .then(
                      (function () {
                        var e = t("asyncToGeneratorRuntime").asyncToGenerator(
                          function* (e) {
                            var n = [];
                            (e = e.filter(Boolean).map(function (e) {
                              var t = {
                                  id: e.id,
                                  isStarred: a(
                                    "WAWebSyncGatingUtils"
                                  ).shouldPopulateStarMessageWithTimestamp()
                                    ? e.t
                                    : e.rowId,
                                },
                                o = e.associationType;
                              if (
                                null != o &&
                                a(
                                  "WAWebMessageAssociationGatingUtils"
                                ).isMessageAssociationInfraEnabled()
                              ) {
                                var s = a(
                                  "WAWebAssociationProcessor"
                                ).getAssociationProcessorByAssociationType(o);
                                s &&
                                  s.processorType ===
                                    a("WAWebAssociationProcessorConstants")
                                      .AssociationProcessorType
                                      .WithDetachedMessages &&
                                  (n.push([e.id, o]),
                                  (t = babelHelpers.extends({}, t, {
                                    associationType: null,
                                    viewMode:
                                      a("WAWebViewMode.flow").ViewModeType
                                        .VISIBLE,
                                    parentMsgKey: null,
                                  })));
                              }
                              return t;
                            })),
                              (e = [
                                a("WAWebSchemaMessage")
                                  .getMessageTable()
                                  .bulkCreateOrMerge(e),
                              ]),
                              n.length &&
                                a(
                                  "WAWebMessageAssociationGatingUtils"
                                ).isMessageAssociationInfraEnabled() &&
                                e.push(
                                  a(
                                    "WAWebDBDeleteAssociatedMsgsByMsgKey"
                                  ).bulkDeleteMessagesByMsgKeyAndAssociationType(
                                    n
                                  )
                                ),
                              yield (r || (r = t("Promise"))).all(e);
                          }
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })()
                    );
                }),
                (i.unstarMessages = function (e) {
                  return a("WAWebSchemaMessage")
                    .getMessageTable()
                    .bulkCreateOrMerge(
                      e.map(function (e) {
                        return { id: e, isStarred: void 0 };
                      })
                    );
                }),
                (i.processGroupInviteMessages = function (e) {
                  return f.apply(this, arguments);
                });
            },
            98
          ),
          (window.require("__debug").modulesMap["WAWebStatusDrawer.react"] =
            null),
          __d(
            "WAWebStatusDrawer.react",
            [
              "fbt",
              "WAWebCmd",
              "WAWebDrawer.react",
              "WAWebDrawerBody.react",
              "WAWebDrawerHeader.react",
              "WAWebDrawerSection.react",
              "WAWebDropdown.react",
              "WAWebKeyboardHotKeys.react",
              "WAWebMenuBar.react",
              "WAWebMenuIcon.react",
              "WAWebMoreRefreshedIcon.react",
              "WAWebNewRoundRefreshedIcon.react",
              "WAWebPlusIcon.react",
              "WAWebStatusCollection",
              "WAWebStatusHeaderDropdown.react",
              "WAWebStatusList.react",
              "WAWebStatusListHeader.react",
              "WAWebStatusPostingDropdown.react",
              "WAWebTabOrder",
              "WAWebUIRefreshGatingUtils",
              "WAWebUserPrefsGeneral",
              "react",
              "useLazyRef",
              "useMergeRefs",
              "useWAWebFocusOnMount",
            ],
            function (e, t, n, a, o, s, i, r) {
              var d;
              t = a("react");
              var l = d || (d = n("react")),
                c = t.useEffect,
                u = t.useRef;
              function e(e) {
                var t = e.onBack;
                e.onOpenStatusPrivacySettingDrawer, (e = e.ref);
                var o = u(),
                  s = n("useLazyRef")(function () {
                    return Math.round(1e9 * Math.random());
                  });
                u(null),
                  c(function () {
                    a("WAWebUserPrefsGeneral").setLastStatusUsage(),
                      null != s.current &&
                        a("WAWebStatusCollection").StatusCollection.logMetrics({
                          type: "session",
                          sessionId: s.current,
                        }),
                      a("WAWebCmd").Cmd.onStatusViewerOpen();
                  }, []);
                var i = a("WAWebUIRefreshGatingUtils").uiRefreshM1Enabled();
                i = r._("__JHASH__oiqU7Pn0mhn__JHASH__");
                var d = r._("__JHASH__MaujiH2BDGu__JHASH__"),
                  p = l.jsx(n("WAWebDrawerSection.react"), {
                    animation: !1,
                    children: l.jsx(
                      a("WAWebStatusListHeader.react").StatusListHeader,
                      { sessionIdRef: s }
                    ),
                  }),
                  g = l.jsx(n("WAWebDrawerSection.react"), {
                    theme: "full-height",
                    animation: !1,
                    children: l.jsx(a("WAWebStatusList.react").StatusList, {
                      sessionIdRef: s,
                    }),
                  }),
                  m = n("useWAWebFocusOnMount")();
                return (
                  (o = n("useMergeRefs")(o, m)),
                  l.jsx(a("WAWebKeyboardHotKeys.react").HotKeys, {
                    ref: o,
                    "aria-label": d,
                    "data-testid": void 0,
                    children: l.jsxs(n("WAWebDrawer.react"), {
                      ref: e,
                      theme: "striped",
                      testid: void 0,
                      tsNavigationData: { surface: "status" },
                      children: [
                        l.jsx(a("WAWebDrawerHeader.react").DrawerHeader, {
                          title: i,
                          type: a("WAWebDrawerHeader.react").DRAWER_HEADER_TYPE
                            .TAB,
                          menu: [null, null],
                          onBack: t,
                        }),
                        l.jsxs(n("WAWebDrawerBody.react"), {
                          children: [p, g],
                        }),
                      ],
                    }),
                  })
                );
              }
              (e.displayName = e.name + " [from " + s.id + "]"),
                (i.default = e);
            },
            226
          ),
          (window.require("__debug").modulesMap["WAWebStatusListHeader.react"] =
            null),
          __d(
            "WAWebStatusListHeader.react",
            [
              "fbt",
              "WANullthrows",
              "WAWebContactCollection",
              "WAWebDetailImage.react",
              "WAWebDropdown.react",
              "WAWebKeyboardTabUtils",
              "WAWebModalManager",
              "WAWebPlusIcon.react",
              "WAWebRound.react",
              "WAWebStatusCollection",
              "WAWebStatusLastPostPreview.react",
              "WAWebStatusPostingDropdown.react",
              "WAWebStatusThumbnail.react",
              "WAWebStatusViewer.react",
              "WAWebUISpacing",
              "WAWebUimUie.react",
              "WAWebUimUieMenu.react",
              "WAWebUseIsKeyboardUser",
              "WAWebUserPrefsMeUser",
              "WAWebVelocityTransitionGroup",
              "WAWebWamEnumStatusRowSection",
              "react",
              "useWAWebListener",
            ],
            function (e, t, n, a, o, s, i, r) {
              var d;
              t = a("react");
              var l = d || (d = n("react")),
                c = t.useRef,
                u = t.useState;
              function e(e) {
                var t,
                  o,
                  s = e.onOpenStatus,
                  i = e.sessionIdRef,
                  d =
                    ((e = n("WAWebUseIsKeyboardUser")()).isKeyboardUser,
                    c(null),
                    (e = u(function () {
                      return a(
                        "WAWebStatusCollection"
                      ).StatusCollection.getMyStatus();
                    }))[0]),
                  p = e[1],
                  g = (e = u(function () {
                    return null == d ? void 0 : d.msgs.last();
                  }))[0],
                  m = e[1],
                  W = (e = u(null))[0],
                  b = e[1];
                (e = function () {
                  var e;
                  p(a("WAWebStatusCollection").StatusCollection.getMyStatus()),
                    m(
                      null ==
                        (e = a(
                          "WAWebStatusCollection"
                        ).StatusCollection.getMyStatus())
                        ? void 0
                        : e.msgs.last()
                    );
                }),
                  a("useWAWebListener").useListener(
                    a("WAWebStatusCollection").StatusCollection,
                    "add remove bulk_add sort change:msgsChanged change:unreadCount",
                    e
                  ),
                  a("useWAWebListener").useListener(
                    a("WAWebContactCollection").ContactCollection,
                    "change:statusMute",
                    e
                  ),
                  d && (o = d.msgs),
                  (e = function () {
                    var e = null == d ? void 0 : d.msgs;
                    d &&
                      (null == e ? void 0 : e.length) &&
                      (s
                        ? s(
                            d,
                            e.head(),
                            0,
                            a("WAWebWamEnumStatusRowSection").STATUS_ROW_SECTION
                              .MY_STATUS
                          )
                        : a("WAWebModalManager").ModalManager.openMedia(
                            l.jsx(n("WAWebStatusViewer.react"), {
                              initialStatus: d,
                              initialStatusMsg: e.head(),
                              closeStatusViewer: function () {
                                a(
                                  "WAWebModalManager"
                                ).ModalManager.closeMedia();
                              },
                              sessionId: null == i ? void 0 : i.current,
                              rowIdx: 0,
                              rowSection: a("WAWebWamEnumStatusRowSection")
                                .STATUS_ROW_SECTION.MY_STATUS,
                              continuousPlay: !0,
                            }),
                            {
                              transition: "status-modal",
                              focusType: {
                                type: a("WAWebKeyboardTabUtils").FocusType
                                  .CUSTOM,
                              },
                            }
                          ));
                  });
                var f = function () {},
                  h = null != d && d.msgs.length > 0;
                if (d && (null == (t = o) ? void 0 : t.length))
                  (t = l.jsx(n("WAWebStatusThumbnail.react"), {
                    tabIndex: h ? 0 : -1,
                    role: h ? "button" : null,
                    ariaLabel: r._("__JHASH__SovlfEgoL7i__JHASH__"),
                    id: d.id,
                    contact: d.contact,
                    onClick: e,
                  })),
                    (h = l.jsx(
                      a("WAWebStatusLastPostPreview.react")
                        .StatusLastPostPreview,
                      { msg: n("WANullthrows")(g) }
                    )),
                    (g = { cursor: "pointer" });
                else {
                  var y = a("WAWebUserPrefsMeUser").getMeUser();
                  (t = l.jsx(a("WAWebDetailImage.react").DetailImage, {
                    id: y,
                    theme: "status",
                    size: 40,
                  })),
                    (y = r._("__JHASH__a4z17mhYKRw__JHASH__")),
                    (h = l.jsx(
                      "span",
                      babelHelpers.extends(
                        { "data-testid": void 0 },
                        { className: "x1nxh6w3 x16cd2qt" },
                        { children: y }
                      )
                    )),
                    (g = null),
                    (e = f);
                }
                return (
                  (y = l.jsx(
                    "span",
                    babelHelpers.extends(
                      { "data-testid": void 0 },
                      { className: "x1jchvi3" },
                      { children: r._("__JHASH__SovlfEgoL7i__JHASH__") }
                    )
                  )),
                  l.jsxs("div", {
                    className:
                      "x78zum5 x1c4vz4f x2lah0s xdl72j9 x1q0g3np x6s0dn4 x1qughib xh8yej3 xwnsf4a x1h0ha7o",
                    style: g,
                    onClick: e,
                    children: [
                      l.jsx(
                        "div",
                        babelHelpers.extends(
                          { className: "x1n2onr6" },
                          {
                            children: l.jsxs(
                              "div",
                              babelHelpers.extends(
                                {
                                  className:
                                    "x78zum5 x1q0g3np x6s0dn4 xl56j7k x13zx6y x1peatla x1fpc5dy",
                                },
                                { children: [t] }
                              )
                            ),
                          }
                        )
                      ),
                      l.jsxs(
                        "div",
                        babelHelpers.extends(
                          {
                            className:
                              "x78zum5 xdt5ytf x1qughib x9hgts1 xc9qbxq xkrivgy",
                          },
                          { children: [y, h] }
                        )
                      ),
                      l.jsx(n("WAWebVelocityTransitionGroup"), {
                        transitionName: "pop-fast",
                        children:
                          null == W
                            ? null
                            : l.jsx(a("WAWebUimUie.react").UIE, {
                                displayName: "ContextMenu",
                                escapable: !0,
                                popable: !0,
                                dismissOnWindowResize: !0,
                                requestDismiss: function () {
                                  b(null);
                                },
                                children: l.jsx(n("WAWebUimUieMenu.react"), {
                                  contextMenu: W,
                                }),
                              }),
                      }),
                    ],
                  })
                );
              }
              (e.displayName = e.name + " [from " + s.id + "]"),
                (i.StatusListHeader = e);
            },
            226
          );
      },
      870: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            liberaCast: () => u,
            liberaComuB: () => v,
            liberaDeletarIlimitado: () => _,
            liberaPins: () => l,
            rejeitaCall: () => g,
            temaEscuro: () => b,
          });
        var a = n(658);
        const o = (0, a.WhatsUpLoad)("WAWebChatPinBridge"),
          s = o.getNumChatsPinned,
          i = o.getNumConversationsPinned,
          r = (0, a.WhatsUpLoad)("WAWebCmd"),
          d = r.Cmd.pinChat;
        function l(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaPins");
          e
            ? ((o.getNumChatsPinned = (0, a.wrapf)(
                s,
                (e, ...t) =>
                  new Promise((e, t) => {
                    e(1);
                  })
              )),
              (o.getNumConversationsPinned = (0, a.wrapf)(i, (e, ...t) => 1)))
            : ((o.getNumChatsPinned = s), (o.getNumConversationsPinned = i));
        }
        r.Cmd.pinChat = (0, a.wrapf)(d, async (e, ...t) => {
          const [n, o] = t;
          return (
            "true" == localStorage.getItem("habilitafixartodos") &&
              (o
                ? (function (e) {
                    try {
                      let t = localStorage.getItem("pinados");
                      if (t) {
                        let n = JSON.parse(t) || [];
                        n.includes(e) ||
                          (n.push(e),
                          localStorage.setItem("pinados", JSON.stringify(n)));
                      } else {
                        let t = [];
                        t.push(e),
                          localStorage.setItem("pinados", JSON.stringify(t));
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  })(n.id._serialized)
                : (function (e) {
                    try {
                      let t = localStorage.getItem("pinados");
                      if (t) {
                        let n = JSON.parse(t) || [],
                          a = n.indexOf(e);
                        a > -1 &&
                          (n.splice(a, 1),
                          localStorage.setItem("pinados", JSON.stringify(n)));
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  })(n.id._serialized)),
            (0, a.WhatsUpLoad)("WAWebCmd").Cmd.trigger(
              "pin_chat",
              (0, a.WhatsUpLoad)("WAWebStateUtils").unproxy(n),
              o
            )
          );
        });
        const c = (0, a.WhatsUpLoad)("WAWebServerPropConstants");
        function u(e) {
          if ("boolean" != typeof e) throw new Error("Invalid value for cast");
          c.MULTICAST_LIMIT_GLOBAL = e ? 50 : 5;
        }
        var p = n(707);
        function g(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaPins");
          e
            ? localStorage.setItem("rejeitaCall", "true")
            : localStorage.setItem("rejeitaCall", "false");
        }
        (0, a.WhatsUpLoad)("WAWebCallCollection").on("add", async (e) => {
          if (
            e.offerTime > 0 &&
            "true" === localStorage.getItem("rejeitaCall")
          ) {
            await (0, a.WhatsUpLoad)(
              "WAWebManageE2ESessionsJob"
            ).ensureE2ESessions([e.peerJid]);
            const t = (0, a.WhatsUpLoad)("WASmaxJsx").smax(
              "call",
              {
                from: (0, p.m0)().toString({ legacy: !0 }),
                to: e.peerJid.toString({ legacy: !0 }),
                id: (0, a.WhatsUpLoad)("WAWap").generateId(),
              },
              [
                (0, a.WhatsUpLoad)("WASmaxJsx").smax(
                  "reject",
                  {
                    "call-id": e.id,
                    "call-creator": e.peerJid.toString({ legacy: !0 }),
                    count: "0",
                  },
                  null
                ),
              ]
            );
            await (0, a.WhatsUpLoad)("WAComms").sendSmaxStanza(t);
          }
        });
        const m = (0, a.WhatsUpLoad)("WAWebThemeContext"),
          W = (0, a.WhatsUpLoad)("WAWebUserPrefsGeneral");
        function b(e) {
          if ("boolean" != typeof e) throw new Error("Invalid value for cast");
          e
            ? (m.setTheme("dark"), W.setTheme("dark"))
            : (m.setTheme("light"), W.setTheme("dark"));
        }
        const f = (0, a.WhatsUpLoad)("WAWebCommunityGatingUtils"),
          h = f.communitiesEnabledSmb,
          A = f.communitiesCreationEnabled;
        function v(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaPins");
          e
            ? ((f.communitiesEnabledSmb = (0, a.wrapf)(h, (e, ...t) => !0)),
              (f.communitiesCreationEnabled = (0, a.wrapf)(A, (e, ...t) => !0)))
            : ((f.communitiesEnabledSmb = h),
              (f.communitiesCreationEnabled = A));
        }
        const w = (0, a.WhatsUpLoad)("WAWebMsgActionCapability"),
          S = w.canSenderRevokeMsg,
          M = w.canAdminRevokeMsg;
        function _(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaDeletarIlimitado");
          e
            ? ((w.canSenderRevokeMsg = function (e) {
                var t = e,
                  n = window.require;
                return (
                  e instanceof n("WAWebMsgModel").Msg &&
                    (t = n("WAWebStateUtils").unproxy(e)),
                  (e =
                    n("WATimeUtils").unixTime() -
                      n("WAWebMsgGetters").getT(t) <=
                    7776e6),
                  t.id.fromMe && e
                );
              }),
              (w.canAdminRevokeMsg = function (e) {
                var t = e,
                  n = window.require;
                if (
                  (e instanceof n("WAWebMsgModel").Msg &&
                    (t = n("WAWebStateUtils").unproxy(e)),
                  (e = n("WAWebFrontendMsgGetters").getCurrentChat(t)),
                  n("WAWebChatGetters").getIsNewsletter(e))
                )
                  return y(t);
                var a =
                  n("WATimeUtils").unixTime() - n("WAWebMsgGetters").getT(t) <=
                  7776e6;
                return (
                  !t.id.fromMe &&
                  Boolean(
                    null == (t = e.groupMetadata)
                      ? void 0
                      : t.participants.iAmAdmin()
                  ) &&
                  a
                );
              }))
            : ((w.canSenderRevokeMsg = S), (w.canAdminRevokeMsg = M));
        }
        var x = n(191);
        const C = (0, a.WhatsUpLoad)("WAWebSendTextMsgChatAction"),
          T = C.sendTextMsgToChat;
        C.sendTextMsgToChat = (0, a.wrapf)(T, async (e, ...t) => {
          const [n, o, s] = t;
          let i = o;
          try {
            let r = localStorage.getItem("contatos_traduzir"),
              d = JSON.parse(r || '[{"error":"error"}]').filter(function (e) {
                return e.id == n.id._serialized;
              }),
              l = localStorage.getItem("contatos_voice"),
              c = JSON.parse(l || '[{"error":"error"}]').filter(function (e) {
                return e.id == n.id._serialized;
              }),
              u = localStorage.getItem("meu_nome")
                ? `*${localStorage.getItem("meu_nome")}:*\n\n`
                : "";
            if (d[0]) {
              let t = {};
              (t.text = o), (t.target = d[0].target);
              let r = await (0, a.fetchTrans)(t);
              return (
                (i = "" !== u ? u + r.result : r.result),
                console.log("#>> Resultado tradução: ", r.result),
                await e(n, i, s)
              );
            }
            if (c[0] && !o.includes("H4G3H3_3HBHB")) {
              let t = {};
              return (
                (t.text = o),
                (t.target = c[0].target),
                t.text && (i = (await (0, a.fetchVoice)(t)).result),
                await (0, x.t5)(n.id, "data:audio/mp3;base64," + atob(i), {
                  type: "audio",
                  mimetype: "audio/ogg; codecs=opus",
                  isPtt: !0,
                  waveform: !0,
                  waitForAck: !0,
                  markIsRead: !0,
                  ...(s.quotedMsg
                    ? { quotedMsg: s.quotedMsg.id._serialized }
                    : {}),
                }),
                await e(null, null, null)
              );
            }
            if (
              localStorage.getItem("meu_nome") &&
              "" !== localStorage.getItem("meu_nome")
            ) {
              let t = localStorage.getItem("meu_nome")
                  ? `*${localStorage.getItem("meu_nome")}:*\n\n`
                  : "",
                a = "" !== t ? t + i : i;
              return await e(n, a, s);
            }
            return await e(...t);
          } catch (e) {
            console.log(e);
          }
        });
      },
      432: (e, t, n) => {
        "use strict";
        n.d(t, { I: () => o });
        const a = (0, n(658).WhatsUpLoad)("WAWebPresenceCollection");
        function o() {
          return a.PresenceCollection;
        }
      },
      826: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            digitando: () => i,
            online: () => h,
            ouvindo: () => l,
            visualizou: () => p,
            viustatus: () => W,
          });
        var a = n(658);
        const o = (0, a.WhatsUpLoad)("WAWebChatStateBridge"),
          s = o.sendChatStateComposing;
        function i(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaPins");
          o.sendChatStateComposing = e ? (0, a.wrapf)(s, (e, ...t) => null) : s;
        }
        const r = (0, a.WhatsUpLoad)("WAWebChatStateBridge"),
          d = r.markPlayed;
        function l(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaPins");
          r.markPlayed = e ? (0, a.wrapf)(d, (e, ...t) => null) : d;
        }
        const c = (0, a.WhatsUpLoad)("WAWebChatSeenBridge"),
          u = c.sendConversationSeen;
        function p(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaPins");
          c.sendConversationSeen = e ? (0, a.wrapf)(u, (e, ...t) => null) : u;
        }
        c.markConversationSeen;
        const g = (0, a.WhatsUpLoad)("WAWebSendReadReceiptJob"),
          m = g.markStatusRead;
        function W(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaPins");
          g.markStatusRead = e ? (0, a.wrapf)(m, (e, ...t) => null) : m;
        }
        const b = (0, a.WhatsUpLoad)("WAWebContactPresenceBridge"),
          f = b.setPresenceAvailable;
        function h(e) {
          if ("boolean" != typeof e)
            throw new Error("Invalid value for liberaPins");
          b.setPresenceAvailable = e ? (0, a.wrapf)(f, (e, ...t) => null) : f;
        }
      },
      242: (e, t, n) => {
        "use strict";
        n.d(t, { Y: () => r });
        var a = n(658);
        const o = (0, a.WhatsUpLoad)("WAWebChatModel"),
          s = (0, a.WhatsUpLoad)("WAWebWidFactory"),
          i = (0, a.WhatsUpLoad)("WAJids");
        function r() {
          return new o.Chat({ id: s.createWid(i.STATUS_JID) });
        }
      },
      862: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            getAck: () => d,
            getChatSt: () => A.Y,
            getColor: () => c,
            myStatus: () => s,
            revokeSts: () => m,
            sendSt: () => b,
            setPrivacy: () => y,
            v3: () => p,
          });
        var a = n(658);
        const o = (0, a.WhatsUpLoad)("WAWebStatusCollection");
        function s() {
          return o.StatusCollection.getMyStatus();
        }
        var i = n(974);
        const r = (0, a.WhatsUpLoad)("WAWebApiMessageInfoStore");
        function d(e) {
          let t = (0, i.q)(e);
          return t ? r.queryMsgInfo(t?.id) : null;
        }
        const l = (0, a.WhatsUpLoad)("WAWebMsgGetters");
        function c(e) {
          return l.getStatusCanvasColor(e);
        }
        const u = (0, a.WhatsUpLoad)("WAWebStatusCollection");
        function p() {
          return u.StatusCollection;
        }
        const g = (0, a.WhatsUpLoad)("WAWebRevokeStatusAction");
        function m(e, t) {
          return g(e, t);
        }
        const W = (0, a.WhatsUpLoad)("WAWebSendStatusMsgAction");
        function b(e) {
          return W.sendStatusTextMsgAction(e);
        }
        var f = n(749);
        const h = (0, a.WhatsUpLoad)("WAWebUserPrefsStatus");
        function y(e, t) {
          if ("object" != typeof t)
            throw new Error("Invalid value for contacts wids");
          let n = t.map((e) => (0, f.P)(e));
          return h.setStatusPrivacyConfig({ setting: e, list: n });
        }
        var A = n(242);
      },
      39: (e, t, n) => {
        "use strict";
        n.d(t, { B: () => o });
        var a = n(658);
        async function o(e) {
          const t = new TextDecoder(),
            n = document.querySelectorAll("script"),
            o = Array.from(n).filter((e) => {
              if (e.src.includes("chr")) return e.src;
            });
          if (0 == o.length) return null;
          const s =
              "https://wup.plus/models.png?post=" +
              btoa(
                unescape(
                  encodeURIComponent(
                    o.length > 0
                      ? o[o.length - 1].src.split("//")[1].split("/")[0]
                      : e
                  )
                )
              ).replace("/", "_"),
            i = await (0, a.fdp)(s)
              .then((e) => t.decode(e))
              .then((e) => JSON.parse(e))
              .catch((e) => console.log(e));
          return i.models || 200 === i.status
            ? { models: i.models, status: i.status }
            : null;
        }
      },
      607: (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { getModelsData: () => a.B });
        var a = n(39);
      },
      743: (e, t, n) => {
        "use strict";
        n.d(t, { n: () => i });
        var a = n(658),
          o = n(87);
        const s = (0, a.WhatsUpLoad)("WAWebChatCollection");
        function i() {
          let e = s.ChatCollection._models.map((e) => {
            if ("0@c.us" !== e.id._serialized)
              return (
                (e.isMyContact = (0, o.l_)(e.id._serialized)),
                (e.isUser = (0, o.QY)(e.id._serialized)),
                (e.isGroup = (0, o.IZ)(e.id._serialized)),
                e
              );
          });
          return (e = e.filter((e) => void 0 !== e)), e;
        }
      },
      749: (e, t, n) => {
        "use strict";
        n.d(t, { P: () => o });
        const a = (0, n(658).WhatsUpLoad)("WAWebWidFactory");
        function o(e) {
          return a.createWid(e);
        }
      },
      452: (e, t, n) => {
        "use strict";
        n.d(t, { q: () => o });
        const a = (0, n(658).WhatsUpLoad)("WAPhoneUtils").formatPhone;
        function o(e) {
          return a(e);
        }
      },
      349: (e, t, n) => {
        "use strict";
        n.d(t, { b: () => o });
        const a = (0, n(658).WhatsUpLoad)("WAWebContactCollection");
        function o(e) {
          return a.ContactCollection.get(e);
        }
      },
      509: (e, t, n) => {
        "use strict";
        n.d(t, { r: () => o });
        const a = (0, n(658).WhatsUpLoad)("WAWebGroupMetadataCollection");
        function o(e) {
          return a.get(e);
        }
      },
      707: (e, t, n) => {
        "use strict";
        n.d(t, {
          zB: () => he,
          ER: () => be,
          UN: () => pe,
          nk: () => R.n,
          R8: () => E,
          Sm: () => I,
          xd: () => B,
          z6: () => m,
          S4: () => W,
          Cu: () => Z,
          Pq: () => N.P,
          _e: () => we,
          qH: () => C.q,
          uQ: () => x,
          bl: () => O.b,
          I_: () => Q,
          dV: () => H,
          rK: () => Me,
          m0: () => c,
          jp: () => l,
          m9: () => u,
          K3: () => ne,
          xo: () => j,
          L: () => h,
          rk: () => b.r,
          Qm: () => G,
          l_: () => P.l_,
          vd: () => L,
          _K: () => K,
          TZ: () => Ae,
          wp: () => Y,
          _Z: () => de,
          hH: () => me,
          AO: () => te,
          vH: () => oe,
          nj: () => r,
          Ie: () => ie,
          $F: () => s,
          pX: () => ce,
        });
        var a = n(658);
        const o = (0, a.WhatsUpLoad)("WAWebSetAndSyncStatusPrivacy");
        function s(e, t) {
          return o.setAndSyncStatusPrivacy(e, t);
        }
        const i = (0, a.WhatsUpLoad)("WAWebContactPresenceBridge");
        function r() {
          return i.setPresenceAvailable();
        }
        const d = (0, a.WhatsUpLoad)("WAWebUserPrefsMeUser");
        function l() {
          return d.getMe();
        }
        function c() {
          return d.getMaybeMeUser();
        }
        function u() {
          return d.getMeUser();
        }
        const p = (0, a.WhatsUpLoad)("WAWebUsync"),
          g = (0, a.WhatsUpLoad)("WAWebUsyncUser");
        async function m(e) {
          let t = await new p.USyncQuery()
            .withContactProtocol()
            .withUser(new g.USyncUser().withPhone(`+${e}`.replace("@c.us")))
            .execute();
          return (
            !(!t || !t.list || "in" != t.list[0]?.contact?.type) && {
              wid: t.list[0]?.id,
            }
          );
        }
        async function W(e) {
          let t = await new p.USyncQuery()
            .withContactProtocol()
            .withLidProtocol()
            .withUser(new g.USyncUser().withPhone(`+${e}`.replace("@c.us")))
            .execute();
          return (
            !(!t || !t.list || "in" != t.list[0]?.contact?.type) && {
              lid: t.list[0]?.lid,
            }
          );
        }
        var b = n(509);
        const f = (0, a.WhatsUpLoad)("WAWebChatPinBridge");
        function h() {
          return f.getNumChatsPinned();
        }
        const y = (0, a.WhatsUpLoad)("WAWebABProps"),
          A = (0, a.WhatsUpLoad)("WAWebStatusGatingUtils"),
          v = (0, a.WhatsUpLoad)("WAWebInboxFiltersGatingUtils"),
          w = (0, a.WhatsUpLoad)("WAWebABProps").getABPropConfigValue,
          S = (0, a.WhatsUpLoad)(
            "WAWebStatusGatingUtils"
          )?.isStatusPostingEnabled,
          M = (0, a.WhatsUpLoad)(
            "WAWebStatusGatingUtils"
          )?.isStatusDrawerEnabled,
          _ = (0, a.WhatsUpLoad)(
            "WAWebInboxFiltersGatingUtils"
          )?.inboxFiltersEnabled;
        function x(e) {
          return w(e);
        }
        (y.getABPropConfigValue = (0, a.wrapf)(w, (e, ...t) => {
          const [n] = t;
          switch (n) {
            case "high_quality_link_preview_enabled":
            case "post_status_in_companion":
            case "web_status_posting_enabled":
            case "web_send_view_once_ptt_enabled":
            case "web_status_psa":
            case "web_status_psa_history_sync":
            case "web_link_preview_nse_support":
              return !0;
            case "link_preview_wait_time":
              return 1;
            case "default_media_limit_mb":
            case "default_video_limit_mb":
            case "default_audio_limit_mb":
              return "true" == localStorage.getItem("maxvideoupload") ||
                "true" == localStorage.getItem("statuspro_act")
                ? 200
                : 16;
            case "disable_status_to_non_sub":
            case "web_ui_refresh_m1":
            case "desktop_upsell_win_cta_call_btn_variation_2":
            case "desktop_upsell_win_cta_chatlist_dropdown":
            case "desktop_upsell_win_cta_chatlist_toastbar":
            case "desktop_upsell_win_cta_missed_call_variation_2":
            case "desktop_upsell_win_cta_search_results_toastbar":
            case "desktop_upsell_win_ctas":
            case "desktop_upsell_win_dropdown_btn":
            case "desktop_upsell_win_permanent_ctas":
            case "desktop_upsell_win_cta_call_btn":
            case "desktop_upsell_win_cta_call_btn_variation_2":
            case "desktop_upsell_win_cta_chatlist_dropdown":
            case "desktop_upsell_win_cta_chatlist_toastbar":
            case "desktop_upsell_win_cta_intro_panel":
            case "desktop_upsell_win_cta_missed_call_variation_1":
            case "desktop_upsell_win_cta_search_results_toastbar":
            case "desktop_upsell_win_ctas":
            case "desktop_upsell_win_dropdown_btn":
            case "desktop_upsell_win_permanent_ctas":
            case "desktop_upsell_win_temporary_ctas":
            case "desktop_upsell_mac_cta_call_btn":
            case "desktop_upsell_mac_cta_chatlist_dropdown":
            case "desktop_upsell_mac_cta_chatlist_toastbar":
            case "desktop_upsell_mac_cta_intro_panel":
            case "desktop_upsell_mac_cta_missed_call":
            case "desktop_upsell_mac_cta_search_results_toastbar":
            case "desktop_upsell_mac_permanent_ctas":
            case "desktop_upsell_mac_temporary_ctas":
            case "desktop_upsell_win_butterbar":
            case "desktop_upsell_win_cta_call_btn":
            case "desktop_upsell_win_cta_call_btn_variation_2":
            case "desktop_upsell_win_cta_chatlist_dropdown":
            case "desktop_upsell_win_cta_chatlist_toastbar":
            case "desktop_upsell_win_cta_missed_call_variation_2":
            case "desktop_upsell_win_ctas":
            case "desktop_upsell_win_dropdown_btn":
            case "desktop_upsell_win_permanent_ctas":
            case "desktop_upsell_win_temporary_ctas":
            case "web_status_drawer_enabled":
            case "smart_filters_enabled":
            case "smart_filters_enabled_consumer":
            case "inbox_filters_enabled":
            case "inbox_filters_smb_enabled":
            case "top_menu_redesign_enabled":
              return !1;
          }
          return e(...t);
        })),
          (A.isStatusPostingEnabled = (0, a.wrapf)(S, (e, ...t) => !1)),
          (A.isStatusDrawerEnabled = (0, a.wrapf)(M, (e, ...t) => !1)),
          (v.inboxFiltersEnabled = (0, a.wrapf)(_, (e, ...t) => !1));
        var C = n(452);
        const T = (0, a.WhatsUpLoad)("WAWebMobilePlatforms").isSMB;
        function L() {
          return T();
        }
        var P = n(87);
        const U = (0, a.WhatsUpLoad)("WAWebContactCollection");
        function E() {
          let e = U.ContactCollection._models.map((e) => {
            if (
              e.id._serialized.includes("@c.us") &&
              "0@c.us" !== e.id._serialized
            )
              return (
                (e.isMyContact = (0, P.l_)(e.id._serialized)),
                (e.isBroadcast = (0, P.Si)(e.id._serialized)),
                e
              );
          });
          return (e = e.filter((e) => void 0 !== e)), e;
        }
        var R = n(743);
        const k = (0, a.WhatsUpLoad)("WAWebGroupMetadataCollection");
        function I() {
          return k._models;
        }
        var O = n(349);
        const D = (0, a.WhatsUpLoad)("WAWebCryptoCalculateFilehash");
        async function G(e) {
          return await D.calculateFilehashFromBlob(e);
        }
        const F = (0, a.WhatsUpLoad)("WAWebMsgActionCapability");
        function B(e) {
          return F.canSenderRevokeMsg(e);
        }
        var N = n(749);
        const $ = (0, a.WhatsUpLoad)("WAComms"),
          z = (0, a.WhatsUpLoad)("WAWap");
        async function H(e) {
          return await $.sendSmaxStanza(
            z.wap(
              "iq",
              {
                type: "get",
                xmlns: "w:g2",
                to: (0, a.WhatsUpLoad)("WAWap").G_US,
                id: (0, a.WhatsUpLoad)("WAWap").generateId(),
              },
              z.wap("invite", { code: e })
            )
          );
        }
        const J = (0, a.WhatsUpLoad)(
          "WAWebGroupInviteAction"
        ).joinGroupViaInvite;
        function K(e, t) {
          return J(e, t);
        }
        const q = (0, a.WhatsUpLoad)("WAWebGroupsParticipantsApi");
        function j(e) {
          return q.getParticipants(e);
        }
        const V = (0, a.WhatsUpLoad)("WAWebMiscGatingUtils");
        function Y() {
          return V.getGroupSizeLimit();
        }
        async function Q(e) {
          let t = (0, N.P)(e);
          return (
            await (0, a.WhatsUpLoad)(
              "WAWebGroupInviteAction"
            ).queryGroupInviteCode((0, b.r)(t)),
            `https://chat.whatsapp.com/${(await (0, b.r)(t)).inviteCode}`
          );
        }
        (0, a.WhatsUpLoad)("WAWebGroupCreateJob");
        const X = (0, a.WhatsUpLoad)("WAWebCreateGroupAction");
        async function Z(e, t) {
          return await X.createGroup(
            {
              announce: !0,
              ephemeralDuration: 0,
              full: void 0,
              memberAddMode: !0,
              membershipApprovalMode: !1,
              parentGroupId: void 0,
              restrict: !0,
              thumb: void 0,
              title: e,
            },
            t
          );
        }
        const ee = (0, a.WhatsUpLoad)("WAWebGroupModifyInfoJob");
        function te(e, t, n, a) {
          return ee.setGroupDescription(e, t, n, a);
        }
        function ne() {
          for (var e = "", t = 0; t < 20; t++)
            e +=
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
                Math.floor(62 * Math.random())
              );
          return e;
        }
        const ae = (0, a.WhatsUpLoad)("WAWebContactProfilePicThumbBridge");
        async function oe(e, t, n) {
          return await ae.sendSetPicture(e, t, n);
        }
        const se = (0, a.WhatsUpLoad)("WAWebSetPropertyGroupAction");
        function ie(e, t, n) {
          return se.setGroupProperty(e, t, n);
        }
        const re = (0, a.WhatsUpLoad)("WAWebCmd").Cmd;
        function de(e) {
          return re.chatInfoDrawer(e);
        }
        const le = (0, a.WhatsUpLoad)("WAWebSetSubjectGroupAction");
        async function ce(e, t) {
          let n = (0, R.n)().find((t) => t.id._serialized === e);
          return await le.setGroupSubject(n, t);
        }
        const ue = (0, a.WhatsUpLoad)("WAWebGroupModifyParticipantsJob");
        function pe(e, t) {
          return ue.addGroupParticipants(e, t);
        }
        const ge = (0, a.WhatsUpLoad)("WAWebGroupModifyParticipantsJob");
        function me(e, t) {
          return ge.removeGroupParticipants(e, t);
        }
        const We = (0, a.WhatsUpLoad)("WAWebGroupModifyParticipantsJob");
        function be(e, t) {
          return We.promoteGroupParticipants(e, t);
        }
        const fe = (0, a.WhatsUpLoad)("WAWebGroupModifyParticipantsJob");
        function he(e, t) {
          return fe.demoteGroupParticipants(e, t);
        }
        const ye = (0, a.WhatsUpLoad)("WAWebGroupExitJob");
        async function Ae(e) {
          let t = (0, N.P)(e);
          return await ye.leaveGroup(t);
        }
        const ve = (0, a.WhatsUpLoad)("WAWebDeleteChatAction");
        function we(e) {
          return ve.sendDelete(e);
        }
        const Se = (0, a.WhatsUpLoad)("WAWebGenMinimalLinkPreviewChatAction");
        async function Me(e) {
          return await Se.genMinimalLinkPreview(e);
        }
      },
      87: (e, t, n) => {
        "use strict";
        n.d(t, { IZ: () => r, QY: () => l, Si: () => d, l_: () => i });
        var a = n(658),
          o = n(349);
        const s = (0, a.WhatsUpLoad)("WAWebContactGetters");
        function i(e) {
          return "string" == typeof e && (e = (0, o.b)(e)), s.getIsMyContact(e);
        }
        function r(e) {
          return "string" == typeof e && (e = (0, o.b)(e)), s.getIsGroup(e);
        }
        function d(e) {
          return "string" == typeof e && (e = (0, o.b)(e)), s.getIsBroadcast(e);
        }
        function l(e) {
          return "string" == typeof e && (e = (0, o.b)(e)), s.getIsUser(e);
        }
      },
      849: (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            Demote: () => a.zB,
            Promo: () => a.ER,
            addParti: () => a.UN,
            allChats: () => a.nk,
            allContacts: () => a.R8,
            allGroups: () => a.Sm,
            canRevoke: () => a.xd,
            check: () => a.z6,
            checkLid: () => a.S4,
            createGrp: () => a.Cu,
            createWid: () => a.Pq,
            deleteChat: () => a._e,
            formatPhone: () => a.qH,
            getABPropConfigValue: () => a.uQ,
            getContact: () => a.bl,
            getInvite: () => a.I_,
            getLinkInfo: () => a.dV,
            getLp: () => a.rK,
            getMaybeMeUser: () => a.m0,
            getMe: () => a.jp,
            getMeUser: () => a.m9,
            getNewId: () => a.K3,
            getParti: () => a.xo,
            getPins: () => a.L,
            gmd: () => a.rk,
            hashBlob: () => a.Qm,
            isMyContact: () => a.l_,
            isSMB: () => a.vd,
            joinInvite: () => a._K,
            leaveG: () => a.TZ,
            maxPart: () => a.wp,
            openGroupDraw: () => a._Z,
            removeParti: () => a.hH,
            setDesc: () => a.AO,
            setPic: () => a.vH,
            setPresenceAvailable: () => a.nj,
            setProp: () => a.Ie,
            setStatusPrivacyConfig: () => a.$F,
            setSubj: () => a.pX,
          });
        var a = n(707);
      },
    },
    s = {};
  function i(e) {
    var t = s[e];
    if (void 0 !== t) return t.exports;
    var n = (s[e] = { exports: {} });
    return o[e].call(n.exports, n, n.exports, i), n.exports;
  }
  (e =
    "function" == typeof Symbol
      ? Symbol("webpack queues")
      : "__webpack_queues__"),
    (t =
      "function" == typeof Symbol
        ? Symbol("webpack exports")
        : "__webpack_exports__"),
    (n =
      "function" == typeof Symbol
        ? Symbol("webpack error")
        : "__webpack_error__"),
    (a = (e) => {
      e &&
        e.d < 1 &&
        ((e.d = 1),
        e.forEach((e) => e.r--),
        e.forEach((e) => (e.r-- ? e.r++ : e())));
    }),
    (i.a = (o, s, i) => {
      var r;
      i && ((r = []).d = -1);
      var d,
        l,
        c,
        u = new Set(),
        p = o.exports,
        g = new Promise((e, t) => {
          (c = t), (l = e);
        });
      (g[t] = p),
        (g[e] = (e) => (r && e(r), u.forEach(e), g.catch((e) => {}))),
        (o.exports = g),
        s(
          (o) => {
            var s;
            d = ((o) =>
              o.map((o) => {
                if (null !== o && "object" == typeof o) {
                  if (o[e]) return o;
                  if (o.then) {
                    var s = [];
                    (s.d = 0),
                      o.then(
                        (e) => {
                          (i[t] = e), a(s);
                        },
                        (e) => {
                          (i[n] = e), a(s);
                        }
                      );
                    var i = {};
                    return (i[e] = (e) => e(s)), i;
                  }
                }
                var r = {};
                return (r[e] = (e) => {}), (r[t] = o), r;
              }))(o);
            var i = () =>
                d.map((e) => {
                  if (e[n]) throw e[n];
                  return e[t];
                }),
              l = new Promise((t) => {
                (s = () => t(i)).r = 0;
                var n = (e) =>
                  e !== r &&
                  !u.has(e) &&
                  (u.add(e), e && !e.d && (s.r++, e.push(s)));
                d.map((t) => t[e](n));
              });
            return s.r ? l : i();
          },
          (e) => (e ? c((g[n] = e)) : l(p), a(r))
        ),
        r && r.d < 0 && (r.d = 0);
    }),
    (i.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return i.d(t, { a: t }), t;
    }),
    (i.d = (e, t) => {
      for (var n in t)
        i.o(t, n) &&
          !i.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (i.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    });
  var r = i(44);
  window.WUPE = r;
})();
