!function() {
    "use strict";
    var e;
    !function(e) {
        e.COURSERA = "coursera", e.TIKTOK = "tiktok", e.TWITTER = "twitter", e.TWITCH = "twitch", 
        e.YOUTUBE = "youtube", e.FACEBOOK = "facebook", e.VIMEO = "vimeo", e.VK = "vk", 
        e.NINE_GAG = "nine_gag", e.UDEMY = "udemy", e.PORNHUB = "pornhub", e.XVIDEOS = "xvideos", 
        e.UNKNOWN = "unknown";
    }(e || (e = {}));
    const t = {
        "^www.coursera.org$": e.COURSERA,
        "^(www.|m.)facebook.com$": e.FACEBOOK,
        "^9gag.com$": e.NINE_GAG,
        "^www.tiktok.com$": e.TIKTOK,
        "^(www.|m.)?twitch.tv$": e.TWITCH,
        "^(mobile.)?twitter.com$": e.TWITTER,
        "^(player.)?vimeo.com$": e.VIMEO,
        "^(m.)?vk.com$": e.VK,
        "^www.udemy.com$": e.UDEMY,
        "^(www.|m.)?youtube(-nocookie)?.com$": e.YOUTUBE,
        "^(www.|rt.)?pornhub.com$": e.PORNHUB,
        "^www.xvideos.com$": e.XVIDEOS
    }, n = {
        getLocation: () => window.location,
        getHostname: () => window.location.hostname,
        getHref: () => window.location.href,
        getPathname: () => window.location.pathname,
        getOrigin: () => window.location.origin
    };
    var i, o, r, s, a, l, c, u = {}, d = [], h = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function f(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function p(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
    }
    function v(e, t, n) {
        var o, r, s, a = {};
        for (s in t) "key" == s ? o = t[s] : "ref" == s ? r = t[s] : a[s] = t[s];
        if (arguments.length > 2 && (a.children = arguments.length > 3 ? i.call(arguments, 2) : n), 
        "function" == typeof e && null != e.defaultProps) for (s in e.defaultProps) void 0 === a[s] && (a[s] = e.defaultProps[s]);
        return _(e, a, o, r, null);
    }
    function _(e, t, n, i, s) {
        var a = {
            type: e,
            props: t,
            key: n,
            ref: i,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == s ? ++r : s
        };
        return null == s && null != o.vnode && o.vnode(a), a;
    }
    function g(e) {
        return e.children;
    }
    function m(e, t) {
        this.props = e, this.context = t;
    }
    function b(e, t) {
        if (null == t) return e.__ ? b(e.__, e.__.__k.indexOf(e) + 1) : null;
        for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
        return "function" == typeof e.type ? b(e) : null;
    }
    function y(e) {
        var t, n;
        if (null != (e = e.__) && null != e.__c) {
            for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) {
                e.__e = e.__c.base = n.__e;
                break;
            }
            return y(e);
        }
    }
    function w(e) {
        (!e.__d && (e.__d = !0) && s.push(e) && !x.__r++ || l !== o.debounceRendering) && ((l = o.debounceRendering) || a)(x);
    }
    function x() {
        for (var e; x.__r = s.length; ) e = s.sort((function(e, t) {
            return e.__v.__b - t.__v.__b;
        })), s = [], e.some((function(e) {
            var t, n, i, o, r, s;
            e.__d && (r = (o = (t = e).__v).__e, (s = t.__P) && (n = [], (i = f({}, o)).__v = o.__v + 1, 
            M(s, o, i, t.__n, void 0 !== s.ownerSVGElement, null != o.__h ? [ r ] : null, n, null == r ? b(o) : r, o.__h), 
            R(n, o), o.__e != r && y(o)));
        }));
    }
    function k(e, t, n, i, o, r, s, a, l, c) {
        var h, f, p, v, m, y, w, x = i && i.__k || d, k = x.length;
        for (n.__k = [], h = 0; h < t.length; h++) if (null != (v = n.__k[h] = null == (v = t[h]) || "boolean" == typeof v ? null : "string" == typeof v || "number" == typeof v || "bigint" == typeof v ? _(null, v, null, null, v) : Array.isArray(v) ? _(g, {
            children: v
        }, null, null, null) : v.__b > 0 ? _(v.type, v.props, v.key, null, v.__v) : v)) {
            if (v.__ = n, v.__b = n.__b + 1, null === (p = x[h]) || p && v.key == p.key && v.type === p.type) x[h] = void 0; else for (f = 0; f < k; f++) {
                if ((p = x[f]) && v.key == p.key && v.type === p.type) {
                    x[f] = void 0;
                    break;
                }
                p = null;
            }
            M(e, v, p = p || u, o, r, s, a, l, c), m = v.__e, (f = v.ref) && p.ref != f && (w || (w = []), 
            p.ref && w.push(p.ref, null, v), w.push(f, v.__c || m, v)), null != m ? (null == y && (y = m), 
            "function" == typeof v.type && v.__k === p.__k ? v.__d = l = T(v, l, e) : l = E(e, v, p, x, m, l), 
            "function" == typeof n.type && (n.__d = l)) : l && p.__e == l && l.parentNode != e && (l = b(p));
        }
        for (n.__e = y, h = k; h--; ) null != x[h] && ("function" == typeof n.type && null != x[h].__e && x[h].__e == n.__d && (n.__d = b(i, h + 1)), 
        I(x[h], x[h]));
        if (w) for (h = 0; h < w.length; h++) D(w[h], w[++h], w[++h]);
    }
    function T(e, t, n) {
        for (var i, o = e.__k, r = 0; o && r < o.length; r++) (i = o[r]) && (i.__ = e, t = "function" == typeof i.type ? T(i, t, n) : E(n, i, i, o, i.__e, t));
        return t;
    }
    function S(e, t) {
        return t = t || [], null == e || "boolean" == typeof e || (Array.isArray(e) ? e.some((function(e) {
            S(e, t);
        })) : t.push(e)), t;
    }
    function E(e, t, n, i, o, r) {
        var s, a, l;
        if (void 0 !== t.__d) s = t.__d, t.__d = void 0; else if (null == n || o != r || null == o.parentNode) e: if (null == r || r.parentNode !== e) e.appendChild(o), 
        s = null; else {
            for (a = r, l = 0; (a = a.nextSibling) && l < i.length; l += 2) if (a == o) break e;
            e.insertBefore(o, r), s = r;
        }
        return void 0 !== s ? s : o.nextSibling;
    }
    function C(e, t, n) {
        "-" === t[0] ? e.setProperty(t, n) : e[t] = null == n ? "" : "number" != typeof n || h.test(t) ? n : n + "px";
    }
    function P(e, t, n, i, o) {
        var r;
        e: if ("style" === t) if ("string" == typeof n) e.style.cssText = n; else {
            if ("string" == typeof i && (e.style.cssText = i = ""), i) for (t in i) n && t in n || C(e.style, t, "");
            if (n) for (t in n) i && n[t] === i[t] || C(e.style, t, n[t]);
        } else if ("o" === t[0] && "n" === t[1]) r = t !== (t = t.replace(/Capture$/, "")), 
        t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), 
        e.l[t + r] = n, n ? i || e.addEventListener(t, r ? A : O, r) : e.removeEventListener(t, r ? A : O, r); else if ("dangerouslySetInnerHTML" !== t) {
            if (o) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s"); else if ("href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && t in e) try {
                e[t] = null == n ? "" : n;
                break e;
            } catch (e) {}
            "function" == typeof n || (null != n && (!1 !== n || "a" === t[0] && "r" === t[1]) ? e.setAttribute(t, n) : e.removeAttribute(t));
        }
    }
    function O(e) {
        this.l[e.type + !1](o.event ? o.event(e) : e);
    }
    function A(e) {
        this.l[e.type + !0](o.event ? o.event(e) : e);
    }
    function M(e, t, n, i, r, s, a, l, c) {
        var u, d, h, p, v, _, b, y, w, x, T, S = t.type;
        if (void 0 !== t.constructor) return null;
        null != n.__h && (c = n.__h, l = t.__e = n.__e, t.__h = null, s = [ l ]), (u = o.__b) && u(t);
        try {
            e: if ("function" == typeof S) {
                if (y = t.props, w = (u = S.contextType) && i[u.__c], x = u ? w ? w.props.value : u.__ : i, 
                n.__c ? b = (d = t.__c = n.__c).__ = d.__E : ("prototype" in S && S.prototype.render ? t.__c = d = new S(y, x) : (t.__c = d = new m(y, x), 
                d.constructor = S, d.render = N), w && w.sub(d), d.props = y, d.state || (d.state = {}), 
                d.context = x, d.__n = i, h = d.__d = !0, d.__h = []), null == d.__s && (d.__s = d.state), 
                null != S.getDerivedStateFromProps && (d.__s == d.state && (d.__s = f({}, d.__s)), 
                f(d.__s, S.getDerivedStateFromProps(y, d.__s))), p = d.props, v = d.state, h) null == S.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(), 
                null != d.componentDidMount && d.__h.push(d.componentDidMount); else {
                    if (null == S.getDerivedStateFromProps && y !== p && null != d.componentWillReceiveProps && d.componentWillReceiveProps(y, x), 
                    !d.__e && null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(y, d.__s, x) || t.__v === n.__v) {
                        d.props = y, d.state = d.__s, t.__v !== n.__v && (d.__d = !1), d.__v = t, t.__e = n.__e, 
                        t.__k = n.__k, t.__k.forEach((function(e) {
                            e && (e.__ = t);
                        })), d.__h.length && a.push(d);
                        break e;
                    }
                    null != d.componentWillUpdate && d.componentWillUpdate(y, d.__s, x), null != d.componentDidUpdate && d.__h.push((function() {
                        d.componentDidUpdate(p, v, _);
                    }));
                }
                d.context = x, d.props = y, d.state = d.__s, (u = o.__r) && u(t), d.__d = !1, d.__v = t, 
                d.__P = e, u = d.render(d.props, d.state, d.context), d.state = d.__s, null != d.getChildContext && (i = f(f({}, i), d.getChildContext())), 
                h || null == d.getSnapshotBeforeUpdate || (_ = d.getSnapshotBeforeUpdate(p, v)), 
                T = null != u && u.type === g && null == u.key ? u.props.children : u, k(e, Array.isArray(T) ? T : [ T ], t, n, i, r, s, a, l, c), 
                d.base = t.__e, t.__h = null, d.__h.length && a.push(d), b && (d.__E = d.__ = null), 
                d.__e = !1;
            } else null == s && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = L(n.__e, t, n, i, r, s, a, c);
            (u = o.diffed) && u(t);
        } catch (e) {
            t.__v = null, (c || null != s) && (t.__e = l, t.__h = !!c, s[s.indexOf(l)] = null), 
            o.__e(e, t, n);
        }
    }
    function R(e, t) {
        o.__c && o.__c(t, e), e.some((function(t) {
            try {
                e = t.__h, t.__h = [], e.some((function(e) {
                    e.call(t);
                }));
            } catch (e) {
                o.__e(e, t.__v);
            }
        }));
    }
    function L(e, t, n, o, r, s, a, l) {
        var c, d, h, f = n.props, v = t.props, _ = t.type, g = 0;
        if ("svg" === _ && (r = !0), null != s) for (;g < s.length; g++) if ((c = s[g]) && "setAttribute" in c == !!_ && (_ ? c.localName === _ : 3 === c.nodeType)) {
            e = c, s[g] = null;
            break;
        }
        if (null == e) {
            if (null === _) return document.createTextNode(v);
            e = r ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, v.is && v), 
            s = null, l = !1;
        }
        if (null === _) f === v || l && e.data === v || (e.data = v); else {
            if (s = s && i.call(e.childNodes), d = (f = n.props || u).dangerouslySetInnerHTML, 
            h = v.dangerouslySetInnerHTML, !l) {
                if (null != s) for (f = {}, g = 0; g < e.attributes.length; g++) f[e.attributes[g].name] = e.attributes[g].value;
                (h || d) && (h && (d && h.__html == d.__html || h.__html === e.innerHTML) || (e.innerHTML = h && h.__html || ""));
            }
            if (function(e, t, n, i, o) {
                var r;
                for (r in n) "children" === r || "key" === r || r in t || P(e, r, null, n[r], i);
                for (r in t) o && "function" != typeof t[r] || "children" === r || "key" === r || "value" === r || "checked" === r || n[r] === t[r] || P(e, r, t[r], n[r], i);
            }(e, v, f, r, l), h) t.__k = []; else if (g = t.props.children, k(e, Array.isArray(g) ? g : [ g ], t, n, o, r && "foreignObject" !== _, s, a, s ? s[0] : n.__k && b(n, 0), l), 
            null != s) for (g = s.length; g--; ) null != s[g] && p(s[g]);
            l || ("value" in v && void 0 !== (g = v.value) && (g !== f.value || g !== e.value || "progress" === _ && !g) && P(e, "value", g, f.value, !1), 
            "checked" in v && void 0 !== (g = v.checked) && g !== e.checked && P(e, "checked", g, f.checked, !1));
        }
        return e;
    }
    function D(e, t, n) {
        try {
            "function" == typeof e ? e(t) : e.current = t;
        } catch (e) {
            o.__e(e, n);
        }
    }
    function I(e, t, n) {
        var i, r;
        if (o.unmount && o.unmount(e), (i = e.ref) && (i.current && i.current !== e.__e || D(i, null, t)), 
        null != (i = e.__c)) {
            if (i.componentWillUnmount) try {
                i.componentWillUnmount();
            } catch (e) {
                o.__e(e, t);
            }
            i.base = i.__P = null;
        }
        if (i = e.__k) for (r = 0; r < i.length; r++) i[r] && I(i[r], t, "function" != typeof e.type);
        n || null == e.__e || p(e.__e), e.__e = e.__d = void 0;
    }
    function N(e, t, n) {
        return this.constructor(e, n);
    }
    function H(e, t, n) {
        var r, s, a;
        o.__ && o.__(e, t), s = (r = "function" == typeof n) ? null : n && n.__k || t.__k, 
        a = [], M(t, e = (!r && n || t).__k = v(g, null, [ e ]), s || u, u, void 0 !== t.ownerSVGElement, !r && n ? [ n ] : s ? null : t.firstChild ? i.call(t.childNodes) : null, a, !r && n ? n : s ? s.__e : t.firstChild, r), 
        R(a, e);
    }
    function j(e, t) {
        var n = {
            __c: t = "__cC" + c++,
            __: e,
            Consumer: function(e, t) {
                return e.children(t);
            },
            Provider: function(e) {
                var n, i;
                return this.getChildContext || (n = [], (i = {})[t] = this, this.getChildContext = function() {
                    return i;
                }, this.shouldComponentUpdate = function(e) {
                    this.props.value !== e.value && n.some(w);
                }, this.sub = function(e) {
                    n.push(e);
                    var t = e.componentWillUnmount;
                    e.componentWillUnmount = function() {
                        n.splice(n.indexOf(e), 1), t && t.call(e);
                    };
                }), e.children;
            }
        };
        return n.Provider.__ = n.Consumer.contextType = n;
    }
    i = d.slice, o = {
        __e: function(e, t) {
            for (var n, i, o; t = t.__; ) if ((n = t.__c) && !n.__) try {
                if ((i = n.constructor) && null != i.getDerivedStateFromError && (n.setState(i.getDerivedStateFromError(e)), 
                o = n.__d), null != n.componentDidCatch && (n.componentDidCatch(e), o = n.__d), 
                o) return n.__E = n;
            } catch (t) {
                e = t;
            }
            throw e;
        }
    }, r = 0, m.prototype.setState = function(e, t) {
        var n;
        n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = f({}, this.state), 
        "function" == typeof e && (e = e(f({}, n), this.props)), e && f(n, e), null != e && this.__v && (t && this.__h.push(t), 
        w(this));
    }, m.prototype.forceUpdate = function(e) {
        this.__v && (this.__e = !0, e && this.__h.push(e), w(this));
    }, m.prototype.render = g, s = [], a = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    x.__r = 0, c = 0;
    var B = 0;
    function V(e, t, n, i, r) {
        var s, a, l = {};
        for (a in t) "ref" == a ? s = t[a] : l[a] = t[a];
        var c = {
            type: e,
            props: l,
            key: n,
            ref: s,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: --B,
            __source: i,
            __self: r
        };
        if ("function" == typeof e && (s = e.defaultProps)) for (a in s) void 0 === l[a] && (l[a] = s[a]);
        return o.vnode && o.vnode(c), c;
    }
    var W, U, $, z = 0, G = [], F = o.__b, Z = o.__r, q = o.diffed, K = o.__c, Y = o.unmount;
    function X(e, t) {
        o.__h && o.__h(U, e, z || t), z = 0;
        var n = U.__H || (U.__H = {
            __: [],
            __h: []
        });
        return e >= n.__.length && n.__.push({}), n.__[e];
    }
    function Q(e) {
        return z = 1, J(de, e);
    }
    function J(e, t, n) {
        var i = X(W++, 2);
        return i.t = e, i.__c || (i.__ = [ n ? n(t) : de(void 0, t), function(e) {
            var t = i.t(i.__[0], e);
            i.__[0] !== t && (i.__ = [ t, i.__[1] ], i.__c.setState({}));
        } ], i.__c = U), i.__;
    }
    function ee(e, t) {
        var n = X(W++, 3);
        !o.__s && ue(n.__H, t) && (n.__ = e, n.__H = t, U.__H.__h.push(n));
    }
    function te(e, t) {
        var n = X(W++, 4);
        !o.__s && ue(n.__H, t) && (n.__ = e, n.__H = t, U.__h.push(n));
    }
    function ne(e) {
        return z = 5, ie((function() {
            return {
                current: e
            };
        }), []);
    }
    function ie(e, t) {
        var n = X(W++, 7);
        return ue(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
    }
    function oe(e, t) {
        return z = 8, ie((function() {
            return e;
        }), t);
    }
    function re(e) {
        var t = U.context[e.__c], n = X(W++, 9);
        return n.c = e, t ? (null == n.__ && (n.__ = !0, t.sub(U)), t.props.value) : e.__;
    }
    function se() {
        var e;
        for (G.sort((function(e, t) {
            return e.__v.__b - t.__v.__b;
        })); e = G.pop(); ) if (e.__P) try {
            e.__H.__h.forEach(le), e.__H.__h.forEach(ce), e.__H.__h = [];
        } catch (t) {
            e.__H.__h = [], o.__e(t, e.__v);
        }
    }
    o.__b = function(e) {
        U = null, F && F(e);
    }, o.__r = function(e) {
        Z && Z(e), W = 0;
        var t = (U = e.__c).__H;
        t && (t.__h.forEach(le), t.__h.forEach(ce), t.__h = []);
    }, o.diffed = function(e) {
        q && q(e);
        var t = e.__c;
        t && t.__H && t.__H.__h.length && (1 !== G.push(t) && $ === o.requestAnimationFrame || (($ = o.requestAnimationFrame) || function(e) {
            var t, n = function() {
                clearTimeout(i), ae && cancelAnimationFrame(t), setTimeout(e);
            }, i = setTimeout(n, 100);
            ae && (t = requestAnimationFrame(n));
        })(se)), U = null;
    }, o.__c = function(e, t) {
        t.some((function(e) {
            try {
                e.__h.forEach(le), e.__h = e.__h.filter((function(e) {
                    return !e.__ || ce(e);
                }));
            } catch (n) {
                t.some((function(e) {
                    e.__h && (e.__h = []);
                })), t = [], o.__e(n, e.__v);
            }
        })), K && K(e, t);
    }, o.unmount = function(e) {
        Y && Y(e);
        var t, n = e.__c;
        n && n.__H && (n.__H.__.forEach((function(e) {
            try {
                le(e);
            } catch (e) {
                t = e;
            }
        })), t && o.__e(t, n.__v));
    };
    var ae = "function" == typeof requestAnimationFrame;
    function le(e) {
        var t = U, n = e.__c;
        "function" == typeof n && (e.__c = void 0, n()), U = t;
    }
    function ce(e) {
        var t = U;
        e.__c = e.__(), U = t;
    }
    function ue(e, t) {
        return !e || e.length !== t.length || t.some((function(t, n) {
            return t !== e[n];
        }));
    }
    function de(e, t) {
        return "function" == typeof t ? t(e) : t;
    }
    function he(e, t) {
        for (var n in e) if ("__source" !== n && !(n in t)) return !0;
        for (var i in t) if ("__source" !== i && e[i] !== t[i]) return !0;
        return !1;
    }
    function fe(e) {
        this.props = e;
    }
    function pe(e, t) {
        function n(e) {
            var n = this.props.ref, i = n == e.ref;
            return !i && n && (n.call ? n(null) : n.current = null), t ? !t(this.props, e) || !i : he(this.props, e);
        }
        function i(t) {
            return this.shouldComponentUpdate = n, v(e, t);
        }
        return i.displayName = "Memo(" + (e.displayName || e.name) + ")", i.prototype.isReactComponent = !0, 
        i.__f = !0, i;
    }
    (fe.prototype = new m).isPureReactComponent = !0, fe.prototype.shouldComponentUpdate = function(e, t) {
        return he(this.props, e) || he(this.state, t);
    };
    var ve = o.__b;
    o.__b = function(e) {
        e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), ve && ve(e);
    };
    var _e = o.__e;
    o.__e = function(e, t, n) {
        if (e.then) for (var i, o = t; o = o.__; ) if ((i = o.__c) && i.__c) return null == t.__e && (t.__e = n.__e, 
        t.__k = n.__k), i.__c(e, t);
        _e(e, t, n);
    };
    var ge = o.unmount;
    function me() {
        this.__u = 0, this.t = null, this.__b = null;
    }
    function be(e) {
        var t = e.__.__c;
        return t && t.__e && t.__e(e);
    }
    function ye() {
        this.u = null, this.o = null;
    }
    o.unmount = function(e) {
        var t = e.__c;
        t && t.__R && t.__R(), t && !0 === e.__h && (e.type = null), ge && ge(e);
    }, (me.prototype = new m).__c = function(e, t) {
        var n = t.__c, i = this;
        null == i.t && (i.t = []), i.t.push(n);
        var o = be(i.__v), r = !1, s = function() {
            r || (r = !0, n.__R = null, o ? o(a) : a());
        };
        n.__R = s;
        var a = function() {
            if (!--i.__u) {
                if (i.state.__e) {
                    var e = i.state.__e;
                    i.__v.__k[0] = function e(t, n, i) {
                        return t && (t.__v = null, t.__k = t.__k && t.__k.map((function(t) {
                            return e(t, n, i);
                        })), t.__c && t.__c.__P === n && (t.__e && i.insertBefore(t.__e, t.__d), t.__c.__e = !0, 
                        t.__c.__P = i)), t;
                    }(e, e.__c.__P, e.__c.__O);
                }
                var t;
                for (i.setState({
                    __e: i.__b = null
                }); t = i.t.pop(); ) t.forceUpdate();
            }
        }, l = !0 === t.__h;
        i.__u++ || l || i.setState({
            __e: i.__b = i.__v.__k[0]
        }), e.then(s, s);
    }, me.prototype.componentWillUnmount = function() {
        this.t = [];
    }, me.prototype.render = function(e, t) {
        if (this.__b) {
            if (this.__v.__k) {
                var n = document.createElement("div"), i = this.__v.__k[0].__c;
                this.__v.__k[0] = function e(t, n, i) {
                    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach((function(e) {
                        "function" == typeof e.__c && e.__c();
                    })), t.__c.__H = null), null != (t = function(e, t) {
                        for (var n in t) e[n] = t[n];
                        return e;
                    }({}, t)).__c && (t.__c.__P === i && (t.__c.__P = n), t.__c = null), t.__k = t.__k && t.__k.map((function(t) {
                        return e(t, n, i);
                    }))), t;
                }(this.__b, n, i.__O = i.__P);
            }
            this.__b = null;
        }
        var o = t.__e && v(g, null, e.fallback);
        return o && (o.__h = null), [ v(g, null, t.__e ? null : e.children), o ];
    };
    var we = function(e, t, n) {
        if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size)) for (n = e.u; n; ) {
            for (;n.length > 3; ) n.pop()();
            if (n[1] < n[0]) break;
            e.u = n = n[2];
        }
    };
    function xe(e) {
        return this.getChildContext = function() {
            return e.context;
        }, e.children;
    }
    function ke(e) {
        var t = this, n = e.i;
        t.componentWillUnmount = function() {
            H(null, t.l), t.l = null, t.i = null;
        }, t.i && t.i !== n && t.componentWillUnmount(), e.__v ? (t.l || (t.i = n, t.l = {
            nodeType: 1,
            parentNode: n,
            childNodes: [],
            appendChild: function(e) {
                this.childNodes.push(e), t.i.appendChild(e);
            },
            insertBefore: function(e, n) {
                this.childNodes.push(e), t.i.appendChild(e);
            },
            removeChild: function(e) {
                this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.i.removeChild(e);
            }
        }), H(v(xe, {
            context: t.context
        }, e.__v), t.l)) : t.l && t.componentWillUnmount();
    }
    function Te(e, t) {
        return v(ke, {
            __v: e,
            i: t
        });
    }
    (ye.prototype = new m).__e = function(e) {
        var t = this, n = be(t.__v), i = t.o.get(e);
        return i[0]++, function(o) {
            var r = function() {
                t.props.revealOrder ? (i.push(o), we(t, e, i)) : o();
            };
            n ? n(r) : r();
        };
    }, ye.prototype.render = function(e) {
        this.u = null, this.o = new Map;
        var t = S(e.children);
        e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
        for (var n = t.length; n--; ) this.o.set(t[n], this.u = [ 1, 0, this.u ]);
        return e.children;
    }, ye.prototype.componentDidUpdate = ye.prototype.componentDidMount = function() {
        var e = this;
        this.o.forEach((function(t, n) {
            we(e, n, t);
        }));
    };
    var Se = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, Ee = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Ce = "undefined" != typeof document, Pe = function(e) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(e);
    };
    m.prototype.isReactComponent = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach((function(e) {
        Object.defineProperty(m.prototype, e, {
            configurable: !0,
            get: function() {
                return this["UNSAFE_" + e];
            },
            set: function(t) {
                Object.defineProperty(this, e, {
                    configurable: !0,
                    writable: !0,
                    value: t
                });
            }
        });
    }));
    var Oe = o.event;
    function Ae() {}
    function Me() {
        return this.cancelBubble;
    }
    function Re() {
        return this.defaultPrevented;
    }
    o.event = function(e) {
        return Oe && (e = Oe(e)), e.persist = Ae, e.isPropagationStopped = Me, e.isDefaultPrevented = Re, 
        e.nativeEvent = e;
    };
    var Le = {
        configurable: !0,
        get: function() {
            return this.class;
        }
    }, De = o.vnode;
    o.vnode = function(e) {
        var t = e.type, n = e.props, i = n;
        if ("string" == typeof t) {
            var o = -1 === t.indexOf("-");
            for (var r in i = {}, n) {
                var s = n[r];
                Ce && "children" === r && "noscript" === t || "value" === r && "defaultValue" in n && null == s || ("defaultValue" === r && "value" in n && null == n.value ? r = "value" : "download" === r && !0 === s ? s = "" : /ondoubleclick/i.test(r) ? r = "ondblclick" : /^onchange(textarea|input)/i.test(r + t) && !Pe(n.type) ? r = "oninput" : /^onfocus$/i.test(r) ? r = "onfocusin" : /^onblur$/i.test(r) ? r = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp)/.test(r) ? r = r.toLowerCase() : o && Ee.test(r) ? r = r.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === s && (s = void 0), 
                i[r] = s);
            }
            "select" == t && i.multiple && Array.isArray(i.value) && (i.value = S(n.children).forEach((function(e) {
                e.props.selected = -1 != i.value.indexOf(e.props.value);
            }))), "select" == t && null != i.defaultValue && (i.value = S(n.children).forEach((function(e) {
                e.props.selected = i.multiple ? -1 != i.defaultValue.indexOf(e.props.value) : i.defaultValue == e.props.value;
            }))), e.props = i, n.class != n.className && (Le.enumerable = "className" in n, 
            null != n.className && (i.class = n.className), Object.defineProperty(i, "className", Le));
        }
        e.$$typeof = Se, De && De(e);
    };
    var Ie = o.__r;
    o.__r = function(e) {
        Ie && Ie(e);
    };
    let Ne = j(), He = "undefined" != typeof window ? te : ee, je = (Be = Ne, (...e) => {
        let t = re(Be), n = Q({});
        return He((() => t.on("@changed", ((t, i) => {
            e.some((e => e in i)) && n[1]({});
        }))), []), ie((() => {
            let n = t.get(), i = {};
            return e.forEach((e => {
                i[e] = n[e];
            })), i.dispatch = t.dispatch, i;
        }), [ n[0] ]);
    });
    var Be;
    const Ve = async (e, t) => {
        let n, i;
        try {
            n = await fetch(e);
        } catch (e) {
            return {
                error: !0,
                data: void 0
            };
        }
        try {
            return i = t ? await n[t]() : await n.json(), n.ok ? {
                error: !1,
                data: i
            } : {
                error: !0,
                data: i
            };
        } catch (e) {
            return await n.text(), {
                error: !0,
                data: void 0
            };
        }
    };
    const We = navigator.language.slice(0, 2);
    class Ue {
        constructor() {
            this.cache = {}, this.fetchQueue = [], this.promiseCallbacks = {}, this.promiseId = 0;
        }
        static normalizeTargetLanguage(e, t) {
            return e !== t ? t : "ru";
        }
        static getCacheKey(e, t) {
            return `${e}-${t}`;
        }
        static getLangPairCode(e, t) {
            return `${e}-${Ue.normalizeTargetLanguage(e, t)}`;
        }
        fetch(e, t) {
            const n = new URL(Ue.url);
            n.searchParams.set("srv", Ue.srv), n.searchParams.set("options", Ue.options), n.searchParams.set("lang", e);
            for (const e of t) n.searchParams.append("text", e);
            return Ve(n.toString());
        }
        groupedFetch(e) {
            0 === this.fetchQueue.length && window.setTimeout((() => {
                var e, t;
                Object.entries((e = this.fetchQueue, t = e => e.info.lang, e.reduce(((e, n) => {
                    const i = t(n);
                    return e[i] || (e[i] = []), e[i].push(n), e;
                }), {}))).forEach((async ([e, t]) => {
                    const n = t.map((e => e.info.text)), {data: i, error: o} = await this.fetch(e, n);
                    t.forEach((({promiseId: e, queueIndex: t}) => {
                        var n;
                        const {resolve: r, reject: s} = this.promiseCallbacks[e];
                        o || !i ? s(i) : r({
                            text: i.text[t],
                            align: null === (n = i.align) || void 0 === n ? void 0 : n[t]
                        });
                    }));
                })), this.fetchQueue = [];
            }), 0);
            const t = "" + this.promiseId++;
            return this.fetchQueue.push({
                info: e,
                promiseId: t,
                queueIndex: this.fetchQueue.length
            }), new Promise(((e, n) => {
                this.promiseCallbacks[t] = {
                    resolve: e,
                    reject: n
                };
            }));
        }
        async translate(e, t, n = We) {
            const i = Ue.getLangPairCode(t, n), o = Ue.getCacheKey(i, e);
            return this.cache[o] || (this.cache[o] = await this.groupedFetch({
                lang: i,
                text: e
            })), this.cache[o];
        }
        cleanCache() {
            this.cache = {};
        }
    }
    Ue.url = "https://browser.translate.yandex.net/api/v1/tr.json/translate", Ue.srv = "yabrowser-subtitles", 
    Ue.options = "4";
    const $e = new Ue, ze = "ontouchstart" in window || navigator.maxTouchPoints > 0, Ge = Object.freeze([ "ru" ]), Fe = [ "\n", " ", "\t" ], Ze = new RegExp(`([${Fe.join("")}])`);
    function qe(e) {
        const [t, n] = e.split(":").map((e => parseInt(e)));
        return {
            start: t,
            end: t + n
        };
    }
    function Ke(e) {
        const [t, n] = e.split("-");
        return {
            source: qe(t),
            destination: qe(n)
        };
    }
    function Ye(e, t) {
        return e.start < t.end && e.end > t.start;
    }
    function Xe(e, t) {
        return e.start === t.start && e.end === t.end;
    }
    function Qe(e, t) {
        const n = function(e) {
            return e.reduce(((e, t) => (Fe.includes(t.text) || e.push(t.alignRange), e)), []);
        }(e), i = function(e, t) {
            const n = [];
            for (const i of t) for (const t of e) if (Ye(i, t.source)) {
                const e = {
                    source: i,
                    destination: t.destination
                };
                n.push(e);
            }
            return n;
        }(function(e) {
            return null == e ? void 0 : e.split(",").slice(1).map(Ke);
        }(t), n);
        return e.map((e => function(e, t, n) {
            const i = "source" === t ? "destination" : "source", o = [], r = new Set;
            for (const i of n) Ye(e, i[t]) && (r.add(i), o.push(i));
            let s = 0;
            for (;s < o.length; ) {
                s = o.length;
                for (const e of o) for (const s of n) r.has(s) || (Ye(e[t], s[t]) || Ye(e[i], s[i])) && (r.add(s), 
                o.push(s));
            }
            return o;
        }(e.alignRange, "source", i)), []);
    }
    function Je(e, t, n) {
        if (!t || !n || !e) return;
        const i = t.findIndex((e => e.id === n.id));
        return void 0 !== i ? e[i] : void 0;
    }
    function et(e, t) {
        if (!e) return;
        const n = [];
        for (const i of e) n.some((e => Xe(i[t], e))) || n.push(i.source);
        return n;
    }
    const tt = () => e => {
        e.on("@init", (() => ({
            subtitleItems: []
        }))), e.on("setSubtitleItems", ((e, t) => ({
            subtitleItems: t
        }))), e.on("setSelectedSubtitleTrack", ((e, t) => ({
            selectedSubtitleTrack: t
        }))), e.on("setHoveredToken", ((e, t) => ({
            hoveredToken: t
        }))), e.on("setSelectedToken", ((e, t) => ({
            selectedToken: t
        }))), e.on("setHoveredAligns", ((e, t) => ({
            hoveredAligns: t
        }))), e.on("setSelectedAligns", ((e, t) => ({
            selectedAligns: t
        }))), e.on("setTranslationError", ((e, t) => ({
            translationError: t
        }))), e.on("setWordTranslation", ((e, t) => t)), e.on("setPhraseTranslation", ((e, t) => t)), 
        e.on("setSelectedData", ((t, n) => n ? (e.dispatch("translate", n), {
            selectedData: n
        }) : {
            selectedData: void 0,
            wordTranslationResult: void 0,
            wordTranslationSource: void 0,
            wordTranslationStatus: void 0,
            phraseTranslationResult: void 0,
            phraseTranslationSource: void 0,
            phraseTranslationStatus: void 0,
            selectedAligns: void 0,
            hoveredAligns: void 0,
            tokenAligns: void 0,
            translationError: void 0
        })), e.on("translate", (async (t, n) => {
            if (!t.selectedSubtitleTrack) throw new Error("No subtitle track was provided.");
            e.dispatch("setTranslationError", void 0);
            const i = n.token.text, o = t.selectedSubtitleTrack.languageCode, r = n.fullPhrase;
            var s;
            e.dispatch("setWordTranslation", {
                wordTranslationStatus: "loading",
                wordTranslationSource: i,
                wordTranslationResult: void 0
            }), e.dispatch("setSelectedToken", n.token), n.loadingDelay && await (s = n.loadingDelay, 
            new Promise((e => window.setTimeout(e, s)))), $e.translate(i, o).then((t => {
                e.dispatch("setWordTranslation", {
                    wordTranslationStatus: "success",
                    wordTranslationResult: t.text
                });
            })).catch((t => {
                e.dispatch("setTranslationError", t);
            })), t.wordTranslationSource !== r && (e.dispatch("setPhraseTranslation", {
                phraseTranslationStatus: "loading",
                phraseTranslationSource: r,
                phraseTranslationResult: void 0
            }), $e.translate(r, o).then((t => {
                const i = t.align ? Qe(n.tokens, t.align) : void 0;
                e.dispatch("setPhraseTranslation", {
                    phraseTranslationStatus: "success",
                    phraseTranslationResult: t.text,
                    tokensAligns: i
                });
            })).catch((t => {
                e.dispatch("setTranslationError", t);
            })));
        })), e.on("@changed", ((t, n) => {
            var i, o;
            if ("tokensAligns" in n || "hoveredToken" in n) {
                const n = Je(t.tokensAligns, null === (i = t.selectedData) || void 0 === i ? void 0 : i.tokens, t.hoveredToken);
                e.dispatch("setHoveredAligns", n);
            }
            if ("tokensAligns" in n || "selectedToken" in n) {
                const n = Je(t.tokensAligns, null === (o = t.selectedData) || void 0 === o ? void 0 : o.tokens, t.selectedToken);
                e.dispatch("setSelectedAligns", n);
            }
        })), e.on("setIsPaused", ((e, t) => ({
            isPaused: t
        }))), e.on("setSeekedTime", ((e, t) => ({
            seekedTime: t
        })));
    };
    function nt(...e) {
        return je(...e);
    }
    const it = j({}), ot = it.Provider;
    function rt() {
        return re(it);
    }
    const st = j("closed"), at = st.Provider;
    function lt(e) {
        return e.split("-")[0];
    }
    function ct(e) {
        return e.split("-")[1];
    }
    function ut(e) {
        return [ "top", "bottom" ].includes(lt(e)) ? "x" : "y";
    }
    function dt(e) {
        return "y" === e ? "height" : "width";
    }
    function ht(e) {
        let {reference: t, floating: n, placement: i} = e;
        const o = t.x + t.width / 2 - n.width / 2, r = t.y + t.height / 2 - n.height / 2;
        let s;
        switch (lt(i)) {
          case "top":
            s = {
                x: o,
                y: t.y - n.height
            };
            break;

          case "bottom":
            s = {
                x: o,
                y: t.y + t.height
            };
            break;

          case "right":
            s = {
                x: t.x + t.width,
                y: r
            };
            break;

          case "left":
            s = {
                x: t.x - n.width,
                y: r
            };
            break;

          default:
            s = {
                x: t.x,
                y: t.y
            };
        }
        const a = ut(i), l = dt(a);
        switch (ct(i)) {
          case "start":
            s[a] = s[a] - (t[l] / 2 - n[l] / 2);
            break;

          case "end":
            s[a] = s[a] + (t[l] / 2 - n[l] / 2);
        }
        return s;
    }
    function ft(e) {
        return {
            ...e,
            top: e.y,
            left: e.x,
            right: e.x + e.width,
            bottom: e.y + e.height
        };
    }
    async function pt(e, t) {
        void 0 === t && (t = {});
        const {x: n, y: i, platform: o, rects: r, elements: s, strategy: a} = e, {boundary: l = "clippingParents", rootBoundary: c = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: h = 0} = t, f = function(e) {
            return "number" != typeof e ? function(e) {
                return {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    ...e
                };
            }(e) : {
                top: e,
                right: e,
                bottom: e,
                left: e
            };
        }(h), p = s[d ? "floating" === u ? "reference" : "floating" : u], v = await o.getClippingClientRect({
            element: await o.isElement(p) ? p : p.contextElement || await o.getDocumentElement({
                element: s.floating
            }),
            boundary: l,
            rootBoundary: c
        }), _ = ft(await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            rect: "floating" === u ? {
                ...r.floating,
                x: n,
                y: i
            } : r.reference,
            offsetParent: await o.getOffsetParent({
                element: s.floating
            }),
            strategy: a
        }));
        return {
            top: v.top - _.top + f.top,
            bottom: _.bottom - v.bottom + f.bottom,
            left: v.left - _.left + f.left,
            right: _.right - v.right + f.right
        };
    }
    const vt = Math.min, _t = Math.max;
    function gt(e, t, n) {
        return _t(e, vt(t, n));
    }
    const mt = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    function bt(e) {
        return e.replace(/left|right|bottom|top/g, (e => mt[e]));
    }
    const yt = {
        start: "end",
        end: "start"
    };
    function wt(e) {
        return e.replace(/start|end/g, (e => yt[e]));
    }
    const xt = function(e) {
        return void 0 === e && (e = {}), {
            name: "flip",
            options: e,
            async fn(t) {
                var n, i;
                const {placement: o, middlewareData: r, rects: s, initialPlacement: a} = t;
                if (null != (n = r.flip) && n.skip) return {};
                const {mainAxis: l = !0, crossAxis: c = !0, fallbackPlacements: u, fallbackStrategy: d = "bestFit", flipAlignment: h = !0, ...f} = e, p = lt(o), v = [ a, ...u || (p === a || !h ? [ bt(a) ] : function(e) {
                    const t = bt(e);
                    return [ wt(e), t, wt(t) ];
                }(a)) ], _ = await pt(t, f), g = [];
                let m = (null == (i = r.flip) ? void 0 : i.overflows) || [];
                if (l && g.push(_[p]), c) {
                    const {main: e, cross: t} = function(e, t) {
                        const n = "start" === ct(e), i = ut(e), o = dt(i);
                        let r = "x" === i ? n ? "right" : "left" : n ? "bottom" : "top";
                        return t.reference[o] > t.floating[o] && (r = bt(r)), {
                            main: r,
                            cross: bt(r)
                        };
                    }(o, s);
                    g.push(_[e], _[t]);
                }
                if (m = [ ...m, {
                    placement: o,
                    overflows: g
                } ], !g.every((e => e <= 0))) {
                    var b, y;
                    const e = (null != (b = null == (y = r.flip) ? void 0 : y.index) ? b : 0) + 1, t = v[e];
                    if (t) return {
                        data: {
                            index: e,
                            overflows: m
                        },
                        reset: {
                            placement: t
                        }
                    };
                    let n = "bottom";
                    switch (d) {
                      case "bestFit":
                        {
                            var w;
                            const e = null == (w = m.slice().sort(((e, t) => e.overflows.filter((e => e > 0)).reduce(((e, t) => e + t), 0) - t.overflows.filter((e => e > 0)).reduce(((e, t) => e + t), 0)))[0]) ? void 0 : w.placement;
                            e && (n = e);
                            break;
                        }

                      case "initialPlacement":
                        n = a;
                    }
                    return {
                        data: {
                            skip: !0
                        },
                        reset: {
                            placement: n
                        }
                    };
                }
                return {};
            }
        };
    };
    const kt = function(e) {
        return void 0 === e && (e = 0), {
            name: "offset",
            options: e,
            fn(t) {
                const {x: n, y: i, placement: o, rects: r} = t, s = function(e) {
                    let {placement: t, rects: n, value: i} = e;
                    const o = lt(t), r = [ "left", "top" ].includes(o) ? -1 : 1, s = "function" == typeof i ? i({
                        ...n,
                        placement: t
                    }) : i, {mainAxis: a, crossAxis: l} = "number" == typeof s ? {
                        mainAxis: s,
                        crossAxis: 0
                    } : {
                        mainAxis: 0,
                        crossAxis: 0,
                        ...s
                    };
                    return "x" === ut(o) ? {
                        x: l,
                        y: a * r
                    } : {
                        x: a * r,
                        y: l
                    };
                }({
                    placement: o,
                    rects: r,
                    value: e
                });
                return {
                    x: n + s.x,
                    y: i + s.y,
                    data: s
                };
            }
        };
    };
    function Tt(e) {
        return "[object Window]" === (null == e ? void 0 : e.toString());
    }
    function St(e) {
        if (null == e) return window;
        if (!Tt(e)) {
            const t = e.ownerDocument;
            return t && t.defaultView || window;
        }
        return e;
    }
    function Et(e) {
        return St(e).getComputedStyle(e);
    }
    function Ct(e) {
        return Tt(e) ? "" : e ? (e.nodeName || "").toLowerCase() : "";
    }
    function Pt(e) {
        return e instanceof St(e).HTMLElement;
    }
    function Ot(e) {
        return e instanceof St(e).Element;
    }
    function At(e) {
        return e instanceof St(e).ShadowRoot || e instanceof ShadowRoot;
    }
    function Mt(e) {
        const {overflow: t, overflowX: n, overflowY: i} = Et(e);
        return /auto|scroll|overlay|hidden/.test(t + i + n);
    }
    function Rt(e) {
        return [ "table", "td", "th" ].includes(Ct(e));
    }
    function Lt(e) {
        const t = navigator.userAgent.toLowerCase().includes("firefox"), n = Et(e);
        return "none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || [ "transform", "perspective" ].includes(n.willChange) || t && "filter" === n.willChange || t && !!n.filter && "none" !== n.filter;
    }
    const Dt = Math.min, It = Math.max, Nt = Math.round;
    function Ht(e, t) {
        void 0 === t && (t = !1);
        const n = e.getBoundingClientRect();
        let i = 1, o = 1;
        return t && Pt(e) && (i = e.offsetWidth > 0 && Nt(n.width) / e.offsetWidth || 1, 
        o = e.offsetHeight > 0 && Nt(n.height) / e.offsetHeight || 1), {
            width: n.width / i,
            height: n.height / o,
            top: n.top / o,
            right: n.right / i,
            bottom: n.bottom / o,
            left: n.left / i,
            x: n.left / i,
            y: n.top / o
        };
    }
    function jt(e) {
        return (t = e, (t instanceof St(t).Node ? e.ownerDocument : e.document) || window.document).documentElement;
        var t;
    }
    function Bt(e) {
        return Tt(e) ? {
            scrollLeft: e.pageXOffset,
            scrollTop: e.pageYOffset
        } : {
            scrollLeft: e.scrollLeft,
            scrollTop: e.scrollTop
        };
    }
    function Vt(e) {
        return Ht(jt(e)).left + Bt(e).scrollLeft;
    }
    function Wt(e, t, n) {
        const i = Pt(t), o = jt(t), r = Ht(e, i && function(e) {
            const t = Ht(e);
            return Nt(t.width) !== e.offsetWidth || Nt(t.height) !== e.offsetHeight;
        }(t));
        let s = {
            scrollLeft: 0,
            scrollTop: 0
        };
        const a = {
            x: 0,
            y: 0
        };
        if (i || !i && "fixed" !== n) if (("body" !== Ct(t) || Mt(o)) && (s = Bt(t)), Pt(t)) {
            const e = Ht(t, !0);
            a.x = e.x + t.clientLeft, a.y = e.y + t.clientTop;
        } else o && (a.x = Vt(o));
        return {
            x: r.left + s.scrollLeft - a.x,
            y: r.top + s.scrollTop - a.y,
            width: r.width,
            height: r.height
        };
    }
    function Ut(e) {
        return "html" === Ct(e) ? e : e.assignedSlot || e.parentNode || (At(e) ? e.host : null) || jt(e);
    }
    function $t(e) {
        return Pt(e) && "fixed" !== getComputedStyle(e).position ? e.offsetParent : null;
    }
    function zt(e) {
        const t = St(e);
        let n = $t(e);
        for (;n && Rt(n) && "static" === getComputedStyle(n).position; ) n = $t(n);
        return n && ("html" === Ct(n) || "body" === Ct(n) && "static" === getComputedStyle(n).position && !Lt(n)) ? t : n || function(e) {
            let t = Ut(e);
            for (;Pt(t) && ![ "html", "body" ].includes(Ct(t)); ) {
                if (Lt(t)) return t;
                t = t.parentNode;
            }
            return null;
        }(e) || t;
    }
    function Gt(e) {
        return {
            width: e.offsetWidth,
            height: e.offsetHeight
        };
    }
    function Ft(e) {
        return [ "html", "body", "#document" ].includes(Ct(e)) ? e.ownerDocument.body : Pt(e) && Mt(e) ? e : Ft(Ut(e));
    }
    function Zt(e, t) {
        var n;
        void 0 === t && (t = []);
        const i = Ft(e), o = i === (null == (n = e.ownerDocument) ? void 0 : n.body), r = St(i), s = o ? [ r ].concat(r.visualViewport || [], Mt(i) ? i : []) : i, a = t.concat(s);
        return o ? a : a.concat(Zt(Ut(s)));
    }
    function qt(e, t) {
        return "viewport" === t ? ft(function(e) {
            const t = St(e), n = jt(e), i = t.visualViewport;
            let o = n.clientWidth, r = n.clientHeight, s = 0, a = 0;
            return i && (o = i.width, r = i.height, Math.abs(t.innerWidth / i.scale - i.width) < .01 && (s = i.offsetLeft, 
            a = i.offsetTop)), {
                width: o,
                height: r,
                x: s,
                y: a
            };
        }(e)) : Ot(t) ? function(e) {
            const t = Ht(e), n = t.top + e.clientTop, i = t.left + e.clientLeft;
            return {
                top: n,
                left: i,
                x: i,
                y: n,
                right: i + e.clientWidth,
                bottom: n + e.clientHeight,
                width: e.clientWidth,
                height: e.clientHeight
            };
        }(t) : ft(function(e) {
            var t;
            const n = jt(e), i = Bt(e), o = null == (t = e.ownerDocument) ? void 0 : t.body, r = It(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = It(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0);
            let a = -i.scrollLeft + Vt(e);
            const l = -i.scrollTop;
            return "rtl" === Et(o || n).direction && (a += It(n.clientWidth, o ? o.clientWidth : 0) - r), 
            {
                width: r,
                height: s,
                x: a,
                y: l
            };
        }(jt(e)));
    }
    function Kt(e) {
        const t = Zt(Ut(e)), n = [ "absolute", "fixed" ].includes(Et(e).position) && Pt(e) ? zt(e) : e;
        return Ot(n) ? t.filter((e => Ot(e) && function(e, t) {
            const n = null == t.getRootNode ? void 0 : t.getRootNode();
            if (e.contains(t)) return !0;
            if (n && At(n)) {
                let n = t;
                do {
                    if (n && e === n) return !0;
                    n = n.parentNode || n.host;
                } while (n);
            }
            return !1;
        }(e, n) && "body" !== Ct(e))) : [];
    }
    const Yt = {
        getElementRects: e => {
            let {reference: t, floating: n, strategy: i} = e;
            return {
                reference: Wt(t, zt(n), i),
                floating: {
                    ...Gt(n),
                    x: 0,
                    y: 0
                }
            };
        },
        convertOffsetParentRelativeRectToViewportRelativeRect: e => function(e) {
            let {rect: t, offsetParent: n, strategy: i} = e;
            const o = Pt(n), r = jt(n);
            if (n === r) return t;
            let s = {
                scrollLeft: 0,
                scrollTop: 0
            };
            const a = {
                x: 0,
                y: 0
            };
            if ((o || !o && "fixed" !== i) && (("body" !== Ct(n) || Mt(r)) && (s = Bt(n)), Pt(n))) {
                const e = Ht(n, !0);
                a.x = e.x + n.clientLeft, a.y = e.y + n.clientTop;
            }
            return {
                ...t,
                x: t.x - s.scrollLeft + a.x,
                y: t.y - s.scrollTop + a.y
            };
        }(e),
        getOffsetParent: e => {
            let {element: t} = e;
            return zt(t);
        },
        isElement: e => Ot(e),
        getDocumentElement: e => {
            let {element: t} = e;
            return jt(t);
        },
        getClippingClientRect: e => function(e) {
            let {element: t, boundary: n, rootBoundary: i} = e;
            const o = [ ..."clippingParents" === n ? Kt(t) : [].concat(n), i ], r = o[0], s = o.reduce(((e, n) => {
                const i = qt(t, n);
                return e.top = It(i.top, e.top), e.right = Dt(i.right, e.right), e.bottom = Dt(i.bottom, e.bottom), 
                e.left = It(i.left, e.left), e;
            }), qt(t, r));
            return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, 
            s;
        }(e),
        getDimensions: e => {
            let {element: t} = e;
            return Gt(t);
        },
        getClientRects: e => {
            let {element: t} = e;
            return t.getClientRects();
        }
    }, Xt = (e, t, n) => (async (e, t, n) => {
        const {placement: i = "bottom", strategy: o = "absolute", middleware: r = [], platform: s} = n;
        let a = await s.getElementRects({
            reference: e,
            floating: t,
            strategy: o
        }), {x: l, y: c} = ht({
            ...a,
            placement: i
        }), u = i, d = {};
        for (let n = 0; n < r.length; n++) {
            const {name: h, fn: f} = r[n], {x: p, y: v, data: _, reset: g} = await f({
                x: l,
                y: c,
                initialPlacement: i,
                placement: u,
                strategy: o,
                middlewareData: d,
                rects: a,
                platform: s,
                elements: {
                    reference: e,
                    floating: t
                }
            });
            l = null != p ? p : l, c = null != v ? v : c, d = {
                ...d,
                [h]: null != _ ? _ : {}
            }, g && ("object" == typeof g && (g.placement && (u = g.placement), g.rects && (a = !0 === g.rects ? await s.getElementRects({
                reference: e,
                floating: t,
                strategy: o
            }) : g.rects), ({x: l, y: c} = ht({
                ...a,
                placement: u
            }))), n = -1);
        }
        return {
            x: l,
            y: c,
            placement: u,
            strategy: o,
            middlewareData: d
        };
    })(e, t, {
        platform: Yt,
        ...n
    });
    var Qt = function() {
        if ("undefined" != typeof Map) return Map;
        function e(e, t) {
            var n = -1;
            return e.some((function(e, i) {
                return e[0] === t && (n = i, !0);
            })), n;
        }
        return function() {
            function t() {
                this.__entries__ = [];
            }
            return Object.defineProperty(t.prototype, "size", {
                get: function() {
                    return this.__entries__.length;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.get = function(t) {
                var n = e(this.__entries__, t), i = this.__entries__[n];
                return i && i[1];
            }, t.prototype.set = function(t, n) {
                var i = e(this.__entries__, t);
                ~i ? this.__entries__[i][1] = n : this.__entries__.push([ t, n ]);
            }, t.prototype.delete = function(t) {
                var n = this.__entries__, i = e(n, t);
                ~i && n.splice(i, 1);
            }, t.prototype.has = function(t) {
                return !!~e(this.__entries__, t);
            }, t.prototype.clear = function() {
                this.__entries__.splice(0);
            }, t.prototype.forEach = function(e, t) {
                void 0 === t && (t = null);
                for (var n = 0, i = this.__entries__; n < i.length; n++) {
                    var o = i[n];
                    e.call(t, o[1], o[0]);
                }
            }, t;
        }();
    }(), Jt = "undefined" != typeof window && "undefined" != typeof document && window.document === document, en = "undefined" != typeof global && global.Math === Math ? global : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(), tn = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(en) : function(e) {
        return setTimeout((function() {
            return e(Date.now());
        }), 1e3 / 60);
    };
    var nn = [ "top", "right", "bottom", "left", "width", "height", "size", "weight" ], on = "undefined" != typeof MutationObserver, rn = function() {
        function e() {
            this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, 
            this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), 
            this.refresh = function(e, t) {
                var n = !1, i = !1, o = 0;
                function r() {
                    n && (n = !1, e()), i && a();
                }
                function s() {
                    tn(r);
                }
                function a() {
                    var e = Date.now();
                    if (n) {
                        if (e - o < 2) return;
                        i = !0;
                    } else n = !0, i = !1, setTimeout(s, t);
                    o = e;
                }
                return a;
            }(this.refresh.bind(this), 20);
        }
        return e.prototype.addObserver = function(e) {
            ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_();
        }, e.prototype.removeObserver = function(e) {
            var t = this.observers_, n = t.indexOf(e);
            ~n && t.splice(n, 1), !t.length && this.connected_ && this.disconnect_();
        }, e.prototype.refresh = function() {
            this.updateObservers_() && this.refresh();
        }, e.prototype.updateObservers_ = function() {
            var e = this.observers_.filter((function(e) {
                return e.gatherActive(), e.hasActive();
            }));
            return e.forEach((function(e) {
                return e.broadcastActive();
            })), e.length > 0;
        }, e.prototype.connect_ = function() {
            Jt && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), 
            window.addEventListener("resize", this.refresh), on ? (this.mutationsObserver_ = new MutationObserver(this.refresh), 
            this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), 
            this.connected_ = !0);
        }, e.prototype.disconnect_ = function() {
            Jt && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), 
            window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), 
            this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), 
            this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
        }, e.prototype.onTransitionEnd_ = function(e) {
            var t = e.propertyName, n = void 0 === t ? "" : t;
            nn.some((function(e) {
                return !!~n.indexOf(e);
            })) && this.refresh();
        }, e.getInstance = function() {
            return this.instance_ || (this.instance_ = new e), this.instance_;
        }, e.instance_ = null, e;
    }(), sn = function(e, t) {
        for (var n = 0, i = Object.keys(t); n < i.length; n++) {
            var o = i[n];
            Object.defineProperty(e, o, {
                value: t[o],
                enumerable: !1,
                writable: !1,
                configurable: !0
            });
        }
        return e;
    }, an = function(e) {
        return e && e.ownerDocument && e.ownerDocument.defaultView || en;
    }, ln = pn(0, 0, 0, 0);
    function cn(e) {
        return parseFloat(e) || 0;
    }
    function un(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        return t.reduce((function(t, n) {
            return t + cn(e["border-" + n + "-width"]);
        }), 0);
    }
    function dn(e) {
        var t = e.clientWidth, n = e.clientHeight;
        if (!t && !n) return ln;
        var i = an(e).getComputedStyle(e), o = function(e) {
            for (var t = {}, n = 0, i = [ "top", "right", "bottom", "left" ]; n < i.length; n++) {
                var o = i[n], r = e["padding-" + o];
                t[o] = cn(r);
            }
            return t;
        }(i), r = o.left + o.right, s = o.top + o.bottom, a = cn(i.width), l = cn(i.height);
        if ("border-box" === i.boxSizing && (Math.round(a + r) !== t && (a -= un(i, "left", "right") + r), 
        Math.round(l + s) !== n && (l -= un(i, "top", "bottom") + s)), !function(e) {
            return e === an(e).document.documentElement;
        }(e)) {
            var c = Math.round(a + r) - t, u = Math.round(l + s) - n;
            1 !== Math.abs(c) && (a -= c), 1 !== Math.abs(u) && (l -= u);
        }
        return pn(o.left, o.top, a, l);
    }
    var hn = "undefined" != typeof SVGGraphicsElement ? function(e) {
        return e instanceof an(e).SVGGraphicsElement;
    } : function(e) {
        return e instanceof an(e).SVGElement && "function" == typeof e.getBBox;
    };
    function fn(e) {
        return Jt ? hn(e) ? function(e) {
            var t = e.getBBox();
            return pn(0, 0, t.width, t.height);
        }(e) : dn(e) : ln;
    }
    function pn(e, t, n, i) {
        return {
            x: e,
            y: t,
            width: n,
            height: i
        };
    }
    var vn = function() {
        function e(e) {
            this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = pn(0, 0, 0, 0), 
            this.target = e;
        }
        return e.prototype.isActive = function() {
            var e = fn(this.target);
            return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
        }, e.prototype.broadcastRect = function() {
            var e = this.contentRect_;
            return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
        }, e;
    }(), _n = function(e, t) {
        var n = function(e) {
            var t = e.x, n = e.y, i = e.width, o = e.height, r = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, s = Object.create(r.prototype);
            return sn(s, {
                x: t,
                y: n,
                width: i,
                height: o,
                top: n,
                right: t + i,
                bottom: o + n,
                left: t
            }), s;
        }(t);
        sn(this, {
            target: e,
            contentRect: n
        });
    }, gn = function() {
        function e(e, t, n) {
            if (this.activeObservations_ = [], this.observations_ = new Qt, "function" != typeof e) throw new TypeError("The callback provided as parameter 1 is not a function.");
            this.callback_ = e, this.controller_ = t, this.callbackCtx_ = n;
        }
        return e.prototype.observe = function(e) {
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof an(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) || (t.set(e, new vn(e)), this.controller_.addObserver(this), this.controller_.refresh());
            }
        }, e.prototype.unobserve = function(e) {
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e instanceof an(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                var t = this.observations_;
                t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this));
            }
        }, e.prototype.disconnect = function() {
            this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
        }, e.prototype.gatherActive = function() {
            var e = this;
            this.clearActive(), this.observations_.forEach((function(t) {
                t.isActive() && e.activeObservations_.push(t);
            }));
        }, e.prototype.broadcastActive = function() {
            if (this.hasActive()) {
                var e = this.callbackCtx_, t = this.activeObservations_.map((function(e) {
                    return new _n(e.target, e.broadcastRect());
                }));
                this.callback_.call(e, t, e), this.clearActive();
            }
        }, e.prototype.clearActive = function() {
            this.activeObservations_.splice(0);
        }, e.prototype.hasActive = function() {
            return this.activeObservations_.length > 0;
        }, e;
    }(), mn = "undefined" != typeof WeakMap ? new WeakMap : new Qt, bn = function e(t) {
        if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        var n = rn.getInstance(), i = new gn(t, n, this);
        mn.set(this, i);
    };
    [ "observe", "unobserve", "disconnect" ].forEach((function(e) {
        bn.prototype[e] = function() {
            var t;
            return (t = mn.get(this))[e].apply(t, arguments);
        };
    }));
    var yn = void 0 !== en.ResizeObserver ? en.ResizeObserver : bn;
    function wn(e, t) {
        const n = e && e.current, i = ne(null), o = oe((() => {
            e && e.current && i.current && i.current.observe(e.current);
        }), []);
        ee((() => (i && i.current && n && i.current.unobserve(n), i.current = new yn(t), 
        o(), () => {
            i && i.current && e && e.current && i.current.unobserve(e.current);
        })), [ n, t ]);
    }
    function xn({middleware: e, placement: t, strategy: n} = {}) {
        const i = ne(null), o = ne(null), [r, s] = Q({
            x: null,
            y: null,
            strategy: null != n ? n : "absolute",
            placement: "bottom",
            middlewareData: {}
        }), a = function(e) {
            const t = ne(e);
            return te((() => {
                t.current = e;
            })), t;
        }(e), l = oe((() => {
            i.current && o.current && Xt(i.current, o.current, {
                middleware: a.current,
                placement: t,
                strategy: n
            }).then(s);
        }), [ a, t, n ]);
        te(l, [ l ]), wn(o, l);
        const c = oe((e => {
            i.current = e, l();
        }), [ l ]), u = oe((e => {
            o.current = e, l();
        }), [ l ]);
        return ie((() => Object.assign(Object.assign({}, r), {
            update: l,
            reference: c,
            floating: u,
            refs: {
                reference: i,
                floating: o
            }
        })), [ r, l, c, u ]);
    }
    function kn(e) {
        if (e.length < 3) return e;
        const t = [];
        for (let n = 0; n < e.length - 2; n++) {
            const i = e[n], o = i.startMs + i.durationMs, r = e[n + 1];
            r.startMs - o < 500 ? t.push(Object.assign(Object.assign({}, i), {
                durationMs: r.startMs - i.startMs
            })) : t.push(i);
        }
        return t;
    }
    function Tn(e) {
        return Boolean(e && "startMs" in e);
    }
    const Sn = (e, t) => {
        const n = Tn(e[0]);
        let i = 0;
        return e.reduce(((o, r, s) => {
            const a = e[s + 1], l = o[o.length - 1], c = (null == l ? void 0 : l.alignRange.end) || 0, u = c + r.text.length;
            if (o.push(Object.assign(Object.assign({}, r), {
                id: i++,
                alignRange: {
                    start: c,
                    end: u
                }
            })), n && a) {
                const e = r, n = a, s = i++, l = e.startMs + e.durationMs, c = n.startMs ? n.startMs - l : t - l;
                o.push(((e, t, n, i) => ({
                    text: " ",
                    startMs: t,
                    durationMs: n,
                    id: e,
                    alignRange: {
                        start: i,
                        end: i + 1
                    }
                }))(s, l, c, u));
            }
            return o;
        }), []);
    }, En = e => {
        let t = 0;
        return e.trim().split(Ze).reduce(((e, n) => {
            if (n.length) {
                const i = e[e.length - 1], o = (null == i ? void 0 : i.alignRange.end) || 0, r = o + n.length;
                e.push({
                    text: n,
                    id: t++,
                    alignRange: {
                        start: o,
                        end: r
                    }
                });
            }
            return e;
        }), []);
    };
    function Cn(e, t) {
        const n = Math.floor(t.durationMs / e.length), i = t.startMs + t.durationMs;
        return e.map(((o, r) => {
            const s = r === e.length - 1, a = t.startMs + n * r, l = s ? i - a : n;
            return Object.assign(Object.assign({}, o), {
                startMs: a,
                durationMs: l
            });
        }));
    }
    const Pn = e => " " === (null == e ? void 0 : e.text) || "\t" === (null == e ? void 0 : e.text);
    function On(e) {
        return e.map((e => e.tokens ? Object.assign(Object.assign({}, e), {
            tokens: e.tokens.filter(((e, t, n) => {
                if (Pn(e)) {
                    const e = 0 === t, i = t === n.length - 1, o = Pn(n[t - 1]);
                    if (e || i || o) return !1;
                }
                return !0;
            }))
        }) : e));
    }
    const An = async (e, t) => {
        if (e && null !== e.data) {
            if ("number" == typeof e.data) return (async (e, t) => {
                let n;
                try {
                    n = (await t.getLocalTracks())[e];
                } catch (e) {}
                if (!n) return;
                const i = await t.fetchSubtitles(n), o = null == i ? void 0 : i.data;
                return o ? {
                    subtitlesItems: t.formatSubtitles(o),
                    languageCode: n.languageCode
                } : void 0;
            })(e.data, t);
            return {
                subtitlesItems: (e => {
                    var t;
                    try {
                        const n = JSON.parse(e).subtitles, i = [];
                        for (const e of n) {
                            const n = e.startMs + e.durationMs;
                            let o;
                            o = (null === (t = e.tokens) || void 0 === t ? void 0 : t.length) ? Sn(e.tokens, n) : Cn(En(e.text), e), 
                            i.push(Object.assign(Object.assign({}, e), {
                                tokens: o
                            }));
                        }
                        return i;
                    } catch (e) {
                        return;
                    }
                })(e.data),
                languageCode: e.lang
            };
        }
    };
    function Mn() {
        const e = rt(), {dispatch: t} = nt(), n = function() {
            const e = rt(), [t, n] = Q(e.video.subtitlesData);
            return te((() => (e.video.on("subtitlesDataChanged", n), () => {
                e.video.off("subtitlesDataChanged", n);
            })), []), t;
        }();
        var i;
        i = async () => {
            const i = await An(n, e.subtitlesService);
            if (!i) return;
            const {subtitlesItems: o, languageCode: r} = i;
            o && r && (t("setSubtitleItems", (e => {
                let t = e;
                return [ On, kn ].forEach((e => {
                    t = e(t);
                })), t;
            })(o)), t("setSelectedSubtitleTrack", {
                languageCode: r
            }));
        }, ee((() => {
            i();
        }), [ n ]);
    }
    var Rn = {
        exports: {}
    }, Ln = {};
    function Dn(e) {
        function t(t, o, r, s) {
            var a = o ? n + t + e.e + o : n + t, l = a;
            if (r) {
                var c = " " + l + e.m;
                for (var u in r) if (r.hasOwnProperty(u)) {
                    var d = r[u];
                    !0 === d ? l += c + u : d && (l += c + u + i + d);
                }
            }
            if (void 0 !== s) for (var h = 0, f = s.length; h < f; h++) {
                var p = s[h];
                if (p && "string" == typeof p.valueOf()) for (var v = p.valueOf().split(" "), _ = 0; _ < v.length; _++) {
                    var g = v[_];
                    g !== a && (l += " " + g);
                }
            }
            return l;
        }
        var n = e.n || "", i = e.v || e.m;
        return function(e, n) {
            return function(i, o, r) {
                return "string" == typeof i ? Array.isArray(o) ? t(e, i, void 0, o) : t(e, i, o, r) : t(e, n, i, o);
            };
        };
    }
    Object.defineProperty(Ln, "__esModule", {
        value: !0
    });
    var In = Dn({
        e: "-",
        m: "_"
    });
    Ln.cn = In, Ln.withNaming = Dn, Rn.exports = Ln;
    const Nn = Rn.exports.cn("DraggablePanel");
    function Hn(e, t, n) {
        return e > n ? n : e < t ? t : e;
    }
    function jn(e, t) {
        return 0 === e || 0 === t ? 0 : e / t * 100;
    }
    function Bn(e, t) {
        return {
            width: e.offsetWidth - t.offsetWidth,
            height: e.offsetHeight - t.offsetHeight
        };
    }
    const Vn = pe((e => {
        const {children: t, limitToBottomBound: n, onPositionChanged: i, onDragStart: o, onDragEnd: r} = e, s = ne(null), a = ne(null), l = ne(null), [c, u] = Q(!1), [d, h] = Q({
            x: 50,
            y: 100
        }), [f, p] = Q({
            x: 0,
            y: 0
        }), v = ne({
            x: 0,
            y: 0
        }), _ = oe((e => {
            e.preventDefault();
            const t = s.current, n = a.current;
            if (!t || !n) return;
            const i = t.getBoundingClientRect(), o = Bn(t, n), r = function(e, t, n) {
                return {
                    x: e.pageX - t.left - n.x,
                    y: e.pageY - t.top - n.y
                };
            }(e, i, v.current), l = jn(r.x, o.width), c = jn(r.y, o.height);
            h({
                x: l,
                y: c
            });
        }), []), g = oe((() => {
            const e = s.current, t = a.current;
            if (!e || !t) return;
            const i = e.getBoundingClientRect(), o = Bn(e, t), r = o.width / 100 * d.x, l = o.height / 100 * d.y, c = Hn(r, 0, o.width), u = window.innerHeight - i.bottom, h = Hn(l, 0, n ? e.offsetHeight : e.offsetHeight + u);
            p({
                x: Math.round(c),
                y: Math.round(h)
            });
        }), [ d.x, d.y ]);
        te(g, [ g ]), wn(s, g), wn(a, g), te(i, [ f.x, f.y ]);
        const m = oe((e => {
            u(!1);
            const t = e.target;
            null == r || r(f), t.removeEventListener("pointermove", _), t.releasePointerCapture(e.pointerId);
        }), [ _, r, f ]), b = oe((e => {
            const t = a.current, n = e.target;
            if (!t) return;
            const i = t.getBoundingClientRect();
            v.current = {
                x: e.pageX - i.x,
                y: e.pageY - i.y
            }, u(!0), null == o || o(f), n.addEventListener("pointermove", _), n.setPointerCapture(e.pointerId);
        }), [ o, f ]);
        return V("div", Object.assign({
            ref: s,
            className: Nn({
                isDragging: c
            })
        }, {
            children: V("div", Object.assign({
                className: Nn("Box"),
                ref: a,
                style: {
                    transform: `translate3d(${f.x}px, ${f.y}px, 0)`
                }
            }, {
                children: V("div", Object.assign({
                    ref: l,
                    className: Nn("BoxIn"),
                    onPointerDown: b,
                    onPointerUp: m
                }, {
                    children: t
                }), void 0)
            }), void 0)
        }), void 0);
    })), Wn = Rn.exports.cn("Popover"), Un = ({style: e, innerRef: t, children: n}) => V("div", Object.assign({
        ref: t,
        className: Wn(),
        style: e
    }, {
        children: n
    }), void 0);
    var $n, zn;
    !function(e) {
        e.ABSOLUTE = "absolute", e.FIXED = "fixed";
    }($n || ($n = {})), function(e) {
        e.ACTIVE = "active", e.PASSED = "passed", e.UPCOMING = "upcoming";
    }(zn || (zn = {}));
    const Gn = Rn.exports.cn("Subtitles"), Fn = ({backgroundRef: e, containerRef: t}) => {
        const n = ne(null), [i, o] = Q();
        return te((() => {
            const e = t.current;
            if (!e) return;
            const n = () => {
                const {width: t, height: n} = e.getBoundingClientRect();
                return {
                    width: t,
                    height: n,
                    top: e.offsetTop,
                    position: "absolute",
                    left: 0,
                    background: "rgba(22, 23, 31)",
                    borderRadius: "0.375em"
                };
            };
            o(n());
            const i = new yn((() => {
                o(n());
            }));
            return i.observe(e), () => {
                i.disconnect();
            };
        }), []), e.current ? Te(V("div", {
            ref: n,
            style: i
        }, void 0), e.current) : null;
    };
    const Zn = Rn.exports.cn("SubtitlesToken"), qn = e => {
        var {text: t, isSelected: n, isActive: i, isPassed: o, isTranslatable: r, isInSelectedGroup: s, isPrevHighlighted: a, isNextHighlighted: l, isInHoveredGroup: c} = e, u = function(e, t) {
            var n = {};
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (i = Object.getOwnPropertySymbols(e); o < i.length; o++) t.indexOf(i[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[o]) && (n[i[o]] = e[i[o]]);
            }
            return n;
        }(e, [ "text", "isSelected", "isActive", "isPassed", "isTranslatable", "isInSelectedGroup", "isPrevHighlighted", "isNextHighlighted", "isInHoveredGroup" ]);
        return V("span", Object.assign({
            className: Zn({
                isSelected: n,
                isActive: i,
                isPassed: o,
                isTranslatable: r,
                isInSelectedGroup: s,
                isInHoveredGroup: c,
                isPrevHighlighted: a,
                isNextHighlighted: l
            })
        }, u, {
            children: t
        }), void 0);
    };
    function Kn(e, t) {
        const {subtitlesBridge: n, subtitleItems: i} = t, o = n.video.player.currentTime, r = n.subtitlesService.getCurrentSubtitle(i, o), s = r ? n.subtitlesService.getActiveTokenTime(r, o) : void 0, a = r !== e.currentSubtitle, l = s !== e.activeTokenTime;
        return a || l ? {
            currentSubtitle: r,
            activeTokenTime: s
        } : e;
    }
    function Yn() {
        const e = rt(), {subtitleItems: t, isPaused: n, seekedTime: i} = nt("subtitleItems", "isPaused", "seekedTime"), [o, r] = J(Kn, {}), {play: s, stop: a} = function(e, t) {
            const n = ne(), i = oe((() => {
                e(), o();
            }), t), o = oe((() => {
                n.current = requestAnimationFrame(i);
            }), [ i ]), r = oe((() => {
                n.current && cancelAnimationFrame(n.current);
            }), []);
            return ie((() => ({
                play: o,
                stop: r
            })), [ o, r ]);
        }((() => {
            r({
                subtitlesBridge: e,
                subtitleItems: t
            });
        }), [ t ]);
        return ee((() => (n ? a() : s(), r({
            subtitlesBridge: e,
            subtitleItems: t
        }), () => {
            a();
        })), [ s, a, n, i ]), o;
    }
    const Xn = (e, t) => {
        const n = function() {
            const e = ne(!0);
            return e.current ? (e.current = !1, !0) : e.current;
        }();
        te((() => {
            if (!n) return e();
        }), t);
    };
    const Qn = document.createElement("canvas").getContext("2d");
    function Jn(e, t, n) {
        var i, o;
        if (!e) return;
        const r = function() {
            const e = ne({});
            return oe((t => {
                let n = 0;
                const i = t.text.split("");
                for (const t of i) e.current[t] || (e.current[t] = (o = t, Qn.measureText(o).width / 10)), 
                n += e.current[t];
                var o;
                return n;
            }), []);
        }(), s = function(e, t, n) {
            return ie((() => {
                if (!t) return;
                const i = [];
                let o = 0;
                for (const r of e.tokens) {
                    const e = n(r), s = o + e <= t;
                    "\n" === r.text ? (i.push([]), o = 0) : s || Pn(r) ? (i.length || i.push([]), i[i.length - 1].push(r), 
                    o += e) : (i.push([ r ]), o = e);
                }
                return i;
            }), [ e, t ]);
        }(e, (null !== (o = null === (i = n.current) || void 0 === i ? void 0 : i.offsetWidth) && void 0 !== o ? o : 0) / rt().size * .8, r);
        if (!t || !s) return s;
        return function(e, t, n) {
            return ie((() => {
                if (!e) return t;
                for (const t of e) {
                    const {start: e, end: i} = t;
                    if (void 0 !== e && void 0 !== i && n >= e && n <= i) return t.lines.map((e => e.map((e => Object.assign(Object.assign({}, e), {
                        alignRange: {
                            start: e.alignRange.start - t.alignStart,
                            end: e.alignRange.end - t.alignStart
                        }
                    })))));
                }
            }), [ t, e, n ]);
        }(function(e, t) {
            return ie((() => {
                const n = t.startMs + t.durationMs, i = [];
                for (let t = 0; t < e.length; t += 2) {
                    const o = e.slice(t, t + 2), r = o[0], s = null == r ? void 0 : r[0], a = o[o.length - 1], l = null == a ? void 0 : a[a.length - 1];
                    if (!s || !l) return;
                    const c = Tn(l) ? l.startMs + l.durationMs : void 0, u = Tn(s) ? s.startMs : void 0, d = t + 2 >= e.length;
                    i.push({
                        lines: o,
                        end: d ? n : c,
                        start: u,
                        alignStart: s.alignRange.start
                    });
                }
                return i;
            }), [ e ]);
        }(s, e), s, t);
    }
    function ei(e, t) {
        return !(!e || e.length < 2) && e.some((e => Ye(t.alignRange, e)));
    }
    function ti(e, t) {
        return !(!e.isInSelectedGroup || !(null == t ? void 0 : t.isInSelectedGroup)) || !(!e.isInHoveredGroup || !(null == t ? void 0 : t.isInHoveredGroup));
    }
    Qn.font = "10px YS Text, sans-serif";
    const ni = pe((({innerRef: e, dragDeltaRef: t}) => {
        const n = ne(null), i = ne(null), o = function(e) {
            const {dispatch: t, selectedData: n, selectedSubtitleTrack: i} = nt("selectedData", "selectedSubtitleTrack"), o = rt(), r = ie((() => Boolean(i && !Ge.includes(i.languageCode))), [ i ]), s = !ze, a = ne(), l = ne();
            return ee((() => {
                n || ((a.current || l.current) && o.video.player.play(), a.current = void 0, l.current = void 0);
            }), [ n ]), {
                isTranslatable: r,
                handleClick: (i, s, c) => {
                    var u;
                    r && (e.current && e.current > 20 || ((null == n ? void 0 : n.token.id) === i.id ? t("setSelectedData", void 0) : (void 0 === a.current && (l.current = null !== (u = l.current) && void 0 !== u ? u : o.video.player.isPlaying, 
                    o.video.player.pause()), t("setSelectedData", {
                        token: i,
                        tokens: s,
                        fullPhrase: c
                    }))));
                },
                handleMouseEnter: e => {
                    var n;
                    t("setHoveredToken", e), s && r && (null !== (n = a.current) && void 0 !== n || (a.current = o.video.player.isPlaying), 
                    o.video.player.pause());
                },
                handleMouseLeave: () => {
                    t("setHoveredToken", void 0), r && (n || (a.current && o.video.player.play(), a.current = void 0));
                }
            };
        }(t), r = function() {
            const e = rt(), [t, n] = Q(e.video.karaokeEnabled);
            return te((() => (e.video.on("karaokeEnabledChanged", n), () => {
                e.video.off("karaokeEnabledChanged", n);
            })), []), t;
        }(), {selectedData: s, hoveredAligns: a, selectedAligns: l, dispatch: c} = nt("selectedData", "hoveredAligns", "selectedAligns"), {currentSubtitle: u, activeTokenTime: d} = Yn(), h = Jn(u, d, i), f = function(e) {
            return ie((() => null == e ? void 0 : e.flat()), [ e ]);
        }(h), p = function(e) {
            return ie((() => {
                const t = null == e ? void 0 : e.map((e => e.map((e => e.text)).join("").trim()));
                return null == t ? void 0 : t.join("\n");
            }), [ e ]);
        }(h);
        Xn((() => {
            c("setSelectedData", void 0);
        }), [ p ]);
        const v = u && h && f && p;
        return V("div", Object.assign({
            className: Gn(),
            ref: (_ = [ i, e ], function(e) {
                _.forEach((t => {
                    "function" == typeof t ? t(e) : null != t && (t.current = e);
                }));
            })
        }, {
            children: V("div", Object.assign({
                className: Gn("Content")
            }, {
                children: [ V("div", {
                    className: Gn("Background"),
                    ref: n
                }, void 0), V("div", Object.assign({
                    className: Gn("Lines")
                }, {
                    children: v && h.map((e => e.length ? V(ii, {
                        visibleLinesTokens: f,
                        currentLineTokens: e,
                        tokenHandlers: o,
                        selectedData: s,
                        activeTokenTime: d,
                        fullPhrase: p,
                        backgroundRef: n,
                        hoveredAligns: a,
                        selectedAligns: l,
                        isKaraokeEnabled: r
                    }, e[0].id) : null))
                }), void 0) ]
            }), void 0)
        }), void 0);
        var _;
    })), ii = ({currentLineTokens: e, visibleLinesTokens: t, tokenHandlers: n, selectedData: i, activeTokenTime: o, fullPhrase: r, backgroundRef: s, hoveredAligns: a, selectedAligns: l, isKaraokeEnabled: c}) => {
        const u = ne(null), d = ie((() => et(a, "source")), [ a ]), h = ie((() => et(l, "source")), [ l ]), f = ie((() => e.map((e => ({
            token: e,
            isInSelectedGroup: ei(h, e),
            isInHoveredGroup: ei(d, e)
        })))), [ e, d, h ]);
        return V("div", Object.assign({
            className: Gn("Line"),
            ref: u
        }, {
            children: [ V(Fn, {
                backgroundRef: s,
                containerRef: u
            }, void 0), f.map(((e, s) => {
                var a, l;
                const {token: u, isInSelectedGroup: d, isInHoveredGroup: h} = e;
                if (" " === u.text) return u.text;
                const p = " " === (null === (a = f[s + 1]) || void 0 === a ? void 0 : a.token.text) ? f[s + 2] : f[s + 1], v = ti(e, " " === (null === (l = f[s - 1]) || void 0 === l ? void 0 : l.token.text) ? f[s - 2] : f[s - 1]), _ = ti(e, p), g = Tn(u), m = c && g && function(e, t) {
                    if (!e || !t) return;
                    const n = e.startMs, i = e.startMs + e.durationMs;
                    return t >= n && t <= i ? zn.ACTIVE : t > i ? zn.PASSED : t < n ? zn.UPCOMING : void 0;
                }(u, o);
                return V(qn, {
                    text: u.text,
                    isTranslatable: n.isTranslatable,
                    onClick: () => {
                        n.handleClick(u, t, r);
                    },
                    onMouseEnter: () => {
                        n.handleMouseEnter(u);
                    },
                    onMouseLeave: n.handleMouseLeave,
                    isActive: m === zn.ACTIVE,
                    isPassed: m === zn.PASSED,
                    isSelected: (null == i ? void 0 : i.token.id) === u.id,
                    isInSelectedGroup: d,
                    isInHoveredGroup: h,
                    isPrevHighlighted: v,
                    isNextHighlighted: _
                }, u.id);
            })) ]
        }), void 0);
    }, oi = Rn.exports.cn("VideoContainer"), ri = Rn.exports.cn("Overlay");
    const si = ({onClick: e}) => {
        const [t, n] = ie((() => {
            const e = re(st), t = document.createElement("div");
            t.className = "ya-subtitles-widget-overlay";
            const n = t.attachShadow({
                mode: e
            }), i = document.createElement("div");
            return n.appendChild(i), [ t, i ];
        }), []);
        return te((() => (document.documentElement.append(t), () => {
            t.remove();
        })), []), Te(V(g, {
            children: [ V("style", {
                children: ".Overlay{bottom:0;left:0;pointer-events:all;position:fixed;right:0;top:0}"
            }, void 0), V("div", {
                className: ri(),
                onClick: e,
                style: {
                    zIndex: 2147483646
                }
            }, void 0) ]
        }, void 0), n);
    }, ai = Rn.exports.cn("Translate"), li = Rn.exports.cn("Skeleton"), ci = e => {
        const {lines: t} = e, n = ie((() => null == t ? void 0 : t.reduce(((e, t, n) => {
            const i = e[n - 1], o = (1.2 - 1) / 2;
            return e.push({
                width: 1 * t.length * .5,
                height: 1,
                top: i ? i.top + i.height + i.marginBottom + o : o,
                marginBottom: o
            }), e;
        }), [])), [ t ]);
        if (!n) return null;
        const i = Math.max(...n.map((e => e.width))), o = 1.2 * n.length;
        return V("svg", Object.assign({
            className: li(),
            role: "img",
            width: `${i}em`,
            height: `${o}em`,
            "aria-labelledby": "loading-aria",
            preserveAspectRatio: "none",
            xmlns: "http://www.w3.org/2000/svg"
        }, {
            children: [ V("rect", {
                x: "0",
                y: "0",
                width: "100%",
                height: "100%",
                "clip-path": "url(#phrase-skeleton-clip-path)",
                style: 'fill: url("#phrase-skeleton-fill");'
            }, void 0), V("defs", {
                children: [ V("clipPath", Object.assign({
                    id: "phrase-skeleton-clip-path"
                }, {
                    children: n.map((e => V("rect", {
                        x: "0",
                        y: `${e.top}em`,
                        rx: "6",
                        ry: "6",
                        width: `${e.width}em`,
                        height: `${e.height}em`
                    }, void 0)))
                }), void 0), V("linearGradient", Object.assign({
                    id: "phrase-skeleton-fill"
                }, {
                    children: [ V("stop", Object.assign({
                        offset: "0.599964",
                        "stop-color": "#f3f3f3",
                        "stop-opacity": "1"
                    }, {
                        children: V("animate", {
                            attributeName: "offset",
                            values: "-2; -2; 1",
                            keyTimes: "0; 0.25; 1",
                            dur: "2s",
                            repeatCount: "indefinite"
                        }, void 0)
                    }), void 0), V("stop", Object.assign({
                        offset: "1.59996",
                        "stop-color": "#ecebeb",
                        "stop-opacity": "1"
                    }, {
                        children: V("animate", {
                            attributeName: "offset",
                            values: "-1; -1; 2",
                            keyTimes: "0; 0.25; 1",
                            dur: "2s",
                            repeatCount: "indefinite"
                        }, void 0)
                    }), void 0), V("stop", Object.assign({
                        offset: "2.59996",
                        "stop-color": "#f3f3f3",
                        "stop-opacity": "1"
                    }, {
                        children: V("animate", {
                            attributeName: "offset",
                            values: "0; 0; 3",
                            keyTimes: "0; 0.25; 1",
                            dur: "2s",
                            repeatCount: "indefinite"
                        }, void 0)
                    }), void 0) ]
                }), void 0) ]
            }, void 0) ]
        }), void 0);
    }, ui = e => {
        const {text: t} = e, n = ie((() => {
            if (t) return {
                width: 1 * t.length * .5,
                height: 1,
                top: 0
            };
        }), [ t ]);
        if (!n) return null;
        const i = n.width, o = n.height;
        return V("svg", Object.assign({
            className: li(),
            role: "img",
            width: `${i}em`,
            height: `${o}em`,
            "aria-labelledby": "loading-aria",
            preserveAspectRatio: "none",
            xmlns: "http://www.w3.org/2000/svg"
        }, {
            children: [ V("rect", {
                x: "0",
                y: "0",
                width: "100%",
                height: "100%",
                "clip-path": "url(#word-skeleton-clip-path)",
                style: 'fill: url("#word-skeleton-fill");'
            }, void 0), V("defs", {
                children: [ V("clipPath", Object.assign({
                    id: "word-skeleton-clip-path"
                }, {
                    children: V("rect", {
                        x: "0",
                        y: `${n.top}em`,
                        rx: "6",
                        ry: "6",
                        width: `${n.width}em`,
                        height: `${n.height}em`
                    }, void 0)
                }), void 0), V("linearGradient", Object.assign({
                    id: "word-skeleton-fill"
                }, {
                    children: [ V("stop", Object.assign({
                        offset: "0.599964",
                        "stop-color": "#f3f3f3",
                        "stop-opacity": "1"
                    }, {
                        children: V("animate", {
                            attributeName: "offset",
                            values: "-2; -2; 1",
                            keyTimes: "0; 0.25; 1",
                            dur: "2s",
                            repeatCount: "indefinite"
                        }, void 0)
                    }), void 0), V("stop", Object.assign({
                        offset: "1.59996",
                        "stop-color": "#ecebeb",
                        "stop-opacity": "1"
                    }, {
                        children: V("animate", {
                            attributeName: "offset",
                            values: "-1; -1; 2",
                            keyTimes: "0; 0.25; 1",
                            dur: "2s",
                            repeatCount: "indefinite"
                        }, void 0)
                    }), void 0), V("stop", Object.assign({
                        offset: "2.59996",
                        "stop-color": "#f3f3f3",
                        "stop-opacity": "1"
                    }, {
                        children: V("animate", {
                            attributeName: "offset",
                            values: "0; 0; 3",
                            keyTimes: "0; 0.25; 1",
                            dur: "2s",
                            repeatCount: "indefinite"
                        }, void 0)
                    }), void 0) ]
                }), void 0) ]
            }, void 0) ]
        }), void 0);
    };
    const di = pe((({text: e, hoveredAligns: t, selectedAligns: n}) => {
        const i = function(e, t) {
            const n = [];
            for (const [i, o] of Object.entries(e)) if (o) for (const e of o) {
                const o = n.find((n => Xe(n.align[t], e[t])));
                o ? o.mods[i] = !0 : n.push({
                    align: e,
                    mods: {
                        [i]: !0
                    }
                });
            }
            return n.sort(((e, n) => e.align[t].start - n.align[t].start)), n;
        }({
            hovered: t,
            selected: n
        }, "destination");
        if (!i) return V(g, {
            children: e
        }, void 0);
        const o = [];
        let r = 0;
        for (const {align: t, mods: n} of i) o.push(e.slice(r, t.destination.start)), o.push(V("span", Object.assign({
            className: ai("Mark", n)
        }, {
            children: e.slice(t.destination.start, t.destination.end)
        }), void 0)), r = t.destination.end;
        return o.push(e.slice(r, e.length)), V(g, {
            children: o
        }, void 0);
    })), hi = new Map([ [ "ru", Object.freeze({
        translationBubbleCommonError: "Перевод сейчас недоступен,<br>попробуйте позже",
        translationBubbleUnsupportedDirectionError: "Перевод на данный язык недоступен",
        translationBubbleRetry: "Повторить перевод"
    }) ], [ "en", Object.freeze({
        translationBubbleCommonError: "Translation error,<br>please try again later",
        translationBubbleUnsupportedDirectionError: "Translation to this language is unavailable",
        translationBubbleRetry: "Try again"
    }) ], [ "uk", Object.freeze({
        translationBubbleCommonError: "Переклад зараз недоступний,<br>спробуйте пізніше",
        translationBubbleUnsupportedDirectionError: "Переклад цією мовою недоступний",
        translationBubbleRetry: "Повторити переклад"
    }) ], [ "kk", Object.freeze({
        translationBubbleCommonError: "Аударма қазір қолжетімсіз,<br>кейінірек байқап көріңіз",
        translationBubbleUnsupportedDirectionError: "Берілген тілге аудару қолжетімсіз",
        translationBubbleRetry: "Аударманы қайталау"
    }) ] ]), fi = (e => {
        var t, n, i;
        const o = null !== (n = null === (t = window.yandex) || void 0 === t ? void 0 : t.i18n) && void 0 !== n ? n : null === (i = window.chrome) || void 0 === i ? void 0 : i.i18n, r = (null == o ? void 0 : o.getUILanguage) ? o.getUILanguage() : navigator.language;
        if (!r) return "en";
        const s = r.toLowerCase().split(";")[0].trim().split(/-|_/)[0];
        for (const t of e) if (!t.has(s)) return "en";
        return s;
    })([ hi ]), pi = hi.get(fi), vi = ({selectedData: e, placement: t}) => {
        const {dispatch: n, wordTranslationResult: i, phraseTranslationResult: o, wordTranslationSource: r, phraseTranslationSource: s, wordTranslationStatus: a, phraseTranslationStatus: l, hoveredAligns: c, selectedAligns: u, selectedSubtitleTrack: d, translationError: h} = nt("wordTranslationResult", "phraseTranslationResult", "wordTranslationSource", "phraseTranslationSource", "wordTranslationStatus", "phraseTranslationStatus", "hoveredAligns", "selectedAligns", "selectedSubtitleTrack", "translationError"), f = function(e, t) {
            const [, n] = J((() => ({})), {}), i = ne(), o = ne(e);
            return e && (o.current = e), ee((() => (e || (i.current = window.setTimeout((() => {
                o.current = e, n({});
            }), t)), () => {
                clearTimeout(i.current);
            })), [ e ]), o.current;
        }(i, 300);
        if (!function(e, t = 300) {
            const [, n] = J((() => ({})), {}), i = ne(), o = ne(Boolean(e));
            return e && !o.current && (o.current = !0), ee((() => (o.current || (i.current = window.setTimeout((() => {
                o.current = !0, n({});
            }), t)), () => {
                clearTimeout(i.current);
            })), []), o.current;
        }(i || o || h, 300)) return null;
        const p = null == d ? void 0 : d.languageCode, v = p ? `&lang=${Ue.getLangPairCode(p, We)}` : "";
        return V("div", Object.assign({
            className: ai({
                placement: t
            })
        }, {
            children: [ V("a", {
                className: ai("Logo"),
                href: `https://translate.yandex.ru/?text=${e.token.text}${v}`,
                target: "_blank",
                rel: "noreferrer"
            }, void 0), V("div", Object.assign({
                className: ai("Body")
            }, {
                children: h ? (t => {
                    const i = (e => {
                        switch (null == e ? void 0 : e.code) {
                          case 501:
                            return {
                                message: pi.translationBubbleUnsupportedDirectionError,
                                allowRetry: !1
                            };

                          case 413:
                          case 422:
                            return {
                                message: pi.translationBubbleCommonError,
                                allowRetry: !1
                            };

                          default:
                            return {
                                message: pi.translationBubbleCommonError,
                                allowRetry: !0
                            };
                        }
                    })(t);
                    return V(g, {
                        children: [ V("p", {
                            className: ai("ErrorLabel"),
                            dangerouslySetInnerHTML: {
                                __html: i.message
                            }
                        }, void 0), i.allowRetry ? V("button", Object.assign({
                            className: ai("Button"),
                            onClick: () => {
                                n("setSelectedData", Object.assign(Object.assign({}, e), {
                                    loadingDelay: 1e3
                                }));
                            }
                        }, {
                            children: pi.translationBubbleRetry
                        }), void 0) : null ]
                    }, void 0);
                })(h) : V(g, {
                    children: [ V("div", Object.assign({
                        className: ai("Header")
                    }, {
                        children: "loading" !== a || f ? V("p", Object.assign({
                            className: ai("Title")
                        }, {
                            children: f
                        }), void 0) : V(ui, {
                            text: r
                        }, void 0)
                    }), void 0), V("p", Object.assign({
                        className: ai("Text")
                    }, {
                        children: "loading" === l ? V(ci, {
                            lines: null == s ? void 0 : s.split("\n")
                        }, void 0) : o ? V(di, {
                            text: o,
                            hoveredAligns: c,
                            selectedAligns: u
                        }, void 0) : null
                    }), void 0) ]
                }, void 0)
            }), void 0) ]
        }), void 0);
    };
    function _i() {
        const e = ne(0), t = ne({
            x: 0,
            y: 0
        }), n = oe((e => {
            t.current = e;
        }), []), i = oe((n => {
            e.current = function(e, t) {
                return Math.sqrt((e.x - t.x) ** 2 + (e.y - t.y) ** 2);
            }(n, t.current), t.current = n;
        }), []);
        return {
            ref: e,
            onDragStart: n,
            onDragEnd: i
        };
    }
    const gi = [ "fullscreenchange", "webkitfullscreenchange" ], mi = () => document.fullscreenElement || document.webkitFullscreenElement;
    var bi, yi;
    !function(e) {
        e.HIDDEN = "hidden", e.AVAILABLE = "available", e.PROCESSING = "processing", e.FORCED_PROCESSING = "forced_processing", 
        e.ACTIVATED = "activated", e.ERROR = "error", e.NO_TRANSLATION = "no_translation", 
        e.IN_QUEUE = "in_queue", e.OTHER_ERROR = "other_error";
    }(bi || (bi = {})), function(e) {
        e.PORTRAIT = "portrait", e.LANDSCAPE = "landscape";
    }(yi || (yi = {}));
    const wi = () => Boolean(mi()) || window.self !== window.top ? "top" : (window.innerWidth < window.innerHeight ? yi.PORTRAIT : yi.LANDSCAPE) === yi.PORTRAIT ? "bottom" : "top";
    const xi = () => {
        const e = rt(), t = ne(null), n = function() {
            const [e, t] = Q(wi());
            return ee((() => {
                const e = () => {
                    t(wi());
                };
                return gi.forEach((t => {
                    document.addEventListener(t, e);
                })), window.addEventListener("resize", e), () => {
                    gi.forEach((t => {
                        document.removeEventListener(t, e);
                    })), window.removeEventListener("resize", e);
                };
            }), []), e;
        }();
        Mn();
        const i = xn({
            placement: n,
            middleware: [ (void 0 === o && (o = {}), {
                name: "shift",
                options: o,
                async fn(e) {
                    const {x: t, y: n, placement: i} = e, {mainAxis: r = !0, crossAxis: s = !1, limiter: a = {
                        fn: e => {
                            let {x: t, y: n} = e;
                            return {
                                x: t,
                                y: n
                            };
                        }
                    }, ...l} = o, c = {
                        x: t,
                        y: n
                    }, u = await pt(e, l), d = ut(lt(i)), h = "x" === d ? "y" : "x";
                    let f = c[d], p = c[h];
                    if (r) {
                        const e = "y" === d ? "bottom" : "right";
                        f = gt(f + u["y" === d ? "top" : "left"], f, f - u[e]);
                    }
                    if (s) {
                        const e = "y" === h ? "bottom" : "right";
                        p = gt(p + u["y" === h ? "top" : "left"], p, p - u[e]);
                    }
                    const v = a.fn({
                        ...e,
                        [d]: f,
                        [h]: p
                    });
                    return {
                        ...v,
                        data: {
                            x: v.x - t,
                            y: v.y - n
                        }
                    };
                }
            }), kt(e.styles.popupOffset), xt({
                boundary: t.current || void 0,
                padding: e.styles.popupOverflowPadding
            }) ]
        });
        var o;
        const {dispatch: r, selectedData: s} = nt("selectedData"), a = oe((() => {
            r("setSelectedData", void 0);
        }), []);
        ee((() => {
            r("setIsPaused", e.video.player.isPaused);
            const t = e => {
                e || r("setSelectedData", void 0), r("setIsPaused", e);
            };
            return e.video.player.on("pausedChanged", t), () => {
                e.video.player.off("pausedChanged", t);
            };
        }), []), ee((() => {
            r("setSeekedTime", e.video.player.currentTime);
            const t = e => {
                r("setSeekedTime", e);
            };
            return e.video.player.on("seekedToTime", t), () => {
                e.video.player.off("seekedToTime", t);
            };
        }), []);
        const l = _i(), c = ie((() => {
            if (ze) return [ "touch" ];
        }), []);
        return V("div", Object.assign({
            className: oi(null, c)
        }, {
            children: V("div", Object.assign({
                ref: t,
                className: oi("DraggableArea"),
                style: e.styles.containerOffset
            }, {
                children: [ s && V(g, {
                    children: [ V(si, {
                        onClick: a
                    }, void 0), V(Un, Object.assign({
                        innerRef: i.floating,
                        style: {
                            position: i.strategy,
                            transform: `translate(${Math.round(i.x || -9999)}px, ${Math.round(i.y || -9999)}px)`
                        }
                    }, {
                        children: V(vi, {
                            selectedData: s,
                            placement: i.placement
                        }, void 0)
                    }), void 0) ]
                }, void 0), V(Vn, Object.assign({
                    onPositionChanged: i.update,
                    limitToBottomBound: "videoContainer" === e.dragArea,
                    onDragStart: l.onDragStart,
                    onDragEnd: l.onDragEnd
                }, {
                    children: V(ni, {
                        innerRef: i.reference,
                        dragDeltaRef: l.ref
                    }, void 0)
                }), void 0) ]
            }), void 0)
        }), void 0);
    }, ki = ({subtitlesBridge: e, shadowRootMode: t}) => {
        const n = ie((() => (e => {
            let t = {}, n = {}, i = {
                dispatch(e, o) {
                    if ("@dispatch" !== e && i.dispatch("@dispatch", [ e, o, t[e] ]), t[e]) {
                        let r;
                        t[e].forEach((s => {
                            let a = t[e].includes(s) && s(n, o, i);
                            a && "function" != typeof a.then && (n = {
                                ...n,
                                ...a
                            }, r = {
                                ...r,
                                ...a
                            });
                        })), r && i.dispatch("@changed", r);
                    }
                },
                get: () => n,
                on: (e, n) => ((t[e] || (t[e] = [])).push(n), () => {
                    t[e] = t[e].filter((e => e !== n));
                })
            };
            return e.forEach((e => {
                e && e(i);
            })), i.dispatch("@init"), i;
        })([ tt() ])), []);
        return V(at, Object.assign({
            value: t
        }, {
            children: V(ot, Object.assign({
                value: e
            }, {
                children: V(Ne.Provider, Object.assign({
                    value: n
                }, {
                    children: V(xi, {}, void 0)
                }), void 0)
            }), void 0)
        }), void 0);
    };
    class Ti extends class {
        constructor(e) {
            this.size = 0, this.dragArea = "videoContainer", this.video = e;
            const {Styles: t, SubtitlesService: n} = this.getComponents();
            this.styles = new t, this.subtitlesService = new n;
        }
    } {}
    function Si(e) {
        const t = `subtitles-${Date.now()}`;
        return new Promise((n => {
            const i = function(e, t = document.body) {
                const n = document.createElement("script");
                return n.text = e, t.appendChild(n), () => {
                    n.remove();
                };
            }(`\n      (function() {\n        const evaluatedScript = (${e})()\n\n        if (evaluatedScript instanceof Promise) {\n          evaluatedScript.then(response => {\n            window.postMessage({\n              messageId: '${t}',\n              response,\n            }, "*");\n          });\n        }\n      })();\n    `), o = e => {
                if (e.data.messageId === t) {
                    const {source: t, data: {response: r}} = e;
                    if (t !== window) return;
                    window.removeEventListener("message", o), i(), n(r);
                }
            };
            window.addEventListener("message", o);
        }));
    }
    function Ei(e) {
        let t = e;
        for (;t; ) {
            if ("fixed" === getComputedStyle(t).position) return !0;
            t = t.parentElement;
        }
        return !1;
    }
    class Ci {
        constructor() {
            this.listeners = new Map;
        }
        on(e, t) {
            const n = this.listeners.get(e);
            n ? n.push(t) : this.listeners.set(e, [ t ]);
        }
        off(e, t) {
            const n = this.listeners.get(e);
            n && n.splice(n.indexOf(t), 1);
        }
        emit(e, t) {
            const n = this.listeners.get(e);
            n && n.slice().map((e => {
                e(t);
            }));
        }
    }
    class Pi extends Ci {
        constructor(e) {
            super(), this.handleisPausedChange = () => {
                this.emit("pausedChanged", this.isPaused);
            }, this.handleSeeked = () => {
                this.emit("seekedToTime", this.currentTime);
            }, this.handleContainerResized = () => {
                this.positionStrategy = Ei(this.videoElement) ? $n.FIXED : $n.ABSOLUTE, this.handleContainerPositionChange();
            }, this.handleContainerPositionChange = () => {
                this.emit("positionChanged", this.getPosition());
            }, this.videoElement = e, this.resizeObserver = new yn(this.handleContainerResized), 
            this.positionStrategy = Ei(e) ? $n.FIXED : $n.ABSOLUTE, this.toggleNativeSubtitlesVisibility("hidden"), 
            this.observePlayStatus(), this.observeSeeked(), this.observeContainerPositionChange();
        }
        destroy() {
            this.unobserveContainerPositionChange(), this.unobservePlayStatus(), this.unobserveSeeked();
        }
        pause() {
            this.videoElement.pause();
        }
        play() {
            this.videoElement.play();
        }
        get isPaused() {
            return this.videoElement.paused;
        }
        get isPlaying() {
            return !this.isPaused;
        }
        get currentTime() {
            return this.videoElement ? Math.round(1e3 * this.videoElement.currentTime) : 0;
        }
        set currentTime(e) {
            this.videoElement.currentTime = e / 1e3;
        }
        observePlayStatus() {
            this.videoElement.addEventListener("pause", this.handleisPausedChange), this.videoElement.addEventListener("play", this.handleisPausedChange);
        }
        unobservePlayStatus() {
            this.videoElement.removeEventListener("pause", this.handleisPausedChange), this.videoElement.removeEventListener("play", this.handleisPausedChange);
        }
        observeSeeked() {
            this.videoElement.addEventListener("seeked", this.handleSeeked);
        }
        unobserveSeeked() {
            this.videoElement.removeEventListener("seeked", this.handleSeeked);
        }
        async observeContainerPositionChange() {
            document.addEventListener("scroll", this.handleContainerPositionChange, {
                passive: !0,
                capture: !0
            }), this.resizeObserver.observe(this.getContainer()), this.resizeObserver.observe(document.body);
        }
        unobserveContainerPositionChange() {
            document.removeEventListener("scroll", this.handleContainerPositionChange, {
                capture: !0
            }), this.resizeObserver.disconnect();
        }
        getPosition() {
            const {top: e, left: t, width: n, height: i} = this.getContainer().getBoundingClientRect();
            return "fixed" === this.positionStrategy ? {
                top: e,
                left: t,
                width: n,
                height: i,
                position: this.positionStrategy
            } : {
                top: e + window.scrollY,
                left: t + window.scrollX,
                width: n,
                height: i,
                position: this.positionStrategy
            };
        }
    }
    function Oi() {
        return new Promise((e => {
            const t = document.querySelector("#movie_player");
            t && t.toggleSubtitles && t.toggleSubtitles(), e(!0);
        }));
    }
    class Ai extends Pi {
        getContainer() {
            return this.videoElement.closest(".html5-video-player,#player-container,#player");
        }
        toggleNativeSubtitlesVisibility(e) {
            var t;
            const n = Boolean(null === (t = document.querySelector("#ytp-caption-window-container")) || void 0 === t ? void 0 : t.childNodes.length);
            (n && "hidden" === e || !n && "visible" === e) && Si(Oi);
        }
        isAdvertisement() {
            const e = this.videoElement.closest(".html5-video-player");
            return Boolean(null == e ? void 0 : e.classList.contains("ad-showing"));
        }
    }
    class Mi extends Ai {}
    class Ri extends class {
        constructor() {
            this.popupOverflowPadding = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };
        }
    } {}
    class Li extends Ri {
        constructor() {
            super(...arguments), this.global = "\n    .ytp-subtitles-button,\n    #ytp-caption-window-container {\n      display: none !important;\n    }\n  ", 
            this.containerOffset = {
                top: 50,
                left: 0,
                right: 0,
                bottom: 65
            }, this.popupOffset = 3;
        }
    }
    var Di = async function() {
        var e, t, n, i;
        function o(e) {
            if (!e) return;
            return e.toLowerCase().split(";")[0].trim().split("-")[0];
        }
        async function r(e) {
            return new Promise((t => window.setTimeout(t, e)));
        }
        async function s(e, t) {
            let n = !1;
            return Promise.race([ new Promise((async t => {
                for (;!e() && !n; ) await r(100);
                t();
            })), new Promise((e => {
                window.setTimeout((() => {
                    n = !0, e();
                }), t);
            })) ]);
        }
        function a() {
            return /^m\.youtube\.com$/.test(window.location.hostname);
        }
        function l() {
            return document.querySelector("#movie_player");
        }
        function c() {
            return a() ? document.querySelector("#app") : l();
        }
        function u() {
            var e, t;
            return Boolean(null === (t = null === (e = l()) || void 0 === e ? void 0 : e.getOptions) || void 0 === t ? void 0 : t.call(e).includes("captions"));
        }
        function d() {
            var e, t, n, i;
            return a() ? null === (t = null === (e = c()) || void 0 === e ? void 0 : e.data) || void 0 === t ? void 0 : t.playerResponse : null === (i = null === (n = c()) || void 0 === n ? void 0 : n.getPlayerResponse) || void 0 === i ? void 0 : i.call(n);
        }
        function h() {
            var e;
            return null === (e = d()) || void 0 === e ? void 0 : e.videoDetails;
        }
        function f() {
            var e;
            return Boolean(null === (e = h()) || void 0 === e ? void 0 : e.isLive);
        }
        function p() {
            var e, t, n, i;
            return window.self !== window.top ? null === (t = null === (e = l()) || void 0 === e ? void 0 : e.getMediaReferenceTime) || void 0 === t ? void 0 : t.call(e) : null === (i = null === (n = l()) || void 0 === n ? void 0 : n.getProgressState) || void 0 === i ? void 0 : i.call(n).ingestionTime;
        }
        function v(e) {
            if (void 0 === e || !Number.isFinite(e) || e <= 0) return !1;
            return Math.abs(Date.now() - 1e3 * e) < 864e5;
        }
        async function _() {
            await async function() {
                return await s((() => u()), 100), u();
            }() && await s((() => m().length > 0), 5e3);
        }
        function g(e) {
            return "languageCode" in e;
        }
        function m() {
            var e, t;
            return null !== (t = null === (e = l()) || void 0 === e ? void 0 : e.getOption("captions", "tracklist", {
                includeAsr: !0
            })) && void 0 !== t ? t : [];
        }
        await async function() {
            await s((() => Boolean(d())), 5e3);
        }();
        const b = d(), y = function() {
            var e, t, n, i;
            return null !== (i = null === (n = null === (t = null === (e = d()) || void 0 === e ? void 0 : e.captions) || void 0 === t ? void 0 : t.playerCaptionsTracklistRenderer) || void 0 === n ? void 0 : n.captionTracks) && void 0 !== i ? i : [];
        }().reduce(((e, t) => {
            if (g(t)) {
                const n = o(t.languageCode), i = function(e) {
                    const t = (null == e ? void 0 : e.url) || (null == e ? void 0 : e.baseUrl);
                    if (t && "string" == typeof t) return function(e) {
                        return `${e.startsWith("http") ? e : `${window.location.origin}/${e}`}&fmt=json3`;
                    }(t);
                }(t), r = function(e) {
                    var t, n, i;
                    const o = (null === (t = e.name) || void 0 === t ? void 0 : t.simpleText) || (null === (i = null === (n = e.name) || void 0 === n ? void 0 : n.runs) || void 0 === i ? void 0 : i[0].text) || e.displayName || e.languageName;
                    if (o && "string" == typeof o) return `${o}, ${window.location.hostname}`;
                }(t);
                n && i && r && e.push({
                    languageCode: n,
                    isAutoGenerated: "asr" === (null == t ? void 0 : t.kind),
                    title: r,
                    url: i
                });
            }
            return e;
        }), []), [w, x] = await Promise.all([ async function() {
            if (!f()) return;
            await s((() => v(p())), 5e3);
            const e = p();
            return v(e) ? e : void 0;
        }(), async function(e) {
            let t;
            return f() ? (await _(), t = m()) : t = e, t.reduce(((e, t) => {
                if (g(t)) {
                    const n = o(t.languageCode);
                    n && e.push({
                        languageCode: n,
                        isAutoGenerated: (null == t ? void 0 : t.isAutoGenerated) || "asr" === (null == t ? void 0 : t.kind)
                    });
                }
                return e;
            }), []);
        }(y) ]);
        return {
            videoId: null === (e = null == b ? void 0 : b.videoDetails) || void 0 === e ? void 0 : e.videoId,
            title: null === (t = null == b ? void 0 : b.videoDetails) || void 0 === t ? void 0 : t.title,
            description: null === (n = null == b ? void 0 : b.videoDetails) || void 0 === n ? void 0 : n.shortDescription,
            tracks: y,
            tracksInfo: x,
            isStream: f(),
            absoluteTime: w,
            isLiveDvrEnabled: function() {
                var e;
                return Boolean(null === (e = h()) || void 0 === e ? void 0 : e.isLiveDvrEnabled);
            }(),
            channelId: null === (i = null == b ? void 0 : b.videoDetails) || void 0 === i ? void 0 : i.channelId
        };
    };
    function Ii(e, t, n) {
        let i, o = 0, r = e.length - 1;
        for (;o <= r; ) {
            i = Math.floor((o + r) / 2);
            const n = e[i], s = n.startMs, a = n.startMs + n.durationMs;
            if (s <= t && a >= t) return {
                value: e[i]
            };
            s > t ? r = i - 1 : o = i + 1;
        }
        if (null == n ? void 0 : n.closestLower) return {
            value: e[r],
            closestLower: !0
        };
    }
    class Ni extends class {
        fetchSubtitles(e) {
            if (e.url) return Ve(e.url, "text");
        }
        getCurrentSubtitle(e, t) {
            var n;
            return null === (n = Ii(e, t)) || void 0 === n ? void 0 : n.value;
        }
        getActiveTokenTime(e, t) {
            if (!(e && e.tokens && e.tokens.length && Tn(e.tokens[0]))) return;
            const n = Ii(e.tokens, t, {
                closestLower: !0
            });
            return (null == n ? void 0 : n.closestLower) ? n.value.startMs + n.value.durationMs + 1 : n ? n.value.startMs + 1 : void 0;
        }
    } {
        async getLocalTracks() {
            return (await Si(Di)).tracks;
        }
        formatSubtitles(e) {
            try {
                const n = JSON.parse(e);
                if (function(e) {
                    return "object" == typeof e && null !== e;
                }(t = n) && "events" in t && Array.isArray(t.events) && t.events[0] && "tStartMs" in t.events[0] && "dDurationMs" in t.events[0]) return function(e) {
                    const t = [];
                    for (const n of e.events) {
                        if (!n.segs) continue;
                        const e = n.segs.map((e => e.utf8)).join(" "), i = En(e);
                        t.push({
                            text: e,
                            startMs: n.tStartMs,
                            durationMs: n.dDurationMs,
                            tokens: i
                        });
                    }
                    return t;
                }(n);
            } catch (e) {}
            var t;
            return [];
        }
    }
    class Hi extends Ni {}
    class ji extends Ti {
        getComponents() {
            return {
                Player: Mi,
                Styles: Li,
                SubtitlesService: Hi
            };
        }
    }
    function Bi(e) {
        const t = e.width / 40, n = e.height / 25;
        return function(e) {
            return 2 * Math.round(e / 2);
        }(Math.max(18, Math.min(26, t, n)));
    }
    function Vi(e) {
        const t = document.createElement("style");
        return t.innerHTML = e, t;
    }
    const Wi = e => {
        e.stopPropagation(), e.preventDefault();
    }, Ui = [ "mousemove", "touchmove", "pointermove" ];
    class $i extends Ci {
        constructor(e) {
            super(), this.karaokeEnabled = !1, this.shadowRootMode = "closed", this.handleEnterPictureInPicture = () => {
                this.disableSubtitles();
            }, this.handleLeavePictureInPicture = () => {
                this.enableSubtitles();
            }, this.handleVisibilityChange = () => {
                "visible" === document.visibilityState && this.enableSubtitles();
            }, this.handleSrcChanged = async () => {
                this.disableSubtitles(), await this.waitForVideoLoading(), this.subscribeToApi();
            }, this.handleSubtitlesStatusChange = async e => {
                const t = {
                    data: e.data,
                    lang: e.lang
                };
                this.subtitlesData = t, null !== t.data ? (this.emit("subtitlesDataChanged", t), 
                this.enableSubtitles()) : this.disableSubtitles();
            }, this.handleKaraokeEnabledChange = e => {
                this.karaokeEnabled = e, this.emit("karaokeEnabledChanged", e);
            }, this.element = e, this.srcObserver = new MutationObserver(this.handleSrcChanged), 
            this.srcObserver.observe(e, {
                attributeFilter: [ "src", "currentSrc" ]
            }), this.addEventListeners(), this.subscribeToApi();
        }
        isEnteredPictureInPicture() {
            return !!window.PictureInPictureWindow && this.element === document.pictureInPictureElement;
        }
        async waitForVideoLoading() {}
        async subscribeToApi() {
            var e, t;
            null === (e = this.element.yandexVideoSubtitles) || void 0 === e || e.observeSubtitlesStatus(this.handleSubtitlesStatusChange), 
            null === (t = this.element.yandexVideoSubtitles) || void 0 === t || t.observeKaraokeStatus(this.handleKaraokeEnabledChange);
        }
        get player() {
            const {Player: e} = this.getComponents();
            return this.playerInner = this.playerInner || new e(this.element), this.playerInner;
        }
        enableSubtitles() {
            if (!this.subtitlesBridge && !this.isEnteredPictureInPicture() && !this.player.isAdvertisement()) {
                const {SubtitlesBridge: e} = this.getComponents();
                this.subtitlesBridge = new e(this), this.subtitlesWidgetApi = function(e, t) {
                    const n = document.documentElement, i = document.createElement("div");
                    i.className = "ya-subtitles-widget";
                    const o = i.attachShadow({
                        mode: t
                    }), r = document.createElement("div");
                    i.style.pointerEvents = "none", i.style.willChange = "transform", i.style.zIndex = "2147483647", 
                    i.style.top = "0", i.style.left = "0";
                    const s = t => {
                        const n = Bi(t);
                        e.size = n, i.style.fontSize = `${n}px`, i.style.width = `${Math.round(t.width)}px`, 
                        i.style.height = `${Math.round(t.height)}px`, i.style.transform = `translate3d(${t.left}px, ${t.top}px, 0)`, 
                        i.style.position = t.position;
                    }, a = () => {
                        const e = mi();
                        if (e) {
                            if (i.parentElement === e) return;
                            e.appendChild(i);
                        } else {
                            if (i.parentElement === n) return;
                            n.appendChild(i);
                        }
                    };
                    return {
                        append: () => {
                            var l;
                            return o.append(r), o.append(Vi(".DraggablePanel{bottom:0;left:0;position:absolute;right:0;top:0}.DraggablePanel_isDragging *{cursor:grabbing!important;user-select:none}.DraggablePanel-Box{left:0;position:absolute;top:0;width:80%;will-change:transform}.touch .DraggablePanel-Box{width:100%}.DraggablePanel-BoxIn{backface-visibility:hidden;min-height:30px;position:relative;transition:.15s}.Overlay{bottom:0;position:fixed;right:0}.Overlay,.Popover{left:0;pointer-events:all;top:0}.Popover{background-color:#fff;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.25);box-sizing:border-box;color:#000;max-width:calc(100vw - 10px);z-index:9999}@import-glob \"./**/*.css\";.Subtitles{color:#fff;display:flex;font-size:1em;justify-content:center;line-height:1.35;opacity:1;transition:opacity .1s ease-out;user-select:none}.Subtitles:hover{opacity:1}.Subtitles-Content{position:relative}.Subtitles-Background{opacity:.8}.Subtitles-Lines{align-items:flex-start;display:flex;flex-direction:column;position:relative}.Subtitles-Line{margin-bottom:-.2em;margin-top:-.2em;padding:.2em .3125em;pointer-events:all}.Subtitles-Line_oneLine{border-radius:12px}.Subtitles-Line:first-child{margin-top:0;padding-top:.2em}.Subtitles-Line:last-child{margin-bottom:0;padding-bottom:.2em}.Subtitles-Line:first-child:last-child{margin:0}.SubtitlesToken{display:inline-block;pointer-events:all;position:relative;z-index:1}.SubtitlesToken_isTranslatable{cursor:pointer}.SubtitlesToken:hover{z-index:99}.SubtitlesToken:after{border:2px solid transparent;border-radius:.275em;bottom:0;content:\"\";left:-.125em;position:absolute;right:-.125em;top:0;z-index:-1}.SubtitlesToken_isNextHighlighted:before,.SubtitlesToken_isPrevHighlighted:before{border-bottom:2px solid transparent;border-top:2px solid transparent;bottom:0;content:\"\";pointer-events:none;position:absolute;top:0;width:.5em}.SubtitlesToken_isPrevHighlighted:before{left:-.25em}.SubtitlesToken_isNextHighlighted:before{right:-.25em}.SubtitlesToken_isActive,.SubtitlesToken_isPassed{color:#a36eff}.SubtitlesToken_isSelected{color:#fff;opacity:1}.SubtitlesToken_isInHoveredGroup,.SubtitlesToken_isInSelectedGroup{opacity:1}.SubtitlesToken_isInHoveredGroup:after,.SubtitlesToken_isInHoveredGroup:before{border-color:#32b4ff;opacity:1}.SubtitlesToken_isInSelectedGroup:after,.SubtitlesToken_isInSelectedGroup:before{border-color:#7e33ff;opacity:1}.SubtitlesToken_isTranslatable:hover:after{background-color:hsla(0,0%,100%,.2);opacity:1}.SubtitlesToken_isSelected:after,.SubtitlesToken_isSelected:hover:after{background-color:#532b98;opacity:1}.SubtitlesToken_isPrevHighlighted:after{border-bottom-left-radius:0;border-left:0!important;border-top-left-radius:0}.SubtitlesToken_isNextHighlighted:after{border-bottom-right-radius:0;border-right:0!important;border-top-right-radius:0}.Skeleton{display:block}.Translate{display:flex;font-size:min(max(1em,16px),22px);padding:.5em .625em;position:relative}.Translate_placement_top{flex-direction:column}.Translate_placement_bottom{flex-direction:column-reverse}.Translate-Title{color:#354859;font-family:YS Display,sans-serif;font-size:1em;font-weight:500;line-height:1;margin:0;white-space:nowrap}.Translate-Text{color:#6f7d8b;font-family:YS Text,sans-serif;font-size:.625em;font-weight:400;line-height:1.2;margin:0;white-space:break-spaces}.Translate-Header{display:flex;justify-content:space-between;margin-bottom:.325em}.Translate-Logo{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='99' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.97 10H6.4V1.72H4.3c-2.09 0-3.2 1.08-3.2 2.68 0 1.28.61 2.03 1.7 2.8L.9 10h1.56l2.1-3.13-.73-.5c-.88-.59-1.3-1.05-1.3-2.05 0-.88.61-1.48 1.8-1.48h.64V10Zm18.93-.4V8.43c-.44.3-1.18.56-1.87.56-1.04 0-1.43-.49-1.5-1.49h3.43v-.75c0-2.09-.92-2.87-2.34-2.87-1.72 0-2.55 1.32-2.55 3.13 0 2.09 1.03 3.1 2.84 3.1.9 0 1.57-.24 1.99-.53Zm8.86.52c.66 0 1.12-.12 1.47-.37V8.59c-.36.25-.79.4-1.38.4-1.02 0-1.43-.78-1.43-2.02 0-1.3.5-1.96 1.44-1.96.55 0 1.08.19 1.37.37v-1.2a3.3 3.3 0 0 0-1.53-.3c-1.8 0-2.75 1.3-2.75 3.13 0 2 .92 3.1 2.81 3.1ZM10.91 4v2.37h-1.9V4H7.6v6h1.42V7.5h1.9V10h1.41V4h-1.42Zm7.82 4.87h-.63V4.01h-4.14v.51c0 1.46-.1 3.36-.6 4.36h-.43v2.49h1.3V10h3.19v1.37h1.3V8.88Zm9.7 1.12h1.6l-2.27-3.23 2-2.76h-1.43l-2 2.76V4.01H24.9V10h1.42V7.06l2.1 2.94ZM21.6 5c.7 0 .92.6.92 1.34v.12h-1.98c.03-.95.38-1.45 1.06-1.45Zm-4.92 3.88h-2c.39-.9.5-2.54.5-3.57v-.18h1.5v3.75Zm22.01-7.16V10h1.44V2.84h2.57V10h1.45V1.72h-5.46Zm11.23 7.87V8.44c-.44.3-1.18.56-1.87.56-1.05 0-1.43-.5-1.49-1.5h3.42v-.75c0-2.09-.92-2.87-2.34-2.87-1.72 0-2.55 1.32-2.55 3.13 0 2.09 1.03 3.1 2.84 3.1.9 0 1.57-.24 1.99-.53Zm-2.3-4.58c.7 0 .92.58.92 1.33v.12h-1.98c.04-.95.38-1.45 1.06-1.45Zm4.62-1h-1.31v7.72h1.42V9.3c.35.53.88.82 1.49.82 1.38 0 2.33-1.1 2.33-3.12 0-2-.93-3.11-2.26-3.11-.67 0-1.22.3-1.6.9L52.24 4ZM53.48 9c-.75 0-1.13-.6-1.13-1.99 0-1.4.4-2 1.2-2 .77 0 1.16.6 1.16 1.99 0 1.4-.4 2-1.23 2Zm8.23.6V8.43c-.44.3-1.18.56-1.87.56-1.04 0-1.43-.49-1.5-1.49h3.43v-.75c0-2.09-.92-2.87-2.34-2.87-1.73 0-2.55 1.32-2.55 3.13 0 2.09 1.03 3.1 2.84 3.1.9 0 1.57-.24 1.99-.53ZM59.4 5c.7 0 .91.6.91 1.34v.12h-1.97c.03-.95.38-1.45 1.06-1.45Zm5.66 5c1.41 0 2.24-.6 2.24-1.74 0-.79-.47-1.24-1.27-1.38.64-.18 1.05-.63 1.05-1.35 0-1.02-.68-1.52-2-1.52h-2.37V10h2.35Zm-.17-4.92c.5 0 .8.21.8.67 0 .41-.32.66-.85.66h-.72V5.08h.77Zm.02 2.37c.6 0 .93.21.93.72 0 .54-.36.76-.93.76h-.79V7.45h.79Zm5.65-3.56c-1.56 0-2.65 1.1-2.65 3.12 0 2 1.09 3.1 2.65 3.1 1.56 0 2.64-1.1 2.64-3.11 0-2-1.08-3.11-2.64-3.11Zm0 5.1c-.79 0-1.18-.6-1.18-1.98 0-1.4.4-2 1.18-2 .78 0 1.18.6 1.18 1.99 0 1.4-.4 2-1.18 2Zm8.66-.11h-.63V4.01h-4.13v.51c0 1.46-.1 3.36-.6 4.36h-.44v2.49h1.31V10h3.18v1.37h1.31V8.88Zm-2.05 0h-2c.4-.9.5-2.54.5-3.57v-.18h1.5v3.75Zm4.87-1.95c-.59 0-.86-.31-.86-1.04V4.01h-1.42v1.87c0 1.45.7 2.14 1.93 2.14.51 0 .94-.13 1.27-.33V10h1.42V4h-1.42v2.66c-.25.18-.57.27-.92.27ZM85.58 4v6h1.23L89 6.3V10h1.38V4h-1.23l-2.19 3.71v-3.7h-1.38Zm9.5 5.99h1.61l-2.27-3.23 2-2.76h-1.43l-2 2.76V4.01h-1.42V10h1.42V7.06l2.1 2.94Z' opacity='.8' fill='%23354859'/%3E%3C/svg%3E\");background-position:0 0;background-repeat:no-repeat;background-size:contain;display:block;height:min(12px,.75em);width:min(96px,6em)}.Translate_placement_top .Translate-Logo{margin-bottom:8px}.Translate_placement_bottom .Translate-Logo{margin-top:8px}.Translate-Logo svg{display:block}.Translate-Mark_hovered{background-color:rgba(50,180,255,.25)}.Translate-Mark_selected{color:#000;font-weight:700}.Translate-ErrorLabel{font-size:.625em;margin:0 0 .5em}.Translate-Button{background:#f5f5f5;border:none;border-radius:.5rem;cursor:pointer;font-size:.75em;padding:.825rem 1.25rem}.Translate-Button:hover{background:#e6e6e6}.VideoContainer{bottom:0;font-family:YS Text,sans-serif;left:0;pointer-events:none;right:0;top:0}.VideoContainer,.VideoContainer-DraggableArea{position:absolute}")), 
                            i.append(Vi(e.styles.global)), e.video.player.on("positionChanged", s), Ui.forEach((e => {
                                i.addEventListener(e, Wi);
                            })), gi.forEach((e => {
                                document.addEventListener(e, a);
                            })), s(e.video.player.getPosition()), H(V(ki, {
                                subtitlesBridge: e,
                                shadowRootMode: t
                            }, void 0), r), (null !== (l = mi()) && void 0 !== l ? l : n).append(i), i;
                        },
                        remove: () => {
                            e.video.player.off("positionChanged", s), Ui.forEach((e => {
                                i.removeEventListener(e, Wi);
                            })), gi.forEach((e => {
                                document.removeEventListener(e, a);
                            })), H(null, r), o.innerHTML = "", i.remove();
                        }
                    };
                }(this.subtitlesBridge, this.shadowRootMode), this.subtitlesWidgetApi.append();
            }
        }
        disableSubtitles() {
            var e, t;
            this.subtitlesBridge = void 0, null === (e = this.subtitlesWidgetApi) || void 0 === e || e.remove(), 
            this.subtitlesWidgetApi = void 0, null === (t = this.playerInner) || void 0 === t || t.destroy(), 
            this.playerInner = void 0;
        }
        addEventListeners() {
            window.PictureInPictureWindow && (this.element.addEventListener("enterpictureinpicture", this.handleEnterPictureInPicture), 
            this.element.addEventListener("leavepictureinpicture", this.handleLeavePictureInPicture)), 
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
        }
        removeEventListeners() {
            window.PictureInPictureWindow && (this.element.removeEventListener("enterpictureinpicture", this.handleEnterPictureInPicture), 
            this.element.removeEventListener("leavepictureinpicture", this.handleLeavePictureInPicture)), 
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
        destroy() {
            this.disableSubtitles(), this.removeEventListeners(), this.srcObserver.disconnect();
        }
    }
    class zi extends $i {
        async waitForVideoLoading() {
            if (!(this.element.readyState >= 1)) return new Promise((e => {
                this.element.addEventListener("loadedmetadata", (() => {
                    e();
                }), {
                    once: !0
                });
            }));
        }
        get id() {
            return new URL(window.location.href).searchParams.get("v");
        }
    }
    class Gi extends zi {
        getComponents() {
            return {
                SubtitlesBridge: ji,
                Player: Mi
            };
        }
    }
    class Fi extends Ai {}
    class Zi extends Ri {
        constructor() {
            super(...arguments), this.global = "\n    .ytp-subtitles-button,\n    #ytp-caption-window-container {\n      display: none !important;\n    }\n  ", 
            this.containerOffset = {
                top: 7,
                left: 0,
                right: 0,
                bottom: 7
            }, this.popupOffset = 7, this.popupOverflowPadding = {
                top: 0,
                bottom: -200,
                left: 0,
                right: 0
            };
        }
    }
    class qi extends Ni {}
    class Ki extends Ti {
        constructor() {
            super(...arguments), this.dragArea = "fullPage";
        }
        getComponents() {
            return {
                Player: Fi,
                Styles: Zi,
                SubtitlesService: qi
            };
        }
    }
    class Yi extends zi {
        getComponents() {
            return {
                SubtitlesBridge: Ki,
                Player: Fi
            };
        }
    }
    function Xi(i) {
        try {
            switch ((() => {
                const i = n.getHostname();
                for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e) && new RegExp(e).test(i)) return t[e];
                return e.UNKNOWN;
            })()) {
              case "youtube":
                return new (window.location.host.startsWith("m") ? Yi : Gi)(i);

              default:
                return null;
            }
        } catch (e) {
            return null;
        }
    }
    function Qi(e) {
        return Array.from(e).map(Ji).flat();
    }
    function Ji(e) {
        if (e instanceof HTMLVideoElement) return [ e ];
        if (e instanceof HTMLElement) {
            const t = e.querySelectorAll("video");
            return Array.from(t);
        }
        return [];
    }
    class eo {
        constructor() {
            this.videos = new Map, this.handleVideoAdded = e => {
                if (!this.videos.has(e)) {
                    const t = Xi(e);
                    t && this.videos.set(e, t);
                }
            }, this.handleVideoRemoved = e => {
                if (document.contains(e)) return;
                const t = this.videos.get(e);
                null == t || t.destroy(), this.videos.delete(e);
            }, this.observeVideos();
        }
        observeVideos() {
            this.observer = new MutationObserver((e => {
                !function(e, t) {
                    if ("function" == typeof window.requestIdleCallback) return window.requestIdleCallback(e, t);
                    const n = Date.now();
                    setTimeout((function() {
                        e({
                            didTimeout: !1,
                            timeRemaining: function() {
                                return Math.max(0, 50 - (Date.now() - n));
                            }
                        });
                    }), 1);
                }((() => {
                    e.forEach((e => {
                        "childList" === e.type && (Qi(e.addedNodes).forEach(this.handleVideoAdded), Qi(e.removedNodes).forEach(this.handleVideoRemoved));
                    }));
                }), {
                    timeout: 1e3
                });
            })), this.observer.observe(document, {
                childList: !0,
                subtree: !0
            }), document.querySelectorAll("video").forEach(this.handleVideoAdded);
        }
        destroy() {
            var e;
            null === (e = this.observer) || void 0 === e || e.disconnect(), this.videos.forEach((e => {
                e.destroy();
            })), this.videos.clear();
        }
    }
    const to = function(e) {
        let t, n = !1;
        return function(...i) {
            return n || (t = e(...i), n = !0), t;
        };
    }((() => {
        try {
            new eo;
        } catch (e) {}
    })), no = () => {
        "complete" === document.readyState && (to(), document.removeEventListener("readystatechange", no));
    };
    no(), document.addEventListener("readystatechange", no);
}();
