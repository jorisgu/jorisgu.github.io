var hljs = new function() {
  function m(p) {
    return p.replace(/&/gm, "&amp;").replace(/</gm, "&lt;")
  }

  function c(r) {
    for (var p = 0; p < r.childNodes.length; p++) {
      var q = r.childNodes[p];
      if (q.nodeName == "CODE") {
        return q
      }
      if (!(q.nodeType == 3 && q.nodeValue.match(/\s+/))) {
        break
      }
    }
  }
  var b = (typeof navigator !== "undefined" && /MSIE [678]/.test(navigator.userAgent));

  function i(t, s) {
    var p = "";
    for (var r = 0; r < t.childNodes.length; r++) {
      if (t.childNodes[r].nodeType == 3) {
        var q = t.childNodes[r].nodeValue;
        if (s) {
          q = q.replace(/\n/g, "")
        }
        p += q
      } else {
        if (t.childNodes[r].nodeName == "BR") {
          p += "\n"
        } else {
          p += i(t.childNodes[r])
        }
      }
    }
    if (b) {
      p = p.replace(/\r/g, "\n")
    }
    return p
  }

  function a(s) {
    var r = s.className.split(/\s+/);
    r = r.concat(s.parentNode.className.split(/\s+/));
    for (var q = 0; q < r.length; q++) {
      var p = r[q].replace(/^language-/, "");
      if (f[p] || p == "no-highlight") {
        return p
      }
    }
  }

  function d(r) {
    var p = [];
    (function q(t, u) {
      for (var s = 0; s < t.childNodes.length; s++) {
        if (t.childNodes[s].nodeType == 3) {
          u += t.childNodes[s].nodeValue.length
        } else {
          if (t.childNodes[s].nodeName == "BR") {
            u += 1
          } else {
            if (t.childNodes[s].nodeType == 1) {
              p.push({
                event: "start",
                offset: u,
                node: t.childNodes[s]
              });
              u = q(t.childNodes[s], u);
              p.push({
                event: "stop",
                offset: u,
                node: t.childNodes[s]
              })
            }
          }
        }
      }
      return u
    })(r, 0);
    return p
  }

  function k(y, w, x) {
    var q = 0;
    var z = "";
    var s = [];

    function u() {
      if (y.length && w.length) {
        if (y[0].offset != w[0].offset) {
          return (y[0].offset < w[0].offset) ? y : w
        } else {
          return w[0].event == "start" ? y : w
        }
      } else {
        return y.length ? y : w
      }
    }

    function t(D) {
      var A = "<" + D.nodeName.toLowerCase();
      for (var B = 0; B < D.attributes.length; B++) {
        var C = D.attributes[B];
        A += " " + C.nodeName.toLowerCase();
        if (C.value !== undefined && C.value !== false && C.value !== null) {
          A += '="' + m(C.value) + '"'
        }
      }
      return A + ">"
    }
    while (y.length || w.length) {
      var v = u().splice(0, 1)[0];
      z += m(x.substr(q, v.offset - q));
      q = v.offset;
      if (v.event == "start") {
        z += t(v.node);
        s.push(v.node)
      } else {
        if (v.event == "stop") {
          var p, r = s.length;
          do {
            r--;
            p = s[r];
            z += ("</" + p.nodeName.toLowerCase() + ">")
          } while (p != v.node);
          s.splice(r, 1);
          while (r < s.length) {
            z += t(s[r]);
            r++
          }
        }
      }
    }
    return z + m(x.substr(q))
  }

  function g(r) {
    function p(t, s) {
      return RegExp(t, "m" + (r.cI ? "i" : "") + (s ? "g" : ""))
    }

    function q(z, x) {
      if (z.compiled) {
        return
      }
      z.compiled = true;
      var u = [];
      if (z.k) {
        var s = {};

        function A(E, D) {
          var B = D.split(" ");
          for (var t = 0; t < B.length; t++) {
            var C = B[t].split("|");
            s[C[0]] = [E, C[1] ? Number(C[1]) : 1];
            u.push(C[0])
          }
        }
        z.lR = p(z.l || hljs.IR, true);
        if (typeof z.k == "string") {
          A("keyword", z.k)
        } else {
          for (var y in z.k) {
            if (!z.k.hasOwnProperty(y)) {
              continue
            }
            A(y, z.k[y])
          }
        }
        z.k = s
      }
      if (x) {
        if (z.bWK) {
          z.b = "\\b(" + u.join("|") + ")\\s"
        }
        z.bR = p(z.b ? z.b : "\\B|\\b");
        if (!z.e && !z.eW) {
          z.e = "\\B|\\b"
        }
        if (z.e) {
          z.eR = p(z.e)
        }
        z.tE = z.e || "";
        if (z.eW && x.tE) {
          z.tE += (z.e ? "|" : "") + x.tE
        }
      }
      if (z.i) {
        z.iR = p(z.i)
      }
      if (z.r === undefined) {
        z.r = 1
      }
      if (!z.c) {
        z.c = []
      }
      for (var w = 0; w < z.c.length; w++) {
        if (z.c[w] == "self") {
          z.c[w] = z
        }
        q(z.c[w], z)
      }
      if (z.starts) {
        q(z.starts, x)
      }
      var v = [];
      for (var w = 0; w < z.c.length; w++) {
        v.push(z.c[w].b)
      }
      if (z.tE) {
        v.push(z.tE)
      }
      if (z.i) {
        v.push(z.i)
      }
      z.t = v.length ? p(v.join("|"), true) : null
    }
    q(r)
  }

  function e(D, E) {
    function s(r, N) {
      for (var M = 0; M < N.c.length; M++) {
        var L = N.c[M].bR.exec(r);
        if (L && L.index == 0) {
          return N.c[M]
        }
      }
    }

    function v(L, r) {
      if (p[L].e && p[L].eR.test(r)) {
        return 1
      }
      if (p[L].eW) {
        var M = v(L - 1, r);
        return M ? M + 1 : 0
      }
      return 0
    }

    function w(r, L) {
      return L.i && L.iR.test(r)
    }

    function q(L, r) {
      var M = p[p.length - 1];
      if (M.t) {
        M.t.lastIndex = r;
        return M.t.exec(L)
      }
    }

    function A(N, r) {
      var L = F.cI ? r[0].toLowerCase() : r[0];
      var M = N.k[L];
      if (M && M instanceof Array) {
        return M
      }
      return false
    }

    function G(L, P) {
      L = m(L);
      if (!P.k) {
        return L
      }
      var r = "";
      var O = 0;
      P.lR.lastIndex = 0;
      var M = P.lR.exec(L);
      while (M) {
        r += L.substr(O, M.index - O);
        var N = A(P, M);
        if (N) {
          y += N[1];
          r += '<span class="' + N[0] + '">' + M[0] + "</span>"
        } else {
          r += M[0]
        }
        O = P.lR.lastIndex;
        M = P.lR.exec(L)
      }
      return r + L.substr(O)
    }

    function B(L, M) {
      var r;
      if (M.sL == "") {
        r = h(L)
      } else {
        r = e(M.sL, L)
      }
      if (M.r > 0) {
        y += r.keyword_count;
        C += r.r
      }
      return '<span class="' + r.language + '">' + r.value + "</span>"
    }

    function K(r, L) {
      if (L.sL && f[L.sL] || L.sL == "") {
        return B(r, L)
      } else {
        return G(r, L)
      }
    }

    function J(M, r) {
      var L = M.cN ? '<span class="' + M.cN + '">' : "";
      if (M.rB) {
        z += L;
        M.buffer = ""
      } else {
        if (M.eB) {
          z += m(r) + L;
          M.buffer = ""
        } else {
          z += L;
          M.buffer = r
        }
      }
      p.push(M);
      C += M.r
    }

    function H(N, M) {
      var Q = p[p.length - 1];
      if (M === undefined) {
        z += K(Q.buffer + N, Q);
        return
      }
      var P = s(M, Q);
      if (P) {
        z += K(Q.buffer + N, Q);
        J(P, M);
        return P.rB
      }
      var L = v(p.length - 1, M);
      if (L) {
        var O = Q.cN ? "</span>" : "";
        if (Q.rE) {
          z += K(Q.buffer + N, Q) + O
        } else {
          if (Q.eE) {
            z += K(Q.buffer + N, Q) + O + m(M)
          } else {
            z += K(Q.buffer + N + M, Q) + O
          }
        }
        while (L > 1) {
          O = p[p.length - 2].cN ? "</span>" : "";
          z += O;
          L--;
          p.length--
        }
        var r = p[p.length - 1];
        p.length--;
        p[p.length - 1].buffer = "";
        if (r.starts) {
          J(r.starts, "")
        }
        return Q.rE
      }
      if (w(M, Q)) {
        throw "Illegal"
      }
    }
    var F = f[D];
    g(F);
    var p = [F];
    F.buffer = "";
    var C = 0;
    var y = 0;
    var z = "";
    try {
      var x, u = 0;
      while (true) {
        x = q(E, u);
        if (!x) {
          break
        }
        var t = H(E.substr(u, x.index - u), x[0]);
        u = x.index + (t ? 0 : x[0].length)
      }
      H(E.substr(u), undefined);
      return {
        r: C,
        keyword_count: y,
        value: z,
        language: D
      }
    } catch (I) {
      if (I == "Illegal") {
        return {
          r: 0,
          keyword_count: 0,
          value: m(E)
        }
      } else {
        throw I
      }
    }
  }

  function h(t) {
    var p = {
      keyword_count: 0,
      r: 0,
      value: m(t)
    };
    var r = p;
    for (var q in f) {
      if (!f.hasOwnProperty(q)) {
        continue
      }
      var s = e(q, t);
      s.language = q;
      if (s.keyword_count + s.r > r.keyword_count + r.r) {
        r = s
      }
      if (s.keyword_count + s.r > p.keyword_count + p.r) {
        r = p;
        p = s
      }
    }
    if (r.language) {
      p.second_best = r
    }
    return p
  }

  function j(r, q, p) {
    if (q) {
      r = r.replace(/^((<[^>]+>|\t)+)/gm, function(t, w, v, u) {
        return w.replace(/\t/g, q)
      })
    }
    if (p) {
      r = r.replace(/\n/g, "<br>")
    }
    return r
  }

  function n(t, w, r) {
    var x = i(t, r);
    var v = a(t);
    var y, s;
    if (v == "no-highlight") {
      return
    }
    if (v) {
      y = e(v, x)
    } else {
      y = h(x);
      v = y.language
    }
    var q = d(t);
    if (q.length) {
      s = document.createElement("pre");
      s.innerHTML = y.value;
      y.value = k(q, d(s), x)
    }
    y.value = j(y.value, w, r);
    var u = t.className;
    if (!u.match("(\\s|^)(language-)?" + v + "(\\s|$)")) {
      u = u ? (u + " " + v) : v
    }
    if (b && t.tagName == "CODE" && t.parentNode.tagName == "PRE") {
      s = t.parentNode;
      var p = document.createElement("div");
      p.innerHTML = "<pre><code>" + y.value + "</code></pre>";
      t = p.firstChild.firstChild;
      p.firstChild.cN = s.cN;
      s.parentNode.replaceChild(p.firstChild, s)
    } else {
      t.innerHTML = y.value
    }
    t.className = u;
    t.result = {
      language: v,
      kw: y.keyword_count,
      re: y.r
    };
    if (y.second_best) {
      t.second_best = {
        language: y.second_best.language,
        kw: y.second_best.keyword_count,
        re: y.second_best.r
      }
    }
  }

  function o() {
    if (o.called) {
      return
    }
    o.called = true;
    var r = document.getElementsByTagName("pre");
    for (var p = 0; p < r.length; p++) {
      var q = c(r[p]);
      if (q) {
        n(q, hljs.tabReplace)
      }
    }
  }

  function l() {
    if (window.addEventListener) {
      window.addEventListener("DOMContentLoaded", o, false);
      window.addEventListener("load", o, false)
    } else {
      if (window.attachEvent) {
        window.attachEvent("onload", o)
      } else {
        window.onload = o
      }
    }
  }
  var f = {};
  this.LANGUAGES = f;
  this.highlight = e;
  this.highlightAuto = h;
  this.fixMarkup = j;
  this.highlightBlock = n;
  this.initHighlighting = o;
  this.initHighlightingOnLoad = l;
  this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
  this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
  this.NR = "\\b\\d+(\\.\\d+)?";
  this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
  this.BNR = "\\b(0b[01]+)";
  this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
  this.BE = {
    b: "\\\\[\\s\\S]",
    r: 0
  };
  this.ASM = {
    cN: "string",
    b: "'",
    e: "'",
    i: "\\n",
    c: [this.BE],
    r: 0
  };
  this.QSM = {
    cN: "string",
    b: '"',
    e: '"',
    i: "\\n",
    c: [this.BE],
    r: 0
  };
  this.CLCM = {
    cN: "comment",
    b: "//",
    e: "$"
  };
  this.CBLCLM = {
    cN: "comment",
    b: "/\\*",
    e: "\\*/"
  };
  this.HCM = {
    cN: "comment",
    b: "#",
    e: "$"
  };
  this.NM = {
    cN: "number",
    b: this.NR,
    r: 0
  };
  this.CNM = {
    cN: "number",
    b: this.CNR,
    r: 0
  };
  this.BNM = {
    cN: "number",
    b: this.BNR,
    r: 0
  };
  this.inherit = function(r, s) {
    var p = {};
    for (var q in r) {
      p[q] = r[q]
    }
    if (s) {
      for (var q in s) {
        p[q] = s[q]
      }
    }
    return p
  }
}();
hljs.LANGUAGES.javascript = function(a) {
  return {
    k: {
      keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",
      literal: "true false null undefined NaN Infinity"
    },
    c: [a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {
      b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
      k: "return throw case",
      c: [a.CLCM, a.CBLCLM, {
        cN: "regexp",
        b: "/",
        e: "/[gim]*",
        c: [{
          b: "\\\\/"
        }]
      }],
      r: 0
    }, {
      cN: "function",
      bWK: true,
      e: "{",
      k: "function",
      c: [{
        cN: "title",
        b: "[A-Za-z$_][0-9A-Za-z$_]*"
      }, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: [a.CLCM, a.CBLCLM],
        i: "[\"'\\(]"
      }],
      i: "\\[|%"
    }]
  }
}(hljs);
hljs.LANGUAGES.css = function(a) {
  var b = {
    cN: "function",
    b: a.IR + "\\(",
    e: "\\)",
    c: [a.NM, a.ASM, a.QSM]
  };
  return {
    cI: true,
    i: "[=/|']",
    c: [a.CBLCLM, {
      cN: "id",
      b: "\\#[A-Za-z0-9_-]+"
    }, {
      cN: "class",
      b: "\\.[A-Za-z0-9_-]+",
      r: 0
    }, {
      cN: "attr_selector",
      b: "\\[",
      e: "\\]",
      i: "$"
    }, {
      cN: "pseudo",
      b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
    }, {
      cN: "at_rule",
      b: "@(font-face|page)",
      l: "[a-z-]+",
      k: "font-face page"
    }, {
      cN: "at_rule",
      b: "@",
      e: "[{;]",
      eE: true,
      k: "import page media charset",
      c: [b, a.ASM, a.QSM, a.NM]
    }, {
      cN: "tag",
      b: a.IR,
      r: 0
    }, {
      cN: "rules",
      b: "{",
      e: "}",
      i: "[^\\s]",
      r: 0,
      c: [a.CBLCLM, {
        cN: "rule",
        b: "[^\\s]",
        rB: true,
        e: ";",
        eW: true,
        c: [{
          cN: "attribute",
          b: "[A-Z\\_\\.\\-]+",
          e: ":",
          eE: true,
          i: "[^\\s]",
          starts: {
            cN: "value",
            eW: true,
            eE: true,
            c: [b, a.NM, a.QSM, a.ASM, a.CBLCLM, {
              cN: "hexcolor",
              b: "\\#[0-9A-F]+"
            }, {
              cN: "important",
              b: "!important"
            }]
          }
        }]
      }]
    }]
  }
}(hljs);
hljs.LANGUAGES.xml = function(a) {
  var c = "[A-Za-z0-9\\._:-]+";
  var b = {
    eW: true,
    c: [{
      cN: "attribute",
      b: c,
      r: 0
    }, {
      b: '="',
      rB: true,
      e: '"',
      c: [{
        cN: "value",
        b: '"',
        eW: true
      }]
    }, {
      b: "='",
      rB: true,
      e: "'",
      c: [{
        cN: "value",
        b: "'",
        eW: true
      }]
    }, {
      b: "=",
      c: [{
        cN: "value",
        b: "[^\\s/>]+"
      }]
    }]
  };
  return {
    cI: true,
    c: [{
      cN: "pi",
      b: "<\\?",
      e: "\\?>",
      r: 10
    }, {
      cN: "doctype",
      b: "<!DOCTYPE",
      e: ">",
      r: 10,
      c: [{
        b: "\\[",
        e: "\\]"
      }]
    }, {
      cN: "comment",
      b: "<!--",
      e: "-->",
      r: 10
    }, {
      cN: "cdata",
      b: "<\\!\\[CDATA\\[",
      e: "\\]\\]>",
      r: 10
    }, {
      cN: "tag",
      b: "<style(?=\\s|>|$)",
      e: ">",
      k: {
        title: "style"
      },
      c: [b],
      starts: {
        e: "</style>",
        rE: true,
        sL: "css"
      }
    }, {
      cN: "tag",
      b: "<script(?=\\s|>|$)",
      e: ">",
      k: {
        title: "script"
      },
      c: [b],
      starts: {
        e: "<\/script>",
        rE: true,
        sL: "javascript"
      }
    }, {
      b: "<%",
      e: "%>",
      sL: "vbscript"
    }, {
      cN: "tag",
      b: "</?",
      e: "/?>",
      c: [{
        cN: "title",
        b: "[^ />]+"
      }, b]
    }]
  }
}(hljs);
hljs.LANGUAGES.http = function(a) {
  return {
    i: "\\S",
    c: [{
      cN: "status",
      b: "^HTTP/[0-9\\.]+",
      e: "$",
      c: [{
        cN: "number",
        b: "\\b\\d{3}\\b"
      }]
    }, {
      cN: "request",
      b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
      rB: true,
      e: "$",
      c: [{
        cN: "string",
        b: " ",
        e: " ",
        eB: true,
        eE: true
      }]
    }, {
      cN: "attribute",
      b: "^\\w",
      e: ": ",
      eE: true,
      i: "\\n|\\s|=",
      starts: {
        cN: "string",
        e: "$"
      }
    }, {
      b: "\\n\\n",
      starts: {
        sL: "",
        eW: true
      }
    }]
  }
}(hljs);
hljs.LANGUAGES.java = function(a) {
  return {
    k: "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws",
    c: [{
      cN: "javadoc",
      b: "/\\*\\*",
      e: "\\*/",
      c: [{
        cN: "javadoctag",
        b: "@[A-Za-z]+"
      }],
      r: 10
    }, a.CLCM, a.CBLCLM, a.ASM, a.QSM, {
      cN: "class",
      bWK: true,
      e: "{",
      k: "class interface",
      i: ":",
      c: [{
        bWK: true,
        k: "extends implements",
        r: 10
      }, {
        cN: "title",
        b: a.UIR
      }]
    }, a.CNM, {
      cN: "annotation",
      b: "@[A-Za-z]+"
    }]
  }
}(hljs);
hljs.LANGUAGES.tex = function(a) {
  var d = {
    cN: "command",
    b: "\\\\[a-zA-Zа-яА-я]+[\\*]?"
  };
  var c = {
    cN: "command",
    b: "\\\\[^a-zA-Zа-яА-я0-9]"
  };
  var b = {
    cN: "special",
    b: "[{}\\[\\]\\&#~]",
    r: 0
  };
  return {
    c: [{
      b: "\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
      rB: true,
      c: [d, c, {
        cN: "number",
        b: " *=",
        e: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
        eB: true
      }],
      r: 10
    }, d, c, b, {
      cN: "formula",
      b: "\\$\\$",
      e: "\\$\\$",
      c: [d, c, b],
      r: 0
    }, {
      cN: "formula",
      b: "\\$",
      e: "\\$",
      c: [d, c, b],
      r: 0
    }, {
      cN: "comment",
      b: "%",
      e: "$",
      r: 0
    }]
  }
}(hljs);
hljs.LANGUAGES.ini = function(a) {
  return {
    cI: true,
    i: "[^\\s]",
    c: [{
      cN: "comment",
      b: ";",
      e: "$"
    }, {
      cN: "title",
      b: "^\\[",
      e: "\\]"
    }, {
      cN: "setting",
      b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
      e: "$",
      c: [{
        cN: "value",
        eW: true,
        k: "on off true false yes no",
        c: [a.QSM, a.NM]
      }]
    }]
  }
}(hljs);
hljs.LANGUAGES.json = function(a) {
  var e = {
    literal: "true false null"
  };
  var d = [a.QSM, a.CNM];
  var c = {
    cN: "value",
    e: ",",
    eW: true,
    eE: true,
    c: d,
    k: e
  };
  var b = {
    b: "{",
    e: "}",
    c: [{
      cN: "attribute",
      b: '\\s*"',
      e: '"\\s*:\\s*',
      eB: true,
      eE: true,
      c: [a.BE],
      i: "\\n",
      starts: c
    }],
    i: "\\S"
  };
  var f = {
    b: "\\[",
    e: "\\]",
    c: [a.inherit(c, {
      cN: null
    })],
    i: "\\S"
  };
  d.splice(d.length, 0, b, f);
  return {
    c: d,
    k: e,
    i: "\\S"
  }
}(hljs);
hljs.LANGUAGES.apache = function(a) {
  var b = {
    cN: "number",
    b: "[\\$%]\\d+"
  };
  return {
    cI: true,
    k: {
      keyword: "acceptfilter acceptmutex acceptpathinfo accessfilename action addalt addaltbyencoding addaltbytype addcharset adddefaultcharset adddescription addencoding addhandler addicon addiconbyencoding addiconbytype addinputfilter addlanguage addmoduleinfo addoutputfilter addoutputfilterbytype addtype alias aliasmatch allow allowconnect allowencodedslashes allowoverride anonymous anonymous_logemail anonymous_mustgiveemail anonymous_nouserid anonymous_verifyemail authbasicauthoritative authbasicprovider authdbduserpwquery authdbduserrealmquery authdbmgroupfile authdbmtype authdbmuserfile authdefaultauthoritative authdigestalgorithm authdigestdomain authdigestnccheck authdigestnonceformat authdigestnoncelifetime authdigestprovider authdigestqop authdigestshmemsize authgroupfile authldapbinddn authldapbindpassword authldapcharsetconfig authldapcomparednonserver authldapdereferencealiases authldapgroupattribute authldapgroupattributeisdn authldapremoteuserattribute authldapremoteuserisdn authldapurl authname authnprovideralias authtype authuserfile authzdbmauthoritative authzdbmtype authzdefaultauthoritative authzgroupfileauthoritative authzldapauthoritative authzownerauthoritative authzuserauthoritative balancermember browsermatch browsermatchnocase bufferedlogs cachedefaultexpire cachedirlength cachedirlevels cachedisable cacheenable cachefile cacheignorecachecontrol cacheignoreheaders cacheignorenolastmod cacheignorequerystring cachelastmodifiedfactor cachemaxexpire cachemaxfilesize cacheminfilesize cachenegotiateddocs cacheroot cachestorenostore cachestoreprivate cgimapextension charsetdefault charsetoptions charsetsourceenc checkcaseonly checkspelling chrootdir contentdigest cookiedomain cookieexpires cookielog cookiename cookiestyle cookietracking coredumpdirectory customlog dav davdepthinfinity davgenericlockdb davlockdb davmintimeout dbdexptime dbdkeep dbdmax dbdmin dbdparams dbdpersist dbdpreparesql dbdriver defaulticon defaultlanguage defaulttype deflatebuffersize deflatecompressionlevel deflatefilternote deflatememlevel deflatewindowsize deny directoryindex directorymatch directoryslash documentroot dumpioinput dumpiologlevel dumpiooutput enableexceptionhook enablemmap enablesendfile errordocument errorlog example expiresactive expiresbytype expiresdefault extendedstatus extfilterdefine extfilteroptions fileetag filterchain filterdeclare filterprotocol filterprovider filtertrace forcelanguagepriority forcetype forensiclog gracefulshutdowntimeout group header headername hostnamelookups identitycheck identitychecktimeout imapbase imapdefault imapmenu include indexheadinsert indexignore indexoptions indexorderdefault indexstylesheet isapiappendlogtoerrors isapiappendlogtoquery isapicachefile isapifakeasync isapilognotsupported isapireadaheadbuffer keepalive keepalivetimeout languagepriority ldapcacheentries ldapcachettl ldapconnectiontimeout ldapopcacheentries ldapopcachettl ldapsharedcachefile ldapsharedcachesize ldaptrustedclientcert ldaptrustedglobalcert ldaptrustedmode ldapverifyservercert limitinternalrecursion limitrequestbody limitrequestfields limitrequestfieldsize limitrequestline limitxmlrequestbody listen listenbacklog loadfile loadmodule lockfile logformat loglevel maxclients maxkeepaliverequests maxmemfree maxrequestsperchild maxrequestsperthread maxspareservers maxsparethreads maxthreads mcachemaxobjectcount mcachemaxobjectsize mcachemaxstreamingbuffer mcacheminobjectsize mcacheremovalalgorithm mcachesize metadir metafiles metasuffix mimemagicfile minspareservers minsparethreads mmapfile mod_gzip_on mod_gzip_add_header_count mod_gzip_keep_workfiles mod_gzip_dechunk mod_gzip_min_http mod_gzip_minimum_file_size mod_gzip_maximum_file_size mod_gzip_maximum_inmem_size mod_gzip_temp_dir mod_gzip_item_include mod_gzip_item_exclude mod_gzip_command_version mod_gzip_can_negotiate mod_gzip_handle_methods mod_gzip_static_suffix mod_gzip_send_vary mod_gzip_update_static modmimeusepathinfo multiviewsmatch namevirtualhost noproxy nwssltrustedcerts nwsslupgradeable options order passenv pidfile protocolecho proxybadheader proxyblock proxydomain proxyerroroverride proxyftpdircharset proxyiobuffersize proxymaxforwards proxypass proxypassinterpolateenv proxypassmatch proxypassreverse proxypassreversecookiedomain proxypassreversecookiepath proxypreservehost proxyreceivebuffersize proxyremote proxyremotematch proxyrequests proxyset proxystatus proxytimeout proxyvia readmename receivebuffersize redirect redirectmatch redirectpermanent redirecttemp removecharset removeencoding removehandler removeinputfilter removelanguage removeoutputfilter removetype requestheader require rewritebase rewritecond rewriteengine rewritelock rewritelog rewriteloglevel rewritemap rewriteoptions rewriterule rlimitcpu rlimitmem rlimitnproc satisfy scoreboardfile script scriptalias scriptaliasmatch scriptinterpretersource scriptlog scriptlogbuffer scriptloglength scriptsock securelisten seerequesttail sendbuffersize serveradmin serveralias serverlimit servername serverpath serverroot serversignature servertokens setenv setenvif setenvifnocase sethandler setinputfilter setoutputfilter ssienableaccess ssiendtag ssierrormsg ssistarttag ssitimeformat ssiundefinedecho sslcacertificatefile sslcacertificatepath sslcadnrequestfile sslcadnrequestpath sslcarevocationfile sslcarevocationpath sslcertificatechainfile sslcertificatefile sslcertificatekeyfile sslciphersuite sslcryptodevice sslengine sslhonorciperorder sslmutex ssloptions sslpassphrasedialog sslprotocol sslproxycacertificatefile sslproxycacertificatepath sslproxycarevocationfile sslproxycarevocationpath sslproxyciphersuite sslproxyengine sslproxymachinecertificatefile sslproxymachinecertificatepath sslproxyprotocol sslproxyverify sslproxyverifydepth sslrandomseed sslrequire sslrequiressl sslsessioncache sslsessioncachetimeout sslusername sslverifyclient sslverifydepth startservers startthreads substitute suexecusergroup threadlimit threadsperchild threadstacksize timeout traceenable transferlog typesconfig unsetenv usecanonicalname usecanonicalphysicalport user userdir virtualdocumentroot virtualdocumentrootip virtualscriptalias virtualscriptaliasip win32disableacceptex xbithack",
      literal: "on off"
    },
    c: [a.HCM, {
      cN: "sqbracket",
      b: "\\s\\[",
      e: "\\]$"
    }, {
      cN: "cbracket",
      b: "[\\$%]\\{",
      e: "\\}",
      c: ["self", b]
    }, b, {
      cN: "tag",
      b: "</?",
      e: ">"
    }, a.QSM]
  }
}(hljs);
