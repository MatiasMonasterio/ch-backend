var normalizr = (function (t) {
  "use strict";
  function e(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r);
    }
  }
  function n(t, n, r) {
    return n && e(t.prototype, n), r && e(t, r), t;
  }
  function r() {
    return (r =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        }
        return t;
      }).apply(this, arguments);
  }
  function i(t, e) {
    (t.prototype = Object.create(e.prototype)),
      (t.prototype.constructor = t),
      (t.__proto__ = e);
  }
  function o(t) {
    return !(
      !t ||
      "function" != typeof t.hasOwnProperty ||
      !(
        t.hasOwnProperty("__ownerID") ||
        (t._map && t._map.hasOwnProperty("__ownerID"))
      )
    );
  }
  function u(t, e, n) {
    return Object.keys(t).reduce(function (e, r) {
      var i = "" + r;
      return e.has(i) ? e.set(i, n(e.get(i), t[i])) : e;
    }, e);
  }
  var a = (function () {
      function t(t, e, n) {
        if (
          (void 0 === e && (e = {}),
          void 0 === n && (n = {}),
          !t || "string" != typeof t)
        )
          throw new Error(
            "Expected a string key for Entity, but found " + t + "."
          );
        var i = n,
          u = i.idAttribute,
          a = void 0 === u ? "id" : u,
          c = i.mergeStrategy,
          f =
            void 0 === c
              ? function (t, e) {
                  return r({}, t, e);
                }
              : c,
          s = i.processStrategy,
          h =
            void 0 === s
              ? function (t) {
                  return r({}, t);
                }
              : s,
          l = i.fallbackStrategy,
          y = void 0 === l ? function (t, e) {} : l;
        (this._key = t),
          (this._getId =
            "function" == typeof a
              ? a
              : (function (t) {
                  return function (e) {
                    return o(e) ? e.get(t) : e[t];
                  };
                })(a)),
          (this._idAttribute = a),
          (this._mergeStrategy = f),
          (this._processStrategy = h),
          (this._fallbackStrategy = y),
          this.define(e);
      }
      var e = t.prototype;
      return (
        (e.define = function (t) {
          this.schema = Object.keys(t).reduce(function (e, n) {
            var i,
              o = t[n];
            return r({}, e, (((i = {})[n] = o), i));
          }, this.schema || {});
        }),
        (e.getId = function (t, e, n) {
          return this._getId(t, e, n);
        }),
        (e.merge = function (t, e) {
          return this._mergeStrategy(t, e);
        }),
        (e.fallback = function (t, e) {
          return this._fallbackStrategy(t, e);
        }),
        (e.normalize = function (t, e, n, r, i, o) {
          var u = this,
            a = this.getId(t, e, n),
            c = this.key;
          if (
            (c in o || (o[c] = {}),
            a in o[c] || (o[c][a] = []),
            o[c][a].some(function (e) {
              return e === t;
            }))
          )
            return a;
          o[c][a].push(t);
          var f = this._processStrategy(t, e, n);
          return (
            Object.keys(this.schema).forEach(function (e) {
              if (f.hasOwnProperty(e) && "object" == typeof f[e]) {
                var n = u.schema[e],
                  a = "function" == typeof n ? n(t) : n;
                f[e] = r(f[e], f, e, a, i, o);
              }
            }),
            i(this, f, t, e, n),
            a
          );
        }),
        (e.denormalize = function (t, e) {
          var n = this;
          return o(t)
            ? u(this.schema, t, e)
            : (Object.keys(this.schema).forEach(function (r) {
                if (t.hasOwnProperty(r)) {
                  var i = n.schema[r];
                  t[r] = e(t[r], i);
                }
              }),
              t);
        }),
        n(t, [
          {
            key: "key",
            get: function () {
              return this._key;
            },
          },
          {
            key: "idAttribute",
            get: function () {
              return this._idAttribute;
            },
          },
        ]),
        t
      );
    })(),
    c = (function () {
      function t(t, e) {
        e &&
          (this._schemaAttribute =
            "string" == typeof e
              ? function (t) {
                  return t[e];
                }
              : e),
          this.define(t);
      }
      var e = t.prototype;
      return (
        (e.define = function (t) {
          this.schema = t;
        }),
        (e.getSchemaAttribute = function (t, e, n) {
          return !this.isSingleSchema && this._schemaAttribute(t, e, n);
        }),
        (e.inferSchema = function (t, e, n) {
          if (this.isSingleSchema) return this.schema;
          var r = this.getSchemaAttribute(t, e, n);
          return this.schema[r];
        }),
        (e.normalizeValue = function (t, e, n, r, i, o) {
          var u = this.inferSchema(t, e, n);
          if (!u) return t;
          var a = r(t, e, n, u, i, o);
          return this.isSingleSchema || null == a
            ? a
            : { id: a, schema: this.getSchemaAttribute(t, e, n) };
        }),
        (e.denormalizeValue = function (t, e) {
          var n = o(t) ? t.get("schema") : t.schema;
          return this.isSingleSchema || n
            ? e(
                (this.isSingleSchema ? void 0 : o(t) ? t.get("id") : t.id) || t,
                this.isSingleSchema ? this.schema : this.schema[n]
              )
            : t;
        }),
        n(t, [
          {
            key: "isSingleSchema",
            get: function () {
              return !this._schemaAttribute;
            },
          },
        ]),
        t
      );
    })(),
    f = (function (t) {
      function e(e, n) {
        if (!n)
          throw new Error(
            'Expected option "schemaAttribute" not found on UnionSchema.'
          );
        return t.call(this, e, n) || this;
      }
      i(e, t);
      var n = e.prototype;
      return (
        (n.normalize = function (t, e, n, r, i, o) {
          return this.normalizeValue(t, e, n, r, i, o);
        }),
        (n.denormalize = function (t, e) {
          return this.denormalizeValue(t, e);
        }),
        e
      );
    })(c),
    s = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      i(e, t);
      var n = e.prototype;
      return (
        (n.normalize = function (t, e, n, i, o, u) {
          var a = this;
          return Object.keys(t).reduce(function (e, n, c) {
            var f,
              s = t[n];
            return null != s
              ? r(
                  {},
                  e,
                  (((f = {})[n] = a.normalizeValue(s, t, n, i, o, u)), f)
                )
              : e;
          }, {});
        }),
        (n.denormalize = function (t, e) {
          var n = this;
          return Object.keys(t).reduce(function (i, o) {
            var u,
              a = t[o];
            return r({}, i, (((u = {})[o] = n.denormalizeValue(a, e)), u));
          }, {});
        }),
        e
      );
    })(c),
    h = function (t) {
      if (Array.isArray(t) && t.length > 1)
        throw new Error(
          "Expected schema definition to be a single schema, but found " +
            t.length +
            "."
        );
      return t[0];
    },
    l = function (t) {
      return Array.isArray(t)
        ? t
        : Object.keys(t).map(function (e) {
            return t[e];
          });
    },
    y = function (t, e, n, r, i, o, u) {
      return (
        (t = h(t)),
        l(e).map(function (e, a) {
          return i(e, n, r, t, o, u);
        })
      );
    },
    m = function (t, e, n) {
      return (
        (t = h(t)),
        e && e.map
          ? e.map(function (e) {
              return n(e, t);
            })
          : e
      );
    },
    p = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      i(e, t);
      var n = e.prototype;
      return (
        (n.normalize = function (t, e, n, r, i, o) {
          var u = this;
          return l(t)
            .map(function (t, a) {
              return u.normalizeValue(t, e, n, r, i, o);
            })
            .filter(function (t) {
              return null != t;
            });
        }),
        (n.denormalize = function (t, e) {
          var n = this;
          return t && t.map
            ? t.map(function (t) {
                return n.denormalizeValue(t, e);
              })
            : t;
        }),
        e
      );
    })(c),
    d = function (t, e, n, i, o, u, a) {
      var c = r({}, e);
      return (
        Object.keys(t).forEach(function (n) {
          var r = t[n],
            i = "function" == typeof r ? r(e) : r,
            f = o(e[n], e, n, i, u, a);
          null == f ? delete c[n] : (c[n] = f);
        }),
        c
      );
    },
    v = function (t, e, n) {
      if (o(e)) return u(t, e, n);
      var i = r({}, e);
      return (
        Object.keys(t).forEach(function (e) {
          null != i[e] && (i[e] = n(i[e], t[e]));
        }),
        i
      );
    },
    g = function t(e, n, r, i, o, u) {
      return "object" == typeof e && e
        ? "object" != typeof i ||
          (i.normalize && "function" == typeof i.normalize)
          ? i.normalize(e, n, r, t, o, u)
          : (Array.isArray(i) ? y : d)(i, e, n, r, t, o, u)
        : e;
    },
    b = {
      Array: p,
      Entity: a,
      Object: (function () {
        function t(t) {
          this.define(t);
        }
        var e = t.prototype;
        return (
          (e.define = function (t) {
            this.schema = Object.keys(t).reduce(function (e, n) {
              var i,
                o = t[n];
              return r({}, e, (((i = {})[n] = o), i));
            }, this.schema || {});
          }),
          (e.normalize = function () {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
              e[n] = arguments[n];
            return d.apply(void 0, [this.schema].concat(e));
          }),
          (e.denormalize = function () {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
              e[n] = arguments[n];
            return v.apply(void 0, [this.schema].concat(e));
          }),
          t
        );
      })(),
      Union: f,
      Values: s,
    },
    k = function (t) {
      var e = {},
        n = S(t);
      return function t(i, u) {
        return "object" != typeof u ||
          (u.denormalize && "function" == typeof u.denormalize)
          ? null == i
            ? i
            : u instanceof a
            ? (function (t, e, n, i, u) {
                var c = i(t, e);
                if (
                  (void 0 === c && e instanceof a && (c = e.fallback(t, e)),
                  "object" != typeof c || null === c)
                )
                  return c;
                if ((u[e.key] || (u[e.key] = {}), !u[e.key][t])) {
                  var f = o(c) ? c : r({}, c);
                  (u[e.key][t] = f), (u[e.key][t] = e.denormalize(f, n));
                }
                return u[e.key][t];
              })(i, u, t, n, e)
            : u.denormalize(i, t)
          : (Array.isArray(u) ? m : v)(u, i, t);
      };
    },
    S = function (t) {
      var e = o(t);
      return function (n, r) {
        var i = r.key;
        return "object" == typeof n
          ? n
          : e
          ? t.getIn([i, n.toString()])
          : t[i] && t[i][n];
      };
    };
  return (
    (t.denormalize = function (t, e, n) {
      if (void 0 !== t) return k(n)(t, e);
    }),
    (t.normalize = function (t, e) {
      if (!t || "object" != typeof t)
        throw new Error(
          'Unexpected input given to normalize. Expected type to be "object", found "' +
            (null === t ? "null" : typeof t) +
            '".'
        );
      var n = {},
        r = (function (t) {
          return function (e, n, r, i, o) {
            var u = e.key,
              a = e.getId(r, i, o);
            u in t || (t[u] = {});
            var c = t[u][a];
            t[u][a] = c ? e.merge(c, n) : n;
          };
        })(n);
      return { entities: n, result: g(t, t, null, e, r, {}) };
    }),
    (t.schema = b),
    Object.defineProperty(t, "__esModule", { value: !0 }),
    t
  );
})({});

const messageForm = document.querySelector("#message-form");
const messageContainer = document.querySelector("#message-container");
const compressionTitle = document.querySelector("#compression");

const authorSchema = new normalizr.schema.Entity("authors");
const messageSchema = new normalizr.schema.Entity("messages", {
  author: authorSchema,
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("input[name=email]").value;
  const name = document.querySelector("input[name=name]").value;
  const lastname = document.querySelector("input[name=lastname]").value;
  const age = document.querySelector("input[name=age]").value;
  const alias = document.querySelector("input[name=alias]").value;
  const avatar = document.querySelector("input[name=avatar]").value;
  const message = document.querySelector("textarea[name=message]").value;

  const author = { name, email, lastname, age, alias, avatar };

  socket.emit("add-message", { author, text: message });

  messageForm.reset();
});

const getAllMessages = async () => {
  const response = await fetch("/api/messages");
  const { data: messagesNormalized } = await response.json();

  const messages = normalizr.denormalize(
    messagesNormalized.result,
    [messageSchema],
    messagesNormalized.entities
  );

  console.log(messagesNormalized);

  const messagesRows = messages.map((message) => buildMessage(message));
  messageContainer.innerHTML += messagesRows;
};

getAllMessages();

socket.on("new-message", (newMessage) => {
  const { compression } = newMessage;

  const messageParagraph = buildMessage(newMessage);
  messageContainer.innerHTML += messageParagraph;
  compressionTitle.innerHTML = `(Compression ${compression}%)`;
});

const buildMessage = ({ author, text, created_at }) => {
  return `
      <p class="mb-1">
        <span class="text-primary">${author.email}</span>
        <span class="text-danger">${created_at}</span>
        <span class="text-success">${text}</span>
        <img src="${author.avatar}" width="50" height="50">
      </p>
    `;
};
