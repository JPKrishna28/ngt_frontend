function vp(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const o = Object.getOwnPropertyDescriptor(r, l);
          o &&
            Object.defineProperty(
              e,
              l,
              o.get ? o : { enumerable: !0, get: () => r[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function xp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var gc = { exports: {} },
  po = {},
  vc = { exports: {} },
  z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qr = Symbol.for("react.element"),
  wp = Symbol.for("react.portal"),
  Np = Symbol.for("react.fragment"),
  kp = Symbol.for("react.strict_mode"),
  Sp = Symbol.for("react.profiler"),
  Ep = Symbol.for("react.provider"),
  Cp = Symbol.for("react.context"),
  bp = Symbol.for("react.forward_ref"),
  Tp = Symbol.for("react.suspense"),
  Pp = Symbol.for("react.memo"),
  _p = Symbol.for("react.lazy"),
  Ra = Symbol.iterator;
function Lp(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ra && e[Ra]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var xc = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  wc = Object.assign,
  Nc = {};
function Vn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Nc),
    (this.updater = n || xc);
}
Vn.prototype.isReactComponent = {};
Vn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Vn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function kc() {}
kc.prototype = Vn.prototype;
function Es(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Nc),
    (this.updater = n || xc);
}
var Cs = (Es.prototype = new kc());
Cs.constructor = Es;
wc(Cs, Vn.prototype);
Cs.isPureReactComponent = !0;
var Oa = Array.isArray,
  Sc = Object.prototype.hasOwnProperty,
  bs = { current: null },
  Ec = { key: !0, ref: !0, __self: !0, __source: !0 };
function Cc(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Sc.call(t, r) && !Ec.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var a = Array(s), c = 0; c < s; c++) a[c] = arguments[c + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) l[r] === void 0 && (l[r] = s[r]);
  return {
    $$typeof: Qr,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: bs.current,
  };
}
function Rp(e, t) {
  return {
    $$typeof: Qr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ts(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Qr;
}
function Op(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Da = /\/+/g;
function $o(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Op("" + e.key)
    : t.toString(36);
}
function xl(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Qr:
          case wp:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + $o(i, 0) : r),
      Oa(l)
        ? ((n = ""),
          e != null && (n = e.replace(Da, "$&/") + "/"),
          xl(l, t, n, "", function (c) {
            return c;
          }))
        : l != null &&
          (Ts(l) &&
            (l = Rp(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(Da, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), Oa(e)))
    for (var s = 0; s < e.length; s++) {
      o = e[s];
      var a = r + $o(o, s);
      i += xl(o, t, n, a, l);
    }
  else if (((a = Lp(e)), typeof a == "function"))
    for (e = a.call(e), s = 0; !(o = e.next()).done; )
      (o = o.value), (a = r + $o(o, s++)), (i += xl(o, t, n, a, l));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function el(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    xl(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function Dp(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var be = { current: null },
  wl = { transition: null },
  Ip = {
    ReactCurrentDispatcher: be,
    ReactCurrentBatchConfig: wl,
    ReactCurrentOwner: bs,
  };
function bc() {
  throw Error("act(...) is not supported in production builds of React.");
}
z.Children = {
  map: el,
  forEach: function (e, t, n) {
    el(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      el(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      el(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ts(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
z.Component = Vn;
z.Fragment = Np;
z.Profiler = Sp;
z.PureComponent = Es;
z.StrictMode = kp;
z.Suspense = Tp;
z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ip;
z.act = bc;
z.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = wc({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = bs.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (a in t)
      Sc.call(t, a) &&
        !Ec.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var c = 0; c < a; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: Qr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
z.createContext = function (e) {
  return (
    (e = {
      $$typeof: Cp,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Ep, _context: e }),
    (e.Consumer = e)
  );
};
z.createElement = Cc;
z.createFactory = function (e) {
  var t = Cc.bind(null, e);
  return (t.type = e), t;
};
z.createRef = function () {
  return { current: null };
};
z.forwardRef = function (e) {
  return { $$typeof: bp, render: e };
};
z.isValidElement = Ts;
z.lazy = function (e) {
  return { $$typeof: _p, _payload: { _status: -1, _result: e }, _init: Dp };
};
z.memo = function (e, t) {
  return { $$typeof: Pp, type: e, compare: t === void 0 ? null : t };
};
z.startTransition = function (e) {
  var t = wl.transition;
  wl.transition = {};
  try {
    e();
  } finally {
    wl.transition = t;
  }
};
z.unstable_act = bc;
z.useCallback = function (e, t) {
  return be.current.useCallback(e, t);
};
z.useContext = function (e) {
  return be.current.useContext(e);
};
z.useDebugValue = function () {};
z.useDeferredValue = function (e) {
  return be.current.useDeferredValue(e);
};
z.useEffect = function (e, t) {
  return be.current.useEffect(e, t);
};
z.useId = function () {
  return be.current.useId();
};
z.useImperativeHandle = function (e, t, n) {
  return be.current.useImperativeHandle(e, t, n);
};
z.useInsertionEffect = function (e, t) {
  return be.current.useInsertionEffect(e, t);
};
z.useLayoutEffect = function (e, t) {
  return be.current.useLayoutEffect(e, t);
};
z.useMemo = function (e, t) {
  return be.current.useMemo(e, t);
};
z.useReducer = function (e, t, n) {
  return be.current.useReducer(e, t, n);
};
z.useRef = function (e) {
  return be.current.useRef(e);
};
z.useState = function (e) {
  return be.current.useState(e);
};
z.useSyncExternalStore = function (e, t, n) {
  return be.current.useSyncExternalStore(e, t, n);
};
z.useTransition = function () {
  return be.current.useTransition();
};
z.version = "18.3.1";
vc.exports = z;
var E = vc.exports;
const B = xp(E),
  Fp = vp({ __proto__: null, default: B }, [E]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jp = E,
  Ap = Symbol.for("react.element"),
  zp = Symbol.for("react.fragment"),
  Bp = Object.prototype.hasOwnProperty,
  Mp = jp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Up = { key: !0, ref: !0, __self: !0, __source: !0 };
function Tc(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) Bp.call(t, r) && !Up.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Ap,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: Mp.current,
  };
}
po.Fragment = zp;
po.jsx = Tc;
po.jsxs = Tc;
gc.exports = po;
var Ps = gc.exports;
const tn = Ps.Fragment,
  u = Ps.jsx,
  m = Ps.jsxs;
var Ni = {},
  Pc = { exports: {} },
  Be = {},
  _c = { exports: {} },
  Lc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(b, R) {
    var I = b.length;
    b.push(R);
    e: for (; 0 < I; ) {
      var U = (I - 1) >>> 1,
        K = b[U];
      if (0 < l(K, R)) (b[U] = R), (b[I] = K), (I = U);
      else break e;
    }
  }
  function n(b) {
    return b.length === 0 ? null : b[0];
  }
  function r(b) {
    if (b.length === 0) return null;
    var R = b[0],
      I = b.pop();
    if (I !== R) {
      b[0] = I;
      e: for (var U = 0, K = b.length, Ue = K >>> 1; U < Ue; ) {
        var Xt = 2 * (U + 1) - 1,
          Uo = b[Xt],
          Yt = Xt + 1,
          Zr = b[Yt];
        if (0 > l(Uo, I))
          Yt < K && 0 > l(Zr, Uo)
            ? ((b[U] = Zr), (b[Yt] = I), (U = Yt))
            : ((b[U] = Uo), (b[Xt] = I), (U = Xt));
        else if (Yt < K && 0 > l(Zr, I)) (b[U] = Zr), (b[Yt] = I), (U = Yt);
        else break e;
      }
    }
    return R;
  }
  function l(b, R) {
    var I = b.sortIndex - R.sortIndex;
    return I !== 0 ? I : b.id - R.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      s = i.now();
    e.unstable_now = function () {
      return i.now() - s;
    };
  }
  var a = [],
    c = [],
    d = 1,
    f = null,
    y = 3,
    k = !1,
    v = !1,
    w = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(b) {
    for (var R = n(c); R !== null; ) {
      if (R.callback === null) r(c);
      else if (R.startTime <= b)
        r(c), (R.sortIndex = R.expirationTime), t(a, R);
      else break;
      R = n(c);
    }
  }
  function N(b) {
    if (((w = !1), g(b), !v))
      if (n(a) !== null) (v = !0), ue(S);
      else {
        var R = n(c);
        R !== null && ke(N, R.startTime - b);
      }
  }
  function S(b, R) {
    (v = !1), w && ((w = !1), h(P), (P = -1)), (k = !0);
    var I = y;
    try {
      for (
        g(R), f = n(a);
        f !== null && (!(f.expirationTime > R) || (b && !te()));

      ) {
        var U = f.callback;
        if (typeof U == "function") {
          (f.callback = null), (y = f.priorityLevel);
          var K = U(f.expirationTime <= R);
          (R = e.unstable_now()),
            typeof K == "function" ? (f.callback = K) : f === n(a) && r(a),
            g(R);
        } else r(a);
        f = n(a);
      }
      if (f !== null) var Ue = !0;
      else {
        var Xt = n(c);
        Xt !== null && ke(N, Xt.startTime - R), (Ue = !1);
      }
      return Ue;
    } finally {
      (f = null), (y = I), (k = !1);
    }
  }
  var T = !1,
    _ = null,
    P = -1,
    j = 5,
    F = -1;
  function te() {
    return !(e.unstable_now() - F < j);
  }
  function le() {
    if (_ !== null) {
      var b = e.unstable_now();
      F = b;
      var R = !0;
      try {
        R = _(!0, b);
      } finally {
        R ? ae() : ((T = !1), (_ = null));
      }
    } else T = !1;
  }
  var ae;
  if (typeof p == "function")
    ae = function () {
      p(le);
    };
  else if (typeof MessageChannel < "u") {
    var oe = new MessageChannel(),
      Je = oe.port2;
    (oe.port1.onmessage = le),
      (ae = function () {
        Je.postMessage(null);
      });
  } else
    ae = function () {
      x(le, 0);
    };
  function ue(b) {
    (_ = b), T || ((T = !0), ae());
  }
  function ke(b, R) {
    P = x(function () {
      b(e.unstable_now());
    }, R);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (b) {
      b.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || k || ((v = !0), ue(S));
    }),
    (e.unstable_forceFrameRate = function (b) {
      0 > b || 125 < b
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (j = 0 < b ? Math.floor(1e3 / b) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return y;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (b) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = y;
      }
      var I = y;
      y = R;
      try {
        return b();
      } finally {
        y = I;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (b, R) {
      switch (b) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          b = 3;
      }
      var I = y;
      y = b;
      try {
        return R();
      } finally {
        y = I;
      }
    }),
    (e.unstable_scheduleCallback = function (b, R, I) {
      var U = e.unstable_now();
      switch (
        (typeof I == "object" && I !== null
          ? ((I = I.delay), (I = typeof I == "number" && 0 < I ? U + I : U))
          : (I = U),
        b)
      ) {
        case 1:
          var K = -1;
          break;
        case 2:
          K = 250;
          break;
        case 5:
          K = 1073741823;
          break;
        case 4:
          K = 1e4;
          break;
        default:
          K = 5e3;
      }
      return (
        (K = I + K),
        (b = {
          id: d++,
          callback: R,
          priorityLevel: b,
          startTime: I,
          expirationTime: K,
          sortIndex: -1,
        }),
        I > U
          ? ((b.sortIndex = I),
            t(c, b),
            n(a) === null &&
              b === n(c) &&
              (w ? (h(P), (P = -1)) : (w = !0), ke(N, I - U)))
          : ((b.sortIndex = K), t(a, b), v || k || ((v = !0), ue(S))),
        b
      );
    }),
    (e.unstable_shouldYield = te),
    (e.unstable_wrapCallback = function (b) {
      var R = y;
      return function () {
        var I = y;
        y = R;
        try {
          return b.apply(this, arguments);
        } finally {
          y = I;
        }
      };
    });
})(Lc);
_c.exports = Lc;
var $p = _c.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hp = E,
  ze = $p;
function L(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Rc = new Set(),
  Er = {};
function yn(e, t) {
  zn(e, t), zn(e + "Capture", t);
}
function zn(e, t) {
  for (Er[e] = t, e = 0; e < t.length; e++) Rc.add(t[e]);
}
var vt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ki = Object.prototype.hasOwnProperty,
  Wp =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ia = {},
  Fa = {};
function Vp(e) {
  return ki.call(Fa, e)
    ? !0
    : ki.call(Ia, e)
    ? !1
    : Wp.test(e)
    ? (Fa[e] = !0)
    : ((Ia[e] = !0), !1);
}
function Qp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Kp(e, t, n, r) {
  if (t === null || typeof t > "u" || Qp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Te(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var ye = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ye[e] = new Te(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ye[t] = new Te(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ye[e] = new Te(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ye[e] = new Te(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ye[e] = new Te(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ye[e] = new Te(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ye[e] = new Te(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ye[e] = new Te(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ye[e] = new Te(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var _s = /[\-:]([a-z])/g;
function Ls(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(_s, Ls);
    ye[t] = new Te(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(_s, Ls);
    ye[t] = new Te(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(_s, Ls);
  ye[t] = new Te(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ye[e] = new Te(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ye.xlinkHref = new Te(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ye[e] = new Te(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Rs(e, t, n, r) {
  var l = ye.hasOwnProperty(t) ? ye[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Kp(t, n, l, r) && (n = null),
    r || l === null
      ? Vp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var kt = Hp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  tl = Symbol.for("react.element"),
  xn = Symbol.for("react.portal"),
  wn = Symbol.for("react.fragment"),
  Os = Symbol.for("react.strict_mode"),
  Si = Symbol.for("react.profiler"),
  Oc = Symbol.for("react.provider"),
  Dc = Symbol.for("react.context"),
  Ds = Symbol.for("react.forward_ref"),
  Ei = Symbol.for("react.suspense"),
  Ci = Symbol.for("react.suspense_list"),
  Is = Symbol.for("react.memo"),
  Et = Symbol.for("react.lazy"),
  Ic = Symbol.for("react.offscreen"),
  ja = Symbol.iterator;
function Zn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ja && e[ja]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Z = Object.assign,
  Ho;
function ar(e) {
  if (Ho === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ho = (t && t[1]) || "";
    }
  return (
    `
` +
    Ho +
    e
  );
}
var Wo = !1;
function Vo(e, t) {
  if (!e || Wo) return "";
  Wo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (
        var l = c.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          s = o.length - 1;
        1 <= i && 0 <= s && l[i] !== o[s];

      )
        s--;
      for (; 1 <= i && 0 <= s; i--, s--)
        if (l[i] !== o[s]) {
          if (i !== 1 || s !== 1)
            do
              if ((i--, s--, 0 > s || l[i] !== o[s])) {
                var a =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= i && 0 <= s);
          break;
        }
    }
  } finally {
    (Wo = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? ar(e) : "";
}
function qp(e) {
  switch (e.tag) {
    case 5:
      return ar(e.type);
    case 16:
      return ar("Lazy");
    case 13:
      return ar("Suspense");
    case 19:
      return ar("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Vo(e.type, !1)), e;
    case 11:
      return (e = Vo(e.type.render, !1)), e;
    case 1:
      return (e = Vo(e.type, !0)), e;
    default:
      return "";
  }
}
function bi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case wn:
      return "Fragment";
    case xn:
      return "Portal";
    case Si:
      return "Profiler";
    case Os:
      return "StrictMode";
    case Ei:
      return "Suspense";
    case Ci:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Dc:
        return (e.displayName || "Context") + ".Consumer";
      case Oc:
        return (e._context.displayName || "Context") + ".Provider";
      case Ds:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Is:
        return (
          (t = e.displayName || null), t !== null ? t : bi(e.type) || "Memo"
        );
      case Et:
        (t = e._payload), (e = e._init);
        try {
          return bi(e(t));
        } catch {}
    }
  return null;
}
function Jp(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return bi(t);
    case 8:
      return t === Os ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Ht(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Fc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Xp(e) {
  var t = Fc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function nl(e) {
  e._valueTracker || (e._valueTracker = Xp(e));
}
function jc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Fc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function jl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ti(e, t) {
  var n = t.checked;
  return Z({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Aa(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Ht(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Ac(e, t) {
  (t = t.checked), t != null && Rs(e, "checked", t, !1);
}
function Pi(e, t) {
  Ac(e, t);
  var n = Ht(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? _i(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && _i(e, t.type, Ht(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function za(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function _i(e, t, n) {
  (t !== "number" || jl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var ur = Array.isArray;
function Rn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Ht(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Li(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(L(91));
  return Z({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ba(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(L(92));
      if (ur(n)) {
        if (1 < n.length) throw Error(L(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Ht(n) };
}
function zc(e, t) {
  var n = Ht(t.value),
    r = Ht(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Ma(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Bc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ri(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Bc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var rl,
  Mc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        rl = rl || document.createElement("div"),
          rl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = rl.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Cr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var pr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Yp = ["Webkit", "ms", "Moz", "O"];
Object.keys(pr).forEach(function (e) {
  Yp.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (pr[t] = pr[e]);
  });
});
function Uc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (pr.hasOwnProperty(e) && pr[e])
    ? ("" + t).trim()
    : t + "px";
}
function $c(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Uc(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var Gp = Z(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Oi(e, t) {
  if (t) {
    if (Gp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(L(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(L(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(L(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(L(62));
  }
}
function Di(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Ii = null;
function Fs(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Fi = null,
  On = null,
  Dn = null;
function Ua(e) {
  if ((e = Jr(e))) {
    if (typeof Fi != "function") throw Error(L(280));
    var t = e.stateNode;
    t && ((t = vo(t)), Fi(e.stateNode, e.type, t));
  }
}
function Hc(e) {
  On ? (Dn ? Dn.push(e) : (Dn = [e])) : (On = e);
}
function Wc() {
  if (On) {
    var e = On,
      t = Dn;
    if (((Dn = On = null), Ua(e), t)) for (e = 0; e < t.length; e++) Ua(t[e]);
  }
}
function Vc(e, t) {
  return e(t);
}
function Qc() {}
var Qo = !1;
function Kc(e, t, n) {
  if (Qo) return e(t, n);
  Qo = !0;
  try {
    return Vc(e, t, n);
  } finally {
    (Qo = !1), (On !== null || Dn !== null) && (Qc(), Wc());
  }
}
function br(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = vo(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(L(231, t, typeof n));
  return n;
}
var ji = !1;
if (vt)
  try {
    var er = {};
    Object.defineProperty(er, "passive", {
      get: function () {
        ji = !0;
      },
    }),
      window.addEventListener("test", er, er),
      window.removeEventListener("test", er, er);
  } catch {
    ji = !1;
  }
function Zp(e, t, n, r, l, o, i, s, a) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (d) {
    this.onError(d);
  }
}
var mr = !1,
  Al = null,
  zl = !1,
  Ai = null,
  em = {
    onError: function (e) {
      (mr = !0), (Al = e);
    },
  };
function tm(e, t, n, r, l, o, i, s, a) {
  (mr = !1), (Al = null), Zp.apply(em, arguments);
}
function nm(e, t, n, r, l, o, i, s, a) {
  if ((tm.apply(this, arguments), mr)) {
    if (mr) {
      var c = Al;
      (mr = !1), (Al = null);
    } else throw Error(L(198));
    zl || ((zl = !0), (Ai = c));
  }
}
function gn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function qc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function $a(e) {
  if (gn(e) !== e) throw Error(L(188));
}
function rm(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = gn(e)), t === null)) throw Error(L(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return $a(l), e;
        if (o === r) return $a(l), t;
        o = o.sibling;
      }
      throw Error(L(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, s = l.child; s; ) {
        if (s === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (s === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = o.child; s; ) {
          if (s === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (s === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(L(189));
      }
    }
    if (n.alternate !== r) throw Error(L(190));
  }
  if (n.tag !== 3) throw Error(L(188));
  return n.stateNode.current === n ? e : t;
}
function Jc(e) {
  return (e = rm(e)), e !== null ? Xc(e) : null;
}
function Xc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Xc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Yc = ze.unstable_scheduleCallback,
  Ha = ze.unstable_cancelCallback,
  lm = ze.unstable_shouldYield,
  om = ze.unstable_requestPaint,
  ne = ze.unstable_now,
  im = ze.unstable_getCurrentPriorityLevel,
  js = ze.unstable_ImmediatePriority,
  Gc = ze.unstable_UserBlockingPriority,
  Bl = ze.unstable_NormalPriority,
  sm = ze.unstable_LowPriority,
  Zc = ze.unstable_IdlePriority,
  mo = null,
  ct = null;
function am(e) {
  if (ct && typeof ct.onCommitFiberRoot == "function")
    try {
      ct.onCommitFiberRoot(mo, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var et = Math.clz32 ? Math.clz32 : dm,
  um = Math.log,
  cm = Math.LN2;
function dm(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((um(e) / cm) | 0)) | 0;
}
var ll = 64,
  ol = 4194304;
function cr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ml(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? (r = cr(s)) : ((o &= i), o !== 0 && (r = cr(o)));
  } else (i = n & ~l), i !== 0 ? (r = cr(i)) : o !== 0 && (r = cr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - et(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function fm(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function pm(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - et(o),
      s = 1 << i,
      a = l[i];
    a === -1
      ? (!(s & n) || s & r) && (l[i] = fm(s, t))
      : a <= t && (e.expiredLanes |= s),
      (o &= ~s);
  }
}
function zi(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function ed() {
  var e = ll;
  return (ll <<= 1), !(ll & 4194240) && (ll = 64), e;
}
function Ko(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Kr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - et(t)),
    (e[t] = n);
}
function mm(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - et(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function As(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - et(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var $ = 0;
function td(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var nd,
  zs,
  rd,
  ld,
  od,
  Bi = !1,
  il = [],
  Dt = null,
  It = null,
  Ft = null,
  Tr = new Map(),
  Pr = new Map(),
  bt = [],
  hm =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Wa(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Dt = null;
      break;
    case "dragenter":
    case "dragleave":
      It = null;
      break;
    case "mouseover":
    case "mouseout":
      Ft = null;
      break;
    case "pointerover":
    case "pointerout":
      Tr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pr.delete(t.pointerId);
  }
}
function tr(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = Jr(t)), t !== null && zs(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function ym(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (Dt = tr(Dt, e, t, n, r, l)), !0;
    case "dragenter":
      return (It = tr(It, e, t, n, r, l)), !0;
    case "mouseover":
      return (Ft = tr(Ft, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return Tr.set(o, tr(Tr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), Pr.set(o, tr(Pr.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function id(e) {
  var t = nn(e.target);
  if (t !== null) {
    var n = gn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = qc(n)), t !== null)) {
          (e.blockedOn = t),
            od(e.priority, function () {
              rd(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Nl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Mi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Ii = r), n.target.dispatchEvent(r), (Ii = null);
    } else return (t = Jr(n)), t !== null && zs(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Va(e, t, n) {
  Nl(e) && n.delete(t);
}
function gm() {
  (Bi = !1),
    Dt !== null && Nl(Dt) && (Dt = null),
    It !== null && Nl(It) && (It = null),
    Ft !== null && Nl(Ft) && (Ft = null),
    Tr.forEach(Va),
    Pr.forEach(Va);
}
function nr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Bi ||
      ((Bi = !0),
      ze.unstable_scheduleCallback(ze.unstable_NormalPriority, gm)));
}
function _r(e) {
  function t(l) {
    return nr(l, e);
  }
  if (0 < il.length) {
    nr(il[0], e);
    for (var n = 1; n < il.length; n++) {
      var r = il[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Dt !== null && nr(Dt, e),
      It !== null && nr(It, e),
      Ft !== null && nr(Ft, e),
      Tr.forEach(t),
      Pr.forEach(t),
      n = 0;
    n < bt.length;
    n++
  )
    (r = bt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < bt.length && ((n = bt[0]), n.blockedOn === null); )
    id(n), n.blockedOn === null && bt.shift();
}
var In = kt.ReactCurrentBatchConfig,
  Ul = !0;
function vm(e, t, n, r) {
  var l = $,
    o = In.transition;
  In.transition = null;
  try {
    ($ = 1), Bs(e, t, n, r);
  } finally {
    ($ = l), (In.transition = o);
  }
}
function xm(e, t, n, r) {
  var l = $,
    o = In.transition;
  In.transition = null;
  try {
    ($ = 4), Bs(e, t, n, r);
  } finally {
    ($ = l), (In.transition = o);
  }
}
function Bs(e, t, n, r) {
  if (Ul) {
    var l = Mi(e, t, n, r);
    if (l === null) ri(e, t, r, $l, n), Wa(e, r);
    else if (ym(l, e, t, n, r)) r.stopPropagation();
    else if ((Wa(e, r), t & 4 && -1 < hm.indexOf(e))) {
      for (; l !== null; ) {
        var o = Jr(l);
        if (
          (o !== null && nd(o),
          (o = Mi(e, t, n, r)),
          o === null && ri(e, t, r, $l, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ri(e, t, r, null, n);
  }
}
var $l = null;
function Mi(e, t, n, r) {
  if ((($l = null), (e = Fs(r)), (e = nn(e)), e !== null))
    if (((t = gn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = qc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ($l = e), null;
}
function sd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (im()) {
        case js:
          return 1;
        case Gc:
          return 4;
        case Bl:
        case sm:
          return 16;
        case Zc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Pt = null,
  Ms = null,
  kl = null;
function ad() {
  if (kl) return kl;
  var e,
    t = Ms,
    n = t.length,
    r,
    l = "value" in Pt ? Pt.value : Pt.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (kl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Sl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function sl() {
  return !0;
}
function Qa() {
  return !1;
}
function Me(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(o) : o[s]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? sl
        : Qa),
      (this.isPropagationStopped = Qa),
      this
    );
  }
  return (
    Z(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = sl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = sl));
      },
      persist: function () {},
      isPersistent: sl,
    }),
    t
  );
}
var Qn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Us = Me(Qn),
  qr = Z({}, Qn, { view: 0, detail: 0 }),
  wm = Me(qr),
  qo,
  Jo,
  rr,
  ho = Z({}, qr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: $s,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== rr &&
            (rr && e.type === "mousemove"
              ? ((qo = e.screenX - rr.screenX), (Jo = e.screenY - rr.screenY))
              : (Jo = qo = 0),
            (rr = e)),
          qo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Jo;
    },
  }),
  Ka = Me(ho),
  Nm = Z({}, ho, { dataTransfer: 0 }),
  km = Me(Nm),
  Sm = Z({}, qr, { relatedTarget: 0 }),
  Xo = Me(Sm),
  Em = Z({}, Qn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Cm = Me(Em),
  bm = Z({}, Qn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Tm = Me(bm),
  Pm = Z({}, Qn, { data: 0 }),
  qa = Me(Pm),
  _m = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Lm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Rm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Om(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Rm[e]) ? !!t[e] : !1;
}
function $s() {
  return Om;
}
var Dm = Z({}, qr, {
    key: function (e) {
      if (e.key) {
        var t = _m[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Sl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Lm[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: $s,
    charCode: function (e) {
      return e.type === "keypress" ? Sl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Sl(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Im = Me(Dm),
  Fm = Z({}, ho, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ja = Me(Fm),
  jm = Z({}, qr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: $s,
  }),
  Am = Me(jm),
  zm = Z({}, Qn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Bm = Me(zm),
  Mm = Z({}, ho, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Um = Me(Mm),
  $m = [9, 13, 27, 32],
  Hs = vt && "CompositionEvent" in window,
  hr = null;
vt && "documentMode" in document && (hr = document.documentMode);
var Hm = vt && "TextEvent" in window && !hr,
  ud = vt && (!Hs || (hr && 8 < hr && 11 >= hr)),
  Xa = String.fromCharCode(32),
  Ya = !1;
function cd(e, t) {
  switch (e) {
    case "keyup":
      return $m.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function dd(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Nn = !1;
function Wm(e, t) {
  switch (e) {
    case "compositionend":
      return dd(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ya = !0), Xa);
    case "textInput":
      return (e = t.data), e === Xa && Ya ? null : e;
    default:
      return null;
  }
}
function Vm(e, t) {
  if (Nn)
    return e === "compositionend" || (!Hs && cd(e, t))
      ? ((e = ad()), (kl = Ms = Pt = null), (Nn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return ud && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Qm = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ga(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Qm[e.type] : t === "textarea";
}
function fd(e, t, n, r) {
  Hc(r),
    (t = Hl(t, "onChange")),
    0 < t.length &&
      ((n = new Us("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var yr = null,
  Lr = null;
function Km(e) {
  Sd(e, 0);
}
function yo(e) {
  var t = En(e);
  if (jc(t)) return e;
}
function qm(e, t) {
  if (e === "change") return t;
}
var pd = !1;
if (vt) {
  var Yo;
  if (vt) {
    var Go = "oninput" in document;
    if (!Go) {
      var Za = document.createElement("div");
      Za.setAttribute("oninput", "return;"),
        (Go = typeof Za.oninput == "function");
    }
    Yo = Go;
  } else Yo = !1;
  pd = Yo && (!document.documentMode || 9 < document.documentMode);
}
function eu() {
  yr && (yr.detachEvent("onpropertychange", md), (Lr = yr = null));
}
function md(e) {
  if (e.propertyName === "value" && yo(Lr)) {
    var t = [];
    fd(t, Lr, e, Fs(e)), Kc(Km, t);
  }
}
function Jm(e, t, n) {
  e === "focusin"
    ? (eu(), (yr = t), (Lr = n), yr.attachEvent("onpropertychange", md))
    : e === "focusout" && eu();
}
function Xm(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return yo(Lr);
}
function Ym(e, t) {
  if (e === "click") return yo(t);
}
function Gm(e, t) {
  if (e === "input" || e === "change") return yo(t);
}
function Zm(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var rt = typeof Object.is == "function" ? Object.is : Zm;
function Rr(e, t) {
  if (rt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ki.call(t, l) || !rt(e[l], t[l])) return !1;
  }
  return !0;
}
function tu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function nu(e, t) {
  var n = tu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = tu(n);
  }
}
function hd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? hd(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function yd() {
  for (var e = window, t = jl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = jl(e.document);
  }
  return t;
}
function Ws(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function eh(e) {
  var t = yd(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    hd(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ws(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = nu(n, o));
        var i = nu(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var th = vt && "documentMode" in document && 11 >= document.documentMode,
  kn = null,
  Ui = null,
  gr = null,
  $i = !1;
function ru(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  $i ||
    kn == null ||
    kn !== jl(r) ||
    ((r = kn),
    "selectionStart" in r && Ws(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (gr && Rr(gr, r)) ||
      ((gr = r),
      (r = Hl(Ui, "onSelect")),
      0 < r.length &&
        ((t = new Us("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = kn))));
}
function al(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Sn = {
    animationend: al("Animation", "AnimationEnd"),
    animationiteration: al("Animation", "AnimationIteration"),
    animationstart: al("Animation", "AnimationStart"),
    transitionend: al("Transition", "TransitionEnd"),
  },
  Zo = {},
  gd = {};
vt &&
  ((gd = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Sn.animationend.animation,
    delete Sn.animationiteration.animation,
    delete Sn.animationstart.animation),
  "TransitionEvent" in window || delete Sn.transitionend.transition);
function go(e) {
  if (Zo[e]) return Zo[e];
  if (!Sn[e]) return e;
  var t = Sn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in gd) return (Zo[e] = t[n]);
  return e;
}
var vd = go("animationend"),
  xd = go("animationiteration"),
  wd = go("animationstart"),
  Nd = go("transitionend"),
  kd = new Map(),
  lu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Vt(e, t) {
  kd.set(e, t), yn(t, [e]);
}
for (var ei = 0; ei < lu.length; ei++) {
  var ti = lu[ei],
    nh = ti.toLowerCase(),
    rh = ti[0].toUpperCase() + ti.slice(1);
  Vt(nh, "on" + rh);
}
Vt(vd, "onAnimationEnd");
Vt(xd, "onAnimationIteration");
Vt(wd, "onAnimationStart");
Vt("dblclick", "onDoubleClick");
Vt("focusin", "onFocus");
Vt("focusout", "onBlur");
Vt(Nd, "onTransitionEnd");
zn("onMouseEnter", ["mouseout", "mouseover"]);
zn("onMouseLeave", ["mouseout", "mouseover"]);
zn("onPointerEnter", ["pointerout", "pointerover"]);
zn("onPointerLeave", ["pointerout", "pointerover"]);
yn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
yn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
yn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
yn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
yn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
yn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var dr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  lh = new Set("cancel close invalid load scroll toggle".split(" ").concat(dr));
function ou(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), nm(r, t, void 0, e), (e.currentTarget = null);
}
function Sd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var s = r[i],
            a = s.instance,
            c = s.currentTarget;
          if (((s = s.listener), a !== o && l.isPropagationStopped())) break e;
          ou(l, s, c), (o = a);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((s = r[i]),
            (a = s.instance),
            (c = s.currentTarget),
            (s = s.listener),
            a !== o && l.isPropagationStopped())
          )
            break e;
          ou(l, s, c), (o = a);
        }
    }
  }
  if (zl) throw ((e = Ai), (zl = !1), (Ai = null), e);
}
function V(e, t) {
  var n = t[Ki];
  n === void 0 && (n = t[Ki] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Ed(t, e, 2, !1), n.add(r));
}
function ni(e, t, n) {
  var r = 0;
  t && (r |= 4), Ed(n, e, r, t);
}
var ul = "_reactListening" + Math.random().toString(36).slice(2);
function Or(e) {
  if (!e[ul]) {
    (e[ul] = !0),
      Rc.forEach(function (n) {
        n !== "selectionchange" && (lh.has(n) || ni(n, !1, e), ni(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ul] || ((t[ul] = !0), ni("selectionchange", !1, t));
  }
}
function Ed(e, t, n, r) {
  switch (sd(t)) {
    case 1:
      var l = vm;
      break;
    case 4:
      l = xm;
      break;
    default:
      l = Bs;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !ji ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function ri(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var s = r.stateNode.containerInfo;
        if (s === l || (s.nodeType === 8 && s.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var a = i.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = i.stateNode.containerInfo),
              a === l || (a.nodeType === 8 && a.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; s !== null; ) {
          if (((i = nn(s)), i === null)) return;
          if (((a = i.tag), a === 5 || a === 6)) {
            r = o = i;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  Kc(function () {
    var c = o,
      d = Fs(n),
      f = [];
    e: {
      var y = kd.get(e);
      if (y !== void 0) {
        var k = Us,
          v = e;
        switch (e) {
          case "keypress":
            if (Sl(n) === 0) break e;
          case "keydown":
          case "keyup":
            k = Im;
            break;
          case "focusin":
            (v = "focus"), (k = Xo);
            break;
          case "focusout":
            (v = "blur"), (k = Xo);
            break;
          case "beforeblur":
          case "afterblur":
            k = Xo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k = Ka;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = km;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = Am;
            break;
          case vd:
          case xd:
          case wd:
            k = Cm;
            break;
          case Nd:
            k = Bm;
            break;
          case "scroll":
            k = wm;
            break;
          case "wheel":
            k = Um;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = Tm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = Ja;
        }
        var w = (t & 4) !== 0,
          x = !w && e === "scroll",
          h = w ? (y !== null ? y + "Capture" : null) : y;
        w = [];
        for (var p = c, g; p !== null; ) {
          g = p;
          var N = g.stateNode;
          if (
            (g.tag === 5 &&
              N !== null &&
              ((g = N),
              h !== null && ((N = br(p, h)), N != null && w.push(Dr(p, N, g)))),
            x)
          )
            break;
          p = p.return;
        }
        0 < w.length &&
          ((y = new k(y, v, null, n, d)), f.push({ event: y, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((y = e === "mouseover" || e === "pointerover"),
          (k = e === "mouseout" || e === "pointerout"),
          y &&
            n !== Ii &&
            (v = n.relatedTarget || n.fromElement) &&
            (nn(v) || v[xt]))
        )
          break e;
        if (
          (k || y) &&
          ((y =
            d.window === d
              ? d
              : (y = d.ownerDocument)
              ? y.defaultView || y.parentWindow
              : window),
          k
            ? ((v = n.relatedTarget || n.toElement),
              (k = c),
              (v = v ? nn(v) : null),
              v !== null &&
                ((x = gn(v)), v !== x || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((k = null), (v = c)),
          k !== v)
        ) {
          if (
            ((w = Ka),
            (N = "onMouseLeave"),
            (h = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((w = Ja),
              (N = "onPointerLeave"),
              (h = "onPointerEnter"),
              (p = "pointer")),
            (x = k == null ? y : En(k)),
            (g = v == null ? y : En(v)),
            (y = new w(N, p + "leave", k, n, d)),
            (y.target = x),
            (y.relatedTarget = g),
            (N = null),
            nn(d) === c &&
              ((w = new w(h, p + "enter", v, n, d)),
              (w.target = g),
              (w.relatedTarget = x),
              (N = w)),
            (x = N),
            k && v)
          )
            t: {
              for (w = k, h = v, p = 0, g = w; g; g = vn(g)) p++;
              for (g = 0, N = h; N; N = vn(N)) g++;
              for (; 0 < p - g; ) (w = vn(w)), p--;
              for (; 0 < g - p; ) (h = vn(h)), g--;
              for (; p--; ) {
                if (w === h || (h !== null && w === h.alternate)) break t;
                (w = vn(w)), (h = vn(h));
              }
              w = null;
            }
          else w = null;
          k !== null && iu(f, y, k, w, !1),
            v !== null && x !== null && iu(f, x, v, w, !0);
        }
      }
      e: {
        if (
          ((y = c ? En(c) : window),
          (k = y.nodeName && y.nodeName.toLowerCase()),
          k === "select" || (k === "input" && y.type === "file"))
        )
          var S = qm;
        else if (Ga(y))
          if (pd) S = Gm;
          else {
            S = Xm;
            var T = Jm;
          }
        else
          (k = y.nodeName) &&
            k.toLowerCase() === "input" &&
            (y.type === "checkbox" || y.type === "radio") &&
            (S = Ym);
        if (S && (S = S(e, c))) {
          fd(f, S, n, d);
          break e;
        }
        T && T(e, y, c),
          e === "focusout" &&
            (T = y._wrapperState) &&
            T.controlled &&
            y.type === "number" &&
            _i(y, "number", y.value);
      }
      switch (((T = c ? En(c) : window), e)) {
        case "focusin":
          (Ga(T) || T.contentEditable === "true") &&
            ((kn = T), (Ui = c), (gr = null));
          break;
        case "focusout":
          gr = Ui = kn = null;
          break;
        case "mousedown":
          $i = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ($i = !1), ru(f, n, d);
          break;
        case "selectionchange":
          if (th) break;
        case "keydown":
        case "keyup":
          ru(f, n, d);
      }
      var _;
      if (Hs)
        e: {
          switch (e) {
            case "compositionstart":
              var P = "onCompositionStart";
              break e;
            case "compositionend":
              P = "onCompositionEnd";
              break e;
            case "compositionupdate":
              P = "onCompositionUpdate";
              break e;
          }
          P = void 0;
        }
      else
        Nn
          ? cd(e, n) && (P = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P &&
        (ud &&
          n.locale !== "ko" &&
          (Nn || P !== "onCompositionStart"
            ? P === "onCompositionEnd" && Nn && (_ = ad())
            : ((Pt = d),
              (Ms = "value" in Pt ? Pt.value : Pt.textContent),
              (Nn = !0))),
        (T = Hl(c, P)),
        0 < T.length &&
          ((P = new qa(P, e, null, n, d)),
          f.push({ event: P, listeners: T }),
          _ ? (P.data = _) : ((_ = dd(n)), _ !== null && (P.data = _)))),
        (_ = Hm ? Wm(e, n) : Vm(e, n)) &&
          ((c = Hl(c, "onBeforeInput")),
          0 < c.length &&
            ((d = new qa("onBeforeInput", "beforeinput", null, n, d)),
            f.push({ event: d, listeners: c }),
            (d.data = _)));
    }
    Sd(f, t);
  });
}
function Dr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Hl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = br(e, n)),
      o != null && r.unshift(Dr(e, o, l)),
      (o = br(e, t)),
      o != null && r.push(Dr(e, o, l))),
      (e = e.return);
  }
  return r;
}
function vn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function iu(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n,
      a = s.alternate,
      c = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 &&
      c !== null &&
      ((s = c),
      l
        ? ((a = br(n, o)), a != null && i.unshift(Dr(n, a, s)))
        : l || ((a = br(n, o)), a != null && i.push(Dr(n, a, s)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var oh = /\r\n?/g,
  ih = /\u0000|\uFFFD/g;
function su(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      oh,
      `
`
    )
    .replace(ih, "");
}
function cl(e, t, n) {
  if (((t = su(t)), su(e) !== t && n)) throw Error(L(425));
}
function Wl() {}
var Hi = null,
  Wi = null;
function Vi(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Qi = typeof setTimeout == "function" ? setTimeout : void 0,
  sh = typeof clearTimeout == "function" ? clearTimeout : void 0,
  au = typeof Promise == "function" ? Promise : void 0,
  ah =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof au < "u"
      ? function (e) {
          return au.resolve(null).then(e).catch(uh);
        }
      : Qi;
function uh(e) {
  setTimeout(function () {
    throw e;
  });
}
function li(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), _r(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  _r(t);
}
function jt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function uu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Kn = Math.random().toString(36).slice(2),
  at = "__reactFiber$" + Kn,
  Ir = "__reactProps$" + Kn,
  xt = "__reactContainer$" + Kn,
  Ki = "__reactEvents$" + Kn,
  ch = "__reactListeners$" + Kn,
  dh = "__reactHandles$" + Kn;
function nn(e) {
  var t = e[at];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[xt] || n[at])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = uu(e); e !== null; ) {
          if ((n = e[at])) return n;
          e = uu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Jr(e) {
  return (
    (e = e[at] || e[xt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function En(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(L(33));
}
function vo(e) {
  return e[Ir] || null;
}
var qi = [],
  Cn = -1;
function Qt(e) {
  return { current: e };
}
function Q(e) {
  0 > Cn || ((e.current = qi[Cn]), (qi[Cn] = null), Cn--);
}
function W(e, t) {
  Cn++, (qi[Cn] = e.current), (e.current = t);
}
var Wt = {},
  Ne = Qt(Wt),
  Re = Qt(!1),
  un = Wt;
function Bn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Wt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Oe(e) {
  return (e = e.childContextTypes), e != null;
}
function Vl() {
  Q(Re), Q(Ne);
}
function cu(e, t, n) {
  if (Ne.current !== Wt) throw Error(L(168));
  W(Ne, t), W(Re, n);
}
function Cd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(L(108, Jp(e) || "Unknown", l));
  return Z({}, n, r);
}
function Ql(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Wt),
    (un = Ne.current),
    W(Ne, e),
    W(Re, Re.current),
    !0
  );
}
function du(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(L(169));
  n
    ? ((e = Cd(e, t, un)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Q(Re),
      Q(Ne),
      W(Ne, e))
    : Q(Re),
    W(Re, n);
}
var mt = null,
  xo = !1,
  oi = !1;
function bd(e) {
  mt === null ? (mt = [e]) : mt.push(e);
}
function fh(e) {
  (xo = !0), bd(e);
}
function Kt() {
  if (!oi && mt !== null) {
    oi = !0;
    var e = 0,
      t = $;
    try {
      var n = mt;
      for ($ = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (mt = null), (xo = !1);
    } catch (l) {
      throw (mt !== null && (mt = mt.slice(e + 1)), Yc(js, Kt), l);
    } finally {
      ($ = t), (oi = !1);
    }
  }
  return null;
}
var bn = [],
  Tn = 0,
  Kl = null,
  ql = 0,
  He = [],
  We = 0,
  cn = null,
  ht = 1,
  yt = "";
function Gt(e, t) {
  (bn[Tn++] = ql), (bn[Tn++] = Kl), (Kl = e), (ql = t);
}
function Td(e, t, n) {
  (He[We++] = ht), (He[We++] = yt), (He[We++] = cn), (cn = e);
  var r = ht;
  e = yt;
  var l = 32 - et(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - et(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (ht = (1 << (32 - et(t) + l)) | (n << l) | r),
      (yt = o + e);
  } else (ht = (1 << o) | (n << l) | r), (yt = e);
}
function Vs(e) {
  e.return !== null && (Gt(e, 1), Td(e, 1, 0));
}
function Qs(e) {
  for (; e === Kl; )
    (Kl = bn[--Tn]), (bn[Tn] = null), (ql = bn[--Tn]), (bn[Tn] = null);
  for (; e === cn; )
    (cn = He[--We]),
      (He[We] = null),
      (yt = He[--We]),
      (He[We] = null),
      (ht = He[--We]),
      (He[We] = null);
}
var Ae = null,
  je = null,
  J = !1,
  Ze = null;
function Pd(e, t) {
  var n = Ve(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function fu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ae = e), (je = jt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ae = e), (je = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = cn !== null ? { id: ht, overflow: yt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ve(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ae = e),
            (je = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ji(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Xi(e) {
  if (J) {
    var t = je;
    if (t) {
      var n = t;
      if (!fu(e, t)) {
        if (Ji(e)) throw Error(L(418));
        t = jt(n.nextSibling);
        var r = Ae;
        t && fu(e, t)
          ? Pd(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (J = !1), (Ae = e));
      }
    } else {
      if (Ji(e)) throw Error(L(418));
      (e.flags = (e.flags & -4097) | 2), (J = !1), (Ae = e);
    }
  }
}
function pu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ae = e;
}
function dl(e) {
  if (e !== Ae) return !1;
  if (!J) return pu(e), (J = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Vi(e.type, e.memoizedProps))),
    t && (t = je))
  ) {
    if (Ji(e)) throw (_d(), Error(L(418)));
    for (; t; ) Pd(e, t), (t = jt(t.nextSibling));
  }
  if ((pu(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(L(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              je = jt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      je = null;
    }
  } else je = Ae ? jt(e.stateNode.nextSibling) : null;
  return !0;
}
function _d() {
  for (var e = je; e; ) e = jt(e.nextSibling);
}
function Mn() {
  (je = Ae = null), (J = !1);
}
function Ks(e) {
  Ze === null ? (Ze = [e]) : Ze.push(e);
}
var ph = kt.ReactCurrentBatchConfig;
function lr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(L(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(L(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var s = l.refs;
            i === null ? delete s[o] : (s[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(L(284));
    if (!n._owner) throw Error(L(290, e));
  }
  return e;
}
function fl(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      L(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function mu(e) {
  var t = e._init;
  return t(e._payload);
}
function Ld(e) {
  function t(h, p) {
    if (e) {
      var g = h.deletions;
      g === null ? ((h.deletions = [p]), (h.flags |= 16)) : g.push(p);
    }
  }
  function n(h, p) {
    if (!e) return null;
    for (; p !== null; ) t(h, p), (p = p.sibling);
    return null;
  }
  function r(h, p) {
    for (h = new Map(); p !== null; )
      p.key !== null ? h.set(p.key, p) : h.set(p.index, p), (p = p.sibling);
    return h;
  }
  function l(h, p) {
    return (h = Mt(h, p)), (h.index = 0), (h.sibling = null), h;
  }
  function o(h, p, g) {
    return (
      (h.index = g),
      e
        ? ((g = h.alternate),
          g !== null
            ? ((g = g.index), g < p ? ((h.flags |= 2), p) : g)
            : ((h.flags |= 2), p))
        : ((h.flags |= 1048576), p)
    );
  }
  function i(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function s(h, p, g, N) {
    return p === null || p.tag !== 6
      ? ((p = fi(g, h.mode, N)), (p.return = h), p)
      : ((p = l(p, g)), (p.return = h), p);
  }
  function a(h, p, g, N) {
    var S = g.type;
    return S === wn
      ? d(h, p, g.props.children, N, g.key)
      : p !== null &&
        (p.elementType === S ||
          (typeof S == "object" &&
            S !== null &&
            S.$$typeof === Et &&
            mu(S) === p.type))
      ? ((N = l(p, g.props)), (N.ref = lr(h, p, g)), (N.return = h), N)
      : ((N = Ll(g.type, g.key, g.props, null, h.mode, N)),
        (N.ref = lr(h, p, g)),
        (N.return = h),
        N);
  }
  function c(h, p, g, N) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== g.containerInfo ||
      p.stateNode.implementation !== g.implementation
      ? ((p = pi(g, h.mode, N)), (p.return = h), p)
      : ((p = l(p, g.children || [])), (p.return = h), p);
  }
  function d(h, p, g, N, S) {
    return p === null || p.tag !== 7
      ? ((p = an(g, h.mode, N, S)), (p.return = h), p)
      : ((p = l(p, g)), (p.return = h), p);
  }
  function f(h, p, g) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return (p = fi("" + p, h.mode, g)), (p.return = h), p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case tl:
          return (
            (g = Ll(p.type, p.key, p.props, null, h.mode, g)),
            (g.ref = lr(h, null, p)),
            (g.return = h),
            g
          );
        case xn:
          return (p = pi(p, h.mode, g)), (p.return = h), p;
        case Et:
          var N = p._init;
          return f(h, N(p._payload), g);
      }
      if (ur(p) || Zn(p))
        return (p = an(p, h.mode, g, null)), (p.return = h), p;
      fl(h, p);
    }
    return null;
  }
  function y(h, p, g, N) {
    var S = p !== null ? p.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return S !== null ? null : s(h, p, "" + g, N);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case tl:
          return g.key === S ? a(h, p, g, N) : null;
        case xn:
          return g.key === S ? c(h, p, g, N) : null;
        case Et:
          return (S = g._init), y(h, p, S(g._payload), N);
      }
      if (ur(g) || Zn(g)) return S !== null ? null : d(h, p, g, N, null);
      fl(h, g);
    }
    return null;
  }
  function k(h, p, g, N, S) {
    if ((typeof N == "string" && N !== "") || typeof N == "number")
      return (h = h.get(g) || null), s(p, h, "" + N, S);
    if (typeof N == "object" && N !== null) {
      switch (N.$$typeof) {
        case tl:
          return (h = h.get(N.key === null ? g : N.key) || null), a(p, h, N, S);
        case xn:
          return (h = h.get(N.key === null ? g : N.key) || null), c(p, h, N, S);
        case Et:
          var T = N._init;
          return k(h, p, g, T(N._payload), S);
      }
      if (ur(N) || Zn(N)) return (h = h.get(g) || null), d(p, h, N, S, null);
      fl(p, N);
    }
    return null;
  }
  function v(h, p, g, N) {
    for (
      var S = null, T = null, _ = p, P = (p = 0), j = null;
      _ !== null && P < g.length;
      P++
    ) {
      _.index > P ? ((j = _), (_ = null)) : (j = _.sibling);
      var F = y(h, _, g[P], N);
      if (F === null) {
        _ === null && (_ = j);
        break;
      }
      e && _ && F.alternate === null && t(h, _),
        (p = o(F, p, P)),
        T === null ? (S = F) : (T.sibling = F),
        (T = F),
        (_ = j);
    }
    if (P === g.length) return n(h, _), J && Gt(h, P), S;
    if (_ === null) {
      for (; P < g.length; P++)
        (_ = f(h, g[P], N)),
          _ !== null &&
            ((p = o(_, p, P)), T === null ? (S = _) : (T.sibling = _), (T = _));
      return J && Gt(h, P), S;
    }
    for (_ = r(h, _); P < g.length; P++)
      (j = k(_, h, P, g[P], N)),
        j !== null &&
          (e && j.alternate !== null && _.delete(j.key === null ? P : j.key),
          (p = o(j, p, P)),
          T === null ? (S = j) : (T.sibling = j),
          (T = j));
    return (
      e &&
        _.forEach(function (te) {
          return t(h, te);
        }),
      J && Gt(h, P),
      S
    );
  }
  function w(h, p, g, N) {
    var S = Zn(g);
    if (typeof S != "function") throw Error(L(150));
    if (((g = S.call(g)), g == null)) throw Error(L(151));
    for (
      var T = (S = null), _ = p, P = (p = 0), j = null, F = g.next();
      _ !== null && !F.done;
      P++, F = g.next()
    ) {
      _.index > P ? ((j = _), (_ = null)) : (j = _.sibling);
      var te = y(h, _, F.value, N);
      if (te === null) {
        _ === null && (_ = j);
        break;
      }
      e && _ && te.alternate === null && t(h, _),
        (p = o(te, p, P)),
        T === null ? (S = te) : (T.sibling = te),
        (T = te),
        (_ = j);
    }
    if (F.done) return n(h, _), J && Gt(h, P), S;
    if (_ === null) {
      for (; !F.done; P++, F = g.next())
        (F = f(h, F.value, N)),
          F !== null &&
            ((p = o(F, p, P)), T === null ? (S = F) : (T.sibling = F), (T = F));
      return J && Gt(h, P), S;
    }
    for (_ = r(h, _); !F.done; P++, F = g.next())
      (F = k(_, h, P, F.value, N)),
        F !== null &&
          (e && F.alternate !== null && _.delete(F.key === null ? P : F.key),
          (p = o(F, p, P)),
          T === null ? (S = F) : (T.sibling = F),
          (T = F));
    return (
      e &&
        _.forEach(function (le) {
          return t(h, le);
        }),
      J && Gt(h, P),
      S
    );
  }
  function x(h, p, g, N) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === wn &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case tl:
          e: {
            for (var S = g.key, T = p; T !== null; ) {
              if (T.key === S) {
                if (((S = g.type), S === wn)) {
                  if (T.tag === 7) {
                    n(h, T.sibling),
                      (p = l(T, g.props.children)),
                      (p.return = h),
                      (h = p);
                    break e;
                  }
                } else if (
                  T.elementType === S ||
                  (typeof S == "object" &&
                    S !== null &&
                    S.$$typeof === Et &&
                    mu(S) === T.type)
                ) {
                  n(h, T.sibling),
                    (p = l(T, g.props)),
                    (p.ref = lr(h, T, g)),
                    (p.return = h),
                    (h = p);
                  break e;
                }
                n(h, T);
                break;
              } else t(h, T);
              T = T.sibling;
            }
            g.type === wn
              ? ((p = an(g.props.children, h.mode, N, g.key)),
                (p.return = h),
                (h = p))
              : ((N = Ll(g.type, g.key, g.props, null, h.mode, N)),
                (N.ref = lr(h, p, g)),
                (N.return = h),
                (h = N));
          }
          return i(h);
        case xn:
          e: {
            for (T = g.key; p !== null; ) {
              if (p.key === T)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === g.containerInfo &&
                  p.stateNode.implementation === g.implementation
                ) {
                  n(h, p.sibling),
                    (p = l(p, g.children || [])),
                    (p.return = h),
                    (h = p);
                  break e;
                } else {
                  n(h, p);
                  break;
                }
              else t(h, p);
              p = p.sibling;
            }
            (p = pi(g, h.mode, N)), (p.return = h), (h = p);
          }
          return i(h);
        case Et:
          return (T = g._init), x(h, p, T(g._payload), N);
      }
      if (ur(g)) return v(h, p, g, N);
      if (Zn(g)) return w(h, p, g, N);
      fl(h, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number"
      ? ((g = "" + g),
        p !== null && p.tag === 6
          ? (n(h, p.sibling), (p = l(p, g)), (p.return = h), (h = p))
          : (n(h, p), (p = fi(g, h.mode, N)), (p.return = h), (h = p)),
        i(h))
      : n(h, p);
  }
  return x;
}
var Un = Ld(!0),
  Rd = Ld(!1),
  Jl = Qt(null),
  Xl = null,
  Pn = null,
  qs = null;
function Js() {
  qs = Pn = Xl = null;
}
function Xs(e) {
  var t = Jl.current;
  Q(Jl), (e._currentValue = t);
}
function Yi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Fn(e, t) {
  (Xl = e),
    (qs = Pn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (_e = !0), (e.firstContext = null));
}
function Ke(e) {
  var t = e._currentValue;
  if (qs !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Pn === null)) {
      if (Xl === null) throw Error(L(308));
      (Pn = e), (Xl.dependencies = { lanes: 0, firstContext: e });
    } else Pn = Pn.next = e;
  return t;
}
var rn = null;
function Ys(e) {
  rn === null ? (rn = [e]) : rn.push(e);
}
function Od(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), Ys(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    wt(e, r)
  );
}
function wt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Ct = !1;
function Gs(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Dd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function gt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function At(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), M & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      wt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Ys(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    wt(e, n)
  );
}
function El(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), As(e, n);
  }
}
function hu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Yl(e, t, n, r) {
  var l = e.updateQueue;
  Ct = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s,
      c = a.next;
    (a.next = null), i === null ? (o = c) : (i.next = c), (i = a);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (s = d.lastBaseUpdate),
      s !== i &&
        (s === null ? (d.firstBaseUpdate = c) : (s.next = c),
        (d.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var f = l.baseState;
    (i = 0), (d = c = a = null), (s = o);
    do {
      var y = s.lane,
        k = s.eventTime;
      if ((r & y) === y) {
        d !== null &&
          (d = d.next =
            {
              eventTime: k,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var v = e,
            w = s;
          switch (((y = t), (k = n), w.tag)) {
            case 1:
              if (((v = w.payload), typeof v == "function")) {
                f = v.call(k, f, y);
                break e;
              }
              f = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = w.payload),
                (y = typeof v == "function" ? v.call(k, f, y) : v),
                y == null)
              )
                break e;
              f = Z({}, f, y);
              break e;
            case 2:
              Ct = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (y = l.effects),
          y === null ? (l.effects = [s]) : y.push(s));
      } else
        (k = {
          eventTime: k,
          lane: y,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          d === null ? ((c = d = k), (a = f)) : (d = d.next = k),
          (i |= y);
      if (((s = s.next), s === null)) {
        if (((s = l.shared.pending), s === null)) break;
        (y = s),
          (s = y.next),
          (y.next = null),
          (l.lastBaseUpdate = y),
          (l.shared.pending = null);
      }
    } while (1);
    if (
      (d === null && (a = f),
      (l.baseState = a),
      (l.firstBaseUpdate = c),
      (l.lastBaseUpdate = d),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (fn |= i), (e.lanes = i), (e.memoizedState = f);
  }
}
function yu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(L(191, l));
        l.call(r);
      }
    }
}
var Xr = {},
  dt = Qt(Xr),
  Fr = Qt(Xr),
  jr = Qt(Xr);
function ln(e) {
  if (e === Xr) throw Error(L(174));
  return e;
}
function Zs(e, t) {
  switch ((W(jr, t), W(Fr, e), W(dt, Xr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ri(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ri(t, e));
  }
  Q(dt), W(dt, t);
}
function $n() {
  Q(dt), Q(Fr), Q(jr);
}
function Id(e) {
  ln(jr.current);
  var t = ln(dt.current),
    n = Ri(t, e.type);
  t !== n && (W(Fr, e), W(dt, n));
}
function ea(e) {
  Fr.current === e && (Q(dt), Q(Fr));
}
var Y = Qt(0);
function Gl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var ii = [];
function ta() {
  for (var e = 0; e < ii.length; e++)
    ii[e]._workInProgressVersionPrimary = null;
  ii.length = 0;
}
var Cl = kt.ReactCurrentDispatcher,
  si = kt.ReactCurrentBatchConfig,
  dn = 0,
  G = null,
  ce = null,
  fe = null,
  Zl = !1,
  vr = !1,
  Ar = 0,
  mh = 0;
function ge() {
  throw Error(L(321));
}
function na(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!rt(e[n], t[n])) return !1;
  return !0;
}
function ra(e, t, n, r, l, o) {
  if (
    ((dn = o),
    (G = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Cl.current = e === null || e.memoizedState === null ? vh : xh),
    (e = n(r, l)),
    vr)
  ) {
    o = 0;
    do {
      if (((vr = !1), (Ar = 0), 25 <= o)) throw Error(L(301));
      (o += 1),
        (fe = ce = null),
        (t.updateQueue = null),
        (Cl.current = wh),
        (e = n(r, l));
    } while (vr);
  }
  if (
    ((Cl.current = eo),
    (t = ce !== null && ce.next !== null),
    (dn = 0),
    (fe = ce = G = null),
    (Zl = !1),
    t)
  )
    throw Error(L(300));
  return e;
}
function la() {
  var e = Ar !== 0;
  return (Ar = 0), e;
}
function st() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return fe === null ? (G.memoizedState = fe = e) : (fe = fe.next = e), fe;
}
function qe() {
  if (ce === null) {
    var e = G.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ce.next;
  var t = fe === null ? G.memoizedState : fe.next;
  if (t !== null) (fe = t), (ce = e);
  else {
    if (e === null) throw Error(L(310));
    (ce = e),
      (e = {
        memoizedState: ce.memoizedState,
        baseState: ce.baseState,
        baseQueue: ce.baseQueue,
        queue: ce.queue,
        next: null,
      }),
      fe === null ? (G.memoizedState = fe = e) : (fe = fe.next = e);
  }
  return fe;
}
function zr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ai(e) {
  var t = qe(),
    n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = ce,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var s = (i = null),
      a = null,
      c = o;
    do {
      var d = c.lane;
      if ((dn & d) === d)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action));
      else {
        var f = {
          lane: d,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        a === null ? ((s = a = f), (i = r)) : (a = a.next = f),
          (G.lanes |= d),
          (fn |= d);
      }
      c = c.next;
    } while (c !== null && c !== o);
    a === null ? (i = r) : (a.next = s),
      rt(r, t.memoizedState) || (_e = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (G.lanes |= o), (fn |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ui(e) {
  var t = qe(),
    n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    rt(o, t.memoizedState) || (_e = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function Fd() {}
function jd(e, t) {
  var n = G,
    r = qe(),
    l = t(),
    o = !rt(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (_e = !0)),
    (r = r.queue),
    oa(Bd.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (fe !== null && fe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Br(9, zd.bind(null, n, r, l, t), void 0, null),
      pe === null)
    )
      throw Error(L(349));
    dn & 30 || Ad(n, t, l);
  }
  return l;
}
function Ad(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = G.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (G.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function zd(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Md(t) && Ud(e);
}
function Bd(e, t, n) {
  return n(function () {
    Md(t) && Ud(e);
  });
}
function Md(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !rt(e, n);
  } catch {
    return !0;
  }
}
function Ud(e) {
  var t = wt(e, 1);
  t !== null && tt(t, e, 1, -1);
}
function gu(e) {
  var t = st();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: zr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = gh.bind(null, G, e)),
    [t.memoizedState, e]
  );
}
function Br(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = G.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (G.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function $d() {
  return qe().memoizedState;
}
function bl(e, t, n, r) {
  var l = st();
  (G.flags |= e),
    (l.memoizedState = Br(1 | t, n, void 0, r === void 0 ? null : r));
}
function wo(e, t, n, r) {
  var l = qe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ce !== null) {
    var i = ce.memoizedState;
    if (((o = i.destroy), r !== null && na(r, i.deps))) {
      l.memoizedState = Br(t, n, o, r);
      return;
    }
  }
  (G.flags |= e), (l.memoizedState = Br(1 | t, n, o, r));
}
function vu(e, t) {
  return bl(8390656, 8, e, t);
}
function oa(e, t) {
  return wo(2048, 8, e, t);
}
function Hd(e, t) {
  return wo(4, 2, e, t);
}
function Wd(e, t) {
  return wo(4, 4, e, t);
}
function Vd(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Qd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), wo(4, 4, Vd.bind(null, t, e), n)
  );
}
function ia() {}
function Kd(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && na(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function qd(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && na(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Jd(e, t, n) {
  return dn & 21
    ? (rt(n, t) || ((n = ed()), (G.lanes |= n), (fn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (_e = !0)), (e.memoizedState = n));
}
function hh(e, t) {
  var n = $;
  ($ = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = si.transition;
  si.transition = {};
  try {
    e(!1), t();
  } finally {
    ($ = n), (si.transition = r);
  }
}
function Xd() {
  return qe().memoizedState;
}
function yh(e, t, n) {
  var r = Bt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Yd(e))
  )
    Gd(t, n);
  else if (((n = Od(e, t, n, r)), n !== null)) {
    var l = Ce();
    tt(n, e, r, l), Zd(n, t, r);
  }
}
function gh(e, t, n) {
  var r = Bt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Yd(e)) Gd(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          s = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = s), rt(s, i))) {
          var a = t.interleaved;
          a === null
            ? ((l.next = l), Ys(t))
            : ((l.next = a.next), (a.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = Od(e, t, l, r)),
      n !== null && ((l = Ce()), tt(n, e, r, l), Zd(n, t, r));
  }
}
function Yd(e) {
  var t = e.alternate;
  return e === G || (t !== null && t === G);
}
function Gd(e, t) {
  vr = Zl = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Zd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), As(e, n);
  }
}
var eo = {
    readContext: Ke,
    useCallback: ge,
    useContext: ge,
    useEffect: ge,
    useImperativeHandle: ge,
    useInsertionEffect: ge,
    useLayoutEffect: ge,
    useMemo: ge,
    useReducer: ge,
    useRef: ge,
    useState: ge,
    useDebugValue: ge,
    useDeferredValue: ge,
    useTransition: ge,
    useMutableSource: ge,
    useSyncExternalStore: ge,
    useId: ge,
    unstable_isNewReconciler: !1,
  },
  vh = {
    readContext: Ke,
    useCallback: function (e, t) {
      return (st().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Ke,
    useEffect: vu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        bl(4194308, 4, Vd.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return bl(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return bl(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = st();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = st();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = yh.bind(null, G, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = st();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: gu,
    useDebugValue: ia,
    useDeferredValue: function (e) {
      return (st().memoizedState = e);
    },
    useTransition: function () {
      var e = gu(!1),
        t = e[0];
      return (e = hh.bind(null, e[1])), (st().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = G,
        l = st();
      if (J) {
        if (n === void 0) throw Error(L(407));
        n = n();
      } else {
        if (((n = t()), pe === null)) throw Error(L(349));
        dn & 30 || Ad(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        vu(Bd.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Br(9, zd.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = st(),
        t = pe.identifierPrefix;
      if (J) {
        var n = yt,
          r = ht;
        (n = (r & ~(1 << (32 - et(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ar++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = mh++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  xh = {
    readContext: Ke,
    useCallback: Kd,
    useContext: Ke,
    useEffect: oa,
    useImperativeHandle: Qd,
    useInsertionEffect: Hd,
    useLayoutEffect: Wd,
    useMemo: qd,
    useReducer: ai,
    useRef: $d,
    useState: function () {
      return ai(zr);
    },
    useDebugValue: ia,
    useDeferredValue: function (e) {
      var t = qe();
      return Jd(t, ce.memoizedState, e);
    },
    useTransition: function () {
      var e = ai(zr)[0],
        t = qe().memoizedState;
      return [e, t];
    },
    useMutableSource: Fd,
    useSyncExternalStore: jd,
    useId: Xd,
    unstable_isNewReconciler: !1,
  },
  wh = {
    readContext: Ke,
    useCallback: Kd,
    useContext: Ke,
    useEffect: oa,
    useImperativeHandle: Qd,
    useInsertionEffect: Hd,
    useLayoutEffect: Wd,
    useMemo: qd,
    useReducer: ui,
    useRef: $d,
    useState: function () {
      return ui(zr);
    },
    useDebugValue: ia,
    useDeferredValue: function (e) {
      var t = qe();
      return ce === null ? (t.memoizedState = e) : Jd(t, ce.memoizedState, e);
    },
    useTransition: function () {
      var e = ui(zr)[0],
        t = qe().memoizedState;
      return [e, t];
    },
    useMutableSource: Fd,
    useSyncExternalStore: jd,
    useId: Xd,
    unstable_isNewReconciler: !1,
  };
function Ye(e, t) {
  if (e && e.defaultProps) {
    (t = Z({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Gi(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Z({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var No = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? gn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ce(),
      l = Bt(e),
      o = gt(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = At(e, o, l)),
      t !== null && (tt(t, e, l, r), El(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ce(),
      l = Bt(e),
      o = gt(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = At(e, o, l)),
      t !== null && (tt(t, e, l, r), El(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ce(),
      r = Bt(e),
      l = gt(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = At(e, l, r)),
      t !== null && (tt(t, e, r, n), El(t, e, r));
  },
};
function xu(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Rr(n, r) || !Rr(l, o)
      : !0
  );
}
function ef(e, t, n) {
  var r = !1,
    l = Wt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Ke(o))
      : ((l = Oe(t) ? un : Ne.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? Bn(e, l) : Wt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = No),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function wu(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && No.enqueueReplaceState(t, t.state, null);
}
function Zi(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Gs(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = Ke(o))
    : ((o = Oe(t) ? un : Ne.current), (l.context = Bn(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Gi(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && No.enqueueReplaceState(l, l.state, null),
      Yl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Hn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += qp(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ci(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function es(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Nh = typeof WeakMap == "function" ? WeakMap : Map;
function tf(e, t, n) {
  (n = gt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      no || ((no = !0), (cs = r)), es(e, t);
    }),
    n
  );
}
function nf(e, t, n) {
  (n = gt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        es(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        es(e, t),
          typeof r != "function" &&
            (zt === null ? (zt = new Set([this])) : zt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function Nu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Nh();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = Fh.bind(null, e, t, n)), t.then(e, e));
}
function ku(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Su(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = gt(-1, 1)), (t.tag = 2), At(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var kh = kt.ReactCurrentOwner,
  _e = !1;
function Ee(e, t, n, r) {
  t.child = e === null ? Rd(t, null, n, r) : Un(t, e.child, n, r);
}
function Eu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    Fn(t, l),
    (r = ra(e, t, n, r, o, l)),
    (n = la()),
    e !== null && !_e
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Nt(e, t, l))
      : (J && n && Vs(t), (t.flags |= 1), Ee(e, t, r, l), t.child)
  );
}
function Cu(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !ma(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), rf(e, t, o, r, l))
      : ((e = Ll(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Rr), n(i, r) && e.ref === t.ref)
    )
      return Nt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = Mt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function rf(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Rr(o, r) && e.ref === t.ref)
      if (((_e = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (_e = !0);
      else return (t.lanes = e.lanes), Nt(e, t, l);
  }
  return ts(e, t, n, r, l);
}
function lf(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        W(Ln, Fe),
        (Fe |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          W(Ln, Fe),
          (Fe |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        W(Ln, Fe),
        (Fe |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      W(Ln, Fe),
      (Fe |= r);
  return Ee(e, t, l, n), t.child;
}
function of(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function ts(e, t, n, r, l) {
  var o = Oe(n) ? un : Ne.current;
  return (
    (o = Bn(t, o)),
    Fn(t, l),
    (n = ra(e, t, n, r, o, l)),
    (r = la()),
    e !== null && !_e
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Nt(e, t, l))
      : (J && r && Vs(t), (t.flags |= 1), Ee(e, t, n, l), t.child)
  );
}
function bu(e, t, n, r, l) {
  if (Oe(n)) {
    var o = !0;
    Ql(t);
  } else o = !1;
  if ((Fn(t, l), t.stateNode === null))
    Tl(e, t), ef(t, n, r), Zi(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      s = t.memoizedProps;
    i.props = s;
    var a = i.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = Ke(c))
      : ((c = Oe(n) ? un : Ne.current), (c = Bn(t, c)));
    var d = n.getDerivedStateFromProps,
      f =
        typeof d == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== r || a !== c) && wu(t, i, r, c)),
      (Ct = !1);
    var y = t.memoizedState;
    (i.state = y),
      Yl(t, r, i, l),
      (a = t.memoizedState),
      s !== r || y !== a || Re.current || Ct
        ? (typeof d == "function" && (Gi(t, n, d, r), (a = t.memoizedState)),
          (s = Ct || xu(t, n, s, r, y, a, c))
            ? (f ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (i.props = r),
          (i.state = a),
          (i.context = c),
          (r = s))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      Dd(e, t),
      (s = t.memoizedProps),
      (c = t.type === t.elementType ? s : Ye(t.type, s)),
      (i.props = c),
      (f = t.pendingProps),
      (y = i.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Ke(a))
        : ((a = Oe(n) ? un : Ne.current), (a = Bn(t, a)));
    var k = n.getDerivedStateFromProps;
    (d =
      typeof k == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== f || y !== a) && wu(t, i, r, a)),
      (Ct = !1),
      (y = t.memoizedState),
      (i.state = y),
      Yl(t, r, i, l);
    var v = t.memoizedState;
    s !== f || y !== v || Re.current || Ct
      ? (typeof k == "function" && (Gi(t, n, k, r), (v = t.memoizedState)),
        (c = Ct || xu(t, n, c, r, y, v, a) || !1)
          ? (d ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, v, a),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, v, a)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (s === e.memoizedProps && y === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && y === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (i.props = r),
        (i.state = v),
        (i.context = a),
        (r = c))
      : (typeof i.componentDidUpdate != "function" ||
          (s === e.memoizedProps && y === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && y === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ns(e, t, n, r, o, l);
}
function ns(e, t, n, r, l, o) {
  of(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && du(t, n, !1), Nt(e, t, o);
  (r = t.stateNode), (kh.current = t);
  var s =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = Un(t, e.child, null, o)), (t.child = Un(t, null, s, o)))
      : Ee(e, t, s, o),
    (t.memoizedState = r.state),
    l && du(t, n, !0),
    t.child
  );
}
function sf(e) {
  var t = e.stateNode;
  t.pendingContext
    ? cu(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && cu(e, t.context, !1),
    Zs(e, t.containerInfo);
}
function Tu(e, t, n, r, l) {
  return Mn(), Ks(l), (t.flags |= 256), Ee(e, t, n, r), t.child;
}
var rs = { dehydrated: null, treeContext: null, retryLane: 0 };
function ls(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function af(e, t, n) {
  var r = t.pendingProps,
    l = Y.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    s;
  if (
    ((s = i) ||
      (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    s
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    W(Y, l & 1),
    e === null)
  )
    return (
      Xi(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = Eo(i, r, 0, null)),
              (e = an(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = ls(n)),
              (t.memoizedState = rs),
              e)
            : sa(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((s = l.dehydrated), s !== null)))
    return Sh(e, t, i, r, s, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (s = l.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = Mt(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      s !== null ? (o = Mt(s, o)) : ((o = an(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? ls(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = rs),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Mt(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function sa(e, t) {
  return (
    (t = Eo({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function pl(e, t, n, r) {
  return (
    r !== null && Ks(r),
    Un(t, e.child, null, n),
    (e = sa(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Sh(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ci(Error(L(422)))), pl(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (l = t.mode),
        (r = Eo({ mode: "visible", children: r.children }, l, 0, null)),
        (o = an(o, l, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && Un(t, e.child, null, i),
        (t.child.memoizedState = ls(i)),
        (t.memoizedState = rs),
        o);
  if (!(t.mode & 1)) return pl(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (o = Error(L(419))), (r = ci(o, r, void 0)), pl(e, t, i, r);
  }
  if (((s = (i & e.childLanes) !== 0), _e || s)) {
    if (((r = pe), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), wt(e, l), tt(r, e, l, -1));
    }
    return pa(), (r = ci(Error(L(421)))), pl(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = jh.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (je = jt(l.nextSibling)),
      (Ae = t),
      (J = !0),
      (Ze = null),
      e !== null &&
        ((He[We++] = ht),
        (He[We++] = yt),
        (He[We++] = cn),
        (ht = e.id),
        (yt = e.overflow),
        (cn = t)),
      (t = sa(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Pu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Yi(e.return, t, n);
}
function di(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function uf(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((Ee(e, t, r.children, n), (r = Y.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Pu(e, n, t);
        else if (e.tag === 19) Pu(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((W(Y, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && Gl(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          di(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Gl(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        di(t, !0, n, null, o);
        break;
      case "together":
        di(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Tl(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Nt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (fn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(L(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Mt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Mt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Eh(e, t, n) {
  switch (t.tag) {
    case 3:
      sf(t), Mn();
      break;
    case 5:
      Id(t);
      break;
    case 1:
      Oe(t.type) && Ql(t);
      break;
    case 4:
      Zs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      W(Jl, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (W(Y, Y.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? af(e, t, n)
          : (W(Y, Y.current & 1),
            (e = Nt(e, t, n)),
            e !== null ? e.sibling : null);
      W(Y, Y.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return uf(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        W(Y, Y.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), lf(e, t, n);
  }
  return Nt(e, t, n);
}
var cf, os, df, ff;
cf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
os = function () {};
df = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), ln(dt.current);
    var o = null;
    switch (n) {
      case "input":
        (l = Ti(e, l)), (r = Ti(e, r)), (o = []);
        break;
      case "select":
        (l = Z({}, l, { value: void 0 })),
          (r = Z({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = Li(e, l)), (r = Li(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Wl);
    }
    Oi(n, r);
    var i;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var s = l[c];
          for (i in s) s.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (Er.hasOwnProperty(c)
              ? o || (o = [])
              : (o = o || []).push(c, null));
    for (c in r) {
      var a = r[c];
      if (
        ((s = l != null ? l[c] : void 0),
        r.hasOwnProperty(c) && a !== s && (a != null || s != null))
      )
        if (c === "style")
          if (s) {
            for (i in s)
              !s.hasOwnProperty(i) ||
                (a && a.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in a)
              a.hasOwnProperty(i) &&
                s[i] !== a[i] &&
                (n || (n = {}), (n[i] = a[i]));
          } else n || (o || (o = []), o.push(c, n)), (n = a);
        else
          c === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (s = s ? s.__html : void 0),
              a != null && s !== a && (o = o || []).push(c, a))
            : c === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (o = o || []).push(c, "" + a)
            : c !== "suppressContentEditableWarning" &&
              c !== "suppressHydrationWarning" &&
              (Er.hasOwnProperty(c)
                ? (a != null && c === "onScroll" && V("scroll", e),
                  o || s === a || (o = []))
                : (o = o || []).push(c, a));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
ff = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function or(e, t) {
  if (!J)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ve(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Ch(e, t, n) {
  var r = t.pendingProps;
  switch ((Qs(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ve(t), null;
    case 1:
      return Oe(t.type) && Vl(), ve(t), null;
    case 3:
      return (
        (r = t.stateNode),
        $n(),
        Q(Re),
        Q(Ne),
        ta(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (dl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ze !== null && (ps(Ze), (Ze = null)))),
        os(e, t),
        ve(t),
        null
      );
    case 5:
      ea(t);
      var l = ln(jr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        df(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(L(166));
          return ve(t), null;
        }
        if (((e = ln(dt.current)), dl(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[at] = t), (r[Ir] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              V("cancel", r), V("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              V("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < dr.length; l++) V(dr[l], r);
              break;
            case "source":
              V("error", r);
              break;
            case "img":
            case "image":
            case "link":
              V("error", r), V("load", r);
              break;
            case "details":
              V("toggle", r);
              break;
            case "input":
              Aa(r, o), V("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                V("invalid", r);
              break;
            case "textarea":
              Ba(r, o), V("invalid", r);
          }
          Oi(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var s = o[i];
              i === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (o.suppressHydrationWarning !== !0 &&
                      cl(r.textContent, s, e),
                    (l = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (o.suppressHydrationWarning !== !0 &&
                      cl(r.textContent, s, e),
                    (l = ["children", "" + s]))
                : Er.hasOwnProperty(i) &&
                  s != null &&
                  i === "onScroll" &&
                  V("scroll", r);
            }
          switch (n) {
            case "input":
              nl(r), za(r, o, !0);
              break;
            case "textarea":
              nl(r), Ma(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Wl);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Bc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[at] = t),
            (e[Ir] = r),
            cf(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = Di(n, r)), n)) {
              case "dialog":
                V("cancel", e), V("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                V("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < dr.length; l++) V(dr[l], e);
                l = r;
                break;
              case "source":
                V("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                V("error", e), V("load", e), (l = r);
                break;
              case "details":
                V("toggle", e), (l = r);
                break;
              case "input":
                Aa(e, r), (l = Ti(e, r)), V("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = Z({}, r, { value: void 0 })),
                  V("invalid", e);
                break;
              case "textarea":
                Ba(e, r), (l = Li(e, r)), V("invalid", e);
                break;
              default:
                l = r;
            }
            Oi(n, l), (s = l);
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var a = s[o];
                o === "style"
                  ? $c(e, a)
                  : o === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && Mc(e, a))
                  : o === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && Cr(e, a)
                    : typeof a == "number" && Cr(e, "" + a)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (Er.hasOwnProperty(o)
                      ? a != null && o === "onScroll" && V("scroll", e)
                      : a != null && Rs(e, o, a, i));
              }
            switch (n) {
              case "input":
                nl(e), za(e, r, !1);
                break;
              case "textarea":
                nl(e), Ma(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Ht(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Rn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Rn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Wl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ve(t), null;
    case 6:
      if (e && t.stateNode != null) ff(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(L(166));
        if (((n = ln(jr.current)), ln(dt.current), dl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[at] = t),
            (o = r.nodeValue !== n) && ((e = Ae), e !== null))
          )
            switch (e.tag) {
              case 3:
                cl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  cl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[at] = t),
            (t.stateNode = r);
      }
      return ve(t), null;
    case 13:
      if (
        (Q(Y),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (J && je !== null && t.mode & 1 && !(t.flags & 128))
          _d(), Mn(), (t.flags |= 98560), (o = !1);
        else if (((o = dl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(L(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(L(317));
            o[at] = t;
          } else
            Mn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ve(t), (o = !1);
        } else Ze !== null && (ps(Ze), (Ze = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Y.current & 1 ? de === 0 && (de = 3) : pa())),
          t.updateQueue !== null && (t.flags |= 4),
          ve(t),
          null);
    case 4:
      return (
        $n(), os(e, t), e === null && Or(t.stateNode.containerInfo), ve(t), null
      );
    case 10:
      return Xs(t.type._context), ve(t), null;
    case 17:
      return Oe(t.type) && Vl(), ve(t), null;
    case 19:
      if ((Q(Y), (o = t.memoizedState), o === null)) return ve(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) or(o, !1);
        else {
          if (de !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = Gl(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    or(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return W(Y, (Y.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            ne() > Wn &&
            ((t.flags |= 128), (r = !0), or(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Gl(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              or(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !J)
            )
              return ve(t), null;
          } else
            2 * ne() - o.renderingStartTime > Wn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), or(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = ne()),
          (t.sibling = null),
          (n = Y.current),
          W(Y, r ? (n & 1) | 2 : n & 1),
          t)
        : (ve(t), null);
    case 22:
    case 23:
      return (
        fa(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Fe & 1073741824 && (ve(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ve(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(L(156, t.tag));
}
function bh(e, t) {
  switch ((Qs(t), t.tag)) {
    case 1:
      return (
        Oe(t.type) && Vl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        $n(),
        Q(Re),
        Q(Ne),
        ta(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return ea(t), null;
    case 13:
      if ((Q(Y), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(L(340));
        Mn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return Q(Y), null;
    case 4:
      return $n(), null;
    case 10:
      return Xs(t.type._context), null;
    case 22:
    case 23:
      return fa(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ml = !1,
  xe = !1,
  Th = typeof WeakSet == "function" ? WeakSet : Set,
  O = null;
function _n(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ee(e, t, r);
      }
    else n.current = null;
}
function is(e, t, n) {
  try {
    n();
  } catch (r) {
    ee(e, t, r);
  }
}
var _u = !1;
function Ph(e, t) {
  if (((Hi = Ul), (e = yd()), Ws(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            s = -1,
            a = -1,
            c = 0,
            d = 0,
            f = e,
            y = null;
          t: for (;;) {
            for (
              var k;
              f !== n || (l !== 0 && f.nodeType !== 3) || (s = i + l),
                f !== o || (r !== 0 && f.nodeType !== 3) || (a = i + r),
                f.nodeType === 3 && (i += f.nodeValue.length),
                (k = f.firstChild) !== null;

            )
              (y = f), (f = k);
            for (;;) {
              if (f === e) break t;
              if (
                (y === n && ++c === l && (s = i),
                y === o && ++d === r && (a = i),
                (k = f.nextSibling) !== null)
              )
                break;
              (f = y), (y = f.parentNode);
            }
            f = k;
          }
          n = s === -1 || a === -1 ? null : { start: s, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Wi = { focusedElem: e, selectionRange: n }, Ul = !1, O = t; O !== null; )
    if (((t = O), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (O = e);
    else
      for (; O !== null; ) {
        t = O;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var w = v.memoizedProps,
                    x = v.memoizedState,
                    h = t.stateNode,
                    p = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? w : Ye(t.type, w),
                      x
                    );
                  h.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = "")
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(L(163));
            }
        } catch (N) {
          ee(t, t.return, N);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (O = e);
          break;
        }
        O = t.return;
      }
  return (v = _u), (_u = !1), v;
}
function xr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && is(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function ko(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ss(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function pf(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), pf(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[at], delete t[Ir], delete t[Ki], delete t[ch], delete t[dh])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function mf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Lu(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || mf(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function as(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Wl));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (as(e, t, n), e = e.sibling; e !== null; ) as(e, t, n), (e = e.sibling);
}
function us(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (us(e, t, n), e = e.sibling; e !== null; ) us(e, t, n), (e = e.sibling);
}
var me = null,
  Ge = !1;
function St(e, t, n) {
  for (n = n.child; n !== null; ) hf(e, t, n), (n = n.sibling);
}
function hf(e, t, n) {
  if (ct && typeof ct.onCommitFiberUnmount == "function")
    try {
      ct.onCommitFiberUnmount(mo, n);
    } catch {}
  switch (n.tag) {
    case 5:
      xe || _n(n, t);
    case 6:
      var r = me,
        l = Ge;
      (me = null),
        St(e, t, n),
        (me = r),
        (Ge = l),
        me !== null &&
          (Ge
            ? ((e = me),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : me.removeChild(n.stateNode));
      break;
    case 18:
      me !== null &&
        (Ge
          ? ((e = me),
            (n = n.stateNode),
            e.nodeType === 8
              ? li(e.parentNode, n)
              : e.nodeType === 1 && li(e, n),
            _r(e))
          : li(me, n.stateNode));
      break;
    case 4:
      (r = me),
        (l = Ge),
        (me = n.stateNode.containerInfo),
        (Ge = !0),
        St(e, t, n),
        (me = r),
        (Ge = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !xe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && is(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      St(e, t, n);
      break;
    case 1:
      if (
        !xe &&
        (_n(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (s) {
          ee(n, t, s);
        }
      St(e, t, n);
      break;
    case 21:
      St(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((xe = (r = xe) || n.memoizedState !== null), St(e, t, n), (xe = r))
        : St(e, t, n);
      break;
    default:
      St(e, t, n);
  }
}
function Ru(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Th()),
      t.forEach(function (r) {
        var l = Ah.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Xe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          s = i;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (me = s.stateNode), (Ge = !1);
              break e;
            case 3:
              (me = s.stateNode.containerInfo), (Ge = !0);
              break e;
            case 4:
              (me = s.stateNode.containerInfo), (Ge = !0);
              break e;
          }
          s = s.return;
        }
        if (me === null) throw Error(L(160));
        hf(o, i, l), (me = null), (Ge = !1);
        var a = l.alternate;
        a !== null && (a.return = null), (l.return = null);
      } catch (c) {
        ee(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) yf(t, e), (t = t.sibling);
}
function yf(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Xe(t, e), ot(e), r & 4)) {
        try {
          xr(3, e, e.return), ko(3, e);
        } catch (w) {
          ee(e, e.return, w);
        }
        try {
          xr(5, e, e.return);
        } catch (w) {
          ee(e, e.return, w);
        }
      }
      break;
    case 1:
      Xe(t, e), ot(e), r & 512 && n !== null && _n(n, n.return);
      break;
    case 5:
      if (
        (Xe(t, e),
        ot(e),
        r & 512 && n !== null && _n(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Cr(l, "");
        } catch (w) {
          ee(e, e.return, w);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          s = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            s === "input" && o.type === "radio" && o.name != null && Ac(l, o),
              Di(s, i);
            var c = Di(s, o);
            for (i = 0; i < a.length; i += 2) {
              var d = a[i],
                f = a[i + 1];
              d === "style"
                ? $c(l, f)
                : d === "dangerouslySetInnerHTML"
                ? Mc(l, f)
                : d === "children"
                ? Cr(l, f)
                : Rs(l, d, f, c);
            }
            switch (s) {
              case "input":
                Pi(l, o);
                break;
              case "textarea":
                zc(l, o);
                break;
              case "select":
                var y = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var k = o.value;
                k != null
                  ? Rn(l, !!o.multiple, k, !1)
                  : y !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Rn(l, !!o.multiple, o.defaultValue, !0)
                      : Rn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[Ir] = o;
          } catch (w) {
            ee(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((Xe(t, e), ot(e), r & 4)) {
        if (e.stateNode === null) throw Error(L(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (w) {
          ee(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        (Xe(t, e), ot(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          _r(t.containerInfo);
        } catch (w) {
          ee(e, e.return, w);
        }
      break;
    case 4:
      Xe(t, e), ot(e);
      break;
    case 13:
      Xe(t, e),
        ot(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (ca = ne())),
        r & 4 && Ru(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((xe = (c = xe) || d), Xe(t, e), (xe = c)) : Xe(t, e),
        ot(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !d && e.mode & 1)
        )
          for (O = e, d = e.child; d !== null; ) {
            for (f = O = d; O !== null; ) {
              switch (((y = O), (k = y.child), y.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  xr(4, y, y.return);
                  break;
                case 1:
                  _n(y, y.return);
                  var v = y.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    (r = y), (n = y.return);
                    try {
                      (t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount();
                    } catch (w) {
                      ee(r, n, w);
                    }
                  }
                  break;
                case 5:
                  _n(y, y.return);
                  break;
                case 22:
                  if (y.memoizedState !== null) {
                    Du(f);
                    continue;
                  }
              }
              k !== null ? ((k.return = y), (O = k)) : Du(f);
            }
            d = d.sibling;
          }
        e: for (d = null, f = e; ; ) {
          if (f.tag === 5) {
            if (d === null) {
              d = f;
              try {
                (l = f.stateNode),
                  c
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((s = f.stateNode),
                      (a = f.memoizedProps.style),
                      (i =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (s.style.display = Uc("display", i)));
              } catch (w) {
                ee(e, e.return, w);
              }
            }
          } else if (f.tag === 6) {
            if (d === null)
              try {
                f.stateNode.nodeValue = c ? "" : f.memoizedProps;
              } catch (w) {
                ee(e, e.return, w);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            d === f && (d = null), (f = f.return);
          }
          d === f && (d = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Xe(t, e), ot(e), r & 4 && Ru(e);
      break;
    case 21:
      break;
    default:
      Xe(t, e), ot(e);
  }
}
function ot(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (mf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(L(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Cr(l, ""), (r.flags &= -33));
          var o = Lu(e);
          us(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            s = Lu(e);
          as(e, s, i);
          break;
        default:
          throw Error(L(161));
      }
    } catch (a) {
      ee(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function _h(e, t, n) {
  (O = e), gf(e);
}
function gf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; O !== null; ) {
    var l = O,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || ml;
      if (!i) {
        var s = l.alternate,
          a = (s !== null && s.memoizedState !== null) || xe;
        s = ml;
        var c = xe;
        if (((ml = i), (xe = a) && !c))
          for (O = l; O !== null; )
            (i = O),
              (a = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Iu(l)
                : a !== null
                ? ((a.return = i), (O = a))
                : Iu(l);
        for (; o !== null; ) (O = o), gf(o), (o = o.sibling);
        (O = l), (ml = s), (xe = c);
      }
      Ou(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (O = o)) : Ou(e);
  }
}
function Ou(e) {
  for (; O !== null; ) {
    var t = O;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              xe || ko(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !xe)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ye(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && yu(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                yu(t, i, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var d = c.memoizedState;
                  if (d !== null) {
                    var f = d.dehydrated;
                    f !== null && _r(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(L(163));
          }
        xe || (t.flags & 512 && ss(t));
      } catch (y) {
        ee(t, t.return, y);
      }
    }
    if (t === e) {
      O = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (O = n);
      break;
    }
    O = t.return;
  }
}
function Du(e) {
  for (; O !== null; ) {
    var t = O;
    if (t === e) {
      O = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (O = n);
      break;
    }
    O = t.return;
  }
}
function Iu(e) {
  for (; O !== null; ) {
    var t = O;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ko(4, t);
          } catch (a) {
            ee(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ee(t, l, a);
            }
          }
          var o = t.return;
          try {
            ss(t);
          } catch (a) {
            ee(t, o, a);
          }
          break;
        case 5:
          var i = t.return;
          try {
            ss(t);
          } catch (a) {
            ee(t, i, a);
          }
      }
    } catch (a) {
      ee(t, t.return, a);
    }
    if (t === e) {
      O = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (O = s);
      break;
    }
    O = t.return;
  }
}
var Lh = Math.ceil,
  to = kt.ReactCurrentDispatcher,
  aa = kt.ReactCurrentOwner,
  Qe = kt.ReactCurrentBatchConfig,
  M = 0,
  pe = null,
  ie = null,
  he = 0,
  Fe = 0,
  Ln = Qt(0),
  de = 0,
  Mr = null,
  fn = 0,
  So = 0,
  ua = 0,
  wr = null,
  Pe = null,
  ca = 0,
  Wn = 1 / 0,
  pt = null,
  no = !1,
  cs = null,
  zt = null,
  hl = !1,
  _t = null,
  ro = 0,
  Nr = 0,
  ds = null,
  Pl = -1,
  _l = 0;
function Ce() {
  return M & 6 ? ne() : Pl !== -1 ? Pl : (Pl = ne());
}
function Bt(e) {
  return e.mode & 1
    ? M & 2 && he !== 0
      ? he & -he
      : ph.transition !== null
      ? (_l === 0 && (_l = ed()), _l)
      : ((e = $),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : sd(e.type))),
        e)
    : 1;
}
function tt(e, t, n, r) {
  if (50 < Nr) throw ((Nr = 0), (ds = null), Error(L(185)));
  Kr(e, n, r),
    (!(M & 2) || e !== pe) &&
      (e === pe && (!(M & 2) && (So |= n), de === 4 && Tt(e, he)),
      De(e, r),
      n === 1 && M === 0 && !(t.mode & 1) && ((Wn = ne() + 500), xo && Kt()));
}
function De(e, t) {
  var n = e.callbackNode;
  pm(e, t);
  var r = Ml(e, e === pe ? he : 0);
  if (r === 0)
    n !== null && Ha(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ha(n), t === 1))
      e.tag === 0 ? fh(Fu.bind(null, e)) : bd(Fu.bind(null, e)),
        ah(function () {
          !(M & 6) && Kt();
        }),
        (n = null);
    else {
      switch (td(r)) {
        case 1:
          n = js;
          break;
        case 4:
          n = Gc;
          break;
        case 16:
          n = Bl;
          break;
        case 536870912:
          n = Zc;
          break;
        default:
          n = Bl;
      }
      n = Cf(n, vf.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function vf(e, t) {
  if (((Pl = -1), (_l = 0), M & 6)) throw Error(L(327));
  var n = e.callbackNode;
  if (jn() && e.callbackNode !== n) return null;
  var r = Ml(e, e === pe ? he : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = lo(e, r);
  else {
    t = r;
    var l = M;
    M |= 2;
    var o = wf();
    (pe !== e || he !== t) && ((pt = null), (Wn = ne() + 500), sn(e, t));
    do
      try {
        Dh();
        break;
      } catch (s) {
        xf(e, s);
      }
    while (1);
    Js(),
      (to.current = o),
      (M = l),
      ie !== null ? (t = 0) : ((pe = null), (he = 0), (t = de));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = zi(e)), l !== 0 && ((r = l), (t = fs(e, l)))), t === 1)
    )
      throw ((n = Mr), sn(e, 0), Tt(e, r), De(e, ne()), n);
    if (t === 6) Tt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Rh(l) &&
          ((t = lo(e, r)),
          t === 2 && ((o = zi(e)), o !== 0 && ((r = o), (t = fs(e, o)))),
          t === 1))
      )
        throw ((n = Mr), sn(e, 0), Tt(e, r), De(e, ne()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(L(345));
        case 2:
          Zt(e, Pe, pt);
          break;
        case 3:
          if (
            (Tt(e, r), (r & 130023424) === r && ((t = ca + 500 - ne()), 10 < t))
          ) {
            if (Ml(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              Ce(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Qi(Zt.bind(null, e, Pe, pt), t);
            break;
          }
          Zt(e, Pe, pt);
          break;
        case 4:
          if ((Tt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - et(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = ne() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Lh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Qi(Zt.bind(null, e, Pe, pt), r);
            break;
          }
          Zt(e, Pe, pt);
          break;
        case 5:
          Zt(e, Pe, pt);
          break;
        default:
          throw Error(L(329));
      }
    }
  }
  return De(e, ne()), e.callbackNode === n ? vf.bind(null, e) : null;
}
function fs(e, t) {
  var n = wr;
  return (
    e.current.memoizedState.isDehydrated && (sn(e, t).flags |= 256),
    (e = lo(e, t)),
    e !== 2 && ((t = Pe), (Pe = n), t !== null && ps(t)),
    e
  );
}
function ps(e) {
  Pe === null ? (Pe = e) : Pe.push.apply(Pe, e);
}
function Rh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!rt(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Tt(e, t) {
  for (
    t &= ~ua,
      t &= ~So,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - et(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Fu(e) {
  if (M & 6) throw Error(L(327));
  jn();
  var t = Ml(e, 0);
  if (!(t & 1)) return De(e, ne()), null;
  var n = lo(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = zi(e);
    r !== 0 && ((t = r), (n = fs(e, r)));
  }
  if (n === 1) throw ((n = Mr), sn(e, 0), Tt(e, t), De(e, ne()), n);
  if (n === 6) throw Error(L(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Zt(e, Pe, pt),
    De(e, ne()),
    null
  );
}
function da(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    (M = n), M === 0 && ((Wn = ne() + 500), xo && Kt());
  }
}
function pn(e) {
  _t !== null && _t.tag === 0 && !(M & 6) && jn();
  var t = M;
  M |= 1;
  var n = Qe.transition,
    r = $;
  try {
    if (((Qe.transition = null), ($ = 1), e)) return e();
  } finally {
    ($ = r), (Qe.transition = n), (M = t), !(M & 6) && Kt();
  }
}
function fa() {
  (Fe = Ln.current), Q(Ln);
}
function sn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), sh(n)), ie !== null))
    for (n = ie.return; n !== null; ) {
      var r = n;
      switch ((Qs(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Vl();
          break;
        case 3:
          $n(), Q(Re), Q(Ne), ta();
          break;
        case 5:
          ea(r);
          break;
        case 4:
          $n();
          break;
        case 13:
          Q(Y);
          break;
        case 19:
          Q(Y);
          break;
        case 10:
          Xs(r.type._context);
          break;
        case 22:
        case 23:
          fa();
      }
      n = n.return;
    }
  if (
    ((pe = e),
    (ie = e = Mt(e.current, null)),
    (he = Fe = t),
    (de = 0),
    (Mr = null),
    (ua = So = fn = 0),
    (Pe = wr = null),
    rn !== null)
  ) {
    for (t = 0; t < rn.length; t++)
      if (((n = rn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    rn = null;
  }
  return e;
}
function xf(e, t) {
  do {
    var n = ie;
    try {
      if ((Js(), (Cl.current = eo), Zl)) {
        for (var r = G.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        Zl = !1;
      }
      if (
        ((dn = 0),
        (fe = ce = G = null),
        (vr = !1),
        (Ar = 0),
        (aa.current = null),
        n === null || n.return === null)
      ) {
        (de = 1), (Mr = t), (ie = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          s = n,
          a = t;
        if (
          ((t = he),
          (s.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var c = a,
            d = s,
            f = d.tag;
          if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var y = d.alternate;
            y
              ? ((d.updateQueue = y.updateQueue),
                (d.memoizedState = y.memoizedState),
                (d.lanes = y.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var k = ku(i);
          if (k !== null) {
            (k.flags &= -257),
              Su(k, i, s, o, t),
              k.mode & 1 && Nu(o, c, t),
              (t = k),
              (a = c);
            var v = t.updateQueue;
            if (v === null) {
              var w = new Set();
              w.add(a), (t.updateQueue = w);
            } else v.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Nu(o, c, t), pa();
              break e;
            }
            a = Error(L(426));
          }
        } else if (J && s.mode & 1) {
          var x = ku(i);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              Su(x, i, s, o, t),
              Ks(Hn(a, s));
            break e;
          }
        }
        (o = a = Hn(a, s)),
          de !== 4 && (de = 2),
          wr === null ? (wr = [o]) : wr.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var h = tf(o, a, t);
              hu(o, h);
              break e;
            case 1:
              s = a;
              var p = o.type,
                g = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (g !== null &&
                    typeof g.componentDidCatch == "function" &&
                    (zt === null || !zt.has(g))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var N = nf(o, s, t);
                hu(o, N);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      kf(n);
    } catch (S) {
      (t = S), ie === n && n !== null && (ie = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function wf() {
  var e = to.current;
  return (to.current = eo), e === null ? eo : e;
}
function pa() {
  (de === 0 || de === 3 || de === 2) && (de = 4),
    pe === null || (!(fn & 268435455) && !(So & 268435455)) || Tt(pe, he);
}
function lo(e, t) {
  var n = M;
  M |= 2;
  var r = wf();
  (pe !== e || he !== t) && ((pt = null), sn(e, t));
  do
    try {
      Oh();
      break;
    } catch (l) {
      xf(e, l);
    }
  while (1);
  if ((Js(), (M = n), (to.current = r), ie !== null)) throw Error(L(261));
  return (pe = null), (he = 0), de;
}
function Oh() {
  for (; ie !== null; ) Nf(ie);
}
function Dh() {
  for (; ie !== null && !lm(); ) Nf(ie);
}
function Nf(e) {
  var t = Ef(e.alternate, e, Fe);
  (e.memoizedProps = e.pendingProps),
    t === null ? kf(e) : (ie = t),
    (aa.current = null);
}
function kf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = bh(n, t)), n !== null)) {
        (n.flags &= 32767), (ie = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (de = 6), (ie = null);
        return;
      }
    } else if (((n = Ch(n, t, Fe)), n !== null)) {
      ie = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ie = t;
      return;
    }
    ie = t = e;
  } while (t !== null);
  de === 0 && (de = 5);
}
function Zt(e, t, n) {
  var r = $,
    l = Qe.transition;
  try {
    (Qe.transition = null), ($ = 1), Ih(e, t, n, r);
  } finally {
    (Qe.transition = l), ($ = r);
  }
  return null;
}
function Ih(e, t, n, r) {
  do jn();
  while (_t !== null);
  if (M & 6) throw Error(L(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(L(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (mm(e, o),
    e === pe && ((ie = pe = null), (he = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      hl ||
      ((hl = !0),
      Cf(Bl, function () {
        return jn(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Qe.transition), (Qe.transition = null);
    var i = $;
    $ = 1;
    var s = M;
    (M |= 4),
      (aa.current = null),
      Ph(e, n),
      yf(n, e),
      eh(Wi),
      (Ul = !!Hi),
      (Wi = Hi = null),
      (e.current = n),
      _h(n),
      om(),
      (M = s),
      ($ = i),
      (Qe.transition = o);
  } else e.current = n;
  if (
    (hl && ((hl = !1), (_t = e), (ro = l)),
    (o = e.pendingLanes),
    o === 0 && (zt = null),
    am(n.stateNode),
    De(e, ne()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (no) throw ((no = !1), (e = cs), (cs = null), e);
  return (
    ro & 1 && e.tag !== 0 && jn(),
    (o = e.pendingLanes),
    o & 1 ? (e === ds ? Nr++ : ((Nr = 0), (ds = e))) : (Nr = 0),
    Kt(),
    null
  );
}
function jn() {
  if (_t !== null) {
    var e = td(ro),
      t = Qe.transition,
      n = $;
    try {
      if (((Qe.transition = null), ($ = 16 > e ? 16 : e), _t === null))
        var r = !1;
      else {
        if (((e = _t), (_t = null), (ro = 0), M & 6)) throw Error(L(331));
        var l = M;
        for (M |= 4, O = e.current; O !== null; ) {
          var o = O,
            i = o.child;
          if (O.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var c = s[a];
                for (O = c; O !== null; ) {
                  var d = O;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      xr(8, d, o);
                  }
                  var f = d.child;
                  if (f !== null) (f.return = d), (O = f);
                  else
                    for (; O !== null; ) {
                      d = O;
                      var y = d.sibling,
                        k = d.return;
                      if ((pf(d), d === c)) {
                        O = null;
                        break;
                      }
                      if (y !== null) {
                        (y.return = k), (O = y);
                        break;
                      }
                      O = k;
                    }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var w = v.child;
                if (w !== null) {
                  v.child = null;
                  do {
                    var x = w.sibling;
                    (w.sibling = null), (w = x);
                  } while (w !== null);
                }
              }
              O = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (O = i);
          else
            e: for (; O !== null; ) {
              if (((o = O), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    xr(9, o, o.return);
                }
              var h = o.sibling;
              if (h !== null) {
                (h.return = o.return), (O = h);
                break e;
              }
              O = o.return;
            }
        }
        var p = e.current;
        for (O = p; O !== null; ) {
          i = O;
          var g = i.child;
          if (i.subtreeFlags & 2064 && g !== null) (g.return = i), (O = g);
          else
            e: for (i = p; O !== null; ) {
              if (((s = O), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ko(9, s);
                  }
                } catch (S) {
                  ee(s, s.return, S);
                }
              if (s === i) {
                O = null;
                break e;
              }
              var N = s.sibling;
              if (N !== null) {
                (N.return = s.return), (O = N);
                break e;
              }
              O = s.return;
            }
        }
        if (
          ((M = l), Kt(), ct && typeof ct.onPostCommitFiberRoot == "function")
        )
          try {
            ct.onPostCommitFiberRoot(mo, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ($ = n), (Qe.transition = t);
    }
  }
  return !1;
}
function ju(e, t, n) {
  (t = Hn(n, t)),
    (t = tf(e, t, 1)),
    (e = At(e, t, 1)),
    (t = Ce()),
    e !== null && (Kr(e, 1, t), De(e, t));
}
function ee(e, t, n) {
  if (e.tag === 3) ju(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ju(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (zt === null || !zt.has(r)))
        ) {
          (e = Hn(n, e)),
            (e = nf(t, e, 1)),
            (t = At(t, e, 1)),
            (e = Ce()),
            t !== null && (Kr(t, 1, e), De(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Fh(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Ce()),
    (e.pingedLanes |= e.suspendedLanes & n),
    pe === e &&
      (he & n) === n &&
      (de === 4 || (de === 3 && (he & 130023424) === he && 500 > ne() - ca)
        ? sn(e, 0)
        : (ua |= n)),
    De(e, t);
}
function Sf(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = ol), (ol <<= 1), !(ol & 130023424) && (ol = 4194304))
      : (t = 1));
  var n = Ce();
  (e = wt(e, t)), e !== null && (Kr(e, t, n), De(e, n));
}
function jh(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Sf(e, n);
}
function Ah(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(L(314));
  }
  r !== null && r.delete(t), Sf(e, n);
}
var Ef;
Ef = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Re.current) _e = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (_e = !1), Eh(e, t, n);
      _e = !!(e.flags & 131072);
    }
  else (_e = !1), J && t.flags & 1048576 && Td(t, ql, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Tl(e, t), (e = t.pendingProps);
      var l = Bn(t, Ne.current);
      Fn(t, n), (l = ra(null, t, r, e, l, n));
      var o = la();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Oe(r) ? ((o = !0), Ql(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Gs(t),
            (l.updater = No),
            (t.stateNode = l),
            (l._reactInternals = t),
            Zi(t, r, e, n),
            (t = ns(null, t, r, !0, o, n)))
          : ((t.tag = 0), J && o && Vs(t), Ee(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Tl(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Bh(r)),
          (e = Ye(r, e)),
          l)
        ) {
          case 0:
            t = ts(null, t, r, e, n);
            break e;
          case 1:
            t = bu(null, t, r, e, n);
            break e;
          case 11:
            t = Eu(null, t, r, e, n);
            break e;
          case 14:
            t = Cu(null, t, r, Ye(r.type, e), n);
            break e;
        }
        throw Error(L(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        ts(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        bu(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((sf(t), e === null)) throw Error(L(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          Dd(e, t),
          Yl(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = Hn(Error(L(423)), t)), (t = Tu(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = Hn(Error(L(424)), t)), (t = Tu(e, t, r, n, l));
            break e;
          } else
            for (
              je = jt(t.stateNode.containerInfo.firstChild),
                Ae = t,
                J = !0,
                Ze = null,
                n = Rd(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Mn(), r === l)) {
            t = Nt(e, t, n);
            break e;
          }
          Ee(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Id(t),
        e === null && Xi(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Vi(r, l) ? (i = null) : o !== null && Vi(r, o) && (t.flags |= 32),
        of(e, t),
        Ee(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && Xi(t), null;
    case 13:
      return af(e, t, n);
    case 4:
      return (
        Zs(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Un(t, null, r, n)) : Ee(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Eu(e, t, r, l, n)
      );
    case 7:
      return Ee(e, t, t.pendingProps, n), t.child;
    case 8:
      return Ee(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Ee(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          W(Jl, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (rt(o.value, i)) {
            if (o.children === l.children && !Re.current) {
              t = Nt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                i = o.child;
                for (var a = s.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      (a = gt(-1, n & -n)), (a.tag = 2);
                      var c = o.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var d = c.pending;
                        d === null
                          ? (a.next = a)
                          : ((a.next = d.next), (d.next = a)),
                          (c.pending = a);
                      }
                    }
                    (o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      Yi(o.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(L(341));
                (i.lanes |= n),
                  (s = i.alternate),
                  s !== null && (s.lanes |= n),
                  Yi(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        Ee(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        Fn(t, n),
        (l = Ke(l)),
        (r = r(l)),
        (t.flags |= 1),
        Ee(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Ye(r, t.pendingProps)),
        (l = Ye(r.type, l)),
        Cu(e, t, r, l, n)
      );
    case 15:
      return rf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Tl(e, t),
        (t.tag = 1),
        Oe(r) ? ((e = !0), Ql(t)) : (e = !1),
        Fn(t, n),
        ef(t, r, l),
        Zi(t, r, l, n),
        ns(null, t, r, !0, e, n)
      );
    case 19:
      return uf(e, t, n);
    case 22:
      return lf(e, t, n);
  }
  throw Error(L(156, t.tag));
};
function Cf(e, t) {
  return Yc(e, t);
}
function zh(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Ve(e, t, n, r) {
  return new zh(e, t, n, r);
}
function ma(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Bh(e) {
  if (typeof e == "function") return ma(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Ds)) return 11;
    if (e === Is) return 14;
  }
  return 2;
}
function Mt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ve(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ll(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) ma(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case wn:
        return an(n.children, l, o, t);
      case Os:
        (i = 8), (l |= 8);
        break;
      case Si:
        return (
          (e = Ve(12, n, t, l | 2)), (e.elementType = Si), (e.lanes = o), e
        );
      case Ei:
        return (e = Ve(13, n, t, l)), (e.elementType = Ei), (e.lanes = o), e;
      case Ci:
        return (e = Ve(19, n, t, l)), (e.elementType = Ci), (e.lanes = o), e;
      case Ic:
        return Eo(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Oc:
              i = 10;
              break e;
            case Dc:
              i = 9;
              break e;
            case Ds:
              i = 11;
              break e;
            case Is:
              i = 14;
              break e;
            case Et:
              (i = 16), (r = null);
              break e;
          }
        throw Error(L(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ve(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function an(e, t, n, r) {
  return (e = Ve(7, e, r, t)), (e.lanes = n), e;
}
function Eo(e, t, n, r) {
  return (
    (e = Ve(22, e, r, t)),
    (e.elementType = Ic),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function fi(e, t, n) {
  return (e = Ve(6, e, null, t)), (e.lanes = n), e;
}
function pi(e, t, n) {
  return (
    (t = Ve(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Mh(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ko(0)),
    (this.expirationTimes = Ko(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ko(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function ha(e, t, n, r, l, o, i, s, a) {
  return (
    (e = new Mh(e, t, n, s, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Ve(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Gs(o),
    e
  );
}
function Uh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: xn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function bf(e) {
  if (!e) return Wt;
  e = e._reactInternals;
  e: {
    if (gn(e) !== e || e.tag !== 1) throw Error(L(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Oe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(L(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Oe(n)) return Cd(e, n, t);
  }
  return t;
}
function Tf(e, t, n, r, l, o, i, s, a) {
  return (
    (e = ha(n, r, !0, e, l, o, i, s, a)),
    (e.context = bf(null)),
    (n = e.current),
    (r = Ce()),
    (l = Bt(n)),
    (o = gt(r, l)),
    (o.callback = t ?? null),
    At(n, o, l),
    (e.current.lanes = l),
    Kr(e, l, r),
    De(e, r),
    e
  );
}
function Co(e, t, n, r) {
  var l = t.current,
    o = Ce(),
    i = Bt(l);
  return (
    (n = bf(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = gt(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = At(l, t, i)),
    e !== null && (tt(e, l, i, o), El(e, l, i)),
    i
  );
}
function oo(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Au(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function ya(e, t) {
  Au(e, t), (e = e.alternate) && Au(e, t);
}
function $h() {
  return null;
}
var Pf =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function ga(e) {
  this._internalRoot = e;
}
bo.prototype.render = ga.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(L(409));
  Co(e, t, null, null);
};
bo.prototype.unmount = ga.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    pn(function () {
      Co(null, e, null, null);
    }),
      (t[xt] = null);
  }
};
function bo(e) {
  this._internalRoot = e;
}
bo.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ld();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < bt.length && t !== 0 && t < bt[n].priority; n++);
    bt.splice(n, 0, e), n === 0 && id(e);
  }
};
function va(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function To(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function zu() {}
function Hh(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var c = oo(i);
        o.call(c);
      };
    }
    var i = Tf(t, r, e, 0, null, !1, !1, "", zu);
    return (
      (e._reactRootContainer = i),
      (e[xt] = i.current),
      Or(e.nodeType === 8 ? e.parentNode : e),
      pn(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var c = oo(a);
      s.call(c);
    };
  }
  var a = ha(e, 0, !1, null, null, !1, !1, "", zu);
  return (
    (e._reactRootContainer = a),
    (e[xt] = a.current),
    Or(e.nodeType === 8 ? e.parentNode : e),
    pn(function () {
      Co(t, a, n, r);
    }),
    a
  );
}
function Po(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function () {
        var a = oo(i);
        s.call(a);
      };
    }
    Co(t, i, e, l);
  } else i = Hh(n, t, e, l, r);
  return oo(i);
}
nd = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = cr(t.pendingLanes);
        n !== 0 &&
          (As(t, n | 1), De(t, ne()), !(M & 6) && ((Wn = ne() + 500), Kt()));
      }
      break;
    case 13:
      pn(function () {
        var r = wt(e, 1);
        if (r !== null) {
          var l = Ce();
          tt(r, e, 1, l);
        }
      }),
        ya(e, 1);
  }
};
zs = function (e) {
  if (e.tag === 13) {
    var t = wt(e, 134217728);
    if (t !== null) {
      var n = Ce();
      tt(t, e, 134217728, n);
    }
    ya(e, 134217728);
  }
};
rd = function (e) {
  if (e.tag === 13) {
    var t = Bt(e),
      n = wt(e, t);
    if (n !== null) {
      var r = Ce();
      tt(n, e, t, r);
    }
    ya(e, t);
  }
};
ld = function () {
  return $;
};
od = function (e, t) {
  var n = $;
  try {
    return ($ = e), t();
  } finally {
    $ = n;
  }
};
Fi = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Pi(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = vo(r);
            if (!l) throw Error(L(90));
            jc(r), Pi(r, l);
          }
        }
      }
      break;
    case "textarea":
      zc(e, n);
      break;
    case "select":
      (t = n.value), t != null && Rn(e, !!n.multiple, t, !1);
  }
};
Vc = da;
Qc = pn;
var Wh = { usingClientEntryPoint: !1, Events: [Jr, En, vo, Hc, Wc, da] },
  ir = {
    findFiberByHostInstance: nn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Vh = {
    bundleType: ir.bundleType,
    version: ir.version,
    rendererPackageName: ir.rendererPackageName,
    rendererConfig: ir.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: kt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Jc(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: ir.findFiberByHostInstance || $h,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var yl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!yl.isDisabled && yl.supportsFiber)
    try {
      (mo = yl.inject(Vh)), (ct = yl);
    } catch {}
}
Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wh;
Be.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!va(t)) throw Error(L(200));
  return Uh(e, t, null, n);
};
Be.createRoot = function (e, t) {
  if (!va(e)) throw Error(L(299));
  var n = !1,
    r = "",
    l = Pf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = ha(e, 1, !1, null, null, n, !1, r, l)),
    (e[xt] = t.current),
    Or(e.nodeType === 8 ? e.parentNode : e),
    new ga(t)
  );
};
Be.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(L(188))
      : ((e = Object.keys(e).join(",")), Error(L(268, e)));
  return (e = Jc(t)), (e = e === null ? null : e.stateNode), e;
};
Be.flushSync = function (e) {
  return pn(e);
};
Be.hydrate = function (e, t, n) {
  if (!To(t)) throw Error(L(200));
  return Po(null, e, t, !0, n);
};
Be.hydrateRoot = function (e, t, n) {
  if (!va(e)) throw Error(L(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = Pf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Tf(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[xt] = t.current),
    Or(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new bo(t);
};
Be.render = function (e, t, n) {
  if (!To(t)) throw Error(L(200));
  return Po(null, e, t, !1, n);
};
Be.unmountComponentAtNode = function (e) {
  if (!To(e)) throw Error(L(40));
  return e._reactRootContainer
    ? (pn(function () {
        Po(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[xt] = null);
        });
      }),
      !0)
    : !1;
};
Be.unstable_batchedUpdates = da;
Be.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!To(n)) throw Error(L(200));
  if (e == null || e._reactInternals === void 0) throw Error(L(38));
  return Po(e, t, n, !1, r);
};
Be.version = "18.3.1-next-f1338f8080-20240426";
function _f() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_f);
    } catch (e) {
      console.error(e);
    }
}
_f(), (Pc.exports = Be);
var Qh = Pc.exports,
  Bu = Qh;
(Ni.createRoot = Bu.createRoot), (Ni.hydrateRoot = Bu.hydrateRoot);
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ur() {
  return (
    (Ur = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ur.apply(this, arguments)
  );
}
var Lt;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Lt || (Lt = {}));
const Mu = "popstate";
function Kh(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: o, search: i, hash: s } = r.location;
    return ms(
      "",
      { pathname: o, search: i, hash: s },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : io(l);
  }
  return Jh(t, n, null, e);
}
function re(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Lf(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function qh() {
  return Math.random().toString(36).substr(2, 8);
}
function Uu(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function ms(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Ur(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? qn(t) : t,
      { state: n, key: (t && t.key) || r || qh() }
    )
  );
}
function io(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function qn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function Jh(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: o = !1 } = r,
    i = l.history,
    s = Lt.Pop,
    a = null,
    c = d();
  c == null && ((c = 0), i.replaceState(Ur({}, i.state, { idx: c }), ""));
  function d() {
    return (i.state || { idx: null }).idx;
  }
  function f() {
    s = Lt.Pop;
    let x = d(),
      h = x == null ? null : x - c;
    (c = x), a && a({ action: s, location: w.location, delta: h });
  }
  function y(x, h) {
    s = Lt.Push;
    let p = ms(w.location, x, h);
    n && n(p, x), (c = d() + 1);
    let g = Uu(p, c),
      N = w.createHref(p);
    try {
      i.pushState(g, "", N);
    } catch (S) {
      if (S instanceof DOMException && S.name === "DataCloneError") throw S;
      l.location.assign(N);
    }
    o && a && a({ action: s, location: w.location, delta: 1 });
  }
  function k(x, h) {
    s = Lt.Replace;
    let p = ms(w.location, x, h);
    n && n(p, x), (c = d());
    let g = Uu(p, c),
      N = w.createHref(p);
    i.replaceState(g, "", N),
      o && a && a({ action: s, location: w.location, delta: 0 });
  }
  function v(x) {
    let h = l.location.origin !== "null" ? l.location.origin : l.location.href,
      p = typeof x == "string" ? x : io(x);
    return (
      (p = p.replace(/ $/, "%20")),
      re(
        h,
        "No window.location.(origin|href) available to create URL for href: " +
          p
      ),
      new URL(p, h)
    );
  }
  let w = {
    get action() {
      return s;
    },
    get location() {
      return e(l, i);
    },
    listen(x) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Mu, f),
        (a = x),
        () => {
          l.removeEventListener(Mu, f), (a = null);
        }
      );
    },
    createHref(x) {
      return t(l, x);
    },
    createURL: v,
    encodeLocation(x) {
      let h = v(x);
      return { pathname: h.pathname, search: h.search, hash: h.hash };
    },
    push: y,
    replace: k,
    go(x) {
      return i.go(x);
    },
  };
  return w;
}
var $u;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})($u || ($u = {}));
function Xh(e, t, n) {
  return n === void 0 && (n = "/"), Yh(e, t, n, !1);
}
function Yh(e, t, n, r) {
  let l = typeof t == "string" ? qn(t) : t,
    o = xa(l.pathname || "/", n);
  if (o == null) return null;
  let i = Rf(e);
  Gh(i);
  let s = null;
  for (let a = 0; s == null && a < i.length; ++a) {
    let c = u0(o);
    s = s0(i[a], c, r);
  }
  return s;
}
function Rf(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (o, i, s) => {
    let a = {
      relativePath: s === void 0 ? o.path || "" : s,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    };
    a.relativePath.startsWith("/") &&
      (re(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let c = Ut([r, a.relativePath]),
      d = n.concat(a);
    o.children &&
      o.children.length > 0 &&
      (re(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + c + '".')
      ),
      Rf(o.children, t, d, c)),
      !(o.path == null && !o.index) &&
        t.push({ path: c, score: o0(c, o.index), routesMeta: d });
  };
  return (
    e.forEach((o, i) => {
      var s;
      if (o.path === "" || !((s = o.path) != null && s.includes("?"))) l(o, i);
      else for (let a of Of(o.path)) l(o, i, a);
    }),
    t
  );
}
function Of(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [o, ""] : [o];
  let i = Of(r.join("/")),
    s = [];
  return (
    s.push(...i.map((a) => (a === "" ? o : [o, a].join("/")))),
    l && s.push(...i),
    s.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function Gh(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : i0(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const Zh = /^:[\w-]+$/,
  e0 = 3,
  t0 = 2,
  n0 = 1,
  r0 = 10,
  l0 = -2,
  Hu = (e) => e === "*";
function o0(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Hu) && (r += l0),
    t && (r += t0),
    n
      .filter((l) => !Hu(l))
      .reduce((l, o) => l + (Zh.test(o) ? e0 : o === "" ? n0 : r0), r)
  );
}
function i0(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function s0(e, t, n) {
  n === void 0 && (n = !1);
  let { routesMeta: r } = e,
    l = {},
    o = "/",
    i = [];
  for (let s = 0; s < r.length; ++s) {
    let a = r[s],
      c = s === r.length - 1,
      d = o === "/" ? t : t.slice(o.length) || "/",
      f = Wu(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: c },
        d
      ),
      y = a.route;
    if (
      (!f &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (f = Wu(
          { path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 },
          d
        )),
      !f)
    )
      return null;
    Object.assign(l, f.params),
      i.push({
        params: l,
        pathname: Ut([o, f.pathname]),
        pathnameBase: p0(Ut([o, f.pathnameBase])),
        route: y,
      }),
      f.pathnameBase !== "/" && (o = Ut([o, f.pathnameBase]));
  }
  return i;
}
function Wu(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = a0(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let o = l[0],
    i = o.replace(/(.)\/+$/, "$1"),
    s = l.slice(1);
  return {
    params: r.reduce((c, d, f) => {
      let { paramName: y, isOptional: k } = d;
      if (y === "*") {
        let w = s[f] || "";
        i = o.slice(0, o.length - w.length).replace(/(.)\/+$/, "$1");
      }
      const v = s[f];
      return (
        k && !v ? (c[y] = void 0) : (c[y] = (v || "").replace(/%2F/g, "/")), c
      );
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function a0(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Lf(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, s, a) => (
            r.push({ paramName: s, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (l += "\\/*$")
      : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function u0(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Lf(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function xa(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function c0(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? qn(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : d0(n, t)) : t,
    search: m0(r),
    hash: h0(l),
  };
}
function d0(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function mi(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function f0(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function wa(e, t) {
  let n = f0(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Na(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = qn(e))
    : ((l = Ur({}, e)),
      re(
        !l.pathname || !l.pathname.includes("?"),
        mi("?", "pathname", "search", l)
      ),
      re(
        !l.pathname || !l.pathname.includes("#"),
        mi("#", "pathname", "hash", l)
      ),
      re(!l.search || !l.search.includes("#"), mi("#", "search", "hash", l)));
  let o = e === "" || l.pathname === "",
    i = o ? "/" : l.pathname,
    s;
  if (i == null) s = n;
  else {
    let f = t.length - 1;
    if (!r && i.startsWith("..")) {
      let y = i.split("/");
      for (; y[0] === ".."; ) y.shift(), (f -= 1);
      l.pathname = y.join("/");
    }
    s = f >= 0 ? t[f] : "/";
  }
  let a = c0(l, s),
    c = i && i !== "/" && i.endsWith("/"),
    d = (o || i === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (c || d) && (a.pathname += "/"), a;
}
const Ut = (e) => e.join("/").replace(/\/\/+/g, "/"),
  p0 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  m0 = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  h0 = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function y0(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const Df = ["post", "put", "patch", "delete"];
new Set(Df);
const g0 = ["get", ...Df];
new Set(g0);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function $r() {
  return (
    ($r = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    $r.apply(this, arguments)
  );
}
const ka = E.createContext(null),
  v0 = E.createContext(null),
  qt = E.createContext(null),
  _o = E.createContext(null),
  ft = E.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  If = E.createContext(null);
function x0(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Jn() || re(!1);
  let { basename: r, navigator: l } = E.useContext(qt),
    { hash: o, pathname: i, search: s } = jf(e, { relative: n }),
    a = i;
  return (
    r !== "/" && (a = i === "/" ? r : Ut([r, i])),
    l.createHref({ pathname: a, search: s, hash: o })
  );
}
function Jn() {
  return E.useContext(_o) != null;
}
function Yr() {
  return Jn() || re(!1), E.useContext(_o).location;
}
function Ff(e) {
  E.useContext(qt).static || E.useLayoutEffect(e);
}
function Xn() {
  let { isDataRoute: e } = E.useContext(ft);
  return e ? F0() : w0();
}
function w0() {
  Jn() || re(!1);
  let e = E.useContext(ka),
    { basename: t, future: n, navigator: r } = E.useContext(qt),
    { matches: l } = E.useContext(ft),
    { pathname: o } = Yr(),
    i = JSON.stringify(wa(l, n.v7_relativeSplatPath)),
    s = E.useRef(!1);
  return (
    Ff(() => {
      s.current = !0;
    }),
    E.useCallback(
      function (c, d) {
        if ((d === void 0 && (d = {}), !s.current)) return;
        if (typeof c == "number") {
          r.go(c);
          return;
        }
        let f = Na(c, JSON.parse(i), o, d.relative === "path");
        e == null &&
          t !== "/" &&
          (f.pathname = f.pathname === "/" ? t : Ut([t, f.pathname])),
          (d.replace ? r.replace : r.push)(f, d.state, d);
      },
      [t, r, i, o, e]
    )
  );
}
const N0 = E.createContext(null);
function k0(e) {
  let t = E.useContext(ft).outlet;
  return t && E.createElement(N0.Provider, { value: e }, t);
}
function S0() {
  let { matches: e } = E.useContext(ft),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function jf(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = E.useContext(qt),
    { matches: l } = E.useContext(ft),
    { pathname: o } = Yr(),
    i = JSON.stringify(wa(l, r.v7_relativeSplatPath));
  return E.useMemo(() => Na(e, JSON.parse(i), o, n === "path"), [e, i, o, n]);
}
function E0(e, t) {
  return C0(e, t);
}
function C0(e, t, n, r) {
  Jn() || re(!1);
  let { navigator: l } = E.useContext(qt),
    { matches: o } = E.useContext(ft),
    i = o[o.length - 1],
    s = i ? i.params : {};
  i && i.pathname;
  let a = i ? i.pathnameBase : "/";
  i && i.route;
  let c = Yr(),
    d;
  if (t) {
    var f;
    let x = typeof t == "string" ? qn(t) : t;
    a === "/" || ((f = x.pathname) != null && f.startsWith(a)) || re(!1),
      (d = x);
  } else d = c;
  let y = d.pathname || "/",
    k = y;
  if (a !== "/") {
    let x = a.replace(/^\//, "").split("/");
    k = "/" + y.replace(/^\//, "").split("/").slice(x.length).join("/");
  }
  let v = Xh(e, { pathname: k }),
    w = L0(
      v &&
        v.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, s, x.params),
            pathname: Ut([
              a,
              l.encodeLocation
                ? l.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? a
                : Ut([
                    a,
                    l.encodeLocation
                      ? l.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          })
        ),
      o,
      n,
      r
    );
  return t && w
    ? E.createElement(
        _o.Provider,
        {
          value: {
            location: $r(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              d
            ),
            navigationType: Lt.Pop,
          },
        },
        w
      )
    : w;
}
function b0() {
  let e = I0(),
    t = y0(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    o = null;
  return E.createElement(
    E.Fragment,
    null,
    E.createElement("h2", null, "Unexpected Application Error!"),
    E.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? E.createElement("pre", { style: l }, n) : null,
    o
  );
}
const T0 = E.createElement(b0, null);
class P0 extends E.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? E.createElement(
          ft.Provider,
          { value: this.props.routeContext },
          E.createElement(If.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function _0(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = E.useContext(ka);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    E.createElement(ft.Provider, { value: t }, r)
  );
}
function L0(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var o;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (o = r) != null &&
      o.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let i = e,
    s = (l = n) == null ? void 0 : l.errors;
  if (s != null) {
    let d = i.findIndex(
      (f) => f.route.id && (s == null ? void 0 : s[f.route.id]) !== void 0
    );
    d >= 0 || re(!1), (i = i.slice(0, Math.min(i.length, d + 1)));
  }
  let a = !1,
    c = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < i.length; d++) {
      let f = i[d];
      if (
        ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (c = d),
        f.route.id)
      ) {
        let { loaderData: y, errors: k } = n,
          v =
            f.route.loader &&
            y[f.route.id] === void 0 &&
            (!k || k[f.route.id] === void 0);
        if (f.route.lazy || v) {
          (a = !0), c >= 0 ? (i = i.slice(0, c + 1)) : (i = [i[0]]);
          break;
        }
      }
    }
  return i.reduceRight((d, f, y) => {
    let k,
      v = !1,
      w = null,
      x = null;
    n &&
      ((k = s && f.route.id ? s[f.route.id] : void 0),
      (w = f.route.errorElement || T0),
      a &&
        (c < 0 && y === 0
          ? (j0("route-fallback", !1), (v = !0), (x = null))
          : c === y &&
            ((v = !0), (x = f.route.hydrateFallbackElement || null))));
    let h = t.concat(i.slice(0, y + 1)),
      p = () => {
        let g;
        return (
          k
            ? (g = w)
            : v
            ? (g = x)
            : f.route.Component
            ? (g = E.createElement(f.route.Component, null))
            : f.route.element
            ? (g = f.route.element)
            : (g = d),
          E.createElement(_0, {
            match: f,
            routeContext: { outlet: d, matches: h, isDataRoute: n != null },
            children: g,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || y === 0)
      ? E.createElement(P0, {
          location: n.location,
          revalidation: n.revalidation,
          component: w,
          error: k,
          children: p(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
        })
      : p();
  }, null);
}
var Af = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Af || {}),
  so = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(so || {});
function R0(e) {
  let t = E.useContext(ka);
  return t || re(!1), t;
}
function O0(e) {
  let t = E.useContext(v0);
  return t || re(!1), t;
}
function D0(e) {
  let t = E.useContext(ft);
  return t || re(!1), t;
}
function zf(e) {
  let t = D0(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || re(!1), n.route.id;
}
function I0() {
  var e;
  let t = E.useContext(If),
    n = O0(so.UseRouteError),
    r = zf(so.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function F0() {
  let { router: e } = R0(Af.UseNavigateStable),
    t = zf(so.UseNavigateStable),
    n = E.useRef(!1);
  return (
    Ff(() => {
      n.current = !0;
    }),
    E.useCallback(
      function (l, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, $r({ fromRouteId: t }, o)));
      },
      [e, t]
    )
  );
}
const Vu = {};
function j0(e, t, n) {
  !t && !Vu[e] && (Vu[e] = !0);
}
function A0(e, t) {
  e == null || e.v7_startTransition,
    (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 &&
      (!t || t.v7_relativeSplatPath),
    t &&
      (t.v7_fetcherPersist,
      t.v7_normalizeFormMethod,
      t.v7_partialHydration,
      t.v7_skipActionErrorRevalidation);
}
function Sa(e) {
  let { to: t, replace: n, state: r, relative: l } = e;
  Jn() || re(!1);
  let { future: o, static: i } = E.useContext(qt),
    { matches: s } = E.useContext(ft),
    { pathname: a } = Yr(),
    c = Xn(),
    d = Na(t, wa(s, o.v7_relativeSplatPath), a, l === "path"),
    f = JSON.stringify(d);
  return (
    E.useEffect(
      () => c(JSON.parse(f), { replace: n, state: r, relative: l }),
      [c, f, l, n, r]
    ),
    null
  );
}
function Lo(e) {
  return k0(e.context);
}
function Se(e) {
  re(!1);
}
function z0(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = Lt.Pop,
    navigator: o,
    static: i = !1,
    future: s,
  } = e;
  Jn() && re(!1);
  let a = t.replace(/^\/*/, "/"),
    c = E.useMemo(
      () => ({
        basename: a,
        navigator: o,
        static: i,
        future: $r({ v7_relativeSplatPath: !1 }, s),
      }),
      [a, s, o, i]
    );
  typeof r == "string" && (r = qn(r));
  let {
      pathname: d = "/",
      search: f = "",
      hash: y = "",
      state: k = null,
      key: v = "default",
    } = r,
    w = E.useMemo(() => {
      let x = xa(d, a);
      return x == null
        ? null
        : {
            location: { pathname: x, search: f, hash: y, state: k, key: v },
            navigationType: l,
          };
    }, [a, d, f, y, k, v, l]);
  return w == null
    ? null
    : E.createElement(
        qt.Provider,
        { value: c },
        E.createElement(_o.Provider, { children: n, value: w })
      );
}
function B0(e) {
  let { children: t, location: n } = e;
  return E0(hs(t), n);
}
new Promise(() => {});
function hs(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    E.Children.forEach(e, (r, l) => {
      if (!E.isValidElement(r)) return;
      let o = [...t, l];
      if (r.type === E.Fragment) {
        n.push.apply(n, hs(r.props.children, o));
        return;
      }
      r.type !== Se && re(!1), !r.props.index || !r.props.children || re(!1);
      let i = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (i.children = hs(r.props.children, o)), n.push(i);
    }),
    n
  );
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ys() {
  return (
    (ys = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ys.apply(this, arguments)
  );
}
function M0(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    o;
  for (o = 0; o < r.length; o++)
    (l = r[o]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function U0(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function $0(e, t) {
  return e.button === 0 && (!t || t === "_self") && !U0(e);
}
const H0 = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  W0 = "6";
try {
  window.__reactRouterVersion = W0;
} catch {}
const V0 = "startTransition",
  Qu = Fp[V0];
function Q0(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    o = E.useRef();
  o.current == null && (o.current = Kh({ window: l, v5Compat: !0 }));
  let i = o.current,
    [s, a] = E.useState({ action: i.action, location: i.location }),
    { v7_startTransition: c } = r || {},
    d = E.useCallback(
      (f) => {
        c && Qu ? Qu(() => a(f)) : a(f);
      },
      [a, c]
    );
  return (
    E.useLayoutEffect(() => i.listen(d), [i, d]),
    E.useEffect(() => A0(r), [r]),
    E.createElement(z0, {
      basename: t,
      children: n,
      location: s.location,
      navigationType: s.action,
      navigator: i,
      future: r,
    })
  );
}
const K0 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  q0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  q = E.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: o,
        replace: i,
        state: s,
        target: a,
        to: c,
        preventScrollReset: d,
        viewTransition: f,
      } = t,
      y = M0(t, H0),
      { basename: k } = E.useContext(qt),
      v,
      w = !1;
    if (typeof c == "string" && q0.test(c) && ((v = c), K0))
      try {
        let g = new URL(window.location.href),
          N = c.startsWith("//") ? new URL(g.protocol + c) : new URL(c),
          S = xa(N.pathname, k);
        N.origin === g.origin && S != null
          ? (c = S + N.search + N.hash)
          : (w = !0);
      } catch {}
    let x = x0(c, { relative: l }),
      h = J0(c, {
        replace: i,
        state: s,
        target: a,
        preventScrollReset: d,
        relative: l,
        viewTransition: f,
      });
    function p(g) {
      r && r(g), g.defaultPrevented || h(g);
    }
    return E.createElement(
      "a",
      ys({}, y, { href: v || x, onClick: w || o ? r : p, ref: n, target: a })
    );
  });
var Ku;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(Ku || (Ku = {}));
var qu;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(qu || (qu = {}));
function J0(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: o,
      relative: i,
      viewTransition: s,
    } = t === void 0 ? {} : t,
    a = Xn(),
    c = Yr(),
    d = jf(e, { relative: i });
  return E.useCallback(
    (f) => {
      if ($0(f, n)) {
        f.preventDefault();
        let y = r !== void 0 ? r : io(c) === io(d);
        a(e, {
          replace: y,
          state: l,
          preventScrollReset: o,
          relative: i,
          viewTransition: s,
        });
      }
    },
    [c, a, d, r, l, n, e, o, i, s]
  );
}
var Bf = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Ju = B.createContext && B.createContext(Bf),
  $t =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        ($t =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var l in t)
                Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
            }
            return e;
          }),
        $t.apply(this, arguments)
      );
    },
  X0 =
    (globalThis && globalThis.__rest) ||
    function (e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          t.indexOf(r) < 0 &&
          (n[r] = e[r]);
      if (e != null && typeof Object.getOwnPropertySymbols == "function")
        for (var l = 0, r = Object.getOwnPropertySymbols(e); l < r.length; l++)
          t.indexOf(r[l]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, r[l]) &&
            (n[r[l]] = e[r[l]]);
      return n;
    };
function Mf(e) {
  return (
    e &&
    e.map(function (t, n) {
      return B.createElement(t.tag, $t({ key: n }, t.attr), Mf(t.child));
    })
  );
}
function X(e) {
  return function (t) {
    return B.createElement(Y0, $t({ attr: $t({}, e.attr) }, t), Mf(e.child));
  };
}
function Y0(e) {
  var t = function (n) {
    var r = e.attr,
      l = e.size,
      o = e.title,
      i = X0(e, ["attr", "size", "title"]),
      s = l || n.size || "1em",
      a;
    return (
      n.className && (a = n.className),
      e.className && (a = (a ? a + " " : "") + e.className),
      B.createElement(
        "svg",
        $t(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          i,
          {
            className: a,
            style: $t($t({ color: e.color || n.color }, n.style), e.style),
            height: s,
            width: s,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        o && B.createElement("title", null, o),
        e.children
      )
    );
  };
  return Ju !== void 0
    ? B.createElement(Ju.Consumer, null, function (n) {
        return t(n);
      })
    : t(Bf);
}
function G0(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "10" } },
      { tag: "line", attr: { x1: "12", y1: "8", x2: "12", y2: "12" } },
      { tag: "line", attr: { x1: "12", y1: "16", x2: "12.01", y2: "16" } },
    ],
  })(e);
}
function Xu(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "19", y1: "12", x2: "5", y2: "12" } },
      { tag: "polyline", attr: { points: "12 19 5 12 12 5" } },
    ],
  })(e);
}
function An(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "rect",
        attr: { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" },
      },
      { tag: "line", attr: { x1: "16", y1: "2", x2: "16", y2: "6" } },
      { tag: "line", attr: { x1: "8", y1: "2", x2: "8", y2: "6" } },
      { tag: "line", attr: { x1: "3", y1: "10", x2: "21", y2: "10" } },
    ],
  })(e);
}
function ut(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "10" } },
      { tag: "polyline", attr: { points: "12 6 12 12 16 14" } },
    ],
  })(e);
}
function Hr(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M18 8h1a4 4 0 0 1 0 8h-1" } },
      {
        tag: "path",
        attr: { d: "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" },
      },
      { tag: "line", attr: { x1: "6", y1: "1", x2: "6", y2: "4" } },
      { tag: "line", attr: { x1: "10", y1: "1", x2: "10", y2: "4" } },
      { tag: "line", attr: { x1: "14", y1: "1", x2: "14", y2: "4" } },
    ],
  })(e);
}
function Z0(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" } },
      { tag: "polyline", attr: { points: "7 10 12 15 17 10" } },
      { tag: "line", attr: { x1: "12", y1: "15", x2: "12", y2: "3" } },
    ],
  })(e);
}
function Uf(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" },
      },
    ],
  })(e);
}
function ey(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" },
      },
      { tag: "circle", attr: { cx: "12", cy: "12", r: "3" } },
    ],
  })(e);
}
function ty(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
      },
      { tag: "polyline", attr: { points: "9 22 9 12 15 12 15 22" } },
    ],
  })(e);
}
function ny(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "10" } },
      { tag: "line", attr: { x1: "12", y1: "16", x2: "12", y2: "12" } },
      { tag: "line", attr: { x1: "12", y1: "8", x2: "12.01", y2: "8" } },
    ],
  })(e);
}
function ry(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "rect",
        attr: { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" },
      },
      { tag: "path", attr: { d: "M7 11V7a5 5 0 0 1 10 0v4" } },
    ],
  })(e);
}
function Yu(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" } },
      { tag: "polyline", attr: { points: "16 17 21 12 16 7" } },
      { tag: "line", attr: { x1: "21", y1: "12", x2: "9", y2: "12" } },
    ],
  })(e);
}
function ly(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "3", y1: "12", x2: "21", y2: "12" } },
      { tag: "line", attr: { x1: "3", y1: "6", x2: "21", y2: "6" } },
      { tag: "line", attr: { x1: "3", y1: "18", x2: "21", y2: "18" } },
    ],
  })(e);
}
function oy(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M21.21 15.89A10 10 0 1 1 8 2.83" } },
      { tag: "path", attr: { d: "M22 12A10 10 0 0 0 12 2v10z" } },
    ],
  })(e);
}
function $f(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "11", cy: "11", r: "8" } },
      { tag: "line", attr: { x1: "21", y1: "21", x2: "16.65", y2: "16.65" } },
    ],
  })(e);
}
function Gu(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "3" } },
      {
        tag: "path",
        attr: {
          d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
        },
      },
    ],
  })(e);
}
function Zu(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
      },
    ],
  })(e);
}
function Hf(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polyline", attr: { points: "3 6 5 6 21 6" } },
      {
        tag: "path",
        attr: {
          d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
        },
      },
      { tag: "line", attr: { x1: "10", y1: "11", x2: "10", y2: "17" } },
      { tag: "line", attr: { x1: "14", y1: "11", x2: "14", y2: "17" } },
    ],
  })(e);
}
function iy(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polyline", attr: { points: "23 6 13.5 15.5 8.5 10.5 1 18" } },
      { tag: "polyline", attr: { points: "17 6 23 6 23 12" } },
    ],
  })(e);
}
function sy(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" } },
      { tag: "polyline", attr: { points: "17 8 12 3 7 8" } },
      { tag: "line", attr: { x1: "12", y1: "3", x2: "12", y2: "15" } },
    ],
  })(e);
}
function Wf(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" } },
      { tag: "circle", attr: { cx: "8.5", cy: "7", r: "4" } },
      { tag: "line", attr: { x1: "20", y1: "8", x2: "20", y2: "14" } },
      { tag: "line", attr: { x1: "23", y1: "11", x2: "17", y2: "11" } },
    ],
  })(e);
}
function Wr(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" } },
      { tag: "circle", attr: { cx: "12", cy: "7", r: "4" } },
    ],
  })(e);
}
function Rt(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" } },
      { tag: "circle", attr: { cx: "9", cy: "7", r: "4" } },
      { tag: "path", attr: { d: "M23 21v-2a4 4 0 0 0-3-3.87" } },
      { tag: "path", attr: { d: "M16 3.13a4 4 0 0 1 0 7.75" } },
    ],
  })(e);
}
function ay(e) {
  return X({
    tag: "svg",
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "18", y1: "6", x2: "6", y2: "18" } },
      { tag: "line", attr: { x1: "6", y1: "6", x2: "18", y2: "18" } },
    ],
  })(e);
}
function Vf(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: uy } = Object.prototype,
  { getPrototypeOf: Ea } = Object,
  { iterator: Ro, toStringTag: Qf } = Symbol,
  Oo = ((e) => (t) => {
    const n = uy.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  lt = (e) => ((e = e.toLowerCase()), (t) => Oo(t) === e),
  Do = (e) => (t) => typeof t === e,
  { isArray: Yn } = Array,
  Vr = Do("undefined");
function cy(e) {
  return (
    e !== null &&
    !Vr(e) &&
    e.constructor !== null &&
    !Vr(e.constructor) &&
    Ie(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Kf = lt("ArrayBuffer");
function dy(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Kf(e.buffer)),
    t
  );
}
const fy = Do("string"),
  Ie = Do("function"),
  qf = Do("number"),
  Io = (e) => e !== null && typeof e == "object",
  py = (e) => e === !0 || e === !1,
  Rl = (e) => {
    if (Oo(e) !== "object") return !1;
    const t = Ea(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Qf in e) &&
      !(Ro in e)
    );
  },
  my = lt("Date"),
  hy = lt("File"),
  yy = lt("Blob"),
  gy = lt("FileList"),
  vy = (e) => Io(e) && Ie(e.pipe),
  xy = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (Ie(e.append) &&
          ((t = Oo(e)) === "formdata" ||
            (t === "object" &&
              Ie(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  wy = lt("URLSearchParams"),
  [Ny, ky, Sy, Ey] = ["ReadableStream", "Request", "Response", "Headers"].map(
    lt
  ),
  Cy = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Gr(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, l;
  if ((typeof e != "object" && (e = [e]), Yn(e)))
    for (r = 0, l = e.length; r < l; r++) t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let s;
    for (r = 0; r < i; r++) (s = o[r]), t.call(null, e[s], s, e);
  }
}
function Jf(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    l;
  for (; r-- > 0; ) if (((l = n[r]), t === l.toLowerCase())) return l;
  return null;
}
const on = (() =>
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global)(),
  Xf = (e) => !Vr(e) && e !== on;
function gs() {
  const { caseless: e } = (Xf(this) && this) || {},
    t = {},
    n = (r, l) => {
      const o = (e && Jf(t, l)) || l;
      Rl(t[o]) && Rl(r)
        ? (t[o] = gs(t[o], r))
        : Rl(r)
        ? (t[o] = gs({}, r))
        : Yn(r)
        ? (t[o] = r.slice())
        : (t[o] = r);
    };
  for (let r = 0, l = arguments.length; r < l; r++)
    arguments[r] && Gr(arguments[r], n);
  return t;
}
const by = (e, t, n, { allOwnKeys: r } = {}) => (
    Gr(
      t,
      (l, o) => {
        n && Ie(l) ? (e[o] = Vf(l, n)) : (e[o] = l);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  Ty = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Py = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  _y = (e, t, n, r) => {
    let l, o, i;
    const s = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (l = Object.getOwnPropertyNames(e), o = l.length; o-- > 0; )
        (i = l[o]), (!r || r(i, e, t)) && !s[i] && ((t[i] = e[i]), (s[i] = !0));
      e = n !== !1 && Ea(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  Ly = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  Ry = (e) => {
    if (!e) return null;
    if (Yn(e)) return e;
    let t = e.length;
    if (!qf(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Oy = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Ea(Uint8Array)),
  Dy = (e, t) => {
    const r = (e && e[Ro]).call(e);
    let l;
    for (; (l = r.next()) && !l.done; ) {
      const o = l.value;
      t.call(e, o[0], o[1]);
    }
  },
  Iy = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  Fy = lt("HTMLFormElement"),
  jy = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, l) {
      return r.toUpperCase() + l;
    }),
  ec = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Ay = lt("RegExp"),
  Yf = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    Gr(n, (l, o) => {
      let i;
      (i = t(l, o, e)) !== !1 && (r[o] = i || l);
    }),
      Object.defineProperties(e, r);
  },
  zy = (e) => {
    Yf(e, (t, n) => {
      if (Ie(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (Ie(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  By = (e, t) => {
    const n = {},
      r = (l) => {
        l.forEach((o) => {
          n[o] = !0;
        });
      };
    return Yn(e) ? r(e) : r(String(e).split(t)), n;
  },
  My = () => {},
  Uy = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function $y(e) {
  return !!(e && Ie(e.append) && e[Qf] === "FormData" && e[Ro]);
}
const Hy = (e) => {
    const t = new Array(10),
      n = (r, l) => {
        if (Io(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[l] = r;
            const o = Yn(r) ? [] : {};
            return (
              Gr(r, (i, s) => {
                const a = n(i, l + 1);
                !Vr(a) && (o[s] = a);
              }),
              (t[l] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  Wy = lt("AsyncFunction"),
  Vy = (e) => e && (Io(e) || Ie(e)) && Ie(e.then) && Ie(e.catch),
  Gf = ((e, t) =>
    e
      ? setImmediate
      : t
      ? ((n, r) => (
          on.addEventListener(
            "message",
            ({ source: l, data: o }) => {
              l === on && o === n && r.length && r.shift()();
            },
            !1
          ),
          (l) => {
            r.push(l), on.postMessage(n, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    Ie(on.postMessage)
  ),
  Qy =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(on)
      : (typeof process < "u" && process.nextTick) || Gf,
  Ky = (e) => e != null && Ie(e[Ro]),
  C = {
    isArray: Yn,
    isArrayBuffer: Kf,
    isBuffer: cy,
    isFormData: xy,
    isArrayBufferView: dy,
    isString: fy,
    isNumber: qf,
    isBoolean: py,
    isObject: Io,
    isPlainObject: Rl,
    isReadableStream: Ny,
    isRequest: ky,
    isResponse: Sy,
    isHeaders: Ey,
    isUndefined: Vr,
    isDate: my,
    isFile: hy,
    isBlob: yy,
    isRegExp: Ay,
    isFunction: Ie,
    isStream: vy,
    isURLSearchParams: wy,
    isTypedArray: Oy,
    isFileList: gy,
    forEach: Gr,
    merge: gs,
    extend: by,
    trim: Cy,
    stripBOM: Ty,
    inherits: Py,
    toFlatObject: _y,
    kindOf: Oo,
    kindOfTest: lt,
    endsWith: Ly,
    toArray: Ry,
    forEachEntry: Dy,
    matchAll: Iy,
    isHTMLForm: Fy,
    hasOwnProperty: ec,
    hasOwnProp: ec,
    reduceDescriptors: Yf,
    freezeMethods: zy,
    toObjectSet: By,
    toCamelCase: jy,
    noop: My,
    toFiniteNumber: Uy,
    findKey: Jf,
    global: on,
    isContextDefined: Xf,
    isSpecCompliantForm: $y,
    toJSONObject: Hy,
    isAsyncFn: Wy,
    isThenable: Vy,
    setImmediate: Gf,
    asap: Qy,
    isIterable: Ky,
  };
function A(e, t, n, r, l) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    l && ((this.response = l), (this.status = l.status ? l.status : null));
}
C.inherits(A, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: C.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Zf = A.prototype,
  ep = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  ep[e] = { value: e };
});
Object.defineProperties(A, ep);
Object.defineProperty(Zf, "isAxiosError", { value: !0 });
A.from = (e, t, n, r, l, o) => {
  const i = Object.create(Zf);
  return (
    C.toFlatObject(
      e,
      i,
      function (a) {
        return a !== Error.prototype;
      },
      (s) => s !== "isAxiosError"
    ),
    A.call(i, e.message, t, n, r, l),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const qy = null;
function vs(e) {
  return C.isPlainObject(e) || C.isArray(e);
}
function tp(e) {
  return C.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function tc(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (l, o) {
          return (l = tp(l)), !n && o ? "[" + l + "]" : l;
        })
        .join(n ? "." : "")
    : t;
}
function Jy(e) {
  return C.isArray(e) && !e.some(vs);
}
const Xy = C.toFlatObject(C, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Fo(e, t, n) {
  if (!C.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = C.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (w, x) {
        return !C.isUndefined(x[w]);
      }
    ));
  const r = n.metaTokens,
    l = n.visitor || d,
    o = n.dots,
    i = n.indexes,
    a = (n.Blob || (typeof Blob < "u" && Blob)) && C.isSpecCompliantForm(t);
  if (!C.isFunction(l)) throw new TypeError("visitor must be a function");
  function c(v) {
    if (v === null) return "";
    if (C.isDate(v)) return v.toISOString();
    if (!a && C.isBlob(v))
      throw new A("Blob is not supported. Use a Buffer instead.");
    return C.isArrayBuffer(v) || C.isTypedArray(v)
      ? a && typeof Blob == "function"
        ? new Blob([v])
        : Buffer.from(v)
      : v;
  }
  function d(v, w, x) {
    let h = v;
    if (v && !x && typeof v == "object") {
      if (C.endsWith(w, "{}"))
        (w = r ? w : w.slice(0, -2)), (v = JSON.stringify(v));
      else if (
        (C.isArray(v) && Jy(v)) ||
        ((C.isFileList(v) || C.endsWith(w, "[]")) && (h = C.toArray(v)))
      )
        return (
          (w = tp(w)),
          h.forEach(function (g, N) {
            !(C.isUndefined(g) || g === null) &&
              t.append(
                i === !0 ? tc([w], N, o) : i === null ? w : w + "[]",
                c(g)
              );
          }),
          !1
        );
    }
    return vs(v) ? !0 : (t.append(tc(x, w, o), c(v)), !1);
  }
  const f = [],
    y = Object.assign(Xy, {
      defaultVisitor: d,
      convertValue: c,
      isVisitable: vs,
    });
  function k(v, w) {
    if (!C.isUndefined(v)) {
      if (f.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + w.join("."));
      f.push(v),
        C.forEach(v, function (h, p) {
          (!(C.isUndefined(h) || h === null) &&
            l.call(t, h, C.isString(p) ? p.trim() : p, w, y)) === !0 &&
            k(h, w ? w.concat(p) : [p]);
        }),
        f.pop();
    }
  }
  if (!C.isObject(e)) throw new TypeError("data must be an object");
  return k(e), t;
}
function nc(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function Ca(e, t) {
  (this._pairs = []), e && Fo(e, this, t);
}
const np = Ca.prototype;
np.append = function (t, n) {
  this._pairs.push([t, n]);
};
np.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, nc);
      }
    : nc;
  return this._pairs
    .map(function (l) {
      return n(l[0]) + "=" + n(l[1]);
    }, "")
    .join("&");
};
function Yy(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function rp(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || Yy;
  C.isFunction(n) && (n = { serialize: n });
  const l = n && n.serialize;
  let o;
  if (
    (l
      ? (o = l(t, n))
      : (o = C.isURLSearchParams(t) ? t.toString() : new Ca(t, n).toString(r)),
    o)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class Gy {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    C.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const rc = Gy,
  lp = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Zy = typeof URLSearchParams < "u" ? URLSearchParams : Ca,
  eg = typeof FormData < "u" ? FormData : null,
  tg = typeof Blob < "u" ? Blob : null,
  ng = {
    isBrowser: !0,
    classes: { URLSearchParams: Zy, FormData: eg, Blob: tg },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  ba = typeof window < "u" && typeof document < "u",
  xs = (typeof navigator == "object" && navigator) || void 0,
  rg =
    ba &&
    (!xs || ["ReactNative", "NativeScript", "NS"].indexOf(xs.product) < 0),
  lg = (() =>
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function")(),
  og = (ba && window.location.href) || "http://localhost",
  ig = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: ba,
        hasStandardBrowserEnv: rg,
        hasStandardBrowserWebWorkerEnv: lg,
        navigator: xs,
        origin: og,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  we = { ...ig, ...ng };
function sg(e, t) {
  return Fo(
    e,
    new we.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, l, o) {
          return we.isNode && C.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function ag(e) {
  return C.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === "[]" ? "" : t[1] || t[0]
  );
}
function ug(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const l = n.length;
  let o;
  for (r = 0; r < l; r++) (o = n[r]), (t[o] = e[o]);
  return t;
}
function op(e) {
  function t(n, r, l, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const s = Number.isFinite(+i),
      a = o >= n.length;
    return (
      (i = !i && C.isArray(l) ? l.length : i),
      a
        ? (C.hasOwnProp(l, i) ? (l[i] = [l[i], r]) : (l[i] = r), !s)
        : ((!l[i] || !C.isObject(l[i])) && (l[i] = []),
          t(n, r, l[i], o) && C.isArray(l[i]) && (l[i] = ug(l[i])),
          !s)
    );
  }
  if (C.isFormData(e) && C.isFunction(e.entries)) {
    const n = {};
    return (
      C.forEachEntry(e, (r, l) => {
        t(ag(r), l, n, 0);
      }),
      n
    );
  }
  return null;
}
function cg(e, t, n) {
  if (C.isString(e))
    try {
      return (t || JSON.parse)(e), C.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const Ta = {
  transitional: lp,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        l = r.indexOf("application/json") > -1,
        o = C.isObject(t);
      if ((o && C.isHTMLForm(t) && (t = new FormData(t)), C.isFormData(t)))
        return l ? JSON.stringify(op(t)) : t;
      if (
        C.isArrayBuffer(t) ||
        C.isBuffer(t) ||
        C.isStream(t) ||
        C.isFile(t) ||
        C.isBlob(t) ||
        C.isReadableStream(t)
      )
        return t;
      if (C.isArrayBufferView(t)) return t.buffer;
      if (C.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let s;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return sg(t, this.formSerializer).toString();
        if ((s = C.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const a = this.env && this.env.FormData;
          return Fo(
            s ? { "files[]": t } : t,
            a && new a(),
            this.formSerializer
          );
        }
      }
      return o || l ? (n.setContentType("application/json", !1), cg(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Ta.transitional,
        r = n && n.forcedJSONParsing,
        l = this.responseType === "json";
      if (C.isResponse(t) || C.isReadableStream(t)) return t;
      if (t && C.isString(t) && ((r && !this.responseType) || l)) {
        const i = !(n && n.silentJSONParsing) && l;
        try {
          return JSON.parse(t);
        } catch (s) {
          if (i)
            throw s.name === "SyntaxError"
              ? A.from(s, A.ERR_BAD_RESPONSE, this, null, this.response)
              : s;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: we.classes.FormData, Blob: we.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
C.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Ta.headers[e] = {};
});
const Pa = Ta,
  dg = C.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  fg = (e) => {
    const t = {};
    let n, r, l;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            (l = i.indexOf(":")),
              (n = i.substring(0, l).trim().toLowerCase()),
              (r = i.substring(l + 1).trim()),
              !(!n || (t[n] && dg[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  lc = Symbol("internals");
function sr(e) {
  return e && String(e).trim().toLowerCase();
}
function Ol(e) {
  return e === !1 || e == null ? e : C.isArray(e) ? e.map(Ol) : String(e);
}
function pg(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const mg = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function hi(e, t, n, r, l) {
  if (C.isFunction(r)) return r.call(this, t, n);
  if ((l && (t = n), !!C.isString(t))) {
    if (C.isString(r)) return t.indexOf(r) !== -1;
    if (C.isRegExp(r)) return r.test(t);
  }
}
function hg(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function yg(e, t) {
  const n = C.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (l, o, i) {
        return this[r].call(this, t, l, o, i);
      },
      configurable: !0,
    });
  });
}
class jo {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const l = this;
    function o(s, a, c) {
      const d = sr(a);
      if (!d) throw new Error("header name must be a non-empty string");
      const f = C.findKey(l, d);
      (!f || l[f] === void 0 || c === !0 || (c === void 0 && l[f] !== !1)) &&
        (l[f || a] = Ol(s));
    }
    const i = (s, a) => C.forEach(s, (c, d) => o(c, d, a));
    if (C.isPlainObject(t) || t instanceof this.constructor) i(t, n);
    else if (C.isString(t) && (t = t.trim()) && !mg(t)) i(fg(t), n);
    else if (C.isObject(t) && C.isIterable(t)) {
      let s = {},
        a,
        c;
      for (const d of t) {
        if (!C.isArray(d))
          throw TypeError("Object iterator must return a key-value pair");
        s[(c = d[0])] = (a = s[c])
          ? C.isArray(a)
            ? [...a, d[1]]
            : [a, d[1]]
          : d[1];
      }
      i(s, n);
    } else t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = sr(t)), t)) {
      const r = C.findKey(this, t);
      if (r) {
        const l = this[r];
        if (!n) return l;
        if (n === !0) return pg(l);
        if (C.isFunction(n)) return n.call(this, l, r);
        if (C.isRegExp(n)) return n.exec(l);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = sr(t)), t)) {
      const r = C.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || hi(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let l = !1;
    function o(i) {
      if (((i = sr(i)), i)) {
        const s = C.findKey(r, i);
        s && (!n || hi(r, r[s], s, n)) && (delete r[s], (l = !0));
      }
    }
    return C.isArray(t) ? t.forEach(o) : o(t), l;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      l = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || hi(this, this[o], o, t, !0)) && (delete this[o], (l = !0));
    }
    return l;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      C.forEach(this, (l, o) => {
        const i = C.findKey(r, o);
        if (i) {
          (n[i] = Ol(l)), delete n[o];
          return;
        }
        const s = t ? hg(o) : String(o).trim();
        s !== o && delete n[o], (n[s] = Ol(l)), (r[s] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      C.forEach(this, (r, l) => {
        r != null && r !== !1 && (n[l] = t && C.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((l) => r.set(l)), r;
  }
  static accessor(t) {
    const r = (this[lc] = this[lc] = { accessors: {} }).accessors,
      l = this.prototype;
    function o(i) {
      const s = sr(i);
      r[s] || (yg(l, i), (r[s] = !0));
    }
    return C.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
jo.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
C.reduceDescriptors(jo.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
C.freezeMethods(jo);
const nt = jo;
function yi(e, t) {
  const n = this || Pa,
    r = t || n,
    l = nt.from(r.headers);
  let o = r.data;
  return (
    C.forEach(e, function (s) {
      o = s.call(n, o, l.normalize(), t ? t.status : void 0);
    }),
    l.normalize(),
    o
  );
}
function ip(e) {
  return !!(e && e.__CANCEL__);
}
function Gn(e, t, n) {
  A.call(this, e ?? "canceled", A.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
C.inherits(Gn, A, { __CANCEL__: !0 });
function sp(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new A(
          "Request failed with status code " + n.status,
          [A.ERR_BAD_REQUEST, A.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
function gg(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function vg(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let l = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (a) {
      const c = Date.now(),
        d = r[o];
      i || (i = c), (n[l] = a), (r[l] = c);
      let f = o,
        y = 0;
      for (; f !== l; ) (y += n[f++]), (f = f % e);
      if (((l = (l + 1) % e), l === o && (o = (o + 1) % e), c - i < t)) return;
      const k = d && c - d;
      return k ? Math.round((y * 1e3) / k) : void 0;
    }
  );
}
function xg(e, t) {
  let n = 0,
    r = 1e3 / t,
    l,
    o;
  const i = (c, d = Date.now()) => {
    (n = d), (l = null), o && (clearTimeout(o), (o = null)), e.apply(null, c);
  };
  return [
    (...c) => {
      const d = Date.now(),
        f = d - n;
      f >= r
        ? i(c, d)
        : ((l = c),
          o ||
            (o = setTimeout(() => {
              (o = null), i(l);
            }, r - f)));
    },
    () => l && i(l),
  ];
}
const ao = (e, t, n = 3) => {
    let r = 0;
    const l = vg(50, 250);
    return xg((o) => {
      const i = o.loaded,
        s = o.lengthComputable ? o.total : void 0,
        a = i - r,
        c = l(a),
        d = i <= s;
      r = i;
      const f = {
        loaded: i,
        total: s,
        progress: s ? i / s : void 0,
        bytes: a,
        rate: c || void 0,
        estimated: c && s && d ? (s - i) / c : void 0,
        event: o,
        lengthComputable: s != null,
        [t ? "download" : "upload"]: !0,
      };
      e(f);
    }, n);
  },
  oc = (e, t) => {
    const n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  ic =
    (e) =>
    (...t) =>
      C.asap(() => e(...t)),
  wg = we.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, we.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(we.origin),
        we.navigator && /(msie|trident)/i.test(we.navigator.userAgent)
      )
    : () => !0,
  Ng = we.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, l, o) {
          const i = [e + "=" + encodeURIComponent(t)];
          C.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
            C.isString(r) && i.push("path=" + r),
            C.isString(l) && i.push("domain=" + l),
            o === !0 && i.push("secure"),
            (document.cookie = i.join("; "));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function kg(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Sg(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ap(e, t, n) {
  let r = !kg(t);
  return e && (r || n == !1) ? Sg(e, t) : t;
}
const sc = (e) => (e instanceof nt ? { ...e } : e);
function mn(e, t) {
  t = t || {};
  const n = {};
  function r(c, d, f, y) {
    return C.isPlainObject(c) && C.isPlainObject(d)
      ? C.merge.call({ caseless: y }, c, d)
      : C.isPlainObject(d)
      ? C.merge({}, d)
      : C.isArray(d)
      ? d.slice()
      : d;
  }
  function l(c, d, f, y) {
    if (C.isUndefined(d)) {
      if (!C.isUndefined(c)) return r(void 0, c, f, y);
    } else return r(c, d, f, y);
  }
  function o(c, d) {
    if (!C.isUndefined(d)) return r(void 0, d);
  }
  function i(c, d) {
    if (C.isUndefined(d)) {
      if (!C.isUndefined(c)) return r(void 0, c);
    } else return r(void 0, d);
  }
  function s(c, d, f) {
    if (f in t) return r(c, d);
    if (f in e) return r(void 0, c);
  }
  const a = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: s,
    headers: (c, d, f) => l(sc(c), sc(d), f, !0),
  };
  return (
    C.forEach(Object.keys(Object.assign({}, e, t)), function (d) {
      const f = a[d] || l,
        y = f(e[d], t[d], d);
      (C.isUndefined(y) && f !== s) || (n[d] = y);
    }),
    n
  );
}
const up = (e) => {
    const t = mn({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: l,
      xsrfCookieName: o,
      headers: i,
      auth: s,
    } = t;
    (t.headers = i = nt.from(i)),
      (t.url = rp(
        ap(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer
      )),
      s &&
        i.set(
          "Authorization",
          "Basic " +
            btoa(
              (s.username || "") +
                ":" +
                (s.password ? unescape(encodeURIComponent(s.password)) : "")
            )
        );
    let a;
    if (C.isFormData(n)) {
      if (we.hasStandardBrowserEnv || we.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if ((a = i.getContentType()) !== !1) {
        const [c, ...d] = a
          ? a
              .split(";")
              .map((f) => f.trim())
              .filter(Boolean)
          : [];
        i.setContentType([c || "multipart/form-data", ...d].join("; "));
      }
    }
    if (
      we.hasStandardBrowserEnv &&
      (r && C.isFunction(r) && (r = r(t)), r || (r !== !1 && wg(t.url)))
    ) {
      const c = l && o && Ng.read(o);
      c && i.set(l, c);
    }
    return t;
  },
  Eg = typeof XMLHttpRequest < "u",
  Cg =
    Eg &&
    function (e) {
      return new Promise(function (n, r) {
        const l = up(e);
        let o = l.data;
        const i = nt.from(l.headers).normalize();
        let { responseType: s, onUploadProgress: a, onDownloadProgress: c } = l,
          d,
          f,
          y,
          k,
          v;
        function w() {
          k && k(),
            v && v(),
            l.cancelToken && l.cancelToken.unsubscribe(d),
            l.signal && l.signal.removeEventListener("abort", d);
        }
        let x = new XMLHttpRequest();
        x.open(l.method.toUpperCase(), l.url, !0), (x.timeout = l.timeout);
        function h() {
          if (!x) return;
          const g = nt.from(
              "getAllResponseHeaders" in x && x.getAllResponseHeaders()
            ),
            S = {
              data:
                !s || s === "text" || s === "json"
                  ? x.responseText
                  : x.response,
              status: x.status,
              statusText: x.statusText,
              headers: g,
              config: e,
              request: x,
            };
          sp(
            function (_) {
              n(_), w();
            },
            function (_) {
              r(_), w();
            },
            S
          ),
            (x = null);
        }
        "onloadend" in x
          ? (x.onloadend = h)
          : (x.onreadystatechange = function () {
              !x ||
                x.readyState !== 4 ||
                (x.status === 0 &&
                  !(x.responseURL && x.responseURL.indexOf("file:") === 0)) ||
                setTimeout(h);
            }),
          (x.onabort = function () {
            x &&
              (r(new A("Request aborted", A.ECONNABORTED, e, x)), (x = null));
          }),
          (x.onerror = function () {
            r(new A("Network Error", A.ERR_NETWORK, e, x)), (x = null);
          }),
          (x.ontimeout = function () {
            let N = l.timeout
              ? "timeout of " + l.timeout + "ms exceeded"
              : "timeout exceeded";
            const S = l.transitional || lp;
            l.timeoutErrorMessage && (N = l.timeoutErrorMessage),
              r(
                new A(
                  N,
                  S.clarifyTimeoutError ? A.ETIMEDOUT : A.ECONNABORTED,
                  e,
                  x
                )
              ),
              (x = null);
          }),
          o === void 0 && i.setContentType(null),
          "setRequestHeader" in x &&
            C.forEach(i.toJSON(), function (N, S) {
              x.setRequestHeader(S, N);
            }),
          C.isUndefined(l.withCredentials) ||
            (x.withCredentials = !!l.withCredentials),
          s && s !== "json" && (x.responseType = l.responseType),
          c && (([y, v] = ao(c, !0)), x.addEventListener("progress", y)),
          a &&
            x.upload &&
            (([f, k] = ao(a)),
            x.upload.addEventListener("progress", f),
            x.upload.addEventListener("loadend", k)),
          (l.cancelToken || l.signal) &&
            ((d = (g) => {
              x &&
                (r(!g || g.type ? new Gn(null, e, x) : g),
                x.abort(),
                (x = null));
            }),
            l.cancelToken && l.cancelToken.subscribe(d),
            l.signal &&
              (l.signal.aborted ? d() : l.signal.addEventListener("abort", d)));
        const p = gg(l.url);
        if (p && we.protocols.indexOf(p) === -1) {
          r(new A("Unsupported protocol " + p + ":", A.ERR_BAD_REQUEST, e));
          return;
        }
        x.send(o || null);
      });
    },
  bg = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let r = new AbortController(),
        l;
      const o = function (c) {
        if (!l) {
          (l = !0), s();
          const d = c instanceof Error ? c : this.reason;
          r.abort(
            d instanceof A ? d : new Gn(d instanceof Error ? d.message : d)
          );
        }
      };
      let i =
        t &&
        setTimeout(() => {
          (i = null), o(new A(`timeout ${t} of ms exceeded`, A.ETIMEDOUT));
        }, t);
      const s = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((c) => {
            c.unsubscribe
              ? c.unsubscribe(o)
              : c.removeEventListener("abort", o);
          }),
          (e = null));
      };
      e.forEach((c) => c.addEventListener("abort", o));
      const { signal: a } = r;
      return (a.unsubscribe = () => C.asap(s)), a;
    }
  },
  Tg = bg,
  Pg = function* (e, t) {
    let n = e.byteLength;
    if (!t || n < t) {
      yield e;
      return;
    }
    let r = 0,
      l;
    for (; r < n; ) (l = r + t), yield e.slice(r, l), (r = l);
  },
  _g = async function* (e, t) {
    for await (const n of Lg(e)) yield* Pg(n, t);
  },
  Lg = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await t.read();
        if (n) break;
        yield r;
      }
    } finally {
      await t.cancel();
    }
  },
  ac = (e, t, n, r) => {
    const l = _g(e, t);
    let o = 0,
      i,
      s = (a) => {
        i || ((i = !0), r && r(a));
      };
    return new ReadableStream(
      {
        async pull(a) {
          try {
            const { done: c, value: d } = await l.next();
            if (c) {
              s(), a.close();
              return;
            }
            let f = d.byteLength;
            if (n) {
              let y = (o += f);
              n(y);
            }
            a.enqueue(new Uint8Array(d));
          } catch (c) {
            throw (s(c), c);
          }
        },
        cancel(a) {
          return s(a), l.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  Ao =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  cp = Ao && typeof ReadableStream == "function",
  Rg =
    Ao &&
    (typeof TextEncoder == "function"
      ? (
          (e) => (t) =>
            e.encode(t)
        )(new TextEncoder())
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
  dp = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  Og =
    cp &&
    dp(() => {
      let e = !1;
      const t = new Request(we.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (e = !0), "half";
        },
      }).headers.has("Content-Type");
      return e && !t;
    }),
  uc = 64 * 1024,
  ws = cp && dp(() => C.isReadableStream(new Response("").body)),
  uo = { stream: ws && ((e) => e.body) };
Ao &&
  ((e) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
      !uo[t] &&
        (uo[t] = C.isFunction(e[t])
          ? (n) => n[t]()
          : (n, r) => {
              throw new A(
                `Response type '${t}' is not supported`,
                A.ERR_NOT_SUPPORT,
                r
              );
            });
    });
  })(new Response());
const Dg = async (e) => {
    if (e == null) return 0;
    if (C.isBlob(e)) return e.size;
    if (C.isSpecCompliantForm(e))
      return (
        await new Request(we.origin, { method: "POST", body: e }).arrayBuffer()
      ).byteLength;
    if (C.isArrayBufferView(e) || C.isArrayBuffer(e)) return e.byteLength;
    if ((C.isURLSearchParams(e) && (e = e + ""), C.isString(e)))
      return (await Rg(e)).byteLength;
  },
  Ig = async (e, t) => {
    const n = C.toFiniteNumber(e.getContentLength());
    return n ?? Dg(t);
  },
  Fg =
    Ao &&
    (async (e) => {
      let {
        url: t,
        method: n,
        data: r,
        signal: l,
        cancelToken: o,
        timeout: i,
        onDownloadProgress: s,
        onUploadProgress: a,
        responseType: c,
        headers: d,
        withCredentials: f = "same-origin",
        fetchOptions: y,
      } = up(e);
      c = c ? (c + "").toLowerCase() : "text";
      let k = Tg([l, o && o.toAbortSignal()], i),
        v;
      const w =
        k &&
        k.unsubscribe &&
        (() => {
          k.unsubscribe();
        });
      let x;
      try {
        if (
          a &&
          Og &&
          n !== "get" &&
          n !== "head" &&
          (x = await Ig(d, r)) !== 0
        ) {
          let S = new Request(t, { method: "POST", body: r, duplex: "half" }),
            T;
          if (
            (C.isFormData(r) &&
              (T = S.headers.get("content-type")) &&
              d.setContentType(T),
            S.body)
          ) {
            const [_, P] = oc(x, ao(ic(a)));
            r = ac(S.body, uc, _, P);
          }
        }
        C.isString(f) || (f = f ? "include" : "omit");
        const h = "credentials" in Request.prototype;
        v = new Request(t, {
          ...y,
          signal: k,
          method: n.toUpperCase(),
          headers: d.normalize().toJSON(),
          body: r,
          duplex: "half",
          credentials: h ? f : void 0,
        });
        let p = await fetch(v);
        const g = ws && (c === "stream" || c === "response");
        if (ws && (s || (g && w))) {
          const S = {};
          ["status", "statusText", "headers"].forEach((j) => {
            S[j] = p[j];
          });
          const T = C.toFiniteNumber(p.headers.get("content-length")),
            [_, P] = (s && oc(T, ao(ic(s), !0))) || [];
          p = new Response(
            ac(p.body, uc, _, () => {
              P && P(), w && w();
            }),
            S
          );
        }
        c = c || "text";
        let N = await uo[C.findKey(uo, c) || "text"](p, e);
        return (
          !g && w && w(),
          await new Promise((S, T) => {
            sp(S, T, {
              data: N,
              headers: nt.from(p.headers),
              status: p.status,
              statusText: p.statusText,
              config: e,
              request: v,
            });
          })
        );
      } catch (h) {
        throw (
          (w && w(),
          h && h.name === "TypeError" && /Load failed|fetch/i.test(h.message)
            ? Object.assign(new A("Network Error", A.ERR_NETWORK, e, v), {
                cause: h.cause || h,
              })
            : A.from(h, h && h.code, e, v))
        );
      }
    }),
  Ns = { http: qy, xhr: Cg, fetch: Fg };
C.forEach(Ns, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const cc = (e) => `- ${e}`,
  jg = (e) => C.isFunction(e) || e === null || e === !1,
  fp = {
    getAdapter: (e) => {
      e = C.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const l = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let i;
        if (
          ((r = n),
          !jg(n) && ((r = Ns[(i = String(n)).toLowerCase()]), r === void 0))
        )
          throw new A(`Unknown adapter '${i}'`);
        if (r) break;
        l[i || "#" + o] = r;
      }
      if (!r) {
        const o = Object.entries(l).map(
          ([s, a]) =>
            `adapter ${s} ` +
            (a === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(cc).join(`
`)
            : " " + cc(o[0])
          : "as no adapter specified";
        throw new A(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: Ns,
  };
function gi(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Gn(null, e);
}
function dc(e) {
  return (
    gi(e),
    (e.headers = nt.from(e.headers)),
    (e.data = yi.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    fp
      .getAdapter(e.adapter || Pa.adapter)(e)
      .then(
        function (r) {
          return (
            gi(e),
            (r.data = yi.call(e, e.transformResponse, r)),
            (r.headers = nt.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            ip(r) ||
              (gi(e),
              r &&
                r.response &&
                ((r.response.data = yi.call(
                  e,
                  e.transformResponse,
                  r.response
                )),
                (r.response.headers = nt.from(r.response.headers)))),
            Promise.reject(r)
          );
        }
      )
  );
}
const pp = "1.9.0",
  zo = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    zo[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const fc = {};
zo.transitional = function (t, n, r) {
  function l(o, i) {
    return (
      "[Axios v" +
      pp +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (o, i, s) => {
    if (t === !1)
      throw new A(
        l(i, " has been removed" + (n ? " in " + n : "")),
        A.ERR_DEPRECATED
      );
    return (
      n &&
        !fc[i] &&
        ((fc[i] = !0),
        console.warn(
          l(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, s) : !0
    );
  };
};
zo.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function Ag(e, t, n) {
  if (typeof e != "object")
    throw new A("options must be an object", A.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let l = r.length;
  for (; l-- > 0; ) {
    const o = r[l],
      i = t[o];
    if (i) {
      const s = e[o],
        a = s === void 0 || i(s, o, e);
      if (a !== !0)
        throw new A("option " + o + " must be " + a, A.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new A("Unknown option " + o, A.ERR_BAD_OPTION);
  }
}
const Dl = { assertOptions: Ag, validators: zo },
  it = Dl.validators;
class co {
  constructor(t) {
    (this.defaults = t || {}),
      (this.interceptors = { request: new rc(), response: new rc() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let l = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(l)
          : (l = new Error());
        const o = l.stack ? l.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? o &&
              !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + o)
            : (r.stack = o);
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = mn(this.defaults, n));
    const { transitional: r, paramsSerializer: l, headers: o } = n;
    r !== void 0 &&
      Dl.assertOptions(
        r,
        {
          silentJSONParsing: it.transitional(it.boolean),
          forcedJSONParsing: it.transitional(it.boolean),
          clarifyTimeoutError: it.transitional(it.boolean),
        },
        !1
      ),
      l != null &&
        (C.isFunction(l)
          ? (n.paramsSerializer = { serialize: l })
          : Dl.assertOptions(
              l,
              { encode: it.function, serialize: it.function },
              !0
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      Dl.assertOptions(
        n,
        {
          baseUrl: it.spelling("baseURL"),
          withXsrfToken: it.spelling("withXSRFToken"),
        },
        !0
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let i = o && C.merge(o.common, o[n.method]);
    o &&
      C.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (v) => {
          delete o[v];
        }
      ),
      (n.headers = nt.concat(i, o));
    const s = [];
    let a = !0;
    this.interceptors.request.forEach(function (w) {
      (typeof w.runWhen == "function" && w.runWhen(n) === !1) ||
        ((a = a && w.synchronous), s.unshift(w.fulfilled, w.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function (w) {
      c.push(w.fulfilled, w.rejected);
    });
    let d,
      f = 0,
      y;
    if (!a) {
      const v = [dc.bind(this), void 0];
      for (
        v.unshift.apply(v, s),
          v.push.apply(v, c),
          y = v.length,
          d = Promise.resolve(n);
        f < y;

      )
        d = d.then(v[f++], v[f++]);
      return d;
    }
    y = s.length;
    let k = n;
    for (f = 0; f < y; ) {
      const v = s[f++],
        w = s[f++];
      try {
        k = v(k);
      } catch (x) {
        w.call(this, x);
        break;
      }
    }
    try {
      d = dc.call(this, k);
    } catch (v) {
      return Promise.reject(v);
    }
    for (f = 0, y = c.length; f < y; ) d = d.then(c[f++], c[f++]);
    return d;
  }
  getUri(t) {
    t = mn(this.defaults, t);
    const n = ap(t.baseURL, t.url, t.allowAbsoluteUrls);
    return rp(n, t.params, t.paramsSerializer);
  }
}
C.forEach(["delete", "get", "head", "options"], function (t) {
  co.prototype[t] = function (n, r) {
    return this.request(
      mn(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
C.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, i, s) {
      return this.request(
        mn(s || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        })
      );
    };
  }
  (co.prototype[t] = n()), (co.prototype[t + "Form"] = n(!0));
});
const Il = co;
class _a {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    this.promise.then((l) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](l);
      r._listeners = null;
    }),
      (this.promise.then = (l) => {
        let o;
        const i = new Promise((s) => {
          r.subscribe(s), (o = s);
        }).then(l);
        return (
          (i.cancel = function () {
            r.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, s) {
        r.reason || ((r.reason = new Gn(o, i, s)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (r) => {
        t.abort(r);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new _a(function (l) {
        t = l;
      }),
      cancel: t,
    };
  }
}
const zg = _a;
function Bg(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Mg(e) {
  return C.isObject(e) && e.isAxiosError === !0;
}
const ks = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(ks).forEach(([e, t]) => {
  ks[t] = e;
});
const Ug = ks;
function mp(e) {
  const t = new Il(e),
    n = Vf(Il.prototype.request, t);
  return (
    C.extend(n, Il.prototype, t, { allOwnKeys: !0 }),
    C.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (l) {
      return mp(mn(e, l));
    }),
    n
  );
}
const se = mp(Pa);
se.Axios = Il;
se.CanceledError = Gn;
se.CancelToken = zg;
se.isCancel = ip;
se.VERSION = pp;
se.toFormData = Fo;
se.AxiosError = A;
se.Cancel = se.CanceledError;
se.all = function (t) {
  return Promise.all(t);
};
se.spread = Bg;
se.isAxiosError = Mg;
se.mergeConfig = mn;
se.AxiosHeaders = nt;
se.formToJSON = (e) => op(C.isHTMLForm(e) ? new FormData(e) : e);
se.getAdapter = fp.getAdapter;
se.HttpStatusCode = Ug;
se.default = se;
const $g = se;
function hp(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = hp(e[t])) && (r && (r += " "), (r += n));
    else for (t in e) e[t] && (r && (r += " "), (r += t));
  return r;
}
function Ot() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = hp(e)) && (r && (r += " "), (r += t));
  return r;
}
const kr = (e) => typeof e == "number" && !isNaN(e),
  hn = (e) => typeof e == "string",
  Le = (e) => typeof e == "function",
  Fl = (e) => (hn(e) || Le(e) ? e : null),
  vi = (e) => E.isValidElement(e) || hn(e) || Le(e) || kr(e);
function Hg(e, t, n) {
  n === void 0 && (n = 300);
  const { scrollHeight: r, style: l } = e;
  requestAnimationFrame(() => {
    (l.minHeight = "initial"),
      (l.height = r + "px"),
      (l.transition = `all ${n}ms`),
      requestAnimationFrame(() => {
        (l.height = "0"), (l.padding = "0"), (l.margin = "0"), setTimeout(t, n);
      });
  });
}
function Bo(e) {
  let {
    enter: t,
    exit: n,
    appendPosition: r = !1,
    collapse: l = !0,
    collapseDuration: o = 300,
  } = e;
  return function (i) {
    let {
      children: s,
      position: a,
      preventExitTransition: c,
      done: d,
      nodeRef: f,
      isIn: y,
    } = i;
    const k = r ? `${t}--${a}` : t,
      v = r ? `${n}--${a}` : n,
      w = E.useRef(0);
    return (
      E.useLayoutEffect(() => {
        const x = f.current,
          h = k.split(" "),
          p = (g) => {
            g.target === f.current &&
              (x.dispatchEvent(new Event("d")),
              x.removeEventListener("animationend", p),
              x.removeEventListener("animationcancel", p),
              w.current === 0 &&
                g.type !== "animationcancel" &&
                x.classList.remove(...h));
          };
        x.classList.add(...h),
          x.addEventListener("animationend", p),
          x.addEventListener("animationcancel", p);
      }, []),
      E.useEffect(() => {
        const x = f.current,
          h = () => {
            x.removeEventListener("animationend", h), l ? Hg(x, d, o) : d();
          };
        y ||
          (c
            ? h()
            : ((w.current = 1),
              (x.className += ` ${v}`),
              x.addEventListener("animationend", h)));
      }, [y]),
      B.createElement(B.Fragment, null, s)
    );
  };
}
function pc(e, t) {
  return e != null
    ? {
        content: e.content,
        containerId: e.props.containerId,
        id: e.props.toastId,
        theme: e.props.theme,
        type: e.props.type,
        data: e.props.data || {},
        isLoading: e.props.isLoading,
        icon: e.props.icon,
        status: t,
      }
    : {};
}
const $e = {
    list: new Map(),
    emitQueue: new Map(),
    on(e, t) {
      return (
        this.list.has(e) || this.list.set(e, []), this.list.get(e).push(t), this
      );
    },
    off(e, t) {
      if (t) {
        const n = this.list.get(e).filter((r) => r !== t);
        return this.list.set(e, n), this;
      }
      return this.list.delete(e), this;
    },
    cancelEmit(e) {
      const t = this.emitQueue.get(e);
      return t && (t.forEach(clearTimeout), this.emitQueue.delete(e)), this;
    },
    emit(e) {
      this.list.has(e) &&
        this.list.get(e).forEach((t) => {
          const n = setTimeout(() => {
            t(...[].slice.call(arguments, 1));
          }, 0);
          this.emitQueue.has(e) || this.emitQueue.set(e, []),
            this.emitQueue.get(e).push(n);
        });
    },
  },
  gl = (e) => {
    let { theme: t, type: n, ...r } = e;
    return B.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill:
        t === "colored" ? "currentColor" : `var(--toastify-icon-color-${n})`,
      ...r,
    });
  },
  xi = {
    info: function (e) {
      return B.createElement(
        gl,
        { ...e },
        B.createElement("path", {
          d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
        })
      );
    },
    warning: function (e) {
      return B.createElement(
        gl,
        { ...e },
        B.createElement("path", {
          d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
        })
      );
    },
    success: function (e) {
      return B.createElement(
        gl,
        { ...e },
        B.createElement("path", {
          d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
        })
      );
    },
    error: function (e) {
      return B.createElement(
        gl,
        { ...e },
        B.createElement("path", {
          d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
        })
      );
    },
    spinner: function () {
      return B.createElement("div", { className: "Toastify__spinner" });
    },
  };
function Wg(e) {
  const [, t] = E.useReducer((k) => k + 1, 0),
    [n, r] = E.useState([]),
    l = E.useRef(null),
    o = E.useRef(new Map()).current,
    i = (k) => n.indexOf(k) !== -1,
    s = E.useRef({
      toastKey: 1,
      displayedToast: 0,
      count: 0,
      queue: [],
      props: e,
      containerId: null,
      isToastActive: i,
      getToast: (k) => o.get(k),
    }).current;
  function a(k) {
    let { containerId: v } = k;
    const { limit: w } = s.props;
    !w ||
      (v && s.containerId !== v) ||
      ((s.count -= s.queue.length), (s.queue = []));
  }
  function c(k) {
    r((v) => (k == null ? [] : v.filter((w) => w !== k)));
  }
  function d() {
    const { toastContent: k, toastProps: v, staleId: w } = s.queue.shift();
    y(k, v, w);
  }
  function f(k, v) {
    let { delay: w, staleId: x, ...h } = v;
    if (
      !vi(k) ||
      (function (le) {
        return (
          !l.current ||
          (s.props.enableMultiContainer &&
            le.containerId !== s.props.containerId) ||
          (o.has(le.toastId) && le.updateId == null)
        );
      })(h)
    )
      return;
    const { toastId: p, updateId: g, data: N } = h,
      { props: S } = s,
      T = () => c(p),
      _ = g == null;
    _ && s.count++;
    const P = {
      ...S,
      style: S.toastStyle,
      key: s.toastKey++,
      ...Object.fromEntries(
        Object.entries(h).filter((le) => {
          let [ae, oe] = le;
          return oe != null;
        })
      ),
      toastId: p,
      updateId: g,
      data: N,
      closeToast: T,
      isIn: !1,
      className: Fl(h.className || S.toastClassName),
      bodyClassName: Fl(h.bodyClassName || S.bodyClassName),
      progressClassName: Fl(h.progressClassName || S.progressClassName),
      autoClose:
        !h.isLoading &&
        ((j = h.autoClose),
        (F = S.autoClose),
        j === !1 || (kr(j) && j > 0) ? j : F),
      deleteToast() {
        const le = pc(o.get(p), "removed");
        o.delete(p), $e.emit(4, le);
        const ae = s.queue.length;
        if (
          ((s.count = p == null ? s.count - s.displayedToast : s.count - 1),
          s.count < 0 && (s.count = 0),
          ae > 0)
        ) {
          const oe = p == null ? s.props.limit : 1;
          if (ae === 1 || oe === 1) s.displayedToast++, d();
          else {
            const Je = oe > ae ? ae : oe;
            s.displayedToast = Je;
            for (let ue = 0; ue < Je; ue++) d();
          }
        } else t();
      },
    };
    var j, F;
    (P.iconOut = (function (le) {
      let { theme: ae, type: oe, isLoading: Je, icon: ue } = le,
        ke = null;
      const b = { theme: ae, type: oe };
      return (
        ue === !1 ||
          (Le(ue)
            ? (ke = ue(b))
            : E.isValidElement(ue)
            ? (ke = E.cloneElement(ue, b))
            : hn(ue) || kr(ue)
            ? (ke = ue)
            : Je
            ? (ke = xi.spinner())
            : ((R) => R in xi)(oe) && (ke = xi[oe](b))),
        ke
      );
    })(P)),
      Le(h.onOpen) && (P.onOpen = h.onOpen),
      Le(h.onClose) && (P.onClose = h.onClose),
      (P.closeButton = S.closeButton),
      h.closeButton === !1 || vi(h.closeButton)
        ? (P.closeButton = h.closeButton)
        : h.closeButton === !0 &&
          (P.closeButton = !vi(S.closeButton) || S.closeButton);
    let te = k;
    E.isValidElement(k) && !hn(k.type)
      ? (te = E.cloneElement(k, { closeToast: T, toastProps: P, data: N }))
      : Le(k) && (te = k({ closeToast: T, toastProps: P, data: N })),
      S.limit && S.limit > 0 && s.count > S.limit && _
        ? s.queue.push({ toastContent: te, toastProps: P, staleId: x })
        : kr(w)
        ? setTimeout(() => {
            y(te, P, x);
          }, w)
        : y(te, P, x);
  }
  function y(k, v, w) {
    const { toastId: x } = v;
    w && o.delete(w);
    const h = { content: k, props: v };
    o.set(x, h),
      r((p) => [...p, x].filter((g) => g !== w)),
      $e.emit(4, pc(h, h.props.updateId == null ? "added" : "updated"));
  }
  return (
    E.useEffect(
      () => (
        (s.containerId = e.containerId),
        $e
          .cancelEmit(3)
          .on(0, f)
          .on(1, (k) => l.current && c(k))
          .on(5, a)
          .emit(2, s),
        () => {
          o.clear(), $e.emit(3, s);
        }
      ),
      []
    ),
    E.useEffect(() => {
      (s.props = e), (s.isToastActive = i), (s.displayedToast = n.length);
    }),
    {
      getToastToRender: function (k) {
        const v = new Map(),
          w = Array.from(o.values());
        return (
          e.newestOnTop && w.reverse(),
          w.forEach((x) => {
            const { position: h } = x.props;
            v.has(h) || v.set(h, []), v.get(h).push(x);
          }),
          Array.from(v, (x) => k(x[0], x[1]))
        );
      },
      containerRef: l,
      isToastActive: i,
    }
  );
}
function mc(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientX
    : e.clientX;
}
function hc(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
}
function Vg(e) {
  const [t, n] = E.useState(!1),
    [r, l] = E.useState(!1),
    o = E.useRef(null),
    i = E.useRef({
      start: 0,
      x: 0,
      y: 0,
      delta: 0,
      removalDistance: 0,
      canCloseOnClick: !0,
      canDrag: !1,
      boundingRect: null,
      didMove: !1,
    }).current,
    s = E.useRef(e),
    {
      autoClose: a,
      pauseOnHover: c,
      closeToast: d,
      onClick: f,
      closeOnClick: y,
    } = e;
  function k(N) {
    if (e.draggable) {
      N.nativeEvent.type === "touchstart" && N.nativeEvent.preventDefault(),
        (i.didMove = !1),
        document.addEventListener("mousemove", h),
        document.addEventListener("mouseup", p),
        document.addEventListener("touchmove", h),
        document.addEventListener("touchend", p);
      const S = o.current;
      (i.canCloseOnClick = !0),
        (i.canDrag = !0),
        (i.boundingRect = S.getBoundingClientRect()),
        (S.style.transition = ""),
        (i.x = mc(N.nativeEvent)),
        (i.y = hc(N.nativeEvent)),
        e.draggableDirection === "x"
          ? ((i.start = i.x),
            (i.removalDistance = S.offsetWidth * (e.draggablePercent / 100)))
          : ((i.start = i.y),
            (i.removalDistance =
              S.offsetHeight *
              (e.draggablePercent === 80
                ? 1.5 * e.draggablePercent
                : e.draggablePercent / 100)));
    }
  }
  function v(N) {
    if (i.boundingRect) {
      const { top: S, bottom: T, left: _, right: P } = i.boundingRect;
      N.nativeEvent.type !== "touchend" &&
      e.pauseOnHover &&
      i.x >= _ &&
      i.x <= P &&
      i.y >= S &&
      i.y <= T
        ? x()
        : w();
    }
  }
  function w() {
    n(!0);
  }
  function x() {
    n(!1);
  }
  function h(N) {
    const S = o.current;
    i.canDrag &&
      S &&
      ((i.didMove = !0),
      t && x(),
      (i.x = mc(N)),
      (i.y = hc(N)),
      (i.delta = e.draggableDirection === "x" ? i.x - i.start : i.y - i.start),
      i.start !== i.x && (i.canCloseOnClick = !1),
      (S.style.transform = `translate${e.draggableDirection}(${i.delta}px)`),
      (S.style.opacity = "" + (1 - Math.abs(i.delta / i.removalDistance))));
  }
  function p() {
    document.removeEventListener("mousemove", h),
      document.removeEventListener("mouseup", p),
      document.removeEventListener("touchmove", h),
      document.removeEventListener("touchend", p);
    const N = o.current;
    if (i.canDrag && i.didMove && N) {
      if (((i.canDrag = !1), Math.abs(i.delta) > i.removalDistance))
        return l(!0), void e.closeToast();
      (N.style.transition = "transform 0.2s, opacity 0.2s"),
        (N.style.transform = `translate${e.draggableDirection}(0)`),
        (N.style.opacity = "1");
    }
  }
  E.useEffect(() => {
    s.current = e;
  }),
    E.useEffect(
      () => (
        o.current && o.current.addEventListener("d", w, { once: !0 }),
        Le(e.onOpen) &&
          e.onOpen(E.isValidElement(e.children) && e.children.props),
        () => {
          const N = s.current;
          Le(N.onClose) &&
            N.onClose(E.isValidElement(N.children) && N.children.props);
        }
      ),
      []
    ),
    E.useEffect(
      () => (
        e.pauseOnFocusLoss &&
          (document.hasFocus() || x(),
          window.addEventListener("focus", w),
          window.addEventListener("blur", x)),
        () => {
          e.pauseOnFocusLoss &&
            (window.removeEventListener("focus", w),
            window.removeEventListener("blur", x));
        }
      ),
      [e.pauseOnFocusLoss]
    );
  const g = { onMouseDown: k, onTouchStart: k, onMouseUp: v, onTouchEnd: v };
  return (
    a && c && ((g.onMouseEnter = x), (g.onMouseLeave = w)),
    y &&
      (g.onClick = (N) => {
        f && f(N), i.canCloseOnClick && d();
      }),
    {
      playToast: w,
      pauseToast: x,
      isRunning: t,
      preventExitTransition: r,
      toastRef: o,
      eventHandlers: g,
    }
  );
}
function yp(e) {
  let { closeToast: t, theme: n, ariaLabel: r = "close" } = e;
  return B.createElement(
    "button",
    {
      className: `Toastify__close-button Toastify__close-button--${n}`,
      type: "button",
      onClick: (l) => {
        l.stopPropagation(), t(l);
      },
      "aria-label": r,
    },
    B.createElement(
      "svg",
      { "aria-hidden": "true", viewBox: "0 0 14 16" },
      B.createElement("path", {
        fillRule: "evenodd",
        d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
      })
    )
  );
}
function Qg(e) {
  let {
    delay: t,
    isRunning: n,
    closeToast: r,
    type: l = "default",
    hide: o,
    className: i,
    style: s,
    controlledProgress: a,
    progress: c,
    rtl: d,
    isIn: f,
    theme: y,
  } = e;
  const k = o || (a && c === 0),
    v = {
      ...s,
      animationDuration: `${t}ms`,
      animationPlayState: n ? "running" : "paused",
      opacity: k ? 0 : 1,
    };
  a && (v.transform = `scaleX(${c})`);
  const w = Ot(
      "Toastify__progress-bar",
      a
        ? "Toastify__progress-bar--controlled"
        : "Toastify__progress-bar--animated",
      `Toastify__progress-bar-theme--${y}`,
      `Toastify__progress-bar--${l}`,
      { "Toastify__progress-bar--rtl": d }
    ),
    x = Le(i) ? i({ rtl: d, type: l, defaultClassName: w }) : Ot(w, i);
  return B.createElement("div", {
    role: "progressbar",
    "aria-hidden": k ? "true" : "false",
    "aria-label": "notification timer",
    className: x,
    style: v,
    [a && c >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
      a && c < 1
        ? null
        : () => {
            f && r();
          },
  });
}
const Kg = (e) => {
    const {
        isRunning: t,
        preventExitTransition: n,
        toastRef: r,
        eventHandlers: l,
      } = Vg(e),
      {
        closeButton: o,
        children: i,
        autoClose: s,
        onClick: a,
        type: c,
        hideProgressBar: d,
        closeToast: f,
        transition: y,
        position: k,
        className: v,
        style: w,
        bodyClassName: x,
        bodyStyle: h,
        progressClassName: p,
        progressStyle: g,
        updateId: N,
        role: S,
        progress: T,
        rtl: _,
        toastId: P,
        deleteToast: j,
        isIn: F,
        isLoading: te,
        iconOut: le,
        closeOnClick: ae,
        theme: oe,
      } = e,
      Je = Ot(
        "Toastify__toast",
        `Toastify__toast-theme--${oe}`,
        `Toastify__toast--${c}`,
        { "Toastify__toast--rtl": _ },
        { "Toastify__toast--close-on-click": ae }
      ),
      ue = Le(v)
        ? v({ rtl: _, position: k, type: c, defaultClassName: Je })
        : Ot(Je, v),
      ke = !!T || !s,
      b = { closeToast: f, type: c, theme: oe };
    let R = null;
    return (
      o === !1 ||
        (R = Le(o) ? o(b) : E.isValidElement(o) ? E.cloneElement(o, b) : yp(b)),
      B.createElement(
        y,
        { isIn: F, done: j, position: k, preventExitTransition: n, nodeRef: r },
        B.createElement(
          "div",
          { id: P, onClick: a, className: ue, ...l, style: w, ref: r },
          B.createElement(
            "div",
            {
              ...(F && { role: S }),
              className: Le(x) ? x({ type: c }) : Ot("Toastify__toast-body", x),
              style: h,
            },
            le != null &&
              B.createElement(
                "div",
                {
                  className: Ot("Toastify__toast-icon", {
                    "Toastify--animate-icon Toastify__zoom-enter": !te,
                  }),
                },
                le
              ),
            B.createElement("div", null, i)
          ),
          R,
          B.createElement(Qg, {
            ...(N && !ke ? { key: `pb-${N}` } : {}),
            rtl: _,
            theme: oe,
            delay: s,
            isRunning: t,
            isIn: F,
            closeToast: f,
            hide: d,
            type: c,
            style: g,
            className: p,
            controlledProgress: ke,
            progress: T || 0,
          })
        )
      )
    );
  },
  Mo = function (e, t) {
    return (
      t === void 0 && (t = !1),
      {
        enter: `Toastify--animate Toastify__${e}-enter`,
        exit: `Toastify--animate Toastify__${e}-exit`,
        appendPosition: t,
      }
    );
  },
  qg = Bo(Mo("bounce", !0));
Bo(Mo("slide", !0));
Bo(Mo("zoom"));
Bo(Mo("flip"));
const Ss = E.forwardRef((e, t) => {
  const { getToastToRender: n, containerRef: r, isToastActive: l } = Wg(e),
    { className: o, style: i, rtl: s, containerId: a } = e;
  function c(d) {
    const f = Ot(
      "Toastify__toast-container",
      `Toastify__toast-container--${d}`,
      { "Toastify__toast-container--rtl": s }
    );
    return Le(o)
      ? o({ position: d, rtl: s, defaultClassName: f })
      : Ot(f, Fl(o));
  }
  return (
    E.useEffect(() => {
      t && (t.current = r.current);
    }, []),
    B.createElement(
      "div",
      { ref: r, className: "Toastify", id: a },
      n((d, f) => {
        const y = f.length ? { ...i } : { ...i, pointerEvents: "none" };
        return B.createElement(
          "div",
          { className: c(d), style: y, key: `container-${d}` },
          f.map((k, v) => {
            let { content: w, props: x } = k;
            return B.createElement(
              Kg,
              {
                ...x,
                isIn: l(x.toastId),
                style: { ...x.style, "--nth": v + 1, "--len": f.length },
                key: `toast-${x.key}`,
              },
              w
            );
          })
        );
      })
    )
  );
});
(Ss.displayName = "ToastContainer"),
  (Ss.defaultProps = {
    position: "top-right",
    transition: qg,
    autoClose: 5e3,
    closeButton: yp,
    pauseOnHover: !0,
    pauseOnFocusLoss: !0,
    closeOnClick: !0,
    draggable: !0,
    draggablePercent: 80,
    draggableDirection: "x",
    role: "alert",
    theme: "light",
  });
let wi,
  en = new Map(),
  fr = [],
  Jg = 1;
function gp() {
  return "" + Jg++;
}
function Xg(e) {
  return e && (hn(e.toastId) || kr(e.toastId)) ? e.toastId : gp();
}
function Sr(e, t) {
  return (
    en.size > 0 ? $e.emit(0, e, t) : fr.push({ content: e, options: t }),
    t.toastId
  );
}
function fo(e, t) {
  return { ...t, type: (t && t.type) || e, toastId: Xg(t) };
}
function vl(e) {
  return (t, n) => Sr(t, fo(e, n));
}
function D(e, t) {
  return Sr(e, fo("default", t));
}
(D.loading = (e, t) =>
  Sr(
    e,
    fo("default", {
      isLoading: !0,
      autoClose: !1,
      closeOnClick: !1,
      closeButton: !1,
      draggable: !1,
      ...t,
    })
  )),
  (D.promise = function (e, t, n) {
    let r,
      { pending: l, error: o, success: i } = t;
    l && (r = hn(l) ? D.loading(l, n) : D.loading(l.render, { ...n, ...l }));
    const s = {
        isLoading: null,
        autoClose: null,
        closeOnClick: null,
        closeButton: null,
        draggable: null,
      },
      a = (d, f, y) => {
        if (f == null) return void D.dismiss(r);
        const k = { type: d, ...s, ...n, data: y },
          v = hn(f) ? { render: f } : f;
        return r ? D.update(r, { ...k, ...v }) : D(v.render, { ...k, ...v }), y;
      },
      c = Le(e) ? e() : e;
    return c.then((d) => a("success", i, d)).catch((d) => a("error", o, d)), c;
  }),
  (D.success = vl("success")),
  (D.info = vl("info")),
  (D.error = vl("error")),
  (D.warning = vl("warning")),
  (D.warn = D.warning),
  (D.dark = (e, t) => Sr(e, fo("default", { theme: "dark", ...t }))),
  (D.dismiss = (e) => {
    en.size > 0
      ? $e.emit(1, e)
      : (fr = fr.filter((t) => e != null && t.options.toastId !== e));
  }),
  (D.clearWaitingQueue = function (e) {
    return e === void 0 && (e = {}), $e.emit(5, e);
  }),
  (D.isActive = (e) => {
    let t = !1;
    return (
      en.forEach((n) => {
        n.isToastActive && n.isToastActive(e) && (t = !0);
      }),
      t
    );
  }),
  (D.update = function (e, t) {
    t === void 0 && (t = {}),
      setTimeout(() => {
        const n = (function (r, l) {
          let { containerId: o } = l;
          const i = en.get(o || wi);
          return i && i.getToast(r);
        })(e, t);
        if (n) {
          const { props: r, content: l } = n,
            o = {
              delay: 100,
              ...r,
              ...t,
              toastId: t.toastId || e,
              updateId: gp(),
            };
          o.toastId !== e && (o.staleId = e);
          const i = o.render || l;
          delete o.render, Sr(i, o);
        }
      }, 0);
  }),
  (D.done = (e) => {
    D.update(e, { progress: 1 });
  }),
  (D.onChange = (e) => (
    $e.on(4, e),
    () => {
      $e.off(4, e);
    }
  )),
  (D.POSITION = {
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    TOP_CENTER: "top-center",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_CENTER: "bottom-center",
  }),
  (D.TYPE = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
    DEFAULT: "default",
  }),
  $e
    .on(2, (e) => {
      (wi = e.containerId || e),
        en.set(wi, e),
        fr.forEach((t) => {
          $e.emit(0, t.content, t.options);
        }),
        (fr = []);
    })
    .on(3, (e) => {
      en.delete(e.containerId || e), en.size === 0 && $e.off(0).off(1).off(5);
    });
const Yg = "http://localhost:5000",
  H = $g.create({
    baseURL: Yg,
    headers: { "Content-Type": "application/json" },
    timeout: 1e4,
  });
H.interceptors.request.use(
  (e) => {
    const t = localStorage.getItem("userInfo");
    if (t) {
      const { token: n } = JSON.parse(t);
      n && (e.headers.Authorization = `Bearer ${n}`);
    }
    return e;
  },
  (e) => Promise.reject(e)
);
H.interceptors.response.use(
  (e) => e,
  (e) => (
    e.response
      ? e.response.status === 401
        ? (D.error("Authentication error: Please log in again"),
          window.location.pathname !== "/login" &&
            (localStorage.removeItem("userInfo"),
            (window.location.href = "/login")))
        : e.response.status === 403 &&
          D.error("You do not have permission to perform this action")
      : e.request
      ? D.error("Network error: Server is not responding")
      : D.error("Error: " + e.message),
    Promise.reject(e)
  )
);
const La = E.createContext({}),
  Gg = ({ children: e }) => {
    const [t, n] = E.useState(() => {
        const s = localStorage.getItem("auth");
        return s ? JSON.parse(s) : {};
      }),
      [r, l] = E.useState(!0);
    E.useEffect(() => {
      t != null && t.token
        ? (H.defaults.headers.common.Authorization = `Bearer ${t.token}`)
        : delete H.defaults.headers.common.Authorization,
        l(!1);
    }, [t]);
    const o = async (s, a) => {
        var c, d, f;
        try {
          const y = await H.post("/api/auth/login", {
            employeeId: s,
            password: a,
          });
          if (
            (console.log("Login response:", y.data), !y.data || !y.data.token)
          )
            throw new Error("Invalid response format from server");
          const k = {
            token: y.data.token,
            employeeId:
              y.data.employeeId ||
              ((c = y.data.user) == null ? void 0 : c.employeeId) ||
              "",
            name:
              y.data.name ||
              ((d = y.data.user) == null ? void 0 : d.name) ||
              "",
            role:
              y.data.role ||
              ((f = y.data.user) == null ? void 0 : f.role) ||
              "employee",
          };
          return (
            n(k),
            localStorage.setItem("auth", JSON.stringify(k)),
            (H.defaults.headers.common.Authorization = `Bearer ${k.token}`),
            !0
          );
        } catch (y) {
          throw (console.error("Login error:", y), y);
        }
      },
      i = () => {
        n({}),
          localStorage.removeItem("auth"),
          delete H.defaults.headers.common.Authorization;
      };
    return u(La.Provider, {
      value: { auth: t, loading: r, login: o, logout: i, setAuth: n },
      children: e,
    });
  },
  Jt = () => E.useContext(La),
  Zg = () => {
    const [e, t] = E.useState(!1),
      { auth: n, logout: r } = Jt(),
      l = Xn(),
      o = () => {
        r(), l("/login");
      };
    return m("header", {
      className: "bg-blue-600 text-white shadow-md",
      children: [
        m("div", {
          className:
            "container mx-auto px-4 py-4 flex items-center justify-between",
          children: [
            u("div", {
              className: "flex items-center space-x-2",
              children: u(q, {
                to: "/dashboard",
                className: "text-xl font-bold",
                children: "TimeTracker",
              }),
            }),
            u("button", {
              className: "md:hidden text-white focus:outline-none",
              onClick: () => t(!e),
              children: e ? u(ay, { size: 24 }) : u(ly, { size: 24 }),
            }),
            m("nav", {
              className: "hidden md:flex items-center space-x-6",
              children: [
                m(q, {
                  to: "/dashboard",
                  className: "flex items-center space-x-1 hover:text-blue-200",
                  children: [u(ut, {}), u("span", { children: "Dashboard" })],
                }),
                m(q, {
                  to: "/time-clock",
                  className: "flex items-center space-x-1 hover:text-blue-200",
                  children: [u(ut, {}), u("span", { children: "Time Clock" })],
                }),
                n.role === "superadmin" &&
                  m(tn, {
                    children: [
                      m(q, {
                        to: "/super-admin",
                        className:
                          "flex items-center space-x-1 hover:text-blue-200",
                        children: [
                          u(Zu, {}),
                          u("span", { children: "Admin Management" }),
                        ],
                      }),
                      m(q, {
                        to: "/employees",
                        className:
                          "flex items-center space-x-1 hover:text-blue-200",
                        children: [
                          u(Rt, {}),
                          u("span", { children: "Employee Management" }),
                        ],
                      }),
                    ],
                  }),
                n.role === "admin" &&
                  m(tn, {
                    children: [
                      m(q, {
                        to: "/admin",
                        className:
                          "flex items-center space-x-1 hover:text-blue-200",
                        children: [u(Gu, {}), u("span", { children: "Admin" })],
                      }),
                      m(q, {
                        to: "/employees",
                        className:
                          "flex items-center space-x-1 hover:text-blue-200",
                        children: [
                          u(Rt, {}),
                          u("span", { children: "Employees" }),
                        ],
                      }),
                    ],
                  }),
                m(q, {
                  to: "/profile",
                  className: "flex items-center space-x-1 hover:text-blue-200",
                  children: [u(Wr, {}), u("span", { children: "Profile" })],
                }),
                m("button", {
                  onClick: o,
                  className: "flex items-center space-x-1 hover:text-blue-200",
                  children: [u(Yu, {}), u("span", { children: "Logout" })],
                }),
              ],
            }),
          ],
        }),
        e &&
          u("div", {
            className: "md:hidden bg-blue-500 pb-4",
            children: m("div", {
              className: "container mx-auto px-4 flex flex-col space-y-3",
              children: [
                m(q, {
                  to: "/dashboard",
                  className:
                    "flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded",
                  onClick: () => t(!1),
                  children: [u(ut, {}), u("span", { children: "Dashboard" })],
                }),
                m(q, {
                  to: "/time-clock",
                  className:
                    "flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded",
                  onClick: () => t(!1),
                  children: [u(ut, {}), u("span", { children: "Time Clock" })],
                }),
                n.role === "superadmin" &&
                  m(tn, {
                    children: [
                      m(q, {
                        to: "/super-admin",
                        className:
                          "flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded",
                        onClick: () => t(!1),
                        children: [
                          u(Zu, {}),
                          u("span", { children: "Admin Management" }),
                        ],
                      }),
                      m(q, {
                        to: "/employees",
                        className:
                          "flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded",
                        onClick: () => t(!1),
                        children: [
                          u(Rt, {}),
                          u("span", { children: "Employee Management" }),
                        ],
                      }),
                    ],
                  }),
                n.role === "admin" &&
                  m(tn, {
                    children: [
                      m(q, {
                        to: "/admin",
                        className:
                          "flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded",
                        onClick: () => t(!1),
                        children: [u(Gu, {}), u("span", { children: "Admin" })],
                      }),
                      m(q, {
                        to: "/employees",
                        className:
                          "flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded",
                        onClick: () => t(!1),
                        children: [
                          u(Rt, {}),
                          u("span", { children: "Employees" }),
                        ],
                      }),
                    ],
                  }),
                m(q, {
                  to: "/profile",
                  className:
                    "flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded",
                  onClick: () => t(!1),
                  children: [u(Wr, {}), u("span", { children: "Profile" })],
                }),
                m("button", {
                  onClick: () => {
                    o(), t(!1);
                  },
                  className:
                    "flex items-center space-x-2 py-2 hover:bg-blue-600 px-3 rounded text-left",
                  children: [u(Yu, {}), u("span", { children: "Logout" })],
                }),
              ],
            }),
          }),
        u("div", {
          className: "bg-blue-700 py-1 px-4 text-xs text-right",
          children: m("span", {
            children: [
              n.name,
              " | Role: ",
              n.role.charAt(0).toUpperCase() + n.role.slice(1),
              " | ",
              new Date().toISOString().substr(0, 10),
            ],
          }),
        }),
      ],
    });
  },
  ev = () => {
    const e = new Date().getFullYear();
    return u("footer", {
      className: "bg-gray-800 text-white py-4 mt-auto",
      children: u("div", {
        className: "container mx-auto px-4 text-center",
        children: m("p", { children: ["© ", e, " Employee Time Tracker App"] }),
      }),
    });
  },
  tv = () => {
    const { auth: e, loading: t } = Jt();
    return m("div", {
      className: "flex flex-col min-h-screen",
      children: [
        !t && (e == null ? void 0 : e.token) && u(Zg, {}),
        u("main", {
          className: "flex-grow container mx-auto px-4 py-8",
          children: u(Lo, {}),
        }),
        u(ev, {}),
      ],
    });
  },
  yc = () => {
    const [e, t] = E.useState(""),
      [n, r] = E.useState(""),
      [l, o] = E.useState(!1),
      { login: i, auth: s } = Jt(),
      a = Xn();
    return (
      E.useEffect(() => {
        s != null && s.token && a("/dashboard");
      }, [s, a]),
      u("div", {
        className: "flex items-center justify-center min-h-[80vh]",
        children: m("div", {
          className:
            "w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md",
          children: [
            m("div", {
              className: "text-center",
              children: [
                u(ut, { className: "mx-auto text-blue-600 text-5xl" }),
                u("h1", {
                  className: "mt-4 text-3xl font-bold text-gray-900",
                  children: "Employee Time Tracker",
                }),
                u("p", {
                  className: "mt-2 text-gray-600",
                  children: "Login to track your work hours",
                }),
              ],
            }),
            m("form", {
              className: "mt-8 space-y-6",
              onSubmit: async (d) => {
                if ((d.preventDefault(), !e || !n))
                  return D.error("Please fill in all fields");
                try {
                  o(!0),
                    await i(e, n),
                    D.success("Login successful"),
                    a("/dashboard");
                } catch (f) {
                  D.error(f.message || "Login failed");
                } finally {
                  o(!1);
                }
              },
              children: [
                m("div", {
                  children: [
                    u("label", {
                      htmlFor: "employeeId",
                      className: "block text-sm font-medium text-gray-700",
                      children: "Employee ID",
                    }),
                    u("input", {
                      id: "employeeId",
                      name: "employeeId",
                      type: "text",
                      required: !0,
                      className:
                        "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                      placeholder: "Enter your Employee ID",
                      value: e,
                      onChange: (d) => t(d.target.value),
                    }),
                  ],
                }),
                m("div", {
                  children: [
                    u("label", {
                      htmlFor: "password",
                      className: "block text-sm font-medium text-gray-700",
                      children: "Password",
                    }),
                    u("input", {
                      id: "password",
                      name: "password",
                      type: "password",
                      required: !0,
                      className:
                        "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                      placeholder: "Enter your password",
                      value: n,
                      onChange: (d) => r(d.target.value),
                    }),
                  ],
                }),
                u("div", {
                  children: u("button", {
                    type: "submit",
                    className:
                      "group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    disabled: l,
                    children: l ? "Logging In..." : "Login",
                  }),
                }),
              ],
            }),
            u("div", {
              className: "text-center mt-4",
              children: u("p", {
                className: "text-sm text-gray-600",
                children: "Contact your administrator for account access",
              }),
            }),
          ],
        }),
      })
    );
  },
  nv = () => {
    const { auth: e } = Jt(),
      [t, n] = E.useState([]),
      [r, l] = E.useState(!0),
      [o, i] = E.useState({
        today: 0,
        todayBreaks: 0,
        todayNet: 0,
        week: 0,
        weekBreaks: 0,
        weekNet: 0,
        month: 0,
        monthBreaks: 0,
        monthNet: 0,
      });
    E.useEffect(() => {
      (async () => {
        try {
          const { data: f } = await H.get("/api/timelogs/me");
          n(f), s(f);
        } catch (f) {
          console.error("Error fetching time logs:", f),
            D.error("Failed to fetch time logs");
        } finally {
          l(!1);
        }
      })();
    }, []);
    const s = (d) => {
        const f = new Date(),
          y = new Date(f.getFullYear(), f.getMonth(), f.getDate()),
          k = new Date(y);
        k.setDate(k.getDate() - 7);
        const v = new Date(y);
        v.setMonth(v.getMonth() - 1);
        let w = 0,
          x = 0,
          h = 0,
          p = 0,
          g = 0,
          N = 0,
          S = 0,
          T = 0,
          _ = 0;
        d.forEach((P) => {
          const j = new Date(P.loginTime);
          P.status === "completed" &&
            (j >= y &&
              ((w += P.totalHours || 0),
              (x += P.totalBreakHours || 0),
              (h += P.netWorkHours || 0)),
            j >= k &&
              ((p += P.totalHours || 0),
              (g += P.totalBreakHours || 0),
              (N += P.netWorkHours || 0)),
            j >= v &&
              ((S += P.totalHours || 0),
              (T += P.totalBreakHours || 0),
              (_ += P.netWorkHours || 0)));
        }),
          i({
            today: w.toFixed(2),
            todayBreaks: x.toFixed(2),
            todayNet: h.toFixed(2),
            week: p.toFixed(2),
            weekBreaks: g.toFixed(2),
            weekNet: N.toFixed(2),
            month: S.toFixed(2),
            monthBreaks: T.toFixed(2),
            monthNet: _.toFixed(2),
          });
      },
      a = (d) => {
        const f = { year: "numeric", month: "short", day: "numeric" };
        return new Date(d).toLocaleDateString("en-US", f);
      },
      c = (d) => {
        const f = { hour: "2-digit", minute: "2-digit" };
        return new Date(d).toLocaleTimeString("en-US", f);
      };
    return m("div", {
      className: "max-w-4xl mx-auto px-4",
      children: [
        m("div", {
          className: "text-center mb-8",
          children: [
            u("h1", {
              className: "text-3xl font-bold text-gray-800",
              children: "Employee Dashboard",
            }),
            m("p", {
              className: "text-gray-600 mt-2",
              children: [
                "Welcome back, ",
                e.name,
                " (Employee ID: ",
                e.employeeId,
                ")",
              ],
            }),
          ],
        }),
        m("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
          children: [
            m("div", {
              className: "bg-white p-6 rounded-lg shadow-md",
              children: [
                m("div", {
                  className: "flex items-center justify-between mb-4",
                  children: [
                    u("h2", {
                      className: "text-lg font-semibold text-gray-800",
                      children: "Today",
                    }),
                    u(ut, { className: "text-blue-600 text-xl" }),
                  ],
                }),
                m("div", {
                  className: "space-y-2",
                  children: [
                    m("div", {
                      className: "flex justify-between items-center",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Total:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-gray-800",
                          children: [o.today, " hrs"],
                        }),
                      ],
                    }),
                    m("div", {
                      className: "flex justify-between items-center",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Breaks:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-yellow-600",
                          children: [o.todayBreaks, " hrs"],
                        }),
                      ],
                    }),
                    m("div", {
                      className:
                        "flex justify-between items-center border-t pt-2",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Net:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-blue-600",
                          children: [o.todayNet, " hrs"],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            m("div", {
              className: "bg-white p-6 rounded-lg shadow-md",
              children: [
                m("div", {
                  className: "flex items-center justify-between mb-4",
                  children: [
                    u("h2", {
                      className: "text-lg font-semibold text-gray-800",
                      children: "This Week",
                    }),
                    u(An, { className: "text-green-600 text-xl" }),
                  ],
                }),
                m("div", {
                  className: "space-y-2",
                  children: [
                    m("div", {
                      className: "flex justify-between items-center",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Total:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-gray-800",
                          children: [o.week, " hrs"],
                        }),
                      ],
                    }),
                    m("div", {
                      className: "flex justify-between items-center",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Breaks:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-yellow-600",
                          children: [o.weekBreaks, " hrs"],
                        }),
                      ],
                    }),
                    m("div", {
                      className:
                        "flex justify-between items-center border-t pt-2",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Net:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-green-600",
                          children: [o.weekNet, " hrs"],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            m("div", {
              className: "bg-white p-6 rounded-lg shadow-md",
              children: [
                m("div", {
                  className: "flex items-center justify-between mb-4",
                  children: [
                    u("h2", {
                      className: "text-lg font-semibold text-gray-800",
                      children: "This Month",
                    }),
                    u(An, { className: "text-purple-600 text-xl" }),
                  ],
                }),
                m("div", {
                  className: "space-y-2",
                  children: [
                    m("div", {
                      className: "flex justify-between items-center",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Total:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-gray-800",
                          children: [o.month, " hrs"],
                        }),
                      ],
                    }),
                    m("div", {
                      className: "flex justify-between items-center",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Breaks:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-yellow-600",
                          children: [o.monthBreaks, " hrs"],
                        }),
                      ],
                    }),
                    m("div", {
                      className:
                        "flex justify-between items-center border-t pt-2",
                      children: [
                        u("span", {
                          className: "text-sm text-gray-600",
                          children: "Net:",
                        }),
                        m("span", {
                          className: "text-lg font-semibold text-purple-600",
                          children: [o.monthNet, " hrs"],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        m("div", {
          className: "bg-white p-6 rounded-lg shadow-md",
          children: [
            m("div", {
              className: "flex justify-between items-center mb-6",
              children: [
                u("h2", {
                  className: "text-xl font-semibold text-gray-800",
                  children: "Recent Time Logs",
                }),
                u(q, {
                  to: "/time-clock",
                  className:
                    "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
                  children: "Clock In/Out",
                }),
              ],
            }),
            r
              ? u("div", {
                  className: "text-center py-4",
                  children: "Loading...",
                })
              : t.length > 0
              ? u("div", {
                  className: "overflow-x-auto",
                  children: m("table", {
                    className: "min-w-full bg-white",
                    children: [
                      u("thead", {
                        children: m("tr", {
                          className:
                            "bg-gray-100 text-gray-600 uppercase text-sm leading-normal",
                          children: [
                            u("th", {
                              className: "py-3 px-6 text-left",
                              children: "Date",
                            }),
                            u("th", {
                              className: "py-3 px-6 text-left",
                              children: "Clock In",
                            }),
                            u("th", {
                              className: "py-3 px-6 text-left",
                              children: "Clock Out",
                            }),
                            u("th", {
                              className: "py-3 px-6 text-right",
                              children: "Total",
                            }),
                            u("th", {
                              className: "py-3 px-6 text-right",
                              children: "Breaks",
                            }),
                            u("th", {
                              className: "py-3 px-6 text-right",
                              children: "Net",
                            }),
                            u("th", {
                              className: "py-3 px-6 text-center",
                              children: "Status",
                            }),
                          ],
                        }),
                      }),
                      u("tbody", {
                        className: "text-gray-600 text-sm",
                        children: t
                          .slice(0, 10)
                          .map((d) =>
                            m(
                              "tr",
                              {
                                className:
                                  "border-b border-gray-200 hover:bg-gray-50",
                                children: [
                                  u("td", {
                                    className:
                                      "py-3 px-6 text-left whitespace-nowrap",
                                    children: a(d.loginTime),
                                  }),
                                  u("td", {
                                    className: "py-3 px-6 text-left",
                                    children: c(d.loginTime),
                                  }),
                                  u("td", {
                                    className: "py-3 px-6 text-left",
                                    children: d.logoutTime
                                      ? c(d.logoutTime)
                                      : "---",
                                  }),
                                  u("td", {
                                    className: "py-3 px-6 text-right",
                                    children:
                                      d.totalHours > 0
                                        ? d.totalHours.toFixed(2)
                                        : "---",
                                  }),
                                  u("td", {
                                    className: "py-3 px-6 text-right",
                                    children:
                                      d.totalBreakHours > 0
                                        ? m("span", {
                                            className:
                                              "flex items-center justify-end",
                                            children: [
                                              u(Hr, {
                                                className:
                                                  "mr-1 text-yellow-500",
                                              }),
                                              d.totalBreakHours.toFixed(2),
                                            ],
                                          })
                                        : "0.00",
                                  }),
                                  u("td", {
                                    className: "py-3 px-6 text-right",
                                    children:
                                      d.netWorkHours > 0
                                        ? d.netWorkHours.toFixed(2)
                                        : "---",
                                  }),
                                  u("td", {
                                    className: "py-3 px-6 text-center",
                                    children: u("span", {
                                      className: `px-2 py-1 rounded-full text-xs ${
                                        d.status === "active"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-blue-100 text-blue-800"
                                      }`,
                                      children:
                                        d.status === "active"
                                          ? "Active"
                                          : "Completed",
                                    }),
                                  }),
                                ],
                              },
                              d._id
                            )
                          ),
                      }),
                    ],
                  }),
                })
              : u("div", {
                  className: "text-center py-4 text-gray-500",
                  children: "No time logs found",
                }),
          ],
        }),
      ],
    });
  },
  rv = () => {
    Jt();
    const e = Xn(),
      [t, n] = E.useState(null),
      [r, l] = E.useState(null),
      [o, i] = E.useState(!0),
      [s, a] = E.useState(new Date()),
      [c, d] = E.useState({
        totalHoursToday: 0,
        totalBreakHours: 0,
        netWorkHours: 0,
      });
    E.useEffect(() => {
      const p = setInterval(() => {
        a(new Date());
      }, 1e3);
      return () => clearInterval(p);
    }, []),
      E.useEffect(() => {
        (async () => {
          var g;
          try {
            i(!0);
            const { data: N } = await H.get("/api/timelogs/me"),
              S = N.find((T) => T.status === "active");
            if (S) {
              n(S);
              const T =
                (g = S.breaks) == null
                  ? void 0
                  : g.find((_) => _.status === "active");
              T && l(T),
                d({
                  totalHoursToday: f(new Date(S.loginTime), new Date()),
                  totalBreakHours: S.totalBreakHours || 0,
                  netWorkHours:
                    f(new Date(S.loginTime), new Date()) -
                    (S.totalBreakHours || 0),
                });
            }
          } catch (N) {
            console.error("Error fetching active session:", N),
              D.error("Failed to fetch active session");
          } finally {
            i(!1);
          }
        })();
      }, []);
    const f = (p, g) => {
        const N = g - p;
        return parseFloat((N / (1e3 * 60 * 60)).toFixed(2));
      },
      y = async () => {
        var p, g;
        try {
          i(!0);
          const { data: N } = await H.post("/api/timelogs/login");
          n(N), D.success("Successfully clocked in");
        } catch (N) {
          console.error("Clock in error:", N),
            D.error(
              ((g = (p = N.response) == null ? void 0 : p.data) == null
                ? void 0
                : g.message) || "Failed to clock in"
            );
        } finally {
          i(!1);
        }
      },
      k = async () => {
        var p, g;
        if (r) {
          D.error("Please end your break before clocking out");
          return;
        }
        if (window.confirm("Are you sure you want to clock out?"))
          try {
            i(!0),
              await H.put("/api/timelogs/logout"),
              n(null),
              D.success("Successfully clocked out"),
              e("/dashboard");
          } catch (N) {
            console.error("Clock out error:", N),
              D.error(
                ((g = (p = N.response) == null ? void 0 : p.data) == null
                  ? void 0
                  : g.message) || "Failed to clock out"
              );
          } finally {
            i(!1);
          }
      },
      v = async () => {
        var p, g;
        try {
          i(!0);
          const { data: N } = await H.post("/api/timelogs/break/start");
          n(N);
          const S = N.breaks.find((T) => T.status === "active");
          l(S), D.success("Break started");
        } catch (N) {
          console.error("Start break error:", N),
            D.error(
              ((g = (p = N.response) == null ? void 0 : p.data) == null
                ? void 0
                : g.message) || "Failed to start break"
            );
        } finally {
          i(!1);
        }
      },
      w = async () => {
        var p, g;
        try {
          i(!0);
          const { data: N } = await H.put("/api/timelogs/break/end");
          n(N),
            l(null),
            d({
              totalHoursToday: f(new Date(N.loginTime), new Date()),
              totalBreakHours: N.totalBreakHours || 0,
              netWorkHours:
                f(new Date(N.loginTime), new Date()) - (N.totalBreakHours || 0),
            }),
            D.success("Break ended");
        } catch (N) {
          console.error("End break error:", N),
            D.error(
              ((g = (p = N.response) == null ? void 0 : p.data) == null
                ? void 0
                : g.message) || "Failed to end break"
            );
        } finally {
          i(!1);
        }
      },
      x = (p) =>
        p.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: !0,
        });
    return m("div", {
      className: "max-w-4xl mx-auto px-4 py-8",
      children: [
        m("div", {
          className: "text-center mb-8",
          children: [
            u("h1", {
              className: "text-3xl font-bold text-gray-800",
              children: "Time Clock",
            }),
            m("p", {
              className: "text-gray-600 mt-2",
              children: [
                ((p) =>
                  p.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }))(s),
                " | ",
                x(s),
              ],
            }),
          ],
        }),
        m("div", {
          className: "bg-white p-6 rounded-lg shadow-md mb-8",
          children: [
            m("div", {
              className:
                "flex flex-col md:flex-row items-center justify-between mb-6",
              children: [
                m("div", {
                  className: "flex items-center mb-4 md:mb-0",
                  children: [
                    u(ut, { className: "text-blue-600 text-4xl mr-4" }),
                    m("div", {
                      children: [
                        u("h2", {
                          className: "text-xl font-semibold text-gray-800",
                          children: t
                            ? "Currently Clocked In"
                            : "Not Clocked In",
                        }),
                        t &&
                          m("p", {
                            className: "text-gray-600",
                            children: ["Since: ", x(new Date(t.loginTime))],
                          }),
                      ],
                    }),
                  ],
                }),
                t &&
                  r &&
                  m("div", {
                    className:
                      "flex items-center text-yellow-600 bg-yellow-50 px-4 py-2 rounded-md",
                    children: [
                      u(Hr, { className: "mr-2" }),
                      u("span", { children: "On Break" }),
                    ],
                  }),
              ],
            }),
            t &&
              m("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
                children: [
                  m("div", {
                    className: "bg-blue-50 p-4 rounded-md",
                    children: [
                      u("p", {
                        className: "text-sm text-gray-600",
                        children: "Total Hours Today",
                      }),
                      u("p", {
                        className: "text-2xl font-bold text-blue-600",
                        children: f(new Date(t.loginTime), s).toFixed(2),
                      }),
                    ],
                  }),
                  m("div", {
                    className: "bg-yellow-50 p-4 rounded-md",
                    children: [
                      u("p", {
                        className: "text-sm text-gray-600",
                        children: "Break Time",
                      }),
                      u("p", {
                        className: "text-2xl font-bold text-yellow-600",
                        children: r
                          ? (
                              (t.totalBreakHours || 0) +
                              f(new Date(r.startTime), s)
                            ).toFixed(2)
                          : (t.totalBreakHours || 0).toFixed(2),
                      }),
                    ],
                  }),
                  m("div", {
                    className: "bg-green-50 p-4 rounded-md",
                    children: [
                      u("p", {
                        className: "text-sm text-gray-600",
                        children: "Net Working Hours",
                      }),
                      u("p", {
                        className: "text-2xl font-bold text-green-600",
                        children: r
                          ? (
                              f(new Date(t.loginTime), s) -
                              ((t.totalBreakHours || 0) +
                                f(new Date(r.startTime), s))
                            ).toFixed(2)
                          : (
                              f(new Date(t.loginTime), s) -
                              (t.totalBreakHours || 0)
                            ).toFixed(2),
                      }),
                    ],
                  }),
                ],
              }),
            m("div", {
              className: "flex flex-wrap gap-4 justify-center",
              children: [
                !t &&
                  u("button", {
                    onClick: y,
                    disabled: o,
                    className:
                      "px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50",
                    children: "Clock In",
                  }),
                t &&
                  !r &&
                  m(tn, {
                    children: [
                      u("button", {
                        onClick: v,
                        disabled: o,
                        className:
                          "px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50",
                        children: "Start Break",
                      }),
                      u("button", {
                        onClick: k,
                        disabled: o,
                        className:
                          "px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50",
                        children: "Clock Out",
                      }),
                    ],
                  }),
                t &&
                  r &&
                  u("button", {
                    onClick: w,
                    disabled: o,
                    className:
                      "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50",
                    children: "End Break",
                  }),
              ],
            }),
          ],
        }),
        u("div", {
          className: "bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md",
          children: m("div", {
            className: "flex",
            children: [
              u("div", {
                className: "flex-shrink-0",
                children: u(G0, { className: "h-5 w-5 text-blue-400" }),
              }),
              u("div", {
                className: "ml-3",
                children: m("p", {
                  className: "text-sm text-blue-700",
                  children: [
                    u("strong", { children: "Note:" }),
                    ' Please remember to track your breaks by using the "Start Break" and "End Break" buttons.',
                  ],
                }),
              }),
            ],
          }),
        }),
      ],
    });
  },
  lv = () => {
    const [e, t] = E.useState({
        totalEmployees: 0,
        activeEmployees: 0,
        totalHoursToday: 0,
        totalBreaksToday: 0,
        netHoursToday: 0,
        totalHoursThisWeek: 0,
        totalBreaksThisWeek: 0,
        netHoursThisWeek: 0,
      }),
      [n, r] = E.useState([]),
      [l, o] = E.useState(!0);
    E.useEffect(() => {
      (async () => {
        try {
          const d = await H.get("/api/employees"),
            f = await H.get("/api/timelogs");
          i(d.data, f.data), r(f.data.slice(0, 10));
        } catch (d) {
          console.error("Error fetching dashboard data:", d);
        } finally {
          o(!1);
        }
      })();
    }, []);
    const i = (c, d) => {
        const f = new Date(),
          y = new Date(f.getFullYear(), f.getMonth(), f.getDate()),
          k = new Date(y);
        k.setDate(k.getDate() - 7);
        const v = new Set(
          d.filter((S) => S.status === "active").map((S) => S.employeeId)
        );
        let w = 0,
          x = 0,
          h = 0,
          p = 0,
          g = 0,
          N = 0;
        d.forEach((S) => {
          if (S.status === "completed") {
            const T = new Date(S.loginTime);
            T >= y &&
              ((w += S.totalHours || 0),
              (x += S.totalBreakHours || 0),
              (h += S.netWorkHours || 0)),
              T >= k &&
                ((p += S.totalHours || 0),
                (g += S.totalBreakHours || 0),
                (N += S.netWorkHours || 0));
          }
        }),
          t({
            totalEmployees: c.length,
            activeEmployees: v.size,
            totalHoursToday: w.toFixed(2),
            totalBreaksToday: x.toFixed(2),
            netHoursToday: h.toFixed(2),
            totalHoursThisWeek: p.toFixed(2),
            totalBreaksThisWeek: g.toFixed(2),
            netHoursThisWeek: N.toFixed(2),
          });
      },
      s = (c) => {
        const d = { year: "numeric", month: "short", day: "numeric" };
        return new Date(c).toLocaleDateString("en-US", d);
      },
      a = (c) => {
        const d = { hour: "2-digit", minute: "2-digit" };
        return new Date(c).toLocaleTimeString("en-US", d);
      };
    return l
      ? u("div", {
          className: "text-center py-8",
          children: "Loading admin dashboard...",
        })
      : m("div", {
          className: "max-w-6xl mx-auto px-4",
          children: [
            m("div", {
              className: "text-center mb-6",
              children: [
                u("h1", {
                  className: "text-3xl font-bold text-gray-800",
                  children: "Admin Dashboard",
                }),
                u("p", {
                  className: "text-gray-600 mt-2",
                  children: "Monitor employee time tracking activity",
                }),
              ],
            }),
            u("div", {
              className:
                "bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-md",
              children: m("div", {
                className: "flex",
                children: [
                  u("div", {
                    className: "flex-shrink-0",
                    children: u(ny, { className: "h-5 w-5 text-blue-400" }),
                  }),
                  u("div", {
                    className: "ml-3",
                    children: m("p", {
                      className: "text-sm text-blue-700",
                      children: [
                        u("strong", { children: "New Break Tracking:" }),
                        " Employees now manually track breaks using the Break Clock In/Out buttons.",
                      ],
                    }),
                  }),
                ],
              }),
            }),
            m("div", {
              className:
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
              children: [
                m("div", {
                  className: "bg-white p-6 rounded-lg shadow-md",
                  children: [
                    m("div", {
                      className: "flex items-center justify-between mb-4",
                      children: [
                        u("h2", {
                          className: "text-lg font-semibold text-gray-800",
                          children: "Total Employees",
                        }),
                        u(Rt, { className: "text-blue-600 text-xl" }),
                      ],
                    }),
                    u("p", {
                      className: "text-3xl font-bold text-blue-600",
                      children: e.totalEmployees,
                    }),
                  ],
                }),
                m("div", {
                  className: "bg-white p-6 rounded-lg shadow-md",
                  children: [
                    m("div", {
                      className: "flex items-center justify-between mb-4",
                      children: [
                        u("h2", {
                          className: "text-lg font-semibold text-gray-800",
                          children: "Active Now",
                        }),
                        u(Rt, { className: "text-green-600 text-xl" }),
                      ],
                    }),
                    u("p", {
                      className: "text-3xl font-bold text-green-600",
                      children: e.activeEmployees,
                    }),
                  ],
                }),
                m("div", {
                  className: "bg-white p-6 rounded-lg shadow-md",
                  children: [
                    m("div", {
                      className: "flex items-center justify-between mb-4",
                      children: [
                        u("h2", {
                          className: "text-lg font-semibold text-gray-800",
                          children: "Today's Work",
                        }),
                        u(ut, { className: "text-purple-600 text-xl" }),
                      ],
                    }),
                    m("div", {
                      className: "space-y-2",
                      children: [
                        m("div", {
                          className: "flex justify-between items-center",
                          children: [
                            u("span", {
                              className: "text-sm text-gray-600",
                              children: "Total:",
                            }),
                            m("span", {
                              className: "text-lg font-semibold text-gray-800",
                              children: [e.totalHoursToday, " hrs"],
                            }),
                          ],
                        }),
                        m("div", {
                          className: "flex justify-between items-center",
                          children: [
                            u("span", {
                              className: "text-sm text-gray-600",
                              children: "Breaks:",
                            }),
                            m("span", {
                              className:
                                "text-lg font-semibold text-yellow-600",
                              children: [e.totalBreaksToday, " hrs"],
                            }),
                          ],
                        }),
                        m("div", {
                          className:
                            "flex justify-between items-center border-t pt-2",
                          children: [
                            u("span", {
                              className: "text-sm text-gray-600",
                              children: "Net:",
                            }),
                            m("span", {
                              className:
                                "text-lg font-semibold text-purple-600",
                              children: [e.netHoursToday, " hrs"],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                m("div", {
                  className: "bg-white p-6 rounded-lg shadow-md",
                  children: [
                    m("div", {
                      className: "flex items-center justify-between mb-4",
                      children: [
                        u("h2", {
                          className: "text-lg font-semibold text-gray-800",
                          children: "Week's Work",
                        }),
                        u(An, { className: "text-orange-600 text-xl" }),
                      ],
                    }),
                    m("div", {
                      className: "space-y-2",
                      children: [
                        m("div", {
                          className: "flex justify-between items-center",
                          children: [
                            u("span", {
                              className: "text-sm text-gray-600",
                              children: "Total:",
                            }),
                            m("span", {
                              className: "text-lg font-semibold text-gray-800",
                              children: [e.totalHoursThisWeek, " hrs"],
                            }),
                          ],
                        }),
                        m("div", {
                          className: "flex justify-between items-center",
                          children: [
                            u("span", {
                              className: "text-sm text-gray-600",
                              children: "Breaks:",
                            }),
                            m("span", {
                              className:
                                "text-lg font-semibold text-yellow-600",
                              children: [e.totalBreaksThisWeek, " hrs"],
                            }),
                          ],
                        }),
                        m("div", {
                          className:
                            "flex justify-between items-center border-t pt-2",
                          children: [
                            u("span", {
                              className: "text-sm text-gray-600",
                              children: "Net:",
                            }),
                            m("span", {
                              className:
                                "text-lg font-semibold text-orange-600",
                              children: [e.netHoursThisWeek, " hrs"],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            m("div", {
              className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
              children: [
                u("div", {
                  className: "lg:col-span-2",
                  children: m("div", {
                    className: "bg-white p-6 rounded-lg shadow-md",
                    children: [
                      m("div", {
                        className: "flex justify-between items-center mb-6",
                        children: [
                          u("h2", {
                            className: "text-xl font-semibold text-gray-800",
                            children: "Recent Time Logs",
                          }),
                          u(q, {
                            to: "/employees",
                            className:
                              "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
                            children: "View All Employees",
                          }),
                        ],
                      }),
                      u("div", {
                        className: "overflow-x-auto",
                        children: m("table", {
                          className: "min-w-full bg-white",
                          children: [
                            u("thead", {
                              children: m("tr", {
                                className:
                                  "bg-gray-100 text-gray-600 uppercase text-sm leading-normal",
                                children: [
                                  u("th", {
                                    className: "py-3 px-6 text-left",
                                    children: "Employee ID",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-left",
                                    children: "Date",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-left",
                                    children: "Clock In",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-left",
                                    children: "Clock Out",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-right",
                                    children: "Total",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-right",
                                    children: "Breaks",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-right",
                                    children: "Net",
                                  }),
                                ],
                              }),
                            }),
                            u("tbody", {
                              className: "text-gray-600 text-sm",
                              children:
                                n.length > 0
                                  ? n.map((c) =>
                                      m(
                                        "tr",
                                        {
                                          className:
                                            "border-b border-gray-200 hover:bg-gray-50",
                                          children: [
                                            u("td", {
                                              className: "py-3 px-6 text-left",
                                              children: c.employeeId,
                                            }),
                                            u("td", {
                                              className: "py-3 px-6 text-left",
                                              children: s(c.loginTime),
                                            }),
                                            u("td", {
                                              className: "py-3 px-6 text-left",
                                              children: a(c.loginTime),
                                            }),
                                            u("td", {
                                              className: "py-3 px-6 text-left",
                                              children: c.logoutTime
                                                ? a(c.logoutTime)
                                                : "---",
                                            }),
                                            u("td", {
                                              className: "py-3 px-6 text-right",
                                              children:
                                                c.totalHours > 0
                                                  ? c.totalHours.toFixed(2)
                                                  : "---",
                                            }),
                                            u("td", {
                                              className: "py-3 px-6 text-right",
                                              children:
                                                c.totalBreakHours > 0
                                                  ? m("span", {
                                                      className:
                                                        "flex items-center justify-end",
                                                      children: [
                                                        u(Hr, {
                                                          className:
                                                            "mr-1 text-yellow-500",
                                                        }),
                                                        c.totalBreakHours.toFixed(
                                                          2
                                                        ),
                                                      ],
                                                    })
                                                  : "0.00",
                                            }),
                                            u("td", {
                                              className: "py-3 px-6 text-right",
                                              children:
                                                c.netWorkHours > 0
                                                  ? c.netWorkHours.toFixed(2)
                                                  : "---",
                                            }),
                                          ],
                                        },
                                        c._id
                                      )
                                    )
                                  : u("tr", {
                                      children: u("td", {
                                        colSpan: "7",
                                        className:
                                          "py-6 text-center text-gray-500",
                                        children: "No time logs found",
                                      }),
                                    }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                m("div", {
                  className: "bg-white p-6 rounded-lg shadow-md",
                  children: [
                    u("h2", {
                      className: "text-xl font-semibold text-gray-800 mb-6",
                      children: "Quick Actions",
                    }),
                    m("div", {
                      className: "flex flex-col space-y-3",
                      children: [
                        m(q, {
                          to: "/employees",
                          className:
                            "flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100",
                          children: [
                            u(Rt, { className: "text-blue-600 mr-3 text-lg" }),
                            u("span", { children: "Manage Employees" }),
                          ],
                        }),
                        m("div", {
                          className: "mt-6 pt-6 border-t border-gray-200",
                          children: [
                            u("h3", {
                              className:
                                "text-lg font-medium text-gray-800 mb-4",
                              children: "System Status",
                            }),
                            m("div", {
                              className:
                                "flex items-center justify-between mb-2",
                              children: [
                                u("span", {
                                  className: "text-gray-600",
                                  children: "Server Status",
                                }),
                                m("span", {
                                  className: "flex items-center text-green-600",
                                  children: [
                                    u("span", {
                                      className:
                                        "h-2.5 w-2.5 rounded-full bg-green-500 mr-2",
                                    }),
                                    "Online",
                                  ],
                                }),
                              ],
                            }),
                            m("div", {
                              className: "flex items-center justify-between",
                              children: [
                                u("span", {
                                  className: "text-gray-600",
                                  children: "Last Updated",
                                }),
                                u("span", {
                                  className: "text-gray-600",
                                  children: new Date().toLocaleTimeString(),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
  },
  ov = () => {
    const [e, t] = E.useState([]),
      [n, r] = E.useState(!0),
      [l, o] = E.useState(!1),
      [i, s] = E.useState(!1),
      [a, c] = E.useState(null),
      [d, f] = E.useState(""),
      [y, k] = E.useState({
        employeeId: "",
        name: "",
        email: "",
        password: "",
      });
    E.useEffect(() => {
      v();
    }, []);
    const v = async () => {
        var S, T;
        try {
          r(!0);
          const { data: _ } = await H.get("/api/admin-management");
          t(_);
        } catch (_) {
          console.error("Error fetching admins:", _),
            D.error(
              ((T = (S = _.response) == null ? void 0 : S.data) == null
                ? void 0
                : T.message) || "Failed to fetch admins"
            );
        } finally {
          r(!1);
        }
      },
      w = (S = null) => {
        S
          ? (s(!0),
            c(S),
            k({
              employeeId: S.employeeId,
              name: S.name,
              email: S.email,
              password: "",
            }))
          : (s(!1),
            c(null),
            k({ employeeId: "", name: "", email: "", password: "" })),
          o(!0);
      },
      x = () => {
        o(!1),
          c(null),
          k({ employeeId: "", name: "", email: "", password: "" });
      },
      h = (S) => {
        k({ ...y, [S.target.name]: S.target.value });
      },
      p = async (S) => {
        var T, _;
        S.preventDefault();
        try {
          i
            ? (await H.put(`/api/admin-management/${a.employeeId}`, {
                name: y.name,
                email: y.email,
                ...(y.password && { password: y.password }),
              }),
              D.success("Admin updated successfully"))
            : (await H.post("/api/admin-management", y),
              D.success("Admin created successfully")),
            v(),
            x();
        } catch (P) {
          D.error(
            ((_ = (T = P.response) == null ? void 0 : T.data) == null
              ? void 0
              : _.message) || "Operation failed"
          );
        }
      },
      g = async (S, T) => {
        var _, P;
        if (
          window.confirm(`Are you sure you want to delete admin ${T} (${S})?`)
        )
          try {
            await H.delete(`/api/admin-management/${S}`),
              D.success("Admin deleted successfully"),
              v();
          } catch (j) {
            D.error(
              ((P = (_ = j.response) == null ? void 0 : _.data) == null
                ? void 0
                : P.message) || "Failed to delete admin"
            );
          }
      },
      N = e.filter(
        (S) =>
          S.name.toLowerCase().includes(d.toLowerCase()) ||
          S.employeeId.toLowerCase().includes(d.toLowerCase()) ||
          S.email.toLowerCase().includes(d.toLowerCase())
      );
    return n
      ? m("div", {
          className: "flex justify-center items-center py-12",
          children: [
            u("div", {
              className:
                "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500",
            }),
            u("span", {
              className: "ml-3 text-gray-700",
              children: "Loading admins...",
            }),
          ],
        })
      : m("div", {
          className: "max-w-6xl mx-auto px-4 py-8",
          children: [
            m("div", {
              className:
                "flex flex-col md:flex-row justify-between items-center mb-8",
              children: [
                u("h1", {
                  className: "text-3xl font-bold text-gray-800 mb-4 md:mb-0",
                  children: "Admin Management",
                }),
                m("div", {
                  className: "flex space-x-4 w-full md:w-auto",
                  children: [
                    m("div", {
                      className: "relative flex-grow md:flex-grow-0",
                      children: [
                        u("input", {
                          type: "text",
                          placeholder: "Search admins...",
                          value: d,
                          onChange: (S) => f(S.target.value),
                          className:
                            "pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full",
                        }),
                        u($f, {
                          className:
                            "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500",
                        }),
                      ],
                    }),
                    m("button", {
                      onClick: () => w(),
                      className:
                        "flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
                      children: [u(Wf, { className: "mr-2" }), "Add Admin"],
                    }),
                  ],
                }),
              ],
            }),
            u("div", {
              className: "mb-6",
              children: m("nav", {
                className: "flex border-b",
                children: [
                  u(q, {
                    to: "/super-admin",
                    className:
                      "py-4 px-6 border-b-2 border-blue-500 text-blue-600 font-medium",
                    children: "Admin Management",
                  }),
                  u(q, {
                    to: "/employees",
                    className: "py-4 px-6 text-gray-500 hover:text-gray-700",
                    children: "Employee Management",
                  }),
                ],
              }),
            }),
            m("div", {
              className: "bg-white rounded-lg shadow-md overflow-hidden",
              children: [
                u("div", {
                  className: "p-4 border-b border-gray-200 bg-gray-50",
                  children: m("div", {
                    className: "text-sm text-gray-500",
                    children: [
                      N.length,
                      " admin",
                      N.length !== 1 ? "s" : "",
                      " found",
                    ],
                  }),
                }),
                N.length > 0
                  ? u("div", {
                      className: "overflow-x-auto",
                      children: m("table", {
                        className: "min-w-full bg-white",
                        children: [
                          u("thead", {
                            children: m("tr", {
                              className:
                                "bg-gray-100 text-gray-600 uppercase text-sm leading-normal",
                              children: [
                                u("th", {
                                  className: "py-3 px-6 text-left",
                                  children: "ID",
                                }),
                                u("th", {
                                  className: "py-3 px-6 text-left",
                                  children: "Name",
                                }),
                                u("th", {
                                  className: "py-3 px-6 text-left",
                                  children: "Email",
                                }),
                                u("th", {
                                  className: "py-3 px-6 text-center",
                                  children: "Actions",
                                }),
                              ],
                            }),
                          }),
                          u("tbody", {
                            className: "text-gray-600 text-sm",
                            children: N.map((S) =>
                              m(
                                "tr",
                                {
                                  className:
                                    "border-b border-gray-200 hover:bg-gray-50",
                                  children: [
                                    u("td", {
                                      className:
                                        "py-3 px-6 text-left whitespace-nowrap",
                                      children: m("div", {
                                        className: "flex items-center",
                                        children: [
                                          u(Rt, {
                                            className: "mr-2 text-gray-500",
                                          }),
                                          S.employeeId,
                                        ],
                                      }),
                                    }),
                                    u("td", {
                                      className: "py-3 px-6 text-left",
                                      children: S.name,
                                    }),
                                    u("td", {
                                      className: "py-3 px-6 text-left",
                                      children: S.email,
                                    }),
                                    u("td", {
                                      className: "py-3 px-6 text-center",
                                      children: m("div", {
                                        className:
                                          "flex items-center justify-center space-x-3",
                                        children: [
                                          u("button", {
                                            onClick: () => w(S),
                                            className:
                                              "text-blue-600 hover:text-blue-900 transition-colors",
                                            title: "Edit",
                                            children: u(Uf, { size: 18 }),
                                          }),
                                          u("button", {
                                            onClick: () =>
                                              g(S.employeeId, S.name),
                                            className:
                                              "text-red-600 hover:text-red-900 transition-colors",
                                            title: "Delete",
                                            children: u(Hf, { size: 18 }),
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                },
                                S._id
                              )
                            ),
                          }),
                        ],
                      }),
                    })
                  : u("div", {
                      className: "py-8 text-center text-gray-500",
                      children: d
                        ? "No admins match your search criteria"
                        : "No admins found",
                    }),
              ],
            }),
            l &&
              m("div", {
                className:
                  "fixed inset-0 flex items-center justify-center z-50",
                children: [
                  u("div", {
                    className: "absolute inset-0 bg-black opacity-50",
                    onClick: x,
                  }),
                  m("div", {
                    className:
                      "bg-white rounded-lg shadow-lg w-full max-w-md z-10 p-6 mx-4",
                    children: [
                      u("h2", {
                        className: "text-xl font-bold text-gray-800 mb-6",
                        children: i ? "Edit Admin" : "Add New Admin",
                      }),
                      m("form", {
                        onSubmit: p,
                        children: [
                          m("div", {
                            className: "mb-4",
                            children: [
                              u("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Employee ID",
                              }),
                              u("input", {
                                type: "text",
                                name: "employeeId",
                                value: y.employeeId,
                                onChange: h,
                                disabled: i,
                                required: !0,
                                className:
                                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100",
                              }),
                              i &&
                                u("p", {
                                  className: "text-xs text-gray-500 mt-1",
                                  children: "Employee ID cannot be changed",
                                }),
                            ],
                          }),
                          m("div", {
                            className: "mb-4",
                            children: [
                              u("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Name",
                              }),
                              u("input", {
                                type: "text",
                                name: "name",
                                value: y.name,
                                onChange: h,
                                required: !0,
                                className:
                                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                              }),
                            ],
                          }),
                          m("div", {
                            className: "mb-4",
                            children: [
                              u("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Email",
                              }),
                              u("input", {
                                type: "email",
                                name: "email",
                                value: y.email,
                                onChange: h,
                                required: !0,
                                className:
                                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                              }),
                            ],
                          }),
                          m("div", {
                            className: "mb-6",
                            children: [
                              m("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: [
                                  "Password ",
                                  i && "(Leave blank to keep unchanged)",
                                ],
                              }),
                              u("input", {
                                type: "password",
                                name: "password",
                                value: y.password,
                                onChange: h,
                                required: !i,
                                className:
                                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                              }),
                            ],
                          }),
                          m("div", {
                            className: "flex justify-end space-x-3",
                            children: [
                              u("button", {
                                type: "button",
                                onClick: x,
                                className:
                                  "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500",
                                children: "Cancel",
                              }),
                              u("button", {
                                type: "submit",
                                className:
                                  "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                children: i ? "Update" : "Create",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            m("div", {
              className: "mt-8 text-center text-xs text-gray-500",
              children: [
                u("p", { children: "Date: 2025-05-26 | Time: 13:59:39 UTC" }),
                u("p", { children: "Current user: JPKrishna28" }),
              ],
            }),
          ],
        });
  },
  iv = () => {
    const [e, t] = E.useState([]),
      [n, r] = E.useState([]),
      [l, o] = E.useState(!0),
      [i, s] = E.useState(!1),
      [a, c] = E.useState(!1),
      [d, f] = E.useState(null),
      [y, k] = E.useState(""),
      [v, w] = E.useState("all"),
      [x, h] = E.useState({ key: "name", direction: "ascending" }),
      p = E.useRef(),
      g = E.useRef(),
      [N, S] = E.useState({
        employeeId: "",
        name: "",
        password: "",
        role: "employee",
      });
    E.useEffect(() => {
      T();
    }, []),
      E.useEffect(() => {
        let b = [...e];
        v !== "all" && (b = b.filter((R) => R.role === v)),
          y.trim() !== "" &&
            (b = b.filter(
              (R) =>
                R.employeeId.toLowerCase().includes(y.toLowerCase()) ||
                R.name.toLowerCase().includes(y.toLowerCase()) ||
                R.role.toLowerCase().includes(y.toLowerCase())
            )),
          x.key &&
            b.sort((R, I) =>
              R[x.key] < I[x.key]
                ? x.direction === "ascending"
                  ? -1
                  : 1
                : R[x.key] > I[x.key]
                ? x.direction === "ascending"
                  ? 1
                  : -1
                : 0
            ),
          r(b);
      }, [y, e, v, x]);
    const T = async () => {
        var b, R;
        try {
          o(!0);
          const { data: I } = await H.get("/api/employees");
          t(I), r(I);
        } catch (I) {
          console.error("Error fetching employees:", I),
            D.error(
              ((R = (b = I.response) == null ? void 0 : b.data) == null
                ? void 0
                : R.message) || "Failed to fetch employees"
            );
        } finally {
          o(!1);
        }
      },
      _ = (b = null) => {
        b
          ? (c(!0),
            f(b),
            S({
              employeeId: b.employeeId,
              name: b.name,
              password: "",
              role: b.role,
            }))
          : (c(!1),
            f(null),
            S({ employeeId: "", name: "", password: "", role: "employee" })),
          s(!0);
      },
      P = () => {
        s(!1),
          f(null),
          S({ employeeId: "", name: "", password: "", role: "employee" });
      },
      j = (b) => {
        S({ ...N, [b.target.name]: b.target.value });
      },
      F = async (b) => {
        var R, I;
        b.preventDefault();
        try {
          a
            ? (await H.put(`/api/employees/${d.employeeId}`, {
                name: N.name,
                role: N.role,
                ...(N.password && { password: N.password }),
              }),
              D.success("Employee updated successfully"))
            : (await H.post("/api/auth/register", N),
              D.success("Employee created successfully")),
            T(),
            P();
        } catch (U) {
          D.error(
            ((I = (R = U.response) == null ? void 0 : R.data) == null
              ? void 0
              : I.message) || "Operation failed"
          );
        }
      },
      te = async (b) => {
        var R, I;
        if (window.confirm("Are you sure you want to delete this employee?"))
          try {
            await H.delete(`/api/employees/${b}`),
              D.success("Employee deleted successfully"),
              T();
          } catch (U) {
            D.error(
              ((I = (R = U.response) == null ? void 0 : R.data) == null
                ? void 0
                : I.message) || "Failed to delete employee"
            );
          }
      },
      le = (b) => {
        k(b.target.value);
      },
      ae = (b) => {
        w(b);
      },
      oe = (b) => {
        let R = "ascending";
        x.key === b && x.direction === "ascending" && (R = "descending"),
          h({ key: b, direction: R });
      },
      Je = () => {
        p.current.click();
      },
      ue = async (b) => {
        var U, K;
        const R = b.target.files[0];
        if (!R) return;
        const I = new FormData();
        I.append("file", R);
        try {
          o(!0);
          const Ue = await H.post("/api/employees/upload-csv", I, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          D.success(`Created: ${Ue.data.created}, Skipped: ${Ue.data.skipped}`),
            Ue.data.errors &&
              Ue.data.errors.length > 0 &&
              (D.error("Some entries failed (see console)"),
              console.log("CSV Upload Errors:", Ue.data.errors)),
            T(),
            (b.target.value = null);
        } catch (Ue) {
          D.error(
            ((K = (U = Ue.response) == null ? void 0 : U.data) == null
              ? void 0
              : K.message) || "CSV upload failed"
          );
        } finally {
          o(!1);
        }
      },
      ke = () => {
        const I =
            `employeeId,name,password,role
` +
            `E001,John Doe,password123,employee
E002,Jane Smith,secret456,admin
`,
          U = new Blob([I], { type: "text/csv;charset=utf-8;" }),
          K = URL.createObjectURL(U);
        (g.current.href = K),
          (g.current.download = "employee_template.csv"),
          g.current.click(),
          setTimeout(() => {
            URL.revokeObjectURL(K);
          }, 100);
      };
    return l
      ? m("div", {
          className: "flex justify-center items-center py-12",
          children: [
            u("div", {
              className:
                "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500",
            }),
            u("span", {
              className: "ml-3 text-gray-700",
              children: "Loading employees...",
            }),
          ],
        })
      : m("div", {
          className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
          children: [
            m("div", {
              className:
                "flex flex-col md:flex-row justify-between items-center mb-8",
              children: [
                u("h1", {
                  className: "text-3xl font-bold text-gray-800 mb-4 md:mb-0",
                  children: "Employee Management",
                }),
                m("div", {
                  className:
                    "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto",
                  children: [
                    m("div", {
                      className: "relative",
                      children: [
                        u("input", {
                          type: "text",
                          placeholder: "Search employees...",
                          value: y,
                          onChange: le,
                          className:
                            "pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full",
                        }),
                        u($f, {
                          className:
                            "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500",
                        }),
                      ],
                    }),
                    m("button", {
                      onClick: _,
                      className:
                        "flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
                      children: [u(Wf, { className: "mr-2" }), "Add Employee"],
                    }),
                    m("div", {
                      className: "relative",
                      children: [
                        m("button", {
                          onClick: Je,
                          className:
                            "flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors",
                          children: [
                            u(sy, { className: "mr-2" }),
                            "Upload CSV",
                          ],
                        }),
                        u("input", {
                          type: "file",
                          accept: ".csv",
                          ref: p,
                          onChange: ue,
                          style: { display: "none" },
                        }),
                      ],
                    }),
                    m("div", {
                      className: "relative",
                      children: [
                        m("button", {
                          onClick: ke,
                          className:
                            "flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors",
                          children: [
                            u(Z0, { className: "mr-2" }),
                            "CSV Template",
                          ],
                        }),
                        u("a", { ref: g, style: { display: "none" } }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            m("div", {
              className: "bg-white rounded-lg shadow-md overflow-hidden",
              children: [
                u("div", {
                  className: "p-4 border-b border-gray-200 bg-gray-50",
                  children: m("div", {
                    className: "flex flex-wrap items-center justify-between",
                    children: [
                      m("div", {
                        className: "flex space-x-2 mb-2 sm:mb-0",
                        children: [
                          u("button", {
                            onClick: () => ae("all"),
                            className: `px-3 py-1 rounded-md text-sm ${
                              v === "all"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`,
                            children: "All",
                          }),
                          u("button", {
                            onClick: () => ae("admin"),
                            className: `px-3 py-1 rounded-md text-sm ${
                              v === "admin"
                                ? "bg-purple-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`,
                            children: "Admins",
                          }),
                          u("button", {
                            onClick: () => ae("employee"),
                            className: `px-3 py-1 rounded-md text-sm ${
                              v === "employee"
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`,
                            children: "Employees",
                          }),
                        ],
                      }),
                      m("div", {
                        className: "text-sm text-gray-500",
                        children: [
                          n.length,
                          " employee",
                          n.length !== 1 ? "s" : "",
                          " found",
                        ],
                      }),
                    ],
                  }),
                }),
                n.length > 0
                  ? u("div", {
                      className: "overflow-x-auto",
                      children: m("table", {
                        className: "min-w-full bg-white",
                        children: [
                          u("thead", {
                            children: m("tr", {
                              className:
                                "bg-gray-100 text-gray-600 uppercase text-sm leading-normal",
                              children: [
                                u("th", {
                                  className:
                                    "py-3 px-6 text-left cursor-pointer hover:bg-gray-200",
                                  onClick: () => oe("employeeId"),
                                  children: m("div", {
                                    className: "flex items-center",
                                    children: [
                                      "ID",
                                      x.key === "employeeId" &&
                                        u("span", {
                                          className: "ml-1",
                                          children:
                                            x.direction === "ascending"
                                              ? "↑"
                                              : "↓",
                                        }),
                                    ],
                                  }),
                                }),
                                u("th", {
                                  className:
                                    "py-3 px-6 text-left cursor-pointer hover:bg-gray-200",
                                  onClick: () => oe("name"),
                                  children: m("div", {
                                    className: "flex items-center",
                                    children: [
                                      "Name",
                                      x.key === "name" &&
                                        u("span", {
                                          className: "ml-1",
                                          children:
                                            x.direction === "ascending"
                                              ? "↑"
                                              : "↓",
                                        }),
                                    ],
                                  }),
                                }),
                                u("th", {
                                  className:
                                    "py-3 px-6 text-left cursor-pointer hover:bg-gray-200",
                                  onClick: () => oe("role"),
                                  children: m("div", {
                                    className: "flex items-center",
                                    children: [
                                      "Role",
                                      x.key === "role" &&
                                        u("span", {
                                          className: "ml-1",
                                          children:
                                            x.direction === "ascending"
                                              ? "↑"
                                              : "↓",
                                        }),
                                    ],
                                  }),
                                }),
                                u("th", {
                                  className: "py-3 px-6 text-center",
                                  children: "Actions",
                                }),
                              ],
                            }),
                          }),
                          u("tbody", {
                            className: "text-gray-600 text-sm",
                            children: n.map((b) =>
                              m(
                                "tr",
                                {
                                  className:
                                    "border-b border-gray-200 hover:bg-gray-50",
                                  children: [
                                    u("td", {
                                      className:
                                        "py-3 px-6 text-left whitespace-nowrap",
                                      children: m("div", {
                                        className: "flex items-center",
                                        children: [
                                          u(Wr, {
                                            className: "mr-2 text-gray-500",
                                          }),
                                          b.employeeId,
                                        ],
                                      }),
                                    }),
                                    u("td", {
                                      className: "py-3 px-6 text-left",
                                      children: b.name,
                                    }),
                                    u("td", {
                                      className: "py-3 px-6 text-left",
                                      children: u("span", {
                                        className: `px-2 py-1 rounded-full text-xs ${
                                          b.role === "admin"
                                            ? "bg-purple-100 text-purple-800"
                                            : "bg-blue-100 text-blue-800"
                                        }`,
                                        children: b.role,
                                      }),
                                    }),
                                    u("td", {
                                      className: "py-3 px-6 text-center",
                                      children: m("div", {
                                        className:
                                          "flex items-center justify-center space-x-3",
                                        children: [
                                          u(q, {
                                            to: `/employees/${b.employeeId}/details`,
                                            className:
                                              "text-green-600 hover:text-green-900 transition-colors",
                                            title: "View Details",
                                            children: u(ey, { size: 18 }),
                                          }),
                                          u("button", {
                                            onClick: () => _(b),
                                            className:
                                              "text-blue-600 hover:text-blue-900 transition-colors",
                                            title: "Edit",
                                            children: u(Uf, { size: 18 }),
                                          }),
                                          u("button", {
                                            onClick: () => te(b.employeeId),
                                            className:
                                              "text-red-600 hover:text-red-900 transition-colors",
                                            title: "Delete",
                                            children: u(Hf, { size: 18 }),
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                },
                                b._id
                              )
                            ),
                          }),
                        ],
                      }),
                    })
                  : u("div", {
                      className: "py-8 text-center text-gray-500",
                      children:
                        y || v !== "all"
                          ? "No employees match your search criteria"
                          : "No employees found",
                    }),
              ],
            }),
            i &&
              m("div", {
                className:
                  "fixed inset-0 flex items-center justify-center z-50",
                children: [
                  u("div", {
                    className: "absolute inset-0 bg-black opacity-50",
                    onClick: P,
                  }),
                  m("div", {
                    className:
                      "bg-white rounded-lg shadow-lg w-full max-w-md z-10 p-6 mx-4",
                    children: [
                      u("h2", {
                        className: "text-xl font-bold text-gray-800 mb-6",
                        children: a ? "Edit Employee" : "Add New Employee",
                      }),
                      m("form", {
                        onSubmit: F,
                        children: [
                          m("div", {
                            className: "mb-4",
                            children: [
                              u("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Employee ID",
                              }),
                              u("input", {
                                type: "text",
                                name: "employeeId",
                                value: N.employeeId,
                                onChange: j,
                                disabled: a,
                                required: !0,
                                className:
                                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100",
                              }),
                              a &&
                                u("p", {
                                  className: "text-xs text-gray-500 mt-1",
                                  children: "Employee ID cannot be changed",
                                }),
                            ],
                          }),
                          m("div", {
                            className: "mb-4",
                            children: [
                              u("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Name",
                              }),
                              u("input", {
                                type: "text",
                                name: "name",
                                value: N.name,
                                onChange: j,
                                required: !0,
                                className:
                                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                              }),
                            ],
                          }),
                          m("div", {
                            className: "mb-4",
                            children: [
                              m("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: [
                                  "Password ",
                                  a && "(Leave blank to keep unchanged)",
                                ],
                              }),
                              u("input", {
                                type: "password",
                                name: "password",
                                value: N.password,
                                onChange: j,
                                required: !a,
                                className:
                                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                              }),
                            ],
                          }),
                          m("div", {
                            className: "mb-6",
                            children: [
                              u("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Role",
                              }),
                              m("select", {
                                name: "role",
                                value: N.role,
                                onChange: j,
                                className:
                                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                children: [
                                  u("option", {
                                    value: "employee",
                                    children: "Employee",
                                  }),
                                  u("option", {
                                    value: "admin",
                                    children: "Admin",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          m("div", {
                            className: "flex justify-end space-x-3",
                            children: [
                              u("button", {
                                type: "button",
                                onClick: P,
                                className:
                                  "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500",
                                children: "Cancel",
                              }),
                              u("button", {
                                type: "submit",
                                className:
                                  "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                children: a ? "Update" : "Create",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
          ],
        });
  },
  sv = () => {
    const { id: e } = S0(),
      t = Xn(),
      [n, r] = E.useState(!0),
      [l, o] = E.useState(null),
      [i, s] = E.useState([]),
      [a, c] = E.useState(null),
      [d, f] = E.useState("overview");
    E.useEffect(() => {
      (async () => {
        var w, x;
        try {
          r(!0);
          const { data: h } = await H.get(`/api/employees/${e}/details`);
          o(h.employee), s(h.timeLogs), c(h.stats);
        } catch (h) {
          console.error("Error fetching employee details:", h),
            D.error(
              ((x = (w = h.response) == null ? void 0 : w.data) == null
                ? void 0
                : x.message) || "Failed to fetch employee details"
            ),
            t("/employees");
        } finally {
          r(!1);
        }
      })();
    }, [e, t]);
    const y = (v) => {
        const w = { year: "numeric", month: "short", day: "numeric" };
        return new Date(v).toLocaleDateString("en-US", w);
      },
      k = (v) => {
        const w = { hour: "2-digit", minute: "2-digit" };
        return new Date(v).toLocaleTimeString("en-US", w);
      };
    return n
      ? m("div", {
          className: "flex justify-center items-center py-12",
          children: [
            u("div", {
              className:
                "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500",
            }),
            u("span", {
              className: "ml-3 text-gray-700",
              children: "Loading employee details...",
            }),
          ],
        })
      : l
      ? m("div", {
          className: "max-w-6xl mx-auto px-4 py-8",
          children: [
            m("div", {
              className: "flex items-center mb-6",
              children: [
                u(q, {
                  to: "/employees",
                  className: "mr-4 text-blue-600 hover:text-blue-800",
                  children: u(Xu, { size: 20 }),
                }),
                u("h1", {
                  className: "text-3xl font-bold text-gray-800",
                  children: "Employee Details",
                }),
              ],
            }),
            u("div", {
              className: "bg-white rounded-lg shadow-md p-6 mb-8",
              children: m("div", {
                className:
                  "flex flex-col md:flex-row md:items-center md:justify-between",
                children: [
                  m("div", {
                    className: "flex items-center mb-4 md:mb-0",
                    children: [
                      u("div", {
                        className: "bg-blue-100 p-3 rounded-full mr-4",
                        children: u(Wr, { className: "text-blue-600 text-xl" }),
                      }),
                      m("div", {
                        children: [
                          u("h2", {
                            className: "text-2xl font-semibold text-gray-800",
                            children: l.name,
                          }),
                          m("p", {
                            className: "text-gray-600",
                            children: ["ID: ", l.employeeId],
                          }),
                        ],
                      }),
                    ],
                  }),
                  m("div", {
                    children: [
                      u("span", {
                        className: `px-3 py-1 rounded-full text-sm ${
                          l.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`,
                        children:
                          l.role.charAt(0).toUpperCase() + l.role.slice(1),
                      }),
                      m("p", {
                        className: "text-sm text-gray-500 mt-2",
                        children: ["Joined: ", y(l.createdAt)],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            u("div", {
              className: "mb-6",
              children: m("nav", {
                className: "flex border-b",
                children: [
                  u("button", {
                    className: `py-4 px-6 focus:outline-none ${
                      d === "overview"
                        ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`,
                    onClick: () => f("overview"),
                    children: "Overview",
                  }),
                  u("button", {
                    className: `py-4 px-6 focus:outline-none ${
                      d === "time-logs"
                        ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`,
                    onClick: () => f("time-logs"),
                    children: "Time Logs",
                  }),
                  u("button", {
                    className: `py-4 px-6 focus:outline-none ${
                      d === "break-analysis"
                        ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`,
                    onClick: () => f("break-analysis"),
                    children: "Break Analysis",
                  }),
                ],
              }),
            }),
            d === "overview" &&
              m("div", {
                children: [
                  m("div", {
                    className:
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
                    children: [
                      m("div", {
                        className: "bg-white p-6 rounded-lg shadow-md",
                        children: [
                          m("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                              u("h3", {
                                className:
                                  "text-lg font-semibold text-gray-800",
                                children: "Today",
                              }),
                              u(ut, { className: "text-blue-600 text-xl" }),
                            ],
                          }),
                          m("div", {
                            className: "space-y-2",
                            children: [
                              m("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Total Hours:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-gray-800",
                                    children: [a.today.total, " hrs"],
                                  }),
                                ],
                              }),
                              m("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Break Time:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-yellow-600",
                                    children: [a.today.breaks, " hrs"],
                                  }),
                                ],
                              }),
                              m("div", {
                                className:
                                  "flex justify-between items-center border-t pt-2",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Net Working:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-blue-600",
                                    children: [a.today.net, " hrs"],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      m("div", {
                        className: "bg-white p-6 rounded-lg shadow-md",
                        children: [
                          m("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                              u("h3", {
                                className:
                                  "text-lg font-semibold text-gray-800",
                                children: "This Week",
                              }),
                              u(An, { className: "text-green-600 text-xl" }),
                            ],
                          }),
                          m("div", {
                            className: "space-y-2",
                            children: [
                              m("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Total Hours:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-gray-800",
                                    children: [a.week.total, " hrs"],
                                  }),
                                ],
                              }),
                              m("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Break Time:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-yellow-600",
                                    children: [a.week.breaks, " hrs"],
                                  }),
                                ],
                              }),
                              m("div", {
                                className:
                                  "flex justify-between items-center border-t pt-2",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Net Working:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-green-600",
                                    children: [a.week.net, " hrs"],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      m("div", {
                        className: "bg-white p-6 rounded-lg shadow-md",
                        children: [
                          m("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                              u("h3", {
                                className:
                                  "text-lg font-semibold text-gray-800",
                                children: "This Month",
                              }),
                              u(An, { className: "text-purple-600 text-xl" }),
                            ],
                          }),
                          m("div", {
                            className: "space-y-2",
                            children: [
                              m("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Total Hours:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-gray-800",
                                    children: [a.month.total, " hrs"],
                                  }),
                                ],
                              }),
                              m("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Break Time:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-yellow-600",
                                    children: [a.month.breaks, " hrs"],
                                  }),
                                ],
                              }),
                              m("div", {
                                className:
                                  "flex justify-between items-center border-t pt-2",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Net Working:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-purple-600",
                                    children: [a.month.net, " hrs"],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      m("div", {
                        className: "bg-white p-6 rounded-lg shadow-md",
                        children: [
                          m("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                              u("h3", {
                                className:
                                  "text-lg font-semibold text-gray-800",
                                children: "All Time",
                              }),
                              u(iy, { className: "text-red-600 text-xl" }),
                            ],
                          }),
                          m("div", {
                            className: "space-y-2",
                            children: [
                              m("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Total Hours:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-gray-800",
                                    children: [a.allTime.total, " hrs"],
                                  }),
                                ],
                              }),
                              m("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Break Time:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-yellow-600",
                                    children: [a.allTime.breaks, " hrs"],
                                  }),
                                ],
                              }),
                              m("div", {
                                className:
                                  "flex justify-between items-center border-t pt-2",
                                children: [
                                  u("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Net Working:",
                                  }),
                                  m("span", {
                                    className:
                                      "text-lg font-semibold text-red-600",
                                    children: [a.allTime.net, " hrs"],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  m("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
                    children: [
                      m("div", {
                        className:
                          "bg-white p-6 rounded-lg shadow-md flex items-center",
                        children: [
                          u("div", {
                            className: "bg-blue-100 p-3 rounded-full mr-4",
                            children: u(ut, {
                              className: "text-blue-600 text-xl",
                            }),
                          }),
                          m("div", {
                            children: [
                              u("p", {
                                className: "text-sm text-gray-600",
                                children: "Avg. Daily Hours",
                              }),
                              u("p", {
                                className: "text-2xl font-bold text-blue-600",
                                children: a.avgDailyHours,
                              }),
                            ],
                          }),
                        ],
                      }),
                      m("div", {
                        className:
                          "bg-white p-6 rounded-lg shadow-md flex items-center",
                        children: [
                          u("div", {
                            className: "bg-yellow-100 p-3 rounded-full mr-4",
                            children: u(Hr, {
                              className: "text-yellow-600 text-xl",
                            }),
                          }),
                          m("div", {
                            children: [
                              u("p", {
                                className: "text-sm text-gray-600",
                                children: "Avg. Break Time",
                              }),
                              u("p", {
                                className: "text-2xl font-bold text-yellow-600",
                                children: a.avgBreakTime,
                              }),
                            ],
                          }),
                        ],
                      }),
                      m("div", {
                        className:
                          "bg-white p-6 rounded-lg shadow-md flex items-center",
                        children: [
                          u("div", {
                            className: "bg-green-100 p-3 rounded-full mr-4",
                            children: u(An, {
                              className: "text-green-600 text-xl",
                            }),
                          }),
                          m("div", {
                            children: [
                              u("p", {
                                className: "text-sm text-gray-600",
                                children: "Total Days Worked",
                              }),
                              u("p", {
                                className: "text-2xl font-bold text-green-600",
                                children: a.totalDaysWorked,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            d === "time-logs" &&
              m("div", {
                className: "bg-white rounded-lg shadow-md p-6",
                children: [
                  u("div", {
                    className: "flex items-center justify-between mb-6",
                    children: u("h2", {
                      className: "text-xl font-semibold text-gray-800",
                      children: "Time Log History",
                    }),
                  }),
                  i.length > 0
                    ? u("div", {
                        className: "overflow-x-auto",
                        children: m("table", {
                          className: "min-w-full bg-white",
                          children: [
                            u("thead", {
                              children: m("tr", {
                                className:
                                  "bg-gray-100 text-gray-600 uppercase text-sm leading-normal",
                                children: [
                                  u("th", {
                                    className: "py-3 px-6 text-left",
                                    children: "Date",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-left",
                                    children: "Clock In",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-left",
                                    children: "Clock Out",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-right",
                                    children: "Total Hours",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-right",
                                    children: "Break Time",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-right",
                                    children: "Net Hours",
                                  }),
                                  u("th", {
                                    className: "py-3 px-6 text-center",
                                    children: "Status",
                                  }),
                                ],
                              }),
                            }),
                            u("tbody", {
                              className: "text-gray-600 text-sm",
                              children: i.map((v) =>
                                m(
                                  "tr",
                                  {
                                    className:
                                      "border-b border-gray-200 hover:bg-gray-50",
                                    children: [
                                      u("td", {
                                        className:
                                          "py-3 px-6 text-left whitespace-nowrap",
                                        children: y(v.loginTime),
                                      }),
                                      u("td", {
                                        className: "py-3 px-6 text-left",
                                        children: k(v.loginTime),
                                      }),
                                      u("td", {
                                        className: "py-3 px-6 text-left",
                                        children: v.logoutTime
                                          ? k(v.logoutTime)
                                          : "---",
                                      }),
                                      u("td", {
                                        className: "py-3 px-6 text-right",
                                        children:
                                          v.totalHours > 0
                                            ? v.totalHours.toFixed(2)
                                            : "---",
                                      }),
                                      u("td", {
                                        className: "py-3 px-6 text-right",
                                        children:
                                          v.totalBreakHours > 0
                                            ? m("span", {
                                                className:
                                                  "flex items-center justify-end",
                                                children: [
                                                  u(Hr, {
                                                    className:
                                                      "mr-1 text-yellow-500",
                                                  }),
                                                  v.totalBreakHours.toFixed(2),
                                                ],
                                              })
                                            : "0.00",
                                      }),
                                      u("td", {
                                        className: "py-3 px-6 text-right",
                                        children:
                                          v.netWorkHours > 0
                                            ? v.netWorkHours.toFixed(2)
                                            : "---",
                                      }),
                                      u("td", {
                                        className: "py-3 px-6 text-center",
                                        children: u("span", {
                                          className: `px-2 py-1 rounded-full text-xs ${
                                            v.status === "active"
                                              ? "bg-green-100 text-green-800"
                                              : "bg-blue-100 text-blue-800"
                                          }`,
                                          children:
                                            v.status === "active"
                                              ? "Active"
                                              : "Completed",
                                        }),
                                      }),
                                    ],
                                  },
                                  v._id
                                )
                              ),
                            }),
                          ],
                        }),
                      })
                    : u("div", {
                        className: "text-center py-4 text-gray-500",
                        children: "No time logs found",
                      }),
                ],
              }),
            d === "break-analysis" &&
              m("div", {
                className: "bg-white rounded-lg shadow-md p-6",
                children: [
                  m("div", {
                    className: "flex items-center justify-between mb-6",
                    children: [
                      u("h2", {
                        className: "text-xl font-semibold text-gray-800",
                        children: "Break Analysis",
                      }),
                      u(oy, { className: "text-purple-600 text-xl" }),
                    ],
                  }),
                  m("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
                    children: [
                      m("div", {
                        className: "bg-yellow-50 p-6 rounded-lg",
                        children: [
                          u("h3", {
                            className:
                              "text-lg font-semibold text-gray-800 mb-2",
                            children: "Morning Breaks",
                          }),
                          m("p", {
                            className: "text-3xl font-bold text-yellow-600",
                            children: [a.breakDistribution.morning, " hrs"],
                          }),
                          u("p", {
                            className: "text-sm text-gray-600 mt-1",
                            children: "Before 12:00 PM",
                          }),
                        ],
                      }),
                      m("div", {
                        className: "bg-orange-50 p-6 rounded-lg",
                        children: [
                          u("h3", {
                            className:
                              "text-lg font-semibold text-gray-800 mb-2",
                            children: "Afternoon Breaks",
                          }),
                          m("p", {
                            className: "text-3xl font-bold text-orange-600",
                            children: [a.breakDistribution.afternoon, " hrs"],
                          }),
                          u("p", {
                            className: "text-sm text-gray-600 mt-1",
                            children: "12:00 PM - 5:00 PM",
                          }),
                        ],
                      }),
                      m("div", {
                        className: "bg-red-50 p-6 rounded-lg",
                        children: [
                          u("h3", {
                            className:
                              "text-lg font-semibold text-gray-800 mb-2",
                            children: "Evening Breaks",
                          }),
                          m("p", {
                            className: "text-3xl font-bold text-red-600",
                            children: [a.breakDistribution.evening, " hrs"],
                          }),
                          u("p", {
                            className: "text-sm text-gray-600 mt-1",
                            children: "After 5:00 PM",
                          }),
                        ],
                      }),
                    ],
                  }),
                  m("div", {
                    className: "mb-6",
                    children: [
                      u("h3", {
                        className: "text-lg font-semibold text-gray-800 mb-4",
                        children: "Break Distribution",
                      }),
                      u("div", {
                        className:
                          "h-4 bg-gray-200 rounded-full overflow-hidden",
                        children:
                          a.breakDistribution.morning +
                            a.breakDistribution.afternoon +
                            a.breakDistribution.evening >
                          0
                            ? m(tn, {
                                children: [
                                  u("div", {
                                    className:
                                      "h-full bg-yellow-500 float-left",
                                    style: {
                                      width: `${
                                        (a.breakDistribution.morning /
                                          (a.breakDistribution.morning +
                                            a.breakDistribution.afternoon +
                                            a.breakDistribution.evening)) *
                                        100
                                      }%`,
                                    },
                                  }),
                                  u("div", {
                                    className:
                                      "h-full bg-orange-500 float-left",
                                    style: {
                                      width: `${
                                        (a.breakDistribution.afternoon /
                                          (a.breakDistribution.morning +
                                            a.breakDistribution.afternoon +
                                            a.breakDistribution.evening)) *
                                        100
                                      }%`,
                                    },
                                  }),
                                  u("div", {
                                    className: "h-full bg-red-500 float-left",
                                    style: {
                                      width: `${
                                        (a.breakDistribution.evening /
                                          (a.breakDistribution.morning +
                                            a.breakDistribution.afternoon +
                                            a.breakDistribution.evening)) *
                                        100
                                      }%`,
                                    },
                                  }),
                                ],
                              })
                            : u("div", {
                                className: "h-full bg-gray-300",
                                style: { width: "100%" },
                              }),
                      }),
                      m("div", {
                        className:
                          "flex justify-between mt-2 text-xs text-gray-600",
                        children: [
                          u("span", { children: "Morning" }),
                          u("span", { children: "Afternoon" }),
                          u("span", { children: "Evening" }),
                        ],
                      }),
                    ],
                  }),
                  m("div", {
                    className: "mb-4",
                    children: [
                      u("h3", {
                        className: "text-lg font-semibold text-gray-800 mb-4",
                        children: "Recent Breaks",
                      }),
                      i.some((v) => v.breaks && v.breaks.length > 0)
                        ? u("div", {
                            className: "overflow-x-auto",
                            children: m("table", {
                              className: "min-w-full bg-white",
                              children: [
                                u("thead", {
                                  children: m("tr", {
                                    className:
                                      "bg-gray-100 text-gray-600 uppercase text-sm leading-normal",
                                    children: [
                                      u("th", {
                                        className: "py-3 px-6 text-left",
                                        children: "Date",
                                      }),
                                      u("th", {
                                        className: "py-3 px-6 text-left",
                                        children: "Start Time",
                                      }),
                                      u("th", {
                                        className: "py-3 px-6 text-left",
                                        children: "End Time",
                                      }),
                                      u("th", {
                                        className: "py-3 px-6 text-right",
                                        children: "Duration",
                                      }),
                                    ],
                                  }),
                                }),
                                u("tbody", {
                                  className: "text-gray-600 text-sm",
                                  children: i
                                    .filter(
                                      (v) => v.breaks && v.breaks.length > 0
                                    )
                                    .slice(0, 5)
                                    .flatMap((v) =>
                                      v.breaks.map((w, x) =>
                                        m(
                                          "tr",
                                          {
                                            className:
                                              "border-b border-gray-200 hover:bg-gray-50",
                                            children: [
                                              u("td", {
                                                className:
                                                  "py-3 px-6 text-left whitespace-nowrap",
                                                children: y(v.loginTime),
                                              }),
                                              u("td", {
                                                className:
                                                  "py-3 px-6 text-left",
                                                children: k(w.startTime),
                                              }),
                                              u("td", {
                                                className:
                                                  "py-3 px-6 text-left",
                                                children: w.endTime
                                                  ? k(w.endTime)
                                                  : "---",
                                              }),
                                              m("td", {
                                                className:
                                                  "py-3 px-6 text-right",
                                                children: [
                                                  w.duration
                                                    ? w.duration.toFixed(2)
                                                    : "---",
                                                  " hrs",
                                                ],
                                              }),
                                            ],
                                          },
                                          `${v._id}-${x}`
                                        )
                                      )
                                    ),
                                }),
                              ],
                            }),
                          })
                        : u("div", {
                            className: "text-center py-4 text-gray-500",
                            children: "No break records found",
                          }),
                    ],
                  }),
                ],
              }),
            m("div", {
              className: "mt-8 text-center text-xs text-gray-500",
              children: [
                u("p", { children: "Date: 2025-05-26 | Time: 12:10:26 UTC" }),
                u("p", { children: "Current user: JPKrishna28" }),
              ],
            }),
          ],
        })
      : u("div", {
          className: "max-w-6xl mx-auto px-4 py-8",
          children: m("div", {
            className: "text-center py-8",
            children: [
              u("h2", {
                className: "text-xl font-semibold text-gray-800",
                children: "Employee not found",
              }),
              m(q, {
                to: "/employees",
                className:
                  "mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
                children: [u(Xu, { className: "mr-2" }), "Back to Employees"],
              }),
            ],
          }),
        });
  },
  av = () => {
    const { auth: e, setAuth: t } = Jt(),
      [n, r] = E.useState(!1),
      [l, o] = E.useState({ name: "", employeeId: "", role: "" }),
      [i, s] = E.useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    E.useEffect(() => {
      e &&
        o({
          name: e.name || "",
          employeeId: e.employeeId || "",
          role: e.role || "",
        });
    }, [e]);
    const a = (y) => {
        o({ ...l, [y.target.name]: y.target.value });
      },
      c = (y) => {
        s({ ...i, [y.target.name]: y.target.value });
      },
      d = async (y) => {
        var k, v;
        y.preventDefault();
        try {
          r(!0);
          const { data: w } = await H.put(`/api/employees/${e.employeeId}`, {
            name: l.name,
          });
          t({ ...e, name: w.name });
          const x = JSON.parse(localStorage.getItem("userInfo"));
          (x.name = w.name),
            localStorage.setItem("userInfo", JSON.stringify(x)),
            D.success("Profile updated successfully");
        } catch (w) {
          D.error(
            ((v = (k = w.response) == null ? void 0 : k.data) == null
              ? void 0
              : v.message) || "Failed to update profile"
          );
        } finally {
          r(!1);
        }
      },
      f = async (y) => {
        var k, v;
        if ((y.preventDefault(), i.newPassword !== i.confirmPassword))
          return D.error("Passwords do not match");
        try {
          r(!0),
            await H.put(`/api/employees/${e.employeeId}`, {
              password: i.newPassword,
            }),
            s({ currentPassword: "", newPassword: "", confirmPassword: "" }),
            D.success("Password updated successfully");
        } catch (w) {
          D.error(
            ((v = (k = w.response) == null ? void 0 : k.data) == null
              ? void 0
              : v.message) || "Failed to update password"
          );
        } finally {
          r(!1);
        }
      };
    return m("div", {
      className: "max-w-4xl mx-auto",
      children: [
        u("h1", {
          className: "text-3xl font-bold text-gray-800 text-center mb-8",
          children: "Your Profile",
        }),
        m("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-8",
          children: [
            m("div", {
              className: "bg-white rounded-lg shadow-md p-6",
              children: [
                m("div", {
                  className: "flex items-center mb-6",
                  children: [
                    u(Wr, { className: "text-blue-600 text-2xl mr-3" }),
                    u("h2", {
                      className: "text-xl font-semibold",
                      children: "Account Information",
                    }),
                  ],
                }),
                m("form", {
                  onSubmit: d,
                  children: [
                    m("div", {
                      className: "mb-4",
                      children: [
                        u("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Employee ID",
                        }),
                        u("input", {
                          type: "text",
                          name: "employeeId",
                          value: l.employeeId,
                          disabled: !0,
                          className:
                            "w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50",
                        }),
                        u("p", {
                          className: "text-xs text-gray-500 mt-1",
                          children: "Employee ID cannot be changed",
                        }),
                      ],
                    }),
                    m("div", {
                      className: "mb-4",
                      children: [
                        u("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Name",
                        }),
                        u("input", {
                          type: "text",
                          name: "name",
                          value: l.name,
                          onChange: a,
                          required: !0,
                          className:
                            "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                        }),
                      ],
                    }),
                    m("div", {
                      className: "mb-6",
                      children: [
                        u("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Role",
                        }),
                        u("input", {
                          type: "text",
                          name: "role",
                          value: l.role,
                          disabled: !0,
                          className:
                            "w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50",
                        }),
                        u("p", {
                          className: "text-xs text-gray-500 mt-1",
                          children: "Role can only be changed by an admin",
                        }),
                      ],
                    }),
                    u("button", {
                      type: "submit",
                      disabled: n,
                      className:
                        "w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400",
                      children: n ? "Updating..." : "Update Profile",
                    }),
                  ],
                }),
              ],
            }),
            m("div", {
              className: "bg-white rounded-lg shadow-md p-6",
              children: [
                m("div", {
                  className: "flex items-center mb-6",
                  children: [
                    u(ry, { className: "text-blue-600 text-2xl mr-3" }),
                    u("h2", {
                      className: "text-xl font-semibold",
                      children: "Change Password",
                    }),
                  ],
                }),
                m("form", {
                  onSubmit: f,
                  children: [
                    m("div", {
                      className: "mb-4",
                      children: [
                        u("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Current Password",
                        }),
                        u("input", {
                          type: "password",
                          name: "currentPassword",
                          value: i.currentPassword,
                          onChange: c,
                          required: !0,
                          className:
                            "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                        }),
                      ],
                    }),
                    m("div", {
                      className: "mb-4",
                      children: [
                        u("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "New Password",
                        }),
                        u("input", {
                          type: "password",
                          name: "newPassword",
                          value: i.newPassword,
                          onChange: c,
                          required: !0,
                          className:
                            "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                        }),
                      ],
                    }),
                    m("div", {
                      className: "mb-6",
                      children: [
                        u("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Confirm New Password",
                        }),
                        u("input", {
                          type: "password",
                          name: "confirmPassword",
                          value: i.confirmPassword,
                          onChange: c,
                          required: !0,
                          className:
                            "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                        }),
                      ],
                    }),
                    u("button", {
                      type: "submit",
                      disabled: n,
                      className:
                        "w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400",
                      children: n ? "Updating..." : "Update Password",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  uv = () =>
    m("div", {
      className: "flex flex-col items-center justify-center min-h-[70vh]",
      children: [
        u("h1", {
          className: "text-6xl font-bold text-gray-800 mb-4",
          children: "404",
        }),
        u("p", {
          className: "text-xl text-gray-600 mb-8",
          children: "Page not found",
        }),
        u("p", {
          className: "text-gray-500 mb-8 max-w-md text-center",
          children:
            "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
        }),
        m(q, {
          to: "/",
          className:
            "flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700",
          children: [u(ty, { className: "mr-2" }), "Back to Home"],
        }),
      ],
    }),
  cv = () => {
    const { auth: e, loading: t } = Jt();
    return t
      ? u("div", { children: "Loading..." })
      : e != null && e.token
      ? u(Lo, {})
      : u(Sa, { to: "/login" });
  },
  dv = () => {
    const { auth: e, loading: t } = Jt();
    return t
      ? u("div", { children: "Loading..." })
      : e != null && e.token && e.role === "admin"
      ? u(Lo, {})
      : u(Sa, { to: "/login" });
  },
  fv = () => {
    const { auth: e } = E.useContext(La);
    return !e.token || e.role !== "superadmin"
      ? u(Sa, { to: "/login", replace: !0 })
      : u(Lo, {});
  };
function pv() {
  return u(tn, {
    children: u(B0, {
      children: m(Se, {
        path: "/",
        element: u(tv, {}),
        children: [
          u(Se, { index: !0, element: u(yc, {}) }),
          u(Se, { path: "login", element: u(yc, {}) }),
          m(Se, {
            element: u(cv, {}),
            children: [
              u(Se, { path: "dashboard", element: u(nv, {}) }),
              u(Se, { path: "time-clock", element: u(rv, {}) }),
              u(Se, { path: "profile", element: u(av, {}) }),
            ],
          }),
          m(Se, {
            element: u(dv, {}),
            children: [
              u(Se, { path: "admin", element: u(lv, {}) }),
              u(Se, { path: "employees", element: u(iv, {}) }),
              u(Se, { path: "employees/:id/details", element: u(sv, {}) }),
            ],
          }),
          u(Se, {
            element: u(fv, {}),
            children: u(Se, { path: "super-admin", element: u(ov, {}) }),
          }),
          u(Se, { path: "*", element: u(uv, {}) }),
        ],
      }),
    }),
  });
}
Ni.createRoot(document.getElementById("root")).render(
  u(B.StrictMode, {
    children: u(Gg, {
      children: m(Q0, {
        children: [u(pv, {}), u(Ss, { position: "top-center" })],
      }),
    }),
  })
);
